# Folia 智能过渡（等功率交叉淡化）设计文档

## Background & Goals

上游 Folia 的「智能过渡」是 automix：拍点（beat_this）+ 四轨分离（htdemucs）两个模型
（约 133 MB）、离线分析、乐理决策与 Web Audio 采样级调度。本项目的 Stage 6 已评估为独立
立项，不随播放器移植。

本轮先做上游同一设置里的另一条路径 —— **crossfade 模式**：固定形状的等功率交叉淡化。
目标是把「上一首快放完，下一首自然接进来」的听感做出来，不引入任何模型或分析层，同时把
播放链路改造成双 deck，为以后按需加分析留出入口。

### 成功标准

- 开启自动连播 + 智能过渡后，歌曲末尾 `N` 秒与下一首交叉淡化，听不到明显断层。
- 过渡时长可在 1–12 秒间调整（默认 5 秒），刷新后保留。
- 关闭智能过渡时，行为与现在完全一致（10 秒提示 + 到点硬切）。
- 手动点上一首/下一首仍然直接切歌，不做过渡。
- 过渡期间暂停、拖动进度、快速切歌都不会留下双声、静音或卡住的音量。

## 已定边界

- **只做等功率交叉淡化**，不做 BPM/响度/人声分离分析，不引入模型。
- **只在自动连播时触发**；手动切歌直接切（沿用现有 `clearState` 语义）。
- 设置项：开关 + 1–12 秒滑杆（默认开启、5 秒）。
- 视觉器/歌词/URL 在交叉淡化**开始时**切到下一首：路由在淡化启动的那一刻前进，下一首
  歌词从 0 秒起就可见，不会在 5 秒的淡化里错过开头；切换本身走 View Transition 交叉
  淡化（见「视觉交接」），不做双视觉器同时挂载（旧页面的画面在交叉淡化期间是一张快照）。
- 不实现上游的 `VisualizerStyleTransition` / `VisualizerBackgroundTransition`。

## 现状与约束

- 播放器目前是**每首歌一个路由**：`/media/[id]` 挂载 `MusicDetail`，`useAudio` 持有单个
  `<audio>`；自动连播到点后 `router.push` 下一首。路由切换会卸载 `<audio>`，所以交叉淡化
  必须把音频元素提升到路由之上。
- 音频源是跨域静态文件（`https://rustfs-endpoint.yhnotes.com/content/...`），已确认返回
  `Access-Control-Allow-Origin: *` 与 `Accept-Ranges: bytes`。
  - 交叉淡化需要 Web Audio：iOS Safari 的 `HTMLMediaElement.volume` 只读，靠改 `volume`
    在 iPhone 上无效。
  - `MediaElementAudioSourceNode` 要求媒体元素以 CORS 模式加载，否则输出静音；因此两个
    deck 都要在设置 `src` 前加 `crossOrigin='anonymous'`。
- 站点是 `output: 'export'` 静态导出，没有后端；播放引擎必须是纯前端单例。
- `useAudioSignals` 每帧读取 `audioRef.current.currentTime`，所以 ref 必须始终指向**当前
  活动 deck**；deck 交换后不能重建 ref 对象。

## High-Level Design

```text
src/app/media/layout.tsx（服务端）
  └─ PlaybackProvider（客户端）
       ├─ <audio deck A> / <audio deck B>        // 常驻，跨歌曲路由不卸载
       │    └─ MediaElementSource → Gain → destination
       ├─ PlaybackEngine（单例，无 React 依赖）
       │    ├─ 活动 deck / 待机 deck
       │    ├─ 自动连播 + 交叉淡化状态机
       │    └─ MediaSession 元数据与动作
       └─ children
            └─ /media/[id] → MusicDetail → useAudio（适配器）→ VisualizerPlayer
```

- 音频元素放在 `/media` 的 layout 里，`/media/a` → `/media/b` 的导航不会卸载它。
- `PlaybackEngine` 不依赖 React，便于单测；React 侧用 `useSyncExternalStore` 订阅快照。
- `useAudio` 保留现有返回形状（`audioRef` / `audioState` / `controls`），内部改为委托
  engine；`VisualizerPlayer` 与 17 个样式宿主无需改动。

## Implementation Plan

### 1. 交叉淡化数学（新增 `player/playback/crossfade.ts`）

纯函数，无副作用：

```ts
export const CROSSFADE_MIN_SEC = 1;
export const CROSSFADE_MAX_SEC = 12;
export const CROSSFADE_DEFAULT_SEC = 5;

export const clampCrossfadeSeconds = (value: unknown): number => {
    const n = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(n)) return CROSSFADE_DEFAULT_SEC;
    return Math.min(CROSSFADE_MAX_SEC, Math.max(CROSSFADE_MIN_SEC, Math.round(n)));
};

/** 等功率：两路功率之和恒为 1，交叉点各 -3 dB。 */
export const equalPowerGains = (progress: number): {out: number; in: number} => {
    const p = Math.min(1, Math.max(0, progress));
    return {out: Math.cos((p * Math.PI) / 2), in: Math.sin((p * Math.PI) / 2)};
};

/** 短歌保护：过渡不超过全曲的 1/3，也不超过剩余时长。 */
export const planOverlap = (duration: number, currentTime: number, seconds: number): number => {
    if (!Number.isFinite(duration) || duration <= 0) return 0;
    const remaining = Math.max(0, duration - currentTime);
    return Math.max(0, Math.min(clampCrossfadeSeconds(seconds), duration / 3, remaining));
};
```

### 2. 播放引擎（新增 `player/playback/playbackEngine.ts`）

单个 `PlaybackEngine` 类 + 模块级 `playbackEngine` 单例。

**Deck 与音频图**

- `attachDecks(a, b)`：Provider 挂载时注入两个 `<audio>`；两者都设置
  `preload='auto'`、`crossOrigin='anonymous'`。
- 首次 `play()` 时惰性创建 `AudioContext` 与每路 `MediaElementAudioSourceNode → GainNode`，
  并 `resume()`；`createMediaElementSource` 每个元素只能建一次，用 `WeakSet` 防重。
- 增益统一由 GainNode 控制（`element.volume` 保持 1），交叉淡化逐帧写
  `gain.value = equalPowerGains(progress)`。
- 若 `AudioContext` 不可用：桌面回退到 `element.volume`；仍不可用则退化为硬切。

**快照**

```ts
interface PlaybackSnapshot {
    trackId: string | null;
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    autoPlay: boolean;
    transitioning: boolean;
}
```

- `subscribe(listener)` / `getSnapshot()`；快照对象只在字段变化时重建，保证
  `useSyncExternalStore` 稳定。
- `timeupdate` + 播放中的 rAF 节流到约 10 Hz 推送进度；`duration` 在
  `loadedmetadata` 后更新。

**状态机**

```text
idle ──(bindTrack)──> idle（active deck 载入）
idle ──(时间进入 overlap 窗口且下一首 ready)──> fading（active/standby 立即互换，路由前进）
fading ──(progress >= 1)──> 停掉淡出 deck → idle（待机 deck 预载再下一首）
fading ──(暂停/拖动/手动切歌/关闭过渡)──> idle（取消并恢复音量）
```

- `bindTrack(track)`：`track.id === snapshot.trackId` 时直接返回（自动连播后新页面挂载
  不能重启音频；淡化期间待机 deck 是正在淡出的上一首，不能预载，留到淡化结束）；否则
  取消进行中的淡化、停掉两路、活动 deck 载入新 `src`、待机 deck 预载下一首、更新
  MediaSession、按 `autoPlay` 尝试播放。
- 待机 deck 在每首歌载入时就 `src = 下一首` 并 `load()`，保证进入淡化窗口时
  `readyState >= HAVE_CURRENT_DATA`；未就绪则等到歌曲结束硬切（不阻塞播放）。
- 触发条件：`autoPlay && transition.enabled && nextTrack && !fading` 且
  `duration - currentTime <= overlap`。
- 开始：把「活动」角色立即交给淡入 deck（`activeIndex` 互换，快照的 `trackId` 切到下一首），
  淡出 deck 成为待机继续发声；随后 `advanceHandler(nextId)` 由 Provider 执行
  `router.push`，视图过渡与音频淡化同时开始。
- 淡化进度以**淡入（新的活动）deck 的 `currentTime`** 为时钟
  （`progress = active.currentTime / overlap`），这样暂停时两路一起冻结、恢复后从原位置
  继续，不会因为墙钟跳变。
- 完成：淡出（待机）deck `pause()` + `currentTime = 0`；活动 deck 增益恢复 1；待机 deck
  预载再下一首。路由已在开始时前进，这里不再 push。
- 取消：淡出（待机）deck `pause()` + 归零，活动 deck 增益恢复 1；用于暂停以外的拖动、
  手动切歌、关闭过渡。
- `clearState()`：取消淡化、两路暂停归零，用于手动上一首/下一首（保持现有行为）。
- 下一首不存在（列表最后一首）：到点停止，不淡化。

**MediaSession**

- engine 负责 `navigator.mediaSession.metadata` 与 `play` / `pause` / `nexttrack` /
  `previoustrack` 处理器；manual next/prev 先 `clearState()` 再 `router.push`。

### 3. Provider 与路由（新增 `player/playback/PlaybackProvider.tsx`、`src/app/media/layout.tsx`）

- `PlaybackProvider` 是客户端组件，渲染两个隐藏 `<audio ref>`（`aria-hidden`、
  `className="hidden"`），在 effect 中 `attachDecks`，并注册：
  - `engine.setAdvanceHandler(id => router.push('/media/' + id + '/'))`；
  - `engine.setErrorHandler(toast)`：播放失败沿用现有「播放失败」提示；
  - 订阅 `usePlayerPrefs()`，把 `smartTransition` / `crossfadeSeconds` 同步给 engine。
- `src/app/media/layout.tsx` 用 Provider 包住 `children`；`/media` 列表页与
  `/media/[id]` 详情页共享同一实例，歌曲间导航不卸载音频。
- 不改变 `app/media/[id]/page.tsx` 的服务端元数据与静态参数。

### 4. `useAudio` 改为适配器（修改 `player/hooks/useAudio.ts`）

- 签名增加曲目信息：`useAudio(musicItem, forwardId, backwardId)`。
- 返回：
  - `audioRef`：稳定的 getter 对象
    `{get current() { return engine.getActiveElement(); }}`，类型改为
    `RefObject<HTMLAudioElement | null>`；deck 交换后宿主自动读到新的活动元素。
  - `audioState`：直接来自 engine 快照（`isPlaying/currentTime/duration/autoPlay`）。
  - `controls`：`togglePlay/play/pause/seek/clearState/setAutoPlay` 全部委托 engine。
- 删除组件内的 `<audio>` 事件绑定、10 秒提示 toast 与 `localStorage['autoPlay']` 读写
  （移入 engine/Provider）。
- `MusicDetail.tsx` 删除 `<audio>` 元素，改为把 `musicItem` 传给 `useAudio`；其余不动。

### 5. 偏好与设置面板

- `usePlayerPrefs` 改为模块级外部 store（`useSyncExternalStore`），保证设置面板与
  `useAudio` 多个实例读到同一份值；保留现有 `folia-player-prefs` 键与逐项校验。
- 新增字段：
  - `smartTransition: boolean`，默认 `true`；
  - `crossfadeSeconds: number`，默认 `5`，读取时 `clampCrossfadeSeconds`。
- `PlayerSettingsPanel` 新增「智能过渡」区：
  - 开关行：标题「智能过渡」，描述「自动连播时，在歌曲末尾与下一首交叉淡化」；
  - 时长行：`<input type="range" min=1 max=12 step=1>`，右侧显示「N 秒」；关闭时禁用。
- 现有底部自动播放（循环图标）语义不变：只有它开启时才可能触发过渡；过渡开启时不再弹
  「即将播放下一首」提示。

### 6. 文档与索引（实现后）

- 更新本文档的验收记录。
- `docs/plan/folia-player-integration.md` Stage 6：标记 crossfade 模式已实现，automix
  分析仍暂缓，链接本文档。
- `docs/IMPLEMENTATION_PLAN.md`：把「Smart transitions (automix) — deferred」拆成
  「等功率交叉淡化」与「automix 分析（暂缓）」两项。

## 实现记录（2026-11-13）

**落地文件**

- 新增：`player/playback/crossfade.ts`、`player/playback/playbackEngine.ts`、
  `player/playback/PlaybackProvider.tsx`、`src/app/media/layout.tsx`。
- 修改：`player/hooks/useAudio.ts`（适配器）、`player/hooks/usePlayerPrefs.ts`
  （模块级外部 store + 两个新字段）、`player/styles/PlayerSettingsPanel.tsx`（智能过渡区）、
  `player/types.ts`（`audioRef` 允许 `null`）、`MusicDetail.tsx`（删除页面内 `<audio>`）。

**与设计的偏差**

- `bindTrack` 在 `track.id === snapshot.trackId` 时并非纯返回：自动连播后新页面挂载时，
  需要用它刷新下一首路由数据与待机 deck 预载，否则第二首之后无法继续过渡。
- `play(notify)` 增加静默参数：自动连播尝试被浏览器拦截时只 `console.warn`，不弹
  「播放失败」；只有用户主动点击播放失败才提示。
- 过渡期间快照跟随活动（淡入）deck 的 `currentTime`（开始时为 0，完成后已是 `overlap`
  秒），避免进度条/歌词闪回开头。
- rAF 循环在「活动 deck 暂停且淡出 deck 也暂停」时停止；暂停中的淡化两路一起冻结，恢复
  后从同一进度继续。
- `detachDecks` 会暂停两路并清空 `isPlaying`，离开 `/media` 时音频不会残留。

**视觉交接（2026-11-13 补充）**

交叉淡化只解决了听感；`advanceHandler` 的 `router.push` 仍是硬切：旧视觉器随路由卸载，
新页面要重新加载歌词 LRC、封面色板并初始化 Pixi/three 运行时，观感是「旧歌词 → 载入中 →
新歌词」。补充三层：

1. **路由随淡化开始前进**：第一版把 `advanceHandler` 放在淡化结束时，下一首歌词要等满
   5 秒才出现，开头几行会被整段错过。现在 engine 在淡化**启动的那一帧**就互换
   active/standby 角色并把快照的 `trackId` 切到下一首，随即 push 路由；淡出 deck 作为待机
   继续发声。歌词从 0 秒起就在屏幕上，并与下一首的音频同步推进。`bindTrack` 在淡化期间
   跳过待机 deck 预载（那一路仍在播放），由 `completeFade` 在淡化结束时补上。
2. **切歌导航走 View Transition**：`PlaybackProvider` 改用
   `useTransitionRouter`（next-view-transitions），`advanceHandler` 仅在交叉淡化时给
   `<html>` 打 `data-media-handoff`（硬切/手动切歌会清掉它，保持默认时长）；
   `globals.css` 据此把 `::view-transition-old/new(root)` 的时长提到 350ms
   （`prefers-reduced-motion` 下压到 1ms）。旧页面在交叉淡化期间是一张静态快照，
   350ms 内完成溶解，赶在下一首的第一句歌词到来之前。普通站内导航维持默认时长；
   不支持 View Transition 的浏览器自动退化为普通 push。
3. **预取下一首的歌词与色板**：新增 `player/playback/mediaCache.ts`（模块级缓存 +
   in-flight 去重；歌词保留原有 3 次网络重试）。`useAudio` 在 `bindTrack` 时对
   `nextItem.lyricsUrl` / `nextItem.imageUrl` 调 `preloadLyrics` / `preloadPalette`；
   `useLyrics` 与 `VisualizerPlayer` 的首帧状态直接读缓存。这样交叉淡化的新页面一侧
   自带正确歌词与配色，不会先渲染空歌词/默认色再跳变。

**验证**

- `npx tsc --noEmit`：通过。
- `npx eslint`（全部改动文件）：通过。
- `npm run build`（静态导出 + sitemap）：通过。
- 浏览器手动用例见下方 Testing Strategy，待在开发服务器逐项确认。

## Testing Strategy

**静态**

- `npx tsc --noEmit`、`npm run lint`、`npm run build`（静态导出）。

**手动（开发服务器）**

1. 开启自动播放 + 智能过渡，等待歌曲结束：应交叉淡化，无静音空档；URL、歌词、视觉器在
   淡化**开始**时切到下一首，下一首第一句歌词从 0 秒起可见，且旧歌词/背景与新歌词之间
   是一次平滑的交叉淡化，不出现「载入中」闪屏或默认配色跳变。
2. 关闭智能过渡：恢复 10 秒提示 + 到点硬切。
3. 关闭自动播放：到点停止，不淡化。
4. 过渡中暂停/恢复：两路同时冻结、同时继续，音量曲线与歌词进度都不跳变。
5. 过渡中拖动进度：取消淡化，活动 deck 正常跳转，待机 deck 归零。
6. 过渡中手动点上一首/下一首：立即取消，无残留声音。
7. 1 秒与 12 秒两端、短于 15 秒的曲目：`planOverlap` 上限生效。
8. 刷新页面：开关与秒数保留；直接访问某首歌不自动播放（浏览器策略）。
9. MediaSession 的播放/暂停/上一首/下一首。
10. 连续自动连播 3 首以上：deck 交换、预载、内存与音量均正常。
11. Chrome + Safari（含 iOS）各验证一次；iOS 必须走 Web Audio 而非 `volume`。

**回归**

- 时间线点击跳转、全屏、空闲隐藏、背景类型切换、17 种歌词样式切换。

## Risks & Mitigation

- **CORS 依赖**：`crossOrigin='anonymous'` 后若音源不再返回 CORS 头，Web Audio 输出静音。
  已确认当前源返回 `Access-Control-Allow-Origin: *`；在 engine 中检测 `play()` 失败时回退
  到直接 `src` 播放并提示。
- **iOS 自动播放**：首次播放仍需用户手势；`AudioContext` 在 `play()` 内创建并 `resume()`。
- **视图过渡快照**：`next-view-transitions` 在路由切换时快照 DOM（含 WebGL/canvas 画面），
  隐藏的 `<audio>` 不受影响；若某些浏览器上快照开销过大或出现闪烁，可去掉
  `data-media-handoff` 的时长覆盖，退回默认 250ms 交叉淡化。
- **双 deck 内存**：待机 deck 只预载下一首；`clearState` 时不主动释放 `src`，避免重复
  下载，切歌时自然替换。
- **多实例偏好不同步**：通过外部 store 解决；`usePlayerPrefs` 的 API 保持不变。
- **回滚**：删除 `player/playback/` 与 `app/media/layout.tsx`，恢复 `useAudio` 内的
  `<audio>` 即可；设置字段留在 localStorage 中不影响旧代码。

## Out of Scope

- automix 的拍点/人声分离模型、离线分析、乐理规划、表演手势。
- 视觉器样式/背景类型的首帧交叉淡化（上游 `styleTransition`）。
- 播放进度跨刷新恢复、播放队列持久化。

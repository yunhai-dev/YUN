# Folia Visualizer Player Design Document

## Background & Goals

- `/media/[id]` 播放器原本只有 `immersive` 与 `apple` 两种风格，缺少真正的“文字 PV”视觉层。
- 第一版按 Folia 的视觉语言从零实现了两个可视化器，但效果与上游差距明显。现改为**直接移植 Folia 的运行时实现**（`chthollyphile/folia-major`，v0.7.28）。
- 目标：
  - 新增第三种播放器风格 `visualizer`，内含 **商籁 Sonnet**（Pixi 8 排版 PV）与 **镜台 Diorama**（React Three Fiber 歌词走廊）。
  - 使用上游 Sonnet / Diorama 的真实渲染代码，而不是重新演绎。
  - 支持 enhanced LRC 的逐词时间；普通 LRC 由 Folia 的时间估算器均分逐词。
- 成功标准：
  - 移除原有 `immersive` / `apple` 两种播放器，`/media/[id]` 只保留 visualizer。
  - 三种风格循环切换并记忆在 `localStorage.player-style`；商籁/镜台记忆在 `localStorage.visualizer-mode`。
  - 播放、暂停、seek、上一首/下一首、自动播放、全屏全部正常。
  - 无歌词/加载失败显示提示；`tsc`、ESLint、静态导出构建通过。

## High-Level Design

```text
lyricsUrl -> useLyrics -> parseLyrics
          -> LyricLine[] {time, text, words?}
          -> folia/adapters.toFoliaLines  -> Folia Line[] (words + renderHints)
          -> folia/adapters.toFoliaTheme  -> Folia Theme (cover palette)
          -> FoliaSonnet / FoliaDiorama
               -> vendored Sonnet Pixi runtime / Diorama R3F scene
```

```text
MusicDetail
  -> VisualizerPlayer                  // 外壳：控件、模式切换、主题/色板
       -> FoliaSonnet (lazy)           // 商籁：Pixi canvas
       -> FoliaDiorama (lazy)          // 镜台：R3F Canvas
```

音频桥接：`folia/useAudioSignals.ts` 用 rAF 把 `<audio>.currentTime` 写入 framer-motion
`MotionValue`，供上游运行时逐帧读取。未接入 Web Audio 分析：跨域媒体建立
`MediaElementSource` 会要求音频源 CORS 且可能导致静音，因此电平信号保持 0（上游预览/静态
场景同样如此），不影响排版与镜头动画。

## Vendored Upstream Code

目录：`src/app/media/[id]/player/folia/`（AGPL-3.0，见目录内 `LICENSE`）。

只保留 Sonnet / Diorama 的运行时闭包，删除了上游的应用壳、设置面板、i18n、歌曲切换 UI
等依赖。为缺失的应用级服务提供了中性桩：

- `stores/motionSignals.ts`：`beatImpact` / `downbeatImpact` 常零信号。
- `services/beatFx/*`：无节拍分析引擎，全部返回“未就绪/零强度”。
- `services/lucideIconResolver.ts`：本地实现，37 个主题图标走静态深层导入；
  `sonnet/sonnetIcons.ts` 用 `__iconNode` 手工序列化 SVG（不依赖 `react-dom/server`）。
- 上述文件之外未改动上游渲染逻辑；`wordSegmentation.ts` 仅把 regex 的
  `s` 标志改为 `[\s\S]` 以匹配当前 TS 编译目标。

## Implementation Plan

### Stage 1: Vendor the runtime closure

- **Files**: `player/folia/**`（Sonnet、Diorama、Pixi 公共模块、歌词工具、类型、LICENSE）
- **Logic**: 以运行时依赖闭包为准从上游复制，重写相对 import；补齐上游跨目录引用
  (`pixiDisplayResources.ts` 等)；为应用级服务写上述桩。
- **Validation**: `npx tsc --noEmit` 对 vendored 目录零报错。

### Stage 2: Model adapters

- **Files**: `player/folia/adapters.ts`
- **Logic**:
  - `toFoliaLines(lyrics, duration)`：
    - enhanced LRC 的 `<mm:ss.xx>` 词时间直接映射为 Folia `Word[]`；
    - 普通 LRC 用 Folia 的 `buildTimedWords` 均分；
    - 行结束时间用 `estimateLrcLineEndTime`（长间奏会自动收缩成 interlude）；
    - 预计算 `renderHints`，Sonnet 编译器和 Diorama 布局都会读取。
  - `toFoliaTheme(palette)`：`stageBackground` / `pickAccent` / `mixHex` 生成 Folia `Theme`。
  - `getLyricsPlaceholder`：识别 `useLyrics` 的“暂无歌词 / 歌词加载失败”占位行。
- **Validation**: 纯函数，类型检查通过；占位行不会进入可视化器。

### Stage 3: 商籁 Sonnet host

- **Files**: `player/folia/FoliaSonnet.tsx`
- **Logic**:
  - `compileSonnetProgram(lines, seed)` 生成确定性分镜。
  - `SonnetPixiRuntime.create(...)` 建立 Pixi canvas；`swapSong` 处理歌词/主题的异步到达
    （同一 seed 静默替换，不播放溶解）。
  - `paused` 跟随播放状态；`setSongMetadata` 更新片尾字幕；卸载时 `destroy()` + abort。
- **Validation**: 类型/ESLint/构建通过；浏览器手动验证待做。

### Stage 4: 镜台 Diorama host

- **Files**: `player/folia/FoliaDiorama.tsx`
- **Logic**:
  - 单曲单 segment 的 `SequencerState`；歌词晚到时 `updateActiveSegmentLines` 原地重建。
  - `CameraRig` + `DioramaScene` + 默认 `DioramaTuning`（粒子、几何、辉光、灵魂出窍）。
  - 当前行索引由 `currentTime` 订阅二分查找，只有索引变化才触发 React 重渲染。
- **Validation**: 类型/ESLint/构建通过；浏览器手动验证待做。

### Stage 5: Player shell wiring

- **Files**: `player/styles/VisualizerPlayer.tsx`、`player/types.ts`（未改结构）
- **Logic**:
  - 两个 host 都用 `React.lazy`，避免 Pixi/three 进入首屏 chunk。
  - 舞台底色跟随 `foliaTheme.backgroundColor`；占位歌词显示提示文本。
  - 删除旧的自研 `SonnetVisualizer.tsx` / `DioramaVisualizer.tsx` /
    `useActiveLine.ts` / `useLyricClock.ts`。
  - 删除 `ImmersivePlayer.tsx` / `AppleMusicPlayer.tsx` 与仅被它们使用的
    `player/utils.ts`；`MusicDetail` 固定渲染 `VisualizerPlayer`，外壳移除风格切换按钮。
- **Validation**: `npm run build` 完成全部静态页导出。

### Stage 6: Lyrics timeline panel

- **Files**: `player/styles/LyricTimeline.tsx`（新增）、`player/styles/VisualizerPlayer.tsx`
- **Logic**:
  - 底部胶囊在自动播放按钮后新增“时间线”按钮，打开全屏磨砂面板。
  - 歌词按真实时间轴纵向排布（每秒 8px，最小间距 64px 防止拥挤），居中竖线，歌词左右交错；
    当前行用封面取色强调（放大圆点 + 发光 + 实底标签）。
  - 打开时直接定位到当前行，播放推进时平滑跟随；用户手动滚动即暂停跟随，滚回当前行可见后恢复。
  - 点击任意节点 `seek` 并开始播放后关闭，`Esc` / 背景点击 / 右上角关闭。
- **Validation**: 类型与 ESLint 通过；交互效果由用户在 dev 中预览确认。

### Stage 7: Verification

- **Validation**:
  - `npx tsc --noEmit`：通过。
  - `npx eslint`（新增/修改文件）：通过。
  - `npm run build`：通过（Next.js 16 在首次构建结束时提示安全升级建议，重跑后正常完成）。
  - 浏览器回归（播放/暂停/seek/切歌/切模式/全屏/时间线）需要用户手动执行。

## Testing Strategy

- Happy path：任选歌曲进入第三种风格，默认商籁；切镜台；歌词随播放逐词推进。
- Error path：无歌词、歌词加载失败显示提示；封面取色失败回退 `DEFAULT_PALETTE`；
  WebGL 不可用时 Sonnet 捕获创建异常（控制台报错，页面不崩溃）。
- Regression：`/media/[id]` 只剩 visualizer；旧的 `localStorage.player-style` 值会被忽略，
  不影响页面加载。

## Licensing

- Folia 上游为 **AGPL-3.0**。本项目代码现采用 **AGPL-3.0-only**（根目录 `LICENSE`），
  内容（`src/content/`）采用 **CC BY-NC-SA 4.0**（`src/content/LICENSE`）。
- 把 AGPL 代码并入并在网络上提供服务，需要按 AGPL 提供对应源码；发布构建产物时应保留
  `folia/LICENSE` 与署名说明。
- 如不希望承担 AGPL 义务，回滚方案是恢复自研可视化器或移除本功能。

## Risks & Mitigation

- **包体**：Pixi/three 均在 `React.lazy` chunk 中，不切换模式不加载。
- **无节拍分析**：上游智能动感/节拍特效保持中性值，画面仍有基础动画；后续可接分析器。
- **跨域音频**：不建立 Web Audio 图，避免 CORS 导致的静音。
- **上游版本漂移**：vendored 代码独立维护；升级时按运行时闭包重新复制并跑类型检查。
- **回滚**：删除 `player/folia/`、`visualizers/`、`VisualizerPlayer.tsx`，把 `MusicDetail`
  的联合类型恢复为两种；歌词解析层可保留。

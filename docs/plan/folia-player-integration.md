# Folia Player Integration 设计文档

## Background & Goals

- `/media/[id]` 播放器已经引用 Folia 上游的商籁 / 镜台运行时，但页面外壳仍是本项目自绘：
  背景只有一层纯色，没有 Folia 播放页的舞台背景与底部字幕。
- 用户要求把 Folia 的**背景**和**播放器页面**直接搬过来，并指出设置中心、命令面板、
  Lattice、智能过渡（automix）、模组、在线音乐 Provider 等上游模块“有用的都可以集成”。
- 本项目是 **Next.js 静态导出（`output: 'export'`）** 的个人站点：无后端、无账号体系、
  音源是静态媒体列表。这决定了哪些上游模块可以直接移植、哪些只能放弃或重写。

### 成功标准

- 播放页的视觉分层与 Folia 一致：**背景（backdrop）→ 歌词样式 → 底部字幕 → 控件**。
- 直接复用上游实现（AGPL-3.0）而不是重新演绎；新增的 vendored 代码带署名。
- 复杂子系统按阶段落地，每阶段可独立回滚。

## High-Level Design

```text
VisualizerPlayer
  ├─ FoliaBackdrop            // latent：mesh gradient + dithering（paper-shaders）
  │    └─ LatentBackground    // vendored，覆盖色驱动、暂停缓速
  ├─ Folia<Mode> 宿主（17 种歌词样式）
  │     商籁 镜台 倾诉 莫奈 凝彩 云阶 Mindscape Cappella Claddagh Luminous 雾笺 浮名
  │     花火 绘光 町景 时计 静止（+ 上游其余样式留待后续）
  │                                          // 透明背景叠在 backdrop 上
  ├─ FoliaSubtitle            // 当前行字幕（底部 112px，让位给展开的胶囊）
  ├─ header / footer 控件      // 现有胶囊（用户已逐项定制）
  └─ LyricTimeline            // 时间线面板（已实现）
```

- vendored 背景代码位于 `src/app/media/[id]/player/folia/backgrounds/`：
  `LatentBackground.tsx`、`useBlendedColors.ts`、`colorMix.ts`、`paperShaderContext.ts`、
  `paperShaderUniforms.ts`、`types.ts`（默认 tuning）。
- 背景色板复用播放器已有的封面取色（`extractThemeColors`），不再在组件内重复抽色。
- 上游 `VisualizerBackgroundTransition`（背景切换过渡）未移植：本播放器不切背景类型，
  颜色变化由 `useBlendedColors` 在 800ms 内渐变。

## Implementation Plan

### Stage 1: Shell backdrop — latent（已完成）

- **Files modified**: `player/folia/backgrounds/*`（新增）、`player/folia/FoliaBackdrop.tsx`（新增）、
  `player/styles/VisualizerPlayer.tsx`
- **Specific logic**:
  - `FoliaBackdrop` 用 `useAudioSignals` 提供（恒为 0 的）音频信号，`paused` 跟随播放状态。
  - `LatentBackground` 保持上游两套 paper shader（MeshGradient + Dithering）与全部 tuning 默认值
    （`displayMode: both`、`colorSource: cover-theme` 等）。
  - 依赖新增：`@paper-design/shaders-react@^0.0.80`。
  - 移除了应用级的部分：封面 URL 抽色（改为外部传入色板）、样式切换首帧上报、automix 进度联动。
- **Validation**: `tsc` / ESLint 通过；需在 dev 预览确认背景动效与暂停降速。

### Stage 2: Bottom subtitle（已完成）

- **Files modified**: `player/folia/FoliaSubtitle.tsx`（新增）、`player/styles/VisualizerPlayer.tsx`
- **Specific logic**:
  - 取当前行（或刚结束 8s 内的行），置于底部 112px（上游
    `playerBottomBarLayout` 的 32 + 80 基线），主题色 `secondaryColor` + 径向辉光 + 淡入淡出。
  - 胶囊展开 / 时间线打开时字幕淡出让位（对应上游 `yieldsToDock`）。
  - 未移植：翻译 / 音译多行布局、下一句预览、字幕字体设置（依赖上游字幕设置体系）。
- **Validation**: 类型与 ESLint 通过；预览确认字幕与胶囊不重叠。

### Stage 3: Player page chrome 保真（已完成）

- **Files**: `player/hooks/useIdleChrome.ts`（新增）、`player/styles/VisualizerPlayer.tsx`
- **Logic**:
  - 移植上游 `usePlayerChromeAutoHide` / `useIdleCursorHide` 的自动隐藏：指针空闲 3s 后
    header / footer / 字幕 / 光标一起淡出；移动、滚轮、按下、离开窗口即恢复；按住指针期间不隐藏。
  - 胶囊悬停/聚焦或时间线打开时不隐藏（对应上游「面板打开时不自动隐藏」）。
  - 隐藏时用 `inert` 让控件退出 Tab 序与命中测试，避免可聚焦到不可见按钮。
  - 触屏（无 hover）不启用，控件常驻。
- **Validation**: 鼠标静止 / 移动、键盘聚焦、触屏三种路径手动回归。

### Stage 4: Visualizer 共享契约与更多模式（进行中）

- **已完成：倾诉 Tilt**
  - **Files**: `player/folia/tilt/VisualizerTilt.tsx`、`player/folia/runtime.ts`、
    `player/folia/utils/lyrics/sentenceLayout.ts`、`player/folia/lineIndex.ts`、
    `player/folia/FoliaTilt.tsx`、`player/folia/types.ts`（TiltTuning）
  - **Logic**: Tilt 是纯 DOM + framer-motion 模式，不需要 canvas/Pixi。整体 vendor 上游
    `VisualizerTilt.tsx`，适配点仅有三处：去掉应用级 `VisualizerShell` / `VisualizerSubtitleOverlay` /
    i18n，外壳的字体解析与居中内联保留；props 改为宿主传入的当前时间、行号与主题；字幕由播放器
    已有的 `FoliaSubtitle` 统一负责。
  - 依赖新增：`@chenglou/pretext@^0.0.9`（上游同类目文字测量）；`sentenceLayout` 是上游 547 行的
    断行算法，原文复制，仅把 `LyricLayoutUnit` 类型内联（不引入 cjkSemanticLayout）。
  - `runtime.ts`（上游共享运行时助手）一并 vendor，后续模式复用。
  - `resolveLineIndex` 从 `FoliaDiorama` 提取到 `lineIndex.ts` 供两个宿主共用。
  - **Validation**: `tsc` / ESLint 通过；预览需对比 1–4 行断行、随机斜体行、逐字脉冲。
- **已完成：莫奈 Monet**
  - **Files**: `player/folia/monet/*`（12 个 vendored 文件）、`player/folia/FoliaMonet.tsx`、
    `player/folia/utils/lyrics/alternateText.ts`、`subtitleTrackStyle.ts`、
    `player/folia/utils/handoffProgress.ts`、`player/folia/useFontsEpoch.ts`、
    `player/folia/useElementWidth.ts`
  - **Logic**: 海报式版面（左歌词轨 / 右封面 / 底部音频条）整体 vendor；歌词栏的测量、扫字遮罩、
    逐字着色、手动滚动锚点、封面交叉淡化全部保留。适配点：
    - 去掉应用级 `VisualizerShell` / 字幕覆盖层 / 设置面板 / i18n / Tooltip 组件，外壳字体与居中内联。
    - 去掉 automix `songHandoff` 与设置存储 `onMonetTuningChange`；封面拖动位置只在当前挂载期存在。
    - `MonetFloatingDecor` 的 lucide 图标由本地 resolver 提供；预设主题的 `lyricsIcons`
      会渲染为漂浮图标。
    - 自定义封面（asset store）未移植，`portraitSource: 'custom'` 也回落到当前封面。
    - 点击歌词行 seek 接入播放器的 `seek()`。
  - 依赖复用：`@chenglou/pretext`（含 `rich-inline` 子入口）、`graphemeTiming`、`renderHints`、
    `estimatedLineTiming`、`textDirection`、`wordColoring`、`textMeasureCache`、`colorMix`、
    `lyricRenderQuality`。新增字幕轨道类型（`SubtitleContentMode` / `LyricAlternateText`）与
    `MonetTuning` 默认值；当前歌词无翻译数据，字幕轨为空。
  - **Validation**: `tsc` / ESLint 通过；预览需确认海报布局、歌词栏滚动/扫字、封面交叉淡化、
    底部音频条（音频信号恒为 0，走势由时间驱动）。
- **已完成：凝彩 Tempera**
  - **Files**: `player/folia/tempera/*`（32 个 vendored 运行时文件 + `compositions/` 15 个构图）、
    `player/folia/pixiSongSwap.ts`、`player/folia/FoliaTempera.tsx`、`player/folia/types.ts`
    （TemperaTuning / TemperaLayerImage）
  - **Logic**: Pixi 导演整体 vendor，含场景缓存、15 种构图、换歌切口、后处理滤镜链与墨闪效果。
    适配点：
    - 用 `FoliaSonnet` 式手动生命周期替换应用级 `useVisualizerPixiHost` /
      `useVisualizerSongCommit`：create → `swapSong`（歌词/色板异步到达时静默换歌）→
      `setTuning` / `setRenderScale` / `setPaused` / `setSongMetadata`，卸载时 destroy +
      AbortController；暂停时 `renderOnce` 仍随 seek 重绘。
    - 去掉应用级 `VisualizerShell` / 字幕覆盖层 / 设置面板 / i18n / tuning 存储；背景仍由播放器
      的 backdrop 提供，封面色板由播放器的 `palette` 直接传入（gradient 配色模式使用）。
    - 图层图片（IndexedDB asset store）不移植，`EMPTY_IMAGE_BLOBS` 使该路径始终为空。
    - automix song-handover 不移植；无歌词的曲目直接生成 60 个 ♪ block（上游同款虚拟歌词），
      导演照常有场景可切。
    - 依赖 stub：`services/analysis/drumHits.ts`（无鼓点分析）、`beatFxLive.getBeatFxHeard`
      与 `BEAT_EFFECT_IDS.temperaInkFlash`（墨闪强度恒 0，走非节奏反应路径）。
  - **Validation**: `tsc` / ESLint 通过；预览需确认 15 种构图轮换、换歌切口、暂停定格与后处理。
- **已完成：其余 10 种样式（云阶 / Mindscape / Cappella / Claddagh / Luminous / 雾笺 / 浮名 /
  花火 / 绘光 / 町景 / 时计 / 静止）**
  - 共同适配配方：保留上游运行时闭包原样，只拆应用级外壳 —— 本地 props 契约替代
    `VisualizerSharedProps`；去掉 `VisualizerShell`（就地内联字体包装）、`VisualizerSubtitleOverlay`
    （字幕统一由播放器的 `FoliaSubtitle` 提供）、设置面板 / i18n / 预览与首帧标记；分辨率挡位改为
    本地 `useMemo(resolveLyricRenderQuality(DEFAULT_LYRIC_RENDER_QUALITY, tuning.render))`；每个模式在
    `Folia<Mode>.tsx` 宿主里用 `useAudioSignals` + `resolveLineIndex` 驱动。
  - 共享基建：`GlowWord` 家族（云阶 / Luminous）、`songHandover.ts`、`pixi/pixiRuntimeHost.ts`
    （首帧钩子换成 `pixi/firstFrameStub.ts` 空实现）、`utils/themeColorMath.ts`、
    `utils/lyrics/{graphemeTiming,parserCore}`、`hooks/useLucideIcons.ts`、`tuningDefinition.numberWithin`、
    `services/analysis/{gpuActivity,vocalEnvelope}`、`stores/useVisualizerSettingsStore`（帧率固定 off、
    智能动感固定 off）与扩展后的 `services/beatFx/*`。
  - Cappella 的 Vite `import.meta.glob` 资源改为显式静态 import；雾笺 WebGL2 不可用时退回当前句文本；
    花火 / 绘光 / 町景按需加载各自的 Pixi/three 运行时；町景照旧接受拖拽取景（设置面板与取景条不移植，
    tuning 固定默认值）。
  - 因 Next 把 `text/`、`layout.ts` 视为路由特殊文件：`hanabi/text`、`lumiere/text` 更名为
    `textLayers`（`layout.ts` → `textLayout.ts`），Machi 三个场景的 `layout.ts` → `sceneLayout.ts`。
  - **Validation**: 每批模式 `tsc` / ESLint 通过；浏览器对比上游动效待预览确认。
- **待做**: 把全部模式接入统一 `definition.ts` / `registry.tsx` 契约（宿主 props 收敛后才有意义）。
- **Validation**: 每波模式单独类型检查 + 浏览器对比上游截图。

### Stage 5: Player settings 与 visualizer tuning（部分完成）

- **已完成**（`player/styles/PlayerSettingsPanel.tsx` + `player/hooks/usePlayerPrefs.ts`）：
  - 胶囊右侧新增设置入口，打开右侧玻璃面板；`Esc` / 背景点击 / 关闭按钮退出。
  - 设置项：歌词样式（商籁/镜台，原顶部开关移入面板）、背景显示模式（网格+颗粒 / 仅网格 /
    仅颗粒）、背景动效开关、底部字幕开关、空闲自动隐藏开关。
  - 偏好写入 `localStorage['folia-player-prefs']`，读取时逐项校验，非法值回落默认。
  - 背景 tuning 对象用 `useMemo` 稳定，避免每次播放时间更新都重启 shader 帧循环。
- **待做**：商籁/镜台的逐项 tuning（字号、辉光、粒子密度等）——需要把 tuning 传入各 host，
  并核对上游默认范围。
- **Validation**: 类型与 ESLint 通过；修改项即时生效、刷新保留由预览确认。

### Stage 6: 智能过渡（crossfade 模式已完成，automix 分析暂缓）

- **已完成：等功率交叉淡化**（`player/playback/`，详见 `docs/plan/folia-smart-transition.md`）。
  - 两个常驻 `<audio>` deck 提升到 `app/media/layout.tsx`，歌曲间路由切换不再卸载音频。
  - 每路 `MediaElementSource → GainNode`，交叉点各 -3 dB（`equalPowerGains`）；元素音量保持 1，
    兼容 iOS Safari 的只读 `volume`。
  - 自动连播且开启「智能过渡」时，在曲末 `N` 秒（默认 5，可调 1–12）启动；待机 deck 预载下一首，
    以自身 `currentTime` 为时钟，暂停/恢复不跳变；手动切歌、拖动进度、关闭开关都会取消并归零。
  - 设置面板新增开关与时长滑杆，偏好持久化到 `localStorage['folia-player-prefs']`。
  - 关闭过渡时保留原有「10 秒提示 + 到点硬切」行为。
- **暂缓：automix 分析**。上游是完整音频分析系统：拍点（beat_this）+ 四轨分离（htdemucs）两个
  WebGPU / MNN 模型（安装包内共 **133 MB**）、分析 worker、Web Audio 采样级调度与乐理决策层。
  - 移植前提：音频源允许 CORS 读取并解码（当前音源为跨域静态文件）；模型与 WGSL kernel
    需要作为静态资源分发；站点包体与首屏预算会显著上升。
  - **结论**：不是“顺手集成”的量级；如需做，应单独立项（模型分发 → 分析层 → 过渡执行 → UI）。

### Stage 7: 设置中心 / 命令面板 / Lattice / 速记簿（暂缓）

- 这些模块都建立在上游的应用状态层（播放队列、Provider、收藏、UI store、i18n）之上，
  代码量以万行计。静态个人站没有对应业务模型，硬搬会引入大量死代码。
- 建议：保留本项目自己的页面结构；只挑选纯 UI/纯算法组件（如拼贴布局、命令匹配）按需重做。

### Stage 8: Provider / 本地库 / 模组 / Electron 能力（不适用）

- Navidrome / 网易云 / 在线 Provider 需要账号、后端与 CORS 代理；静态导出站点无法承载。
- 模组系统依赖 Electron 主进程与 `electron/modSystem`。
- 音频转码回退、壁纸模式（macOS / Windows wallpaper controller）是 Electron 原生能力。
- **结论**：这些不属于 Web 端可移植范围，明确不集成。

## Testing Strategy

- Happy path：播放 / 暂停背景降速与恢复；切歌背景色渐变；字幕随行切换；胶囊展开字幕让位。
- Error path：封面取色失败时背景保持主题深色底线；WebGL 不可用时 paper shader 不渲染，
  仍显示主题底色；无歌词时不渲染字幕与背景之外的可视化器。
- Regression：时间线、上/下一首、自动播放、全屏、移动端（无 hover）控件展开。

## Risks & Mitigation

- **性能**：两个全屏 paper shader 在低端设备可能掉帧；`MAX_SHADER_PIXELS` 已限制到 1280×720，
  必要时可在 Stage 3 增加“静态背景”开关。
- **包体**：paper-shaders 进入播放页 lazy 路径；不打开播放页不加载。
- **上游漂移**：vendored 代码独立维护，升级时按闭包重新复制并跑类型检查。
- **回滚**：删除 `folia/backgrounds/`、`FoliaBackdrop.tsx`、`FoliaSubtitle.tsx`，恢复
  `VisualizerPlayer` 的纯色舞台即可；其余阶段互不依赖。

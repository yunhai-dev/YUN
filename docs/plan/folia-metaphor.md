# Folia 隐喻（Metaphor）样式移植

## 目标与验收标准

- 把上游 Folia `0.7.28 → 0.8.2` 新增的歌词样式 **隐喻 Metaphor** 移植到本站播放器。
- 验收：
  - 播放页样式面板出现「隐喻」，选择后进入 three.js 墨场画面；刷新后仍记住该样式。
  - 歌词随播放逐字显影，切歌/换主题/暂停/拖动进度都正常，暂停时不空转 rAF。
  - 无 WebGL 或运行时创建失败时回落到当前歌词文本，播放器不崩溃。
  - `npx tsc --noEmit`、针对改动文件的 ESLint、生产构建通过。
- 不在范围内：上游的样式设置面板、i18n、样式切换过渡、智能动感分析引擎、Folium 模组系统。

## 上游版本差异

基线 `0.7.28`。`0.8.2` 新增的视觉样式只有 `metaphor`；现有样式的修复另见 `docs/plan/folia-0.8.2-visual-fixes.md`。本次先移植新样式，避免把无关应用层重构带进来。

## 涉及模块与数据流

```text
audio element ──useAudioSignals──> currentTime / audioPower (MotionValue)
lyrics ──adapters.toFoliaLines──> Line[] ──resolveLineIndex──> currentLineIndex
Theme ──toFoliaTheme──> Theme ──createMetaphorRuntime──> 分镜 / 排版 / 墨场 / 显影
```

## 阶段

### Stage 1: Vendor `metaphor/*`

- 文件：`src/app/media/[id]/player/folia/metaphor/*`
- 动作：复制上游 `0.8.2` 的运行时闭包（`createMetaphorRuntime`、`metaphorCamera/Layout/Shapes/Figures/Glyphs/Palette/Program/Shaders/BeatFx/types`）。
- 适配：
  - import 路径改到本站 vendored 目录。
  - `import.meta.env.DEV` 改为 `process.env.NODE_ENV !== 'production'`。
  - 丢弃 `entry.tsx`、`tuning.ts`、`MetaphorSettingsPanel.tsx`（依赖上游注册表、i18n 和设置 UI）。
- 补齐 `utils/whenIdle.ts`；`BEAT_EFFECT_IDS` 增加 `metaphorAnnihilation`（节拍分析仍为空桩，效果保持静止）。
- 验证：`npx tsc --noEmit`。

### Stage 2: Host

- 文件：`src/app/media/[id]/player/folia/FoliaMetaphor.tsx`
- 动作：按现有 host 模式接音频信号、行索引、`DEFAULT_METAPHOR_TUNING`，用 `useVisualizerPixiHost` 管理运行时生命周期；WebGL 上下文丢失时重建；运行时失败显示当前行文本。
- 验证：类型检查；交互需浏览器手动确认。

### Stage 3: 播放器接线

- 文件：
  - `player/visualizers/types.ts`：`VisualizerMode` 加 `metaphor`
  - `player/styles/VisualizerPlayer.tsx`：lazy host、标签「隐喻」、恢复 localStorage 值、渲染分支
  - `player/styles/PlayerSettingsPanel.tsx`：样式列表加「隐喻」
- 验证：类型检查 + ESLint。

### Stage 4: 文档与许可

- 更新 `folia/NOTICE.md` 的上游版本到 `0.8.2`，记录隐喻的移植与裁剪。
- 更新 `docs/IMPLEMENTATION_PLAN.md` 索引。

## 测试策略

- 正常：选择隐喻，歌词逐字出现；切歌、切主题、暂停/继续、拖动进度。
- 异常：WebGL 不可用（禁用硬件加速）显示文本回落；无歌词时只显示背景与占位提示。
- 回归：其他 17 种样式仍可切换；设置面板布局不溢出。

## 风险与回滚

- three `0.167` 与上游 `0.185` 的少量 API 差异：若 `WebGLRenderTarget.count` 等不可用，改为两遍渲染或升级 three；移植独立成目录，回滚只需移除样式入口。
- AGPL：新增代码沿用上游 AGPL-3.0，根 LICENSE 已兼容；发布时保留 `folia/LICENSE` 与 NOTICE。

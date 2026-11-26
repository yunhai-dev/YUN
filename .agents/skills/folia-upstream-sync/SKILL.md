---
name: folia-upstream-sync
description: 同步上游 Folia（chthollyphile/folia-major）的视觉样式与修复到 YUN 站 vendored 的 `src/app/media/[id]/player/folia/`。当用户要求「跟进 folium/folia 的新效果」「移植歌词样式」「同步上游视觉修复」时使用。覆盖版本盘点、运行时闭包裁剪、host 接线、滤镜修复适配、静态验证与文档提交。
---

# Folia 上游同步（YUN）

本站的歌词播放器运行时全部 vendored 在：

```
src/app/media/[id]/player/folia/
```

上游：`https://github.com/chthollyphile/folia-major`（AGPL-3.0）。
当前版本、裁剪说明、已应用修复都记在 `folia/NOTICE.md`，**先读它**。

## 1. 盘点：先决定「新样式」还是「修复」

```bash
ROOT=$(git rev-parse --show-toplevel)          # 在 YUN 仓库里执行
cd /tmp
rm -rf folia-upstream
git clone --depth 1 https://github.com/chthollyphile/folia-major.git folia-upstream
cd folia-upstream

# NOTICE 里的基线版本，例如 0.7.28
BASE=$(sed -n 's/^- Version: //p' "$ROOT/src/app/media/[id]/player/folia/NOTICE.md" | head -1)
TARGET=$(jq -r .version package.json)

git fetch --tags origin
git fetch --unshallow origin 2>/dev/null || true
git diff --stat "v$BASE" "v$TARGET" -- src/components/visualizer src/types/visualizerModes.ts src/services/beatFx
git diff --name-status "v$BASE" "v$TARGET" -- src/components/visualizer
git log --oneline "v$BASE..v$TARGET" --no-merges -- src/components/visualizer
```

分类规则：

| 上游变化 | 处理 |
| --- | --- |
| 新增样式目录（`visualizerModes.ts` 多一个 id） | 移植，见 §2 |
| 现有样式的滤镜、布局、资源修复 | 移植，见 §3 |
| `VisualizerShell` / `usePlayerChrome` / settings / i18n / mods / analysis 引擎 | 不移植，本站有本地外壳与空桩 |
| `colorMix`、`textMeasureCache` 等仅改 import 路径 | 不移植，本站路径已固定 |
| 新背景模式 | 若 `backgrounds/definition.ts` 增加 id 才需要处理 |
| 新节拍效果 id | 仅当本地运行时引用时补进 `services/beatFx/beatEffects.ts` |

同时确认上游 `BUILTIN_VISUALIZER_MODES` 与本站 `player/visualizers/types.ts` 的差集；本地样式数应逐步对齐。

## 2. 移植新样式

### 2.1 裁剪运行时闭包

只复制运行时需要的文件，**不要**复制：

- `entry.tsx`（注册表、命令面板、tuning 定义）
- `*SettingsPanel.tsx`（设置 UI、i18n）
- `tuning.ts`（依赖上游 tuning registry）
- `visualizer/definition.ts`、`VisualizerShell.tsx`、`VisualizerSubtitleOverlay.tsx`、`songHandover.ts` 的应用层用法

复制到 `folia/<mode>/`，保留上游文件内的中文设计注释。

### 2.2 重写 import

上游从 `src/components/visualizer/<mode>/` 出发的相对路径，落到本站 `folia/<mode>/` 后整体上移一层：

```text
../../../types              -> ../types
../../../utils/*            -> ../utils/*
../../../services/*         -> ../services/*
../visualizerSeedHash       -> ../visualizerSeedHash
../wordColoring             -> ../wordColoring
../colorMix                 -> ../colorMix        # 本站共享色值工具在 folia/colorMix.ts
```

其他适配：

- `import.meta.env.DEV` → `process.env.NODE_ENV !== 'production'`（Next.js 没有 Vite env）。
- 上游 `whenIdle.ts` 若本地缺失，从 `src/utils/whenIdle.ts` 原样补到 `folia/utils/whenIdle.ts`。
- `react-i18next` / `react-dom/server` / `import.meta.glob` 一律去掉或换成静态实现。
- 上游把 `text/`、`layout.ts` 当普通目录/文件；Next.js 会当成特殊路由，改名：
  - `text/` → `textLayers/`
  - `layout.ts` → `textLayout.ts` / `sceneLayout.ts`

### 2.3 Host 约定

新建 `folia/Folia<Mode>.tsx`，照抄现有 host 的形状：

- props：`audioRef`、`lines`、`theme`、`seed`、`songTitle`、`isPlaying`（按需精简）。
- 音频桥：`useAudioSignals(audioRef)` 取 `currentTime` / `audioPower`。
- 当前行：`resolveLineIndex(lines, time)`，只在索引变化时 `setState`。
- 生命周期：Pixi/three 运行时用 `useVisualizerPixiHost`，`rebuildKey` 只放真正需要新上下文的输入（`currentTime`、`audioPower`、`contextEpoch`）；歌曲/主题/暂停/seek 就地推给运行时。
- 失败回退：`onFailedChange` → 渲染当前行文本；不要留空白舞台。
- **静态 import 运行时**。`Folia<Mode>` 已在 `VisualizerPlayer` 里 `React.lazy`，再写 `await import()` 只会增加一层无意义边界。
- 暂停时 `currentTime.on('change')` 调 `requestFrame()`，否则拖进度不重绘。

### 2.4 播放器接线（四处都要）

1. `player/visualizers/types.ts`：`VisualizerMode` 加 id。
2. `player/styles/VisualizerPlayer.tsx`：
   - `lazy(() => import('../folia/Folia<Mode>'))`
   - `MODE_LABELS` 加中文名
   - `localStorage.getItem('visualizer-mode')` 的合法值判断加 id
   - 渲染分支加 `<Folia<Mode> … />`
3. `player/styles/PlayerSettingsPanel.tsx`：`STYLE_OPTIONS` 加条目。
4. `folia/NOTICE.md`：更新版本、记录裁剪与新增文件。

## 3. 移植现有样式修复

逐文件 `git diff`，只取与视觉行为相关的 hunk。本站路径映射同 §2.2。常见修复类型：

### Pixi 滤镜分辨率与抗锯齿

上游约定：

- 场景滤镜（`Filter`）跟随画布：`filter.resolution = 'inherit'`。
- 辉光 / 转场模糊 / 直通滤镜跟随画布 MSAA：`filter.antialias = 'inherit'`。
- Pixi 的 `FilterAntialias` 是 `'on' | 'off' | 'inherit'`；`Filter.antialias` 还可接 boolean。
- 一个容器上的滤镜按**最低分辨率**和**是否全部开启抗锯齿**合成一次 pass，因此同一链上的滤镜必须同意。
- 转场/片尾模糊用画布分辨率的份额，不要写死 `0.5` / `0.75`：`resolution = renderer.resolution * share`。

Sonnet 的具体结构：

- `SonnetRuntimeOptions` 增加 `antialiasMode: LyricAntialias`；host 从 tuning 的 `render.antialias` 得出 `'auto' | 'on' | 'off'`。
- `SonnetSceneBuildOptions` 增加 `renderResolution`、`antialiasMode`。
- `SceneView.filterAntialias` 由 `resolveSonnetSceneFilterAntialias(mode, hasPostProcessChain)` 决定。
- `sonnetGlitchFilter` 的分带/位移按 `uInputSize` / `uOutputFrame` 视口归一化。
- `sonnetPrintFilters` 的半调网点按 CSS 像素排布（`uInputPixel` / `uInputSize` 求 density）。
- `sonnetOutroBlur.update(scene, strength, renderResolution)`。

Hanabi / Lumiere：

- 全屏 bloom、图层 `BlurFilter`、`AlphaFilter` 都设 `antialias = 'inherit'`。
- 烟花层的局部 bloom 不设：滤镜区域随包围盒变，每种尺寸都会多一份多重采样缓冲。

### Monet 资源与排版

- 封面除 `blob:` / `data:` 外都设 `crossOrigin = 'anonymous'`，否则 worker 读像素会抛 `SecurityError`。
- 出图失败不要缓存 `null`：从 `monetBackgroundCache` 删除，下次请求重试，并打 `[MonetBackground]` 日志。
- `line-clamp` 元素的 `text-shadow` 会被自身裁切框切成直角：阴影移到外层不裁切包裹元素的 `filter: drop-shadow`，模糊值约为原 `text-shadow` 的一半。

## 4. 验证

```bash
cd "$(git rev-parse --show-toplevel)"

# 1) 类型检查。out/ 里可能有旧构建产物报错，只看 src/。
npx tsc --noEmit --incremental false 2>&1 | rg '^src/' || echo 'src clean'

# 2) 只 lint 改动文件。Sonnet 目录有历史 no-explicit-any，先确认不是本次引入。
npx eslint <changed files>

# 对历史报错做基线确认：
git show HEAD:"path/to/file.ts" | npx eslint --stdin --stdin-filename "path/to/file.ts"

# 3) 生产构建（静态导出 + sitemap）。
npm run build
```

浏览器视觉验证不在自动检查内：高 DPI 转场、片尾海报、Monet 长标题/CORS 封面需要用户手动确认。交付时明确写「未验证」。

## 5. 文档与提交

- `docs/IMPLEMENTATION_PLAN.md` 只加索引条目，链到详细计划。
- 详细计划写 `docs/plan/folia-<feature>.md`：目标、上游提交号、阶段、验证、风险与回滚。
- `folia/NOTICE.md` 更新版本与修改清单；AGPL 源码义务要求保留 `LICENSE` 与 NOTICE。
- 提交只纳入本次改动；不要提交 `out/`、`.next/`、临时 clone。
- commit message 用仓库惯例：`feat(player): …` / `fix(player): …`，正文列出样式与修复。

## 6. Definition of Done

- [ ] 上游 diff 已分类，明确哪些不移植及原因。
- [ ] 新模式可在设置面板选择、刷新后记住；失败时有文本回退。
- [ ] 修复按文件落地，未把上游应用层壳/设置/i18n/mods 带进来。
- [ ] `src/` 类型检查、改动文件 ESLint、`npm run build` 通过。
- [ ] `NOTICE.md`、实现索引、详细计划同步。
- [ ] 交付说明写清已验证与未验证项。

## 7. 坑位速查

- `out/_next/...` 会被根 `tsconfig` 的 `**/*.ts` 扫到；这是历史产物，不是本次错误。
- 不要为了通过 lint 去改 Sonnet 里历史的 `any`；确认基线后保持范围。
- 不要给 `Folia<Mode>` 再加动态 import；外层已经是 lazy。
- 不要把 `Filter.resolution` 写成固定 `0.5` / `1`：高 DPI 下会被拉伸。
- 不要把 `process.env.NODE_ENV` 写成 `import.meta.env`。
- 不要把 `text/`、`layout.ts` 原样放进 `src/app/`。
- 上游 `three` 版本（约 0.185）与本站（0.167）不同；用到的 `WebGLRenderTarget.count` 等 API 0.167 已支持，新增 API 先查 `node_modules/three`。
- 本地播放器没有全局歌词画质设置：tuning 的 `render.antialias='global'` 按 `'auto'` 处理，`render.scale='global'` 按 `1` 处理。

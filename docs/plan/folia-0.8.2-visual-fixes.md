# Folia 0.8.2 视觉修复移植

## 目标与验收标准

- 把上游 `0.7.28 → 0.8.2` 中适用于本站的视觉修复同步到 vendored 代码：
  - Sonnet / Hanabi / Lumiere 的场景滤镜跟随画布分辨率与抗锯齿。
  - Sonnet 撕裂条带与半调网点按视口/CSS 像素排布，不随池纹理尺寸变化。
  - Sonnet 片尾模糊与转场模糊按画布分辨率取值。
  - Monet 歌名阴影不再被 `line-clamp` 裁成直角。
  - Monet 封面的 CORS 加载与失败缓存修正。
- 验收：`npx tsc --noEmit`、改动文件 ESLint、`npm run build` 通过；高 DPI 与转场/片尾画面需浏览器手动确认。

## 上游提交

- `44c384895` fix(visualizer): Sonnet、花火、绘光的滤镜跟随画布的分辨率与抗锯齿
- `8b9099526` fix(visualizer): Sonnet 场景滤镜按抗锯齿设置本身取值，撕裂条带不随分辨率变
- `ab852b02c` fix(monet): 歌名阴影不再被自己的裁切框切成直角
- `08c5df5c2` fix(monet): 本地歌曲启动后第一首的莫奈背景不再停在原图

## 阶段

### Stage 1: Sonnet 滤镜

- 文件：`sonnet/createSonnetPixiRuntime.ts`、`sonnet/sonnetSceneBuilder.ts`、`sonnet/sonnetGlitchFilter.ts`、`sonnet/sonnetPrintFilters.ts`、`sonnet/sonnetOutroBlur.ts`、`FoliaSonnet.tsx`
- 逻辑：
  - 运行时 options 增加 `antialiasMode`（`auto | on | off`），由 host 从 tuning 的 `render.antialias` 得出。
  - 场景构建接收 `renderResolution` 与 `antialiasMode`；场景滤镜 `resolution = 'inherit'`，抗锯齿按 `resolveSonnetSceneFilterAntialias` 统一。
  - 转场模糊分辨率 = 画布分辨率 × 0.5；片尾模糊 × 0.75；两者抗锯齿与场景链一致。
  - 撕裂滤镜的分带和位移按视口归一化；半调网点按 CSS 像素排布。
- 验证：类型检查；高 DPI 下转场/片尾无锯齿、撕裂条带数量不随分辨率变化。

### Stage 2: Hanabi / Lumiere 滤镜

- 文件：`hanabi/createHanabiPixiRuntime.ts`、`hanabi/hanabiSceneEntry.ts`、`lumiere/createLumierePixiRuntime.ts`、`lumiere/lumiereSceneEntry.ts`、`lumiere/credits.ts`、`lumiere/scene.ts`
- 逻辑：全屏辉光、图层转场模糊、绘光图形/文字组辉光与直通滤镜设 `antialias = 'inherit'`。
- 验证：画布开 MSAA 时滤镜组不再退回无抗锯齿。

### Stage 3: Monet

- 文件：`monet/VisualizerMonet.tsx`、`backgrounds/monet/monetBackgroundPipeline.ts`
- 逻辑：
  - 歌名阴影改为外层包裹元素的 `filter: drop-shadow`，模糊 18px 等价旧的 36px `text-shadow`。
  - 封面除 `blob:` / `data:` 外都设置 `crossOrigin`；出图失败不写入缓存，并输出日志。
- 验证：长歌名阴影柔和且不被裁切；远端封面出图失败后再次请求会重试。

## 测试策略

- 正常：Sonnet 转场、片尾海报、Hanabi 辉光、Lumiere 光晕、Monet 长标题与远端封面。
- 异常：封面 CORS 失败时回退原图并可在下次重试；WebGL 不可用行为不变。
- 回归：其他样式与背景不受影响；滤镜销毁/重建无泄漏。

## 风险与回滚

- Pixi `'inherit'` 需要 `pixi.js ^8.23`，本项目已满足。
- 滤镜分辨率改为跟随画布会增加显存占用（Sonnet 默认 1.5× 下约 32–130 MB，取决于抗锯齿设置）；若低端设备掉帧，可回滚为固定分辨率。
- 全部改动按文件独立，回滚可逐样式进行。

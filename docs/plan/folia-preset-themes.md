# Folia 预设歌词主题设计文档

## Background & Goals

上游 Folia 的「主题」是一份按歌生成的完整数据（`player/folia/types.ts` 的 `Theme`）：名称、
描述、6 色色板、字体、动画强度、关键词着色（`wordColors`）、Lucide 主题图标
（`lyricsIcons`）与来源（`provider`）。17 种歌词样式与 6 种背景层都在消费这些字段。

移植早期只实现了「封面取色」：`folia/adapters.ts` 的 `toFoliaTheme(palette)` 把 6 色映射
为背景/强调/次色，其余字段写死。结果 `wordColors`、`lyricsIcons`、`description` 全是休眠
代码：关键词不上色、图标粒子不渲染、商籁片尾没有主题名、町景店招永远显示歌名。

本站曲库内建（`src/data/media.ts`，208 首），不需要运行时 AI 生成。目标：

- 为每首歌随数据发布一份完整预设主题；
- 主题解析层（Lucide 图标）从空桩补成真实实现；
- 主题数据由并行子代理分批拟写，主会话负责契约、合并与校验。

### 成功标准

- 208 首全部有主题；切歌时配色、字体、动画强度、关键词颜色随主题变化。
- 商籁片尾显示 `[ THEME ] 名称` 与描述；町景便利店招牌显示主题名。
- 绘光/花火/町景/莫奈/几何背景出现主题图标，首次加载不闪错。
- 无预设主题的曲目（未来新增）回退到封面取色，行为不变。

## High-Level Design

```text
src/data/media.ts (208 MediaItem)
        │  id
        ▼
src/data/mediaThemes/                 ← 每首歌一份 MediaThemePreset（batch-01..10）
  iconNames.ts   THEME_ICON_NAMES / ThemeIconName（37 个 PascalCase）
  types.ts       MediaThemePreset（lyricsIcons 收窄为词表）
  index.ts       mediaThemes / getMediaTheme(id)
        │
        ▼
player/styles/VisualizerPlayer.tsx    presetTheme = getMediaTheme(id)
  palette = presetTheme.palette       ← 命中预设时不再抽封面
        │
        ▼
player/folia/adapters.ts
  toFoliaTheme(palette, preset) → Theme（provider: 'preset'）
        │
        ├─ 17 种歌词样式：wordColors / lyricsIcons / fontStyle / animationIntensity
        ├─ FoliaBackdrop：6 色色板
        └─ 町景店招：provider === 'AI' || 'preset'
                │
                ▼
player/folia/services/lucideIconResolver.ts
  静态深层导入表 → __iconNode / LucideIcon
        ├─ sonnet/sonnetIcons.ts：__iconNode → SVG data URL（Pixi 纹理）
        ├─ monet/MonetFloatingDecor.tsx：漂浮图标
        └─ geometric / hanabi / machi / nebbia / lumiere / pendolo
```

### 关键决策

- **图标名 PascalCase**：视觉器按名比较与解析，必须与 lucide-react 的导出名一致；类型层用
  `ThemeIconName` 把错名挡在编译期。
- **静态 37 项目录**：只动态导入词表内的图标模块；`dynamicIconImports` 会产出近 2000 个
  chunk。深层路径 `lucide-react/dist/esm/icons/<kebab>.js` 无类型声明，用 ambient 模块声明
  补足；`lucide-react` 固定精确版本，防止内部路径漂移。
- **商籁 SVG 手工序列化**：上游用 `react-dom/server` 渲染，Next.js 客户端不允许；改为遍历
  `__iconNode` 拼 SVG，`encodeURIComponent` 生成 data URL，`stroke-width` 按
  `strokeWidth * 24 / size` 保持视觉粗细。
- **预设优先**：命中 `getMediaTheme(id)` 时完全跳过封面取色与下一首色板预取；未命中时保留
  原链路，便于未来新增曲目。

## Implementation Plan

### Stage 1: 数据模型与词表

- **Files**: `src/types/media.ts`、`src/data/mediaThemes/iconNames.ts`、
  `src/data/mediaThemes/types.ts`、`src/data/mediaThemes/index.ts`
- **Logic**: `MediaTheme`（8 个字段，无 `provider`）；`THEME_ICON_NAMES` 37 个 PascalCase；
  `MediaThemePreset = Omit<MediaTheme,'lyricsIcons'> & {lyricsIcons: ThemeIconName[]}`；
  `getMediaTheme(id?)`。
- **Validation**: `tsc` 能拒绝越界图标名；index 合并 10 个 batch。

### Stage 2: 主题数据（10 批并行）

- **Files**: `src/data/mediaThemes/batch-01.ts` … `batch-10.ts`
- **Logic**: 208 首按 `media.ts` 声明顺序切 9×21 + 1×19；每批一个子代理，只写自己的文件。
  作者手册：色板深→亮、强调色对比度 ≥ 3:1；关键词必须真实出现在 LRC；图标 ⊆ 词表；
  名称 2–6 汉字、描述 12–24 汉字；不写 `provider`。
- **Validation**: `scripts/validate-media-themes.mjs` 检查覆盖、格式、对比度、图标词表。

### Stage 3: 适配器与播放器接线

- **Files**: `folia/adapters.ts`、`styles/VisualizerPlayer.tsx`、
  `hooks/useAudio.ts`、`backgrounds/common/FluidBackground.tsx`
- **Logic**: `toFoliaTheme(palette, preset)` 合并预设字段，`accentColor = palette[4]`；
  `VisualizerPlayer` 拆出 `coverPalette`，预设命中时跳过 `loadPalette`；`useAudio` 只为
  无预设的下一首预取色板；`FluidBackground` memo 补 `accentColor`。
- **Validation**: 切歌触发主题对象更新；非预设路径仍走封面取色。

### Stage 4: Lucide 图标解析与商籁纹理

- **Files**: `src/types/lucide-deep-imports.d.ts`、`services/lucideIconResolver.ts`、
  `sonnet/sonnetIcons.ts`
- **Logic**: 37 项静态加载表 + `modules/pending/listeners/revision`；`loadLucideIcons` 过滤
  词表；`resolveLucideIcon(Node)` 同步取已加载模块；`loadSonnetIconNames` 加载后返回可用名；
  `buildSonnetIconDataUrl` 手工序列化并缓存。
- **Validation**: `getLucideIconStatus` 三态正确；data URL 在 Pixi 中可解码。

### Stage 5: 启用休眠视觉层

- **Files**: `monet/MonetFloatingDecor.tsx`、`machi/scenes/konbini/konbiniSigns.ts`、
  `machi/scenes/konbini/konbiniScene.ts`、`folia/types.ts`（注释）
- **Logic**: Monet 用 `useLucideIcons` + `resolveLucideIcon` 渲染漂浮图标；町景 3 处
  provider 判断接受 `'AI'` 或 `'preset'`。
- **Validation**: 预设主题名出现在店招；未加载图标时该槽位为空。

## 实现记录（2026-11-13）

**落地文件**

- 数据：`src/types/media.ts`（`MediaTheme`）、`src/data/mediaThemes/{iconNames,types,index}.ts`、
  `batch-01..10.ts`（9×21 + 1×19，共 208 首）。
- 接线：`folia/adapters.ts`、`styles/VisualizerPlayer.tsx`、`hooks/useAudio.ts`、
  `backgrounds/common/FluidBackground.tsx`。
- 图标：`src/types/lucide-deep-imports.d.ts`、`services/lucideIconResolver.ts`、
  `sonnet/sonnetIcons.ts`、`monet/MonetFloatingDecor.tsx`。
- 店招：`machi/scenes/konbini/konbiniSigns.ts`、`konbiniScene.ts`。
- 校验：`scripts/validate-media-themes.mjs`（保留，可重复运行）。

**与设计的偏差 / 调整**

- `MediaTheme` 不含 `provider`；适配器统一写 `'preset'`，避免数据层重复。
- 图标名以 PascalCase 存取；resolver 用 37 项静态深层导入表，`lucide-react` 固定为
  `0.560.0`（深层路径属内部结构）。
- 商籁 SVG 序列化会过滤 lucide `__iconNode` 里的 React `key` 属性，只输出 SVG 属性。
- `MonetFloatingDecor` 复用 `useLucideIcons`，未加载的槽位留空。
- 黄金样例《盈诗月影》由主会话先手写，用于打通链路；其余 207 首由 10 个并行子代理按批
  拟写，每批只写自己的文件。
- “关键词必须出现在 LRC”由一次性脚本对 208 首全量核对（英文按小写整词，`Angel` 命中
  `angel`），全部通过；校验脚本本身离线运行。

**验证**

- `node scripts/validate-media-themes.mjs` → `✓ 208/208 themes, 37 icon names, all checks passed`
- `npx tsc --noEmit` → 通过
- `npx eslint`（全部改动文件 + 10 个 batch）→ 通过（`FluidBackground` 的两条既有
  `<img>` 警告不属于本次改动）
- 全量 LRC 关键词核对 → `checked=208 bad=0 fetchFail=0`
- 主题统计：无重复色板；字体 109 serif / 98 sans / 1 mono；动画 109 calm / 87 normal /
  12 chaotic；色板亮度无逆序。
- 按用户要求未运行 `npm run build`、未启动开发服务器/浏览器；视觉效果待用户在开发环境确认。

## Testing Strategy

**静态**

- `node scripts/validate-media-themes.mjs`：208 首全覆盖、字段合法、图标 ∈ 词表、
  颜色与强调色对比度 ≥ 3:1。
- `npx tsc --noEmit`
- `npx eslint`（全部改动文件）

**手动（开发服务器，用户执行）**

- 任选 3 首不同歌手/情绪的歌，切换 17 种样式：配色、字体、动画强度符合预设。
- 关键词着色随歌曲更新；商籁片尾显示 `[ THEME ] 名称` 与描述。
- 町景店招显示主题名；绘光/花火/町景/莫奈/几何背景出现主题图标。
- 切歌与设置面板开关不触发视觉器反复重算；`prefers-reduced-motion`、URL 背景、
  无歌词占位路径不受影响。

**回归**

- 无预设曲目（可临时移除一条）仍按封面取色渲染。
- 交叉淡化 + 视觉交接仍正常（主题切换不阻塞 350ms 视图过渡）。

## Risks & Mitigation

- **深层导入是 lucide 内部结构**：升级可能改动路径。已把 `lucide-react` 固定到精确版本；
  校验脚本检查全部 37 个模块文件存在。
- **子代理数据质量**：契约由校验脚本兜底（覆盖、格式、对比度、图标词表）；LRC 抓取失败
  的曲目在回报中列出，主会话复核关键词。
- **包体积**：208 条主题约 60–80KB 原始（~20KB gzip），随播放器 chunk 进入客户端；曲库
  继续增长时再按 batch 动态导入。
- **首帧图标**：`loading` 返回 null/占位，图标到达后 revision 触发重渲染，不闪错。
- **回滚**：删除 `src/data/mediaThemes/`，恢复 `toFoliaTheme` 单参签名与 resolver 桩即可；
  `provider:'preset'` 只影响店招文案。

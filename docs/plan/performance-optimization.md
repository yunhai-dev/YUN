# 前端性能优化 Design Document

## Background & Goals

审计发现的问题（基于 `out/` 产物的实测 gzip 体积）：

- 博客/文档页无条件加载 mermaid + dagre + rough（≈180KB gzip），即使文章没有图表。
- 根布局静态引入 `@mediapipe/tasks-vision`（≈47KB gzip），全站每页都下载。
- 搜索索引把 160 篇博客 + 49 篇文档的完整 markdown 写进 `index.json`（4.4MB），首开菜单时主线程解析并建 MiniSearch。
- 首页 `ScrollSmoother.onUpdate` 每帧 `setScrollProgress` → 复制 store 状态 → 所有订阅组件重渲染。
- storytelling 的 GSAP/ScrollSmoother/shared CSS 被打进所有路由。
- `Noto_Sans_SC` 全站未被引用，却生成 304 条 `@font-face`；serif 声明了 4 个字重。
- 首页 mount 即拉取 1.7MB BGM；Case 页每帧新建 canvas 渐变且隐藏标签页不暂停。

目标：非 storytelling 页面 JS ≤ 300KB gzip、CSS ≤ 110KB gzip；搜索索引 ≤ 300KB；滚动期间首页不产生 React 重渲染；不改变现有视觉与 URL。

## High-Level Design

- **按路由拆 bundle**：`/`、`/cases/*`、`/contacts` 移入 `src/app/(storytelling)` route group，由其 layout 挂载 `NoomoExperienceShell`；根布局只保留全站组件。
- **能力按需加载**：mermaid、mediapipe、html2canvas、docx、shiki、streamdown 改为触发时 `import()`；搜索索引在命令面板打开时才加载。
- **帧数据与 React 解耦**：`noomo-store` 新增 `onFrame` 通道，scrollProgress/scrollSpeed/transition/crystal 位置只通知帧订阅者（每帧最多一次），WebGL 与覆盖层直接写 DOM/引擎。
- **字体收敛**：删除未使用的 Noto Sans SC，serif 只保留实际用到的 400/500。

## Implementation Plan

### Stage 1: 按需加载重型依赖

- **Files**: `src/components/markdown-view.tsx`, `src/components/HandControlOverlay.tsx`, `src/app/tools/{mermaid,markdown-editor,code-to-card}/page.tsx`
- **Logic**: 只有容器存在 `.mermaid` 节点时才 `import('mermaid')` 并 `run({nodes})`；mediapipe 在 `startHandControl` 内动态导入；工具页的导出/AI/高亮库在调用点动态导入，Markdown 预览加 250ms 防抖。
- **Validation**: 构建后检查博客/文档 HTML 的 `<script>` 列表不再包含 mermaid/mediapipe chunk。

### Stage 2: 搜索索引瘦身与延迟加载

- **Files**: `scripts/buildAnIndex.js`, `src/components/command.tsx`
- **Logic**: 索引只保留标题 + 600 字纯文本摘要（去掉代码块/链接/标签）；命令面板 `open` 后才 fetch，索引构建一次并复用；输入搜索 120ms 防抖。
- **Validation**: `public/index.json` 从 4.4MB 降到 287KB；gzip 119KB。

### Stage 3: 滚动帧与 React 解耦

- **Files**: `src/components/noomo/noomo-store.ts`, `src/components/noomo/webgl/Sweet3Canvas.tsx`, `src/components/noomo/home/NoomoAnimatedTexts.tsx`, `src/components/noomo/cases/NoomoCaseView.tsx`
- **Logic**: `onFrame` + `scheduleFrame`（rAF 合并）；帧级 setter 走 `emitFrame`；Sweet3Canvas 在引擎加载后订阅帧并直接调用引擎方法；CaseHover 直接写 transform/display/opacity；Case 页 vignette 直接写 style，且 ice transition 仅在变化超过阈值时回写，避免自激循环。
- **Validation**: 代码检索确认没有组件再从 React state 读取帧字段；类型检查通过。

### Stage 4: storytelling bundle 拆分

- **Files**: `src/app/(storytelling)/{layout,page}.tsx`, `src/app/(storytelling)/cases/[slug]/page.tsx`, `src/app/(storytelling)/contacts/page.tsx`, `src/app/layout.tsx`, `src/components/noomo/NoomoExperienceShell.tsx`
- **Logic**: route group 承载 shell；shell 移除基于 pathname 的 active 分支；根布局不再包裹 shell。
- **Validation**: 输出 HTML 中仅 `/`、`/cases/*`、`/contacts` 含 `smooth-wrapper`；其余页面的 script 列表不再含 GSAP chunk。
- **Risk**: client 端导航离开 storytelling 时依赖 layout unmount 清理 `noomo-active` 与 ScrollSmoother，已保留 cleanup。

### Stage 5: 字体、音频、滚动监听

- **Files**: `src/app/layout.tsx`, `src/components/noomo/NoomoAudioEngine.tsx`, `src/components/reading-progress.tsx`, `src/components/noomo/NoomoLiquidCursor.tsx`
- **Logic**: 删除 Noto Sans SC、serif 收到 400/500；BGM 首次开启声音时才下载解码；阅读进度用 rAF + `scaleX` 直接写样式；鼠标光标在 `(hover: none)` 设备直接不初始化，静止时停止 rAF。
- **Validation**: CSS `@font-face` 从 709 → 203；字体媒体 18MB → 14MB；类型检查/构建通过。

### Stage 6: 构建期数据复用

- **Files**: `src/data/blog-posts.ts`
- **Logic**: 生产构建内缓存 `getAllBlogPosts()` 的 Promise，dev 保持每次重读。

## Testing Strategy

- `npx tsc --noEmit`（0 error）。
- `npm run build`（526 页静态导出成功，sitemap 518 条）。
- 构建产物断言：逐页汇总 `<script>`/`<link rel=stylesheet>` 的 raw + gzip；确认重型 chunk 不在非目标页面。
- 浏览器回归（滚动、路由切换、菜单搜索、手势开关、导出）需要 dev server，按约定由用户执行。

## Risks & Mitigation

- 帧通道改动影响首页/案例页的 WebGL 同步：所有帧值仍在 `getSnapshot()` 中，引擎首次加载后立即 `seek`，700ms 后再校准一次；回滚点为本文件列出的 4 个源文件。
- route group 改动影响 URL：Next 的 route group 不参与路径，构建后逐项确认 `out/index.html`、`out/cases/*`、`out/contacts/index.html` 存在。
- 动态导入增加首用延迟：mermaid 仅在有图文章加载，组件已有加载前占位；工具页为显式用户操作。
- 搜索索引改为摘要后召回率下降：标题/摘要/前 600 字覆盖主要关键词，完整正文搜索仍可后续用 pagefind 替代。

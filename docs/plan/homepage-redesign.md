# Homepage Redesign Design Document

## Background & Goals
- 现有首页由多个内容模块堆叠组成，视觉重心分散，不符合本次参考图的展示型首页方向。
- 目标是重构为深色、高留白、左对齐大标题与大展示区驱动的首页。
- 成功标准：首页形成新的叙事结构，不影响其他页面布局与导航体验。

## High-Level Design
- 首页在 `src/app/page.tsx` 中改为独立 section 组合，不再使用 `.main` 通用容器。
- `src/app/globals.css` 新增首页专用容器、背景与展示区样式。
- `src/components/navbar.tsx` 增加首页顶部样式分支，只影响 `/`。
- 页面结构收敛为：Hero、Showcase、Projects、Skills Container、Destinations、Closing CTA。

## Implementation Plan

### Stage 1: Register implementation docs
- **Files modified**: `docs/IMPLEMENTATION_PLAN.md`, `docs/plan/homepage-redesign.md`
- **Specific logic**: 新增实施索引和详细设计文档，满足项目复杂任务要求。
- **Validation**: 文档文件存在且索引链接正确。

### Stage 2: Rebuild homepage route
- **Files modified**: `src/app/page.tsx`
- **Specific logic**: 移除旧首页模块拼接，改为首页专用结构；保留 `FAQStructuredData`；复用现有截图资源构建展示区。
- **Validation**: 首页结构能独立渲染，且不再依赖 `.main` 容器。

### Stage 3: Add homepage-specific styling
- **Files modified**: `src/app/globals.css`
- **Specific logic**: 新增首页容器、标题、背景、展示卡片和入口卡片等专用类；保持 `.main` 不变。
- **Validation**: 首页获得全宽布局，其他页面样式无变化。

### Stage 4: Add navbar homepage variant
- **Files modified**: `src/components/navbar.tsx`
- **Specific logic**: 基于 pathname 为 `/` 时调整顶部导航的边框、背景和滚动态表现。
- **Validation**: 首页顶部导航更轻，滚动后过渡自然，内页不受影响。

### Stage 5: Add homepage skills container section
- **Files modified**: `src/app/page.tsx`, `src/components/home-skills-container-section.tsx`, `src/app/globals.css`, `package.json`
- **Specific logic**: 在项目区与 Destinations 之间插入新的 Skills Container 区块；用 Matter.js 创建只在桌面端启用的一次性真实物理掉落效果，让 6–8 个核心技术块进入容器并堆叠；移动端和减少动画偏好下做静态或半静态降级。
- **Validation**: 滚动到该区块时技能块进入容器、发生碰撞并最终稳定停留，且不影响上下区块布局。

### Stage 6: Verify UI and regressions
- **Files modified**: none or touched files above if fixes are needed
- **Specific logic**: 启动本地站点检查首页视觉、响应式、物理动画降级和内页回归；运行构建验证依赖接入与打包结果。
- **Validation**: 首页与内页均可正常使用，无明显布局回归，技能区在支持场景下表现稳定。

## Testing Strategy
- Happy path tests
  - 打开首页，确认左对齐大标题、深色背景、大展示区、项目区、技能容器区、重点入口与结尾 CTA 均显示正常。
  - 滚动页面，确认导航在首页上方和滚动后都有正确样式；技能区进入视口后技能块掉入容器并稳定堆叠。
- Error path tests
  - 检查移动端宽度下标题、按钮、展示区和技能容器是否溢出或遮挡。
  - 检查 `prefers-reduced-motion` 或移动端降级场景下，技能区是否直接呈现静态内容且仍可阅读。
  - 检查远程图片加载失败时页面结构是否仍可阅读。
- Regression scope
  - 检查 `/blog/`, `/docs/`, `/tools/`, `/about/`, `/contact/` 的导航和容器宽度未受影响。

## Risks & Mitigation
- `.main` 被误改会影响全站。
  - 通过新增首页专用类规避。
- 导航全局样式改坏内页体验。
  - 通过 `pathname === '/'` 限定首页变体。
- 首页结构过多导致再次碎片化。
  - 限制为少量核心 section，并让技能区承担能力展示，不再恢复旧技术栈模块。
- 物理引擎引入后增加客户端复杂度与调优成本。
  - 仅在首页技能区局部使用，桌面端启用，移动端与减少动画偏好明确降级。
- Rollback plan
  - 回退 `src/app/page.tsx`、`src/app/globals.css`、`src/components/home-skills-container-section.tsx`、`package.json` 与文档更新即可恢复。
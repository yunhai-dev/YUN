---
name: add-tool
description: 向 YUN 站点的工具库（/tools）添加新工具条目。用户给出一个 URL（官网、GitHub 仓库、HuggingFace 模型页、微信公众号文章等）并说"添加到工具中"时使用。覆盖信息抓取（curl/API）、分类判定、条目写入、tsc 校验全流程。
---

# Add Tool（向 YUN 工具库添加条目）

YUN 站点的 `/tools` 页数据全部来自 `src/data/tools/*.ts`，页面自动聚合，无需改 `index.ts` / `page.tsx`。

## 数据文件与分类

| 文件 | 承载分类 |
| --- | --- |
| `src/data/tools/aiApps.ts` | AI 应用、AI 媒体 |
| `src/data/tools/aiLLMs.ts` | AI 模型、AI 平台 |
| `src/data/tools/aiExt.ts` | AI 社区、MCP |
| `src/data/tools/devTools.ts` | 开发工具、设计资源、效率工具 |
| `src/data/tools/systemTools.ts | 系统工具、网络工具 |
| `src/data/tools/otherTools.ts` | 文档、工具集、API、CDN、图床、统计、监控、数据集、解析、趣味、桌面、传输、同步 |

条目结构（`Tool` 类型见 `src/types/tools.ts`）：

```ts
{
    id: 'my-tool',            // kebab-case，全库唯一
    name: 'My Tool',
    description: '一句话中文介绍：定位 + 核心能力 + 关键数据',
    href: 'https://...',      // 官方页优先，其次 GitHub/HF
    category: '开发工具',     // 必须与文件内已有分类一致
}
```

注意 `systemTools.ts` 使用双引号，其他文件使用单引号——按文件既有风格写。

## 标准流程

### 1. 抓取信息（按 URL 类型选手段）

- **GitHub 仓库**：调 GitHub API 拿元数据
  `curl -L -s -A "Mozilla/5.0" "https://api.github.com/repos/<owner>/<repo>"`，
  取 `description / stargazers_count / language / license / homepage / topics`；
  再拉 README 首屏：`https://raw.githubusercontent.com/<owner>/<repo>/main/README.md`
  （main 404 则试 master，取前 ~100 行看 Features）。
- **HuggingFace 模型/合集页**：站内 `fetch_content` 会被 SSRF 拦截，
  改用 `curl` 存到 `/tmp` 后用 BeautifulSoup 解析 `<main>` 文本。
  取点：模型卡 Highlights、参数量、榜单成绩、license、likes 数。
- **微信公众号文章**（`mp.weixin.qq.com`）：同样 `fetch_content` 被拦，
  用浏览器 UA 的 `curl` 抓 HTML，再用 BeautifulSoup 取 `h1`（标题）与 `#js_content`（正文）。
- **普通官网**：先试 `fetch_content`，被拦则同上用 `curl` + BeautifulSoup
  取 `<title>`、meta description 与 `<main>`/`<body>` 文本。
- **搜索补充**：`web_search` 核实官方链接、发布时间、关键数据。

### 2. 判定分类与落点

- 先 `grep -oh "category: ..."` 统计现存分类，避免自造新分类。
- 选已有条目做邻居参照：同类工具放一起（如会议笔记类跟 Hyprnote、
  组网类跟 ZeroTier/NetBird、React 组件库跟 shadcn/ui、LLM 平台跟 Dify）。
- 系列模型只加一条覆盖全家桶（如 Decision 3.0 六档只记合集页），避免刷屏。

### 3. 写条目

- `id` 用 kebab-case，与 `href` 的仓库/模型名对应。
- `description` 一句话中文：出品方 + 定位 + 核心能力 + 关键数据
  （star 数、参数量、榜单分、license 任选 1~2 个最有说服力的）。
- `category` 必须与同文件已有分类字符串完全一致（含单双引号风格按文件走）。

### 4. 校验

每次改完跑 `npx tsc --noEmit`，exit 0 才算完。`edit` 触发的 lint
若只报"硬编码链接"类全站固有提示，无需处理。

## 实战参考

近期 11 个条目示例（`git log --grep="feat(tools)"` 可查）：

- 微信文章 → 提炼出 Google AI Edge Foresight（AI 应用）+ EmbeddingGemma 2（AI 模型）
- HF 模型页 → Laya、Decision 3.0（合集记一条）、MiniCPM5-2B
- GitHub 仓库 → semantic-release、AntV Infographic、Homelable、Opik
- 官网 → BoardUI、Tailscale

完整 diff 见提交 `feat(tools): add 11 new tools across AI, dev and network categories`。

---
title: 科技早报 2026-07-06
category: "科技, 科技早报"
excerpt: Google密集发布Gemma 4多模态模型与DiffusionGemma扩散语言模型,GitHub推出官方MCP Server,Chrome DevTools开源编码代理浏览器控制工具。
lastEdited: 2026年7月6日
tags: [科技早报, Google, Gemma, GitHub, AI代理, 开源, 多模态, 扩散模型]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Google 发布实验性扩散语言模型 DiffusionGemma](#news-1)
- [Gemma 4 12B 登陆笔记本：本地智能体工作流落地](#news-2)
- [A2A 协议迎来一周年：跨域智能体协作生态持续扩展](#news-3)
- [Google 发布 Gemma 4 12B：面向消费级设备的多模态模型](#news-4)
- [Google 联合社区用 Tunix 与 TPU 训练 Gemma 推理能力](#news-5)
- [Google 研究团队提出衡量主动型编码代理的新方法](#news-6)
### GitHub 热门项目

- [GitHub 推出官方 MCP Server，让 AI 代理直连仓库](#news-7)
- [Chrome DevTools 推出 chrome-devtools-mcp 服务器，支持编码代理操控浏览器](#news-8)
- [Rust 编写的本地 AI 会议助手 Meetily 登榜 Trending](#news-9)
- [Go 编写的并行编码代理编排器登顶 Trending](#news-10)
- [GitHub 热门项目 Gas Town 走红：多代理工作空间管理器获 1.64 万星](#news-11)
- [阿里 page-agent：用自然语言操作网页界面](#news-12)
### 开源生态

- [开源框架 Genkit 推出 Agents API 预览版 支持多智能体与流式响应](#news-13)
- [ADK Go 2.0 发布：引入图工作流引擎与内建 HITL](#news-14)
### 开发者工具

- [Google Cloud 发布 Workbench VS Code 扩展 打通本地与云端 Jupyter](#news-15)
- [Google 发布 A2UI 与 MCP Apps 三种集成架构模式](#news-16)
- [Google 为编码智能体推出自动化评估飞轮技能](#news-17)
- [Google Colab 推出命令行工具 Colab CLI](#news-18)
### 安全与隐私

- [Sign in with Google 新增会话元数据强化安全](#news-19)
- [Cerast Intelligence 发布 OSINT 工具，可搜索域名暴露文件](#news-20)
### 产品与平台

- [Google 新广告设想国父们用 Gemini 起草独立宣言](#news-21)
- [Google Pay Android 端新增动态回调支持结账流程](#news-22)
### 硬件与芯片

- [Google Cloud 推出 TPU Developer Hub 集中式学习平台](#news-23)
### 科技行业动态

- [今年已诞生近 90 家新独角兽，多数与 AI 相关](#news-24)
---

## Google 发布实验性扩散语言模型 DiffusionGemma {#news-1}

> Google 发布基于 Gemma 4 架构的实验性文本生成模型 DiffusionGemma，采用扩散式并行生成方式，支持消费级 GPU 部署。

DiffusionGemma 不同于传统自回归模型，通过迭代去噪以并行方式生成和优化 256 token 的块，具备双向上下文感知和实时自我修正能力。

在数独等基于约束的复杂任务上，DiffusionGemma 表现优于传统语言模型，并与 vLLM 等主流推理框架完成集成。

该模型目前仍为实验性质，原文未给出具体性能基准数据。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Gemma 4 12B 登陆笔记本：本地智能体工作流落地 {#news-2}

> Google DeepMind 发布 Gemma 4 12B 模型，可在 16GB RAM 的普通笔记本上本地运行，支持视觉理解和端侧智能体应用。

Gemma 4 12B 面向本地数据处理与视觉洞察生成场景，强调离线可用的端侧 AI 能力。

在 macOS 上，用户可通过 Google AI Edge Gallery 执行 Python 代码并生成可视化结果。

搭配 Google AI Edge Eloquent，可实现完全离线的语音听写和文本编辑。

LiteRT-LM CLI 新增 serve 命令，可创建与行业兼容的本地推理端点。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## A2A 协议迎来一周年：跨域智能体协作生态持续扩展 {#news-3}

> 智能体间通信协议 `A2A` 迎来发布一周年，已在生命科学、电商、数据流、DevOps 与电信等领域落地应用。

`A2A` 使自主智能体能够安全协作并交接任务，摆脱传统 API 的刚性约束。

协议通过把复杂工作流委派给专长的对等智能体，避免上下文污染。

模块化设计带来数据隐私保护与简化的应用架构。

生命科学领域的 **FoldRun** 被点名为典型用例，用于编排复杂的蛋白质结构预测流程。

[查看原文](https://developers.googleblog.com/how-a2a-is-building-a-world-of-collaborative-agents/)

---

## Google 发布 Gemma 4 12B：面向消费级设备的多模态模型 {#news-4}

> Google 推出密集型多模态模型 Gemma 4 12B，主打消费级设备上的本地高性能 AI 执行。

该模型采用新颖的无编码器架构,绕开传统视觉与音频编码器,将多模态数据直接送入 LLM 骨干网络。

设计目标是让 AI 推理可以在消费级硬件本地完成,降低对云端依赖。

官方面向开发者发布了配套指南,介绍该模型的架构与部署方式。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## Google 联合社区用 Tunix 与 TPU 训练 Gemma 推理能力 {#news-5}

> Google 在 Kaggle 举办 Tunix Hackathon,引导开发者把小型基础模型训练成推理引擎。

参赛者需要使用 Kaggle TPUs 并在受限算力预算下完成训练。

获胜团队采用多阶段后训练流水线,结合监督微调（SFT）与 GRPO、SimPO 等对齐技术。

Google 表示,该竞赛表明社区借助开源资源也能训练出具备结构化推理能力的模型。

此举旨在推动 AI 开发的民主化。

[查看原文](https://developers.googleblog.com/how-the-community-trained-gemma-to-think-with-tunix-and-tpus/)

---

## Google 研究团队提出衡量主动型编码代理的新方法 {#news-6}

> Google 研究人员发表论文《Agentic Coding Needs Proactivity, Not Just Autonomy》，提出以'洞察政策'评分来评估编码代理识别重要目标的能力，并基于真实 bug 修复历史构建初步基准。

![Google 研究团队提出衡量主动型编码代理的新方法](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Measuring_What_Matters_with_Jules.2e16d0ba.fill-1200x600.png)

现有公共基准（如 SWE-Bench）侧重测试代理完成明确定义任务的能力，但缺乏对代理主动设定目标能力的评估。

研究团队采用 'temporal proximity'（时间邻近性）和 'semantic similarity'（语义相似性）两条启发式规则分析团队 bug 修复历史。

初步基准基于 Google 内部代码库的 705 个 bug（1,178 个 CL）构建，将相关历史 bug 聚类以揭示'aspirational goals'。

评估流程将单个 bug 设为 ground truth 目标，恢复代码库至修复前状态，允许代理最多三轮探索后生成最终洞察，由 LLM 按 1 到 5 分评判。

文章由 Nghi Bui、Georgios Evangelopoulos 和 Zack Elliott 撰写，发布日期为 2026 年 6 月 22 日。

[查看原文](https://developers.googleblog.com/measuring-what-matters-with-jules/)

---

## GitHub 推出官方 MCP Server，让 AI 代理直连仓库 {#news-7}

> GitHub MCP Server 将 AI 工具直接连接到 GitHub 平台，使 AI 代理可读取仓库、管理 issue 与 PR 并自动化工作流。

![GitHub 推出官方 MCP Server，让 AI 代理直连仓库](https://opengraph.githubassets.com/93290984a682e9b835370790bb0ffc3e9734c15c3daac9b3bcc46c64982847e3/github/github-mcp-server)

项目由 github 组织托管，仓库获得 31.2k Star 与 4.5k Fork，累计 968 次提交，默认分支为 main。

核心功能覆盖仓库管理、Issue 与 PR 自动化、CI/CD 智能、代码分析以及团队协作等场景。

GitHub 同时提供由其托管的远程 MCP Server 以及可自托管的本地版本作为备选。

兼容的 MCP 主机需支持远程服务器，包括 VS Code 1.101+、`Claude Desktop`、Cursor 与 Windsurf 等。

在 VS Code 中安装需使用 1.101 或更高版本，以获得远程 MCP 与 OAuth 支持。

[查看原文](https://github.com/github/github-mcp-server)

---

## Chrome DevTools 推出 chrome-devtools-mcp 服务器，支持编码代理操控浏览器 {#news-8}

> Chrome 团队开源 `chrome-devtools-mcp`，作为 Model-Context-Protocol 服务器，让编码代理能够控制与检查实时 Chrome 浏览器。

![Chrome DevTools 推出 chrome-devtools-mcp 服务器，支持编码代理操控浏览器](https://opengraph.githubassets.com/c8e68cc7886011db81020787df35b85f076100a22affc5c36bb5d1d2368cef43/ChromeDevTools/chrome-devtools-mcp)

仓库位于 `ChromeDevTools/chrome-devtools-mcp`，拥有 46k Star 与 3k Fork，累计提交 970 次。

目前支持 **Antigravity**、**Claude**、**Cursor**、**Copilot** 等代理，并提供独立 CLI。

核心能力包括使用 Chrome DevTools 记录跟踪并提取性能洞察，借助 `puppeteer` 实现浏览器自动化。

还可调试网络请求、截图以及带 source-map 堆栈跟踪的控制台消息。

官方仅保证 Google Chrome 与 Chrome for Testing 兼容性，性能工具可能将跟踪 URL 发送至 Google CrUX API，可通过 `--no` 参数禁用。

[查看原文](https://github.com/ChromeDevTools/chrome-devtools-mcp)

---

## Rust 编写的本地 AI 会议助手 Meetily 登榜 Trending {#news-9}

> Zackriya-Solutions/meetily 登上 GitHub Trending Rust 榜单，主语言为 Rust。

项目获得 17,302 个 Stars，当日新增 1,409 个 Stars，定位为隐私优先的 AI 会议助手。

提供基于 `Parakeet`/`Whisper` 的实时转写，项目方称速度为传统方案的 4 倍。

内置说话人 diarization 功能与 `Ollama` 摘要能力，数据完全在本地处理，无需云端。

项目由 Meetly AI 运营，网址为 https://meetily.ai ，覆盖 macOS 与 Windows 平台。

其“4 倍速度”和“#1 自托管开源 AI 会议笔记工具”的说法尚未见独立来源验证。

[查看原文](https://github.com/Zackriya-Solutions/meetily)

---

## Go 编写的并行编码代理编排器登顶 Trending {#news-10}

> `agent-orchestrator` 是一个面向并行编码代理的编排器，可自主处理 CI 修复、合并冲突与代码评审。

该仓库由 **AgentWrapper** 维护，主要语言为 **Go**，Star 数 8,072，当日新增 Trending Star 43，相关指标为动态数据。

项目定位为 agentic 编排器，能够规划任务、生成并行编码代理，并自动处理 CI 修复、合并冲突与代码评审。

除官方描述外，更多项目细节暂未在原文中披露。

[查看原文](https://github.com/AgentWrapper/agent-orchestrator)

---

## GitHub 热门项目 Gas Town 走红：多代理工作空间管理器获 1.64 万星 {#news-11}

> GitHub 上名为 Gas Town 的多代理工作空间管理器迅速走红，已获得 1.64 万 Star，主要使用 Go 开发。

![GitHub 热门项目 Gas Town 走红：多代理工作空间管理器获 1.64 万星](https://opengraph.githubassets.com/067802a796902857c0a2d43adfeb71fa4a485da39e4e391a407b1978785bdf95/gastownhall/gastown)

项目位于 `gastownhall/gastown` 仓库，主分支为 `main`，累计 7,655 次提交，Fork 数 1.5k。

它可协调 **Claude Code**、**GitHub Copilot**、**Codex**、**Gemini** 等多种 AI 编码代理。

工作状态通过 git-backed hooks 持久化到 Beads 账本，代理重启后仍保留上下文。

架构包含 Mayor、Town、Rig、Crew、Hooks、Polecats 等组件，文档建议可扩展至 20–30 个代理。

README 在介绍 Town 概念后被截断，更详细配置有待原文进一步确认。

[查看原文](https://github.com/gastownhall/gastown)

---

## 阿里 page-agent：用自然语言操作网页界面 {#news-12}

> **alibaba/page-agent** 定位为嵌入网页的 GUI 代理，借助文本 DOM 操作让自然语言直接控制页面。

![阿里 page-agent：用自然语言操作网页界面](https://repository-images.githubusercontent.com/1062458369/4f9a1671-3953-4f45-8a8e-b010e33520bc)

仓库归属 **alibaba**，Star 数 24k、Fork 数 2.1k，累计 1,085 次提交，Star/Fork/提交数会随时间变化。

代理无需截图、无需多模态大模型或特殊权限，采用文本化 **DOM** 操作进行交互。

支持自带大语言模型，并提供 Chrome 扩展用于多页面任务，以及一个 **MCP Server**（Beta）供外部控制。

示例使用 **qwen3.5-plus**，baseURL 为 `https://dashscope.aliyuncs.com/compatible-mode/v1`。

可通过一行 `<script>` 引入 CDN demo（`page-agent@1.11.0`）快速试用，也支持通过 npm 安装并使用 `new PageAgent({...})` 创建实例。

Demo CDN 仅供技术评估，并依赖其免费测试 LLM API 条款；MCP Server 处于 Beta 阶段。

[查看原文](https://github.com/alibaba/page-agent)

---

## 开源框架 Genkit 推出 Agents API 预览版 支持多智能体与流式响应 {#news-13}

> 开源框架 **Genkit** 新增 `Agents API` 预览版，将消息历史、工具循环和流式响应封装到单一接口，简化对话式 AI 全栈开发。

`Agents API` 支持服务器或客户端管理的灵活状态持久化，并面向进阶工作流。

官方列出的能力包括历史分支、长时间运行的分离任务以及多智能体协调。

该 API 通过统一的 wire protocol 连接前后端，无需手写胶水代码。

预览版已支持 `TypeScript` 和 `Go`，并与 `Genkit Developer UI` 集成，便于调试与检视智能体快照。

[查看原文](https://developers.googleblog.com/build-agentic-full-stack-apps-with-genkit/)

---

## ADK Go 2.0 发布：引入图工作流引擎与内建 HITL {#news-14}

> Google 发布面向 Go 语言的 `ADK Go 2.0`，带来基于图的工作流引擎、人机协同编排原语以及动态执行能力。

新版本提供一流的图工作流引擎，便于开发者组合复杂的多智能体应用。

更新加入人机协同（HITL）编排内建原语，并支持使用纯 Go 代码进行动态执行。

内置指数退避重试等自动化韧性特性，统一执行模型使单智能体与图应用共享同一运行时。

统一运行时简化了遥测采集与状态持久化的实现。

[查看原文](https://developers.googleblog.com/announcing-adk-go-20/)

---

## Google Cloud 发布 Workbench VS Code 扩展 打通本地与云端 Jupyter {#news-15}

> Google Cloud 为 Workbench Notebooks 推出 VS Code 扩展，让开发者从本地 IDE 直连云端 Jupyter 环境，简化机器学习开发流程。

该扩展完全开源，可在 GitHub 和 VS Code Marketplace 获取，方便开发者审查与贡献。

通过直连 Google Cloud 高性能基础设施，用户无需切换上下文即可使用云端算力。

官方称集成可减少本地与云端环境割裂，提升端到端的机器学习开发效率。

[查看原文](https://developers.googleblog.com/ml-development-in-vs-code-with-google-cloud-power-workbench-extension-now-available/)

---

## Google 发布 A2UI 与 MCP Apps 三种集成架构模式 {#news-16}

> Google 介绍三种将 A2UI 与 MCP Apps 结合的架构模式，以平衡定制 iframe 环境与原生声明式渲染。

三种模式分别支持通过 MCP 服务器提供原生体验 UI、在声明式视图中安全嵌入复杂 iframe 应用，以及向遗留系统注入生成式 UI 组件。

目标是交付安全、性能良好且符合品牌一致性要求的智能体用户体验。

开发者可按需选择框架组合方式。

[查看原文](https://developers.googleblog.com/a2ui-and-mcp-apps/)

---

## Google 为编码智能体推出自动化评估飞轮技能 {#news-17}

> Google 推出一项面向编码智能体的新开发者技能，可自动化运行五阶段评估飞轮，帮助避免提示词调整引发的大范围回归。

该技能覆盖准备数据、推理运行、自适应 `AutoRater` 评分、失败聚类分析与针对性优化五个阶段。

工具可对生产流量持续运行，也能基于合成场景按需触发，开发者可用自然语言描述测试目标。

独立评估服务会对改动进行验证并统计性能改进，避免在生产环境中引入未预期的回归。

[查看原文](https://developers.googleblog.com/driving-the-agent-quality-flywheel-from-your-coding-agent/)

---

## Google Colab 推出命令行工具 Colab CLI {#news-18}

> Google 发布 Google Colab 命令行界面（CLI），允许开发者和 AI 智能体从本地终端连接远程 Colab runtime 并申请 GPU 资源。

Colab CLI 可在远程 Colab 上直接运行本地 Python 脚本，并支持检索微调后的 Gemma 3 adapter 等 artifact 与模型日志。

该工具集成至标准终端环境，方便将 Colab 能力嵌入既有开发流程。

Antigravity、Claude Code 等 AI 智能体也可借助 Colab CLI 管理机器学习流水线。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Sign in with Google 新增会话元数据强化安全 {#news-19}

> Google 为 Sign in with Google 引入 OIDC 标准声明 `auth_time` 与 `amr`，提供更丰富的会话元数据。

通过 `auth_time` 与 `amr` 声明，已验证应用可核验用户登录新鲜度及所用身份验证方式。

支持的认证方式包括 MFA 与硬件密钥等。

相关联合身份信号有助于防范账户接管与欺诈，并为敏感操作启用阶梯式身份验证策略。

[查看原文](https://developers.googleblog.com/enhance-security-and-trust-new-session-metadata-in-sign-in-with-google/)

---

## Cerast Intelligence 发布 OSINT 工具，可搜索域名暴露文件 {#news-20}

> Cerast Intelligence 推出一款 OSINT 工具，用于在域名上搜索暴露的文件与错误配置。

![Cerast Intelligence 发布 OSINT 工具，可搜索域名暴露文件](https://search.cerast-intelligence.com/logo.png)

该工具可对观察到的域名进行暴露路径和错误配置的搜索。

它提供子串搜索功能，针对域名进行大小写不敏感的搜索。

子串搜索要求至少输入 3 个字符，示例关键词包括 staging、.org、test-。

项目页面公开访问，发布信息中显示的日期尚待确认。

[查看原文](https://search.cerast-intelligence.com/)

---

## Google 新广告设想国父们用 Gemini 起草独立宣言 {#news-21}

> Google 发布 Google Workspace 新广告，设想美国国父们使用 Gemini 等协作工具起草《独立宣言》。

![Google 新广告设想国父们用 Gemini 起草独立宣言](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Q3RjZY-rSsc-HD.jpg?quality=90&strip=all&crop=0,0,100,100)

广告以 "Group project, but make it 1776." 开头，由本杰明·富兰克林给托马斯·杰斐逊发短信询问起草进度开启。

杰斐逊拍照后使用 AI 将内容转录到 Google Doc，富兰克林与亚当斯在"建议模式"下进行编辑修改。

Gemini 在广告中还负责安排会议时间，并在 Google Meet 通话中做笔记。

广告中 Nano Banana 为美国生成了一个以火鸡为主题的印章图案。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/961468/google-ai-commercial-founding-fathers-declaration-of-independence)

---

## Google Pay Android 端新增动态回调支持结账流程 {#news-22}

> Google Pay 在 Android 原生应用中推出 Express checkout，并新增对 `onPaymentDataChanged` 与 `onPaymentAuthorized` 回调函数的支持，使结账体验可在 Google Pay 表单内动态更新。

![Google Pay Android 端新增动态回调支持结账流程](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

开发者可在用户与 Google Pay 表单交互时，动态更新运输选项、税费和总价，并在不关闭表单的情况下处理授权反馈。

该功能需依赖 `play-services-wallet:20.0.0` 及以上版本，可通过扩展 `BasePaymentDataCallbacks` 类来监听结账事件。

支持 Pay 按钮的'上游定位'，可放置于产品详情或购物车页面，并支持表单内联授权流程。

文章由 Dominik Mengelt 与 Nik Heath 撰写，发布日期为 2026 年 5 月 26 日。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)

---

## Google Cloud 推出 TPU Developer Hub 集中式学习平台 {#news-23}

> Google 上线 TPU Developer Hub，为开发者与模型构建者提供集中式 TPU 学习资源。

该中心提供以代码为主的资源、开源实践与深入文档。

内容覆盖硬件架构、软件优化、调试、并行与网络等领域。

资源同时面向人类开发者与 AI 辅助工具，支持从大规模训练到低延迟推理的工作负载。

[查看原文](https://developers.googleblog.com/unlocking-the-power-of-the-tpu-stack-introducing-our-new-developer-hub/)

---

## 今年已诞生近 90 家新独角兽，多数与 AI 相关 {#news-24}

> TechCrunch 基于 Crunchbase 与 PitchBook 数据统计，2026 年迄今已诞生近 90 家新独角兽公司，其中大多数与 AI 相关。

![今年已诞生近 90 家新独角兽，多数与 AI 相关](https://techcrunch.com/wp-content/uploads/2023/11/GettyImages-1399595760.jpg?resize=1200,675)

6 月 **MainFunc**（Genspark 平台）估值 26 亿美元，2023 年成立，累计融资 6.45 亿美元。

5 月 **Farther** 估值 12.5 亿美元，融资 2.73 亿美元；**Socket** 估值 10 亿美元，投资方包括 Aaron Levie 与 Andreessen Horowitz。

**EXA** 估值 19.5 亿美元，获 Nvidia 与 YC 投资；**Vi Labs** 估值 16.4 亿美元，累计融资约 2.75 亿美元。

医疗领域 **MiRus** 估值 44.1 亿美元，Boston Scientific 为投资方；AI 研究实验室 **Recursive** 估值 46.5 亿美元，成立于 2025 年。

[查看原文](https://techcrunch.com/2026/07/05/almost-40-new-unicorns-have-been-minted-so-far-this-year-here-they-are/)


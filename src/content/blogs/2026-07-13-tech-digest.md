---
title: 科技早报 2026-07-13
category: "科技, 科技早报"
excerpt: Google密集发布Gemma本地模型、智能体开发工具与浏览器端AI推理能力，OpenAI开源Codex CLI。
lastEdited: 2026年7月13日
tags: [科技早报, Google, Gemma, 智能体, 本地AI, 开发者工具, GitHub, Codex CLI]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Google AI Edge 推动 Gemma 4 12B 笔记本本地智能体工作流](#news-1)
- [Google 发布实验性扩散文本模型 DiffusionGemma 开发指南](#news-2)
- [Google发布LiteRT.js扩展浏览器端AI推理](#news-3)
- [Google 发布 Gemma 4 12B 多模态本地 AI 模型](#news-4)
- [Google 发布 ADK Go 2.0 引入图式多智能体工作流](#news-5)
- [Google Pathways 弹性训练可在故障后快速恢复](#news-6)
### GitHub 热门项目

- [OpenAI 开源 Codex CLI 本地编程智能体仓库](#news-7)
- [GitHub 热门项目 Bun 集成运行时与包管理能力](#news-8)
- [Rust 重写 Postgres 项目 pgrust 目标兼容 18.3](#news-9)
- [Vibe-Trading 更新策略技能并披露安全加固措施](#news-10)
- [GitHub 热门仓库收录百余个 AI Agent 与 RAG 应用](#news-11)
- [GitHub 热门项目 dcg 阻止智能体执行危险命令](#news-12)
### 开源生态

- [Genkit 推出预览版 Agents API 构建智能体应用](#news-13)
- [Google 推出 ARD 开放规范用于发现和验证 AI 能力](#news-14)
### 开发者工具

- [Google 推出 Colab CLI 连接本地终端与远程运行时](#news-15)
- [Google 提出 A2UI 与 MCP Apps 三种智能体界面架构](#news-16)
- [Google推出编码智能体评估飞轮开发者技能](#news-17)
- [Google Cloud Workbench扩展正式登陆VS Code](#news-18)
### 安全与隐私

- [Google 登录新增会话元数据支持风险访问控制](#news-19)
### 硬件与芯片

- [Google 推出 TPU Developer Hub 集中开发资源](#news-20)
### 前瞻与传闻

- [Google 解释构建 ADK 2.0 的原因与升级考量](#news-21)
---

## Google AI Edge 推动 Gemma 4 12B 笔记本本地智能体工作流 {#news-1}

> **Google DeepMind** 表示，具备智能体与多模态能力的 **Gemma 4 12B** 可在配备 16GB 内存的日常笔记本电脑上运行。Google AI Edge 同步提供本地代码执行、离线语音处理及端点服务能力。

原文称，**Gemma 4 12B** 支持本地数据处理和视觉洞察生成，可用于本地化的智能体工作流。

在 macOS 上，用户可通过 **Google AI Edge Gallery** 使用该模型进行动态 Python 代码执行和可视化。

通过 **Google AI Edge Eloquent**，用户可进行完全离线的语音听写和文本编辑。

`LiteRT-LM CLI` 新增 `serve` 命令，可创建兼容行业标准的本地端点，为完全本地运行的 AI 工具和智能体提供支持。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## Google 发布实验性扩散文本模型 DiffusionGemma 开发指南 {#news-2}

> **DiffusionGemma** 是基于 Gemma 4 架构构建的实验性文本生成模型，以扩散式并行生成替代逐 token 自回归生成。文章称，该模型已集成 `vLLM` 等常用推理框架。

**DiffusionGemma** 基于 Gemma 4 架构构建，是一款实验性文本生成模型。

模型采用基于扩散的并行生成方式，通过迭代去噪并行生成和细化 `256-token` 块，而非逐 token 自回归生成。

文章介绍称，该模型具备更快推理、双向上下文感知及实时自我修正能力，并可部署在消费级 GPU 上。

文章还称，模型可更有效处理数独等复杂约束型任务，且微调后表现出显著增益；相关性能表述来自文章介绍。

**DiffusionGemma** 已集成 `vLLM` 及其他常用推理框架。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Google发布LiteRT.js扩展浏览器端AI推理 {#news-3}

> **Google** 推出 `LiteRT.js`，用于让机器学习模型直接在浏览器中运行。该产品支持 `WebGPU` 推理，并提供基于 `WebAssembly` 的 CPU 回退方案。

`LiteRT.js` 是 **LiteRT** 产品家族的最新成员，将 Google 的跨平台边缘 AI 运行时扩展至 Web 平台。

该工具面向 JavaScript 开发者构建，支持在 `WebGPU` 上执行机器学习模型推理。

在不使用 `WebGPU` 的情况下，`LiteRT.js` 提供基于 `WebAssembly` 的 CPU 回退方案。

文章将 `WebNN` 列为即将推出的支持目标。

[查看原文](https://developers.googleblog.com/litertjs-googles-high-performance-web-ai-inference/)

---

## Google 发布 Gemma 4 12B 多模态本地 AI 模型 {#news-4}

> Google 已发布 **Gemma 4 12B**，这是一款面向消费级设备高性能本地 AI 执行的稠密型多模态模型。该模型采用将多模态数据直接输入 LLM 主干的新型无编码器架构。

**Gemma 4 12B** 是 Google 发布的稠密型多模态模型，面向消费级设备上的高性能本地 AI 执行。

该模型引入新型无编码器架构，绕过传统视觉和音频编码器。

在这一架构中，多模态数据被直接输入 LLM 主干网络。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## Google 发布 ADK Go 2.0 引入图式多智能体工作流 {#news-5}

> **Google** 发布面向 Go 的 **Agent Development Kit** 2.0，新增一等支持的图式工作流引擎与内置人在回路编排能力。

`ADK Go 2.0` 可用于组合复杂的多智能体应用，开发者能够通过普通 Go 代码实现动态执行。

新版加入自动化韧性功能，包括指数退避重试。单智能体应用与复杂图式工作流现可运行在同一运行时。

统一执行模型旨在简化遥测与状态持久化。

[查看原文](https://developers.googleblog.com/announcing-adk-go-20/)

---

## Google Pathways 弹性训练可在故障后快速恢复 {#news-6}

> **Google** 介绍基于 **Pathways** 与 **MaxText** 的弹性训练机制，可在硬件故障后仅替换受损 worker，并从检查点续训。

在分布式 AI 训练中，单台机器丢失通常会使整个多节点任务崩溃，并要求重启完整工作负载的基础设施。

Google 的 JAX 生态系统通过 **Pathways** 使用弹性训练机制，将硬件故障转换为可捕获的 Python 异常，使运行中的进程得以存活。

发生计划外故障时，系统自动仅替换损坏的 worker，并从 **Cloud Storage** 恢复最后一个可用检查点，在原位置继续训练。

Google 表示，该机制可将总停机时间降至两分钟以内，且无需重启主控制器进程。

[查看原文](https://developers.googleblog.com/we-terminated-a-tpu-mid-training-and-it-recovered-in-seconds-introduction-to-elastic-training-with-maxtext/)

---

## OpenAI 开源 Codex CLI 本地编程智能体仓库 {#news-7}

> 公开仓库 **openai/codex** 将 `Codex CLI` 描述为由 **OpenAI** 提供、在用户电脑本地运行的编程智能体。项目支持多种编辑器、包管理器及桌面应用入口。

![OpenAI 开源 Codex CLI 本地编程智能体仓库](https://opengraph.githubassets.com/b67e47be9e4ed53dc9f412331cf3985dbcc7d788bfb92682d9be968239259a7a/openai/codex)

项目说明称，用户可在 **VS Code**、**Cursor** 或 **Windsurf** 等代码编辑器中安装 Codex。

用户可运行 `codex app` 或访问 Codex App 页面，获得桌面应用体验；云端智能体 `Codex Web` 则指向 `chatgpt.com/codex`。

`Codex CLI` 可通过 npm 包 `@openai/codex` 或 Homebrew 安装。项目还提供 Mac、Linux 的 shell 安装命令及 Windows 的 PowerShell 安装命令。

发布页提供适用于 macOS Apple Silicon、macOS x86_64、Linux x86_64 和 Linux arm64 的二进制文件。

[查看原文](https://github.com/openai/codex)

---

## GitHub 热门项目 Bun 集成运行时与包管理能力 {#news-8}

> **oven-sh/bun** 登上 GitHub Trending，仓库记录拥有 94,641 个 Stars，当天新增趋势 Stars 为 162。该项目定位为一体化 JavaScript 工具链。

**Bun** 主要使用 Rust 开发，项目将自身描述为速度很快的工具。

它集成 JavaScript 运行时、打包器、测试运行器及包管理器，提供一体化开发工具能力。

仓库页面记录显示，**oven-sh/bun** 获得 94,641 个 Stars，当日趋势新增 162 个 Stars。

[查看原文](https://github.com/oven-sh/bun)

---

## Rust 重写 Postgres 项目 pgrust 目标兼容 18.3 {#news-9}

> **pgrust** 是一个以 Rust 重写 Postgres 的项目，目标兼容 **Postgres 18.3** 并支持现有数据目录启动。项目方明确表示，该项目尚未达到生产可用状态。

![Rust 重写 Postgres 项目 pgrust 目标兼容 18.3](https://opengraph.githubassets.com/a2c0f6c057ed6879daea0698fb96e6a89d479f24207905267481615dd1eb697f/malisper/pgrust)

**pgrust** 称已在超过 46,000 个回归查询中匹配 Postgres 的预期输出，并与 Postgres 磁盘格式兼容，可从现有 `Postgres 18.3` 数据目录启动。

项目 README 表示，一个尚未发布的新版本已通过 Postgres 回归测试套件的 100%。该版本采用每个连接一个线程的模型，而不是每个连接一个进程。

README 称，该未发布版本在事务工作负载上比 Postgres 快 50%，分析工作负载约快 300 倍；这些数据为项目方针对未发布版本的声明。

项目表示尚未进行性能优化，且现有 Postgres 扩展，以及 `PL/Python`、`PL/Perl`、`PL/Tcl` 等过程语言扩展通常尚不兼容。

[查看原文](https://github.com/malisper/pgrust)

---

## Vibe-Trading 更新策略技能并披露安全加固措施 {#news-10}

> 公开仓库 **HKUDS/Vibe-Trading** 将自身定位为“个人交易智能体”，称可通过一条命令提供综合交易能力。项目近期更新策略开发技能，并发布安全相关说明。

![Vibe-Trading 更新策略技能并披露安全加固措施](https://opengraph.githubassets.com/ba6426324df80c4fc1e58018b93cf486d88d29973893fa81c7bab69b755d889e/HKUDS/Vibe-Trading)

项目于 2026 年 7 月 12 日称新增 `strategy-dev-manager` 技能，可将学术论文和券商研究转化为已注册的因子或策略，并提供自动化 IC、Sharpe 衰减监控。

项目于 7 月 13 日称，已关闭外部安全审计在 7 月 10 日发现的全部 10 个问题。仓库称加固措施涵盖 Docker 重建、回测沙盒、SSE 认证票据及 Docker Compose 配置。

上述审计问题关闭及安全加固效果均为仓库自身声明。项目同时警告，`VibeTrading_HKU`、Virtuals 项目 `101845` 及指定合约地址并非官方资产。

项目称从未发行或认可任何代币或迷因币，并提醒用户不要购买相关资产、连接钱包或签署任何内容。

[查看原文](https://github.com/HKUDS/Vibe-Trading)

---

## GitHub 热门仓库收录百余个 AI Agent 与 RAG 应用 {#news-11}

> GitHub Trending 仓库 **Shubhamsaboo/awesome-llm-apps** 以 Python 为主要语言，收录 100 多个可运行的 AI Agent 与 RAG 应用。

仓库描述称，所收录应用可被克隆、定制和发布。

文章所述统计数据显示，该仓库拥有 118,816 个 Stars，当天新增趋势 Stars 为 408 个。

Stars 数及当天新增趋势 Stars 为文章发布时统计，可能随时间变化。

[查看原文](https://github.com/Shubhamsaboo/awesome-llm-apps)

---

## GitHub 热门项目 dcg 阻止智能体执行危险命令 {#news-12}

> **Destructive Command Guard**（`dcg`）登上 GitHub Trending，旨在阻止智能体执行危险的 Git 与 Shell 命令。该 Rust 项目目前拥有 3,211 个 Stars，当日新增 444 个 Stars。

**Dicklesworthstone/destructive_command_guard** 是 GitHub Trending 中的一个仓库，主要使用 Rust 语言开发。

项目名称为 **Destructive Command Guard**，简称 `dcg`，其用途是拦截智能体可能执行的危险 Git 和 Shell 命令。

仓库页面显示，该项目累计获得 3,211 个 Stars，并在当日新增 444 个 Stars。

[查看原文](https://github.com/Dicklesworthstone/destructive_command_guard)

---

## Genkit 推出预览版 Agents API 构建智能体应用 {#news-13}

> 开源框架 **Genkit** 推出 `Agents API`，将消息历史、工具循环与流式传输整合为单一接口。

`Agents API` 支持由服务器或客户端管理状态持久化，并可处理历史分支、长时间运行的分离任务及多智能体协作等工作流。

该 API 通过统一线协议连接后端与前端，面向智能体全栈应用的构建需求。

`Agents API` 目前以预览版形式提供 `TypeScript` 和 `Go` 支持。

该 API 已集成 **Genkit Developer UI**，开发者无需编写客户端代码即可测试、调试和检查智能体快照。

[查看原文](https://developers.googleblog.com/build-agentic-full-stack-apps-with-genkit/)

---

## Google 推出 ARD 开放规范用于发现和验证 AI 能力 {#news-14}

> Google 宣布推出 **Agentic Resource Discovery**（`ARD`）开放规范，用于在网络上发布、发现和验证 AI 能力。该规范旨在帮助智能体查找工具、技能及其他智能体，并验证连接安全性。

![Google 推出 ARD 开放规范用于发现和验证 AI 能力](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_Generated_Image_gzxwoagzxw.2e16d0ba.fill-1200x600.jpg)

`ARD` 由行业合作伙伴共同开发，旨在支持跨底层框架、协议和提供商安全共享及连接工具与服务。

该规范允许组织在自有域名下发布能力目录，并由联邦注册表建立索引，以支持智能体动态发现资源。其架构包括目录（catalogs）和注册表（registries）两类原语。

目录描述组织提供的能力，域名所有权构成身份与信任的密码学基础。注册表抓取并索引目录，在发现请求中返回匹配能力及验证发布者、建立信任所需的元数据。

发现完成后，`ARD` 会向智能体交付可验证的信任元数据，使其能够通过工具原生协议直接建立安全连接。

[查看原文](https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/)

---

## Google 推出 Colab CLI 连接本地终端与远程运行时 {#news-15}

> Google 宣布推出 **Google Colab CLI**，可将本地终端及 AI 智能体连接至远程 Colab 运行时执行任务。该工具支持申请高性能 GPU、运行本地 Python 脚本及获取训练工件。

**Google Colab Command-Line Interface**（`CLI`）可让开发者和 AI 智能体通过本地终端连接远程 Colab 运行时。

用户可借助 `CLI` 请求高性能 GPU，并在远程运行时执行本地 Python 脚本。

该工具还可获取工件日志或模型，例如经微调的 `Gemma 3` 适配器。

`CLI` 可直接整合进标准终端环境，并可由 **Antigravity** 或 **Claude Code** 等 AI 智能体管理复杂机器学习流水线。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Google 提出 A2UI 与 MCP Apps 三种智能体界面架构 {#news-16}

> Google 介绍将 **MCP Apps** 与 **A2UI** 结合的三种架构模式，以处理高度定制 `iframe` 环境和原生声明式渲染之间的取舍。相关模式覆盖原生界面提供、安全嵌入复杂应用及遗留系统集成。

文章介绍将 **Model Context Protocol（MCP）Apps** 与 **Agent-to-User Interface（A2UI）** 结合的三种架构模式。

这些模式面向高度定制的 `iframe` 环境与原生声明式渲染之间的权衡。

其中一种模式可由 MCP 服务器直接提供具有原生体验的用户界面。

另一种模式可在声明式视图中安全嵌入复杂且有状态的 `iframe` 应用；还有一种可将生成式 UI 组件注入遗留系统。

文章称，这些混合框架可帮助工程团队按项目约束交付安全、高性能且品牌一致的智能体用户体验。

[查看原文](https://developers.googleblog.com/a2ui-and-mcp-apps/)

---

## Google推出编码智能体评估飞轮开发者技能 {#news-17}

> **Google** 推出面向编码智能体的新开发者技能，自动化覆盖五个阶段的评估飞轮。开发者可用自然语言描述测试目标，并由独立评估服务验证实际性能改进。

文章指出，开发者通过调整提示词修复单个错误时，可能难以判断是否会在生产环境引发广泛回归。

这项技能的评估流程包括准备数据、运行推理、使用自适应 `AutoRaters` 评分、分析失败集群，以及执行针对性优化。

该工具可持续基于生产流量运行，也可基于合成场景按需运行。

独立评估服务将验证并统计实际的性能改进。

[查看原文](https://developers.googleblog.com/driving-the-agent-quality-flywheel-from-your-coding-agent/)

---

## Google Cloud Workbench扩展正式登陆VS Code {#news-18}

> **Google Cloud Workbench Notebooks** 扩展正式面向 **VS Code** 发布，可将本地 IDE 连接到可扩展的云端 Jupyter 环境。该扩展已完全开源，并可通过 GitHub 和 VS Code Marketplace 获取。

该扩展允许开发者从本地 **VS Code** 连接云端 Jupyter 环境，并直接访问高性能 **Google Cloud** 基础设施。

这项集成旨在减少开发过程中的上下文切换，从而简化机器学习生命周期。

**Google Cloud Workbench Notebooks** 扩展已完全开源，可在 GitHub 与 VS Code Marketplace 获取。

[查看原文](https://developers.googleblog.com/ml-development-in-vs-code-with-google-cloud-power-workbench-extension-now-available/)

---

## Google 登录新增会话元数据支持风险访问控制 {#news-19}

> **Google** 正为 **Sign in with Google** 引入 `auth_time` 与 `amr` 两项 OpenID Connect 标准声明。开发者可据此实施逐步增强认证等细粒度安全策略。

`auth_time` 可帮助已验证的应用确认用户登录的“新鲜度”，即认证发生的时间信息。

`amr`（Authentication Methods Reference）则提供用户所采用认证方法的信息，例如多因素认证（MFA）或硬件密钥。

Google 表示，这些会话元数据可支持更动态、基于风险的访问控制，并帮助平台防范账户接管和欺诈。

开发者可利用这些联邦身份信号，针对敏感操作实施 step-up authentication 等安全策略。

[查看原文](https://developers.googleblog.com/enhance-security-and-trust-new-session-metadata-in-sign-in-with-google/)

---

## Google 推出 TPU Developer Hub 集中开发资源 {#news-20}

> **Google** 正式推出 **TPU Developer Hub**，为模型构建者和开发者提供集中式教育资源。该平台旨在帮助用户提升 **Google Cloud TPU** 的使用与性能优化能力。

`TPU Developer Hub` 提供代码优先资源、开源方案及深度文档，内容覆盖硬件架构、软件优化、调试、并行化和网络。

相关材料面向人类开发者及 AI 辅助工具，覆盖从大规模训练到低延迟推理的工作负载。

[查看原文](https://developers.googleblog.com/unlocking-the-power-of-the-tpu-stack-introducing-our-new-developer-hub/)

---

## Google 解释构建 ADK 2.0 的原因与升级考量 {#news-21}

> Google 发文说明构建 **ADK 2.0** 的开发理由，并介绍部分功能及开发者升级考量。文章计划在 `ADK go 2.0` 发布后的第二天发布。

Google 的文章聚焦为何构建 **ADK 2.0**，说明这一版本的开发背景与理由。

文章还介绍了 **ADK 2.0** 的部分功能，并讨论开发者应考虑升级的原因。

该文称计划在 `ADK go 2.0` 发布后的第二天发布，具体时间属于计划安排。

[查看原文](https://developers.googleblog.com/why-we-built-adk-20/)


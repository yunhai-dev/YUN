---
title: 科技早报 2026-06-08
category: "科技, 科技早报"
excerpt: Google DeepMind发布Gemma 4 12B无编码器多模态架构指南，Perplexity推出AI自主编写的“搜索即代码”新架构。
lastEdited: 2026年6月8日
tags: [科技早报, AI代理, 多模态模型, 开源项目, Google, Perplexity, 开发者工具, 网络安全]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Gemma 4 12B开发者指南发布，详解新型无编码器多模态架构](#news-1)
- [Nous Research推出Hermes Agent：可自改进的AI代理](#news-2)
- [GitHub热门项目：研究任何主题的AI技能](#news-3)
- [DeepSeek登顶六月热门榜，美国公司追逐廉价AI](#news-4)
- [Lathe项目：利用LLMs帮助用户学习而非替代思考](#news-5)
- [Perplexity推出“搜索即代码”架构，让AI自主编写搜索流程](#news-6)
### GitHub 热门项目

- [微软开源pg_durable，为PostgreSQL带来持久化执行](#news-7)
- [GitHub热门项目：可扩展的AI代理`goose`用Rust编写](#news-8)
- [热门计算机视觉工具包supervision：模型无关的可复用工具](#news-9)
- [GitHub热门项目：AI原生安全测试平台CyberStrikeAI](#news-10)
- [Dolt：一个支持Git式版本控制的SQL数据库项目](#news-11)
- [Rust向量索引turbovec：内存高效且速度快于FAISS](#news-12)
### 开源生态

- [Google发布Kotlin与Android版ADK 0.1.0，简化AI代理开发](#news-13)
- [**Google AI Edge Gallery** 应用新增 **MCP** 集成与会话连续性](#news-14)
- [GitHub热门项目：Goravel框架发布，为PHP开发者铺就Go之路](#news-15)
- [GitHub热门项目：Go语言库whatsmeow实现WhatsApp Web API](#news-16)
### 开发者工具

- [Google将Gemini CLI过渡至Antigravity CLI，统一AI终端工具](#news-17)
- [谷歌推出Colab命令行界面，强化终端集成](#news-18)
- [谷歌发布Pay & Wallet开发者MCP服务器，加速集成开发](#news-19)
### 安全与隐私

- [微软开源 MXC：用于运行不可信代码的沙盒系统](#news-20)
- [2026年迄今最严重安全事件：DOGE泄露与关键系统遭入侵](#news-21)
- [ChatGPT新增“锁定模式”，可禁用网络访问以防御提示注入](#news-22)
### 产品与平台

- [OpenAI称'聊天已死'，将重建ChatGPT为全能代理应用](#news-23)
- [Google推出Gemini for Home全栈产品，赋能智能家居合作伙伴](#news-24)
---

## Gemma 4 12B开发者指南发布，详解新型无编码器多模态架构 {#news-1}

> **Google DeepMind**为新发布的`Gemma 4 12B`密集型多模态模型发布开发者指南，详解其为本地高性能AI执行设计的架构。

`Gemma 4 12B`专为消费设备上的高性能本地AI执行而设计，是一个密集型多模态模型。

该模型引入了一种新颖的、无编码器的架构，这是其核心设计特点。

此架构绕过传统的视觉和音频编码器，将多模态数据直接输入到LLM主干网络，简化了处理流程。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## Nous Research推出Hermes Agent：可自改进的AI代理 {#news-2}

> Hermes Agent 是由 **Nous Research** 构建的自改进 AI 代理，它内置学习循环，能从经验中创建和优化技能。

![Nous Research推出Hermes Agent：可自改进的AI代理](https://opengraph.githubassets.com/da689648759312fb9a1956701a1398d1d0251f54c7bd5ed7e24d3f02979f1cff/NousResearch/hermes-agent)

**Hermes Agent** 被描述为唯一内置学习循环的代理，能够跨会话搜索对话历史，并构建对用户的深入理解。

该代理可在低成本 VPS、GPU 集群或无服务器基础设施上运行，不依赖本地笔记本电脑。

它支持通过 Telegram 进行交互，并兼容多种模型，包括 **Nous Portal**、**OpenRouter**、**NVIDIA NIM** 以及 **小米 MiMo** 等。

[查看原文](https://github.com/NousResearch/hermes-agent)

---

## GitHub热门项目：研究任何主题的AI技能 {#news-3}

> 一个可以研究任何主题并生成事实摘要的AI agent技能`last30days-skill`今日在GitHub上获得了超过3万颗星。

`last30days-skill`是一个AI agent技能，其数据源包括**Reddit**、**X**、**YouTube**等。

该技能能够综合多个来源的信息，生成一个基于事实的摘要。

该项目语言为**Python**，今日新增了1,111颗星。

[查看原文](https://github.com/mvanhorn/last30days-skill)

---

## DeepSeek登顶六月热门榜，美国公司追逐廉价AI {#news-4}

> DeepSeek 在2026年6月成为 Ramp 平台上增长最快的趋势软件供应商，反映了美国企业对低成本 AI 模型的追求。

![DeepSeek登顶六月热门榜，美国公司追逐廉价AI](https://the-decoder.com/wp-content/uploads/2025/12/deepseek_usa.png)

据 Ramp 平台数据，中国 AI 模型 **DeepSeek** 在2026年6月登顶了其趋势软件供应商榜单。

报告显示，众多美国公司正在使用 **DeepSeek** 的付费服务，并直接向其发送数据。

Ramp 首席经济学家 Ara Kharazian 指出，日益增长的成本意识是企业选择 **DeepSeek** 的主要驱动因素。

同时，Ara Kharazian 也警告了使用中国 AI 模型可能带来的数据安全风险。

[查看原文](https://the-decoder.com/deepseek-topped-ramps-trending-software-vendors-in-june-2026-as-us-companies-chase-cheaper-ai/)

---

## Lathe项目：利用LLMs帮助用户学习而非替代思考 {#news-5}

> 一个名为 **Lathe** 的实验性项目利用大语言模型（LLMs）来生成技术教程，旨在帮助用户学习新领域，而非跳过思考过程。

![Lathe项目：利用LLMs帮助用户学习而非替代思考](https://opengraph.githubassets.com/fe8282955be4d80cba0d5a75ab61dc9f27ab7b5a4acfddd5784385190f0cc197/devenjarvis/lathe)

**Lathe** 可以根据需求，生成动手实践的、多部分的技术教程，用户可以在一个专为学习设计的本地界面中完成这些教程。

该工具的核心是其 **LLM** 技能组合，包含一个用于存储、管理和查看生成教程的 Golang CLI。

**Lathe** 可以在 `Claude Code`、`Cursor` 和 `Codex` 等 LLM 会话中通过提示来生成教程，帮助用户深入理解新领域。

[查看原文](https://github.com/devenjarvis/lathe)

---

## Perplexity推出“搜索即代码”架构，让AI自主编写搜索流程 {#news-6}

> Perplexity推出了名为“搜索即代码”的新架构，允许AI模型用Python编写自己的搜索例程，取代固定的搜索API调用。

![Perplexity推出“搜索即代码”架构，让AI自主编写搜索流程](https://the-decoder.com/wp-content/uploads/2026/06/Perplexity-Logo-Silhouette-Nano-Banana-Pro.jpg)

**Perplexity**推出的“搜索即代码”架构摒弃了僵化的搜索API调用模式。该系统允许AI模型在沙箱环境中使用Python编写并执行自己的搜索、过滤和去重流程。

这一架构在关键基准测试中击败了**OpenAI**和**Anthropic**。据称，它将处理查询的令牌成本降低了高达85%，提升了效率与灵活性。

新架构将代理处理自身数据筛选的能力内置，标志着搜索集成方式从外部调用向自主编程的重大转变。

[查看原文](https://the-decoder.com/perplexitys-search-as-code-lets-ai-models-write-their-own-search-pipelines-instead-of-calling-fixed-apis/)

---

## 微软开源pg_durable，为PostgreSQL带来持久化执行 {#news-7}

> 微软开源了`pg_durable`项目，这是一个旨在为**PostgreSQL**数据库引入持久化执行模式的工具，无需额外服务基础设施。

![微软开源pg_durable，为PostgreSQL带来持久化执行](https://opengraph.githubassets.com/10cffb17e07fe6f4fcca5f4fba2520dc4ac825b482cdf01dcc4aaefbf56c6bc5/microsoft/pg_durable)

`pg_durable`允许在SQL中定义工作流，并能在崩溃或重启后，从最后一个持久化检查点恢复执行。该项目已内置在微软的**Azure HorizonDB**云服务中。

这是微软“将计算带到数据附近”使命的一部分。该项目适用于后端工程师、数据工程师、DBA和SRE等角色。

[查看原文](https://github.com/microsoft/pg_durable)

---

## GitHub热门项目：可扩展的AI代理`goose`用Rust编写 {#news-8}

> 开源项目`aaif-goose/goose`是一个超越代码建议的AI代理，能执行、编辑和测试大语言模型。

GitHub热门项目`aaif-goose/goose`是一个开源且可扩展的AI代理。

该项目超越了简单的代码建议功能，能够安装、执行、编辑和测试任何大语言模型。

项目使用Rust语言编写，截至记录时间，已获得47,568颗星，今日新增322颗星。

[查看原文](https://github.com/aaif-goose/goose)

---

## 热门计算机视觉工具包supervision：模型无关的可复用工具 {#news-9}

> GitHub上的热门Python项目**roboflow/supervision**提供了一套可复用的计算机视觉工具，覆盖从数据加载到实时区域计数的多种任务。

![热门计算机视觉工具包supervision：模型无关的可复用工具](https://opengraph.githubassets.com/25b249f3f170ab647e2d4a8ad1b84c9ec714406ceaf89cb30c5ef5c6de44215b/roboflow/supervision)

**supervision**被设计为模型无关，可兼容分类、检测或分割模型，并提供了对Ultralytics、Transformers、MMDetection等流行库的连接器。

项目提供了一套工具来加载、分割、合并和保存数据集。

使用其Inference功能运行时需要一个Roboflow API KEY。

[查看原文](https://github.com/roboflow/supervision)

---

## GitHub热门项目：AI原生安全测试平台CyberStrikeAI {#news-10}

> 用Go语言构建的AI原生安全测试平台**CyberStrikeAI**在GitHub Trending上获得了4,222个星标。

**CyberStrikeAI**是一个集成了100多个安全工具的AI原生安全测试平台。

该平台包含一个智能编排引擎，支持基于角色的测试并提供预定义的安全角色。

它拥有一个包含专业测试技能的技能系统，并提供全面的生命周期管理能力。

[查看原文](https://github.com/Ed1s0nZ/CyberStrikeAI)

---

## Dolt：一个支持Git式版本控制的SQL数据库项目 {#news-11}

> Dolt 是一个可以像 Git 仓库一样进行版本控制的 SQL 数据库，旨在为数据提供完整的变更历史。

![Dolt：一个支持Git式版本控制的SQL数据库项目](https://repository-images.githubusercontent.com/198683574/e61b92f2-8e30-44e5-9a5e-a860623fbae5)

Dolt 是一个可进行 fork、克隆、分支、合并的 SQL 数据库，其口号是“Dolt versions tables. It's like Git and MySQL had a baby.”

用户可以通过任何 MySQL 客户端连接 Dolt 读取或修改数据。其版本控制功能通过系统表、函数或类似 `git` 的命令行界面（如 `dolt sql`）来暴露。

该项目由 DoltHub 支持，提供免费的公共数据托管平台。除了基于 MySQL 的 **Dolt**，还有处于 Beta 版本的 **Doltgres**（基于 Postgres）。

在 GitHub 上，该项目已获得超过 2.3 万颗星，拥有近 800 个分支。

[查看原文](https://github.com/dolthub/dolt)

---

## Rust向量索引turbovec：内存高效且速度快于FAISS {#news-12}

> GitHub热门项目**turbovec**是一个基于Google Research TurboQuant算法构建的Rust向量索引，具备极高的内存效率和搜索性能。

![Rust向量索引turbovec：内存高效且速度快于FAISS](https://repository-images.githubusercontent.com/1192555574/c9d82d4e-1a88-4201-a548-615cfbb0b16a)

**turbovec**使用4GB内存即可存储原本需要32GB的1000万文档语料库（以float32计），并且搜索速度比FAISS更快。

它不需要代码本训练或单独的训练阶段，支持在线摄取，添加向量即被索引。

通过手写的NEON（ARM）和AVX-512BW（x86）内核，turbovec在ARM上比FAISS IndexPQFastScan快12-20%。

该项目还支持在搜索时进行过滤，可以传递ID允许列表或槽位掩码，所有操作均在本地完成，数据不会离开用户的机器。

[查看原文](https://github.com/RyanCodrai/turbovec)

---

## Google发布Kotlin与Android版ADK 0.1.0，简化AI代理开发 {#news-13}

> Google宣布推出Agent Development Kit的Kotlin版与Android专用库，旨在通过管理复杂编排来简化AI代理的创建。

Google发布了**Agent Development Kit (ADK)** for Kotlin的0.1.0版本，同时推出了一个专门的Android ADK库。

该开源框架旨在简化AI代理开发，能够管理复杂的编排、会话共享和错误处理。

此版本支持混合编排，允许开发者构建多代理系统。在混合编排中，云端模型可以将特定任务无缝卸载给本地设备模型（如`Gemini Nano`），从而增强用户隐私。

此举标志着Google在构建跨平台AI代理工具方面的进一步推进。

开发者可以利用该工具包在Android及其他平台上构建智能代理应用。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## **Google AI Edge Gallery** 应用新增 **MCP** 集成与会话连续性 {#news-14}

> Google AI Edge Gallery 应用通过集成开源模型上下文协议（MCP），扩展了其设备端 AI 的协调与任务自动化能力。

更新后的应用支持实验性 **MCP** 协议，使 **Gemma 4** 能在 **Android** 上跨 **Google Workspace** 和 **Google Maps** 等外部数据源协调复杂任务。

新增的“计划通知”技能可实现任务自动化，而持久聊天历史记录功能则能几乎即时地恢复长会话上下文。

该平台由开源工具包驱动，鼓励社区开发者通过其 **GitHub** 存储库构建和共享自定义的实用工作流、提示配置和工具集成。

[查看原文](https://developers.googleblog.com/a-smarter-google-ai-edge-gallery-mcp-integration-notifications-and-session-continuity/)

---

## GitHub热门项目：Goravel框架发布，为PHP开发者铺就Go之路 {#news-15}

> 一个名为**Goravel**的Go语言Web框架在GitHub上受到关注，其设计风格旨在让PHP开发者能轻松上手。

![GitHub热门项目：Goravel框架发布，为PHP开发者铺就Go之路](https://opengraph.githubassets.com/19cde411ad8b67d37a33e8d2961f41aca169d29de08b89fc4050ce866f15b890/goravel/goravel)

**Goravel**是一个为Gophers提供起始脚手架的全功能、可扩展Web应用程序框架。其设计风格与**Laravel**一致，旨在让PHP开发人员无需学习新框架即可转向Go语言。

该框架提供了丰富的功能模块，涵盖`Artisan Console`、认证、授权、缓存、数据库查询构建器、ORM、队列和事件系统等。

项目的GitHub仓库目前已获得4.7k星。官方文档和示例代码均可在线访问。

[查看原文](https://github.com/goravel/goravel)

---

## GitHub热门项目：Go语言库whatsmeow实现WhatsApp Web API {#news-16}

> **whatsmeow**是一个Go语言库，用于对接WhatsApp Web multidevice API，实现了消息收发与群组管理等核心功能。

![GitHub热门项目：Go语言库whatsmeow实现WhatsApp Web API](https://opengraph.githubassets.com/f812d8209b0a18b50918be316e6dc27097812e84afc9f6491ed935b9814ef0e4/tulir/whatsmeow)

**whatsmeow**库已实现的核心功能包括：向私聊和群组发送文本与媒体消息、接收所有消息、管理群组并处理变更事件。

其他已实现功能还包括：发送和接收输入通知、送达与已读回执、读写应用状态，以及处理重试回执等。

目前该库尚未实现广播列表消息和通话功能。其GitHub仓库拥有6.3k星，采用MPL-2.0许可证。

[查看原文](https://github.com/tulir/whatsmeow)

---

## Google将Gemini CLI过渡至Antigravity CLI，统一AI终端工具 {#news-17}

> Google宣布将社区驱动的`Gemini CLI`过渡到新的`Antigravity CLI`，以统一其AI终端工具并提供更强大的多代理工作流支持。

Google正在通过将社区驱动的`Gemini CLI`过渡到`Antigravity CLI`来统一其AI终端工具。

`Antigravity CLI`是一个新的代理优先平台，专为复杂的多代理工作流构建。

这个新的基于Go的工具提供了更快的执行速度、异步处理和统一架构。

`Antigravity CLI`与`Antigravity 2.0`桌面应用程序同步发布。

企业客户将保持现有访问权限，但个人和免费用户必须在2026年6月18日`Gemini CLI`停止服务前过渡到新平台。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## 谷歌推出Colab命令行界面，强化终端集成 {#news-18}

> 谷歌宣布推出**Google Colab**命令行界面（CLI），允许开发者将本地终端连接到远程Colab运行时。

这个轻量级CLI工具使用户能够轻松请求高性能GPU，并远程运行本地Python脚本。

开发者可以无缝检索工件、日志或模型，例如微调的`Gemma 3`适配器。

该工具直接集成到标准终端环境中，具有高度可编程性，可被AI代理（如Antigravity或Claude Code）使用。

这为管理和执行复杂的机器学习管道提供了灵活、无缝的工作流支持。

谷歌表示，该CLI旨在简化从本地开发环境到云端高性能计算资源的过渡。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 谷歌发布Pay & Wallet开发者MCP服务器，加速集成开发 {#news-19}

> 谷歌发布了全新的`Google Pay & Wallet`开发者MCP服务器，这是一个旨在安全连接AI开发助手、IDE与实时API及账户上下文的开放标准工具。

该服务器允许开发者在集成开发环境中直接搜索官方文档、验证钱包通行证定义、检查集成状态以及管理商户账户，无需切换上下文。

谷歌表示，此集成旨在通过减少上下文切换并提供最新、可靠的AI支持，从而降低开发摩擦，显著加速`Google Pay`的集成工作流。

[查看原文](https://developers.googleblog.com/supercharge-your-integration-workflow-with-the-google-pay-wallet-developer-mcp-server/)

---

## 微软开源 MXC：用于运行不可信代码的沙盒系统 {#news-20}

> **微软** 开源了 **MXC**，这是一个用于沙盒化执行不受信任代码的系统，但其早期预览版本需谨慎使用。

![微软开源 MXC：用于运行不可信代码的沙盒系统](https://opengraph.githubassets.com/27eeee0c8c2994ee810a738dbf709ca11a38307b3424dba238e4e9def39017ec/microsoft/mxc)

**MXC** 是一个代码执行系统，旨在为运行不可信代码提供沙盒环境。它支持 **Windows**、**Linux** 和 **macOS** 平台。

该系统提供多种隔离后端，从操作系统原生的进程沙箱到完整的虚拟机，配置基于统一的 JSON 模式和 **TypeScript SDK**。

需要特别注意的是，该仓库目前提供的是早期预览代码。项目警告称，其底层沙箱机制预计会发生变化。

同时，**MXC SDK** 当前生成的策略可能过于宽松，不应将任何 **MXC** 配置文件视为安全边界。项目仍在持续开发中。

[查看原文](https://github.com/microsoft/mxc)

---

## 2026年迄今最严重安全事件：DOGE泄露与关键系统遭入侵 {#news-21}

> 2026年已发生多起大规模数据泄露与系统入侵事件，被描述为今年迄今最具破坏性的安全事件。

事件包括**DOGE**的大规模数据泄露、关键能源和水系统的被入侵，以及**FBI**监控系统遭黑客攻击。

这些事件在短时间内连续发生，对关键基础设施和国家安全构成了严重威胁。

该报道将这些事件综合列为2026年迄今为止最严重的网络安全灾难。

[查看原文](https://techcrunch.com/2026/06/07/the-worst-hacks-and-breaches-of-2026-so-far/)

---

## ChatGPT新增“锁定模式”，可禁用网络访问以防御提示注入 {#news-22}

> OpenAI为ChatGPT推出了“锁定模式”，用户可以通过禁用网页访问等功能，来保护敏感数据免受提示注入攻击。

![ChatGPT新增“锁定模式”，可禁用网络访问以防御提示注入](https://the-decoder.com/wp-content/uploads/2026/06/cybersecurity_lockdown_mode.png)

**OpenAI**为**ChatGPT**新增了“锁定模式”。启用后，该模式将禁用网页访问、深度研究和代理模式等功能。

此举旨在使通过提示注入攻击进行数据盗窃变得更困难。但报告指出，它无法完全防止此类攻击，仅阻断了数据渗出链的最后一步。

提示注入本身仍是一个尚未解决的根本性安全问题。该模式为处理敏感数据的用户提供了一个额外的防护选项。

[查看原文](https://the-decoder.com/chatgpts-new-lockdown-mode-lets-you-disable-web-access-and-more-to-protect-sensitive-data-from-prompt-injection/)

---

## OpenAI称'聊天已死'，将重建ChatGPT为全能代理应用 {#news-23}

> OpenAI 正在规划对 `ChatGPT` 进行自其发布以来最大规模的改造，将其重塑为一个捆绑多种功能的“超级应用”。

![OpenAI称'聊天已死'，将重建ChatGPT为全能代理应用](https://the-decoder.com/wp-content/uploads/2026/06/chatgpt_dead.png)

OpenAI 内部传出“聊天已死”的论断，公司正计划对 `ChatGPT` 进行根本性重构。

未来的 `ChatGPT` 将不再局限于对话，而是演变为一个集成了编码工具、AI 代理和合作伙伴应用的“超级应用”。

OpenAI 认为，未来属于能够自主处理复杂任务的 AI 代理（Agent）。

[查看原文](https://the-decoder.com/openai-says-chat-is-dead-and-plans-to-rebuild-chatgpt-as-a-full-blown-agent-app/)

---

## Google推出Gemini for Home全栈产品，赋能智能家居合作伙伴 {#news-24}

> Google正通过推出全栈**Gemini** AI产品来扩展其智能家居生态系统，旨在将家庭升级为能理解上下文的AI原生环境。

Google正在推出一个全栈**Gemini** AI产品，以扩展其智能家居生态系统。

该产品集成了先进的摄像头智能、自然语言查询和每日活动摘要功能。

该计划为服务提供商和硬件制造商提供现成的参考设计和API。

这使他们能够在无需大量研发投入的情况下，构建主动的、品牌化的智能家居服务。

该计划旨在超越基本的设备控制，转向能够理解上下文并实时满足用户需求的AI原生家庭。

[查看原文](https://developers.googleblog.com/empowering-service-providers-and-hardware-partners-with-gemini-for-home/)


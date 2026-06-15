---
title: 科技早报 2026-06-15
category: "科技, 科技早报"
excerpt: 谷歌在I/O大会宣布从辅助AI向独立代理转型，并发布了多项AI与开发者工具更新。
lastEdited: 2026年6月15日
tags: [科技早报, 谷歌, AI代理, 开发者工具, GitHub热门项目, 开源生态, AI与机器学习, Google I/O]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026大会：从辅助AI到独立代理的转型](#news-1)
### AI 与机器学习

- [谷歌 TPU 上的 LLM 推理加速：扩散式推测解码实现 3 倍提速](#news-2)
- [白宫因担忧中国访问对Anthropic模型Mythos实施出口限制](#news-3)
- [谷歌 LiteRT-LM 引擎实现极速设备端生成式AI](#news-4)
- [社区利用Tunix与TPU将Gemma训练为推理引擎](#news-5)
- [谷歌发布DiffusionGemma开发者指南与技术详解](#news-6)
- [Google AI Edge Gallery 扩展设备端AI能力，支持MCP协议](#news-7)
### GitHub 热门项目

- [NVIDIA 推出 AI Agent 安全扫描器 `SkillSpector`](#news-8)
- [Puppeteer：控制浏览器的 JavaScript 自动化库](#news-9)
- [Cypress：前端测试利器，支持端到端与组件测试](#news-10)
- [Istio：开源服务网格统一管理微服务通信](#news-11)
- [本地优先的 AI 代理分析工具 agentsview 占据 GitHub 热榜](#news-12)
- [Rust 跨平台 GUI 组件库 `gpui-component` 跻身 GitHub 热门](#news-13)
### 开源生态

- [谷歌发布 Genkit 中间件，强化 AI 代理应用生产可靠性](#news-14)
- [里约“本土”大模型被指合并现有模型引发争议](#news-15)
### 开发者工具

- [谷歌宣布将Gemini CLI迁移至Antigravity CLI统一终端工具](#news-16)
- [Google Tensor ML SDK 进入Beta，支持Pixel 10 TPU部署](#news-17)
- [谷歌发布 Colab CLI，连接本地终端与远程 Colab 运行时](#news-18)
- [Jane Street拥抱形式化方法 智能代理编程改变成本效益权衡](#news-19)
### 安全与隐私

- [FBI 建造模拟城镇以训练应对网络攻击](#news-20)
### 产品与平台

- [Google Pay 为 Android 应用推出 Express checkout 功能](#news-21)
- [Suunto Spark 运动耳机评测：跑步与骑行的完美搭配](#news-22)
- [谷歌推出Gemini for Home全栈产品，赋能智能家居生态](#news-23)
- [探索通用遥控器Harmony的‘不可能梦想’与历史](#news-24)
---

## Google I/O 2026大会：从辅助AI到独立代理的转型 {#news-1}

> 谷歌在 I/O 2026 开发者主题演讲中，宣布了从辅助 AI 向独立代理的转型，并发布了多项重要更新。

谷歌宣布了其 AI 战略的转型，旨在开发能够独立完成任务的 AI 代理。

主题演讲重点包括 `Gemini 3.5` 系列模型的发布，以及 **Antigravity** 代理优先开发平台的重大更新。

面向移动开发者，谷歌推出了新的 Android CLI 工具、Android Bench 评估排行榜，以及一个可将各种框架自动转换为原生 Kotlin 代码的迁移代理。

Web 开发方面，通过 **Chrome DevTools for agents**、`HTML-in-Canvas` API 和 **WebMCP** 提案进行变革。其中 **WebMCP** 是一个开放的 Web 标准，旨在让基于浏览器的 AI 代理能够执行复杂任务。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 谷歌 TPU 上的 LLM 推理加速：扩散式推测解码实现 3 倍提速 {#news-2}

> 加州大学圣地亚哥分校的研究人员在 **Google TPU** 上实现了名为 **DFlash** 的块扩散推测解码方法，将大语言模型推理速度提升了约 3 倍。

**DFlash** 是一种块扩散推测解码方法，它通过在单次前向传播中“绘制”整个候选令牌块来绕过传统自回归起草的顺序瓶颈。

该系统实现了平均 3.13 倍的加速，其峰值性能几乎是现有方法（如 `EAGLE-3`）的两倍。

这是一个已集成到 `vLLM` 生态系统中的开源项目，它利用“免费”的并行验证和高质量的草稿预测来优化 TPU 硬件。

该研究为在专用硬件上加速大模型推理提供了新的高效路径。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## 白宫因担忧中国访问对Anthropic模型Mythos实施出口限制 {#news-3}

> 据报道，美国白宫决定对Anthropic的模型Mythos实施出口限制，部分原因在于担忧其可能已被一个与中国有关联的组织访问，这构成了潜在的国家安全风险。

![白宫因担忧中国访问对Anthropic模型Mythos实施出口限制](https://platform.theverge.com/wp-content/uploads/sites/2/2026/01/STK269_ANTHROPIC_2_C.jpg?quality=90&strip=all&crop=0,0,100,100)

据Semafor报道，白宫的决定部分源于担忧**Anthropic**的模型`Mythos`可能已被一个与中国有关联的组织访问。

报告指出，如果中国政府确实访问了`Mythos 5`或`Fable 5`，将构成严重的国家安全风险。

政府方面担忧对方可能通过蒸馏法——一种让“学生”AI在更先进模型上训练以复制其行为的方法——对模型进行逆向工程。

目前白宫尚未证实这份报告。前特朗普顾问David Sacks在社交平台X上的帖子也未提及中国。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/949644/china-white-house-anthropic-mythos)

---

## 谷歌 LiteRT-LM 引擎实现极速设备端生成式AI {#news-4}

> 谷歌 AI Edge 的 LiteRT-LM 引擎经过生产验证，可高效在移动和边缘设备上运行 Gemma 4 模型。

谷歌 AI Edge 的 `LiteRT-LM` 是一个高优化的基础设施，用于在跨平台移动和边缘环境中运行 **Gemma 4** 模型。

该引擎通过内存高效的动态加载和 `Multi-Token Prediction` 技术（可实现高达 2.2 倍加速）来提升性能。

`LiteRT-LM` 支持原生多模态和代理功能，并提供如 Thinking Mode 和 Constrained Decoding 等高级编排工具。

该引擎正在迅速扩展其集成范围，不仅限于 Android，还将引入新的原生 Swift API 用于 Apple 生态系统，以及基于 WebGPU 加速的 JavaScript API，用于高性能、无服务器的浏览器推理。

[查看原文](https://developers.googleblog.com/blazing-fast-on-device-genai-with-litert-lm/)

---

## 社区利用Tunix与TPU将Gemma训练为推理引擎 {#news-5}

> 在Google Tunix黑客马拉松中，开发者团队成功将小型非推理基础模型转变为通用推理引擎。

在**Kaggle**平台举办的**Google Tunix**黑客马拉松中，参赛者被挑战使用**Kaggle TPU**和有限计算预算进行模型训练。

获胜团队通过一个结合监督微调（SFT）与GRPO、SimPO等先进对齐技术的多阶段后训练流水线，实现了目标。

该竞赛展示了社区可以利用易获取的开源资源，成功训练出高度能力、结构化推理模型，推动了AI开发的民主化。

[查看原文](https://developers.googleblog.com/how-the-community-trained-gemma-to-think-with-tunix-and-tpus/)

---

## 谷歌发布DiffusionGemma开发者指南与技术详解 {#news-6}

> 谷歌发布了 **DiffusionGemma** 的开发者指南，这是一款基于 **Gemma 4** 架构、采用扩散机制进行并行文本生成的实验性模型。

**DiffusionGemma** 通过迭代去噪并行生成和精炼 256 个 token 的块，实现了比传统自回归模型更快的推理速度。

该模型支持双向上下文感知和实时自我纠正，并可在消费级 GPU 上部署。它能更有效地处理数独等复杂的基于约束的任务。

**DiffusionGemma** 集成了 `vLLM` 等流行的推理框架，提供了一种高性能、高效长上下文扩展的非自回归方法。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Google AI Edge Gallery 扩展设备端AI能力，支持MCP协议 {#news-7}

> Google AI Edge Gallery 应用更新，引入了对开源 Model Context Protocol 的实验性支持，增强了设备端 AI 的协调与交互能力。

**Google AI Edge Gallery** 应用扩展了其设备端 AI 能力，引入了对开源 **Model Context Protocol (MCP)** 的实验性支持。该更新在 Android 上允许 **Gemma 4** 协调跨外部数据源（如 **Google Workspace** 和 **Google Maps**）的复杂任务。

为了实现更主动和持久的用户交互，更新增加了 `Schedule Notification` 技能用于自动化例程，以及一个持久聊天历史记录功能，可几乎即时恢复长期会话上下文。

该平台由一个开源工具包驱动，鼓励社区开发者通过其 GitHub 仓库构建和共享自定义的实用工作流、提示配置和工具集成。

[查看原文](https://developers.googleblog.com/a-smarter-google-ai-edge-gallery-mcp-integration-notifications-and-session-continuity/)

---

## NVIDIA 推出 AI Agent 安全扫描器 `SkillSpector` {#news-8}

> NVIDIA 发布了用于 AI agent 技能的安全扫描工具 `SkillSpector`，该项目在发布当日即获得大量关注。

**NVIDIA/SkillSpector** 是一个专门用于扫描 AI agent 技能安全性的工具，旨在提升 AI 系统的安全性。

该项目在 GitHub Trending 上归类于 Python 语言，并在发布当日就获得了 964 颗星。

截至目前，该项目在 GitHub 上的星标总数已达到 5,694 颗。

[查看原文](https://github.com/NVIDIA/SkillSpector)

---

## Puppeteer：控制浏览器的 JavaScript 自动化库 {#news-9}

> Puppeteer 是一个强大的 JavaScript 库，提供高级 API 来通过 **DevTools 协议** 或 **WebDriver BiDi** 控制 **Chrome** 或 **Firefox**。

![Puppeteer：控制浏览器的 JavaScript 自动化库](https://opengraph.githubassets.com/fff654678870febd935a0ba2b0e5bad878c488f59c8aa5047d1a1f357bde3d92/puppeteer/puppeteer)

**Puppeteer** 默认以无头模式运行，没有可见的 UI。它可以通过 **npm** 安装，并在安装期间自动下载兼容的 **Chrome**。

用户也可以选择安装 `puppeteer-core` 作为库，它不包含浏览器下载，适合已有浏览器环境的场景。

该项目还提供了实验性的 **WebMCP API** 支持，并推出了 `chrome-devtools-mcp`，一个基于 **Puppeteer** 的用于浏览器自动化和调试的 **MCP** 服务器。

[查看原文](https://github.com/puppeteer/puppeteer)

---

## Cypress：前端测试利器，支持端到端与组件测试 {#news-10}

> 开源测试工具 **Cypress** 发布最新版本 `v15.17.0`，为开发者提供快速、可靠的浏览器内测试能力。

![Cypress：前端测试利器，支持端到端与组件测试](https://repository-images.githubusercontent.com/31629751/ecd5d200-af93-11e9-93e3-145304e72266)

**Cypress** 是一款专注于在浏览器中运行测试的工具，旨在提供快速、简单且可靠的测试体验。

该项目支持通过 `npm`、`yarn` 或 `pnpm` 进行安装，并在 **MIT** 许可证下开源。

其功能涵盖端到端测试、组件测试，并兼容 `react-testing-library` 等多个主流测试库。

开发者可以使用 **Cypress** 云服务配置徽章，以展示项目的测试状态或测试数量。

最新发布的 `v15.17.0` 版本于2026年6月9日更新。

[查看原文](https://github.com/cypress-io/cypress)

---

## Istio：开源服务网格统一管理微服务通信 {#news-11}

> **Istio** 是一个开源的服务网格，它透明地叠加在现有分布式应用程序上，提供安全连接和监控服务的统一方式。

![Istio：开源服务网格统一管理微服务通信](https://repository-images.githubusercontent.com/74175805/ed825500-65ad-11e9-821c-f6148eadb7c8)

其控制平面为底层的集群管理平台（如 **Kubernetes**）提供了一个抽象层。

该网格由 **Envoy** 等核心组件构成，**Envoy** 作为每个微服务的 **Sidecar** 代理来处理流量。

这种架构旨在帮助开发者更高效地管理、保护和监控复杂的微服务通信。

[查看原文](https://github.com/istio/istio)

---

## 本地优先的 AI 代理分析工具 agentsview 占据 GitHub 热榜 {#news-12}

> **agentsview** 是一个本地优先的 AI 代理会话分析与洞察工具，支持包括 **Claude Code** 在内的众多代理，并在 GitHub 上快速增长。

**agentsview** 是一个本地优先的工具，专注于为 AI 代理提供会话搜索、分析、洞察和令牌使用统计功能。

该项目明确支持 **Claude Code**、**Codex** 以及超过 20 种其他代理，帮助开发者理解和优化其 AI 工作流程。

该项目使用 **Go** 语言编写，增长势头强劲，发布当日即获得超过 **300** 颗星标，总星标数已超过 **2,600**。

[查看原文](https://github.com/kenn-io/agentsview)

---

## Rust 跨平台 GUI 组件库 `gpui-component` 跻身 GitHub 热门 {#news-13}

> Rust 语言项目 `gpui-component` 因其构建跨平台桌面应用的能力，在 GitHub 趋势榜中受到关注。

开源项目 **longbridge/gpui-component** 是一个 Rust GUI 组件库，旨在帮助开发者构建出色的跨平台桌面应用程序。

该项目基于 **GPUI** 框架构建，当前在 GitHub Trending 中使用 Rust 语言上榜。

根据统计，该项目在 GitHub 上已累积超过 11,700 颗星，并在统计当日新增了 32 颗星。

[查看原文](https://github.com/longbridge/gpui-component)

---

## 谷歌发布 Genkit 中间件，强化 AI 代理应用生产可靠性 {#news-14}

> **Google** 宣布为开源框架 **Genkit** 推出中间件功能，旨在帮助开发者构建更可靠、可投入生产环境的 AI 代理应用。

**Genkit** 是一个支持 TypeScript、Go、Dart 和 Python 的开源框架，专为构建具有代理能力的 AI 应用程序而设计。

新推出的中间件系统允许开发者拦截生成调用，以注入重试、模型回退和人机在环工具审批等自定义行为。

开发者可以在生成、模型和工具层附加钩子，确保模型输出的高可靠性和确定性控制，并能创建和叠加自定义中间件。

所有中间件配置均可通过专用的开发者 UI 进行检查和调试，方便管理。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## 里约“本土”大模型被指合并现有模型引发争议 {#news-15}

> 一个名为 **Rio-3.5-Open-397B** 的大语言模型被指其权重直接合并自其他模型，其原创性受到质疑。

![里约“本土”大模型被指合并现有模型引发争议](https://opengraph.githubassets.com/40a33b55fc0f1969d96cb90783c69f4f5b6c3cd5a89205b0a796749362ea6ec6/nex-agi/Nex-N2)

有证据显示，**IplanRIO** 声称训练的 **Rio-3.5-Open-397B** 模型的权重，是 `Nex-N2_pro` 和 `Qwen3.5-397B-A17B` 的直接合并。

合并比例据称大约为 0.6 倍 `Nex` 和 0.4 倍 `Qwen`。移除系统提示后，**Rio** 模型有 79% 的时间自认为是来自 **Nex-AGI** 的 `Nex`。

**Nex-AGI** 声称没有发现任何证据表明 **IplanRIO** 进行了独立训练，该指控来自一个第三方 GitHub Issue。

[查看原文](https://github.com/nex-agi/Nex-N2/issues/4)

---

## 谷歌宣布将Gemini CLI迁移至Antigravity CLI统一终端工具 {#news-16}

> 谷歌宣布将其社区驱动的 `Gemini CLI` 过渡到新的 `Antigravity CLI`，以统一其AI终端工具链并提供更强的多代理工作流支持。

谷歌正在将 `Gemini CLI` 过渡至全新的 `Antigravity CLI`。后者是一个以代理为核心的新平台，专为构建复杂、多代理工作流而设计，基于Go语言开发，提供更快的执行速度和异步处理能力。

此次迁移与 `Antigravity 2.0` 桌面应用程序同步进行。企业客户将保持现有访问权限，而个人和免费用户则需在 `Gemini CLI` 于2026年6月18日停止服务前迁移至新平台。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## Google Tensor ML SDK 进入Beta，支持Pixel 10 TPU部署 {#news-17}

> Google Tensor ML SDK 进入 Beta 阶段，为开发者提供了构建和部署高性能机器学习模型到 Google Pixel 10 TPU 的统一工作流。

**Google Tensor ML SDK** 正在进入 Beta 阶段，允许开发者构建高性能机器学习模型并直接部署到 **Google Pixel 10** 设备的 TPU 上。

通过与 **LiteRT**（Google 的边缘部署框架）集成，该 SDK 为开发者提供了一个统一的工作流，用于转换、编译和运行 **PyTorch** 或 **TFLite** 模型，并具有强大的回退选项。

一个新的模型花园提供了超过 100 个经典和生成式 AI 模型，包括 **Gemma 3**，能够实现低延迟、私密的功能，如语音识别、计算机视觉和文本生成。

[查看原文](https://developers.googleblog.com/google-tensor-sdk-beta-with-litert/)

---

## 谷歌发布 Colab CLI，连接本地终端与远程 Colab 运行时 {#news-18}

> 谷歌推出了 Colab 命令行界面 (CLI)，允许开发者将本地终端连接到远程 Colab 运行时，以请求高性能 GPU 并运行机器学习工作流。

该轻量级 CLI 工具支持用户轻松请求 GPU 资源，并从本地终端远程执行 Python 脚本。

它能无缝检索制品日志或模型，例如微调的 Gemma 3 适配器。

通过直接集成到标准终端环境，该工具具有高度可编程性，可供 AI 代理（如 Antigravity 或 Claude Code）使用，以管理复杂的机器学习管道。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Jane Street拥抱形式化方法 智能代理编程改变成本效益权衡 {#news-19}

> 金融巨头Jane Street改变了对形式化方法的长期看法，组建专门团队，并将智能代理编程视为降低其高昂成本的关键。

![Jane Street拥抱形式化方法 智能代理编程改变成本效益权衡](https://blog.janestreet.com/formal-methods-at-jane-street-index/./oxcaml-prover.png)

**Jane Street** 过去25年对形式化方法不感兴趣，但现在正在组建专注于此的团队。

传统形式化方法成本高昂，例如 **seL4** 微内核验证花费了25人年验证8,700行C代码。

**智能代理编程** 的出现改变了公司对形式化方法成本与效益的权衡计算。

模型虽不能独立构建高难度证明，但能极大辅助使用形式化方法工具。

在智能代理编程时代，验证代码质量与模型生成代码之间差距的瓶颈变得更加重要。

[查看原文](https://blog.janestreet.com/formal-methods-at-jane-street-index/?from_theconsensus=1)

---

## FBI 建造模拟城镇以训练应对网络攻击 {#news-20}

> 美国联邦调查局在阿拉巴马州建立了一个全尺寸的城镇复制品，用于模拟和训练应对复杂的网络攻击场景。

![FBI 建造模拟城镇以训练应对网络攻击](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/high.webp?quality=90&strip=all&crop=0,0,100,100)

联邦调查局去年在亨茨维尔开设了一个名为“网络靶场”的设施，占地 22,000 平方英尺，模拟了一个完整的城镇环境。

该靶场包含便利店、加油站、医院和家具齐全的房屋等建筑，所有设施均连接在一起，模拟真实城镇的网络结构。

靶场的核心是一个小型数据中心，拥有超过 200 台服务器，专门设计用于被黑客攻击和感染恶意软件，以供训练使用。

此外，靶场还设有一个伪造的电力公司，可以利用其假数据中心来模拟操纵价格等网络物理攻击场景。

[查看原文](https://www.theverge.com/tech/949648/fbi-fake-town-cyberattacks-kinetic-cyber-range)

---

## Google Pay 为 Android 应用推出 Express checkout 功能 {#news-21}

> Google Pay 发布了面向 Android 原生应用的新功能，旨在通过集成用户存储的凭据来大幅简化移动支付结账流程。

![Google Pay 为 Android 应用推出 Express checkout 功能](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

**Google Pay** 为 Android 应用推出了 **Express checkout** 功能。开发者可以利用用户在 **Google Wallet** 中存储的支付和地址凭据，为用户提供快速结账体验。

该功能支持在 Android 应用中实现 `onPaymentDataChanged` 和 `onPaymentAuthorized` 等回调，这些回调此前已在 Web 端支持。

通过这些回调，开发者可以在用户与 **Google Pay** 界面交互时动态更新配送选项、税费和总价，并在不关闭界面的情况下处理授权反馈。

此功能在 `play-services-wallet:20.0.0` 及更高版本中可用。开发者需要在 `build.gradle` 文件中更新依赖项至该版本。

使用动态回调可以将 **Google Pay** 按钮前移至产品详情页或购物车页面，实现真正的“快速结账”体验。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)

---

## Suunto Spark 运动耳机评测：跑步与骑行的完美搭配 {#news-22}

> 评测 Suunto Spark 开放式运动耳机，分析其设计、佩戴舒适度及在运动场景下的实际表现。

![Suunto Spark 运动耳机评测：跑步与骑行的完美搭配](https://media.wired.com/photos/6a2cd85e0e9ce4f6012bab35/191:100/w_1280,c_limit/Suunto%20Michael%20Sawh%20.jpg)

**Suunto Spark** 是 **Suunto** 品牌在不到五年内推出的第五款音频产品，采用了新的开放式耳塞设计。

耳机每只重约 9 克，采用钛和硅胶材质，佩戴舒适，适合跑步、骑行和远足等运动。

该产品具备 IP55 防汗防雨等级，但充电盒不具备同等防护能力。

耳机提供触摸控制和头部手势控制，但评测指出触摸控制在运动中或手湿时可能不易操作。

[查看原文](https://www.wired.com/review/suunto-spark/)

---

## 谷歌推出Gemini for Home全栈产品，赋能智能家居生态 {#news-23}

> 谷歌正通过推出名为 **Gemini for Home** 的全栈AI产品来扩展其智能家居生态系统，为合作伙伴提供现成的设计与API。

谷歌正在推出 **Gemini for Home**，这是一个集成了先进摄像头智能、自然语言查询和每日活动摘要功能的全栈AI产品。该计划旨在为服务提供商和硬件制造商提供现成的参考设计和API。

谷歌的目标是帮助合作伙伴构建主动的、品牌化的服务，无需投入大量研发资源。其最终愿景是打造一个能够理解上下文、实时响应用户需求的原生AI智能家居环境。

[查看原文](https://developers.googleblog.com/empowering-service-providers-and-hardware-partners-with-gemini-for-home/)

---

## 探索通用遥控器Harmony的‘不可能梦想’与历史 {#news-24}

> 在科技播客《Version History》中，主持人与嘉宾探讨了通用遥控器**Harmony**的故事，这款产品曾被视为市场上最好的选择，但仍未完全实现通用控制的完美愿景。

![探索通用遥控器Harmony的‘不可能梦想’与历史](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/Harmony_Remote_Site.jpg?quality=90&strip=all&crop=0,0,100,100)

**Harmony**是一款通用遥控器，多年来曾被认为是市场上最好的同类产品。

即便如此，它也可能是唯一真正重要的通用遥控器，但其仍无法完全实现通用控制的完美愿景。

《The Verge》的David Pierce、Nilay Patel和John Higgins在节目中讲述了Harmony的发展历程与挑战。

节目嘉宾包括**Mill**的CEO、**Nest**的联合创始人Matt Rogers，为讨论增添了行业视角。

[查看原文](https://www.theverge.com/podcast/949620/harmony-universal-remote-version-history)


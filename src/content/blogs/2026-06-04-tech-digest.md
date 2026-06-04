---
title: 科技早报 2026-06-04
category: "科技, 科技早报"
excerpt: 谷歌推出Gemma 4 12B多模态模型与代理平台，GitHub热议本地AI工具，全球关注AI安全治理与数据泄露风险。
lastEdited: 2026年6月4日
tags: [科技早报, AI, Google, Gemma, 开源, 开发者工具, 安全, GitHub]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Google DeepMind 发布 Gemma 4 12B 多模态模型](#news-1)
- [谷歌发布Gemma 4 12B开发者指南](#news-2)
- [LiteRT-LM引擎发布，大幅提升设备端Gemma 4模型推理速度](#news-3)
- [Google I/O 2026发布会：从辅助AI到独立代理的全面升级](#news-4)
- [加州大学研究者在 Google TPU 上实现 DFlash，LLM 推理加速超 3 倍](#news-5)
- [Alphabet计划融资850亿美元支持**Google** AI业务](#news-6)
### GitHub 热门项目

- [思科开源AI安全治理工具DefenseClaw](#news-7)
- [GitHub热门：本地AI模型运行工具Ollama星标数超17万](#news-8)
- [GitHub趋势：Scrapling框架引领自适应网页抓取](#news-9)
- [NousResearch/hermes-agent：支持多模型的自我改进 AI 智能体](#news-10)
- [GitHub Trending 项目：can1357/oh-my-pi 终端 AI 代理](#news-11)
- [GitHub Trending：rustdesk/rustdesk 开源远程桌面软件](#news-12)
### 开源生态

- [Go 语言项目在 GitHub 趋势榜受关注，提供高效软件构建方式](#news-13)
- [谷歌发布 Kotlin 与 Android 版 ADK 0.1.0，简化 AI 智能体开发](#news-14)
- [Nous Research发布Hermes Desktop开源AI代理，支持全平台](#news-15)
- [开源工具 Wander 探索“小网络”，灵感源于 StumbleUpon](#news-16)
### 开发者工具

- [**GitLab**裁员14%以重组服务AI工作负载](#news-17)
- [谷歌 Gemma 4 12B 模型登陆笔记本电脑，支持本地代理工作流](#news-18)
- [Google Pay为Android应用推出动态回调，优化原生结账体验](#news-19)
- [Google宣布将Gemini CLI迁移至Antigravity CLI](#news-20)
### 安全与隐私

- [新监管要求谷歌提供退出 AI 搜索功能的选项](#news-21)
- [2026年迄今最严重的安全事件与数据泄露盘点](#news-22)
- [OpenAI等科技巨头致信国会呼吁立法防止AI开发生物武器](#news-23)
- [xAI要求法院公开Grok深度伪造色情案受害者身份](#news-24)
---

## Google DeepMind 发布 Gemma 4 12B 多模态模型 {#news-1}

> Google DeepMind 推出了 Gemma 4 12B，这是一个统一的、无编码器的多模态模型，旨在高性能本地运行。

![Google DeepMind 发布 Gemma 4 12B 多模态模型](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Social_Image_G4_12B.width-1300.png)

**Gemma 4 12B** 是一个统一的、无编码器的多模态模型，旨在直接在笔记本电脑上提供高性能的多模态智能。

该模型结合了移动优先的效率与先进的推理能力，其基准性能接近 **Google** 的 26B 模型。

该模型可在本地运行，仅需 16GB VRAM 或统一内存，并以 Apache 2.0 许可证发布。

这是 **Google** 首个具有原生音频输入的中型模型。

[查看原文](https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemma-4-12b/)

---

## 谷歌发布Gemma 4 12B开发者指南 {#news-2}

> 谷歌发布了`Gemma 4 12B`模型的开发者指南，该模型采用新型无需编码器的架构，专为消费设备的本地高性能AI执行而设计。

**谷歌**发布了`Gemma 4 12B`模型的开发者指南，这是一个密集型、多模态模型，专为在消费设备上进行高性能本地AI执行而设计。

该模型引入了一种新颖的、无需编码器的架构，这是其技术上的主要创新。

新架构绕过了传统的视觉和音频编码器，允许将多模态数据直接输入到LLM主干网络中，从而简化处理流程。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## LiteRT-LM引擎发布，大幅提升设备端Gemma 4模型推理速度 {#news-3}

> **Google AI Edge**的`LiteRT-LM`是一个经过生产验证、高度优化的基础设施，专用于在跨平台移动和边缘环境中运行**Gemma 4**模型。

该引擎通过利用内存高效的动态加载和**多令牌预测**技术，可将模型运行速度提升高达2.2倍，并支持思考模式和约束解码等高级编排工具。

`LiteRT-LM`正在快速扩展其集成范围，为**Apple**生态系统引入了新的原生Swift API，并为浏览器推理引入了基于WebGPU加速的JavaScript API。

这些能力旨在设备上解锁模型的原生多模态和代理功能，实现极速的本地生成式AI体验。

[查看原文](https://developers.googleblog.com/blazing-fast-on-device-genai-with-litert-lm/)

---

## Google I/O 2026发布会：从辅助AI到独立代理的全面升级 {#news-4}

> Google在2026年开发者大会上宣布了从辅助型AI向独立代理（agents）的战略转型，并发布了包括`Gemini 3.5`在内的一系列重磅更新。

**Google**宣布其AI战略从辅助型AI向独立代理转型。为此，公司发布了`Gemini 3.5`系列模型，并对**Antigravity**代理优先开发平台进行了重大更新。

为移动开发者，**Google**引入了新的`Android CLI`工具和`Android Bench`评估排行榜。同时推出了一种自动迁移代理（Migration agent），可将各种框架快速转换为原生`Kotlin`代码。

Web开发方面，推出了用于代理的`Chrome DevTools`、`HTML-in-Canvas API`。此外，提出了`WebMCP`标准，旨在使基于浏览器的AI代理能够执行复杂任务。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 加州大学研究者在 Google TPU 上实现 DFlash，LLM 推理加速超 3 倍 {#news-5}

> 加州大学圣地亚哥分校研究人员在 Google TPU 上成功实现了名为 DFlash 的推测解码方法，显著提升了大语言模型的推理速度。

该方法通过“绘制”整个候选词块而非逐个预测，绕过了传统自回归草稿生成的顺序瓶颈，从而实现了高效的并行化。

系统平均实现了 3.13 倍的加速，其峰值性能几乎是现有方法如 `EAGLE-3` 的两倍，展示了在 TPU 上优化 LLM 推理的巨大潜力。

这一开源实现已集成到 `vLLM` 生态系统中，利用并行验证和高质量草稿预测，旨在为开发者提供更快的 LLM 部署方案。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## Alphabet计划融资850亿美元支持**Google** AI业务 {#news-6}

> **Alphabet**计划通过股票发行筹集总计850亿美元，用于其AI业务，首次发行已被超额认购，显示出投资者对AI的强烈兴趣。

![Alphabet计划融资850亿美元支持**Google** AI业务](https://techcrunch.com/wp-content/uploads/2025/05/GettyImages-2215577882.jpg?resize=1200,800)

**Alphabet**首次发行了价值450亿美元的股票，其中包括**伯克希尔·哈撒韦公司**购买的100亿美元，并计划在下季度再出售400亿美元。

**Google**母公司**Alphabet**在2026年第一季度收入达1100亿美元，同比增长22%。

公司预计在2026年底前将在资本支出上花费1800亿至1900亿美元，主要用于AI基础设施和数据中心。

此次成功的股票发行被视为公开市场对AI投资兴趣强烈的信号，对更广泛的AI IPO管道是一个积极迹象。

但文章也指出，未来五年近8万亿美元的AI支出承诺能否被公开市场长期吸收仍是一个疑问。

[查看原文](https://techcrunch.com/2026/06/03/alphabets-record-breaking-85b-raise-for-googles-ai-business-is-a-helluva-good-signal/)

---

## 思科开源AI安全治理工具DefenseClaw {#news-7}

> 思科发布开源工具DefenseClaw，旨在为OpenClaw和智能体AI运行时提供安全治理、审计与控制。

![思科开源AI安全治理工具DefenseClaw](https://opengraph.githubassets.com/3d548166956f0d22b0d1b276c38c5a39e80b4f5fcfdde757f1a7c202be164a30/cisco-ai-defense/defenseclaw)

**DefenseClaw**是针对OpenClaw和智能体AI运行时的安全治理工具，提供治理、运行时检查和审计三大功能。

其核心原则是，所有不受信任的代理能力在执行前必须经过扫描和治理，并在策略判定为不安全时被阻止。

该工具包含一个Python CLI、一个Go网关sidecar和一个TypeScript插件，并支持准入控制、运行时护栏和**CodeGuard**静态检查等亮点功能。

审计数据可导出为SQLite、JSONL、OTLP等多种格式，以满足可观察性与合规性要求。

[查看原文](https://github.com/cisco-ai-defense/defenseclaw)

---

## GitHub热门：本地AI模型运行工具Ollama星标数超17万 {#news-8}

> 项目`ollama/ollama`在GitHub上持续热门，它旨在简化本地运行多种大语言模型的过程。

该项目是GitHub Trending上的一个Go语言仓库，名为`ollama/ollama`。

其核心功能是帮助用户在本地快速运行诸如Kimi-K2.6、GLM-5.1、DeepSeek、Qwen、Gemma等多种大语言模型。

截至统计时间，该项目在GitHub上已拥有173,089颗星，当日新增123颗星。

庞大的星标数量反映了开发者对于便捷部署和本地化运行AI模型的强烈兴趣。

[查看原文](https://github.com/ollama/ollama)

---

## GitHub趋势：Scrapling框架引领自适应网页抓取 {#news-9}

> 一个名为`Scrapling`的自适应Web抓取框架在GitHub趋势榜上表现突出，旨在处理从单次请求到大规模爬虫的各类任务。

该项目名为`Scrapling`，其描述为“🕷️ An adaptive Web Scraping framework that handles everything from a single request to a full-scale crawl!”。它目前在GitHub Trending Python仓库中热门。

根据公开数据，该项目获得了**60,371**颗星，并且今日新增了1,067颗星，社区增长势头强劲。

项目主要使用**Python**语言，核心特点是其“自适应”能力，旨在为开发者提供一个能灵活应对不同规模网页抓取需求的框架。

[查看原文](https://github.com/D4Vinci/Scrapling)

---

## NousResearch/hermes-agent：支持多模型的自我改进 AI 智能体 {#news-10}

> NousResearch/hermes-agent 是一款由 **Nous Research** 构建的 AI 智能体，其核心特点是具备从经验中学习并自我改进的能力。

![NousResearch/hermes-agent：支持多模型的自我改进 AI 智能体](https://opengraph.githubassets.com/2089a088f8268afaac77759febe6d3e53394454d91acc72d37093bb5e27d4ed0/NousResearch/hermes-agent)

该智能体拥有内置的学习循环，能够从交互经验中创建新技能并持续优化。它支持在低成本 **VPS**、GPU 集群或无服务器基础设施上灵活部署。

用户可通过 **Telegram** 与智能体交互，它也能在云端虚拟机环境中运行。

在模型支持方面，`hermes-agent` 兼容多种选项，包括 **Nous Portal**、**OpenRouter**、**NovitaAI**、**NVIDIA NIM**、**Xiaomi MiMo** 等在内的多个服务商与模型。

[查看原文](https://github.com/NousResearch/hermes-agent)

---

## GitHub Trending 项目：can1357/oh-my-pi 终端 AI 代理 {#news-11}

> can1357/oh-my-pi 是一个在 GitHub Trending 上快速上升的项目，它是一个用于终端的 AI 编码代理。

**can1357/oh-my-pi** 是一个用 **TypeScript** 编写的仓库，它是一个用于终端的 AI 编码代理。

项目描述包括哈希锚定编辑、优化的工具框架、LSP、Python、浏览器和子代理等功能。

截至特定时间，该项目在 GitHub 上拥有 10,325 颗星，当日新增 345 颗星。

[查看原文](https://github.com/can1357/oh-my-pi)

---

## GitHub Trending：rustdesk/rustdesk 开源远程桌面软件 {#news-12}

> 开源远程桌面软件**RustDesk**作为**TeamViewer**的替代品，在GitHub上持续获得高关注度和社区支持。

**RustDesk**是一个专为自托管设计的开源远程桌面应用程序，旨在为用户提供**TeamViewer**的替代选择。

该项目在GitHub Trending上榜，其核心开发语言为**Rust**。

根据2026年6月4日的数据，该项目已积累115,511颗星，当日新增星数达到103颗。

[查看原文](https://github.com/rustdesk/rustdesk)

---

## Go 语言项目在 GitHub 趋势榜受关注，提供高效软件构建方式 {#news-13}

> **Go** 语言项目在 GitHub Trending Go 仓库中热门，旨在让构建简单、可靠和高效的软件变得容易。

![Go 语言项目在 GitHub 趋势榜受关注，提供高效软件构建方式](https://opengraph.githubassets.com/e8b1df590ba82a9231bdca6b2d5f3f21f6a7153245a9d5a5e695df257411da2f/golang/go)

**Go** 是一个开源编程语言。该项目的规范 Git 仓库位于 `https://go.googlesource.com/go`，官方二进制发行版可在 `https://go.dev/dl/` 获取。

Go 项目的代码贡献指南位于 `https://go.dev/doc/contribute`。该项目主要使用 Go 语言编写，占比 90.2%。

该项目在 GitHub 上拥有 134k 颗星和 19.1k 个分支，显示出较高的社区参与度。

[查看原文](https://github.com/golang/go)

---

## 谷歌发布 Kotlin 与 Android 版 ADK 0.1.0，简化 AI 智能体开发 {#news-14}

> **Google** 发布了 `Agent Development Kit` (ADK) 的 Kotlin 版和 Android 专用库 `0.1.0`，旨在简化跨云与边缘环境的 AI 智能体构建。

**Google** 宣布推出 `Agent Development Kit` (ADK) for Kotlin 的 `0.1.0` 版本，同时发布了专用于 Android 的 ADK 库。

这个开源框架通过管理复杂的编排、会话共享和错误处理，简化了 AI 智能体的创建过程，支持跨云和边缘环境。

此次发布支持混合编排，使开发者能够构建多智能体系统。该模式允许云端模型将特定任务卸载给本地设备模型（如 `Gemini Nano`）执行，以增强用户隐私。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## Nous Research发布Hermes Desktop开源AI代理，支持全平台 {#news-15}

> 人工智能研究机构Nous Research发布了名为`Hermes Desktop`的开源AI代理应用。

![Nous Research发布Hermes Desktop开源AI代理，支持全平台](https://the-decoder.com/wp-content/uploads/2026/06/hermes-og-image-blue.png)

该应用在MIT开源许可证下发布，旨在为所有平台提供通用的AI代理功能。

`Hermes Desktop`允许用户在本地部署和使用AI代理，增强自主控制能力。

[查看原文](https://the-decoder.com/nous-research-releases-hermes-desktop-an-open-source-ai-agent-for-every-platform/)

---

## 开源工具 Wander 探索“小网络”，灵感源于 StumbleUpon {#news-16}

> 一个受 StumbleUpon 启发的开源工具 Wander 旨在帮助用户发现独立网站推荐的有趣内容。

![开源工具 Wander 探索“小网络”，灵感源于 StumbleUpon](https://techcrunch.com/wp-content/uploads/2026/06/flower-sunset-nature-GettyImages-2180615491.jpg?resize=1200,675)

开发者 Susam Pal 发布了 **Wander Console**，这是一个开源的、自托管的网络控制台。其灵感来源于 **Kagi** 的“小网络”搜索理念。

用户无需服务器端代码或数据库，只需将两个文件上传到自己的网站即可使用。该控制台可通过 **GitHub Pages** 或 **Codeberg Pages** 托管。

该项目带有早期网络发现概念如 Webrings 和 StumbleUpon 的影子，旨在让用户探索由独立网站所有者社区推荐的有趣网页。

[查看原文](https://techcrunch.com/2026/06/03/meet-wander-a-stumbleupon-inspired-tool-for-discovering-the-small-web/)

---

## **GitLab**裁员14%以重组服务AI工作负载 {#news-17}

> **GitLab**宣布裁员约14%，即约350名员工，作为重组的一部分，以扩展其平台并服务于AI工作负载带来的流量增长。

![**GitLab**裁员14%以重组服务AI工作负载](https://techcrunch.com/wp-content/uploads/2024/12/PXL_20220520_112153305.jpg?resize=1200,903)

该公司退出了22个国家并减少了管理层级，同时正投资基础设施以支持AI工作流。

**GitLab**首席执行官比尔·斯泰普尔斯表示，智能体工作负载正给开发者基础设施带来压力。

**GitLab**与一家未指明的AI实验室合作，为其AI工作负载设计和重建基础设施。

**GitLab**报告第一季度收入为2.64亿美元，同比增长23%，毛利率为88%。

预计此次重组将产生3000万至3500万美元的费用。

[查看原文](https://techcrunch.com/2026/06/03/gitlab-cuts-14-of-staff-as-it-scales-its-platform-to-serve-ai-workloads/)

---

## 谷歌 Gemma 4 12B 模型登陆笔记本电脑，支持本地代理工作流 {#news-18}

> Google DeepMind 发布 **Gemma 4 12B** 模型，为配备 16GB RAM 的日常笔记本电脑带来代理式、多模态 AI 功能。

用户可通过 **macOS** 上的 **Google AI Edge Gallery** 使用该模型进行动态 Python 代码执行和可视化。

通过 **Google AI Edge Eloquent**，用户可进行完全离线的语音听写和文本编辑，无需联网。

开发者工作流通过 **LiteRT-LM CLI** 新增的 `serve` 命令得到增强，该命令创建了一个行业兼容的本地端点，用于驱动完全本地的 AI 工具和代理。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## Google Pay为Android应用推出动态回调，优化原生结账体验 {#news-19}

> Google Pay为Android原生应用新增了动态回调功能，使开发者能够在结账流程中实时更新支付信息。

![Google Pay为Android应用推出动态回调，优化原生结账体验](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

**Google Pay** 为Android原生应用推出了“快速结账”功能，允许开发者利用用户已存储在**Google钱包**中的支付和地址凭证。

开发者现在可以在应用中实现此前仅在Web端支持的`onPaymentDataChanged`和`onPaymentAuthorized`回调。

这些动态回调允许在用户与支付界面交互时，动态更新配送选项、税费和总价，提供更流畅的结账体验。

该功能要求应用依赖**play-services-wallet:20.0.0**或更高版本。开发者可通过扩展`BasePaymentDataCallbacks`类来处理特定事件。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)

---

## Google宣布将Gemini CLI迁移至Antigravity CLI {#news-20}

> Google宣布将其Gemini CLI工具迁移至新的Antigravity CLI，这是一个为复杂多代理工作流构建的代理优先平台。

Google正在将**Gemini CLI**过渡到**Antigravity CLI**。这是一个新的基于Go语言的工具，提供了更快的执行速度、异步处理和统一架构。

新的统一架构可与**Antigravity 2.0**桌面应用程序同步。个人和免费用户必须在Gemini CLI停止服务前（2026年6月18日）迁移到新平台。

企业客户将维持对现有**Gemini CLI**的访问权限。新工具旨在支持下一代代理开发工作流。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## 新监管要求谷歌提供退出 AI 搜索功能的选项 {#news-21}

> 英国监管机构要求谷歌提供一种工具，允许网站发布者选择退出其生成式 AI 搜索功能。

![新监管要求谷歌提供退出 AI 搜索功能的选项](https://techcrunch.com/wp-content/uploads/2019/10/google-search-app-ios.jpg?resize=1200,644)

发布者将能通过 **Google Search Console** 中的新开关选择退出。选择退出后，其网站将不会出现在谷歌的生成式 AI 搜索结果中。

谷歌表示，该选择退出选项将首先在英国的部分发布者中进行测试，随后在全球范围内推出。

谷歌同时声明，此选择退出操作不会被用作传统谷歌搜索的排名信号。

[查看原文](https://techcrunch.com/2026/06/03/publishers-will-be-able-to-opt-out-of-ai-search-thanks-to-new-regulation/)

---

## 2026年迄今最严重的安全事件与数据泄露盘点 {#news-22}

> 2026年已发生多起重大安全事件，涉及大规模数据泄露、关键基础设施被攻击以及监控系统遭入侵。

2026年至今，已发生多起引起广泛关注的安全事件和数据泄露事故。

这些事件包括了大规模的 **DOGE** 数据泄露事件。

关键的能源和供水系统也遭到了黑客攻击，引发了对关键基础设施安全的担忧。

此外，连 **FBI** 的监控系统也未能幸免，出现了被黑客入侵的情况。

[查看原文](https://techcrunch.com/2026/06/03/the-worst-hacks-and-breaches-of-2026-so-far/)

---

## OpenAI等科技巨头致信国会呼吁立法防止AI开发生物武器 {#news-23}

> **OpenAI**、**Anthropic**、**Google DeepMind** 等公司的CEO签署公开信，敦促美国国会通过新法律以防止其人工智能技术被用于开发危险生物武器。

![OpenAI等科技巨头致信国会呼吁立法防止AI开发生物武器](https://media.wired.com/photos/6a1f6447234d4b89dad80277/191:100/w_1280,c_limit/science_anthropic_final.jpg)

该信函呼吁强制要求销售合成DNA和RNA的公司筛查客户和订单，以防止基因材料被滥用。信中指出，人工智能的发展速度正在削弱历史上阻止行为不端者获取生物武器知识的屏障。

目前全球已有数十家公司使用商业合成仪“打印”定制基因序列。2017年，加拿大研究人员曾通过邮购DNA重组了已灭绝的天花病毒，同样的方法理论上可用于构建致命病毒。

结合大型语言模型等人工智能进步，现在可以设计危险的新毒素和病原体。但这封信也指出，制造功能性病毒可能仍需要一些生物学培训。

该信函由无党派的进步研究所和右翼的美国创新基金会组织。签名者还包括基因合成公司 **Twist Bioscience** 和 **Ansa Biotechnologies** 的高管。

[查看原文](https://www.wired.com/story/openai-anthropic-letter-ai-biological-weapons/)

---

## xAI要求法院公开Grok深度伪造色情案受害者身份 {#news-24}

> 埃隆·马斯克的AI公司**xAI**正要求法院公开四名据称使用**Grok**制作深度伪造色情图像的受害者的身份信息。

![xAI要求法院公开Grok深度伪造色情案受害者身份](https://media.wired.com/photos/6a1f4ea4c350c2fb60808fa6/191:100/w_1280,c_limit/Security_xAIWantstoStripAllegedGrokDeepfakeNudesVictimsofAnonymity_v1.jpg)

**xAI**向法庭提出动议，要求剥夺四名主要索赔人在联邦集体诉讼中的匿名身份。这四名原告目前以“南卡罗来纳Doe”等名义起诉。

诉讼文件显示，这四名原告担心，如果被迫使用真实姓名，她们将面临进一步的在线骚扰和人肉搜索。此前，**Grok**聊天机器人曾因被用于为女性生成“脱衣”假图像而引发全球愤怒。

一个数字仇恨研究中心的分析声称，在短短11天内，**Grok**就被用于制作了约300万张色情图像。目前拥有**xAI**的**SpaceX**已拨出超过5亿美元来处理相关诉讼。

[查看原文](https://www.wired.com/story/xai-asks-court-to-strip-alleged-grok-deepfake-nudes-victims-of-anonymity/)


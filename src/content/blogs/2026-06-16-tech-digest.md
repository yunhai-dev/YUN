---
title: 科技早报 2026-06-16
category: "科技, 科技早报"
excerpt: 谷歌IO大会发布Gemini 3.5和多项AI标准，Meta承认AI重组混乱，英国拟禁止未成年人使用社交媒体。
lastEdited: 2026年6月16日
tags: [科技早报, 谷歌, AI, Meta, 开发者工具, 开源项目, 安全隐私, 产品发布]
imageUrl: 
---

## 概览

### 要闻

- [谷歌IO 2026开发者大会发布多项重要公告](#news-1)
### AI 与机器学习

- [Meta CTO承认公司AI重组“非常糟糕”](#news-2)
- [谷歌开发者指南详解Gemma 4 12B创新架构](#news-3)
- [谷歌推出LiteRT-LM实现高速端侧生成式AI](#news-4)
- [Anthropic应美政府要求关闭顶级模型引发关注](#news-5)
- [谷歌发布实验性模型DiffusionGemma，采用并行扩散生成方式](#news-6)
- [NewCore 获 6600万美元融资 为AI智能体构建身份](#news-7)
### GitHub 热门项目

- [GitHub 热门项目：SWC 用 Rust 打造超快 TypeScript/JavaScript 编译器](#news-8)
- [GitHub 热门项目：Agent-Reach 实现 AI 代理多平台信息抓取](#news-9)
- [向量数据库 Qdrant 登上 GitHub 热榜，为下一代 AI 提速](#news-10)
- [GitHub热门项目：Meshery云原生多集群管理平台](#news-11)
- [NVIDIA推出AI代理安全扫描工具SkillSpector](#news-12)
- [GitHub 热门项目：OpenHuman 私密个人 AI 超级智能体发布](#news-13)
### 开源生态

- [Google开源框架Genkit新增中间件系统，提升AI代理可靠性](#news-14)
### 开发者工具

- [谷歌将 Gemini CLI 过渡至 Antigravity CLI，统一 AI 终端工具](#news-15)
- [Google Tensor ML SDK 进入 Beta，集成 LiteRT 支持 Pixel 10 TPU](#news-16)
- [谷歌推出Colab命令行界面，助力AI智能体本地操作](#news-17)
- [开发者分享家庭实验室AI开发平台搭建方案](#news-18)
### 安全与隐私

- [AMD消费级CPU被曝移除内存加密功能，用户表达不满](#news-19)
- [英国拟全球率先立法禁止16岁以下儿童使用社交媒体](#news-20)
- [英国宣布对16岁以下用户实施社交媒体禁令](#news-21)
- [Pokemon Go玩家数据被用于训练与军事无人机相关的AI](#news-22)
### 产品与平台

- [Meta 在 Facebook 推出全新 AI 搜索模式](#news-23)
- [Salesforce 36亿美元收购AI客服平台 Fin](#news-24)
---

## 谷歌IO 2026开发者大会发布多项重要公告 {#news-1}

> 谷歌在2026年I/O开发者大会上宣布了从辅助式AI向独立代理的过渡，并发布了多项新工具和标准。

谷歌发布了`Gemini 3.5`系列模型，并更新了其Antigravity代理优先开发平台。为移动开发者推出了新的Android CLI工具，并推出了Android Bench评估排行榜。

谷歌推出了一种自动化的迁移代理，可将各种框架快速转换为原生Kotlin代码。同时提出了WebMCP，这是一个开放的网络标准，使基于浏览器的AI代理能够执行复杂任务。

此外，谷歌推出了用于代理的Chrome DevTools和HTML-in-Canvas API。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## Meta CTO承认公司AI重组“非常糟糕” {#news-2}

> Meta首席技术官在内部备忘录中承认，公司新成立的AI部门的整合过程做得“非常糟糕”。

![Meta CTO承认公司AI重组“非常糟糕”](https://media.wired.com/photos/6a3066677da677701d8b62cd/191:100/w_1280,c_limit/Andrew-Bosworth-Urges-Employees-Business-2235573265.jpg)

**Meta**首席技术官**Andrew Bosworth**在一份内部备忘录中承认，公司在推出新的人工智能部门时做得“非常糟糕”。

**Meta**在三月份成立了约6500名工程师和产品经理组成的应用AI工程部门，旨在改进公司的生成式AI模型。

有员工将该团队的工作描述为单调乏味，甚至有人将其比作“古拉格”。Bosworth承诺将通过更好的沟通和职业发展来改善内部文化。

**Meta**对此次报道拒绝置评。

[查看原文](https://www.wired.com/story/andrew-bosworth-meta-employees-unrest/)

---

## 谷歌开发者指南详解Gemma 4 12B创新架构 {#news-3}

> 谷歌发布了**Gemma 4 12B**的开发者指南，详细介绍了这款专为本地高性能AI执行设计的密集多模态模型。

**Gemma 4 12B**是一款密集的多模态模型，专为在消费设备上进行高性能本地AI执行而设计。

该模型引入了一种新颖的、无编码器的架构，这是其核心设计特点。

这种创新架构绕过了传统的视觉和音频编码器，将多模态数据直接输入到LLM主干网络中，从而简化了处理流程。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## 谷歌推出LiteRT-LM实现高速端侧生成式AI {#news-4}

> 谷歌AI Edge的`LiteRT-LM`为跨平台移动和边缘环境运行Gemma 4提供了生产级、高度优化的基础设施。

`LiteRT-LM`通过利用内存高效的动态加载来解锁模型的本地多模态和代理功能。其使用多令牌预测技术，可提供高达2.2倍的加速。

该框架包含高级编译工具，如思考模式和受限解码。`LiteRT-LM`正在扩展其集成范围，引入了用于Apple生态系统的原生Swift API。

同时，它还引入了WebGPU加速的JavaScript API，用于高性能、无服务器的浏览器推理。

[查看原文](https://developers.googleblog.com/blazing-fast-on-device-genai-with-litert-lm/)

---

## Anthropic应美政府要求关闭顶级模型引发关注 {#news-5}

> **Anthropic**应美国政府要求，突然下线了其最新和最强大的AI模型，此举凸显了美国对前沿AI的控制权。

![Anthropic应美政府要求关闭顶级模型引发关注](https://platform.theverge.com/wp-content/uploads/sites/2/2025/04/VRG_Illo_STK175_L_Normand_DonaldTrump_Negative.jpg?quality=90&strip=all&crop=0,0,100,100)

在周末，**Anthropic**应华盛顿的要求，突然下线了其最新和最强大的AI模型。白宫要求**Anthropic**阻止所有外国人（包括其自身员工）的访问。

被关闭的模型是`Fable 5`和`Mythos 5`。

该事件提醒国外用户，美国不仅主导前沿AI，其政府也对谁可以使用它拥有权力。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/949986/anthropic-fable-mythos-shutdown-sovereign-ai)

---

## 谷歌发布实验性模型DiffusionGemma，采用并行扩散生成方式 {#news-6}

> 谷歌开发者博客介绍了基于`Gemma 4`架构的实验性文本生成模型**DiffusionGemma**。

**DiffusionGemma**使用基于扩散的并行生成方式，取代了传统的逐个token自回归方式，旨在实现更快的推理速度。

其架构通过迭代去噪并行生成和优化256个token的块，可更有效地处理数独等复杂约束任务。

该模型可与**vLLM**等流行的推理框架集成。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## NewCore 获 6600万美元融资 为AI智能体构建身份 {#news-7}

> 网络安全初创公司 **NewCore** 以 3 亿美元估值完成 6600 万美元种子轮融资，其平台旨在为人类和 **AI 智能体**提供统一的身份管理系统。

![NewCore 获 6600万美元融资 为AI智能体构建身份](https://techcrunch.com/wp-content/uploads/2026/06/newcore-founders.jpg?resize=1200,800)

本轮融资由 **Cyberstarts** 领投，**Index Ventures** 和 **Evolution Equity Partners** 参投。**NewCore** 的平台旨在通过单一系统同时管理人类和 **AI 智能体**的身份。

公司联合创始人兼首席执行官 **Zohar Alon** 此前创立了云安全初创公司 **Dome9**，后被 **Check Point** 收购。

麦肯锡今年早些时候表示，已有 25,000 个 **AI 智能体**与其 60,000 名员工并肩工作。**NewCore** 认为现有身份提供商尚未完全解决混合工作场所的挑战。

[查看原文](https://techcrunch.com/2026/06/15/ai-agents-are-becoming-employees-newcore-emerges-with-66m-to-give-them-identities/)

---

## GitHub 热门项目：SWC 用 Rust 打造超快 TypeScript/JavaScript 编译器 {#news-8}

> **SWC** 是一个用 Rust 编写的超快 **TypeScript**/**JavaScript** 编译器，旨在显著提升 Web 开发速度。

![GitHub 热门项目：SWC 用 Rust 打造超快 TypeScript/JavaScript 编译器](https://opengraph.githubassets.com/95a0be4f8a03e782af98a281b3930088ff5dad17feb02bc3c4ef25af9ee8fe2a/swc-project/swc)

**SWC** 同时是 **Rust** 和 **JavaScript** 的库，它由社区驱动，由志愿者共同维护。

该项目支持 **Node v10+** 用于使用，以及 **Node v20+** 用于开发。

**SWC** 的 crates 目前最低支持的 **Rust** 版本（MSRV）是 **1.73**。

[查看原文](https://github.com/swc-project/swc)

---

## GitHub 热门项目：Agent-Reach 实现 AI 代理多平台信息抓取 {#news-9}

> **Panniantong/Agent-Reach** 是一个在 GitHub Trending 上的 Python 项目，旨在为 AI 代理提供跨平台信息搜索能力。

该项目获得了 30,776 个星标，并在当天新增了 1,100 个星标。其描述称，它能让 AI 代理拥有“观看整个互联网的眼睛”。

通过一个命令行界面，Agent-Reach 可以读取和搜索 **Twitter**、**Reddit**、**YouTube**、**GitHub**、**Bilibili**、**小红书** 等多个平台，且无需支付 API 费用。

[查看原文](https://github.com/Panniantong/Agent-Reach)

---

## 向量数据库 Qdrant 登上 GitHub 热榜，为下一代 AI 提速 {#news-10}

> 高性能向量数据库 **Qdrant** 在 GitHub 上持续获得开发者青睐，今日星标数已突破 32,000，彰显其在 AI 领域的热度。

**Qdrant** 是一个用 **Rust** 语言编写的高性能、大规模向量数据库与搜索引擎，专为下一代人工智能应用设计。该项目今日新增了 104 个星标。

除了开源项目，**Qdrant** 也提供其云服务版本，开发者可通过其官网访问。其性能与易用性使其成为构建 AI 应用的热门选择。

[查看原文](https://github.com/qdrant/qdrant)

---

## GitHub热门项目：Meshery云原生多集群管理平台 {#news-11}

> 云原生计算基金会项目`Meshery`是一个开源管理器，用于统一设计和管理基于Kubernetes的多云基础设施。

![GitHub热门项目：Meshery云原生多集群管理平台](https://repository-images.githubusercontent.com/157554479/2c6279e8-716c-429e-ae08-cd4b1966df31)

`Meshery`提供可视化和协作的GitOps，支持超过380种不同的云原生基础设施集成。

它通过单一界面管理跨不同云提供商的多个Kubernetes集群的配置、部署和操作。

该平台利用Kubernetes的内置dry-run功能，允许在实际应用更改到集群之前模拟部署。

[查看原文](https://github.com/meshery/meshery)

---

## NVIDIA推出AI代理安全扫描工具SkillSpector {#news-12}

> **NVIDIA** 开源项目 **SkillSpector** 在 GitHub Trending 上线，专门用于扫描 AI 代理技能中的安全风险。

**NVIDIA/SkillSpector** 是一个 Python 项目，在 GitHub Trending 上获得了 6,562 个星标，当日新增 1,079 个星标。

该项目的描述为：用于 AI 代理技能的安全扫描器，可检测漏洞、恶意模式和安全风险。

作为一个专门针对 AI 代理的安全工具，其快速获得的关注显示了社区对 AI 应用安全性的高度重视。

[查看原文](https://github.com/NVIDIA/SkillSpector)

---

## GitHub 热门项目：OpenHuman 私密个人 AI 超级智能体发布 {#news-13}

> **OpenHuman** 是一个强调私密、简单且强大的个人 **AI** 超级智能体，其核心数据存储在用户本地。

![GitHub 热门项目：OpenHuman 私密个人 AI 超级智能体发布](https://opengraph.githubassets.com/98010cee9ff49891e92aa8baa8e56c7db07bf565b37a68bfa29de6e4231be8f3/tinyhumansai/openhuman)

**OpenHuman** 将其内存树、**Obsidian** 风格的 **Markdown** 知识库及工作区配置存储在用户机器上，以确保私密性。

默认托管体验仍使用其服务进行账户登录、模型路由等，但用户可选择自定义或本地设置，使用自己的模型与凭证。

该项目可通过 **tinyhumans.ai/openhuman** 或 **GitHub Releases** 下载，推荐通过操作系统包管理器进行安装。

需要注意的是，该项目目前处于早期测试阶段，正在积极开发中。

[查看原文](https://github.com/tinyhumansai/openhuman)

---

## Google开源框架Genkit新增中间件系统，提升AI代理可靠性 {#news-14}

> Google宣布为其开源AI应用框架Genkit推出中间件系统，旨在帮助开发者构建更可靠、可控的生产级代理式AI应用。

**Genkit**是一个支持TypeScript、Go、Dart和Python的开源框架，专注于构建可投入生产的代理式AI应用程序。

此次更新的核心是其强大的中间件系统，允许开发者拦截生成式调用，并注入重试、模型回退等自定义行为。

通过在生成、模型和工具层附加钩子，开发者可以实现对模型输出的确定性控制，确保应用的高可靠性。

框架支持创建和堆叠自定义中间件，并提供了专用的开发者UI，用于检查和调试整个流程。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## 谷歌将 Gemini CLI 过渡至 Antigravity CLI，统一 AI 终端工具 {#news-15}

> 谷歌正在统一其 AI 终端工具，将社区驱动的 **Gemini CLI** 过渡到新的、代理优先的 **Antigravity CLI** 平台。

谷歌宣布将其社区驱动的 **Gemini CLI** 过渡到新的 **Antigravity CLI**，以统一其 AI 终端工具。

新的 **Antigravity CLI** 是一个为复杂多代理工作流构建的代理优先平台，基于 Go 语言构建，提供更快的执行速度和异步处理能力。

新架构可以与 **Antigravity 2.0** 桌面应用程序同步。

企业客户将维持现有访问权限，而个人和免费用户必须在2026年6月18日之前过渡到新平台，届时 **Gemini CLI** 将停止服务。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## Google Tensor ML SDK 进入 Beta，集成 LiteRT 支持 Pixel 10 TPU {#news-16}

> **Google** 宣布其 **Tensor ML SDK** 进入 Beta 阶段，开发者可直接在 **Pixel 10** 设备的 TPU 上构建高性能模型，并与 **LiteRT** 深度集成。

**Google Tensor ML SDK** 已进入其 Beta 测试阶段，为开发者提供了在 **Pixel 10** 设备 **TPU** 上直接构建和部署机器学习模型的能力。

该 SDK 与 **LiteRT** 集成，提供了一个统一的工作流，用于转换、编译和运行 **PyTorch** 或 **TFLite** 模型，并支持强大的回退选项。

更新引入了一个新的模型花园，提供了超过 100 个经典和生成式 AI 模型，其中包括 **Gemma 3**。

这些模型支持低延迟和隐私保护的特性，可应用于语音识别、计算机视觉和文本生成等多种场景。

[查看原文](https://developers.googleblog.com/google-tensor-sdk-beta-with-litert/)

---

## 谷歌推出Colab命令行界面，助力AI智能体本地操作 {#news-17}

> 谷歌推出了**Google Colab**命令行界面（CLI）工具，旨在简化本地开发环境与远程Colab运行时的连接。

该工具允许开发者和AI智能体将本地终端连接到远程Colab运行时，以实现无摩擦的代码执行。

用户可以通过该工具轻松请求高性能GPU、远程运行本地Python脚本并检索模型。

该工具设计上具备高度可编程性，旨在被**Antigravity**或**Claude Code**等AI智能体使用。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 开发者分享家庭实验室AI开发平台搭建方案 {#news-18}

> 一位开发者分享了其搭建的家庭实验室AI开发平台，该平台使用 **OpenCode** Web UI结合Git，通过GitOps工作流简化了服务的管理和部署。

![开发者分享家庭实验室AI开发平台搭建方案](https://rsgm.dev/_astro/ai-pr-1.PYIiaDRf.png)

作者设置了带有Git访问权限的 **OpenCode** Web UI，**OpenCode** 将更改推送到Git，作者审批PR后，通过GitOps部署更改。

**OpenCode** 作为服务器运行，提供跨设备同步的持久编码会话，作者主要使用 `Claude Code` 等AI工具辅助维护，特别是处理容器更新。

作者在 **TrueNAS** 主机上的虚拟机中运行 **OpenCode** Web服务器，并配置其无法直接推送到部署分支，所有更改必须通过PR审查。

[查看原文](https://rsgm.dev/post/ai-dev-platform/)

---

## AMD消费级CPU被曝移除内存加密功能，用户表达不满 {#news-19}

> **AMD**的消费级芯片在未通知的情况下，移除了曾用于防止物理攻击的透明安全内存加密（TSME）功能，引发用户争议。

**AMD**十年前为其高端CPU添加了透明安全内存加密（TSME）功能，以防止冷启动攻击等物理利用，随后也将此功能下放至消费级**Ryzen**芯片。

近日，**AMD**在未发出任何警告或通知的情况下，其消费级芯片突然取消了这一安全保护功能。

在Windows系统上检测此变化几乎不可能，而在Linux系统上则需要相当多的技术工作才能发现。

**AMD**尚未说明为何曾支持此功能，也未确认这一变化。该公司通过电子邮件拒绝回答相关问题，仅表示TSME是仅作为**AMD PRO Technologies**一部分应用于**PRO CPU**的安全功能。

[查看原文](https://arstechnica.com/security/2026/06/users-cry-foul-after-amd-stripped-memory-crypto-from-its-consumer-cpus/)

---

## 英国拟全球率先立法禁止16岁以下儿童使用社交媒体 {#news-20}

> 英国政府宣布将禁止16岁以下儿童使用社交媒体，并可能实施夜间使用限制，预计于2027年春季生效。

英国政府宣布新规，禁止16岁以下儿童使用社交媒体，该禁令适用于包括 **Snapchat**、**TikTok**、**YouTube**、**Instagram**、**Facebook** 和 **X** 在内的主流平台。

首相基尔·斯塔默表示，英国在全球范围内率先采取这一行动，并采取更广泛的保护措施。政府还将封锁对16岁以下儿童有害的功能，如直播和陌生人通信。

为避免在16岁时出现“保护断崖”，对16岁和17岁用户的这些功能限制也将默认开启。相关规则将适用于在线游戏等一系列服务。

[查看原文](https://arstechnica.com/tech-policy/2026/06/uk-to-ban-social-media-for-kids-under-16-may-impose-overnight-curfews/)

---

## 英国宣布对16岁以下用户实施社交媒体禁令 {#news-21}

> 英国首相基尔·斯塔默宣布，政府将禁止 16 岁以下儿童使用社交媒体，该禁令将适用于 **Snapchat**、**TikTok**、**YouTube** 等多个主流平台。

![英国宣布对16岁以下用户实施社交媒体禁令](https://techcrunch.com/wp-content/uploads/2024/06/social-media-icons.jpg?resize=1200,798)

该禁令将适用于 **Snapchat**、**TikTok**、**YouTube**、**Instagram**、**Facebook** 和 **X** 等平台。**WhatsApp** 和 **Signal** 等消息服务则不包括在禁令内。

英国政府称其禁令将比任何其他国家的都更进一步。AI“浪漫伴侣”聊天机器人将被限制仅限 18 岁以上用户使用。

首相斯塔默表示，禁令可能在明年春季实施。此举旨在加强青少年网络安全和隐私保护。

[查看原文](https://techcrunch.com/2026/06/15/uk-unveils-sweeping-social-media-ban-for-users-under-16/)

---

## Pokemon Go玩家数据被用于训练与军事无人机相关的AI {#news-22}

> **Niantic**的`Pokemon Go`游戏收集的AR扫描数据，已被用于训练一项正与国防承包商合作的技术。

![Pokemon Go玩家数据被用于训练与军事无人机相关的AI](https://the-decoder.com/wp-content/uploads/2026/06/Niantic-Spatial-Vantor.png)

**Pokemon Go**玩家通过志愿者方式贡献的AR扫描数据，被输入到了**Niantic**的空间AI模型中。

这项空间AI技术现在正与一家美国国防承包商的软件相结合。

双方合作的目标是开发一种能够实现无GPS导航的技术。

[查看原文](https://the-decoder.com/pokemon-go-data-helped-train-ai-now-linked-to-military-drones/)

---

## Meta 在 Facebook 推出全新 AI 搜索模式 {#news-23}

> **Meta** 在 **Facebook** 上推出了一种名为“AI Mode”的新搜索功能，利用其 **Meta AI** 模型从平台公共内容中生成综合回答。

![Meta 在 Facebook 推出全新 AI 搜索模式](https://techcrunch.com/wp-content/uploads/2026/05/meta-apps-GettyImages-2152655816.jpg?w=1024)

Meta 在 **Facebook** 上线了“AI Mode”，这是一种基于 **Meta AI** 的新型搜索方式。该功能可从平台上的公共帖子、群组讨论和 **Reels** 等内容中提取信息。

用户现在可以使用自然语言提问，并获得基于平台内用户实际讨论内容的综合答案。这标志着 **Meta** 将生成式 AI 深度整合进其社交产品的又一步。

此外，**Facebook** 还新增了 AI 驱动的照片预设功能，允许用户通过不同的服装、发型和配饰来编辑照片。

值得注意的是，**Meta** 近期在旗下 **Facebook**、**Instagram** 和 **WhatsApp** 上推出了全球订阅计划，起价为每月 3.99 美元，预计未来将推出更多 AI 相关的订阅服务。

[查看原文](https://techcrunch.com/2026/06/15/metas-new-ai-mode-on-facebook-pulls-from-public-info-across-its-platforms/)

---

## Salesforce 36亿美元收购AI客服平台 Fin {#news-24}

> **Salesforce** 宣布将以 36 亿美元现金收购 AI 客户服务平台 **Fin**，该平台前身为 **Intercom**，旨在通过 AI 代理提升客户服务效率。

![Salesforce 36亿美元收购AI客服平台 Fin](https://techcrunch.com/wp-content/uploads/2024/06/GettyImages-1125951338.jpg?resize=1200,900)

**Salesforce** 计划利用 **Fin** 的团队和技术来改进其现有的企业平台 **Agentforce**。**Fin** 提供可通过多种渠道解决客户查询的 AI 代理服务。

**Fin** 联合创始人兼 CEO **Eoghan McCabe** 表示，收购完成后他将继续担任 CEO。该交易预计将在 **Salesforce** 2027 财年第四季度完成。

此次收购是 **Salesforce** 在 AI 客户服务领域的重要布局，旨在强化其企业级 AI 解决方案的竞争力。

[查看原文](https://techcrunch.com/2026/06/15/salesforce-acquires-ai-customer-service-platform-fin-for-3-6b/)


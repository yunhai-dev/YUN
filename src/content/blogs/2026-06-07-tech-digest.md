---
title: 科技早报 2026-06-07
category: "科技, 科技早报"
excerpt: 谷歌I/O大会发布Gemini 3.5推动AI代理时代，OpenAI与阿里通义千问亦发布新模型与智能体工具。
lastEdited: 2026年6月7日
tags: [科技早报, Google, Gemini, AI代理, GitHub, 开源项目, 开发者工具, 安全与隐私]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026开发者主题演讲：发布`Gemini 3.5`，推动AI代理时代](#news-1)
### AI 与机器学习

- [GitHub 热门项目：OpenAI Whisper 语音识别模型](#news-2)
- [加州大学研究：DFlash方法在TPU上实现大语言模型推理3倍加速](#news-3)
- [Google发布Gemini Embedding 2，统一多模态模型赋能代理式RAG](#news-4)
- [GitHub热门开源AI记忆系统MemPalace发布](#news-5)
- [阿里通义千问发布Qwen3.7-Plus，打造全能自主智能体](#news-6)
- [Meta利用AI生成点击诱饵内容填充新闻推送](#news-7)
### GitHub 热门项目

- [GitHub 热门项目：Rust 编写的 AI 代理 goose](#news-8)
- [GitHub 热门项目：Trivy 容器安全扫描工具](#news-9)
- [GitHub热门项目：Go语言官方仓库持续活跃](#news-10)
- [GitHub热门项目：PaddleOCR成为强大轻量级OCR工具包](#news-11)
- [GitHub 热门项目：Rust 编写的自托管远程桌面应用](#news-12)
- [GitHub 热门项目：高性能 JS/TS 工具链 Oxc 为 Rolldown 提供支持](#news-13)
### 开源生态

- [谷歌发布ADK for Kotlin及ADK for Android 0.1.0](#news-14)
### 开发者工具

- [谷歌将Gemini CLI升级为Antigravity CLI新平台](#news-15)
- [Google推出Colab命令行界面，连接本地与云端开发](#news-16)
- [谷歌推出 Google Pay & Wallet 开发者 MCP 服务器](#news-17)
### 安全与隐私

- [OpenAI推出Lockdown Mode防范提示注入攻击](#news-18)
- [Meta确认数千Instagram账户因AI聊天机器人漏洞被黑](#news-19)
- [Meta在手机应用中隐藏人脸识别代码](#news-20)
### 产品与平台

- [Google发布Gemma 4 12B模型，可在笔记本电脑上本地运行](#news-21)
- [Meta推出首款付费AI代理Hatch，月费或达200美元](#news-22)
- [Google AI Edge Gallery 更新：集成 MCP 协议与通知功能](#news-23)
- [Google Pay 为 Android 应用推出动态回调功能](#news-24)
---

## Google I/O 2026开发者主题演讲：发布`Gemini 3.5`，推动AI代理时代 {#news-1}

> Google宣布AI正从辅助工具转向独立代理，并发布了`Gemini 3.5`系列模型及多项开发者工具更新。

Google在此次大会上宣布了战略转变，旨在推动从辅助型AI到独立代理的演进。新发布的`Gemini 3.5`系列模型是这一愿景的核心。

面向开发者，Google宣布了**Antigravity**代理优先开发平台的重大更新，并推出了新的**Android CLI**工具与**Android Bench**评估排行榜。

大会还介绍了一个自动化迁移代理，可将各类框架快速转换为原生Kotlin代码。Web开发方面，推出了`Chrome DevTools for agents`、`HTML-in-Canvas API`以及`WebMCP`提案。

`WebMCP`被定位为一项开放Web标准，旨在使基于浏览器的AI代理能够执行复杂任务。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## GitHub 热门项目：OpenAI Whisper 语音识别模型 {#news-2}

> 由 **OpenAI** 开发的通用语音识别模型 **Whisper** 在 GitHub 上广受欢迎，其代码库依赖于 Python 和 PyTorch。

![GitHub 热门项目：OpenAI Whisper 语音识别模型](https://opengraph.githubassets.com/d54363111f23ed50846fe3d2c3771bfdb79427c5202b2dc43f37d4bfd7aa873a/openai/whisper)

**Whisper** 是一个由 **OpenAI** 开发的通用语音识别模型。它基于 **Transformer** 序列到序列架构，在包含多样音频的大型数据集上训练。

该模型能够执行多语言语音识别、语音翻译和语言识别。其代码库托管在 GitHub，获得了超过 10 万颗星标和 1.2 万次分叉。

安装和运行 **Whisper** 需要 Python 3.8-3.11、最近的 PyTorch 版本以及命令行工具 `ffmpeg`。

[查看原文](https://github.com/openai/whisper)

---

## 加州大学研究：DFlash方法在TPU上实现大语言模型推理3倍加速 {#news-3}

> 加州大学圣迭戈分校研究人员在 **Google TPU** 上成功实现了 **DFlash**，这是一种块扩散推测解码方法，能显著提升大语言模型推理速度。

**DFlash** 通过在单次前向传播中生成整个块的候选令牌，而非逐个预测，从而绕过了传统自回归草稿的顺序瓶颈。

该系统实现了平均 3.13 倍的加速，峰值性能几乎是现有方法（如 **EAGLE-3**）的两倍。

该方法已开源并集成到 **vLLM** 生态系统中，通过优化 **TPU** 硬件并利用并行验证，适用于复杂推理任务。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## Google发布Gemini Embedding 2，统一多模态模型赋能代理式RAG {#news-4}

> **Google** 宣布 **Gemini Embedding 2** 正式可用，该模型可将文本、图像、视频等多种模态数据映射到统一语义空间，提升多项AI任务性能。

这是一个统一模型，允许开发者在单个请求中处理交错的多模态输入，显著提升了代理式 **RAG**、视觉搜索和内容审核等任务的性能。

该模型支持超过 100 种语言，并提供任务特定前缀和 **Matryoshka** 维度缩减等功能。

**Gemini Embedding 2** 为构建复杂的 AI 代理提供了高效且准确的基础。

[查看原文](https://developers.googleblog.com/building-with-gemini-embedding-2/)

---

## GitHub热门开源AI记忆系统MemPalace发布 {#news-5}

> 开源项目 MemPalace 推出了一套本地优先的 AI 记忆系统，旨在通过结构化存储提升对话历史的检索效率。

![GitHub热门开源AI记忆系统MemPalace发布](https://opengraph.githubassets.com/064d49a2236ab601c8e1ebf56ed239afb2a6236372622aff67540889466e3d5a/MemPalace/mempalace)

MemPalace 是一个开源的 AI 记忆系统，其核心功能是将对话历史逐字存储，并使用语义搜索进行检索，以保持对话的连贯性和上下文。

该系统采用独特的索引结构，将人物和项目映射为“翼”，主题映射为“房间”，而原始内容则保存在“抽屉”中。其检索层设计为可插拔，默认后端使用 **ChromaDB**。

项目目前已发布 `CLI` 工具，支持在隔离环境中安装。根据官方数据，MemPalace 在 **LongMemEval** 基准测试中达到了 96.6% 的 R@5 分数。

官方特别强调，这是一个本地优先系统，默认情况下用户数据不会离开本机。同时警告用户注意冒牌网站，官方来源仅限于其 GitHub 仓库、PyPI 包及指定文档网站。

[查看原文](https://github.com/MemPalace/mempalace)

---

## 阿里通义千问发布Qwen3.7-Plus，打造全能自主智能体 {#news-6}

> 阿里通义千问团队发布了多模态智能体模型`Qwen3.7-Plus`，旨在将视觉、操作和编码能力整合为自主智能体。

![阿里通义千问发布Qwen3.7-Plus，打造全能自主智能体](https://the-decoder.com/wp-content/uploads/2026/06/alibaba-qwen3.7-plus-banner.jpg)

阿里云的通义千问团队发布了**Qwen3.7-Plus**，这是一款多模态智能体模型。该模型在一个智能体循环中集成了视觉感知、GUI操作和编码能力。

在一次演示中，基于该模型构建的智能体自主开发了一款词汇学习应用。该智能体在11小时内通过约1000次调用，生成了超过1万行代码。

在通义千问自己的基准测试中，该模型在屏幕内容理解方面处于领先地位。不过，其整体性能表现不一。

**Qwen3.7-Plus**是一个闭源产品，不开放权重，其定价远低于西方前沿模型。

[查看原文](https://the-decoder.com/qwen3-7-plus-is-alibabas-bid-to-turn-multimodal-ai-into-a-full-blown-autonomous-agent/)

---

## Meta利用AI生成点击诱饵内容填充新闻推送 {#news-7}

> Meta正在其AI应用中使用AI生成点击诱饵风格的故事，这些故事的标题、图片和文本均由AI创建。

![Meta利用AI生成点击诱饵内容填充新闻推送](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/ai-label-14.png?quality=90&strip=all&crop=0,0,100,100)

**Meta**正在使用AI制作自己的点击诱饵文章。独立的**Meta AI**应用现在有一个“For You”部分，提供点击诱饵风格的故事列表供用户阅读。

这些故事的标题、图片和文本都是AI生成的。**Meta AI**应用最初于2025年4月推出。

应用最初的公共“Discover”信息流功能已消失，现在采用标准的聊天机器人界面。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/944235/meta-app-ai-clickbait-articles)

---

## GitHub 热门项目：Rust 编写的 AI 代理 goose {#news-8}

> 一款名为 goose 的开源 AI 代理因其在 GitHub 上的高关注度而成为热门项目。

**goose** 是一个开源、可扩展的 AI 代理。它超越了简单的代码建议功能，能够使用任何大语言模型（LLM）来安装、执行、编辑和测试代码。

该项目使用 **Rust** 编程语言编写。其 GitHub 仓库已获得超过 47,000 颗星，今日新增 262 颗星，显示出强劲的热度。

[查看原文](https://github.com/aaif-goose/goose)

---

## GitHub 热门项目：Trivy 容器安全扫描工具 {#news-9}

> 开源安全工具 Trivy 成为 GitHub 热门项目，可扫描容器、Kubernetes 及代码仓库等多种环境中的安全问题。

项目 **aquasecurity/trivy** 是一个用 **Go** 语言编写的开源工具。其功能是查找容器、Kubernetes、代码仓库和云环境中的漏洞、错误配置、秘密和软件物料清单。

该项目在 GitHub 上非常受欢迎，目前拥有超过 36,000 颗星标，今日新增 159 颗星。其代码托管于 GitHub 仓库。

[查看原文](https://github.com/aquasecurity/trivy)

---

## GitHub热门项目：Go语言官方仓库持续活跃 {#news-10}

> **Go** 是一个旨在简化可靠高效软件构建的开源编程语言，其官方 Git 仓库由成千上万的贡献者共同维护。

![GitHub热门项目：Go语言官方仓库持续活跃](https://opengraph.githubassets.com/6df17d81e360f6c13d3f8f21a04a11767fc54c67d060e02e26f500fa229f049e/golang/go)

**Go** 语言项目在 GitHub 上设有镜像仓库，其官方源代码托管于 `https://go.googlesource.com/go`。

Go 的二进制发行版可从 `https://go.dev/dl/` 下载，对于未提供预编译版本的平台，用户可以从源代码进行安装。

Go 项目使用问题跟踪器专注于错误报告和提案管理，其源代码根据 BSD 风格许可证进行分发。

该项目由庞大的贡献者社区共同开发，旨在提供简单、可靠和高效的软件构建体验。

[查看原文](https://github.com/golang/go)

---

## GitHub热门项目：PaddleOCR成为强大轻量级OCR工具包 {#news-11}

> 由**百度飞桨**开发的 **PaddlePaddle/PaddleOCR** 项目在 GitHub Trending 上广受关注，已累积超过 8.1 万颗星。

**PaddleOCR** 是一个基于 Python 的轻量级 OCR 工具包，今日新增 433 颗星，是当前最热门的 OCR 项目之一。

该项目旨在将任何 PDF 或图像文档转换为 AI 所需的结构化数据，从而连接图像/PDF 与大语言模型（LLMs）。

**PaddleOCR** 支持超过 100 种语言的识别，为多语言文档处理场景提供了强大的解决方案。

[查看原文](https://github.com/PaddlePaddle/PaddleOCR)

---

## GitHub 热门项目：Rust 编写的自托管远程桌面应用 {#news-12}

> 开源远程桌面应用 **rustdesk** 因其自托管特性和对 TeamViewer 的替代定位，在 GitHub 上获得广泛关注。

**rustdesk** 是一款开源的远程桌面应用程序，专为自托管而设计。它被定位为 **TeamViewer** 的替代品。

该项目同样采用 **Rust** 编程语言编写。其 GitHub 仓库已累计超过 115,000 颗星，今日新增 57 颗星，持续保持热度。

[查看原文](https://github.com/rustdesk/rustdesk)

---

## GitHub 热门项目：高性能 JS/TS 工具链 Oxc 为 Rolldown 提供支持 {#news-13}

> **Oxc** 是一个用 Rust 编写的高性能 JavaScript 和 TypeScript 工具集合，是 VoidZero 统一工具链愿景的一部分，并为 **Rolldown** 提供支持。

![GitHub 热门项目：高性能 JS/TS 工具链 Oxc 为 Rolldown 提供支持](https://repository-images.githubusercontent.com/599431918/6b7ba893-c8da-48ca-b5bd-619b9849377a)

**Oxc** 的工具集包括解析器、转换器、压缩器和模块解析器。

它为 **Vite** 的打包器 **Rolldown** 提供支持，**Rolldown** 和 **Nuxt** 使用 **Oxc** 进行解析。

此外，**Rolldown** 也使用 **Oxc** 进行代码转换和压缩，而 **Preact**、**Shopify**、**字节跳动**和 **Shopee** 等公司则使用 `oxlint` 进行代码检查。

[查看原文](https://github.com/oxc-project/oxc)

---

## 谷歌发布ADK for Kotlin及ADK for Android 0.1.0 {#news-14}

> **谷歌**发布了用于构建AI代理的`Agent Development Kit (ADK) for Kotlin` 0.1.0版本及专用的ADK Android库，旨在简化AI代理开发。

**谷歌**宣布推出`ADK for Kotlin` 0.1.0版本和一个专门的`ADK Android`库，这是一个开源框架。

该框架通过管理复杂的编排、会话共享和错误处理，简化了AI代理的创建过程。

此次发布支持混合编排，允许开发者构建多代理系统，使云端模型能够将任务无缝卸载到本地设备模型。

该框架被设计为可跨云和边缘环境运行，提供了更灵活的部署选项。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## 谷歌将Gemini CLI升级为Antigravity CLI新平台 {#news-15}

> 谷歌宣布将其社区驱动的Gemini CLI转变为新的Antigravity CLI平台。

**谷歌**正在将**Gemini CLI**过渡为一个全新的、以代理为中心的平台，名为**Antigravity CLI**。

新的**Antigravity CLI**是一个基于**Go**的工具，旨在提供更快的执行速度、异步处理和统一的架构。

该新平台将与**Antigravity 2.0**桌面应用程序同步。

企业客户将保持现有访问权限，但个人和免费用户必须在**2026年6月18日**之前完成过渡。

**Gemini CLI**将在**2026年6月18日**停止处理请求。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## Google推出Colab命令行界面，连接本地与云端开发 {#news-16}

> Google发布了`Google Colab`命令行界面，允许开发者将本地终端连接到远程Colab运行时，以便更灵活地调用高性能计算资源。

该轻量级CLI使用户能轻松请求GPU，并远程运行本地Python脚本，同时可无缝检索工件、日志或模型，例如微调后的`Gemma 3`适配器。

该工具具有高度可编程性，可供`Antigravity`或`Claude Code`等AI代理使用，以管理复杂的机器学习工作流，提升开发效率。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 谷歌推出 Google Pay & Wallet 开发者 MCP 服务器 {#news-17}

> 谷歌推出了新的 `Google Pay & Wallet Developer MCP` 服务器，旨在安全地将AI开发助手和IDE连接到实时API及账户上下文。

谷歌宣布了新的 `Google Pay & Wallet Developer MCP` 服务器，这是一个开放标准工具。

该服务器允许开发者在其开发环境中搜索官方文档、验证Wallet通行证定义、检查集成状态和管理商家账户。

此集成旨在通过最小化上下文切换和提供最新、有根据的AI支持来减少摩擦并加速开发工作流。

[查看原文](https://developers.googleblog.com/supercharge-your-integration-workflow-with-the-google-pay-wallet-developer-mcp-server/)

---

## OpenAI推出Lockdown Mode防范提示注入攻击 {#news-18}

> OpenAI宣布新功能Lockdown Mode，旨在为处理敏感数据的用户提供针对提示注入攻击的额外保护层。

![OpenAI推出Lockdown Mode防范提示注入攻击](https://techcrunch.com/wp-content/uploads/2025/04/GettyImages-2201630077.jpg?resize=1200,798)

**OpenAI**宣布了一项新功能`Lockdown Mode`，旨在提供针对提示注入攻击的额外保护。

`Lockdown Mode`将禁用实时网页浏览、检索和显示网络图像、深度研究和代理模式。

**OpenAI**指出，即使启用`Lockdown Mode`，**ChatGPT**仍可能容易受到提示注入的影响。

该模式旨在降低敏感数据在过程中被共享的可能性，适用于处理敏感数据并希望获得更严格保护的人员和组织。

`Lockdown Mode`目前正在向自助**ChatGPT Business**账户以及符合条件的个人账户推出。

[查看原文](https://techcrunch.com/2026/06/06/openai-unveils-lockdown-mode-to-protect-sensitive-data-from-prompt-injection-attacks/)

---

## Meta确认数千Instagram账户因AI聊天机器人漏洞被黑 {#news-19}

> Meta确认其AI聊天机器人被滥用，导致数千个Instagram账户遭黑客劫持。该公司已通知超过两万名用户其账户信息可能已泄露。

![Meta确认数千Instagram账户因AI聊天机器人漏洞被黑](https://storage.ghost.io/c/ed/a2/eda2c6f7-faef-48b4-9ed4-86a4fa4dca68/content/images/size/w1200/2026/06/meta-ai-chatbot-twis-story-2.jpg)

Meta表示，黑客利用了其AI辅助账户恢复系统中的一个漏洞来重置密码。该漏洞源于一个单独代码路径中的错误，导致系统在验证重置请求的邮箱时出现异常。

根据通知，至少有20,225人的账户被泄露，其中包括缅因州的30人。Meta称，目前“不知道”在黑客攻击期间是否有任何个人信息被访问。

[查看原文](https://this.weekinsecurity.com/meta-confirms-thousands-of-instagram-accounts-were-hacked-by-abusing-its-ai-chatbot/)

---

## Meta在手机应用中隐藏人脸识别代码 {#news-20}

> 据报道，**Meta** 在其一款配套应用程序中隐藏了名为`NameTag`的人脸识别功能代码，该功能旨在为智能眼镜佩戴者提供面部识别能力。

![Meta在手机应用中隐藏人脸识别代码](https://media.wired.com/photos/6a2312eb2b342fb72975a62e/191:100/w_1280,c_limit/Security-Roundup-Crypto-funded-Chinese-labs-sales-of-peptides-Security-1312618198.jpg)

**Meta** 被指在超过5000万部手机使用的配套应用中，隐藏了名为`NameTag`的人脸识别代码。

如果该功能被激活，智能眼镜佩戴者将能够通过扫描面部来识别前方遇到的人。

此外，**xAI** 正请求法院强制四名因**Grok**生成深度伪造色情图片而起诉该公司的原告使用真实姓名进行诉讼。

原告方面表示，他们宁愿撤诉，也不愿面对来自**马斯克**在线支持者的潜在骚扰和人肉搜索。

**谷歌**也推出了一项新的**Android**功能，旨在通过加密握手技术检测虚假来电，以打击AI驱动的冒充诈骗。

[查看原文](https://www.wired.com/story/security-news-this-week-crypto-funded-chinese-peptide-labs-are-booming/)

---

## Google发布Gemma 4 12B模型，可在笔记本电脑上本地运行 {#news-21}

> Google DeepMind发布了`Gemma 4 12B`模型，该模型可在配备16GB内存的普通笔记本电脑上运行，支持本地数据处理和视觉分析。

用户可在macOS上通过`Google AI Edge Gallery`使用该模型，进行动态Python代码执行和可视化分析，实现本地的智能洞察。

该模型支持通过`Google AI Edge Eloquent`实现完全离线的语音听写和文本编辑。开发者工作流通过`LiteRT-LM CLI`的新增`serve`命令得到进一步增强。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## Meta推出首款付费AI代理Hatch，月费或达200美元 {#news-22}

> Meta正在开发其首款付费AI代理产品“Hatch”，每月费用可能高达200美元。

![Meta推出首款付费AI代理Hatch，月费或达200美元](https://the-decoder.com/wp-content/uploads/2026/04/meta_ai_logo_wall_muse.png)

**Meta** 正在开发一款名为“`Hatch`”的AI代理产品。用户可通过简单语言描述需求，让其构建可用工具、安排预约或发送电子邮件。

Meta首席执行官马克·扎克伯格认为，该产品可开辟广告之外的新收入来源，为公司大规模的AI投资提供再融资。

[查看原文](https://the-decoder.com/metas-hatch-ai-agent-could-cost-up-to-200-a-month-and-marks-its-first-paid-ai-product/)

---

## Google AI Edge Gallery 更新：集成 MCP 协议与通知功能 {#news-23}

> Google AI Edge Gallery 应用在 Android 上引入对开源模型上下文协议的实验性支持，扩展了端上 AI 能力。

**Google AI Edge Gallery** 应用通过对 **MCP** 协议的支持，允许 **Gemma 4** 协调跨 **Google Workspace** 和 **Google Maps** 等外部数据源的复杂任务。

更新增加了一个“计划通知”技能，可用于自动化日常事务。

新功能还包含持久聊天历史记录，能够几乎即时地恢复长时间的会话上下文。

该平台由一个开源工具包驱动，开发者可通过其 **GitHub** 仓库构建和共享自定义的实用工作流与工具集成。

[查看原文](https://developers.googleblog.com/a-smarter-google-ai-edge-gallery-mcp-integration-notifications-and-session-continuity/)

---

## Google Pay 为 Android 应用推出动态回调功能 {#news-24}

> Google Pay 现为 Android 应用带来动态回调功能，旨在优化快速结账体验，开发者需升级依赖库以使用该特性。

![Google Pay 为 Android 应用推出动态回调功能](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

**Google Pay** 为 Android 原生应用引入了 `onPaymentDataChanged` 和 `onPaymentAuthorized` 两个动态回调功能。这些功能此前仅在 Web 端受支持。

回调允许应用在用户与 **Google Pay** 界面交互时，动态更新配送选项、税费和总价等信息。开发者可利用存储在 **Google Wallet** 中的支付和地址凭证。

此举旨在提供真正的“快速结账”体验，允许开发者将支付按钮提前放置在产品详情页或购物车页面。该功能需要 `play-services-wallet` 版本 `20.0.0` 或更高版本支持。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)


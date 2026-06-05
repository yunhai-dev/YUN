---
title: 科技早报 2026-06-05
category: "科技, 科技早报"
excerpt: Google I/O发布多项AI更新并推出Gemma 4模型，Anthropic加速AI自我改进，GitHub推出AI代码助手连接器。
lastEdited: 2026年6月5日
tags: [科技早报, Google, Anthropic, GitHub, AI模型, 开发者工具, 开源生态, 安全与隐私]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026开发者主题演讲发布多项重磅更新](#news-1)
### AI 与机器学习

- [Anthropic 正在利用 AI 加速开发，指向递归自我改进未来](#news-2)
- [Google发布Gemma 4 12B模型，支持笔记本本地运行代理式AI](#news-3)
- [GitHub 推出 AI 代码助手连接器 MCP Server](#news-4)
- [阿里巴巴开源AI代码审查工具Open Code Review](#news-5)
- [xAI 发布 Grok Imagine 1.5，支持图生 720p 视频](#news-6)
- [Google LiteRT-LM实现设备端高速生成式AI](#news-7)
### GitHub 热门项目

- [OpenAI发布Codex CLI：可在本地运行的AI编码代理](#news-8)
- [开源LLM应用平台Dify：可视化构建与全面模型支持](#news-9)
- [PaddleOCR成为GitHub热门项目，支持百种语言的OCR工具](#news-10)
- [GitHub热门：开源AI代理项目goose星标数近5万](#news-11)
- [GitHub热门项目ollama：快速运行多款主流大模型](#news-12)
- [GitHub 热门项目：多环境安全扫描工具 Trivy](#news-13)
### 开源生态

- [Google 发布 ADK for Kotlin 与 Android 版，简化 AI 代理开发](#news-14)
- [Anthropic开源AI漏洞发现框架defending-code-reference-harness](#news-15)
- [Go语言GitHub仓库：开源、高效与协作的编程语言项目](#news-16)
### 开发者工具

- [Google Tensor ML SDK 推出 Beta 版，集成 LiteRT](#news-17)
- [Google Genkit推出中间件系统，增强AI智能体应用可靠性](#news-18)
- [新隐私工具Filtr利用iOS新特性，在几乎所有苹果设备应用中屏蔽广告](#news-19)
- [GitHub热门项目Spec Kit：推动规范驱动开发的开源工具包](#news-20)
### 安全与隐私

- [哥伦比亚大学数据泄露波及无关人士，社会安全号码大量曝光](#news-21)
- [Meta悄然将智能眼镜面部识别代码推送给数百万手机](#news-22)
- [Dashlane披露协同黑客攻击事件，部分用户加密密码库遭下载](#news-23)
- [科技领袖呼吁国会就DNA安全立法，防范AI生物武器风险](#news-24)
---

## Google I/O 2026开发者主题演讲发布多项重磅更新 {#news-1}

> **Google**宣布从辅助AI向独立智能体过渡，并推出包括`Gemini 3.5`系列模型在内的多项更新。

**Google**推出了`Gemini 3.5`系列模型，并对代理优先开发平台`Antigravity`进行了重大更新。

面向移动开发者，推出了新的`Android CLI`工具和`Android Bench`评估排行榜。

推出了一个自动化迁移代理，旨在将各种框架快速转换为原生`Kotlin`代码。

提出了`WebMCP`开放网络标准，使基于浏览器的AI代理能够执行复杂任务。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## Anthropic 正在利用 AI 加速开发，指向递归自我改进未来 {#news-2}

> Anthropic 正在将越来越多的 AI 开发工作委托给 AI 系统本身，以加速其研发进程。

![Anthropic 正在利用 AI 加速开发，指向递归自我改进未来](https://cdn.sanity.io/images/4zrzovbb/website/6d4a0d28992ade92d6fa63646fd9c9d318245c6c-2400x1260.jpg)

**Anthropic** 工程师平均每季度编写的代码量是他们2021-2025年的8倍，这得益于 AI 系统的辅助。

AI 模型改进速度正在加速，其可靠独立完成任务的长度大约每四个月翻一倍。

从2024年3月到2026年，`Claude` 模型可完成的任务时长已从约4分钟增长到约12小时。

文章指出，AI 系统可能很快能够自主设计和开发自己的继任者，这被称为递归自我改进。

完全递归自我改进也可能增加人类失去对 AI 系统控制的风险。

[查看原文](https://www.anthropic.com/institute/recursive-self-improvement)

---

## Google发布Gemma 4 12B模型，支持笔记本本地运行代理式AI {#news-3}

> Google DeepMind发布了 **Gemma 4 12B** 模型，可将强大的多模态AI能力带到配备16GB内存的普通笔记本电脑上，支持完全本地的代理式工作流。

**Google DeepMind** 最新发布的 **Gemma 4 12B** 模型，专为在配备16GB内存的日常笔记本电脑上本地运行而设计，带来了代理式多模态AI能力。

该模型支持完全本地的、注重隐私的数据处理与视觉洞察生成。用户可通过 **Google AI Edge Gallery** 在 macOS 上利用模型执行动态Python代码和可视化。

通过 **Google AI Edge Eloquent**，用户可实现完全离线的语音听写和文本编辑。新推出的 `LiteRT-LM` CLI 的 `serve` 命令创建了符合行业标准的本地端点，以支持构建全本地AI工具与代理。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## GitHub 推出 AI 代码助手连接器 MCP Server {#news-4}

> **GitHub** 发布了 MCP Server，可将 AI 工具直接连接到其平台，使 AI 代理能够读取代码、管理项目并自动化工作流。

![GitHub 推出 AI 代码助手连接器 MCP Server](https://opengraph.githubassets.com/75f7beb59e9d130922fe0c66bbbc0e148d815fbfb8ccaf65c0c4d2435ec65361/github/github-mcp-server)

GitHub MCP Server 允许 AI 代理、助手和聊天机器人读取仓库与代码文件、管理问题和拉取请求、分析代码并自动化工作流程。

用例涵盖仓库管理、问题与 PR 自动化、CI/CD 与工作流智能、代码分析和团队协作。远程版本由 GitHub 托管，是最简单的上手方式。

对于不支持远程服务器的 MCP 主机，也可使用本地版本。兼容主机包括 `VS Code` 1.101+、**Claude Desktop**、**Cursor** 等。

[查看原文](https://github.com/github/github-mcp-server)

---

## 阿里巴巴开源AI代码审查工具Open Code Review {#news-5}

> **阿里巴巴集团** 开源了其内部使用的AI驱动代码审查CLI工具 **Open Code Review**，该工具已服务数万名开发者。

![阿里巴巴开源AI代码审查工具Open Code Review](https://opengraph.githubassets.com/301bb845b08000a847032cb907bca2b66190511166c37d04cca830ec89d7cd38/alibaba/open-code-review)

该工具起源于 **阿里巴巴** 内部官方AI代码审查助手，在过去两年中识别了数百万个代码缺陷。

它通过一个具有工具使用能力的代理读取 **Git** 差异，将更改的文件发送到可配置的LLM，并生成行级精度的结构化审查评论。

其核心设计理念是将确定性工程与代理相结合，以处理纯语言驱动架构在审查过程中缺乏硬约束的问题。

该代理能够读取完整文件内容、搜索代码库、检查其他更改的文件以获取上下文，从而进行深度审查。

[查看原文](https://github.com/alibaba/open-code-review)

---

## xAI 发布 Grok Imagine 1.5，支持图生 720p 视频 {#news-6}

> xAI 公司更新了其 `grok-imagine-video-1.5-preview` 模型，该模型可根据文本提示将静态图像转换为高分辨率的电影级视频。

![xAI 发布 Grok Imagine 1.5，支持图生 720p 视频](https://the-decoder.com/wp-content/uploads/2026/06/grok_xai_video15.png)

xAI 发布了名为 `grok-imagine-video-1.5-preview` 的图生视频模型。该模型能够将静态图像转换为最高 720p 分辨率的视频。

新模型允许将多个视频片段拼接在一起，以形成更长的连贯场景。

此次更新使得 AI 在动态视觉内容生成方面的能力得到了进一步提升。

[查看原文](https://the-decoder.com/xai-updates-grok-imagine-to-1-5-with-image-to-video-generation-at-720p-resolution/)

---

## Google LiteRT-LM实现设备端高速生成式AI {#news-7}

> **Google AI Edge**的`LiteRT-LM`为在移动和边缘环境运行`Gemma 4`提供高度优化的生产级基础设施。

`LiteRT-LM`通过内存高效动态加载，解锁了`Gemma 4`的原生多模态和代理功能。

采用`Multi-Token Prediction`技术，可实现高达2.2倍的速度提升。

该引擎提供高级编排工具，如思考模式和受约束解码，并扩展了平台支持。

新增了面向Apple生态的原生Swift API，以及支持高性能浏览器推理的WebGPU加速JavaScript API。

[查看原文](https://developers.googleblog.com/blazing-fast-on-device-genai-with-litert-lm/)

---

## OpenAI发布Codex CLI：可在本地运行的AI编码代理 {#news-8}

> **OpenAI** 的编码代理 **Codex CLI** 已在GitHub开源，允许开发者在本地计算机上运行AI辅助编码任务。

![OpenAI发布Codex CLI：可在本地运行的AI编码代理](https://opengraph.githubassets.com/f07456596ff2baa27d0cc53c59508b33d3b020ba9b5a133e8521c8dd7b48696c/openai/codex)

**Codex CLI** 是一个可在本地运行的编码代理。用户可以通过多种方式安装，例如在 Mac 或 Linux 上使用 `curl` 命令，在 Windows 上使用 **PowerShell** 命令。

也可以通过 **npm** 或 **Homebrew** 等包管理器进行安装，安装后运行 `codex` 命令即可开始使用。

其GitHub仓库包含多个目录，如 `codex-cli`、`codex-rs` 和 `docs` 等，提供了丰富的资源。

该项目提供了针对不同平台的二进制文件，例如 **macOS Apple Silicon** 和 **Linux x86_64** 版本。

[查看原文](https://github.com/openai/codex)

---

## 开源LLM应用平台Dify：可视化构建与全面模型支持 {#news-9}

> Dify是一个开源LLM应用开发平台，提供可视化工作流构建和数百种模型支持。

![开源LLM应用平台Dify：可视化构建与全面模型支持](https://repository-images.githubusercontent.com/626805178/6616f28b-ae4c-44e6-8b4c-e3c3396315e9)

**Dify** 的核心功能包括可视化工作流构建、Prompt IDE以及RAG管道。

平台支持集成来自数十家推理提供商的数百种专有及开源模型，如 `GPT`、`Mistral`、`Llama3` 及任何兼容OpenAI API的模型。

平台集成了 `Opik`、`Langfuse` 和 `Arize Phoenix` 等可观测性工具。

启动Dify服务器的最低系统要求为CPU 2核、内存4 GiB，可通过Docker Compose部署。

[查看原文](https://github.com/langgenius/dify)

---

## PaddleOCR成为GitHub热门项目，支持百种语言的OCR工具 {#news-10}

> 百度飞桨旗下的**PaddleOCR**成为GitHub热门Python仓库，以其强大的功能和轻量级特性受到开发者关注。

**PaddleOCR**是一个功能强大且轻量级的OCR工具包，能够将PDF或图像文档转换为结构化的AI数据。

该项目在GitHub上已获得79,965颗星，今日新增141颗星，显示出社区的持续热情。

它支持超过100种语言，为全球开发者提供了广泛的文本识别能力。

[查看原文](https://github.com/PaddlePaddle/PaddleOCR)

---

## GitHub热门：开源AI代理项目goose星标数近5万 {#news-11}

> 一个名为 **aaif-goose/goose** 的开源、可扩展AI代理项目正在 **GitHub Trending** 上获得广泛关注。

该项目使用 **Rust** 语言编写，旨在超越简单的代码建议，能够使用任何大型语言模型（LLM）进行安装、执行、编辑和测试。

截至当前，该项目在 **GitHub** 上已获得46,524颗星，今日新增128颗星，显示出社区对其潜力的认可。

其可扩展性和多模型支持使其成为探索AI代理能力的一个有趣案例。

[查看原文](https://github.com/aaif-goose/goose)

---

## GitHub热门项目ollama：快速运行多款主流大模型 {#news-12}

> GitHub 上的热门项目 `ollama` 提供了快速运行 Kimi-K2.6、GLM-5.1 等多款主流大模型的便利工具。

该项目是一个名为 `ollama` 的开源工具，旨在简化在本地环境中运行大型语言模型的过程。

它支持快速启动和运行多种知名模型，包括 **Kimi-K2.6**、**GLM-5.1**、**MiniMax**、**DeepSeek**、`gpt-oss`、**Qwen** 和 **Gemma** 等。

[查看原文](https://github.com/ollama/ollama)

---

## GitHub 热门项目：多环境安全扫描工具 Trivy {#news-13}

> 一个名为 `trivy` 的项目，用于在容器、Kubernetes 等多种环境中发现安全风险。

**trivy** 可用于在容器、Kubernetes、代码仓库和云环境中发现漏洞、错误配置、秘密信息和软件物料清单。

[查看原文](https://github.com/aquasecurity/trivy)

---

## Google 发布 ADK for Kotlin 与 Android 版，简化 AI 代理开发 {#news-14}

> Google 宣布推出 `ADK for Kotlin` 的 0.1.0 版本，并发布了专门用于 Android 的 ADK 库，旨在简化 AI 代理的创建过程。

**Google** 发布了 `Agent Development Kit (ADK) for Kotlin` 的 0.1.0 版本，这是一个用于构建 AI 代理的开源框架。

该框架通过管理复杂的编排、会话共享和错误处理来简化开发流程，并支持混合编排，使开发人员能够构建多代理系统。

例如，云端模型可以将特定任务无缝卸载到本地设备模型（如 **Gemini Nano**），从而在增强功能的同时也增强了用户隐私。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## Anthropic开源AI漏洞发现框架defending-code-reference-harness {#news-15}

> **Anthropic** 开源了名为 `defending-code-reference-harness` 的框架，旨在利用 **Claude** 实现自主的漏洞发现与修复。

![Anthropic开源AI漏洞发现框架defending-code-reference-harness](https://opengraph.githubassets.com/4326cd5eef88548cf0d7c85d6cfe274896a6bd4670a8d6ae17012f1c103a1f5a/anthropics/defending-code-reference-harness)

该框架是基于 **Anthropic** 与多个组织合作推出 `Claude Mythos Preview` 后的经验教训构建的参考实现。

它包含一个自主管道，涵盖侦察、发现、验证、报告到补丁的全流程，配置为使用 **Docker** 和 **ASAN** 查找C/C++内存漏洞。

值得注意的是，该参考仓库不维护，也不接受贡献。**Anthropic** 同时提供托管产品 **Claude Security**，可扫描代码库、应用多阶段验证管道并管理修复流程。

管道中的技能包括交互式范围界定、扫描、分类和修补，展示了AI在安全领域的应用潜力。

[查看原文](https://github.com/anthropics/defending-code-reference-harness)

---

## Go语言GitHub仓库：开源、高效与协作的编程语言项目 {#news-16}

> **Go** 是一种开源的编程语言，旨在轻松构建简单、可靠和高效的软件，其项目由全球成千上万的贡献者共同开发。

![Go语言GitHub仓库：开源、高效与协作的编程语言项目](https://opengraph.githubassets.com/376db9e06c537ed84af5261af8c6796db4bdfc0977da87090615e2ecdd3a996b/golang/go)

**Go** 的目标是构建简单、可靠和高效的软件。其规范Git仓库托管于 **Google** 的服务器。

**Go** 的源文件在 **BSD** 风格许可证下分发，官方二进制文件可通过其网站下载。

该项目的开发是一个大规模协作的过程，拥有庞大的贡献者社区。

项目使用问题跟踪器进行管理，但仅限用于错误报告和提案，以保持社区的专注度。

[查看原文](https://github.com/golang/go)

---

## Google Tensor ML SDK 推出 Beta 版，集成 LiteRT {#news-17}

> Google Tensor ML SDK 进入 Beta 阶段，允许开发者构建和部署高性能机器学习模型，并直接在 **Google Pixel 10** 设备的 TPU 上运行。

该 SDK 通过与 `LiteRT` 集成，为开发者提供了统一的模型转换、编译和运行工作流，支持 **PyTorch** 和 **TFLite** 模型。

新推出的模型花园提供了超过 100 个模型，涵盖经典和生成式 AI，其中包括 **Gemma 3**。

SDK 支持在设备上实现低延迟、私密的功能，例如语音识别、计算机视觉和文本生成。

[查看原文](https://developers.googleblog.com/google-tensor-sdk-beta-with-litert/)

---

## Google Genkit推出中间件系统，增强AI智能体应用可靠性 {#news-18}

> Google宣布其开源框架Genkit新增中间件功能，允许开发者拦截生成调用并注入自定义行为，以构建更可靠的智能体AI应用。

Genkit是一个支持TypeScript、Go、Dart和Python的开源框架，旨在帮助开发人员构建可投入生产的智能体AI应用。

新推出的中间件系统可以拦截生成调用，开发者能够注入重试、模型回退和人机循环工具审批等自定义行为。

通过在生成、模型和工具层附加钩子，开发者可以确保高可靠性和对模型输出的确定性控制。

Genkit允许创建和堆叠自定义中间件，所有操作都可以通过专用的开发人员UI进行检查和调试。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## 新隐私工具Filtr利用iOS新特性，在几乎所有苹果设备应用中屏蔽广告 {#news-19}

> 一款名为**Filtr**的新工具利用了**iOS 26**和**macOS 26**中的URL过滤器功能，可在多数应用中拦截广告。

![新隐私工具Filtr利用iOS新特性，在几乎所有苹果设备应用中屏蔽广告](https://techcrunch.com/wp-content/uploads/2026/06/ad-blocker-1609310276.jpg?resize=1200,766)

该工具由开发者Kaylee Serena Calderolla创建，是现有广告拦截器应用**Wipr**的一个付费附加功能，年费为5美元。

**Filtr** 是目前已知首个利用苹果系统新增的URL过滤器功能的应用程序。

开发者强调该应用不收集任何个人数据，旨在增强用户的隐私保护。

[查看原文](https://techcrunch.com/2026/06/04/filtr-is-a-new-privacy-tool-that-blocks-ads-in-almost-every-iphone-and-mac-app/)

---

## GitHub热门项目Spec Kit：推动规范驱动开发的开源工具包 {#news-20}

> **GitHub** 推出开源项目 **Spec Kit**，旨在帮助开发者实践规范驱动开发（Spec-Driven Development），让规范变得可执行并能直接生成代码。

![GitHub热门项目Spec Kit：推动规范驱动开发的开源工具包](https://opengraph.githubassets.com/4639deccca5785d023148325a31932094033cea5e678272a437197c0ae00487a/github/spec-kit)

**Spec Kit** 是一个开源工具包，其核心思想是让规范可执行，从而直接生成工作实现，而不仅仅是指导开发。

使用该项目需要安装 **Specify CLI**，可以通过 **uv** 进行安装。

初始化一个新项目的命令示例为 `specify init my-project --integration copilot`。

该项目支持多种AI编码代理集成，为规范驱动开发提供了工具支持。

[查看原文](https://github.com/github/spec-kit)

---

## 哥伦比亚大学数据泄露波及无关人士，社会安全号码大量曝光 {#news-21}

> 哥伦比亚大学去年发生的数据泄露事件不仅影响了校内人员，据报还波及与该校无任何关联的受害者，其中包含约180万个社会安全号码。

哥伦比亚大学去年发生的数据泄露事件暴露了包括180万个社会安全号码在内的大量敏感信息。该校的公开通知最初仅针对“哥伦比亚大学社区成员”，涉及招生、经济援助及部分雇员信息。

然而，实际情况与学校通知存在不一致。有报道称，受害者中包括与哥伦比亚大学毫无关联的个人，他们的敏感信息同样遭到泄露。

泄露事件背后据称的黑客活动家动机，是为了揭露哥伦比亚大学历史上“基于平权行动”的招生做法。

这一事件凸显了大型数据泄露影响范围的不可预测性，即使是明确的“社区成员”范围，也可能在实际中扩大。

[查看原文](https://arstechnica.com/tech-policy/2026/06/my-ssn-was-exposed-in-a-breach-at-columbia-a-school-i-have-no-connection-with/)

---

## Meta悄然将智能眼镜面部识别代码推送给数百万手机 {#news-22}

> 根据分析，**Meta**已将其智能眼镜的面部识别技术核心组件，悄悄集成到一个已被数百万用户下载的应用程序中。

![Meta悄然将智能眼镜面部识别代码推送给数百万手机](https://media.wired.com/photos/6a1f7cd62dd56ccdeabd0786/191:100/w_1280,c_limit/security_meta_final_@.jpg)

该功能在内部被称为“**NameTag**”，位于**Meta**的AI伴侣应用内。如果激活，它将识别眼镜摄像头捕捉到的人脸，并在佩戴者靠近时发出提醒。

**WIRED**发现，早在今年1月，系统的核心AI模型就已经集成到软件中并分发给用户，而**Meta**当时公开表示该技术仍在“考虑中”。

该技术将把眼镜捕捉到的面部转化为生物特征签名，并与手机上的数据库进行匹配。这复活了**Meta**在2021年宣布已“退役”的一种技术。

**Meta**曾因面部识别技术争议支付了巨额赔偿金，包括一起伊利诺伊州的6.5亿美元集体诉讼和与德克萨斯州达成的14亿美元和解。

[查看原文](https://www.wired.com/story/meta-smart-glasses-face-recognition-nametag-connections/)

---

## Dashlane披露协同黑客攻击事件，部分用户加密密码库遭下载 {#news-23}

> 密码管理工具Dashlane报告了一起针对其用户的协同攻击，攻击者试图下载大量加密的密码库。

Dashlane发现攻击者旨在恢复尽可能多的加密密码库。在攻击被缓解前，攻击者通过暴力破解为少量个人计划客户生成了有效令牌。

利用这些令牌，攻击者在目标账户上注册了新设备，并下载了用户加密保险库的副本。

攻击者滥用Dashlane用于设备注册的API，向大量用户注册邮箱发送了请求。

Dashlane的自动安全系统按预期运行，触发了对受影响账户的自动锁定以保护用户。

[查看原文](https://arstechnica.com/security/2026/06/dashlane-explains-how-attackers-managed-to-download-encrypted-password-vaults/)

---

## 科技领袖呼吁国会就DNA安全立法，防范AI生物武器风险 {#news-24}

> **Sam Altman**、**Dario Amodei**等科技领袖敦促美国政府立法，强制筛查合成DNA订单，以应对AI在生物实验室能力增强带来的安全风险。

![科技领袖呼吁国会就DNA安全立法，防范AI生物武器风险](https://the-decoder.com/wp-content/uploads/2023/06/Matthias_a_dangerous_bio_virus_emerging_from_a_computer.png)

包括**OpenAI** CEO **Sam Altman**、**Anthropic** CEO **Dario Amodei**和**DeepMind** CEO **Demis Hassabis**在内的多位科技领袖联名呼吁，美国政府应将筛查合成DNA订单作为法律要求。

这些签署者警告称，AI系统在指导实验室操作程序方面的能力，已达到甚至超越了博士水平病毒学家的水平。

他们担忧，这种能力的提升可能被滥用于制造生物武器，因此呼吁通过立法进行安全防范。

[查看原文](https://the-decoder.com/ai-can-now-coach-amateur-virologists-and-top-tech-leaders-want-congress-to-act-on-dna-security/)


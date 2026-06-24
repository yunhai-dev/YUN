---
title: 科技早报 2026-06-24
category: "科技, 科技早报"
excerpt: 谷歌在开发者大会上宣布AI战略转向独立智能体，并发布多款新模型与开发者工具，同时白宫宣布加速政府向抗量子加密过渡。
lastEdited: 2026年6月24日
tags: [科技早报, 谷歌, AI智能体, 开发者工具, 量子加密, 开源项目, GitHub, 网络安全]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026：宣布从辅助AI转向独立智能体战略](#news-1)
### AI 与机器学习

- [谷歌发布实验性扩散模型DiffusionGemma开发者指南](#news-2)
- [开发者指南：Gemma 4 12B的创新无编码器架构揭秘](#news-3)
- [谷歌发布指南：如何用 `Agent Development Kit` 构建跨语言多智能体团队](#news-4)
- [Menlo Ventures凭借对Anthropic的押注成功募集30亿美元基金](#news-5)
- [MIT超声波腕带让机器人手精准模仿人类手势](#news-6)
- [开源工具HALO：基于RLM的本地AI智能体跟踪调试器](#news-7)
### GitHub 热门项目

- [腾讯开源LLM知识平台WeKnora，GitHub星标近1.8万](#news-8)
- [Anthropic官方Claude代码插件目录上线GitHub，星标突破3万](#news-9)
- [字节跳动开源长周期超级代理工具deer-flow，GitHub星标超7.4万](#news-10)
- [GitHub热门项目：为AI代理提供817个网络安全技能](#news-11)
- [GitHub热门：Voicebox开源AI语音工作室](#news-12)
- [GitHub 趋势项目：基于 **Rust** 的 GPU 加速终端模拟器 `wezterm`](#news-13)
### 开源生态

- [谷歌发布代理资源发现规范，促进跨组织互操作](#news-14)
### 开发者工具

- [GitHub 热门项目：agent-browser 提供 AI 代理浏览器自动化 CLI](#news-15)
- [谷歌发布A2UI+MCP应用混合架构模式](#news-16)
- [谷歌推出TPU开发者中心以优化模型开发](#news-17)
- [谷歌推出Colab命令行接口，连接本地与云端运行时](#news-18)
### 安全与隐私

- [白宫大幅缩短政府淘汰量子脆弱加密算法最后期限](#news-19)
- [Scattered Spider黑客组织成员就伦敦交通局攻击案认罪](#news-20)
- [安全扫描工具Trivy持续火爆，GitHub星标超3.6万](#news-21)
- [Dialog宣称遭黑客攻击，但调查指向网站配置错误](#news-22)
### 产品与平台

- [Google Home将通过非生物信号强化识别](#news-23)
- [Meta推出自有品牌更便宜智能眼镜产品线](#news-24)
---

## Google I/O 2026：宣布从辅助AI转向独立智能体战略 {#news-1}

> 在2026年开发者大会上，**Google** 宣布其AI战略将从辅助工具转向构建独立的智能体。

**Google** 在主题演讲中宣布了其AI战略的重大转变，目标是开发能够独立执行任务的智能体。

本次大会发布了 **Gemini 3.5** 系列模型，并对其 **Antigravity** 智能体优先开发平台进行了重大更新。

为移动端开发者，**Google** 推出了新的 **Android CLI** 工具、`Android Bench` 评估排行榜以及一个自动迁移智能体。

Web开发领域也迎来变革，包括智能体专用 **Chrome DevTools**、`HTML-in-Canvas` API，以及一个名为 `WebMCP` 的开放Web标准提案。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 谷歌发布实验性扩散模型DiffusionGemma开发者指南 {#news-2}

> 谷歌发布了基于Gemma 4架构的实验性文本生成模型DiffusionGemma的开发者指南，该模型采用创新的并行生成方式。

**DiffusionGemma**是一个基于**Gemma 4**架构构建的实验性文本生成模型。

与传统逐词元自回归不同，它使用基于扩散的并行生成，通过迭代去噪并行生成和精炼256个词元的块。

该模型能够处理诸如数独之类的复杂约束任务，并且在微调方面表现出强大的性能提升。

该模型与`vLLM`和其他流行的推理框架集成，且可以在消费级GPU上部署。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## 开发者指南：Gemma 4 12B的创新无编码器架构揭秘 {#news-3}

> 谷歌发布`Gemma 4 12B`开发者指南，揭示了这款专为消费设备高性能本地AI执行设计的密集型多模态模型的核心架构。

`Gemma 4 12B`引入了一种新颖的无编码器架构，这是其关键创新点。

该架构绕过了传统的视觉和音频编码器，直接将多模态数据馈送到LLM骨干网络中。

这种设计旨在优化在消费级设备上的本地执行性能，使强大的AI能力得以在用户设备上直接运行。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## 谷歌发布指南：如何用 `Agent Development Kit` 构建跨语言多智能体团队 {#news-4}

> 谷歌展示了如何利用 `Agent2Agent` 协议和 `Agent Development Kit` (ADK) 构建一个由 **Python** 和 **Go** 智能体组成的跨语言协作团队，以解决合同合规性任务。

![谷歌发布指南：如何用 `Agent Development Kit` 构建跨语言多智能体团队](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner.2e16d0ba.fill-1200x600.jpg)

演示中，一个 **Python** 智能体使用 **Gemini** 模型解析法律合同并提取关键条款，而一个 **Go** 智能体则使用确定性逻辑验证这些条款，不涉及大语言模型。

文章重点介绍了三个将生产多智能体系统与单语言演示区分开的架构模式，强调了单一智能体在生产环境中因上下文退化、故障影响范围大而难以测试的局限性。

完整的示例源代码已在 **GitHub** 上开源。此次指南为开发者提供了构建健壮、可测试的多智能体系统的实践参考。

[查看原文](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)

---

## Menlo Ventures凭借对Anthropic的押注成功募集30亿美元基金 {#news-5}

> Menlo Ventures宣布完成其历史上规模最大的30亿美元基金募集，其AI投资组合，特别是对Anthropic的投资，是主要驱动力。

![Menlo Ventures凭借对Anthropic的押注成功募集30亿美元基金](https://techcrunch.com/wp-content/uploads/2026/06/Victory-dollars-dollar-signs.png?resize=1200,960)

**Menlo Ventures**宣布了30亿美元的基金，这是其50年历史上规模最大的一次融资。该基金主要由其AI投资组合驱动，特别是对**Anthropic**的投资。

**Menlo Ventures**在**Anthropic**中的股份目前价值约140亿美元。2024年，该公司主导了**Anthropic**的D轮融资，进行了一笔7.5亿美元的“押上公司命运”的投资。

该笔交易中约5亿美元通过特殊目的载体筹集，**Menlo Ventures**自身基金及内部人士贡献了2.5亿美元。此后，**Menlo Ventures**又参与了**Anthropic**的E轮和F轮融资。

2024年，**Menlo Ventures**与**Anthropic**联合推出了一只1亿美元的初创企业基金“**Anthology**”，该基金已部署资本接近2.5亿美元。

[查看原文](https://techcrunch.com/2026/06/23/after-betting-the-firm-on-anthropic-menlo-ventures-raises-victorious-3b-fund/)

---

## MIT超声波腕带让机器人手精准模仿人类手势 {#news-6}

> 麻省理工学院研究团队设计了一种配备超声波贴片的腕带，通过AI实时将手腕内部图像转换为手指位置，从而无线控制机器人手进行模仿。

![MIT超声波腕带让机器人手精准模仿人类手势](https://wp.technologyreview.com/wp-content/uploads/2026/06/MIT-Hand-Tracker-02-press.jpg?w=3000)

该设备由**麻省理工学院**机械工程教授**Xuanhe Zhao**及其同事设计，核心是与水凝胶配对、可安全粘附皮肤的超声波贴片。

它通过拍摄手腕肌肉、肌腱和韧带的超声图像，然后由人工智能算法将图像实时转换为五根手指和手掌的对应位置。

在演示中，佩戴者可以无线控制一个机器人手，模仿弹奏钢琴曲或投篮等手势。研究人员计划进一步缩小硬件尺寸，并在更多样的志愿者手上训练AI软件。

[查看原文](https://www.technologyreview.com/2026/06/23/1138279/ultrasound-imaging-turns-a-robot-hand-into-a-skillful-mimic/)

---

## 开源工具HALO：基于RLM的本地AI智能体跟踪调试器 {#news-7}

> 一个名为HALO的开源工具亮相，它是一个基于RLM的智能体优化器，专注于利用生产环境跟踪数据对AI智能体进行调试和优化。

![开源工具HALO：基于RLM的本地AI智能体跟踪调试器](https://opengraph.githubassets.com/dff1b69bd5b1def2bfba314677c296eee73854c31e1bfc9029ca2c2160b11916/context-labs/HALO)

**HALO** 是一个基于RLM的智能体优化器，其核心循环包括收集智能体执行跟踪、输入RLM引擎分析、生成报告并应用变更。

HALO的RLM引擎会分解跟踪数据，以理解跨执行的常见故障模式，特别擅长在生产智能体部署中发现问题。

该工具提供了一个桌面应用，可以通过提供的curl命令安装。其仓库还包含方法论信息、一个Python包和一个演示项目。

截至信息发布时间，该仓库的Star数为928，Fork数为69。

[查看原文](https://github.com/context-labs/halo)

---

## 腾讯开源LLM知识平台WeKnora，GitHub星标近1.8万 {#news-8}

> 腾讯发布了名为**WeKnora**的开源LLM知识平台，旨在将原始文档转化为可查询的RAG、自主推理代理和自维护的Wiki。

**WeKnora**是一个基于LLM的开源知识平台，其核心功能是将原始文档转化为可查询的**RAG**、一个自主推理代理以及一个自维护的**Wiki**。

该项目完全使用**Go**语言编写，代码仓库已在**GitHub**上成为趋势项目，目前累计获得了17,096颗星。

数据显示，该项目今日新增了254颗星，显示出开发者社区对其持续增长的关注度。

[查看原文](https://github.com/Tencent/WeKnora)

---

## Anthropic官方Claude代码插件目录上线GitHub，星标突破3万 {#news-9}

> **Anthropic** 在GitHub上发布了一个名为`claude-plugins-official`的官方仓库，用作高质量Claude代码插件的官方目录。

该仓库被描述为“Official, Anthropic-managed directory of high quality Claude Code Plugins”，由Anthropic官方管理。

仓库在GitHub Trending上，使用Python语言开发。

截至信息发布时间，该仓库已拥有30,891颗星，今日新增77颗星。

[查看原文](https://github.com/anthropics/claude-plugins-official)

---

## 字节跳动开源长周期超级代理工具deer-flow，GitHub星标超7.4万 {#news-10}

> 字节跳动（**bytedance**）在GitHub上开源了一个名为`deer-flow`的Python项目，这是一个集研究、编码与创作功能于一体的长周期超级代理工具。

`deer-flow`是一个开源的超级代理工具，旨在处理需要数分钟到数小时的不同级别任务。该工具集研究、编码和创作功能于一体。

它借助沙箱、记忆、工具、技能、子代理和消息网关来工作，以支持其复杂功能。

截至信息发布时间，该项目在GitHub上已获得74,026颗星，当日新增趋势星标为739。

[查看原文](https://github.com/bytedance/deer-flow)

---

## GitHub热门项目：为AI代理提供817个网络安全技能 {#news-11}

> GitHub热门Python项目 **mukul975/Anthropic-Cybersecurity-Skills** 为AI代理提供了817个结构化的网络安全技能。

这些技能映射到了6个框架，包括MITRE ATT&CK、NIST CSF 2.0和MITRE ATLAS等，并遵循agentskills.io标准。

技能可与 **Claude Code**、**GitHub Copilot**、`Codex CLI`、**Cursor**、`Gemini CLI`及20多个平台配合使用。

项目涵盖29个安全领域，采用Apache 2.0许可证，目前拥有19,867颗星。

[查看原文](https://github.com/mukul975/Anthropic-Cybersecurity-Skills)

---

## GitHub热门：Voicebox开源AI语音工作室 {#news-12}

> 开源项目 **Voicebox** 提供了一个本地优先的AI语音工作室，可作为 **ElevenLabs** 和 **WisprFlow** 的免费替代方案。

![GitHub热门：Voicebox开源AI语音工作室](https://opengraph.githubassets.com/398ce9d2d62d9fdc3ed256b4db47f9c0e0fb28a68ff9efc0d1b8322f3dd7cfc9/jamiepine/voicebox)

该项目允许用户在一个应用中克隆语音、生成语音，并在任何应用中通过口述输入。其核心优势在于完全隐私，所有模型和数据均保留在用户本机。

**Voicebox** 支持从短音频克隆语音，并使用包括 `Qwen3-TTS`、`Chatterbox Turbo`、`HumeAI TADA` 等在内的7个TTS引擎，在23种语言中生成语音。

项目还具备全局热键口述、无限长度自动分块、故事编辑器等功能，并可为AI代理赋予语音能力。

[查看原文](https://github.com/jamiepine/voicebox)

---

## GitHub 趋势项目：基于 **Rust** 的 GPU 加速终端模拟器 `wezterm` {#news-13}

> **wezterm** 是一款 GPU 加速的跨平台终端模拟器和多路复用器，由开发者 **@wez** 使用 **Rust** 语言编写，目前是 **GitHub** 上的热门趋势项目。

该项目因其高性能和跨平台特性受到开发者关注，目前在 **GitHub** 上已获得超过 26,858 颗星。

根据趋势数据，该项目今日获得了 48 颗星，显示出持续的社区热度。

**wezterm** 结合了现代终端功能与多路复用能力，旨在为用户提供高效的命令行工作环境。

[查看原文](https://github.com/wezterm/wezterm)

---

## 谷歌发布代理资源发现规范，促进跨组织互操作 {#news-14}

> **谷歌**宣布推出**代理资源发现规范**（ARD），这是一个旨在解决代理生态系统互操作性问题的开放规范。

![谷歌发布代理资源发现规范，促进跨组织互操作](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_Generated_Image_gzxwoagzxw.2e16d0ba.fill-1200x600.jpg)

该规范定义了在网络上查找和验证工具、技能与代理的开放标准，使代理能够跨越组织边界发现能力并建立信任。

其架构依赖于**目录**和**注册表**两个原语。目录由组织发布在自有域名下，域名的控制权作为身份和信任的加密基础。

**注册表**则作为代理网络的搜索引擎，负责爬取已发布的目录、索引其内容并使其可搜索，从而构建一个可互操作的代理发现网络。

ARD 规范由**谷歌**与行业合作伙伴共同开发，旨在为日益复杂的代理生态系统提供一个统一的发现和验证框架。

[查看原文](https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/)

---

## GitHub 热门项目：agent-browser 提供 AI 代理浏览器自动化 CLI {#news-15}

> **vercel-labs/agent-browser** 是一个为 AI 代理设计的浏览器自动化命令行界面工具，采用快速的原生 Rust CLI 构建。

![GitHub 热门项目：agent-browser 提供 AI 代理浏览器自动化 CLI](https://opengraph.githubassets.com/1ab237a091b8c0f79f8c413ee08d021a51441650033b6bbc391f79971d75bccc/vercel-labs/agent-browser)

该项目可通过 `npm install -g agent-browser` 进行全局安装，安装后需运行 `agent-browser install` 来下载 **Chrome for Testing**（仅首次需要）。

在 Linux 系统上安装时，可使用 `agent-browser install --with-deps` 来安装所需的系统依赖。

用户可通过 `agent-browser upgrade` 命令升级到最新版本，该命令会自动检测安装方法并运行更新。

使用该工具需要 **Chrome**、**Node.js** 24+，以及 **pnpm** 11+ 和 **Rust**（仅从源代码构建时需要）。

[查看原文](https://github.com/vercel-labs/agent-browser)

---

## 谷歌发布A2UI+MCP应用混合架构模式 {#news-16}

> 谷歌介绍了三种旨在集成模型上下文协议应用与代理到用户界面的混合架构模式。

这些模式旨在解决高度定制化的iframe环境与原生、声明式渲染之间的权衡问题。

开发者可结合这些方法，通过**MCP服务器**提供具有原生感觉的UI，或在声明式视图中嵌入复杂且有状态的iframe应用。

该混合框架使团队能根据项目约束，提供安全、高性能且品牌一致的代理用户体验。

该方案亦可将生成式UI组件注入遗留系统，以适应多样化的开发需求。

[查看原文](https://developers.googleblog.com/a2ui-and-mcp-apps/)

---

## 谷歌推出TPU开发者中心以优化模型开发 {#news-17}

> 谷歌正式推出了**TPU开发者中心**，这是一个旨在帮助开发者最大化Cloud TPU性能的集中式教育资源。

该中心提供以代码为中心的资源、开源配方以及深入文档，旨在简化从大规模训练到低延迟推理的工作负载。

文档内容涵盖硬件架构、软件优化、调试、并行性和网络等多个方面。

这些材料既为人类开发者量身定制，也为AI辅助工具设计，以提升开发效率。

开发者可通过该中心获取指导，以更好地利用谷歌Cloud TPU的性能。

[查看原文](https://developers.googleblog.com/unlocking-the-power-of-the-tpu-stack-introducing-our-new-developer-hub/)

---

## 谷歌推出Colab命令行接口，连接本地与云端运行时 {#news-18}

> 谷歌发布了`Google Colab`命令行接口（CLI），允许开发者将本地终端连接到远程Colab运行时。

谷歌发布了**Google Colab**命令行接口（CLI）这一新工具。

该工具允许开发者和AI代理将本地终端连接到远程Colab运行时，以实现无摩擦执行。

这个轻量级的CLI使用户能够轻松请求高性能GPU、远程运行本地Python脚本。

该工具可以无缝检索工件日志或模型，例如微调的**Gemma 3**适配器。

该工具高度可编程，可供**Antigravity**或**Claude Code**等AI代理使用，以管理复杂的机器学习流水线。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 白宫大幅缩短政府淘汰量子脆弱加密算法最后期限 {#news-19}

> 白宫发布行政命令，要求政府机构在2030年底前完成向抗量子加密系统的过渡，期限比原计划提前约五年。

一项题为“保护国家免受高级密码攻击”的行政命令，要求“高价值资产”和“高影响系统”在2030年12月31日前过渡到后量子密钥建立方案。

该命令同时规定，在2031年12月31日前需完成向量子安全数字签名方案的过渡。

期限缩短的原因是近期研究表明，构建具有密码学相关性的量子计算机所需资源远低于此前共识。

**谷歌**、**Cloudflare**等公司近期已将其相关迁移时间表收紧至2029年。

[查看原文](https://arstechnica.com/information-technology/2026/06/executive-order-bumps-up-deadline-to-move-off-quantum-vulnerable-crypto/)

---

## Scattered Spider黑客组织成员就伦敦交通局攻击案认罪 {#news-20}

> 两名Scattered Spider网络犯罪组织的关键成员在英国法庭认罪，承认参与了2024年针对伦敦交通局及其他机构的破坏性网络攻击。

![Scattered Spider黑客组织成员就伦敦交通局攻击案认罪](https://krebsonsecurity.com/wp-content/uploads/2026/06/flowers-jubair-nca.png)

来自英国的 **Thalha Jubair** 和 **Owen Flowers** 认罪，承认对伦敦交通局的计算机系统实施了未授权行为，并对公共福祉造成了严重损害风险。

Owen Flowers 单独承认参与了2024年9月针对美国医疗保健提供商 **SSM Health Care Corporation** 和 **Sutter Health** 的黑客阴谋。

Thalha Jubair 还受到美国执法机构的通缉，涉及2022年至2025年间对47家美国实体的网络入侵及巨额赎金支付指控。

据称，Jubair 曾共同运营一个名为 **Star Chat** 的 Telegram 频道，该组织通过钓鱼攻击窃取企业凭证，曾导致 **LastPass**、**DoorDash** 等130多家公司数据泄露。

[查看原文](https://krebsonsecurity.com/2026/06/scattered-spider-hackers-plead-guilty-on-day-1-of-trial/)

---

## 安全扫描工具Trivy持续火爆，GitHub星标超3.6万 {#news-21}

> 开源安全扫描工具**trivy**在GitHub上广受欢迎，能够检测容器、Kubernetes及云环境中的漏洞与配置错误。

**trivy**是一个综合性的安全扫描工具，可查找**容器**、**Kubernetes**、代码仓库和云环境中的漏洞、错误配置、秘密以及软件物料清单。

该项目同样使用**Go**语言编写，其**GitHub**仓库目前拥有36,560颗星，是一个成熟的趋势项目。

尽管增速平缓，但该项目今日仍获得了21颗星，保持了稳定的社区活跃度。

[查看原文](https://github.com/aquasecurity/trivy)

---

## Dialog宣称遭黑客攻击，但调查指向网站配置错误 {#news-22}

> 由**Peter Thiel**联合创办的私人活动团体**Dialog**声称遭遇“犯罪”黑客攻击导致成员信息泄露，但**Wired**调查发现访问数据可能无需入侵。

**Dialog**，一个由**Peter Thiel**等人联合创办的私人活动团体，声称其成员个人详细信息因一次“犯罪”黑客攻击而泄露。

然而，科技媒体**Wired**在调查后表示，其未发现任何证据表明需要进行黑客入侵（break-in）才能访问这些文件。

该事件的核心问题可能源于一个配置错误的网站，而非传统意义上的外部攻击，这引发了关于数据安全责任归属的讨论。

[查看原文](https://www.wired.com/story/dialog-hack-website-misconfiguration/)

---

## Google Home将通过非生物信号强化识别 {#news-23}

> **Google Home**即将更新智能摄像头功能，提升用户识别能力。

![Google Home将通过非生物信号强化识别](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23451196/acastro_220510_STK123_0002.jpg?quality=90&strip=all&crop=0,0,100,100)

从6月23日开始，**Google**将扩展其面部识别功能，即使在人脸不清晰可见时，也能通过体型、服装颜色等非生物信号识别用户。

此次更新旨在通过额外的非生物信号提高识别准确性。

**Familiar Faces**库将开始自动更新家中每个人最近的图像，以减少因过时示例导致的不准确通知。

[查看原文](https://www.theverge.com/tech/955385/google-home-familiar-faces-clothing)

---

## Meta推出自有品牌更便宜智能眼镜产品线 {#news-24}

> Meta推出名为“Meta Glasses”的新智能眼镜产品线，起售价299美元，配备摄像头和音频功能。

![Meta推出自有品牌更便宜智能眼镜产品线](https://techcrunch.com/wp-content/uploads/2026/06/meta-glasses.png?resize=1200,624)

**Meta**推出了一条新的智能眼镜产品线，名为“**Meta Glasses**”，起售价为299美元。该产品与**EssilorLuxottica**合作制造，但不带有**Ray-Ban**或**Oakley**品牌。

这款眼镜没有显示屏，但配备了摄像头和个人扬声器。**Meta**声称其电池续航时间超过八小时，配套充电盒可额外提供长达40小时的使用时间。

首批新眼镜包括“**Meta Adventurer**”、“**Meta Fury**”以及与**Kylie Jenner**合作设计的款式。其内置的**Meta AI**助手可以回答问题，并将很快支持“行人导航”功能。

[查看原文](https://techcrunch.com/2026/06/23/meta-debuts-new-cheaper-smart-glasses-under-its-own-brand/)


---
title: 科技早报 2026-06-06
category: "科技, 科技早报"
excerpt: 谷歌I/O大会推动AI代理转型，多公司面临AI成本飙升，开源项目如RustDesk持续火爆。
lastEdited: 2026年6月6日
tags: [科技早报, 谷歌, AI, 开源, GitHub, 开发者工具, 安全与隐私]
imageUrl: 
---

## 概览

### 要闻

- [谷歌I/O 2026开发者大会：从辅助AI到独立代理](#news-1)
### AI 与机器学习

- [扩散式推测解码在Google TPU上实现3倍大模型推理加速](#news-2)
- [AI token成本飙升，企业面临预算超支挑战](#news-3)
- [Google 发布 Gemma 4 QAT 模型，优化移动端与笔记本性能](#news-4)
- [里德·霍夫曼离开微软董事会，专注AI药物发现初创公司Manus](#news-5)
- [谷歌每月向SpaceX支付9.2亿美元租用算力](#news-6)
- [谷歌LiteRT-LM框架实现设备端闪电级生成式AI](#news-7)
### GitHub 热门项目

- [OpenAI开源Whisper通用语音识别模型](#news-8)
- [AI技能项目last30days-skill爆火，跨平台研究合成摘要](#news-9)
- [Vite：为现代Web项目提供极速开发与优化构建](#news-10)
- [开源远程桌面RustDesk星数破11万，成TeamViewer替代品](#news-11)
- [Rust高性能JS工具链OXC登陆GitHub热门](#news-12)
- [GitHub热门项目：Agent-Reach为AI代理提供互联网之眼](#news-13)
### 开源生态

- [Supabase八个月估值翻倍，达100亿美元](#news-14)
- [开源语音模型持续监听，每0.4秒决定发言或静默](#news-15)
- [Google发布ADK for Kotlin 0.1.0，简化Android及跨云AI代理开发](#news-16)
- [微软开源 `pg_durable` 实现 PostgreSQL 内持久化执行](#news-17)
### 开发者工具

- [谷歌推出 Colab CLI，实现本地终端直连远程 Colab 运行时](#news-18)
- [Google发布Genkit中间件，强化代理式AI应用开发](#news-19)
- [Google Pay 为 Android 引入动态回调增强结账流程](#news-20)
- [Google将Gemini CLI迁移至Antigravity CLI，统一AI终端工具](#news-21)
### 安全与隐私

- [研究揭示蓝牙漏洞可远程感染USB连接的音箱](#news-22)
- [佛罗里达州起诉 OpenAI 及其CEO，指控 ChatGPT 为缺陷产品](#news-23)
- [美国国会未能就无证监控授权改革达成一致](#news-24)
---

## 谷歌I/O 2026开发者大会：从辅助AI到独立代理 {#news-1}

> 谷歌在I/O 2026开发者大会上宣布，正推动AI从辅助工具向独立代理转型，并发布一系列重磅更新。

谷歌发布了`Gemini 3.5`系列模型，并对其代理优先开发平台`Antigravity`进行了重大更新。

面向移动开发者，谷歌引入了新的Android CLI工具、Android Bench评估排行榜和自动化迁移代理。

在Web开发领域，大会介绍了Chrome DevTools for agents、HTML-in-Canvas API以及WebMCP提案。

这些举措标志着谷歌在构建下一代智能应用平台上的全面布局。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 扩散式推测解码在Google TPU上实现3倍大模型推理加速 {#news-2}

> 加州大学圣地亚哥分校研究人员在Google **TPU**上实现了**DFlash**，一种块扩散推测解码方法，显著提升了大语言模型推理速度。

**DFlash**旨在绕过传统自回归草稿的顺序瓶颈。它通过单次前向传播生成整个候选词块，而非逐词预测。

该系统实现了平均3.13倍的加速，其峰值性能几乎是**EAGLE-3**等现有方法的两倍。

这项开源工作已集成到**vLLM**生态系统，通过利用并行验证和高质量草稿预测来优化**TPU**硬件，适用于复杂推理任务。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## AI token成本飙升，企业面临预算超支挑战 {#news-3}

> 随着AI采用和自主代理的推动，token消耗持续增加，导致多家企业面临严重的预算超支问题。

![AI token成本飙升，企业面临预算超支挑战](https://techcrunch.com/wp-content/uploads/2026/06/GettyImages-1316461644.jpg?resize=1200,816)

Uber在2026年4月就用完了其全年的AI编码预算。微软在启用开发人员的Claude Code许可证数月后，撤销了这些许可证。一名Priceline员工表示，其Cursor合同续签费用上涨了4-5倍。

尽管每token价格下降，但Anthropic的`Claude Opus 4.5`、OpenAI的`GPT-5.1`和Google的`Gemini 3 Pro`等新模型显著提升了代理工具，从而增加了消耗量。

FinOps基金会执行董事称，在4月和5月，他开始听到公司称其2026年token预算已超支3倍。一家公司因忘记设置使用限制，据报收到了高达5亿美元的Claude账单。

Linux基金会本周宣布计划成立Tokenomics基金会，这是一个旨在为AI token建立成本纪律的新标准机构。

[查看原文](https://techcrunch.com/2026/06/05/the-token-bill-comes-due-inside-the-industry-scramble-to-manage-ais-runaway-costs/)

---

## Google 发布 Gemma 4 QAT 模型，优化移动端与笔记本性能 {#news-4}

> **Google** 推出 **Gemma 4** 的量化感知训练（QAT）模型新检查点，旨在通过压缩显著提升设备端运行效率。

![Google 发布 Gemma 4 QAT 模型，优化移动端与笔记本性能](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Hero_Visual_Blog.width-1300.png)

**Google** 发布了 **Gemma 4** QAT 模型的新版本，该技术通过在训练期间模拟量化，能在压缩模型时最小化质量损失。

此次更新包含适配流行 `Q4_0` 量化格式以及一种专为移动用例设计的新型量化格式的 QAT 检查点。

通过使用专为移动设计的格式，**Gemma 4 E2B** 模型的内存占用已成功减少至 **1GB**。

**Google DeepMind** 的产品管理总监 **Olivier Lacombe** 与技术成员 **Omar Sanseviero** 在相关介绍中被提及。

[查看原文](https://blog.google/innovation-and-ai/technology/developers-tools/quantization-aware-training-gemma-4/)

---

## 里德·霍夫曼离开微软董事会，专注AI药物发现初创公司Manus {#news-5}

> 领英联合创始人**里德·霍夫曼**宣布将离开微软董事会，以全身心投入其AI药物发现初创公司**Manus**。

![里德·霍夫曼离开微软董事会，专注AI药物发现初创公司Manus](https://techcrunch.com/wp-content/uploads/2024/11/GettyImages-1258942056.jpg?resize=1200,799)

**霍夫曼**于2016年在**微软**收购**领英**后加入其董事会，并在2019年**微软**首次向**OpenAI**投资10亿美元时担任董事。

**Manus**是一家药物发现公司，去年已通过多轮融资筹集了超过5000万美元。

公司首席执行官**Siddhartha Mukherjee**博士是一位医生、生物学家和普利策奖获奖作者。

**霍夫曼**认为**Manus**正在“Move 37”AI方面取得进展，这指的是在化学领域超越人类创造力的AI技术。

[查看原文](https://techcrunch.com/2026/06/05/reid-hoffman-is-leaving-microsofts-board-to-go-founder-mode-with-startup-manus/)

---

## 谷歌每月向SpaceX支付9.2亿美元租用算力 {#news-6}

> 谷歌为应对AI产品客户需求，与SpaceX达成短期算力租用协议。

![谷歌每月向SpaceX支付9.2亿美元租用算力](https://techcrunch.com/wp-content/uploads/2026/05/GettyImages-2259661359.jpg?w=1024)

谷歌将在**2026年10月至2029年6月**期间，每月向**SpaceX**支付**9.2亿美元**，以获取约**11万个NVIDIA GPU**、CPU及内存等组件的使用权。

该协议旨在作为短期桥梁，以应对近期推出的AI产品（如`Gemini Enterprise`代理平台）超出预期的客户需求。

交易与**Anthropic**的协议类似，后者每月支付12.5亿美元租用**SpaceX**位于孟菲斯附近的**Colossus 1**数据中心全部可用算力。

谷歌此次获得的算力可能仅为**Anthropic**在**Colossus 1**中所用算力的一半左右。双方均有权在2026年12月31日后提前90天通知终止协议。

[查看原文](https://techcrunch.com/2026/06/05/google-will-pay-spacex-920m-per-month-for-compute/)

---

## 谷歌LiteRT-LM框架实现设备端闪电级生成式AI {#news-7}

> 谷歌AI Edge的LiteRT-LM为在移动和边缘设备上运行`Gemma 4`模型提供了高度优化的基础设施。

LiteRT-LM利用内存高效的动态加载技术，解锁了模型的原生多模态和代理功能。

该框架采用多令牌预测技术，可将推理速度提升高达2.2倍。

同时，谷歌为Apple生态系统引入了原生Swift API，并推出了用于高性能浏览器推理的WebGPU加速JavaScript API。

[查看原文](https://developers.googleblog.com/blazing-fast-on-device-genai-with-litert-lm/)

---

## OpenAI开源Whisper通用语音识别模型 {#news-8}

> OpenAI的通用语音识别模型 **Whisper** 登上GitHub热门，可执行多语言识别、翻译和语种检测。

![OpenAI开源Whisper通用语音识别模型](https://opengraph.githubassets.com/ba84b22291cbf602bace6106385cb1fbb99cc54bdfea57e14ed50228394cd720/openai/whisper)

**Whisper** 是一个在大规模多语言音频数据集上训练的通用语音识别模型。

该模型采用 **Transformer** 序列到序列架构，是一个多任务模型。

它能够处理多语言语音识别、语音翻译和语言识别任务。

安装 **Whisper** 需要 **Python 3.8-3.11**、兼容的 **PyTorch** 版本以及系统命令行工具 `ffmpeg`。

[查看原文](https://github.com/openai/whisper)

---

## AI技能项目last30days-skill爆火，跨平台研究合成摘要 {#news-9}

> 一个名为`last30days-skill`的AI代理技能项目在GitHub上爆火，今日新增441颗星，它能够跨多个网络平台进行信息研究并合成摘要。

GitHub热门项目`last30days-skill`是一个**AI代理技能**，使用**Python**语言编写。

该项目的核心功能是跨多个平台进行信息研究，支持的平台包括**Reddit**、**X**、**YouTube**、**Hacker News**、**Polymarket**以及广义网络。

在完成信息收集后，该技能能够自动合成一份基于事实的摘要报告。

目前该项目已获得28,450颗星，今日新增441颗星，显示出极高的受欢迎程度。

[查看原文](https://github.com/mvanhorn/last30days-skill)

---

## Vite：为现代Web项目提供极速开发与优化构建 {#news-10}

> **Vite**是一个旨在提供更快、更精简开发体验的构建工具，它包含一个提供极速模块热替换的开发服务器，以及一个使用**Rolldown**进行优化打包的构建命令。

![Vite：为现代Web项目提供极速开发与优化构建](https://opengraph.githubassets.com/07f22b8bc104fc107af11629819ee156304e330adf3437c747ec33f026d4202e/vitejs/vite)

**Vite**旨在解决现代Web项目开发中的效率问题，其开发服务器能够提供极其快速的模块热替换（HMR）功能。

其构建命令使用**Rolldown**来捆绑代码，并被预配置为输出高度优化的静态资产，以提升生产环境性能。

整个工具用**TypeScript**编写，通过其插件API和JavaScript API实现了高度的可扩展性。项目采用**MIT**许可证，支持开源使用。

[查看原文](https://github.com/vitejs/vite)

---

## 开源远程桌面RustDesk星数破11万，成TeamViewer替代品 {#news-11}

> 开源远程桌面应用`rustdesk`在GitHub上持续获得关注，其星数已超过11.5万，专为自托管设计，被视为TeamViewer的替代方案。

项目`rustdesk`是一个开源的远程桌面应用程序，使用**Rust**语言开发，旨在为用户提供一个可自托管的远程控制解决方案。

该项目目前拥有115,675颗星，今日新增92颗星，其定位明确为**TeamViewer**等商业软件的开源替代品。

其核心优势在于开源、可自托管的特性，适用于对数据隐私和控制权有更高要求的个人与组织。

随着星数的持续增长，该项目在远程访问工具领域的影响力正不断扩大。

[查看原文](https://github.com/rustdesk/rustdesk)

---

## Rust高性能JS工具链OXC登陆GitHub热门 {#news-12}

> 基于Rust的JavaScript和TypeScript工具集合 **OXC** 成为GitHub热门项目，旨在为下一代开发工具提供超快性能支持。

![Rust高性能JS工具链OXC登陆GitHub热门](https://repository-images.githubusercontent.com/599431918/6b7ba893-c8da-48ca-b5bd-619b9849377a)

**OXC**，全称Oxidation Compiler，是VoidZero构建统一高性能JavaScript工具链愿景的核心组件之一。

它为 **Vite** 的打包器 **Rolldown** 提供支持，并包含用于解析、转换和压缩代码的构建工具。

项目同时集成了代码检查工具 **Oxlint** 和格式化工具 **Oxfmt**。

目前，包括 **Rolldown**、**Nuxt**、**Shopify**、**ByteDance** 和 **Shopee** 在内的多个项目已在使用其不同组件。

[查看原文](https://github.com/oxc-project/oxc)

---

## GitHub热门项目：Agent-Reach为AI代理提供互联网之眼 {#news-13}

> 一个名为Panniantong/Agent-Reach的Python项目今日在GitHub上新增700颗星，旨在让AI代理访问多个网络平台。

**Panniantong/Agent-Reach**是一个GitHub热门Python项目，目前拥有21,976颗星。

该项目描述为：“为你的AI代理提供眼睛，让它看到整个互联网。”

它可以通过一个命令行界面（CLI）读取和搜索**Twitter**、**Reddit**、**YouTube**、**GitHub**、**Bilibili**、**小红书**等平台，且声称不产生API费用。

[查看原文](https://github.com/Panniantong/Agent-Reach)

---

## Supabase八个月估值翻倍，达100亿美元 {#news-14}

> 开源数据库Supabase完成F轮融资，估值达100亿美元，开发者用户数增长迅猛。

![Supabase八个月估值翻倍，达100亿美元](https://techcrunch.com/wp-content/uploads/2025/11/supabase-paul-copplestone.jpg?resize=1195,1200)

**Supabase**宣布以**100亿美元**的投前估值完成**5亿美元**的F轮融资，投后估值约**105亿美元**。

过去一年，**Supabase**的数据库启动数量增长了**600%**以上，其中超过**60%**的启动是由**AI工具**（如`Claude Code`和`Codex`）驱动的。

**Supabase**声称其开发者用户数已接近**1000万**，在八个月内实现翻番。

该轮融资由**GIC**领投，现有投资者（如**Stripe**）和新投资者（如**Georgian**和**Salesforce Ventures**）参与。

[查看原文](https://techcrunch.com/2026/06/05/supabase-doubles-valuation-to-10b-in-8-months/)

---

## 开源语音模型持续监听，每0.4秒决定发言或静默 {#news-15}

> 一个新的开源语音模型Audio Interaction能够以连续数据流的方式，实时处理语音、翻译、转录及环境声音检测。

![开源语音模型持续监听，每0.4秒决定发言或静默](https://the-decoder.com/wp-content/uploads/2026/06/audio-interaction-model-generated-image-nano-banana-pro.jpg)

名为 **Audio Interaction** 的新模型无需等待录音结束即可开始处理，能够以单一连续数据流完成翻译、转录、聊天以及检测咳嗽等日常噪音。

该模型的代码、权重及下载说明已在 **GitHub** 上以 **Apache 2.0** 开源协议发布。

据透露，**Audio Interaction** 模型的训练数据计划在未来的某个时间点发布。

[查看原文](https://the-decoder.com/new-open-source-voice-model-listens-nonstop-and-decides-every-0-4-seconds-whether-to-speak-or-stay-silent/)

---

## Google发布ADK for Kotlin 0.1.0，简化Android及跨云AI代理开发 {#news-16}

> Google正式发布了`Agent Development Kit (ADK) for Kotlin`的0.1.0版本，并推出了专门的Android开发库，旨在简化AI代理的创建与部署。

此次发布的`ADK for Kotlin 0.1.0`及其Android专属库，是一个开源框架，用于管理复杂的编排、会话共享和错误处理。

该框架支持跨云和边缘环境的编排，并引入混合编排功能，使开发者能够构建多代理系统。

在混合编排模式下，云端模型可以将特定任务（如处理敏感数据）无缝卸载到本地设备模型（如`Gemini Nano`），从而增强用户隐私保护。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## 微软开源 `pg_durable` 实现 PostgreSQL 内持久化执行 {#news-17}

> 微软开源了 `pg_durable` 工具，允许在 PostgreSQL 数据库内部直接定义和执行持久化工作流，提升后台任务可靠性。

![微软开源 `pg_durable` 实现 PostgreSQL 内持久化执行](https://opengraph.githubassets.com/097a7c33a1bd6144e7aef656023b156e0971e7e83db92005a5a81942d6d93d10/microsoft/pg_durable)

微软宣布开源名为 `pg_durable` 的工具，该工具实现了在 PostgreSQL 数据库内部的持久化执行功能。

该工具允许开发者使用 SQL 定义工作流，由 PostgreSQL 执行并为每个步骤创建检查点，支持在崩溃或重启后恢复。

`pg_durable` 旨在帮助团队将状态保留在 Postgres 中，整合 `cron` 作业、工作程序、队列和状态表。

其目标用户包括后端工程师、数据库管理员以及构建数据或 AI 管道的团队。

用户现可通过微软新的 PostgreSQL 云服务 **Azure HorizonDB** 试用 `pg_durable`。

[查看原文](https://github.com/microsoft/pg_durable)

---

## 谷歌推出 Colab CLI，实现本地终端直连远程 Colab 运行时 {#news-18}

> **谷歌**宣布推出 **Google Colab 命令行界面（CLI）**，这是一个新工具，旨在简化开发者和AI代理与 Colab 的交互。

该 CLI 允许用户将本地终端直接连接到远程的 Colab 运行时，实现无摩擦的代码执行。

工具支持用户轻松申请高性能 GPU，远程执行本地的 Python 脚本。

开发者可以无缝地检索工件日志或模型，例如微调的 **Gemma 3** 适配器。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Google发布Genkit中间件，强化代理式AI应用开发 {#news-19}

> Google宣布为其开源框架**Genkit**推出中间件系统，旨在帮助开发者更可靠地构建生产级代理式AI应用。

**Genkit**是一个开源框架，支持使用**TypeScript**、**Go**、**Dart**和**Python**构建AI代理应用。

该框架的中间件系统可以拦截生成调用，注入重试、模型回退等自定义行为，确保高可靠性。

开发者可在生成、模型和工具层附加钩子，实现对模型输出的确定性控制。

所有自定义中间件均可堆叠，并通过专用的开发者UI进行检查和调试。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## Google Pay 为 Android 引入动态回调增强结账流程 {#news-20}

> Google Pay 更新了 Android 原生应用开发工具包，引入动态回调功能，使开发者能在支付界面内实时更新订单详情。

![Google Pay 为 Android 引入动态回调增强结账流程](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

**Google Pay** 为 Android 原生应用引入了动态回调功能，旨在优化快速结账体验。

开发者可利用存储在 **Google Wallet** 中的用户支付和地址凭证，简化应用内结账流程。

动态回调功能允许在 Google Pay 界面内动态更新运费、税费和总价，并处理授权反馈，无需关闭界面。

文章提供了入门指南和代码示例，介绍如何实现 `onPaymentDataChanged` 和 `onPaymentAuthorized` 等回调。

此功能要求使用 `play-services-wallet` 库的 `20.0.0` 或更高版本。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)

---

## Google将Gemini CLI迁移至Antigravity CLI，统一AI终端工具 {#news-21}

> Google宣布将其AI终端工具`Gemini CLI`过渡到新的`Antigravity CLI`平台，以统一工具链并支持更复杂的代理工作流。

新的`Antigravity CLI`是一个以代理为中心的平台，专为构建复杂的多代理工作流而设计。

这个基于Go的工具提供了更快的执行速度、异步处理能力和统一架构，其架构与`Antigravity 2.0`桌面应用程序同步。

现有企业客户将保持访问权限，但个人和免费用户需在2026年6月18日前迁移到新平台，届时`Gemini CLI`将停止服务。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## 研究揭示蓝牙漏洞可远程感染USB连接的音箱 {#news-22}

> 研究人员发现，一款通过蓝牙连接的USB音箱存在漏洞，攻击者可借此远程执行代码并感染连接的电脑。

安全研究人员 **Rasmus Moorats** 发现，**Sound Blaster Katana V2X** 音箱的蓝牙功能存在一个漏洞。

攻击者可在一定范围内利用该漏洞远程执行代码，从而感染通过USB连接到该音箱的PC、Mac或Linux设备。

该漏洞利用了一个名为 `CTP` 的专有机制，研究人员猜测其全称为 **Creative Transport Protocol**。

该音箱由 **Creative Technologies** 销售，售价283美元。Creative Technologies的卖家对此行为是否构成漏洞存在异议。

[查看原文](https://arstechnica.com/security/2026/06/highly-reviewed-speaker-can-be-hacked-over-the-air-to-infect-connected-devices/)

---

## 佛罗里达州起诉 OpenAI 及其CEO，指控 ChatGPT 为缺陷产品 {#news-23}

> 佛罗里达州成为美国首个就未成年人风险、年龄验证缺失等问题起诉 **OpenAI** 及其首席执行官 **Sam Altman** 的州。

![佛罗里达州起诉 OpenAI 及其CEO，指控 ChatGPT 为缺陷产品](https://the-decoder.com/wp-content/uploads/2026/06/openai_Altman.png)

这份长达 83 页的诉状将 **ChatGPT** 视为一款应承担责任的“缺陷产品”和“公共滋扰”。

诉讼威胁将处以数十亿美元的罚款，并可能为整个聊天机器人行业树立法律先例。

起诉的核心关切包括产品对未成年人的潜在风险、缺乏有效的年龄检查机制，以及在安全方面的投资不足。

[查看原文](https://the-decoder.com/floridas-lawsuit-against-openai-and-ceo-altman-treats-chatgpt-as-a-defective-product-and-public-nuisance/)

---

## 美国国会未能就无证监控授权改革达成一致 {#news-24}

> 美国参议院以52票对47票否决了一项关于续签《外国情报监视法》第702条的协议，使得该条款的长期改革前景不明朗。

![美国国会未能就无证监控授权改革达成一致](https://platform.theverge.com/wp-content/uploads/sites/2/2026/02/STK471_Government_Surveillance_CVirginia_E.jpg?quality=90&strip=all&crop=0,0,100,100)

美国国会曾在4月底为《外国情报监视法》第702条进行了为期45天的短期重新授权，以留出时间进行改革谈判。该条款的最终重新授权截止日期是2026年6月12日。

此次参议院投票的失败，意味着国会内部对于如何改革这项涉及无证监控的法律仍存在重大分歧。

倡导组织**Demand Progress**的执行董事Sean Vitka评论称，在目前发生的任何对话中，都看不到支持改革者的身影。

[查看原文](https://www.theverge.com/policy/944615/section-702-senate-vote-fails-pulte)


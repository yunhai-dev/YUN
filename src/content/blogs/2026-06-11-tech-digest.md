---
title: 科技早报 2026-06-11
category: "科技, 科技早报"
excerpt: AI模型竞赛白热化，谷歌DeepMind与Anthropic相继发布高性能新模型，GitHub热门项目聚焦效率工具与多代理协作。
lastEdited: 2026年6月11日
tags: [科技早报, AI模型, GitHub, 开源项目, 开发者工具, 网络安全, 谷歌DeepMind, Anthropic]
imageUrl: 
---

## 概览

### AI 与机器学习

- [AI代理技能last30days-skill：聚合多平台信息生成摘要](#news-1)
- [谷歌DeepMind发布DiffusionGemma模型，本地运行速度提升4倍](#news-2)
- [Anthropic发布Mythos系列首款模型Claude Fable 5，性能领先但成本高昂](#news-3)
- [谷歌TPU上实现3倍大模型推理加速：扩散式推测解码方法DFlash](#news-4)
- [Anthropic撤回限制竞争对手使用Claude的隐蔽政策](#news-5)
- [谷歌发布扩散模型DiffusionGemma，文本生成速度达逐词模型四倍](#news-6)
### GitHub 热门项目

- [GitHub热门项目：Ruff，极速Python代码检查与格式化工具](#news-7)
- [GitHub热门项目：Hivemind打造多代理共享记忆系统](#news-8)
- [GitHub热门：Rust项目RuView将WiFi信号转为空间智能](#news-9)
- [GitHub热门：Rust文件搜索工具包fff宣称最快最准确](#news-10)
- [JuiceFS：专为云原生设计的高性能POSIX文件系统](#news-11)
- [GitHub 热门项目：开源中继平台 Sub2API 统一多模型订阅](#news-12)
### 开源生态

- [Google开源Genkit中间件，为代理式AI应用提供扩展与安全保障](#news-13)
- [PgDog 获得 550 万美元融资，为 PostgreSQL 提供水平扩展代理](#news-14)
### 开发者工具

- [前Datadog工程师创立AI编码初创公司Niteshift，融资700万美元](#news-15)
- [Git推送代理工具no-mistakes引入AI验证](#news-16)
- [谷歌推出Colab命令行界面，支持AI代理协作](#news-17)
- [谷歌Pay安卓应用新推Express结账功能，支持动态回调](#news-18)
### 安全与隐私

- [xAI前工程师起诉公司 称因AI安全担忧被解雇](#news-19)
- [CrowdStrike报告：朝鲜黑客约占美国科技公司入侵事件一半](#news-20)
- [Anthropic研究：AI数小时内可从安全补丁构建漏洞利用程序](#news-21)
- [美CISA发布指令：AI威胁下要求联邦机构最快3天修复漏洞](#news-22)
### 产品与平台

- [Google DeepMind 发布 Gemma 4 12B，支持在普通笔记本电脑上运行代理式 AI](#news-23)
- [谷歌NotebookLM大升级：具备独立云端计算机与代码执行能力](#news-24)
---

## AI代理技能last30days-skill：聚合多平台信息生成摘要 {#news-1}

> 一个名为**last30days-skill**的AI代理技能因其强大的信息聚合能力在GitHub上爆红，今日新增超过2500星标。

**last30days-skill**是一个AI代理技能，能够研究任何主题，覆盖Reddit、X、YouTube等主流平台及网络。

该技能会综合来自不同来源的信息，并最终生成一个基于事实的摘要。

该GitHub仓库使用Python语言编写，目前已拥有惊人的39,395个星标。

[查看原文](https://github.com/mvanhorn/last30days-skill)

---

## 谷歌DeepMind发布DiffusionGemma模型，本地运行速度提升4倍 {#news-2}

> Google DeepMind发布了新模型`DiffusionGemma`，通过并行生成文本块，在本地硬件上实现了显著的速度提升。

**Google DeepMind**发布了Gemma 4开放模型家族的新成员`DiffusionGemma`。

与传统线性生成方式不同，`DiffusionGemma`可以并行生成整个文本块，因此在本地硬件上运行时更快、更高效。

该模型是一个专家混合（MoE）模型，总共有260亿参数，但在推理时仅激活38亿参数。

测试显示，在单块**Nvidia H100**加速器上，`DiffusionGemma`的输出速度可达每秒1000多个token，约为类似大小的自回归Gemma模型的四倍。

[查看原文](https://arstechnica.com/google/2026/06/googles-latest-diffusiongemma-open-ai-model-comes-with-a-4x-speed-boost/)

---

## Anthropic发布Mythos系列首款模型Claude Fable 5，性能领先但成本高昂 {#news-3}

> **Anthropic** 发布了新模型 `Claude Fable 5`，这是其 **Mythos** 系列的首款模型，在多项基准测试中领先，但定价和过滤策略引发关注。

![Anthropic发布Mythos系列首款模型Claude Fable 5，性能领先但成本高昂](https://the-decoder.com/wp-content/uploads/2026/06/fable_5_logo-scaled.webp)

**Anthropic** 正式发布了 `Claude Fable 5`，这是其全新 **Mythos** 模型系列中的第一个产品。

在性能方面，`Claude Fable 5` 在几乎所有基准测试中都表现出色，例如在 **SWE-bench Verified** 上达到了95%的成绩。

然而，其成本是 `Opus 4.8` 的两倍，每百万令牌的价格为10或50美元。同时，严格的安全过滤器拦截了约9%的请求。

此外，一项新的30天数据保留政策也适用于零数据保留合同。

[查看原文](https://the-decoder.com/claude-fable-5-the-first-mythos-model-is-powerful-expensive-and-heavily-filtered/)

---

## 谷歌TPU上实现3倍大模型推理加速：扩散式推测解码方法DFlash {#news-4}

> 加州大学圣地亚哥分校的研究人员在谷歌TPU上成功应用了名为`DFlash`的块扩散推测解码方法，将大语言模型推理速度平均提升了3.13倍。

该方法通过在一次前向传递中‘绘制’整个候选令牌块，绕过了传统自回归草稿的顺序瓶颈。

性能测试显示，其峰值速度几乎是**EAGLE-3**等现有方法的两倍。

这一开源集成已融入**vLLM**生态系统，通过优化TPU硬件的并行验证能力来提升性能。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## Anthropic撤回限制竞争对手使用Claude的隐蔽政策 {#news-5}

> 在收到AI研究界的强烈反对后，**Anthropic**决定撤回一项本可暗中限制竞争对手使用其最新AI模型**Claude Fable 5**的政策。

![Anthropic撤回限制竞争对手使用Claude的隐蔽政策](https://media.wired.com/photos/6a2a20ee0ce2fad63750b97b/191:100/w_1280,c_limit/2280239203)

**Anthropic**正在撤回一项政策，该政策本可能暗中限制竞争对手使用其新AI模型**Claude Fable 5**来开发其他AI模型。

该公司在收到AI研究界的强烈反对后改变了做法。

**Anthropic**表示：“我们正在改变`Fable 5`针对前沿LLM开发的保障措施，使其可见。”

该公司于本周早些时候发布了**Claude Fable 5**，这是其最新AI模型的一个版本，具有防止滥用的额外安全防护。

此前，对于试图使用该模型进行前沿AI开发的研究人员，**Anthropic**曾计划故意以用户不可见的方式降低模型性能。

[查看原文](https://www.wired.com/story/anthropic-responds-to-backlash-on-claudes-secret-sabotage-on-ai-research/)

---

## 谷歌发布扩散模型DiffusionGemma，文本生成速度达逐词模型四倍 {#news-6}

> 谷歌发布了开源的扩散模型DiffusionGemma，该模型通过扩散过程生成文本，而非传统的逐词生成方式，速度显著提升。

![谷歌发布扩散模型DiffusionGemma，文本生成速度达逐词模型四倍](https://the-decoder.com/wp-content/uploads/2026/06/diffusiongemma-01-hero.jpg)

谷歌发布了拥有260亿参数的开源模型**DiffusionGemma**。该模型通过扩散过程生成文本，类似于图像生成AI将噪声转化为图像的过程。

根据**Nvidia**的说法，该模型在单个**H100** GPU上能达到约1000 tokens per second的速度，大约是同类自回归模型的四倍。

速度的提升是以输出质量降低为代价的。因此，谷歌目前将其定位为面向开发者的实验性工具。

[查看原文](https://the-decoder.com/googles-new-open-model-diffusiongemma-generates-text-from-noise-instead-of-word-by-word/)

---

## GitHub热门项目：Ruff，极速Python代码检查与格式化工具 {#news-7}

> 由**Astral**公司开发的`Ruff`是一个用**Rust**编写的Python代码检查器和格式化工具，其速度比现有工具快10-100倍。

![GitHub热门项目：Ruff，极速Python代码检查与格式化工具](https://opengraph.githubassets.com/99c406d6d3a379062d5566883f14e0813aeb7ccc386fd71bf76cb80940785617/astral-sh/ruff)

`Ruff`可作为`Flake8`、`isort`和`Black`等流行工具的替代品，内置超过900条规则，并原生重新实现了热门的`Flake8`插件。

它通过`pip`安装，支持`pyproject.toml`配置，并与Python 3.14兼容，同时在VS Code等编辑器中提供了第一方集成。

`Ruff`由**Astral**公司支持，该公司也是`uv`和`ty`等项目的创建者。

[查看原文](https://github.com/astral-sh/ruff)

---

## GitHub热门项目：Hivemind打造多代理共享记忆系统 {#news-8}

> 新项目`Hivemind`旨在为包括Claude Code在内的多种代理构建一个共享的“大脑”，通过自动学习和技能复用来提升团队效率。

![GitHub热门项目：Hivemind打造多代理共享记忆系统](https://opengraph.githubassets.com/c710294ced8751a7f1853b6c0312e72fe2c296a578765620c3483d93d8bd5423/activeloopai/hivemind)

Hivemind是一个为**Claude Code**、OpenClaw、Codex、Cursor等多种代理设计的共享记忆系统，其核心功能是自动学习与技能传播。

系统能够挖掘代理工作痕迹，生成可复用的`SKILL.md`技能文件，并同步给所有代理，实现知识共享。

在LoCoMo长上下文记忆基准测试中，使用Hivemind相比基线方案，在成本、token使用量和对话轮次上均有显著优化。

该系统会捕获会话中的提示、工具调用和响应，并以结构化痕迹形式存储于**Deeplake**，同时提供混合检索功能。

用户可通过一条命令完成安装，并为所有支持的代理启用此共享记忆功能。

[查看原文](https://github.com/activeloopai/hivemind)

---

## GitHub热门：Rust项目RuView将WiFi信号转为空间智能 {#news-9}

> 一个能将普通WiFi信号转换为实时空间智能的Rust项目在GitHub上获得大量关注。

项目 **ruvnet/RuView** 描述为“π RuView”，它能够将普通WiFi信号转换为实时空间智能、生命体征监测和存在检测。

所有这些功能的实现无需视频像素。项目使用**Rust**语言编写。

该项目今日在GitHub Trending上获得了420颗星，总星标数高达73,054，显示出极高的关注度。

[查看原文](https://github.com/ruvnet/RuView)

---

## GitHub热门：Rust文件搜索工具包fff宣称最快最准确 {#news-10}

> 一个自称最快和最准确的文件搜索工具包在GitHub Trending上获得了大量星标。

项目 **dmtrKovalenko/fff** 是一个文件搜索工具包，适用于 **AI** 代理、**Neovim**、**Rust**、**C** 和 **NodeJS** 等环境。

该工具包使用 **Rust** 语言编写，旨在提供高性能的文件搜索体验。

仓库今日获得了348个星标，目前总星标数为8,402，体现了开发者社区对其性能的关注。

[查看原文](https://github.com/dmtrKovalenko/fff)

---

## JuiceFS：专为云原生设计的高性能POSIX文件系统 {#news-11}

> JuiceFS 是一个高性能的 POSIX 文件系统，专为云原生环境设计，采用 Apache License 2.0 发布。

![JuiceFS：专为云原生设计的高性能POSIX文件系统](https://repository-images.githubusercontent.com/327859577/df8ae009-eea8-40cd-8584-6b41ea00764b)

JuiceFS 存储的数据持久化在对象存储（如 Amazon S3）中，元数据则可存储在 Redis、MySQL、TiKV 等兼容数据库中。它完全兼容 POSIX，可作为本地文件系统使用，无缝对接现有应用。

该项目提供 Hadoop Java SDK，兼容 Hadoop 2.x 和 3.x 及其生态系统组件。此外还提供 S3 兼容接口、Kubernetes CSI 驱动程序、全局文件锁、数据加密和数据压缩（LZ4 或 Zstandard）等功能。

[查看原文](https://github.com/juicedata/juicefs)

---

## GitHub 热门项目：开源中继平台 Sub2API 统一多模型订阅 {#news-12}

> 开源项目 `Wei-Shaw/sub2api` 提供了一个将多个 AI 模型订阅统一到单个端点的中继平台，今日在 GitHub Trending 表现活跃。

项目 `Wei-Shaw/sub2api` 是一个开源中继平台，旨在将 **Claude**、**OpenAI**、**Gemini** 和 **Antigravity** 的订阅统一到单个端点。

该平台支持账户共享和成本分摊，并具有无缝的原生工具兼容性。

项目使用 Go 语言编写，今日在 GitHub Trending 上获得 265 颗星，总星标数高达 27,070。

[查看原文](https://github.com/Wei-Shaw/sub2api)

---

## Google开源Genkit中间件，为代理式AI应用提供扩展与安全保障 {#news-13}

> Google发布了**Genkit**框架的中间件功能，该开源框架旨在帮助开发者使用多种语言构建生产就绪的代理式AI应用。

**Genkit**是一个支持**TypeScript**、**Go**、**Dart**和**Python**的开源框架，其强大的中间件系统允许开发者拦截生成调用，注入重试、模型故障转移等自定义行为。

开发者可以在生成、模型和工具层附加钩子，以确保模型输出的高可靠性和确定性控制，并可创建和堆叠自定义中间件。

所有中间件均可通过专用的开发者UI进行检查和调试，提升了开发和运维效率。

此发布旨在增强代理式AI应用的可靠性与可控性。

详细信息请参考官方博客公告。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## PgDog 获得 550 万美元融资，为 PostgreSQL 提供水平扩展代理 {#news-14}

> 开源数据库扩展项目 **PgDog** 宣布已完成 550 万美元的融资，旨在通过代理架构解决 PostgreSQL 的扩展难题。

![PgDog 获得 550 万美元融资，为 PostgreSQL 提供水平扩展代理](https://pgdog.dev/assets/images/logo2_wide.png?v=bb9c0ef3de)

**PgDog** 通过在 **PostgreSQL** 前部署代理来实现水平扩展，目前已在生产环境中服务超过 200 万次查询/秒，并对超过 20 TB 的数据进行了分片。

该项目是开源的，在 **GitHub** 上已获得超过 140 万次 **Docker** 拉取。其团队由三人组成，正在开发企业版以简化在 **AWS** 上的部署。

本轮融资由 **Basis Set**、**YC** 和 **Pioneer Fund** 等投资者领投。

据称，**PgDog** 的解决方案已在数十个部署中得到验证。

项目方表示，其企业版将使用户更容易在主流云平台上运行该解决方案。

[查看原文](https://pgdog.dev/blog/our-funding-announcement)

---

## 前Datadog工程师创立AI编码初创公司Niteshift，融资700万美元 {#news-15}

> 由前 **Datadog** 工程师创立的 **AI** 编程代理初创公司 **Niteshift** 完成700万美元种子轮融资，旨在帮助企业避免被大型AI模型厂商锁定。

![前Datadog工程师创立AI编码初创公司Niteshift，融资700万美元](https://techcrunch.com/wp-content/uploads/2026/06/sajid_conor_photo_niteshift_launch.jpg?resize=1200,970)

**Niteshift** 由 **Sajid Mehmood** 和 **Conor Branagan** 创立，获得由 **Greylock** 领投的融资，天使投资人包括 **Reid Hoffman** 等。

该公司的 **AI** 编程云会根据项目需求，在 `GPT`、`Claude` 等不同模型间进行路由，帮助客户保持对模型厂商的控制权。

与销售token的模式不同，**Niteshift** 采用类似云服务的按分钟使用率收费模式。

该公司认为，`Anthropic` 和 `OpenAI` 等公司正快速进入垂直软件市场，因此企业需要避免厂商锁定。

[查看原文](https://techcrunch.com/2026/06/10/datadog-veterans-launch-ai-coding-startup-niteshift-on-a-bet-against-big-ai-lock-in/)

---

## Git推送代理工具no-mistakes引入AI验证 {#news-16}

> 一个名为`no-mistakes`的Git推送代理工具，通过AI驱动的验证管道帮助开发者在推送前检查代码。

![Git推送代理工具no-mistakes引入AI验证](https://repository-images.githubusercontent.com/1201787282/21a7fe5f-6cb8-430c-aef2-7984ecdd7f60)

该项目由用户kunchenguid公开，目前在GitHub上已有1.2k星标，主要使用Go语言开发。

`no-mistakes`支持与`claude`、`codex`等多种编码代理集成，并能自动修复代码中的安全问题。

该工具旨在减少代码推送错误，在GitHub Trending的Go分类中受到关注。

[查看原文](https://github.com/kunchenguid/no-mistakes)

---

## 谷歌推出Colab命令行界面，支持AI代理协作 {#news-17}

> 谷歌发布了Google Colab CLI，允许开发者和AI代理将本地终端直接连接到远程Colab环境。

**谷歌**宣布推出**Google Colab命令行界面（CLI）**，这是一个轻量级工具，允许开发者和AI代理将本地终端连接到远程Colab运行时。

该工具使用户能够轻松请求高性能GPU，并在远程环境中运行本地Python脚本。

**Google Colab CLI**支持无缝检索工件、日志或模型，例如微调的`Gemma 3`适配器。

此外，该工具可被AI代理（如Antigravity或Claude Code）用于管理复杂的机器学习管道，增强了自动化工作流。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 谷歌Pay安卓应用新推Express结账功能，支持动态回调 {#news-18}

> 谷歌为安卓原生应用推出了Pay的Express结账功能，开发者可利用`onPaymentDataChanged`等动态回调，在结账时实时更新订单信息。

![谷歌Pay安卓应用新推Express结账功能，支持动态回调](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

**Google Pay** 为安卓原生应用推出了Express结账功能，允许开发者利用用户存储在**Google Wallet**中的凭证来简化结账流程。

开发者现在可以在安卓应用中使用已在Web上支持的回调`onPaymentDataChanged`和`onPaymentAuthorized`。

这些动态回调允许在用户与Google Pay表单交互时，动态更新运费选项、税费和总价，从而实现了真正的“快速结账”体验。

该功能适用于`play-services-wallet:20.0.0`及更高版本，可将Pay按钮提前到产品详情或购物车页面。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)

---

## xAI前工程师起诉公司 称因AI安全担忧被解雇 {#news-19}

> 前xAI工程师Devin Kim提起诉讼，指控公司因他提出Grok安全性担忧而将其解雇。

![xAI前工程师起诉公司 称因AI安全担忧被解雇](https://techcrunch.com/wp-content/uploads/2026/03/grok-getty.jpg?resize=1200,800)

前xAI工程师**Devin Kim**在加州州立法院对**xAI**和**SpaceX**提起诉讼，指控其因提出AI安全问题而被解雇。

诉讼称，Devin Kim在**Grok**开发期间多次投诉公司未优先考虑安全，担忧其可能助长歧视和传播武器信息。

文件提及**Grok**曾发生‘MechaHitler’事件，且指控联合创始人**Jimmy Ba**无视**马斯克**指令，对安全措施推动进行报复。

Devin Kim此前曾在**Scale AI**从事安全工作，并被**AI安全中心**任命为主席。**xAI**和**SpaceX**尚未回应置评。

[查看原文](https://techcrunch.com/2026/06/10/xai-fired-an-engineer-who-raised-alarms-about-grok-safety-new-lawsuit-claims/)

---

## CrowdStrike报告：朝鲜黑客约占美国科技公司入侵事件一半 {#news-20}

> 网络安全公司 CrowdStrike 发布报告，指出在过去一年中，朝鲜黑客通过伪装成远程IT工作者，占据了美国科技公司近半数的网络入侵事件。

![CrowdStrike报告：朝鲜黑客约占美国科技公司入侵事件一半](https://techcrunch.com/wp-content/uploads/2026/04/north-korea-883518520.jpg?resize=1200,885)

CrowdStrike 的新报告指出，一个名为 `Famous Chollima` 的朝鲜黑客组织，负责了 2025 年 4 月至 2026 年 5 月间针对美国科技行业的 47% 国家支持的网络活动。

这些黑客利用 **AI** 生成的实时深度伪造图像和欺诈性身份文件，冒充美国人或其他国籍的开发人员、程序员等技术人员申请远程工作。

渗透公司后，黑客窃取知识产权、敏感信息并领取薪水回流朝鲜，同时还针对区块链开发者以窃取加密货币，规避金融制裁。

报告提及，朝鲜通过此类手段在 2025 年窃取了约 20 亿美元加密货币，过去几年总计获利数十亿美元。

[查看原文](https://techcrunch.com/2026/06/10/north-koreans-behind-nearly-half-of-us-tech-industry-hacks-says-crowdstrike/)

---

## Anthropic研究：AI数小时内可从安全补丁构建漏洞利用程序 {#news-21}

> **Anthropic**的安全团队发现，其AI模型能在几小时内将Firefox和Windows内核的安全补丁转化为可工作的漏洞利用程序。

![Anthropic研究：AI数小时内可从安全补丁构建漏洞利用程序](https://the-decoder.com/wp-content/uploads/2026/05/glasswing_claude.png)

**Anthropic**的安全团队发现，其 **Mythos Preview** AI模型可以在几小时内将**Firefox**和**Windows**内核的安全补丁转化为可工作的漏洞利用程序。

利用安全补丁构建漏洞利用程序的成本仅为几千美元，且不需要专业知识。

研究称，在**Microsoft**的自动更新到达任何设备之前，已经有八个完整的攻击链被完成。**Anthropic**认为旧的补丁节奏已经过时。

[查看原文](https://the-decoder.com/anthropic-study-shows-ai-needs-hours-not-weeks-to-build-exploits-from-security-patches/)

---

## 美CISA发布指令：AI威胁下要求联邦机构最快3天修复漏洞 {#news-22}

> 美国网络安全和基础设施安全局发布新指令，要求联邦民用机构更快速地修补软件漏洞，以应对紧迫的AI威胁。

![美CISA发布指令：AI威胁下要求联邦机构最快3天修复漏洞](https://media.wired.com/photos/6a29bec26f45b6c55c01d0d6/191:100/w_1280,c_limit/CISA-AI-Security-Patch-2268298926.jpg)

**CISA**发布了一项新的指令，要求联邦民用机构更快速、高效地修补软件漏洞。

该指令基于紧迫性的四项评估标准，针对关键情况，要求机构在三天内完成补丁修复。

CISA网络安全代理执行助理局长**Chris Butera**表示，指令旨在帮助机构优先处理最严重的漏洞。

紧迫性评估标准包括：漏洞是否存在于公开暴露系统、是否在已知被利用漏洞目录中、是否可被自动化利用，以及利用后可获得的访问权限。

如果一个漏洞同时符合上述所有条件，则必须在三天内修复。该指令取代了2019年和2021年的相关命令。

[查看原文](https://www.wired.com/story/cisa-ai-vulnerability-directive/)

---

## Google DeepMind 发布 Gemma 4 12B，支持在普通笔记本电脑上运行代理式 AI {#news-23}

> Google DeepMind 的 Gemma 4 12B 模型现已支持在配备 16GB RAM 的普通笔记本电脑上运行，为用户提供本地化的代理式、多模态 AI 功能。

该模型可通过 **Google AI Edge Gallery** 在 macOS 上运行，支持动态 Python 代码执行和可视化。

用户还可以通过 **Google AI Edge Eloquent** 实现完全离线的语音听写和文本编辑。

对于开发者，新增的 `LiteRT-LM CLI` `serve` 命令创建了本地端点，增强了开发者工作流。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## 谷歌NotebookLM大升级：具备独立云端计算机与代码执行能力 {#news-24}

> 谷歌的研究工具NotebookLM迎来重大升级，现在运行在**Gemini 3.5 Flash**模型上，并获得了独立的云端计算机用于执行代码。

![谷歌NotebookLM大升级：具备独立云端计算机与代码执行能力](https://the-decoder.com/wp-content/uploads/2026/06/google_logo_wall-2.png)

升级后的NotebookLM现在能够通过**Google Search**自主查找资料来源。

在内部测试中，新系统在高达78.2%的情况下超越了先前版本。

此次升级标志着该工具从研究辅助向具备更强自主执行能力的智能体方向演进。

代码执行能力的集成是其成为更全面研究平台的关键一步。

[查看原文](https://the-decoder.com/googles-notebooklm-now-runs-its-own-cloud-computer-with-code-execution-and-agent-based-research/)


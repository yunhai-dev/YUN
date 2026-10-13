---
title: 科技早报 2026-10-13
category: "科技, 科技早报"
excerpt: Meta发布Muse Wonder系列模型，AI隐藏后门、数学推理、开源工具与智能穿戴成为今日热点。
lastEdited: 2026年10月13日
tags: [Meta, Muse Wonder, 人工智能, AI安全, 开源项目, Google, 开发者工具, 可穿戴设备]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Meta发布Muse Wonder系列模型争夺前沿AI竞争](#news-1)
- [Meta发布首个前沿模型 `Muse Wonder` 与Full版本](#news-2)
- [论文称加密后门可让AI模型隐藏任意能力](#news-3)
- [研究称AlphaProof Nexus解出数十个未解数学问题](#news-4)
- [Meta新模型 `Muse Wonder` 十项测试六项进入前三](#news-5)
- [Meta发布Muse Wonder系列两款新AI模型](#news-6)
### GitHub 热门项目

- [Open WebUI 支持离线运行及多种模型服务接入](#news-7)
- [Project NOMAD 提供可离线运行的知识与教育服务器](#news-8)
- [Janas称可从SSD流式运行超出内存容量的大模型](#news-9)
- [微软开源安全库操作系统项目 LiteBox 支持多种沙箱场景](#news-10)
- [GitHub 热门项目 obsidian-mind 为 AI 编码代理提供持久记忆](#news-11)
- [GitHub热门项目Na​utilus Trader采用原生Rust构建](#news-12)
### 开源生态

- [Google开源AQuA，用于诊断生产环境AI代理质量](#news-13)
- [Google开源账号聚焦开放标准与人工智能时代信任](#news-14)
### 开发者工具

- [Google公开预览Developer Knowledge API与MCP Server](#news-15)
### 安全与隐私

- [Anthropic称新防御措施减少蒸馏攻击数据窃取](#news-16)
- [法院文件显示美执法部门获准用假基站追踪嫌疑人](#news-17)
- [作者称GPT-6 Astra助力Kindle越狱改造](#news-18)
- [马斯克晒Grok购物截图引发订单安全争议](#news-19)
### 产品与平台

- [Google发布Fitbit Edge，定位介于两款产品之间](#news-20)
- [Ultrahuman将在阿联酋推进生物年龄模型](#news-21)
- [Android带来Googlebook体验的优势与短板](#news-22)
- [Brickbrag打造可在线游玩的多人积木世界](#news-23)
### 硬件与芯片

- [微软发布第三代自研AI芯片Maia 300](#news-24)
---

## Meta发布Muse Wonder系列模型争夺前沿AI竞争 {#news-1}

> **Meta** 发布 `Muse Wonder` 和 `Muse Wonder Full` 两个模型，并称后者具备前沿模型能力。两款模型将通过 API 和 `Muse Code` 提供。

![Meta发布Muse Wonder系列模型争夺前沿AI竞争](https://media.wired.com/photos/6accff96fccc4c5244b94f14/191:100/w_1280,c_limit/Muse-Wonder-Puts-Meta-Back-at-the-AI-Frontier-Business-2296209266.jpg)

**Meta** 计划将最佳版本用于包括 `Muse` 个人智能体在内的平台功能，并称最大版本在综合表现上超过 Anthropic 的 `Claude Fable 5.1`。

Meta 还称，`Muse Wonder` 在法律文件处理和软件构建等部分专业基准测试中超过 `GPT-6 Astra`、`Claude Fable 5.1` 和 `Claude Opus 5.5`。

模型包含 `Active Memory` 和 `Active Focus` 功能，旨在帮助模型保持既定目标、减少混乱，以完成复杂研究或大型软件项目。

Meta 未披露模型的具体构建或训练细节。文章指出，相关性能比较主要依据 Meta 声称的基准结果，基准测试未必能反映现实世界表现。

[查看原文](https://www.wired.com/story/muse-wonder-puts-meta-back-at-the-ai-frontier/)

---

## Meta发布首个前沿模型 `Muse Wonder` 与Full版本 {#news-2}

> Meta超级智能实验室发布 `Muse Wonder` 和 `Muse Wonder Full`，称这是其首次推出前沿模型。Meta表示，两款模型将用于驱动Muse代理。

![Meta发布首个前沿模型 `Muse Wonder` 与Full版本](https://techcrunch.com/wp-content/uploads/2026/10/Screenshot-2026-10-12-at-1.09.43-PM.jpg?resize=1200,676)

Meta称，两款模型的基准测试成绩可与 `Fable 5.1` 和 `GPT-6 Astra` 相当，并在编码等复杂任务上表现更好。相关能力和比较基于Meta公布的测试，原文未提供独立验证。

通过Meta Model API访问 `Muse Wonder` 的价格为每百万输入令牌4美元、每百万输出令牌20美元。

`Muse Wonder Full` 仅向Muse Code订阅用户提供，不通过API开放。Meta称，两款模型均具备“主动记忆”能力，可长期保留和综合用户信息。

文章称，两款模型在俄亥俄州中部的Prometheus数据中心训练，该中心于2026年早些时候投入使用。

[查看原文](https://techcrunch.com/2026/10/12/meta-releases-its-first-frontier-model-muse-wonder/)

---

## 论文称加密后门可让AI模型隐藏任意能力 {#news-3}

> 论文《AI Models Can Provably Hide Arbitrary Capabilities》研究模型评估能否发现被隐藏的危险能力。作者称，在特定密码学假设下，嵌入模型权重的隐藏网络可能难以通过诱导方式发现。

![论文称加密后门可让AI模型隐藏任意能力](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png)

研究人员构造了将加密神经网络嵌入宿主模型权重的后门攻击，使隐藏网络仅在接收到秘密触发器时解密并执行。

论文称，即使完全获得模型权重，基于数字锁隐藏的电路仍难以通过诱导发现和解释。

作者在小型化学反应预测任务上开展概念验证，测试了微调、权重加噪、梯度触发器搜索和潜在对抗训练。

论文称隐藏能力对上述方法具有抵抗性，并发布模型支持防御研究；其结论依赖密码学假设和代理任务实验。

[查看原文](https://arxiv.org/abs/2610.13928)

---

## 研究称AlphaProof Nexus解出数十个未解数学问题 {#news-4}

> 据发表于《Science》的一项研究，**Google DeepMind** 的 `AlphaProof Nexus` 解出了数十个尚未解决的数学问题，其中包括九个 Erdős 问题。相关研究在发表前接受了同行评审。

![研究称AlphaProof Nexus解出数十个未解数学问题](https://the-decoder.com/wp-content/uploads/2026/10/google_deepmin_proofs.png)

据文章介绍，这些问题包括九个 Erdős 问题，其中两个此前已有 56 年未被解决。

相关研究在正式发表前接受了同行评审，但提供的信息未说明具体证明内容或独立复核情况。

文章还将这一成果与 **OpenAI** 因未经同行评审便将人工智能证明发布到 GitHub 而遭遇的抵制进行对比。

[查看原文](https://the-decoder.com/google-deepminds-alphaproof-nexus-solved-dozens-of-open-math-problems-and-actually-got-peer-reviewed/)

---

## Meta新模型 `Muse Wonder` 十项测试六项进入前三 {#news-5}

> 据报道，Meta新模型 `Muse Wonder` 在十项基准测试中的六项排名前三。其性能提升主要集中在智能体任务。

![Meta新模型 `Muse Wonder` 十项测试六项进入前三](https://the-decoder.com/wp-content/uploads/2026/10/muse_wonder.png)

报道显示，`Muse Wonder` 最大的性能提升出现在智能体任务上。

与此同时，模型每项任务的成本几乎增加了两倍，达到原来的近三倍。

[查看原文](https://the-decoder.com/metas-new-frontier-model-muse-wonder-full-breaks-into-the-ai-top-tier/)

---

## Meta发布Muse Wonder系列两款新AI模型 {#news-6}

> **Meta** 推出了 `Muse Wonder` 和 `Muse Wonder Full` 两款新模型，并于当天起向 `Muse Code` 订阅用户提供。公司称，`Wonder` 还可通过 `Meta Model API` 访问。

![Meta发布Muse Wonder系列两款新AI模型](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/STKB394_MUSE_AI_CVIRGINIA_D.png?quality=90&strip=all&crop=0,0,100,100)

**Meta** 表示，计划最终使用 `Wonder` 为其 `Muse AI agent` 提供动力，初期面向订阅用户。

公司还表示将开发专用模型，并计划让所有 `Muse` 用户使用这些模型。

此前，**Meta** 已推出 `Muse Spark` 和 `Muse AI agent`。文章称，`Muse Spark` 是其重组后的 Superintelligence Labs 部门推出的首个模型。

文章仅称 **Meta** 宣称新模型可以与业内最佳模型竞争，但未提供具体性能细节。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1009479/meta-muse-wonder-full-ai-model)

---

## Open WebUI 支持离线运行及多种模型服务接入 {#news-7}

> Open WebUI 是一个自托管的 AI 平台，定位为用户友好、可扩展且功能丰富的 AI 界面。项目支持完全离线运行，并可连接多种模型服务。

![Open WebUI 支持离线运行及多种模型服务接入](https://repository-images.githubusercontent.com/701547123/275da62f-2139-4d2b-bcac-57c82872dd30)

Open WebUI 支持 Ollama 以及兼容 OpenAI 的 API。

项目还可连接 LMStudio、GroqCloud、Mistral、OpenRouter 和 vLLM 等服务。

项目支持通过 `pip`、`uv`、Docker 或 Kubernetes 安装，并提供带有 Ollama 和 CUDA 标签的容器镜像。

代码仓库页面显示，该项目使用 Go 语言，已有 19,303 次提交。

[查看原文](https://github.com/open-webui/open-webui)

---

## Project NOMAD 提供可离线运行的知识与教育服务器 {#news-8}

> GitHub Trending 项目 `Crosstalk-Solutions/project-nomad` 是一款离线优先的知识与教育服务器，内容可运行在用户自有硬件上。项目无需互联网连接，并提供可选的本地 AI。

Project NOMAD 使用 TypeScript 编写，当前拥有 39,587 颗星标，当天新增 168 颗。

项目包含 Wikipedia、数千本书、课程和地图等内容。

项目内容可运行在用户自有硬件上，无需互联网连接，并支持可选的本地 AI。

[查看原文](https://github.com/Crosstalk-Solutions/project-nomad)

---

## Janas称可从SSD流式运行超出内存容量的大模型 {#news-9}

> 开源项目Janas-LLM声称，通过从SSD流式读取专家，可在32 GB内存的笔记本上运行容量达48 GB的`Qwen3-Next-80B`模型。

![Janas称可从SSD流式运行超出内存容量的大模型](https://opengraph.githubassets.com/50c04c0a0a71e121206c0d33345bc5d8390e52033e9aa3601a3a57fc47a133f5/prabanta-dev/janas)

项目在Debian 13、Intel Core Ultra 9 185H、集成Arc GPU、32 GB内存和NVMe SSD的设备上进行了测试。

针对`Qwen3-Next-80B-A3B`，Janas-LLM的读取速度为62 tok/s、写入速度为24 tok/s；`llama.cpp`分别为16 tok/s和2.8 tok/s。

项目列出的多数对比测试中，Janas-LLM读取和写入速度高于`llama.cpp`；采用3-bit `Qwen3-30B`权重时，提示读取速度低于后者。

Janas提供Linux x86-64、Windows 10及更高版本和Windows 11的运行方式，并包含`janas-bench`用于测量其他机器的性能。项目称，实际结果会因设备而异。

[查看原文](https://github.com/prabanta-dev/janas)

---

## 微软开源安全库操作系统项目 LiteBox 支持多种沙箱场景 {#news-10}

> 微软发布的 LiteBox 是一个以安全为重点的库操作系统，通过缩小与主机的接口来减少攻击面。项目目前仍在积极演进，尚未达到稳定版本。

![微软开源安全库操作系统项目 LiteBox 支持多种沙箱场景](https://opengraph.githubassets.com/c414dbbaece1a81e68bc73fc472adf98f7f338ae51ee0d09c59825cf4b2b008f/microsoft/litebox)

LiteBox 支持内核模式和非内核模式场景，并提供 Rust 风格、受 `nix` 或 `rustix` 启发的 North 接口。

项目设计了连接不同 North 接口与 South 平台的互操作能力。

列出的使用场景包括在 Windows 上运行未经修改的 Linux 程序、在 Linux 上沙箱化 Linux 应用，以及运行在 SEV-SNP、OP-TEE 和 LVBS 之上。

该项目采用 MIT License，部分 API 和接口可能发生变化。

[查看原文](https://github.com/microsoft/litebox)

---

## GitHub 热门项目 obsidian-mind 为 AI 编码代理提供持久记忆 {#news-11}

> GitHub Trending 项目 `breferrari/obsidian-mind` 使用 TypeScript 编写，被描述为一种可自组织的 Obsidian 知识库。项目旨在为 AI 编码代理提供持久记忆。

`breferrari/obsidian-mind` 当前拥有 5,227 颗星标，当天新增 82 颗。

项目使用 TypeScript 编写，定位为可自组织的 Obsidian 知识库。

项目描述显示，其目标是为 AI 编码代理提供持久记忆。

[查看原文](https://github.com/breferrari/obsidian-mind)

---

## GitHub热门项目Na​utilus Trader采用原生Rust构建 {#news-12}

> GitHub Trending项目 `nautechsystems/nautilus_trader` 使用Rust编写，被描述为生产级、原生Rust的交易引擎。

该项目采用确定性事件驱动架构，面向交易系统场景。

截至相关信息记录，项目已获得29,863颗星标，当天新增48颗星标。

`nautilus_trader` 是当前GitHub热门项目之一。

[查看原文](https://github.com/nautechsystems/nautilus_trader)

---

## Google开源AQuA，用于诊断生产环境AI代理质量 {#news-13}

> Google正在开源 **AQuA（Ambient Quality Agent）**，这是一种与生产环境 AI agent 并行运行的参考实现。它可根据对话记录识别失败集群，并分析代理质量问题。

AQuA运行在 Google Cloud 中，会扫描并验证生产环境中的失败集群。

该工具可诊断 AI agent 的根本原因，并将分析结果锚定到确切部署所使用的源代码快照。

Google的文章讨论了 AI agent 在服务真实生产流量后出现静默质量回归、但仍返回 `HTTP 200` 状态的问题。

[查看原文](https://developers.googleblog.com/the-outer-loop-insights-first-an-ambient-quality-agent-that-diagnoses-your-production-agent/)

---

## Google开源账号聚焦开放标准与人工智能时代信任 {#news-14}

> Google开源账号发文讨论“开放”的价值，称开放本身作用有限，但能够促成许多事情。

该账号提到，在联合国大会第81届会议期间举行的“At Open @ UNGA81”活动中，Amanda Casari探讨了如何落实开放性。

讨论主题包括投资供应商中立的标准，以及在人工智能时代重新思考信任和维护者工具。

活动还涉及opensource.org和Creative Commons相关账号。

[查看原文](https://bsky.app/profile/opensource.google/post/3mxp7djyvgv2u)

---

## Google公开预览Developer Knowledge API与MCP Server {#news-15}

> Google正在公开预览 **Developer Knowledge API** 和 `MCP Server`，为 AI 助手和 agent 平台提供获取开发者文档的机器可读方式。相关文档覆盖 Firebase、Google Cloud 和 Android 等领域。

这套工具可用于搜索和获取最新的规范化开发者文档，帮助 AI 助手和 agent 平台接入 Google 的文档资源。

开发者可以通过官方 `MCP Server` 将工具直接连接到 Google 的文档库。

Google表示，这种连接可使 AI 生成的代码和指导基于官方、实时的上下文。目前 Developer Knowledge API 和 `MCP Server` 仍处于公开预览阶段。

[查看原文](https://developers.googleblog.com/supercharge-your-development-with-the-google-developer-knowledge-api-ecosystem/)

---

## Anthropic称新防御措施减少蒸馏攻击数据窃取 {#news-16}

> Anthropic称，近期采用的新方法使针对Claude的蒸馏攻击所窃取的数据量减少约90%至99%，但该效果目前仍被表述为早期证据。

![Anthropic称新防御措施减少蒸馏攻击数据窃取](https://www-cdn.anthropic.com/images/4zrzovbb/website/a5934d1ae8428b2a97fae1963a5f427594fc7202-1200x630.jpg)

Anthropic将蒸馏攻击定义为未经原模型开发者授权，通过隐蔽的大规模活动提取模型能力，并复制到另一模型的行为。

该公司称，相关活动通常依赖欺诈账户网络，可帮助攻击者以较少开发时间和成本构建接近前沿能力的模型。

Anthropic还称，Zhipu在开发`GLM-5.3`期间蒸馏了美国领先模型的网络安全能力，并曾尝试蒸馏`Claude Fable 5`。

Anthropic表示已扩大防御措施，并放弃部分来自蒸馏者的收入和数万亿token的付费流量；部分变更要求合法用户更新。有关攻击规模及模型来源的描述主要来自Anthropic。

[查看原文](https://www.anthropic.com/research/distillation-defenses)

---

## 法院文件显示美执法部门获准用假基站追踪嫌疑人 {#news-17}

> 美国执法人员获得使用蜂窝基站模拟器定位并逮捕 Jerome Richardson 的授权，相关信息来自法院文件。现有记录无法确认设备是否实际用于定位 Richardson。

![法院文件显示美执法部门获准用假基站追踪嫌疑人](https://media.wired.com/photos/6ac94a7a4676236d922d7944/191:100/w_1280,c_limit/Security_Feds%20Got%20Warrants%20to%20Use%20Fake%20Cell%20Towers%20to%20Hunt%20Down%20Don%20Lemon%E2%80%99s%20Producer_v1.jpg)

Jerome Richardson 曾就读于 Temple University，被指控参与涉及 Cities Church 礼拜者公民权利和宗教礼拜的案件。

法院文件显示，明尼苏达州和宾夕法尼亚州的法官分别于 1 月 30 日及次日签署了针对 Richardson 手机的蜂窝基站模拟器授权令。

调查人员还申请了针对记者 Georgia Fort 和明尼苏达州参议院候选人 Jamael Lundy 手机的授权令，但现有记录无法确认申请是否获批。

蜂窝基站模拟器通常被称为 Stingray 或 IMSI catcher，会伪装成手机基站定位目标，也可能收集附近其他设备的识别信息。

[查看原文](https://www.wired.com/story/feds-got-warrants-to-use-fake-cell-towers-to-hunt-down-don-lemons-producer/)

---

## 作者称GPT-6 Astra助力Kindle越狱改造 {#news-18}

> 一名作者称，借助AI编码代理和现有社区代码，他将一台第十代基础版Kindle改造成照片显示设备，并构建了运行自定义软件的工具。

![作者称GPT-6 Astra助力Kindle越狱改造](https://nirajrajgor.com/blog/kindle-photo-frame/cover.jpg)

该项目名为**KindleCTL**，其中“Photo Slideshow”应用可循环播放十张照片，每张显示四分钟，退出后可返回电子书库。

作者在Mac上使用`Codex`和`T3 Code`，先后尝试了`GPT-5.6 Sol`、`Fable 5.1`、`Opus 5.5`和`GPT-6 Astra`。

作者称，`GPT-6 Astra`最终帮助其完成Kindle越狱，并参考SpiderCat及相关社区发布的越狱代码。

**KindleCTL**支持从Mac发送命令、传输文件和调查Kindle错误，但照片切换时仍会残留前一张图像；原文未完整说明后续修复结果。

[查看原文](https://nirajrajgor.com/blog/kindle-photo-frame-with-ai)

---

## 马斯克晒Grok购物截图引发订单安全争议 {#news-19}

> 埃隆·马斯克在X上分享Grok协助购买乐高套装的截图时，公开了多项订单和支付相关信息。部分用户随后据称利用这些信息尝试操作订单，但乐高未确认相关活动。

![马斯克晒Grok购物截图引发订单安全争议](https://media.wired.com/photos/6acd1d72b814f6f25010ecb2/191:100/w_1280,c_limit/Musk-Brags-About-Lego-Grok-Star-Wars-Haul-Gear.jpg)

截图包含订单号、商品及配送费用、配送和账单地址、信用卡后四位，以及购物所用电子邮件地址。

一名X用户称使用公开信息与乐高客服聊天机器人互动，并似乎成功取消订单。马斯克随后表示订单并未被取消。

另一名用户据称通过乐高的**Sophia**人工智能助手，将订单数量改为400套并修改配送地址，同时继续使用原付款方式。

乐高拒绝向WIRED置评，因此无法确认上述订单取消、数量和地址变更是否确实发生。Visa此前警告，智能体商务可能带来欺诈和支付数据收集风险。

[查看原文](https://www.wired.com/story/elon-musk-bragged-about-his-grok-lego-star-wars-haul-then-x-users-punked-him/)

---

## Google发布Fitbit Edge，定位介于两款产品之间 {#news-20}

> Google发布可穿戴设备 **Fitbit Edge**，定位介于 Fitbit Air 和 Pixel Watch 之间，售价为 179.99 美元。设备已在 Google Store 开放预订，计划于 10 月 27 日开售。

![Google发布Fitbit Edge，定位介于两款产品之间](https://techcrunch.com/wp-content/uploads/2026/10/IMG_4514.webp?w=1200)

**Fitbit Edge** 采用类似 Fitbit Air 的纤薄腕带，并配备 OLED 显示屏，可查看地图方向、通知、天气和音乐控制。

设备支持由 `Gemini` 驱动的 Google Health Coach，但使用该功能需要订阅 Google Health Premium。

Google表示，Fitbit Edge 可自动识别并记录最多 100 项活动，支持超过 50 种运动模式，电池续航最长可达 7 天，并具备 50 米防水能力。

Google称其内置 GPS 比上一代产品准确 40%，睡眠阶段检测准确度提高 15%；文章未提供独立测试依据。Stephen Curry 特别版售价为 219.99 美元。

[查看原文](https://techcrunch.com/2026/10/12/fitbit-edge-is-googles-middle-ground-between-fitbit-air-and-pixel-watch/)

---

## Ultrahuman将在阿联酋推进生物年龄模型 {#news-21}

> 班加罗尔健康科技初创公司**Ultrahuman**与阿布扎比公共卫生中心签署为期两年的谅解备忘录，将开发并验证生物年龄模型。

![Ultrahuman将在阿联酋推进生物年龄模型](https://techcrunch.com/wp-content/uploads/2026/10/ultrahuman-ring-air.jpg?resize=1200,800)

该模型将结合临床生物标志物与可穿戴设备数据，分析睡眠、活动、心血管健康和新陈代谢等信号。

Ultrahuman表示，模型拟估计个人衰老速度，并识别可能加速或减缓衰老的因素。

模型将不依赖特定设备，未来可接收智能戒指、腕戴设备、佩戴式设备和贴片数据。

个人未来可通过TAMM和Sahatna等政府数字健康平台访问健康年龄，但具体推广时间表尚未公布。

双方将在未来两年开展研究和临床验证，模型之后计划分阶段向阿联酋民众提供。

[查看原文](https://techcrunch.com/2026/10/12/smart-ring-maker-ultrahuman-to-roll-out-biological-age-model-across-uae/)

---

## Android带来Googlebook体验的优势与短板 {#news-22}

> 作者测试了来自华硕和惠普的两款**Googlebook**，认为新款Android笔记本首周体验较为坎坷，但之后逐渐适应。Android同时带来原生应用和手机通知查看等便利。

![Android带来Googlebook体验的优势与短板](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/asus-googlebook-android-15.jpg?quality=90&strip=all&crop=0,0,100,100)

作者表示，Android笔记本可以运行部分实用应用的原生版本，并快速查看手机通知。

不过，**Googlebook**与手机之间的连接不稳定，应用投屏操作也不够便利。

文章还指出，文件共享似乎无法正常工作，原生Android应用在笔记本上的功能存在限制。

正文在讨论原生Android应用限制处被截断，未提供更多具体细节。

[查看原文](https://www.theverge.com/tech/1008750/googlebooks-android-best-worst-notifications-app-cast-file-sharing)

---

## Brickbrag打造可在线游玩的多人积木世界 {#news-23}

> Brickbrag是一款运行在浏览器中的多人积木建造世界，玩家可以建造、探索、竞速和飞行。游戏支持电脑和手机访问，无需下载或注册。

![Brickbrag打造可在线游玩的多人积木世界](https://brickbrag.com/assets/og-2026-10.jpg)

游戏世界包含赛道、机场、通往火山的公交车，以及可供玩家建造房屋的土地，并标注为免费游玩。

玩家可以使用不同颜色和部件的积木建造房屋或高塔，也可以在土地办公室购买地块。页面称，玩家登记的土地不会被其他人拆除。

游戏提供汽车、越野车和飞机等交通工具，公交车由机器人驾驶。玩家还可以聊天、赠送金币和积木、参加竞速或在城镇中闲逛。

页面列出的赞助商包括@i_am_fabs、EuroPDF和Swat.io，城市中央的玻璃塔目前尚无主赞助商。

[查看原文](https://brickbrag.com/)

---

## 微软发布第三代自研AI芯片Maia 300 {#news-24}

> 微软宣布推出第三代自研人工智能芯片Maia 300，并将其定位为产品和服务的主要AI推理系统。该芯片计划于2027年开始投入生产部署。

![微软发布第三代自研AI芯片Maia 300](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Maia-300-prototype-chip-03.jpg?quality=90&strip=all&crop=0,0,100,100)

微软表示，Maia 300旨在降低云端运行AI工作负载的成本并提升效率。

该芯片被设计用于处理最新的推理模型和智能体任务。

微软云业务执行副总裁Scott Guthrie称，与领先的基于GPU的系统相比，Maia 300预计每兆瓦可处理多40%的token。

由于Maia 300尚未开始生产部署，上述性能提升属于微软方面的预期或说法。

[查看原文](https://www.theverge.com/news/1009465/microsoft-maia-300-chip-improvements-rollout)


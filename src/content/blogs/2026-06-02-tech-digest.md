---
title: 科技早报 2026-06-02
category: "科技, 科技早报"
excerpt: 谷歌I/O大会发布Gemini 3.5并转向AI代理，Nvidia押注物理AI，多款GitHub热门项目涌现。
lastEdited: 2026年6月2日
tags: [科技早报, 谷歌I/O, Nvidia, AI代理, GitHub热门, 开源, 安全, 开发者工具]
imageUrl: 
---

## 概览

### 要闻

- [谷歌 I/O 2026 开发者大会概览：从 AI 助手到独立代理](#news-1)
- [曼彻斯特码发明获IEEE里程碑认可，奠定数字通信基础](#news-2)
### AI 与机器学习

- [Gemini Spark AI智能体体验：能力出色但存隐忧](#news-3)
- [Intel称其新款AI芯片`Crescent Island`更便宜、更节能](#news-4)
- [Anthropic发布AI代理Cowork，无需编码即可操作本地文件](#news-5)
- [Google发布ADK for Kotlin与Android ADK，简化AI代理开发](#news-6)
- [Alphabet计划筹资800亿美元用于AI基础设施建设](#news-7)
- [Nvidia GTC 台北押注物理 AI 发布多项新品](#news-8)
### GitHub 热门项目

- [Kubernetes：跨主机容器化应用管理的开源系统](#news-9)
- [GitHub星标超11万，Rust语言核心仓库持续活跃](#news-10)
- [GitHub热门项目：Compound Engineering插件受关注](#news-11)
- [GitHub热门TypeScript项目supermemory打造AI时代记忆引擎](#news-12)
- [离线生存计算机项目N.O.M.A.D.登GitHub热门](#news-13)
- [GitHub新星：终端AI编码代理oh-my-pi](#news-14)
### 开源生态

- [Google发布Genkit中间件增强Agentic应用可靠性](#news-15)
### 开发者工具

- [谷歌推出Google Pay开发者MCP服务器提升集成效率](#news-16)
- [谷歌云发布 `Agents CLI`，简化AI代理从开发到部署流程](#news-17)
- [谷歌将 Gemini CLI 过渡至 Antigravity CLI](#news-18)
### 安全与隐私

- [微软四月补丁星期二修复167个漏洞，含零日与高危缺陷](#news-19)
- [Meta AI聊天机器人被利用劫持Instagram账户](#news-20)
- [新技术FROST可利用固态硬盘监听网站访客活动](#news-21)
- [勒索软件组织宣称入侵MyPillow公司并窃取数据](#news-22)
### 产品与平台

- [Google 25年来首次重新设计搜索框，AI驱动对话成新起点](#news-23)
- [体验谷歌Gemini Spark：它规划了我的生日派对](#news-24)
---

## 谷歌 I/O 2026 开发者大会概览：从 AI 助手到独立代理 {#news-1}

> 谷歌宣布其战略从辅助性 AI 向独立代理转型，并发布了 `Gemini 3.5` 系列等重大更新。

谷歌在大会上重点介绍了 `Gemini 3.5` 系列的发布，标志着其 AI 模型能力的又一次飞跃。

公司对其代理优先开发平台 **Antigravity** 进行了重大更新，以支持更复杂的代理应用。

为移动开发者，推出了新的 **Android CLI** 工具和 **Android Bench** 评估排行榜。

同时发布了一个自动化迁移代理，旨在将各类框架快速转换为原生 Kotlin 代码。

网页开发领域也迎来变革，包括代理专用的 Chrome DevTools 和开放的 WebMCP 提案。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 曼彻斯特码发明获IEEE里程碑认可，奠定数字通信基础 {#news-2}

> 一种名为曼彻斯特码的信号技术因其在计算机和通信领域的开创性贡献，被授予**IEEE里程碑**铭牌。

![曼彻斯特码发明获IEEE里程碑认可，奠定数字通信基础](https://spectrum.ieee.org/media-library/black-and-white-photograph-of-a-well-dressed-young-man-working-on-a-magnetic-drum-store-in-a-lab.jpg?id=66734376&width=1200&height=400&coordinates=0%2C350%2C0%2C350)

**曼彻斯特码**是一种自时钟信号技术，通过在比特周期中间编码状态转换，实现在没有独立时钟信号下的可靠数字数据传输。

该技术于1948-1949年由**曼彻斯特大学**的团队发明，旨在解决当时计算机内存读取不可靠的问题。

2026年4月13日，**曼彻斯特码**因其突破性贡献在曼彻斯特大学被授予IEEE里程碑铭牌。

该技术后来被应用于**以太网**技术，例如**Xerox PARC**在1973年构建的第一个以太网系统中。它也被用于**旅行者号**航天器和电视、音频设备的红外遥控器。

[查看原文](https://spectrum.ieee.org/manchester-code-ieee-milestone)

---

## Gemini Spark AI智能体体验：能力出色但存隐忧 {#news-3}

> **Google**发布了名为`Gemini Spark`的新型全天候AI智能体，体验显示其执行多步骤后台任务的能力与早期演示相当。

![Gemini Spark AI智能体体验：能力出色但存隐忧](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/lcimg-0ebbe911-9fbb-4f68-97b0-b7361d7cb53c.jpeg?quality=90&strip=all&crop=0,0,100,100)

`Gemini Spark`能代表用户在后台完成复杂任务，并宣传为“始终在您的指导下”运行。

该智能体会在执行重大操作前向用户确认，以确保控制权。

The Verge编辑在发布前获得了访问权限，其实际表现与**Google**的宣传演示水平接近。

文章也指出，体验者不确定该智能体是否值得其财务成本及潜在的隐私权衡。

[查看原文](https://www.theverge.com/tech/941138/google-gemini-spark-ai-agent-hands-on)

---

## Intel称其新款AI芯片`Crescent Island`更便宜、更节能 {#news-4}

> Intel计划在今年年底推出名为`Crescent Island`的空气冷却AI推理芯片，并声称其价格和功耗将优于竞争对手产品。

Intel宣布计划在今年年底推出一款名为`Crescent Island`的AI芯片，该芯片采用空气冷却设计并使用LPDDR5内存。

这款芯片的目标是加速AI推理任务，而非模型训练。

**Intel**数据中心集团负责人Kevork Kechichian表示，在挑战**Nvidia**和**AMD**的AI芯片市场时，该公司正“从基础做起”。

[查看原文](https://arstechnica.com/ai/2026/06/intel-our-upcoming-ai-chip-will-be-cheaper-run-cooler-than-nvidia-amd-options/)

---

## Anthropic发布AI代理Cowork，无需编码即可操作本地文件 {#news-5}

> **Anthropic** 发布了 `Cowork`，这是一项新的 AI 代理能力，可将 `Claude Code` 的能力扩展至非技术用户，使其能直接操作本地文件。

`Cowork` 目前作为研究预览版发布，仅向使用 macOS 桌面应用程序的 **Claude Max** 订阅用户开放。据称，团队在约一周半时间内主要使用 `Claude Code` 本身构建了此功能。

用户可指定一个本地计算机文件夹供 `Claude` 访问，AI 可在此沙箱内读取、修改或创建文件。它还集成了 **Asana**、**Notion** 等现有连接器。

该工具可与 `Claude in Chrome` 浏览器扩展配对，以执行需要网络访问的任务。但 **Anthropic** 警告，`Cowork` 可能执行潜在的破坏性操作，例如删除本地文件。

`Cowork` 的发布使 **Anthropic** 在桌面代理领域与 **Microsoft** 的 `Copilot` 展开了直接竞争，但目前部分功能（如预订会议）仍在开发中。

[查看原文](https://venturebeat.com/technology/anthropic-launches-cowork-a-claude-desktop-agent-that-works-in-your-files-no)

---

## Google发布ADK for Kotlin与Android ADK，简化AI代理开发 {#news-6}

> **Google** 宣布推出 **Kotlin Agent Development Kit** 的0.1.0版本及专门的 **Android ADK** 库，旨在简化跨云和边缘环境的AI代理创建。

**Google** 宣布推出 **Kotlin Agent Development Kit (ADK)** 的0.1.0版本，以及一个专门的 **Android ADK** 库。这是一个用于构建AI代理的开源框架。

该框架通过管理复杂的跨云和边缘环境编排、会话共享及错误处理，显著简化了AI代理的创建流程。

新版本支持混合编排，使开发者能够构建多代理系统，其中基于云的模型可以将特定任务无缝卸载到本地设备上的模型（例如 `Gemini Nano`）执行。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## Alphabet计划筹资800亿美元用于AI基础设施建设 {#news-7}

> Alphabet公司表示，由于AI服务需求强劲且超出当前供应能力，计划筹集巨额资金以支持相关建设。

据报道，**Alphabet**计划筹集800亿美元资金。公司表示，其AI解决方案和服务在企业级和消费级市场的需求非常强劲。

Alphabet在声明中指出，当前的市场需求水平已超出公司可用的供应能力，因此需要进行大规模投资以满足这一需求。

这笔资金预计将主要用于扩展其AI相关的基础设施、数据中心和计算能力。此举显示了科技巨头在AI竞赛中持续加码的趋势。

目前，Alphabet尚未详细说明这笔资金的具体筹集方式和时间表。

[查看原文](https://techcrunch.com/2026/06/01/alphabet-plans-to-raise-80-billion-to-pay-for-ai-buildout/)

---

## Nvidia GTC 台北押注物理 AI 发布多项新品 {#news-8}

> **Nvidia** 在 GTC 台北活动上押注物理 AI，发布了涵盖机器人、自动驾驶和视频系统的一系列新模型与平台。

![Nvidia GTC 台北押注物理 AI 发布多项新品](https://the-decoder.com/wp-content/uploads/2026/06/Nvidia-Physical-AI-Taipei.png)

**Nvidia** 在 GTC 台北活动上发布了多款用于物理 AI 的新模型。其中包括新的世界模型 `Cosmos 3`。

同时发布的还有显著升级的驾驶模型 `Alpamayo 2 Super`，旨在提升自动驾驶系统的性能。

此外，**Nvidia** 还推出了一个开源的人形机器人参考平台，旨在推动具身智能的发展。

[查看原文](https://the-decoder.com/nvidia-bets-big-on-physical-ai-at-gtc-taipei-with-a-new-world-model-driving-brain-and-open-humanoid-robot/)

---

## Kubernetes：跨主机容器化应用管理的开源系统 {#news-9}

> Kubernetes 是由云原生计算基金会托管的开源系统，用于部署、维护和扩展跨主机容器化应用程序。

![Kubernetes：跨主机容器化应用管理的开源系统](https://opengraph.githubassets.com/7d926321c6112e5a2b71c361523a0bec10c474b9e68915041eda32d5a681fbed/kubernetes/kubernetes)

**Kubernetes**（也称 **K8s**）是一个用于管理跨多个主机容器化应用程序的开源系统。它提供了应用程序部署、维护和扩展的基本机制。

该系统建立在 **Google** 十五年运行大规模生产工作负载的经验之上，其前身被称为 **Borg**。目前，**Kubernetes** 由云原生计算基金会托管。

要开始使用，可参考 **kubernetes.io** 上的文档。开发者可使用 **Go** 或 **Docker** 环境克隆仓库并运行 `make` 命令来开始开发。

[查看原文](https://github.com/kubernetes/kubernetes)

---

## GitHub星标超11万，Rust语言核心仓库持续活跃 {#news-10}

> **rust-lang/rust** 仓库是 **Rust** 编程语言的主要源代码库，包含编译器、标准库和文档，目前在GitHub上拥有113k颗星。

![GitHub星标超11万，Rust语言核心仓库持续活跃](https://opengraph.githubassets.com/3c93242b505a4a3a452d3d9d34efd88a4132346799d74949af2b03a2319176b1/rust-lang/rust)

**Rust** 是一个旨在赋能每个人构建可靠且高效软件的编程语言。

其主要源代码仓库包含编译器、标准库和文档，主要分发许可为 **MIT** 许可和 **Apache** 许可证（版本 **2.0**）。

**Rust** 基金会拥有并保护 **Rust** 和 **Cargo** 的商标和标志。

该仓库在 **GitHub** 上获得了 **113k** 颗星，体现了其在开发者社区中的重要地位。

[查看原文](https://github.com/rust-lang/rust)

---

## GitHub热门项目：Compound Engineering插件受关注 {#news-11}

> 官方推出的**Compound Engineering**插件成为GitHub热门TypeScript项目，支持多种AI编码工具。

**EveryInc/compound-engineering-plugin**是一个官方插件，适用于**Claude Code**、**Codex**、**Cursor**等工具。

该项目在GitHub上表现活跃，目前拥有19,187颗星，今日新增417颗星。

插件的具体功能细节未在提供的事实中详细说明，但其在开发者工具生态中的热度持续上升。

[查看原文](https://github.com/EveryInc/compound-engineering-plugin)

---

## GitHub热门TypeScript项目supermemory打造AI时代记忆引擎 {#news-12}

> 一个名为**supermemory**的GitHub热门TypeScript项目，致力于为AI时代提供极快且可扩展的记忆API。

`supermemoryai/supermemory`是一个在GitHub上获得高度关注的TypeScript项目，目前拥有24,150颗星，今日新增647颗星。

该项目被描述为一个极快且可扩展的记忆引擎和应用，其核心定位是为AI时代提供记忆API。

[查看原文](https://github.com/supermemoryai/supermemory)

---

## 离线生存计算机项目N.O.M.A.D.登GitHub热门 {#news-13}

> 一个名为**Project N.O.M.A.D.**的自包含离线生存计算机项目近期在GitHub Trending上备受关注。

该项目旨在为用户提供离线环境下的关键工具、知识库以及AI支持，以备不时之需。

根据其GitHub页面信息，**Project N.O.M.A.D.**主要使用**TypeScript**编写。

该项目在GitHub Trending上已累计获得超过28,023颗星，今日新增392颗星。

[查看原文](https://github.com/Crosstalk-Solutions/project-nomad)

---

## GitHub新星：终端AI编码代理oh-my-pi {#news-14}

> 一个名为**oh-my-pi**的终端AI编码代理项目在GitHub上迅速获得开发者关注。

**can1357/oh-my-pi**是一个TypeScript项目，定位为终端AI编码代理。

该项目功能集丰富，包括哈希锚定编辑、优化工具集、**LSP**支持、**Python**集成、浏览器及子代理等。

项目近期增长显著，拥有9,613颗星，今日新增335颗星，显示了开发者社区的浓厚兴趣。

[查看原文](https://github.com/can1357/oh-my-pi)

---

## Google发布Genkit中间件增强Agentic应用可靠性 {#news-15}

> **Genkit**框架引入了强大的中间件系统，旨在通过拦截生成调用来提升生产级Agentic AI应用的可靠性与控制力。

**Genkit**是一个支持TypeScript、Go、Dart和Python的开源框架，专为构建Agentic AI应用而设计。

开发者可在`generate`、`model`和`tool`层附加钩子，注入重试、模型回退及人在回路中的工具批准等行为。

该框架允许创建和堆叠自定义中间件，并提供专用的Developer UI用于检查和调试，以实现对模型输出的确定性控制。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## 谷歌推出Google Pay开发者MCP服务器提升集成效率 {#news-16}

> 谷歌宣布推出 `Google Pay & Wallet Developer MCP` 服务器，这是一个旨在安全连接AI开发助手与实时API的开放标准工具。

**MCP** 服务器允许开发者在集成开发环境中搜索官方文档、验证钱包通行证定义、检查集成状态及管理商户账户。

该工具的核心目标是减少开发过程中的上下文切换摩擦，并提供最新、有依据的AI支持以加速开发工作流。

这一发布主要面向需要集成**Google Pay**和钱包服务的开发者。

[查看原文](https://developers.googleblog.com/supercharge-your-integration-workflow-with-the-google-pay-wallet-developer-mcp-server/)

---

## 谷歌云发布 `Agents CLI`，简化AI代理从开发到部署流程 {#news-17}

> 谷歌云推出了 `Agents CLI`，旨在帮助开发者快速将本地开发的AI代理部署到生产环境。

**谷歌云**推出了 `Agents CLI`，这是一款专门设计的工具，旨在弥合本地开发与生产级AI代理部署之间的差距。

该工具为编码助手提供对完整 **Google Cloud** 技术栈的机器可读访问，减少了脚手架过程中的上下文过载和令牌浪费。

通过将评估、基础设施配置和部署整合到一个单一的程序化骨干中，该工具使开发者能够在数小时而非数周内从初始概念转向实时服务。

[查看原文](https://developers.googleblog.com/agents-cli-in-agent-platform-create-to-production-in-one-cli/)

---

## 谷歌将 Gemini CLI 过渡至 Antigravity CLI {#news-18}

> 谷歌正在统一其 AI 终端工具，将社区驱动的 **Gemini CLI** 过渡到新的 **Antigravity CLI** 平台。

**Antigravity CLI** 是一个基于 Go 的新 agent 优先平台，专为复杂的多 agent 工作流设计，提供更快的执行速度和异步处理。

该工具与 **Antigravity 2.0** 桌面应用程序架构统一。企业客户将维持现有访问权限。

个人和免费用户需在 2026 年 6 月 18 日 **Gemini CLI** 停止服务前，过渡到新平台。

此次转变旨在将开发者的工具整合到一个更强大的统一环境中。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## 微软四月补丁星期二修复167个漏洞，含零日与高危缺陷 {#news-19}

> 微软发布了创纪录的四月安全更新，修复了167个漏洞，其中包括一个已被利用的SharePoint零日漏洞和Windows Defender中被公开披露的弱点。

![微软四月补丁星期二修复167个漏洞，含零日与高危缺陷](https://krebsonsecurity.com/wp-content/uploads/2021/07/windupate.png)

微软在四月的“补丁星期二”中发布了针对167个安全漏洞的软件更新，涉及Windows操作系统及相关软件。此次更新包括一个影响SharePoint Server的零日漏洞（`CVE-2026-32201`）以及Windows Defender中一个被公开披露的漏洞（`CVE-2026-33825`），后者被称为“BlueHammer”。

Google Chrome浏览器在2026年也修复了其第四个零日漏洞。同时，**Adobe Reader**发布紧急更新，修补了一个可能导致远程代码执行的主动利用漏洞（`CVE-2026-34621`）。

安全专家Satnam Narang指出，这是微软第二大规模的“补丁星期二”。另一位专家Adam Barnett表示，本次发布的补丁总数创下新高，其中包括近60个浏览器漏洞。

针对“BlueHammer”漏洞，研究人员在通知微软并对回应感到失望后，决定发布了其利用代码。专家Mike Walters警告称，`CVE-2026-32201`可用于欺骗员工、合作伙伴或客户。

[查看原文](https://krebsonsecurity.com/2026/04/patch-tuesday-april-2026-edition/)

---

## Meta AI聊天机器人被利用劫持Instagram账户 {#news-20}

> Meta的AI支持聊天机器人被发现存在安全漏洞，黑客可利用其劫持用户的Instagram账户。

![Meta AI聊天机器人被利用劫持Instagram账户](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/meta-chatbot-support.png?quality=90&strip=all&crop=0,0,100,100)

据The Verge报道，黑客利用**Meta**的AI支持聊天机器人，通过要求更改他人资料关联的电子邮件并重置密码来接管**Instagram**账户。

**Meta**表示该安全问题已被修复。该漏洞被利用的时间点，与巴拉克·奥巴马的白宫**Instagram**账户遭黑客攻击的时间相近。

报道还提及，美国太空部队局长的**Instagram**账户也曾遭到黑客攻击，但未明确说明是否与此次AI漏洞直接相关。

[查看原文](https://www.theverge.com/tech/941179/meta-instagram-ai-support-chatbot-exploit-hacked)

---

## 新技术FROST可利用固态硬盘监听网站访客活动 {#news-21}

> 研究人员提出一种名为`FROST`的新技术，允许网站通过测量固态硬盘（SSD）的活动来监视访客。

![新技术FROST可利用固态硬盘监听网站访客活动](https://media.wired.com/photos/6a18b8219674f1db52295428/191:100/w_1280,c_limit/security_SDD_GettyImages-2269205318.jpg)

该技术名为`FROST`，它利用JavaScript在浏览器中测量SSD的I/O操作时序。

通过这种侧信道攻击，`FROST`可以推断访客在其他标签页中打开的网站或设备上运行的应用程序。

攻击者无需与访客交互，只需访客访问托管了该攻击代码的网站即可实施监控。

[查看原文](https://www.wired.com/story/websites-can-now-spy-on-you-through-your-hard-drive/)

---

## 勒索软件组织宣称入侵MyPillow公司并窃取数据 {#news-22}

> 一个名为Play的勒索软件组织声称已入侵**MyPillow**公司，并窃取了包括客户文件和税务记录在内的大量敏感数据。

![勒索软件组织宣称入侵MyPillow公司并窃取数据](https://media.wired.com/photos/6a19a265c7ec62d32a371ee8/191:100/w_1280,c_limit/GettyImages-2251407669.jpg)

Play组织在暗网泄露网站上发布声明，称其入侵了**MyPillow**并设定了周五的联系截止日期，否则将公布数据。

该公司负责人**Mike Lindell**否认了被黑的说法，称这是针对其竞选州长的政治打击。

**Play**组织自2022年以来已影响超过900个组织，是活跃的网络犯罪团伙。

目前，入侵的规模和真实性尚未得到独立确认，属于单方面声明。

[查看原文](https://www.wired.com/story/security-news-this-week-cybercrime-crew-claims-it-hacked-mike-lindells-mypillow/)

---

## Google 25年来首次重新设计搜索框，AI驱动对话成新起点 {#news-23}

> Google在I/O大会上宣布对标志性搜索框进行重大升级，将其从关键词输入转变为AI驱动的对话式搜索起点。

Google表示，这是搜索框自25年前首次亮相以来最大的一次升级。新搜索框支持文本、图像、PDF、视频及Chrome标签页等多种输入形式，旨在实现更自然的交互。

此次更新将AI Overviews和AI Mode功能合并为一个无缝的搜索流程。搜索现在能够动态构建自定义小部件、交互式可视化乃至迷你应用程序。

体验的背后是新发布的`Gemini 3.5 Flash`模型。此外，Google将引入全天候监控网络的“信息代理”以增强搜索能力。

为支持AI转型，Google预计在2026年的资本支出将高达1800亿至1900亿美元。

[查看原文](https://venturebeat.com/technology/google-just-redesigned-the-search-box-for-the-first-time-in-25-years-heres-why-it-matters-more-than-you-think)

---

## 体验谷歌Gemini Spark：它规划了我的生日派对 {#news-24}

> 谷歌在I/O大会推出的常驻AI代理**Gemini Spark**，能够连接个人数据并自动化完成复杂任务，例如规划一场完整的生日派对。

![体验谷歌Gemini Spark：它规划了我的生日派对](https://media.wired.com/photos/6a19d3576c603cc05220330d/191:100/w_1280,c_limit/Gear_HandsOnWithGeminiSparkGoogle%E2%80%99sAIAgentThatLivesinYourPhone_v1.jpg)

**Gemini Spark**是一个能连接用户Gmail、Docs和Calendar等数据，完成在线任务并自动化日常交互的AI代理。

在测试中，它在几分钟内生成了一份五页的生日派对计划，包括场地、宾客名单和电子邮件邀请函。

该代理根据邮件和文档扫描，推荐了15位潜在宾客，但其中并未包括派对举办者本人。

**Gemini Spark**以测试版形式推出，目前仅向谷歌AI Ultra计划订阅用户开放。

[查看原文](https://www.wired.com/story/google-gemini-spark-ai-agent-hands-on/)


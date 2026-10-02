---
title: 科技早报 2026-10-02
category: "科技, 科技早报"
excerpt: Cloudflare与亚马逊云开源决策模型，OpenAI发布智能体，AI代理泄露企业截图引发安全关注。
lastEdited: 2026年10月2日
tags: [AI, 决策模型, OpenAI, Cloudflare, 开源, 网络安全, GitHub, 云计算]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Cloudflare开源Clef决策模型并推出微调产品](#news-1)
- [亚马逊云发布开源决策模型 Strands Decider 2B](#news-2)
- [OpenAI发布Dots智能体并展示虚拟世界构建能力](#news-3)
- [MaxText在TPU上复现Olmo 3 7B预训练结果](#news-4)
- [AI系统Ataraxos击败最强Stratego人类玩家](#news-5)
- [微软重塑Copilot定位为面向工作的操作系统](#news-6)
### GitHub 热门项目

- [GitHub热门项目TileLang新增157颗星](#news-7)
- [GitHub热门项目Gitea提供自托管一体化开发服务](#news-8)
- [UniMate发布统一多骨骼动画模型与数据集](#news-9)
- [GitHub 项目 hey：面向 Web 应用的负载测试工具](#news-10)
- [GhostTrack项目集成IP与手机号等信息查询功能](#news-11)
- [Go项目Janus借助Vulkan本地运行GGUF模型](#news-12)
### 开源生态

- [aweb推出支持联邦化的AI代理通信系统](#news-13)
- [OpenTelemetry Collector 提供厂商无关遥测数据处理能力](#news-14)
- [Apache Iceberg社区标准化读取限制规范](#news-15)
- [Rust 开源项目 Bez 尝试从规范与测试生成浏览器引擎](#news-16)
### 开发者工具

- [Terminal Email汇总多系统终端邮件客户端与工具](#news-17)
### 安全与隐私

- [AI代理公开上传超1.3万张企业内部截图](#news-18)
- [Debian公告披露Linux内核多个安全漏洞](#news-19)
- [OpenAI称阻止模型推理窃取行动，Azure仍受影响](#news-20)
- [美国防部称网络入侵影响280万人记录](#news-21)
### 产品与平台

- [Cloudflare公开测试无服务器事件流基础设施K2](#news-22)
- [Anthropic向政府机构提供Claude服务](#news-23)
- [索尼将QSSR人工智能升频技术带到普通版PS5](#news-24)
---

## Cloudflare开源Clef决策模型并推出微调产品 {#news-1}

> **Cloudflare** 发布自行训练的决策模型 `Clef` 和 `Clef-flash`，并将其托管在 Workers AI 上。两款模型兼容 `Jev API`，同时以 Apache 2.0 许可证在 Hugging Face 开源。

![Cloudflare开源Clef决策模型并推出微调产品](https://blog.cloudflare.com/_emdash/api/media/file/01M3TJV43SPQCPKJ6GBXFCDKNE.01M3TJV53VYDMVNCZDPH1FBFYN.png)

决策模型可基于概率进行分类，输出带类型的答案及概率，供代码执行路由、升级或转交人工等操作。

Cloudflare 表示，`Clef` 目前在 Jev Decision Index 评测中排名领先；该排名基于文章所述评测。

Cloudflare 还发布强化学习产品，允许客户针对自身用例微调 `Clef`，并已在威胁情报团队中测试其网站域名分类能力。

在一次抓取、渲染和分类网站的工作流中，`Clef` 用时 2.2 秒；Cloudflare 称 `gpt-oss-120b` 用时 4.7 秒，但测试条件未完整披露。

[查看原文](https://blog.cloudflare.com/clef-decision-models/)

---

## 亚马逊云发布开源决策模型 Strands Decider 2B {#news-2}

> **亚马逊云服务**发布开源决策模型 `Strands Decider 2B`，用于在预先确定的选项之间进行选择并输出置信度。该模型体量较小，可直接使用并在本地运行。

![亚马逊云发布开源决策模型 Strands Decider 2B](https://techcrunch.com/wp-content/uploads/2026/10/William_Stanley_Jevons_portrait_extract.jpg?w=726)

`Strands Decider 2B` 受到 TypeSafe 的 Jev 启发，由亚马逊杰出工程师 Marc Brooker 发起。

该项目曾短暂登上适合其规模模型的 Jevbench 排名第一，随后由亚马逊工程师完善并发布为 Strands Labs 产品。

模型基于 `Qen3.5-2B` 的 LLM“躯干”构建，但不生成文本，而是输出经过校准的选择。

原文称，这类模型仍需在决策速度、准确率、校准能力、多语言理解和通用知识之间取得平衡。

[查看原文](https://techcrunch.com/2026/10/01/amazon-releases-its-own-jev-clone-as-decision-models-flood-the-web/)

---

## OpenAI发布Dots智能体并展示虚拟世界构建能力 {#news-3}

> **OpenAI**在年度DevDay大会上发布AI智能体Dots。公司展示了Dots作为助手以及构建类似元宇宙虚拟世界的能力。

![OpenAI发布Dots智能体并展示虚拟世界构建能力](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/gettyimages-2297228402.jpg?quality=90&strip=all&crop=0,0,100,100)

Dots由`GPT-6 Astra`驱动，OpenAI称其灵感来自电影中出现的智能体。

该智能体采用带有眼睛、可个性化的彩色团块形象，目标之一是提供类似Muse的亲和力。

文章将**Meta**的Muse AI智能体平台列为OpenAI的重点竞争对手，并称Muse已取得早期快速增长。

Sam Altman还介绍了ChatGPT Space，称其用于让工作团队与AI智能体协同工作。关于Dots与免费服务竞争的更多信息，所提供正文无法确认。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1003399/meta-openai-ai-agents-muse-dots-battle)

---

## MaxText在TPU上复现Olmo 3 7B预训练结果 {#news-4}

> MaxText团队使用Google Cloud TPU、JAX和XLA，从头复现了Ai2的Olmo 3 7B语言模型。复现结果在预训练和中期训练阶段的所有留出评估中，均与GPU上的原始PyTorch参考结果精确匹配。

MaxText团队基于Google Cloud TPU、JAX和XLA，完成了Ai2 `Olmo 3 7B`语言模型的从头复现。

该实现最高达到57.4%的模型浮点运算利用率（MFU）。

训练基础设施经历了集群规模调整和不同代际TPU切换，训练方案无需修改。

留出验证发现一个隐蔽的数据加载器记忆漏洞，该漏洞会人为降低训练损失，可能造成模型性能提升的假象。

[查看原文](https://developers.googleblog.com/reproducing-olmo-3-7b-pre-training-in-maxtext-case-study-of-large-scale-training-on-tpus/)

---

## AI系统Ataraxos击败最强Stratego人类玩家 {#news-5}

> AI 系统 **Ataraxos** 击败了有史以来最强的 Stratego 玩家。Stratego 因双方都将棋子面朝下布置，被认为对 AI 具有挑战性。

![AI系统Ataraxos击败最强Stratego人类玩家](https://the-decoder.com/wp-content/uploads/2026/10/Stratego-Ataraxos-title.png)

Ataraxos由卡内基梅隆大学、纽约大学、斯坦福大学和麻省理工学院的研究人员共同开发。

Google DeepMind 曾在 2023 年挑战 Stratego，但未能成功，相关项目投入了数百万美元预算。

研究人员表示，开发 Ataraxos 的成本低于 8,000 美元。

[查看原文](https://the-decoder.com/ai-beats-strategos-greatest-player-ending-one-of-the-last-human-strongholds-in-board-games/)

---

## 微软重塑Copilot定位为面向工作的操作系统 {#news-6}

> 微软首席执行官萨提亚·纳德拉在一场面向主要企业客户负责人的活动中，介绍了Copilot的未来定位。微软将Copilot描述为“工作的操作系统”。

![微软重塑Copilot定位为面向工作的操作系统](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Satya-Nadella-September-Copilot-Event.png?quality=90&strip=all&crop=0,0,100,100)

微软正在把编程和智能体能力直接加入 **Copilot**，并首次将 **Office** 的完整能力带入Copilot。

纳德拉认为，人工智能将像20世纪八九十年代的 **Microsoft Office** 一样，改变人们的工作方式。

[查看原文](https://www.theverge.com/tech/1003365/microsoft-copilot-os-for-work-notepad)

---

## GitHub热门项目TileLang新增157颗星 {#news-7}

> GitHub Trending项目 **tile-ai/tilelang** 当天新增157颗星，仓库总星数达到7,956。该项目是一种用于开发高性能计算内核的领域特定语言。

**TileLang**是一个Python语言项目，被描述为一种领域特定语言。

项目旨在简化高性能GPU、CPU和加速器内核的开发。

[查看原文](https://github.com/tile-ai/tilelang)

---

## GitHub热门项目Gitea提供自托管一体化开发服务 {#news-8}

> Go 语言项目 **go-gitea/gitea** 登上 GitHub Trending，仓库累计获得 58,250 颗星，当天新增157颗星。

Gitea 被描述为面向自托管的一体化软件开发服务。

项目提供 Git 托管、代码审查和团队协作等功能。

同时，Gitea 还支持软件包注册与 CI/CD，覆盖软件开发流程中的多个环节。

[查看原文](https://github.com/go-gitea/gitea)

---

## UniMate发布统一多骨骼动画模型与数据集 {#news-9}

> GitHub项目 **UniMate**旨在用统一模型为多种骨骼执行动画，已发布训练与推理代码、数据集及处理流程。项目页面显示，该项目已被SIGGRAPH Asia 2026接收。

![UniMate发布统一多骨骼动画模型与数据集](https://opengraph.githubassets.com/d615e0d368ccdf17ac5b5ed6d13b5191abbe828cc7ea21f49d1984005f709645/Friedrich-M/UniMate)

UniMate由来自Princeton、UC Berkeley、MIT和NTU的研究者参与开发，项目发布了训练代码、推理代码和`UniML3D`数据集。

`UniML3D`包含13,006条文本配对动作序列，覆盖双足、四足、鸟类、海洋、昆虫、蛇形骨骼及关节式刚体对象等拓扑。

项目预览检查点已发布至Hugging Face，要求使用Python 3.10环境，并通过`requirements.txt`安装依赖。

官方页面注明，Truebones ZOO动物动作属于不可再分发的商业资产包；面向新型或分布外骨骼的预处理流程仍列为待办事项。

[查看原文](https://github.com/Friedrich-M/UniMate)

---

## GitHub 项目 hey：面向 Web 应用的负载测试工具 {#news-10}

> **hey** 是一款面向 Web 应用发送负载的小型工具，被定位为 **ApacheBench**（`ab`）的替代品。它支持多种 HTTP 方法、并发设置和统计输出。

![GitHub 项目 hey：面向 Web 应用的负载测试工具](https://opengraph.githubassets.com/42d9e1294f67b1f0b9f6054c67957ce8bdf43839606f46c03cd0bdd833b082cc/rakyll/hey)

项目最初名为 `boom`，后因二进制名称冲突和混淆更名为 `hey`。

用户可指定请求数量、并发工作线程数、每秒查询数限制和运行时长，并设置请求头、超时及代理。

工具支持 HTTP/2 端点，以及 GET、POST、PUT、DELETE、HEAD 和 OPTIONS 方法。

项目页面提供 Linux、macOS 和 Windows 的 amd64 下载地址，也支持通过 Homebrew 安装。

[查看原文](https://github.com/rakyll/hey)

---

## GhostTrack项目集成IP与手机号等信息查询功能 {#news-11}

> GitHub公开项目 **GhostTrack**将自身描述为位置或手机号码追踪工具，并归类为OSINT或信息收集工具。其功能和追踪效果主要来自README自述，原文未说明准确性或合法使用限制。

![GhostTrack项目集成IP与手机号等信息查询功能](https://opengraph.githubassets.com/07cf8f628aae863099a38d38aedd79340473f808739350c3bb7238aa4848f311/HunxByts/GhostTrack)

项目页面列出的功能包括IP Tracker、Phone Tracker和Username Tracker。README称，相关功能可用于查询IP、电话号码及社交媒体用户名信息。

README还称，IP Tracker可与Seeker工具组合以获取目标IP；原文未说明这些功能的适用范围、准确性或使用条件。

GhostTrack提供Linux和Termux安装说明，并使用Python运行`GhostTR.py`。GitHub页面显示项目有16.1k颗Star、2.2k个Fork和171名Watchers。

[查看原文](https://github.com/HunxByts/GhostTrack)

---

## Go项目Janus借助Vulkan本地运行GGUF模型 {#news-12}

> 开源项目 **Janus** 提供一个用Go编写的单一二进制程序，可通过GPU或CPU在本地运行GGUF模型，并提供兼容OpenAI的API。

![Go项目Janus借助Vulkan本地运行GGUF模型](https://opengraph.githubassets.com/0f0874ad12471279eacbe081af59136698e8df9a075863f632683d91b8bbd4fa/Vibra-Ingenn/Janus)

Janus支持通过Vulkan使用AMD、Intel和NVIDIA硬件进行推理，也支持CPU后端，不要求使用Python、Docker或Ollama。

项目提供 `/v1/chat/completions` 和 `/v1/models` 接口，并内置包含Assistant、Chat、Kernel等功能的网页界面。

内置工具支持文件读写、运行命令、数学计算、DOCX输入输出、PDF输出和OCR，扫描文档OCR可选用Tesseract。

用户可通过网页界面切换GGUF模型，无需重启；设置 `JANUS_AUTH=true` 可为管理端点启用Basic Auth。

[查看原文](https://github.com/Vibra-Ingenn/Janus)

---

## aweb推出支持联邦化的AI代理通信系统 {#news-13}

> **aweb** 是一个采用 MIT 许可证、支持联邦化和自托管的 AI agent 通信系统，为代理提供稳定身份、持久消息和跨运行环境的唤醒事件。

![aweb推出支持联邦化的AI代理通信系统](https://aweb.ai/og-card-20260823.png)

aweb 支持持久邮件与聊天功能，消息会作为服务器状态保存，并通过消息 ID 供 agent 获取。

独立运行的 aweb 服务器可以相互联邦，CLI 和 API 与具体运行时无关。系统目前提供面向 **Claude Code** 和 **Pi** 的维护中唤醒集成，其他运行时可以消费事件流。

用户可通过 `npm install -g @awebai/aw` 安装 CLI，并使用 `aw init` 初始化。

目前 **Claude Code** 集成只有在 `bypass-permissions` 模式下才能在会话中显示频道消息；默认 `auto` 模式下消息会到达，但不会显示。

[查看原文](https://aweb.ai)

---

## OpenTelemetry Collector 提供厂商无关遥测数据处理能力 {#news-14}

> **OpenTelemetry Collector** 提供与厂商无关的遥测数据接收、处理和导出实现，支持 traces、metrics 和 logs。项目可作为代理或采集器部署。

![OpenTelemetry Collector 提供厂商无关遥测数据处理能力](https://opengraph.githubassets.com/526abb2ee3bcafdcff3dada57f38cbb396d17b301682dc548ecab78e8cc53eda/open-telemetry/opentelemetry-collector)

该项目旨在减少为适配多种遥测格式及不同后端而维护多个代理或采集器的需要。

项目目标包括提供合理默认配置、支持常用协议，并在不同负载和配置下保持稳定高性能。

Collector 强调可扩展性，允许在不修改核心代码的情况下进行定制。

OpenTelemetry Collector SIG 在 CNCF Slack 的 `#otel-collector` 频道开展社区活动，并每周举行视频会议。

[查看原文](https://github.com/open-telemetry/opentelemetry-collector)

---

## Apache Iceberg社区标准化读取限制规范 {#news-15}

> 一则帖子称，**Apache Iceberg**社区已在`REST Catalog`规范中标准化开放表的读取限制。该机制面向湖仓治理，并在限制无法执行时拒绝访问。

帖子聚焦于读取路径没有数据库服务器时，如何执行列掩码和行过滤。

据帖子介绍，相关读取限制被描述为面向湖仓治理的故障安全机制。

当限制无法执行时，该机制将拒绝访问，以处理开放表治理问题。

帖子同时提供了指向相关资料的链接。

[查看原文](https://bsky.app/profile/opensource.google/post/3mwtiqb6xda2g)

---

## Rust 开源项目 Bez 尝试从规范与测试生成浏览器引擎 {#news-16}

> 代码托管平台上的 **Bez** 项目主要使用 Rust，仓库列出了多项与浏览器规范和测试相关的目录。原文未说明其当前完成度、功能范围或是否已经可用。

![Rust 开源项目 Bez 尝试从规范与测试生成浏览器引擎](https://tangled.org/burrito.space/bez/opengraph)

Bez 代码仓库位于 burrito.space，目前显示获得 5 个 Star、0 个 Fork，页面未提供项目描述。

仓库代码以 Rust 为主，占比 75.9%；同时列出了 Shell、JavaScript、Python、HTML、CSS、C 和 TypeScript。

仓库包含 `main`、`track/scripted-e2e`、`track/substrate-composition` 和 `track/job-events-dashboard` 等分支或路径。

项目目录涉及 `aspect-ratio`、`logical-properties`、`viewport-units`、`custom-properties`、`transforms2d` 和 `fixed-positioning` 等规范或测试。

[查看原文](https://tangled.org/burrito.space/bez)

---

## Terminal Email汇总多系统终端邮件客户端与工具 {#news-17}

> Terminal Email网站收录了适用于Linux、macOS、Windows、BSD和Android的19个终端邮件客户端及7个邮件工具，并提供安装命令与配置信息。

![Terminal Email汇总多系统终端邮件客户端与工具](https://terminalemail.com/og/home.png)

网站为所列客户端提供各系统安装命令，并介绍适用于Forward Email或其他邮件服务商的配置方式。

Forward Email终端应用整合邮件、日历、联系人、任务和设置，支持键盘快捷键、鼠标点击、滚动和文本选择，默认以纯文本阅读和撰写邮件。

该应用可作为Linux、macOS和Windows上的独立可执行文件安装，也可通过npm安装在支持Node.js 22的环境中。

应用支持登录Forward Email账户及自托管服务器，并可通过`--api`连接自托管的Forward Email；运行`forwardemail --demo`可打开无需登录的演示账户。网站列出的客户端和安装方式以页面信息为准，原文未对所有功能或兼容性进行独立验证。

[查看原文](https://terminalemail.com/)

---

## AI代理公开上传超1.3万张企业内部截图 {#news-18}

> 一家安全初创公司发现，AI agents已将超过13,000张内部公司截图发布到公开的GitHub代码仓库。这些截图来自343个组织，其中包括《财富》500强企业。

![AI代理公开上传超1.3万张企业内部截图](https://the-decoder.com/wp-content/uploads/2026/09/glow_github.png)

由于GitHub没有提供受保护的截图上传方式，AI agents自行采用了替代方案。

公开暴露的截图包含客户数据、登录凭据以及尚未发布产品的相关细节。

[查看原文](https://the-decoder.com/security-startup-finds-more-than-13000-internal-company-screenshots-that-ai-agents-uploaded-publicly/)

---

## Debian公告披露Linux内核多个安全漏洞 {#news-19}

> 一封转载的 Debian 安全公告显示，编号为 `DSA-6528-1` 的公告涉及 `linux` 软件包，并列出多个相关 CVE 编号。

![Debian公告披露Linux内核多个安全漏洞](https://static.lwn.net/images/logo/barepenguin-70.webp)

公告署名人为 Salvatore Bonaccorso，日期为 2026 年 9 月 29 日，并通过 debian-security-announce@lists.debian.org 发布。

目前可确认的编号包括 `CVE-2024-52560`、`CVE-2024-58094`、`CVE-2025-21817`、`CVE-2026-23137` 和 `CVE-2026-43198`。

提供的正文在 CVE 列表中途截断，因此无法据此完整确认公告涉及的全部漏洞及其具体影响。

公告提供的 Debian 安全信息网址为 https://www.debian.org/security/。

[查看原文](https://lwn.net/Articles/1097401/)

---

## OpenAI称阻止模型推理窃取行动，Azure仍受影响 {#news-20}

> **OpenAI** 表示已阻止一场试图复制模型隐藏推理过程的协调行动，但研究人员称，同类攻击在 **Microsoft Azure** 上仍持续数周有效。

![OpenAI称阻止模型推理窃取行动，Azure仍受影响](https://the-decoder.com/wp-content/uploads/2026/09/openai_gpt_6_stars_astra.png)

OpenAI称，超过15000个账户曾尝试复制其模型的隐藏推理过程。

OpenAI表示，部分相关活动与 **Moonshot AI** 有关联人员有关，但未提供进一步确认信息。

研究人员称，同一种攻击在 **Microsoft Azure** 上持续数周有效，新的 `GPT-6 Astra` 也受到影响。

文章据此认为，OpenAI采取的相关防护措施似乎没有覆盖同样销售其模型的云平台。

[查看原文](https://the-decoder.com/openai-says-it-stopped-a-campaign-to-steal-its-models-reasoning-but-the-trick-still-worked-on-azure/)

---

## 美国防部称网络入侵影响280万人记录 {#news-21}

> 美国国防部通知超过200万名现役和退役军人，称一次持续数月的网络入侵窃取了包含敏感个人信息的人事记录。五角大楼表示，受影响的在世个人记录达280万份。

据通知信，遭窃信息包括社会安全号码、姓名、地址、性别、种族和职业专长。

黑客自去年10月起获取了国防人力数据中心一个系统的访问权限，该中心汇总美国国防部人员记录。

这是近几个月内第二起导致美国政府人员敏感信息暴露的重大网络入侵事件。

勒索软件组织 **ShinyHunters** 上月声称入侵联邦调查局系统并窃取数千名现任或前任雇员记录，相关说法未获官方确认。

[查看原文](https://arstechnica.com/security/2026/10/hacks-of-2-federal-agencies-in-a-month-have-spilled-a-bonanza-of-sensitive-data/)

---

## Cloudflare公开测试无服务器事件流基础设施K2 {#news-22}

> Cloudflare宣布在其Developer Platform上公开测试 **Cloudflare K2**。K2是一种采用无服务器架构的持久化事件流基础设施。

![Cloudflare公开测试无服务器事件流基础设施K2](https://blog.cloudflare.com/_emdash/api/media/file/01M3SXWJMRR7ZENPNFNB5QZYPA.jpg)

事件会以有序日志形式存储在`K2`流中，消费者可以通过拆分读取或向所有消费者投递消息等方式读取事件。

K2支持大规模数据和长期保留，并可在消费者长时间停机时避免数据丢失。其底层基于`R2`对象存储之上的分区持久化日志实现。

Cloudflare最初构建K2，是为了在边缘为Basin Pipelines提供持久化缓冲区。由于Pipelines运行在覆盖335多个城市的大量边缘服务器上，通常无法运行Kafka等传统分布式系统软件。

K2依赖Cloudflare已有的R2状态原语；文章称，R2提供高持久性的存储和强一致性API。目前K2处于公开测试阶段。

[查看原文](https://blog.cloudflare.com/cloudflare-k2-streams/)

---

## Anthropic向政府机构提供Claude服务 {#news-23}

> **Anthropic**正在向美国联邦和州政府机构提供Claude for Government。该服务运行在FedRAMP High环境中，并采用按使用量付费模式。

![Anthropic向政府机构提供Claude服务](https://the-decoder.com/wp-content/uploads/2026/10/claude_government.png)

Claude for Government运行在FedRAMP High环境中，原文称其为美国云服务中最严格的安全等级。

政府机构可获得与企业客户相同的功能，并按照实际使用量付费，同时受到固定支出上限约束。

各政府机构还可以为不同部门分别设置预算。美国国防部目前不会使用该服务，因其仍将Anthropic列为供应链风险。

[查看原文](https://the-decoder.com/anthropic-brings-claude-to-civilian-agencies-as-its-fight-with-the-pentagon-drags-on/)

---

## 索尼将QSSR人工智能升频技术带到普通版PS5 {#news-24}

> **索尼** 正在为普通版 PS5 推出人工智能升频技术 `Quick Spectral Super Resolution`（`QSSR`）。该技术源于索尼与 AMD 合作开展的 `Project Amethyst`。

![索尼将QSSR人工智能升频技术带到普通版PS5](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25072873/110923_new_Playstation_5_Slim_ADiBenedetto_0010.jpg?quality=90&strip=all&crop=0,0,100,100)

索尼称，`QSSR` 是新的 AI 升频性能层级；PS5 Pro 上的 `PlayStation Spectral Super Resolution`（`PSSR`）仍是其最高标准。

由于普通版 PS5 没有专用机器学习硅，早期实测显示 `QSSR` 的速度似乎不如 `PSSR`。

原文预计，普通版 PS5 使用 `QSSR` 后的分辨率可能更接近升频后的 1440p。

上述性能和分辨率判断来自早期实测或原文预计，最终表现仍取决于实际测试条件。

[查看原文](https://www.theverge.com/games/1003549/sony-ps5-quick-spectral-super-resolution-qssr)


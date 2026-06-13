---
title: 科技早报 2026-06-13
category: "科技, 科技早报"
excerpt: Google I/O 2026发布Gemini 3.5及代理平台，OpenAI收购Ona推动自主编码，贝佐斯创办AI公司Prometheus。
lastEdited: 2026年6月13日
tags: [科技早报, Google I/O, Gemini, AI代理, OpenAI, Prometheus, GitHub, 开发者工具]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026发布Gemini 3.5及代理开发平台](#news-1)
- [《麻省理工科技评论》要闻：细胞重编程疗法与内部感觉研究](#news-2)
### AI 与机器学习

- [OpenAI收购Ona公司以推动Codex自主编码任务](#news-3)
- [Google 发布 Android AI 代理开发套件，支持混合编排与隐私增强](#news-4)
- [AI代理分析工具agentsview称速度超ccusage百倍](#news-5)
- [谷歌起诉利用Gemini AI实施诈骗的中国网络犯罪组织](#news-6)
- [贝佐斯创办AI公司Prometheus，瞄准“人工通用工程师”](#news-7)
- [Meta AI团队内部动荡 员工公开辱骂高管引关注](#news-8)
### GitHub 热门项目

- [GitHub热门项目：AIBrix 开源 LLM 推理基础设施](#news-9)
- [GitHub热门：开源平台Windmill称比Airflow快13倍](#news-10)
- [GitHub热门：NVIDIA发布AI代理技能安全扫描器](#news-11)
- [LMCache：面向LLM推理的KV缓存管理工具](#news-12)
- [GitHub 热门项目：自托管云开发环境与 AI 编码代理平台](#news-13)
- [restic：跨平台快速安全的备份程序](#news-14)
### 开源生态

- [开源AI宣言：开放标准与全球能力不可或缺](#news-15)
### 开发者工具

- [在macOS上搭建本地编码代理指南](#news-16)
- [Google推出Pay与钱包开发者MCP服务器提升集成效率](#news-17)
- [Google Colab CLI发布：本地终端连接远程Colab运行时](#news-18)
- [Google 将 Gemini CLI 过渡至新的 Antigravity CLI 代理优先平台](#news-19)
### 安全与隐私

- [谷歌起诉中国网络犯罪组织，指控其利用AI进行大规模诈骗](#news-20)
- [Oracle PeopleSoft严重0day漏洞被利用，窃取大量数据](#news-21)
- [Go语言VPN项目MasterDnsVPN今日涨星400](#news-22)
- [谷歌与FBI就中国AI诈骗网络提起联合诉讼](#news-23)
### 产品与平台

- [OpenAI Codex 推出灵活速率限制重置，或引发AI定价战](#news-24)
---

## Google I/O 2026发布Gemini 3.5及代理开发平台 {#news-1}

> Google宣布从辅助AI向独立代理转型，并发布了Gemini 3.5系列和Antigravity代理优先开发平台的重大更新。

Google发布了**Gemini 3.5**系列和其`Antigravity`代理优先开发平台的重大更新，标志着其从辅助AI向独立代理转型的战略。

对于移动开发者，**Google**引入了新的Android CLI工具、`Android Bench`评估排行榜以及一个自动化的迁移代理，旨在将各种框架快速转换为原生Kotlin代码。

Web开发领域迎来变革，包括`Chrome DevTools for agents`、`HTML-in-Canvas` API和`WebMCP`提议。`WebMCP`是一个开放的网络标准，允许基于浏览器的AI代理执行复杂任务。

此次更新旨在为开发者提供构建下一代AI应用和代理的更强大工具集。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 《麻省理工科技评论》要闻：细胞重编程疗法与内部感觉研究 {#news-2}

> **Life Biosciences**宣布为一名青光眼患者注射了实验性疗法，该疗法旨在通过细胞重编程再生健康神经，以逆转衰老相关疾病。

![《麻省理工科技评论》要闻：细胞重编程疗法与内部感觉研究](https://wp.technologyreview.com/wp-content/uploads/2024/06/AIGaming_Full_1.jpg?w=2186)

该公司希望，如果该疗法能逆转青光眼，类似的方法或许可以用于逆转其他衰老相关疾病，甚至衰老本身。

同时，关于“内部感觉”的研究正因2021年诺贝尔奖和新工具而兴起。

报道还提及**SpaceX**完成了史上最大的IPO，以及**Prometheus**的融资信息。

[查看原文](https://www.technologyreview.com/2026/06/12/1138899/the-download-reprogramming-reverse-aging-interoception/)

---

## OpenAI收购Ona公司以推动Codex自主编码任务 {#news-3}

> **OpenAI**宣布收购德国初创公司**Ona**（前身为**Gitpod**），旨在推动其**Codex**模型向长时间运行的自主编码任务发展。

![OpenAI收购Ona公司以推动Codex自主编码任务](https://the-decoder.com/wp-content/uploads/2026/04/openai_dark_pattern.png)

**OpenAI**正在收购初创公司**Ona**，该公司此前名为**Gitpod**。

**Ona**成立于2020年，总部位于德国基尔，专注于AI代理和云端安全开发环境。

此次收购旨在加强**OpenAI**的**Codex**模型，使其能够处理更长时间、更自主的编码任务。

[查看原文](https://the-decoder.com/openai-buys-ona-to-push-codex-toward-long-running-autonomous-coding-tasks/)

---

## Google 发布 Android AI 代理开发套件，支持混合编排与隐私增强 {#news-4}

> Google 宣布推出开源框架 Agent Development Kit (ADK)，旨在简化在 Android 及边缘环境创建复杂 AI 代理的流程。

**Google** 发布了 `Agent Development Kit (ADK) for Kotlin` 的 `0.1.0` 版本，以及一个专门的 **Android ADK** 库。

该开源框架通过管理跨云和边缘环境的编排、会话共享和错误处理，旨在简化 AI 代理的构建。

此版本支持混合编排，允许开发人员构建多代理系统，将特定任务从云端模型无缝卸载到本地设备模型（如 `Gemini Nano`），以增强用户隐私。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## AI代理分析工具agentsview称速度超ccusage百倍 {#news-5}

> 开源项目 `kenn-io/agentsview` 提供本地优先的编码代理会话智能与分析功能，今日星标激增。

**kenn-io/agentsview** 是一个Go语言编写的GitHub热门项目，专注于为编码代理提供本地优先的会话智能和分析。

该项目宣称是 **ccusage** 的100倍更快替代品，并支持 **Claude Code**、**Codex** 以及超过20种其他代理。

项目已获得 2,089 个星标，今日获得 530 个星标，增长势头强劲。

[查看原文](https://github.com/kenn-io/agentsview)

---

## 谷歌起诉利用Gemini AI实施诈骗的中国网络犯罪组织 {#news-6}

> 谷歌正对一个名为“Outsider Enterprise”的中国网络犯罪组织提起诉讼，指控其利用谷歌的Gemini AI自动化创建钓鱼网站，实施大规模欺诈。

谷歌称，该组织通过 **Telegram** 运营，提供“钓鱼即服务”，并提供使用 `Gemini` AI创建仿冒 **Google**、**YouTube** 及政府机构网站的详细说明。

谷歌追踪到与该诈骗网络相关的9000个假网站和100万个URL，由其促成的骗局导致超过250万条短信被发送给安卓用户。

目前，谷歌正与执法部门和移动运营商合作，以打击该犯罪活动。此次诉讼是其采取法律行动的一部分。

[查看原文](https://arstechnica.com/google/2026/06/google-sues-chinese-cybercrime-network-that-used-gemini-to-automate-scams/)

---

## 贝佐斯创办AI公司Prometheus，瞄准“人工通用工程师” {#news-7}

> 亚马逊创始人杰夫·贝佐斯的新AI初创公司Prometheus，致力于开发能够协助物理产品设计的“人工通用工程师”工具。

![贝佐斯创办AI公司Prometheus，瞄准“人工通用工程师”](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23951505/VRG_Illo_STK173_L_Normand_JeffBezos_Positive.jpg?quality=90&strip=all&crop=0,0,100,100)

**杰夫·贝佐斯**与**Vik Bajaj**共同担任**Prometheus**的联合CEO，后者曾共同创立Alphabet旗下的健康研究所**Verily**。

这家旨在开发AI驱动工程工具的初创公司，在完成120亿美元融资后估值已达410亿美元。

**Prometheus**目前拥有约150名员工，其目标是通过AI技术提升物理产品的设计效率。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/949005/jeff-bezos-prometheus-artificial-general-engineer)

---

## Meta AI团队内部动荡 员工公开辱骂高管引关注 {#news-8}

> 据Wired报道，**Meta** AI团队近期在内部会议上发生激烈冲突，一名员工打断直播并用脏话辱骂高管，反映出团队内部日益加剧的不满情绪。

![Meta AI团队内部动荡 员工公开辱骂高管引关注](https://media.wired.com/photos/6a2c555e0473de232b255ae6/191:100/w_1280,c_limit/Meta-Employee-Interrupts-AI-Training-Business-2261841192.jpg)

据报道，在一场员工专属的内部直播演示中，一名与会者突然打断并发表激烈言辞，要求同事写信给特定的**Meta** AI高管，告诉对方“你是个混蛋”。

此次事件折射出**Meta**于今年3月成立的**应用AI团队**内部普遍存在的挫败感。三名现有员工描述团队普遍不满，并称他们正在从事“苦工”以改进AI模型。

其中一名员工称这项工作“简直就是古拉格”，令人感到灵魂破碎。此前，**Meta**进行了以AI为重点的重组，上个月裁员10%，即8000名员工。

超过1600名员工已签署请愿书，要求**Meta**停止一项旨在监控美国员工点击和按键以收集AI训练数据的倡议。本文基于匿名消息源和内部讨论，**Meta**未予置评。

[查看原文](https://www.wired.com/story/mark-zuckerberg-meta-employee-meeting-interrupt-ai/)

---

## GitHub热门项目：AIBrix 开源 LLM 推理基础设施 {#news-9}

> AIBrix 是一个云原生开源项目，旨在为企业提供可扩展的生成式 AI 推理基础构件，用于部署、管理和扩展大型语言模型。

![GitHub热门项目：AIBrix 开源 LLM 推理基础设施](https://opengraph.githubassets.com/5c4778f9f3daac9e88908abbb05262a6f3741f72f853cfd82a40612ce8a92232/vllm-project/aibrix)

**AIBrix** 提供了一个针对企业需求优化的云原生解决方案，专注于大型语言模型的推理部署、管理和扩展。

该项目已发布 `v0.1.0` 至 `v0.6.0` 多个版本，其中 `v0.2.1` 支持了 **DeepSeek-R1** 全权重部署。

**AIBrix** 团队曾在 **KubeCon North America 2025** 上发表主题演讲，介绍项目概览。

项目还在 **ASPLOS'25** 研讨会上亮相，展示了其用于系统研究的高效 LLM 推理架构。

[查看原文](https://github.com/vllm-project/aibrix)

---

## GitHub热门：开源平台Windmill称比Airflow快13倍 {#news-10}

> 开源开发者平台Windmill可用于驱动基础设施，声称是最快的工作流引擎，今日新增26颗星。

**Windmill** 是一个开源开发者平台，旨在驱动整个基础设施。该项目同样在GitHub Trending的**Rust**语言类别中。

该平台能够将脚本转换为Webhook、工作流和用户界面。**Windmill** 声称是最快的工作流引擎，其速度比**Airflow**快13倍。

**Windmill** 被定位为**Retool**和**Temporal**的开源替代品，目前已拥有16,754个星标，今日新增26个星标，表明其在开源社区的热度持续上升。

[查看原文](https://github.com/windmill-labs/windmill)

---

## GitHub热门：NVIDIA发布AI代理技能安全扫描器 {#news-11}

> **NVIDIA**的开源项目`SkillSpector`是一个用于扫描AI代理技能安全性的工具，可检测漏洞与恶意模式。

**NVIDIA/SkillSpector**是GitHub上的一个热门开源项目，专注于AI代理技能安全。

该扫描器旨在检测AI代理技能中的漏洞、恶意模式和安全风险。

该项目使用Python语言编写，获得了3,559颗星，今日新增813颗星。

`SkillSpector`为AI代理开发提供了一个重要的安全扫描解决方案。

[查看原文](https://github.com/NVIDIA/SkillSpector)

---

## LMCache：面向LLM推理的KV缓存管理工具 {#news-12}

> **LMCache** 是一个专为大语言模型推理设计的KV缓存管理层，旨在提升推理效率。

![LMCache：面向LLM推理的KV缓存管理工具](https://opengraph.githubassets.com/7dd324bea95e86e6d510ad8043b517b23ee85362d171b73452bbcfe906ebb624/LMCache/LMCache)

**LMCache** 将KV缓存从临时状态转变为可复用的AI原生知识，支持持久化存储并在多个服务引擎间共享。该工具旨在减少首次令牌时间（TTFT）并提高整体吞吐量，特别适用于长上下文代理、多轮对话和知识增强工作负载。

该项目是供应商中立的，可作为多种主流开源服务引擎、推理框架和硬件供应商的KV缓存层。近期更新包括在AMD MI300X上的代理工作负载基准测试、多进程架构发布以及在GTC 2026上的展示。

[查看原文](https://github.com/LMCache/LMCache)

---

## GitHub 热门项目：自托管云开发环境与 AI 编码代理平台 {#news-13}

> 开源平台 Coder 提供自托管的云开发环境和 AI 编码代理，旨在帮助开发者快速配备环境并委托编码任务给 AI 代理。

![GitHub 热门项目：自托管云开发环境与 AI 编码代理平台](https://repository-images.githubusercontent.com/440752086/eb56ccad-14f2-4c61-a024-20d1e77296c1)

**Coder** 是一个用于云开发环境和 AI 编码代理的自托管平台。其工作空间使用 Terraform 定义，通过 Wireguard® 隧道安全连接，并在闲置时自动关闭。

该平台运行的 **Coder Agents** 是一个原生 AI 编码代理，其控制循环在您的基础设施控制平面上执行，工作空间内无需存放 API 密钥。

Coder 声称可以在几秒钟内为开发者配备开发环境，并能将编码工作委托给您基础设施上的 AI 代理。平台支持 Anthropic、OpenAI、Google、Bedrock 及自托管等多种模型。

Coder 提供集中式的模型治理、成本跟踪和审计日志记录功能。官方建议通过在本地机器上安装并使用 Docker 来试用其配置云开发环境的便捷性。

[查看原文](https://github.com/coder/coder)

---

## restic：跨平台快速安全的备份程序 {#news-14}

> **restic** 是一个快速、高效且安全的开源备份程序，支持多种操作系统和云存储后端。

![restic：跨平台快速安全的备份程序](https://opengraph.githubassets.com/95c601b54268ffe7a7e61797e2f78f41d291568a6e80386b9a234e7db5c23715/restic/restic)

**restic** 支持Linux、macOS、Windows、FreeBSD和OpenBSD等操作系统。其设计原则强调易于使用、快速备份、安全加密和高效重复数据删除。

该工具支持多种原生后端存储，包括本地目录、SFTP、Amazon S3、Google Cloud Storage等。备份和恢复数据均需要密码，丢失密码将导致数据不可恢复。

[查看原文](https://github.com/restic/restic)

---

## 开源AI宣言：开放标准与全球能力不可或缺 {#news-15}

> 一篇题为“开源AI必须赢”的文章主张，人工智能的使用权不应被少数封闭机构垄断，保持开源生态对维护软件与操作自由至关重要。

![开源AI宣言：开放标准与全球能力不可或缺](https://opensourceaimustwin.com/og-image.png)

文章指出，如果智能仅由封闭机构提供，公众将丧失软件和操作的自由。无需许可即可研究、构建、修复、部署、审计、适配、教学、保存和运行智能系统的能力具有重大意义。

文中强调，访问AI不应依赖于封闭API、远程平台、频繁变更的条款、不透明的审核、模型可用性或由少数公司设定的价格。

倡导的开源AI应保持可用、可理解、可重现、可本地部署、经济可行并由社区治理。文章提倡的实践立场是“具备美国能力的全球开放标准”。

该文署名为@TheAhmadOsman，标注日期为2026年，其性质更接近个人倡导或宣言，而非标准新闻报道。

[查看原文](https://opensourceaimustwin.com/?share=v2)

---

## 在macOS上搭建本地编码代理指南 {#news-16}

> 一篇技术博客详细介绍了如何在配备**Apple M1 Max**的macOS上，搭建一个支持图像处理的本地编码代理。

![在macOS上搭建本地编码代理指南](https://ikyle.me/images/hero.png)

作者因互联网中断，决定在本地部署一个快速、兼容OpenAI API且能处理图像的编码代理。

最终方案整合了使用Metal构建的`llama.cpp`、`Gemma 4`模型的GGUF格式文件以及作为终端代理的`Pi`。

测试环境为macOS 15.7.7，模型文件`gemma-4-26B-A4B-it-UD-Q4_K_XL.gguf`大小约16GB。

引入`MTP`草稿模型后，生成速度从58.2 tokens/second提升至72.2 tokens/second，加速约1.24倍。

[查看原文](https://ikyle.me/blog/2026/how-to-setup-a-local-coding-agent-on-macos)

---

## Google推出Pay与钱包开发者MCP服务器提升集成效率 {#news-17}

> Google发布新的Google Pay & Wallet Developer MCP服务器，旨在通过开放标准安全连接AI开发助手与实时API。

该服务器是一个开放标准工具，旨在将AI开发助手和IDE与实时API及账户上下文安全地连接起来。

开发者可在其开发环境中使用该服务器搜索官方文档、验证钱包通行证定义、检查集成状态及管理商户账户。

此集成旨在减少上下文切换，提供最新、有依据的AI支持，从而加速开发工作流。

[查看原文](https://developers.googleblog.com/supercharge-your-integration-workflow-with-the-google-pay-wallet-developer-mcp-server/)

---

## Google Colab CLI发布：本地终端连接远程Colab运行时 {#news-18}

> **Google**发布了**Google Colab**命令行界面（CLI），允许开发者将本地终端连接到远程Colab运行时，从而更便捷地使用高性能计算资源。

该工具支持用户轻松请求高性能GPU，并允许在远程环境中运行本地Python脚本。

开发者可以直接检索工件日志或模型，例如微调的**Gemma 3**适配器。

它具备高度可编程性，可供AI代理使用，旨在简化开发工作流程。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Google 将 Gemini CLI 过渡至新的 Antigravity CLI 代理优先平台 {#news-19}

> Google 宣布将社区聚焦的 `Gemini CLI` 工具过渡到为复杂多代理工作流构建的新平台 `Antigravity CLI`。

**Google** 正在统一其 AI 终端工具，将社区聚焦的 `Gemini CLI` 过渡到新的 `Antigravity CLI`。

`Antigravity CLI` 是一个基于 Go 语言构建的代理优先平台，提供更快的执行速度、异步处理和统一架构。

该架构与 `Antigravity 2.0` 桌面应用程序同步。

企业客户将保持现有访问权限，但个人和免费用户必须在 `2026年6月18日` `Gemini CLI` 停止服务前迁移到新平台。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## 谷歌起诉中国网络犯罪组织，指控其利用AI进行大规模诈骗 {#news-20}

> 谷歌对名为“**Outsider Enterprise**”的中国网络犯罪组织提起诉讼，指控其利用人工智能发送诈骗短信，导致数十万受害者蒙受数百万美元损失。

![谷歌起诉中国网络犯罪组织，指控其利用AI进行大规模诈骗](https://techcrunch.com/wp-content/uploads/2026/06/google-logo.jpg?resize=1200,800)

谷歌在诉讼中指出，**Outsider Enterprise**利用**AI**冒充**谷歌**等品牌，窃取用户密码和信用卡信息。该团伙在两周内部署了9000个虚假网站、100万个欺诈性域名，并向安卓用户发送了250万条短信。

**FBI**与谷歌及**Lumen**的**Black Lotus Labs**合作，查封了该网络犯罪分子使用的多个域名、**Shopify**店铺和账户。

根据**FBI**发言人的说法，自2023年7月以来，该团伙的网络钓鱼平台已窃取至少估计387万张信用卡，造成约19亿美元损失。

谷歌表示，其正使用“**AI驱动的工具**来对抗**AI驱动的诈骗**”，每月拦截超过100亿条诈骗信息。

[查看原文](https://techcrunch.com/2026/06/12/chinese-cybercrime-operation-that-used-ai-to-scam-hundreds-of-thousands-of-victims-sued-by-google/)

---

## Oracle PeopleSoft严重0day漏洞被利用，窃取大量数据 {#news-21}

> 一个名为**ShinyHunters**的组织利用**Oracle PeopleSoft**中的一个严重漏洞，针对约100个客户发动攻击。

该漏洞编号为`CVE-2026-35273`，是一个服务器端请求伪造（SSRF）漏洞，严重性评分为9.8分（满分10分）。

攻击者利用该漏洞窃取了数GB的数据，并已对至少一家受害组织提出勒索要求。

**Oracle**表示该漏洞可远程利用，并已发布临时缓解措施，但尚未发布完全的修复补丁。

[查看原文](https://arstechnica.com/security/2026/06/peoplesoft-0-day-affecting-hundreds-of-organizations-steals-gigabytes-of-data/)

---

## Go语言VPN项目MasterDnsVPN今日涨星400 {#news-22}

> 高级DNS隧道VPN工具 `MasterDnsVPN` 在GitHub Trending上表现抢眼，主打审查规避与高性能。

**MasterDnsVPN** 是一个用于审查规避的高级DNS隧道VPN工具，其性能据称优于DNSTT和SlipStream。

该项目提供低开销ARQ、解析器负载平衡、高丢包稳定性和速度等特性。

项目在GitHub Trending Go语言类别中，已获 6,032 个星标，今日新增 400 个星标，增长迅速。

[查看原文](https://github.com/masterking32/MasterDnsVPN)

---

## 谷歌与FBI就中国AI诈骗网络提起联合诉讼 {#news-23}

> **Google** 与美国 **FBI** 联合提起诉讼，指控一个利用 **AI** 进行欺诈的网络，**OpenAI** 则封锁了相关影响行动集群。

![谷歌与FBI就中国AI诈骗网络提起联合诉讼](https://the-decoder.com/wp-content/uploads/2026/06/PRC-AI-Information-Warfare.png)

**Google** 与 **FBI** 联合提起诉讼，指控一个利用 **AI** 进行欺诈的网络。

与此同时，**OpenAI** 封锁了据称源自中国的、用于秘密影响行动的 **AI** 集群。

报道指出，这两起事件都针对美国基础设施和政治辩论。

相关行动据称起源于中国，但该信息基于指控或声称，尚未被最终确认。

[查看原文](https://the-decoder.com/google-files-first-joint-lawsuit-with-fbi-over-chinese-ai-scam-network-openai-blocks-prc-influence-clusters/)

---

## OpenAI Codex 推出灵活速率限制重置，或引发AI定价战 {#news-24}

> OpenAI 为其 Codex 编码代理推出了灵活的速率限制重置功能，允许用户存储并手动触发重置。

![OpenAI Codex 推出灵活速率限制重置，或引发AI定价战](https://the-decoder.com/wp-content/uploads/2026/04/openai_logo_orange.png)

OpenAI 现已允许 **Codex** 用户存储速率限制重置，并在需要时手动触发它们，而非在固定计划上自动过期。

如果在会话中途达到使用上限，用户可以立即兑换已保存的重置，而无需等待下一个周期。

此功能适用于 **Go**、**Plus**、**Pro** 和 **Business** 计划的用户，每个计划的用户初始可获得一次免费重置。

**Plus** 和 **Pro** 计划用户还可以通过邀请朋友来解锁额外的速率限制重置。

[查看原文](https://the-decoder.com/openai-kicks-off-the-ai-price-wars-with-flexible-rate-limit-resets-for-its-codex-coding-agent/)


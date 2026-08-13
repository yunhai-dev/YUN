---
title: 科技早报 2026-08-13
category: "科技, 科技早报"
excerpt: 英伟达开发Nemotron 4，AI代理与开源项目持续升温，多起供应链及系统安全漏洞受关注。
lastEdited: 2026年8月13日
tags: [AI与机器学习, AI代理, 英伟达, 开源生态, GitHub, 安全与隐私, 软件供应链]
imageUrl: 
---

## 概览

### AI 与机器学习

- [英伟达开发开放权重模型 Nemotron 4](#news-1)
- [基准测试称AI模型发现逾500种未知半导体材料](#news-2)
- [Google Pixel 11 硬件变化有限，新增多项 Gemini 功能](#news-3)
- [OpenAI推出Linux版ChatGPT桌面应用预览版](#news-4)
- [微软发布MAI Code 1.1 Flash，文章称落后DeepSeek](#news-5)
- [SpaceXAI推出Grok Bot常驻式AI代理服务](#news-6)
### GitHub 热门项目

- [TruffleHog 开源工具可扫描多类位置中的泄露凭据](#news-7)
- [GitHub 热门项目 RAGFlow 结合 RAG 与 Agent 能力](#news-8)
- [GitHub 热门项目 rtk 声称可降低大模型令牌消耗](#news-9)
- [GitHub热门项目：NATS高性能云原生消息服务器](#news-10)
- [GitHub 热门项目 ppt-master 用 AI 生成原生演示文稿](#news-11)
- [GitHub 热门项目 MediaCrawler 支持多平台内容采集](#news-12)
### 开源生态

- [Tailscale称SQLite长期缺陷导致多次数据库损坏](#news-13)
- [Fresh作者详述Linux多渠道打包与分发难题](#news-14)
- [Google开源团队邀Render ATL参会者会面Flutter团队](#news-15)
### 开发者工具

- [C 语言终端编码代理 Hax 支持本地模型与多家接口](#news-16)
- [GitHub 单核代码搜索大小写折叠速度超 45 GiB/s](#news-17)
- [Brainfish推出Ballet自然语言生成API自动化工作流](#news-18)
### 安全与隐私

- [LiteLLM供应链攻击或泄露数TB机构凭证](#news-19)
- [研究人员披露Zoom屏幕共享设备接管漏洞](#news-20)
- [研究员披露ShieldBreak Windows提权零日漏洞](#news-21)
- [研究人员展示硬币大小设备攻击波音737方案](#news-22)
### 产品与平台

- [Android Quick Share新增轻触分享功能](#news-23)
- [Google 为 Pixel 11 相机加入 Creator Suite 创作模式](#news-24)
---

## 英伟达开发开放权重模型 Nemotron 4 {#news-1}

> 英伟达正在开发新一代开放权重模型 **Nemotron 4**。该模型旨在与全球最佳的自由可用模型竞争。

![英伟达开发开放权重模型 Nemotron 4](https://the-decoder.com/wp-content/uploads/2026/08/nvidia_logo.png)

**Nemotron 4** 被描述为英伟达正在开发的一款新开放权重模型。

英伟达表示，该模型的目标是参与全球自由可用模型之间的竞争。

[查看原文](https://the-decoder.com/nvidias-nemotron-4-aims-for-one-trillion-parameters-a-scale-chinese-labs-already-surpassed/)

---

## 基准测试称AI模型发现逾500种未知半导体材料 {#news-2}

> **Discovered Materials** 的Material Discovery Bench报告称，7个前沿模型累计发现500多种此前未知的材料，并已公开供进一步研究。

![基准测试称AI模型发现逾500种未知半导体材料](https://discoveredmaterials.com/assets/og-image.png)

Material Discovery Bench面向长周期、开放式研究，衡量前沿大语言模型发现半导体新材料的能力。

页面称，列出的7个模型均可在计算上发现具动态稳定性和有前景性质的新材料。

研究目标是寻找兼具高热导率等多目标属性的介电材料，以支持3D芯片封装并改善散热。

研究运行持续3000万至1亿个token。榜单显示，`GPT-5.6 Sol` 每次运行发现材料数最高，为4.0。

在500多种发现材料中，目前仅1种被认为具有可行合成路径，团队正尝试在实验室制备；实验验证仍在进行。

[查看原文](https://discoveredmaterials.com/research/)

---

## Google Pixel 11 硬件变化有限，新增多项 Gemini 功能 {#news-3}

> **Google** 的 **Pixel 11** 系列在设计和内部硬件上与上一代差异不大，重点新增多项 **Gemini** 功能。部分功能及性能数据为 Google 的介绍或宣称，可用范围可能受地区、机型和条件限制。

![Google Pixel 11 硬件变化有限，新增多项 Gemini 功能](https://techcrunch.com/wp-content/uploads/2026/08/Pixel-11-Pro-XL-feat.jpg?resize=1200,675)

美国用户可通过 **Gemini** 订购杂货、预订网约车及购买咖啡，也可让其代表用户致电商家预订餐桌或服务。用户可随时接管或停止任务，并查看人工智能电话操作的转录内容。

新机支持视频、播客和语音消息的目标语言翻译，并提供通过 **Gemini** 将手语转为文字的无障碍功能。**Rambler** 听写产品也被引入 Pixel 手机。

相机加入 **Circle to Search** 与 **Magic Capture**。后者可在用户按下开始和结束之间拍摄的大量画面中选择最佳帧，并自动裁剪和消除模糊。

**Pixel 11 Pro** 的超级变焦由 100 倍升至 120 倍，基础款由 20 倍升至 30 倍。Pro 还新增 `Instant Night Sight`；Google 称其耗时比上一代少 4.5 倍，并支持经 `Video Boost` 改善稳定性的 8K 视频。

[查看原文](https://techcrunch.com/2026/08/12/pixel-11-has-few-hardware-changes-and-more-gemini/)

---

## OpenAI推出Linux版ChatGPT桌面应用预览版 {#news-4}

> OpenAI发布面向Linux的ChatGPT桌面应用预览版，将ChatGPT、ChatGPT Work和Codex编程代理整合到一个软件包中。该应用已在全球范围内推出。

![OpenAI推出Linux版ChatGPT桌面应用预览版](https://the-decoder.com/wp-content/uploads/2026/07/linux.png)

应用支持Ubuntu 24.04和26.04 LTS、Debian 13、Fedora 43和44。

OpenAI为x64和ARM64架构提供`.deb`和`.rpm`软件包。

应用包含内置浏览器、Chrome扩展程序和语音控制功能。

目前暂不支持原生计算机使用，Appshots、Record & Replay及桌面语音命令也不会在发布时提供。

[查看原文](https://the-decoder.com/openai-launches-chatgpt-desktop-app-for-linux/)

---

## 微软发布MAI Code 1.1 Flash，文章称落后DeepSeek {#news-5}

> **微软**发布代码模型`MAI Code 1.1 Flash`，文中称其面向**GitHub Copilot**。报道同时称，`DeepSeek V4 Flash`在所述基准中价格更低且表现更优。

![微软发布MAI Code 1.1 Flash，文章称落后DeepSeek](https://the-decoder.com/wp-content/uploads/2026/06/microsoft_logo_red_pink.png)

据报道，`MAI Code 1.1 Flash`的令牌效率较前代提升25%，成本约为前代的四分之一。

文章称，在基准测试中，`DeepSeek V4 Flash`的价格低于`MAI Code 1.1 Flash`，且性能表现更好。

原文未提供成本计算方式、令牌效率口径，以及基准测试的方法、指标或具体数据，因此相关比较仅为文章陈述。

[查看原文](https://the-decoder.com/microsofts-new-mai-code-1-1-flash-gets-crushed-by-deepseek-on-both-price-and-performance/)

---

## SpaceXAI推出Grok Bot常驻式AI代理服务 {#news-6}

> **SpaceXAI** 推出常驻式 AI 代理服务 **Grok Bot**，将其定位为可独立接收工作任务的“AI 队友”。用户需授权其登录既有在线账户，以完成多步骤任务。

![SpaceXAI推出Grok Bot常驻式AI代理服务](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/Grok-Bot-desktop-and-iOS.jpg?quality=90&strip=all&crop=0,0,100,100)

**Grok Bot** 为各机器人提供共享的云端计算机环境，并可登录用户已使用的应用、工具和网站。

服务通常会在任务完成或需要用户审批时再返回结果，定位为可被分配工作的常驻代理。

报道指出，这是 Elon Musk 的 AI 公司面向企业服务追赶竞争对手的最新举措，并提及 **OpenAI** 的 **ChatGPT Work**、**Anthropic** 的 **Claude Cowork** 及微软相关服务。

报道同时称，SpaceXAI 对服务名称使用 `Grok Bot` 或 `Grok Bots` 的表述并不一致。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/978666/spacexai-grok-bot-ai-agent-beta-launch)

---

## TruffleHog 开源工具可扫描多类位置中的泄露凭据 {#news-7}

> **trufflesecurity/trufflehog** 是一个用于发现、分类、验证和分析机密信息的公开 GitHub 仓库。其可查找 API 密钥、数据库密码和私有加密密钥等凭据。

![TruffleHog 开源工具可扫描多类位置中的泄露凭据](https://repository-images.githubusercontent.com/77726177/4bac5782-b7e4-44fe-bc89-46cc69e9f36a)

TruffleHog 将 secret 定义为机器用于向另一台机器进行身份验证的凭据。

该工具可在 Git、聊天工具、Wiki、日志、API 测试平台、对象存储和文件系统等位置查找机密信息。

TruffleHog 可对超过 800 种机密类型进行分类，并映射到其所属的特定身份。

**TruffleHog Enterprise** 可持续监控 Git、Jira、Slack、Confluence、Microsoft Teams 和 SharePoint 中的凭据。文中称其可验证机密是否仍有效，但具体能力取决于机密类型及可访问性。

[查看原文](https://github.com/trufflesecurity/trufflehog)

---

## GitHub 热门项目 RAGFlow 结合 RAG 与 Agent 能力 {#news-8}

> **infiniflow/ragflow** 入选 GitHub Trending，主要使用 Go 语言开发。该项目是一个开源检索增强生成引擎，将 RAG 与 Agent 能力结合。

**infiniflow/ragflow** 当前拥有 87,359 个 Stars，当天新增 85 个。

RAGFlow 是一个开源的检索增强生成（RAG）引擎。

项目将 RAG 与 Agent 能力结合，用于为 LLM 创建上下文层。

[查看原文](https://github.com/infiniflow/ragflow)

---

## GitHub 热门项目 rtk 声称可降低大模型令牌消耗 {#news-9}

> GitHub Trending 上的 Rust 项目 **rtk-ai/rtk** 是一个 CLI proxy，项目描述声称其可在常见开发命令中减少 60% 至 90% 的大语言模型令牌消耗。

**rtk** 以单个 Rust 二进制文件提供，且不需要依赖。

项目当前拥有 75,832 个 Stars，当天新增 233 个 Stars。

上述令牌消耗减少比例属于项目描述中的声明，原文未提供具体测试条件。

[查看原文](https://github.com/rtk-ai/rtk)

---

## GitHub热门项目：NATS高性能云原生消息服务器 {#news-10}

> **nats-io/nats-server** 是 NATS.io 的高性能服务器项目，面向云端和边缘原生消息系统。NATS 被描述为连接数字系统、服务和设备的通信系统。

![GitHub热门项目：NATS高性能云原生消息服务器](https://repository-images.githubusercontent.com/6443435/ac1f0d00-d7e9-11eb-8193-83a08bd77530)

NATS 强调简单、安全和高性能，并属于 Cloud Native Computing Foundation（CNCF）。

该系统拥有超过 40 种客户端语言实现，服务器可运行于本地环境、云端、边缘及 Raspberry Pi。

仓库源文件除非另有说明，采用 Apache License 2.0 许可证。

Trail of Bits 受 OSTIF 委托，于 2025 年 4 月完成了对 NATS 的第三方安全审计。

[查看原文](https://github.com/nats-io/nats-server)

---

## GitHub 热门项目 ppt-master 用 AI 生成原生演示文稿 {#news-11}

> **hugohe3/ppt-master** 入选 GitHub Trending，主要使用 Python 开发。项目使用 AI 将文档或主题转换为原生 PowerPoint 演示文稿。

**hugohe3/ppt-master** 当前拥有 45,101 个 Stars，当天新增 364 个。

项目生成的演示文稿支持原生形状、过渡效果和动画。

用户可按需生成由数据支持的图表和表格，也可使用自有 `.pptx` 模板。

项目还支持根据演讲者备注生成音频旁白。

[查看原文](https://github.com/hugohe3/ppt-master)

---

## GitHub 热门项目 MediaCrawler 支持多平台内容采集 {#news-12}

> GitHub Trending 上的 Python 项目 **NanmiCoder/MediaCrawler** 支持采集多个内容平台的数据。项目当天新增 855 个 Stars。

项目支持爬取小红书笔记及评论、抖音视频及评论，以及快手视频及评论。

其支持内容还包括 B 站视频及评论、微博帖子和百度贴吧帖子及评论回复。

项目同时支持知乎问答文章及评论，目前拥有 61,813 个 Stars。

[查看原文](https://github.com/NanmiCoder/MediaCrawler)

---

## Tailscale称SQLite长期缺陷导致多次数据库损坏 {#news-13}

> Tailscale表示，其服务此前出现的多次稳定性问题中，有许多中断由SQLite数据库缺陷引起。公司称经过数月取证调查后已找到并修复该问题。

![Tailscale称SQLite长期缺陷导致多次数据库损坏](https://tailscale.com/api/og-image?id=45389fc1-da6e-4e0d-82f6-140651c6ba57)

Tailscale控制平面由多个协调服务器或分片组成，每个分片使用SQLite数据库保存对应tailnet的信息。每个数据库由单个Go进程独占访问。

Tailscale的备份流程每隔几分钟创建数据库完整快照，并将整个SQLite文件上传至S3存储桶。

公司在备份上执行SQLite的`PRAGMA integrity_check`命令后发现数据库损坏，并称六个月内共发生19次独立损坏事件。

Tailscale称相关数据库只包含tailnet和设备元数据，不包含用户的私有加密密钥；其修复结论来自公司自身披露。

[查看原文](https://tailscale.com/blog/sqlite-wal-reset-bug)

---

## Fresh作者详述Linux多渠道打包与分发难题 {#news-14}

> **Fresh** 作者称，希望让所有用户都能方便安装该软件，但 Linux 生态不存在适用于所有人的单一发布方式。项目目前已覆盖多种包管理器和二进制分发渠道。

![Fresh作者详述Linux多渠道打包与分发难题](https://getfresh.dev/docs/logo.svg)

作者目前通过 `winget` 发布 Windows 版本，通过 **Homebrew** 发布 macOS 版本；Fresh 也曾以 `npm` 包形式发布。

作者列举了 `npm` 的安全事件、部分用户未安装 npm，以及安装和更新流程复杂等问题。

Fresh 目前提供 `crates.io`、`AppImage`、`Flatpak`、`deb`、`rpm`、AUR、Nix、`mise`、预编译 `tarball` 等渠道。

作者支持 Nix，但指出部分用户未安装或不愿只为使用 Fresh 而安装它；每种发布方式都只能覆盖部分用户。

作者认为 `Flatpak` 更适合自包含桌面 GUI，Fresh 作为可访问机器与网络的终端 TUI 并不适配；`AppImage` 还面临 FUSE、启动速度及 libc 兼容性限制。

[查看原文](https://getfresh.dev/docs/blog/packaging-for-linux/)

---

## Google开源团队邀Render ATL参会者会面Flutter团队 {#news-15}

> **Google Open Source** 邀请参加 Render ATL 的人士前往13号展位，与 **FlutterDev** 团队交流。团队表示希望讨论参会者正在构建的项目及开源话题。

**Google Open Source** 发布消息称，参加 Render ATL 的人士可前往13号展位与 **FlutterDev** 团队会面。

该团队希望与参会者交流正在构建的项目，以及开源相关话题。

该帖使用了 `RenderATL`、`Flutter` 和 `OpenSource` 标签。

[查看原文](https://bsky.app/profile/opensource.google/post/3msvc2hn4xh2z)

---

## C 语言终端编码代理 Hax 支持本地模型与多家接口 {#news-16}

> **Hax** 发布为一款以 C 编写的终端原生轻量级编码代理，提供单一原生二进制文件。其支持本地模型，以及 OpenAI、Anthropic、Codex 等接口与服务。

![C 语言终端编码代理 Hax 支持本地模型与多家接口](https://usehax.dev/demo-card.png)

**Hax** 面向 Linux 和 macOS，Windows 用户可通过 WSL 使用。项目称其依赖较少，启动后内存占用仅数 MB。

该工具可自动发现本地模型和运行时能力，文档示例采用 `llama.cpp` 的 `llama-server` 与 GGUF 模型。

终端界面支持流式 Markdown 和实时工具输出，仅重绘当前流式行或输入区，同时保留终端原生滚动记录。

用户可通过 `Ctrl+T` 查看发送给模型的内容及回复记录，并可选收集详细线路协议跟踪。它还提供 REPL、单次提示、标准输入、继续及恢复会话等用法。

项目支持通过 Homebrew 安装，也可下载 x86_64、aarch64 预编译静态二进制文件，或从源代码构建。

[查看原文](https://usehax.dev/)

---

## GitHub 单核代码搜索大小写折叠速度超 45 GiB/s {#news-17}

> **GitHub** 表示，其代码搜索可在单个 CPU 核心上以超过 45 GiB/s 的速度处理字节并完成大小写折叠。此次优化的最大收益来自移除提前退出分支。

**GitHub** 称，代码搜索的大小写折叠处理速度在单核 CPU 上超过 45 GiB/s。

该公司表示，性能优化中最显著的收益并非来自增加分支，而是移除了一个提前退出分支。

相关帖文链接至 **GitHub Engineering** 的相关文章。

[查看原文](https://bsky.app/profile/github.com/post/3msvsjynzgy2e)

---

## Brainfish推出Ballet自然语言生成API自动化工作流 {#news-18}

> **Brainfish** 团队推出工作流自动化平台 **Ballet**，用户可通过自然语言描述跨系统目标，由平台构建、运行和维护自动化流程。Ballet 称可为任意 API 编写集成，并生成可审查、可版本控制的代码。

![Brainfish推出Ballet自然语言生成API自动化工作流](https://ballet.dev/og-v2.png)

平台列出的场景包括将营销线索录入 CRM、结合产品使用数据进行信息丰富与评分，并将结果路由给相关人员。

**Ballet** 还展示了账户增长检测、订单变更自动同步等 Revenue Ops 与 Sales Ops 工作流。

平台表示，在需要准确性的环节，工作流代码具有确定性；仅在适合灵活判断的步骤采用代理式推理。

早期访问面向受工程排期制约、且拥有真实多系统工作流的 RevOps、Support Ops 及产品驱动增长团队。文中未提供完整的安全与合规说明。

[查看原文](https://www.ballet.dev/)

---

## LiteLLM供应链攻击或泄露数TB机构凭证 {#news-19}

> 开源工具**LiteLLM**遭遇供应链攻击，数TB凭证被暴露，涉及多家机构。安全公司称，受影响范围可能超过2500家组织。

**CloudSEK**称，泄露信息包括云密钥、代码仓库令牌、SSH密钥、Kubernetes密钥、软件包发布凭证、环境变量及AI提供商密钥。

暴露凭证涉及微软、亚马逊、思科、三星和Salesforce等机构，可能使攻击者访问超过2500家组织。

这些凭证在3月约40分钟内被提取，当时受害者下载并使用了来自Python Package Index官方位置的被篡改`LiteLLM`版本。

**Hudson Rock**在分析获得的一份195TB文件后发现此事；该文件来源尚未被CloudSEK和Hudson Rock确认。两家公司分别于周二和周三披露此事。

[查看原文](https://arstechnica.com/security/2026/08/terabytes-of-credentials-leaked-in-massive-supply-chain-attack/)

---

## 研究人员披露Zoom屏幕共享设备接管漏洞 {#news-20}

> 研究人员披露了**Zoom**视频会议平台中的漏洞，这些漏洞可能被用于接管目标设备。涉及屏幕共享的通话中，参与者和主持人都可能受到无提示、无需交互的攻击影响。

数字防御公司A Security称，其研究人员于6月初借助公开可用的AI模型发现了该漏洞。

A Security表示，发现漏洞并创建可用攻击所需的提示词少于20条。

Zoom于周二发布安全公告，并已开始推出用于修复漏洞的更新。

受影响设备涵盖Zoom支持的Windows、macOS、Linux、iOS和Android系统。漏洞是否会被实际利用仍不确定，修复措施也仍在推出中。

[查看原文](https://arstechnica.com/security/2026/08/researchers-found-a-way-to-hijack-devices-through-zoom-screen-sharing/)

---

## 研究员披露ShieldBreak Windows提权零日漏洞 {#news-21}

> 安全研究员**Nightmare Eclipse**披露`ShieldBreak`漏洞，称其可借助Windows Defender缺陷获得设备及数据的完全访问权限。截至报道发布时，微软尚未推出补丁。

![研究员披露ShieldBreak Windows提权零日漏洞](https://techcrunch.com/wp-content/uploads/2022/06/moshed-windows-11.jpg?resize=1200,752)

`ShieldBreak`被描述为Windows本地提权漏洞：攻击者可从低权限用户提升至对设备及其数据的完全访问权限。漏洞利用了内置安全引擎**Windows Defender**中的缺陷。

研究人员发布了Windows应用形式的概念验证程序，用户须运行该应用才能触发漏洞利用。研究员**Will Dormann**验证该漏洞可运行，并指出需启用Windows Defender。

据研究人员说法，受影响系统包括`Windows 10`、`Windows 11`（含最新`25H2`版本）及`Windows Server 2025`。

该漏洞是此前`RoguePlanet`漏洞利用的延伸。微软曾为`RoguePlanet`发布补丁，但研究人员暗示此前修复不足以阻止最新利用方式。

截至文章发布时，微软尚未发布`ShieldBreak`补丁，且未及时回应置评请求。有关漏洞报告处理和法律威胁的部分说法，尚未获微软回应确认。

[查看原文](https://techcrunch.com/2026/08/12/after-microsoft-threatened-legal-action-a-security-researcher-publishes-a-new-windows-zero-day-bug/)

---

## 研究人员展示硬币大小设备攻击波音737方案 {#news-22}

> 加州大学圣迭戈分校和欧柏林学院研究人员计划展示一项针对波音737的攻击技术。研究人员称，该技术可能劫持自动驾驶仪或篡改关键计算结果，但需要物理接触飞机端口。

![研究人员展示硬币大小设备攻击波音737方案](https://media.wired.com/photos/6a7b8712e3ffed826d9fc902/191:100/w_1280,c_limit/Security_60%20Seconds%20of%20Access%20and%20This%20Coin-Sized%20Device%20Can%20Hack%20an%20Airplane_v1.jpg)

研究团队制造了一款支持Wi‑Fi、成本低于100美元的硬币大小原型设备。

研究人员称，设备可在不到一分钟内装入飞机外部舱口可接触端口。

装入后，设备可向波音737内部网络发送电信号，伪造发往敏感系统的指令。

该项目历时超过十年，由UCSD教授Stefan Savage等人领导，并使用价值数万美元的飞机部件测试。

[查看原文](https://www.wired.com/story/this-coin-sized-device-can-hack-a-boeing-737/)

---

## Android Quick Share新增轻触分享功能 {#news-23}

> Android的Quick Share将支持通过轻触两台设备交换文件和联系人信息。Google表示，该更新已开始面向Pixel 6系列及更新机型推出。

![Android Quick Share新增轻触分享功能](https://platform.theverge.com/wp-content/uploads/sites/2/2026/01/DSC02339_processed.jpg?quality=90&strip=all&crop=0,0,100,100)

该功能使用NFC和设备间的近距离感应，简化无线分享流程。

用户打开分享菜单并将两台设备靠近后，可发送联系人资料、照片和视频等内容。

Google称该功能很快将推广至Samsung Galaxy Z Fold 8 Ultra、Fold 8和Flip 8，并计划在年底前扩展至更多Android设备。

[查看原文](https://www.theverge.com/tech/978613/android-quick-share-tap-update-pixels-samsung)

---

## Google 为 Pixel 11 相机加入 Creator Suite 创作模式 {#news-24}

> **Google** 在 **Pixel 11** 相机应用中推出 `Creator Suite`，面向内容创作者提供录制、整理、编辑和发布辅助功能。文章未提供实际使用效果或市场份额变化数据。

![Google 为 Pixel 11 相机加入 Creator Suite 创作模式](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/Google-Pixel-11-Creator-Suite-2.jpg?quality=90&strip=all&crop=0,0,100,100)

Google 将创作者视为 Pixel 的重要用户群体，并认为争取具有影响力的创作者可能对 Pixel 市场份额产生影响。

Google 表示，新款 Pixel 系列加入的功能旨在帮助创作者更快完成内容录制、整理、编辑与发布。

内置于 **Pixel 11** 相机应用的 `Creator Suite` 包含提词器、声音增强器和外接麦克风音量控制。

该模式还提供适配社交媒体画面的构图参考线，以辅助内容拍摄与发布。

[查看原文](https://www.theverge.com/tech/977888/pixel-creator-suite-influencer-camera-features)


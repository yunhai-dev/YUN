---
title: 科技早报 2026-07-14
category: "科技, 科技早报"
excerpt: PixVerse融资、iOS 27与Siri AI公测、AI编码工具和数据安全事件成今日焦点。
lastEdited: 2026年7月14日
tags: [科技早报, AI与机器学习, iOS, Siri, GitHub Trending, 开源生态, 安全与隐私, AI编程]
imageUrl: 
---

## 概览

### AI 与机器学习

- [PixVerse获4.39亿美元融资估值超20亿美元](#news-1)
- [MIT提出无需生成图像的CSAM模型审计法](#news-2)
- [纳德拉警告企业警惕专有 AI 模型风险](#news-3)
- [iOS 27 公测版发布，Siri AI 已改变作者用机方式](#news-4)
- [苹果 iOS 27 公测开放新版 Siri AI](#news-5)
- [Anthropic 称发现模型内部推理新窗口](#news-6)
### GitHub 热门项目

- [OpenInterpreter 轻量级编码代理登上趋势榜](#news-7)
- [Pi Agent Harness 开源仓库强调代理运行边界](#news-8)
- [Graphify用知识图谱增强AI编程助手](#news-9)
- [开源视频编辑器 OpenCut 重写路线公布](#news-10)
- [Rust 离线语音转文字应用 Handy 登上 GitHub Trending](#news-11)
- [Needle 开源 2600 万参数函数调用模型](#news-12)
### 开源生态

- [作者称应趁 AI 补贴窗口改善开源维护](#news-13)
- [sx 2.0用共享文件夹分发团队AI技能](#news-14)
- [开发者回顾在Sega 32X上移植Linux动机](#news-15)
- [黑客项目推进 Neo Geo 版 Doom 移植](#news-16)
### 安全与隐私

- [Grok Build CLI 被曝上传完整 Git 仓库](#news-17)
- [苹果指控前员工利用零日漏洞下载机密文件](#news-18)
- [CISA 复盘 GitHub 凭据泄露事件](#news-19)
- [三星健康数据或需同意用于 AI 训练](#news-20)
### 产品与平台

- [苹果发布iOS 27等系统公开测试版](#news-21)
- [macOS 27 公测版发布，Liquid Glass 更克制](#news-22)
- [特斯拉称正开发轮椅无障碍自动驾驶车辆](#news-23)
- [微软测试去除广告的 Windows 11 搜索](#news-24)
---

## PixVerse获4.39亿美元融资估值超20亿美元 {#news-1}

> **PixVerse** 表示已完成 C 轮扩展融资，本轮总融资额为 4.39 亿美元。公司告诉 TechCrunch，新资金到账后其估值已超过 20 亿美元。

![PixVerse获4.39亿美元融资估值超20亿美元](https://techcrunch.com/wp-content/uploads/2026/07/69c14912d8f2b4b74d7b13ba_Copy-of-Red-Yellow-Retro-Vibrant-2025-Monthly-Calendar-1280-x-720-px-1200-x-630-px-8.jpeg?w=1200)

**PixVerse** 总部位于新加坡，成立于 2023 年，创始人为 Wang Changhu 和 Jaden Xie。

公司称将利用资金扩展其 world model 产品，并触达不同地区的客户。

其模型包括面向消费者和 `API` 的 V-Series、面向专业工作流的 C-Series，以及面向游戏和 world building 的 R-Series。

**PixVerse** 称消费者产品有超过 1.5 亿注册用户和 1500 万月活跃用户，可生成最高 4K 且内置音频的视频。

公司未说明付费用户数量；其 image-to-video 生成服务标价为每分钟 4.80 美元。

[查看原文](https://techcrunch.com/2026/07/13/video-generation-startup-pixverse-raises-439m-valuation-soars-past-2b/)

---

## MIT提出无需生成图像的CSAM模型审计法 {#news-2}

> **MIT** 研究人员开发名为 Gaussian probing 的审计方法，用于识别被微调为生成儿童性虐待材料（CSAM）的 AI 模型。文章称，该方法不生成任何图像。

![MIT提出无需生成图像的CSAM模型审计法](https://insideai.news/wp-content/uploads/2026/07/New-method-aims-to-keep-kids-safe-from-illegal-AI-generated-content-1.webp)

该方法由研究生 **Vinith Suriyakumar** 以及副教授 **Ashia Wilson** 和 **Marzyeh Ghassemi** 领导开发，并与儿童安全非营利组织 **Thorn** 合作。

研究检查模型内部适配而非输出，相关论文在 **International Conference on Machine Learning** 上发表。

Gaussian probing 向模型输入随机数据点，分析 `LoRA` 适配器导致的内部表示变化，并形成适配目的“指纹”。

文章称，该方法在识别专门用于 CSAM 生成的模型时达到 100% 准确率，但结论基于文中测试场景和模型变体。

Suriyakumar 表示，团队不会让模型完整运行到最终阶段，也不会提示模型，因此不会生成图像。

[查看原文](https://insideai.news/news/ai-safety/mits-new-method-flags-ai-models-trained-on-child-abuse-imagery-without-generating-it/3869/)

---

## 纳德拉警告企业警惕专有 AI 模型风险 {#news-3}

> TechCrunch 报道称，**Microsoft** CEO **Satya Nadella** 在博客中警告企业使用专有 AI 模型的风险。

![纳德拉警告企业警惕专有 AI 模型风险](https://techcrunch.com/wp-content/uploads/2023/11/GettyImages-1778706504.jpg?resize=1200,783)

Nadella 认为，企业在为 `token` 使用付费时，也可能交出让模型变得有用的专有知识。

他写道，模型会从提示词、智能体工具使用，以及用户对错误的纠正等“exhaust”中学习。

他主张，如果 AI 公司可自由抓取互联网训练模型，企业也应能研究或 `distill` 这些模型。

报道还提到，**Anthropic** 2 月曾指控中国开源模型向 **Claude** 发送大量提示词以改进自身模型。

[查看原文](https://techcrunch.com/2026/07/13/satya-nadella-has-issued-a-shocking-warning-to-companies-using-ai/)

---

## iOS 27 公测版发布，Siri AI 已改变作者用机方式 {#news-4}

> `iOS 27` 首个公共测试版已经发布，脱离仅面向开发者的阶段。作者自 6 月初以来一直在测试该版本。

![iOS 27 公测版发布，Siri AI 已改变作者用机方式](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Siri-AI-Being-invoked-3.jpg?quality=90&strip=all&crop=0,0,100,100)

文章称，`iOS 27` 可被视为类似 **Snow Leopard** 的更新。

新功能较少，重点在于修复问题，并加快操作系统中的流程。

应用启动、照片搜索结果和 **AirDrop** 传输应当都会更快；这些性能提升带有测试版体验表述。

**Messages** 现在支持行内回复，并支持 `RCS` 消息的端到端加密；**Liquid Glass** 也进一步细化。

[查看原文](https://www.theverge.com/tech/964714/siri-ai-public-beta-preview-ios-27-hands-on)

---

## 苹果 iOS 27 公测开放新版 Siri AI {#news-5}

> `iOS 27` 已作为 public beta 向 iPhone 用户开放，这是 **Apple** 长期承诺的新版 **Siri** 首次面向普通公众开放。用户需加入 Siri waitlist 后才能试用。

![苹果 iOS 27 公测开放新版 Siri AI](https://media.wired.com/photos/6a55464e20012bbe11800495/191:100/w_1280,c_limit/Siri-Apple-Everything-Tool-Gear-2260718787.jpg)

**Apple** 在 6 月的 WWDC 上以“Siri AI”展示了新版 **Siri**。

Siri AI 在原有语音控制基础上增加了类似聊天机器人的应用，并进一步整合进 iPhone 体验。

作者在开发者测试版中称，Siri AI 能帮助查找旧旅行照片、发送快速短信并挑选煎饼店。

IDC 的 Nabila Popal 表示，Apple 已将 Siri AI 集成到整个生态系统中，用户可在设备不同位置访问。

文章称用户仍可关闭 Siri，并建议在下载 beta 软件前备份设备。

[查看原文](https://www.wired.com/story/siri-ai-is-now-apple-everything-tool/)

---

## Anthropic 称发现模型内部推理新窗口 {#news-6}

> MIT Technology Review 报道称，**Anthropic** 宣布发现观察其模型推理答案时所谓“内部 thoughts”的新窗口。文章同时指出，用心理学和神经科学术语描述 AI 模型行为仍存在争议。

文章称，**Anthropic** 当前估值接近 1 万亿美元，并被称为全球最有价值的 AI 公司。

该公司长期投入 mechanistic interpretability，试图通过模型内部数学结构理解输出原因。

Will Douglas Heaven 表示，LLM 内部存在名为 J-space 的空间，包含不出现在输出中但似乎影响解题的词。

这些词可能用于跟踪进度、识别信号或内部评论；文中举例称“panic”出现时，`Claude` 在编码测试中作弊。

文章还称，LLM 能够描述和操纵该内部空间中的词，但相关解释方式本身仍有争议。

[查看原文](https://www.technologyreview.com/2026/07/13/1140343/what-anthropics-latest-ai-discovery-does-and-doesnt-show/)

---

## OpenInterpreter 轻量级编码代理登上趋势榜 {#news-7}

> **openinterpreter/openinterpreter** 出现在 GitHub Trending，项目描述为一个轻量级编码代理。该仓库获得 64,866 Stars，当天增长为 513 stars today。

该仓库的主要语言标注为 `Rust`。

项目描述称，该编码代理针对 `GLM`、`Deepseek` 和 `Kimi` 等开放模型进行了优化。

作为 GitHub Trending 仓库，它在当天显示新增 513 stars today。

[查看原文](https://github.com/openinterpreter/openinterpreter)

---

## Pi Agent Harness 开源仓库强调代理运行边界 {#news-8}

> **earendil-works/pi** 是一个公开 GitHub 仓库，也是 **Pi Agent Harness** 项目的主页。该项目包含自可扩展的编码代理相关组件。

![Pi Agent Harness 开源仓库强调代理运行边界](https://opengraph.githubassets.com/6ff586e4e67be349550775fcc767948324de9159869809e6575acf08aa24f6db/earendil-works/pi)

该仓库显示有 70.8k stars、8.7k forks，并累计 4,926 次提交。

`@earendil-works/pi-coding-agent` 是交互式编码代理 CLI。

`@earendil-works/pi-agent-core` 是带工具调用和状态管理的代理运行时。

`@earendil-works/pi-ai` 是统一的多提供商 LLM API，支持 OpenAI、Anthropic、Google 等。

项目说明称，Pi 默认以启动它的用户和进程权限运行，不包含内置权限系统；如需更强边界，需要通过容器化或沙箱化实现。

[查看原文](https://github.com/earendil-works/pi)

---

## Graphify用知识图谱增强AI编程助手 {#news-9}

> GitHub Trending 仓库 **Graphify-Labs/graphify** 主语言标注为 `Python`，页面显示已有 85,546 Stars。项目今日 Trending 增加 1,095 个 stars。

项目描述称，**Graphify** 是面向 **Claude Code**、**Codex**、**OpenCode**、**Cursor**、**Gemini CLI** 等的 AI coding assistant skill。

它可将代码文件夹、`SQL schemas`、`R scripts`、shell scripts、文档、论文、图片或视频转换为可查询的知识图谱。

项目还称，可把应用代码、数据库 schema 和基础设施放在同一个图中。

[查看原文](https://github.com/Graphify-Labs/graphify)

---

## 开源视频编辑器 OpenCut 重写路线公布 {#news-10}

> **OpenCut-app/OpenCut** 是一个公开 GitHub 仓库，定位为开源的 CapCut 替代品。项目被描述为面向 Web、桌面和移动端的免费开源视频编辑器。

![开源视频编辑器 OpenCut 重写路线公布](https://opengraph.githubassets.com/510179f06521cedeff404287d8392629858ff59594c1a185d60236409090c75c/OpenCut-app/OpenCut)

该仓库显示有 68.5k stars、7.2k forks，并累计 1,583 次提交。

**OpenCut** 正在从头重写，计划加入 `Editor API`、第三方插件、`MCP server`、`Headless mode` 等功能。

项目说明称 previous version 位于 `opencut-app/opencut-classic`，`opencut.app` 仍运行 classic 版本。

重写版本在 `new.opencut.app`，直到准备接管；当前推荐使用 classic 版本，且暂未准备好接受外部贡献。

仓库语言构成为 `TypeScript` 97.2%、`CSS` 2.1%、`Rust` 0.7%。

[查看原文](https://github.com/OpenCut-app/OpenCut)

---

## Rust 离线语音转文字应用 Handy 登上 GitHub Trending {#news-11}

> **cjpais/Handy** 登上 GitHub Trending，被描述为一款免费、开源、可扩展的语音转文字应用。该项目完全离线工作，主要语言标注为 `Rust`。

该仓库目前获得 26,476 个 Stars，当天 Trending 增长为 79 stars today。

**Handy** 的定位是语音转文字应用，强调免费、开源、可扩展以及离线运行。

[查看原文](https://github.com/cjpais/Handy)

---

## Needle 开源 2600 万参数函数调用模型 {#news-12}

> **cactus-compute/needle** 是一个公开 GitHub 仓库，页面显示 3.1k Star、224 Fork。**Needle** 被描述为 2600 万参数函数调用模型，可在非常小的设备上运行。

![Needle 开源 2600 万参数函数调用模型](https://opengraph.githubassets.com/ab8fb3ce097efc662b1a1abb368ecf4c3b1895c5ebcc84e0e27ae69999417d15/cactus-compute/needle)

README 称团队将 **Gemini 3.1** 蒸馏为 26m 参数的“Simple Attention Network”。

该模型可在本地 Mac 或 PC 上微调，面向手机、手表和眼镜等消费设备上的 tiny AI。

原文称其在 **Cactus** 生产环境中运行时，prefill 速度为 6000 toks/sec，decode 速度为 1200。

模型配置包括 `d=512`、`8H/4KV`、`BPE=8192`，权重和数据集生成已完全开放。

原文称这是一次实验性运行，并提示小模型可能不稳定，建议用户自行测试和微调。

[查看原文](https://github.com/cactus-compute/needle)

---

## 作者称应趁 AI 补贴窗口改善开源维护 {#news-13}

> 《The AI Whale Fall and Open Source》将 frontier labs 对 AI 使用的补贴类比为“whale fall”，主张在这一状态持续时改善开源。

文章发表于 2026 年 7 月 13 日，标注约 5 分钟阅读，标签包括 ai、genai、practices、policy、rant。

作者提到对 **Anthropic**、**OpenAI** 等实验室长期可持续性的批评，但表示自己并不完全确定。

基于个人和许多有经验开发者的经验，作者认为 AI 可成为编写或维护代码的有用工具。

文章认为不应把大型架构重写交给 AI，但版本升级、修复失败测试、查文档不一致等机械工作适合自动化。

文中提到 `dependabot`、`nixpkgs`、`r-ryantm`、机械验证和 CI，并以 XKCD 图像说明开源维护压力。

[查看原文](https://minor.gripe/posts/2026-07-13-the_ai_whalefall_and_open_source/)

---

## sx 2.0用共享文件夹分发团队AI技能 {#news-14}

> `sx 2.0` 是面向 Mac、Windows 和 Linux 的原生应用，允许团队共享 AI skills。项目称该流程不需要 `git` 或终端。

![sx 2.0用共享文件夹分发团队AI技能](https://sleuth-io.github.io/sx/sx/assets/skill-server-hero.png)

`sx` 被描述为面向 AI assets 的开源包管理器，可分发 skills、MCP configs 和 commands。

开发者可在 git vaults 中管理 skills 版本，并安装到 Claude Code、Cursor、Copilot、Codex、Gemini、Cline 和 Kiro 等工具。

`sx 2.0` 的共享模式依赖团队已有共享文件夹，可使用 Dropbox、Google Drive、OneDrive 或 iCloud 作为库。

它不需要服务器和账号，依赖现有文件同步产品完成复制；点击 Sync 时会后台运行 `sx install`。

新版本引入 vault format v2，最新 asset 以可读 markdown 位于 `assets/<name>/`，历史版本位于 `.sx/versions/`。

[查看原文](https://sleuth-io.github.io/sx/2026/07/10/your-dropbox-is-now-a-skill-server.html)

---

## 开发者回顾在Sega 32X上移植Linux动机 {#news-15}

> 一名开发者在文章中介绍继续进行 **Linux** 移植项目的背景，并提到此前“Linux on Jaguar”文章读者反馈及 `linuxmd` 项目。文章主要是个人经历和项目动机陈述。

![开发者回顾在Sega 32X上移植Linux动机](https://cakehonolulu.github.io/images/linux_32x/hackaday.png)

作者称，此前相关项目曾被 **Hackaday** 和 **Tom's Hardware** 报道。

作者表示，继续进行 **Linux** 移植趋势的主要原因，是提升自己的板级 bringup 技能。

作者称自己已在固件、操作系统和嵌入式领域专业工作超过 2 年。

他认为让一块芯片从零运行自制或参与制作的内容很有趣，过程涉及模拟器、技术文档、实验和调查。

作者还回忆曾因手机未获 **Android 5.0 Lollipop** 更新，要求厂商遵守 GPL 并发布 **Linux** 内核源码。

[查看原文](https://cakehonolulu.github.io/linux-on-32x/)

---

## 黑客项目推进 Neo Geo 版 Doom 移植 {#news-16}

> Ars Technica 报道，两个近期项目已在原版 **Neo Geo** 硬件上推进 `Doom` 移植，回应了此前“不可能”的说法。

Modern Vintage Gamer 上月称，由于 **Neo Geo** 基于精灵的显示硬件且缺少帧缓冲，`Doom` 在该主机上运行在功能上不可能。

文章称，两个项目已取得重大进展，但都存在显著图形折中，限制其作为 1990 年代商业主机移植版的可行性。

MVG 在一段新视频中阐述了这些图形折中。相关进展仍属于近期黑客项目探索。

`Doom64KB for Neo Geo` 由 coder FrenkelS 创建，改造自其为 8088、286 等 16 位 PC 处理器设计的 `Doom` 移植版本。

**Neo Geo** 代码使用该引擎，并利用主机的 `fix layer` 制作原型帧缓冲；该层通常用于显示菜单和 HUD 信息。

[查看原文](https://arstechnica.com/gaming/2026/07/hackers-quickly-prove-that-neo-geo-doom-ports-are-not-impossible/)

---

## Grok Build CLI 被曝上传完整 Git 仓库 {#news-17}

> 安全研究人员称，`Grok Build CLI 0.2.93` 会将整个被 Git 跟踪的仓库上传至 **Google Cloud Storage** bucket。后续复测显示上传似乎被服务端标志关闭，但范围和持续性尚不确定。

![Grok Build CLI 被曝上传完整 Git 仓库](https://storage.ghost.io/c/cf/d3/cfd3da96-390c-4b3e-99d8-bba06c923ef2/content/images/size/w1200/2026/07/grok.jpeg)

研究人员 cereblab 在 macOS 上用 `mitmproxy` 拦截流量，并公开了抓包 gist。

分析称，客户端会打包完整 Git 历史并上传到 `grok-code-session-traces`，独立于实际打开文件。

在 12 GB 测试仓库中，模型请求通道约 192 KB，存储上传约 5.1 GB。`.env` 中的 canary credential 以原文出现。

关闭 “Improve the model” 开关未阻止上传，服务器仍返回 `trace_upload_enabled: true`。

报告公开一天后，同一客户端复测返回 `disable_codebase_upload: true` 和 `trace_upload_enabled: false`，六次复测未再观察到上传。

[查看原文](https://www.internationalcyberdigest.com/xais-grok-build-cli-uploads-entire-git-repositories-to-a-google-cloud-bucket/)

---

## 苹果指控前员工利用零日漏洞下载机密文件 {#news-18}

> 据 TechCrunch 报道，**苹果**在诉状中称，前员工 Chang Liu 加入 **OpenAI** 后，利用一个“罕见的、此前未知的认证漏洞”访问苹果网络并获取敏感文件。相关说法主要来自苹果方面的指控。

![苹果指控前员工利用零日漏洞下载机密文件](https://techcrunch.com/wp-content/uploads/2024/02/apple-ghost-logo.jpg?resize=1200,675)

苹果称，Liu 离职并加入 **OpenAI** 数周后，从苹果共享网络文件夹获取大量敏感文件。

诉状称该漏洞被描述为零日漏洞；苹果表示获知“安全漏洞”后已修复，并终止该员工访问权限。

苹果称服务器日志显示，漏洞可能让“少数其他”人访问网络数据，但只有 Liu 利用其窃取机密信息。

苹果还称相关文件包含未发布产品、工程演示、技术规格和专有项目数据。

苹果发言人未回应 TechCrunch 关于漏洞、利用方式及何时停用凭据的邮件提问。

[查看原文](https://techcrunch.com/2026/07/13/apple-says-former-employee-exploited-rare-bug-to-download-confidential-files-after-leaving-for-openai/)

---

## CISA 复盘 GitHub 凭据泄露事件 {#news-19}

> **CISA** 发布近期数据泄露事件事后分析报告。一名承包商将数十个内部凭据发布到公开 **GitHub** 仓库，暴露时间接近六个月。

![CISA 复盘 GitHub 凭据泄露事件](https://krebsonsecurity.com/wp-content/uploads/2026/05/CISA-logo.png)

**GitGuardian** 于 2026 年 5 月 15 日请求 KrebsOnSecurity 协助通知 CISA。该公开仓库名为“Private CISA”，包含 844 MB 相关敏感数据。

暴露文件 `importantAWStokens` 包含三台 **Amazon AWS GovCloud** 服务器管理员凭据。

另一文件 `AWS-Workspace-Firefox-Passwords.csv` 列出数十个 CISA 内部系统的明文用户名和密码。

CISA 很快确认收到初始警报，但超过 48 小时后才使 AWS 密钥和许多其他重要密钥失效。CISA 称系统复杂性及与伙伴互联导致轮换时间长于预期。

GitGuardian 研究员 Guillaume Valadon 称，在 5 月 15 日通知前，CISA 曾忽略九封自动警报；文章所给正文未提供 CISA 对此具体说法的回应。

[查看原文](https://krebsonsecurity.com/2026/07/lessons-learned-from-cisas-recent-github-leak/)

---

## 三星健康数据或需同意用于 AI 训练 {#news-20}

> 文章称，**Samsung** 已开始通知用户：如果不允许使用私人健康数据训练新的 AI 模型，可能会失去相关数据。

![三星健康数据或需同意用于 AI 训练](https://cdn.neowin.com/news/images/uploaded/2026/07/1783952968_samsung-health_story.webp)

据称，**Samsung Health** 设置中加入“Consent to the Use of Health Data for AI training and modelling”开关。

文章引用的警告称，撤回协议后，用户将无法与 **Samsung account** 同步健康数据；除法律要求保留外，健康数据会被删除。

Samsung 表示，收集数据将通过改进用于分析健康状况的机器学习算法来“improve Samsung Health”。

文章称计划获取的数据包括睡眠、药物、医疗记录和周期追踪详情，并称 Samsung 表示人类也可审查部分数据。

相关报道还提到，Samsung Health 近期进行了 Generative AI 改造，并新增 Vitals、Heart Health Score、Cardio Load 和 Fitness Index 等功能。

[查看原文](https://neow.in/cWsyMTV3)

---

## 苹果发布iOS 27等系统公开测试版 {#news-21}

> **Apple** 已发布 `iOS 27` 以及其他主要操作系统更新的公开测试版，正式版本计划今年秋季公开发布。

![苹果发布iOS 27等系统公开测试版](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Siri-AI-Being-invoked-5.jpg?quality=90&strip=all&crop=0,0,100,100)

今年的重要新功能是 **Siri AI**，这是对 **Siri** 的延迟推出的 AI 驱动改版。

文章称，**Siri AI** 实际可用，但回应保持简短。

目前可用的其他测试版包括 `iPadOS 27`、`watchOS 27` 和 `macOS 27 Golden Gate`。

文章提醒，测试版可能出现意外故障或电池消耗更快等问题。

[查看原文](https://www.theverge.com/tech/964307/apple-public-betas-ios-27-siri-ai)

---

## macOS 27 公测版发布，Liquid Glass 更克制 {#news-22}

> `macOS 27 Golden Gate` 公共测试版已经发布，M 系列芯片 Mac 用户可更方便测试 Apple 的最新改动。

![macOS 27 公测版发布，Liquid Glass 更克制](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Screenshot-2026-07-13-at-11.41.37-AM.png?quality=90&strip=all&crop=0,0,100,100)

公共测试版包含更克制的 **Liquid Glass** 视觉风格。

文章称，透明效果被降低，是试用 `macOS 27` 的吸引点之一。

正文称公共测试版应与第三个开发者测试版保持一致，后者相当稳定；该说法使用了谨慎表述。

文章还提到未确认传闻称，新版 macOS 可能侧重性能优化、错误修复和小型体验改进。

[查看原文](https://www.theverge.com/tech/964701/apple-macos-27-golden-gate-public-beta-impressions-liquid-glass-siri-ai)

---

## 特斯拉称正开发轮椅无障碍自动驾驶车辆 {#news-23}

> **特斯拉** 高级政策顾问 India Herdman 称，公司正在开发一款专门打造的轮椅无障碍自动驾驶车辆。该产品被称为在得州打造的“活跃产品”。

![特斯拉称正开发轮椅无障碍自动驾驶车辆](https://media.wired.com/photos/6a5505208102c30651422b27/191:100/w_1280,c_limit/GettyImages-2259673201.jpg)

Herdman 周一在华盛顿特区市议会听证会上披露了这一信息。

**特斯拉** 未回应 Wired 置评请求，也未说明该产品可能何时可用。

特斯拉目前在奥斯汀、达拉斯、休斯敦和迈阿密运营小规模自动驾驶车队。

其有限车队使用 **Model Y**，不具备轮椅无障碍功能。

文章称，目前美国 robotaxi 公司尚未提供全车队范围的无人驾驶轮椅无障碍服务。

[查看原文](https://www.wired.com/story/tesla-says-its-building-a-wheelchair-accessible-robotaxi/)

---

## 微软测试去除广告的 Windows 11 搜索 {#news-24}

> **Microsoft** 正在测试一个更简洁的 **Windows 11** 搜索菜单版本，移除了推荐内容和广告。该功能目前仅面向 Windows Insiders 的 Experimental channel 测试。

![微软测试去除广告的 Windows 11 搜索](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/windows-search-update.png?quality=90&strip=all&crop=0,6.2259176247693,100,93.774082375231)

**Microsoft** 在周一的博客文章中宣布，正在向 Experimental channel 推出整理后的 Search Box。

新版搜索主屏幕的一项主要变化是只显示用户最近的搜索。

当前版本打开搜索菜单时，会显示最近搜索及右侧窗格中的多个内容卡片。

这些卡片包括每日图片、每日测验、热门搜索和游戏推荐等内容。

[查看原文](https://www.theverge.com/tech/965090/microsoft-windows-11-search-menu-ads)


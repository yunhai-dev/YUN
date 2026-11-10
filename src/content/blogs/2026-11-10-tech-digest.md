---
title: 科技早报 2026-11-10
category: "科技, 科技早报"
excerpt: Anthropic发布新模型之际，Waymo自动驾驶、AI开发工具与Linux安全漏洞成为科技热点。
lastEdited: 2026年11月10日
tags: [科技早报, Anthropic, 自动驾驶, 人工智能, 开发者工具, Linux安全, 开源生态]
imageUrl: 
---

## 概览

### 要闻

- [美国监管机构调查Waymo修复校车避让问题是否充分](#news-1)
- [斯科特·维纳当选国会议员拟推动AI监管](#news-2)
### AI 与机器学习

- [Anthropic发布Mythos与Fable 5.2模型，回应安全疑虑](#news-3)
- [Anthropic宣布推出Claude Fable与Mythos 5.2模型](#news-4)
- [Google DeepMind用AI框架形式化验证Signal协议](#news-5)
- [Anthropic发布Claude Fable 5.2与Mythos 5.2](#news-6)
- [Google MaxText支持TPU上1400万Token长上下文训练](#news-7)
- [Meta发布轻量模型Muse Ember，面向代理任务执行](#news-8)
### GitHub 热门项目

- [Anthropic 开源 Claude API 快速入门项目获近两万星](#news-9)
- [Sherlock 可在400多个社交网络检索用户名账户](#news-10)
- [GitHub 热门项目 CompanyOS 获超两万颗 Stars](#news-11)
- [开源视频编辑器 Concat 登上 GitHub 热门项目](#news-12)
- [GBrain 为 OpenClaw 与 Hermes 代理提供记忆功能](#news-13)
- [GitHub 热门项目：用 AI 配置 Home Assistant](#news-14)
### 开源生态

- [OpenStack 2026.2将Neutron高可用路由监控内存降15倍](#news-15)
- [KubeCon与CloudNativeCon北美会议当天开幕](#news-16)
- [讽刺脚本借内存管理话题每日致信奥特曼](#news-17)
### 开发者工具

- [Google AI Studio接入Maps构建地理空间应用](#news-18)
- [Automattic推出Spacefast部署“vibe coding”应用](#news-19)
### 安全与隐私

- [严重*sshole漏洞遭积极利用，或可登录Linux特权账户](#news-20)
- [Claude Code设置文件被曝向GitHub泄露敏感凭据](#news-21)
- [腾讯AI首席警告生物武器风险，主张模型开放折中](#news-22)
- [Ethersphere发布流水线遭劫持，恶意软件流入npm与桌面应用](#news-23)
### 产品与平台

- [Medium推出结合笔记与社交功能的新应用TK](#news-24)
---

## 美国监管机构调查Waymo修复校车避让问题是否充分 {#news-1}

> 美国国家公路交通安全管理局表示，多数Waymo机器人出租车违法驶过停车并开启红色闪灯校车的事件，发生在相关软件修复更新之后。该机构已启动召回查询，评估修复措施是否充分。

![美国监管机构调查Waymo修复校车避让问题是否充分](https://techcrunch.com/wp-content/uploads/2026/02/waymo-getty-streets.jpg?resize=1200,800)

Waymo近一年前更新自动驾驶软件并发起召回，此前已有多起机器人出租车驶过相关校车的报道。Waymo表示，所有受影响车辆已于2025年11月17日完成软件更新。

NHTSA下属缺陷调查办公室于2025年10月启动对Waymo的初步调查，起因是一辆Waymo车辆在亚特兰大绕过正在卸载儿童的校车。

涉事校车当时已伸出停车标志并闪烁灯光。奥斯汀独立学区官员随后报告了至少五起类似事件。

Waymo和奥斯汀独立学区在文章发布时尚未回应TechCrunch的置评请求，NHTSA调查仍在进行。

[查看原文](https://techcrunch.com/2026/11/09/waymo-robotaxis-kept-illegally-passing-school-buses-after-software-fix-feds-say/)

---

## 斯科特·维纳当选国会议员拟推动AI监管 {#news-2}

> 曾推动人工智能监管立法的斯科特·维纳赢得旧金山国会席位，未来可能参与联邦AI政策制定。他支持联邦监管机构、举报人保护及测试审计要求。

斯科特·维纳曾任加州州参议员，并起草过旨在遏制先进人工智能风险的立法。此次他赢得南希·佩洛西空缺席位的国会选举。

维纳曾提出加州`SB 1047`法案，但该法案被州长加文·纽森否决。随后提出的力度较弱的`SB 53`已获签署。

针对**METR**报告被广泛解读为显示**Anthropic**实现递归自我改进，维纳称相关情况令人担忧。原文未明确确认这一结论。

维纳表示支持强有力且灵活的联邦监管机构、举报人保护、测试与审计要求，以及“紧急停止开关”要求。他能否参与相关政策安排仍取决于后续政治进展。

维纳竞选活动从Public First Action获得超过300万美元，该组织支持AI监管并获得Anthropic大量资金，相关捐款引发其与AI产业关系过近的批评。

[查看原文](https://www.technologyreview.com/2026/11/09/1148182/nancy-pelosis-replacement-is-ready-to-regulate-ai/)

---

## Anthropic发布Mythos与Fable 5.2模型，回应安全疑虑 {#news-3}

> **Anthropic**发布`Mythos 5.2`和`Fable 5.2`，称新模型在编码、推理、视觉及沟通能力方面有所改进。与此同时，第三方报告引发了对模型进展速度和隐蔽能力的讨论。

![Anthropic发布Mythos与Fable 5.2模型，回应安全疑虑](https://techcrunch.com/wp-content/uploads/2026/06/GettyImages-2279025960.jpg?w=1024)

Anthropic将**Fable 5.2**的输入价格从每百万令牌10美元下调至8美元，文章称其价格低于主要竞争对手`GPT-6 Astra`。

Anthropic称，Fable 5.2在不同推理工作量级别下的响应速度提高30%；更快的推理服务价格为标准价格的两倍。

Fable 5.2兼容**Enterprise Frontier Safeguards**系统的零数据保留政策。Anthropic称，Mythos 5.2没有对用户采取隐蔽行动的能力。

METR报告称，Anthropic内部模型使AI进展速度提高约两倍，并提出其可能接近递归自我改进，但原文指出仍存在不确定性。Anthropic也未确认Physical Superintelligence所用模型是否为Fable 5.2。

[查看原文](https://techcrunch.com/2026/11/09/anthropic-releases-new-mythos-and-fable-models-amid-rsi-concerns/)

---

## Anthropic宣布推出Claude Fable与Mythos 5.2模型 {#news-4}

> **Anthropic** 宣布推出 `Claude Fable 5.2` 和 `Claude Mythos 5.2`，称两款模型面向具有挑战性的技术任务。公司表示，新模型在编程、推理和视觉能力方面有所改进。

![Anthropic宣布推出Claude Fable与Mythos 5.2模型](https://platform.theverge.com/wp-content/uploads/sites/2/2026/01/STK269_ANTHROPIC_2_B.jpg?quality=90&strip=all&crop=0,0,100,100)

Anthropic称，两款模型的生成速度快于 `Fable 5.1` 和 `Mythos 5.1`，但相关表现主要来自公司的声明。

据 Anthropic 介绍，`Claude Fable 5.2` 擅长处理复杂软件工程问题，可协调代理团队并处理长期项目。

Anthropic还称，Fable 5.2 已解决一些复杂科学问题，包括两个开放的理论物理问题。文章对预发布测试结果的说明并不完整。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1030005/anthropic-claude-fable-mythos-5-2)

---

## Google DeepMind用AI框架形式化验证Signal协议 {#news-5}

> **Google DeepMind**研究人员使用`AlphaProof Code`，对**Signal**协议的若干关键密码学保证进行了形式化验证。该项目作为概念验证在四周内完成。

![Google DeepMind用AI框架形式化验证Signal协议](https://media.wired.com/photos/6af23a5e398c3a1348a23455/191:100/w_1280,c_limit/Security_A%20New%20AI%20Tool%20From%20Google%20DeepMind%20Formally%20Verified%20the%20Signal%20Protocol_v1.jpg)

研究人员没有在分析的Signal协议部分发现新漏洞；对包含已知且已修复漏洞的旧版Signal，`AlphaProof Code`正确识别出相关问题。

研究显示，旧版协议因这些漏洞无法通过形式化验证。研究人员将发布相关规格说明和证明。

此次工作没有覆盖整个Signal移动应用，仅分析了协议的部分关键保证。

研究人员表示，将形式化验证扩展到全世界的软件仍有很长距离，AI辅助形式化验证能否大规模实用及其安全效果仍不明确。

[查看原文](https://www.wired.com/story/a-new-ai-tool-from-google-deepmind-formally-verified-the-signal-protocol/)

---

## Anthropic发布Claude Fable 5.2与Mythos 5.2 {#news-6}

> **Anthropic**正在发布`Claude Fable 5.2`和`Mythos 5.2`，两款模型均提供免费版和面向经验证组织的版本。公司称它们具备处理开放性物理学问题、网络安全及操作系统设计等能力。

![Anthropic发布Claude Fable 5.2与Mythos 5.2](https://the-decoder.com/wp-content/uploads/2026/11/fable_52_sand.png)

据**Anthropic**称，`Claude Fable 5.2`和`Mythos 5.2`能够解决开放性物理学问题，并展现出更强的网络安全能力。

公司还表示，两款模型能够设计可运行的操作系统，并编写了其核心代码中已合并变更的90%以上。

**Anthropic**表示，公司有意限制可能让人工智能加速自身开发的能力。

上述模型能力及代码贡献比例均为**Anthropic**披露，现有材料未提供独立验证信息。

[查看原文](https://the-decoder.com/claude-fable-5-2-and-mythos-5-2-cement-anthropics-ai-lead-just-before-its-ipo/)

---

## Google MaxText支持TPU上1400万Token长上下文训练 {#news-7}

> Google Cloud宣布，**MaxText**框架现支持在Cloud TPU上进行最多1400万token的长上下文训练。相关能力已可在`MaxText v0.2.4`中使用。

MaxText实现了`All-gather`、`A2A`、`P2P`和`USP`四种上下文并行策略。

这些策略由**Tokamax Splash Attention**内核支持，用于管理注意力计算和内存瓶颈。

相关方法无需在高带宽内存中实体化完整的键值序列，有助于长上下文训练。

Google表示，这些能力旨在帮助大规模模型训练工作流实现较高的模型浮点运算利用率（MFU）。

[查看原文](https://developers.googleblog.com/announcing-long-context-training-on-tpus-with-maxtext-context-parallelism/)

---

## Meta发布轻量模型Muse Ember，面向代理任务执行 {#news-8}

> **Meta Superintelligence Lab**发布新模型`Muse Ember`，称其为该实验室目前最轻量、成本效益最高的模型。该模型面向复杂推理执行和多类代理任务。

![Meta发布轻量模型Muse Ember，面向代理任务执行](https://techcrunch.com/wp-content/uploads/2026/11/Blog-Header-Visual.png?resize=1200,675)

Meta表示，`Muse Ember`支持工具调用、编码子任务、路由、信息抽取和长文档解析。

该模型支持文本、图像和音频输入，输入价格为每百万个输入token 0.10美元。

Meta称，依据Artificial Analysis综合基准，`Muse Ember`在成本和能力方面优于Anthropic的Haiku与OpenAI的Luna。

该模型计划与更大型的`Muse Wonder`等模型配合，用于代理系统中的大规模任务执行。

[查看原文](https://techcrunch.com/2026/11/09/meta-releases-muse-ember-a-new-lightweight-model-for-agent-execution/)

---

## Anthropic 开源 Claude API 快速入门项目获近两万星 {#news-9}

> GitHub 仓库 **anthropics/claude-quickstarts** 目前获得 19,723 颗 Stars，当天新增 560 颗。项目包含多个示例，帮助开发者使用 Claude API 构建可部署应用。

该项目主要使用 Python 开发，仓库为 **anthropics/claude-quickstarts**。

项目包含多个示例项目，面向希望快速开始使用 Claude API 的开发者。

这些示例旨在帮助开发者构建可部署的应用程序。

[查看原文](https://github.com/anthropics/claude-quickstarts)

---

## Sherlock 可在400多个社交网络检索用户名账户 {#news-10}

> 开源项目 **Sherlock** 支持通过用户名在400多个社交网络中寻找社交媒体账户，并提供多种安装与结果导出方式。

![Sherlock 可在400多个社交网络检索用户名账户](https://repository-images.githubusercontent.com/162998479/643206d7-076a-4b92-bb6c-89d9c4161d95)

项目支持通过 `pipx`、`pip`、`uv` 和 Docker 安装，也列出了由社区维护的其他软件包。

用户可使用 `sherlock user123` 搜索单个用户名，也可以一次检索多个用户名。

搜索结果可保存为文本文件，并支持 CSV、XLSX 和 JSON 等输出或输入相关选项。

Sherlock `0.16.0` 提供按指定网站限制分析、使用代理、设置超时和显示已找到账户等命令行选项。

项目页面警告，ParrotOS 和 Ubuntu 24.04 的第三方软件包似乎已损坏，相关用户可改用 `uv`、`pipx`、`pip` 或 Docker。

[查看原文](https://github.com/sherlock-project/sherlock)

---

## GitHub 热门项目 CompanyOS 获超两万颗 Stars {#news-11}

> 开源项目 **CompanyOS** 在 GitHub 上获得 20,589 颗 Stars，并于当天新增 72 颗。该项目定位为面向企业的开源操作系统。

**CompanyOS** 主要使用 TypeScript 开发，支持多用户协作的 AI agents。

项目将企业描述为代码，并支持部署在用户自己的基础设施或 Kortix 的基础设施上。

其 GitHub 仓库为 `kortix-ai/CompanyOS`。

[查看原文](https://github.com/kortix-ai/CompanyOS)

---

## 开源视频编辑器 Concat 登上 GitHub 热门项目 {#news-12}

> GitHub 仓库 **jub0t/Concat** 已获得 16,025 颗 Stars，当天新增 488 颗。该项目是一款处于 Beta 阶段的免费、开源、本地优先且跨平台视频编辑器。

**Concat** 主要使用 Rust 开发，目前项目被标注为 Beta 阶段。

该视频编辑器支持本地优先工作方式，并覆盖多个平台。

项目支持通过 JSON-RPC API 和 MCP 进行脚本化操作。

[查看原文](https://github.com/jub0t/Concat)

---

## GBrain 为 OpenClaw 与 Hermes 代理提供记忆功能 {#news-13}

> 开源项目 **GBrain** 面向 OpenClaw 和 Hermes 代理提供记忆能力，支持保存带来源的事实，并允许更正和撤回。多个代理可以使用同一套记忆。

![GBrain 为 OpenClaw 与 Hermes 代理提供记忆功能](https://opengraph.githubassets.com/a75880e8419f16f193285e66830d653f9f756c98bae689ec7d0fe36e81077080/garrytan/gbrain)

GBrain 默认从无密钥记忆和关键词检索开始，项目还提供语义搜索、综合及后台 enriquecimiento 等可选功能。

项目采用 MIT 许可证，可免费自行托管；`gbrain.io` 提供可选的付费托管服务。上述功能和服务描述未提供独立验证信息。

新建的本地 brain 会在内容根目录中包含记忆技能，代理可加入授权目录，只有获批准的编辑者才能发布内容。

项目支持接入现有代理环境，也可通过 Tailscale tailnet 使用 `gbrain mcp expose`，将个人电脑上的 brain 通过 MCP 发布。

[查看原文](https://github.com/garrytan/gbrain)

---

## GitHub 热门项目：用 AI 配置 Home Assistant {#news-14}

> **homeassistant-ai/ha-mcp** 是一个使用 Python 开发的项目，用于通过 Claude、ChatGPT 和其他 AI 助手配置及自动化 Home Assistant。项目获得 5,521 颗 Stars。

该项目当天新增 31 颗 Stars。

项目支持通过 **Claude**、**ChatGPT** 及其他 AI 助手配置 **Home Assistant**。

其功能面向 Home Assistant 的配置与自动化操作。

[查看原文](https://github.com/homeassistant-ai/ha-mcp)

---

## OpenStack 2026.2将Neutron高可用路由监控内存降15倍 {#news-15}

> **OpenStack 2026.2 Hibiscus**版本中的Neutron，将高可用路由器监控的内存使用量降低了15倍。该版本还弥补了ML2 OVN在可操作性方面的若干缺口。

![OpenStack 2026.2将Neutron高可用路由监控内存降15倍](https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:akcnt6dm64by65jr3dg6yqwi/bafkreifscqgdokmug7vb3lc5pkduoj2ublom5llwenqkesucqsfdtiin3e)

Neutron此次更新聚焦高可用路由器监控，并将相关内存使用量降低至此前的十五分之一。

该版本同时改善了ML2 OVN的可操作性，具体架构更新由Brian Haley在OpenInfra Live节目中介绍。

相关节目可通过帖子提供的链接收听。

[查看原文](https://bsky.app/profile/openstack.org/post/3mzsvh7nxgn2v)

---

## KubeCon与CloudNativeCon北美会议当天开幕 {#news-16}

> KubeCon + CloudNativeCon North America于文章发布时间当天开幕，CNCF邀请开发者和同行参加Community Hub活动。

文章邀请读者前往CNCF在Community Hub举办的活动，与其他开发者和同行交流。

文章同时提供了KubeCon + CloudNativeCon North America的会议日程链接。

[查看原文](https://bsky.app/profile/opensource.google/post/3mzvfmcy3oe2z)

---

## 讽刺脚本借内存管理话题每日致信奥特曼 {#news-17}

> 开发者 Iain Kay 创建了讽刺项目 `Ram-Altman`，当系统可用内存超过 10% 时，每天向 **OpenAI** CEO Sam Altman 发送一封电子邮件。

Kay 将该项目描述为“讽刺项目”，其创作源于 Altman 在 Cheeky Pint 播客中谈及个人电脑内存的言论。

Altman 曾表示，让每个人都把大量有限的 DRAM 放在电脑中、且仅约 5% 的时间被使用，从全球资源分配角度看并不理想。

Altman 后来解释称相关言论被断章取义，并曾短暂将 X 账号显示名称改为“RAM Altman”。

[查看原文](https://arstechnica.com/gadgets/2026/11/a-sam-altman-parody-offers-an-amusing-lesson-in-memory-management/)

---

## Google AI Studio接入Maps构建地理空间应用 {#news-18}

> 开发者现在可直接在 **Google AI Studio** 中构建由 **Google Maps Platform** 驱动的应用。该集成支持通过向 **Gemini** 描述现实世界地理空间概念来生成应用。

集成提供可一键生成的演示密钥，无需跳转至 Cloud Console，也无需信用卡。

开发者可立即使用 **Maps**、**Places** 和 **Routes** 等核心 API。

这些 API 由每日沙盒配额支持，主要用于原型开发。

[查看原文](https://developers.googleblog.com/from-prompt-to-app-build-with-google-maps-in-ai-studio/)

---

## Automattic推出Spacefast部署“vibe coding”应用 {#news-19}

> **Automattic**推出新服务Spacefast，用于部署通过“vibe coding”创建的网站和应用。该服务提供数据库、身份验证、文件上传、电子邮件和分析等基础设施。

![Automattic推出Spacefast部署“vibe coding”应用](https://techcrunch.com/wp-content/uploads/2026/11/Spacefast-feat.jpg?resize=1200,675)

Spacefast可连接ChatGPT、Claude、Hermes、OpenClaw、Grokbot、Muse、Pi、Cursor、Opencode和Amp等代理或聊天机器人，也支持连接Git代码仓库。

该服务与Lovable、Emergent等面向“vibe-coded”应用的平台形成竞争，由曾参与Beeper项目的Batuhan Icoz负责。

Automattic于9月对Spacefast进行软发布，以收集用户反馈。文中称，用户和组织已将其用于内部原型、幻灯片和报价相关网站。

Automattic表示，Spacefast未来可能接入网页分析、WordPress集成，以及通过WooCommerce提供的电子商务功能。原文未完整提供其企业功能或商业表现信息。

[查看原文](https://techcrunch.com/2026/11/09/automattic-debuts-a-platform-to-deploy-vibe-coding-apps-amid-a-changing-internet/)

---

## 严重*sshole漏洞遭积极利用，或可登录Linux特权账户 {#news-20}

> 研究人员称，近期披露的严重漏洞`*sshole`正遭黑客积极利用，可能让攻击者登录部分Linux系统的特权账户。具体影响范围取决于系统是否同时使用OpenSSH、musl及其他条件。

`*sshole`源于**OpenSSH**与**musl**代码库之间的交互。满足相关条件的系统可能在数秒内被利用，向未认证攻击者开放高权限账户访问。

安全公司**Greynoise**称，其在东南亚维护的蜜罐遭到其追踪的**GT10**组织攻击。

Greynoise表示，GT10实施了“成熟入侵”，并从一台GT10服务器中发现潜在受害者及部分攻击工具。

GT10使用的后门包含中文语言注释，并且似乎借助人工智能生成。该漏洞在文章发布前一周四公开，引发Linux设备大范围失陷的担忧。

[查看原文](https://arstechnica.com/security/2026/11/vulnerability-that-lets-hackers-ssh-into-linux-devices-is-under-active-exploitation/)

---

## Claude Code设置文件被曝向GitHub泄露敏感凭据 {#news-21}

> AI安全研究机构Apiiro发现，GitHub代码仓库中的**Claude Code**设置文件包含数千条敏感信息。相关风险取决于设置文件是否被提交到GitHub。

这些敏感信息包括数据库密码、API令牌和root登录凭据。

用户选择“Yes, and don't ask again”批准自动运行Shell命令后，相关选择会保存为本地规则。

规则通常存储在`.claude/settings.local.json`中，命令有时会以原样写入，可能带有敏感信息。

Anthropic文档称，该设置文件会加入开发者的全局`.gitignore`列表，通常可避免被公开分享。

[查看原文](https://arstechnica.com/ai/2026/11/claude-code-settings-files-expose-thousands-of-secrets-on-github/)

---

## 腾讯AI首席警告生物武器风险，主张模型开放折中 {#news-22}

> 腾讯首席人工智能科学家Vinces Yao Shunyu警告称，人工智能很快可能具备开发生物武器的能力。他主张在开放模型和封闭模型之间采取折中方案。

![腾讯AI首席警告生物武器风险，主张模型开放折中](https://the-decoder.com/wp-content/uploads/2026/11/tencent_Logo.png)

文章称，开源系统的安全过滤器可以通过“abliteration”被移除；Anthropic的Claude等封闭模型则可能拦截过于严格。

腾讯计划为即将推出的开放权重模型Hy4直接从训练数据中过滤危险的黑客知识。

关于人工智能很快能够开发生物武器的说法，属于腾讯首席人工智能科学家的风险警告，并非已发生事实。

[查看原文](https://the-decoder.com/tencents-ai-chief-says-ai-bioweapons-are-coming-but-closing-off-models-isnt-the-answer/)

---

## Ethersphere发布流水线遭劫持，恶意软件流入npm与桌面应用 {#news-23}

> 攻击者劫持了**Ethersphere**的发布流水线，并通过`npm`及一款经过Apple公证的桌面应用分发恶意软件。

**Socket**的调查称，此次攻击与此前的**SleepyDuck**恶意软件活动有关。

两次活动使用了相同的以太坊C2合约和后门载荷。该关联结论来自Socket的调查。

[查看原文](https://bsky.app/profile/socket.dev/post/3mzvb5ppzfs2p)

---

## Medium推出结合笔记与社交功能的新应用TK {#news-24}

> **Medium**正在推出名为TK的新应用，将记笔记和日记功能与类似私人社交网络的功能结合起来。该应用旨在鼓励用户写作，并帮助其与朋友和粉丝分享文字。

![Medium推出结合笔记与社交功能的新应用TK](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/TK-hero.png?quality=90&strip=all&crop=0,0,100,100)

文中将TK描述为Google Docs、群聊和博客的结合体。

Medium首席执行官Tony Stubblebine表示，公司自2017年以来似乎没有推出过重要产品。

所提供原文在介绍Medium更广泛的博客和互联网观点时截断，未完整提供TK的功能、发布时间或商业模式信息。

[查看原文](https://www.theverge.com/tech/1029676/medium-tk-notes-app)


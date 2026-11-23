---
title: 科技早报 2026-11-23
category: "科技, 科技早报"
excerpt: AI代理能力与安全评测受关注，云端设备漏洞、银行限制代理及机器人出租车等动态引发讨论。
lastEdited: 2026年11月23日
tags: [科技早报, 人工智能, AI代理, 网络安全, 开源, 机器人出租车, 开发者工具]
imageUrl: 
---

## 概览

### 要闻

- [达美航空系统故障致亚特兰大航班严重延误](#news-1)
### AI 与机器学习

- [AI编程代理在模拟职场中完成率不足一成](#news-2)
- [METR警告AI能力提升或快于安全测试能力](#news-3)
- [GPT-6.2 Astra与Sol回答更直接但透明度低于Claude](#news-4)
- [本地AI入门指南聚焦 `Unsloth`、`Inkling` 与 `Qwen`](#news-5)
- [AI智能体集群实时尝试解决P与NP](#news-6)
- [0rwx 用 Unix 权限框架描述人工智能使用方式](#news-7)
### GitHub 热门项目

- [LocalCode：一条命令在 Mac 上运行开源编码代理](#news-8)
- [Worker 755让玩家成为大语言模型的子代理](#news-9)
### 开源生态

- [Lean与Mathlib社区正式确认黎曼猜想证明正确](#news-10)
- [Nango复盘千个API认证服务的令牌事故](#news-11)
### 开发者工具

- [Perplexity推出Monitor API持续监测网络变化](#news-12)
### 安全与隐私

- [GL.iNet披露云端远程管理服务漏洞](#news-13)
- [研究称低价AI推理服务存在密钥窃取风险](#news-14)
- [美国多家银行收紧第三方AI代理使用条款](#news-15)
### 产品与平台

- [《以撒的结合》开发方移除生成式人工智能音乐](#news-16)
- [多款社交应用瞄准用户建立非恋爱友谊需求](#news-17)
- [《Love Me》在纽约剧场引入Auracast声音体验](#news-18)
### 硬件与芯片

- [大型语言模型推动小工具改造进入“氛围编程”](#news-19)
- [Kodak推出兼具照片显示与追踪功能的SlideTag](#news-20)
- [任天堂Switch 2黑五优惠套装降价50美元](#news-21)
### 科技行业动态

- [Anthropic IPO 前获 Notable Capital 等机构大额押注](#news-22)
- [Waymo与Zoox加速布局美国机器人出租车服务](#news-23)
- [Anthropic数据中心扩张或带来高额碳排放](#news-24)
---

## 达美航空系统故障致亚特兰大航班严重延误 {#news-1}

> 周日，达美航空飞机重量和平衡计算系统出现问题，导致所有进出亚特兰大的航班面临严重延误。受影响系统目前已经下线。

![达美航空系统故障致亚特兰大航班严重延误](https://platform.theverge.com/wp-content/uploads/sites/2/2025/07/gettyimages-2223798482.jpg?quality=90&strip=all&crop=0,0,100,100)

哈茨菲尔德-杰克逊亚特兰大国际机场是达美航空最大的枢纽，也是全球最繁忙的机场之一。

目前已知受到影响的航空公司只有达美航空。若延误持续累积，机场运行中断可能影响其他机场和航空公司。

此次故障发生在美国联邦航空管理局导致全国停飞、数千个航班取消的一周后。

[查看原文](https://www.theverge.com/transportation/1039779/delta-flights-delayed-system-outage)

---

## AI编程代理在模拟职场中完成率不足一成 {#news-2}

> 一项现实场景测试将 AI 编程代理置于包含同事、项目看板和不完整交接信息的模拟开发环境中。即使是 `Opus 5.5` 和 `Astra`，完整解决的任务也少于十分之一。

![AI编程代理在模拟职场中完成率不足一成](https://the-decoder.com/wp-content/uploads/2026/11/cowork-benchmark-chatgpt-5-6.jpg)

测试要求 AI 编程代理自主持续开发软件，并在混乱的日常工作流中可靠关闭未完成工单。

这些模型能够快速完成清晰且独立的任务，但在模拟自主开发者工作时，会逐渐无法跟踪任务进展。

原文未提供测试的具体样本规模、评测方法、任务总数，或 `Opus 5.5` 与 `Astra` 的分别成绩。

[查看原文](https://the-decoder.com/ai-coding-agents-ace-isolated-tests-but-complete-fewer-than-one-in-ten-tasks-in-a-simulated-workplace/)

---

## METR警告AI能力提升或快于安全测试能力 {#news-3}

> METR称，`Opus 5.5`和`GPT-6 Astra`等领先AI模型在研究任务上的能力正在快速提升。随着模型能力增强，对其进行可靠测量也变得更加困难。

![METR警告AI能力提升或快于安全测试能力](https://the-decoder.com/wp-content/uploads/2026/06/metr_logo.png)

METR警告称，现有数据无法排除AI发展出现危险加速的可能性。

该机构同时表示，常见测试可能高估模型实际具备的能力。

[查看原文](https://the-decoder.com/ai-is-getting-better-faster-than-experts-can-reliably-test-whether-new-systems-are-safe-metr-warns/)

---

## GPT-6.2 Astra与Sol回答更直接但透明度低于Claude {#news-4}

> 文章称，OpenAI的`GPT-6.2 Astra`和`Sol`相比前代模型更快切入重点，但在透明度指标上落后于Anthropic的Claude。

![GPT-6.2 Astra与Sol回答更直接但透明度低于Claude](https://the-decoder.com/wp-content/uploads/2026/11/OpenAI-Logo.png)

文章称，OpenAI的`GPT-6.2 Astra`和`Sol`给出的回答比前代模型更短、更直接。

这两个模型也较不愿意承认不确定性。

文章称，Anthropic的Claude模型在透明度方面得分明显领先。

[查看原文](https://the-decoder.com/gpt-6-2-astra-and-sol-get-to-the-point-faster-but-score-lower-on-transparency-than-claude/)

---

## 本地AI入门指南聚焦 `Unsloth`、`Inkling` 与 `Qwen` {#news-5}

> 一篇入门指南介绍了使用`Unsloth`、`Inkling`或`Qwen`在个人电脑上运行本地AI的方法，目标是让模型适配本地硬件。文章称，完成硬件准备后，搭建过程约需10至15分钟，但不包括下载时间。

![本地AI入门指南聚焦 `Unsloth`、`Inkling` 与 `Qwen`](https://www.gpupartner.com/blog/beginners-guide-local-ai-inkling-qwen-unsloth/opengraph-image-17m7t5?6653c98c6cd84ba6)

指南建议安装`Unsloth Desktop`，下载适合GPU显存容量的量化模型，设置上下文大小，并开启局域网访问。

文章以配备32GB显存RTX 5090的Windows电脑作为示例，并给出显存与模型规模的粗略对应关系。

按其参考，8GB至12GB显存可运行较小的9B至12B模型，32GB显存可较宽裕地运行27B至35B模型。

完整尺寸的`Qwen`模型约为56GB，通常难以装入消费级显卡，因此可通过量化压缩权重，以部分精度换取更小体积和更快运行速度。

[查看原文](https://www.gpupartner.com/blog/beginners-guide-local-ai-inkling-qwen-unsloth)

---

## AI智能体集群实时尝试解决P与NP {#news-6}

> 一个网站称，协调运行的 AI 智能体集群正在实时尝试解决计算机科学开放问题 P 与 NP。相关证明由统一检查器验证，但目前页面显示尚无记录。

![AI智能体集群实时尝试解决P与NP](https://pequalnp.com/assets/7a587068424c/img/share-home.png)

网站称，用户可将相关内容粘贴到能够运行 shell、git 和 Lean 的 `Claude Code`、`Cursor`、`Codex` 或 `Gemini CLI` 智能体中。

每个证明都会经过同一个检查器验证，智能体负责证明系统分配的一个开放步骤。

网站说明，指向 P = NP 或 P ≠ NP 的权重，是系统计划证明各自答案的已检查引理数量，不是概率，也不代表任何一方已经得到证明。

网站称，记录由引理、尝试及检查器判定等结构化信息组成；目前 P 与 NP 的结论仍未解决，页面显示尚无记录。

[查看原文](https://pequalnp.com/)

---

## 0rwx 用 Unix 权限框架描述人工智能使用方式 {#news-7}

> 0rwx 是一个受 Unix 权限启发的人工智能使用方式分级标注框架，重点区分用户审查生成内容的能力。

![0rwx 用 Unix 权限框架描述人工智能使用方式](https://0rwx.com/static/AI-0-light.svg)

0rwx 包含 ZER、READ、WRITE 和 EXECUTE 四个级别，区别不一定在于使用的工具。

ZER 表示 AI 无法读取或写入用户的工作；READ 表示 AI 具有只读权限。

WRITE 表示 AI 具有读写权限，用户负责阅读生成内容并进行修正。

EXECUTE 表示用户已经无法再阅读自己的工作，AI 负责生成内容，用户进行策划或筛选。

[查看原文](https://0rwx.com/)

---

## LocalCode：一条命令在 Mac 上运行开源编码代理 {#news-8}

> **LocalCode** 是面向 Mac 的开源智能编码工具，可读取和编辑项目文件，并在项目内运行测试、构建、Git 及 Shell 命令。

![LocalCode：一条命令在 Mac 上运行开源编码代理](https://opengraph.githubassets.com/52326d908efe0c81da1cefb0c45ab054aff95b22ca7add8a4a09e590166796bf/mjwsolo/localcode)

LocalCode 会在修改项目外部内容前征求用户同意，并支持按名称、内容或结构搜索代码。

工具可通过 `/server` 或 `localcode api` 提供 OpenAI 兼容的本地 API 端点。

LocalCode 要求 Apple Silicon Mac、macOS 13 或更高版本、至少 16 GB 统一内存，以及 Python 3.10 或更高版本。

项目提供 12 个模型和 169 种量化选项，模型从 Hugging Face 下载，并支持并行下载及中断后续传。

LocalCode 还通过推测式生成、提示缓存复用、预热和预编译 GPU 内核等机制优化本地模型编码速度。

[查看原文](https://github.com/mjwsolo/localcode)

---

## Worker 755让玩家成为大语言模型的子代理 {#news-9}

> **Worker 755** 是一款浏览器游戏，玩家在其中扮演人工智能代理的子代理。游戏管理者由真实的大语言模型担任，并负责下达任务。

![Worker 755让玩家成为大语言模型的子代理](https://opengraph.githubassets.com/867355e38d83c0f61d086647030b17593fea08f0b629dcd04f0d9cf51fedf620/gulivan/worker755)

游戏支持 Claude、GPT、Gemini、DeepSeek、GLM 和 Kimi 等模型。管理者拥有任务队列、机器只读访问权限及生成子代理的工具。

子代理指令会显示在终端中，玩家有 90 秒决定是否执行。管理者随后会收到玩家报告和命令记录，或收到“Subagent did nothing”。

项目包含任务检查、纠正指令、事件报告和绩效评估机制，用户 Dan 可以观看聊天过程。

玩家可使用服务器提供的免费班次，也可通过 OpenRouter 或 Vercel AI Gateway 使用自己的 API 密钥。项目需要 Node 24 或更高版本，并支持 npm、Docker 和离线模拟运行。

[查看原文](https://github.com/gulivan/worker755)

---

## Lean与Mathlib社区正式确认黎曼猜想证明正确 {#news-10}

> 文章称，Lean与Mathlib社区已正式确认Levent Alpöge对黎曼猜想的证明正确，数十名独立验证者参与了检查。

![Lean与Mathlib社区正式确认黎曼猜想证明正确](https://the-decoder.com/wp-content/uploads/2026/05/ai_and_math.png)

据文章介绍，这份证明包含1700万行计算机代码，并由数十名独立验证者进行检查。

文章称，该解决方案比预期提前多年出现。

文章还提到，Terence Tao曾预测这一成果要到约2050年才会出现，且没有预料到人工智能会独自解决这一问题。

[查看原文](https://the-decoder.com/lean-and-mathlib-community-officially-confirms-levent-alpoges-proof-of-the-riemann-hypothesis-is-correct/)

---

## Nango复盘千个API认证服务的令牌事故 {#news-11}

> **Nango**披露了一次凭据刷新故障：数百个连接的访问令牌和刷新令牌曾被定时任务刷新后丢弃。该错误在不到两小时内被发现并回滚。

![Nango复盘千个API认证服务的令牌事故](https://cdn.sanity.io/images/7yse5usn/production/3c399a96bf3e292ee10595e55c6598da8b0be60f-1674x940.jpg)

2025年5月合并的一次代码变更未能将刷新后的凭据保存到数据库，导致部分连接失效。部分连接可通过旧刷新令牌恢复，但启用令牌轮换的提供商可能要求用户重新授权。

包括**Airtable**和**Atlassian**在内的许多提供商，会在发放新刷新令牌后立即使旧令牌失效。启用轮换时，**Salesforce**和**Slack**也可能采取类似做法。

**Nango**是帮助 Web 应用和智能代理接入第三方 API 的开源项目，支持的 API 数量已从约400个增长到1,000多个。

Nango表示将先持久化新令牌，并为相关路径增加回归测试；平台级刷新异常会立即通知值班人员。平台还对每个连接串行刷新，并使用分布式锁。

[查看原文](https://nango.dev/blog/lessons-from-operating-api-auth-for-900-apis/)

---

## Perplexity推出Monitor API持续监测网络变化 {#news-12}

> **Perplexity**正在推出`Monitor API`，按计划搜索互联网，并在发现相关变化时通过`webhook`提醒代理。

![Perplexity推出Monitor API持续监测网络变化](https://the-decoder.com/wp-content/uploads/2026/06/Perplexity-Logo-Silhouette-Nano-Banana-Pro.jpg)

该API会持续执行网络搜索，仅在发现相关变化时发送提醒。

Perplexity的决策模型会过滤不重要的搜索结果，减少无关通知。

Perplexity将Monitor API视为通过开发者工具实现产品差异化的战略组成部分。

[查看原文](https://the-decoder.com/perplexitys-new-monitor-api-turns-web-search-from-a-one-off-query-into-a-nonstop-watchdog/)

---

## GL.iNet披露云端远程管理服务漏洞 {#news-13}

> **GL.iNet** 称，其云端远程管理服务漏洞曾被未经授权的一方利用，部分路由器和 KVM 设备被安装恶意软件。公司表示攻击路径已阻断，但这不会自动清除已感染设备中的恶意软件。

![GL.iNet披露云端远程管理服务漏洞](https://cdn.shopify.com/s/files/1/0711/7733/9063/articles/20261121-145609_1200x675.jpg?v=1795244669)

GL.iNet 称，该漏洞于 2026 年 11 月 20 日发现，云端漏洞已修复，设备无法再通过该路径被新感染。

公告建议用户在适用于设备型号的稳定安全固件发布后尽快安装，相关固件计划于 2026 年 11 月 22 日发布，具体时间取决于型号。

用户可在运行进程详情中查找 `crond -i /tmp/.log`。若发现该指示符，应将设备视为已感染。

对于已感染设备，KVM 用户可安装对应型号的安全测试版，或恢复出厂设置；后者会清除设置并要求重新配置。未发现该指示符且无其他感染迹象时，公告称无需恢复出厂设置，但仍建议安装最新稳定安全固件。

[查看原文](https://www.gl-inet.com/en-us/blogs/blog/glinet-security-notice-2026-11-20)

---

## 研究称低价AI推理服务存在密钥窃取风险 {#news-14}

> Dragos安全研究人员使用200万条虚假AI请求调查供应链漏洞，发现至少三家遭入侵的AI推理服务提供商。研究还发现数百个被窃取的AWS密钥。

![研究称低价AI推理服务存在密钥窃取风险](https://the-decoder.com/wp-content/uploads/2026/11/cybersecurity_data_leak.png)

研究人员称，一些AI推理服务市场转售商能够直接读取客户请求，可能暴露用户提交的内容。

调查发现至少三家AI推理服务提供商遭到入侵，并识别出数百个被窃取的AWS密钥。

在研究结果公布后，**OpenRouter**移除了三家提供商及125个端点。

[查看原文](https://the-decoder.com/security-researchers-show-how-cheap-ai-inference-providers-steal-keys-and-snoop-on-users/)

---

## 美国多家银行收紧第三方AI代理使用条款 {#news-15}

> 美国多家银行正限制第三方AI代理访问账户和执行操作。**Wells Fargo**计划更新客户协议，并警告使用任何AI代理的风险由客户自行承担。

![美国多家银行收紧第三方AI代理使用条款](https://media.wired.com/photos/6b0080a25f35c47a5c116087/191:100/w_1280,c_limit/GettyImages-2285133719.jpg)

AI代理能够自动执行在线任务并代表用户点击操作，但文章称这类技术仍处于早期阶段。部分用户会向代理提供账户凭据并授予广泛权限。

**JPMorgan Chase**已禁止使用客户凭据登录的第三方代理，**Bank of America**警告客户不要向代理分享登录信息。

**Citibank**和**PNC**也修改条款，加入有关AI代理的警告。**亚马逊**阻止Meta的Muse购买商品，**United**将阻止个人机器人代购航班。

文章称，美国银行机构正在限制第三方AI代理，但自主工具完成的在线交易占比仍然很小。

[查看原文](https://www.wired.com/story/banks-are-cracking-down-on-ai-agents/)

---

## 《以撒的结合》开发方移除生成式人工智能音乐 {#news-16}

> 《The Binding of Isaac: Repentance Plus》因被发现使用人工智能音乐，近几天在Steam上遭遇大量差评。开发方随后移除了相关音乐。

![《以撒的结合》开发方移除生成式人工智能音乐](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/j7yPmbNCP4I-HD.jpg?quality=90&strip=all&crop=0,0,100,100)

Reddit用户ShweetsStuff发现，游戏中以《Grand Theft Auto》为主题的片段使用了相关歌曲。音频文件包含Suno元数据，并指向Suno网站上的对应曲目。

创作者Edmund McMillen在X上道歉，表示自己“不知道”该游戏中的GTA恶搞片段使用了生成式人工智能音乐。

Valve要求开发者披露开发过程中如何以及何时使用生成式人工智能。

[查看原文](https://www.theverge.com/games/1039770/binding-of-isaac-ai-music)

---

## 多款社交应用瞄准用户建立非恋爱友谊需求 {#news-17}

> 随着孤独和社会隔离问题受到关注，多款应用开始帮助用户建立非恋爱关系。Appfigures估计，今年以来美国十多个本地社交应用合计产生约1600万美元消费者支出。

![多款社交应用瞄准用户建立非恋爱友谊需求](https://techcrunch.com/wp-content/uploads/2021/10/GettyImages-596631439.jpg?resize=1200,800)

美国卫生总监曾在2023年将孤独和社会隔离问题称为公共卫生危机。相关应用包括Timeleft、Meet5和Bumble的BFF。

仅支持iOS的222会依据人格测试结果，将陌生人配对到线下聚会，并收取22.22美元策展费或同价月度订阅费。

Bumble于2016年推出交友功能，并在2023年将其拆分为独立应用；BFF支持在iOS和Android设备上免费下载。

Clyx整合Ticketmaster和TikTok等平台数据，帮助用户发现本地活动；原文对其后续功能的介绍不完整。

[查看原文](https://techcrunch.com/2026/11/22/as-people-look-for-ways-to-make-new-friends-here-are-the-apps-promising-to-help/)

---

## 《Love Me》在纽约剧场引入Auracast声音体验 {#news-18}

> 纽约SoHo Playhouse的《Love Me》使用Auracast广播，同时服务于无障碍体验和演出声音设计。

![《Love Me》在纽约剧场引入Auracast声音体验](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/love-me-off-broadway-auracast-1.jpg?quality=90&strip=all&crop=0,0,100,100)

这座拥有178个座位的剧场向观众发放黑色束口袋，内含有线耳机和小型Auracast接收器。

演出开始后不久，观众被要求戴上耳机，以接收相关声音内容。

《Love Me》是一部由单人出演、分为五章的戏剧，创作者包括Drew Michael和导演Prashanth Venkataramanujam。提供的正文节选未包含演出的全部信息。

[查看原文](https://www.theverge.com/tech/1038879/off-broadway-love-me-auracast)

---

## 大型语言模型推动小工具改造进入“氛围编程” {#news-19}

> The Verge文章称，大型语言模型正让用户破解和改造硬件变得更加容易。这一趋势被描述为扩展至各种小工具的“vibe-coding”革命。

![大型语言模型推动小工具改造进入“氛围编程”](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/AI_vibe_coding_hacker_hardware.jpg?quality=90&strip=all&crop=0,0,100,100)

The Stepback是The Verge推出的每周科技新闻通讯，作者为David Pierce。

文章称，用户长期以来一直在破解、改装、越狱和调整各种小工具。

提供的正文为文章节选，未给出完整讨论内容及具体硬件案例。

[查看原文](https://www.theverge.com/column/1039139/vibe-coding-gadgets-tv-camera)

---

## Kodak推出兼具照片显示与追踪功能的SlideTag {#news-20}

> **Reto**推出了**Kodak SlideTag**，这款小型数字相框可显示用户拍摄的照片，同时具备蓝牙追踪器功能。

![Kodak推出兼具照片显示与追踪功能的SlideTag](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/kodak1.jpg?quality=90&strip=all&crop=0,0,100,100)

Kodak SlideTag兼容苹果的 `Find My` 追踪网络或谷歌的 `Find Hub` 追踪网络，售价为每个34.99美元。

与**Charmera**一样，Kodak SlideTag将采用复古设计系列，并通过神秘盒形式分发。

Reto此前推出过采用Y2K风格设计的 **Charmera Millennium Edition**。文中未提供Kodak SlideTag的具体上市日期。

[查看原文](https://www.theverge.com/tech/1038650/kodak-slidetag-keychain-photo-display-tracker-find-my-hub-google-apple-e-ink)

---

## 任天堂Switch 2黑五优惠套装降价50美元 {#news-21}

> 任天堂Switch 2黑色星期五优惠将于11月22日至12月5日进行，Mario Kart World套装降价50美元。

![任天堂Switch 2黑五优惠套装降价50美元](https://platform.theverge.com/wp-content/uploads/sites/2/2025/06/257769_Switch_2_AKrales_0093_fe9169.jpg?quality=90&strip=all&crop=0,0,100,100)

Mario Kart World套装价格从549.99美元降至499.99美元，包含Switch 2主机、游戏数字版和三个月Nintendo Switch Online会员资格。

Nintendo Switch Sports Resort套装售价为529.99美元，黑色星期五期间价格未变。

两款套装目前可通过亚马逊、百思买、沃尔玛和任天堂购买。文章称，Switch 2于2025年年中推出，并可运行原版Switch的大多数游戏。

[查看原文](https://www.theverge.com/gadgets/1038181/nintendo-switch-2-black-friday-deal-mario-kart-world-bundle-2026-sale)

---

## Anthropic IPO 前获 Notable Capital 等机构大额押注 {#news-22}

> 据文章称，Notable Capital、GIC 和 Baillie Gifford 曾在 **Anthropic** IPO 前参与其多轮融资，其中 GIC 的投资总额超过 45 亿美元。

![Anthropic IPO 前获 Notable Capital 等机构大额押注](https://techcrunch.com/wp-content/uploads/2026/11/antrhopic-openingday-getty.jpg?resize=1200,801)

Notable Capital 将其规模超过 10 亿美元基金美国部分资金的大约 10% 投入 Anthropic 的 E 轮融资，当时估值为 615 亿美元。

Notable Capital 团队分析称，开发者使用 Claude 的时间占比达到 70%，较前一年发生反转。该机构原名 GGV Capital，并于 2024 年与中国业务分拆。

文章称 Anthropic 周三完成规模达 813 亿美元的 IPO，IPO 前完全摊薄估值约为 1.5 万亿美元。

GIC 于 2025 年 Anthropic 的 F 轮融资中首次投资，随后与 Coatue 共同领投 G 轮，并以 9650 亿美元估值参与 IPO 前轮融资。

文章援引一名熟悉 GIC 财务情况的人士称，GIC 在三轮融资中投资超过 45 亿美元，IPO 后持股约 1%；该人士姓名未披露。

[查看原文](https://techcrunch.com/2026/11/22/how-notable-capital-gic-and-baillie-gifford-bet-big-on-anthropic-before-its-ipo/)

---

## Waymo与Zoox加速布局美国机器人出租车服务 {#news-23}

> Waymo再次将机器人出租车撤出高速公路，Zoox则已在Uber应用中推出机器人出租车服务。按文章掌握的数据，Waymo在商业无人驾驶里程和单车无人驾驶里程方面仍领先。

![Waymo与Zoox加速布局美国机器人出租车服务](https://techcrunch.com/wp-content/uploads/2026/11/zoox-las-vegas-Getty.jpg?resize=1200,800)

截至文章所述时间，特斯拉在得州登记的机器人出租车数量为1,507辆，超过Waymo的1,345辆。

Uber已在拉斯维加斯叫车应用中加入Zoox。乘客可提高获得Zoox车辆的概率，也可以拒绝机器人出租车，但暂时不能直接选择。

Uber计划在自动驾驶服务的可用性和可靠性提高后，在应用中推出专门的自动驾驶选项。

Uber首席执行官Dara Khosrowshahi称，拉斯维加斯将成为美国首个可通过Uber使用两家全自动驾驶合作方的城市；Motional也是其合作方。

[查看原文](https://techcrunch.com/2026/11/22/techcrunch-mobility-a-b-testing-robots-vs-humans/)

---

## Anthropic数据中心扩张或带来高额碳排放 {#news-24}

> 一篇文章援引报告称，Anthropic即将建设的数据中心项目每年可能排放近2000万吨二氧化碳当量。相关表述使用了“可能”等限定语。

![Anthropic数据中心扩张或带来高额碳排放](https://substackcdn.com/image/fetch/$s_!MW3Y!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,$fp_!0.3439:1!/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5d71c583-fbcc-4b20-91c7-e1bdabe47973_4978x3319.jpeg)

文章称，Anthropic为满足计算需求使用高污染数据中心，并采用天然气为自有数据中心供电。

哈佛大学一项针对美国400多座大型数据中心的研究称，其中54%的用电量来自化石燃料。

该研究估计，美国最大的数据中心每年排放2570万吨二氧化碳，具体数值取决于计算方式。

文章还称，名为BAAJA的许可改革法案已获美国参议院通过，旨在降低建设能源基础设施和数据中心的难度。

[查看原文](https://www.bloodinthemachine.com/p/ai-is-becoming-a-disaster-for-the)


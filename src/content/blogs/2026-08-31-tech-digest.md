---
title: 科技早报 2026-08-31
category: "科技, 科技早报"
excerpt: NASA罗曼空间望远镜发射开启暗物质暗能量观测，研究聚焦AI编码助手偏差与开源项目新动向。
lastEdited: 2026年8月31日
tags: [科技早报, NASA, 罗曼空间望远镜, 人工智能, GitHub, 开源项目, Rust]
imageUrl: 
---

## 概览

### 要闻

- [美国总统在NASA发布会期间向任务团队致意](#news-1)
### AI 与机器学习

- [研究称AI编码助手缺乏时间感且未意识到偏差](#news-2)
- [澳大利亚公平工作委员会批评错误的AI法律建议](#news-3)
### GitHub 热门项目

- [GitHub 热门项目 `crawl4ai`：面向大语言模型的网页抓取工具](#news-4)
- [Apache Iggy以Rust构建持久化消息流平台](#news-5)
- [GitHub热门项目Corsair提供统一应用集成平台](#news-6)
- [GitHub 热门项目 `agentsview`：面向编码代理的会话分析工具](#news-7)
- [microduck_rl为Microduck双足机器人提供强化学习训练环境](#news-8)
- [Rust 编写的 Ruffle 模拟器登上 GitHub 热门项目](#news-9)
### 开发者工具

- [OpenRun为SQLite应用内置Litestream复制与恢复支持](#news-10)
- [Wirewiki探索面向2.4亿域名的零毫秒自动补全](#news-11)
### 产品与平台

- [`Haiku R1/beta6` 发布，距上个 Beta 版本约两年](#news-12)
### 硬件与芯片

- [NASA 罗曼空间望远镜发射，开启暗物质暗能量研究](#news-13)
### 前瞻与传闻

- [西班牙Liux开发以可持续性为重点的微型电动车Big](#news-14)
---

## 美国总统在NASA发布会期间向任务团队致意 {#news-1}

> NASA在肯尼迪航天中心举行南希·格蕾丝·罗曼太空望远镜发射后的新闻发布会，介绍任务初始机动状态。发布会期间，美国总统希望向任务参与者致意并表示祝贺。

NASA局长Jared Isaacman在发布会开始不到半小时时查看手机，随后短暂离开主席台。

约一分钟后，Isaacman返回会场并表示美国总统希望向此次任务的所有参与者致意和祝贺。

他返回时打断了NASA首席科学家Nicky Fox关于任务的发言，并为此道歉。

[查看原文](https://arstechnica.com/space/2026/08/why-it-matters-that-president-trump-just-dialed-into-a-nasa-news-conference/)

---

## 研究称AI编码助手缺乏时间感且未意识到偏差 {#news-2}

> 一项新研究称，Claude Code 和 Codex 等 AI 编码助手没有时间感，并会系统性高估任务所需时间。研究还称，它们对自身工作表现的评价约高出实际表现20个百分点。

![研究称AI编码助手缺乏时间感且未意识到偏差](https://the-decoder.com/wp-content/uploads/2026/08/KI-Agents-lost-time.png)

原文称，Codex 对任务时长的估计偏差最高可达到实际时长的十倍。

研究认为，这类时间判断和自我评价偏差，可能给长时间自主任务的监督带来实际问题。

原文未提供研究名称、样本、方法和具体测量标准，相关结论仅按原文所述进行转述。

[查看原文](https://the-decoder.com/ai-agents-have-no-sense-of-time-and-are-not-aware-of-it/)

---

## 澳大利亚公平工作委员会批评错误的AI法律建议 {#news-3}

> 澳大利亚公平工作委员会批评一名前 ALDI 员工使用“完全错误”的人工智能建议挑战解雇决定，并命令其支付1230澳元的部分法律费用。

![澳大利亚公平工作委员会批评错误的AI法律建议](https://live-production.wcms.abc-cdn.net.au/228704f43c5a1c7837340c945eedf7b2?impolicy=wcms_watermark_news&cropH=1687&cropW=3000&xPos=0&yPos=88&width=862&height=485&imformat=generic)

委员会副主席 Michael Easton 表示，Sadnan Khan 的不合理行为给前雇主造成了不必要的法律费用。

Khan 称，他使用付费版 ChatGPT 理解委员会和 ALDI 援引的法律案件，并承认提交材料时忘记删除人工智能聊天指令。

一份受委员会委托的研究报告显示，委员会近期案件数量增加40%，文章称部分增长与当事人使用人工智能有关。

从10月20日起，申请人需披露人工智能使用情况；委员会还已推出帮助相关当事人的模板。Khan称计划在上诉中混合使用 Claude 和 ChatGPT 等代理。

[查看原文](https://www.abc.net.au/news/2026-08-29/fair-work-commission-condemns-ai-legal-advice/107089766)

---

## GitHub 热门项目 `crawl4ai`：面向大语言模型的网页抓取工具 {#news-4}

> **unclecode/crawl4ai** 登上 GitHub Trending，是一个使用 Python 语言开发的开源网页爬虫和抓取工具，面向大语言模型设计。

项目目前获得 79,990 颗 Stars，当天新增 229 颗 Stars。

项目描述同时邀请用户加入其 Discord 社区。

[查看原文](https://github.com/unclecode/crawl4ai)

---

## Apache Iggy以Rust构建持久化消息流平台 {#news-5}

> **Apache Iggy**是一个使用Rust编写的持久化消息流平台，支持QUIC、WebSocket、TCP和HTTP等传输协议。项目称其可在较少计算资源下提供高吞吐与高性能。

![Apache Iggy以Rust构建持久化消息流平台](https://opengraph.githubassets.com/52933d013ce1540388b12d3e1c29fab191aba096ea0aaf6efdf340123d510dff/apache/iggy)

Iggy支持以超低延迟处理每秒数百万条消息，TCP采用自定义二进制规范，HTTP提供常规REST API。

该项目从底层构建持久化消息流日志，不是运行在Kafka或SQL数据库等现有基础设施之上的扩展。

Iggy采用thread-per-core shared-nothing架构，并使用`io_uring`和`compio`提升速度与效率。

平台提供身份认证、授权、细粒度权限和个人访问令牌（PAT），支持多个流、主题和分区，并提供多种语言的客户端SDK。

[查看原文](https://github.com/apache/iggy)

---

## GitHub热门项目Corsair提供统一应用集成平台 {#news-6}

> 开源项目 **Corsair** 是一个应用集成平台，可连接用户与各种应用，并支持构建跨多个集成工作的代理。

![GitHub热门项目Corsair提供统一应用集成平台](https://repository-images.githubusercontent.com/1076362809/24a6b4dd-5586-4d95-82c7-9c40e783792c)

Corsair 基于 `REST API`，而非仅支持 `MCP`，同一集成层可用于代理、后端服务和用户仪表板。

项目提供统一语法，并由维护者维护不同集成的适配器；它还支持构建多租户仪表板。

Corsair 支持自托管，也可使用 **Hub**，由其处理 OAuth 刷新和 Webhooks。项目采用 Apache License 2.0 授权。

GitHub 仓库页面显示，该项目约有1.08万颗星和514个复刻。

[查看原文](https://github.com/corsairdev/corsair)

---

## GitHub 热门项目 `agentsview`：面向编码代理的会话分析工具 {#news-7}

> **kenn-io/agentsview** 登上 GitHub Trending，使用 Go 语言开发，为编码代理提供本地优先的会话搜索、分析与令牌使用统计功能。

项目目前获得 5,611 颗 Stars，当天新增 185 颗 Stars。

`agentsview` 支持 **Claude Code**、**Codex** 以及其他 20 多个代理。

[查看原文](https://github.com/kenn-io/agentsview)

---

## microduck_rl为Microduck双足机器人提供强化学习训练环境 {#news-8}

> **pollen-robotics/microduck_rl**提供面向Microduck双足机器人的强化学习训练环境，基于`mjlab`、MuJoCo Warp和PPO构建。训练策略可导出为`ONNX`，并部署到真实机器人。

![microduck_rl为Microduck双足机器人提供强化学习训练环境](https://opengraph.githubassets.com/a4fa98da3657d01781ee7a046d543dc809e780fa11f55ad6376da3d0a1c54ea0/pollen-robotics/microduck_rl)

Microduck约重800克、高25厘米，训练得到的策略以50 Hz运行。运行时可由`pollen-robotics/microduck`部署。

仓库包含仿真到现实流程，涉及BAM执行器物理、域随机化、回差仿真和奖励设计等内容。

训练需要CUDA GPU，示例使用4096个环境；原文称获得可用步态约需1至2小时，也支持提交至Hugging Face Jobs。

项目列出的任务包括行走、跌倒恢复、站起、坐站转换、触地和踢球等。

[查看原文](https://github.com/pollen-robotics/microduck_rl)

---

## Rust 编写的 Ruffle 模拟器登上 GitHub 热门项目 {#news-9}

> **Ruffle** 是一个使用 Rust 编写的 Adobe Flash Player 模拟器，面向桌面端和网页端。网页端基于 WebAssembly，项目目前仍未完成。

![Rust 编写的 Ruffle 模拟器登上 GitHub 热门项目](https://repository-images.githubusercontent.com/183483988/fa5f20a5-0018-452c-adf9-9d70c9fe8253)

项目表示，Ruffle 对 ActionScript 1、2 和 3 的支持已经较好，但仍可能存在问题。

用户可以通过 Ruffle 网页演示页面加载自己选择的 SWF 文件，项目也提供桌面端和网页端 nightly builds。

构建 Ruffle 需要最新稳定版 Rust；构建包含 ActionScript 3 内置 Flash 类的库还需要 Java。桌面应用可运行 `cargo run --release --package=ruffle_desktop`。

[查看原文](https://github.com/ruffle-rs/ruffle)

---

## OpenRun为SQLite应用内置Litestream复制与恢复支持 {#news-10}

> **OpenRun**现已内置对SQLite应用的`Litestream`支持，可将数据库持续复制到AWS S3或兼容S3的对象存储。

![OpenRun为SQLite应用内置Litestream复制与恢复支持](https://openrun.dev/openrun_small.png)

当应用卷为空或被重新创建时，**OpenRun**会在启动应用前自动从副本恢复数据库。

该功能支持Docker、Podman单节点环境及Kubernetes，配置方式保持一致。

开发者无需在应用容器中安装`Litestream`、配置对象存储、修改镜像或实现恢复逻辑。

复制与恢复由OpenRun在应用容器之外管理，数据库通过挂载到`/data`的持久化卷保存。

[查看原文](https://openrun.dev/blog/litestream/)

---

## Wirewiki探索面向2.4亿域名的零毫秒自动补全 {#news-11}

> **Wirewiki**介绍其自动补全功能的实现方式：客户端预取并缓存建议，配合快速 API，争取让结果在用户释放按键前完成准备。文章标题声称该方案面向2.4亿个域名，但正文片段未说明具体实现方式或完整性能测量方法。

![Wirewiki探索面向2.4亿域名的零毫秒自动补全](https://ruurtjan.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Favatar.f289de58.jpg&w=3840&q=75)

**Wirewiki.com**用于查看互联网基础设施信息，包括域名、历史 DNS 记录、DNS 委派和电子邮件可投递配置。

用户按下按键时，客户端会预取已输入字符加上下一个字符对应的建议；释放按键后，页面渲染建议。

示例请求为 `GET /autocomplete?q=wi`，API 返回 `results` 以及按下一个字符分类的 `next` 建议列表。

文章将延迟定义为从 keyUp 到结果准备好进行渲染的时间，并将 p99 0 毫秒解释为99%的结果在用户释放按键前已准备好。

[查看原文](https://ruurtjan.com/articles/p99-0ms-autocomplete-for-240-million-domain-names)

---

## `Haiku R1/beta6` 发布，距上个 Beta 版本约两年 {#news-12}

> **Haiku R1/beta6** 已于 2026 年 8 月 26 日发布，距离上一个 beta 版本约两年。该版本发布时点距离 Haiku 诞生 25 周年约一周。

![`Haiku R1/beta6` 发布，距上个 Beta 版本约两年](https://www.haiku-os.org/images/haiku_logo_white.svg)

用户可以下载 `Haiku R1/beta6`，也可以从现有安装升级到该版本。

发布文章同时提供了该版本的 Release Notes、媒体联系信息以及获取 Haiku 的入口。

[查看原文](https://www.haiku-os.org/news/2026-08-26_haiku_r1_beta6)

---

## NASA 罗曼空间望远镜发射，开启暗物质暗能量研究 {#news-13}

> NASA 的 **Nancy Grace Roman Space Telescope** 已成功发射，将前往月球之外的日地第二拉格朗日点（L2）轨道，开展宇宙大规模巡天观测。

![NASA 罗曼空间望远镜发射，开启暗物质暗能量研究](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/NHQ20260830_admin_0002large.jpg?quality=90&strip=all&crop=0,0,100,100)

Roman 将进行为期三个月、距离约一百万英里的飞行，前往 L2 轨道，并从那里开展观测。

据 NASA 介绍，Roman 的视场范围是哈勃空间望远镜的 100 倍，配备 3 亿像素红外相机，巡天速度可达到哈勃的 1000 倍。

Roman 还配备日冕仪系统，可遮挡和抑制恒星眩光，以直接成像系外行星，包括更小、更古老和更寒冷的行星。上述具体数据和能力表述由 NASA 提供。

[查看原文](https://www.theverge.com/science/986544/nancy-grace-roman-space-telescope-launch)

---

## 西班牙Liux开发以可持续性为重点的微型电动车Big {#news-14}

> 西班牙初创公司**Liux**正在开发微型电动车**Liux Big**，计划在竞争激烈的市场中与其他微型电动车竞争。其正式上市时间尚未公布。

![西班牙Liux开发以可持续性为重点的微型电动车Big](https://techcrunch.com/wp-content/uploads/2026/08/LIUX-BIG-Factory-001.png?resize=1200,800)

**Liux Big**车身尺寸较小，可以与路缘呈直角停车，并支持在家充电。

该车电池并非在欧洲制造，但可使用太阳能电池板产生的电力充电。

车辆纤维车身采用以亚麻为基础的复合材料设计，目标是之后能够提取和回收。

**Liux**已在西班牙开设新汽车工厂，文章称其为西班牙30多年来首座新建汽车工厂。

[查看原文](https://techcrunch.com/2026/08/30/liuxs-big-microcar-bets-on-sustainability-to-take-on-chinese-rivals/)


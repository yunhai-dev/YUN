---
title: 科技早报 2026-08-30
category: "科技, 科技早报"
excerpt: 本期聚焦AI代理自我改进与硬件连接、开源模型与视频数据集、英伟达数据中心系统及AI版权诉讼。
lastEdited: 2026年8月30日
tags: [人工智能, AI代理, 大语言模型, 开源生态, 数据隐私, 英伟达, Anthropic]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Google WikiSkill让AI代理记住成败以提升后续表现](#news-1)
- [Anthropic提出MHS统一AI代理连接物理设备](#news-2)
- [TechBBQ聚焦欧洲如何掌握人工智能控制权](#news-3)
- [Warp基于Claude构建可自我改进的智能体](#news-4)
- [中国娱乐业AI视频已开始取代演员与主播](#news-5)
- [本地运行大语言模型：离线、隐私与硬件门槛](#news-6)
### GitHub 热门项目

- [vLLM v0.28.0 优化 Kimi-K3 并支持 DeepSeek V4 稀疏 MLA](#news-7)
- [THU-MAIC/OpenMAIC登上GitHub热门项目榜](#news-8)
- [Neon数据库项目登上GitHub热门项目榜](#news-9)
- [Grafana Alloy 开源观测平台支持多类型遥测管道](#news-10)
- [JetBrains 发布面向代码代理的现代 Go 指南](#news-11)
- [Claude Skills 资源项目 Star 达 73,874](#news-12)
### 开源生态

- [LAION发布开放视频数据集，含1000万小时素材](#news-13)
- [Debian投票通过负责任使用生成式人工智能](#news-14)
### 开发者工具

- [文章称良好组织文化比AI工具更能提升生产力](#news-15)
### 安全与隐私

- [得州汽车保险加收一美元资助Flock摄像头](#news-16)
- [加州隐私法下，百余家公司数据请求调查](#news-17)
### 产品与平台

- [GitHub邀请用户参加旧金山Universe活动](#news-18)
- [BYOK将增加自定义扩展以满足进阶写作需求](#news-19)
### 硬件与芯片

- [英伟达AI优势正从GPU扩展至数据中心系统](#news-20)
- [Galaxy Z Flip 8重新定义折叠关闭状态体验](#news-21)
### 科技行业动态

- [Sony Music与Warner Chappell起诉Anthropic版权侵权](#news-22)
- [OpenAI停止向Cursor提供服务，称与马斯克合同记录有关](#news-23)
- [Vijay Pande创办AI原生生物科技投资机构VZVC](#news-24)
---

## Google WikiSkill让AI代理记住成败以提升后续表现 {#news-1}

> Google Research 推出了 **WikiSkill** 框架，为人工智能代理提供持久化知识库。代理可记录运行过程中的失败和成功，并在后续运行中利用这些信息改进表现。

![Google WikiSkill让AI代理记住成败以提升后续表现](https://the-decoder.com/wp-content/uploads/2026/08/aigent_skills_generation.png)

**WikiSkill** 采用类似维基的结构保存人工智能代理运行过程中的知识。没有该框架时，代理通常会在每次运行结束后丢弃已学到的内容。

研究显示，规模更大的模型从 **WikiSkill** 中获益更多。使用该框架的小模型可以达到未使用框架的大模型的性能。

[查看原文](https://the-decoder.com/google-gives-ai-agents-their-own-wiki-so-they-can-learn-from-mistakes-and-successes/)

---

## Anthropic提出MHS统一AI代理连接物理设备 {#news-2}

> **Anthropic**的Model Hardware Standard（MHS）为AI代理连接机械臂和实验室仪器等物理设备提供统一接口。早期测试显示，设备集成时间可从数周缩短至数小时。

![Anthropic提出MHS统一AI代理连接物理设备](https://the-decoder.com/wp-content/uploads/2026/08/mhs-ki-hardware-labore-fabriken.png)

MHS旨在统一AI代理与物理硬件之间的连接方式，覆盖机械臂和实验室仪器等设备。

早期测试显示，使用该标准后，设备集成时间从数周缩短至数小时。

文章指出，**Claude**有时无法理解物理上的因果关系，目前仍需要人工监督。

[查看原文](https://the-decoder.com/anthropic-wants-to-do-for-physical-hardware-what-its-model-context-protocol-did-for-software/)

---

## TechBBQ聚焦欧洲如何掌握人工智能控制权 {#news-3}

> 在哥本哈根举行的TechBBQ会议上，欧洲投资者、创业者和运营者围绕谁应控制AI展开讨论。与会者也关注欧洲如何获得对AI技术及基础设施更大的控制权。

![TechBBQ聚焦欧洲如何掌握人工智能控制权](https://techcrunch.com/wp-content/uploads/2026/08/TechBBQ.jpg?resize=1200,800)

本届Nordic TechBBQ主题为“Emerging from Agency”。文章称，Anthropic的AI模型Mythos和Fable今年早些时候对欧洲以外用户变得不可用。

这一事件促使欧洲AI生态重新思考模型及其基础设施的所有权，但与会者对其影响存在不同说法。

Ellen de Brever称，讨论重点不是更智能的机器，而是人的判断以及谁能继续掌握主导权。

Signal总裁Meredith Whittaker讨论隐私与AI能否共存，并反对将AI助手和智能体整合进操作系统。Emad Mostaque则讨论智能体劳动力对经济和个人主权的影响。

[查看原文](https://techcrunch.com/2026/08/29/at-techbbq-europes-ai-conversations-kept-coming-back-to-whos-actually-in-control/)

---

## Warp基于Claude构建可自我改进的智能体 {#news-4}

> AI终端与智能体开发环境**Warp**介绍了其基于Claude Platform构建的智能体系统。该系统通过Agent Skills、人工反馈和后续技能构建自我改进循环。

![Warp基于Claude构建可自我改进的智能体](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8f1a88683b6dcd40c0dbc2_og_how-warp-builds-self-improving-agents-on-claude.jpg)

**Warp**由Zach Lloyd于2020年创立，技术栈包括Rust、Golang、GitHub Actions及内部智能体编排平台Oz。

Warp称其已融资7300万美元，每月有80万名开发者使用，财富500强企业中有56%使用Warp。

Warp表示，截至文章发布时已有1000万次Claude Code会话在其平台内运行，每周超过40万次，并累计进行4000万次Warp Agent对话。

该团队称，用户反馈通常会在智能体会话结束后消失，因此采用基于Agent Skills的框架，将功能知识、指令和人工反馈纳入后续技能构建。上述业务与使用数据为Warp披露，原文未提供独立核验信息。

[查看原文](https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude)

---

## 中国娱乐业AI视频已开始取代演员与主播 {#news-5}

> 据报道，中国2026年第一季度发布的128,000部短剧中，95%由人工智能生成，相关技术正影响演员和直播从业者。

![中国娱乐业AI视频已开始取代演员与主播](https://the-decoder.com/wp-content/uploads/2026/08/china_flag_visual-1.png)

《金融时报》报道称，一些演员在被解雇前，被要求将自己的声音和肖像交给人工智能工具使用。

报道还称，与人工智能相关的劳动争议正在快速增加。

关于演员被迫交出声音和肖像的情况，相关信息来源于《金融时报》报道。

[查看原文](https://the-decoder.com/ai-generated-videos-are-already-displacing-actors-and-livestreamers-across-chinas-entertainment-industry/)

---

## 本地运行大语言模型：离线、隐私与硬件门槛 {#news-6}

> 大型语言模型如今可在个人电脑上本地运行，无需依赖云端服务。本地部署可提供离线访问和更高隐私性，但需要用户自行维护并承担硬件限制。

![本地运行大语言模型：离线、隐私与硬件门槛](https://media.wired.com/photos/6a915ae02fa9a47ca7d480c1/191:100/w_1280,c_limit/RunAChatbot.jpg)

本地运行模型无需将数据发送到云端，可减少部分隐私风险，也能避免部分月度订阅费用和使用次数限制。

**Meta**、**Google**等公司提供可免费下载的语言模型，支持在Windows、macOS和Linux系统上运行。

本地模型通常不如付费应用中的模型先进或运行迅速，但可能满足日常使用需求；macOS通常更受AI爱好者偏好。

运行本地LLM至少需要8GB内存，16GB更理想；最大、最快的模型可能需要32GB或更多内存。

[查看原文](https://www.wired.com/story/how-to-run-your-own-local-llm/)

---

## vLLM v0.28.0 优化 Kimi-K3 并支持 DeepSeek V4 稀疏 MLA {#news-7}

> **vLLM v0.28.0** 包含来自 270 位贡献者的 584 次提交，其中包括 76 位新贡献者。该版本重点推进了 Kimi-K3、DeepSeek V4 和推测解码支持。

![vLLM v0.28.0 优化 Kimi-K3 并支持 DeepSeek V4 稀疏 MLA](https://opengraph.githubassets.com/4ebc6bdc52e9be13e062849c7d527d88f083515ccff086b45b804e1e708e9324/vllm-project/vllm/releases/tag/v0.28.0)

该版本针对 `Kimi-K3` 进行了跨栈优化，并支持其在 ROCm 和 V2 模型运行器上运行。

vLLM v0.28.0 为 `DeepSeek V4` 增加稀疏 MLA 对普通解码、MTP 和 DSpark 推测解码的端到端支持。

版本还推进了 DFlash2、DSpark 置信度调度验证，并为草稿模型自动启用异步调度。

该版本增加分层 KV 缓存卸载，将 `max_num_batched_tokens` 默认值从 8192 提高至 16384，并默认启用 Mamba 模型前缀缓存。

破坏性变更包括将 `bitsandbytes` 支持迁移至仓库外插件。由于发布说明页面加载异常且内容截断，无法确认后续变更。

[查看原文](https://github.com/vllm-project/vllm/releases/tag/v0.28.0)

---

## THU-MAIC/OpenMAIC登上GitHub热门项目榜 {#news-8}

> **THU-MAIC/OpenMAIC** 入选 GitHub Trending 项目，项目使用 TypeScript 编写，旨在让用户一键获得沉浸式、多智能体学习体验。

OpenMAIC 的全称是 Open Multi-Agent Interactive Classroom。

项目目前拥有 22,079 个 Stars，当天新增 907 个 Stars。

该项目使用 TypeScript 编写，聚焦多智能体互动课堂体验。

[查看原文](https://github.com/THU-MAIC/OpenMAIC)

---

## Neon数据库项目登上GitHub热门项目榜 {#news-9}

> **neondatabase/neon** 入选 GitHub Trending 项目。该项目使用 Rust 编写，并将数据库存储与计算分离。

Neon 旨在提供自动扩缩容、类似代码的数据库分支和缩容至零功能。

项目目前拥有 22,987 个 GitHub Stars，当天新增 10 个 Stars。

Neon 的核心设计是将存储与计算分离。

[查看原文](https://github.com/neondatabase/neon)

---

## Grafana Alloy 开源观测平台支持多类型遥测管道 {#news-10}

> **Grafana Alloy** 是一个开源的 OpenTelemetry Collector 发行版，内置 Prometheus 管道，支持指标、日志、追踪和 profiles。

![Grafana Alloy 开源观测平台支持多类型遥测管道](https://opengraph.githubassets.com/b520dfb7b8faab22994f276368fcd14b6aae65903974c688d20d77cb5d258537/grafana/alloy)

Alloy 使用基于表达式的配置语法构建可编程观测管道，并支持 OpenTelemetry Collector 的数十个组件。

该项目可与 OpenTelemetry Collector、Prometheus、Grafana、Loki、Grafana Pyroscope 及 Kubernetes 生态系统集成。

Alloy 支持通过模块共享管道，也可以配置多个实例组成集群，以实现自动工作负载分配。

项目支持从服务器获取配置，用于集中式配置管理，并内置用于可视化和调试管道的用户界面。

[查看原文](https://github.com/grafana/alloy)

---

## JetBrains 发布面向代码代理的现代 Go 指南 {#news-11}

> **JetBrains/go-modern-guidelines** 提供帮助代码代理编写现代 Go 代码的指南，并会根据项目的 `go.mod` 检测 Go 版本。

![JetBrains 发布面向代码代理的现代 Go 指南](https://opengraph.githubassets.com/72a0dade21eb2687c174a55d41fcdc1f92ced8028c1d1353814df66a6a4ff2dd/JetBrains/go-modern-guidelines)

指南要求代码代理使用项目 Go 版本及之前可用的语言特性和标准库新增功能。

项目鼓励优先采用现代 Go 写法，包括 `max`、`slices.Contains`、`cmp.Or`、`new(42)` 和 `errors.AsType[T](err)`。

指南覆盖 Go 1.0 至 Go 1.27 的实用特性，并提供 Junie、Claude Code、Codex 和 Cursor 的使用指南。

首次使用市场集成时，系统会通过 `go install` 安装小型 CLI；该 CLI 位于本地缓存，不会修改用户项目。项目说明要求 Go 1.25 或更高版本，较旧版本可能依赖 `GOTOOLCHAIN=auto` 获取兼容工具链。

[查看原文](https://github.com/JetBrains/go-modern-guidelines)

---

## Claude Skills 资源项目 Star 达 73,874 {#news-12}

> GitHub Trending 页面显示，**ComposioHQ/awesome-claude-skills** 是使用 Python 编写的热门项目，当前拥有 73,874 个 Stars。

**ComposioHQ/awesome-claude-skills** 是 GitHub Trending 项目，使用 Python 语言编写。

项目当前拥有 73,874 个 Stars，当天新增 74 个 Stars。

该项目整理了 Claude Skills、资源和工具，用于定制 Claude AI 工作流。

[查看原文](https://github.com/ComposioHQ/awesome-claude-skills)

---

## LAION发布开放视频数据集，含1000万小时素材 {#news-13}

> **LAION**发布面向AI研究开放的Big Video Dataset（BVD）。该数据集包含8000万段视频、1000万小时运行时长和5500万个自动描述片段。

![LAION发布开放视频数据集，含1000万小时素材](https://the-decoder.com/wp-content/uploads/2024/08/images_database_ai_generated_data_files_online_storage-1.png)

使用BVD训练的模型在基准测试中最多超过此前的InternVid 2.1个百分点。

文章称，LAION可能依据2024年汉堡法院的一项裁决，收集受版权保护的内容用于非商业研究。

该裁决被文章描述为允许为非商业研究收集受版权保护的内容，但相关法律依据仍使用了谨慎表述。

[查看原文](https://the-decoder.com/laion-drops-massive-open-video-dataset-with-10-million-hours-of-footage-for-ai-research/)

---

## Debian投票通过负责任使用生成式人工智能 {#news-14}

> Debian关于大型语言模型使用问题的全民决议投票结果公布，第5项“负责任地使用生成式人工智能”获胜。

![Debian投票通过负责任使用生成式人工智能](https://static.lwn.net/images/logo/barepenguin-70.webp)

Debian既不认可也不禁止在项目发布的软件、软件包、文档及其他媒体的开发、维护或编写中使用生成式人工智能工具。

所有贡献无论使用何种工具制作，都必须满足相同的质量、正确性、可维护性和法律合规标准。

使用生成式人工智能工具不会减轻贡献者对提交工作的责任。贡献者应理解、审查、测试并在适当情况下修改相关输出。

文章中的评论者解读不等同于Debian正式决议内容。

[查看原文](https://lwn.net/Articles/1091231/)

---

## 文章称良好组织文化比AI工具更能提升生产力 {#news-15}

> 文章作者Gregor Ojstersek认为，AI能够提升生产力，但前提是组织具备合适的文化。文章将良好组织文化称为比AI工具更重要的生产力因素。

![文章称良好组织文化比AI工具更能提升生产力](https://substackcdn.com/image/fetch/$s_!mpv7!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc7e34287-d1ea-4437-960e-c80e70dd341e_1600x844.jpeg)

作者表示，团队过度关注AI工具，却没有足够关注使用这些工具的工作环境。

文章称，管理者说“有了AI就不需要那么多人”会破坏良好文化，并降低员工的心理安全感。

文章指出，更多的MCP、规则和更大的上下文窗口能让智能体获取更多信息，但不等于智能体理解这些信息。

文章介绍的“上下文层”旨在为智能体提供完成特定任务所需的信息。相关生产力判断主要来自作者的个人经历和观察，并非量化研究结论。

[查看原文](https://newsletter.eng-leadership.com/p/good-culture-is-the-biggest-productivity)

---

## 得州汽车保险加收一美元资助Flock摄像头 {#news-16}

> 得州一项法律使居民汽车保险费用每年增加1美元，以应对催化转换器盗窃。《得州论坛报》称，其中至少3000万美元被用于扩展**Flock**监控摄像头网络。

![得州汽车保险加收一美元资助Flock摄像头](https://i0.wp.com/www.texastribune.org/wp-content/uploads/2026/08/TT_FLOCK-MONEY-TEXAS_03-.jpg?fit=2560%2C1707&ssl=1&quality=100&w=1200&h=630)

Motor Vehicle Crime Prevention Authority已发放至少95笔资助，帮助执法机构购买和维护约2000个**Flock**摄像头；另有1590万美元用于帮助得州公共安全部增加近1200个摄像头。

截至报道时，这项费用已促成至少3200个**Flock**摄像头。该机构还批准300万美元，用于未来一年沿得州收费公路安装583个摄像头。

这项费用预计已筹集8100万美元，其中5080万美元投入234笔资助，覆盖警员、犯罪分析师、检察相关律师及无人机等监控设备费用。

在媒体多次请求置评后，州长**Greg Abbott**办公室表示暂停用于地方资助购买**Flock**摄像头的州级资金。报道同时指出，部分城市的摄像头资金主要来自联邦政府，相关限制仍在澄清。

[查看原文](https://www.texastribune.org/2026/08/28/texas-flock-cameras-auto-insurance-fee-mvcpa-grants/)

---

## 加州隐私法下，百余家公司数据请求调查 {#news-17}

> 一名作者依据《加州消费者隐私法》向100多家公司提交个人数据请求，以了解这些企业掌握的信息。麦当劳随后提供了一份515页的个人数据报告。

作者向**麦当劳**请求其收集的全部个人数据，几天后收到一份详细记录其应用互动的515页报告。

报告还预测作者不会停止在该公司消费，展示了企业可能基于个人数据形成的用户判断。

《加州消费者隐私法》于2020年生效，允许个人请求大型数据收集企业提供相关个人信息副本。

该法律还赋予个人拒绝出售个人信息和要求删除个人信息的权利；文章摘要称部分请求出现混乱或无结果，但未具体说明哪些公司删除了数据。

[查看原文](https://arstechnica.com/tech-policy/2026/08/i-asked-100-companies-for-my-data-some-deleted-it-instead/)

---

## GitHub邀请用户参加旧金山Universe活动 {#news-18}

> **GitHub**发布信息，邀请用户参加GitHub Universe活动。活动将于10月28日至29日在旧金山举行。

**GitHub**公布了GitHub Universe活动信息，并邀请用户参与。

活动地点为旧金山，日期为10月28日至29日。信息同时提供了GitHub Universe活动网站链接。

[查看原文](https://bsky.app/profile/github.com/post/3muaknazkw62o)

---

## BYOK将增加自定义扩展以满足进阶写作需求 {#news-19}

> **BYOK**是一款强调专注纯文本起草的单一用途设备。部分用户希望用它记笔记、撰写剧本或组织长篇小说，创始人正权衡相关需求。

![BYOK将增加自定义扩展以满足进阶写作需求](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/268605_BYOK_TOBrien_0016.jpg?quality=90&strip=all&crop=0,0,100,100)

**BYOK**目前主打无多余功能的写作体验，适合专注于纯文本内容起草。

部分用户希望将设备用于记笔记、撰写剧本，以及组织篇幅庞大的小说。

创始人Nick Sjolinder一直在设法平衡设备的单一用途定位与进阶用户需求。

现有信息未说明自定义扩展的具体功能、发布时间，或其是否已经正式推出。

[查看原文](https://www.theverge.com/gadgets/986427/distraction-free-writing-gadget-byok-scripts-extensions)

---

## 英伟达AI优势正从GPU扩展至数据中心系统 {#news-20}

> 随着亚马逊、谷歌等云服务商研发自有芯片，英伟达正将竞争优势扩展到围绕GPU的数据中心系统与基础设施。

![英伟达AI优势正从GPU扩展至数据中心系统](https://techcrunch.com/wp-content/uploads/2026/08/jense-nvidi-chip-GettyImages-2266485392.jpg?resize=1200,800)

英伟达推出的 **Vera Rubin** 架构，将 `Rubin GPU`、`Vera CPU`、`Groq 3 LPX` 推理加速器，以及存储和网络组件组合在类似机架的系统中。

这些系统重点并非直接处理令牌，而是提升GPU之外各部分的运行效率。`Vera CPU`主要负责数据编排，将数据在合适时间传送至GPU。

英伟达存储技术副总裁Jason Hardy称，Vera CPU在相关操作中最高带来约3倍提升。该数据未提供独立验证或具体测试条件。

[查看原文](https://techcrunch.com/2026/08/29/nvidias-ai-advantage-is-moving-beyond-the-gpu/)

---

## Galaxy Z Flip 8重新定义折叠关闭状态体验 {#news-21}

> 三星将 **Galaxy Z Flip 8** 设计为更多在折叠关闭状态下使用。与过去强调简洁界面和基础功能的思路相比，这款手机重新思考了外屏的使用方式。

![Galaxy Z Flip 8重新定义折叠关闭状态体验](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/samsung-galaxy-z-flip-8-review-13.jpg?quality=90&strip=all&crop=0,0,100,100)

三星过去主张翻盖手机关闭时提供简洁界面、通知和少量小组件等基础功能。部分用户及摩托罗拉则推动关闭状态下提供完整的 Android 体验。

**Galaxy Z Flip 8** 的硬件相比上一代几乎没有变化，但外屏更像普通 Android 手机。用户也更容易访问各项功能的完整版本。

所给原文在介绍外屏功能处被截断，完整功能列表无法据此确认。

[查看原文](https://www.theverge.com/tech/986033/samsung-galaxy-z-flip-8-review)

---

## Sony Music与Warner Chappell起诉Anthropic版权侵权 {#news-22}

> Sony Music和Warner Chappell已在美国加利福尼亚北区联邦地区法院起诉Anthropic，涉及“数万件”受版权保护的作品。原告寻求损害赔偿及其他救济。

![Sony Music与Warner Chappell起诉Anthropic版权侵权](https://platform.theverge.com/wp-content/uploads/sites/2/2026/01/STK269_ANTHROPIC_2_A.jpg?quality=90&strip=all&crop=0,0,100,100)

原告要求每件作品最高赔偿15万美元，并要求针对每次可识别的版权数据被删除行为，最高赔偿2.5万美元。

如果法院判原告胜诉并适用最高赔偿额，赔偿总额可能达到数十亿美元，但诉讼结果目前尚未确定。

文章称，Anthropic近期已就出版业提起的一宗诉讼支付15亿美元和解金。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/986438/sony-music-warner-chappell-anthropic-lawsuit-copyright)

---

## OpenAI停止向Cursor提供服务，称与马斯克合同记录有关 {#news-23}

> **OpenAI**正在停止向AI编程工具**Cursor**提供服务。OpenAI表示，此举与埃隆·马斯克过去违反合同的记录有关。

![OpenAI停止向Cursor提供服务，称与马斯克合同记录有关](https://the-decoder.com/wp-content/uploads/2026/06/openai_logo_background_dark.png)

Cursor是在**SpaceX**收购该公司后被停止服务的。

Cursor联合创始人Michael Truell淡化了这一影响，称OpenAI模型仅占Cursor AI流量的5%。

[查看原文](https://the-decoder.com/openai-cuts-off-cursor-after-spacex-acquisition-citing-musks-history-of-breaking-contracts/)

---

## Vijay Pande创办AI原生生物科技投资机构VZVC {#news-24}

> 离开a16z约40亿美元规模的生物科技业务后，Vijay Pande创办了规模小得多、以AI为原生基础的VZVC。

Vijay Pande去年离开了**a16z**规模约40亿美元的生物科技业务。

此后，他创办了规模小得多、以AI为原生基础的**VZVC**。

Pande认为，生物学正从“发现”科学转向“工程”科学，但临床试验成本仍然非常高。

他表示，相较封闭数据集，开放共享的数据集才会真正让AI改变医学。

[查看原文](https://techcrunch.com/2026/08/29/were-not-doing-30-bets-a-year-vijay-pande-on-betting-small-after-running-4-billion-at-a16z/)


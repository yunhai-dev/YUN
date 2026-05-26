---
title: 科技早报 2026-05-26
category: "科技, 科技早报"
excerpt: DeepSeek旗舰模型永久降价75%，谷歌搜索25年来首次AI改版，AI破解数学难题，React曝满分远程代码执行漏洞。
lastEdited: 2026年5月26日
tags: [科技早报, AI, DeepSeek, 谷歌, AlphaProof, 安全漏洞, React, 开源]
imageUrl: 
---

## 概览

### 要闻

- [颠覆80年空气动力学原理：分布式微粗糙表面实现减阻43.6%](#news-1)
### AI 与机器学习

- [DeepSeek顶级模型永久降价75%，价格低于GPT-5.5三十多倍](#news-2)
- [谷歌25年来首次重新设计搜索框：AI驱动对话式搜索新时代](#news-3)
- [Salesforce 发布新 Slackbot 智能助手，挑战微软谷歌](#news-4)
- [AlphaProof Nexus以数百美元破解数十年数学难题](#news-5)
- [研究人员让Claude Code自主发现AI推理控制算法，算力降低70%](#news-6)
- [《麻省理工科技评论》圆桌：AI 能学会理解世界吗？](#news-7)
### GitHub 热门项目

- [GitHub 19k星AI课程：从零构建代理，435节课20阶段](#news-8)
- [Bevy引擎：Rust数据驱动游戏引擎持续迭代，星标超46k](#news-9)
- [热门项目 Understand-Anything 可将代码转为知识图谱](#news-10)
- [PhotoPrism：AI赋能的去中心化相册管理](#news-11)
- [高性能AI API代理网关CCX支持多模型协议转换](#news-12)
- [OpenAI 开源终端编码代理 Codex，获 85.7k 星标](#news-13)
### 开源生态

- [Claude Code月费高达200美元，Goose免费提供类似能力](#news-14)
- [Rust语言性能剖析演讲幻灯片及基准测试开源发布](#news-15)
- [Trdo：一款优秀的 Windows 免费开源电台应用](#news-16)
### 开发者工具

- [React 曝满分远程执行漏洞，Next.js 被指供应商锁定](#news-17)
- [这些浏览器扩展助你掌控YouTube体验](#news-18)
### 安全与隐私

- [苹果发布 macOS Tahoe 26.5，修复内核内存泄露与沙箱逃逸等严重漏洞](#news-19)
- [CISA承包商泄漏AWS GovCloud密钥于GitHub](#news-20)
- [Canvas数据泄露波及全美近9000教育机构教学中断](#news-21)
- [微软四月安全更新修复167个漏洞，SharePoint零日正被活跃利用](#news-22)
### 产品与平台

- [Xreal与谷歌合作智能眼镜 Project Aura 亮相，目标明年盈亏平衡](#news-23)
- [Valve 第二代 Steam 手柄评测：售价 99 美元，TMR 摇杆，仅限 Steam 使用](#news-24)
---

## 颠覆80年空气动力学原理：分布式微粗糙表面实现减阻43.6% {#news-1}

> 日本东北大学的研究团队首次证明，通过施加分布式微粗糙度（DMR），可在特定条件下将空气动力阻力降低高达43.6%，动摇了‘光滑表面才能减阻’的经典飞行器设计原则。

![颠覆80年空气动力学原理：分布式微粗糙表面实现减阻43.6%](https://media.wired.com/photos/6a0f1d82527cc03d8afd9e26/191:100/w_1280,c_limit/1341532824)

80多年来，航空工程领域普遍认为物体表面必须光滑以降低气动阻力。但**日本东北大学**的 **Aiko Yakino** 研究组通过实验证明，微小的表面不规则反而能显著推迟层流到湍流的转换。

他们研发的**分布式微粗糙度（DMR）**技术与“鲨鱼皮”结构不同，利用随机微凸起干扰边界层，从而延迟转捩。实验在**全球最大1米磁悬浮支撑系统**上进行，以消除支架干扰。

测试显示，DMR涂层模型将临界雷诺数从1.9×10⁶提高至2.2×10⁶，并在转捩区实现最高43.6%的减阻。这项研究为未来高效飞行器设计提供了全新思路。

[查看原文](https://www.wired.com/story/a-fundamental-principle-of-aeronautical-engineering-has-been-overturned/)

---

## DeepSeek顶级模型永久降价75%，价格低于GPT-5.5三十多倍 {#news-2}

> **DeepSeek**宣布其旗舰模型`V4-Pro`的75%折扣成为永久性调整，API输出价格至少比OpenAI的`GPT-5.5`便宜34倍。

![DeepSeek顶级模型永久降价75%，价格低于GPT-5.5三十多倍](https://the-decoder.com/wp-content/uploads/2026/05/deepseek_logo_money.png)

`V4-Pro`的输入价格降至每百万tokens 0.435美元，比`GPT-5.5`便宜至少11.5倍。

输出价格优势更为突出，约为`GPT-5.5`的1/34。

这一激进定价可能对西方AI提供商构成显著竞争压力，尤其在token密集的智能代理系统场景中。

[查看原文](https://the-decoder.com/deepseek-makes-its-75-percent-discount-permanent-pricing-output-tokens-at-least-34x-below-gpt-5-5/)

---

## 谷歌25年来首次重新设计搜索框：AI驱动对话式搜索新时代 {#news-3}

> 谷歌在I/O大会上宣布了搜索框25年来的首次重大改版，将其从关键词输入转变为支持文本、图像、视频等多种输入的AI对话入口。同时，AI Overviews与AI Mode融合，Gemini 3.5 Flash驱动，生成式UI和信息代理功能亮相。

新版搜索框可接受文本、图片、PDF、视频甚至Chrome标签页作为输入，彻底告别单纯关键词模式。

AI Overviews和AI Mode已整合为统一搜索体验，AI Mode月活超10亿，AI Overviews月活超25亿。

底层由**Gemini 3.5 Flash**模型驱动，谷歌称其几乎所有基准测试优于前代，且输出速度提升四倍。

新增“生成式UI”可实时构建定制化小组件和交互式视觉，还推出可配置的“信息代理”监视全网特定条件并推送综合更新。

[查看原文](https://venturebeat.com/technology/google-just-redesigned-the-search-box-for-the-first-time-in-25-years-heres-why-it-matters-more-than-you-think)

---

## Salesforce 发布新 Slackbot 智能助手，挑战微软谷歌 {#news-4}

> Salesforce 重新设计了 Slackbot，将它从简单的通知助手升级为企业级 AI 代理，能执行数据搜索、文档起草与任务。现已面向 Business+ 和 Enterprise+ 客户免费提供。

新版 Slackbot 现在由 Anthropic 的 Claude 模型驱动，并计划在未来支持 Google Gemini 和 OpenAI 等模型。

Salesforce 明确表示不会使用客户数据训练任何模型，以确保安全和隐私。

内部测试显示，在 8 万名员工中，采纳率达三分之二，80% 定期使用，满意度达 96%，每周节省 2 至 20 小时。

试点客户 Beast Industries 报告称，员工每天可节省多达 90 分钟；未来还会添加日历预订和图像生成等功能。

[查看原文](https://venturebeat.com/technology/salesforce-rolls-out-new-slackbot-ai-agent-as-it-battles-microsoft-and)

---

## AlphaProof Nexus以数百美元破解数十年数学难题 {#news-5}

> **AlphaProof Nexus**自主解决了9个开放的Erdős问题，其中包括两个困扰数学家56年的难题，每次推理成本仅数百美元。

![AlphaProof Nexus以数百美元破解数十年数学难题](https://the-decoder.com/wp-content/uploads/2026/05/google_deepmind_alpha_evolve_llm_math.png)

由**Google DeepMind**开发，使用`Lean`验证每步证明。

总体成功率约为2.5%。

推理方式与**OpenAI**的自然语言方法不同。

[查看原文](https://the-decoder.com/google-deepminds-alphaproof-nexus-solves-decades-old-math-problems-for-a-few-hundred-dollars/)

---

## 研究人员让Claude Code自主发现AI推理控制算法，算力降低70% {#news-6}

> 马里兰大学、谷歌、Meta等机构的研究人员利用AutoTTS，让编码智能体自主发现了AI推理控制算法。该算法相比标准自一致性方法，在匹配准确率的同时，算力成本降低约70%。

![研究人员让Claude Code自主发现AI推理控制算法，算力降低70%](https://the-decoder.com/wp-content/uploads/2026/05/autotts-agent-decides-reasoning-depth-nano-banana-pro.jpg)

来自**马里兰大学**、**谷歌**、**Meta**等机构的研究人员，利用`AutoTTS`框架让一个编码智能体自主搜索AI推理控制算法。

该算法在保持与标准自一致性方法相当准确率的同时，将算力消耗降低了约70%。

整个搜索过程仅花费40美元，耗时160分钟。

[查看原文](https://the-decoder.com/researchers-let-claude-code-discover-ai-scaling-algorithms-that-humans-probably-wouldnt-have-designed/)

---

## 《麻省理工科技评论》圆桌：AI 能学会理解世界吗？ {#news-7}

> AI公司正致力于构建能理解外部世界的系统，以突破大语言模型的局限。近期发展将世界模型推至AI讨论的前沿。

![《麻省理工科技评论》圆桌：AI 能学会理解世界吗？](https://wp.technologyreview.com/wp-content/uploads/2026/05/thumbnail-Test.png?resize=1200,600)

**世界模型**成为近期AI研究的热点，各方试图让AI从数字空间走向真实物理环境。

《麻省理工科技评论》主编 **Mat Honan** 与高级AI编辑 **Will Douglas Heaven**、AI记者 **Grace Huckins** 在5月21日的圆桌中深入探讨了这一趋势。

相关报道还包括《Pokémon GO如何为送货机器人提供厘米级视觉》、《当下AI十大关键：世界模型》以及**Yann LeCun**对AI未来的大胆构想。

[查看原文](https://www.technologyreview.com/2026/05/21/1137756/roundtables-can-ai-learn-to-understand-the-world/)

---

## GitHub 19k星AI课程：从零构建代理，435节课20阶段 {#news-8}

> 该项目提供435节课程，覆盖从数学基础到AI代理生产系统的完整学习路径，预计学习时长约320小时。

![GitHub 19k星AI课程：从零构建代理，435节课20阶段](https://opengraph.githubassets.com/f9f11d65957a44b3b9e8d1798b7b250b42ccca685e43cf6d993056948550904b/rohitg00/ai-engineering-from-scratch)

课程使用 **Python**、**TypeScript**、**Rust** 和 **Julia** 四种语言，分20个阶段从数学基础逐步深入到代理和生产系统。

教学方法强调先手工实现算法，再使用 `PyTorch` 等生产库对比，每节课产出可复用工件如提示词或MCP服务器。

项目在GitHub获19.4k星标和3.2k复刻，采用 **MIT** 许可证，提供在线阅读、克隆运行或通过AI助手测试三种入门方式。

[查看原文](https://github.com/rohitg00/ai-engineering-from-scratch)

---

## Bevy引擎：Rust数据驱动游戏引擎持续迭代，星标超46k {#news-9}

> Bevy是一个采用Rust编写的数据驱动游戏引擎，永久免费开源，采用面向数据的实体组件系统（ECS）架构。目前仍处于早期开发阶段，平均每3个月发布一次包含破坏性API变更的新版本。

![Bevy引擎：Rust数据驱动游戏引擎持续迭代，星标超46k](https://repository-images.githubusercontent.com/234798675/18016580-dab2-11ea-9864-452f7149499c)

Bevy项目在GitHub上已获得**46.3k星标**和**4.6k分叉**，提交次数达11,516次，社区活跃。

引擎的最低支持Rust版本（MSRV）通常接近最新的Rust稳定版，对开发者版本要求较高。

项目强调数据导向设计，通过ECS架构实现高效并行和模块化，但文档尚不完善，重要功能仍在开发中。

开发者需注意API破坏性更新频繁，约每3个月发布一次新版本，适合愿意追随快速迭代的Rust爱好者。

[查看原文](https://github.com/bevyengine/bevy)

---

## 热门项目 Understand-Anything 可将代码转为知识图谱 {#news-10}

> `Understand-Anything` 可将任意代码转化为支持探索、搜索与提问的交互式知识图谱，并能与 `Claude Code`、`Codex`、`Cursor`、`Copilot`、`Gemini CLI` 等工具协同工作。

![热门项目 Understand-Anything 可将代码转为知识图谱](https://opengraph.githubassets.com/6480f20fd75bc1f204e61350fff14f3455c1f72a763825b6f4550d80d791976a/Lum1104/Understand-Anything)

**Understand-Anything** 项目使用 TypeScript 开发，在 GitHub 上已获逾 3.2 万星。

该知识图谱工具单日新增 5,604 星，显示极高社区关注度。

它支持与 `Claude Code`、`Codex`、`Cursor`、`Copilot`、`Gemini CLI` 配合，提升代码理解效率。

[查看原文](https://github.com/Lum1104/Understand-Anything)

---

## PhotoPrism：AI赋能的去中心化相册管理 {#news-11}

> **PhotoPrism** 是一款基于AI的照片管理应用，支持自动标签、人脸识别和强大搜索，可运行于本地或私有服务器。

![PhotoPrism：AI赋能的去中心化相册管理](https://repository-images.githubusercontent.com/119160553/92072d42-3351-41a4-81e6-39433aefbaf3)

该应用支持浏览RAW图像和多种视频格式，提供渐进式Web应用（`PWA`）、强大的搜索过滤器、自动标签、人脸识别、**Live Photos**预览以及六张高分辨率世界地图。

可从`Exif`、`XMP`和**Google Photos**中提取元数据，并允许`WebDAV`客户端直接连接至**PhotoPrism**，方便数据互通。

项目完全自筹资金且独立运营，承诺绝不在未经用户同意的情况下出售或与第三方共享用户数据。

社区版可通过`Docker`在Mac、Linux和Windows上部署，并支持树莓派和Apple Silicon等多架构。GitHub上已获39.7k星和2.3k分支。

[查看原文](https://github.com/photoprism/photoprism)

---

## 高性能AI API代理网关CCX支持多模型协议转换 {#news-12}

> **CCX** 是一个开源高性能 AI API 代理与协议转换网关，支持 Claude、OpenAI Chat、OpenAI Images、Codex Responses 和 Gemini 等多种模型服务。

![高性能AI API代理网关CCX支持多模型协议转换](https://opengraph.githubassets.com/2701c2a326878bc17d784d19f2c7232cce1c85136a4898f2ce8e4de24cb2d299/BenedictKing/ccx)

项目提供统一入口与内置 Web 管理控制台，具备通道编排、故障转移、多密钥管理和模型路由等生产级特性。

架构上暴露单一后端入口（端口 3000），映射多服务端点；快速开始支持二进制、Docker 及源码构建，镜像托管于阿里云容器镜像服务。

由**优云智算**（UCloud 旗下 AI 云平台）赞助，提供起价 49 元/月的国内 AI 模型代理套餐；项目采用 MIT 许可证，已获 1.9k 星标和 154 个分支。

[查看原文](https://github.com/BenedictKing/ccx)

---

## OpenAI 开源终端编码代理 Codex，获 85.7k 星标 {#news-13}

> OpenAI 维护的轻量级编码代理 `openai/codex` 在终端中运行，采用 Apache-2.0 许可证，已获 85.7k Star。

![OpenAI 开源终端编码代理 Codex，获 85.7k 星标](https://opengraph.githubassets.com/9142a40566453f173146a4e3d831aff1b62e24e0dc3d19542f83487913ed688b/openai/codex)

项目主要使用 **Rust** 编写（占比 96.0%），同时包含 **Python**、**TypeScript** 等语言。

最新发布版本为 `v0.133.0`，于 2026 年 5 月 21 日推出。

用户可通过 `curl` 脚本、`npm`、`Homebrew` 或下载 **GitHub Release** 二进制文件安装 `Codex CLI`。

`Codex` 支持与 **ChatGPT Plus**、**Pro**、**Business**、**Edu** 或 **Enterprise** 计划集成登录，也可使用 API 密钥（需额外设置）。

[查看原文](https://github.com/openai/codex)

---

## Claude Code月费高达200美元，Goose免费提供类似能力 {#news-14}

> Anthropic推出的终端AI代理Claude Code，订阅费用每月20至200美元不等；而Block开发的开源项目Goose在GitHub上已获超2.6万星标，提供类似功能且免费使用，支持本地运行无需订阅费或使用限制。

**Claude Code**作为Anthropic的终端AI代理，Pro版月费约17-20美元，每5小时限10-40次提示；Max版月费100-200美元，提供50-800次提示并可使用Claude 4.5 Opus。

**Goose**由**Block**开发，开源并在本地运行，无订阅费和用量上限，GitHub已累积26,100+星标，362位贡献者，发布102个版本，最新版1.20.1于2026年1月19日发布。

Goose不绑定特定模型，可连接**Claude**、**GPT-5**、**Gemini**等云端模型，也可通过`Ollama`完全本地运行，确保数据不离开用户机器。

Block建议运行较大本地模型需32 GB内存，较小模型可在16 GB上运作。

独立分析估计Claude Code的周令牌限额为Pro用户约44,000 token，200美元Max计划每次会话约220,000 token，但Anthropic的5%用户数据未获官方确认。

[查看原文](https://venturebeat.com/infrastructure/claude-code-costs-up-to-usd200-a-month-goose-does-the-same-thing-for-free)

---

## Rust语言性能剖析演讲幻灯片及基准测试开源发布 {#news-15}

> 该演讲深入探讨了Rust作为安全、低层级系统编程语言的性能特点和最佳实践，并提供了英俄双语幻灯片及配套基准测试代码。

![Rust语言性能剖析演讲幻灯片及基准测试开源发布](https://opengraph.githubassets.com/45697e95f09dffd172d12d4cdd0ba23d2ed7bf1b44b2a4919ed31e10eae2d233/yugr/rust-slides)

Rust被定义为一种安全、低层级、直接与C++竞争的系统编程语言。

演讲不仅识别了Rust的性能薄弱环节与优势，还提出了相应的改进策略与性能最佳实践。

幻灯片支持英语和俄语两种语言，在C++Russia 2026会议上分享。

仓库中包含了用于评估Rust性能的基准测试。

[查看原文](https://github.com/yugr/rust-slides/)

---

## Trdo：一款优秀的 Windows 免费开源电台应用 {#news-16}

> 《连线》杂志推荐了一款名为 **Trdo** 的免费开源 Windows 应用，让用户通过系统托盘收听网络电台，并支持历史记录与跨平台音乐链接。

![Trdo：一款优秀的 Windows 免费开源电台应用](https://media.wired.com/photos/6a0b416db68d07257efe6909/191:100/w_1280,c_limit/Gear_FreeRadioAppForWindows.jpg)

**Trdo** 可从 **Microsoft Store** 安装，并在系统托盘后台运行，界面简洁。

用户需手动添加电台或使用内置搜索工具，应用会保留播放歌曲的历史，并允许标记喜爱曲目。

该应用可选提供歌曲在 **Spotify**、**Apple Music**、**YouTube Music** 和 **Discogs** 上的链接，但不支持通过“上一首/下一首”按钮切换电台。

作者认为网络电台比算法推荐更适合发现新音乐，曾在 macOS 上使用 **Eter**，直到 **Trdo** 填补了 Windows 平台的空白。

[查看原文](https://www.wired.com/story/trdo-is-a-great-free-radio-app-for-windows/)

---

## React 曝满分远程执行漏洞，Next.js 被指供应商锁定 {#news-17}

> CVE-2025-55182 漏洞在 React Server Components 中被发现，允许未认证远程代码执行，CVSS 评分 10.0；同时 Next.js 15.1+ 被批评仅能在 Vercel 平台使用，引发供应商锁定争议。

![React 曝满分远程执行漏洞，Next.js 被指供应商锁定](https://jsx.lol/assets/512x512.png)

安全研究员 Lachlan Davidson 于 11 月 29 日报告，`React Server Components` 存在高危漏洞 `CVE-2025-55182`，可在未认证条件下远程执行代码，严重程度被评为 10.0 满分。

**Vercel** 对 **Next.js** 相关漏洞的披露方式被指“糟糕、鲁莽且无礼”，文章更声称 `Next.js` 15.1 以上版本离开 **Vercel** 无法使用，是披着开源外衣的供应商锁定。

**React** 自身的 API 设计被指混乱，文档立场不明确，正确用法争论不休；`autofocus` 功能受损，自定义元素仅限实验版，现代特性如 `dialog` 或 `popover` 仍需依赖 `useEffect`。

多位 CTO 反映，**React** 开发者虽然数量众多，但真正理解深层模式、能驾驭复杂场景的人才日益稀缺且成本高昂。

[查看原文](https://jsx.lol)

---

## 这些浏览器扩展助你掌控YouTube体验 {#news-18}

> YouTube 每天上传视频超过2000万个，以下扩展可帮用户更好地管理内容和播放控制。

![这些浏览器扩展助你掌控YouTube体验](https://media.wired.com/photos/6a0b226ac5d1d3f5d3f90767/191:100/w_1280,c_limit/01-improve.jpg)

**Improve YouTube** 可以隐藏侧边栏或视频缩略图，并改变进度条颜色，定制界面外观。

**Enhancer for YouTube** 提供播放速度、画质和音量的快速调节，比内置选项更精细。

**PocketTube** 支持创建订阅分组和子分组，并自动为每个分组生成播放列表。

**Turn Off the Lights** 将视频周围区域变暗，减少评论和推荐视频的干扰。

**DeArrow** 利用用户提交的众包标题和缩略图，替换掉夸张或诱导点击的内容。

[查看原文](https://www.wired.com/story/the-best-browser-extensions-to-get-more-out-of-youtube/)

---

## 苹果发布 macOS Tahoe 26.5，修复内核内存泄露与沙箱逃逸等严重漏洞 {#news-19}

> 苹果发布 macOS Tahoe 26.5，修复内核内存泄露与沙箱逃逸等严重漏洞。

**Accelerate** 组件越界读取漏洞可导致应用拒绝服务。

**App Intents** 漏洞可能允许恶意应用突破沙箱限制。

内核漏洞可泄露内核内存，**IOKit** 释放后使用漏洞可能导致系统异常终止。

相关漏洞由 **Google Threat Analysis Group** 等研究团队发现。

[查看原文](https://support.apple.com/en-us/127115)

---

## CISA承包商泄漏AWS GovCloud密钥于GitHub {#news-20}

> 美国网络安全和基础设施安全局（CISA）的一名承包商维护的公开GitHub仓库暴露了多个高权限AWS GovCloud账户及内部系统的凭证。

![CISA承包商泄漏AWS GovCloud密钥于GitHub](https://krebsonsecurity.com/wp-content/uploads/2026/05/privatecisa.png)

安全研究人员**Philippe Caturegli**发现，名为`Private-CISA`的公开仓库中存在`importantAWStokens`文件，内含三个AWS GovCloud服务器的高管理权限凭证。

另一个文件`AWS-Workspace-Firefox-Passwords.csv`以明文形式列出了数十个CISA内部系统的用户名和密码。

仓库还泄露了CISA内部`artifactory`的凭证，该库用于存储构建软件的所有代码包。

该仓库由政府承包商**Nightwing**的员工维护，接到通知后仓库被下线，但暴露的AWS密钥仍在后续48小时内有效。

CISA确认了泄露事件，并表示目前尚无敏感数据被入侵的迹象，正着手实施额外防护措施。

[查看原文](https://krebsonsecurity.com/2026/05/cisa-admin-leaked-aws-govcloud-keys-on-github/)

---

## Canvas数据泄露波及全美近9000教育机构教学中断 {#news-21}

> 2026年5月7日，教育技术平台Canvas遭勒索攻击致教学中断，勒索组织ShinyHunters声称窃取2.75亿学生和教职工数据。

![Canvas数据泄露波及全美近9000教育机构教学中断](https://krebsonsecurity.com/wp-content/uploads/2026/05/shinyhunters-instructure-canvas.png)

攻击者劫持Canvas登录页面显示赎金要求，母公司Instructure紧急关闭平台并显示维护信息。被盗数据包含姓名、邮箱、学生ID和用户消息，但据称不含密码等敏感信息。

ShinyHunters将赎金截止日从5月6日推迟至12日。匿名消息称部分大学已与攻击者协商付款，该组织已从泄露博客移除相关列表。

安全公司Cloudskope CEO Dipan Mann批评Instructure，并指称这是ShinyHunters近八个月内至少第三次入侵该公司，此前曾导致宾大文件泄露。

[查看原文](https://krebsonsecurity.com/2026/05/canvas-breach-disrupts-schools-colleges-nationwide/)

---

## 微软四月安全更新修复167个漏洞，SharePoint零日正被活跃利用 {#news-22}

> 微软发布四月“补丁星期二”更新，修复167个安全漏洞，包括一个已遭利用的**SharePoint Server**零日漏洞（`CVE-2026-32201`）及被公开披露的**Windows Defender**提权漏洞BlueHammer（`CVE-2026-33825`）。

![微软四月安全更新修复167个漏洞，SharePoint零日正被活跃利用](https://krebsonsecurity.com/wp-content/uploads/2021/07/windupate.png)

`CVE-2026-32201`允许攻击者伪造**SharePoint**内容进行钓鱼、数据篡改或社会工程攻击，目前已观察到活跃利用。

安全研究人员因对微软响应不满而发布了BlueHammer的利用代码，但微软补丁已使其失效。

**Adobe**于4月11日发布**Reader**紧急更新，修复了`CVE-2026-34621`，该漏洞至少从2025年11月起就被利用。

**Google Chrome**更新修复了2026年的第四个零日漏洞`CVE-2026-5281`，共解决21个安全问题。

[查看原文](https://krebsonsecurity.com/2026/04/patch-tuesday-april-2026-edition/)

---

## Xreal与谷歌合作智能眼镜 Project Aura 亮相，目标明年盈亏平衡 {#news-23}

> Xreal CEO 称智能眼镜行业“所有人都在亏钱”，但公司正推出 Project Aura，并计划明年实现盈亏平衡。

![Xreal与谷歌合作智能眼镜 Project Aura 亮相，目标明年盈亏平衡](https://techcrunch.com/wp-content/uploads/2026/05/Screenshot-2026-05-22-at-9.02.36-AM.png?resize=1200,673)

**Xreal** 发布新款智能眼镜 **Project Aura**，配备 OLED 显示屏和配套的 puck 形迷你电脑，目前仅面向开发者提供，商业版本计划今年晚些时候推出。

该眼镜支持沉浸式 **Google Maps**、VR YouTube 视频和手部追踪绘画应用，游戏与网页浏览功能报道存在但未获确认。

CEO 徐驰表示，尽管行业整体亏损，但 Xreal 目标明年通过提升毛利率和削减营销费用实现盈亏平衡。

公司还计划在 2026 年底前完成 IPO，其长期合作伙伴 **谷歌** 也参与了合作。

[查看原文](https://techcrunch.com/2026/05/24/xreal-googles-smartglasses-partner-thinks-it-has-finally-mastered-this-notoriously-tricky-industry/)

---

## Valve 第二代 Steam 手柄评测：售价 99 美元，TMR 摇杆，仅限 Steam 使用 {#news-24}

> Valve 推出第二代 Steam 手柄，售价 99 美元，采用高精度 TMR 摇杆传感器，并配备磁吸式充电底座兼无线接收器。

![Valve 第二代 Steam 手柄评测：售价 99 美元，TMR 摇杆，仅限 Steam 使用](https://media.wired.com/photos/6a0b1a8f5b26f3e1da9832a7/191:100/w_1280,c_limit/Steam%20Controller%20(3)top.jpg)

手柄采用 **TMR** 拇指摇杆传感器，提供更高精度和更长使用寿命。

磁吸式圆盘既可作 **无线接收器**，也能充当充电底座。

该手柄无法用于 **Steam** 平台之外的 PC 游戏，生态锁定明显。

内置陀螺仪校准流程较为困难，且拇指摇杆位置偏高，需用户调整握持姿势。

[查看原文](https://www.wired.com/review/valve-steam-controller-2026/)


---
title: 科技早报 2026-10-14
category: "科技, 科技早报"
excerpt: Google推出机器人模型Gemini 4 Argon，苹果发布HomeView智能家居设备，AI代理安全与开源工具持续升温。
lastEdited: 2026年10月14日
tags: [Google, Gemini, Apple, 智能家居, 机器人, AI代理, 开源项目, 网络安全]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Google发布面向机器人的Gemini 4 Argon模型](#news-1)
- [苹果论文提出利用闲置Apple Silicon搭建分布式GPU云](#news-2)
- [Google推出EmbeddingGemma 2，支持端侧多模态语义检索](#news-3)
- [AI实验室开始购买已倒闭初创公司的数据资产](#news-4)
- [开放模型收益与风险引发业界持续争论](#news-5)
- [Google让Gemini 4 Argon夜间优化20万行Python代码](#news-6)
### GitHub 热门项目

- [Vercel开源skills工具支持多平台安装和调用技能](#news-7)
- [开源项目OpenSEO推出一站式SEO工作流工具](#news-8)
- [Rust 项目 EdgeQuake：用知识图谱增强 GraphRAG 检索](#news-9)
- [DishwasherBench用物理模拟评测模型洗碗装载能力](#news-10)
- [Go 项目 FounderOS：面向单人运营者的开源指挥中心](#news-11)
### 开发者工具

- [PDF TO MP3支持连接AI订阅生成有声书](#news-12)
### 安全与隐私

- [Anthropic 称 Claude 推理令牌提取量下降最高 99%](#news-13)
- [Agent Baseline发布软件工厂安全参考架构](#news-14)
- [美国运通推出框架限制人工智能代理越权购物](#news-15)
- [美国城市为Flock摄像头及服务支付持续增加](#news-16)
### 产品与平台

- [SpaceX整合X、Grok与Cursor推出订阅套餐](#news-17)
- [苹果发布HomeView等设备重启智能家居战略](#news-18)
- [Apple公布HomeView智能家居中枢，售价299美元](#news-19)
- [苹果联合LG与施耐德推出Apple Home智能家居系列](#news-20)
### 硬件与芯片

- [苹果发布HomePod Mini 2上市暂不支持Siri AI](#news-21)
- [Apple发布搭载A19芯片的新款Apple TV 4K](#news-22)
- [第四代Apple TV 4K加入麦克风支持免提呼叫Siri](#news-23)
- [Apple更新HomePod mini并引入S10芯片与Siri AI](#news-24)
---

## Google发布面向机器人的Gemini 4 Argon模型 {#news-1}

> Google推出通用型物理推理模型Gemini 4 Argon，面向机器人技术栈中的工作流程，支持物理理解、代码生成和视觉语义推理。

开发者可通过**Google AI Studio**、`Gemini API`和**Google Antigravity**访问并集成 Argon。

Argon可用于构建和测试机器人应用，工程师也可结合MuJoCo等仿真工具使用。

借助`code-as-policies`，现实世界数据或草图可被转化为经过物理验证的机器人控制及自我改进工作流。

[查看原文](https://developers.googleblog.com/gemini-4-argon-for-robotics/)

---

## 苹果论文提出利用闲置Apple Silicon搭建分布式GPU云 {#news-2}

> **Apple**发布论文介绍`Minions`，可聚合多台macOS设备上的闲置Apple Silicon GPU，执行大规模机器学习推理任务。

![苹果论文提出利用闲置Apple Silicon搭建分布式GPU云](https://mlr.cdn-apple.com/media/Home_1200x630_48225d82e9.png)

`Minions`是一种动态、分布式虚拟GPU云，旨在利用现有硬件，减少额外GPU采购需求。

论文称，该系统支持灵活的GPU推理任务执行，并具备容错能力和资源利用效率。

论文指出，在集中式GPU资源受限的环境中，闲置macOS设备可转化为分布式GPU推理平台。

论文未提供具体性能数据、部署规模或与其他方案的量化对比。

[查看原文](https://machinelearning.apple.com/research/distributed-gpu-cloud)

---

## Google推出EmbeddingGemma 2，支持端侧多模态语义检索 {#news-3}

> Google介绍了拥有 7.4 亿参数的开放权重多模态模型 `EmbeddingGemma 2`，可将文本、图像、视频和音频映射到统一向量空间。

该模型面向隐私优先的设备端检索场景，支持本地低延迟应用。

开发者可通过 `MediaPipe Tasks` 进行跨平台集成，也可使用 `LiteRT` 针对 CPU、GPU 和 NPU 加速器优化性能。

应用场景包括搜索即输入的媒体检索、视频关键帧时刻查找和零样本意图路由。

[查看原文](https://developers.googleblog.com/google-ai-edge-with-embeddinggemma-2/)

---

## AI实验室开始购买已倒闭初创公司的数据资产 {#news-4}

> 部分AI实验室和科技公司正在购买已倒闭或退出市场的初创公司的代码库及工作区数据，用于模型训练和构建模拟工作环境。相关数据包括电子邮件、聊天记录和文档。

**SimpleClosure** 于4月将数据销售加入服务，其 `Asset Hub` 平台已处理超过150笔交易，并预计到2026年底为初创公司带来超过1000万美元收入。

创始人Keelan Miskell已通过出售公司代码库获得约25000美元，并预计从 **Google**、**Notion**、**Figma** 和 **Slack** 工作区数据中获得约15000美元。

SimpleClosure首席执行官Dori Yona表示，目前该公司的交易中有47%包含代码或数据销售。买家包括基础模型实验室、模拟工作区供应商和成熟科技公司。

**Surge AI** 购买数据用于构建强化学习训练场，但真实工作数据相较替代方案的性能提升仍不明确，尚无公司公布对比测试结果。

[查看原文](https://www.technologyreview.com/2026/10/13/1145755/ai-labs-buying-data-from-dead-startups-to-train-models/)

---

## 开放模型收益与风险引发业界持续争论 {#news-5}

> 围绕前沿 AI 模型应开放还是由实验室封闭管理，业界仍在争论。支持者强调开放模型的普惠价值，安全倡导者则关注其滥用风险。

Anthropic上月发布报告称，`GLM-5.3`模型构成重大网络攻击风险。该模型由中国公司 **Z.ai** 于8月发布，可供任何人免费下载和修改。

开放模型通常直接提供模型权重等内部结构信息；封闭模型一般只能通过网站、应用或 API 访问。

英伟达首席执行官 Jensen Huang 支持美国开发更多开放模型；Anthropic首席执行官 Dario Amodei 则倾向更谨慎的开放模型政策。

文章称，截至发表时，Artificial Analysis LLM 排行榜前八名模型均为封闭模型，但开放模型在发展进度上仅落后数月。

[查看原文](https://www.technologyreview.com/2026/10/13/1146366/open-models-have-real-benefits-do-they-outweigh-the-risks/)

---

## Google让Gemini 4 Argon夜间优化20万行Python代码 {#news-6}

> Google工程团队让`Gemini 4 Argon`在无人值守状态下运行一夜，优化Google开源Python Agent Development Kit中的20万行代码库。

团队在任务中使用了`.agents/skills`和`/goal mode`。

这项工作将长会话中的内存会话准备开销降低了40%。

优化后，代码库的冷启动导入速度提升了21%。

提供的信息未说明具体优化步骤、测试方法和性能测量条件。

[查看原文](https://developers.googleblog.com/optimizing-a-200000-line-python-codebase-overnight-with-gemini-4-argon/)

---

## Vercel开源skills工具支持多平台安装和调用技能 {#news-7}

> **vercel-labs/skills** 是面向开放 agent skills 生态的 CLI 工具，命令为 `npx skills`。该工具支持 OpenCode、Claude Code、Codex、Cursor 以及另外75个以上的平台。

![Vercel开源skills工具支持多平台安装和调用技能](https://opengraph.githubassets.com/acfbec44a03d440f121891634593ec4071a1952905909e822ad034f9a67e7f61/vercel-labs/skills)

用户可以运行 `npx skills add vercel-labs/agent-skills` 安装技能，也可以使用 `npx skills use` 生成技能提示词或交互式启动受支持的 coding agent。

`skills use` 会按照与 `skills add` 相同的方式解析来源，将选定技能文件写入临时目录，并默认只向标准输出打印生成的提示词。

工具支持 GitHub 简写、完整 URL、仓库内技能路径、GitLab、Azure Repos、其他 Git URL 和本地路径等来源格式。

该工具同时支持公开和私有仓库；访问私有仓库依赖用户针对仓库 URL 已配置的认证方式。

[查看原文](https://github.com/vercel-labs/skills)

---

## 开源项目OpenSEO推出一站式SEO工作流工具 {#news-8}

> 开源项目 **OpenSEO** 定位为 Semrush 和 Ahrefs 的替代方案，覆盖关键词研究、排名跟踪、竞争对手洞察等 SEO 工作流。项目还提供 MCP 服务器和可复用的 Agent Skills。

![开源项目OpenSEO推出一站式SEO工作流工具](https://opengraph.githubassets.com/344dce1a5062603ae7fb47224d212283cd4889d4eb7c87bbb76116352d4ebe75/every-app/open-seo)

OpenSEO 支持反向链接、网站审计和 AI 可见性等功能，并可供 Claude Code、OpenClaw 和 Hermes 等 AI agent 使用。

项目支持按量付费，用户可以使用自己的 DataForSEO API 密钥，并按实际使用量向 DataForSEO 付费。

托管版本网站为 openseo.so，项目说明称订阅价格为每月10美元。用户也可通过 Docker 或 Cloudflare 自托管，项目方推荐 Cloudflare 方案。

使用 OpenSEO 获取 SEO 数据需要 DataForSEO API 密钥。项目方表示，其他自托管平台的部署支持计划在未来几个月内简化。

[查看原文](https://github.com/every-app/open-seo)

---

## Rust 项目 EdgeQuake：用知识图谱增强 GraphRAG 检索 {#news-9}

> GitHub 项目 **raphaelmansuy/edgequake** 使用 Rust 编写，定位为受 LightRAG 启发的高性能 GraphRAG。该项目当前获得 2,224 个 Stars，当天新增 28 个。

项目旨在将文档转换为知识图谱，以提升检索与生成能力。

**EdgeQuake** 的 GitHub 仓库为 `raphaelmansuy/edgequake`，项目采用 Rust 开发。

[查看原文](https://github.com/raphaelmansuy/edgequake)

---

## DishwasherBench用物理模拟评测模型洗碗装载能力 {#news-10}

> 开源项目 DishwasherBench 以真实洗碗机为基础构建物理模拟游戏，用于评测语言模型的洗碗机装载能力，也支持用户在浏览器中游玩。

![DishwasherBench用物理模拟评测模型洗碗装载能力](https://opengraph.githubassets.com/3a71a7be6ec3b53840caf57e91d23eb841647943be4bfa72068965435e0397fc/composo-ai/DishwasherBench)

DishwasherBench 使用 Bosch SMV4HAX40G 的3D模型和刚体物理，模拟 Eco 50 程序中的喷淋、水滴、径流、污垢及洗涤剂化学过程。

每个关卡结束后，系统根据物品是否清洁评分。除第一关外，后续关卡无法容纳全部物品，玩家需要选择装载内容。

项目目前处于 `0.1.0` 早期发布阶段，模拟结果基于对真实机器进行的一次测试洗涤校准。

当前评分可反映装载是否合理，以及杯子、玻璃杯和锅具是否开口朝下，但尚不能可靠评估盘子和餐具是否堆放到能够洗净。

项目称，装载过程采用确定性的刚体物理，每次运行都可通过重放或再次清洗同一装载进行验证；浏览器用户与通过 MCP 接入的模型使用同一游戏。

[查看原文](https://github.com/composo-ai/DishwasherBench)

---

## Go 项目 FounderOS：面向单人运营者的开源指挥中心 {#news-11}

> GitHub 项目 **Bennettxai/FounderOS** 使用 Go 编写，被描述为面向单人运营者的开源企业指挥中心。项目当前获得 1,103 个 Stars，当天新增 22 个。

**FounderOS** 通过实时仪表板提供通信、漏斗、社交、财务、智能代理和知识图谱等 AI 辅助部门。

项目的 GitHub 仓库为 `Bennettxai/FounderOS`，采用 Go 开发。

[查看原文](https://github.com/Bennettxai/FounderOS)

---

## PDF TO MP3支持连接AI订阅生成有声书 {#news-12}

> PDF TO MP3允许用户利用已订阅的 AI 服务处理文档并制作有声书，并可通过 MCP 连接到 Codex 或 Claude。

![PDF TO MP3支持连接AI订阅生成有声书](https://pdftomp3.com/og-pdf-to-mp3.png)

用户可通过 MCP 将 PDF TO MP3 连接到 Codex 或 Claude。在 Codex 中，需要通过“Settings → Plugins → Add MCP server”添加 Streamable HTTP 类型的 MCP 服务器。

文档处理费用可由用户已有的 AI 订阅承担。语音生成费用由 Google 或 OpenAI 收取，用户需要添加相应的语音密钥。

页面称，Gemini 免费密钥可能遇到速率限制或“高需求”错误。用户也可以在 AI 聊天中附加 PDF，并要求通过 PDF TO MP3 MCP 转换为有声书。

页面说明语音生成按使用量计费，但未列出具体费用和可用性。

[查看原文](https://pdftomp3.com/connect-ai/)

---

## Anthropic 称 Claude 推理令牌提取量下降最高 99% {#news-13}

> Anthropic 表示，针对工业规模模型蒸馏活动的行动已使 Claude 内部推理令牌提取量减少 90% 至 99%。该公司称已封禁数万个账号。

![Anthropic 称 Claude 推理令牌提取量下降最高 99%](https://the-decoder.com/wp-content/uploads/2026/10/anthropic_distillation_defense.png)

Anthropic 将大规模蒸馏攻击与中国公司智谱和月之暗面联系起来。

上述提取量下降幅度、攻击归因和封禁账号数量均为 Anthropic 的表述，提供的原文未给出独立核实信息。

[查看原文](https://the-decoder.com/anthropic-says-it-cut-claude-reasoning-token-theft-by-up-to-99-in-fight-against-industrial-scale-distillation/)

---

## Agent Baseline发布软件工厂安全参考架构 {#news-14}

> Agent Baseline发布了一套用于保护软件工厂的参考架构，其中包含四个在智能体外部实施的安全边界。

该项目由 **Socket** CTO Ahmad Nassri 与来自 Docker、Keycard、Barclays 和 Secure Theory 的负责人共同撰写。

Bluesky 上的 @socket.dev 账号发布了相关信息，帖子发布时间为 2026 年 10 月 13 日。

[查看原文](https://bsky.app/profile/socket.dev/post/3mxru7xsu4s2i)

---

## 美国运通推出框架限制人工智能代理越权购物 {#news-15}

> **American Express**正在推出一项新框架，旨在确保人工智能代理只进行用户授权的购买。该框架或有助于减少代理购物中的错误与争议，但实际效果尚未得到确认。

随着人工智能驱动的购物不断增长，代理执行未经授权操作的风险受到关注。

该框架旨在限制人工智能代理的购买行为，使其仅执行用户明确授权的交易。

原文称，该框架可能有助于防止代价高昂的错误和争议，但这一作用仍未得到确认。

[查看原文](https://techcrunch.com/2026/10/13/amex-introduces-a-framework-to-prevent-ai-agents-from-making-unauthorized-purchases/)

---

## 美国城市为Flock摄像头及服务支付持续增加 {#news-16}

> 美国多个城市向 **Flock Safety** 支付的摄像头维护及相关服务费用持续增加。科文顿警察局的年度支出从2020年的4万美元增至2025年的15.9万美元。

![美国城市为Flock摄像头及服务支付持续增加](https://media.wired.com/photos/6ac9662bc39c424531f330d6/191:100/w_1280,c_limit/How-Much-Flock-Costs-In-Your-City-Business.jpg)

2022年，科文顿支付81250美元，其中37500美元用于购买15台 `Falcon` 摄像头，3750美元用于安装，其余用于维护原有摄像头。

2024年，该市支付113225美元，其中87500美元用于维护35台现有摄像头，并同意随后五年按该费率支付维护费用。

2025年，科文顿支付159000美元，用于摄像头维护和加入 `Drone as First Responder` 项目。该项目使用无人机前往紧急事件现场并回传视频。

截至2026年8月，科文顿已向 **Flock** 支付201000美元。该市最终还将支付多少金额目前尚不清楚，双方未对此报道置评。

[查看原文](https://www.wired.com/story/how-much-does-flock-actually-cost-cities/)

---

## SpaceX整合X、Grok与Cursor推出订阅套餐 {#news-17}

> SpaceX Super Intelligence将**X Premium**、**Grok**和**Cursor**等服务整合为“The X Subscription”套餐。该套餐提供五个档位，月费最高为200美元。

![SpaceX整合X、Grok与Cursor推出订阅套餐](https://techcrunch.com/wp-content/uploads/2023/07/x-twitter.jpg?resize=1200,550)

套餐包含**Grok**聊天功能，以及语音、图像、视频和API支持，还提供Grok的agentic AI Bot与**Cursor** AI编程功能。

用户还可获得**X Premium**的蓝色认证标记、创作者工具和减少广告等付费功能。

The X Subscription分为免费、Plus、Premium、Super和Ultra五档，月费分别为免费、8美元、30美元、100美元和200美元。

随着档位提升，AI使用额度上限增加；免费档功能有限，使用最新Grok模型需要Premium或更高档位。现有X Premium+用户可选择切换或保留原套餐，升级选项将逐步推出。

[查看原文](https://techcrunch.com/2026/10/13/spacexsi-bundles-x-premium-grok-and-cursor-into-one-subscription/)

---

## 苹果发布HomeView等设备重启智能家居战略 {#news-18}

> **Apple**发布首款智能显示屏HomeView、HomePod Mini 2和第四代Apple TV 4K，并公布与LG、Schneider Electric的智能家居合作。

![苹果发布HomeView等设备重启智能家居战略](https://media.wired.com/photos/6ace1a5fe84fc0487425c4d4/191:100/w_1280,c_limit/Apple-HomeView-lineup.png)

HomeView采用7英寸方形显示屏和扬声器底座，运行独立的HomeView Software，不能访问App Store。

设备支持Messages、Safari、FaceTime和Spotify等应用，核心体验由Siri AI驱动。

HomeView最多支持六个iCloud账户，并可通过摄像头和面部识别显示个性化界面。

HomeView售价299美元，已开放预订，计划于11月13日在多个国家和地区上市。部分个性化功能有特定设备、网络和解锁条件。

[查看原文](https://www.wired.com/story/apple-overhauls-its-smart-home-play-with-new-hardware-and-a-home-collection/)

---

## Apple公布HomeView智能家居中枢，售价299美元 {#news-19}

> **Apple**在“Welcome Home”活动中正式公布HomeView智能家居中枢，售价为299美元。该设备配备7英寸方形显示屏，并支持多项智能家居功能。

![Apple公布HomeView智能家居中枢，售价299美元](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Screenshot-2026-10-13-at-9.06.28-AM.png?quality=90&strip=all&crop=0,0,100,100)

HomeView提供壁挂版，以及置于小型扬声器底座上的版本。

设备可用于显示智能家居控制界面，并通过Siri AI获取信息。

HomeView支持视频通话，并可显示HomeKit Secure Video摄像头画面。

该设备还支持Matter控制器和Thread Border Router功能。

[查看原文](https://www.theverge.com/1008810/apple-homeview-reveal-video-watch)

---

## 苹果联合LG与施耐德推出Apple Home智能家居系列 {#news-20}

> **Apple**与**LG Electronics**、**Schneider Electric**合作推出Apple Home Collection，涵盖安全摄像头、视频门铃、门锁和恒温器。该系列由搭载Siri AI的HomeView智能显示器引领。

![苹果联合LG与施耐德推出Apple Home智能家居系列](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Apple-Home-Collection-lineup.png?quality=90&strip=all&crop=0,0,100,100)

Apple表示，Apple Home Collection是一组强调易于设置和使用的智能家居设备。

该系列包括安全摄像头、视频门铃、门锁以及两款恒温器。

这些产品是Apple为Apple Home制造的首批智能家居设备，此前相关产品依赖第三方制造。

Apple将该系列视为进军智能家居领域的重要举措之一。

[查看原文](https://www.theverge.com/tech/1009680/apple-home-collection-doorbell-lock-camera-smart-home-announced)

---

## 苹果发布HomePod Mini 2上市暂不支持Siri AI {#news-21}

> 苹果发布HomePod Mini 2，搭载可支持Siri AI的新芯片，但相关AI功能在上市时尚不可用。产品售价149美元，较上一代上涨20美元。

![苹果发布HomePod Mini 2上市暂不支持Siri AI](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Apple-HomePod-mini-2-color-lineup.png?quality=90&strip=all&crop=0,0,100,100)

HomePod Mini 2新增Sound Glow功能，可让LED灯光与歌曲专辑封面同步。

设备可作为Mac的默认扬声器，最多四台可与新款Apple TV 4K配对组成环绕声系统。

产品提供粉色、绿色、蓝色、白色和黑色，蓝色为新增颜色；上一代产品将停产。

HomePod Mini 2于10月13日开启预订，文章未说明具体发货日期。

[查看原文](https://www.theverge.com/tech/1009672/homepod-mini-2-announced-apple-siri-ai)

---

## Apple发布搭载A19芯片的新款Apple TV 4K {#news-22}

> Apple发布售价299美元的新款Apple TV 4K，搭载A19芯片并集成更新版Siri AI。设备支持无需遥控器或配对HomePod即可进行语音操作。

![Apple发布搭载A19芯片的新款Apple TV 4K](https://techcrunch.com/wp-content/uploads/2026/10/Apple-TV-4K-261013_big.jpg.large_2x.jpg?resize=1200,675)

新款Apple TV 4K配备三个远场麦克风，用户可直接通过Siri搜索内容并询问节目相关信息。

Apple表示，设备可与HomePod mini 2或HomePod 2组成四扬声器环绕声系统。新遥控器还内置扬声器，便于用户通过声音查找。

新款Apple TV 4K已于当天开放预订，将于11月13日上市。

原文援引Bloomberg称，Apple原计划于2024年推出该设备，但AI版Siri延迟可能导致相关家居设备发布推迟。

[查看原文](https://techcrunch.com/2026/10/13/apple-launches-a-new-apple-tv-4k-with-siri-ai-and-remote-free-commands/)

---

## 第四代Apple TV 4K加入麦克风支持免提呼叫Siri {#news-23}

> **Apple**发布第四代Apple TV 4K，新增远场麦克风，可支持免提与Siri对话。新机还支持遥控器查找功能，并提升了家庭环绕声配置能力。

![第四代Apple TV 4K加入麦克风支持免提呼叫Siri](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Apple-TV-4K.png?quality=90&strip=all&crop=0,0,100,100)

第四代Apple TV 4K是首款支持Siri AI语音助手的Apple TV 4K型号，遥控器内置Find My功能。

新款设备最多可配对四台第二代HomePod或HomePod Mini 2，以实现环绕声。

第四代Apple TV 4K售价为299美元，高于上一代发布时的价格，也比当前顶配型号高50美元；当前顶配型号将停产。

新机整体外观与上一代相同，主要改进位于机身内部。原文正文在价格信息后截断，未提供更多完整信息。

[查看原文](https://www.theverge.com/tech/1009663/apple-tv-4k-siri-ai-microphones-4th-gen-announced)

---

## Apple更新HomePod mini并引入S10芯片与Siri AI {#news-24}

> Apple更新HomePod mini智能音箱，售价149美元，搭载S10芯片并集成Siri AI。新款产品将于10月30日上市，消费者可从当天开始预订。

![Apple更新HomePod mini并引入S10芯片与Siri AI](https://techcrunch.com/wp-content/uploads/2026/10/Apple-HomePod-mini-2-color-lineup-261013_big.jpg.large_2x.jpg?resize=1200,675)

新款HomePod mini通过S10芯片改善动态范围、响度和声学表现，并支持语音控制智能家居设备。

设备可监听烟雾报警器等声音，并向用户手机发送通知。Apple表示，Siri AI未来将支持多轮对话。

HomePod mini 2可与新款Apple TV 4K组成四扬声器家庭娱乐系统，也可作为Mac视频通话或播放音乐时的默认扬声器。

新产品提供粉色、绿色、蓝色、白色和午夜色。Apple尚未确定Siri AI何时向买家提供，相关功能将通过未来更新上线。

[查看原文](https://techcrunch.com/2026/10/13/apple-refreshes-its-homepod-mini-with-a-new-chip-and-149-price-tag/)


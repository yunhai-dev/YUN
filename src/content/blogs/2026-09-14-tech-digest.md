---
title: 科技早报 2026-09-14
category: "科技, 科技早报"
excerpt: 开源搜索代理、AI智能体扩张、无人驾驶商业化与数据泄露等成为今日科技热点。
lastEdited: 2026年9月14日
tags: [人工智能, 开源模型, AI智能体, 网络安全, 自动驾驶, 开发者工具, GitHub]
imageUrl: 
---

## 概览

### AI 与机器学习

- [AllSpark发布基于Qwen的开源搜索代理](#news-1)
- [GPT-6 Astra在收益与无人机测试中表现突出](#news-2)
- [AI智能体转向高资源消耗并推动数据中心建设](#news-3)
- [Anthropic员工警告人工智能或带来生存性风险](#news-4)
- [阅读清单梳理开放模型与开源AI发展议题](#news-5)
- [ElevenLabs开放Music v2.5应用与API服务](#news-6)
### GitHub 热门项目

- [Open-Inspect开源后台编码代理支持多渠道自动化](#news-7)
- [GitHub 热门项目 agent-skills 聚焦 AI 编程代理技能注册](#news-8)
- [Git AI开源扩展追踪代码中的代理模型与提示词](#news-9)
- [GitHub热门项目gpt-load提供自托管AI网关](#news-10)
- [微软AI Engineer Coach分析本地会话日志改进工程实践](#news-11)
- [GitHub热门项目MathModelAgent主打自动化数学建模](#news-12)
### 开发者工具

- [Cpak推出面向Linux桌面服务器与设备的OCI应用包格式](#news-13)
### 安全与隐私

- [Chess.com超730万用户记录泄露，证据指向大规模抓取](#news-14)
- [Anthropic称疑似胡塞相关组织使用Claude Code开展导弹研发](#news-15)
- [通用汽车因出售驾驶数据被限制五年](#news-16)
- [论文分析人工智能恶意使用的安全威胁与应对](#news-17)
### 产品与平台

- [Lyft通过Waymo无人车服务进入商业机器人出租车市场](#news-18)
- [文章质疑JPEG XL作为Web图像格式的必要性](#news-19)
- [约翰迪尔推出拖拉机自助维修服务](#news-20)
- [iOS 27 Safari新增自动化与个性化功能](#news-21)
### 硬件与芯片

- [YC最新Demo Day深科技初创项目受投资人关注](#news-22)
### 科技行业动态

- [特朗普与约翰逊认为AI行业反应过度](#news-23)
- [聚变初创公司加速探索国防领域合作机会](#news-24)
---

## AllSpark发布基于Qwen的开源搜索代理 {#news-1}

> **AllSpark**团队发布了 `Iris-mini` 和 `Iris-pro` 两个开源搜索代理。两者均基于 **Qwen** 模型构建，文章称其在各自规模类别的开放权重模型基准测试中处于领先位置。

![AllSpark发布基于Qwen的开源搜索代理](https://the-decoder.com/wp-content/uploads/2026/09/search-agents-allspark-nano-banana-pro.jpg)

论文称，相关训练数据和模型也提升了代理在通用工具使用、办公工作等任务上的表现。

文章未提供具体基准测试数据，因此关于领先表现及未直接训练任务性能提升的说法，仍以文章和论文表述为依据。

[查看原文](https://the-decoder.com/iris-mini-and-iris-pro-are-the-strongest-open-weight-search-agents-in-their-class/)

---

## GPT-6 Astra在收益与无人机测试中表现突出 {#news-2}

> **GPT-6 Astra**在 Andon Labs 的 Vending-Bench 测试中取得的收益接近 **Claude Fable 5.1** 的三倍，并在无人机控制测试的五项子任务中全部超过人类基线。

![GPT-6 Astra在收益与无人机测试中表现突出](https://the-decoder.com/wp-content/uploads/2026/09/openai_drone_gpt6_astra.png)

在 Vending-Bench 基准测试中，GPT-6 Astra 拒绝了非法价格操纵交易，而 Claude Fable 5.1 接受了这些交易。

在无人机控制测试中，GPT-6 Astra 完成了五项子任务，测试内容包括寻找并跟随特定个人。

[查看原文](https://the-decoder.com/gpt-6-astra-pilots-a-surveillance-drone-and-runs-a-business-on-its-own/)

---

## AI智能体转向高资源消耗并推动数据中心建设 {#news-3}

> 硅谷正从面向简单问答的聊天机器人转向资源消耗更高的智能体式 AI，这一趋势正在推动数据中心建设。

![AI智能体转向高资源消耗并推动数据中心建设](https://media.wired.com/photos/6aa2cf4ca722d0b47513425c/191:100/w_1280,c_limit/DataCenterColumn2.jpg)

AI 智能体通常基于大型语言模型，能够自主决策并执行任务，但目前尚无官方统一定义。与单次回答问题不同，智能体可生成数百个小提示并持续执行任务。

**OpenAI** 近期宣布，一个由超过 1 万个智能体组成、发送 270 万条消息的群体解决了一个长期存在的数学问题，但数学家对这一说法提出了质疑。

原文称，大规模智能体运行消耗了大量处理能力，相关能源成本可能达到数千万美元，但具体金额难以确定。私营 AI 公司通常较少披露环境指标。

Sam Altman 曾称，获取一个杏仁所需的用水量相当于 3.8 万次 ChatGPT 查询；这一比较存在争议。

[查看原文](https://www.wired.com/story/ai-agents-are-thirsty-for-power/)

---

## Anthropic员工警告人工智能或带来生存性风险 {#news-4}

> 近期人工智能行业再次出现关于生存性风险的警告，相关观点认为人工智能可能对人类构成严重威胁。

![Anthropic员工警告人工智能或带来生存性风险](https://techcrunch.com/wp-content/uploads/2026/09/GettyImages-2233466982.jpg?resize=1200,821)

人工智能研究员Jacob Coxon表示，他因担心领先人工智能公司“拿我们的生命赌博”而从**Anthropic**辞职。

Anthropic对齐团队负责人转发了相关内容，并称团队确实认真认为人工智能可能杀死人类。

该员工个人认为，未来十年内人工智能消灭全人类的可能性“超过10%”。

TechCrunch播客讨论了这些警告是否与模型能力展示或上市准备有关，并指出相关概率缺乏明确依据。

[查看原文](https://techcrunch.com/2026/09/13/whats-behind-the-ai-industrys-latest-warnings-of-doom/)

---

## 阅读清单梳理开放模型与开源AI发展议题 {#news-5}

> Nathan Lambert 发布了一份开放模型和开源 AI 阅读清单，面向公众及政策相关读者，汇总该领域近年的代表性文章。

![阅读清单梳理开放模型与开源AI发展议题](https://substackcdn.com/image/fetch/$s_!pdpS!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F53e3cead-b3c3-4fba-8503-c5a599d5fb01_3182x1790.png)

清单涵盖开放模型的定义、发布动机、商业战略关系及相关风险，并将其作为了解领域现状的综合材料。

清单提出，模型开放程度应根据许可证、运行成本和数据访问等因素视为一个梯度，而非简单的开放或封闭二分法。

收录内容还涉及开放模型的经济作用、企业定制化 agent 工作流，以及开放模型与闭源模型在性能和采用方面的差异。

页面同时汇集开放权重模型安全发布、开放基础模型社会影响和开源 AI 安全风险等主题文章；页面注明最后更新于 2026 年 9 月 13 日。

[查看原文](https://www.interconnects.ai/p/open-source-ai-reading-list)

---

## ElevenLabs开放Music v2.5应用与API服务 {#news-6}

> **ElevenLabs**发布AI音乐生成器 `Music v2.5`，通过应用程序和 API 提供服务，并设置免费版与专业版层级。公司称，新版本在近48,000对样本的盲测中更受听众偏好。

![ElevenLabs开放Music v2.5应用与API服务](https://the-decoder.com/wp-content/uploads/2026/09/elevenlabs_music_25.png)

`Music v2.5`可通过应用程序和 API 使用，用户可选择免费或专业版层级。

ElevenLabs表示，新版本在包含近48,000对比较样本的盲测中获得了更高偏好。

盲测方法及授权音乐的具体范围未在原文中说明；训练数据仅使用获得授权音乐的说法来自该公司。

[查看原文](https://the-decoder.com/elevenlabs-makes-music-v2-5-available-via-app-and-api-with-free-and-pro-tier-options/)

---

## Open-Inspect开源后台编码代理支持多渠道自动化 {#news-7}

> **ColeMurray/background-agents** 是一个名为 Open-Inspect 的开源后台编码代理系统，可在后台处理开发任务。

![Open-Inspect开源后台编码代理支持多渠道自动化](https://opengraph.githubassets.com/bedbafd8092ddeb42f26a177a67376275f59ce1fe3fc6543bf6ebd5ef860dbaf/ColeMurray/background-agents)

系统提供 Node.js、Python、Git、浏览器自动化和 VS Code 等开发环境。

用户可通过网页界面、Slack、GitHub Pull Request、Linear issue 或 webhook 连接系统。

项目支持多人实时协作、基于 cron 的定时自动化，以及由 GitHub 事件、Sentry 告警和 webhook 触发的自动化。

系统可在独立沙盒中并行运行子任务，并选择 Anthropic Claude、OpenAI Codex、xAI Grok 或 OpenCode Zen 等模型或服务。

原文说明该系统仅为单租户部署设计，创建会话前不会验证用户是否有权访问特定仓库。

[查看原文](https://github.com/ColeMurray/background-agents)

---

## GitHub 热门项目 agent-skills 聚焦 AI 编程代理技能注册 {#news-8}

> **tech-leads-club/agent-skills** 是一个使用 TypeScript 编写的 AI 编程代理技能注册表项目。该项目当前获得 5,377 个 Stars，当天新增 215 个。

项目描述称，`agent-skills` 面向专业 AI 编程代理，提供安全、经过验证的技能注册表。

项目可扩展 **Antigravity**、**Claude Code**、**Cursor** 和 **Copilot** 等工具。

[查看原文](https://github.com/tech-leads-club/agent-skills)

---

## Git AI开源扩展追踪代码中的代理模型与提示词 {#news-9}

> **git-ai** 是一个用于跟踪代码仓库中 AI 生成代码的开源 Git 扩展，可将代码行与生成它的代理、模型和提示词关联。

![Git AI开源扩展追踪代码中的代理模型与提示词](https://opengraph.githubassets.com/88a2a28028fd5b91d0085ffe104934d51ec50e46805bb020191a1522df762d1d/git-ai-project/git-ai)

项目称，用户安装扩展后仍可按照原有方式进行提示和提交，无需改变工作流。

`git-ai` 支持 macOS、Linux 和 Windows（WSL），不要求为每个仓库单独设置。

项目称该扩展不需要 Git hooks，也不包装 Git 二进制文件，因此不会增加 Git 操作的性能开销。

`git-ai` 采用本地优先方式，并支持离线工作；用户可使用 Agent、Git 或其他 Git 客户端提交。

[查看原文](https://github.com/git-ai-project/git-ai)

---

## GitHub热门项目gpt-load提供自托管AI网关 {#news-10}

> GitHub Trending 项目 `tbphp/gpt-load` 使用 Go 语言开发，定位为支持多渠道和多凭据配置的自托管 AI 网关。

项目当前有 6,713 个 Stars，并在当天新增 80 个 Stars。

项目描述称，`tbphp/gpt-load` 支持 API 密钥和订阅账号，以及调度、故障转移、请求日志和用量统计等功能。

[查看原文](https://github.com/tbphp/gpt-load)

---

## 微软AI Engineer Coach分析本地会话日志改进工程实践 {#news-11}

> 微软的 **AI Engineer Coach** 项目用于改进代理式工程实践，可读取本地 AI 会话日志并生成可执行的分析结果。

![微软AI Engineer Coach分析本地会话日志改进工程实践](https://opengraph.githubassets.com/98b645e7be4c3f7b9c23d52bb42abef5abeb49eefc296ef2c14cd5ed12030e52/microsoft/AI-Engineering-Coach)

原文称，相关数据不会离开用户设备。工具支持跟踪练习分数、每周趋势和每日活动图表。

项目包含 45 条规则，用于检测提示质量、会话卫生、代码审查、工具掌握和上下文管理等反模式。

工具可按编程语言、工作区、模型和代理框架统计 AI 生成的代码量，并评估上下文健康状况。

该项目还能发现重复使用的提示词，并将其转化为可复用技能。

扩展尚未发布到扩展市场或 Releases 页面，用户目前需要自行构建 VSIX 文件后安装。

[查看原文](https://github.com/microsoft/AI-Engineering-Coach)

---

## GitHub热门项目MathModelAgent主打自动化数学建模 {#news-12}

> GitHub Trending 项目 **jihe520/MathModelAgent** 使用 Python 开发，项目描述称其专为数学建模设计，包含 Agent 和 skills。

该项目当前有 5,250 个 Stars，当天新增 262 个 Stars。

项目描述称，MathModelAgent 可以自动完成数学建模，并生成一份可直接提交的完整论文。

[查看原文](https://github.com/jihe520/MathModelAgent)

---

## Cpak推出面向Linux桌面服务器与设备的OCI应用包格式 {#news-13}

> Cpak网站将 `cpak` 描述为一种面向Linux桌面、服务器和设备的OCI应用程序包格式。网站同时提供入门和应用商店浏览入口。

![Cpak推出面向Linux桌面服务器与设备的OCI应用包格式](https://cpak.it/presskit/full/cpak-brand-dark.png)

`cpak`定位为OCI应用程序包格式，目标覆盖Linux桌面、服务器及各类设备。

其官方网站提供“Get started”入口，供用户开始了解或使用该格式。

网站还提供“Browse store”入口，用于浏览相关应用内容。

[查看原文](https://cpak.it/)

---

## Chess.com超730万用户记录泄露，证据指向大规模抓取 {#news-14}

> Security Affairs称，一个包含超过730万条Chess.com用户记录的15.5 GB文件出现在两个数据泄露论坛。现有证据更支持大规模抓取的判断，但抓取来源及完整经过尚未确定。

![Chess.com超730万用户记录泄露，证据指向大规模抓取](https://securityaffairs.com/wp-content/uploads/2026/08/image-36.png)

文章称，文件解压后为制表符分隔表，含一行表头和7,337,395条记录，每条记录包含38个字段。

记录涉及电子邮件、用户名、用户ID、UUID、姓名、国家、位置、棋类头衔、积分、会员状态及时间戳等信息；文件未包含密码、密码哈希或支付数据。

文章称约四分之三的记录包含电子邮件地址，且字段中出现Google Ad Manager受众细分数据，包括试用资格和流失用户群组等值。

研究人员抽取20万条记录的账户UUID后，称其编码时间戳与注册日期匹配率为100%；数据按连续九天批次生成，约7.4%的记录重复。

文章称Ransomnews的技术分析确认数据真实且较新，并将上述现象视为大规模抓取而非一次性数据库泄露的迹象。

[查看原文](https://securityaffairs.com/197174/breaking-news/chess-com-leak-exposes-7-3-million-users-evidence-points-to-scraping.html)

---

## Anthropic称疑似胡塞相关组织使用Claude Code开展导弹研发 {#news-15}

> **Anthropic**称，也门北部一个高度可能与胡塞武装有关的组织使用 `Claude Code` 开展了通常需要导弹工程团队完成的工作。公司表示，没有证据表明该组织成功部署了可作战武器。

![Anthropic称疑似胡塞相关组织使用Claude Code开展导弹研发](https://imagedelivery.net/qIvImu8MgTZD-kGvW-i83w/production.gdh/3130fc04-e931-4e08-8187-d3e367e47ba4/w=1200,h=630,fit=cover,gravity=auto,quality=85)

据Anthropic评估，相关工作涉及制导火箭软件、远程弹道导弹和高超音速滑翔飞行器概念。

相关人员同时运行多个Claude会话，用于编程、研究和技术审查，并将软件编译为可离线运行的独立程序。

Anthropic记录显示，该组织曾在也门试射一枚制导火箭，试验结果似乎失败，随后使用Claude分析发射遥测数据。

报道指出，相关组织与胡塞武装的关联仍是“高度可能”而非已确认事实。

[查看原文](https://clashreport.com/world/articles/houthis-used-claude-code-to-develop-missile-guidance-software-anthropic-s52mnx4pwpo)

---

## 通用汽车因出售驾驶数据被限制五年 {#news-16}

> 据 The Verge，**通用汽车**此前因收集并出售客户驾驶数据，受到美国联邦贸易委员会处罚。公司被禁止在五年内向消费者报告机构和第三方数据经纪商出售客户数据。

![通用汽车因出售驾驶数据被限制五年](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/gettyimages-144097019.jpg?quality=90&strip=all&crop=0,0,100,100)

文章称，**通用汽车**多年来一直收集客户的多种驾驶数据。

被收集的信息包括超速频率以及是否在夜间驾驶等数据。

文章称，通用汽车曾将这些数据出售给数据经纪商。由于所给文本为节选，相关事件的完整背景和细节尚无法确认。

[查看原文](https://www.theverge.com/column/994172/your-car-is-selling-your-data)

---

## 论文分析人工智能恶意使用的安全威胁与应对 {#news-17}

> 一篇论文调查人工智能被恶意使用可能造成的安全威胁，并分析其对数字、物理和政治领域威胁格局的影响。论文同时提出四项高层次建议及后续研究方向。

![论文分析人工智能恶意使用的安全威胁与应对](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png)

论文题为《人工智能的恶意使用：预测、预防与缓解》，首次提交于2018年2月20日，所示版本于2024年12月1日修订。

论文面向AI研究人员及其他利益相关方提出四项高层次建议，并讨论如何扩大防御手段组合，或使攻击更无效、更难执行。

论文作者包括Miles Brundage、Shahar Avin、Jack Clark、Helen Toner、Peter Eckersley和Dario Amodei等26人。

论文讨论了攻击者与防御者的长期均衡状态，但明确表示这一问题尚未得到确定结论。

[查看原文](https://arxiv.org/abs/1802.07228)

---

## Lyft通过Waymo无人车服务进入商业机器人出租车市场 {#news-18}

> **Waymo**无人驾驶出租车本周进入**Lyft**在纳什维尔的应用。Lyft表示，这标志着公司首次使用车内没有人类驾驶员的无人驾驶车辆开展商业机器人出租车服务。

![Lyft通过Waymo无人车服务进入商业机器人出租车市场](https://techcrunch.com/wp-content/uploads/2026/09/waymo-lyft-nashville.jpeg?resize=1200,675)

纳什维尔用户既可通过Waymo应用叫车，也可通过Lyft应用叫车，Lyft会按可用性匹配Waymo车辆。

Lyft全资子公司Flexdrive负责车队服务、车辆准备与维护，以及基础设施和车库运营。

Lyft曾与Aptiv、May Mobility、百度和Waymo开展自动驾驶汽车相关合作，并于2021年出售自动驾驶汽车部门。

Lyft高管表示，公司希望扩大与Waymo和百度的合作，但百度在伦敦的商业服务尚未启动。

[查看原文](https://techcrunch.com/2026/09/13/techcrunch-mobility-lyft-has-entered-the-robotaxi-chat/)

---

## 文章质疑JPEG XL作为Web图像格式的必要性 {#news-19}

> 一篇文章讨论 JPEG XL 作为 Web 图像编解码器的适用性，认为其技术能力较强，但在多数 Web 场景中的必要性仍值得讨论。

![文章质疑JPEG XL作为Web图像格式的必要性](https://giannirosato.com/static/img/caustics-hdr.avif)

文章称 JPEG XL 是 JPEG 的升级版，功能范围比 WebP 更广，也适用于 Web 之外的场景；作者同时提到该格式曾于 2023 年被 Chrome 拒绝。

文章还称，近期 Rust 编写的 JPEG XL 解码器已以某种形式进入 Firefox 和 Chrome。

作者认为，Web 上绝大多数图像使用场景由通用有损压缩即可满足，普通用户通常不需要无损压缩。

根据文章引用的测试数据集，JPEG XL 的无损压缩结果实际仅比无损 WebP 小约 11.9%；文章未确认主要利益相关方已因此改变立场。

[查看原文](https://giannirosato.com/blog/post/case-against-jxl/)

---

## 约翰迪尔推出拖拉机自助维修服务 {#news-20}

> **约翰迪尔**提供一项允许设备所有者自行维修设备的服务。作者通过笔记本电脑连接一台 John Deere 5130ML 拖拉机，处理燃油含水传感器断开故障。

![约翰迪尔推出拖拉机自助维修服务](https://cdn.arstechnica.net/wp-content/uploads/2026/09/PXL_20260820_203706917-640x850.jpg)

这枚传感器用于监测柴油发动机的状态，故障后需要进行处理。

作者在约翰迪尔位于美国加利福尼亚州圣克拉拉的办公室操作相关服务。

软件在屏幕上显示故障通知，并根据机器序列号调取用户手册中的说明和图片。

[查看原文](https://arstechnica.com/gadgets/2026/09/i-fixed-a-tractor-using-john-deeres-self-repair-service-farmers-arent-sold-on-it/)

---

## iOS 27 Safari新增自动化与个性化功能 {#news-21}

> iOS 27 中的 Safari 增加了由 Apple Intelligence 驱动的自动化和个性化功能。相关功能要求使用 iPhone 15 Pro 或更新机型。

![iOS 27 Safari新增自动化与个性化功能](https://media.wired.com/photos/6aa44ab510c4340f2d52e7b4/191:100/w_1280,c_limit/iPhone-Settings-Safari-ios27-2213391517.jpg)

Safari 的“Notify Me”功能可按设定频率扫描网页，监测价格下降、票务放票、隐私政策变化或其他内容更新，并在发生变化时通知用户。

用户可以在 Safari 设置中输入希望监测的内容变化以及检查频率。iPadOS 27 和 macOS 27 也提供这些功能。

“Describe an Extension”功能允许用户用文字描述扩展需求，并生成自定义的 Safari 扩展选项。

[查看原文](https://www.wired.com/story/iphone-settings-ios-27-safari-browser/)

---

## YC最新Demo Day深科技初创项目受投资人关注 {#news-22}

> Y Combinator最近一次Demo Day上的初创公司相比往年更偏向深科技领域。TechCrunch根据早期投资者提及情况，整理出至少获得两名投资者关注的项目。

![YC最新Demo Day深科技初创项目受投资人关注](https://techcrunch.com/wp-content/uploads/2024/06/shrinking-yc.jpg?resize=1200,675)

**Automarine**（文中另写作Atomarine）计划在海上驳船建设核动力数据中心，拟于2028年推出燃气动力试点，并在2032年转向浮动核动力船。

Atomarine声称已通过意向书获得超过40亿美元的客户兴趣，相关客户兴趣、估值及商业进展主要来自公司或投资者说法。

**Dipole Labs**表示，其光交换机可跳过光电转换，让数据以光的形式直接传输，以降低AI数据中心网络层的能耗和热量。

**Isengard Industries**计划在盟国境内本地化批量生产喷气动力攻击无人机和反无人机，文章称该公司已实现1000万美元收入。

[查看原文](https://techcrunch.com/2026/09/13/the-9-buzziest-startups-from-y-combinators-latest-demo-day-according-to-vcs/)

---

## 特朗普与约翰逊认为AI行业反应过度 {#news-23}

> Anthropic首席执行官Dario Amodei呼吁放缓前沿人工智能发展，相关提议获得部分科技业者支持。特朗普和众议院议长Mike Johnson似乎担心，放缓发展可能让中国在人工智能竞赛中超过美国。

![特朗普与约翰逊认为AI行业反应过度](https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/STK466_ELECTION_2024_CVirginia_E.jpg?quality=90&strip=all&crop=0,0,100,100)

**Anthropic**首席执行官Dario Amodei发表公开信，主张“放缓前沿发展”，减慢人工智能开发速度。

**OpenAI**的Sam Altman和Elon Musk在X上公开支持该提议，**Alphabet**的Demis Hassabis则表示初步支持。

据《金融时报》转述，特朗普表示美国目前在人工智能领域领先中国，希望保持这一局面，并称谁赢得人工智能，谁就能赢得竞争。

文章称，特朗普和Mike Johnson似乎认为人工智能高管反应过度；文中未提供Johnson的具体原话。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/994441/trump-mike-johnson-ai-industry-overreacting)

---

## 聚变初创公司加速探索国防领域合作机会 {#news-24}

> 气候科技风险投资趋于停滞之际，聚变初创公司正寻求国防行业等新的资金和应用渠道。**Xcimer**与**RTX**建立合作并获得投资，**Pacific Fusion**也宣布与美国国家核安全管理局签署谅解备忘录。

![聚变初创公司加速探索国防领域合作机会](https://techcrunch.com/wp-content/uploads/2026/06/pacific-fusion-pulser-prototype-side.jpeg?resize=1200,800)

2022年，国家点火设施完成一项突破性聚变能实验。该设施支持国家安全应用已有超过25年。

激光武器因无人机改变现代战争而受到更多关注，其电力可来自发电机、舰船反应堆或发动机。

**Xcimer**计划利用其在丹佛运营的激光系统开发聚变发电厂；Pacific Fusion合作内容的后续信息在原文中不完整。

[查看原文](https://techcrunch.com/2026/09/13/fusion-power-startups-find-new-partners-in-the-defense-world/)


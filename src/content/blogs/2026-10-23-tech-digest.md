---
title: 科技早报 2026-10-23
category: "科技, 科技早报"
excerpt: OpenAI开放决策模型API，Claude Duet引发代理应用竞争，PHP漏洞遭利用，Arc浏览器将停运。
lastEdited: 2026年10月23日
tags: [OpenAI, Anthropic, AI智能体, PHP安全, Arc浏览器, PC市场]
imageUrl: 
---

## 概览

### AI 与机器学习

- [OpenAI向所有客户开放Decisions API决策模型](#news-1)
- [Canva 发布首个图像生成模型 Canva Craft](#news-2)
- [Anthropic推出Claude Duet，押注专业任务代理应用](#news-3)
- [Hugging Face发布可本地运行的DNA开源模型Carbon-X](#news-4)
- [Anthropic推出可持续在线处理任务的Claude Duet](#news-5)
- [微软称其人工智能诊断工具准确率最高达医生四倍](#news-6)
### GitHub 热门项目

- [agentgateway开源项目为AI智能体提供统一网关能力](#news-7)
- [GitHub 热门项目推出开源 AI Office 套件](#news-8)
- [GitHub 热门项目发布 Claude Code 视觉化指南](#news-9)
- [pnpm以内容寻址存储提升依赖管理效率](#news-10)
### 开源生态

- [VBoy Color模拟器为Virtual Boy加入全彩显示效果](#news-11)
### 安全与隐私

- [PHP两大漏洞波及大量网站，部分平台曾停摆](#news-12)
- [Railway遭网络攻击后敦促所有用户轮换密钥](#news-13)
- [eMudhra宣布退出全球SSL/TLS证书业务](#news-14)
- [PHP严重漏洞在补丁发布前数日已遭黑客利用](#news-15)
### 产品与平台

- [Arc浏览器将于2026年12月22日停止运行](#news-16)
- [Etsy收紧AI商品列表规则以减少低质量内容](#news-17)
- [The Browser Company宣布关闭 Arc 浏览器](#news-18)
- [Spotify加码AI代理，争取成为代理使用的音乐服务](#news-19)
### 硬件与芯片

- [FCC首次依据芯片来源权限阻止两款设备](#news-20)
- [Helion获1.75亿美元研发聚变电站半导体](#news-21)
- [全球PC三季度出货量因内存涨价下降21%](#news-22)
- [Nirva获3300万美元融资将推出环境智能吊坠](#news-23)
### 科技行业动态

- [Meta因新墨西哥州数据保护案被罚250亿美元](#news-24)
---

## OpenAI向所有客户开放Decisions API决策模型 {#news-1}

> **OpenAI**宣布向所有客户开放其 `Decisions API` 模型。该API旨在通过更快推理和更低成本提供决策模型能力，公开版本新增语音与视觉模态。

![OpenAI向所有客户开放Decisions API决策模型](https://techcrunch.com/wp-content/uploads/2026/10/Screenshot-2026-10-22-at-12.17.11-PM-1.png?resize=1200,988)

`Decisions API`于9月29日开发者日公布，并在文章发布当日全面可用，底层基于重新配置的ChatGPT Luna。

OpenAI产品负责人Nikunj Handa称，API响应时间已从约1至3秒缩短至100、120或180毫秒。

Box、Datadog、Ramp和Speak参与了初步试用；Speak称其动作间隔从1.4秒缩短至0.13秒。

OpenAI还使用该API提升Dots语音助手的响应速度，并通过按地区配置推理资源降低不同地区的延迟。

文章指出，决策模型缺乏统一评价标准，不同基准中的模型排名也存在差异。

[查看原文](https://techcrunch.com/2026/10/22/openai-makes-its-jev-competitor-widely-available-as-decision-model-competition-heats-up/)

---

## Canva 发布首个图像生成模型 Canva Craft {#news-2}

> **Canva** 发布首个图像生成模型 `Canva Craft`，可先规划图像元素关系与视觉层级，再生成最高 2K 分辨率的图像。

![Canva 发布首个图像生成模型 Canva Craft](https://techcrunch.com/wp-content/uploads/2026/10/Sample-Outputs.jpeg?resize=1200,675)

Canva Craft 由 Canva 研究团队开发，支持最多 30 种不同宽高比，并可生成文字清晰可读、对象细节准确的图像。

该模型支持精准编辑，用户可调整图像局部而不改变其他部分。其训练数据包括 Canva 图库中的人工设计模板。

Canva Craft 已通过 Dream Lab 向 Canva 平台所有用户开放，未来还将通过 Canva API 提供。

Canva 正在开发成本更低的 `Craftfast` 和 `Craft-ultrafast`，但两者仍处于开发阶段。Canva 于 2024 年收购的 Leonardo.ai 研究人员参与了模型开发。

[查看原文](https://techcrunch.com/2026/10/22/canva-releases-its-first-image-generation-model/)

---

## Anthropic推出Claude Duet，押注专业任务代理应用 {#news-3}

> **Anthropic** 推出面向专业人士和小型企业的 **Claude Duet**，用于自动化和管理日常任务。该应用目前以研究预览形式开放申请。

![Anthropic推出Claude Duet，押注专业任务代理应用](https://techcrunch.com/wp-content/uploads/2026/10/Claude-Duet.jpg?resize=1200,675)

Claude Duet可生成每日简报、创建仪表板，并根据用户数据提出行动建议。

应用可通过自身虚拟机在后台执行任务，并在需要用户批准时返回请求。

Claude Duet基于 `Claude Opus 5.5`，可连接 Claude Marketplace 中的6000多个连接器和插件。

它支持通过 Stripe Link 或 Shop Pay 代表用户购物，但支付等敏感步骤需要批准；目前仅限 Pro 和 Max 用户通过候补名单申请。

[查看原文](https://techcrunch.com/2026/10/22/claude-duet-app-is-anthropics-bet-on-agents/)

---

## Hugging Face发布可本地运行的DNA开源模型Carbon-X {#news-4}

> **Hugging Face**发布开源模型Carbon-X，用于理解DNA，并可在笔记本电脑上本地运行。

![Hugging Face发布可本地运行的DNA开源模型Carbon-X](https://media.wired.com/photos/6ad92806649bdf60df6fd54f/191:100/w_1280,c_limit/Science_Hugging%20Face%E2%80%99s%20Powerful%20New%20DNA%20Model%20Is%20Small%20Enough%20to%20Run%20on%20a%20Laptop_v1.jpg)

Carbon-X由**Hugging Face**、中国中关村学院和意大利那不勒斯费德里科二世大学研究人员合作开发。

模型使用基因组序列和自然语言训练，用户可以通过对话询问DNA变化对基因活性和健康的影响。

训练数据涵盖多类生物的DNA序列。研究团队扩展语言模型词汇，使其能够读取由六个字母组成的DNA片段，并继续训练约3000亿个数据片段。

**Hugging Face**表示，训练未使用病毒数据，以避免模型被用于潜在危险应用。文章称，Carbon-X旨在辅助新药和基因疗法设计；帮助患者解读基因组仍属于潜在用途。

[查看原文](https://www.wired.com/story/hugging-face-new-ai-biology-model-chat-with-dna/)

---

## Anthropic推出可持续在线处理任务的Claude Duet {#news-5}

> **Anthropic**推出主动式 AI 智能体 **Claude Duet**，可在用户离线时自行处理任务。该应用基于 `Claude Opus 5.5` 构建，并接入多项第三方服务。

![Anthropic推出可持续在线处理任务的Claude Duet](https://the-decoder.com/wp-content/uploads/2026/10/Claude-Duet.png)

**Claude Duet**通过超过 6,000 个连接器接入 Gmail、Slack 和 Stripe 等服务。

在执行支付等敏感操作前，Claude Duet 会请求用户批准。

Anthropic 表示，推出 Claude Duet 是为了应对 xAI、Meta 和 OpenAI 的类似产品。

[查看原文](https://the-decoder.com/anthropic-takes-on-grok-bot-metas-muse-and-openais-dots-with-its-always-on-agent-claude-duet/)

---

## 微软称其人工智能诊断工具准确率最高达医生四倍 {#news-6}

> 微软称其开发的人工智能工具可用于疾病诊断，诊断准确率最高达到人类医生的四倍。相关研究发表于《Science》，但这一说法的适用范围仍有限。

![微软称其人工智能诊断工具准确率最高达医生四倍](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/gettyimages-2207866106.jpg?quality=90&strip=all&crop=0,0,100,100)

研究将微软的人工智能系统与人类医生进行比较，测试案例来自医学病例报告和急诊科数据。

微软将相关案例整理为自己的基准测试。微软人工智能部门负责人为 Mustafa Suleyman。

“四倍准确率”是微软的声明，现有信息未说明该结论适用于所有临床场景，也未提供完整测试结果。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1016690/suleyman-microsoft-diagnostic-orchestrator-science-medical-superintelligence)

---

## agentgateway开源项目为AI智能体提供统一网关能力 {#news-7}

> 开源项目 agentgateway 面向 AI 智能体和 MCP 服务器，提供连接、治理、安全与可观测性能力。项目基于 MCP、A2A 等协议，支持智能体与模型、工具及其他智能体通信。

![agentgateway开源项目为AI智能体提供统一网关能力](https://opengraph.githubassets.com/bcf7293c9245762d2eb1cfb48d0c506437c04714ea97536132c7f3315481051f/agentgateway/agentgateway)

agentgateway 的 LLM Gateway 通过统一的 OpenAI 兼容 API 连接 OpenAI、Anthropic、Gemini 和 Bedrock，并支持预算控制、提示词增强、负载均衡与故障转移。

MCP Gateway 支持工具联邦、stdio、HTTP、SSE、Streamable HTTP、OpenAPI 集成和 OAuth 认证，可连接模型、工具及外部数据源。

A2A Gateway 支持智能体能力发现、模态协商和任务协作。项目还提供基于 Kubernetes 推理网关扩展的路由能力。

项目支持 JWT、API 密钥和 OAuth 认证，以及基于 CEL 的细粒度 RBAC、限流、TLS 和 OpenTelemetry 指标、日志与追踪。

[查看原文](https://github.com/agentgateway/agentgateway)

---

## GitHub 热门项目推出开源 AI Office 套件 {#news-8}

> **genspark-ai/genoffice** 是一套免费的开源 AI Office 套件，支持多类文档编辑并内置 AI 智能体。项目当天新增 191 个 Stars，目前共有 10,437 个 Stars。

该项目提供 Docs、Sheets、Slides、PDF、Markdown 和 HTML 编辑器。

项目包含 `genoffice` 命令行工具和 agent skill，可让 Claude Code、Codex 与 Cursor 在本地创建和编辑真实的 `.docx`、`.xlsx` 与 `.pptx` 文件。

项目要求用户自带 API 密钥，支持 macOS、Windows 和 Linux。仓库主要使用 TypeScript。

[查看原文](https://github.com/genspark-ai/genoffice)

---

## GitHub 热门项目发布 Claude Code 视觉化指南 {#news-9}

> **luongnv89/claude-howto** 是一份以视觉和示例为导向的 Claude Code 指南，内容覆盖基础概念到高级 agents。该项目当天新增 428 颗 Stars。

该项目使用 Python，仓库目前拥有 42,593 颗 Stars。

指南提供可复制粘贴的模板，内容覆盖 Claude Code 的基础概念与高级 agents。

[查看原文](https://github.com/luongnv89/claude-howto)

---

## pnpm以内容寻址存储提升依赖管理效率 {#news-10}

> **pnpm**是一款强调速度与磁盘空间利用率的包管理器，官方称其速度最高可达替代方案的两倍。

![pnpm以内容寻址存储提升依赖管理效率](https://repository-images.githubusercontent.com/50565430/8937cd00-7c0f-11e9-8fc4-8ef4a17af653)

**pnpm**使用内容寻址存储，并从该存储链接`node_modules`中的文件，以减少重复占用。

它要求软件包只能访问`package.json`中声明的依赖，并使用`pnpm-lock.yaml`锁定依赖版本。

**pnpm**支持Windows、Linux和macOS，也可作为Node.js版本管理器使用。项目还包含以Rust编写的实验性CLI移植版本`pacquet`。

[查看原文](https://github.com/pnpm/pnpm)

---

## VBoy Color模拟器为Virtual Boy加入全彩显示效果 {#news-11}

> **VBoy Color**是一项重新构想任天堂Virtual Boy显示效果的模拟器实验，通过基于图块的调色板系统，为游戏画面增加更多颜色。

模拟器的游戏专用Color Packs可为每个8×8图块分配独立的四色调色板。

在Mario Clash中，VBoy Color能够区分绿色管道、灰色平台和红色砖墙。

该模拟器提升了不同游戏元素之间的对比度，在Jack Bros.和Vertical Force中尤为明显。

此前，Red Viper模拟器也曾为Virtual Boy加入类似Super Game Boy的彩色效果。

[查看原文](https://arstechnica.com/gaming/2026/10/this-emulator-reimagines-nintendos-virtual-boy-with-a-full-color-display/)

---

## PHP两大漏洞波及大量网站，部分平台曾停摆 {#news-12}

> PHP中发现的两个漏洞使大量互联网网站面临风险，部分平台在漏洞披露后曾暂时关闭。受影响版本覆盖约20年来的多个PHP版本。

![PHP两大漏洞波及大量网站，部分平台曾停摆](https://platform.theverge.com/wp-content/uploads/sites/2/2025/04/VRG_ILLO_STK001_carlo_cadenas_cybersecurity_virus.jpg?quality=90&strip=all&crop=0,0,100,100)

文章称，按部分说法，全球最多约70%的网站在某种程度上使用PHP；Wikipedia、WordPress和Drupal等平台均使用PHP。

DeviantArt和4Chan曾在漏洞披露后暂时关闭，Internet Archive也曾因PHP问题短暂离线。

漏洞影响许多已经停止支持的旧版PHP，部分不再积极维护的网站和服务可能面临长期停运风险。

两个日本老式手机游戏也因PHP漏洞关闭，但文章未给出漏洞修复范围或受影响网站的完整名单。

[查看原文](https://www.theverge.com/tech/1016574/php2shell-security-vulnerability-websites-down)

---

## Railway遭网络攻击后敦促所有用户轮换密钥 {#news-13}

> 开发平台 **Railway** 确认遭遇网络攻击，黑客可能访问部分客户机密。公司建议所有用户撤销并轮换 API 密钥和云密钥。

![Railway遭网络攻击后敦促所有用户轮换密钥](https://techcrunch.com/wp-content/uploads/2023/08/getty-keys-red-background-locks.jpg?resize=1200,800)

Railway表示，身份不明的黑客可能访问了加密环境变量，并获取其中一部分解密内容。

这些环境变量通常包含访问云存储、数据库等服务所需的密码和 API 密钥。

Railway在调查期间暂停客户部署，导致部分客户网站和应用暂时被冻结。

公司尚未公布受影响用户数量、事件根本原因及具体入侵过程，并称事件可能与针对 AI 推理服务提供商的更广泛攻击有关。

[查看原文](https://techcrunch.com/2026/10/22/developer-platform-railway-urges-all-users-to-revoke-secret-keys-after-cyberattack/)

---

## eMudhra宣布退出全球SSL/TLS证书业务 {#news-14}

> **eMudhra**表示将退出全球 SSL/TLS 业务，此前公司签发的弱安全中间 TLS 凭证引发广泛审查。

eMudhra 此前签发了 8 个安全性较弱的中间 TLS 凭证，攻击者可利用这些凭证为任意网站或邮件服务器生成证书。

其中一个中间凭证使用了仅为 4 的私钥。

公司董事长 V. Srinivasan 表示，合规要求的成本和复杂性持续增加，而 SSL/TLS 业务仅占公司收入的 1%。

eMudhra 称，免费 TLS 证书机构出现后，该业务的投资回报进一步下降；董事会因此决定退出全球 SSL/TLS 业务。

[查看原文](https://arstechnica.com/security/2026/10/disgraced-emudhra-drops-out-of-tls-business-following-certificate-debacle/)

---

## PHP严重漏洞在补丁发布前数日已遭黑客利用 {#news-15}

> Amazon Threat Intelligence报告称，黑客在补丁发布前数日已尝试利用影响多个网站的PHP漏洞。Amazon安全团队于10月17日发现了一次PHP2Shell漏洞利用尝试。

![PHP严重漏洞在补丁发布前数日已遭黑客利用](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23318435/akrales_220309_4977_0232.jpg?quality=90&strip=all&crop=0,0,100,100)

Amazon安全团队通过用于诱捕黑客的监控系统发现了这次利用活动。

Amazon首席信息安全官CJ Moses披露了相关发现。

周三，网站开始为影响PHP的两个严重安全漏洞争相安装补丁。

PHP被大量互联网网站使用，其中包括WordPress网站；第二个漏洞的完整信息无法从现有内容确认。

[查看原文](https://www.theverge.com/tech/1016798/php-vulnerabilities-exploit-patch)

---

## Arc浏览器将于2026年12月22日停止运行 {#news-16}

> **The Browser Company**宣布，Arc浏览器将于2026年12月22日停止运行，并引导用户转向其AI优先浏览器Dia。公司将把工程和安全团队集中到Dia。

![Arc浏览器将于2026年12月22日停止运行](https://techcrunch.com/wp-content/uploads/2024/05/arc-search-call.png?resize=1200,675)

自文章发布日起，Arc不再允许创建新账户；11月23日，Arc Search移动端AI功能将被移除，用户也将无法登录或同步标签页。

12月22日，Arc将在Mac和Windows上完全停止工作，账户将被停用，个人数据将在30天内删除；Arc Search还将从Google Play商店下架。

Dia将保留或对应Arc的Profiles、垂直标签页侧边栏和Pinned Tab Groups等功能，并支持密码、书签、扩展及历史记录迁移。

Arc功能在Dia中仍免费提供，AI功能为可选项。**The Browser Company**于2025年被Atlassian以6.1亿美元收购，并在同年停止对Arc进行积极功能开发。

[查看原文](https://techcrunch.com/2026/10/22/arc-browser-sunsets-december-22-as-the-browser-company-doubles-down-on-dia/)

---

## Etsy收紧AI商品列表规则以减少低质量内容 {#news-17}

> **Etsy**宣布收紧商品列表中的人工智能使用规则，目标是减少平台上的低质量人工智能内容。

![Etsy收紧AI商品列表规则以减少低质量内容](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Screenshot-2026-10-22-at-5.03.44-PM.png?quality=90&strip=all&crop=0,0,100,82.725656291205)

Etsy表示，许多活跃买家无法判断商品是否包含人工智能生成内容，卖家也担心自己的作品与误导性使用人工智能的商品并列展示。

根据新政策，每个商品列表至少要包含一张未经编辑的实际商品照片，且照片背景必须是真实背景。

所有照片都必须准确呈现买家将收到的商品。除首张照片外，其他照片的软编辑限制，所提供原文未完整说明。

[查看原文](https://www.theverge.com/tech/1017261/etsy-ai-rules-policies-restrictions-listing)

---

## The Browser Company宣布关闭 Arc 浏览器 {#news-18}

> **The Browser Company**计划于12月22日停止运营Arc浏览器。公司去年已转向开发专注于人工智能的Dia浏览器，但此前仍继续维护Arc。

![The Browser Company宣布关闭 Arc 浏览器](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/Screenshot-2026-10-22-at-12.56.25-PM.png?quality=90&strip=all&crop=0,0,100,100)

从文章所述日期起，用户将无法创建新的Arc账户。

11月23日，Arc在iOS和Android上的Browse for Me及其他人工智能功能将被禁用，用户也将无法登录或同步标签页。

12月22日，Arc将无法在macOS或Windows上访问，Arc账户将被停用。

文章正文在描述12月22日之后的处置安排处被截断，因此无法确认全部关闭步骤。

[查看原文](https://www.theverge.com/tech/1016832/arc-browser-shutting-down)

---

## Spotify加码AI代理，争取成为代理使用的音乐服务 {#news-19}

> **Spotify** 正探索让用户通过 AI 代理发现音乐、创建播放列表并与平台互动。公司已与 Meta 的 Muse 助手、ChatGPT 和 Claude 集成。

![Spotify加码AI代理，争取成为代理使用的音乐服务](https://techcrunch.com/wp-content/uploads/2024/02/GettyImages-1783835425-crop-e1717409949317.jpg?resize=1200,676)

Spotify第三季度月活跃用户达到7.88亿，营收接近50亿欧元。

Spotify联合首席执行官Gustav Söderström表示，用户可能让 AI 代理完成音乐发现和播放列表创建等任务。

Spotify称，用户可分析自2008年以来的听歌历史，筛选喜爱歌曲，并按速度、调性和每分钟节拍数生成跑步歌单。

文章同时提到，第三方代理访问服务可能面临权限、安全、隐私和商业控制限制；Amazon此前曾阻止 Meta 的 Muse 在其平台购物。

[查看原文](https://techcrunch.com/2026/10/22/spotifys-current-ai-bet-is-about-being-the-music-service-that-agents-choose/)

---

## FCC首次依据芯片来源权限阻止两款设备 {#news-20}

> 美国联邦通信委员会（FCC）开始行使一项新权力，可因设备含有潜在国家安全威胁名单企业制造的芯片而阻止相关设备。FCC此次点名了所谓“外国监控芯片”。

![FCC首次依据芯片来源权限阻止两款设备](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25840497/STKP211_BRENDAN_CARR_B.jpg?quality=90&strip=all&crop=0,0,100,100)

FCC于10月13日赋予自身相关权力，并首次据此阻止两款其称含有“外国监控芯片”的设备。

FCC未公布被阻止设备的具体型号，也未立即回应置评请求。

FCC点名的芯片为`HiVision Hi3516CV610 UHD Smart Vision SoC`，可将原始摄像头传感器转换为家用安防摄像头、行车记录仪等设备。

[查看原文](https://www.theverge.com/policy/1017016/fcc-block-foreign-surveillance-chips-hivision-huawei-loophole)

---

## Helion获1.75亿美元研发聚变电站半导体 {#news-21}

> 聚变能源初创公司 **Helion** 获得 1.75 亿美元联邦资金，用于研发和制造聚变电站所需的先进半导体及电力电子设备。

![Helion获1.75亿美元研发聚变电站半导体](https://techcrunch.com/wp-content/uploads/2026/02/Helion-Polaris-D-T.jpeg?resize=1200,800)

**Helion** 表示，目前相关设备会损失流经其中电力的约 5% 至 10%。公司正在建设首座聚变电站 **Orion**，并计划在 2028 年前向 **微软** 提供电网电力。

部分资金将用于在华盛顿州建设自动化半导体模块、封装和测试产能。超过 1 亿美元将投入华盛顿州相关研发，约 8000 万美元支持佛蒙特州与 **GlobalFoundries** 的合作项目。

这笔为期三年的联邦资助由美国商务部依据《芯片法案》发放。**Helion** 还宣布获得 5000 万美元私人投资，但未披露投资者。

**Helion** 首席执行官 David Kirtley 表示，资助支持的研发无法及时用于 **Orion** 启动，但可能提高后续聚变电站的效率。

[查看原文](https://techcrunch.com/2026/10/22/fusion-startup-helion-is-developing-new-semiconductors-that-could-double-output-of-its-power-plants/)

---

## 全球PC三季度出货量因内存涨价下降21% {#news-22}

> Counterpoint Research称，2026年第三季度全球PC出货量同比下降21%。IDC和Omdia此前发布的报告也显示出类似的PC出货量下降趋势。

![全球PC三季度出货量因内存涨价下降21%](https://platform.theverge.com/wp-content/uploads/sites/2/2025/12/STKS523_RAM_SHORTAGE_C.jpg?quality=90&strip=all&crop=0,0,100,100)

Counterpoint将PC出货量下降与更高的零部件价格联系起来。2026年第二季度之前，PC出货量已连续增长超过两年。

过去几个月，RAM、SSD以及**Intel**、**AMD**和**Qualcomm**生产的芯片价格上涨。

零部件价格上涨推动从**MacBook**到树莓派等产品的价格上升。

2026年第三季度，智能手机出货量也降至14年来的低点。

[查看原文](https://www.theverge.com/gadgets/1017144/global-pc-shipments-dropped-q3-2026-ram)

---

## Nirva获3300万美元融资将推出环境智能吊坠 {#news-23}

> 可穿戴设备初创公司 **Nirva** 宣布完成 2500 万美元 Pre-Series A 轮融资，加上年初融资后累计融资额达到 3300 万美元。

![Nirva获3300万美元融资将推出环境智能吊坠](https://techcrunch.com/wp-content/uploads/2026/10/Nirva-pendant.jpg?resize=1200,675)

成立于 2025 年的 **Nirva**，创始人包括两名前 **Meta Reality Labs** 员工 Wei Lyu、Jason Chen，以及时尚珠宝品牌创始人 Hanying Hu。

公司的首款设备是一款可佩戴为手链的吊坠，重量约 8 克，单次充电续航最长三天，计划在年底前以 249 美元发售。

**Nirva** 表示，设备会利用用户注册时录制的语音片段建立模型，并过滤周围其他人的对话或数据。公司称，设备默认不会保留处理后的音频数据或文字记录。

配套应用会解析用户语音，并生成与用户个性、周围人物、去过地点及日常记录相关的推断性洞察。上述隐私和过滤能力主要来自公司及其首席执行官的描述，文章未提供独立验证。

[查看原文](https://techcrunch.com/2026/10/22/nirva-raises-33m-for-a-pendant-that-only-listens-to-you/)

---

## Meta因新墨西哥州数据保护案被罚250亿美元 {#news-24}

> 陪审团认定**Meta**违反新墨西哥州消费者保护法，涉及近4400万次违规，要求其支付250亿美元。

这是Meta遭遇的最大罚款，案件涉及其自2010年以来的相关用户与数据处理行为。

新墨西哥州总检察长Raúl Torrez此前拒绝加入Meta与近乎所有州总检察长达成的180亿美元和解。

美国地区法院法官Francis J. Mathew表示，相关行为反复且故意欺骗用户，适当处罚金额缺乏明确标准。

法院提及的问题包括用户数据控制、第三方数据滥用、错误信息、仇恨言论和执法平等。

[查看原文](https://arstechnica.com/tech-policy/2026/10/meta-whines-new-mexico-is-impossible-to-please-after-historic-25-billion-fine/)


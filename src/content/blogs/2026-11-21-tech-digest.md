---
title: 科技早报 2026-11-21
category: "科技, 科技早报"
excerpt: AI自我改写权重、代理开发与Google平台更新成为焦点，安全数据泄露和AI设计CPU架构同样受关注。
lastEdited: 2026年11月21日
tags: [科技早报, 人工智能, AI代理, Google, 开源项目, 网络安全, 芯片设计]
imageUrl: 
---

## 概览

### 要闻

- [多起技术故障接连发生，The Vergecast回顾混乱一周](#news-1)
### AI 与机器学习

- [论文提出语言模型可通过推理改写自身权重](#news-2)
- [METR更新AI时间范围图：能力仍沿指数提升](#news-3)
- [彭博分析称中国AI受影响岗位降速更快](#news-4)
- [苹果加入设备控制型AI代理竞争并设门槛](#news-5)
- [Google发布TPU模型设计指南，聚焦大模型与MoE优化](#news-6)
- [Google AI Studio支持单提示构建全栈安卓应用](#news-7)
### GitHub 热门项目

- [OpenComputer开源替代Devin，支持Slack分配编码任务](#news-8)
- [ClawDOS让AI编程代理运行在DOS环境](#news-9)
### 开源生态

- [PostgreSQL 19新增SQL功能并提供浏览器实操环境](#news-10)
- [Clojure：通过不同编程范式拓展开发者思维](#news-11)
### 开发者工具

- [Google详解Gemini Enterprise定制界面身份验证](#news-12)
- [Backpack团队称llms.txt与MCP未明显改善代理开发](#news-13)
### 安全与隐私

- [转录公司Tigerfish被曝在线暴露客户敏感数据](#news-14)
- [研究发现AI服务供应链可能泄露用户秘密数据](#news-15)
- [Signal限制截图防止系统级AI读取用户屏幕](#news-16)
- [RansomwareHelp联合创始人被控电信欺诈](#news-17)
### 产品与平台

- [Google桌面搜索改版，新增AI功能入口并移除搜索按钮](#news-18)
- [Google将于2027年关闭Nest应用并停用智能家居助手](#news-19)
- [作者称GitHub账号被限制且暂未获官方回复](#news-20)
- [黑色星期五前多款科技产品已推出提前优惠](#news-21)
### 硬件与芯片

- [Architect Labs推出由AI设计验证的新CPU架构Frostbite](#news-22)
- [Valve称内存短缺或推高Steam Machine售价](#news-23)
- [Framework Laptop 16故障引发用户对支持服务不满](#news-24)
---

## 多起技术故障接连发生，The Vergecast回顾混乱一周 {#news-1}

> 本周，**Outlook**经历持续数日的服务中断，美国还发生全国范围停飞令。The Vergecast节目回顾了银行服务、iCloud等多起技术故障。

![多起技术故障接连发生，The Vergecast回顾混乱一周](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/VRG_VST_111926_Site.jpg?quality=90&strip=all&crop=0,0,100,100)

文章称，美国此次全国范围停飞令是25年来仅第二次出现此类情况。

银行服务似乎一度无法正常运行，**iCloud**也出现服务不可用问题。

节目讨论了这些事件及其原因，但所给原文未确认各起故障的具体技术原因。

节目认为，多个看似较小的问题叠加后，仍可能带来值得关注的影响。

[查看原文](https://www.theverge.com/podcast/1038419/outage-outlook-ground-stop-tech-failure-vergecast)

---

## 论文提出语言模型可通过推理改写自身权重 {#news-2}

> 一篇论文提出“self-rewriting”方法，使语言模型在不使用梯度或训练的情况下，通过自身推理改写权重。论文称，开放的27B模型可诊断失败并改进自身。

![论文提出语言模型可通过推理改写自身权重](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png)

论文称，模型可获得自身权重、评分答案以及运行自身的能力，并据此诊断失败、改写权重。

在未见过的问题上，模型自我编辑后准确率提高6.6个百分点，并会在练习题上验证编辑结果，只提交有效编辑。

论文还称，模型连续八次会话准确率持续上升，并能修复受损副本，使未见过图像任务的准确率恢复到原始水平的80%以上。

研究称，该能力与模型规模相关：较小模型无法有效编辑或可能损坏自身，只有同系列最大模型能够改进和修复自身。上述结论来自论文摘要，尚无独立复核信息。

[查看原文](https://arxiv.org/abs/2611.21885)

---

## METR更新AI时间范围图：能力仍沿指数提升 {#news-3}

> AI评估非营利组织**METR**发布报告称，部分AI能力仍沿指数轨迹提升，但模型在需要判断的任务上不如编程任务表现出色。

**METR**更新了“时间范围图”，并在新测试集中加入预计人类需要更长时间完成的任务及更多开放式任务。

在原有测试中，前沿模型能够成功完成的任务长度大约每四个月翻倍。METR以人类完成任务所需时间衡量任务难度。

报告指出，可验证任务更适合强化学习训练，因此AI系统在编程、数学等可自动判断结果的领域表现较好。

新测试集纳入需要判断的任务，例如设计供METR使用的新AI评估，并由METR员工对结果评分。文中提及的另一份删节报告及相关自我改进说法未获确认。

[查看原文](https://www.technologyreview.com/2026/11/20/1149399/the-most-misunderstood-graph-in-ai-just-got-a-major-update/)

---

## 彭博分析称中国AI受影响岗位降速更快 {#news-4}

> 彭博新闻社分析1000万条招聘信息称，中国受人工智能影响的岗位数量下降速度比其他岗位快10个百分点。入门级劳动者和创意产业受到的影响最明显。

![彭博分析称中国AI受影响岗位降速更快](https://the-decoder.com/wp-content/uploads/2026/08/china_flag_visual-1.png)

分析称，人工智能正在加剧中国原本疲弱的劳动力市场。

目前，中国超过90%的微短剧使用人工智能制作。

中国人民银行前顾问蔡昉警告称，人工智能带来的更大冲击仍可能到来。

上述结论来自招聘信息分析，关于未来冲击的说法属于警告，并非已确认结果。

[查看原文](https://the-decoder.com/bloomberg-analysis-of-10-million-job-postings-shows-ai-exposed-roles-in-china-fell-10-percentage-points-faster-than-others/)

---

## 苹果加入设备控制型AI代理竞争并设门槛 {#news-5}

> 苹果正在开发自己的人工智能代理，加入控制用户设备的人工智能代理竞争。与此同时，苹果提高了竞争对手访问其设备的障碍。

![苹果加入设备控制型AI代理竞争并设门槛](https://the-decoder.com/wp-content/uploads/2026/07/apple_logo_neon_green.png)

Meta、OpenAI、Anthropic和Google已经推出各自的人工智能代理。

相关人工智能代理可用于控制用户的设备。

苹果正在开发的人工智能代理也被纳入这一竞争方向。

苹果同时提高了竞争对手访问其设备的障碍。

[查看原文](https://the-decoder.com/apple-joins-the-race-for-ai-agents-that-control-your-device-while-raising-new-barriers-for-competitors/)

---

## Google发布TPU模型设计指南，聚焦大模型与MoE优化 {#news-6}

> **Google Developers Blog**介绍了新推出的`AI-Hypercomputer/tpu-codesign`指南，提供基于硬件的模型设计规则。该指南面向运行大语言模型和混合专家（MoE）工作负载的TPU优化。

指南建议将脉动阵列的归约维度和输出维度对齐到256。

在MoE优化方面，指南建议采用LatentMoE，以压缩路由令牌流量。

指南还建议将并行轴直接映射到物理链路，以提升相关工作负载的运行性能。

[查看原文](https://developers.googleblog.com/tpu-model-design-considerations-and-optimization-guide/)

---

## Google AI Studio支持单提示构建全栈安卓应用 {#news-7}

> Google AI Studio现支持开发者通过单条提示构建、测试和发布全栈Kotlin Android应用，并集成多项Firebase服务。

开发者可在**Google AI Studio**中通过单条提示构建、测试和发布全栈Kotlin Android应用。

该功能集成Cloud Firestore、Firebase Authentication和Firebase AI Logic，并提供带音频的更快高清模拟器。

平台支持通过可视化截图调试应用，开发者还可将应用直接发布到个人Google Play库。

[查看原文](https://developers.googleblog.com/build-full-stack-android-apps-with-gemini-in-google-ai-studio/)

---

## OpenComputer开源替代Devin，支持Slack分配编码任务 {#news-8}

> 开源项目**OpenComputer**定位为可自行托管的Devin替代方案，支持团队通过Slack分配编码任务，并以拉取请求形式提交结果。

![OpenComputer开源替代Devin，支持Slack分配编码任务](https://opengraph.githubassets.com/f15b5c564758ab54710aa7696df34b6e5c80c691775a60b420323c3649dfbb67/diggerhq/opencomputer)

用户可在Slack线程中提及`@Computer`提交任务，代理会在自己的计算机上工作，团队能够观察并引导执行过程。

OpenComputer支持运行在用户自己的云账户中，也提供OpenComputer Cloud服务。项目采用Apache 2.0许可证，并称提供3天免费试用和600个工作分钟。

项目技术栈可运行在单个虚拟机上，并可按配置启动Claude Code、Codex或OpenCode会话；每个会话通过无根Podman隔离。

项目自述基准测试显示，OpenComputer创建拉取请求的速度比Devin快3.3倍。该数据来自项目方测试，原文未提供独立验证。

[查看原文](https://github.com/diggerhq/opencomputer)

---

## ClawDOS让AI编程代理运行在DOS环境 {#news-9}

> **ClawDOS** 是一个面向 DOS 的 AI 编程代理，可在 IBM PC XT 配置上读取和编辑文件、编写并运行程序。该项目通过桥接 PC 处理 8088 无法承担的 TLS。

![ClawDOS让AI编程代理运行在DOS环境](http://ricapar.net/ClawDOS/docs/images/opening.png)

ClawDOS 可运行在4.77 MHz 8088处理器、640K内存和 CGA 显卡配置的 IBM PC XT 上。

它能够读取和编辑磁盘文件，使用 Turbo C 编译程序，运行程序，并查看程序在屏幕上的绘制结果。

系统会在不同对话之间保存笔记，并从上次进度继续工作。`HARNESS.EXE` 是一个176 KB 的 DOS 程序，可调用 Claude Messages API、解析流式回复并运行工具。

该系统在原生 DOS 和硬件上运行，但依靠桥接 PC 处理 TLS。文章正文在“ClawDOS saves i”处截断，后续实现细节未完整提供。

[查看原文](http://ricapar.net/ClawDOS/)

---

## PostgreSQL 19新增SQL功能并提供浏览器实操环境 {#news-10}

> **PostgreSQL 19.0**于2026年11月19日发布。一篇实操文章介绍了新SQL功能及其在真实服务器环境中的运行方式。

![PostgreSQL 19新增SQL功能并提供浏览器实操环境](https://certuvia.com/opengraph-image)

文章涵盖`IGNORE NULLS`、get-or-create插入、JSON导出、JSONPath转换和范围减法等功能。

实验运行在真实的**PostgreSQL 19**服务器上，使用student角色和可丢弃的guest环境。

实验环境使用5432端口运行主服务器，逻辑复制订阅端和物理备用服务器分别使用5433和5434端口。

受内存限制，逻辑复制与物理复制实例不会同时运行；首次运行可能因初始化或基础备份耗时更长。

文章还介绍了原生REPACK：它可重写表，并将未使用空间返还给操作系统；性能比较应保持数据、设置、缓存和硬件一致。

[查看原文](https://certuvia.com/blog/postgres-19)

---

## Clojure：通过不同编程范式拓展开发者思维 {#news-11}

> 一篇文章建议开发者学习 **Clojure**，认为接触不同编程范式可能改变对编程的思考方式。文章介绍了该语言的 Lisp 渊源、数据结构与开发工具。

![Clojure：通过不同编程范式拓展开发者思维](https://eli.thegreenplace.net/images/logosmall.png)

**Clojure** 于2007年出现，属于 Lisp 语言家族，与 Common Lisp、Scheme 和 Racket 同属这一家族。

该语言本质上是动态语言，偏好使用列表、映射和向量等内置数据结构，而不是对象。

**Clojure** 支持高阶函数、Lisp 风格宏、REPL 驱动开发，以及基于宏实现的 `core.async`。

文章还提到持久化向量等数据结构和面向现代开发任务的大量库。作者称，Clojure 是其接触多种 Lisp 近15年后首个考虑用于生产环境的 Lisp。

[查看原文](https://eli.thegreenplace.net/2017/clojure-the-perfect-language-to-expand-your-brain/)

---

## Google详解Gemini Enterprise定制界面身份验证 {#news-12}

> Google介绍了在**Gemini Enterprise**的`:streamAssist` API之上构建定制企业界面时，开发者需要手动实现的三层身份验证。

第一层用于验证用户或工作负载身份，可采用Google Identity、Workforce Identity Federation或Workload Identity Federation。

第二层通过Keystore管理Federated Connectors所需的第三方OAuth，即`3LO`。

第三层为定制ADK代理配置按需的逐工具OAuth，涉及Vertex AI Agent Engine和GCP Auth Manager。

[查看原文](https://developers.googleblog.com/how-to-handle-user-connector-and-agent-auth-in-gemini-enterprise-with-a-custom-ui/)

---

## Backpack团队称llms.txt与MCP未明显改善代理开发 {#news-13}

> **Backpack for Laravel**团队称，`llms.txt`和文档MCP服务器并未明显改善人工智能代理的开发体验。团队认为，稳定的API设计反而更有助于代理使用软件。

![Backpack团队称llms.txt与MCP未明显改善代理开发](https://backpackforlaravel.com/presentation/img/backpack/socials/backpack_og_image_general.jpg)

作者称，简单网站管理面板过去通常需要一两天完成，如今约需一到两小时。

当前流程是用自然语言描述需求，由代理运行生成器、编写配置和测试，开发者再进行审查。

团队曾部署`llms.txt`并构建文档MCP服务器，但称代理很少主动查找或调用，效果也参差不齐。

作者认为，MCP更适合提供实时数据或工具调用，静态文档未必适合这一用途。

[查看原文](https://backpackforlaravel.com/articles/opinions/llms-txt-and-mcp-didn-t-move-the-needle-for-us-here-s-what-did)

---

## 转录公司Tigerfish被曝在线暴露客户敏感数据 {#news-14}

> 旧金山转录公司**Tigerfish**曾将客户转录内容及原始材料暴露在互联网上。相关数据包含警方访谈、执法记录仪视频、音视频文件及发票。

![转录公司Tigerfish被曝在线暴露客户敏感数据](https://techcrunch.com/wp-content/uploads/2025/06/GettyImages-2150052525.jpg?resize=1200,800)

这些文件存储在亚马逊托管的S3服务器上，服务器公开列出，且可通过容易猜测的网址访问，无需密码。

安全研究员Anurag Sen于10月发现数据暴露并通知Tigerfish，但未收到回复。

在TechCrunch联系后，Tigerfish关闭了相关S3存储桶的公共访问，包括目录列表和单个文件。

Tigerfish称，Sen发送的数据泄露通知邮件被公司的垃圾邮件过滤器拦截。目前不清楚公司是否已通知客户。

[查看原文](https://techcrunch.com/2026/11/20/a-transcription-firm-used-by-police-prosecutors-and-tech-giants-exposed-customer-data-online/)

---

## 研究发现AI服务供应链可能泄露用户秘密数据 {#news-15}

> 研究人员通过植入数字追踪标记，观察敏感信息在人工智能服务网络中的流向。实验显示，数据可能经由多个AI服务组成的供应链泄露。

研究人员向广泛的人工智能服务网络发送请求，植入了200万个数字追踪标记以观察信息流向。

实验使用AWS访问密钥、SSH密码、私有Git仓库引用等此前未使用的秘密信息进行测试。

**OpenRouter**和**Vercel**等路由器或网关会接收提示词，并按价格或任务适配度转发请求。

研究人员通过泄露的“金丝雀”信息识别供应链中可能负责泄露的环节，但原文未列出具体泄露数量。

[查看原文](https://arstechnica.com/security/2026/11/a-leaky-ai-supply-chain-is-exposing-secret-user-data-at-an-alarming-rate/)

---

## Signal限制截图防止系统级AI读取用户屏幕 {#news-16}

> Signal正在Android和iOS设备上限制截图，以防止AI代理读取用户消息及其他屏幕数据。该公司敦促操作系统提供商加强应用对AI代理访问范围的控制。

![Signal限制截图防止系统级AI读取用户屏幕](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/protecting-your-privacy-1.png?quality=90&strip=all&crop=0,0,100,100)

Signal认为，操作系统内置的代理式AI可能分析屏幕内容，以获取更多用户信息。

Signal总裁Meredith Whittaker表示，系统层面的AI能力正在削弱Signal独立保障隐私的能力。

在iOS上，用户将看到用于阻止截图以及防止Siri AI扫描屏幕内容的开关选项。提供的材料未说明两端全部限制措施的完整设置方式。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1038390/signal-blocking-ai-agent-screenshots-mobile-app)

---

## RansomwareHelp联合创始人被控电信欺诈 {#news-17}

> RansomwareHelp 首席技术官兼联合创始人 Juan Ricardo Palacio Escobar 因电信欺诈罪被起诉。相关欺诈细节来自起诉书指控，案件尚未显示已审判或定罪。

![RansomwareHelp联合创始人被控电信欺诈](https://krebsonsecurity.com/wp-content/uploads/2026/11/ransomwarehelp.png)

检方指控，RansomwareHelp 声称使用先进密码学工具恢复数据，实际上向攻击者购买解密密钥，再向受害者加价收费。

FBI 分别假冒勒索软件受害公司和虚构的勒索软件组织，与该公司接触。

据文章所述起诉书，Palacio 曾以约 6000 美元比特币向虚构组织购买解密工具。

随后，他向 FBI 假冒的受害公司收取 16010 美元，包括 2750 美元诊断费和 13260 美元解密费。

[查看原文](https://krebsonsecurity.com/2026/11/cto-of-ransomwarehelp-indicted-for-wire-fraud/)

---

## Google桌面搜索改版，新增AI功能入口并移除搜索按钮 {#news-18}

> **Google**正式推出经过数周测试的新桌面搜索页面设计，搜索框下方新增多个人工智能功能入口。

Google搜索副总裁Robby Stein在X上确认，新桌面搜索页面在测试成功后开始部署。

新页面在搜索框下方增加图像生成、文件分析以及使用Gemini进行头脑风暴等功能按钮。

原先位于“I'm Feeling Lucky”按钮旁边的Google Search专用按钮被移除。

用户输入查询时，自动完成建议会遮挡该按钮；用户也可以点出文本输入框访问，或直接按Enter键执行搜索。

[查看原文](https://arstechnica.com/ai/2026/11/googles-latest-search-page-redesign-drops-the-search-button-adds-ai-sidebar/)

---

## Google将于2027年关闭Nest应用并停用智能家居助手 {#news-19}

> **Google**宣布停止在智能家居设备上使用Google Assistant，并将相关设备管理迁移至Google Home应用。Nest应用计划于2027年1月25日关闭。

![Google将于2027年关闭Nest应用并停用智能家居助手](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/21935903/dseifert-nest-audio-4225-1.0.jpeg?quality=90&strip=all&crop=0,0,100,100)

Nest恒温器、摄像头和Nest Protect报警器等产品将转由**Google Home**应用管理。

Google表示，用户完成Google Home应用设置后，公司将在2027年1月25日迁移Nest设备及摄像头和视频历史记录。

Nest Aware第一代服务也将由Google自动转移。

目前公告及相关信息未说明所有受影响设备和服务的完整变更范围。

[查看原文](https://www.theverge.com/tech/1038834/google-assistant-smart-speakers-nest-app-killed-shut-down)

---

## 作者称GitHub账号被限制且暂未获官方回复 {#news-20}

> 一名作者称，其尝试登录 GitHub 时被重定向至暂停页面，账号页面和个人项目也无法访问。

![作者称GitHub账号被限制且暂未获官方回复](https://nate.mecca1.net/)

作者表示，账号页面返回 404，个人项目同样无法访问。

他称自己没有收到 GitHub 的电子邮件或通知，因此不清楚账号受限原因。

作者表示，账号中存有许多未在其他地方备份的数据。

他已向 GitHub 提交工单，但截至文章发布时尚未收到回复；限制原因尚未获官方确认。

[查看原文](https://nate.mecca1.net/posts/2026-11-20_help/)

---

## 黑色星期五前多款科技产品已推出提前优惠 {#news-21}

> 黑色星期五正式日期为11月27日，但多家零售商已推出部分科技产品的提前优惠。文章提醒，当前折扣价不一定是历史最低价。

![黑色星期五前多款科技产品已推出提前优惠](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/268838_BF_CM_EARLY_DEALS_Headers_CVirginia.jpg?quality=90&strip=all&crop=0,0,100,100)

**AirPods Pro 3** 在亚马逊和沃尔玛列示价从249美元降至179美元，Best Buy为179.99美元。

**Sony DualSense** 无线控制器在亚马逊从74.99美元降至54美元，Best Buy和Target为54.99美元。

**Amazon Fire TV Stick 4K Plus** 支持4K、Dolby Atmos、Dolby Vision和Alexa Plus，列示价从69.99美元降至29.99美元。

**Apple Watch Series 12** 支持AI驱动的Audio Intelligence功能，GPS 42mm版本从399美元降至329美元。**007 First Light** 也从69.99美元降至34.99美元。

文章称，黑色星期五临近时价格可能进一步下降，清单还会随更多零售商促销持续更新。

[查看原文](https://www.theverge.com/gadgets/1028991/black-friday-best-early-deals-2026)

---

## Architect Labs推出由AI设计验证的新CPU架构Frostbite {#news-22}

> **Architect Labs**介绍了Frostbite，一款采用全新指令集、从头构建的通用CPU。文中称，该架构的设计、编译器到最终GDS迭代由AI系统自主完成。

![Architect Labs推出由AI设计验证的新CPU架构Frostbite](https://main--gleeful-begonia-6bb5f3.netlify.app/_next/static/media/frostbite-cover.3n9ytugnquhlr.jpg)

Frostbite利用交互网络特性，包括局部操作、显式依赖关系和单值所有者机制。

在最初选定的25项工作负载上，Frostbite相较特定现代超标量双发射顺序执行CPU核心，实现了4.59倍能效性能指标。

这25项工作负载中有15项保留到最终评估阶段；文章未给出更广泛的测试条件。

文中称，AI系统迭代了编译器、指令集架构、体系结构、微体系结构、RTL、验证和最终GDS。

[查看原文](https://architectlabs.com/blog/frostbite)

---

## Valve称内存短缺或推高Steam Machine售价 {#news-23}

> Valve表示，内存和存储成本仍在以前所未有的水平上涨，供应与成本问题可能迫使Steam Machine调整价格。

Steam Machine于6月开始发货时，Valve称难以以合理成本获得稀缺的内存和存储组件，产量少于计划且价格高于最初计划。

Valve正在继续生产更多Steam Machine，但尚不知道可生产数量以及将以何种价格提供。2TB型号尤其受到供应限制。

Steam Machine首批预订的最后一批产品正在交付。若供应和成本问题持续，Valve可能需要调整售价。

Valve尚未确认具体涨价幅度、时间、最终产量或售价。

[查看原文](https://arstechnica.com/gaming/2026/11/valve-says-it-might-have-to-raise-the-price-of-supply-limited-steam-machines/)

---

## Framework Laptop 16故障引发用户对支持服务不满 {#news-24}

> 一名作者称，其公司购买的**Framework Laptop 16**在安装操作系统前就出现输入模块问题。作者表示，持续约三个月的支持沟通未能解决不满。

![Framework Laptop 16故障引发用户对支持服务不满](https://poolp.org/posts/2026-11-20/ill-never-buy-framework-hardware-again/featured.png)

这台笔记本配置后价格约为3000欧元，开箱后显示“missing input module”，居中的键盘无法被检测。

键盘移至左侧时被识别为数字键盘；未启用BIOS中的“Force Power for Input Modules”时，键盘和触控板无法工作。

**Framework**官网建议不要永久启用该选项，因为这可能对硬件有害。作者称其提交支持工单后经历了两次部件更换和一次维修中心处理。

Framework最终认定设备“No Fault Found”，并将问题归因于键盘布局。作者表示，设备最初出现问题时甚至尚未安装操作系统，并称已停止在公司购买Framework产品。

[查看原文](https://poolp.org/posts/2026-11-20/ill-never-buy-framework-hardware-again/)


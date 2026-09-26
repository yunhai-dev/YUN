---
title: 科技早报 2026-09-09
category: "科技, 科技早报"
excerpt: 本期聚焦AI融资与产品、开源开发工具及微软与Chrome安全更新。
lastEdited: 2026年9月9日
tags: [科技早报, 人工智能, 开源项目, 开发者工具, 网络安全, GitHub]
imageUrl: 
---

## 概览

### 要闻

- [MIT发布2026年度35位青年创新者名单](#news-1)
### AI 与机器学习

- [Cognition获20亿美元融资估值升至480亿美元](#news-2)
- [Meta推出Muse助手押注自主执行型AI](#news-3)
- [OUI-1发布：面向生成式界面的26B参数模型](#news-4)
- [Qwen3.8 27B量化测试显示四位版本表现稳健](#news-5)
- [CloudNC获2000万美元融资推进AI制造软件应用](#news-6)
- [OpenAI推出Sketch：涂鸦可生成详细AI图像](#news-7)
### GitHub 热门项目

- [GitHub 热门项目 browser-use：让网站接入 AI 代理](#news-8)
- [GitHub热门项目OpenCADStudio支持二维三维CAD绘图](#news-9)
- [Pascal Editor以WebGPU构建三维建筑编辑器](#news-10)
- [Hugging Face 开源 funes 为 AI 编程代理索引会话记忆](#news-11)
- [GitHub 热门项目 `Konnect` 为 KiCAD 10 提供AI辅助PCB设计](#news-12)
- [GitHub 热门项目 `i-have-adhd` 聚焦编码代理输出体验](#news-13)
### 开源生态

- [LibreOffice 26.8一周下载量突破100万次](#news-14)
### 开发者工具

- [开源平台Copperhead为硬件团队提供AI工程工作流](#news-15)
- [C*将C语言编程与形式化验证整合到同一环境](#news-16)
- [GitHub账号介绍五条无需令牌的CLI命令](#news-17)
### 安全与隐私

- [调查称Meta平台出现AI生成儿童性虐待广告](#news-18)
- [Microsoft单月修复至少974个安全漏洞创纪录](#news-19)
- [Chrome改为每两周更新以应对AI安全变化](#news-20)
- [Meta被指未及时拦截数百条涉儿童虐待广告](#news-21)
### 产品与平台

- [Meta发布Muse个人AI代理并采用隔离架构](#news-22)
- [Google Cloud与Accenture组建企业AI部署联合部门](#news-23)
- [《塞尔达传说：时之笛》重制版11月5日发售](#news-24)
---

## MIT发布2026年度35位青年创新者名单 {#news-1}

> MIT Technology Review 发布2026年度“35 Innovators Under 35”名单，入选者来自生物技术、人工智能、计算与机器人、气候与能源四个类别。

![MIT发布2026年度35位青年创新者名单](https://wp.technologyreview.com/wp-content/uploads/custom-story/1116327/images/recirc-1.png)

本届名单从550份提名中选出，编辑团队还获得44名专家评委协助评估入围者。

文章介绍，环境DNA（eDNA）通过分析生物释放的遗传物质开展研究。

蜘蛛网能够捕获蜘蛛、猎物及附近动植物释放的材料，被视为eDNA的重要来源。

相关研究称，没有其他被动工具在识别脊椎动物方面达到蜘蛛网的效果。

[查看原文](https://www.technologyreview.com/2026/09/08/1143615/the-download-35-innovators-under-35-spiderwebs-measuring-nature/)

---

## Cognition获20亿美元融资估值升至480亿美元 {#news-2}

> AI编程公司**Cognition**宣布融资20亿美元，估值达到480亿美元。公司表示，自5月上一轮融资以来，年化收入运行率已从4.92亿美元增至9亿美元。

![Cognition获20亿美元融资估值升至480亿美元](https://techcrunch.com/wp-content/uploads/2026/08/Scott-Wu-of-Cognition.jpg?w=1024)

本轮融资由Andreessen Horowitz、Accel、Founders Fund、General Catalyst和Avenir领投。

Cognition开发了编程助手`Devin`，并正在基于开源替代方案训练自有模型。

公司租用英伟达服务器集群，年成本达到数亿美元；The Information报道称，其今年总现金消耗可能达到8亿美元。

Cognition成立于2024年，创始人为Scott Wu，主要企业客户包括Mercedes-Benz、NASA、Goldman Sachs和Citi。公司未说明年化收入运行率的具体计算方式。

[查看原文](https://techcrunch.com/2026/09/08/cognition-hits-48b-valuation-signaling-investors-believe-ai-coding-is-far-from-a-winner-take-all-market/)

---

## Meta推出Muse助手押注自主执行型AI {#news-3}

> **Meta**推出个人AI助手Muse，称其可帮助用户处理日常任务和项目。相关自主执行及代表用户谈判的能力目前主要基于Meta自身说法，文章未提供独立验证。

![Meta推出Muse助手押注自主执行型AI](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/STK169_Mark_Zuckerburg_CVIRGINIA_C.jpg?quality=90&strip=all&crop=0,0,100,100)

Muse被设计用于在线购物、发送电子邮件和规划旅行等任务。

Meta表示，用户提供目标后，Muse可以自主打开浏览器并填写表单，甚至代表用户进行谈判。

Muse是Meta数十亿美元战略调整的最新举措之一，目标包括改善其在AI竞赛中的处境，并追赶OpenAI、Anthropic和Google。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/991216/meta-bets-on-ai-agent-muse-to-catch-up-in-ai-race)

---

## OUI-1发布：面向生成式界面的26B参数模型 {#news-4}

> Thesys Engineering Team 发布 OUI-1，这是一个用于在 `openui-lang` 中生成用户界面的 DiffusionGemma 微调模型。该模型在 Generative UI Benchmark 上取得 71.7% 的成绩。

![OUI-1发布：面向生成式界面的26B参数模型](https://www.openui.com/meta-image.png?v=20260725-1708)

OUI-1 为 26B 参数模型，可在配备 RTX 5090 的消费级 GPU 上以 FP8 运行，模型权重已发布至 Hugging Face，并遵循 Gemma Terms of Use。

OUI-1 的基准成绩是基础模型的 5.5 倍。未经微调的 DiffusionGemma 得分为 13.0%，主要问题包括模式错误和连接错误。

OpenUI Lang 的令牌消耗最多可比 JSON 减少 67%，并支持流式输出，使界面可在模型完成生成前开始呈现。

文章援引 Google 数据称，DiffusionGemma 以 256 个令牌为区块生成内容，在单张 H100 上速度超过每秒 1,000 个令牌，在 RTX 5090 上超过每秒 700 个令牌。

[查看原文](https://www.openui.com/blog/oui-1)

---

## Qwen3.8 27B量化测试显示四位版本表现稳健 {#news-5}

> 一项对 **Qwen3.8 27B** 不同量化版本的测试显示，17GB的 `Q4_K_M` 版本在 `Terminal-Bench 2.1` 上表现接近完整模型。1-bit量化版本在 `GPQA Diamond` 上则接近随机猜测。

![Qwen3.8 27B量化测试显示四位版本表现稳健](https://quesma.com/_astro/thumbnail.B4Hy1R5v.png)

完整BF16模型大小为55GB，超过大多数消费级硬件的承载能力；`Q4_K_M`版本大小为17GB。

测试显示，`Q4_K_M`可装入配备24GB显存的RTX 4090，并为约64k tokens上下文预留空间。

文章测试了`Q8_0`、`Q4_K_M`、`UD-Q2_K_XL`和`UD-IQ1_S`四种版本，大小分别为29GB、17GB、10.7GB和6.2GB。

作者使用Modal GPU测试，费用约为3000美元；部分Unsloth量化文件后来被替换，测试难以完全复现。

[查看原文](https://quesma.com/blog/qwen38-27b-quantizations-benchmarked/)

---

## CloudNC获2000万美元融资推进AI制造软件应用 {#news-6}

> 英国制造业软件初创公司 **CloudNC** 宣布完成2000万美元B轮扩展融资，累计融资总额达到1.28亿美元。

![CloudNC获2000万美元融资推进AI制造软件应用](https://techcrunch.com/wp-content/uploads/2026/09/Theo-Saville-CloudNC.jpg?resize=1200,675)

**CloudNC** 于2015年由 Theo Saville 和 Chris Emery 创立，提供AI驱动的 `CAM Assist` 软件。

`CAM Assist` 可接入 Autodesk Fusion、Mastercam 等传统CAM系统，辅助选择刀具、进给方向和切削参数，并起草CNC机床代码。

用户会审核、编辑并批准软件生成的结果。CloudNC表示，产品目标是提升熟练工人的效率，而非移除专家判断。

目前全球已有超过1000家机加工厂使用 `CAM Assist`，其中80%的客户位于美国。新资金将用于市场拓展、扩大产品采用及开发 `Quote Agent` 等产品。

[查看原文](https://techcrunch.com/2026/09/08/cloudnc-raises-20m-to-automate-manufacturings-most-pressing-bottlenecks/)

---

## OpenAI推出Sketch：涂鸦可生成详细AI图像 {#news-7}

> **OpenAI**宣布推出`ChatGPT Images 2.5`，新增图像生成方式Sketch。用户可在ChatGPT内绘制涂鸦，再用文字说明希望生成的图像。

![OpenAI推出Sketch：涂鸦可生成详细AI图像](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/ai-label-1.jpg?quality=90&strip=all&crop=0,0,100,100)

用户可在聊天框输入`@Sketch`启用该功能，随后会弹出绘图窗口。

文章作者短暂测试时，用电脑鼠标绘制的猫咪涂鸦按照指令被转换成了写实照片。

用户还可以直接对图像的特定部分发表评论。

目前文章仅描述了一次猫咪涂鸦转换测试，未提供更广泛的测试结果或性能指标。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/991727/openai-chatgpt-images-2-5-sketch)

---

## GitHub 热门项目 browser-use：让网站接入 AI 代理 {#news-8}

> GitHub Trending 项目 **browser-use/browser-use** 使用 Python 编写，旨在让网站可被 AI 代理访问。项目支持自动化在线任务，目前拥有 113,031 个 Stars，当天新增 330 个。

**browser-use/browser-use** 是一个使用 Python 编写的 GitHub 热门项目。

项目描述称，该项目旨在让网站可被 AI 代理访问，并支持自动化在线任务。

截至页面信息，该项目拥有 113,031 个 Stars，并在当天新增 330 个 Stars。

[查看原文](https://github.com/browser-use/browser-use)

---

## GitHub热门项目OpenCADStudio支持二维三维CAD绘图 {#news-9}

> GitHub Trending项目**HakanSeven12/OpenCADStudio**是一款使用Rust开发的CAD应用，支持二维和三维绘图。项目还支持DWG、DXF格式及GPU加速渲染。

OpenCADStudio面向CAD绘图场景，支持二维与三维设计操作。

项目支持DWG和DXF文件格式，并提供GPU加速渲染能力。

GitHub页面显示，该项目已有1,182颗Stars，并在当天新增46颗Stars。

[查看原文](https://github.com/HakanSeven12/OpenCADStudio)

---

## Pascal Editor以WebGPU构建三维建筑编辑器 {#news-10}

> GitHub 项目 `pascalorg/editor` 名为 Pascal Editor，采用 React Three Fiber 和 WebGPU 构建，用于创建和分享3D建筑项目。

![Pascal Editor以WebGPU构建三维建筑编辑器](https://repository-images.githubusercontent.com/1077819522/f76f9c77-a8ac-47a2-9fd7-d17a9cdb3759)

项目页面显示，该仓库约有2.9k个 Fork、约22.6k个 Star，并记录了1,426次提交。

在 Node.js 22.13 或更高版本环境中，用户可通过 `npx @pascal-app/cli editor` 创建本地 Pascal 安装。

该 CLI 会在后台启动编辑器和经过身份验证的 MCP 服务，选择不冲突的本机回环端口。

项目数据保存在 `~/.pascal/data/pascal.db`。页面同时提示，npm beta版本早于部分仓库功能，相关功能需安装经过验证的 GitHub 预发布版本。

[查看原文](https://github.com/pascalorg/editor)

---

## Hugging Face 开源 funes 为 AI 编程代理索引会话记忆 {#news-11}

> **huggingface/funes** 是一个面向 AI 编程代理的记忆工具，可索引过去的代理会话。项目支持 Claude Code、Codex、pi 和 Hermes，并允许代理检索过去的决策、理由和发现。

![Hugging Face 开源 funes 为 AI 编程代理索引会话记忆](https://opengraph.githubassets.com/1ac1275a05caf699b8316e123558dffbab25f2ac396bf47f8d630fbe4522baaf/huggingface/funes)

**funes** 支持索引 Claude Code、Codex、pi 和 Hermes 的会话，让代理检索过去的决策、理由和发现。

用户可以将记忆发布为 Hugging Face Hub 数据集，供其他机器、队友或代理访问。

项目提供 `recall` 和 `get` 工具，并可为 Claude、Codex 和 Hermes 创建初始索引、安装钩子，持续更新索引。

安装程序会检测平台、下载匹配的预构建二进制文件，并验证发布版本的校验和及版本，默认安装到 `~/.local/bin`。

截至页面信息，该公开仓库显示有 22 个 Fork、297 个 Star 和 551 次提交。

[查看原文](https://github.com/huggingface/funes)

---

## GitHub 热门项目 `Konnect` 为 KiCAD 10 提供AI辅助PCB设计 {#news-12}

> GitHub Trending 项目 **mixelpixx/Konnect** 使用 Rust 编写，面向 KiCAD 10 提供 AI 辅助 PCB 设计功能。项目以单个 Rust 二进制文件提供 217 个工具。

`Konnect` 是原生 KiCAD 插件，覆盖原理图、布局、布线和元件放置等功能。

项目提供的工具还涉及设计审查和制造，可供用户使用。

项目描述称，这些工具可提供给 Claude 或用户选择的其他大语言模型使用。

项目目前有 534 个 Stars，当天新增 53 个 Stars。

[查看原文](https://github.com/mixelpixx/Konnect)

---

## GitHub 热门项目 `i-have-adhd` 聚焦编码代理输出体验 {#news-13}

> GitHub Trending 项目 **ayghri/i-have-adhd** 使用 Python 编写，项目描述称其旨在防止编码代理隐藏答案，并提供适合 ADHD 用户的输出。

项目名称为 `i-have-adhd`，采用 Python 开发，目前登上 GitHub Trending。

项目描述称，该工具关注编码代理的答案呈现方式，目标是避免代理隐藏答案。

项目还旨在提供适合 ADHD 用户的输出形式。

项目目前有 27,954 个 Stars，当天新增 422 个 Stars。

[查看原文](https://github.com/ayghri/i-have-adhd)

---

## LibreOffice 26.8一周下载量突破100万次 {#news-14}

> **LibreOffice 26.8** 发布一周内被下载安装超过100万次，成为该软件最受欢迎的更新版本之一。该统计不包括通过 Linux 发行版软件仓库进行的更新。

![LibreOffice 26.8一周下载量突破100万次](https://manualdousuario.net/wp-content/uploads/2026/09/libreoffice.png)

LibreOffice 26.8 于8月26日发布。管理该项目的文档基金会表示，LibreOffice默认不提供生成式人工智能功能。

文档基金会称，默认集成的人工智能技术需要满足用户控制执行、未经授权不得传输内容、不进行遥测等原则。

此外，相关技术还应不依赖单一供应商、不牺牲文件格式，并且完全可选。基金会目前建议用户通过社区插件集成人工智能。

文档基金会表示，这并非一概拒绝人工智能，而是认为当前技术尚未满足默认集成所需的完整原则清单。下载量增长与无人工智能功能之间是否存在因果关系，文章未作确认。

[查看原文](https://manualdousuario.net/en/libreoffice-download-record-no-ai/)

---

## 开源平台Copperhead为硬件团队提供AI工程工作流 {#news-15}

> 开源AI工程平台**Copperhead**旨在帮助硬件团队设计、验证和交付电路板。平台基于KiCad和OpenSpec构建，并将设计决策与变更日志写入用户自己的代码仓库。

![开源平台Copperhead为硬件团队提供AI工程工作流](https://copperhead.sh/og-image.png)

Copperhead可处理原理图、PCB、Gerber和钻孔文件、DXF和STEP、渲染图、可订购物料清单、固件脚手架及调试启动计划。

平台要求先创建并验证变更提案，验证通过前编辑工具保持锁定。每次变更后会运行原理图ERC和电路板DRC检查。

Copperhead会将设计变更同步到相关文件，并以纯Markdown和JSON格式记录决策与变更日志，不使用专有格式。

项目采用Apache-2.0许可。页面还展示了使用该工作流完成的ESP32-S3袖珍摩尔斯电键项目Telegraph。

[查看原文](https://copperhead.sh/)

---

## C*将C语言编程与形式化验证整合到同一环境 {#news-16}

> 一篇论文提出C*，一种面向C语言的集成证明语言设计，尝试在同一环境中统一编程与验证。该原型由符号执行引擎和LCF风格证明内核提供支持。

![C*将C语言编程与形式化验证整合到同一环境](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png)

C*在C语言基础上加入验证能力，允许程序员在实现代码旁嵌入证明代码块，并实时更新和交互当前证明状态。

该语言使用C作为共同语言，支持构建可复用的逻辑定义、定理和可编程证明自动化库。

研究人员实现了C*原型，并在小型C程序基准以及pKVM buddy allocator的`attach`函数这一真实案例上进行了评估。

论文称，评估结果显示C*能够验证多种C编程习惯用法，并处理真实场景中的复杂推理任务。论文由11位作者共同完成，首次提交于2025年4月3日。

[查看原文](https://arxiv.org/abs/2504.02246)

---

## GitHub账号介绍五条无需令牌的CLI命令 {#news-17}

> Bluesky上的**@github.com**账号发布帖子，介绍GitHub CLI中可使用的5条命令。帖子将这些命令描述为“token-free”。

该帖子围绕GitHub CLI的5条命令展开，具体命令内容以原帖为准。

帖子由Bluesky上的**@github.com**账号发布，并将相关用法描述为无需令牌。

[查看原文](https://bsky.app/profile/github.com/post/3muzy3fgcpv2n)

---

## 调查称Meta平台出现AI生成儿童性虐待广告 {#news-18}

> Ars Technica称，**Meta**花费数日才移除Facebook和Instagram上包含相关AI生成材料的广告。相关广告数量、照片匹配及具体视频内容主要来自Tech Transparency Project调查，文章未提供独立核验。

Tech Transparency Project称，今年Meta未能检测到332条包含相关材料的广告。

该组织称，相关广告绝大多数推广中国开发的AI应用，其中许多涉及可对儿童图像进行数字修改的“nudify”应用。

TTP表示，其将多条广告与曾在网上出现的真实儿童照片进行了匹配，并报告了涉及欧洲王室年轻成员及一名14岁Instagram影响者照片的案例。

文章称，美国司法部已明确表示，AI生成的相关材料与相应真实材料一样具有危害性，并可能涉及联邦法律。

[查看原文](https://arstechnica.com/tech-policy/2026/09/real-photos-of-young-girls-were-in-nudify-app-ads-on-facebook-instagram/)

---

## Microsoft单月修复至少974个安全漏洞创纪录 {#news-19}

> **Microsoft**发布更新，修复Windows及其他软件中的至少974个安全漏洞，成为该公司迄今最大的一次补丁批次。

![Microsoft单月修复至少974个安全漏洞创纪录](https://krebsonsecurity.com/wp-content/uploads/2026/09/shutterstock_278764853.jpg)

本月补丁修复了两个正在遭到积极利用的零日漏洞，均可让攻击者在Windows系统中提升权限。

此次修复包含113个被Microsoft评为“严重”的漏洞，其中一个可通过发送特制数据包进行利用。

另一个Windows Shell远程代码执行漏洞的CVSS基础分数为9.8，利用不需要权限或用户交互。

9月补丁使Microsoft今年修复的漏洞总数超过2600个，组织仍需测试补丁并部署更新。

[查看原文](https://krebsonsecurity.com/2026/09/microsoft-plugs-nearly-1000-security-holes/)

---

## Chrome改为每两周更新以应对AI安全变化 {#news-20}

> **Chrome** 已将更新周期从四周缩短至两周，并发布面向桌面、iOS 和 Android 的 `Chrome 153`。Google称，更快的发布节奏有助于缩短安全漏洞修复间隔。

![Chrome改为每两周更新以应对AI安全变化](https://techcrunch.com/wp-content/uploads/2026/02/google-chrome-GettyImages-2151457378.jpg?w=1024)

Google表示，自动化AI工具和社区漏洞报告增加，使补丁与更新管理面临更多需求。

两周发布周期旨在缩短漏洞被公开知悉与完成修复之间的“N-day”补丁间隔。

Google称，更快更新也有助于应对部分快速变化的AI相关威胁，并更快推出正在试验的Chrome AI功能。

Mozilla、Microsoft和Brave也已开始采用两周发布周期；Chrome此前于2021年从六周改为四周。

[查看原文](https://techcrunch.com/2026/09/08/chrome-is-now-shipping-updates-every-2-weeks-as-ai-changes-the-security-landscape/)

---

## Meta被指未及时拦截数百条涉儿童虐待广告 {#news-21}

> 研究人员称，**Meta** 社交平台自 8 月初以来又出现超过 250 条包含儿童性虐待材料的广告。部分新发现广告使用了真实儿童图像，Meta 随后表示已将相关广告删除。

![Meta被指未及时拦截数百条涉儿童虐待广告](https://media.wired.com/photos/6a9b3f0d799e9933049ab28f/191:100/w_1280,c_limit/Security_Meta%20Published%20Ads%20Containing%20CSAM%20of%20Real%20Children_v1.jpg)

Meta 此前已从 Facebook、Instagram 和 Threads 删除约 50 条直接包含儿童性虐待材料的广告。

Tech Transparency Project 研究人员称，自去年年底以来，Meta 发布的相关虐待视频广告总数超过 350 条，其中许多广告链接到与中国开发者有关的“去衣”应用。

新发现的广告包含真实儿童图像，其中包括一名欧洲王室成员的相关图像；研究人员未公布其身份。WIRED 证实，其中一张来源图像来自某王室官方网站。

研究人员称，Meta 有时在收到报告后一周才审查仍在投放的相关广告。Meta 表示已依据儿童剥削、成人剥削和裸露内容政策删除这些广告。

关于广告数量、图像来源及审查延迟的主要信息来自 Tech Transparency Project 调查，部分内容由 WIRED 独立核实。

[查看原文](https://www.wired.com/story/meta-failed-to-catch-hundreds-of-ai-child-abuse-ads-some-included-images-of-real-kids/)

---

## Meta发布Muse个人AI代理并采用隔离架构 {#news-22}

> **Meta**宣布发布Muse，这款个人AI代理可通过消息交互自动执行数字任务。Meta表示，Muse已面向iOS和Android用户推出，也可通过网站及WhatsApp使用。

![Meta发布Muse个人AI代理并采用隔离架构](https://media.wired.com/photos/6a9e9eca147ff8c9409f7051/191:100/w_1280,c_limit/MetaSignalAi.jpg)

Muse可以根据自然语言提示代表用户发送电子邮件、预订旅行、协助出售汽车，并代表用户进行购买。

Meta表示，用户可免费试用Muse；需要大量自动执行数字任务的用户须购买其AI订阅计划。

Muse使用**Stripe**的Link支付基础设施结账，Link会生成一次性卡号，避免代理输入用户真实财务信息。

Muse采用名为Secure VM的架构，将每名用户的活动隔离在虚拟机中，分离不受信任数据与代理执行用户操作的部分。

上述功能和隐私设计主要来自Meta或Stripe的声明，原文未提供独立验证结果。

[查看原文](https://www.wired.com/story/meta-releases-muse-a-personal-ai-agent-with-privacy-built-into-it/)

---

## Google Cloud与Accenture组建企业AI部署联合部门 {#news-23}

> Google Cloud与Accenture正在组建联合部门，向企业派遣工程师，帮助客户采用Google的AI工具和服务。该部门将围绕Gemini Enterprise平台开发定制AI应用。

![Google Cloud与Accenture组建企业AI部署联合部门](https://techcrunch.com/wp-content/uploads/2026/04/GettyImages-2266466589.jpg?w=1024)

该联合部门名为**Accenture Gemini Enterprise Business Group**。Google将培训最多1000名“前沿部署工程师”，为企业提供相关服务。

这些工程师将在`Gemini Enterprise`平台上构建定制AI应用。Google此前还宣布投入7.5亿美元建设合作伙伴生态。

Alphabet截至6月30日据报道累计了8110亿美元采购承诺和合同义务。Google Cloud第二季度营收为248亿美元，其中相当一部分由企业AI业务推动。

据第三方数据，Google约占美国企业AI支出的6%，Anthropic和OpenAI的占比分别约为43.5%和39.7%。相关金额和市场数据存在不确定性。

[查看原文](https://techcrunch.com/2026/09/08/google-cloud-races-to-catch-up-in-the-ai-deployment-wars-with-accenture-deal/)

---

## 《塞尔达传说：时之笛》重制版11月5日发售 {#news-24}

> 任天堂宣布，《塞尔达传说：时之笛》重制版将于11月5日发行，登陆 **Switch 2** 平台。该消息在《塞尔达传说》系列40周年直播中公布。

![《塞尔达传说：时之笛》重制版11月5日发售](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/NintendoSwitch2_TheLegendofZelda_OcarinaofTime_Screenshot.png?quality=90&strip=all&crop=0,0,100,100)

任天堂于6月首次预告这款重制版，当时除一段简短预告片外未透露太多信息。

此次周年活动展示了更多任天堂重制这款游戏的方式。原作被称为任天堂最具影响力的游戏之一。

《时之笛》也是最早的3D《塞尔达传说》作品之一，重制版将面向 **Switch 2** 平台推出。

[查看原文](https://www.theverge.com/games/991218/zelda-ocarina-of-time-remake-release-date-trailer)


---
title: 科技早报 2026-11-12
category: "科技, 科技早报"
excerpt: Google密集发布AI训练、决策API与形式化验证进展，代理开发工具和数据安全事件持续受到关注。
lastEdited: 2026年11月12日
tags: [人工智能, Google, AI代理, 形式化验证, 开发者工具, 网络安全, GitHub, Apple]
imageUrl: 
---

## 概览

### AI 与机器学习

- [调查称美国数据经纪商向中国实验室售训练环境](#news-1)
- [Google介绍 Pathways：面向大模型的单控制器训练系统](#news-2)
- [Plurai获1300万美元融资拟用数字孪生训练AI代理](#news-3)
- [Google推出Gemini Decisions API，一次评估最多1000题](#news-4)
- [AlphaProof Code 四周完成 Signal 密码学核心验证](#news-5)
- [Google AI Edge Gallery新增设备端离线语音识别与合成](#news-6)
### GitHub 热门项目

- [OpenAI 发布 Codex Security 开源安全工具项目](#news-7)
- [SGLang-Omni 发布 v0.2.0，统一多模态服务运行时](#news-8)
- [GitHub热门项目将现代Web指南嵌入编码代理](#news-9)
- [plannotator登上GitHub Trending，支持代理工作流协作管理](#news-10)
- [Tencent/LoopForge登上GitHub Trending，构建编码代理交付流程](#news-11)
- [GitHub 热门股票分析项目 Star 数突破六万](#news-12)
### 开发者工具

- [Google发布A2UI 1.0开放协议支持代理式界面](#news-13)
- [Pomerado 声称可将任意网站转换为智能体 MCP](#news-14)
### 安全与隐私

- [Grok构建应用被曝暴露患者数据与机密销售管线](#news-15)
- [Google DeepMind用AI完成Signal关键加密验证](#news-16)
- [Qilin勒索软件团伙负责人身份线索指向圣彼得堡](#news-17)
- [Siri联合创始人支持Helix语音身份识别技术](#news-18)
### 产品与平台

- [Serve Robotics开放配送机器人平台，支持第三方直接调度](#news-19)
- [Apple将于2026年11月关闭运营28年的支持社区论坛](#news-20)
- [Apple支持社区将于2026年11月20日永久关闭](#news-21)
- [2026年iPad选购指南覆盖四类主力机型](#news-22)
### 硬件与芯片

- [英国芯片初创 Fractile 完成 7.2 亿美元 C 轮融资](#news-23)
- [Anduril称卫星传感器可追踪轨道夜间目标](#news-24)
---

## 调查称美国数据经纪商向中国实验室售训练环境 {#news-1}

> 据ChinaTalk调查，**Mercor**、**Surge AI**和**AfterQuery**等美国数据经纪商正向中国人工智能实验室出售人工智能训练数据。

![调查称美国数据经纪商向中国实验室售训练环境](https://the-decoder.com/wp-content/uploads/2026/06/china_vs_usa_ai_race.png)

报道估计，相关数据交易价值约5亿美元，数据包括此前为**OpenAI**或**Anthropic**构建的相同强化学习训练环境。

据报道，至少有九家公司参与相关业务。文章称，现有出口管制几乎不适用于这些交易。

相关金额、参与公司数量及交易情况来自ChinaTalk调查，报道使用了“约”和“至少”等限定表述。

[查看原文](https://the-decoder.com/us-data-brokers-are-selling-half-a-billion-dollars-in-rl-training-environments-to-chinese-ai-labs/)

---

## Google介绍 Pathways：面向大模型的单控制器训练系统 {#news-2}

> **Google**介绍了 `Pathways`，这是一种用于大规模模型训练的单控制器分布式系统。它通过全局数据流图、异步调度和中央调度器，协调多个加速器组的训练。

`Pathways`将计算表示为全局数据流图，以组织跨多个加速器组的大规模模型训练。

与依赖同步集体通信的 `DDP` 和 `FSDP` 等传统 `SPMD` 模型不同，`Pathways`采用异步调度和中央调度器。

该系统通过虚拟设备解耦模型定义与物理硬件，旨在提高硬件利用率并防止复杂工作负载中的死锁。

`Pathways`支持扩展复杂训练架构，并可处理强化学习后训练等动态工作负载。

[查看原文](https://developers.googleblog.com/what-is-pathways-single-controller-training-for-large-models/)

---

## Plurai获1300万美元融资拟用数字孪生训练AI代理 {#news-3}

> AI基础设施初创公司**Plurai**宣布完成1300万美元种子轮融资，计划利用企业数字系统的合成数据模拟，训练AI代理处理复杂边缘案例。

![Plurai获1300万美元融资拟用数字孪生训练AI代理](https://techcrunch.com/wp-content/uploads/2026/11/Plurai-team-photo.-Credit-Guy-Hamoy.jpg?resize=1200,800)

TechCrunch援引LiveBench 2.0称，Claude Fable 5.2和ChatGPT-6 Astra在100项任务中分别完成82.9项和75.6项。

Plurai计划创建企业电子系统的数字孪生，其中包括代理在生产环境中可访问的知识库和工具。

该平台可与Claude Code、Codex、Copilot和Cursor等现有代理工具协同工作。

融资由Team8领投，U&I、Velocity和Mercer参与投资。Plurai称，其与Nvidia和Nebius合作的测试显示，模型以更低成本超过中端前沿模型。

[查看原文](https://techcrunch.com/2026/11/11/plurai-wants-to-help-ai-agents-work-better-using-the-same-approach-that-helped-get-self-driving-cars-to-roads/)

---

## Google推出Gemini Decisions API，一次评估最多1000题 {#news-4}

> Google DeepMind推出**Gemini Decisions API**，可在一次处理中评估最多1000个封闭式问题。Google称，`Gemini Decision 1`支持多模态输入，并具备较低延迟和成本。

![Google推出Gemini Decisions API，一次评估最多1000题](https://the-decoder.com/wp-content/uploads/2026/10/gemini_4_logo_wall.png)

该API支持对文本、图像、音频和视频进行评估，单次处理最多覆盖1000个封闭式问题。

Google称，`Gemini Decision 1`的结果返回时间为150至250毫秒。

Google还称，该模型成本约为`Gemini 3.5 Flash-Lite`的五分之一。

性能、延迟和成本数据均来自Google，原文未提供独立验证。

[查看原文](https://the-decoder.com/google-joins-the-decision-model-wave-with-gemini-decision-1-scoring-1000-questions-in-a-single-pass/)

---

## AlphaProof Code 四周完成 Signal 密码学核心验证 {#news-5}

> Google DeepMind 的 AlphaProof Code 在四周内完成了对 **Signal** 密码学核心代码的数学验证。文章称，这类验证通常需要数年。

![AlphaProof Code 四周完成 Signal 密码学核心验证](https://the-decoder.com/wp-content/uploads/2026/11/deepmind_alphaproof.png)

由 `Gemini Carbon` 驱动的 AI agents 编写了超过 600 万行证明代码。

其中约 1% 的证明代码被标记为需要人工审查。

**DeepMind** 计划将这一方法扩展至电网和医疗设备等关键基础设施领域。该计划尚未表明扩展已经完成。

[查看原文](https://the-decoder.com/google-deepminds-alphaproof-code-verified-signals-cryptographic-core-in-four-weeks-instead-of-years/)

---

## Google AI Edge Gallery新增设备端离线语音识别与合成 {#news-6}

> Google AI Edge Gallery现已支持设备端、离线的自动语音识别（ASR）和文本转语音（TTS）。该方案面向实时流式转写和低延迟语音合成场景。

开发者可使用 **ML Kit** 构建面向 Android 的优化方案，也可通过 **MediaPipe Tasks** 和 `LiteRT` 集成跨平台开放权重模型。

该本地处理流程支持将轻量级语音模型与设备端小型语言模型结合，文中列举的模型包括 `Gemini Nano` 和 `Gemma 4`。

[查看原文](https://developers.googleblog.com/on-device-speech-recognition-and-text-to-speech-in-google-ai-edge-gallery/)

---

## OpenAI 发布 Codex Security 开源安全工具项目 {#news-7}

> GitHub 热门项目 **openai/codex-security** 使用 TypeScript 开发，提供 Codex Security CLI 和 TypeScript SDK。项目用于发现、验证和修复安全漏洞。

项目当前获得 11,371 个 Star，并显示当天新增 20 个 Star。

项目提供 **OpenAI** 的 Codex Security CLI 和 TypeScript SDK，面向安全漏洞发现、验证与修复。

项目同时提供 npm 包，地址为 `https://www.npmjs.com/package/@openai/codex-security`。

[查看原文](https://github.com/openai/codex-security)

---

## SGLang-Omni 发布 v0.2.0，统一多模态服务运行时 {#news-8}

> **sgl-project/sglang-omni** 是面向交互式超级智能系统的高性能服务运行时，项目仓库已发布 `v0.2.0`。该版本可通过 PyPI 安装。

![SGLang-Omni 发布 v0.2.0，统一多模态服务运行时](https://opengraph.githubassets.com/928b31a95f5d52c2f6619d03d269e0bfbe449a38ab1ad21a6e064b4935dea7ca/sgl-project/sglang-omni)

项目仓库包含 Voxt、benchmarks、docker、docs、examples、playground、scripts 和测试目录等内容，页面显示共有 1,733 次提交。

项目新闻称，Voxt 2.0 支持 Mac 语音输入、任意到任意翻译和本地 AI 助手；相比 1.x，长时间听写后的等待时间缩短了 92%。

OpenRSI 与 SGLang-Omni 的合作已合并 14 个涉及 8 个语音和全能模型的 PR，并在 H100 上带来 7.6% 至 326.5% 的吞吐量提升。

项目称，SGLang-Omni 通过可组合图和持久会话，统一原生全双工模型、回合式多模态模型和级联系统，可使用 `uv pip install --prerelease=allow "sglang-omni==0.2.0"` 安装。

[查看原文](https://github.com/sgl-project/sglang-omni)

---

## GitHub热门项目将现代Web指南嵌入编码代理 {#news-9}

> GoogleChrome/modern-web-guidance-src 是 Modern Web Guidance 的源代码仓库，旨在帮助编码代理采用现代 Web 平台能力。

![GitHub热门项目将现代Web指南嵌入编码代理](https://opengraph.githubassets.com/208a8eae49ff70a2fa7e13d79097bf0d1ac8837526f634a93dadfaa513a46a8e/GoogleChrome/modern-web-guidance-src)

该仓库包含用于编写、校准和评估 Modern Web Guidance 内容的代码与文档。

Modern Web Guidance 将 Web 平台知识、最佳实践和浏览器兼容性数据以技能形式嵌入编码代理。

项目 CLI 支持安装、搜索指南、按 ID 获取指南，并扫描代码库中的过时模式。

项目由 Google Chrome、Microsoft Edge、Mozilla Firefox、MDN 团队与 Web 开发社区共同维护。

[查看原文](https://github.com/GoogleChrome/modern-web-guidance-src)

---

## plannotator登上GitHub Trending，支持代理工作流协作管理 {#news-10}

> backnotprop/plannotator成为GitHub Trending上的热门仓库，提供用于跟进和管理代理工作过程的工作区。

plannotator使用TypeScript语言，目前获得10026颗Star，并显示当天新增51颗Star。

项目支持塑造方案、决策、规划、批注和代码审查等工作。

用户可以通过项目分享内容，并一键向代理发送反馈。

[查看原文](https://github.com/backnotprop/plannotator)

---

## Tencent/LoopForge登上GitHub Trending，构建编码代理交付流程 {#news-11}

> Tencent/LoopForge成为GitHub Trending上的热门仓库，定位是用于构建自托管编码代理交付工作流的开源项目。

LoopForge使用Go语言，目前获得282颗Star，并显示当天新增76颗Star。

项目可通过脚本和人工审批门，协调CodeBuddy、Codex和Claude Code。

仓库包含面向编码助手的本地工作流，用于构建自托管的编码代理交付流程。

[查看原文](https://github.com/Tencent/LoopForge)

---

## GitHub 热门股票分析项目 Star 数突破六万 {#news-12}

> **ZhuLinsen/daily_stock_analysis** 是一个使用 Python 开发的多市场股票智能分析系统，由大语言模型驱动。项目当前获得 69,681 个 Star。

该项目当天新增 960 个 Star，支持多源行情、实时新闻和决策看板。

项目还支持自动推送，并在项目描述中表示可实现零成本定时运行。

**daily_stock_analysis** 面向多市场股票分析场景，使用 Python 开发。

[查看原文](https://github.com/ZhuLinsen/daily_stock_analysis)

---

## Google发布A2UI 1.0开放协议支持代理式界面 {#news-13}

> Google发布A2UI 1.0，这是一种面向生成式用户界面的开放协议，可让AI代理在网页、移动端和桌面应用中渲染交互式原生界面。

A2UI 1.0提供React、Angular、Lit、Flutter、SwiftUI和Jetpack Compose等开源渲染器SDK。

开发者还可使用面向Python、TypeScript和Dart的代理SDK构建相关应用。

该版本引入双向函数调用、可切换的推理格式和安全数据绑定，面向代理式体验的开发场景。

[查看原文](https://developers.googleblog.com/a2ui-10-build-delightful-fast-reliable-agentic-experiences/)

---

## Pomerado 声称可将任意网站转换为智能体 MCP {#news-14}

> **Pomerado** 声称无需 API 即可将任意网站转换为 API 或 MCP，供智能体连接和使用。该项目由 Y Combinator 支持。

![Pomerado 声称可将任意网站转换为智能体 MCP](https://pomerado.ai/opengraph-image.png?opengraph-image.44k_sk6asunuu.png)

Pomerado 提供开源服务，支持通过 MCP 连接网站，并列出了 **Claude Code** 和 **Codex** 的配置命令。

页面称，服务无需账户即可试用；涉及账户登录的网站任务时，系统会提供登录链接。

一项展示的员工入职任务为 2 名新员工完成跨 HR、IT、课程和图书馆系统的操作，用时 8 分 16 秒、成本 0.03 美元。

Pomerado 展示的基准测试称，其速度快 2 倍、成本低 10 至 1000 倍、准确率高 30%。测试覆盖 25 个业务应用中的 30 个任务，每个任务仅尝试一次。

[查看原文](https://pomerado.ai/)

---

## Grok构建应用被曝暴露患者数据与机密销售管线 {#news-15}

> 安全公司 Claroc 发现，超过3.5万个由 **Grok** 构建的应用无需登录即可访问。调查称，其中包含患者数据、明文密码以及 **SpaceXSI** 的机密文件和销售管线信息。

![Grok构建应用被曝暴露患者数据与机密销售管线](https://the-decoder.com/wp-content/uploads/2026/05/grok_xai_logo.png)

Claroc称，这些应用默认启用了“Anyone with the link”访问权限，导致任何人都可能打开相关内容。

文章称，**SpaceXSI** 仅下线了自有的24个员工应用，其余应用仍可访问。

上述安全发现及仍可访问的应用数量均来自 Claroc 调查和文章报道，正文未提供独立核实信息。

[查看原文](https://the-decoder.com/grok-built-apps-exposed-patient-data-plaintext-passwords-and-spacexsis-own-sales-pipeline/)

---

## Google DeepMind用AI完成Signal关键加密验证 {#news-16}

> Google DeepMind研究人员使用代理式AI，对Signal协议多项关键加密保证进行了数学证明，即形式化验证。该概念验证项目在四周内完成。

研究人员使用名为`AlphaProof Code`的新AI框架，对Signal协议的部分关键加密保证进行验证。

这项工作为**Signal**、**Google Messages**和**WhatsApp**等平台的通信加密提供了进一步的独立验证。

形式化验证通过数学方法检查软件是否按预期运行，用于发现关键漏洞。

原文指出，AI辅助形式化验证能否广泛实用，以及保护大规模代码的有效性，目前仍不明确。

[查看原文](https://arstechnica.com/ai/2026/11/signals-encryption-just-passed-an-ai-powered-mathematical-checkup/)

---

## Qilin勒索软件团伙负责人身份线索指向圣彼得堡 {#news-17}

> 勒索软件即服务团伙**Qilin**负责人使用化名“Haise”，网络情报线索将其与一名居住在俄罗斯圣彼得堡的36岁男子联系起来。文章未说明该身份已获官方确认。

![Qilin勒索软件团伙负责人身份线索指向圣彼得堡](https://krebsonsecurity.com/wp-content/uploads/2026/11/haise-ramp-kela.png)

**Qilin**自2022年9月开始运营，NCC Group将其评为当前最活跃的勒索软件即服务团伙。过去三个月，该团伙至少声称有365个受害组织。

Qilin通过承诺至少80%的勒索款吸引附属攻击者，并采用“双重勒索”模式：先窃取敏感数据，再威胁公开发布。

其负责人使用化名“Haise”，Telegram用户名为`Alexbigboss44`。Intel 471记录显示，Haise曾于2022年6月申请加入网络犯罪论坛RAMP。

文章称，对`Alexbigboss44`、Rjun及相关论坛活动的线索追踪，均指向一名36岁的圣彼得堡男子，但这一身份尚未被官方确认。

[查看原文](https://krebsonsecurity.com/2026/11/who-runs-the-ransomware-group-qilin/)

---

## Siri联合创始人支持Helix语音身份识别技术 {#news-18}

> 初创公司**Helix**表示，其语音身份识别技术可直接在用户设备上运行，包括 `iPhone 13`；Siri联合创始人Dag Kittlaus将担任公司顾问。

![Siri联合创始人支持Helix语音身份识别技术](https://techcrunch.com/wp-content/uploads/2026/11/Helix-Co-Founders-Credit_-Coy-Gutierrez.jpg?resize=1200,800)

**Helix**已完成600万美元融资，**Chicago Ventures**领投，BAM Ventures、Aglaé Ventures等机构参投。公司于2025年由Alex Oberg、Anna Dorofiyenko和Mike Hall创立。

Helix称其核心技术可判断用户是否为真人并估计年龄，也可替代或补充 CAPTCHA，帮助阻止机器人攻击。模型可在本地运行，公司称这有助于降低部署成本。

居家医疗服务提供商**Zeel**已使用Helix技术验证上门服务人员身份。Helix还在通过试点探索利用语音生物标志物检测醉酒或 distress 等状况，相关用途仍处于探索阶段。

[查看原文](https://techcrunch.com/2026/11/11/siri-co-founder-backs-helix-for-its-voice-id-tech/)

---

## Serve Robotics开放配送机器人平台，支持第三方直接调度 {#news-19}

> **Serve Robotics**正在开放其自动驾驶末端配送机器人平台。公司推出 `AV Delivery Developer Portal`，允许第三方软件工程师、独立企业和自主 AI 代理访问机器人车队。

![Serve Robotics开放配送机器人平台，支持第三方直接调度](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/gettyimages-2231498899.jpg?quality=90&strip=all&crop=0,0,100,100)

Serve Robotics的车队包括 2000 台人行道配送机器人，目前在 150 个社区运营。

第三方开发者和相关小型企业可使用 Serve 的软件工具直接调度机器人。

这一方式无需依赖 **Uber Eats** 等大型食品配送公司即可安排机器人配送。

原文关于服务覆盖范围及后续使用条件的内容被截断，无法确认更多细节。

[查看原文](https://www.theverge.com/transportation/1030902/serve-robotics-open-developer-api-sidewalk-delivery)

---

## Apple将于2026年11月关闭运营28年的支持社区论坛 {#news-20}

> Apple宣布，其在线社区论坛 **Apple Support Community** 将于2026年11月20日永久关闭。目前论坛已停止接受新帖子，并处于只读状态。

Apple表示，用户仍可通过官方 **Apple Support** 网站获取指导和支持。

该论坛运营了28年，曾为 Apple 用户提供产品技术建议，回复通常来自其他用户，Apple 员工有时也会参与。

文章指出，作为社区论坛，相关建议的有用性和准确性存在差异。

[查看原文](https://arstechnica.com/gadgets/2026/11/apple-is-shuttering-its-28-year-old-online-community-forum/)

---

## Apple支持社区将于2026年11月20日永久关闭 {#news-21}

> Apple已将 Apple Support Community 置于只读模式，并通知称该社区将于2026年11月20日永久关闭。

![Apple支持社区将于2026年11月20日永久关闭](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/Apple-Support-Community-forum.jpg?quality=90&strip=all&crop=0,0,100,100)

从通知发布当天起，Apple Support Community 将不再接受新帖子。

在正式关闭前，用户仍可只读访问社区内容。该论坛此前用于交流建议、排查问题和讨论 Apple 产品。

[查看原文](https://www.theverge.com/tech/1031507/apple-community-support-forum-shutting-down)

---

## 2026年iPad选购指南覆盖四类主力机型 {#news-22}

> 文章梳理了Apple目前销售的四类主要iPad型号，并按日常使用、工作学习和专业用途给出选择建议。

![2026年iPad选购指南覆盖四类主力机型](https://media.wired.com/photos/69ced2e8b3e67db87f57d6c7/191:100/w_1280,c_limit/ipad-air-m4-04%20(1).jpg)

文章将2025款搭载A16芯片的iPad列为适合大多数人的选择，标示价格为449美元。

2026款搭载M4芯片的**iPad Air**面向工作和学习，11英寸版本价格标示为749美元。

2024款第七代**iPad mini**适合日常使用，价格标示为599美元；搭载M5芯片的**iPad Pro**面向专业用户，11英寸版本价格标示为1199美元。

文章称**Apple**近期宣布全系iPad涨价，并在2026年7月更新了相关价格信息。

[查看原文](https://www.wired.com/gallery/the-best-ipad/)

---

## 英国芯片初创 Fractile 完成 7.2 亿美元 C 轮融资 {#news-23}

> 英国人工智能芯片初创公司 **Fractile** 完成 7.2 亿美元 C 轮融资，英国主权人工智能基金参与支持。公司计划利用新资金推进芯片和系统开发。

![英国芯片初创 Fractile 完成 7.2 亿美元 C 轮融资](https://techcrunch.com/wp-content/uploads/2026/11/GettyImages-2183896789.jpg?resize=1200,800)

此次融资由 Thrive Capital、Founders Fund、Lightspeed Venture Partners 和 Redpoint 领投。

**Fractile** 采用全栈方案，同时开发人工智能芯片和用于提升大语言模型执行速度的机器学习编译器。

公司芯片设计基于将 DRAM 堆叠在芯片上，以期缓解内存容量与性能之间的权衡。

首席执行官 Walter Goodwin 表示，新资金将支持公司在次年推出首批芯片和系统；该时间表属于公司计划。

[查看原文](https://techcrunch.com/2026/11/11/with-720m-round-britains-fractile-gets-a-leg-up-in-the-race-for-ai-chips/)

---

## Anduril称卫星传感器可追踪轨道夜间目标 {#news-24}

> **Anduril Industries**宣布，其基于卫星的新型传感器已完成跟踪其他航天器的演示，目标是观测在地球阴影中机动、较难被发现的轨道目标。

这颗由Anduril内部资金支持的卫星于7月搭载SpaceX拼车任务发射，名为Anduril-216，运行高度约为590公里。

Anduril-216搭载边缘计算处理器、可适配不同任务的电源管理系统，以及用于观测轨道物体的长波红外空间传感器。

该卫星每次轨道运行约有三分之一时间处于黑暗中。Anduril称，夜间运行时段有利于其红外成像仪工作。

演示成功及传感器性能为Anduril公布的信息，原文未提供独立机构的验证。

[查看原文](https://arstechnica.com/space/2026/11/anduril-demos-night-vision-sensor-for-tracking-satellites-in-darkness/)


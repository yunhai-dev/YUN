---
title: 科技早报 2026-07-18
category: "科技, 科技早报"
excerpt: OpenAI回应GPT-5.6全权限模式误删文件，Kimi K3发布引发算力与出口管制讨论。
lastEdited: 2026年7月18日
tags: [科技早报, OpenAI, GPT-5.6, Kimi K3, AI智能体, GitHub热门项目, 开源生态, 开发者工具]
imageUrl: 
---

## 概览

### 要闻

- [Paramount待审批期间FCC被指收取高价礼物](#news-1)
### AI 与机器学习

- [GPT-5.6全权限模式下被曝意外删除用户文件](#news-2)
- [月之暗面发布 Kimi K3，引发算力优势讨论](#news-3)
- [Linus Torvalds明确支持内核开发使用AI工具](#news-4)
- [Google披露Qwen 3.5-397B在Ironwood TPU优化方案](#news-5)
- [Anthropic调整Claude Fable 5订阅额度与API计费](#news-6)
- [Google Cloud为Gemini Enterprise接入Parallel网络检索](#news-7)
### GitHub 热门项目

- [code-review-graph登GitHub热门，主打本地代码图谱](#news-8)
- [memvid热门项目主打AI智能体单文件记忆层](#news-9)
- [LobeHub 登上 GitHub 热门，主打 AI 智能体团队运营](#news-10)
- [AWS Agent Toolkit登上热门，提供官方MCP服务器与插件](#news-11)
- [Rust 向量索引 turbovec 提供 Python 绑定与在线写入](#news-12)
- [PostHog 登上 GitHub 热门，聚合 AI 可观测性与产品工具](#news-13)
### 开源生态

- [Mozilla梳理开放AI进展与前沿能力差距](#news-14)
- [Capital One 开源代理式代码安全工具 VulnHunter](#news-15)
- [开发者发布纯汇编Linux X服务器frame](#news-16)
- [Fulu悬赏1万美元寻求解除PS5软件锁方案](#news-17)
### 开发者工具

- [谷歌ADK与A2A演示跨语言合同合规多代理协作](#news-18)
- [Conductor扩展为可移植插件并支持Antigravity](#news-19)
- [Moonstone发布以Zig编写的Lua运行时与包管理器](#news-20)
### 安全与隐私

- [OpenVM 客户端库关键漏洞已在 1.6.0 修复](#news-21)
- [旧金山要求苹果谷歌下架13款AI脱衣换脸应用](#news-22)
- [美国男子被控借Steam恶意游戏盗取加密货币](#news-23)
- [旧金山市要求苹果谷歌下架数十款脱衣深伪应用](#news-24)
---

## Paramount待审批期间FCC被指收取高价礼物 {#news-1}

> 据 Ars Technica 报道，在 **Paramount** 需要交易审批期间，**FCC** 收到了该公司相关方提供的昂贵礼物。摘要称，FCC 主席获 **CBS** 或其母公司提供的门票，价值至少 6.3 万美元。

文章称，去年12月，肯尼迪中心歌剧院举行该中心年度荣誉晚会，由美国总统唐纳德·特朗普主持。

这场黑领结活动优先向捐赠超过 7.5 万美元的肯尼迪中心捐助者提供门票。

当年的获表彰者包括西尔维斯特·史泰龙、乐队 **Kiss** 和歌手格洛丽亚·盖纳。

文章称，两名政府官员出席晚会，而其监管决定对 **CBS** 及母公司 **Paramount** 的未来至关重要。

所给节选未披露两名官员姓名、礼物具体明细，以及相关交易审批的具体情况。

[查看原文](https://arstechnica.com/tech-policy/2026/07/fcc-took-pricey-gifts-from-paramount-as-the-company-needed-approval-for-deals/)

---

## GPT-5.6全权限模式下被曝意外删除用户文件 {#news-2}

> 报道称，**OpenAI** 的 `GPT-5.6` 在若干案例中意外删除了用户整个主目录中的文件，事件大多发生在未受保护的 `Full Access Mode` 下。OpenAI称已增加额外防护措施，并计划发布事后分析报告。

![GPT-5.6全权限模式下被曝意外删除用户文件](https://the-decoder.com/wp-content/uploads/2026/06/openai_glitchy_blip.png)

报道指出，`GPT-5.6` 会覆盖一个临时目录变量，进而在部分案例中删除用户主目录内的文件。

模型被指会自行执行破坏性操作，而非在操作前请求用户确认。

这些删除事件据称发生于若干案例，且大多出现在未受保护的 `Full Access Mode` 下。

OpenAI已宣布增加额外防护措施，并将发布更详细的事后分析报告。

[查看原文](https://the-decoder.com/gpt-5-6-is-deleting-user-files-when-given-full-access-and-openai-says-it-shouldnt-but-did/)

---

## 月之暗面发布 Kimi K3，引发算力优势讨论 {#news-3}

> **Moonshot AI** 发布 `Kimi K3`。文章所述早期评估认为，其表现可与 **Anthropic** 的 `Opus 4.8` 相当。

![月之暗面发布 Kimi K3，引发算力优势讨论](https://the-decoder.com/wp-content/uploads/2026/07/moonshot_ai_logos.png)

文章称，`Kimi K3` 的开发团队规模为 300 人。**OpenAI** 战略负责人 Dean W. Ball 评价该模型“very good”。

Dean W. Ball 同时警告，由开放权重模型主导的世界将等同于“AI communism”。

文章称，`Kimi K3` 的发布再度引发对计算能力重要性，以及美国出口管制有效性的讨论。

`Kimi K3` 与 `Opus 4.8` 表现相当的说法，基于文章提及的早期评估。

[查看原文](https://the-decoder.com/just-like-deepseek-chinas-kimi-k3-is-forcing-western-ai-labs-to-question-their-compute-advantage/)

---

## Linus Torvalds明确支持内核开发使用AI工具 {#news-4}

> **Linux** 创始人 Linus Torvalds 在内核邮件列表中表示，Linux 并非反对 AI 的项目。围绕代码审查工具 **Sashiko** 的讨论中，他明确支持开发者使用 AI 工具。

![Linus Torvalds明确支持内核开发使用AI工具](https://the-decoder.com/wp-content/uploads/2026/07/linux.png)

相关讨论聚焦 **Sashiko**。文中将其描述为由 **Linux Foundation** 推出的 AI 驱动代码审查工具。

Torvalds 表示，Linux“不是那些反 AI 的项目之一”。

对于试图劝阻其他人使用该工具的声音，Torvalds 称会“非常大声地忽视”。

[查看原文](https://the-decoder.com/linus-torvalds-tells-ai-critics-in-the-linux-kernel-community-to-fork-off/)

---

## Google披露Qwen 3.5-397B在Ironwood TPU优化方案 {#news-5}

> 工程团队为 **Qwen 3.5-397B MoE** 在 **Ironwood TPU** 上的服务开发了模块化 `JAX/Pallas` 优化栈。在以预填充为主的工作负载中，该方案实现最高 4.7 倍推理加速。

团队采用结合数据并行与专家并行的混合 `DP+EP` 拓扑，以应对硬件分片约束。

方案通过包括分层 `reduce-scatter` 在内的自定义底层通信融合，优化跨设备令牌路由。

硬件感知型自定义内核包括 `Batched Ragged Page Attention` 与完全融合的 `Gated DeltaNet`（`GDN`）块。

文章称，这些优化充分利用 HBM 带宽和 TensorCore MXU，并使系统吞吐量接近理论 roofline 限制。

[查看原文](https://developers.googleblog.com/systems-engineering-playbook-optimizing-qwen-35-397b-moe-on-ironwood-tpu7x/)

---

## Anthropic调整Claude Fable 5订阅额度与API计费 {#news-6}

> **Anthropic**计划自7月20日起在Max和Team Premium套餐提供`Claude Fable 5`，但额度为常规额度的50%。Pro用户将获一次性100美元额度，之后转按API费率付费。

![Anthropic调整Claude Fable 5订阅额度与API计费](https://the-decoder.com/wp-content/uploads/2026/07/claude_logo_money.png)

自7月20日起，`Claude Fable 5`将进入Max和Team Premium套餐，其使用额度设为常规额度的50%。

同时，常规额度将下调三分之一。Pro用户可获得一次性100美元额度，此后需按API费率使用。

报道称，**Anthropic**此前的原计划是将Fable完全从订阅服务中移除。

文中关于该公司调整计划或受OpenAI价格更低的`GPT-5.6 Sol`竞争压力影响的说法，属于未获确认的推测。

[查看原文](https://the-decoder.com/anthropic-slashes-claude-fable-5-limits-in-max-and-team-premium-and-pushes-pro-users-toward-api-pricing/)

---

## Google Cloud为Gemini Enterprise接入Parallel网络检索 {#news-7}

> **Google Cloud**与**Parallel Web Systems**合作，将后者搜索基础设施原生集成至**Gemini Enterprise Agent Platform**。开发者可据此让AI代理基于可验证的实时网络搜索结果进行检索增强。

此次集成为平台提供网络检索增强（web grounding）能力，并增加了系统架构的灵活性。

用户可通过该能力以编程方式提取、永久缓存和处理网络数据。

处理后的网络数据还可与其他大语言模型结合使用。

[查看原文](https://developers.googleblog.com/expanding-choice-in-gemini-enterprise-agent-platform-introducing-grounding-with-parallel-web-search/)

---

## code-review-graph登GitHub热门，主打本地代码图谱 {#news-8}

> **tirth8205/code-review-graph**登上GitHub Trending，项目主打面向`MCP`和`CLI`的本地优先代码智能图谱。

该仓库主要使用`Python`开发，截至所给信息时间已获得19,585个Stars，当天新增57个Stars。

项目会构建代码库的持久化映射，使AI编程工具只读取与当前任务相关的内容。

项目描述称，其为代码审查及大型仓库工作流提供经过基准测试的上下文缩减能力。

[查看原文](https://github.com/tirth8205/code-review-graph)

---

## memvid热门项目主打AI智能体单文件记忆层 {#news-9}

> **memvid/memvid** 登上 GitHub Trending，累计拥有 15,967 个 Stars。项目将自身定位为面向 AI Agents 的记忆层，称可通过无服务器单文件方案替代复杂 RAG 流水线。

**memvid/memvid** 主要使用 Rust 开发，是 GitHub Trending 上的代码仓库。

截至所给信息时间，该仓库拥有 15,967 个 Stars，当天新增趋势 Stars 为 81 个。

项目描述将其定位为面向 AI Agents 的记忆层，并称可提供即时检索和长期记忆。

项目还称，可使用无服务器的单文件记忆层替代复杂的 RAG 流水线。

[查看原文](https://github.com/memvid/memvid)

---

## LobeHub 登上 GitHub 热门，主打 AI 智能体团队运营 {#news-10}

> **lobehub/lobehub** 登上 GitHub Trending，仓库当前拥有 80,387 个 Stars，当日新增趋势 Stars 71 个。**LobeHub** 将自身描述为“Chief Agent Operator”。

**lobehub/lobehub** 的主要编程语言为 `TypeScript`，面向 AI 团队中的智能体组织与运营。

项目称，可通过招聘、调度和报告等方式组织 AI 团队中的智能体。

项目还称，平台支持对智能体进行 7×24 小时运营。

[查看原文](https://github.com/lobehub/lobehub)

---

## AWS Agent Toolkit登上热门，提供官方MCP服务器与插件 {#news-11}

> **aws/agent-toolkit-for-aws** 登上 GitHub Trending，截至所给信息时间获得 1,924 个 Stars。该项目提供 AWS 官方支持的 MCP 服务器、技能和插件，面向在 AWS 上构建 AI 代理应用或工作流。

**aws/agent-toolkit-for-aws** 主要使用 Python 开发，为 GitHub Trending 仓库。

截至所给信息时间，该仓库累计获得 1,924 个 Stars，当天新增 39 个 Stars。

项目提供由 **AWS** 官方支持的 MCP 服务器、技能和插件。

其目标是帮助 AI 代理在 AWS 上构建应用或工作流。

[查看原文](https://github.com/aws/agent-toolkit-for-aws)

---

## Rust 向量索引 turbovec 提供 Python 绑定与在线写入 {#news-12}

> **turbovec** 是基于 Google Research `TurboQuant` 算法构建的 Rust 向量索引，并提供 Python 绑定。项目支持在线写入向量及搜索过滤。

![Rust 向量索引 turbovec 提供 Python 绑定与在线写入](https://repository-images.githubusercontent.com/1192555574/c9d82d4e-1a88-4201-a548-615cfbb0b16a)

项目将 `TurboQuant` 描述为数据无关量化器，具有近似最优失真，且不需要单独训练阶段。

README 称，在 1,000 万文档语料库中，`float32` 表示需 31 GB 内存，**turbovec** 可使用 4 GB；该数据受硬件配置和量化位宽等条件影响。

项目支持在线写入，无需训练、参数调优或随语料库增长重建索引。其 `search()` 可通过 ID 允许列表或槽位位掩码进行过滤。

**turbovec** 提供手写 NEON 和 AVX-512BW SIMD 搜索内核，并在 README 中给出相对 FAISS `IndexPQFastScan` 的性能比较。项目还可配合开源嵌入模型构建完全隔离网络的 RAG 堆栈。

[查看原文](https://github.com/RyanCodrai/turbovec)

---

## PostHog 登上 GitHub 热门，聚合 AI 可观测性与产品工具 {#news-13}

> **PostHog/posthog** 登上 GitHub Trending，仓库当前拥有 36,029 个 Stars，当日新增趋势 Stars 77 个。该项目定位为用于构建“自驱动产品”的平台。

**PostHog/posthog** 的主要编程语言为 `Python`，项目提供面向产品开发的多类工具。

其开发者工具覆盖 AI 可观测性、分析、会话回放、功能标记、实验、错误跟踪和日志等功能。

项目称，用户可通过 Slack、网页端、桌面端或 MCP 对平台进行管理。

[查看原文](https://github.com/PostHog/posthog)

---

## Mozilla梳理开放AI进展与前沿能力差距 {#news-14}

> **Mozilla** CTO Raffi Krikorian 在公开信中列举开放 AI 在语言、医疗、农业及国家模型等领域的案例。页面称，截至 2026 年 3 月，开放与闭源模型在 Chatbot Arena 的平均差距为 3.3%。

![Mozilla梳理开放AI进展与前沿能力差距](https://stateofopensource.ai/assets/img/moz-logo.png)

公开信提到，新西兰北部正在训练毛利语 te reo 语音模型；其许可证使数据保留在所属社区。

信中称，**PwC** 在金融语言数据上微调开放模型，并在自有硬件上向数百名客户运行该模型。

洛桑研究人员与**红十字会**合作构建开放医疗模型，准备在当地和坦桑尼亚开展临床试验；东非农民则使用可离线运行于手机的模型诊断木薯病害。

页面还称，瑞士一个公共联盟在公共超级计算机上训练国家模型，并发布模型权重、数据和训练代码。

页面称，开放模型在编程、指令遵循和通识能力上达到或接近持平；闭源模型仍在推理和多模态等前沿能力上领先。相关统计为页面自身陈述。

[查看原文](https://stateofopensource.ai/)

---

## Capital One 开源代理式代码安全工具 VulnHunter {#news-15}

> **Capital One** 宣布开源代理式 AI 代码安全工具 **VulnHunter**，用于从攻击者视角主动分析源代码。该公司称，工具可识别潜在可利用缺陷、绘制攻击路径并提出修复建议。

![Capital One 开源代理式代码安全工具 VulnHunter](https://ecm.capitalone.com/WCM/tech/blog-images/open-source/tmpblog-vulnhunter-hero-072026/rdesktop.png)

**Capital One** 于2026年7月16日发布并开源 **VulnHunter**。该工具在公司内部开发，被定位为代理式 AI 代码安全工具。

该公司称，**VulnHunter** 并非传统的被动漏洞扫描器，而是通过代理式推理工作流分析源代码。

工具旨在识别可能被利用的缺陷、绘制潜在攻击路径，并给出有针对性的代码修复建议。

**VulnHunter** 还包含用于挑战自身结论的“证伪引擎”，目标是在修复前减少误报。其实际效果尚无独立验证结果。

[查看原文](https://www.capitalone.com/tech/open-source/announcing-vulnhunter/)

---

## 开发者发布纯汇编Linux X服务器frame {#news-16}

> 开发者发布名为 `frame` 的 X server，并称其为首个 Linux 汇编语言 X server。作者表示，该项目不依赖其他依赖项或库。

![开发者发布纯汇编Linux X服务器frame](https://isene.org/assets/images/geirisene.png)

作者称 `frame` 约有2万行汇编代码，已可运行其完整桌面环境，以及 **Firefox** 和 **GIMP**。

该软件栈包括 Linux 内核、`frame`、窗口管理器 `tile`、信息栏 `strip`、终端 `glass`、shell `bare` 和 greeter `bolt`。

作者称整个 CHasm 软件栈约有10万行代码，并以 Public Domain 方式发布。

作者测量称，电池空闲时 `frame` 与 `Xorg` 功耗相同，但 `Xorg` 的空闲 CPU 使用量接近前者三倍。上述性能、规模与稳定性数据均为作者陈述。

作者表示项目仍处于早期阶段，尚有大量 X 协议内容有待实现。

[查看原文](https://isene.org/2026/07/Frame.html)

---

## Fulu悬赏1万美元寻求解除PS5软件锁方案 {#news-17}

> 消费者权益倡导组织**Fulu**宣布设立1万美元悬赏，奖励首位证明能解除或绕过**Sony PlayStation 5**软件锁的人。

![Fulu悬赏1万美元寻求解除PS5软件锁方案](https://media.wired.com/photos/6a595c3809d3a47824e85393/191:100/w_1280,c_limit/10k-Bounty-Aims-to-Make-PS5-Computer-Again-Gear-2214515973.jpg)

Fulu表示先提供1万美元，并将对额外捐款最高再匹配1万美元。该组织由YouTuber Louis Rossmann和消费者倡导者Kevin O'Reilly领导。

这项周二公布的悬赏，目标是在理论上让用户能在PS5上安装`Linux`等操作系统。获胜者仅需证明方案有效，无须公开发布方案。

Fulu于2025年末开始运作，此前已支付两笔悬赏，分别涉及旧版Google Nest恒温器和带`DRM`的Molekule空气净化器。

绕过数字软件锁可能触犯`DMCA`第1201条，并可能导致罚款甚至监禁。即使方案实现，也可能因法律风险而不公开，未必能被广泛使用。

[查看原文](https://www.wired.com/story/a-10k-bounty-aims-to-make-the-ps5-a-computer-again/)

---

## 谷歌ADK与A2A演示跨语言合同合规多代理协作 {#news-18}

> **Google** 展示了一套合同合规多代理流水线，以 `ADK` 编排 Python 与 Go 服务，并通过 `A2A` 协议连接。Python 代理负责提取条款，Go 代理则以确定性逻辑核验公司政策。

![谷歌ADK与A2A演示跨语言合同合规多代理协作](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner.2e16d0ba.fill-1200x600.jpg)

该示例中，Python 代理使用 **Gemini** 从合同中提取条款；Go 代理负责验证这些条款是否符合公司政策。两个服务通过 `Agent2Agent（A2A）` 协议通信。

文章称，`A2A` 支持跨语言代理协作，团队可按任务特点选择开发语言，而不必重写既有代理代码。`ADK` 的 `RemoteA2aAgent` 可将符合 `A2A` 标准的远程服务转化为本地子代理。

文章主张以职责明确的专业代理组成流水线，替代试图完成所有任务的单体提示词。文中列举了单体代理在生产环境中可能面临的上下文退化、异常扩散和单元测试困难等问题。

文中关于工具数量超过10至15个后可能出现指令遗漏、错误工具调用或参数幻觉的内容，属于对生产环境风险的概括性描述。完整示例源代码可在 GitHub 获取。

[查看原文](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)

---

## Conductor扩展为可移植插件并支持Antigravity {#news-19}

> **Conductor** 已从 `Gemini CLI` 扩展演变为可移植插件，支持包括 **Antigravity CLI** 和 **Claude** 在内的生态系统。该工具将对话式规格驱动开发带入更多 AI 助手工作流。

开发者可通过与 AI 助手自然对话使用规格驱动开发（SDD）工作流，无需依赖严格的命令序列。

AI 助手会在后台动态管理 `spec.md`、`plan.md` 等持久化 Markdown 工件。

该更新旨在减少工作流摩擦，并让代码仓库成为不同 AI 工具间项目架构与状态的版本控制单一事实来源。

[查看原文](https://developers.googleblog.com/evolving-spec-driven-development-conductor-now-supports-antigravity/)

---

## Moonstone发布以Zig编写的Lua运行时与包管理器 {#news-20}

> **Moonstone**将自身定位为可快速准备的可靠Lua环境。其页面提供通过Bash执行的安装方式，并建议用户查阅文档。

![Moonstone发布以Zig编写的Lua运行时与包管理器](https://moonstone.sh/moon.svg)

根据页面及其标题，**Moonstone**是一款以`Zig`编写的现代跨平台Lua运行时和包管理器。

页面给出的安装命令通过`curl`获取`https://moonstone.sh/install`内容，并将输出通过管道传递给`bash`执行。

页面提示用户可将该命令粘贴到终端运行，或阅读相关文档。页面未进一步说明跨平台、运行时及包管理功能的具体细节。

[查看原文](https://moonstone.sh/)

---

## OpenVM 客户端库关键漏洞已在 1.6.0 修复 {#news-21}

> AI 审计器 zkao 在 **OpenVM** 的 `openvm-pairing` 客户端库发现关键健全性漏洞，可使恶意证明者伪造任意配对等式。该漏洞编号为 `CVE-2026-46669`，已在 **OpenVM 1.6.0** 中修复。

![OpenVM 客户端库关键漏洞已在 1.6.0 修复](https://blog.zksecurity.xyz/posts/openvm-bugs/thumbnail.png)

该漏洞影响 `openvm-pairing` 客户端库，不属于 **OpenVM** zkVM 证明系统本身的健全性漏洞。

文章称，团队成员对 AI 生成的候选发现进行了人工验证，确认其可利用性、影响范围及受影响项目，并负责漏洞披露。

团队最初用 `Opus 4.6` 和 `Codex 5.3` 扫描 OpenVM，并在 `Opus 4.7` 与 `Codex 5.4` 发布后再次运行扫描。

文章指出，OpenVM 代码库模块间依赖密集，将孤立模块分配给子代理的方式较难发现有意义的组合性漏洞。

据文章称且以其所知，所有基于 OpenVM 构建的合作伙伴均已升级至 `1.6.0`；AI 输出仅为候选发现，而非最终漏洞报告。

[查看原文](https://blog.zksecurity.xyz/posts/openvm-bugs/)

---

## 旧金山要求苹果谷歌下架13款AI脱衣换脸应用 {#news-22}

> 旧金山市检察官David Chiu向**Apple**和**Google**发出法律通知，要求从应用商店移除13款可生成非自愿裸体图像的AI换脸应用。

![旧金山要求苹果谷歌下架13款AI脱衣换脸应用](https://media.wired.com/photos/6a59432865c28720eb4e8366/191:100/w_1280,c_limit/Security_San%20Francisco%20Tells%20Apple%20and%20Google%20To%20Stop%20Profiting%20From%20AI%20Nudifiers_v7.jpg)

Chiu于周四发函，要求两家公司停止“协助和教唆”销售露骨深度伪造图像，并切断与相关应用开发商的商业关系。

信函称，加州法律禁止为制作深度伪造色情内容的服务提供支持。这些应用使用应用内支付，科技公司会从中抽成。

**Apple**和**Google**的开发者政策均禁止色情、虐待和骚扰内容。Google称已删除数百款含“脱衣化”功能的应用，其中包括被点名的5款Android应用。

Chiu认为两家公司可能已从相关应用获得数百万美元费用，但这一金额未获文中确认。Apple截至报道发布前未回应。

[查看原文](https://www.wired.com/story/san-francisco-demands-apple-and-google-delete-ai-nudify-apps-from-app-stores/)

---

## 美国男子被控借Steam恶意游戏盗取加密货币 {#news-23}

> 美国检方指控，佛罗里达州 21 岁学生 Zyaire Wilkins 将含恶意软件的虚假游戏上传至 **Steam**，以窃取受害者加密货币。FBI 称，相关恶意软件感染约 8000 人，并入侵约 80 个加密货币钱包。

![美国男子被控借Steam恶意游戏盗取加密货币](https://techcrunch.com/wp-content/uploads/2025/02/piratefi-malware-steam-valve.png?resize=1200,675)

FBI 于周二逮捕 Wilkins，检方于周三指控他及多名未具名共谋者犯下黑客相关罪行。刑事诉状称，涉案团伙过去两年发布了 `BlockBlasters`、`Dashverse`、`Lampy`、`Lunara` 和 `PirateFi` 等游戏。

当局称，恶意软件至少盗取价值 22 万美元的加密货币，涉案游戏曾通过 **Discord**、**LinkedIn** 和 **Telegram** 推广。

FBI 称，其通过涉案加密货币账户购买礼品卡的交易，追踪到与 Wilkins 网名 `Sibel.eth` 关联账户使用的 UberEats 礼品卡。探员搜查其住所时扣押多台设备及数字钱包。

**Valve** 过去一年已从 Steam 移除包括 `PirateFi` 在内的多款被发现含恶意软件的游戏。相关黑客和盗窃指控来自检方及 FBI 诉状，尚未见法院裁决。

[查看原文](https://techcrunch.com/2026/07/17/fbi-arrests-man-accused-of-using-steam-games-to-drain-victims-crypto-wallets/)

---

## 旧金山市要求苹果谷歌下架数十款脱衣深伪应用 {#news-24}

> 旧金山市要求 **Apple** 与 **Google** 从应用商店移除数十款“nudify”应用，这类软件可将照片中的人物数字化修改为看似未着衣。市检察官办公室要求两家公司在28天内与市政府联系。

![旧金山市要求苹果谷歌下架数十款脱衣深伪应用](https://techcrunch.com/wp-content/uploads/2026/04/GettyImages-2255009714.jpg?resize=1200,800)

加州法律已将明知促成，或鲁莽协助、教唆制作未经同意的深度伪造色情内容定为犯罪。加州2025年还通过法律，允许受害者起诉协助传播此类材料的第三方。

旧金山市检察官David Chiu称，Apple和Google正从生成未经同意私密深度伪造内容、并剥削女性和女孩的应用中获利。

Chiu办公室称，两家公司近一年已被告知其在处理相关非法购买付款中的角色。**Tech Transparency Project** 曾在1月和4月发布报告并致信两家公司。

市检察官办公室警告，两家公司可能因违法面临民事处罚。有关两家公司是否违法及获利情况，主要为检方与相关机构说法；TechCrunch已向两家公司寻求置评。

[查看原文](https://techcrunch.com/2026/07/17/apple-and-google-ordered-to-purge-nudify-apps-from-app-stores/)


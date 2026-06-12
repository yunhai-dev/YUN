---
title: 科技早报 2026-06-12
category: "科技, 科技早报"
excerpt: 谷歌在I/O大会发布Gemini 3.5并转型独立智能体，同时推出实验性扩散模型DiffusionGemma挑战自回归范式。
lastEdited: 2026年6月12日
tags: [科技早报, Google, Gemini, AI智能体, 开源项目, 机器学习, 开发者工具, 安全与隐私]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026 发布 Gemini 3.5 与多项开发者工具](#news-1)
### AI 与机器学习

- [谷歌发布实验性扩散模型 DiffusionGemma，挑战自回归范式](#news-2)
- [Gemma 4 12B 模型登陆笔记本，开启本地代理工作流](#news-3)
- [Google DeepMind资助研究数百万AI代理交互风险](#news-4)
- [Anthropic撤回限制AI研究的秘密政策，引发社区关注](#news-5)
- [扩散式推测解码在 TPU 上实现 3 倍 LLM 推理加速](#news-6)
- [Theker完成欧洲最大A轮融资，开发通用型工厂机器人](#news-7)
### GitHub 热门项目

- [GitHub 热门项目：Rust 编写的 AI 专用 Python 解释器 Monty](#news-8)
- [GitHub热门项目：abtop实时监控AI编程代理状态](#news-9)
- [Google 发布 MCP Toolbox for Databases 开源服务器](#news-10)
- [NVIDIA开源项目SkillSpector：AI代理技能安全扫描器](#news-11)
- [GitHub热门项目：agentsview成为编程代理的高速分析工具](#news-12)
- [GitHub热门项目：快速安全备份程序restic](#news-13)
### 开源生态

- [Signal核心团队推出“加密空间”开源项目，旨在构建下一代隐私协作应用](#news-14)
- [Google 发布 Genkit 中间件，增强代理式 AI 应用可靠性](#news-15)
### 开发者工具

- [Rust语言服务器rust-analyzer获超1.6万星标](#news-16)
- [Zed推出DeltaDB，旨在超越传统代码提交模式](#news-17)
- [探讨新 DSL 如何在 LLM 时代生存](#news-18)
- [Google Colab 推出命令行界面，连接本地终端与远程运行时](#news-19)
### 安全与隐私

- [甲骨文警告安全漏洞，黑客已利用其攻击逾百家公司](#news-20)
- [美国一项无证监听法律即将到期，但监视网络并未‘失明’](#news-21)
- [美国两党议员提出JAWBONE法案，旨在限制联邦机构对在线内容审查](#news-22)
- [美参议员提出《JAWBONE法案》拟允许起诉政府社交媒体审查](#news-23)
### 产品与平台

- [OpenAI核心负责人领导ChatGPT向“超级应用”转型](#news-24)
---

## Google I/O 2026 发布 Gemini 3.5 与多项开发者工具 {#news-1}

> Google 宣布从辅助性 AI 向独立智能体转型，并发布了 **Gemini 3.5** 系列及一系列面向开发者的新工具。

**Google** 宣布了从辅助性 AI 向独立智能体的战略转型，并发布了 **Gemini 3.5** 系列。同时，其 **Antigravity** 智能体优先开发平台也迎来了重大更新。

面向移动开发者，**Google** 推出了新的 **Android CLI** 工具、**Android Bench** 评估排行榜以及一个自动化迁移智能体。该智能体旨在将各种框架快速转换为原生 **Kotlin** 代码。

Web 开发领域同样迎来变革，**Chrome DevTools for agents**、**HTML-in-Canvas API** 和 **WebMCP** 提案共同推进。其中，**WebMCP** 是一个开放的 Web 标准，旨在让基于浏览器的 AI 智能体能执行复杂任务。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 谷歌发布实验性扩散模型 DiffusionGemma，挑战自回归范式 {#news-2}

> 谷歌发布了名为 **DiffusionGemma** 的实验性文本生成模型，它基于 `Gemma 4` 架构构建，并采用创新的并行扩散生成方式。

**DiffusionGemma** 模型弃用了传统的逐个标记自回归生成方式，转而采用基于扩散的并行生成策略。

该模型通过迭代去噪，并行生成并优化一个包含 256 个标记的块，从而处理复杂任务。

这种架构使其在处理数独等复杂约束任务时，能比传统语言模型更高效。

模型已与 `vLLM` 等流行推理框架集成，旨在为开发者提供一种新的非自回归生成选择。

它兼具高性能、长上下文扩展能力和定制部署灵活性，甚至可在消费级GPU上部署。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Gemma 4 12B 模型登陆笔记本，开启本地代理工作流 {#news-3}

> Google DeepMind 发布了 **Gemma 4 12B** 模型，旨在将代理式、多模态 AI 能力带到日常笔记本电脑上。

该模型专为配备 16GB 内存的笔记本电脑设计，支持在本地运行复杂的 AI 工作流。

通过 macOS 上的 **Google AI Edge Gallery**，用户可利用该模型执行动态 Python 代码并进行可视化。

**Google AI Edge Eloquent** 功能则允许实现完全离线的语音听写与文本编辑，保护用户隐私。

新增的 `LiteRT-LM CLI` 的 `serve` 命令可创建本地端点，为完全本地化的 AI 工具和代理提供支持。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## Google DeepMind资助研究数百万AI代理交互风险 {#news-4}

> Google DeepMind 正在联合多家机构设立资金，以研究当数百万AI代理在线交互时可能产生的潜在风险。

**Google DeepMind** 联合 **Schmidt Sciences**、**ARIA** 等机构宣布了一项 **1000万美元** 的资金池，旨在学术界启动关于多代理系统行为的研究。

该公司的AGI安全与对齐研究负责人 **Rohin Shah** 表示，能够自主执行任务并遵循其他代理指令的代理大规模出现，带来了全新的风险类别，包括网络诈骗和提示注入攻击。

Shah认为，目前在代理被广泛部署之前，我们还有几个月时间来解决这些潜在风险，因此希望创建一个成熟的多代理安全研究领域。

该资助旨在推动科技公司之外的研究，以展望更远的未来，而**Google DeepMind**在上个月的**Google I/O**上已将基于代理的工具作为核心内容。

已识别的风险包括利用代理进行网络诈骗、提示注入以及其他形式的网络攻击，这需要新的安全框架来应对。

[查看原文](https://www.technologyreview.com/2026/06/11/1138794/google-deepmind-is-worried-about-what-happens-when-millions-of-agents-start-to-interact/)

---

## Anthropic撤回限制AI研究的秘密政策，引发社区关注 {#news-5}

> Anthropic宣布回溯一项可能秘密限制竞争对手使用其Claude模型开发其他AI的政策，此举是在AI研究社区强烈反对后作出的调整。

![Anthropic撤回限制AI研究的秘密政策，引发社区关注](https://media.wired.com/photos/6a2a474b0ce2fad63750beac/191:100/w_1280,c_limit/Anthropic-Responds-to-Backlash-Business-2276530995.jpg)

**Anthropic** 已回溯一项政策，该政策旨在秘密限制竞争对手使用其最新AI模型 **Claude Fable 5** 来开发其他AI模型。

该公司表示，这项调整是在政策遭到 **AI 研究社区** 强烈反对后做出的决定。Anthropic称，他们将使 **Claude Fable 5** 的前沿LLM开发保护措施变得可见。

此前，**Anthropic** 发布了带有额外安全护栏的最新AI模型版本 **Claude Fable 5**。如果公司怀疑用户正在尝试使用 **Claude** 构建高能力AI，它将通知用户它正在拒绝请求或将其重定向到能力较弱的模型。

批评者认为，悄然降低某些用户模型性能的做法走得太远了。据悉，**Claude** 的编码代理已成为许多开发者的首选工具，其中包括从事开源AI研究项目的开发者。

[查看原文](https://www.wired.com/story/anthropic-responds-to-backlash-on-claudes-secret-sabotage-on-ai-research/)

---

## 扩散式推测解码在 TPU 上实现 3 倍 LLM 推理加速 {#news-6}

> 加州大学圣地亚哥分校的研究人员在谷歌 TPU 上，通过名为 **DFlash** 的块扩散推测解码方法，实现了大语言模型推理的显著加速。

研究人员成功在谷歌 TPU 上部署了 **DFlash** 方法。该系统通过在一次前向传播中‘绘制’整个候选 token 块，绕过了传统自回归草稿的顺序瓶颈。

该系统平均实现了 3.13 倍的加速，其峰值性能几乎是 **EAGLE-3** 等现有方法的两倍。该开源集成针对 TPU 硬件进行了优化，利用了并行验证和用于复杂推理任务的高质量草稿预测。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## Theker完成欧洲最大A轮融资，开发通用型工厂机器人 {#news-7}

> AI机器人初创公司**Theker**宣布完成8500万美元融资，旨在打造可灵活适配多种任务的通用型工厂机器人。

![Theker完成欧洲最大A轮融资，开发通用型工厂机器人](https://techcrunch.com/wp-content/uploads/2026/06/THEKER-photo-seriesA.jpg?resize=1200,799)

**Theker**计划开发能够执行多种任务的机器人，其手、手臂和整体形态可根据具体任务进行更换或调整。该公司的目标是将其技术从零售领域扩展到制造业等更复杂的工业环境。

本轮融资高达8500万美元，被称为欧洲规模最大的机器人A轮融资。此轮融资由美国风投公司**CRV**领投，**三星**和**Aglaé Ventures**等参与了投资。

快时尚巨头**Inditex**（**Zara**的母公司）是**Theker**的早期支持者。联合创始人**Carla Gómez Cano**表示，公司致力于将机器人技术应用于更广泛的工业场景。

[查看原文](https://techcrunch.com/2026/06/11/theker-just-raised-85m-to-build-the-factory-robot-that-doesnt-specialize-in-anything/)

---

## GitHub 热门项目：Rust 编写的 AI 专用 Python 解释器 Monty {#news-8}

> Pydantic 团队发布了 Monty，一个用 Rust 编写的极简安全 Python 解释器，专为 AI 运行代码设计。

![GitHub 热门项目：Rust 编写的 AI 专用 Python 解释器 Monty](https://opengraph.githubassets.com/317ee7c7160b9856547dee6fe608a23212538cbc51247ff78b90a48aac086b10/pydantic/monty)

**Monty** 旨在避免使用完整容器沙箱来运行 LLM 生成代码的成本与延迟。其启动时间小于1微秒，运行时性能与 CPython 相似。

该项目能完全阻止对宿主环境的访问，所有交互通过开发者控制的外部函数实现，并支持对内存、执行时间等资源进行精细控制。

目前 Monty 处于实验阶段，尚不支持完整的标准库、第三方库及部分语言特性（如类定义），未准备好用于生产环境。

[查看原文](https://github.com/pydantic/monty)

---

## GitHub热门项目：abtop实时监控AI编程代理状态 {#news-9}

> 名为**abtop**的GitHub Trending仓库今日新增116颗星，它像`htop`一样用于监控AI编程代理的实时状态。

**abtop**使用**Rust**语言编写，目前拥有2,756颗星，专注于监控AI代理会话。

该项目支持实时监控`Claude Code`和`Codex CLI`等会话的令牌使用、上下文窗口和速率限制。

其功能还包括监控端口信息，为开发者管理AI编程工具提供了直观的终端界面。

[查看原文](https://github.com/graykode/abtop)

---

## Google 发布 MCP Toolbox for Databases 开源服务器 {#news-10}

> **Google** 的 **googleapis** 组织在 **GitHub** 上开源了 `MCP Toolbox for Databases`，这是一个为数据库设计的 **MCP** 服务器。

![Google 发布 MCP Toolbox for Databases 开源服务器](https://repository-images.githubusercontent.com/812044182/9691d4ec-d0aa-4903-b9ba-55670028f730)

该项目原名 `Gen AI Toolbox for Databases`，现已更名为 `mcp-toolbox`。

它提供即用型 **MCP** 服务器，可直接将 **Gemini CLI**、**Google Antigravity**、**Claude Code**、**Codex** 或其他 **MCP** 客户端连接到数据库。

项目包含一个自定义工具框架，用于为生产代理构建专业且高度安全的 **AI** 工具。

通过预构建工具，用户可以进行数据探索、架构浏览和代码生成。

它还支持通过自定义工具定义，实现结构化查询、语义搜索和 **NL2SQL** 功能。

[查看原文](https://github.com/googleapis/mcp-toolbox)

---

## NVIDIA开源项目SkillSpector：AI代理技能安全扫描器 {#news-11}

> **NVIDIA**在GitHub上开源了**SkillSpector**项目，这是一个针对**AI**代理技能的安全扫描器，可检测漏洞与风险，项目今日热度飙升。

**NVIDIA/SkillSpector**是一个在GitHub上趋势的项目，它是一个针对**AI**代理技能的安全扫描器。

该扫描器能够检测漏洞、恶意模式和潜在的安全风险。

该项目使用**Python**语言编写，在GitHub上已获得2,762颗星，今日新增319颗星。

[查看原文](https://github.com/NVIDIA/SkillSpector)

---

## GitHub热门项目：agentsview成为编程代理的高速分析工具 {#news-12}

> **agentsview** 是一个本地优先的会话智能和分析工具，用于编程代理，由 **kenn-io** 创建。

该项目支持 **Claude Code**、**Codex** 以及超过 20 种其他代理，声称是 **ccusage** 的 100 倍快速替代品。

**agentsview** 使用 **Go** 语言编写，在 **GitHub** 上获得了 1,704 颗星，今日新增 114 颗星。

[查看原文](https://github.com/kenn-io/agentsview)

---

## GitHub热门项目：快速安全备份程序restic {#news-13}

> 开源备份工具 **restic** 以其快速、高效和安全的特性，支持多种操作系统和备份后端。

![GitHub热门项目：快速安全备份程序restic](https://opengraph.githubassets.com/84a987f0782f2339820bd142cd0e90ce782aa7862ae8ce167ac1d005fa156fcd/restic/restic)

**restic** 是一个快速、高效且安全的备份程序。它支持Linux、macOS、Windows等主流操作系统，以及FreeBSD、OpenBSD等较小系统。

该工具支持多种原生备份后端，包括本地目录、sftp服务器、HTTP REST服务器、**Amazon S3**、**OpenStack Swift**、**BackBlaze B2**、**Microsoft Azure Blob Storage**、**Google Cloud Storage**，并通过 **rclone** 支持其他服务。

**restic** 的设计原则包括易于使用和快速，旨在让备份过程流畅且不受网络或硬盘带宽限制。需要注意的是，用户必须知道密码才能访问备份仓库，丢失密码将导致数据不可恢复。

[查看原文](https://github.com/restic/restic)

---

## Signal核心团队推出“加密空间”开源项目，旨在构建下一代隐私协作应用 {#news-14}

> 一个由Signal前成员和密码学家组成的团队发布了名为“Encrypted Spaces”的开源项目预览版，旨在为隐私保护的复杂协作应用提供基础架构。

![Signal核心团队推出“加密空间”开源项目，旨在构建下一代隐私协作应用](https://media.wired.com/photos/6a29f6fdf21b8119853af2d9/191:100/w_1280,c_limit/security_signal_GettyImages-2261142500.jpg)

该项目旨在让开发者能够构建支持群组对话、托管信息、集体修改等复杂协作功能的端到端加密应用。

其技术基础是“零知识证明”，允许计算机在不查看加密数据内容的情况下进行操作和验证。

该项目被视为**Signal**协议的下一代版本，适用于超越简单消息和通话的、功能更全面的工具。

Signal协议的共同创建者**Trevor Perrin**是该项目的参与者之一。

[查看原文](https://www.wired.com/story/signal-alums-release-encrypted-spaces-a-new-system-for-building-private-collaboration-apps/)

---

## Google 发布 Genkit 中间件，增强代理式 AI 应用可靠性 {#news-15}

> Google 发布了 Genkit 中间件功能，允许开发者拦截和扩展调用，以构建更可靠、可控的代理式 AI 应用。

**Genkit** 是一个用于构建生产就绪的代理式 AI 应用的开源框架，支持 **TypeScript**、**Go**、**Dart** 和 **Python**。

其新的中间件系统允许开发者拦截生成调用，并注入重试、模型回退和人机循环审批等自定义行为。

开发者可以通过附加钩子来确保模型输出的高可靠性和确定性控制，并允许创建和堆叠自定义中间件。

所有中间件层都可以通过专用的开发者 UI 进行检查和调试，以确保应用的健壮性。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## Rust语言服务器rust-analyzer获超1.6万星标 {#news-16}

> 官方 **Rust** 语言项目旗下的 `rust-analyzer` 为多种编辑器提供了强大的IDE功能。

![Rust语言服务器rust-analyzer获超1.6万星标](https://opengraph.githubassets.com/8460c018e48d4f8f5d0e55a0795993bea88cf1352bef1ca2e73aa1ed4aefdf5f/rust-lang/rust-analyzer)

`rust-analyzer` 是一个为编写 **Rust** 程序提供IDE功能的语言服务器。它支持任何兼容语言服务器协议（LSP）的编辑器，例如 **VS Code**、**Vim** 和 **Emacs**。

其主要功能包括跳转到定义、查找所有引用、代码重构和补全。它还集成了通过 `rustfmt` 进行的代码格式化，以及通过 `rustc` 和 `clippy` 进行的诊断。

该项目代码库结构清晰，包含一组用于分析 **Rust** 代码的库。目前，它在GitHub上获得了16.5k星。

[查看原文](https://github.com/rust-lang/rust-analyzer)

---

## Zed推出DeltaDB，旨在超越传统代码提交模式 {#news-17}

> Zed公司发布了新型版本控制系统DeltaDB，它将工作树与对话转化为共享制品，旨在革新软件协作方式。

![Zed推出DeltaDB，旨在超越传统代码提交模式](https://images.zed.dev/blog/deltadb-early-access/thumbnail.webp)

**Zed** 团队于2021年创立公司，其目标是突破传统代码提交（commit）的限制，**DeltaDB** 是实现该愿景的关键产品。

DeltaDB 将开发工作分解为精细的增量流，为每个操作提供稳定标识，而不仅仅是记录提交快照。

该系统嵌入了无冲突复制工作树，允许多人及智能体跨不同机器同时编辑相同文件。

在 DeltaDB 中，任何引用都锚定到一个增量，这使得即使底层代码发生变化，引用也能保持存活。

[查看原文](https://zed.dev/blog/introducing-deltadb)

---

## 探讨新 DSL 如何在 LLM 时代生存 {#news-18}

> 文章探讨了在 LLM 时代，新的领域特定语言（DSL）如何通过优秀文档和工具来维持其生命力。

在 LLM 时代，新语言要变得可行，需要优秀的文档、营销和工具。像 **Web Pipe** 这样的新 DSL 可以通过创建 `AGENTS.md` 类型的文件来更好地与 LLM 代理协作。

**Web Pipe** 嵌入了 `jq`、`Lua`、`JavaScript`、`SQL` 等多种语言，LLMs 已经对这些语言很熟悉。现代语言需要一个健壮的语言服务器和全面的文档。

作者已使用 **Web Pipe** 的 `AGENTS.md` 模板文件作为指导，成功在 `codex` 中创建了演示应用程序。他还建议新语言应考虑浏览器运行时（如 WASM）。

[查看原文](https://www.williamcotton.com/articles/how-a-new-dsl-survives-in-the-era-of-llms)

---

## Google Colab 推出命令行界面，连接本地终端与远程运行时 {#news-19}

> 谷歌宣布为 **Google Colab** 推出新的命令行接口，允许开发者将本地终端无缝连接到远程Colab运行时。

这个新工具旨在为开发者和AI代理提供“无摩擦”的执行环境，简化工作流程。

用户可以通过该接口轻松请求高性能GPU，并远程运行本地的Python脚本。

它还支持无缝检索工件日志或模型，例如微调后的 `Gemma 3` 适配器。

该工具高度可编程，可被如 `Antigravity` 或 `Claude Code` 等AI代理用于管理复杂的机器学习管道。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 甲骨文警告安全漏洞，黑客已利用其攻击逾百家公司 {#news-20}

> 甲骨文公司就一个安全漏洞发出警告，一个网络犯罪团伙已利用该漏洞对超过100家公司发起攻击。

**甲骨文**警告其产品存在一个安全漏洞。一个网络犯罪团伙表示，他们已将此漏洞用于大规模黑客攻击活动。

**谷歌**确认，已通知超过100个可能使用了存在漏洞服务器的组织。该漏洞被黑客滥用，导致大规模数据泄露风险。

此次事件再次凸显了企业软件安全的重要性。受影响的组织需立即采取措施以评估和修复潜在风险。

[查看原文](https://techcrunch.com/2026/06/11/oracle-warns-of-security-bug-that-hackers-abused-to-breach-100-companies/)

---

## 美国一项无证监听法律即将到期，但监视网络并未‘失明’ {#news-21}

> 美国国会未能通过《外国情报监视法》第702条的延期，导致该有争议的无证监听权限即将暂停，但这并不意味着美国完全失去监视能力。

![美国一项无证监听法律即将到期，但监视网络并未‘失明’](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/gettyimages-2280779303.jpg?quality=90&strip=all&crop=0,0,100,100)

国会未能通过《外国情报监视法》第702条的三周延期。众议院以218票对198票反对将该权限重新授权至7月2日。

在该计划于今年早些时候经过短期延期后，目前看来将至少暂停一周。尽管支持者警告称暂停将阻碍情报机构挫败潜在恐怖袭击的努力。

但分析指出，此次暂停并不意味着美国失去了其广泛的监视能力，相关的监视网络仍在运作。

[查看原文](https://www.theverge.com/tech/948451/fisa-702-reauthorization-vote-fails-congress-wiretapping-lapse)

---

## 美国两党议员提出JAWBONE法案，旨在限制联邦机构对在线内容审查 {#news-22}

> 美国参议员泰德·克鲁兹和罗恩·怀登提出了《JAWBONE法案》，旨在禁止联邦机构胁迫在线平台更改内容。

美国参议员泰德·克鲁兹和罗恩·怀登共同提出了《**JAWBONE法案**》，其全称是“司法对武器化官僚过度干预网络表达法案”。

该法案旨在禁止联邦机构和雇员胁迫广播公司、在线服务或**AI**服务提供商更改内容。法案背景可能涉及政府对社交媒体和**AI**聊天机器人的压力。

法案将为“劝说”行为的受害者创造私人诉权，允许个人在法庭上获得补偿性赔偿，也可由州检察长通过民事诉讼执行。

[查看原文](https://arstechnica.com/tech-policy/2026/06/ted-cruz-and-ron-wyden-try-to-fight-censorship-with-bipartisan-jawbone-act/)

---

## 美参议员提出《JAWBONE法案》拟允许起诉政府社交媒体审查 {#news-23}

> 参议院商务委员会主席泰德·克鲁兹和参议员罗恩·怀登提出一项两党法案，旨在允许个人就政府官员非法胁迫删除社交媒体内容提起诉讼。

![美参议员提出《JAWBONE法案》拟允许起诉政府社交媒体审查](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25840497/STKP211_BRENDAN_CARR_B.jpg?quality=90&strip=all&crop=0,0,100,100)

**泰德·克鲁兹**与**罗恩·怀登**提出了《JAWBONE法案》。这是一项两党法案，旨在允许美国人就政府官员非法试图胁迫社交媒体、AI或广播公司删除其帖子而提起诉讼。

诉讼可针对平台是否实际执行删除操作提起，旨在寻求损害赔偿。该法案还将为政府与社交媒体、AI和广播公司的沟通创建新的透明度要求。

法案的提出背景下，**吉米·坎贝尔**等个人可能因此获得起诉联邦通信委员会主席**布伦丹·卡尔**的法律依据。

[查看原文](https://www.theverge.com/policy/948525/cruz-wyden-jawbone-act-censorship)

---

## OpenAI核心负责人领导ChatGPT向“超级应用”转型 {#news-24}

> OpenAI正改造ChatGPT为能处理生活方方面面的个性化AI代理，内部称为“超级应用”。

![OpenAI核心负责人领导ChatGPT向“超级应用”转型](https://media.wired.com/photos/6a29dcf7d0be49584df640a0/191:100/w_1280,c_limit/Model-Behavior-OpenAI-Codex-Lead-Tibo-Sottiaux-Business.jpg)

**OpenAI**正在彻底改造**ChatGPT**，目标是将其转变为一个能处理个人和职业生活方方面面任务的个性化AI代理，公司内部称之为“超级应用”。

Thibault Sottiaux上个月被任命为**OpenAI**核心产品负责人，负责监督**ChatGPT**和`Codex`，并将它们合并为未来的超级应用。**OpenAI**已关闭了多个独立产品，包括视频应用**Sora**。

Sottiaux现在直接向Greg Brockman汇报，后者目前负责**OpenAI**所有产品团队。Sottiaux帮助建立的`Codex`已成为**OpenAI**增长最快的收入来源之一。

**OpenAI**的计划是构建“世界上最了解人类关切的最佳个人代理”，**ChatGPT**将在未来一年内变得“令人愉悦地主动”。

**OpenAI**希望通过将**ChatGPT**转变为超级应用来重振其增长，以应对来自**Google**和**Anthropic**的激烈竞争。

[查看原文](https://www.wired.com/story/model-behavior-interview-with-openai-codex-lead-tibo-sottiaux/)


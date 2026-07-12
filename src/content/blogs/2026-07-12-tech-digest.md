---
title: 科技早报 2026-07-12
category: "科技, 科技早报"
excerpt: Google密集发布LiteRT.js、Gemma 4 12B、ADK Go 2.0等AI工具，BAAI推出无动作标签的Orca世界模型，AI辅助发现潜伏15年的Linux内核提权漏洞。
lastEdited: 2026年7月12日
tags: [科技早报, Google, AI, PyTorch, 开源, Linux, 智能体, GitHub]
imageUrl: 
---

## 概览

### AI 与机器学习

- [GitHub 热门：PyTorch 仓库 Star 数突破 102k](#news-1)
- [BAAI 发布 Orca 世界模型，无需动作标签即可匹配专用机器人系统](#news-2)
- [Google 发布 LiteRT.js，浏览器端高性能 Web AI 推理库](#news-3)
- [Gemma 4 12B 模型上线 16GB 笔记本可本地运行](#news-4)
- [DiffusionGemma：基于扩散机制的文本生成实验模型](#news-5)
- [Google MaxText 引入弹性训练 TPU 故障恢复缩至两分钟内](#news-6)
### GitHub 热门项目

- [GitHub 热门：OpenManus 无需邀请码的开源智能体项目](#news-7)
- [GitHub 热门：pgrust 尝试以 Rust 复刻 Postgres 18.3](#news-8)
- [GitHub 热门：Claude Code Templates 一键配置 AI 编程助手](#news-9)
- [Nuclei 登 GitHub Trending：基于 YAML 的开源漏洞扫描器](#news-10)
- [GitHub Trending：Rust 全栈工具链 bun 登榜](#news-11)
- [GitHub Trending：开源 AI Agent aaif-goose/goose 单日新增 45 星](#news-12)
### 开源生态

- [Genkit 推出 Agents API 预览版,简化对话式 AI 全栈开发](#news-13)
- [GitHub 热门：本地化家庭自动化平台 home-assistant/core](#news-14)
### 开发者工具

- [Google ADK 与 A2A 协议支持跨语言多智能体协作](#news-15)
- [Google 发布 ADK Go 2.0：基于图的多代理工作流引擎](#news-16)
- [Goeteia：纯 Scheme 实现的浏览器端 Web 编程工具](#news-17)
- [Google 推出 Colab 命令行工具 支持 AI 智能体接入](#news-18)
### 安全与隐私

- [AI 工具发现潜伏 15 年的 Linux 内核提权漏洞](#news-19)
- [Sign in with Google 新增 OIDC 会话元数据声明](#news-20)
### 产品与平台

- [OpenAI 招聘家庭产品经理，ChatGPT 加速渗透家庭场景](#news-21)
### 硬件与芯片

- [Google 推出 TPU Developer Hub 集中式资源平台](#news-22)
- [Wired 评测 Samsung Micro RGB R95H：亮度并非最大卖点](#news-23)
### 科技行业动态

- [Apple 起诉 OpenAI 指控其挖角员工窃取商业秘密](#news-24)
---

## GitHub 热门：PyTorch 仓库 Star 数突破 102k {#news-1}

> 知名深度学习框架 **PyTorch** 的官方 GitHub 仓库已获得约 102k Star、28.5k Forks，累计 commits 达 107,286 次，默认分支为 main。

![GitHub 热门：PyTorch 仓库 Star 数突破 102k](https://opengraph.githubassets.com/adfea8e7e865ef1f2127fc0e5f1c0eb73763ca4a165c54a13622d88ae82dba9d/pytorch/pytorch)

**PyTorch** 是一个 Python 包，提供类似 NumPy 的 GPU 加速 Tensor 计算，以及基于 tape 的 `autograd` 系统的深度神经网络。

用户可复用 NumPy、SciPy 和 Cython 等 Python 包来扩展 **PyTorch**，并通过源码构建支持 NVIDIA CUDA、AMD ROCm 和 Intel GPU。

仓库提供 Docker 支持以及 NVIDIA Jetson 平台的安装方式，持续集成（trunk health）状态可在 hud.pytorch.org 查看。

[查看原文](https://github.com/pytorch/pytorch)

---

## BAAI 发布 Orca 世界模型，无需动作标签即可匹配专用机器人系统 {#news-2}

> 北京人工智能研究院（BAAI）推出 Orca 世界模型，预测抽象世界状态，并在五项机器人任务上与专用模型 π0.5 表现相当。

![BAAI 发布 Orca 世界模型，无需动作标签即可匹配专用机器人系统](https://the-decoder.com/wp-content/uploads/2026/07/autonomous-kitchen-system-nano-banana-pro.jpg)

该模型基于 125,000 小时的视频训练，全程未使用任何动作标签，转而学习抽象世界状态而非 token 或像素。

在五项机器人任务基准上，Orca 的表现与专用模型 **π0.5** 相匹配。

BAAI 表示，Orca 有望缓解该领域长期存在的数据短缺问题（原文使用"could help ease"表述，为潜在可能性）。

该模型由位于北京的北京人工智能研究院（BAAI）发布。

[查看原文](https://the-decoder.com/chinas-orca-world-model-matches-specialized-robotics-systems-without-ever-seeing-a-single-action-label/)

---

## Google 发布 LiteRT.js，浏览器端高性能 Web AI 推理库 {#news-3}

> LiteRT.js 是 LiteRT 系列的新成员，用于在浏览器中直接运行机器学习模型，面向 JavaScript 开发者。

LiteRT.js 是 Google 跨平台边缘 AI 运行时的 Web 端扩展，在 WebGPU 及即将推出的 WebNN 上提供先进 ML 模型推理性能。

该库同时提供向 WebAssembly 的回退方案，以支持 CPU 推理。

文章定位为 LiteRT.js 的快速概览，旨在为 Web 开发者提供上手所需的信息。

[查看原文](https://developers.googleblog.com/litertjs-googles-high-performance-web-ai-inference/)

---

## Gemma 4 12B 模型上线 16GB 笔记本可本地运行 {#news-4}

> Google DeepMind 推出 Gemma 4 12B 模型，可在 16GB 内存的笔记本上运行智能体式多模态 AI。

该模型支持本地数据处理与可视化洞察生成，强调端侧推理。

macOS 用户可通过 Google AI Edge Gallery 执行动态 Python 代码与可视化。

也可借助 Google AI Edge Eloquent 在完全离线场景下进行语音听写与文本编辑。

LiteRT-LM CLI 新增 `serve` 命令，可创建与行业兼容的本地端点。

该端点可用于驱动完全本地化的 AI 工具与智能体。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## DiffusionGemma：基于扩散机制的文本生成实验模型 {#news-5}

> DiffusionGemma 是一款基于 Gemma 4 架构构建的实验性文本生成模型，采用扩散式并行生成方式，而非传统逐 token 自回归。

该模型通过迭代去噪以并行方式生成与优化 256-token 的块，具备双向上下文感知能力。

推理速度可实现显著提升，并支持实时自我校正。

模型可在消费级 GPU 上部署，并与 `vLLM` 等主流推理框架集成。

在数独等基于约束的任务上表现优于传统语言模型，且通过微调可获得显著性能提升。该模型被描述为"实验性"，可能存在功能或稳定性方面的限制。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Google MaxText 引入弹性训练 TPU 故障恢复缩至两分钟内 {#news-6}

> Google 在 JAX 生态中通过 Pathways 实现弹性训练，把硬件故障转为可捕获异常，使训练任务在不重启主进程的情况下恢复。

意外故障时系统仅替换损坏的 worker，训练从 Cloud Storage 拉取最后一个可用 checkpoint 原地继续。

整个恢复过程停机时间被压缩到两分钟以内，主控制器进程无需重启。

官方称该能力将传统分布式训练中常见的级联崩溃限制在局部。

[查看原文](https://developers.googleblog.com/we-terminated-a-tpu-mid-training-and-it-recovered-in-seconds-introduction-to-elastic-training-with-maxtext/)

---

## GitHub 热门：OpenManus 无需邀请码的开源智能体项目 {#news-7}

> **OpenManus** 是一个开源的 LLM 智能体项目，无需邀请码即可使用，原型在 3 小时内完成发布。

![GitHub 热门：OpenManus 无需邀请码的开源智能体项目](https://opengraph.githubassets.com/5911e7ccbf71d3710882c1b6c003f125bd253866886753fbfb93ea1fd7b2458b/FoundationAgents/OpenManus)

项目标语为 "No fortress, purely open ground. OpenManus is Coming."。

在 GitHub 已获 57.2k Star、10k Fork，提交次数为 526 次。

核心作者包括 Xinbin Liang 和 Jinyu Xiang，团队成员来自 **MetaGPT**。

衍生项目 **OpenManus-RL** 由 UIUC 与 OpenManus 研究人员合作开发，专注于基于强化学习的 LLM 智能体调优。

README 支持英语、中文、韩语、日语四种语言。

[查看原文](https://github.com/FoundationAgents/OpenManus)

---

## GitHub 热门：pgrust 尝试以 Rust 复刻 Postgres 18.3 {#news-8}

> Rust 项目 malisper/pgrust 目标兼容 Postgres 18.3，已在 4.6 万余条回归查询上匹配预期输出，并可直接从已有 Postgres 18.3 数据目录启动。

![GitHub 热门：pgrust 尝试以 Rust 复刻 Postgres 18.3](https://opengraph.githubassets.com/a10f96a6f1b496d57c39154b727062e18ac8817f5e8f890bf5e711645e72b4a8/malisper/pgrust)

仓库使用 Rust 编写，Star 数 2.1k，Fork 数 52，已 vendor `postgres-18.3` 目录。

Docker 镜像标签包括 `malisper/pgrust:v0.1` 与 `malisper/pgrust:latest`。

作者自述未发布的新版本据称通过 100% Postgres 回归测试，事务型负载较 Postgres 快 50%、分析型负载快约 300 倍。

作者同时称该版本在 clickbench 上比 Clickhouse 慢约 2 倍，但相关数字尚未正式发布，且项目明确标注未生产就绪、未做性能优化。

[查看原文](https://github.com/malisper/pgrust)

---

## GitHub 热门：Claude Code Templates 一键配置 AI 编程助手 {#news-9}

> **Claude Code Templates** 是用于配置和监控 **Claude Code** 的 CLI 工具，提供超 100 个组件模板。

![GitHub 热门：Claude Code Templates 一键配置 AI 编程助手](https://opengraph.githubassets.com/bceb1170f6fe5d18e8b1d28caa92c0e6bcad2cb813e82ce9bdf8b589847ec9f6/davila7/claude-code-templates)

项目在 GitHub 已获 29k Star、3.2k Fork，累计提交 1,348 次。

可通过 `npx claude-code-templates@latest` 命令快速安装各类组件。

模板覆盖 Agents、Commands、MCPs、Settings、Hooks 和 Skills 等类型。

项目同时提供 www.aitmpl.com 的 Dashboard 功能，目前处于 beta 阶段，反馈正在收集中。

[查看原文](https://github.com/davila7/claude-code-templates)

---

## Nuclei 登 GitHub Trending：基于 YAML 的开源漏洞扫描器 {#news-10}

> GitHub 仓库 `projectdiscovery/nuclei` 处于 Trending 状态，主要使用 Go 编写，累计 Star 近 3 万。

仓库今日新增 24 个 Star，总 Star 数为 29,730。

Nuclei 是由全球安全社区驱动的快速、可定制漏洞扫描器。

它基于简单的 YAML DSL，便于社区协作处理互联网上的热点漏洞。

扫描覆盖应用程序、API、网络、DNS 以及云配置等场景。

[查看原文](https://github.com/projectdiscovery/nuclei)

---

## GitHub Trending：Rust 全栈工具链 bun 登榜 {#news-11}

> oven-sh/bun 登上 GitHub Trending Rust 榜单，单日新增 658 stars，总 Stars 达 94,575。

项目主要语言为 Rust，定位为全栈 JavaScript 工具链。

官方描述为集 JavaScript 运行时、打包器、测试运行器和包管理器于一体。

项目目前处于 Trending 状态，关注度持续上升。

[查看原文](https://github.com/oven-sh/bun)

---

## GitHub Trending：开源 AI Agent aaif-goose/goose 单日新增 45 星 {#news-12}

> Rust 编写的开源 AI Agent aaif-goose/goose 登上 GitHub Trending，单日新增 45 Star，总 Star 数超过 5.1 万。

aaif-goose/goose 主要语言为 Rust，总 Star 数已达 51,093。

项目自我描述为可扩展的开源 AI Agent，定位超越一般代码建议范围。

该 Agent 支持安装、执行、编辑与测试等多种操作。

设计上可与任意 LLM 配合使用，具备较强通用性。

[查看原文](https://github.com/aaif-goose/goose)

---

## Genkit 推出 Agents API 预览版,简化对话式 AI 全栈开发 {#news-13}

> 开源框架 **Genkit** 推出 **Agents API** 预览版,封装消息历史、工具循环与流式传输,降低构建代理式全栈应用的复杂度。

**Agents API** 支持服务端或客户端管理的灵活状态持久化,覆盖历史分支、长时分离任务与多智能体协调等工作流。

通过统一 wire protocol 连接前后端,并与 **Genkit Developer UI** 集成,可在不写客户端代码的情况下测试、调试与检查智能体快照。

预览版支持 `TypeScript` 与 `Go`,发布时间未在原文提供,细节未来可能变化。

[查看原文](https://developers.googleblog.com/build-agentic-full-stack-apps-with-genkit/)

---

## GitHub 热门：本地化家庭自动化平台 home-assistant/core {#news-14}

> home-assistant/core 是一款以本地控制和隐私为先的开源家庭自动化平台，长期位居 GitHub 热门项目榜单。

![GitHub 热门：本地化家庭自动化平台 home-assistant/core](https://repository-images.githubusercontent.com/12888993/b7c31002-f51f-45b9-ae79-1c1fd52e84ab)

项目在 GitHub 上累计获得 88.7k Star、1.4k Watchers 和 38.1k Fork，代码库已有 113,093 次提交。

最新版本 2026.7.2 于 2026 年 7 月 10 日发布，项目采用 Apache-2.0 许可证。

支持在 Raspberry Pi 或本地服务器上运行，由全球爱好者与 DIY 社区共同维护开发。

[查看原文](https://github.com/home-assistant/core)

---

## Google ADK 与 A2A 协议支持跨语言多智能体协作 {#news-15}

> 文章演示如何用 Python 与 Go 两个智能体协作完成合同合规工作流，验证 Google Agent Development Kit 与 A2A 协议的跨语言编排能力。

![Google ADK 与 A2A 协议支持跨语言多智能体协作](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner.2e16d0ba.fill-1200x600.jpg)

演示中 Python 智能体调用 **Gemini** 解析合同条款，Go 智能体以确定性逻辑验证合规性，两者通过 Agent2Agent（A2A）协议通信。

整套流程由 Google 的 Agent Development Kit（ADK）编排，完整源代码已在 GitHub 开源。

文章总结三种生产级多智能体架构模式：跨语言协作、A2A `RemoteA2aAgent` 抽象，以及多智能体流水线替代单体巨型 prompt。

作者指出单体智能体在工具超过 10–15 个时易出现上下文退化、爆炸半径大且难以测试。

作者为 Shubham Saboo 与 Eric Dong，文章发布于 2026 年 6 月 22 日。

[查看原文](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)

---

## Google 发布 ADK Go 2.0：基于图的多代理工作流引擎 {#news-16}

> Google 发布 Agent Development Kit (ADK) for Go 2.0，引入基于图的工作流引擎，用于构建复杂多代理应用。

该版本新增人机协同（HITL）编排原语、内置基于原生 Go 代码的动态执行，以及自动弹性能力，如指数退避重试。

版本统一了执行模型，使单代理应用和复杂图应用运行在同一运行时上，简化了遥测与状态持久化。

ADK Go 2.0 面向 Go 开发者，旨在提升多代理应用的可靠性与可观测性。

[查看原文](https://developers.googleblog.com/announcing-adk-go-20/)

---

## Goeteia：纯 Scheme 实现的浏览器端 Web 编程工具 {#news-17}

> Goeteia 是一个用纯 Scheme 编写的 Web 编程工具，编译器被编译为 WebAssembly 后直接在浏览器中运行，无需服务器参与。

编译器 goeteia.wasm 经 gzip 压缩后约 70 KB，首次加载后会被浏览器缓存；每次点击 Run 约 15 ms 即可重新编译上方的 Scheme 源码。

采用 Wasm GC 对象：fixnum 解包为 i31ref，对和记录为 GC 结构，eq? 仅需一次 ref.eq 比较，闭包基于类型化函数引用。

提供反应式 Web 栈 (web sx)、模板基于细粒度信号 (web reactive)、渲染器 (web html) 与 FFI (web js)，并支持 (web three)、(web gl)、(web glsl) 模块。

支持 call/cc 和 dynamic-wind，通过 Wasm 异常处理提案实现 O(1) 捕获；提供 (web fetch)、(web ws)、(web sse)、(web json) 模块。

使用 R6RS 风格 (library ...) 文件，从源码引导需 Chez Scheme；编译产物可在 Node 22+、新版 Chrome/Firefox/Safari 及 wasmtime 上运行。

[查看原文](https://goeteia.dev)

---

## Google 推出 Colab 命令行工具 支持 AI 智能体接入 {#news-18}

> Google 宣布推出 Google Colab 命令行界面（CLI），可将本地终端连接至远程 Colab runtime。

该工具允许开发者请求高性能 GPU，并在远程 Colab 上运行本地 Python 脚本。

支持便捷检索微调后的 Gemma 3 adapters 等 artifact 日志或模型。

可集成到标准终端环境，具备高度可编程性。

AI 智能体（如 Antigravity、Claude Code）可借此管理复杂的机器学习流水线。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## AI 工具发现潜伏 15 年的 Linux 内核提权漏洞 {#news-19}

> Nebula Security 公开名为 GhostLock（CVE-2026-43499）的 Linux 内核 use-after-free 漏洞利用代码，可让已登录用户获取 root 权限。

![AI 工具发现潜伏 15 年的 Linux 内核提权漏洞](https://media.wired.com/photos/663fe63cf59145e49d5e32df/1:1/w_90%2Cc_limit/dell_cameron.PNG)

该漏洞自 2011 年起随几乎所有主流 Linux 发行版发布，攻击无需特殊权限或网络访问。

其 AI 驱动漏洞挖掘工具 VEGA 发现了该漏洞，相关利用代码容器逃逸可靠性达 97%。

Nebula 通过 Google 的 `kernelCTF` 计划获得 92,337 美元奖金。

漏洞已于 4 月修复，但补丁可用情况不均；截至 7 月初，Ubuntu 24.04、22.04、20.04 LTS 仍被列为存在漏洞或修复中。

[查看原文](https://www.wired.com/story/security-news-this-week-ai-found-a-root-bug-in-linux-that-everyone-missed-for-15-years/)

---

## Sign in with Google 新增 OIDC 会话元数据声明 {#news-20}

> Google 为 Sign in with Google 引入新的 OIDC 标准声明，以增强身份验证的安全性与可信度。

新增声明包括 `auth_time` 与 `amr`（Authentication Methods Reference），可由经验证的应用读取。

应用可据此验证登录"新鲜度"，并获取用户所使用的具体身份验证方法，如 MFA 或硬件密钥。

这些信号支持基于风险的动态访问控制，有助于防范账户接管与欺诈。

开发者可借此实现更细粒度策略，例如对敏感操作进行 step-up 身份验证。

[查看原文](https://developers.googleblog.com/enhance-security-and-trust-new-session-metadata-in-sign-in-with-google/)

---

## OpenAI 招聘家庭产品经理，ChatGPT 加速渗透家庭场景 {#news-21}

> OpenAI 正在旧金山招聘一名产品经理，负责在产品中构建面向家庭、照护者和老年人的体验。

![OpenAI 招聘家庭产品经理，ChatGPT 加速渗透家庭场景](https://techcrunch.com/wp-content/uploads/2025/01/GettyImages-2170386424.jpg?w=1024)

据 Sensor Tower 独家提供给 TechCrunch 的估计，全球 ChatGPT 用户中 35 岁及以上占比从一年前的 26% 升至 Q2 的 31%，18 至 24 岁占比则从 34% 降至 29%。

同期在美国，近四分之一（约 1/4）的智能手机家长用户使用过 ChatGPT，高于一年前的 16%。

家庭在线安全研究所本周发布的调查显示，27% 的美国父母称其孩子过去一周使用过生成式 AI，38% 的孩子自称使用过，调查覆盖美国和澳大利亚 4,000 多个家庭。

创意策略咨询公司 Creative Strategies CEO Ben Bajarin 认为，该职位意味着 OpenAI 定位正从面向个人的生产力工具转向面向家庭的技术。

OpenAI 面临多起家长诉讼，指控 ChatGPT 助长了对孩子的伤害，其中包括涉及自杀的案件；OpenAI 未对评论请求作出回应。

[查看原文](https://techcrunch.com/2026/07/11/openai-bets-on-families-as-chatgpt-goes-deeper-into-households/)

---

## Google 推出 TPU Developer Hub 集中式资源平台 {#news-22}

> Google 正式上线 TPU Developer Hub，为开发者提供集中式教育资源，帮助其充分发挥 Google Cloud TPU 的性能。

该 Hub 以代码为先，提供开源 recipe 与深入文档，覆盖硬件架构、软件优化、调试、并行性与网络。

资源同时面向人类开发者与 AI 辅助工具，简化从大规模训练到低延迟推理的全流程。

Hub 内含可立即运行的代码示例、开源实现以及详细技术文档。

[查看原文](https://developers.googleblog.com/unlocking-the-power-of-the-tpu-stack-introducing-our-new-developer-hub/)

---

## Wired 评测 Samsung Micro RGB R95H：亮度并非最大卖点 {#news-23}

> Wired 给 Samsung Micro RGB R95H 打出 6/10 分，认为该机并非同类中最亮的 Micro RGB 电视。

![Wired 评测 Samsung Micro RGB R95H：亮度并非最大卖点](https://media.wired.com/photos/6a508fa4801742f6885445cc/191:100/w_1280,c_limit/Review--Samsung-Micro-RGB-R95H.jpg)

65 英寸版本在 Best Buy 与 Samsung 官网售价均为 3,200 美元，75 英寸版零售价 4,500 美元。

作为对比，75 英寸 LG Micro RGB Evo 同样定价 4,500 美元，LG 该型号最小尺寸为 75 英寸。

接口方面配备四个 HDMI 端口（含专用游戏接口与 HDMI eARC）、同轴、光纤、双 USB 及以太网口，并支持 Wi-Fi 6E。

该电视可搭配 Samsung 的 Wireless One Connect 无线机顶盒使用，系统为 Samsung 自家 Tizen OS。

[查看原文](https://www.wired.com/review/samsung-micro-rgb-r95h/)

---

## Apple 起诉 OpenAI 指控其挖角员工窃取商业秘密 {#news-24}

> Apple 起诉 OpenAI，指控其系统性挖角员工并涉嫌窃取未发布产品的商业秘密。

![Apple 起诉 OpenAI 指控其挖角员工窃取商业秘密](https://the-decoder.com/wp-content/uploads/2026/07/apple_logo_neon_green.png)

诉状称目前有超过 400 名原 Apple 员工在 OpenAI 工作。

前 iPhone 设计主管 Tang Tan 在被点名的前 Apple 员工之列。

OpenAI 正在建设自己的硬件部门，首款硬件产品预计最早 2027 年出货。

诉讼使用 'allegedly' 表述，相关指控有待法律程序验证。

[查看原文](https://the-decoder.com/apple-sues-openai-for-allegedly-running-a-coordinated-campaign-to-steal-trade-secrets-through-poached-employees/)


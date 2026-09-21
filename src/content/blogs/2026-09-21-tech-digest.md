---
title: 科技早报 2026-09-21
category: "科技, 科技早报"
excerpt: 阿里发布开放权重图像模型，AI代理与强化学习开源项目持续升温，软件供应链安全受关注
lastEdited: 2026年9月21日
tags: [人工智能, Qwen, AI代理, 强化学习, 开源项目, GitHub, Rust, 网络安全]
imageUrl: 
---

## 概览

### AI 与机器学习

- [阿里发布开放权重 Qwen-Image-2.1，支持图像生成与编辑](#news-1)
- [开源项目Kev推出三款基于Qwen3.5的小型决策模型](#news-2)
- [腾讯 Gander 探索后台执行任务时持续对话](#news-3)
- [StudentSim用真实错误帮助AI导师更快学习](#news-4)
- [英伟达黄仁勋称人工智能末日概率为零](#news-5)
- [ChatGPT记忆机制更新：自动筛选并持续更新用户信息](#news-6)
### GitHub 热门项目

- [字节跳动Seed与清华AIR开源DAPO强化学习系统](#news-7)
- [GitHub 项目探索浏览器任务自修复机制](#news-8)
- [GitHub 项目展示从零训练 LLM 的完整流程](#news-9)
- [Anthropic金融服务代理仓库获3.52万颗Star](#news-10)
- [Cloudflare推出多款MCP服务器连接云服务](#news-11)
- [开源市场平台 OpenStock 登上 GitHub 热门项目](#news-12)
### 开源生态

- [多款自托管推理编排器功能对比发布](#news-13)
- [作者警告生成式AI或冲击开源许可证平衡](#news-14)
- [Amiga Unix社区项目继续推进经典系统现代化](#news-15)
### 开发者工具

- [微软以约12万美元将Copilot运行时迁移至Rust](#news-16)
- [团队尝试用软件工厂模式编排开发任务](#news-17)
- [重新测试显示 Wild 链接器性能接近 Mold](#news-18)
### 安全与隐私

- [Google研究员潜入TeamPCP调查软件供应链攻击](#news-19)
- [谷歌推出面向AI代理的运行时零信任治理能力](#news-20)
- [能源系统网络攻击风险上升人为因素仍是主要隐患](#news-21)
- [Meta人工智能助手Muse首周下载超90万次](#news-22)
### 产品与平台

- [Google推出面向智能体任务的开放编排系统AX](#news-23)
- [ScrollEd尝试将教科书变成可滚动信息流](#news-24)
---

## 阿里发布开放权重 Qwen-Image-2.1，支持图像生成与编辑 {#news-1}

> 阿里巴巴 Qwen 团队发布开放权重模型 `Qwen-Image-2.1`，支持图像生成与编辑，并可在高性能消费级 GPU 上运行。

![阿里发布开放权重 Qwen-Image-2.1，支持图像生成与编辑](https://the-decoder.com/wp-content/uploads/2026/07/qwen_logo-1.png)

`Qwen-Image-2.1` 支持透明度处理，最多可同时使用十张参考图像。

文章标题称该模型在图像生成方面可击败闭源模型，但所提供信息未包含具体对比基准或结果数据。

该模型的研究许可证禁止商业用途，商业使用需要单独获取 Qwen 许可证。

[查看原文](https://the-decoder.com/alibabas-open-weight-qwen-image-2-1-claims-to-beat-closed-models-in-image-generation-with-just-7-billion-parameters/)

---

## 开源项目Kev推出三款基于Qwen3.5的小型决策模型 {#news-2}

> 开源项目 **Kev** 发布了一组基于 `Qwen3.5` 构建的小型决策模型，提供 `0.8B`、`4B` 和 `9B` 三种规模。项目同时包含训练代码、评估数据及本地运行支持。

![开源项目Kev推出三款基于Qwen3.5的小型决策模型](https://opengraph.githubassets.com/2a7e4f59ddb28a2288f958a3b650b242f66e7db0a025f5aefca0fb3c610851dd/jaredpalmer/kev)

Kev 的架构基于 Jev 的相关架构描述，用户可以使用预训练权重，也可以自行训练模型。

模型支持在同一个请求中处理是/否（`noul`）、多项选择（`choice`）和评分（`score`）问题；这些问题共享输入文本，但不能读取彼此。

Kev 支持运行在 CUDA 和 Apple Silicon 上。`4B` 与 `9B` 模型可在 32 GB 内存的 Mac 上使用 `bf16` 运行。

项目提供与 TypeSafe System One 匹配的 API，可将 Python SDK 指向本地服务器；同时提供网页 playground，用于测试自定义输入并检查选项顺序的影响。

[查看原文](https://github.com/jaredpalmer/kev/tree/main)

---

## 腾讯 Gander 探索后台执行任务时持续对话 {#news-3}

> 腾讯的 Gander 可处理语音、图像和文本，并在后台执行任务。系统通过不同组件维持对话与完成复杂工作，用户也可以在任务进行时介入。

![腾讯 Gander 探索后台执行任务时持续对话](https://the-decoder.com/wp-content/uploads/2026/09/tencent.png)

Gander 使用名为“cerebellum”的组件维持对话，并通过可替换的“brain”执行文件搜索、代码编写等复杂任务。

任务执行过程中，用户可以打断 Gander，或对正在执行的任务进行修改。

基准测试显示，Gander 被用户打断的比例为 8%，低于其竞争对手。

不过，文章称 Gander 的任务准确率落后于竞争对手，但未披露具体对手名称和准确率数据。

[查看原文](https://the-decoder.com/tencents-gander-aims-to-keep-talking-while-it-works-in-the-background/)

---

## StudentSim用真实错误帮助AI导师更快学习 {#news-4}

> 微软与伊利诺伊大学共同构建了StudentSim，用有限数据复现单个学生，为人工智能导师提供快速、低成本的反馈。

![StudentSim用真实错误帮助AI导师更快学习](https://the-decoder.com/wp-content/uploads/2026/09/ai-tutors-microsoft-nano-banana-pro.jpg)

在涵盖60名学生的国际象棋、英语和数学测试中，StudentSim的表现优于GPT-5.4。

使用StudentSim训练的国际象棋导师，在测试的三个版本中获得了最高的专家评分。

原文未说明StudentSim与GPT-5.4对比测试的具体评价指标，也未提供统计显著性信息。

[查看原文](https://the-decoder.com/simulated-students-that-make-realistic-mistakes-help-ai-tutors-learn-faster/)

---

## 英伟达黄仁勋称人工智能末日概率为零 {#news-5}

> 英伟达首席执行官 **Jensen Huang** 在接受 CBS Sunday Morning 采访时表示，人工智能导致世界末日的可能性为“0%”。

![英伟达黄仁勋称人工智能末日概率为零](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/STKP210_JENSEN_HUANG_D.jpg?quality=90&strip=all&crop=0,0,100,100)

Huang 表示，因人工智能风险而制造恐慌是不必要且不负责任的。

他称 **Anthropic** 首席执行官 Dario Amodei 和 **OpenAI** 首席执行官 Sam Altman 关于放慢人工智能发展的呼吁没有科学依据。

Huang 还表示，没有必要制定新的人工智能规则、法律或指导方针。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/997936/nvidia-jensen-huang-ai-fears-overblown)

---

## ChatGPT记忆机制更新：自动筛选并持续更新用户信息 {#news-6}

> **ChatGPT**会保存并利用用户互动信息，为后续对话提供上下文。文章称，2026年6月更新后，系统可通过被称为`dreaming`的机制自动建立、编辑和更新记忆。

![ChatGPT记忆机制更新：自动筛选并持续更新用户信息](https://media.wired.com/photos/6aad0d966fc219f441397668/191:100/w_1280,c_limit/091826-What%20Chat%20GOT%20Remember.jpg)

ChatGPT于2024年4月首次推出记忆功能，当时用户需要明确要求系统记住某项信息。

更新后的机制会自动保存并筛选记忆，由ChatGPT判断哪些信息值得保留。OpenAI称，记忆功能旨在保留有用上下文、遵循用户偏好和限制，并持续更新信息。

用户可在网页应用的个人资料、Personalization和Memory设置中查看已保存内容，移动应用也可通过菜单进入相关设置。

文章指出，记忆功能涉及隐私问题；如果ChatGPT错误判断用户的兴趣、居住地或其他情况，可能影响回答。

[查看原文](https://www.wired.com/story/how-to-use-memory-in-chatgpt/)

---

## 字节跳动Seed与清华AIR开源DAPO强化学习系统 {#news-7}

> 字节跳动Seed与清华AIR发布开源强化学习系统DAPO，包含大语言模型强化学习算法、代码基础设施和数据集。

![字节跳动Seed与清华AIR开源DAPO强化学习系统](https://opengraph.githubassets.com/3a0d5afbca0a7cf647acd98b10635bf3fe6f35fc37704199458b9908697fec82/BytedTsinghua-SIA/DAPO)

DAPO提出`Decoupled Clip and Dynamic Sampling Policy Optimization`算法，项目基于`verl`框架构建。

项目方称，基于`Qwen2.5-32B`基础模型的DAPO在AIME 2024上取得50分，并以一半训练步数超过`DeepSeek-R1-Zero-Qwen-32B`。

项目提供DAPO-Qwen-32B模型权重，该模型基于`Qwen2.5-32B`并使用DAPO算法训练。

仓库还提供模型推理代码和环境安装说明。上述性能结果来自项目方公布的信息，原文未提供独立复现或验证。

[查看原文](https://github.com/BytedTsinghua-SIA/DAPO)

---

## GitHub 项目探索浏览器任务自修复机制 {#news-8}

> **browser-use/browser-harness** 是一个使用 Python 编写的开源项目，定位为支持 LLM 完成任意任务的自修复 harness。

该项目当前拥有 17,820 个 Stars，当天新增 86 个 Stars。

项目描述显示，其目标是支持 LLM 完成任意任务，并具备自修复能力。

[查看原文](https://github.com/browser-use/browser-harness)

---

## GitHub 项目展示从零训练 LLM 的完整流程 {#news-9}

> **FareedKhan-dev/train-llm-from-scratch** 使用 Python 编写，介绍了训练 LLM 的方法，覆盖从下载数据到生成文本的过程。

该项目当前拥有 9,993 个 Stars，当天新增 196 个 Stars。

项目内容涵盖训练流程中的数据下载、模型训练以及文本生成等环节。

[查看原文](https://github.com/FareedKhan-dev/train-llm-from-scratch)

---

## Anthropic金融服务代理仓库获3.52万颗Star {#news-10}

> GitHub公开仓库**anthropics/financial-services**面向投资银行、股票研究、私募股权和财富管理工作流，提供参考代理、技能和数据连接器。页面显示该项目拥有5.2k个Fork和35.2k颗Star。

![Anthropic金融服务代理仓库获3.52万颗Star](https://opengraph.githubassets.com/da2df08d6c58e96995e2f860bdd25fe2ee8af09b5d13e54c2094da8cfbc14a88/anthropics/financial-services)

仓库内容可作为Claude Cowork插件安装，也可通过Claude Managed Agents API部署到用户自己的工作流引擎中。

项目包含Pitch Agent、Market Researcher、Earnings Reviewer、Model Builder、Valuation Reviewer、GL Reconciler和Month-End Closer等工作流代理。

这些代理可生成模型、备忘录、研究笔记和对账结果等分析师工作产物，但所有输出都需要具备资质的专业人员审核。仓库内容不构成投资、法律、税务或会计建议。

仓库声明相关代理不会提出投资建议、执行交易、承担风险、过账或批准客户onboarding，用户需负责验证输出并遵守适用法规。

[查看原文](https://github.com/anthropics/financial-services)

---

## Cloudflare推出多款MCP服务器连接云服务 {#news-11}

> **cloudflare/mcp-server-cloudflare** 提供多个 MCP 服务器，使 MCP 客户端能够连接 Cloudflare 服务，并通过自然语言操作 Cloudflare 账户。该仓库页面显示有 523 个 Fork 和 4.2k 颗 Star。

![Cloudflare推出多款MCP服务器连接云服务](https://opengraph.githubassets.com/c315ab96acf3a2fe3feaee6e09f1396fa67688fbed669588b4636dea439d6569/cloudflare/mcp-server-cloudflare)

这些服务器可读取账户配置、处理信息并基于数据提出建议，也可在用户请求时执行相关更改，覆盖应用开发、安全和性能等服务。

仓库中的每个服务器通过新的 SDK v2 服务器工厂暴露无状态的 Streamable HTTP 处理器，路径为 `/mcp` 和 `/sse`。

`/sse` 作为 URL 兼容别名保留，但不再使用已弃用的 HTTP+SSE 传输；旧版 SSE GET `/sse` 请求会返回 `410 Gone`。

Cloudflare 列出的服务器包括 Code Mode、Documentation、Workers Bindings 和 Workers Builds，其中 Code Mode 可通过 `https://mcp.cloudflare.com/mcp` 访问。

[查看原文](https://github.com/cloudflare/mcp-server-cloudflare)

---

## 开源市场平台 OpenStock 登上 GitHub 热门项目 {#news-12}

> 开源项目 **Open-Dev-Society/OpenStock** 定位为市场平台替代方案，支持追踪实时价格、设置个性化提醒并查看公司信息。

**OpenStock** 使用 TypeScript 编写，项目描述称其旨在免费开放使用。

该项目目前在 GitHub 上获得 16,417 颗 Stars，当日新增 472 颗 Stars。

[查看原文](https://github.com/Open-Dev-Society/OpenStock)

---

## 多款自托管推理编排器功能对比发布 {#news-13}

> 一篇文章比较了面向单台或多台 GPU、并希望提供 OpenAI 兼容端点的多种自托管推理编排器。比较对象包括 **vLLM**、**LocalAI**、**GPUStack**、**CoderAI** 等项目或产品。

文章称，功能信息主要来自项目 README 和文档，GitHub 星标数量来自 2026 年 9 月 20 日的 GitHub API。

表格显示，`vLLM` 支持通过 Ray 实现跨机器张量并行或流水线并行，并提供 Prometheus 指标。

`LocalAI` 支持文本、图像、视频、音频、嵌入和重排序，并支持基于 P2P 的联邦架构等能力。

`GPUStack` 支持多种模态及 `llama-box RPC`，还支持多个推理引擎的张量并行与流水线并行；`CoderAI` 支持多种模态、云端 GPU 扩展及分布式 LoRA。

[查看原文](https://www.nexlab.net/articles/self-hosted-inference-orchestrators-compared-2026/)

---

## 作者警告生成式AI或冲击开源许可证平衡 {#news-14}

> 一篇评论文章认为，人工智能正在冲击软件版权保护与开放之间长期形成的平衡。作者尤其担心，语言模型生成的衍生作品可能无法体现原始创作者的许可证要求。

作者回顾称，copyleft 运动推动了 GPL、MPL 和 CC-SA 等许可证的发展，并要求相关自由软件的衍生作品继续传递相应权利。

文章认为，现代互联网和云服务依赖自由及开源软件；同时，作者声称大型语言模型正在不顾版权或许可证地消费网上内容。

作者担心，语言模型生成的衍生作品可能不反映原始许可证要求，而相关义务目前似乎缺乏法律执行。

文章还指出，生成式 AI 可能降低发现公开代码漏洞并加以滥用的门槛。作者同时担心，网上共享的代码可能包含恶意库、向第三方发送数据，或涉及他人被盗作品。

作者认为，这些风险可能削弱人们公开分享代码的意愿。由于正文在结尾处截断，相关版权、许可证遵循及影响主要仍属于作者的观点和担忧。

[查看原文](https://www.chesterwisniewski.com/post/2026-09-13-ai-is-destroying-the-creative-commons/)

---

## Amiga Unix社区项目继续推进经典系统现代化 {#news-15}

> 非官方社区项目amigaux.org计划继续开发Amiga Unix（Amix），面向经典68040、68060硬件及现代加速设备提供更新支持。

![Amiga Unix社区项目继续推进经典系统现代化](https://amigaux.org/img/amiga-unix-boxcover.svg)

Amix是Commodore为Amiga推出的System V Release 4，曾于1990年至1992年随A2500UX和A3000UX发布。

项目提供现代工具链、包管理器和新硬件驱动，并支持通过软盘、CD-ROM及模拟器镜像安装。

包管理器`apkg`可从pkg.amigaux.org安装软件，目前已提供`grep`、`gzip`、`less`、`patch`和`zlib`等工具。

项目已支持部分真实68040/68060硬件、Z3660加速器及A4091/A4092相关功能；RTG图形、X11R6.3、Mesa等仍在开发中。

[查看原文](https://amigaux.org/)

---

## 微软以约12万美元将Copilot运行时迁移至Rust {#news-16}

> GitHub Copilot及多个微软产品使用的软件运行时已从TypeScript迁移至Rust，迁移工作主要由AI代理完成。项目历时14.5周，AI令牌使用成本约为12万美元。

![微软以约12万美元将Copilot运行时迁移至Rust](https://image.theregister.com/5297581.jpg?imageId=5297581&x=0&y=0&cropw=100&croph=100&panox=0&panoy=0&panow=100&panoh=100&width=1200&height=683)

迁移过程中，AI代理将43万行TypeScript转换为80万行生产环境Rust代码，并产生了数十个回归问题。项目另耗费一名开发人员约三周时间，发布次数超过135次。

在特定基准测试中，TypeScript每秒完成7.55次单轮会话生命周期，进程内Rust每秒完成120次。相同场景下，Rust版本内存消耗为126MB，TypeScript为1383MB。

该运行时支持GitHub Copilot命令行界面、Copilot应用、SDK和GitHub Copilot云代理，并用于VS Code、Visual Studio、Excel、Outlook和PowerPoint等产品。

[查看原文](https://www.theregister.com/devops/2026/09/18/microsoft-agentically-ports-copilot-runtime-to-rust-for-120k/5297549)

---

## 团队尝试用软件工厂模式编排开发任务 {#news-17}

> 一位作者介绍了所在公司逐步采用 `Claude Code`、`Claude Cowork`、Linear 和 `Agent Fleet`，并尝试以软件工厂模式推进开发任务。

![团队尝试用软件工厂模式编排开发任务](https://lethain.com/static/author.png)

为缓解本地开发瓶颈，团队创建了约 10 个本地工作区，每个工作区都独立检出全部代码仓库，并以工作区而非单个仓库作为操作单位。

作者称，`Agent Fleet` 用于编排任务，其设计思路参考了 Stripe 的 Minions。软件工厂模式围绕宽泛目标循环运行，并依靠工具编排器推动目标进展。

作者首次实现了 `/linear-project-loop` 智能体技能，用于读取 Linear 项目、审计目标定义、检查指标和任务状态，并处理非阻塞任务。

该技能还会检查 Notion 项目目标文档，以及用于衡量进展的 Datadog 仪表板或 Snowflake 查询；如果缺少这些内容，则协助创建。作者表示，目前正在本地运行这一流程，预计将其迁移至同一编排式工具。

作者表示，“软件工厂”一词在 AI 语境中的来源归属仍有些混乱，并推测可能与 Justin McCarthy 于 2026 年 2 月发表的文章有关，但这一归属尚未确认。

[查看原文](https://lethain.com/software-factory-experiment/)

---

## 重新测试显示 Wild 链接器性能接近 Mold {#news-18}

> **Mold** 更新链接器基准测试并首次纳入 **Wild**，结果显示 Wild 明显慢于 Mold。作者重新统一测试条件后，部分项目的性能差距缩小，结果与 Mold 基准大致接近。

![重新测试显示 Wild 链接器性能接近 Mold](https://davidlattimore.github.io/images/benchmarks/clang-release-by-release.svg)

Mold 的测试使用运行 Ubuntu 24.04 的 64 核、128 线程 Threadripper，以及运行 Asahi Linux 的 Apple M1 Ultra。Wild 此前使用运行 Ubuntu 26.04 的 16 核、32 线程 Ryzen 9955hx。

两组测试在文件系统和输出文件处理方式上存在差异。Wild 通常在 tmpfs 上运行，Mold 使用 ext4；Mold 还会在每次调用链接器前删除输出文件。

作者将测试调整为使用 ext4、每次运行前删除输出文件，并传入 `--no-fork`。重新测试后，blender-debug 和 godot-debug 的 Wild/Mold 用时比均为 1.2 倍。

blender-release 的用时比为 0.9 倍，clang-release 为 1.0 倍。作者表示，考虑 CPU 架构、缓存大小和内存条件后，结果与 Mold 的结果大致接近。

[查看原文](https://davidlattimore.github.io/posts/2026/09/18/benchmarking-wild-vs-mold.html)

---

## Google研究员潜入TeamPCP调查软件供应链攻击 {#news-19}

> 文章称，黑客组织 **TeamPCP** 曾污染数百个开源程序并窃取开发者账户，持续实施软件供应链攻击。Google 表示，其一名研究人员曾进入该组织内部圈子，以监控活动并协助预警和干扰攻击。

据文章，**TeamPCP** 曾发布一个以《沙丘》为主题的自传播蠕虫，用于自动化相关攻击流程，并最终攻破超过一千家公司。

Google 威胁情报部门表示，卧底研究使其能够从组织内部监控攻击活动、警告潜在受害者，并协助干扰相关行动。

**Google Threat Intelligence Group** 研究员 Austin Larsen 将在 SentinelOne 的 LABScon 会议上介绍这项调查。文章称，Mandiant 一名卧底分析师也曾进入该组织核心圈层。

据 Larsen 说，Google 还根据一名 TeamPCP 成员被指存在的操作安全失误追踪线索，并向执法部门提供关键身份信息。文章同时指出，部分人员身份和相关指控尚未被最终确认。

[查看原文](https://arstechnica.com/security/2026/09/an-undercover-google-analyst-infiltrated-a-notorious-supply-chain-hacking-gang/)

---

## 谷歌推出面向AI代理的运行时零信任治理能力 {#news-20}

> **谷歌**文章介绍了如何借助 Gemini Enterprise Agent Platform，将 AI agent 的安全控制从构建时静态防护转向运行时动态治理。

平台提供三项托管防御能力：`Model Armor`、`Semantic Governance Policies` 和 `Agent Anomaly Detection`。

其中，`Model Armor` 用于筛查边缘提示词，`Semantic Governance Policies` 根据业务规则评估工具调用意图。

`Agent Anomaly Detection` 用于发现多轮攻击。将安全能力置于平台层后，管理员无需修改或重新部署 agent 底层代码，即可动态执行策略。

[查看原文](https://developers.googleblog.com/build-zero-trust-ai-agents-that-judge-intent-not-just-syntax/)

---

## 能源系统网络攻击风险上升人为因素仍是主要隐患 {#news-21}

> 文章称，能源系统早在人工智能可能引发大规模灾难的讨论之前，就已容易受到网络攻击，当前风险仍在上升。相关人士表示，能源系统一直在攻击者威胁下运行。

![能源系统网络攻击风险上升人为因素仍是主要隐患](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/akrales_220309_4977_0292.jpg?quality=90&strip=all&crop=0,0,100,100)

**Joshua Corman**表示，能源系统过去一直处于攻击者威胁之下，只是在攻击者能力范围内维持运行。

Corman是**Institute for Security and Technology**负责公共安全与韧性的驻会高管。

文章还提到，美国国土安全部曾警告伊朗相关行为者及其支持者可能对美国发动网络攻击。

文章关于近期失控人工智能事件的部分内容被截断，无法确认相关事件的具体细节。

[查看原文](https://www.theverge.com/science/997834/ai-cyberattack-energy-critical-infrastructure)

---

## Meta人工智能助手Muse首周下载超90万次 {#news-22}

> **Meta**推出的人工智能助手应用Muse可执行优惠搜索、服务预订和收件箱管理等任务。该应用可连接电子邮件、银行账户等数据源，并通过WhatsApp提供服务。

![Meta人工智能助手Muse首周下载超90万次](https://media.wired.com/photos/6aaa7e94f251bfe9554bf013/191:100/w_1280,c_limit/091626-Meta%20Muse.jpg)

Sensor Tower数据显示，Muse上线首周下载量超过90万次。文章正文在末尾截断，相关数据由Sensor Tower提供。

Muse通过虚拟机代表用户浏览互联网、执行搜索并点击网页。测试中，Muse访问Kahnfections网站，将一份含蒜泥蛋黄酱、切达奶酪、鸡蛋和培根的饼干三明治加入购物车。

完成购买需要用户通过Stripe添加信用卡，并在订单提交前进行最终确认。Meta发言人Emil Vazquez称，Muse配备内置保护措施和用户控制功能。

[查看原文](https://www.wired.com/story/metas-muse-is-better-at-surveilling-than-helping-me/)

---

## Google推出面向智能体任务的开放编排系统AX {#news-23}

> AX用于声明和大规模运行智能体任务，提供沙箱、工作区和网络隔离能力。系统支持单个任务运行，也支持组合多个任务。

![Google推出面向智能体任务的开放编排系统AX](https://agentexecutor.io/axolotl.svg)

AX提供Task、Workspace、Gateway和Model四个声明式基础组件。

其中，Task可在具备CPU和内存限制的沙箱中运行不受信任的智能体代码。

Workspace可配置Git仓库、MCP服务器和技能，并在任务启动前完成沙箱设置。

AX基于Agent Substrate运行，并支持任务暂停与恢复。产品方称，其可在每个集群扩展至数十亿个并发智能体会话，空闲智能体可在不到一秒内恢复；相关能力尚未有独立验证信息。

[查看原文](https://agentexecutor.io)

---

## ScrollEd尝试将教科书变成可滚动信息流 {#news-24}

> 帕洛阿尔托初创公司 **ScrollEd** 正尝试将教科书转换为类似 Instagram 的可滚动信息流。该信息流包含视频、音频和测验。

**ScrollEd** 由学生联合创始人兼夫妻 Utsav Gupta 和 Rebecca Neff 创立。

这家初创公司曾在 TechCrunch Disrupt 上进行展示。

[查看原文](https://techcrunch.com/2026/09/20/scrolled-wants-to-turn-textbooks-into-tiktok/)


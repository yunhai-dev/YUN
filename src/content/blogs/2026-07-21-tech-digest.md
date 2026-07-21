---
title: 科技早报 2026-07-21
category: "科技, 科技早报"
excerpt: 欧盟重罚AliExpress，国产大模型与智能体工具加速发展，WordPress和Hugging Face曝安全风险。
lastEdited: 2026年7月21日
tags: [科技早报, AliExpress, 欧盟数字服务法案, 大模型, AI智能体, 开源生态, 网络安全, Hugging Face]
imageUrl: 
---

## 概览

### 要闻

- [AliExpress因非法商品治理不力被欧盟罚5.5亿欧元](#news-1)
- [美国太空军将NSSL发射合同上限增至170亿美元](#news-2)
### AI 与机器学习

- [Moonshot与阿里发布新模型加码硅谷竞争](#news-3)
- [Cursor称新版代理群在SQLite构建测试中全面领先](#news-4)
- [法院批准Anthropic 15亿美元版权集体和解](#news-5)
- [Moonshot因GPU容量告急暂停Kimi K3新订阅](#news-6)
- [模拟招聘实验显示大模型更易形成群体偏见](#news-7)
- [模型上下文协议为AI连接外部服务提供统一方式](#news-8)
### GitHub 热门项目

- [OmniRoute登GitHub热榜：单端点接入500+AI模型](#news-9)
- [Cognee 登上 GitHub Trending，提供智能体长期记忆平台](#news-10)
- [AgentField 开源 AI 智能体控制平面项目](#news-11)
- [Dioxus 跨端框架在 GitHub 获 37k Star](#news-12)
- [llmfit 按本地硬件筛选适配大语言模型](#news-13)
- [AI Agent工程实践书籍项目获1.04万星](#news-14)
### 开源生态

- [Ray 2.55 引入对 Google Cloud TPU 的一等支持](#news-15)
- [Linux拟借助eBPF为可重定位二进制选择解释器](#news-16)
- [Nativ 宣称可在 Mac 本地运行前沿开源模型](#news-17)
- [GitHub 帖文称阿波罗登月相关源代码已开放](#news-18)
### 开发者工具

- [AI 编程进展焦点转向模型管理软件层，上下文框架受关注](#news-19)
- [谷歌开源推出本地测试 Chrome 扩展更新工具](#news-20)
### 安全与隐私

- [黑客利用WordPress已修补漏洞，数千万网站仍面临风险](#news-21)
- [Hugging Face确认内部数据集与服务凭证遭安全事件波及](#news-22)
- [ACLU发布工具包助力律师揭露警方监控技术](#news-23)
- [ActPlane研究称AI代理规则需上下文与分层执行](#news-24)
---

## AliExpress因非法商品治理不力被欧盟罚5.5亿欧元 {#news-1}

> **AliExpress**因违反欧盟《数字服务法案》（DSA）规则，被处以5.5亿欧元罚款，报道折合约6.29亿美元。

![AliExpress因非法商品治理不力被欧盟罚5.5亿欧元](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24814379/STK450_European_Union_01.jpg?quality=90&strip=all&crop=0,0,100,100)

欧洲委员会认定，**AliExpress**未采取有效措施减少非法产品的传播，且用于核查商品的人员配置不足。

欧洲委员会称，平台发现不安全玩具和危险化妆品后，数周内未将相关商品移除。

报道涉及的非法、有害或违规商品包括仿冒服装、不安全玩具及危险化妆品。

报道指出，这笔罚款超过**Temu**因类似DSA违规所受处罚的两倍。

[查看原文](https://www.theverge.com/policy/967802/aliexpress-eu-dsa-fine-illegal-products)

---

## 美国太空军将NSSL发射合同上限增至170亿美元 {#news-2}

> 美国太空军将一项国家安全太空发射（NSSL）合同的最高金额扩大至 170 亿美元，约为此前 56 亿美元的三倍。合同扩张释放出五角大楼对军用卫星发射需求上升的信号。

`NSSL` 项目允许负责太空军发射项目的太空系统司令部，从发射服务商池中为单项任务选择供应商。

`Lane 1` 覆盖风险容忍度较高的任务，包括搭载实验载荷的中型运载发射和拼车发射任务。

`Lane 2` 覆盖优先级更高的战略任务，包括大型高价值间谍卫星，以及可在核战争中存活的抗辐射通信卫星发射。

[查看原文](https://arstechnica.com/science/2026/07/the-space-force-is-now-seeking-to-buy-up-to-30-billion-in-rocket-launches/)

---

## Moonshot与阿里发布新模型加码硅谷竞争 {#news-3}

> **Moonshot AI**与**阿里巴巴**相继发布新AI模型，宣称能以较低成本与美国顶尖模型竞争。

![Moonshot与阿里发布新模型加码硅谷竞争](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/gettyimages-2286623351.jpg?quality=90&strip=all&crop=0,0,100,100)

总部位于北京的**Moonshot AI**于周五发布`Kimi K3`模型。

**Moonshot**声称，在其自身测试中`Kimi K3`持续高于几乎所有美国系统，仅落后于**OpenAI**。

文章称，**Moonshot**和**阿里巴巴**宣称其模型能与**OpenAI**和**Anthropic**最好的模型竞争。

这些发布被描述为中国主要AI公司加大对硅谷竞争压力。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/967781/chinese-ai-models-open-source-moonshot-kimi-k3-alibaba-qwen)

---

## Cursor称新版代理群在SQLite构建测试中全面领先 {#news-4}

> **Cursor** 称，其新版长时间运行代理群在从零构建 SQLite 的对比实验中，所有模型配置均优于旧版方案。使用 `Grok 4.5` 时，新版在四小时内达到 80% 测试通过率。

![Cursor称新版代理群在SQLite构建测试中全面领先](https://ptht05hbb1ssoooe.public.blob.vercel-storage.com/assets/blog/swarm-og.png)

Cursor 此前曾试验多代理协作完成目标，旗舰概念验证项目是从零构建网页浏览器的长时间运行代理群。该项目取得成功，但尚未达到成熟软件水平。

该公司让旧版和新版代理群在相同模型及时间预算下，从 SQLite 文档出发，以 Rust 重建 SQLite；结果以保留 SQL 测试套件的通过比例衡量。

Cursor 称，使用 `Grok 4.5` 时，新版代理群四小时内达到 80%，旧版则在第二小时之前失控并被暂停。上述实验结果由 Cursor 自述。

该架构包括负责拆分、委派任务的规划代理，以及负责执行任务的工作代理。前者由最强模型驱动，后者通常使用更快、更便宜的模型。

Cursor 表示，不同模型分工组合的产出质量接近但成本差异较大；其已内部用于发现并修复开源漏洞、提高测试覆盖率及生成合成训练数据。

[查看原文](https://cursor.com/blog/agent-swarm-model-economics)

---

## 法院批准Anthropic 15亿美元版权集体和解 {#news-5}

> 美国加州北区联邦地区法院最终批准**Anthropic**就集体版权诉讼达成的15亿美元和解协议。该协议预计覆盖约50万部作品，权利人每部作品可获3000美元赔付。

![法院批准Anthropic 15亿美元版权集体和解](https://techcrunch.com/wp-content/uploads/2026/06/Claude-photo.jpg?w=1024)

法官Araceli Martinez-Olguin于周一最终批准和解。此前，法官William Alsup曾裁定Anthropic非法下载并存储数百万本受版权保护图书。

Alsup同时裁定，使用受版权保护文本训练AI模型属于合理使用；但从**Library Genesis**和**Pirate Library Mirror**等盗版网站下载图书的方式违法。

Anthropic在盗版问题可能进入审判后同意和解，以避免陪审团可能裁定的损害赔偿。和解后不会上诉，因此该地区法院裁定不构成具有约束力的先例。

**Google**、**Meta**、**Midjourney**和**OpenAI**仍面临相关版权诉讼。出版商和作者近期也起诉Google，指控其以版权作品训练`Gemini`。

[查看原文](https://techcrunch.com/2026/07/20/anthropics-landmark-1-5b-copyright-settlement-is-approved/)

---

## Moonshot因GPU容量告急暂停Kimi K3新订阅 {#news-6}

> **Moonshot** 暂时停止销售 `Kimi K3` 的新订阅服务。该公司称，需求在48小时内几乎耗尽其GPU容量。

![Moonshot因GPU容量告急暂停Kimi K3新订阅](https://the-decoder.com/wp-content/uploads/2026/06/kimi_logo.png)

**Moonshot** 表示，`Kimi K3` 新订阅服务暂停的原因是短时间内需求激增，GPU计算资源接近耗尽。

公司计划调整并拆分现有订阅模式，以更均衡地分配计算能力。

[查看原文](https://the-decoder.com/moonshot-pauses-new-kimi-k3-subscriptions-after-gpu-demand-maxes-out-in-48-hours/)

---

## 模拟招聘实验显示大模型更易形成群体偏见 {#news-7}

> 普林斯顿大学和芝加哥大学研究发现，在模拟招聘游戏中，大语言模型比人类更容易形成不同虚构族群间的岗位分隔。该结果来自模拟实验，文中未说明其对现实招聘的直接适用程度。

研究人员让包括 **ChatGPT**、**Claude** 和 **Gemini** 在内的大语言模型参与模拟招聘游戏，并与人类参与者比较。

模型需在40轮招聘中，为20种岗位挑选来自Tufa、Aima、Reku和Weki四个虚构族群的候选人。所有候选人在各岗位上的成功概率相同。

模型会根据早期招聘结果，迅速将不同族群候选人分配到不同类型的工作中，形成岗位分隔。

在原始研究的隔离度量表中，人类得分为0.84，模型得分约高65%；**OpenAI** 推理模型 `o3` 得分为1.83，接近最高可能值。

研究论文于7月在首尔举行的 `ICML` 会议发表。

[查看原文](https://www.technologyreview.com/2026/07/20/1140655/ai-biases-hiring-humans/)

---

## 模型上下文协议为AI连接外部服务提供统一方式 {#news-8}

> 模型上下文协议（MCP）被视为实现 AI 互操作性的基础构件之一。该协议可让 AI 模型以安全方式访问外部数据源与服务。

模型上下文协议 `MCP` 可使聊天机器人访问日历、数据库或内部工具等外部资源。

这一协议旨在避免工程师为每一项外部连接分别构建定制化接口。

[查看原文](https://techcrunch.com/2026/07/20/ais-most-important-protocol-is-getting-a-little-bit-easier-to-use/)

---

## OmniRoute登GitHub热榜：单端点接入500+AI模型 {#news-9}

> **diegosouzapw/OmniRoute** 是一个基于 `TypeScript` 构建的免费 MIT AI 网关，旨在通过单一端点统一接入海量 AI 服务。

该项目目前已在 GitHub 获得 20,636 颗星，单日新增 1,343 颗星。它提供单一端点接入 268+ 个提供商和 500+ 个模型。

网关支持 **Claude**、**GPT**、**Gemini**、`Kimi K3`、**GLM** 和 **DeepSeek** 等主流模型，并兼容 **Claude Code**、**Codex**、**Cursor**、**Cline** 和 **Copilot** 等开发工具。

此外，该项目由 500+ 名贡献者共同构建，具备配额感知自动故障转移和 RTK+Caveman 压缩等功能。

[查看原文](https://github.com/diegosouzapw/OmniRoute)

---

## Cognee 登上 GitHub Trending，提供智能体长期记忆平台 {#news-10}

> **Cognee** 是一个登上 GitHub Trending 的 Python 项目，被描述为面向 AI 智能体的开源记忆平台。该项目通过自托管知识图谱引擎，帮助智能体跨会话保留长期记忆。

GitHub 仓库 **topoteretes/cognee** 使用 Python 开发，目前拥有 28,563 个 Star。

该仓库当日新增趋势 Star 数为 303。

**Cognee** 提供自托管知识图谱引擎，目标是让 AI 智能体能够跨会话保留持久的长期记忆。

[查看原文](https://github.com/topoteretes/cognee)

---

## AgentField 开源 AI 智能体控制平面项目 {#news-11}

> **AgentField** 是用于构建可供技术栈其他服务调用的 AI 智能体的开源控制平面。开发者可用 Python、Go 或 TypeScript 编写智能体逻辑。

![AgentField 开源 AI 智能体控制平面项目](https://repository-images.githubusercontent.com/1089925776/3700130d-7442-4142-9b49-dd7a7db007eb)

项目将智能体逻辑作为生产基础设施能力提供，覆盖路由、协调、记忆、异步执行和可观测性。

**AgentField** 称每个函数都会成为一个 REST 端点，控制平面负责处理扇出、队列和重试。

项目称，同一代码可从笔记本电脑上的一个智能体扩展至单个工作流中的一万个智能体。

该项目提供 Python、Go、TypeScript SDK 与 REST API，并称可通过安装脚本在 **Claude Code**、**Codex**、**Gemini CLI** 等工具中使用。

[查看原文](https://github.com/Agent-Field/agentfield)

---

## Dioxus 跨端框架在 GitHub 获 37k Star {#news-12}

> DioxusLabs/dioxus 号称可基于单一代码库构建 Web、桌面和移动应用。

![Dioxus 跨端框架在 GitHub 获 37k Star](https://opengraph.githubassets.com/cb39d692ae4a81b647d1c6e1a8e0a5e39641bc5a3841b35b390d52482aeddc7a/DioxusLabs/dioxus)

仓库显示约 37.2k 个 Star 与 1.7k 个 Fork，提供零配置设置与热重载。

框架基于 signals 管理状态，可通过 Server Functions 增加后端能力。

官方 CLI 支持打包到 Web、macOS、Linux 和 Windows，并与 axum 深度集成。

内置能力包括 WebSockets、SSE、流式传输、服务端渲染、表单、中间件与热重载等。

[查看原文](https://github.com/DioxusLabs/dioxus)

---

## llmfit 按本地硬件筛选适配大语言模型 {#news-13}

> 终端工具 **llmfit** 可根据系统内存、CPU 和 GPU，为用户选择合适规模的大语言模型。它会从质量、速度、适配度和上下文等维度对模型评分。

![llmfit 按本地硬件筛选适配大语言模型](https://opengraph.githubassets.com/9584b188ea3b41217e975eaf62b87a98a4bcb3544a7218de936429ad7ac035ea/AlexsJones/llmfit)

**llmfit** 提供交互式 TUI 并默认使用该界面，同时保留经典 CLI 模式。

项目称支持多 GPU、混合专家（MoE）架构、动态量化选择及速度估算。

工具支持 **Ollama**、`llama.cpp`、**MLX**、**Docker Model Runner** 和 **LM Studio** 等本地运行时。

通过 `llmfit bench --share`，用户可测量硬件实际 token/s，并可经由 PR 贡献测试结果。结果会先保存在本地，用户可跳过共享或稍后上传。

[查看原文](https://github.com/AlexsJones/llmfit)

---

## AI Agent工程实践书籍项目获1.04万星 {#news-14}

> GitHub公开仓库**bojieli/ai-agent-book**收录《深入理解 AI Agent：设计原理与工程实践》及配套代码，页面显示已获10.4k Star。项目提供10章内容和88个配套实验。

![AI Agent工程实践书籍项目获1.04万星](https://opengraph.githubassets.com/6b3bf01575bbc189b7148daac1ffc09174890bef949caec789ac07749ee2dc9c/bojieli/ai-agent-book)

该项目将Agent概括为“LLM + 上下文 + 工具”，全书内容围绕这一框架展开，并包含正文、配图、PDF及代码。

书中覆盖上下文工程、用户记忆与知识库、工具、Coding Agent、评估、模型后训练、自我进化、多模态、实时交互和多Agent协作等主题。

仓库页面显示项目有976 Fork和374次提交。88个实验中，70多个可独立运行。

项目提供中文、英文、泰米尔语和越南语版本。社区贡献的非中文译本可能滞后于中文原版；编译PDF可在`book`目录运行`bash build_pdf.sh`。

[查看原文](https://github.com/bojieli/ai-agent-book)

---

## Ray 2.55 引入对 Google Cloud TPU 的一等支持 {#news-15}

> Ray 2.55 正式为 Google Cloud TPU 提供官方一等支持，开发者可继续使用 Ray task 与 actor API 在 TPU 上运行分布式 Python 工作负载。

多主机 TPU "slice" 需要通过 Inter-Chip Interconnect（ICI）保持互联，硬件拓扑被显式纳入调度考量。

在 GKE 上，KubeRay Operator 会自动预置底层硬件并打上拓扑标签。

Ray Core 提供 `slice_placement_group()` 原语，可一次性预留整块 TPU slice。

开发者可在 KubeRay、Ray Train 或 Ray Serve 中声明如 "4x4" 的拓扑，无需编写自定义放置代码。

整体目标是让 Ray 训练与服务在 TPU 上的部署更接近"开箱即用"。

[查看原文](https://developers.googleblog.com/run-ray-on-tpu-part-1-the-foundations/)

---

## Linux拟借助eBPF为可重定位二进制选择解释器 {#news-16}

> 一组面向`binfmt_misc`的补丁拟通过`eBPF`可编程选择解释器，以支持Nix等可重定位二进制用例。文中称，补丁预计将在近期进入Linux内核`-next`分支。

作者在TacoSprint 2026期间尝试解决Nix可重定位二进制问题，最初提议在`PT_INTERP`和shebang中支持`$ORIGIN`，并计划直接在VFS中实现。

VFS维护者Christian Brauner回应称，询问修改理由，并提出让支持进入子系统的可能路径。John Ericson则建议通过`binfmt_misc`中的`eBPF`以可编程方式选择解释器。

Christian Brauner随后给出首个方案草案，邮件列表讨论后形成补丁集。文中示例显示，`eBPF`程序可检查ELF文件、从二进制路径派生加载器位置，并通过`bpf_binprm_set_interp`设置解释器。

该机制也面向**Buck**、**Bazel**等用例。补丁进入`-next`分支仍是原文所称的近期计划，尚非已完成合入。

[查看原文](https://fzakaria.com/2026/07/20/linux-kernel-will-support-origin-sort-of)

---

## Nativ 宣称可在 Mac 本地运行前沿开源模型 {#news-17}

> **Nativ** 是一款面向 Mac 的本地 AI 模型运行应用，支持 Apple Silicon `M1` 及后续芯片。其页面称，项目采用 MIT 许可证，并无需账户、订阅或云服务。

![Nativ 宣称可在 Mac 本地运行前沿开源模型](https://blaizzy.github.io/nativ/assets/app-icon.png)

**Nativ** 使用 `MLX-VLM`，并针对 M 系列芯片的统一内存与 Metal 进行调优。

页面列出的合作模型包括 Google 的 **Gemma 4 E2B Instruct**、Cohere 的 **North Mini Code**，以及 Liquid AI 的 **LFM2.5-VL 1.6B**。

该应用提供流式响应及单条消息性能指标，可显示 `tokens/sec`、内存压力、热状态和首 token 时间等遥测信息。

Nativ 称，本地模型端点可连接至 **Pi**、**Codex**、**Claude Code**、**Hermes** 与 **OpenCode** 等编码代理工具。

有关 100% 开源、永久免费、无云服务和本地生成的表述，均来自 Nativ 页面自身声明。

[查看原文](https://blaizzy.github.io/nativ/)

---

## GitHub 帖文称阿波罗登月相关源代码已开放 {#news-18}

> **GitHub** 帖文称，帮助人类首次登月的相关源代码已可在 GitHub 获取。**Margaret Hamilton** 曾领导 MIT 的阿波罗机载飞行软件团队。

![GitHub 帖文称阿波罗登月相关源代码已开放](https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:sydgpvanh46u766n536r33oa/bafkreifoesiyrvnogaen4pp5yh4mnqf3x5ogyexpufndqzn5w4aipe32dy)

帖文以“57 年前的当天，人类首次登上月球”为背景，提及与登月任务相关的源代码现已托管在 GitHub 上。

据帖文介绍，Margaret Hamilton 领导了负责开发阿波罗机载飞行软件的 MIT 团队。

帖文配图署名为 **Draper Laboratory**，由 Adam Cuerden 修复，并注明经由 Wikimedia Commons 提供。

[查看原文](https://bsky.app/profile/github.com/post/3mr3ohpzppc23)

---

## AI 编程进展焦点转向模型管理软件层，上下文框架受关注 {#news-19}

> 文章认为，AI 辅助开发的许多近期进展发生在管理模型的软件层面，而不只是模型本身。

文章指出，当前存在大量 AI 编程应用，大语言模型及其支持的智能体已变得令人印象深刻。

作者曾与 **Anthropic** 的 **Claude Code** 产品负责人 Cat Wu 交流该公司构建此类软件的方法。

**Augment Code** 的 Vinay Perneti 也谈及了模型、开发工具框架（harness）和上下文等话题。

[查看原文](https://arstechnica.com/ai/2026/07/beyond-grep-the-case-for-a-context-rich-ai-coding-harness/)

---

## 谷歌开源推出本地测试 Chrome 扩展更新工具 {#news-20}

> **Google Open Source** 发布 `Extension Update Testing Tool`，帮助开发者在发布前于本地模拟并验证 Chrome 扩展更新流程。

`Extension Update Testing Tool` 面向 Chrome 扩展开发者，用于测试扩展更新过程。

开发者可在正式发布前于本地模拟和验证更新流程。

该工具的获取渠道为其 GitHub 页面。

[查看原文](https://bsky.app/profile/opensource.google/post/3mr3rf6an272y)

---

## 黑客利用WordPress已修补漏洞，数千万网站仍面临风险 {#news-21}

> 多家安全公司警告黑客正在现实环境中利用WordPress近期修补的严重漏洞，受影响版本网站数量可能高达数千万。

![黑客利用WordPress已修补漏洞，数千万网站仍面临风险](https://techcrunch.com/wp-content/uploads/2024/09/wordpress-v1.jpg?resize=1200,675)

多家网络安全公司称，黑客正在入侵运行存在漏洞版本**WordPress**的网站。**WordPress**上周修复了两个严重安全漏洞，并敦促网站运营者"立即"更新。

**Patchstack**、**Hexastrike**和**WatchTowr**均警告称，黑客正在现实环境中利用这些漏洞。受影响版本为`6.9.0`至`6.9.4`以及`7.0.0`至`7.0.1`。

**WordPress**官方统计显示，运行这些存在漏洞版本的网站超过4亿个，但该统计可能未反映近期已修复的网站。

网络安全顾问Daniel Card在约4,200个**WordPress**网站样本中估计，易受攻击的网站比例低于15%，推算互联网中易受攻击网站仍可能约9,000万个。

Searchlight Cyber的Adam Kues发现并报告了其中一个被称为`WP2Shell`的严重漏洞；该漏洞与另一个漏洞配合时，可让黑客完全远程控制易受攻击的网站。

[查看原文](https://techcrunch.com/2026/07/20/hackers-are-exploiting-recently-patched-wordpress-bugs-putting-millions-of-websites-at-risk/)

---

## Hugging Face确认内部数据集与服务凭证遭安全事件波及 {#news-22}

> **Hugging Face**确认，上周一次黑客攻击导致其内部数据集和服务凭证泄露或遭入侵。该公司正调查客户或合作伙伴数据是否被窃取。

![Hugging Face确认内部数据集与服务凭证遭安全事件波及](https://techcrunch.com/wp-content/uploads/2026/07/hugging-face-2219339362.jpg?resize=1200,800)

该公司于周五披露事件，称攻击者通过上传至平台的数据集利用漏洞，在服务器上运行恶意代码，继而提升权限并扩大对内部系统的访问。

**Hugging Face**表示，已修复被利用的漏洞，并撤销及轮换了被访问的失窃凭证。公司敦促用户轮换存放在平台上的访问令牌或密钥，并检查账户可疑活动。

公司称，异常检测系统发现了此次攻击，并利用AI模型分析记录攻击过程的服务器日志。最初使用未具名商业提供商的前沿AI模型，但受其安全护栏限制，后改用本地大语言模型。

**Hugging Face**已向执法部门报告，并聘请网络安全取证专家调查入侵和审查安全状况。关于客户或合作伙伴数据是否被窃取，调查仍在进行。

[查看原文](https://techcrunch.com/2026/07/20/hugging-face-confirms-breach-affected-internal-datasets-and-credentials-urges-users-to-take-action/)

---

## ACLU发布工具包助力律师揭露警方监控技术 {#news-23}

> 美国马萨诸塞州**公民自由联盟**发布面向刑事辩护律师的在线工具包，旨在揭露警方秘密使用监控技术办案。

![ACLU发布工具包助力律师揭露警方监控技术](https://media.wired.com/photos/6a5acafd563e2d24f14f6f9a/191:100/w_1280,c_limit/GettyImages-2265184860.jpg)

该工具包包含法律动议，经法官批准后可迫使检察官披露是否使用了面部识别、车牌阅读器等监控技术。

这些动议通过受密码保护的库分发给已验证的辩护律师。

申请基于1963年确立的美国刑法规则，即检察官必须交出所有可能有助于辩护的证据。

该项目旨在应对警方采用新监控工具与法院最终裁定其是否合法之间的长期滞后问题。

[查看原文](https://www.wired.com/story/the-aclu-is-arming-lawyers-to-expose-state-surveillance-secrets/)

---

## ActPlane研究称AI代理规则需上下文与分层执行 {#news-24}

> ActPlane 对 64 个热门代码仓库的研究显示，代理指令中 64% 属于约束具体操作的政策，36% 为架构说明等上下文信息。研究认为，代理规则的处理需要兼顾上下文与分层执行。

![ActPlane研究称AI代理规则需上下文与分层执行](https://eunomia.dev/og/default.png)

该研究分析了含 `CLAUDE.md` 和 `AGENTS.md` 的 64 个热门仓库，快照日期为 2026 年 5 月 23 日；这些仓库的 GitHub 星标数中位数为 2 万。

研究覆盖 84 个指令文件、2,116 条独立陈述，并通过两阶段、由 LLM 代理辅助的流程提取内容，记录内容类型、主题、执行级别与上下文需求等标签。

验证脚本检查源文件覆盖完整性及原文片段匹配；`Claude` 与 `Codex` 两个独立代理进行了交叉检查。研究还分层抽取 100 条陈述进行人工审查。

按研究统计，2,116 条陈述中，64% 是要求、禁止或条件约束代理操作的政策；36% 是架构说明、项目背景等描述性上下文。

70.1% 的受分析仓库中，政策类陈述多于描述性陈述。人工审查确认标签正确的说法，以及执行覆盖范围的结论，均基于该研究的分析范围。

[查看原文](https://eunomia.dev/blog/2026/07/15/ebpf-ai-agent-policy-enforcement/)


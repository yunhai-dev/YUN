---
title: 科技早报 2026-08-15
category: "科技, 科技早报"
excerpt: 智谱与阿里发布开放权重模型，OpenAI加速推理服务，CRISPR物种保护研究与macOS漏洞利用受关注。
lastEdited: 2026年8月15日
tags: [科技早报, 开放权重模型, 智谱AI, Qwen, OpenAI, CRISPR, 网络安全]
imageUrl: 
---

## 概览

### 要闻

- [CRISPR去除Y染色体研究探索物种保护用途](#news-1)
- [dGTEx建立健康儿童组织基因表达数据库](#news-2)
### AI 与机器学习

- [智谱AI发布`GLM-5.3`，计划两周后开源权重](#news-3)
- [阿里 Qwen 发布 270 亿参数 Qwen 3.8 开放权重模型](#news-4)
- [OpenAI推出Ultrafast模式，GPT-5.6 Sol速率达750 token/秒](#news-5)
- [Qwen发布27B FP8权重，原生支持图像视频理解](#news-6)
- [Anthropic 测试 Claude Code 承担软件日常维护](#news-7)
- [OpenAI与Anthropic降价应对中国AI竞争](#news-8)
### GitHub 热门项目

- [OpenHands 推出可自托管的 Agent Canvas 控制中心](#news-9)
- [Rust代码编辑器Zed获8.86万Star，当日新增104星](#news-10)
- [Microsandbox以微型虚拟机隔离不受信任工作负载](#news-11)
- [TokenHub 以企业私有网关统一 AI 模型访问治理](#news-12)
- [SpiderFoot 自动化 OSINT 用于威胁情报与攻击面映射](#news-13)
- [Rust 项目 Macro 登上 GitHub 热门，主打团队统一工作空间](#news-14)
### 开源生态

- [RayforceDB 以纯 C 实现分析与图数据库一体化引擎](#news-15)
- [Tim O’Reilly呼吁开放覆盖AI全技术栈](#news-16)
- [团队称已在Linux与BGP实现IPv8草案规范](#news-17)
### 开发者工具

- [Kukuroo提供支持iOS的自托管网页推送Worker](#news-18)
- [sandbox.bio推出可嵌入网页的实时Linux终端](#news-19)
- [MIB Viewer上线在线SNMP MIB文件浏览与上传工具](#news-20)
### 安全与隐私

- [macOS屏幕共享漏洞遭主动利用植入挖矿程序](#news-21)
- [OpenAI Computer History记录Mac操作并供ChatGPT检索](#news-22)
- [Google 推出 HEIR 工具推进加密数据私有 AI 推理](#news-23)
- [DecryptAds 免费服务关联广告技术数据，协助识别追踪方](#news-24)
---

## CRISPR去除Y染色体研究探索物种保护用途 {#news-1}

> 研究人员利用基于`CRISPR`的方法去除雄性小鼠胚胎的Y染色体，并制成雌性克隆小鼠。研究团队认为，这一方法可能为濒危物种保护提供帮助。

山梨大学的**Takashi Ishiuchi**与理化学研究所生物资源研究中心的**Shogo Matoba**共同参与该研究。所得雌性克隆小鼠与雄性小鼠在遗传上基本相同，但不含Y染色体。

两人认为，该方法尤其可能适用于某些物种仅剩少数个体的情形。但克隆仍需要另一动物提供卵细胞，并由代孕动物承担妊娠。

克隆技术此前已用于复制具有理想性状的家畜及已故宠物，相关宠物克隆费用可达数万美元，部分生物伦理学家对此持反对意见。

圣迭戈动物园的“冷冻动物园”保存超过1300个物种的细胞样本；冷冻组织已协助克隆黑足鼬和普氏野马等濒危动物。

2009年，西班牙研究人员报告利用冷冻保存十年的皮肤细胞，克隆出已灭绝的比利牛斯野山羊。

[查看原文](https://www.technologyreview.com/2026/08/14/1141919/cloning-save-species-or-make-human-organ-sacks/)

---

## dGTEx建立健康儿童组织基因表达数据库 {#news-2}

> **Deanne Taylor**推动将儿童纳入人类细胞图谱相关研究，并参与建设`dGTEx`健康儿童组织数据库。该项目拟建立儿童基因表达基线，补足成人研究难以覆盖的数据。

![dGTEx建立健康儿童组织基因表达数据库](https://wp.technologyreview.com/wp-content/uploads/2026/08/HLY_5999.jpg?w=840)

Taylor是费城儿童医院生物信息学主任。她指出，儿童细胞的基因表达不同于成人，这可能使儿童对成人可耐受药物产生截然不同、甚至致命的反应。

2017年，她获悉人类细胞图谱项目当时仅计划研究成年人，随后加入其志愿者团队，协助撰写儿童相关内容，并组织跨医院儿科研究人员联盟参与。

Taylor牵头完成2019年论文，阐述儿童研究的必要性，以争取更多领域关注和资金。

2021年，美国国立卫生研究院向发育基因型—组织表达项目`dGTEx`提供3850万美元资助，用于建立首个综合性健康儿童组织数据库。

`dGTEx`收集经父母同意捐献的健康儿童遗体样本，绘制主要器官系统的基因表达。Taylor团队负责整理家族史和样本细节等信息，相关数据计划输入人类细胞图谱儿科部分，整合时间尚未说明。

[查看原文](https://www.technologyreview.com/2026/08/14/1141354/deanne-taylor-gene-expression-children/)

---

## 智谱AI发布`GLM-5.3`，计划两周后开源权重 {#news-3}

> **智谱AI**发布`GLM-5.3`，并称其在自有基准测试中是能力最强的开放权重编程模型。该公司计划在两周后开源模型权重。

![智谱AI发布`GLM-5.3`，计划两周后开源权重](https://the-decoder.com/wp-content/uploads/2026/04/zhipu-ai-logo-wall.jpg)

**智谱AI**称，`GLM-5.3`仅通过后训练，相较前代模型实现50%的提升；上述排名与提升幅度均基于其自身基准测试。

该模型接受了网络安全训练。报道指出，`GLM-5.3`曾帮助安全团队在269个项目中发现2436个漏洞。

模型权重开源时间为计划安排，仍有待后续落实。

[查看原文](https://the-decoder.com/zhipu-ai-releases-glm-5-3-claims-its-the-strongest-open-weights-coding-model/)

---

## 阿里 Qwen 发布 270 亿参数 Qwen 3.8 开放权重模型 {#news-4}

> **阿里巴巴 Qwen 团队**发布 `Qwen 3.8` 开放模型权重，采用 Apache 2.0 许可证。该稠密模型拥有 270 亿参数，原生支持最长 26.2 万个 token 上下文。

![阿里 Qwen 发布 270 亿参数 Qwen 3.8 开放权重模型](https://the-decoder.com/wp-content/uploads/2026/08/qwen_logo-2.png)

`Qwen 3.8` 面向构建本地应用和基于智能体应用的开发者发布开放权重。

文中所述模型为 270 亿参数稠密模型，可原生处理最多 26.2 万个 token 的上下文。

文章称，该模型旨在在编程和办公任务上优于规模更大的 `Qwen 3.7 Plus`。

关于其在编程与办公任务上的表现，文章仅描述了设计目标，未提供具体评测结果。

[查看原文](https://the-decoder.com/alibabas-qwen-team-releases-qwen-3-8-models-with-open-weights-under-the-apache-2-0-license/)

---

## OpenAI推出Ultrafast模式，GPT-5.6 Sol速率达750 token/秒 {#news-5}

> **OpenAI** 正推出名为“Ultrafast”的新推理模式，可使 `GPT-5.6 Sol` 输出速度最高达到每秒 750 个 `token`。

![OpenAI推出Ultrafast模式，GPT-5.6 Sol速率达750 token/秒](https://the-decoder.com/wp-content/uploads/2026/08/openai_ultrafast.png)

Ultrafast 由 **Cerebras** 硬件提供支持，相关硬件来自 OpenAI 与 Cerebras 规模为 100 亿美元的合作。

Ultrafast 将与“Standard”和“Fast”共同构成三档服务或定价层级。

这三档设置将推理速度作为独立的产品因素。

[查看原文](https://the-decoder.com/gpt-5-6-sol-goes-14x-faster-as-openai-launches-ultrafast-mode-powered-by-cerebras/)

---

## Qwen发布27B FP8权重，原生支持图像视频理解 {#news-6}

> **Qwen3.8-27B-FP8** 已提供后训练模型的 FP8 量化权重及 Hugging Face Transformers 配置文件。该模型具备视觉编码器，原生支持图像与视频理解。

![Qwen发布27B FP8权重，原生支持图像视频理解](https://cdn-thumbnails.huggingface.co/social-thumbnails/models/Qwen/Qwen3.8-27B-FP8.png)

**Qwen3.8-27B** 是一款 270 亿参数的因果语言模型，采用块大小为 `128` 的细粒度 FP8 量化。原文称，其性能指标与原始模型近乎相同。

相关文件兼容 Hugging Face Transformers、`vLLM`、`SGLang` 和 `TokenSpeed` 等工具。

模型默认启用思考模式，用户可按请求关闭；`reasoning_effort` 可调整推理深度，`preserve_thinking` 可保留历史消息中的推理上下文。

该模型原生上下文长度为 `262,144` 个 token。**Qwen Cloud** 计划推出托管版本，包含默认 100 万上下文长度及官方内置工具等功能，但原文发布时尚未上线。

[查看原文](https://huggingface.co/Qwen/Qwen3.8-27B-FP8)

---

## Anthropic 测试 Claude Code 承担软件日常维护 {#news-7}

> **Anthropic** 正测试让 **Claude Code** 负责自有应用的日常维护工作。数周内，该工具创建的 388 个拉取请求中，46% 经人工审查后获合并。

![Anthropic 测试 Claude Code 承担软件日常维护](https://the-decoder.com/wp-content/uploads/2026/08/claude_logo-1.png)

测试任务包括崩溃模糊测试，以及移除软件中的死代码。

数周内，`Claude Code` 共创建 388 个拉取请求，其中 46% 在人工审查后被合并。

`Claude Code` 发明者 **Boris Cherny** 将结果称为这一能力“可能实现”的早期迹象。

**Anthropic** 仍在测试 `Claude Code` 承担日常维护工作的能力，相关代码变更仍需人工审查。

[查看原文](https://the-decoder.com/claude-code-now-runs-daily-maintenance-on-anthropics-software-with-a-46-percent-merge-rate/)

---

## OpenAI与Anthropic降价应对中国AI竞争 {#news-8}

> 报道称，美国AI实验室正推出更低价模型，以留住关注成本的企业客户。**OpenAI**称已将`GPT-5.6 Luna`价格下调80%，**Anthropic**则发布定价为`Fable 5`一半的`Claude Opus 5`。

报道称，企业持续攀升的AI账单正促使其削减使用量，并寻找价格更低的模型选择。

**Moonshot**、**DeepSeek**等中国开发商的低价替代产品，据报道正在获得从硅谷到欧洲的用户。

**OpenAI**将`GPT-5.6 Luna`称为“最快、最实惠的模型”；其价格和能力定位为公司声明。

**Anthropic**称`Claude Opus 5`具备前沿智能，价格为其最强模型`Fable 5`的一半；相关定位为公司声明。

[查看原文](https://arstechnica.com/ai/2026/08/openai-and-anthropic-in-price-war-as-chinese-ai-rivals-gain-ground/)

---

## OpenHands 推出可自托管的 Agent Canvas 控制中心 {#news-9}

> **OpenHands** 将 Agent Canvas 定位为面向编程代理与自动化任务的自托管开发者控制中心。该工具默认运行在本地机器，可接入多类代理后端。

![OpenHands 推出可自托管的 Agent Canvas 控制中心](https://opengraph.githubassets.com/03cf9a437bce2c781511fe2f70bf8bc61be5cae7cab5278f9359e04946565b89/OpenHands/OpenHands)

Agent Canvas 可运行 **OpenHands**、`Claude Code`、`Codex`、`Gemini` 及任何兼容 `ACP` 的代理。

用户可通过该工具发起对话和自动化日常任务，例如生成并发布至 **Slack** 的报告，或将 **GitHub** 议题自动拆分为任务。

README 称，代理可自托管于本地、`Docker`、虚拟机，或任何能够运行代理服务器后端的环境。

除开源 **OpenHands** 代理外，工具也支持 `Claude Code`、`Codex` 等第三方代理。用户还可选择 **OpenHands Cloud** 或 **OpenHands Enterprise** 基础设施运行代理。

[查看原文](https://github.com/OpenHands/OpenHands)

---

## Rust代码编辑器Zed获8.86万Star，当日新增104星 {#news-10}

> GitHub项目**zed-industries/zed**累计获得88,613颗Star，当天新增104颗。**Zed**是一款以高性能和多人协作为特点的代码编辑器。

**Zed**使用`Rust`开发，由**Atom**和**Tree-sitter**的创作者打造。

该项目主打高性能代码编辑与多人协作能力，仓库为`zed-industries/zed`。

[查看原文](https://github.com/zed-industries/zed)

---

## Microsandbox以微型虚拟机隔离不受信任工作负载 {#news-11}

> 开源项目**Microsandbox**可在本地快速运行微型虚拟机，用于承载AI代理、用户代码、插件等不受信任的工作负载。

![Microsandbox以微型虚拟机隔离不受信任工作负载](https://opengraph.githubassets.com/5e9b860e242a2fefd410817e1010a7580554d890b929d6c66382c2d1de3996f2/superradcompany/microsandbox)

项目宣称通过`microVM`技术提供硬件级隔离，并支持Linux、macOS和Windows。

它可运行Docker Hub、GHCR等OCI注册表中的标准容器镜像，并提供`Rust SDK`、`Python SDK`、`TypeScript SDK`、`Go SDK`及`CLI`。

README称其平均启动时间低于100毫秒。macOS要求Apple Silicon，Linux需启用KVM，Windows需启用WHP。

**Microsandbox**目前仍处于beta阶段，项目提示可能存在破坏性变更、功能缺失及其他不完善之处。

[查看原文](https://github.com/superradcompany/microsandbox)

---

## TokenHub 以企业私有网关统一 AI 模型访问治理 {#news-12}

> **TokenHub** 是一个面向企业的私有网关，旨在统一 AI 模型访问与治理。项目称可让每个请求具备可控、可追踪和可归属的特性。

GitHub 仓库 **astaxie/TokenHub** 使用 Go 语言开发。

该项目目前获得 1,062 颗 Star，当天新增 56 颗 Star。

项目定位为企业私有网关，用于统一管理 AI 模型的访问与治理。

[查看原文](https://github.com/astaxie/TokenHub)

---

## SpiderFoot 自动化 OSINT 用于威胁情报与攻击面映射 {#news-13}

> **SpiderFoot** 是一款自动化开源情报（OSINT）工具，可用于威胁情报和攻击面映射。该项目当天新增 283 颗 GitHub Star。

GitHub 仓库 **smicallef/spiderfoot** 使用 Python 语言开发。

该项目目前获得 20,772 颗 Star，当天新增 283 颗 Star。

其功能定位包括自动化开源情报收集，以及支持威胁情报和攻击面映射。

[查看原文](https://github.com/smicallef/spiderfoot)

---

## Rust 项目 Macro 登上 GitHub 热门，主打团队统一工作空间 {#news-14}

> **Macro** 是一个使用 Rust 开发的 GitHub Trending 项目，定位为整合团队协作工具的统一工作空间。页面显示，该仓库累计获得 2,815 个 Star，当天新增 1,239 个 Star。

**Macro** 将电子邮件、聊天、文档、任务、智能体、通话和 CRM 等功能整合在同一工作空间中。

项目介绍称，各类功能可通过 `@` 链接关联，并配备共享的 AI 记忆。

该仓库使用 Rust 语言开发。

[查看原文](https://github.com/macro-inc/macro)

---

## RayforceDB 以纯 C 实现分析与图数据库一体化引擎 {#news-15}

> 开源项目 **RayforceDB** 发布纯 C 编写、零外部依赖的分析与图数据库引擎。项目将列式分析、图遍历和递归查询整合至可嵌入的执行管线。

![RayforceDB 以纯 C 实现分析与图数据库一体化引擎](https://rayforcedb.com/assets/logo-light-full.svg)

**RayforceDB** 称可将关系运算符与图遍历放入同一个执行计划，并对整个工作负载进行重写优化。

项目采用 `Rayfall` 语言，同时提供 `Rayfall`、Python 和 C API，三种接口共用同一优化器与执行核心。

项目页面称，其代码规模约为 1.6 万行聚焦的 C 代码，采用 MIT 许可证，并支持嵌入式使用及内置 IPC 客户端/服务器传输。

列式分析能力包括向量化过滤、连接、分组、窗口、透视与时间序列原语；图引擎支持 CSR 遍历、最短路径、中心性、社区、WCO 连接和 HNSW。

页面将 **Rayforce Cloud** 标为“Soon”，但未说明具体发布时间。

[查看原文](https://rayforcedb.com/)

---

## Tim O’Reilly呼吁开放覆盖AI全技术栈 {#news-16}

> 技术出版人Tim O’Reilly主张，AI应创造多于获取的价值，开放也不应仅限于公开模型权重。他认为大型AI实验室押注最大模型的方向，未必符合实际使用需求。

![Tim O’Reilly呼吁开放覆盖AI全技术栈](https://media.wired.com/photos/6a7e0548f5b7635ce53f5f77/191:100/w_1280,c_limit/Backchannel-Tim-Orielly-Business.jpg)

O’Reilly倡导开放源代码AI，并认为开放应覆盖整个AI系统技术栈，而不仅是公开神经网络权重。

他主张清晰分离模型、`harness`与应用，使用户能够嵌入自身功能和控制方式。

O’Reilly认为，超大规模云服务商正试图像20世纪90年代的**微软**一样，将用户锁定在自身产品中。

文中以`Claude`作为大型模型的例子。关于`Fable`和`Sol`写作能力不及较低级模型的说法属于O’Reilly观点，**Anthropic**和**OpenAI**表示不同意。

[查看原文](https://www.wired.com/story/tech-visionary-says-the-big-ai-labs-dont-get-what-people-want/)

---

## 团队称已在Linux与BGP实现IPv8草案规范 {#news-17}

> goonhost.rocks 团队称，已依据 IPv8 Internet-Draft `draft-thain-ipv8-02` 完成规范实现，并开展多自治系统网络测试。相关实现与测试结果均为文章作者陈述。

文章称，其 `Linux Kernel 6.6` 实现新增原生 `AF_INET8`（地址族 46），支持 `TCP8`、`UDP8` 和 `RAW8`。

其 `Musl Libc` 实现加入 `sockaddr_in8`、`inet_pton8`、`inet_ntop8`、`getaddrinfo()` 和 `getnameinfo()` 等功能。

文章还称，**FRRouting** 实现包含支持 IPv8 路由对等及路由交换的 `BGP8` 守护进程。

测试环境由 10 个 QEMU 节点和 4 个自治系统构成，加载超过 112,000 条活跃 FIB 路由；隔离沙箱中的 Nginx 访问返回 `HTTP/1.1 200 OK`。

[查看原文](https://goonhost.rocks/blog/implementing-ipv8-internet-draft)

---

## Kukuroo提供支持iOS的自托管网页推送Worker {#news-18}

> **Kukuroo**将自身描述为可自托管的网页推送`Worker`，并称可在iOS上使用。该项目基于一个**Cloudflare Worker**和一个KV命名空间，无需维护持续运行的服务器。

![Kukuroo提供支持iOS的自托管网页推送Worker](https://kukuroo.cc/og.png)

Kukuroo称，密钥保留在用户自己的`Worker`中，推送负载会加密至设备。其HTTP接口可通过`curl`向`/push/send`发送通知。

项目提供`npx kukuroo init my-push`命令，用于写入`Worker`、生成并安装密钥、配置存储及部署。

Kukuroo仅支持**Cloudflare Workers**，不提供Docker镜像、二进制程序或其他托管环境。

设备注册需使用Safari；iOS设备需为18.4或更高版本，且须将页面添加至主屏幕并从图标打开。页面称免费计划可用于个人部署，具体额度受其列出的条件限制。

[查看原文](https://kukuroo.cc/)

---

## sandbox.bio推出可嵌入网页的实时Linux终端 {#news-19}

> **sandbox.bio**提供可嵌入网站及博客文章的实时Linux终端。开发者可通过一段`script`脚本在页面中加入终端环境。

![sandbox.bio推出可嵌入网页的实时Linux终端](https://sandbox.bio/assets/features/embed.png)

网页可添加`<script src="https://sandbox.bio/embed.js" data-cwd="embed"></script>`，以嵌入实时Linux终端。

脚本标签的`data-cwd`属性可设置终端启动工作目录，`data-config`属性则可指定远程配置文件URL。

在**GitHub Pages**中，标记为`bash`的Markdown代码块会获得“Run”按钮，可直接在嵌入终端执行。HTML网站中，`class`为`language-bash`的`div`也会获得该按钮。

配置文件的`files`数组可预加载文件，并可为每个文件设定来源URL及其在终端中的路径。

[查看原文](https://sandbox.bio/training/embed)

---

## MIB Viewer上线在线SNMP MIB文件浏览与上传工具 {#news-20}

> **MIB Viewer** 提供在线 SNMP MIB 文件树状浏览，并支持用户上传自有 MIB 文件。页面当前显示共收录 11,931 个 MIB。

用户可通过拖放或选择文件上传 MIB，支持 `.mib`、`.txt` 和 `.my` 格式。

平台以树状视图呈现 SNMP MIB 文件，并列出常用的 `SNMPv2-MIB`、`IF-MIB`、`IP-MIB` 等条目。

页面还展示 `HOST-RESOURCES-MIB`、`ENTITY-MIB`、`A10-AX-CGN-MIB` 及大量 A3COM-HUAWEI 系列 MIB。

页面称共有 11,931 个 MIB，目前展示其中 200 个；原文未说明这些数据的更新时间。

[查看原文](https://mib-viewer.com/)

---

## macOS屏幕共享漏洞遭主动利用植入挖矿程序 {#news-21}

> 荷兰国家网络安全中心警告，高危 `macOS` 漏洞 `CVE-2026-65400` 正遭主动利用，部分受影响系统被获取root权限并植入门罗币挖矿程序。

该漏洞严重性评分为7.1分，源于 `macOS` 屏幕共享功能中的状态管理缺陷，可使攻击者执行恶意代码。

该机构表示，多个互联网可访问5900端口的系统出现漏洞滥用情况，均发现root权限被获取及挖矿程序植入。

屏幕共享功能可让远程方在设备开启时查看屏幕，并控制键盘和鼠标。**Apple** 上周已为 `macOS Tahoe`、`Sequoia` 和 `Sonoma` 发布补丁。

报道未说明受影响系统的总数量。

[查看原文](https://arstechnica.com/security/2026/08/vulnerability-giving-attackers-full-control-of-macs-is-under-active-exploitation/)

---

## OpenAI Computer History记录Mac操作并供ChatGPT检索 {#news-22}

> **OpenAI** 的 **Computer History** 可在 Mac 上记录点击、键盘输入和应用切换，并生成可由 **ChatGPT** 与 `Codex` 搜索的时间线。相关数据以未加密的 Markdown 文件存储在本地。

![OpenAI Computer History记录Mac操作并供ChatGPT检索](https://the-decoder.com/wp-content/uploads/2026/08/computer_history.png)

**Computer History** 将用户在 Mac 上的点击、键盘输入及应用切换记录转换为可搜索的时间线，供 **ChatGPT** 和 `Codex` 使用。

OpenAI 表示，Computer History 所记录的数据不会用于人工智能训练。

不过，用于对话的记忆内容仍可能最终成为训练数据，相关数据边界需区分看待。

[查看原文](https://the-decoder.com/openais-computer-history-turns-your-clicks-and-keystrokes-into-a-searchable-chatgpt-memory-timeline/)

---

## Google 推出 HEIR 工具推进加密数据私有 AI 推理 {#news-23}

> **Google** 在 Private Computing Toolkit 中新增开源工具 **HEIR**，用于通过同态加密支持私有 AI 推理。该工具可将原先处理明文数据的预训练模型转换为处理加密输入的模型。

![Google 推出 HEIR 工具推进加密数据私有 AI 推理](https://blog.google/static/blogv2/images/google-1000x1000.png?version=pr20260729-1718)

**HEIR** 全称为 `Homomorphic Encryption Intermediate Representation`，是面向同态加密的开源编译器工具链和开发平台。

同态加密允许服务器直接处理加密数据，并返回加密结果，过程中无需暴露底层信息。

Google 表示，手动将现有程序高效转换为同态加密程序通常需要密码学团队；HEIR 旨在降低这一过程的开发门槛。

Google 将同态加密与差分隐私、私有集合成员资格、私有信息检索及 Google Cloud 安全飞地一并纳入私有计算工具包。

文章称同态加密成本正快速下降，并提出将 HEIR 打造成“一键式”方案的愿景，但未披露具体成本数据或时间表。

[查看原文](https://blog.google/security/how-google-is-making-private-ai-practical-with-homomorphic-encryption/)

---

## DecryptAds 免费服务关联广告技术数据，协助识别追踪方 {#news-24}

> **DecryptAds** 推出免费服务，通过抓取和关联广告技术公开数据，帮助用户了解投放广告或收集数据的相关实体。其数据覆盖网站和应用公开提供的多类广告技术文件。

![DecryptAds 免费服务关联广告技术数据，协助识别追踪方](https://krebsonsecurity.com/wp-content/uploads/2026/08/decryptads-ESPN.png)

decryptads.com 表示，服务会持续抓取公开文件，披露获准投放广告或收集用户数据的公司。

其使用 `ads.txt`、`app-ads.txt`、`buyers.json` 与 `sellers.json` 等文件，涉及广告技术公司、数据经纪商及广告库存交易实体。

对 `espn.com` 的一次查询显示，其 `ads.txt` 和 `app-ads.txt` 列出 143 个广告合作伙伴，以及 19 个注册数据经纪商域名。

该服务可用于追踪恶意广告来源、识别位于对抗性国家的广告网络，并发现 AI 生成的低质量网站和应用。

DecryptAds 首席研究官 Zach Edwards 同时担任安全公司 **Infoblox** 的威胁研究员；加州、俄勒冈、得州和佛蒙特州近期已通过数据经纪商注册法律。

[查看原文](https://krebsonsecurity.com/2026/08/whos-tracking-you-use-this-new-service-to-find-out/)


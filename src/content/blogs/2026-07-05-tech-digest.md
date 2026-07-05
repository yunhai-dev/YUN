---
title: 科技早报 2026-07-05
category: "科技, 科技早报"
excerpt: NASA 发射 Link 航天器救援 Swift 观测站，Google 发布 DiffusionGemma 与 ARD 规范，阿里开源 page-agent 等登 GitHub 热榜。
lastEdited: 2026年7月5日
tags: [科技早报, NASA, Google, AI, GitHub, 开源, 安全漏洞, 开发者工具]
imageUrl: 
---

## 概览

### 要闻

- [NASA 紧急发射 Link 航天器,试图抬升 Swift 观测站轨道](#news-1)
### AI 与机器学习

- [Google 发布实验性扩散模型 DiffusionGemma 开发者指南](#news-2)
- [更强模型却带不动工具调用？作者实测 Anthropic 新版](#news-3)
- [Mistral 开源 Leanstral 1.5 擅长形式化数学并可发现代码 bug](#news-4)
- [Gemma 4 12B 登陆笔记本,主打本地智能体工作流](#news-5)
- [Google 发布 ARD 开放规范，面向 AI 能力发现与验证](#news-6)
- [Google ADK 与 A2A 协议：构建跨语言多代理团队](#news-7)
### GitHub 热门项目

- [GitHub 热门：ChromeDevTools 推出面向编程代理的 MCP 服务器](#news-8)
- [GitHub 热门：agentskills 定义 AI 智能体技能开放格式](#news-9)
- [GitHub Trending 项目 strix：开源 AI 渗透测试工具](#news-10)
- [阿里开源 page-agent：用自然语言直接操控网页界面](#news-11)
- [GitHub 热门：Trivy 持续在漏洞扫描领域保持 Trending 状态](#news-12)
- [GitHub 热门：哈佛 cs249r 机器学习系统教材获 26.6k Star](#news-13)
### 开源生态

- [Google 开源 Genkit 推出 Agents API 简化对话式 AI 管道](#news-14)
- [开源工具 pxpipe 将文本藏入 PNG，可降低 Claude Code 调用成本](#news-15)
### 开发者工具

- [Google Cloud Workbench 扩展登陆 VS Code：本地 IDE 直连云端 Jupyter](#news-16)
- [Google 推出 Colab CLI,支持本地终端连接远程环境](#news-17)
- [RidgeText 用内存图层降低 LLM 负载，地图交互仅靠 SMS](#news-18)
- [Google 官方解读 ADK 2.0 设计思路与升级理由](#news-19)
### 安全与隐私

- [研究：AirDrop 与 Quick Share 近距离传输协议曝出六项漏洞](#news-20)
- [苹果 Hide My Email 被曝漏洞，可泄露用户真实邮箱](#news-21)
- [Google 为 Sign in with Google 新增会话元数据声明](#news-22)
### 产品与平台

- [Google Pay 升级:引入通用商务协议与代理支付能力](#news-23)
- [Google Pay 为 Android 原生应用新增动态回调结账功能](#news-24)
---

## NASA 紧急发射 Link 航天器,试图抬升 Swift 观测站轨道 {#news-1}

> Swift Observatory 自 2004 年升空以来轨道持续下降,近期太阳风暴进一步降低其轨道,NASA 委托 Katalyst Space Technologies 发射 Link 航天器尝试救援。

![NASA 紧急发射 Link 航天器,试图抬升 Swift 观测站轨道](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/Testing-Link-Vibration-tests-2_4000x2600.jpg?quality=90&strip=all&crop=0,0,100,100)

Link 航天器已于周五发射,目标是在轨拦截 **Swift** 并抬升其轨道。

Swift 自身无推进系统,目前飞行高度约 224 英里。

任务计划通过三臂航天器将其轨道高度提升约 150 英里,回到原始位置。

拦截和变轨操作受速度限制影响,具有一定操作风险,任务成功与否尚未得到确认。

[查看原文](https://www.theverge.com/science/961459/nasa-emergency-save-swift-observatory-katalyst-space-technologies)

---

## Google 发布实验性扩散模型 DiffusionGemma 开发者指南 {#news-2}

> Google 发布基于 Gemma 4 架构的实验性扩散语言模型 DiffusionGemma，采用并行去噪生成方式。

DiffusionGemma 通过迭代去噪并行生成和优化 256-token 的块,取代逐 token 的自回归生成方式。

该模型支持在消费级 GPU 上部署,并已集成 `vLLM` 等主流推理框架。

在 Sudoku 等复杂约束任务上,DiffusionGemma 表现优于传统语言模型。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## 更强模型却带不动工具调用？作者实测 Anthropic 新版 {#news-3}

> 开发者 Armin Ronacher 在博客中称，Anthropic 新版 Claude 模型在调用 Pi 工具时存在参数幻觉问题。

![更强模型却带不动工具调用？作者实测 Anthropic 新版](https://lucumr.pocoo.org/social/2026-07-04-better-models-worse-tools-social.png)

Ronacher 在调试 Pi 编辑工具时发现，Opus 4.8 和 Sonnet 5 会向嵌套的 `edits[]` 数组中加入自行编造的字段。

由于生成参数与工具 schema 不匹配，Pi 拒绝该调用并要求重试；旧版本模型未出现此问题。

文章指出 LLM 工具调用本质上是基于文本的带内信令，模型在收到工具列表后发出类似调用的文本。

Anthropic 使用 ANTML 标记格式化工具调用，相关标记曾泄露到公开通信中，文章称具体机制未公开，相关描述为推测。

[查看原文](https://lucumr.pocoo.org/2026/7/4/better-models-worse-tools/)

---

## Mistral 开源 Leanstral 1.5 擅长形式化数学并可发现代码 bug {#news-4}

> Mistral AI 发布开源模型 Leanstral 1.5，定位同时覆盖数学形式化与代码缺陷发现两个方向。在对 57 个开源代码仓库的扫描中，该模型发现了 5 个此前未知的 bug。

![Mistral 开源 Leanstral 1.5 擅长形式化数学并可发现代码 bug](https://the-decoder.com/wp-content/uploads/2026/07/mistral_ai-3.png)

Leanstral 1.5 用于 Lean 4 中的形式化验证（formal verification）。

该模型在形式化数学基准测试中表现优异。

在扫描 57 个开源代码仓库时，发现了 5 个此前未知的 bug。

Mistral AI 将其定位为同时面向数学形式化与代码缺陷发现的开源模型。

[查看原文](https://the-decoder.com/mistrals-open-source-leanstral-1-5-aces-formal-math-benchmarks-and-catches-real-bugs-in-code/)

---

## Gemma 4 12B 登陆笔记本,主打本地智能体工作流 {#news-5}

> Google DeepMind 推出的 Gemma 4 12B 已在 16GB RAM 笔记本上实现本地运行。

Gemma 4 12B 支持本地数据处理与可视化洞察生成,无需依赖云端服务。

macOS 用户可通过 Google AI Edge Gallery 使用该模型进行 Python 代码执行与可视化。

Google AI Edge Eloquent 提供完全离线的语音听写与文本编辑功能。

`LiteRT-LM` CLI 新增 serve 命令,可创建行业兼容的本地端点。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## Google 发布 ARD 开放规范，面向 AI 能力发现与验证 {#news-6}

> Google 宣布 Agentic Resource Discovery（ARD）开放规范，用于跨网络发布、发现和验证 AI 能力。

![Google 发布 ARD 开放规范，面向 AI 能力发现与验证](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_Generated_Image_gzxwoagzxw.2e16d0ba.fill-1200x600.jpg)

Google 于 2026 年 6 月 17 日发布 ARD，作者署名包括 Junjie Bu 与 Srinivas Krishnan。

ARD 由 Google 与 agent 生态系统的合作伙伴共同开发。

其架构依赖两个原语：`catalogs`（资源目录）与 `registries`（注册中心）。

各组织在其自有域名下发布 `catalogs`，以域名所有权作为身份与信任的加密基础。

`registries` 则充当 agentic web 的搜索引擎，对发布的 `catalogs` 进行抓取和索引。

完整的协议格式与签名机制等技术细节尚未在公告中披露。

[查看原文](https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/)

---

## Google ADK 与 A2A 协议：构建跨语言多代理团队 {#news-7}

> Google 开发者博客演示用 ADK 与 A2A 协议编排 Python 与 Go 代理，构成跨语言合同合规管道。

![Google ADK 与 A2A 协议：构建跨语言多代理团队](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner.2e16d0ba.fill-1200x600.jpg)

示例中 Python 代理调用 Gemini 解析合同条款，Go 代理以确定性逻辑（不调用 LLM）验证条款合规性。

两个服务通过 Agent2Agent（A2A）协议相连，由 Google 的 Agent Development Kit（ADK）进行编排。

ADK 提供 RemoteA2aAgent 抽象，可将远程 A2A 兼容服务转换成本地子代理。

文章将单体代理在生产中失败的原因归为上下文退化、爆炸半径过大与难以测试，完整源代码已在 GitHub 开放。

[查看原文](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)

---

## GitHub 热门：ChromeDevTools 推出面向编程代理的 MCP 服务器 {#news-8}

> ChromeDevTools 在 GitHub 上推出 chrome-devtools-mcp，作为面向编程代理的 Chrome DevTools，使 AI 编程助手可通过 MCP 服务器访问 DevTools 能力。

![GitHub 热门：ChromeDevTools 推出面向编程代理的 MCP 服务器](https://opengraph.githubassets.com/e53da1fe74ea246d2c6b06e47468387b42538b0276802c1417b2af656219d181/ChromeDevTools/chrome-devtools-mcp)

该仓库为 TypeScript 项目，作为 Model-Context-Protocol（MCP）服务器运行，支持 Antigravity、Claude、Cursor、Copilot 等编程代理，并额外提供 CLI 用法。

项目正式支持 Google Chrome 与 Chrome for Testing，对其他基于 Chromium 内核的浏览器不保证行为一致。

性能工具可能将 trace URL 发送至 Google CrUX API，以获取真实用户体验数据。

仓库 Star 数约 45.8k，Fork 数约 3k，主分支为 main，共有 970 次提交。

[查看原文](https://github.com/ChromeDevTools/chrome-devtools-mcp)

---

## GitHub 热门：agentskills 定义 AI 智能体技能开放格式 {#news-9}

> agentskills/agentskills 仓库累计 22.4k Star，提出用于扩展 AI 智能体的 Agent Skills 开放格式。

![GitHub 热门：agentskills 定义 AI 智能体技能开放格式](https://opengraph.githubassets.com/fd99e0e7b94a84dcf7c2a51b39465180c993947dcec6836b2403d3405d02d4fe/agentskills/agentskills)

Agent Skills 以文件夹形式打包，核心文件为 SKILL.md，包含名称、描述等元数据与执行指令。

技能可捆绑脚本、参考资料、模板等资源，供智能体在任务中调用。

智能体通过 Discovery、Activation、Execution 三阶段渐进式披露使用技能。

该格式最初由 Anthropic 开发并作为开放标准发布。

[查看原文](https://github.com/agentskills/agentskills)

---

## GitHub Trending 项目 strix：开源 AI 渗透测试工具 {#news-10}

> GitHub Trending 上的 Python 仓库 usestrix/strix 已获得 36,145 个 Star，主打开源 AI 渗透测试。

项目自我定位为开源 AI 渗透测试工具，用于查找和修复应用程序中的漏洞。

截至统计时刻，仓库当日新增 1,904 个 Star。

项目发布信息显示，发布时间为 2026 年 7 月 5 日。

[查看原文](https://github.com/usestrix/strix)

---

## 阿里开源 page-agent：用自然语言直接操控网页界面 {#news-11}

> 阿里巴巴在 GitHub 发布 TypeScript 项目 alibaba/page-agent，主打用自然语言控制网页内的 GUI 操作。

![阿里开源 page-agent：用自然语言直接操控网页界面](https://repository-images.githubusercontent.com/1062458369/4f9a1671-3953-4f45-8a8e-b010e33520bc)

仓库显示约 23.2k Star、2k Fork，main 分支累计 1,085 次提交。

定位为"页面内 GUI 代理"，支持文本式 DOM 操作，不依赖截图或多模态大模型。

可通过 npm 安装，演示 CDN 提供 jsDelivr 与 npmmirror（中国）镜像。

当前演示版本为 page-agent@1.11.0，示例默认模型为 qwen3.5-plus，以阿里云 DashScope 兼容模式调用。

部分细节来自页面元数据，正文加载存在错误，数据可能有出入。

[查看原文](https://github.com/alibaba/page-agent)

---

## GitHub 热门：Trivy 持续在漏洞扫描领域保持 Trending 状态 {#news-12}

> 开源安全扫描工具 Trivy 当天新增 10 个 Star 并登上 Trending，支持容器、Kubernetes、代码仓库与云服务等目标。

该项目由 aquasecurity 开源，使用 Go 语言编写，用于发现漏洞、配置错误、敏感信息以及生成 SBOM（软件物料清单）。

扫描范围覆盖容器、Kubernetes、代码仓库、云服务等多种环境。

仓库累计 Star 数达 36,725 个。

[查看原文](https://github.com/aquasecurity/trivy)

---

## GitHub 热门：哈佛 cs249r 机器学习系统教材获 26.6k Star {#news-13}

> harvard-edge/cs249r_book 仓库达 26.6k Star，整合 Textbook、TinyTorch 等组件作为 ML Systems 课程资源。

![GitHub 热门：哈佛 cs249r 机器学习系统教材获 26.6k Star](https://opengraph.githubassets.com/352be40e2916b6c54439b29a92678818c1ee3dd33444e6aa01edc7cfb31057a5/harvard-edge/cs249r_book)

项目与哈佛 CS249r 课程对应，主仓库默认分支为 dev，提交数 18,913。

README 提供英语、中文、日文、韩文等多语言版本。

项目硬装版教材计划于 2026 年由 MIT Press 出版。

项目方设定的目标包括本年度帮助 100,000 名学习者、2030 年达到 100 万人。

[查看原文](https://github.com/harvard-edge/cs249r_book)

---

## Google 开源 Genkit 推出 Agents API 简化对话式 AI 管道 {#news-14}

> 开源框架 **Genkit** 推出 **Agents API**，将消息历史、工具循环与流式传输封装到单一接口，降低对话式 AI 开发复杂度。

Agents API 支持由服务器或客户端管理的灵活状态持久化，便于历史分支、长时任务分离与多代理协调。

通过统一的 wire protocol，API 可将后端无缝连接到前端。

Agents API 目前以预览版提供，支持 `TypeScript` 与 `Go`。

该 API 与 Genkit Developer UI 集成，允许不写客户端代码即可测试、调试并检查智能体快照。

[查看原文](https://developers.googleblog.com/build-agentic-full-stack-apps-with-genkit/)

---

## 开源工具 pxpipe 将文本藏入 PNG，可降低 Claude Code 调用成本 {#news-15}

> 开发者 Steven Chong 开源工具 `pxpipe`，把长文本转为 PNG 图像以调用 `Claude Code`，报告节省 59% 至 70% 成本。

![开源工具 pxpipe 将文本藏入 PNG，可降低 Claude Code 调用成本](https://the-decoder.com/wp-content/uploads/2026/07/text_to_image_compression_title.png)

`pxpipe` 将 `Claude Code` 的长提示文本转换为紧凑的 PNG 图像。

其原理利用 **Anthropic** 按图像像素而非文本内容计费的计费方式。

开发者表示此举可削减 59% 至 70% 的调用费用。

但相应代价是准确率与响应速度有所下降。

[查看原文](https://the-decoder.com/open-source-tool-pxpipe-hides-text-in-pngs-to-cut-claude-code-and-fable-5-token-costs-up-to-70/)

---

## Google Cloud Workbench 扩展登陆 VS Code：本地 IDE 直连云端 Jupyter {#news-16}

> Google 正式发布适用于 VS Code 的 Google Cloud Workbench Notebooks 扩展，可将本地 IDE 连接到云端 Jupyter 环境。

该扩展支持本地 VS Code 与可扩展的云端 Jupyter 环境直连，旨在减少机器学习开发中的上下文切换。

开发者可直接访问 Google Cloud 的高性能基础设施，以加速机器学习生命周期管理。

新扩展完全开源，已上架 GitHub 和 VS Code Marketplace，供开发者获取与贡献。

[查看原文](https://developers.googleblog.com/ml-development-in-vs-code-with-google-cloud-power-workbench-extension-now-available/)

---

## Google 推出 Colab CLI,支持本地终端连接远程环境 {#news-17}

> Google 推出 `Google Colab CLI`,让开发者与 AI 智能体可在本地终端连接远程 Colab runtime。

Colab CLI 支持申请高性能 GPU,并可在远程环境运行本地 Python 脚本。

该工具可用于检索 artifact 日志或模型,例如微调后的 Gemma 3 适配器。

Antigravity、`Claude Code` 等 AI 智能体也可调用 Colab CLI。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## RidgeText 用内存图层降低 LLM 负载，地图交互仅靠 SMS {#news-18}

> RidgeText 构建了一个兼容 Mapbox 的地图合成器，其中 LLM 仅编排图层而无需处理 GeoJSON，用户交互完全通过 SMS 完成，不依赖应用或 UI。

![RidgeText 用内存图层降低 LLM 负载，地图交互仅靠 SMS](https://ridgetext.com/blog/mapbox-llm-composition/fire-perimeter-trail.jpg)

方案将每个数据获取工具的结果存放在服务器端，仅向 LLM 返回轻量确认信息以保持上下文窗口较小。

一个普通 wildfire 数据集为 50–500KB 的原始 GeoJSON，500KB 约对应 125,000 tokens。

LLM 调用 `generate_map` 后返回的是 `mapUrl`，GeoJSON 仅存储在服务器内存中。

正文在描述 GeoJSON 存储位置时被截断，相关细节（如服务器内存管理具体实现）不完整。

[查看原文](https://ridgetext.com/blog/mapbox-llm-composition)

---

## Google 官方解读 ADK 2.0 设计思路与升级理由 {#news-19}

> Google 开发者博客发文《Why we built ADK 2.0》，说明新版本的设计理由与功能特性。

文章直接回答了「为什么构建 ADK 2.0」这一问题，并介绍其新增功能与改进点。

文章面向开发者解释了为何应考虑升级到 ADK 2.0，并给出相应理由。

该文计划在 ADK Go 2.0 上线后第二天发布，以便同步传达版本信息。

[查看原文](https://developers.googleblog.com/why-we-built-adk-20/)

---

## 研究：AirDrop 与 Quick Share 近距离传输协议曝出六项漏洞 {#news-20}

> 研究者通过逆向与协议模糊测试，在 Apple AirDrop 与 Android Quick Share 中发现六处漏洞，影响逾 50 亿台设备。

![研究：AirDrop 与 Quick Share 近距离传输协议曝出六项漏洞](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png)

论文《Protocol Prying》由 Arash Ale Ebrahim 与 Nils Ole Tippenhauer 撰写，提交至 arXiv:2606.26967。

作者通过二进制分析重建了 **AirDrop** 七层状态机及其 DVZip 自适应压缩流程。

他们构建了协议感知模糊测试器 **AIRFUZZ**，对压缩前表示进行变异以触发缺陷。

研究在 **macOS/iOS AirDrop**、**Samsung Quick Share** 与 **Google Quick Share for Windows** 中识别出 V1 至 V6 共六个漏洞。

所有发现均已负责任披露，**Apple**、**Samsung**、**Google** 均已确认报告，**Google** 为 V6 颁发了漏洞赏金。

[查看原文](https://arxiv.org/abs/2606.26967)

---

## 苹果 Hide My Email 被曝漏洞，可泄露用户真实邮箱 {#news-21}

> 安全研究员发现苹果 Hide My Email 服务存在漏洞，测试中 100% 的转发地址可被用于暴露用户真实邮箱。

![苹果 Hide My Email 被曝漏洞，可泄露用户真实邮箱](https://media.wired.com/photos/6a459c14043fba997ea26852/191:100/w_1280,c_limit/security_roudnup_GettyImages-1157988186.jpg)

苹果于 2021 年推出 Hide My Email，用于生成随机邮箱并转发至个人邮箱，原设计目的是保护用户隐私。

研究员 Tyler Murphy 于 2025 年 6 月发现该漏洞，他与 404 Media 的测试显示 100% 的相关地址可被利用。

Murphy 已于 2025 年夏天向苹果报告此问题，初期被告知将在 2026 年 3 月前修复。

苹果最近表示仍在调查该问题，且未对 404 Media 的置评请求作出回应。

漏洞的具体技术细节因尚未修复而未公开披露。

[查看原文](https://www.wired.com/story/security-roundup-apples-hide-my-email-service-fails-to-hide-your-email/)

---

## Google 为 Sign in with Google 新增会话元数据声明 {#news-22}

> Google 在 Sign in with Google 中引入新的 OIDC 标准声明，为开发者提供更深入的会话元数据。

新增的声明包括 `auth_time` 和 `amr`（Authentication Methods Reference）。

经过验证的应用可验证用户登录的"新鲜度"。

应用还可识别具体身份验证方式，如 **MFA** 或硬件密钥。

这些联合身份信号支持基于风险的动态控制，有助于防范账户接管与欺诈。

[查看原文](https://developers.googleblog.com/enhance-security-and-trust-new-session-metadata-in-sign-in-with-google/)

---

## Google Pay 升级:引入通用商务协议与代理支付能力 {#news-23}

> Google Pay 正在向 agentic commerce 方向演进,引入 Universal Commerce Protocol,并推出新 MCP 服务器支持 AI 代理管理集成。

Android 更新加入动态回调(dynamic callbacks),以实现无缝快速结账体验。

通过 WebViews 将支付支持扩展到社交媒体应用中,提升场景覆盖。

平台推出跨设备生物特征认证,以及面向商家降低摩擦的交易信号。

[查看原文](https://developers.googleblog.com/the-latest-updates-to-google-pay/)

---

## Google Pay 为 Android 原生应用新增动态回调结账功能 {#news-24}

> Google 在 Android 原生应用中为 Google Pay Express checkout 引入 Dynamic Callbacks，便于实时调整运费、税费等订单信息。

![Google Pay 为 Android 原生应用新增动态回调结账功能](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/64hUBg8v5KEHEW6_2.2e16d0ba.fill-1200x600.png)

支持 `onPaymentDataChanged` 与 `onPaymentAuthorized` 两类回调，可在支付流程中动态更新运费选项、税费与总价。

开发者可通过继承 `BasePaymentDataCallbacks` 来处理回调事件。

该功能需要使用 `play-services-wallet` 20.0.0 及更高版本。

该更新由 Google Developer Relations 与产品团队的工程师共同介绍。

[查看原文](https://developers.googleblog.com/enhancing-android-checkout-with-dynamic-callbacks-in-google-pay/)


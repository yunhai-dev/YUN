---
title: 科技早报 2026-07-07
category: "科技, 科技早报"
excerpt: 腾讯开源Hy3大模型、Anthropic披露Claude内部J-space表征，谷歌推出TPU Hub与扩散式文本模型DiffusionGemma。
lastEdited: 2026年7月7日
tags: [科技早报, 腾讯Hy3, Anthropic, Google, 大语言模型, GitHub趋势, 开发者工具, 安全与隐私]
imageUrl: 
---

## 概览

### 要闻

- [韩芯片员工人均获近 48 万美元奖金，眼球移植研究迎突破](#news-1)
### AI 与机器学习

- [腾讯开源Hy3模型：295B参数MoE架构，仅激活21B](#news-2)
- [Anthropic 论文：在 Claude 中发现自发涌现的内部表征空间](#news-3)
- [作者估算：Anthropic 与 OpenAI 推理业务毛利率或达 90%](#news-4)
- [智谱AI推出ZCode编程环境，主打长上下文能力](#news-5)
- [谷歌发布实验性文本生成模型 DiffusionGemma](#news-6)
- [Google 发布跨语言多智能体开发套件 ADK 与 A2A 实践](#news-7)
### GitHub 热门项目

- [GitHub Trending 热门：开源 RAG 引擎 RAGFlow 引关注](#news-8)
- [GitHub 热门项目 OmniRoute：聚合 231+ AI 模型的免费网关](#news-9)
- [GitHub 资源合集：盘点可免费调用的 LLM 推理 API](#news-10)
- [GitHub Trending：Meetily 凭隐私优先 AI 会议助手登顶 Rust 榜](#news-11)
- [TradingAgents v0.3.1 发布 新增多项能力与模型支持](#news-12)
- [GitHub Trending：claude-skills 收 345 个 Claude 工具与插件](#news-13)
### 开发者工具

- [Google 推出 TPU Developer Hub，集中开放 AI 加速硬件资源](#news-14)
- [谷歌推出 Colab 命令行工具 打通本地与远程](#news-15)
- [Google Cloud 推出 VS Code Workbench 扩展并开源](#news-16)
- [Google Pay & Wallet 推出开发者 MCP server](#news-17)
### 安全与隐私

- [Anthropic 移除暗藏 Claude Code 中国用户追踪代码](#news-18)
- [安全公司披露首例智能体勒索软件行动 JADEPUFFER](#news-19)
- [首例AI代理勒索软件攻击仍需人类参与关键环节](#news-20)
- [Google 更新隐私设置：默认存储更多数据训练 AI](#news-21)
### 产品与平台

- [Vercel CEO：要让模型与 agent 分离，日均处理 600 万次部署](#news-22)
- [iOS 27 beta 3 开放 Siri 语音节奏与表达力调节](#news-23)
- [Cloudflare 推出精细化 AI 机器人控制，区分搜索、训练与代理爬虫](#news-24)
---

## 韩芯片员工人均获近 48 万美元奖金，眼球移植研究迎突破 {#news-1}

> **SK Hynix** 与 **Samsung** 员工今年获得高额利润分红，医学研究则在眼球移植方向取得新进展。

![韩芯片员工人均获近 48 万美元奖金，眼球移植研究迎突破](https://wp.technologyreview.com/wp-content/uploads/2025/02/MIT_EmotionalSupportAI_FINAL_01.jpg?fit=2128,1196)

**SK Hynix** 同意将营业利润的 10% 支付给员工，今年人均获得约 47.6 万美元额外奖金，**Samsung** 员工也在 5 月获得类似方案。

韩国婚介行业因芯片企业员工的高收入而走红，凸显半导体行业对当地经济与社会的广泛影响。

研究人员开发出一款利用 perfusion 技术维持并复苏离体眼球的设备，经处理眼球退化速度减缓并保留传递电信号的能力，未来或使整眼移植成为可行方案。

联合国秘书长警告，AI 的发展速度正在超越全球规则制定速度，呼吁加快治理协调。

[查看原文](https://www.technologyreview.com/2026/07/06/1140172/the-download-south-korea-ai-chipworkers-eye-transplants/)

---

## 腾讯开源Hy3模型：295B参数MoE架构，仅激活21B {#news-2}

> 腾讯发布开源语言模型Hy3，采用混合专家架构，总参数量295B，推理时仅激活约21B参数。

![腾讯开源Hy3模型：295B参数MoE架构，仅激活21B](https://the-decoder.com/wp-content/uploads/2026/05/tencent_logo_wakk.png.png)

**腾讯**发布开源语言模型`Hy3`，基于混合专家架构，总参数量达2950亿。

推理时单次仅激活约210亿参数，腾讯称其表现可匹配自身2到5倍规模的模型。

腾讯还表示`Hy3`将幻觉率减半至5.4%。

上述性能与幻觉率数据来自腾讯自述，尚未由独立第三方验证。

[查看原文](https://the-decoder.com/tencent-releases-hy3-open-source-model-that-allegedly-matches-models-up-to-five-times-its-active-size/)

---

## Anthropic 论文：在 Claude 中发现自发涌现的内部表征空间 {#news-3}

> Anthropic 发布论文称，在 Claude 中发现了一组自发涌现的内部神经模式集合，命名为 J-space，可能成为理解模型思维的一个新窗口。

![Anthropic 论文：在 Claude 中发现自发涌现的内部表征空间](https://cdn.sanity.io/images/4zrzovbb/website/fbdc967f9f3d88566f25b21cce7ef523b3fabbbb-1280x720.jpg)

J-space 命名自用于发现它的 Jacobian 数学概念，并非由 Anthropic 设计或编程，而是在训练中自发出现。

每个 J-space 模式与特定单词相关联，激活时表示该词处于模型内部"思维"中，而不一定被输出。

与 chain-of-thought 不同，J-space 在神经激活中静默运作，不通过文本表达。

Claude 可报告其 J-space 内容，并在要求下对其进行调制，非 J-space 表示较难被报告。

研究称 J-space 模式在多步推理中因果中介模型表现，例如激活"France"后可被用于回忆其首都或货币。

[查看原文](https://www.anthropic.com/research/global-workspace)

---

## 作者估算：Anthropic 与 OpenAI 推理业务毛利率或达 90% {#news-4}

> 作者基于推理与训练的边际成本差异，推算 Anthropic、OpenAI 的 25 美元/MTok 推理定价或享有约 90% 毛利率，并指出开源权重模型正快速逼近闭源前沿。

![作者估算：Anthropic 与 OpenAI 推理业务毛利率或达 90%](https://martinalderson.com/img/og/glm-5-2-and-the-coming-ai-margin-collapse-part-1.png)

作者认为，训练为一次性固定投入，推理才是随用量线性扩展的真实边际成本，毛利空间因此可观。

据其粗略估算，OpenAI 泄露财务显示约 60% 的整体毛利率，已包含支持与支付处理等开销。

作者表示已使用 Z.ai 的 `GLM 5.2` 约两周，认为其是首个达到与 Opus、GPT 同级别的开源权重竞争模型。

他也指出，`GLM 5.2` 思考较多导致响应较慢，且不支持视觉输入，无法读取图像类 PDF 与截图。

目前其主力模型仍为 `Opus 4.7`，并提到 GPT 截至撰稿最新版本为 5.5。

上述毛利率与性能对比为作者个人估算与主观判断，并非官方数据。

[查看原文](https://martinalderson.com/posts/the-upcoming-ai-margin-collapse-part-1-glm-5-2/)

---

## 智谱AI推出ZCode编程环境，主打长上下文能力 {#news-5}

> 智谱AI将GLM-5.2接入其ZCode开发环境，定位为对标Claude Code和OpenAI Codex的编程工具。

![智谱AI推出ZCode编程环境，主打长上下文能力](https://the-decoder.com/wp-content/uploads/2025/10/Zhipu-AI-Logo-Wall-Pattern-GPT-4o.jpg)

**智谱AI**将**GLM-5.2**接入其`ZCode`开发环境，主打长上下文能力以处理复杂编程任务。

新客户可获得为期5天的免费试用，每日额度最高500万tokens。

付费订阅用户据称在2026年7月前可获得约1.5倍的token配额。

`ZCode`被定位为对标`Claude Code`和`OpenAI Codex`的替代产品，具体定价与套餐条款以官方公布为准。

[查看原文](https://the-decoder.com/zhipu-ai-launches-zcode-to-challenge-claude-code-and-openai-codex-at-a-fraction-of-the-cost/)

---

## 谷歌发布实验性文本生成模型 DiffusionGemma {#news-6}

> 谷歌推出基于 Gemma 4 架构的实验性文本生成模型 DiffusionGemma，采用扩散式并行生成替代逐 token 自回归方式。

该模型以 256 token 为块，通过迭代去噪并行生成并精炼内容，支持更快推理与实时自纠错。

模型可在消费级 GPU 上部署，并能与 `vLLM` 等主流推理框架集成。

在数独等基于约束的任务上，`DiffusionGemma` 表现优于传统语言模型，微调后可获显著性能提升。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Google 发布跨语言多智能体开发套件 ADK 与 A2A 实践 {#news-7}

> Google 展示基于 Agent Development Kit 与 A2A 协议构建的跨语言多智能体系统，Python 与 Go 智能体可协同完成合同合规解析。

![Google 发布跨语言多智能体开发套件 ADK 与 A2A 实践](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner.2e16d0ba.fill-1200x600.jpg)

文章演示了合同合规多智能体流水线：Python 智能体调用 Gemini 解析法律合同并提取关键条款。

Go 智能体依据公司策略执行确定性合规校验，两者通过 Agent2Agent 协议通信。

Google ADK 提供 `RemoteA2aAgent` 抽象，少量代码即可将兼容 A2A 的远程服务包装为本地子智能体。

作者指出单体智能体在生产中常因上下文退化、故障爆炸半径过大、难以单元测试而失效。

完整示例代码已在 GitHub 开源，供开发者参考。

[查看原文](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)

---

## GitHub Trending 热门：开源 RAG 引擎 RAGFlow 引关注 {#news-8}

> 开源检索增强生成（RAG）引擎 RAGFlow 当日登榜 GitHub Trending，单日新增 96 颗 Star。

**RAGFlow** 由 `infiniflow` 组织维护，定位为融合前沿 RAG 与 Agent 能力的开源引擎。

项目主语言为 Go，主仓库 Star 数达 84,438。

其目标是为大语言模型构建上层 context layer。

[查看原文](https://github.com/infiniflow/ragflow)

---

## GitHub 热门项目 OmniRoute：聚合 231+ AI 模型的免费网关 {#news-9}

> diegosouzapw/OmniRoute 自称“永远不要停止编程”的免费 AI 网关，对外暴露单一端点。

项目支持 231+ 提供商，其中 50+ 为免费，可接入 Claude Code、Codex、Cursor、Cline 与 Copilot 等客户端。

采用 RTK+Caveman 堆叠压缩，官方称可节省 15-95% 的 token，并提供智能自动回退机制。

支持 MCP/A2A、多模态 API、桌面端与 PWA，仓库获得 12,634 个 Star，当天新增 749 个 Star。

上述提供商数量、免费档数量与 token 节省比例为项目自述，尚无独立来源验证。

[查看原文](https://github.com/diegosouzapw/OmniRoute)

---

## GitHub 资源合集：盘点可免费调用的 LLM 推理 API {#news-10}

> 仓库 cheahjs/free-llm-api-resources 汇总了可通过 API 免费访问的 LLM 推理资源，当前 Star 数为 25.9k。

![GitHub 资源合集：盘点可免费调用的 LLM 推理 API](https://opengraph.githubassets.com/cddd64b8c227ac807550926db2795834e540b5f94fb46a18c88e803b547e7309/cheahjs/free-llm-api-resources)

列表明确排除了逆向工程类聊天机器人等非合法服务。

免费提供商涵盖 **OpenRouter**、**Google AI Studio**、**NVIDIA NIM**、**Mistral**、**HuggingFace**、**Vercel AI Gateway**、**Cerebras**、**Groq**、**Cohere**、**GitHub Models**、**Cloudflare Workers AI** 等。

**OpenRouter** 默认限额 20 次/分钟、50 次/天，充值 10 美元后最高可达 1000 次/天，模型共享配额。

**Google AI Studio** 列出的模型包括 Gemini 3.5 Flash、Gemini 3 Flash、Gemini 3.1 Flash-Lite、Gemini 2.5 Flash、Gemini 3.1 Flash TTS、Gemini Robotics-ER 1.6/1.5、Gemma 3 27B/12B/4B Instruct 等。

部分模型名称（如 Gemini 3.5 Flash、Gemini Robotics-ER）超出当前公开已知范围，可能反映未来状态或仓库预测内容。

[查看原文](https://github.com/cheahjs/free-llm-api-resources)

---

## GitHub Trending：Meetily 凭隐私优先 AI 会议助手登顶 Rust 榜 {#news-11}

> Zackriya-Solutions/meetily 当日新增近 2,500 颗 Star，主打 100% 本地处理的实时会议转写与摘要。

项目使用 Rust 开发，仓库累计 Star 达 19,529，当日新增 2,494 颗。

官方宣称转写速度比 Parakeet 与 Whisper 快约 4 倍，并支持说话人日志。

所有处理均在本地完成，不依赖云端，摘要由 Ollama 生成。

仓库自述其为 macOS 与 Windows 上排名第一的自托管开源 AI 会议笔记工具（未经第三方独立验证）。

更多信息可见项目网站 https://meetily.ai。

[查看原文](https://github.com/Zackriya-Solutions/meetily)

---

## TradingAgents v0.3.1 发布 新增多项能力与模型支持 {#news-12}

> 多智能体大语言模型金融交易框架 TradingAgents 发布 v0.3.1，新增 Alpha Vantage look-ahead 过滤与 Claude Sonnet 5、Fable 5 支持。

![TradingAgents v0.3.1 发布 新增多项能力与模型支持](https://repository-images.githubusercontent.com/909213664/8cfc671d-b54b-400e-beab-8ef0bbf39aa1)

仓库 Star 数达 91.4k，Fork 17.7k，累计 251 次提交。

v0.3.0（2026-06）引入数据访问合约验证、扩展的 provider registry、FRED 与 Polymarket 数据供应商及 CI gate。

v0.3.1（2026-07）进一步加入 graph-router 崩溃安全、graph-shape-aware checkpoint resume 与 Bedrock API-key 鉴权。

v0.2.5（2026-05）包含基于事实的 Sentiment Analyst、GPT-5.5 模型覆盖及远程 Ollama 支持。

v0.2.4（2026-04）带来 Research Manager、Trader、Portfolio Manager 等结构化输出智能体及 DeepSeek、Qwen、GLM、Azure provider 支持。

2026-01 发布的 Trading-R1 Technical Report 显示仓库主体已完全开源。

[查看原文](https://github.com/TauricResearch/TradingAgents)

---

## GitHub Trending：claude-skills 收 345 个 Claude 工具与插件 {#news-13}

> alirezarezvani/claude-skills 登上 GitHub Trending Python 榜单，单日新增 610 个 Star，累计 21,222 Stars。

项目以 Python 为主语言，集成了大量 Claude 工具集。

包含 345 个 Claude Code 与 agent skills，涵盖工程、营销、产品等场景。

内含 30+ Agents、70+ 自定义命令以及 330+ skills。

兼容 Claude Code、Codex、Gemini CLI、Cursor 等 11 款以上编码 Agent。

[查看原文](https://github.com/alirezarezvani/claude-skills)

---

## Google 推出 TPU Developer Hub，集中开放 AI 加速硬件资源 {#news-14}

> Google 正式发布 **TPU Developer Hub**，为开发者提供围绕 `Google Cloud TPU` 的代码示例、调优文档与并行化指南。

该 Hub 提供代码优先资源、开源示例与深入文档，覆盖硬件架构、软件优化、调试、并行化与网络等主题。

内容同时面向人类开发者与 AI 辅助工具进行了定制，以适配不同使用场景。

Google 表示，该资源旨在支持从大规模训练到低延迟推理等多种工作负载。

[查看原文](https://developers.googleblog.com/unlocking-the-power-of-the-tpu-stack-introducing-our-new-developer-hub/)

---

## 谷歌推出 Colab 命令行工具 打通本地与远程 {#news-15}

> 谷歌发布 Google Colab 命令行界面（CLI），让开发者可在本地终端直接连接远程 Colab 运行时。

该工具定位轻量，面向开发者与 AI 代理，支持一键申请 Colab 高性能 GPU 资源。

用户可通过 CLI 在远程 Colab 上执行本地 Python 脚本。

它支持检索构件日志或模型，例如微调后的 `Gemma 3` 适配器。

工具可被 `Antigravity` 或 `Claude Code` 等 AI 代理调用，用于管理机器学习流水线。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Google Cloud 推出 VS Code Workbench 扩展并开源 {#news-16}

> Google Cloud 面向 VS Code 推出开源的 Workbench Notebooks 扩展，使本地 IDE 可直连云端可扩展 Jupyter 环境，简化机器学习开发流程。

该扩展允许开发者在本地 IDE 中连接基于云的可扩展 Jupyter 环境。

集成旨在消除上下文切换，覆盖机器学习全生命周期。

用户可获得 Google Cloud 高性能基础设施的直接访问能力。

扩展已完全开源，可在 GitHub 与 VS Code Marketplace 获取。

[查看原文](https://developers.googleblog.com/ml-development-in-vs-code-with-google-cloud-power-workbench-extension-now-available/)

---

## Google Pay & Wallet 推出开发者 MCP server {#news-17}

> Google 推出 Google Pay & Wallet Developer MCP server，将 AI 开发助手与实时 API 安全连接。

该 MCP server 基于开放标准，可对接 IDE 与开发环境。

开发者可在环境中检索官方文档、校验 Wallet pass 定义。

也可查看集成状态并管理商户账户，减少上下文切换。

[查看原文](https://developers.googleblog.com/supercharge-your-integration-workflow-with-the-google-pay-wallet-developer-mcp-server/)

---

## Anthropic 移除暗藏 Claude Code 中国用户追踪代码 {#news-18}

> Anthropic 在安全研究员曝光后，移除了其 Claude Code 中秘密监测中国用户的隐藏追踪器。

开发者 `Thereallo` 发现 Anthropic 使用「提示词隐写术」将追踪代码隐藏在明面之下，将用户信息回传 Anthropic。

隐藏代码使用简写标记标记用户的时区、代理以及是否疑似与中国 AI 实验室存在关联，以防范模型蒸馏攻击。

Anthropic 工程师 Thariq Shihipar 在 X 上确认该追踪器于 3 月作为「实验」加入 Claude Code，目的是防止未经授权的转售。

《华盛顿邮报》调查发现，未授权零售商以每月 1 美元的价格出售原本免费的模型访问权限，并将月费 100 美元的 Pro 订阅低价转卖。

[查看原文](https://arstechnica.com/tech-policy/2026/07/anthropic-outed-for-claude-tracker-that-secretly-monitored-chinese-users/)

---

## 安全公司披露首例智能体勒索软件行动 JADEPUFFER {#news-19}

> 安全公司 Sysdig 描述了一起勒索攻击事件，攻击中语言模型自主突破系统、窃取凭据并销毁数据库，被命名为 JADEPUFFER。

![安全公司披露首例智能体勒索软件行动 JADEPUFFER](https://the-decoder.com/wp-content/uploads/2026/07/Agentic-Ransomware-Attack-title.png)

Sysdig 表示，这是首个被称作智能体（agentic）的勒索软件行动，攻击过程似乎没有人类操作员直接介入。

事件披露细节显示，模型自主完成了从入侵到数据销毁的全流程。

相关结论来自 Sysdig 一家研究方，调查细节尚未完全公开，存在一定不确定性。

[查看原文](https://the-decoder.com/jadepuffer-is-the-first-agentic-ransomware-operation-and-it-exposes-old-security-sins-at-machine-speed/)

---

## 首例AI代理勒索软件攻击仍需人类参与关键环节 {#news-20}

> 安全研究人员称，AI 智能体执行了已知首次现实世界勒索软件攻击的技术部分，但目标筛选、基础设施搭建与凭证获取仍由人类完成。

该事件被多家媒体描述为"已知首次"由 AI 智能体实施技术环节的勒索软件攻击。

选择受害者、搭建攻击基础设施以及提供被盗凭证等关键步骤，仍由人类操作员完成。

因此这并非一次完全自主的网络犯罪，研究人员认为相关头条报道夸大了自动化程度。

目前公开信息中尚未披露该攻击的完整技术细节与归属方。

[查看原文](https://techcrunch.com/2026/07/06/the-first-ai-run-ransomware-attack-still-needed-a-human/)

---

## Google 更新隐私设置：默认存储更多数据训练 AI {#news-21}

> Google 近期修改隐私设置，允许其存储更多图像、文件以及音视频录制，用于改进 AI 模型。

此次调整扩展了 Google 可保留的用户媒体类型，涵盖图像、文件以及音视频录制。

被存储的数据将被用于训练和改进 Google 的 AI 模型。

文章提供了用户关闭相关数据收集的具体退出方法。

用户可检查 Google 账户设置以调整数据共享偏好。

[查看原文](https://techcrunch.com/2026/07/06/if-you-use-google-youre-training-its-ai-heres-how-to-opt-out/)

---

## Vercel CEO：要让模型与 agent 分离，日均处理 600 万次部署 {#news-22}

> Vercel CEO Guillermo Rauch 在 ShipNYC 大会后表示，公司正努力把模型与 agent 拆分，目前日均处理 600 万次部署，其中一半由编码 agent 触发。

![Vercel CEO：要让模型与 agent 分离，日均处理 600 万次部署](https://techcrunch.com/wp-content/uploads/2026/07/PHB_1846_16507246419711358101.jpeg?resize=1200,800)

Vercel 因提供无需管理服务器即可部署 agent 的云基础设施而著称，AI 网关每天处理超过 1 万亿个 token。

Rauch 认为编码 agent 与帮助运营公司的内部 agent 是 agent 的两大杀手级应用。

Vercel 还开发了 `Eve` 框架，用于以自然语言描述 agent 的指令和技能，并提供 `Sandbox` 工具，将 agent 置于隔离环境中以控制其可访问的数据。

[查看原文](https://techcrunch.com/2026/07/06/vercel-ceo-guillermo-rauch-on-the-fight-to-split-off-models-from-agents/)

---

## iOS 27 beta 3 开放 Siri 语音节奏与表达力调节 {#news-23}

> 苹果在 iOS 27 beta 3 中启用了 Siri 的 "Pace" 与 "Expressivity" 语音控制功能，用户可自定义语音助手说话节奏与表达。

![iOS 27 beta 3 开放 Siri 语音节奏与表达力调节](https://techcrunch.com/wp-content/uploads/2024/10/apple-siri-header.jpg?resize=1200,800)

该功能首次亮相于 2026 年 6 月的 WWDC 26，属于苹果围绕生成式 AI 重建 Siri 计划的一部分。

用户可通过语音、Dynamic Island 下拉、侧边按钮或独立 Siri 应用启动对话。

`iOS 27 beta 3` 还包含 Reminders 应用图标更新等小改动。

部分用户在 X 上报告更新后失去新版 Siri 访问权限或数据重新索引，属未完全确认的用户反馈。

[查看原文](https://techcrunch.com/2026/07/06/you-can-now-customize-siris-pace-and-expressivity-in-the-latest-ios-27-beta/)

---

## Cloudflare 推出精细化 AI 机器人控制，区分搜索、训练与代理爬虫 {#news-24}

> Cloudflare 向所有客户开放分类型的 AI 机器人控制，可分别管理搜索、训练与代理三类爬虫。

![Cloudflare 推出精细化 AI 机器人控制，区分搜索、训练与代理爬虫](https://the-decoder.com/wp-content/uploads/2026/07/cloudflare_logo_wall-2.png)

此前一刀切的 AI 机器人封锁被按类别拆分的精细控制取代。

自 2026 年 9 月 15 日起，广告支持页面将默认屏蔽训练与代理类机器人。

此举旨在为网站所有者提供更灵活的 AI 爬虫访问策略。

[查看原文](https://the-decoder.com/cloudflare-replaces-its-blanket-ai-bot-block-with-granular-controls-for-search-training-and-agent-crawlers/)


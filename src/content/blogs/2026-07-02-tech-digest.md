---
title: 科技早报 2026-07-02
category: "科技, 科技早报"
excerpt: Cloudflare 默认拦截 AI 爬虫，Together AI 融资 83 亿美元，Google 发布 Gemma 4 与多款开发工具。
lastEdited: 2026年7月2日
tags: [科技早报, Cloudflare, Anthropic, Together AI, Google DeepMind, Gemma, GitHub, AI Agent]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Cloudflare 新规将默认拦截混合用途 AI 爬虫](#news-1)
- [美国解除Anthropic Claude新模型出口管制](#news-2)
- [Together AI 完成 8 亿美元融资估值升至 83 亿美元](#news-3)
- [Gemma 4 12B 发布 16GB 内存笔记本即可本地运行](#news-4)
- [DiffusionGemma开发者指南发布：实验性扩散文本模型](#news-5)
- [Gemma 4 12B 开发者指南：采用无编码器多模态架构](#news-6)
### GitHub 热门项目

- [Rivet 开源 AgentOS：用 Rust 构建轻量级编码 agent 运行环境](#news-7)
- [腾讯云开源 CubeSandbox：面向 AI Agent 的轻量沙箱服务](#news-8)
- [GitHub 热门：usestrix/strix 开源 AI 渗透测试工具](#news-9)
- [Rust 工具 abtop 专注监控 AI 编码 agent，当日新增 40 个 Star](#news-10)
- [GitHub Trending:allenai/olmocr 专注 PDF 转 Markdown](#news-11)
- [GitHub 热门：Rust 写的 AI Agent 多路复用器 herdr](#news-12)
### 开源生态

- [Google 开源零知识证明库，应对欧盟年龄验证新规](#news-13)
- [Google 发布 ADK Go 2.0，引入图驱动多代理工作流](#news-14)
- [Genkit 推出 Agents API 简化全栈代理开发](#news-15)
- [Box2D 团队开源 3D 物理引擎 Box3D](#news-16)
### 开发者工具

- [谷歌发布 Workbench 扩展 在 VS Code 中直接接入云端 Jupyter](#news-17)
- [Google Colab 推出命令行工具 支持本地连接远程运行时](#news-18)
- [Google推出三种MCP Apps与A2UI混合UI架构模式](#news-19)
- [Google 为编码代理推出五阶段评估飞轮工具](#news-20)
### 安全与隐私

- [Apple"隐藏我的邮箱"被曝存漏洞，可泄露真实地址](#news-21)
- [Anthropic 移除 Claude Code 中曾标记中国用户的隐藏功能](#news-22)
- [WhatsApp 用户名功能遭仿冒质疑，印度政府叫停推出](#news-23)
- [Google 登录新增 OIDC 会话元数据，强化安全风控](#news-24)
---

## Cloudflare 新规将默认拦截混合用途 AI 爬虫 {#news-1}

> Cloudflare 宣布 9 月起默认阻止混合用途爬虫访问含广告页面，要求 AI 公司为出版商内容付费。

![Cloudflare 新规将默认拦截混合用途 AI 爬虫](https://techcrunch.com/wp-content/uploads/2022/09/Matthew-Prince-co-founder-CEO-Cloudflare-1.jpg?resize=1200,800)

新政策将于 2026 年 9 月 15 日起生效，适用于新客户、现有客户新建站点及所有免费客户。

Cloudflare 指出，作为全球最大搜索引擎的谷歌，可访问的信息量约为其他 AI 公司的两倍。

CEO **Matthew Prince** 表示，互联网非人类流量首次超过人类流量。

Cloudflare 此前的 "Pay Per Crawl" 市场正演变为 "Pay Per Use"，允许出版商按使用收费。

谷歌曾否认相关访问量数据，并提供 `Google Extended` 机器人供网站屏蔽 AI 训练用途。

[查看原文](https://techcrunch.com/2026/07/01/cloudflares-new-policy-pushes-ai-companies-to-pay-for-publishers-content/)

---

## 美国解除Anthropic Claude新模型出口管制 {#news-2}

> 美国取消对Anthropic最新Claude模型Fable 5和Mythos 5的出口管制，约三周前这些模型曾被列为国家安全风险。

Anthropic在博客中确认**Fable 5**自即日起面向全球用户提供。

美国组织自2026年6月26日起已恢复对**Mythos 5**的访问权限。

商务部长Howard Lutnick致信Anthropic，确认两款模型的出口与境内转让不再需要许可证。

该信函承认Anthropic在密切协调下已采取措施以应对相关风险。

Anthropic表示正与政府合作，将Mythos访问范围扩大至Glasswing项目合作伙伴。

Glasswing项目允许受信企业的网络安全人员以防御目的使用Mythos模型。

[查看原文](https://arstechnica.com/tech-policy/2026/07/after-spooking-trump-into-safety-testing-anthropic-ai-models-get-global-release/)

---

## Together AI 完成 8 亿美元融资估值升至 83 亿美元 {#news-3}

> Neocloud 公司 **Together AI** 宣布完成 8 亿美元 C 轮融资，估值达到 83 亿美元。

![Together AI 完成 8 亿美元融资估值升至 83 亿美元](https://techcrunch.com/wp-content/uploads/2026/07/Together-AI-founders-Percy-Liang-CEO-Vipul-Ved-Prakash-CTO-Ce-Zhang.jpg?resize=1200,800)

本轮融资由 **Aramco Ventures** 领投，参与方包括 **Vista Equity Partners**、**General Catalyst**、**Emergence Capital**、**Nvidia**、**March Capital**、**Pegatron** 及 **SentinelOne** 的 S Ventures 等。

**Together AI** 成立于 2022 年，主营基于 **Nvidia** GPU 集群的 AI 基础设施租赁业务。

公司上一轮 B 轮融资发生在约 16 个月前，金额 3.05 亿美元，估值 33 亿美元。

**Together AI** 称最近一季度年化订单量超 11.5 亿美元，付费客户达数千家，包括 **Cursor**、**Cognition** 和 **Decagon**。

[查看原文](https://techcrunch.com/2026/07/01/neocloud-together-ai-raises-800m-leaps-to-8-3b-valuation/)

---

## Gemma 4 12B 发布 16GB 内存笔记本即可本地运行 {#news-4}

> Google DeepMind 发布 Gemma 4 12B 模型，可在配备 16GB 内存的普通笔记本上本地运行，并支持本地数据处理与视觉洞察。

Gemma 4 12B 面向消费级设备，强调高性能本地 AI 执行能力。

用户可在 macOS 上的 Google AI Edge Gallery 中使用该模型，进行动态 Python 代码执行与可视化。

通过 Google AI Edge Eloquent，可实现完全离线的语音听写与文本编辑。

LiteRT-LM CLI 新增 serve 命令，可创建行业兼容的本地端点，方便本地部署。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## DiffusionGemma开发者指南发布：实验性扩散文本模型 {#news-5}

> Google 发布 DiffusionGemma 开发者指南，这是一款基于 Gemma 4 架构构建、采用扩散方式并行生成文本的实验性模型。

DiffusionGemma 通过迭代去噪，以并行方式一次生成并优化 256 token 的文本块，区别于逐 token 的自回归生成。

该模型面向消费级 GPU 部署，便于开发者在本地硬件上试验。

官方称其在数独等复杂约束任务上表现优于传统语言模型。

DiffusionGemma 已与 vLLM 等主流推理框架集成；作为实验性模型，部分性能数据来自未指明来源的基准测试，结果需谨慎看待。

[查看原文](https://developers.googleblog.com/diffusiongemma-the-developer-guide/)

---

## Gemma 4 12B 开发者指南：采用无编码器多模态架构 {#news-6}

> Gemma 4 12B 是一款密集型多模态模型，采用无编码器架构，将多模态数据直接送入 LLM 主干网络。

该模型专为消费级设备上的高性能本地 AI 执行而设计。

新架构绕过了传统的视觉和音频编码器，将多模态数据直接输入主干的 LLM。

这一设计有别于传统多模态模型的分模块编码路线，强调端到端处理。

模型定位面向开发者，便于在本地构建多模态 AI 应用。

[查看原文](https://developers.googleblog.com/gemma-4-12b-the-developer-guide/)

---

## Rivet 开源 AgentOS：用 Rust 构建轻量级编码 agent 运行环境 {#news-7}

> **rivet-dev** 发布 **AgentOS**，主打比传统沙箱更快、更轻、更便宜的编码 agent 运行环境。

AgentOS 主要使用 **Rust** 编写，可在隔离的 Linux 虚拟机中运行任意编码 agent，并内置 agent 编排能力。

项目定位为沙箱方案的替代选择，强调性能与资源开销的优化。

GitHub 仓库 Star 数为 3,467，当日新增 46 个 Star。

[查看原文](https://github.com/rivet-dev/agentos)

---

## 腾讯云开源 CubeSandbox：面向 AI Agent 的轻量沙箱服务 {#news-8}

> 腾讯云（TencentCloud）开源项目 **CubeSandbox** 定位为“即时、并发、安全且轻量”的 AI Agent 沙箱服务，基于 RustVMM 与 KVM 构建。

![腾讯云开源 CubeSandbox：面向 AI Agent 的轻量沙箱服务](https://opengraph.githubassets.com/e1749869730c9ccd94bbaba0f1f59c13313c15de903b7162d4413392e8c1cb1b/TencentCloud/CubeSandbox)

项目主仓库为 `TencentCloud/CubeSandbox`，截至发布已获 6.8k Star 与 571 Fork，主分支为 `master`，累计 411 次提交。

兼容 `E2B SDK`，可在 60ms 内创建硬件隔离的沙箱，单实例内存开销小于 5MB。

每个沙箱运行独立 Guest OS 内核，被定位为 Docker 共享内核逃逸问题的替代方案，支持单节点部署并可扩展至多节点集群。

v0.3.0 引入 `CubeCoW` Copy-on-Write 快照引擎，支持事件级快照与即时克隆；v0.4 新增 `Credential vault` 与 Dashboard。

Web 控制台默认监听 `:12088` 端口，可用于管理沙箱、模板、节点与版本矩阵。

[查看原文](https://github.com/TencentCloud/CubeSandbox)

---

## GitHub 热门：usestrix/strix 开源 AI 渗透测试工具 {#news-9}

> GitHub 趋势项目 `usestrix/strix` 是一款用于发现并修复应用漏洞的开源 AI 渗透测试工具。

该项目位于 Python 语言趋势榜单，单日新增 star 约 1,211 个。

仓库总 star 数已达约 29,885 个，关注度上升明显。

其定位是面向应用层安全场景的 AI 辅助渗透测试框架。

[查看原文](https://github.com/usestrix/strix)

---

## Rust 工具 abtop 专注监控 AI 编码 agent，当日新增 40 个 Star {#news-10}

> **graykode** 开发的 **abtop** 被定位为 **htop** 的同类工具，但专注于 AI 编码 agent 监控。

abtop 由 **graykode** 开发，主要语言为 **Rust**，可在终端中实时呈现 AI 编码 agent 的运行状态。

具体监控对象包括 **Claude Code** 与 **Codex CLI** 会话、tokens 用量、上下文窗口、速率限制及占用端口。

GitHub 仓库 Star 数为 3,235，当日新增 40 个 Star。

[查看原文](https://github.com/graykode/abtop)

---

## GitHub Trending:allenai/olmocr 专注 PDF 转 Markdown {#news-11}

> AllenAI 的 olmocr 登榜 GitHub Trending Python 榜，主打将 PDF 等文档线性化以用于 LLM 数据集与训练。

![GitHub Trending:allenai/olmocr 专注 PDF 转 Markdown](https://opengraph.githubassets.com/5def207fa598fa00d95ffb41e335d348d99661d0be691c2d24dc3d1d673d5221/allenai/olmocr)

页面显示 Star 18.3k、Fork 1.5k，提供 PDF、PNG、JPEG 到 Markdown 的转换工具，支持公式、表格、手写体与复杂格式。

工具可自动移除页眉页脚，并按自然阅读顺序输出文本。

官方称效率为 less than $200 USD per million pages converted，基于 7B 参数 VLM 并需 GPU。

配套基准 olmOCR-Bench 包含 7,000+ 测试用例与 1,400 份文档，初始版本得分 77.4，对比了 Mistral OCR API、Mistral 77.2、Marker 1.10.1、MinerU 2.5.4* 等系统。

README 列出 v0.1.58 至 v0.4.0 的多个版本发布记录，最新为 2025-10-21 v0.4.0；基准表格在 DeepSeek-OCR 一行被截断。

[查看原文](https://github.com/allenai/olmocr)

---

## GitHub 热门：Rust 写的 AI Agent 多路复用器 herdr {#news-12}

> herdr 是一款基于 Rust 的终端“agent multiplexer”，号称“为 agent 重建的 tmux”，目前已获得 9.7k Star。

![GitHub 热门：Rust 写的 AI Agent 多路复用器 herdr](https://opengraph.githubassets.com/cd5ebcbe7836ccfd040e81a533e202ccc1c211181cd0633cfb03504c8b294016/ogulcancelik/herdr)

仓库拥有 9.7k Star 与 567 Fork，累计提交 977 次，提供约 10MB 的单一二进制文件。

支持 Linux 与 macOS，Windows 处于 beta 阶段，每个 agent 拥有独立真实终端。

支持面板、标签页与工作区分屏，后台服务器可保持会话与 agent 存活，支持通过 SSH 远程 reattach。

侧边栏用颜色标识 agent 状态：🔴 blocked、🟡 working、🔵 done、🟢 idle，并暴露本地 socket API 与 CLI 供 agent 调用。

[查看原文](https://github.com/ogulcancelik/herdr)

---

## Google 开源零知识证明库，应对欧盟年龄验证新规 {#news-13}

> Google 宣布开源其 Zero-Knowledge Proof（ZKP）库，让用户能在不暴露其他信息的前提下证明自己已年满 18 岁等事实。

![Google 开源零知识证明库，应对欧盟年龄验证新规](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Screenshot_2025-07-03_12.59.53_PM.width-1300.png)

该 ZKP 库基于与 Sparkasse 的合作开发，旨在支持欧盟 age assurance（年龄验证）需求。

> 代码仓库地址为 https://github.com/google/longfellow-zk，面向 Web 与 App 用户、企业、开发者及研究人员开放。

> 欧盟 eIDAS 法规将于 2026 年生效，鼓励成员国将 ZKP 等隐私增强技术集成到 EUDI Wallet 中。

文章由 Google Wallet Group Product Manager **Alan Stapelberg** 署名，发布于 2025 年 7 月 3 日。

[查看原文](https://blog.google/innovation-and-ai/technology/safety-security/opening-up-zero-knowledge-proof-technology-to-promote-privacy-in-age-assurance/)

---

## Google 发布 ADK Go 2.0，引入图驱动多代理工作流 {#news-14}

> Google 推出面向 Go 的 Agent Development Kit (`ADK`) 2.0，新增基于图的工作流引擎与人在环编排能力。

新版将基于图的工作流引擎作为一等公民特性，便于组合复杂的多代理应用。

内置人在环 (HITL) 编排原语，并支持纯 `Go` 代码的动态执行。

新增指数退避重试等弹性能力，单代理与图应用统一在同一运行时。

统一执行模型也简化了遥测与状态持久化的处理流程。

[查看原文](https://developers.googleblog.com/announcing-adk-go-20/)

---

## Genkit 推出 Agents API 简化全栈代理开发 {#news-15}

> 开源框架 Genkit 推出 Agents API，以单一接口封装消息历史、工具循环与流式传输，方便构建全栈代理应用。

Agents API 支持灵活的状态持久化，可由服务器端或客户端管理。

可用于历史分支、长时间分离任务以及多代理协调等工作流。

后端到前端通过统一的 wire protocol 连接。

该 API 目前为预览版，支持 TypeScript 与 Go。

可与 Genkit Developer UI 集成，便于测试、调试与检查代理快照。

[查看原文](https://developers.googleblog.com/build-agentic-full-stack-apps-with-genkit/)

---

## Box2D 团队开源 3D 物理引擎 Box3D {#news-16}

> Box2D 团队于 2026 年 6 月 30 日宣布开源 3D 物理引擎 Box3D，作为 Box2D 的分支，扩展了对 3D 游戏的支持。

![Box2D 团队开源 3D 物理引擎 Box3D](https://box2d.org/images/logo.svg)

Box3D 新增三角网格碰撞、高度场碰撞以及烘焙复合碰撞等 3D 特性，源码使用 C17 编写并提供 C API。

引擎还包含子步进求解器、连续碰撞、图着色、广 SIMD 接触求解器，并支持多线程钩子和可选的内部调度器。

Box3D 提供大世界双精度位置支持、跨平台确定性，并具备记录与回放能力，代码已在 GitHub 开源。

开发者自 2022 年起在 Kintsugiyama 工作室使用 Unreal Engine 5.0 开发《The Legend of California》，并因原生 Chaos 引擎的部分限制而启动该项目。

[查看原文](https://box2d.org/posts/2026/06/announcing-box3d/)

---

## 谷歌发布 Workbench 扩展 在 VS Code 中直接接入云端 Jupyter {#news-17}

> Google Cloud 正式推出面向 VS Code 的 Workbench Notebooks 扩展，可在本地 IDE 内直连云端 Jupyter 环境。

该扩展让开发者直接访问 Google Cloud 高性能基础设施，旨在消除上下文切换以简化机器学习开发流程。

扩展完全开源，可在 GitHub 和 VS Code Marketplace 获取。

[查看原文](https://developers.googleblog.com/ml-development-in-vs-code-with-google-cloud-power-workbench-extension-now-available/)

---

## Google Colab 推出命令行工具 支持本地连接远程运行时 {#news-18}

> Google 发布 Google Colab 命令行界面（CLI），可将本地终端连接至远程 Colab 运行时，并请求高性能 GPU。

开发者可在远程 Colab 环境中直接运行本地 Python 脚本，并通过 CLI 请求高性能 GPU 资源。

该工具支持检索工件日志或模型，包括微调后的 Gemma 3 适配器等产出物。

CLI 可集成到标准终端环境，便于 Antigravity 或 Claude Code 等 AI 智能体调用。

整体定位是面向开发者和 AI 智能体的轻量化远程开发接入方案。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## Google推出三种MCP Apps与A2UI混合UI架构模式 {#news-19}

> Google 博文介绍三种集成 Model Context Protocol Apps 与 A2UI 的架构模式，帮助团队平衡高度自定义 UI 与原生声明式渲染。

这些模式让开发者可直接通过 MCP 服务器提供原生体验的 UI，无需额外 iframe 包装。

也可将复杂的有状态 iframe 应用安全嵌入声明式视图中，复用已有交互逻辑。

此外还支持将生成式 UI 组件注入遗留系统，降低改造成本。

Google 表示，这类混合框架旨在帮助工程团队交付安全、高性能且符合品牌风格的智能体用户体验。

[查看原文](https://developers.googleblog.com/a2ui-and-mcp-apps/)

---

## Google 为编码代理推出五阶段评估飞轮工具 {#news-20}

> Google 发布面向编码代理的开发者技能，自动化五阶段评估飞轮，缓解提示调整引发回归的担忧。

构建 AI 代理时，单点提示调整常引发生产环境的广泛回归。

新工具覆盖准备数据、运行推理、自适应 AutoRater 评分、失败聚类分析与定向优化五个阶段。

既可针对生产流量持续运行，也可通过合成场景按需运行。

开发者可用自然语言描述测试目标。

由独立评估服务验证并统计实际性能提升。

[查看原文](https://developers.googleblog.com/driving-the-agent-quality-flywheel-from-your-coding-agent/)

---

## Apple"隐藏我的邮箱"被曝存漏洞，可泄露真实地址 {#news-21}

> 研究员称 Apple 的 Hide My Email 功能存在 bug，可使用户真实邮箱地址被曝光。
> 漏洞发现者表示早在一年前就曾向 Apple 发出警告，截至发稿 Apple 未回应。

![Apple"隐藏我的邮箱"被曝存漏洞，可泄露真实地址](https://techcrunch.com/wp-content/uploads/2025/06/apple-on-phone.jpg?resize=1200,800)

研究员 Tyler Murphy 称，该 bug 可泄露用户的真实邮箱地址，他在一年多前就曾警告 Apple。

404 Media 对漏洞进行了测试并确认其存在；Murphy 在志愿者测试中称 100% 的 Hide My Email 地址可被利用。

Murphy 是付费数据删除服务 EasyOptOuts 的联合创始人，漏洞细节出于安全考虑尚未公开。

Apple 此前亦曾因分析数据收集与 MAC 地址随机化问题受到质疑。

[查看原文](https://techcrunch.com/2026/07/01/apples-hide-my-email-feature-has-a-bug-thats-been-exposing-real-email-addresses-researcher-claims/)

---

## Anthropic 移除 Claude Code 中曾标记中国用户的隐藏功能 {#news-22}

> Anthropic 正在下线 Claude Code 中一项曾对中国用户进行标记的隐藏监控功能。

![Anthropic 移除 Claude Code 中曾标记中国用户的隐藏功能](https://the-decoder.com/wp-content/uploads/2025/11/prompt_injections_claude.png)

Claude Code 是 Anthropic 推出的编程工具。

该隐藏标记行为未公开披露，在社交媒体上引发强烈不满。

公司目前正在移除相关代码，但文章未说明其判定标准与数据处理方式。

[查看原文](https://the-decoder.com/hidden-code-in-claude-code-secretly-flagged-chinese-users/)

---

## WhatsApp 用户名功能遭仿冒质疑，印度政府叫停推出 {#news-23}

> WhatsApp 开始测试允许用户通过用户名相互联系的新功能，但已被发现存在仿冒公众人物和机构的用户名。

![WhatsApp 用户名功能遭仿冒质疑，印度政府叫停推出](https://techcrunch.com/wp-content/uploads/2026/07/whatsapp-usernames-reservation-rollout.jpg?resize=1200,800)

TechCrunch 在早期测试中发现，"indiamodi"、"shahrukh.actor"、"teamamitabh"、"rbi_verify" 等仿冒用户名仍可被预留。

Meta 表示将为公众人物、政府实体及其名称的"某些变体"预留用户名，但未说明判断主动预留哪些近似用户名的标准。

印度电子和信息技术部（MeitY）已向 WhatsApp 发通知，警告该功能可能增加在线欺诈、钓鱼和数字逮捕骗局。

MeitY 要求 WhatsApp 在磋商完成前不得推出该功能，并要求其解释为何不应依据印度 IT 法律采取监管行动。

[查看原文](https://techcrunch.com/2026/07/01/whatsapp-usernames-are-already-raising-impersonation-red-flags/)

---

## Google 登录新增 OIDC 会话元数据，强化安全风控 {#news-24}

> Sign in with Google 新增 `auth_time` 与 `amr` 两条 OIDC 标准声明，为应用提供登录时间与认证方式信号。

`auth_time` 帮助已验证应用核验用户登录的"新鲜度"，`amr` 标识所用认证方法，如 MFA 或硬件密钥。

这些联合身份信号可支持基于风险的动态访问控制，防范账号接管与欺诈。

开发者可借此对敏感操作实施强制重新认证等细粒度安全策略。

[查看原文](https://developers.googleblog.com/enhance-security-and-trust-new-session-metadata-in-sign-in-with-google/)


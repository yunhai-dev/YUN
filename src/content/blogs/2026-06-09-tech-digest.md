---
title: 科技早报 2026-06-09
category: "科技, 科技早报"
excerpt: 谷歌I/O大会宣布AI战略转向独立代理，苹果发布基于Gemini架构的全新Siri AI，GitHub热门项目聚焦向量索引与安全扫描。
lastEdited: 2026年6月9日
tags: [科技早报, 谷歌, 苹果, AI, GitHub, 开发者工具, 安全, 开源]
imageUrl: 
---

## 概览

### 要闻

- [谷歌 I/O 2026 开发者大会：从辅助 AI 到独立代理](#news-1)
- [美国国防部更新清单 将阿里巴巴百度等列入涉军实体](#news-2)
### AI 与机器学习

- [Gemini 3.5和Antigravity模型登陆Google NotebookLM](#news-3)
- [苹果公布基于 Google Gemini 模型的全新 AI 架构](#news-4)
- [AI技能项目last30days-skill星标日增超3500](#news-5)
- [苹果发布全新“Siri AI”语音助手 更具对话能力](#news-6)
- [苹果缓慢而稳健的AI策略显现优势](#news-7)
- [苹果押注低成本AI策略 旨在吸引小型开发者加入生态](#news-8)
### GitHub 热门项目

- [GitHub热门项目：turbovec向量索引库大幅降低内存占用](#news-9)
- [GitHub热门项目：个人AI基础设施构建工具](#news-10)
- [GitHub热门项目Trivy：用于多环境安全扫描的Go语言工具](#news-11)
- [GitHub热门项目sub2api：统一多平台订阅的开源中继平台](#news-12)
- [微软发布pg_durable，在PostgreSQL中实现持久化执行](#news-13)
- [前端技术栈CopilotKit助力构建智能体与生成式UI](#news-14)
### 开源生态

- [开源框架 Genkit 推出中间件系统，增强代理 AI 应用可靠性](#news-15)
- [Show HN: Rust编写开源Gitdot项目展示](#news-16)
### 开发者工具

- [谷歌发布 Kotlin 与 Android 版 Agent Development Kit 0.1.0](#news-17)
- [Intuned：一款可生成可靠浏览器自动化代码的AI工具](#news-18)
- [谷歌推出Google Colab CLI，实现本地与云端无缝衔接](#news-19)
- [谷歌将 Gemini CLI 统一升级为 Antigravity CLI](#news-20)
### 安全与隐私

- [微软开源工具遭黑客入侵，AI开发者密码被盗](#news-21)
- [Signal发布声明：警示英国最新监控法案对隐私的威胁](#news-22)
- [马萨诸塞州通过隐私法案 禁止出售精确位置数据](#news-23)
- [微软推出MXC跨平台沙盒代码执行系统早期预览](#news-24)
---

## 谷歌 I/O 2026 开发者大会：从辅助 AI 到独立代理 {#news-1}

> 谷歌在 I/O 2026 开发者主题演讲中宣布了从辅助性 AI 向独立代理的战略转变，并发布了多项开发工具与平台更新。

**谷歌** 宣布了从辅助性 AI 向独立代理的转变，并强调了 `Gemini 3.5` 系列的发布和其 **Antigravity** 代理优先开发平台的主要更新。

面向移动开发者，新工具包括 Android CLI、Android Bench 评估排行榜，以及一个可将多种框架自动迁移至原生 **Kotlin** 代码的迁移代理。

Web 开发领域也迎来变革，涉及代理专用的 Chrome DevTools、HTML-in-Canvas API，以及一个名为 **WebMCP** 的开放 Web 标准提案。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 美国国防部更新清单 将阿里巴巴百度等列入涉军实体 {#news-2}

> 美国国防部更新其声称支持中国军方的实体清单，新增阿里巴巴、百度、比亚迪及**Unitree**等公司，可能限制美国企业与这些实体的业务往来。

![美国国防部更新清单 将阿里巴巴百度等列入涉军实体](https://techcrunch.com/wp-content/uploads/2026/06/unitree-robots.jpg?resize=1200,800)

美国国防部依据《2021财年国防授权法》第1260H条更新了实体清单，目前包含188家公司。此次新增了**阿里巴巴**、**百度**、**比亚迪**和**Unitree**等科技与制造企业。

**百度**和**阿里巴巴**均发表声明，否认与军方存在关联，并反对被列入该清单。此举可能增加美国国防部对相关业务的限制。

清单此次更新还纳入了蔚来、**CALB Group**、**EVE Energy**等汽车与电池企业，以及激光雷达传感器制造商**RoboSense**。

此前，该清单曾在2月短暂发布后被撤回，原因未说明。总统特朗普曾使用关税措施向中国施压，包括对中国电动汽车征收100%关税。

此举正值美中科技竞争加剧背景下，可能进一步影响相关企业的全球业务布局。

[查看原文](https://techcrunch.com/2026/06/08/pentagon-says-alibaba-baidu-byd-and-unitree-support-chinas-military/)

---

## Gemini 3.5和Antigravity模型登陆Google NotebookLM {#news-3}

> **Google NotebookLM** 正在进行重大更新，升级至最新的 `Gemini 3.5` 模型并集成 **Antigravity** 支持以处理查询。

![Gemini 3.5和Antigravity模型登陆Google NotebookLM](https://cdn.arstechnica.net/wp-content/uploads/2026/06/IMG_NewGraph_2x.width-1000.format-webp.png)

**Google NotebookLM** 正在进行其有史以来最大的更新之一，升级到最新的 `Gemini 3.5` 模型。

此次更新还包括对更多文件类型的支持和简化的网页源集成。

**NotebookLM** 将嵌入 **Antigravity** 支持以处理查询。

`Gemini 3.5 Flash` 在今年的 **Google I/O** 上首次亮相，承诺更快、更高效的处理。

**Google** 表示，在核心评估维度上，升级后的 **NotebookLM** 平均胜率为 65%。

该更新目前仅对 **AI Ultra** 和企业账户开放。

[查看原文](https://arstechnica.com/ai/2026/06/gemini-3-5-and-antigravity-come-to-google-notebooklm/)

---

## 苹果公布基于 Google Gemini 模型的全新 AI 架构 {#news-4}

> 苹果宣布对其 **Apple Intelligence** 平台进行重大升级，公布了建立在与 **Google** 合作开发的 `Gemini` 系列技术之上的新架构。

![苹果公布基于 Google Gemini 模型的全新 AI 架构](https://images.macrumors.com/t/dUIgpIiBn2wAKhWSl0HDOLdc2LU=/1600x/article-new/2026/06/apple-intelligence-architecture.jpg)

新架构的核心是苹果与 **Google** 共同开发的 **Apple Foundation Models**，可适应在设备端和服务器端运行。苹果称该合作带来了“巨大的升级”，提供最先进理解和推理能力以及包括图像理解与生成在内的多模态支持。

升级后的模型支持新的能力用例，包括逼真的图像创建、高级照片编辑和视觉问答。新的系统协调器位于修订架构的中心，协调 **Apple Intelligence** 功能安全地跨苹果平台工作。

苹果强调其方法依赖于设备端处理和私有云计算，并承诺用户数据仅用于执行即时请求。

[查看原文](https://www.macrumors.com/2026/06/08/apple-reveals-new-ai-architecture/)

---

## AI技能项目last30days-skill星标日增超3500 {#news-5}

> GitHub 上的热门 AI 项目 `mvanhorn/last30days-skill` 近日热度极高，它是一个能够研究并总结多平台信息的 AI 代理技能。

该项目使用 **Python** 语言编写，已被添加了超过 34,800 颗星。

数据显示，该项目在一天内新增了 3,558 颗星，增长迅猛。

该技能的核心功能是研究 **Reddit**、**X**、**YouTube** 等平台上的主题，并生成基于事实的总结。

[查看原文](https://github.com/mvanhorn/last30days-skill)

---

## 苹果发布全新“Siri AI”语音助手 更具对话能力 {#news-6}

> **Apple** 宣布推出全新的“**Siri AI**”语音助手，承诺提供更具对话性的体验，并将于今年秋季随系统更新推出。

**Apple** 宣布了新的“**Siri AI**”语音助手，计划于“今年秋季”在操作系统更新中发布。

新的“**Siri AI**”将伴随基于 **Google** 的 **Apple** 设备端基础模型更新，并实现与 **Apple** 操作系统更紧密的集成。

**Apple** 软件工程高级副总裁 Craig Federighi 表示，**Apple** 认为真正有用的 AI 必须以用户及其需求为中心。

在演示中，**Apple** 高管展示了 **Siri AI** 如何根据需要切换不同的使用模式和基于应用的任务。

此次更新旨在突出 **Apple Intelligence** 如何用于创造“全新的对话体验”。

[查看原文](https://arstechnica.com/apple/2026/06/say-hi-to-siri-ai-apple-announces-new-more-conversational-voice-assistant/)

---

## 苹果缓慢而稳健的AI策略显现优势 {#news-7}

> 苹果发布了迄今最大的AI产品Siri AI，其新功能由与Google Gemini的合作提供支持。

![苹果缓慢而稳健的AI策略显现优势](https://techcrunch.com/wp-content/uploads/2026/06/apple-siri-ai-use-cases.png?w=1186)

**苹果**高级副总裁**Craig Federighi**表示，苹果的目标是将先进技术转化为对每个人都有帮助的直观产品。

**Siri AI**能够从邮件或短信记录中提取信息，提供上下文建议，并使用**Gemini**从网络获取最新信息。

Siri AI版本将在今年晚些时候作为测试版向消费者推出。

通过将AI功能嵌入其助手，苹果有可能侵蚀那些只能通过**App Store**触达用户的竞争对手的优势。

[查看原文](https://techcrunch.com/2026/06/08/why-apples-slow-and-steady-ai-bet-is-starting-to-look-pretty-smart/)

---

## 苹果押注低成本AI策略 旨在吸引小型开发者加入生态 {#news-8}

> 苹果宣布将为符合条件的App Store新开发者提供免费AI基础设施，以降低开发成本，旨在吸引更多小型开发者使用其AI平台。

![苹果押注低成本AI策略 旨在吸引小型开发者加入生态](https://techcrunch.com/wp-content/uploads/2025/12/app-of-the-year.jpg?resize=1200,722)

**苹果**在开发者主题演讲中宣布，希望通过降低AI基础设施成本来吸引新开发者。下载量低于200万次的首次App Store开发者将能免费使用其在**Private Cloud Compute**中运行的`Foundation Models`。

`Foundation Models`框架今年将扩展，以支持图像输入和服务器模型。该框架的API现在可以与开发者选择的云模型提供商集成。

此举被视为苹果强化其AI开发者生态的重要策略。同时，行业动态显示，**Meta**和**Amazon**已停止其内部AI代币使用排行榜。

另有报道称，**Uber**表示其2026年的AI预算在四个月内就已用完，反映出行业对AI资源的需求激增。

苹果的新策略可能有助于在竞争激烈的开发者生态中建立差异化优势，特别是在中小型开发领域。

[查看原文](https://techcrunch.com/2026/06/08/apple-bets-cheaper-ai-will-woo-small-developers/)

---

## GitHub热门项目：turbovec向量索引库大幅降低内存占用 {#news-9}

> 基于TurboQuant算法的Rust向量索引库turbovec发布，可将千万级文档的内存占用从31GB大幅压缩至4GB。

![GitHub热门项目：turbovec向量索引库大幅降低内存占用](https://repository-images.githubusercontent.com/1192555574/c9d82d4e-1a88-4201-a548-615cfbb0b16a)

**turbovec**是一个基于TurboQuant算法构建的Rust向量索引库，并提供了Python绑定。

该库通过手写的NEON (ARM) 和 AVX-512BW (x86) 内核，实现了优于**FAISS IndexPQFastScan**的性能。

对于一个包含1000万文档的语料库，**turbovec**能将内存占用从`float32`的31GB显著减少到4GB。

它支持在线摄取、搜索时过滤和纯本地操作，主要使用Python和Rust编写。

[查看原文](https://github.com/RyanCodrai/turbovec)

---

## GitHub热门项目：个人AI基础设施构建工具 {#news-10}

> **danielmiessler/Personal_AI_Infrastructure** 是一个旨在增强人类能力的智能体 AI 基础设施 TypeScript 项目。

该项目今日在 GitHub 上表现活跃，单日新增了 62 颗星。

根据其 GitHub 页面信息，**Personal_AI_Infrastructure** 项目目前已累计获得 15,484 颗星。

[查看原文](https://github.com/danielmiessler/Personal_AI_Infrastructure)

---

## GitHub热门项目Trivy：用于多环境安全扫描的Go语言工具 {#news-11}

> GitHub热门项目aquasecurity/trivy今日持续受到开发者青睐，是一个专注于安全扫描的Go语言工具。

**aquasecurity/trivy** 是一个GitHub热门的**Go**项目，其核心功能是为容器、**Kubernetes**、代码仓库及云环境提供安全扫描。

该工具可用于查找漏洞、错误配置、泄露的密钥以及软件物料清单，覆盖了云原生应用安全的多个方面。

项目今日新增77颗星标，累计获得36,177颗星标，显示出其在开发者社区中的高人气和实用价值。

[查看原文](https://github.com/aquasecurity/trivy)

---

## GitHub热门项目sub2api：统一多平台订阅的开源中继平台 {#news-12}

> GitHub热门项目Wei-Shaw/sub2api今日获得大量关注，该项目旨在将多个主流AI服务的订阅统一到一个端点。

使用**Go**语言开发的开源项目**sub2api**今日在GitHub Trending上表现突出，获得438个新星标，总计星标数达26,420。

该项目是一个开源中继平台，其核心功能是将**Claude**、**OpenAI**、**Gemini**和**Antigravity**的订阅统一到一个端点，便于管理。

sub2api支持账户共享与成本分摊功能，并设计为与本地工具无缝兼容，为开发者提供了灵活的集成方案。

项目的快速增长反映了开发者社区对简化多平台AI服务订阅管理的需求。

[查看原文](https://github.com/Wei-Shaw/sub2api)

---

## 微软发布pg_durable，在PostgreSQL中实现持久化执行 {#news-13}

> 微软开源了**pg_durable**项目，旨在PostgreSQL中实现持久化执行，为团队提供容错的SQL工作流能力。

![微软发布pg_durable，在PostgreSQL中实现持久化执行](https://opengraph.githubassets.com/ac0ac319465d9b10af27e568f8bea947978d7e34dbbcbbeafab5e87490b10cc4/microsoft/pg_durable)

**pg_durable**为PostgreSQL引入了持久化执行模式，允许团队定义长时间运行、可容错的SQL函数。这特别适用于已将状态保存在Postgres中，并希望停止拼接cron作业、工作者和队列的团队。

工作流在SQL中定义，由pg_durable对每个步骤进行检查点，并在崩溃、重启或步骤失败后自动恢复。该模型无需额外的服务基础设施。

该项目是微软将计算带到数据附近使命的一部分，现在可以在其新的**Azure HorizonDB**（PostgreSQL云服务）中试用。

它适用于后端和数据工程师，以及需要自动化可在SQL中审计、重启后存活的运行手册的DBA和SRE。其核心思想是pg_durable函数是一个SQL步骤图。

[查看原文](https://github.com/microsoft/pg_durable)

---

## 前端技术栈CopilotKit助力构建智能体与生成式UI {#news-14}

> **CopilotKit/CopilotKit** 是一个热门的 TypeScript 项目，提供用于智能体和生成式 UI 的前端技术栈。

该技术栈支持 **React**、**Angular**、移动设备及 **Slack** 等多个平台，并且是 **AG-UI** 协议的创建者。

项目发展势头强劲，今日在 GitHub 上新增了 378 颗星，目前已累计获得 34,194 颗星。

[查看原文](https://github.com/CopilotKit/CopilotKit)

---

## 开源框架 Genkit 推出中间件系统，增强代理 AI 应用可靠性 {#news-15}

> 开源框架 **Genkit** 推出了强大的中间件系统，旨在帮助开发者构建生产就绪的、具有代理能力的 AI 应用程序。

该框架支持 **TypeScript**、**Go**、**Dart** 和 **Python**，其核心中间件系统可以拦截生成调用以注入自定义行为，例如重试、模型回退和人在环中的工具批准。

开发者可以在生成、模型和工具层附加钩子，以确保模型输出的高可靠性和确定性控制。

**Genkit** 允许创建和堆叠自定义中间件，并提供了专用的开发者 UI 用于检查和调试这些配置。

此功能为构建更健壮和可预测的复杂 AI 代理应用提供了基础。

[查看原文](https://developers.googleblog.com/announcing-genkit-middleware-intercept-extend-and-harden-your-agentic-apps/)

---

## Show HN: Rust编写开源Gitdot项目展示 {#news-16}

> 一个名为 **Gitdot** 的项目在 Hacker News 首页展示，它自称是“更好的 GitHub”，并且完全开源。

![Show HN: Rust编写开源Gitdot项目展示](https://gitdot.io/gitdot-long-black.svg?dpl=dpl_8t5VFhVE6K7TBrthov6GwELeHBLj)

该项目使用 **Rust** 语言编写，旨在提供一个与 GitHub 不同的代码托管与协作平台。

该项目目前在 Hacker News 上引发了讨论，但具体功能细节因页面内容可读性较低而暂不明确。

[查看原文](https://gitdot.io/)

---

## 谷歌发布 Kotlin 与 Android 版 Agent Development Kit 0.1.0 {#news-17}

> 谷歌宣布发布 Kotlin 版 `Agent Development Kit` (ADK) 0.1.0 及专用的 Android ADK 库，旨在简化 AI 代理的创建。

该开源框架通过管理跨云和边缘环境的复杂编排、会话共享和错误处理，简化了开发流程。新版本支持混合编排，允许开发人员构建多代理系统。

系统允许基于云的模型将特定任务无缝卸载到本地设备模型（例如 `Gemini Nano`），从而增强用户隐私。此举将助力开发者在 Android 及其他平台上更便捷地构建 AI 代理。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## Intuned：一款可生成可靠浏览器自动化代码的AI工具 {#news-18}

> Intuned 是一个 YC S22 项目，旨在通过其核心产品 Intuned Agent 构建和运行可靠的浏览器自动化，能从提示生成生产就绪的代码。

![Intuned：一款可生成可靠浏览器自动化代码的AI工具](https://intunedhq.com/og-image.png)

Intuned Agent 可以从提示生成 **Playwright** 代码并进行部署，并在网站发生变化时使用 AI 进行自动修复。

该工具支持 **TypeScript** 或 **Python**，并与 **Playwright** 或任何兼容的库或框架一起使用。

其功能包括内置隐身和身份验证处理、计划任务与监控以及自动扩展。Intuned 提供网络爬虫、RPA、AI 自动化和托管数据抓取等多种用例。

[查看原文](https://intunedhq.com)

---

## 谷歌推出Google Colab CLI，实现本地与云端无缝衔接 {#news-19}

> 谷歌发布了全新的`Google Colab`命令行界面（CLI），允许开发者及AI代理将本地终端无缝连接到远程Colab运行时，以执行高性能计算任务。

这款轻量级CLI工具使用户能够轻松请求高性能GPU，远程运行本地Python脚本，并检索工件、日志或模型（例如微调的`Gemma 3`适配器）。

该工具直接集成到标准终端环境中，具有高度可编程性，能够被**Antigravity**或`Claude Code`等AI代理用于管理复杂的机器学习管道。

开发者现在可以通过一个简单的命令行界面，管理从资源请求到结果获取的完整工作流，提升了开发效率。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 谷歌将 Gemini CLI 统一升级为 Antigravity CLI {#news-20}

> 谷歌正在将其 AI 终端工具统一，将社区驱动的 `Gemini CLI` 转变为新的、以代理为中心的 `Antigravity CLI`。

`Antigravity CLI` 是一个为复杂的多代理工作流构建的新平台。这个新的基于 Go 的工具提供更快的执行速度和异步处理能力。

该工具与 **Antigravity 2.0** 桌面应用程序共享统一架构。企业客户将维持现有访问权限。

但个人和免费用户必须在 2026 年 6 月 18 日 `Gemini CLI` 停止服务之前过渡到新平台。

[查看原文](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli/)

---

## 微软开源工具遭黑客入侵，AI开发者密码被盗 {#news-21}

> 微软已关闭数十个GitHub开源项目以调查黑客入侵事件，恶意软件旨在窃取AI编码工具用户的敏感凭证。

![微软开源工具遭黑客入侵，AI开发者密码被盗](https://techcrunch.com/wp-content/uploads/2022/07/Microsoft-e1658216731934.jpg?resize=1200,675)

微软已关闭其在**GitHub**上托管的数十个开源项目，以调查黑客入侵并植入密码窃取恶意软件的事件。

受影响的项目与**Azure**云服务以及**Claude Code**、**Gemini**命令行界面和**VS Code**等AI编码工具相关。

安全公司**Cloudsmith**和**OpenSourceMalware**率先标记了此次入侵。该恶意软件允许黑客在工具被使用时窃取密码。

微软发言人表示，公司“暂时移除了一些存储库以调查潜在的恶意内容”。至少70个项目在GitHub上被“禁用”。

这已是微软在过去几周内已知的第二次入侵事件，此前**Durable Task**开源项目在五月中旬被入侵。目前不清楚具体影响范围。

[查看原文](https://techcrunch.com/2026/06/08/microsofts-open-source-tools-were-hacked-to-steal-passwords-of-ai-developers/)

---

## Signal发布声明：警示英国最新监控法案对隐私的威胁 {#news-22}

> Signal发布了一份题为“监控不是安全”的PDF声明，就英国最新隐私威胁表达立场。

Signal公司发布了标题为“**监控不是安全：关于英国最新隐私威胁的声明**”的文档，以PDF格式公开。

该声明出现在Hacker News等技术社区的前页，引起了广泛关注，表明其内容涉及重要的安全与隐私议题。

目前仅能确认文档的存在和标题，其关于英国隐私威胁的具体论述内容需查阅原文PDF方可获知。

[查看原文](https://signal.org/blog/pdfs/2026-06-08-uk-surveillance-is-not-safety.pdf)

---

## 马萨诸塞州通过隐私法案 禁止出售精确位置数据 {#news-23}

> 马萨诸塞州立法者投票通过了一项隐私保护法案，赋予居民访问和删除科技巨头数据的新权利，并禁止公司出售用户的精确位置数据。

![马萨诸塞州通过隐私法案 禁止出售精确位置数据](https://techcrunch.com/wp-content/uploads/2022/07/GettyImages-1392356345.jpg?resize=1200,800)

马萨诸塞州众议院以 146 票对 0 票一致通过了该法案。该法案适用于处理超过 10 万消费者个人数据的公司。

新法律将阻止在没有用户明确同意的情况下共享或出售敏感信息，包括生物识别信息和精确地理位置数据。

该法案将同时适用于居民和访客，从而在全州范围内禁止位置数据的出售。目前，该法案尚待州长签署才能正式生效。

[查看原文](https://techcrunch.com/2026/06/08/massachusetts-votes-to-pass-new-privacy-rights-bill-that-bans-sale-of-precise-location-data/)

---

## 微软推出MXC跨平台沙盒代码执行系统早期预览 {#news-24}

> 微软开源了MXC系统，旨在为Windows、Linux和macOS提供安全隔离的不受信任代码执行环境。

![微软推出MXC跨平台沙盒代码执行系统早期预览](https://opengraph.githubassets.com/29a5dfbbcc94c4b640d1c7578d0a53b9861fa1058d760de4935eff3676872f7d/microsoft/mxc)

**MXC**是一个用于在**Windows**、**Linux**和**macOS**上运行不受信任代码的沙盒化代码执行系统。

该系统提供了从操作系统原生进程沙盒到完整虚拟机的多种隔离后端，可通过JSON配置和**TypeScript SDK**统一管理。

此仓库目前是**Microsoft Execution Containers**的早期预览代码，其底层沙盒和生成的策略预计会持续变化。

MXC支持策略驱动的沙盒化，包括文件系统、网络和UI策略，但当前版本存在策略过于宽松的已知问题。

微软提醒，不应将当前任何**MXC**配置文件视为安全边界，并将在正式发布前解决相关问题。

[查看原文](https://github.com/microsoft/mxc)


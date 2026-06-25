---
title: 科技早报 2026-06-25
category: "科技, 科技早报"
excerpt: 谷歌发布Gemini 3.5并宣布向独立智能体转型，多家公司开源AI语音与智能体工具。
lastEdited: 2026年6月25日
tags: [科技早报, AI, 智能体, 谷歌, GitHub, 开源, 开发者工具, 网络安全]
imageUrl: 
---

## 概览

### 要闻

- [Google I/O 2026发布Gemini 3.5系列，宣布向独立智能体转型](#news-1)
### AI 与机器学习

- [开源语音工作室Voicebox成ElevenLabs免费替代品](#news-2)
- [谷歌推出 Gemma 4 12B 模型，支持本地笔记本电脑运行多模态 AI](#news-3)
- [A24与谷歌DeepMind建立7500万美元AI合作引发影迷不满](#news-4)
- [Snowflake基准测试显示GLM-5.2性价比远超Claude Opus 4.7](#news-5)
- [Google 提出 AI 编码代理“洞察策略”评估框架](#news-6)
- [Google发布Agent开发套件，展示跨语言多智能体协作](#news-7)
### GitHub 热门项目

- [GitHub热门：JCodesMore/ai-website-cloner-template项目](#news-8)
- [字节跳动开源长周期超级代理框架deer-flow](#news-9)
- [GitHub热门：Playwright框架助力跨浏览器Web自动化测试](#news-10)
- [GitHub热门：stablyai/orca项目助力并行代理管理](#news-11)
- [GitHub热门：google-labs-code/design.md规范受关注](#news-12)
- [开源托管智能体平台 Multica 登顶 GitHub](#news-13)
### 开源生态

- [谷歌发布智能体资源发现规范 ARD](#news-14)
- [Google 开源 ADK for Kotlin/Android 0.1.0，简化 Android 等环境 AI 代理构建](#news-15)
- [开源项目 PR Spam 泛滥 模式类似早期垃圾邮件](#news-16)
### 开发者工具

- [Rust 编写的极快 Python 包管理器 uv 星标数逼近 9 万](#news-17)
- [Figma发布重大更新：集成代码层、动画支持与AI插件创建功能](#news-18)
- [Google 发布 Colab 命令行界面，提升开发效率](#news-19)
- [谷歌推出A2UI与MCP应用集成架构模式](#news-20)
### 安全与隐私

- [国际行动重创网络犯罪“流水线”，微软AI成关键](#news-21)
- [FCC拟推行实名制，预付费手机匿名使用或受限](#news-22)
- [白宫应用自动安装至政府手机且无法卸载引不满](#news-23)
- [Google 为“通过 Google 登录”引入新会话元数据](#news-24)
---

## Google I/O 2026发布Gemini 3.5系列，宣布向独立智能体转型 {#news-1}

> Google在开发者大会上宣布从辅助性AI转向独立智能体，并推出新模型和开发工具。

Google宣布从辅助性AI向独立智能体转型。

发布了 **Gemini 3.5** 系列模型。

对 **Antigravity** 智能体优先开发平台进行了重大更新。

为移动开发者引入新的 **Android CLI** 工具。

推出自动化迁移智能体，可将各种框架快速转换为原生 **Kotlin** 代码。

提出了 **WebMCP** 标准，使基于浏览器的AI智能体能够执行复杂任务。

[查看原文](https://developers.googleblog.com/all-the-news-from-the-google-io-2026-developer-keynote/)

---

## 开源语音工作室Voicebox成ElevenLabs免费替代品 {#news-2}

> **Voicebox** 是一个功能全面的开源 **AI** 语音工作室，作为 **ElevenLabs** 等商业服务的免费替代方案，已获得广泛关注。

![开源语音工作室Voicebox成ElevenLabs免费替代品](https://opengraph.githubassets.com/f51c06447faae81c1ac573641414fc66e017269a750078a11a7287b0a12ddacc/jamiepine/voicebox)

该项目是一个开源 **AI** 语音工作室，提供语音克隆、语音生成、应用内听写及为 **AI** 代理提供语音等完整功能。

**Voicebox** 内置 **7** 个 **TTS** 引擎，包括 **`Qwen3-TTS`**、**`Chatterbox Multilingual`** 等，并支持 **23** 种语言。

该项目强调隐私保护，所有模型、语音数据和捕获内容均在本地处理，不离开用户机器。

**Voicebox** 包含一个本地 **LLM** 用于语音精炼，并基于 **Whisper** 实现语音转文本。该项目在 **GitHub** 上使用 **TypeScript** 开发，星标数已达 **33.9k**。

[查看原文](https://github.com/jamiepine/voicebox)

---

## 谷歌推出 Gemma 4 12B 模型，支持本地笔记本电脑运行多模态 AI {#news-3}

> 谷歌 DeepMind 发布 Gemma 4 12B 模型，可在配备 16GB 内存的笔记本电脑上运行，实现本地数据处理、视觉洞察生成与智能体式工作流。

谷歌宣布将 `Gemma 4 12B` 模型带到日常笔记本电脑，支持配备 16GB RAM 的设备，开启本地化、智能体式 AI 应用。

该模型通过 **Google AI Edge Gallery**（macOS）支持动态 Python 代码执行与可视化，并可通过 **Google AI Edge Eloquent** 实现完全离线的语音听写和文本编辑。

开发者工作流因 **LiteRT-LM CLI** 的新 `serve` 命令而得到增强，该命令创建了一个行业兼容的本地端点，可用于驱动完全本地化的 AI 工具和代理。

[查看原文](https://developers.googleblog.com/bringing-gemma-4-12b-to-your-laptop-unlocking-local-agentic-workflows-with-google-ai-edge/)

---

## A24与谷歌DeepMind建立7500万美元AI合作引发影迷不满 {#news-4}

> 电影《Backrooms》全球票房超3亿美元后，A24宣布与谷歌DeepMind建立7500万美元研究合作，旨在创建新的电影制作工具。

![A24与谷歌DeepMind建立7500万美元AI合作引发影迷不满](https://media.wired.com/photos/6a3b30e85935a4d59defead5/191:100/w_1280,c_limit/Google-A24-Taste-AI-Partnership-Culture.jpg)

该合作是A24旗下技术初创公司**A24 Labs**的一部分，由联合创始人**Scott Belsky**监督。**A24**首席沟通官**Sophia Shin**表示，这是一个研究合作伙伴关系，团队将与**DeepMind**的研究人员并肩工作。

此合作已引发**A24**影迷的不满，批评声音出现在《The Debut》电影预告片的社交媒体评论中。

文章提到了其他好莱坞与硅谷的合作，包括**迪士尼**曾向**OpenAI**投资10亿美元但交易后被取消。文章指出，AI对电影和创意艺术的威胁是多方面的。

[查看原文](https://www.wired.com/story/a24-knows-youre-mad-about-the-google-ai-collab/)

---

## Snowflake基准测试显示GLM-5.2性价比远超Claude Opus 4.7 {#news-5}

> Snowflake CEO表示，**智谱AI** 的 `GLM-5.2` 在性能上接近 **Claude Opus 4.7**，但成本仅为后者的五分之一。

![Snowflake基准测试显示GLM-5.2性价比远超Claude Opus 4.7](https://the-decoder.com/wp-content/uploads/2026/06/china_us_price_war.png)

**智谱AI** 的 `GLM-5.2` 在Snowflake基准测试中，表现接近 **Claude Opus 4.7**。

该基准测试包含103个编码任务。

`GLM-5.2` 的每输出token成本是 `Claude Opus 4.7` 的五分之一。

不过，`GLM-5.2` 完成每个任务消耗的token数量几乎是 `Claude Opus 4.7` 的两倍。

报告称，这种价格差距给 **Anthropic** 和 **OpenAI** 带来了压力。

[查看原文](https://the-decoder.com/snowflake-ceo-finds-glm-5-2-competitive-with-opus-4-7-at-a-fraction-of-the-cost/)

---

## Google 提出 AI 编码代理“洞察策略”评估框架 {#news-6}

> Google 博客文章探讨了如何评估 AI 编码代理的“洞察策略”，即其判断信息重要性并决定是否中断开发者的机制。

![Google 提出 AI 编码代理“洞察策略”评估框架](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Measuring_What_Matters_with_Jules.2e16d0ba.fill-1200x600.png)

AI 编码代理正从响应式助手向能主动发现风险并提供诊断的引擎转变。文章主张，应根据代理的“洞察策略”——即其如何判断重要信息、证据支持及是否中断开发者——对其进行评级。

研究团队使用了来自内部 Google 代码库的 705 个缺陷及对应的 1,178 个代码变更来构建初步评估集。

论文提出通过“时间接近性”和“语义相似性”等启发式方法，从真实的缺陷修复历史中构建用于评估的“地面真相”数据集。

[查看原文](https://developers.googleblog.com/measuring-what-matters-with-jules/)

---

## Google发布Agent开发套件，展示跨语言多智能体协作 {#news-7}

> Google介绍了如何使用Agent Development Kit和Agent2Agent协议构建一个由Python和Go Agent协作的合同合规系统。

![Google发布Agent开发套件，展示跨语言多智能体协作](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/banner.2e16d0ba.fill-1200x600.jpg)

文章展示了一个由Python Agent和Go Agent协作的多智能体管道。Python Agent使用**Gemini**模型从法律合同中提取关键条款。

Go Agent则使用确定性逻辑验证条款是否符合公司政策，两个服务通过Agent2Agent协议连接。

整个管道由Google的**Agent Development Kit**编排，并介绍了跨语言Agent协作、ADK的RemoteA2aAgent抽象和多智能体管道编排等架构模式。

[查看原文](https://developers.googleblog.com/build-cross-language-multi-agent-team-with-google-agent-development-kit-and-a2a/)

---

## GitHub热门：JCodesMore/ai-website-cloner-template项目 {#news-8}

> 一个名为JCodesMore/ai-website-cloner-template的GitHub项目因其“使用AI编码代理通过一条命令克隆任何网站”的功能而受到关注。

该项目在GitHub Trending的TypeScript类别中被列出。

截至当前，该项目已获得19,432颗星，今日新增692颗星。

项目旨在提供一种通过AI代理快速复现网站模板的工具。

[查看原文](https://github.com/JCodesMore/ai-website-cloner-template)

---

## 字节跳动开源长周期超级代理框架deer-flow {#news-9}

> **字节跳动**开源的 **`deer-flow`** 项目在GitHub Trending上迅速获得关注，这是一个旨在处理长时间复杂任务的超级代理框架。

该项目是一个开源的 **长周期SuperAgent框架**，具备研究、编码和创作能力。

框架通过**沙箱**、**记忆**、**工具**、**技能**、**子代理**和**消息网关**来运行，可处理从几分钟到数小时的不同级别任务。

**`deer-flow`** 使用 **Python** 编写，已获得超过 7.4 万个星标，今日趋势新增星标超过 600 个。

这表明开发者社区对能够执行复杂、持续性任务的自动化工具需求旺盛。

[查看原文](https://github.com/bytedance/deer-flow)

---

## GitHub热门：Playwright框架助力跨浏览器Web自动化测试 {#news-10}

> 微软的Playwright框架凭借其单一API跨浏览器测试能力，在GitHub Trending上获得广泛关注，项目星标数已超9.1万。

**Playwright** 是一个用于 Web 测试和自动化的框架，允许开发者使用单一 API 测试 **Chromium**、**Firefox** 和 **WebKit** 三种浏览器引擎。

该项目目前在 GitHub Trending 上，开发语言为 **TypeScript**，已积累 **91,589** 颗星。

数据显示，该项目今日获得了 **83** 颗星的流行度，显示出持续的开发者兴趣。

[查看原文](https://github.com/microsoft/playwright)

---

## GitHub热门：stablyai/orca项目助力并行代理管理 {#news-11}

> GitHub Trending上出现了一个名为stablyai/orca的项目，它被描述为一个用于处理并行代理舰队的ADE。

该项目支持用户使用自己的订阅来运行任何编码代理。

据描述，它可在桌面和移动设备上使用。

目前，该项目已获得6,879颗星，今日新增331颗星。

需要注意的是，原文中术语‘ADE’的完整含义未明确定义。

[查看原文](https://github.com/stablyai/orca)

---

## GitHub热门：google-labs-code/design.md规范受关注 {#news-12}

> GitHub Trending上，google-labs-code/design.md项目获得关注，它是一种向编码代理描述视觉身份的格式规范。

DESIGN.md规范旨在为AI编码代理提供对设计系统的持久、结构化理解。

该项目目前在GitHub Trending的TypeScript类别中被列出。

截至当前，该项目已获得17,463颗星，今日新增619颗星。

[查看原文](https://github.com/google-labs-code/design.md)

---

## 开源托管智能体平台 Multica 登顶 GitHub {#news-13}

> 开源项目 `multica-ai/multica` 是一个使用Go语言编写的托管智能体平台，旨在将编码智能体转变为真正的团队成员。

该项目在GitHub上趋势排名靠前，目前已获得37,891颗星，今日新增182颗星。

平台被描述为一个开源的托管智能体环境，其目标是支持为智能体分配任务、跟踪进度并积累技能。

核心愿景是让编码智能体超越单一工具角色，成为能够协作和成长的团队成员。

[查看原文](https://github.com/multica-ai/multica)

---

## 谷歌发布智能体资源发现规范 ARD {#news-14}

> 谷歌宣布推出名为“Agentic Resource Discovery (ARD)”的开放规范，旨在为网络上工具、技能及智能体的发现与验证提供统一标准。

![谷歌发布智能体资源发现规范 ARD](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Gemini_Generated_Image_gzxwoagzxw.2e16d0ba.fill-1200x600.jpg)

ARD规范由谷歌与业界合作伙伴共同开发，旨在解决当前智能体生态系统中能力发现碎片化与缺乏互操作性的问题。

规范的核心架构基于“目录”和“注册表”两个原语。目录由组织发布并托管于其自身域名，用于描述可用能力。

注册表则充当智能体网络的搜索引擎，通过爬取已发布的目录并建立索引来工作。

该规范的目标是提供一种标准方法，使智能体能够跨越组织边界发现能力并建立信任，无论其底层框架或协议如何。

[查看原文](https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/)

---

## Google 开源 ADK for Kotlin/Android 0.1.0，简化 Android 等环境 AI 代理构建 {#news-15}

> Google 宣布推出适用于 **Kotlin** 的 **Agent Development Kit (ADK)** 0.1.0 版本及专用 Android 库，旨在简化跨云和边缘环境的 AI 代理创建。

**Google** 宣布推出适用于 **Kotlin** 的 **Agent Development Kit (ADK)** 0.1.0 版本以及专门的 **Android ADK** 库。

这是一个开源框架，通过管理跨云和边缘环境的复杂编排、会话共享和错误处理来简化 **AI 代理**的创建。

此次发布支持混合编排，使开发者能够构建多代理系统，其中基于云的模型可以将特定任务无缝卸载到本地设备模型（如 **Gemini Nano**）以增强用户隐私。

[查看原文](https://developers.googleblog.com/adk-kotlin-android-building-ai-agents/)

---

## 开源项目 PR Spam 泛滥 模式类似早期垃圾邮件 {#news-16}

> 开源仓库正面临大量低质量 PR 的冲击，其模式与 2000 年代早期的电子邮件垃圾邮件如出一辙。

![开源项目 PR Spam 泛滥 模式类似早期垃圾邮件](https://greptile.com/opengraph/greptile-blog.png)

以 **OpenClaw** 仓库为例，其每周收到的 PR 数量从约 2 个激增至 3,400 个，这严重影响了项目的正常维护。

激增的 PR 中，许多内容质量低下，常由 AI 编码代理生成。有贡献者一天内提交了 106 个 PR，间隔中位数仅 3 秒。

这种 spam 现象导致 PR 合并率从之前的约 48% 骤降至不足 9.3%。项目开始按贡献者声誉进行过滤，首次提交者的合并率仅为 8.2%。

为应对此类问题，**Mitchell Hashimoto** 创建了终端模拟器 **Ghostty**，并发布了信任管理系统 **Vouch**。

[查看原文](https://www.greptile.com/blog/prs-on-openclaw)

---

## Rust 编写的极快 Python 包管理器 uv 星标数逼近 9 万 {#news-17}

> 用 Rust 编写的 Python 包与项目管理器 `uv` 在 GitHub 上星标数已达 86.7k，其速度比 `pip` 快 10 到 100 倍。

![Rust 编写的极快 Python 包管理器 uv 星标数逼近 9 万](https://opengraph.githubassets.com/1a86ceb94461fcd8454e85509d9fc5b9500958deb0606d1b5a2bff9ff1666d27/astral-sh/uv)

`uv` 是一个单一的工具，旨在替代 `pip`、`pip-tools`、`pipx`、`poetry`、`pyenv`、`twine`、`virtualenv` 等多个 Python 开发工具。

该工具提供全面的项目管理功能，包括通用锁文件支持。它还能安装并管理不同版本的 Python。

**Astral**（`Ruff` 和 `ty` 的创建者）为该项目提供支持。用户可以通过 `curl` 或 `pip` 安装 `uv`，无需预先安装 Rust 或 Python 环境。

[查看原文](https://github.com/astral-sh/uv)

---

## Figma发布重大更新：集成代码层、动画支持与AI插件创建功能 {#news-18}

> 设计平台**Figma**在周三发布的更新中，新增了代码层、对动画和着色器的支持，并引入了使用AI创建自定义插件的能力。

![Figma发布重大更新：集成代码层、动画支持与AI插件创建功能](https://techcrunch.com/wp-content/uploads/2026/06/Config-product-feat.jpg?resize=1200,675)

**Figma**此次更新将代码层直接集成到协作画布中，帮助设计团队克隆代码仓库并测试从代码中提取的设计流程。

平台现在支持动画、过渡和3D变换，设计师可以直接在**Figma**中集成这些效果，无需依赖外部工具。

用户现在可以利用AI来创建动画资产，并添加着色器效果和填充。更新还增强了AI助手的功能，允许用户编写文本提示来创建可重复使用的技能。

公司还将添加一项功能，帮助用户通过提示创建自定义插件，例如布局生成器或矢量路径跟踪器，以进一步自动化设计流程。

[查看原文](https://techcrunch.com/2026/06/24/figma-adds-code-layers-support-for-animations-more-ai-features-in-new-update/)

---

## Google 发布 Colab 命令行界面，提升开发效率 {#news-19}

> **Google** 推出了 **Google Colab** 命令行界面（CLI），允许开发者和 AI 代理将本地终端连接到远程 Colab 运行时。

这款轻量级 CLI 工具使开发者能轻松请求高性能 GPU，并远程运行本地 Python 脚本。

用户可以无缝检索制品日志或模型，例如经过微调的 **Gemma 3** 适配器。

该工具高度可编程，已准备好被 `Antigravity` 或 `Claude Code` 等 AI 代理使用。

它通过直接集成到标准终端环境中，帮助开发者管理复杂的机器学习工作流。

[查看原文](https://developers.googleblog.com/introducing-the-google-colab-cli/)

---

## 谷歌推出A2UI与MCP应用集成架构模式 {#news-20}

> 谷歌开发者博客介绍了将模型上下文协议（**MCP**）应用与代理到用户界面（**A2UI**）集成的三种架构模式。

文章探讨了在高度自定义的iframe环境与原生声明式渲染之间进行权衡的集成方案。

这些模式使开发者能够通过 **MCP** 服务器直接提供具有原生感觉的用户界面。

开发者现在可以安全地将复杂且有状态的iframe应用嵌入到声明式视图中。

此外，该框架支持将生成式UI组件注入遗留系统，旨在提供安全、高性能且品牌一致的代理用户体验。

[查看原文](https://developers.googleblog.com/a2ui-and-mcp-apps/)

---

## 国际行动重创网络犯罪“流水线”，微软AI成关键 {#news-21}

> 国际执法机构与科技公司联手，成功捣毁一条涉及数百万登录凭证的网络犯罪“流水线”，涉案金额超过4700万美元。

此次行动的核心是同时打击了**Amadey**和**StealC**两个广泛使用的恶意工具。**Amadey**是一个自2018年起就出现的恶意软件即服务平台，而**StealC**则专门窃取凭证、Cookie和加密货币钱包。

**微软**在利用AI分析工具后发现，这两个看似无关的工具在底层共享部分基础设施。这一关键发现使得**微软**的律师能够同时向法庭申请对两者实施破坏。

该“流水线”被用于通过勒索软件支付等多种欺诈手段窃取资金。此次成功的联合行动展示了执法部门与私营企业合作打击复杂网络犯罪的新模式。

[查看原文](https://arstechnica.com/security/2026/06/one-two-punch-delivered-in-global-operation-disrupts-cybercrime-assembly-line/)

---

## FCC拟推行实名制，预付费手机匿名使用或受限 {#news-22}

> 美国联邦通信委员会（FCC）正考虑一项新提案，要求电话公司在提供服务前收集用户的详细身份信息，这可能终结预付费手机（俗称“一次性手机”）的匿名使用。

该提案旨在打击自动语音电话骚扰，但要求电话公司获取并保留客户的姓名、实际地址、政府颁发的身份证号码以及备用电话号码。

批评者指出，这一规定将使人们无法在不透露身份的情况下购买和使用预付费手机。全国终结家庭暴力网络的技术专家警告，这可能影响家庭暴力幸存者等群体的安全实践。

目前FCC正在就此提案征求公众意见，该提案若通过，将对注重隐私的手机用户群体产生直接影响。

[查看原文](https://arstechnica.com/tech-policy/2026/06/fcc-plans-id-mandate-that-could-block-anonymous-use-of-prepaid-burner-phones/)

---

## 白宫应用自动安装至政府手机且无法卸载引不满 {#news-23}

> 白宫宣布其新应用将被自动下载到数百万政府雇员的工作手机上，且无法卸载，引发部分员工不安。

美国农业部、国务院和劳工部的员工表示，他们对该应用出现在自己的工作手机上感到不安。

一些员工尝试删除该应用，但应用会立即重新出现，无法被卸载。白宫方面尚未对此举做出详细解释。

该应用目前被强制安装到数百万政府雇员的工作手机上，引发了关于隐私和设备控制权的讨论。

[查看原文](https://arstechnica.com/tech-policy/2026/06/white-house-app-auto-downloads-to-government-phones-cant-be-uninstalled/)

---

## Google 为“通过 Google 登录”引入新会话元数据 {#news-24}

> Google 正在增强其“通过 Google 登录”服务，引入新的 OIDC 标准声明，以提升应用安全性与信任度。

新引入的 `auth_time` 和 `amr` 声明允许经过验证的应用程序检查用户登录的“新鲜度”以及使用的具体身份验证方法。

这些联合身份信号能帮助平台更好地防止账户接管和欺诈行为。

开发者可以利用这些元数据实施更细粒的安全策略，例如对敏感操作进行逐步认证。

这使得动态的、基于风险的访问控制成为可能，为应用提供更深层次的会话信息。

[查看原文](https://developers.googleblog.com/enhance-security-and-trust-new-session-metadata-in-sign-in-with-google/)


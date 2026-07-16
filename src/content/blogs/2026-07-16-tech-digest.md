---
title: 科技早报 2026-07-16
category: "科技, 科技早报"
excerpt: 苹果获准在中国引入阿里Qwen，Thinking Machines发布开放权重模型Inkling，OpenAI以GPT-Red强化模型安全。
lastEdited: 2026年7月16日
tags: [科技早报, 人工智能, 苹果, 阿里巴巴, Qwen, Thinking Machines, OpenAI, 开源模型]
imageUrl: 
---

## 概览

### 要闻

- [美国法官暂禁以内容审核工作撤销研究人员身份](#news-1)
- [FCC拟废除电视台全国覆盖率39%上限](#news-2)
- [IEEE永久开除前智能车辆汇刊主编费跃旺](#news-3)
### AI 与机器学习

- [Thinking Machines推出开放权重模型Inkling支持定制](#news-4)
- [苹果AI服务获准携阿里Qwen模型进入中国](#news-5)
- [Thinking Machines 发布开放权重模型 Inkling 并预览小型版](#news-6)
- [OpenAI推出GPT-Red自动化红队测试提升防御](#news-7)
- [Google 展示 Pixel 10 端侧 AI，发布 Gemma 4 E2B](#news-8)
- [OpenAI以GPT-Red自我对弈强化模型安全](#news-9)
### GitHub 热门项目

- [nanobot 推出可自托管的轻量个人 AI Agent](#news-10)
- [GitHub spec-kit 获超 12 万 Star 登趋势榜](#news-11)
- [screenpipe 登上 GitHub 热门，主打本地 AI 记忆记录](#news-12)
- [BrowserOS 登上 GitHub 热门，定位开源智能体浏览器](#news-13)
- [开源托管智能体平台 multica 登上 GitHub 热门](#news-14)
- [pi-computer-use为Pi智能体提供桌面操作能力](#news-15)
### 开源生态

- [xAI称Grok Build已开源，但细节尚未披露](#news-16)
- [OpenTelemetry Spring Boot Starter支持声明式配置](#news-17)
- [Brainless展示Claude Code、Codex与Grok风格shadcn组件](#news-18)
- [Primate 创建者阐述全栈 Web 框架设计主张](#news-19)
### 开发者工具

- [文章质疑async/await无法单独解决并发执行问题](#news-20)
- [SendLang 推出邮件自动化 DSL，支持分群与流程版本管理](#news-21)
### 安全与隐私

- [微软单月修复570个漏洞，称AI助推发现问题](#news-22)
- [微软创纪录补丁日后Windows权限提升漏洞利用公开](#news-23)
- [黑客称 Suno 源码显示曾抓取多平台音频训练](#news-24)
---

## 美国法官暂禁以内容审核工作撤销研究人员身份 {#news-1}

> 美国地区法官James Boasberg批准初步禁令，暂时禁止国务院执行一项受到**独立技术研究联盟**挑战的签证限制政策。案件尚未作出最终裁决。

**独立技术研究联盟**（CITR）提起诉讼，挑战一项被用于尝试撤销相关非美国公民绿卡并实施驱逐的政策。

据原文，该政策涉及从事错误信息、虚假信息、事实核查、内容审核、合规及信任与安全工作的人员。

Boasberg周二发布意见，禁止美国国务院在CITR诉讼解决前执行该政策。

政策文本本身不要求拒发签证或驱逐，而是授权对疑似协助外国对手、通过压制美国言论操纵公众舆论者开展移民调查。

[查看原文](https://arstechnica.com/tech-policy/2026/07/judge-trump-cant-deport-researchers-just-for-working-in-content-moderation/)

---

## FCC拟废除电视台全国覆盖率39%上限 {#news-2}

> 美国联邦通信委员会将就废除《全国电视所有权规则》投票。FCC主席Brendan Carr拟以逐案审查并购交易取代39%的全国覆盖率限制。

《全国电视所有权规则》旨在限制单一广播电视台所有者覆盖的美国电视家庭比例不得超过39%。

Brendan Carr在Breitbart发表的评论文章中宣布该计划，主张以对每项拟议并购交易进行逐案审查替代现有限制。

今年3月，Carr领导的FCC批准豁免，允许**Nexstar Media Group**收购**Tegna**，该交易使Nexstar覆盖范围超过半数电视家庭。

FCC此前主张国会已赋予其修改或豁免该规则的权力；其是否有权废除国会设定的限制，可能引发法院诉讼。

[查看原文](https://arstechnica.com/tech-policy/2026/07/fcc-to-repeal-39-tv-ownership-cap-in-boost-for-trump-friendly-news-orgs/)

---

## IEEE永久开除前智能车辆汇刊主编费跃旺 {#news-3}

> IEEE宣布，自2026年6月21日起对前**IEEE Transactions on Intelligent Vehicles**主编费跃旺博士实施一级开除。其IEEE会员资格已被终止，并被永久禁止参与IEEE组织及活动。

![IEEE永久开除前智能车辆汇刊主编费跃旺](https://spectrum.ieee.org/media-library/a-word-bubble-with-the-ieee-inside.jpg?id=25592350&width=1245&height=700&coordinates=0%2C116%2C0%2C117)

根据IEEE章程`I-110.5(D)(i)`，费跃旺博士不再是IEEE会员。

IEEE表示，费跃旺博士被永久禁止加入任何IEEE组织单位，也被永久禁止参与任何IEEE活动。

该通知由IEEE董事会决定向IEEE会员发布。

[查看原文](https://spectrum.ieee.org/notice-to-membership-july-2026)

---

## Thinking Machines推出开放权重模型Inkling支持定制 {#news-4}

> **Thinking Machines Lab** 发布首个开放权重模型 `Inkling`，外部开发者和公司可下载并直接修改。公司将其定位为通过 **Tinker** 进行微调的起点。

![Thinking Machines推出开放权重模型Inkling支持定制](https://techcrunch.com/wp-content/uploads/2025/04/GettyImages-1730510668.jpg?resize=1200,800)

`Inkling` 采用混合专家系统架构，总参数量为9750亿，每项任务约激活410亿参数。

据 **Thinking Machines** 发布材料，模型使用45万亿个文本、图像、音频和视频 token 训练，可原生处理文本、图像和音频。

该公司称，用户可调节模型的“思考投入”，以在速度和性能之间权衡；模型会标示不确定性而非猜测。

**Thinking Machines** 明确表示，`Inkling` 不是当前最强的开放或闭源模型。其训练数据规模及相关能力说明来自公司发布材料。

[查看原文](https://techcrunch.com/2026/07/15/thinking-machines-amps-up-its-bet-against-one-size-fits-all-ai-with-its-first-open-model-inkling/)

---

## 苹果AI服务获准携阿里Qwen模型进入中国 {#news-5}

> 监管机构已批准**苹果**通过与**阿里巴巴**合作，在中国推出`Apple Intelligence`。阿里巴巴的`Qwen` AI模型将被引入苹果操作系统。

`Apple Intelligence`获准进入中国市场，相关服务将通过苹果与阿里巴巴的合作推出。

根据合作安排，**阿里巴巴**的`Qwen` AI模型将引入苹果操作系统。

这项合作此前长期处于传闻状态。监管批准后，苹果的生成式AI平台将向其重要市场之一扩张。

[查看原文](https://techcrunch.com/2026/07/15/apple-intelligence-approved-for-launch-in-china-with-alibabas-qwen-ai/)

---

## Thinking Machines 发布开放权重模型 Inkling 并预览小型版 {#news-6}

> **Thinking Machines** 于2026年7月15日发布开放权重模型 **Inkling**，并提供完整模型权重。该模型支持最高100万 `token` 上下文窗口。

![Thinking Machines 发布开放权重模型 Inkling 并预览小型版](https://thinkingmachines.ai/news/introducing-inkling/images/cover-social-inkling-post.png)

**Inkling** 是混合专家 `Transformer`，拥有9750亿总参数和410亿活跃参数，预训练数据覆盖45万亿文本、图像、音频及视频 `token`。

模型可原生处理文本、图像和音频，并支持调节思考投入，以平衡成本和性能。

公司同时预览 **Inkling-Small**，其拥有120亿活跃参数，采用类似训练方案。其性能、成本和延迟定位属于公司发布声明。

**Inkling** 已可在 **Tinker** 上微调；`Tinker` 控制台还将增加面向开发者的 **Inkling Playground** 聊天界面。公司称该模型定位为可定制的开放权重基础模型。

[查看原文](https://thinkingmachines.ai/news/introducing-inkling/)

---

## OpenAI推出GPT-Red自动化红队测试提升防御 {#news-7}

> **OpenAI**构建大语言模型**GPT-Red**作为对练伙伴，用于帮助其他模型提升网络攻击防御能力。OpenAI称，经该模型训练的`GPT-5.6`是其迄今最具鲁棒性的版本。

OpenAI上周发布旗舰大语言模型最新版本`GPT-5.6`，并表示使用**GPT-Red**训练提升了其安全鲁棒性。

**GPT-Red**将通常由人工测试团队完成的红队安全评估自动化，目标是寻找尽可能多的系统被攻破或劫持方式。

测试重点包括提示注入攻击，即向大语言模型植入指令，使其执行开发者或用户不希望执行的行为。

该模型通过与其他模型自博弈训练：**GPT-Red**尝试攻击，其他模型负责防御。训练环境模拟网页浏览、读取邮件或日历、编辑代码等场景。

OpenAI研究人员称，**GPT-Red**已发现此前未见的新型攻击方式。

[查看原文](https://www.technologyreview.com/2026/07/15/1140514/meet-gpt-red-an-llm-super-hacker-openai-built-to-make-its-models-safer/)

---

## Google 展示 Pixel 10 端侧 AI，发布 Gemma 4 E2B {#news-8}

> **Google** 在 Google I/O Connect India 展示面向 **Pixel 10** 系列的端侧 AI，并发布轻量级 `Gemma 4 E2B` 模型与 `Tensor SDK` 测试版。

Google 表示，相关端侧 AI 能力由定制 **Tensor SoC** 和 TPU 驱动，展示面向新的 **Pixel 10** 系列。

活动发布的 `Gemma 4 E2B` 被描述为可在设备上原生运行的轻量级模型。Google 称，该模型可支持完全离线的多模态功能。

文中列举的离线能力包括 AI 聊天、实时图像识别和个人代理任务。

Google 同时宣布 `Tensor SDK` beta 及配套开源资源，开发者可通过该测试版开始构建安全的边缘应用。

[查看原文](https://developers.googleblog.com/unlocking-the-next-era-of-on-device-ai-with-google-tensor-and-pixel/)

---

## OpenAI以GPT-Red自我对弈强化模型安全 {#news-9}

> **OpenAI**称，其内部模型`GPT-Red`通过自我对弈训练，在84%的测试场景中找到了成功攻击。人类红队测试人员在相同场景中的成功攻击比例为13%。

![OpenAI以GPT-Red自我对弈强化模型安全](https://the-decoder.com/wp-content/uploads/2026/07/openai_red_Logo.png)

`GPT-Red`被描述为**OpenAI**的内部模型，采用自我对弈训练方式开展攻击测试。

在测试结果中，`GPT-Red`于84%的场景中找到成功攻击；人类红队测试人员的比例为13%。

这些测试结果已被用于强化包括`GPT-5.6 Sol`在内的模型。

[查看原文](https://the-decoder.com/openai-is-now-using-ai-to-attack-its-own-ai-and-its-working-better-than-humans-ever-did/)

---

## nanobot 推出可自托管的轻量个人 AI Agent {#news-10}

> **nanobot** 是一款开源、超轻量级个人 AI agent，可在浏览器 WebUI 或终端中运行。该项目支持连接多种聊天应用，并提供 Python SDK 与 OpenAI 兼容 API。

![nanobot 推出可自托管的轻量个人 AI Agent](https://opengraph.githubassets.com/a54055df42996ee63a4211fb7fd02f0c57db3bbe06d3355220d9dae2d7862b7d/HKUDS/nanobot)

**nanobot** 定位为可自托管的个人 AI agent 运行时，可连接 Telegram、Discord、Slack、WeChat、Email 和 Mattermost 等应用。

项目列出的工具包括文件、shell、网页搜索、网页抓取、MCP、`cron`、图像生成和子代理。

nanobot 通过 Dream 保留会话历史及长期记忆，并支持长周期目标和定时自动化。

项目可作为长期运行的本地或服务器端 agent 网关部署。README 列出的最新版本为 `v0.2.2`，名称为“Durability Release”。

[查看原文](https://github.com/HKUDS/nanobot)

---

## GitHub spec-kit 获超 12 万 Star 登趋势榜 {#news-11}

> **github/spec-kit** 是一套帮助用户开展规格驱动开发的工具包。GitHub Trending 条目显示，该项目获 121,512 个 Star，当天新增 753 个。

**spec-kit** 对外描述为用于开始进行规格驱动开发（Spec-Driven Development）的工具包。

GitHub Trending 条目将该项目的主要语言标注为 Python。

趋势条目显示其 Star 总数为 121,512 个，单日新增 753 个；两项数据可能随时间变化。

[查看原文](https://github.com/github/spec-kit)

---

## screenpipe 登上 GitHub 热门，主打本地 AI 记忆记录 {#news-12}

> **screenpipe/screenpipe** 登上 GitHub Trending，累计获得 20,047 个 Stars，当天新增 201 个。项目描述称其为 YC（S26）项目。

该仓库主要使用 `Rust` 开发。

项目描述称，其 AI 可了解用户看过、说过或听过的内容。

仓库称，**screenpipe** 可在本地记录用户 24 小时内进行、说出和听到的内容，并强调隐私与安全。

项目还称可连接 OpenClaw、Hermes agent 及 100 多款应用；上述能力均来自仓库自身描述。

[查看原文](https://github.com/screenpipe/screenpipe)

---

## BrowserOS 登上 GitHub 热门，定位开源智能体浏览器 {#news-13}

> **browseros-ai/BrowserOS** 登上 GitHub Trending，累计获得 12,190 个 Stars，当天新增 206 个。项目将自身定位为开源的 Agentic 浏览器。

该仓库主要使用 `TypeScript` 开发。

项目描述称，**BrowserOS** 可作为 ChatGPT Atlas、Perplexity Comet 和 Dia 的替代方案。

[查看原文](https://github.com/browseros-ai/BrowserOS)

---

## 开源托管智能体平台 multica 登上 GitHub 热门 {#news-14}

> **multica-ai/multica** 登上 GitHub 热门榜单，自称为开源托管智能体平台。项目用于为编码智能体分配任务、跟踪进展并积累技能。

**multica-ai/multica** 主要使用 Go 语言开发，项目定位为开源托管智能体平台。

其项目描述称，平台可为编码智能体分配任务，并用于跟踪任务进展和积累技能。

该仓库目前拥有 40,598 颗 Star，当天新增 241 颗 Star。

[查看原文](https://github.com/multica-ai/multica)

---

## pi-computer-use为Pi智能体提供桌面操作能力 {#news-15}

> **injaneity** 发布的开源项目 **pi-computer-use**，称可让 AI 智能体在 macOS 和 Windows 上操作桌面应用。项目提供界面观察、控件搜索、点击、输入及滚动等能力。

![pi-computer-use为Pi智能体提供桌面操作能力](https://opengraph.githubassets.com/53e06c77e4c5c5ae2fb83bd74ad02bdb41282749baa2b2b72ca89cb85a2447e2/injaneity/pi-computer-use)

**pi-computer-use** 是一个 Pi 扩展，安装后可为 Pi 智能体提供查找应用和窗口、观察界面、搜索控件、点击、输入、滚动及等待界面变化等工具。

项目的 macOS helper 要求 `macOS 14` 或更高版本。用户需为 `/Applications/pi-computer-use.app` 授予辅助功能及屏幕录制权限；较新系统将后者显示为“屏幕和系统音频录制”。

Windows 版本通过平台无障碍 API 提供支持，不采用 macOS helper 或 TCC 权限流程，但要求在交互式桌面会话中运行。

项目明确表示，它并非应用 API 或 MCP 服务器的替代方案；若应用提供可靠的直接集成，应优先采用直接集成。

页面显示该仓库有 81 个 Fork、1.3k 个 Star 和 180 次提交；这些数据会随时间变化。

[查看原文](https://github.com/injaneity/pi-computer-use)

---

## xAI称Grok Build已开源，但细节尚未披露 {#news-16}

> **xAI**页面标题称，**Grok Build** 已开源。原文正文仅含“Comments”，未提供可核实的开源范围、许可证或代码仓库信息。

该页面标题为“Grok Build is open source”，来源标注为 Hacker News Front Page。

由于正文未披露进一步内容，目前无法确认具体开源组件、所用许可证、代码仓库地址或发布时间。

[查看原文](https://x.ai/open-source)

---

## OpenTelemetry Spring Boot Starter支持声明式配置 {#news-17}

> **OpenTelemetry** 表示，其 Spring Boot starter 在 `2.26.0` 版本中已支持声明式配置。完整 SDK YAML schema 可直接写入 `application.yaml`。

配置统一置于 `application.yaml` 的 `otel:` 顶级键下，用于组织完整的 SDK YAML schema。

OpenTelemetry 在帖文中引导开发者访问其博客链接，尝试这一功能。

[查看原文](https://bsky.app/profile/opentelemetry.io/post/3mqnzvuoqcn2j)

---

## Brainless展示Claude Code、Codex与Grok风格shadcn组件 {#news-18}

> **Brainless**页面展示了仿照Claude Code、Codex和Grok界面的`shadcn`组件。页面以定价区块为例，演示将组件加入项目的操作。

![Brainless展示Claude Code、Codex与Grok风格shadcn组件](https://brainless.swerdlow.dev/opengraph-image?234ed435f7768d62)

页面给出的示例命令为`bunx shadcn add brainless/pricing`，用于添加brainless定价区块。

Claude Code风格示例显示，定价组件被添加至`app/page.tsx`。

Codex风格示例显示，用户编辑`components/pricing.tsx`后运行`pnpm build`。

Grok风格示例则展示了将brainless定价区块加入营销页面的操作。页面未独立说明组件的实际功能、兼容性或发布状态。

[查看原文](https://brainless.swerdlow.dev)

---

## Primate 创建者阐述全栈 Web 框架设计主张 {#news-19}

> **Primate** 创建者将“伟大的 Web 框架”定义为覆盖路由、渲染、数据、验证、会话、部署和运行时的完整技术栈。文中观点代表作者个人主张。

作者表示，其过去主要使用 **Yii**，也使用过部分 **Laravel**，并提醒读者据此看待文章标题。

作者认为，JavaScript 生态更偏好组合式开发，开发者常需自行整合服务器框架、数据库客户端、验证、会话、前端与构建工具。

文中称 **Next** 提供了连贯技术栈，但属于 React 技术栈；同时列举 **Node**、**Deno** 与 **Bun** 等 JavaScript 运行时。

作者主张前端、后端和运行时应可独立演进，并认为不同路由可使用 React、Svelte 或 Marko，同时维持相同后端模型。

[查看原文](https://superarch.org/theanswerisc/primate-is-the-last-great-framework.html)

---

## 文章质疑async/await无法单独解决并发执行问题 {#news-20}

> 一篇技术文章认为，`async/await`混淆了异步性与并发性，在协作式运行时中CPU密集任务可能阻塞执行线程。文中将相关结论定位为作者的技术观点与论证。

![文章质疑async/await无法单独解决并发执行问题](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kgd6qp4xhkmjmj721nq4.png)

发表于2026年4月22日的文章《The Tokio/Rayon Trap and Why Async/Await Fails Concurrency》认为，`async/await`将异步性与并发性混为一谈。

文章指出，在Rust的**Tokio**或**Node.js**等协作式运行时中，线程在执行到`await`点前不会让出执行权。

按文中说法，函数内持续50毫秒的CPU密集任务即可阻塞整个执行线程。解析10MB JSON、遍历大型集合及计算密码学证明均可能造成阻塞。

文章称，面对延迟尖峰，常见建议是将I/O工作交给**Tokio**，并将CPU密集工作送往**Rayon**等专用线程池。

文章还引用Rob Pike在2023年GopherConAU演讲中的观点：一个环境提供多种并发实现可能会造成问题。

[查看原文](https://pmbanugo.me/blog/why-async-await-complect-concurrency)

---

## SendLang 推出邮件自动化 DSL，支持分群与流程版本管理 {#news-21}

> **SendLang** 提供 `SendQL` 与 `SendFlow` 两种语言，分别用于定义邮件受众分群和联系人生命周期工作流。其以纯文本保存配置，支持版本控制与代码审查。

![SendLang 推出邮件自动化 DSL，支持分群与流程版本管理](https://www.sendlang.com/og.jpg)

`SendQL` 是用于描述消息目标受众的联系人分群查询语言，`SendFlow` 则描述联系人随时间经历的工作流，并可原生使用 `SendQL`。

`SendFlow` 工作流保存在 `.flow` 文件中，按从上到下的顺序执行。每个分群和工作流均以纯文本文件存储，可用于差异比较、拉取请求审查及回滚。

SendLang 称，属性拼写错误会被处理为包含行号和列号的类型错误，而不是导致邮件活动静默失败。

该网站称，**Cloud 66**、**SendOps**、**Adze**、**Fortworx** 和 **Markbase** 已在生产环境中使用 SendLang。项目已发布语法和类型检查器，并支持由编码智能体编写、经人工审查批准的流程。

[查看原文](https://www.sendlang.com)

---

## 微软单月修复570个漏洞，称AI助推发现问题 {#news-22}

> **微软** 在本月安全更新中修复了创纪录的570个漏洞，覆盖 Windows、Office 等产品线。微软称，使用AI协助发现此前未被识别的代码漏洞，推动了修复数量增加。

![微软单月修复570个漏洞，称AI助推发现问题](https://techcrunch.com/wp-content/uploads/2022/07/windows-zero-day-exploit.jpg?resize=1200,833)

本次更新至少修复两个零日漏洞，即微软获知漏洞前已被利用的安全问题。

其中，一个影响 **Windows Server** 的漏洞可让攻击者从受限用户权限提升至系统管理员权限。

另一个漏洞影响 **SharePoint** 文件共享服务器。美国网络安全机构 **CISA** 警告，黑客正积极利用该漏洞入侵组织。

Windows负责人 **Pavan Davuluri** 表示，随着AI帮助防御者发现更多问题，客户将会在每次安全发布中看到更多更新。

[查看原文](https://techcrunch.com/2026/07/15/microsoft-patches-record-number-of-security-vulnerabilities-citing-its-use-of-ai/)

---

## 微软创纪录补丁日后Windows权限提升漏洞利用公开 {#news-23}

> 微软发布创纪录数量安全补丁后，研究人员公开了名为`HiveLegacy`的Windows权限提升漏洞利用代码。多名研究人员表示，该代码能够运行。

匿名研究人员**NightmareEclypse**发布的`HiveLegacy`针对Windows User Profile Service中的漏洞。

该漏洞可让权限受限的Windows用户修改管理员账户的`classes`注册表配置单元，从而危及该管理员账户。

`classes`注册表配置单元用于确保用户在Windows Explorer中点击特定文件类型时，可打开对应应用程序。

NightmareEclypse称，报告中的概念验证代码已被精简，以减少遭攻击者恶意使用的风险。文章称，该漏洞利用可能也可由进程在进一步操作后使用。

[查看原文](https://arstechnica.com/security/2026/07/windows-0-day-drops-the-same-day-microsoft-releases-record-number-of-patches/)

---

## 黑客称 Suno 源码显示曾抓取多平台音频训练 {#news-24}

> 据 404 Media 报道，AI 音乐生成器 **Suno** 遭黑客入侵，攻击者称获得的源代码显示其曾从多个平台抓取音频训练数据。Suno 称该事件发生于 2025 年 11 月，属于迅速受控的有限安全事件。

![黑客称 Suno 源码显示曾抓取多平台音频训练](https://techcrunch.com/wp-content/uploads/2026/06/Suno_1.png?resize=1200,600)

黑客称，其经由供应链攻击取得一名员工凭证，继而访问了 Suno 源代码；攻击方式主要来自黑客说法。

黑客称源码显示，Suno 被指从 YouTube Music、Deezer、Genius、库存音乐库和播客 RSS 源抓取了数十年音频。

Suno 此前承认以开放互联网上公开可用的音乐文件训练 AI，并主张可依合理使用原则使用受版权保护材料。

正在起诉 Suno 的主要唱片公司认为，故意绕过 YouTube 反抓取保护措施违反《数字千年版权法案》。

报道称黑客还访问了客户邮箱、电话号码及 Stripe 中部分信用卡号；客户数据访问范围主要基于黑客说法。

[查看原文](https://techcrunch.com/2026/07/15/hack-suggests-ai-music-generator-suno-scraped-youtube-for-training-data/)


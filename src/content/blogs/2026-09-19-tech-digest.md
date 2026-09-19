---
title: 科技早报 2026-09-19
category: "科技, 科技早报"
excerpt: AI模型评测与安全事件引发关注，开源智能体工具和开发者基础设施持续升温，图论猜想获证明。
lastEdited: 2026年9月19日
tags: [科技早报, 人工智能, AI安全, 开源软件, 开发者工具, GitHub, 安全研究, 图论]
imageUrl: 
---

## 概览

### 要闻

- [数学家完成等待已久的图夹心猜想证明](#news-1)
### AI 与机器学习

- [美军险因 AI 虚假情报报告拦截中国船只](#news-2)
- [StepFun Step 5 Preview在评测中得分44并支持百万级上下文](#news-3)
- [编码代理测试显示上下文管理可提升任务效率](#news-4)
- [TypeSafe AI发布Jev模型，主打可校准决策输出](#news-5)
- [Amodei提出控制前沿人工智能发展计划](#news-6)
- [Meta Muse登陆Mac可操作文件与原生应用](#news-7)
### GitHub 热门项目

- [NVIDIA开源SkillSpector扫描AI技能安全风险](#news-8)
- [OpenSpec以规范驱动方式协作AI编程助手开发](#news-9)
- [NVIDIA发布面向自主AI智能体的OpenShell运行时](#news-10)
- [GitHub热门项目Supabase获超十万颗Star](#news-11)
- [GitHub热门项目supermemory：面向AI时代的本地记忆引擎](#news-12)
- [GitHub热门项目cuda-oxide：用Rust编写CUDA内核](#news-13)
### 开源生态

- [微软与谷歌合作推进确定性 C++23 数学功能](#news-14)
- [文章主张现代科学与开源软件具有同一性及可复现要求](#news-15)
### 开发者工具

- [Claude Code 2.1.277：无CLAUDE.md时改读AGENTS.md](#news-16)
- [Cloudflare Quick Tunnels一条命令发布本地应用](#news-17)
- [GrassLobster连接AI代理与参数化几何工作流](#news-18)
### 安全与隐私

- [研究人员借助Claude攻入OpenAI内部系统](#news-19)
- [研究人员据称借助Claude入侵OpenAI账户](#news-20)
- [研究团队称Claude Opus 5不到72小时攻入OpenAI系统](#news-21)
- [Google卧底研究员渗透TeamPCP供应链黑客组织](#news-22)
### 产品与平台

- [Napster与迪拜教育集团合作开发数字化教师](#news-23)
- [印度即时配送平台最快约10分钟送达新款iPhone](#news-24)
---

## 数学家完成等待已久的图夹心猜想证明 {#news-1}

> 三位数学家在2025年将相关技术推进到极限，完成了2004年提出的“sandwich conjecture”证明。该猜想试图用两个更简单的图，在数学上严谨地夹住目标图。

![数学家完成等待已久的图夹心猜想证明](https://www.quantamagazine.org/wp-content/uploads/2026/09/GraphSandwiches-crKristinaArmitage-Social.jpg)

图论中的图由顶点和边组成，可用于表示社交群体、互联网和脑神经元等网络。

该猜想认为，只要目标图足够大，就总能构造出所需的图夹心结构。

相关研究涉及随机二项图模型，该模型在20世纪50年代末由埃德加·吉尔伯特研究电话网络时提出，埃尔德什和雷尼也独立提出了类似模型。

随机二项图通过对每一对顶点进行随机试验，决定是否连接边；到20世纪70年代，数学家已研究其包含哈密顿回路的条件。

[查看原文](https://www.quantamagazine.org/mathematicians-build-long-awaited-graph-sandwich-20260918/)

---

## 美军险因 AI 虚假情报报告拦截中国船只 {#news-2}

> 据报道，美国军方曾因一份由人工智能辅助生成的虚假情报报告，准备拦截一艘被指运输核武器项目组件的中国船只。

![美军险因 AI 虚假情报报告拦截中国船只](https://media.cnn.com/api/v1/images/stellar/prod/9884637.jpg?c=16x9&q=w_800,c_fill)

这份报告在美伊战争期间于美国军方内部流传，军方据报道一度准备登船行动，军用飞机也已升空。

官员在行动前核查发现，报告由一名特种作战司令部分析师借助聊天机器人生成，错误识别了船只货物。

分析师先让人工智能结合开源情报与秘密信号情报得出结论，随后再次使用人工智能整理成标准报告并分发。

相关经过主要来自熟悉事件的消息人士；CNN 无法确认错误识别的货物，也不清楚所用聊天机器人属于商用还是政府产品。

[查看原文](https://www.cnn.com/2026/09/18/politics/us-military-ai-false-intelligence-china-ship)

---

## StepFun Step 5 Preview在评测中得分44并支持百万级上下文 {#news-3}

> Artificial Analysis 页面显示，**StepFun** 的 Step 5 Preview 在 Intelligence Index 中得分为 44，高于可比模型中位数 25。该页面标注的为推理版本，可能还存在非推理版本。

![StepFun Step 5 Preview在评测中得分44并支持百万级上下文](https://artificialanalysis.ai/en/models/step-5/opengraph-image?ea6b93c60ecab06d)

Step 5 Preview 于 2026 年 9 月发布，支持文本和图像输入，输出形式为文本，上下文窗口为 1M tokens。

页面显示，该模型输入价格为每百万 tokens 1.00 美元，输出价格为每百万 tokens 2.70 美元。

其输出速度约为每秒 100 tokens，页面将其描述为高于平均水平；具体比较基于特定可比模型和价格区间。

在 Intelligence Index 评测中，该模型生成了 1.6 亿个 tokens，页面称其高于 9000 万 tokens 的中位数。

[查看原文](https://artificialanalysis.ai/models/step-5)

---

## 编码代理测试显示上下文管理可提升任务效率 {#news-4}

> 一项研究比较了编码代理中的规划、动作空间和上下文管理组件。研究在四个模型和176种匹配设置上进行评估，涵盖 SWE-Bench Verified 与 Terminal-Bench 2.1。

![编码代理测试显示上下文管理可提升任务效率](https://arxiv.org/static/browse/0.3.4/images/arxiv-logo-fb.png)

研究发现，当上下文窗口预算收紧时，上下文管理的价值增加，其主要收益来自避免上下文溢出失败。

在比较的策略中，先按规则省略内容、再使用大语言模型摘要，整体效率最高。

规划对较弱模型主要提升准确性，对较强模型则主要节省成本，准确性变化较小。

预定义工具可改善 bash 能力较弱模型的表现；具备 bash 能力的模型可有效使用仅 bash 接口，并降低命令行任务成本。

[查看原文](https://arxiv.org/abs/2609.20804)

---

## TypeSafe AI发布Jev模型，主打可校准决策输出 {#news-5}

> OpenAI前研究员Diogo Almeida创办的TypeSafe AI发布了基于Transformer的Jev模型。该模型不生成文本，而是输出概率或公司称为“校准决策”的结果。

![TypeSafe AI发布Jev模型，主打可校准决策输出](https://techcrunch.com/wp-content/uploads/2026/09/typesafe-ai.jpg?resize=1174,1200)

**TypeSafe AI**称，Jev面向自动化场景设计，要求用户预先定义输出，因此不会产生幻觉；其输出token免费，输入token按十亿级计量。

由于需求过高，Jev API曾短暂无法为用户提供服务。

Vercel工程师测试称，Jev用于命令安全分类时，速度较**OpenAI**的`Luna 5.6`提升5至18倍，准确率也更高。

Bryo AI测试商业邮件分类时发现，Gemini略微更准确，但成本高出10至20倍；相关结果来自开发者测试或公司表述。

[查看原文](https://techcrunch.com/2026/09/18/a-new-kind-of-ai-model-from-a-chatgpt-inventor-is-thrilling-developers/)

---

## Amodei提出控制前沿人工智能发展计划 {#news-6}

> 在Anthropic一名研究人员发出末日警告一周后，Anthropic首席执行官 **Dario Amodei** 提出了“控制前沿”人工智能发展的计划。该计划主张引入独立安全评估机构，并加强民主国家人工智能实验室之间的协调。

这项计划依赖独立的人工智能安全评估机构，以评估前沿人工智能系统的安全风险。

计划还主张民主国家的人工智能实验室开展协调，目前已获得部分行业支持。

**英伟达** 首席执行官 **Jensen Huang** 对该提议提出了明确反对意见。文章未提供具体支持者、反对理由或实施细节。

[查看原文](https://techcrunch.com/video/dario-amodei-and-other-ai-leaders-want-to-pace-the-frontier-buthow/)

---

## Meta Muse登陆Mac可操作文件与原生应用 {#news-7}

> **Meta**的AI助手应用**Muse**现已登陆Mac，可在用户授权下与文件、消息、日历、备忘录和邮件互动。执行敏感操作前，Muse会征得用户批准。

![Meta Muse登陆Mac可操作文件与原生应用](https://techcrunch.com/wp-content/uploads/2026/09/download-1.webp?resize=1200,1159)

Muse在Mac上的访问权限采用用户主动选择（opt-in）方式控制。

该应用由**Meta**的Alexandr Wang宣布，此前已于本月早些时候登陆移动端和网页端。

文章称，Muse上线后迅速登上美国App Store榜首，面向消费者的AI代理竞争正在加剧。

相关竞争可能影响应用、软件即服务业务以及硬件市场；有关Instinct融资的估值信息尚未获确认。

[查看原文](https://techcrunch.com/2026/09/18/metas-muse-hits-mac-letting-the-ai-take-actions-on-your-computer/)

---

## NVIDIA开源SkillSpector扫描AI技能安全风险 {#news-8}

> **NVIDIA/SkillSpector** 是一个面向 AI agent 技能的安全扫描器，旨在帮助用户在安装相关技能前识别潜在风险。

该项目使用 Python 编写，目前获得 17,696 个 Stars，并在当天新增 157 个 Stars。

SkillSpector 可检测 Claude Code、Codex 和 MCP 技能中的漏洞、恶意模式与安全风险。

其检查范围还包括提示注入、数据窃取和供应链风险。

[查看原文](https://github.com/NVIDIA/SkillSpector)

---

## OpenSpec以规范驱动方式协作AI编程助手开发 {#news-9}

> **Fission-AI/OpenSpec** 是一个面向 AI 编程助手的规范驱动开发框架，通过工件引导开发流程。

![OpenSpec以规范驱动方式协作AI编程助手开发](https://opengraph.githubassets.com/f754e2dd8c801a2e6a6fa4593804007a5419d20aa3335aed5fafe45ca678a308/Fission-AI/OpenSpec)

仓库页面显示，OpenSpec 拥有 69k Stars、4.7k Forks 和 882 次提交。

项目强调灵活而非僵化、迭代而非瀑布式，并支持棕地项目及从个人项目到企业的扩展。

示例工作流使用 `/opsx:explore`、`/opsx:propose`、`/opsx:apply` 和 `/opsx:archive` 等命令。

流程可生成 `proposal.md`、`specs`、`design.md` 和 `tasks.md` 等工件，规范使用普通 Markdown 编写。

[查看原文](https://github.com/Fission-AI/OpenSpec)

---

## NVIDIA发布面向自主AI智能体的OpenShell运行时 {#news-10}

> **NVIDIA OpenShell** 是面向自主 AI 智能体的安全私有运行时，提供用于保护数据、凭据和基础设施的沙盒执行环境。项目目前仍处于预发布阶段。

![NVIDIA发布面向自主AI智能体的OpenShell运行时](https://opengraph.githubassets.com/eef9a638903ad80a3b4b03cff82f21d12d9a013f4af494c0f13340d8a1aec424/NVIDIA/OpenShell)

OpenShell 使用声明式 YAML 策略，限制未经授权的文件访问、数据外泄和不受控的网络活动。项目还提供面向智能体的公开技能，以及面向贡献者和维护者的独立仓库工作流。

项目支持 Linux、macOS Apple Silicon，以及实验性的 Windows with WSL 2 主机环境。本地运行时可使用 Docker、Podman 或启用主机虚拟化的 MicroVM 沙盒。

OpenShell `0.1.0` 尚未正式发布，项目页面称其即将推出，并提供预发布版本和预发布文档。

Kubernetes 部署路径仍处于实验性开发阶段，可能存在不稳定和破坏性变更。

[查看原文](https://github.com/NVIDIA/OpenShell)

---

## GitHub热门项目Supabase获超十万颗Star {#news-11}

> GitHub Trending项目`supabase/supabase`是一款基于TypeScript的开源项目，定位为Postgres开发平台。

GitHub页面显示，`supabase/supabase`目前拥有109,948个Star，当日新增586个Star。

**Supabase**为构建网页、移动端和人工智能应用提供专用Postgres数据库。

[查看原文](https://github.com/supabase/supabase)

---

## GitHub热门项目supermemory：面向AI时代的本地记忆引擎 {#news-12}

> **supermemoryai/supermemory**登上GitHub Trending。这一TypeScript项目定位为面向人工智能时代的Memory API及记忆与上下文引擎。

项目强调速度快、可扩展，并支持完全在本地运行。

GitHub页面显示，该项目已获得30,008个Stars，当日新增140个Stars。

[查看原文](https://github.com/supermemoryai/supermemory)

---

## GitHub热门项目cuda-oxide：用Rust编写CUDA内核 {#news-13}

> **NVlabs/cuda-oxide**是GitHub Trending上的Rust项目，定位为Rust到CUDA的编译器。

项目支持使用相对安全且符合Rust惯用方式的Rust编写SIMT GPU内核。

它可将标准Rust代码直接编译为PTX，无需领域专用语言或外语绑定。

GitHub页面显示，该项目已获得3,483个Stars，当日新增59个Stars。

[查看原文](https://github.com/NVlabs/cuda-oxide)

---

## 微软与谷歌合作推进确定性 C++23 数学功能 {#news-14}

> 微软 **MSVC** 团队与谷歌 `LLVM-libc` 维护者展开合作，目标是让不同编译器实现快速且确定性的 C++23 数学功能。

参与合作的谷歌 `LLVM-libc` 维护者包括 Michael Jones 和 Tue Ly。

相关帖子将这项成果描述为跨编译器的工具链协作案例。

[查看原文](https://bsky.app/profile/opensource.google/post/3mvssfeo56223)

---

## 文章主张现代科学与开源软件具有同一性及可复现要求 {#news-15}

> 一篇文章提出，现代科学与开源软件具有同一性，至少计算科学是如此。文章强调，科学家应以科学方法开展开放且可复现的软件工作。

文章援引的科学定义认为，科学是以关于宇宙的可检验假设和预测为形式，系统构建和组织知识的学科。

文章主张，如果一篇 arXiv 论文不能帮助读者预测世界，就不属于科学。计算可复现性的重要性在于，软件能够编码并分享预测模型。

文章指出，仅展示结果不足以实现复现；读者还应能够理解、检验相关想法，并据此改进对世界的模型。

[查看原文](https://jepedersen.dk/blog/202505_research/)

---

## Claude Code 2.1.277：无CLAUDE.md时改读AGENTS.md {#news-16}

> Claude Code 2.1.277于2026年9月18日发布。在项目没有`CLAUDE.md`时，工具现在会读取`AGENTS.md`，但该功能暂未在Bedrock、Vertex或Foundry上提供。

![Claude Code 2.1.277：无CLAUDE.md时改读AGENTS.md](https://claude-code.mintlify.app/_next/image?url=%2F_mintlify%2Fapi%2Fog%3Fdivision%3DGetting%2Bstarted%26title%3DClaude%2BCode%2Bchangelog%26description%3DRelease%2Bnotes%2Bfor%2BClaude%2BCode%252C%2Bincluding%2Bnew%2Bfeatures%252C%2Bimprovements%252C%2Band%2Bbug%2Bfixes%2Bby%2Bversion.%26theme%3D03628e99c753a03aec319053&w=1200&q=100)

Claude应用网关新增可选的headers映射，可向网关前置代理发送静态请求头。

`claude -p`和Agent SDK会话在内部错误后不再无结果挂起，而是报告错误并以退出码1退出。

插件重新安装、Grep和Glob搜索相关问题也得到修复；由于更新日志正文截断，完整变更内容尚无法确认。

[查看原文](https://code.claude.com/docs/en/changelog)

---

## Cloudflare Quick Tunnels一条命令发布本地应用 {#news-17}

> **Cloudflare Quick Tunnels**可将本地应用部署到互联网，并通过一条命令创建隧道。页面称该服务免费、安全且即时，无需创建账户。

Quick Tunnels基于Cloudflare全球网络，通过其边缘网络路由流量，并默认提供自动HTTPS和DDoS防护。

页面称该服务不会暴露本地机器端口，用户也无需登录、配置DNS或证书。

用户可运行本地Web服务器或API，然后执行`cloudflared tunnel --url http://localhost:8000`创建隧道。

创建完成后，用户可以分享生成的`trycloudflare.com`预览URL；具体性能和防护效果未在原文中进一步验证。

[查看原文](https://try.cloudflare.com/)

---

## GrassLobster连接AI代理与参数化几何工作流 {#news-18}

> 个人项目GrassLobster将Rhino和Grasshopper的参数化设计工作流与用户选择的外部人工智能代理连接起来，用于构建设计相关的参数化工作流。该项目目前仍处于实验性原型阶段。

![GrassLobster连接AI代理与参数化几何工作流](http://www.miro.vision/wp-content/uploads/2026/09/750_500.png)

用户可以描述建筑形态、木结构或元素图案等设计意图，外部代理会询问尺寸、规则、材料及可控参数。

在确定实现方式后，代理会构建参数化工作流；用户调整跨度、间距或元素数量时，相关几何体会随之更新。

GrassLobster使用连接的Geometry Stations组织模型，每个Station运行一项有意义任务所对应的代码。

Station定义、可执行代码和受支持的输入值会以可读项目文件镜像保存，代理可据此定位相关逻辑并进行定向修改。

GrassLobster由Miro Bannwart开发，目前持续开发中，尚未针对一般用途完成验证，并按现状提供。

[查看原文](https://www.miro.vision/index.php/2026/09/17/grasslobbster/)

---

## 研究人员借助Claude攻入OpenAI内部系统 {#news-19}

> 安全研究人员使用 Anthropic 的 **Claude** 利用 **OpenAI** 系统漏洞，并接管了 OpenAI 员工账号。

研究人员还获得了 OpenAI 内部代码仓库的访问权限。

在发现相关漏洞后，研究人员向 OpenAI 报告了这些问题。

文章未说明研究人员姓名、具体漏洞、受影响系统范围，以及 OpenAI 是否已完成修复。

[查看原文](https://techcrunch.com/2026/09/18/researchers-used-anthropics-claude-to-hack-into-openai/)

---

## 研究人员据称借助Claude入侵OpenAI账户 {#news-20}

> Hacktron三名独立安全研究人员称，他们借助Anthropic的 **Claude Opus 4.8** 和 `5`，在不到72小时内入侵了OpenAI员工账户。相关经过主要来自研究人员说法及媒体报道。

![研究人员据称借助Claude入侵OpenAI账户](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/STKS533_AI_AGENTS_HACKING_D.png?quality=90&strip=all&crop=0,0,100,100)

据《华尔街日报》报道，研究人员进入了OpenAI名为“Monorepo”的GitHub代码仓库。消息人士称，该仓库包含OpenAI的“算法秘密”。

研究人员没有进一步访问Monorepo中的内部代码，而是通过一名员工的Codex账户提交拉取请求，以证明获得了访问权限。

研究人员还通过托管OpenAI社区论坛的第三方服务Discourse进入了相关系统。

由于相关入侵经过和仓库内容主要来自研究人员及报道，具体细节仍需以进一步信息为准。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/997444/openai-hack-claude-heif-heist)

---

## 研究团队称Claude Opus 5不到72小时攻入OpenAI系统 {#news-21}

> 三名安全研究人员称，他们使用 Anthropic 的 Claude 模型，通过 OpenAI 社区论坛进入了 **OpenAI** 的内部系统，耗时不到 72 小时。相关入侵经过及模型表现尚未获得独立验证。

![研究团队称Claude Opus 5不到72小时攻入OpenAI系统](https://the-decoder.com/wp-content/uploads/2026/09/openai_anthropic_hack.png)

据研究团队称，`Claude Opus 5` 绕过了一项其前代模型无法绕过的常见安全措施。

相关攻击涉及 Anthropic 的 Claude 模型和 **OpenAI** 的内部系统。

文章认为，新一代 AI 模型可能缩短利用安全漏洞所需的时间，并降低相关专业技能门槛。

上述入侵经过和 `Claude Opus 5` 的表现均来自研究团队说法，文章未提供更多技术证据。

[查看原文](https://the-decoder.com/security-researchers-used-anthropics-claude-to-hack-openais-internal-systems-in-under-72-hours/)

---

## Google卧底研究员渗透TeamPCP供应链黑客组织 {#news-22}

> Google威胁情报团队称，一名卧底研究人员曾进入TeamPCP内部，监控攻击、警告潜在受害者并协助干扰行动。该组织被指曾向数百个开源程序植入恶意软件。

![Google卧底研究员渗透TeamPCP供应链黑客组织](https://media.wired.com/photos/6aac35420820a9282b5f1721/191:100/w_1280,c_limit/Security_An%20Undercover%20Google%20Researcher%20Infiltrated%20the%20Gang%20Behind%20the%20Worst-Ever%20Supply%20Chain%20Hacking%20Spree_v1.jpg)

文章称，TeamPCP曾盗取开发者账户，发布以《沙丘》为主题的自传播蠕虫，并最终入侵超过1000家公司。

Mandiant一名卧底分析师通过与获邀加入TeamPCP的人员建立信任进入组织内部。Google研究人员Austin Larsen则追踪到一名成员涉嫌犯下的操作安全错误。

Google向执法部门提供了相关身份信息。TeamPCP还曾与ShinyHunters合作，后者后来向Google提供了有关该组织的情报。

澳大利亚警方在联邦调查局协助下逮捕两名澳大利亚人，并以黑客犯罪指控他们。相关指控及组织成员身份仍以司法程序为准。

[查看原文](https://www.wired.com/story/an-undercover-google-analyst-infiltrated-a-notorious-supply-chain-hacking-gang/)

---

## Napster与迪拜教育集团合作开发数字化教师 {#news-23}

> Napster与迪拜Gems Education签署战略合作，将开发面向教育的人工智能代理和数字人格。首阶段项目包括教师数字孪生、游戏化学习和课堂模拟等概念验证项目。

![Napster与迪拜教育集团合作开发数字化教师](https://media.wired.com/photos/6aac1a9a4ac258f87bea84bd/191:100/w_1280,c_limit/Napster_lead.jpg)

Napster最初于1999年由**Shawn Fanning**和**Sean Parker**创立，曾提供点对点音乐文件共享服务，并于2001年因版权诉讼和法院裁决关闭原始服务。

佛罗里达州科技公司**Infinite Reality**于2025年以2.07亿美元收购Napster，之后该品牌转型为人工智能平台。

合作项目将在**Gems School of Research and Innovation**落地，并使用Gems Global Education AI Hub和Gems Intelligence 360进行测试与评估。

**Napster Learn**将支持开发教师数字孪生。这些数字孪生会依据教师的教材、课程和论文训练，并在线提供全天候支持。相关功能目前被描述为概念验证和展示项目。

[查看原文](https://www.wired.com/story/napster-is-back-and-it-wants-to-digitally-clone-teachers/)

---

## 印度即时配送平台最快约10分钟送达新款iPhone {#news-24}

> 苹果在印度发售的 **iPhone 18 Pro** 和 **iPhone 18 Pro Max**，可通过多家即时配送平台下单，部分消费者约10分钟即可收到。

![印度即时配送平台最快约10分钟送达新款iPhone](https://techcrunch.com/wp-content/uploads/2026/09/iphone-18-pro-quick-commerce-india.jpg?resize=1200,800)

新款iPhone除苹果直营店、授权经销商和在线市场外，还通过 **Blinkit**、**Zepto**、**Swiggy Instamart** 和 **BigBasket** 配送。

BigBasket表示，开售首小时已配送超过300部新款iPhone；Instamart称班加罗尔订单量领先，其次是德里。

发售数小时后，部分平台和地区库存变得不稳定，但德里、班加罗尔等城市的部分区域仍可配送。

印度即时配送行业2026年上半年规模约90亿美元，月活跃用户超过6000万；即时配送销量相较iPhone总体销量仍较小。

[查看原文](https://techcrunch.com/2026/09/18/in-india-the-new-iphone-can-arrive-faster-than-a-pizza/)


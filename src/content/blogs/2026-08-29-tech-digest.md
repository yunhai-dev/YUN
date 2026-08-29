---
title: 科技早报 2026-08-29
category: "科技, 科技早报"
excerpt: Anthropic被裁定列入五角大楼黑名单违法，Google推进TPU与AI科研应用，软件供应链安全风险受关注。
lastEdited: 2026年8月29日
tags: [Anthropic, Google DeepMind, AI代理, 开源项目, 软件供应链安全, 开发者工具, 科技早报]
imageUrl: 
---

## 概览

### 要闻

- [美国法院裁定五角大楼将Anthropic列入黑名单违法](#news-1)
### AI 与机器学习

- [Google 将 TPU 原生接入 vLLM，优化长上下文嵌入推理](#news-2)
- [Anthropic论文展示可自我改进的对齐研究系统](#news-3)
- [screenshot-to-code 可将设计稿转换为多种前端代码](#news-4)
- [Google DeepMind扩展AI科学家至实验室研究流程](#news-5)
- [Google DeepMind试点双盲评估提升AI基准可信度](#news-6)
- [作者将大语言模型记忆需求类比为程序分析](#news-7)
### GitHub 热门项目

- [Scientific Agent Skills 汇集 163 项科学研究技能](#news-8)
- [GitHub热门项目OpenMontage提供开源智能视频制作系统](#news-9)
- [GitNexus 推出浏览器端零服务器代码智能引擎](#news-10)
- [Marin推进超5000亿参数混合专家模型研究](#news-11)
- [GitHub热门项目pentagi：Go语言全自主AI渗透测试智能体](#news-12)
- [GitHub热门项目workweave/router推出智能代理模型路由器](#news-13)
### 开源生态

- [开源项目 Conduct 为 LLM 与 MCP 工具调用提供运行时治理](#news-14)
- [Kumander Linux以Windows 7风格降低迁移门槛](#news-15)
### 开发者工具

- [OpenAI Python SDK迁移至HTTPX2](#news-16)
- [奥斯卡获奖教授用模拟软件让数字怪物栩栩如生](#news-17)
- [OpenTelemetry 将举办手动插桩实践活动](#news-18)
### 安全与隐私

- [澳大利亚逮捕两名涉嫌参与TeamPCP男子](#news-19)
- [npm现10个恶意版本，涉及Mini Shai-Hulud攻击](#news-20)
- [调查称未沙箱化AI代理可能拥有用户级系统权限](#news-21)
- [Meta 更新智能眼镜录制限制以防遮挡安全指示灯](#news-22)
### 产品与平台

- [Android与iPhone共享文件新增免应用传输方式](#news-23)
- [Apple TV订阅价格上调最高达20%](#news-24)
---

## 美国法院裁定五角大楼将Anthropic列入黑名单违法 {#news-1}

> 美国旧金山一家联邦法院裁定，五角大楼将**Anthropic**列为供应链风险的行为违法。相关认定因华盛顿的平行案件仍在审理而暂时维持。

![美国法院裁定五角大楼将Anthropic列入黑名单违法](https://the-decoder.com/wp-content/uploads/2026/02/anthropic_pentagon-2.png)

美国国防部此前曾将Anthropic列入黑名单。文中称，此举是对Anthropic公开批评政府人工智能政策的报复。

由于华盛顿另一起案件仍在审理，Anthropic的供应链风险认定目前仍正式有效。

该裁决发生在Anthropic计划于今年秋季进行首次公开募股之前。

[查看原文](https://the-decoder.com/u-s-court-rules-pentagons-blacklisting-of-anthropic-was-unlawful/)

---

## Google 将 TPU 原生接入 vLLM，优化长上下文嵌入推理 {#news-2}

> **Google Cloud** 已将 TPU 原生集成到 `vLLM` 服务引擎，支持通过 **GKE** 弹性扩展高需求嵌入流水线。该方案面向 `Qwen3-Embedding-8B` 等模型处理超过 15K token 的上下文。

工程团队采用硬件安全张量对齐、JAX/XLA 编译预热等 TPU 专用优化。

方案还使用混合 `StepPool` 架构管理分块预填充，以提升长上下文处理效率。

相关改进实现了与参考 GPU 基线近乎完美的数值一致性。

AI-Hypercomputer GitHub 已提供开源设置方案，可用于构建高吞吐语义检索应用。

[查看原文](https://developers.googleblog.com/enterprise-grade-precision-for-long-context-multimodal-embedding-inference-on-cloud-tpu/)

---

## Anthropic论文展示可自我改进的对齐研究系统 {#news-3}

> **Anthropic** 发布论文称，自动化研究系统在10项特定不一致行为基准上均提升了表现，且未降低整体性能。论文将结果描述为自动化对齐后训练近期可能实用的早期证据。

![Anthropic论文展示可自我改进的对齐研究系统](https://techcrunch.com/wp-content/uploads/2026/08/GettyImages-2287646148.jpg?resize=1200,901)

论文《Automated Researchers Can Reliably Mitigate Alignment Failures》介绍了 Automated Alignment Researcher（AAR）。系统会检索文献、提出方法，并用其训练模型约30分钟。

AAR 通过多轮迭代提升基准表现，有效方法会被保留，无效方法会被淘汰。论文称，其最佳方法平均可在六小时内胜过有经验的人类研究方法。

论文称，人类指导的研究方向没有带来更强表现。文章援引论文称，AAR 的 API 推理成本约为每小时4美元，人类研究人员成本约为每小时150美元。

该方法依赖基准测试准确反映实际对齐目标，建立和维护基准、研究文献仍需要大量工作，实际有效性也受相关质量条件限制。

[查看原文](https://techcrunch.com/2026/08/28/an-anthropic-researcher-just-gave-us-a-peek-at-self-improving-ai/)

---

## screenshot-to-code 可将设计稿转换为多种前端代码 {#news-4}

> **screenshot-to-code** 可以使用 AI 将截图、设计稿、Figma 设计和屏幕录制转换为代码，并支持多种前端技术栈。

![screenshot-to-code 可将设计稿转换为多种前端代码](https://opengraph.githubassets.com/05905ab4dd0dd3ab64b841d68362284570e43cb20bce8126b9019f69a9b4d4bd/abi/screenshot-to-code)

项目支持 HTML 与 Tailwind、HTML 与 CSS、React 与 Tailwind、Vue 与 Tailwind、Bootstrap 以及 Ionic 与 Tailwind。

项目介绍列出的默认模型包括 `Gemini 3 Flash Preview`、`Gemini 3.1 Pro Preview`、`GPT-5.5`、`GPT-5.4 Mini`、`Claude Opus 4.6`、`Claude Opus 4.8` 和 `z-image-turbo`。

项目支持将网站运行过程中的屏幕录制转换为可运行的原型。本地运行需要 API 密钥及后端、前端环境。

应用使用 React/Vite 前端和 FastAPI 后端，至少需要 OpenAI、Anthropic 或 Gemini 其中一家模型提供商的密钥。

项目还提供官方托管产品 screenshottocode.com；材料称 Gemini 用于提取资源，Replicate 用于图像生成、背景移除和图像编辑。

[查看原文](https://github.com/abi/screenshot-to-code)

---

## Google DeepMind扩展AI科学家至实验室研究流程 {#news-5}

> **Google DeepMind** 将 Co-Scientist 从假设生成器扩展为与实验室集成的研究系统。文章称，该系统已交付经过实验验证的结果。

![Google DeepMind扩展AI科学家至实验室研究流程](https://the-decoder.com/wp-content/uploads/2026/08/gemini_ai_scientist.png)

Co-Scientist 是基于 `Gemini` 的多智能体系统，现可覆盖实验规划、实验室设备运行和科学论文撰写等环节。

该系统覆盖三个学科，包括材料合成和医疗人工智能架构的自主开发。

文章称，Co-Scientist 已交付经过实验验证的研究结果。

[查看原文](https://the-decoder.com/google-deepminds-ai-co-scientist-now-plans-experiments-runs-lab-equipment-and-writes-scientific-papers/)

---

## Google DeepMind试点双盲评估提升AI基准可信度 {#news-6}

> **Google DeepMind** 正首次测试对前沿人工智能模型进行双盲评估。该试点项目与新加坡人工智能安全研究所合作，使用 `Confidential Space` 提供加密保护。

![Google DeepMind试点双盲评估提升AI基准可信度](https://the-decoder.com/wp-content/uploads/2026/07/google_gemini-2.png)

在测试过程中，**Google** 无法查看评估题目，评估人员也无法查看模型权重。

试点项目使用 **Gemini Flash Lite** 模型，旨在探索更具独立性的人工智能基准测试方式。

原文称，该项目目前仍处于试点阶段，未来可能为防篡改人工智能基准测试设立新标准。

[查看原文](https://the-decoder.com/ai-benchmarks-have-a-trust-problem-and-google-wants-to-fix-it/)

---

## 作者将大语言模型记忆需求类比为程序分析 {#news-7}

> 一篇文章讨论将 LLM agent 用于漏洞研究时的记忆问题。作者认为，长期调查不仅需要保存既有内容，还需要维护当前仍然成立的知识。

![作者将大语言模型记忆需求类比为程序分析](https://pwning.systems/og.png)

作者过去数月尝试将 LLM agent 用于漏洞研究，并观察到模型在持续数小时的调查中可能逐渐丢失已确定的内容。

模型可能重新提出已经排除的方法，忘记已被证伪的假设，或继续基于不再有效的观察进行推理。

常见的 LLM 记忆系统通常保存旧对话或观察结果，生成嵌入，并在需要时检索相关内容。

作者将漏洞研究中的记忆需求与程序分析类比：根据事实和规则推导额外事实，并计算固定点。

文章示例显示，既有观察可能因后续 LLDB 检查被证明是错误假设，相关结论也可能因此失效。

[查看原文](https://pwning.systems/posts/llm-memory-program-analysis/)

---

## Scientific Agent Skills 汇集 163 项科学研究技能 {#news-8}

> GitHub Trending Python 项目 **K-Dense-AI/scientific-agent-skills** 旨在将 AI agent 转变为 AI Scientist。项目当前获得 35,702 个 Stars，今日新增 498 个。

项目包含 163 个可直接使用且经过验证的技能，以及 100 多个科学数据库。

这些技能和数据库覆盖生物学、化学、医学和药物发现领域。

项目兼容 Cursor、Claude Code、Codex、Pi、Antigravity 及开放 Agent Skills 标准。

[查看原文](https://github.com/K-Dense-AI/scientific-agent-skills)

---

## GitHub热门项目OpenMontage提供开源智能视频制作系统 {#news-9}

> GitHub Trending Python 项目 **calesthio/OpenMontage** 当前获得 52,885 个 Stars，今日新增 1,292 个。项目描述称其为开源智能视频制作系统。

**OpenMontage** 包含 12 条制作流水线和 100 多种工具，覆盖视频制作相关流程。

项目还包含 700 多个 agent 技能及制作知识文件，旨在将 AI coding assistant 转变为完整的视频制作工作室。

“全球首个开源智能视频制作系统”属于项目描述中的自称，原文未提供独立验证信息。

[查看原文](https://github.com/calesthio/OpenMontage)

---

## GitNexus 推出浏览器端零服务器代码智能引擎 {#news-10}

> GitHub 项目 **abhigyanpatwari/GitNexus** 是一个可完全在浏览器中运行的零服务器代码智能引擎。项目当前获得 46,016 个 Stars，当天新增 189 个。

**GitNexus** 使用 TypeScript 开发，可导入 GitHub、GitLab、Azure、本地 Git 仓库或 ZIP 文件。

项目能够生成交互式知识图谱，并内置 Graph RAG Agent。

[查看原文](https://github.com/abhigyanpatwari/GitNexus)

---

## Marin推进超5000亿参数混合专家模型研究 {#news-11}

> **Marin**是面向基础模型研究与开发的开源项目、软件平台和社区，覆盖大型语言模型训练的多个环节。项目当前重点是从头预训练和后训练一个大型混合专家模型。

![Marin推进超5000亿参数混合专家模型研究](https://opengraph.githubassets.com/2c3a6e6148ed78a2ba749407423d2ebb6a79e83782c65b266cd896115ef78c42/marin-community/marin)

Marin的工作范围包括数据整理、转换、过滤、分词、预训练、后训练和评估，并开放记录实验过程与决策。

该项目也被用于构建音频—文本模型、DNA模型和蛋白质模型。

当前目标模型规模为 `5e24 model-FLOPs`，总参数量超过5000亿；所提供信息未确认该模型已经完成。

项目的 `Delphi` 扩展套件用于将大型语言模型训练方案从 `3e18 FLOPs` 扩展到 `1e23 FLOPs`，并在 Hugging Face 发布每次运行的检查点。

[查看原文](https://github.com/marin-community/marin)

---

## GitHub热门项目pentagi：Go语言全自主AI渗透测试智能体 {#news-12}

> GitHub 项目 **vxcontrol/pentagi** 是一个使用 Go 语言开发的 AI 智能体系统。

项目描述称，**pentagi** 能够执行复杂的渗透测试任务，并定位为全自主 AI 智能体系统。

该项目目前获得 22,114 个 Stars，并在当天新增 73 个 Stars。

[查看原文](https://github.com/vxcontrol/pentagi)

---

## GitHub热门项目workweave/router推出智能代理模型路由器 {#news-13}

> GitHub Trending 项目 **workweave/router** 是一款面向智能代理系统的模型路由器，使用 Go 语言开发。

项目描述称，该路由器能在 50 毫秒以内将每个提示路由到合适的模型。

项目还称，仅需更换端点即可降低 40% 至 70% 的成本；该说法尚未见原文提供独立验证或具体测试条件。

项目目前拥有 2154 颗 Stars，并在当天新增 711 颗 Stars。

[查看原文](https://github.com/workweave/router)

---

## 开源项目 Conduct 为 LLM 与 MCP 工具调用提供运行时治理 {#news-14}

> 开源项目 **Conduct** 面向 AI 代理提供运行时治理，试图通过统一策略覆盖大语言模型、Shell 工具调用及团队成员的 AI 会话。

![开源项目 Conduct 为 LLM 与 MCP 工具调用提供运行时治理](https://opengraph.githubassets.com/a3e93f7060c2d5b7f860ec14642b803e6d9830e114b8802fc91ba09c0ad5f87d/sseshachala/conductai)

项目包含 **Conduct Guard** 和 **Conduct Router** 两个产品界面。Guard 会在 AI 操作执行前决定阻止、警告、审计或注入。

**Conduct Router** 支持将 Anthropic、OpenAI 和 Perplexity 的提供商 SDK 指向 Router，使请求在发送至上游前经过 Guard。

项目使用签名配置和基于 `SHA-256` 的哈希链审计日志，文档称遭篡改的策略包会在决策前被拒绝。

GitHub 页面显示，该公开仓库主分支有 3905 次提交，并有 2 个 Star。

[查看原文](https://github.com/sseshachala/conductai)

---

## Kumander Linux以Windows 7风格降低迁移门槛 {#news-15}

> Kumander Linux 是一款面向 Windows 用户的 Linux 发行版，桌面界面受到 Windows 7 启发。该系统提供软件中心，并支持常规应用与 Flatpak 应用。

![Kumander Linux以Windows 7风格降低迁移门槛](https://www.kumander.org/img/languages/en.png)

**Kumander Linux** 将 **Google Chrome** 设为默认浏览器，并预装 **LibreOffice**，网站宣称其与 Microsoft Office 兼容。

该发行版支持通过 Steam 玩游戏，网站称 Steam 上约 80% 的热门游戏可直接在 Linux 上运行，但未说明统计口径、游戏范围或测试条件。

系统预装 `Kdenlive` 视频编辑器和 `Ardour 7` 音频制作软件，也支持通过 VirtualBox 运行 Windows 虚拟机。

用户还可以使用 ISO 提供的 Live Boot 选项，在无需安装系统的情况下体验 Kumander Linux。

[查看原文](https://www.kumander.org/)

---

## OpenAI Python SDK迁移至HTTPX2 {#news-16}

> OpenAI表示，Python SDK现已使用HTTPX2作为同步和异步HTTP客户端。使用默认客户端时，现有API调用及相关功能继续有效。

![OpenAI Python SDK迁移至HTTPX2](https://repository-images.githubusercontent.com/307213173/7b83a5a7-a102-4b8a-abe7-7c14267908fa)

安装 `openai` 时会自动安装 HTTPX2，但不再自动安装此前的 `httpx` 软件包。

SDK默认客户端的响应模型解析、流式API、身份验证、重试和数值超时功能继续有效。

HTTPX2默认改用操作系统信任存储验证证书，不再由SDK自动安装 `certifi`。

缺少系统CA证书或使用企业TLS检查代理的环境，可能需要通过 `SSL_CERT_FILE` 或 `SSL_CERT_DIR` 配置证书。

[查看原文](https://github.com/openai/openai-python/blob/main/httpx2.md)

---

## 奥斯卡获奖教授用模拟软件让数字怪物栩栩如生 {#news-17}

> 美国南加州大学计算机科学教授 **Jernej Barbič** 因设计和开发 **Ziva VFX** 获得 2025 年奥斯卡科学与技术成就奖。该软件用于模拟三维数字人类和生物的肌肉、脂肪与皮肤。

![奥斯卡获奖教授用模拟软件让数字怪物栩栩如生](https://spectrum.ieee.org/media-library/a-white-man-in-business-casual-attire-seated-at-his-desk-with-a-laptop-and-desktop-computer-each-playing-a-different-movie-on-t.jpg?id=67690500&width=1245&height=700&coordinates=0%2C156%2C0%2C157)

Barbič 参与创办的温哥华初创公司 **Ziva Dynamics** 于 2016 年推出 **Ziva VFX**。

该系统已用于 60 多部电影，包括《海王：失落的王国》和《哥斯拉大战金刚：新帝国》。

**Unity Technologies** 于 2021 年收购 Ziva Dynamics，视觉特效公司 **DNEG** 于 2024 年获得 Ziva VFX 的独家许可。

在近期研究中，Barbič 团队利用 MRI 扫描建立了 4 个人在 12 种姿势下的手部数字孪生数据集，相关数据已公开。

[查看原文](https://spectrum.ieee.org/oscar-winner-jernej-barbic)

---

## OpenTelemetry 将举办手动插桩实践活动 {#news-18}

> OpenTelemetry 将举办下一期“OTel in Practice”活动，VictoriaMetrics Cloud 产品负责人 Jose Gómez-Sellés 将讲解手动插桩实践。活动将聚焦如何生成更清晰的可观测性数据。

![OpenTelemetry 将举办手动插桩实践活动](https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:xnyt4oqz7xhiarcjoveazisv/bafkreifc7vvdnygho7ah2cjalsoz2c2zuarfwbvb65bzn7ozaf3tzsinpe)

活动安排在 9 月 1 日太平洋时间上午 10 点举行。

Jose Gómez-Sellés 将围绕 OpenTelemetry 手动插桩，介绍相关实践方法。

本期主题包括通过手动插桩生成更清晰的可观测性数据。

[查看原文](https://bsky.app/profile/opentelemetry.io/post/3mu5c3gmrvw2f)

---

## 澳大利亚逮捕两名涉嫌参与TeamPCP男子 {#news-19}

> 澳大利亚当局表示，已逮捕两名被指控参与网络犯罪组织 TeamPCP 的男子。两人被控犯有 14 项罪名，但相关指控尚不等同于定罪。

澳大利亚联邦警察称，两名男子分别居住在西澳大利亚州的 Cottesloe 和 Mandurah，警方没有公布其姓名。

据当局统计，TeamPCP 在九个月内通过一系列供应链攻击，入侵了全球超过 1000 个组织。

该组织曾将恶意软件植入开源软件，并使恶意代码从一个软件包传播至另一个软件包。

攻击目标包括组织用于快速开发、更新和部署软件的 CI/CD 流水线。

[查看原文](https://arstechnica.com/security/2026/08/authorities-arrest-2-alleged-members-of-prolific-hacking-group-teampcp/)

---

## npm现10个恶意版本，涉及Mini Shai-Hulud攻击 {#news-20}

> **OpenAPI React Query Codegen** 有10个恶意版本被发布到 npm，涉及一次通过评论触发工作流实施的 Mini Shai-Hulud 攻击。

这些恶意版本均具有有效的 provenance，攻击流程通过评论触发的工作流执行。

原文建议，安装过受影响版本的用户应将相关环境视为已被入侵。

[查看原文](https://bsky.app/profile/socket.dev/post/3mu6bzgamo22l)

---

## 调查称未沙箱化AI代理可能拥有用户级系统权限 {#news-21}

> 一篇文章称，作者在自身环境中运行 `Claude` 的 Shell MCP 服务器后发现，该服务器使用作者本人的用户账户。文章指出，未沙箱化的 MCP 服务器可能按用户权限访问系统资源。

![调查称未沙箱化AI代理可能拥有用户级系统权限](https://infernalcode.com/og-default.png)

作者通过检查 Shell MCP 服务器访问的编码代理进程树和用户 ID，发现该服务器使用的是作者本人的用户账户。

文章指出，以用户身份运行的未沙箱化 MCP 服务器能够读取、修改或删除该用户拥有的文件。

文中列举的风险包括窃取 SSH 密钥、云凭据、API 令牌和浏览器 Cookie。

这类服务器还可能向 Git 远程仓库推送代码、运行系统已有二进制文件，并在具有写入权限的位置安装软件包。

文章称，相关服务器也能访问机器可达的网络位置，并利用本地凭据访问服务；这些行为不需要利用漏洞，而是源于 POSIX 权限。

[查看原文](https://infernalcode.com/posts/your-ai-agent-has-root/)

---

## Meta 更新智能眼镜录制限制以防遮挡安全指示灯 {#news-22}

> **Meta** 正推出更新，阻止用户在录制过程中遮挡智能眼镜的安全指示灯。更新后，若录制期间指示灯被遮挡，相机将停止工作。

此前，用户开始录制后再遮挡 LED 指示灯，仍可绕过设备在录制前遮挡指示灯时触发的停录机制。

Meta 可穿戴设备执行副总裁 Alex Himel 在 Threads 发文称，更新后相机将在录制期间检测到指示灯被遮挡时停止工作。

Meta 表示，该机制旨在让捕捉 LED 在拍摄照片或视频时可靠提醒旁观者。

[查看原文](https://arstechnica.com/tech-policy/2026/08/meta-tweaks-ai-glasses-to-block-some-creepy-recordings-but-privacy-risks-remain/)

---

## Android与iPhone共享文件新增免应用传输方式 {#news-23}

> Google 近期对 Android 的升级，让 Android 手机与 iPhone 之间共享文件和数据更加容易，且无需安装新应用。具体功能取决于手机型号和设置。

![Android与iPhone共享文件新增免应用传输方式](https://media.wired.com/photos/6a904a3b36f6c0403d01480b/191:100/w_1280,c_limit/AndroidIOS.jpg)

较新的 **Pixel** 手机获得了对 Apple AirDrop 的支持，相关功能也已推广到近期 Pixel 和 **Galaxy** 等手机。

部分 Samsung 手机需要在 Quick Share 中启用“Share with Apple devices”；Pixel 手机据原文称无需开启该选项。

iPhone 用户需在“设置”>“通用”>“AirDrop”中选择“Everyone for 10 Minutes”，Android 用户随后可通过 Quick Share 发起传输。

没有 AirDrop 功能的 Android 手机还可使用二维码分享，但不同型号和制造商支持的方式可能有所差异。

[查看原文](https://www.wired.com/story/how-to-share-anything-between-android-and-ios/)

---

## Apple TV订阅价格上调最高达20% {#news-24}

> Apple上调Apple TV订阅价格，月度方案增加2美元至15美元，年度方案从99美元升至119美元。现有订阅用户将在按新价格付费前收到一个月通知。

Apple TV年度订阅价格涨幅为20%，月度订阅价格则由13美元上调至15美元。

Apple最近一次提价发生在2025年8月，当时月度价格从10美元上调至13美元。

Apple TV于2019年推出，最初以Apple TV+名称提供，每月订阅价格为5美元。

[查看原文](https://arstechnica.com/gadgets/2026/08/apple-one-and-apple-tv-subscription-prices-increase-by-up-to-20-percent/)


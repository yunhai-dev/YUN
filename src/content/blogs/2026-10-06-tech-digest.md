---
title: 科技早报 2026-10-06
category: "科技, 科技早报"
excerpt: 开源大模型与多模态模型发布，OpenAI推进欧盟文本水印，AI代理安全与数据泄露问题受关注。
lastEdited: 2026年10月6日
tags: [AI与机器学习, 开源模型, OpenAI, 文本水印, AI代理安全, 网络安全, GitHub]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Aleph Alpha发布780亿参数开源模型Kolibri](#news-1)
- [OpenAI将在欧盟为ChatGPT文本添加隐形水印](#news-2)
- [Reka AI发布190亿参数全能模型Rho-1](#news-3)
- [HackerRank推出可观察解题过程的AI面试官](#news-4)
- [AI数学突破引发争议，数学家要求实验室提交证明](#news-5)
- [Nolla Health在犹他州试点AI生成痤疮处方](#news-6)
### GitHub 热门项目

- [GitHub 热门项目 Dynamo：面向数据中心规模的推理编排层](#news-7)
- [GitHub项目tester-army/e2e用自然语言驱动端到端测试](#news-8)
- [GitHub热门项目 bettercap 聚焦多协议网络侦察](#news-9)
- [Shodan官方Python库新增搜索与数据访问能力](#news-10)
- [OpenCore Legacy Patcher 为旧款 Mac 提供 macOS 支持](#news-11)
- [Beszel提供轻量级服务器监控与容器统计](#news-12)
### 开源生态

- [开源工具可删除macOS中的Apple Intelligence数据](#news-13)
- [经典游戏反编译项目扩展至网页、VR与多人移植](#news-14)
### 安全与隐私

- [MCP代理通信暴露跨代理提示注入信任缺口](#news-15)
- [丹麦政府确认中央公民数据库遭入侵约800万人受影响](#news-16)
- [OpenAI将为ChatGPT和Codex文本加入不可见水印](#news-17)
- [OpenAI将在欧盟ChatGPT中加入文本水印机制](#news-18)
### 产品与平台

- [Cohere将North 2定位为兼容多模型的企业AI控制中心](#news-19)
- [OpenAI将在ChatGPT图像结果旁测试展示视觉广告](#news-20)
- [OpenAI计划在美国测试ChatGPT视觉广告形式](#news-21)
- [TikTok推出AI购物助手与应用内一键结账](#news-22)
### 硬件与芯片

- [Lola Vision Systems开发软硬件简化芯片部署AI模型](#news-23)
- [Google承认部分Intel Googlebook运行安卓应用或不流畅](#news-24)
---

## Aleph Alpha发布780亿参数开源模型Kolibri {#news-1}

> **Aleph Alpha**发布德语—英语混合专家模型`Kolibri`，模型参数规模达780亿。其权重依据Apache 2.0许可证免费提供。

![Aleph Alpha发布780亿参数开源模型Kolibri](https://the-decoder.com/wp-content/uploads/2026/10/kolibri_aleph_alpha.png)

`Kolibri`每个令牌约激活30亿个参数，训练数据中超过21%为德语。

该模型使用部署在德国和芬兰的768块B200 GPU完成训练。

模型权重按照Apache 2.0许可证免费提供。

[查看原文](https://the-decoder.com/aleph-alpha-releases-kolibri-an-open-weight-model-that-makes-the-case-for-european-ai-sovereignty/)

---

## OpenAI将在欧盟为ChatGPT文本添加隐形水印 {#news-2}

> **OpenAI**将开始在欧盟为**ChatGPT**和**Codex**生成的文本添加不可见水印，以遵守《人工智能法案》的透明度规则。相关水印预计未来几周向符合条件的用户推出。

![OpenAI将在欧盟为ChatGPT文本添加隐形水印](https://techcrunch.com/wp-content/uploads/2026/09/openai-getty.jpg?resize=1200,800)

水印通过微调模型用词形成文本模式，读者无法直接看到，但检测器可以识别；复制粘贴文本时，该模式仍会保留。

该功能将覆盖所有符合条件的ChatGPT套餐用户。OpenAI API开发者可从当天起为部分模型启用水印，默认处于关闭状态。

OpenAI表示水印不会识别用户，启用后模型性能未出现显著变化，并发布了名为`textGrain`的技术报告。

测试显示，将10%的词替换为同义词后，水印检测率会从约92%降至66%。短文本、数学答案、翻译文本和大量编辑内容也更难检测。

[查看原文](https://techcrunch.com/2026/10/05/openai-will-start-watermarking-chatgpts-text-in-the-eu/)

---

## Reka AI发布190亿参数全能模型Rho-1 {#news-3}

> **Reka AI**推出全能模型`Rho-1`，可在单一神经网络中处理并生成文本、图像、视频和机器人控制动作。

![Reka AI发布190亿参数全能模型Rho-1](https://the-decoder.com/wp-content/uploads/2026/10/rho1_images.png)

`Rho-1`拥有190亿参数，使用320块H100 GPU训练，训练过程持续约三个月。

该模型没有将任务路由至不同专用系统，而是把所有模态作为令牌置于同一共享上下文窗口中。

文章称，`Rho-1`使用的计算资源仅为当前顶尖模型所需资源的一小部分。

[查看原文](https://the-decoder.com/reka-ais-omni-model-rho-1-handles-text-images-video-and-robot-control-in-a-single-model/)

---

## HackerRank推出可观察解题过程的AI面试官 {#news-4}

> **HackerRank**推出AI面试官Chakra，可在候选人完成真实代码任务时观察其操作，并评估答案与解题过程。该产品已于2026年10月5日面向HackerRank客户开放。

![HackerRank推出可观察解题过程的AI面试官](https://techcrunch.com/wp-content/uploads/2025/09/ai-avatar-simpleshow-2154151760.jpg?resize=1200,826)

HackerRank称，Chakra经过约六个月测试，期间完成超过50万次面试，**Snowflake**、**Snorkel**和**Capgemini**参与了测试。

Chakra面试围绕真实代码仓库中的任务展开，候选人在带有AI助手的画布中工作，系统可根据操作提出后续问题。

HackerRank希望借此评估候选人的批判性思维、判断力和“AI流畅度”，包括其描述问题、判断AI输出及引导AI解决问题的能力。

HackerRank称，Chakra可将招聘人员筛选、居家测评和工程师后续面试合并为一次面试。其披露的数据显示，可疑活动标记较传统测评减少70%至80%，但幅度会因地理位置等因素变化。

[查看原文](https://techcrunch.com/2026/10/05/hackerranks-ai-interviewer-offers-a-glimpse-into-what-job-interviews-could-become/)

---

## AI数学突破引发争议，数学家要求实验室提交证明 {#news-5}

> 过去一年，OpenAI、Anthropic及其他实验室宣布在多个长期存在的数学问题上取得突破。部分成果被描述为超出研究人员对当前系统能力的预期。

![AI数学突破引发争议，数学家要求实验室提交证明](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/268684_OpenAI_claims_to_revolutionize_maths_CVirginia2-1.webp?quality=90&strip=all&crop=0,0,100,100)

相关宣布包括解决一个著名的千禧年大奖难题，但部分数学成果随后引发反弹。

数学家要求相关成果提供证明，并要求OpenAI证明没有使用他们的工作。

AI实验室表示，正在从早期错误中吸取教训。相关承诺能否产生实际效果仍有待观察。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1004933/ai-math-openai-breakthrough-solution)

---

## Nolla Health在犹他州试点AI生成痤疮处方 {#news-6}

> 医疗保健初创公司**Nolla Health**宣布在犹他州试点一项服务，用户可通过应用扫描面部，由AI系统分析痤疮严重程度并生成治疗处方。

![Nolla Health在犹他州试点AI生成痤疮处方](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/nolla-health-app.png?quality=90&strip=all&crop=0,0,100,100)

前100名患者的每张AI生成处方都需要由两名医生批准后才能开具。

完成前100名患者后，医生将改为在处方开具后进行审核，最多覆盖500名患者。

此后，医生将审核至少10%的处方样本。

该服务仍处于试点阶段，原文未说明后续完整的医生监督安排。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1005075/nolla-health-acne-ai-prescriptions)

---

## GitHub 热门项目 Dynamo：面向数据中心规模的推理编排层 {#news-7}

> **Dynamo** 是一个开源的数据中心规模推理技术栈，定位为位于推理引擎之上的编排层。项目用于组织多节点推理系统，支持解耦式服务、智能路由和多层 KV 缓存。

![GitHub 热门项目 Dynamo：面向数据中心规模的推理编排层](https://opengraph.githubassets.com/00a83f741cda4d8d45a85241415b8f87cbb278b1fa67ad969966bcd84145746c/ai-dynamo/dynamo)

**Dynamo** 不替代 `SGLang`、`TensorRT-LLM` 或 `vLLM`，而是将这些推理引擎组织成协调的多节点系统。

项目支持自动扩缩容，面向大语言模型、推理模型、多模态及视频生成等工作负载，目标是提高吞吐量并降低延迟。

该项目使用 Rust 构建，并以 Python 提供可扩展性，适用于多 GPU 或多节点部署，以及独立扩展 prefill 与 decode 的场景。

项目 README 称，如果只在单个 GPU 上运行单个模型，单独使用推理引擎可能已经足够。相关功能和适用场景尚未见独立测试或外部验证。

[查看原文](https://github.com/ai-dynamo/dynamo)

---

## GitHub项目tester-army/e2e用自然语言驱动端到端测试 {#news-8}

> GitHub项目 **tester-army/e2e** 面向Web和移动应用提供端到端测试框架，支持用户用自然语言描述目标并由代理执行。

![GitHub项目tester-army/e2e用自然语言驱动端到端测试](https://repository-images.githubusercontent.com/1308631234/358e34a0-4e46-4400-b092-63a397fe9d48)

该框架支持在同一测试中结合定位器和断言检查结果，经过后续断言验证的代理步骤可被记录并在后续运行中重放。

在应用未发生变化时，已记录的操作无需再次调用模型；不包含代理步骤的测试也不需要模型。

用户可以使用自有订阅、API密钥或本地模型。项目同时提供Web和移动端引擎。

Web引擎通过Playwright支持Chromium、Firefox和WebKit，移动端则通过agent-device支持iOS和Android模拟器或仿真器。

[查看原文](https://github.com/tester-army/e2e)

---

## GitHub热门项目 bettercap 聚焦多协议网络侦察 {#news-9}

> GitHub Trending 项目 **bettercap/bettercap** 使用 Go 语言开发，面向多种网络与设备协议提供侦察及中间人攻击工具。

项目简介显示，bettercap 支持 802.11、BLE、HID、CAN 总线、IPv4 和 IPv6 网络侦察。

该项目同时被描述为可用于中间人攻击，仓库当前显示 Star 数量为 20,097。

项目当天新增 16 颗 Star。

[查看原文](https://github.com/bettercap/bettercap)

---

## Shodan官方Python库新增搜索与数据访问能力 {#news-10}

> **shodan-python** 是 **Shodan** 的官方 Python 库和命令行工具，可访问 Shodan 存储的数据，用于自动化任务及现有工具集成。

![Shodan官方Python库新增搜索与数据访问能力](https://opengraph.githubassets.com/32b40a4efb32500da744f21478674b5230897c9658b4e9d740fc5fb936204faf/achillean/shodan-python)

Shodan 是用于搜索连接互联网设备的搜索引擎，项目提供 Python 接口和命令行界面。

功能包括 Shodan 搜索、快速或批量 IP 查询、实时数据流 API、网络告警及电子邮件通知管理。

项目还支持漏洞利用搜索 API、批量数据下载，以及访问 Shodan DNS 数据库。

用户可通过 `pip install shodan` 安装该库。

[查看原文](https://github.com/achillean/shodan-python)

---

## OpenCore Legacy Patcher 为旧款 Mac 提供 macOS 支持 {#news-11}

> 基于 Python 的 **OpenCore Legacy Patcher** 围绕 `OpenCorePkg` 和 `Lilu` 开发，旨在让部分不再获得 Apple 支持的 Mac 运行 macOS。

![OpenCore Legacy Patcher 为旧款 Mac 提供 macOS 支持](https://opengraph.githubassets.com/4b7bf7dab539e0f627880fcec3d18ceabb3495a9787f94fcb336cac412032462/dortania/OpenCore-Legacy-Patcher)

项目称，支持范围可覆盖最早约为 2007 年的 Mac，并支持安装和使用 macOS Big Sur 及更高版本。

项目列出的功能包括 macOS Big Sur、Monterey、Ventura、Sonoma 和 Sequoia，以及原生 OTA 系统更新。

项目还提供图形加速、Recovery OS、安全模式和单用户模式启动等功能，并支持 Penryn 及更新的 Mac。

项目说明称不需要固件修补；当前正式支持的安装范围为 macOS Big Sur 至 Tahoe，旧版系统不在官方支持范围内。

[查看原文](https://github.com/dortania/OpenCore-Legacy-Patcher)

---

## Beszel提供轻量级服务器监控与容器统计 {#news-12}

> **Beszel** 是一个轻量级服务器监控平台，提供网页界面、Docker 统计、历史数据和告警功能，并支持自动备份、多用户及 OAuth/OIDC 身份验证。

![Beszel提供轻量级服务器监控与容器统计](https://repository-images.githubusercontent.com/825470378/2710c6db-f934-4a8b-a2c4-7a0abbcd2ad6)

Beszel 由 hub 和 agent 两个主要组件组成：hub 用于查看和管理系统，agent 运行在被监控系统上并发送指标。

项目可监控 CPU、内存、磁盘、磁盘 I/O、网络、温度、风扇速度、GPU、电池和容器等指标。

Beszel 支持 Docker 和 Podman 容器统计，可记录各容器的 CPU、内存和网络使用历史。

项目支持 S.M.A.R.T. 磁盘健康数据及故障通知，也可展示 ZFS 池容量、健康状况和 I/O 吞吐量。

此外，Beszel 支持 API 访问，并提供开箱即用的配置方式。

[查看原文](https://github.com/henrygd/beszel)

---

## 开源工具可删除macOS中的Apple Intelligence数据 {#news-13}

> 开源命令行工具RemoveMacAI可删除Mac上的Apple Intelligence模型并关闭相关功能。文章称，该工具最多可释放约12GB存储空间。

![开源工具可删除macOS中的Apple Intelligence数据](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/highlights_siri_conversations_endframe__d56qnw2oz22q_large_2x.jpg?quality=90&strip=all&crop=0,0,100,100)

macOS 27移除了原先用于关闭Apple Intelligence的单一设置开关。

在macOS 27中，相关模型仍会保留在磁盘上，功能设置也被分散到不同页面。

RemoveMacAI开发者在Reddit发帖称，该工具基本实现了旧设置开关的功能。

文章称，用户此前需要查找大约十个设置，其中一些位于“屏幕使用时间”选项下。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1004672/mac-delete-apple-intelligence-ai-tool)

---

## 经典游戏反编译项目扩展至网页、VR与多人移植 {#news-14}

> 经典游戏的反编译和再编译项目，正将部分作品移植到网页浏览器等新平台。相关非官方版本可能涉及法律灰色地带，部分项目还借助了人工智能。

![经典游戏反编译项目扩展至网页、VR与多人移植](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25403266/STK465_VIDEO_GAMES_EMULATOR__CVirginia_B.jpg?quality=90&strip=all&crop=0,0,100,100)

这些项目通过脱离专有代码和原始硬件，让经典游戏能够在新设备上运行，或以不同方式更新原作。

文章提到的项目包括在《使命召唤》中加入滑板，以及在浏览器中运行支持多人游戏的原版《光环》。

一个非官方《乐高赛车》重制版可在浏览器中运行，并支持分屏和在线多人游戏。

文章称，部分项目使用了人工智能辅助制作，但一些参与者因伦理或环境担忧而不接受这种方式。

[查看原文](https://www.theverge.com/games/1004869/reverse-engineered-games-all-the-news-on-video-game-decomps-recomps-vr-and-web-and-3d-ports)

---

## MCP代理通信暴露跨代理提示注入信任缺口 {#news-15}

> 人工智能代理在组织中的普及，为攻击者诱使代理执行恶意操作提供了新机会。研究人员发现，MCP中的信任缺口可能让有害指令在内部代理之间传播。

过去五个月中，Google及另外四个组织承认存在相关漏洞，可利用目标网络中的一个代理向其他内部代理传播有害指令。

这类攻击属于针对特定代理的提示注入，目标可以是翻译代理或数据分析代理，而不只是大型语言模型。

相关代理即使设有防护机制，通常也可能将指令继续发送给代理链中的其他代理；后续代理则可能因信任前一个代理而执行指令。

独立研究人员Syed Anas Mohiuddin测试了多个组织的代理，并利用MCP这一代理通信协议开展概念验证攻击。

[查看原文](https://arstechnica.com/security/2026/10/vulnerability-in-agents-from-google-and-others-exposes-structural-flaw-in-mcp/)

---

## 丹麦政府确认中央公民数据库遭入侵约800万人受影响 {#news-16}

> 丹麦政府确认，其中央公民数据数据库遭到入侵，大部分内容被窃取，约800万名公民和居民受到影响。被窃信息包括姓名、地址和丹麦社会安全号码等。

![丹麦政府确认中央公民数据库遭入侵约800万人受影响](https://techcrunch.com/wp-content/uploads/2026/10/denmark-2267724822.jpg?w=1000)

遭入侵的丹麦中央个人登记系统（CPR）数据库包含约1100万人的记录，部分数据可追溯数十年。

受影响人员包括居住在海外的丹麦公民和居民，以及已故人员。此次入侵发生在9月，并于10月2日被发现。

报道援引信息称，未经授权的访问据称通过滥用一家丹麦公司对CPR系统的合法查询权限实现。

丹麦政府尚未说明攻击幕后主体，并称这起事件可能是该国历史上规模最大的网络攻击。

[查看原文](https://techcrunch.com/2026/10/05/hackers-steal-8-million-citizens-records-from-danish-government-database/)

---

## OpenAI将为ChatGPT和Codex文本加入不可见水印 {#news-17}

> **OpenAI**正在为ChatGPT和Codex的文本输出加入不可见、机器可读的水印，初期仅面向欧盟用户推出。该举措被其与欧盟《人工智能法案》要求联系起来。

![OpenAI将为ChatGPT和Codex文本加入不可见水印](https://platform.theverge.com/wp-content/uploads/sites/2/2025/10/STK155_OPEN_AI_CVirginia__C.jpg?quality=90&strip=all&crop=0,0,100,100)

OpenAI称，其textGrain文本水印方案表现“达到或超过”Google DeepMind的文本SynthID等其他方案。

OpenAI公布的AI基准测试分数显示，添加水印与未添加水印的文本表现相近。

**Anthropic**此前也宣布了基于SynthID的文本水印方案，并同样将相关措施与满足欧盟《人工智能法案》要求联系起来。

OpenAI表示，textGrain“不提供保证”，但相关原文未完整说明这一限制的具体内容。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1004880/openai-chatgpt-text-watermarks-eu-ai-act)

---

## OpenAI将在欧盟ChatGPT中加入文本水印机制 {#news-18}

> **OpenAI**将在欧盟的ChatGPT中添加不可见的`textGrain`文本水印。全球API客户则可以选择退出这项水印机制。

![OpenAI将在欧盟ChatGPT中加入文本水印机制](https://the-decoder.com/wp-content/uploads/2026/10/openai_chatgpt_text_detection-2.png)

与Anthropic不同，**OpenAI**将允许全球API客户选择是否启用这项文本水印机制。

测试显示，文本水印的检测率最高可达95%。

当四分之一的单词被替换后，水印检测率将降至17%。

[查看原文](https://the-decoder.com/openai-will-watermark-chatgpt-text-in-the-eu-but-makes-it-optional-for-api-users-worldwide/)

---

## Cohere将North 2定位为兼容多模型的企业AI控制中心 {#news-19}

> Cohere将企业平台North 2定位为人工智能代理的控制中心。该平台能够处理多步骤工作流，并跨会话保留上下文。

![Cohere将North 2定位为兼容多模型的企业AI控制中心](https://the-decoder.com/wp-content/uploads/2024/06/cohere_logo.png)

North 2面向企业场景，定位是用于管理人工智能代理的控制中心。

平台能够处理多步骤工作流，以支持由多个环节组成的任务。

North 2还能够跨会话保留上下文。

[查看原文](https://the-decoder.com/cohere-pitches-north-2-as-the-enterprise-ai-control-room-that-works-with-any-model/)

---

## OpenAI将在ChatGPT图像结果旁测试展示视觉广告 {#news-20}

> **OpenAI**计划于本月晚些时候在美国测试视觉广告，广告将展示在ChatGPT生成的图像结果旁。公司表示，广告会被清晰标注，且不会影响ChatGPT提供的答案。

![OpenAI将在ChatGPT图像结果旁测试展示视觉广告](https://techcrunch.com/wp-content/uploads/2026/10/new-chatgpt-ads-format-and-measurement-inline-01.webp?w=1200)

此次广告测试初期仅面向美国用户，广告内容将来自一批测试广告主的产品和服务。

OpenAI正在扩展广告衡量工具及合作伙伴，并开发品牌适配性评估方式。

其广告合作生态包括AppsFlyer、Triple Whale、Adjust、DoubleVerify和Integral Ad Science等公司。

OpenAI还与Haus、Measured和WorkMagic合作，帮助广告主开展基于地理位置的广告实验。

报道表示，该计划旨在让ChatGPT面向免费和低价套餐用户发展广告支持型业务；全球推广时间和投放范围尚未确定。

[查看原文](https://techcrunch.com/2026/10/05/openai-launches-visual-ads-that-appear-alongside-image-generation-results/)

---

## OpenAI计划在美国测试ChatGPT视觉广告形式 {#news-21}

> OpenAI计划于本月晚些时候在美国测试ChatGPT的新广告形式，将赞助产品和服务的图片展示在用户屏幕上。

![OpenAI计划在美国测试ChatGPT视觉广告形式](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/chatgpt-visual-ads.webp?quality=90&strip=all&crop=0,0,100,100)

文章称，视觉广告最初会在用户使用ChatGPT生成图片时出现，并与用户生成的图片保持分离。

OpenAI表示，视觉广告不会影响ChatGPT提供的答案。公司于2月首次在ChatGPT中引入广告。

此前，ChatGPT广告仅在聊天下方的“赞助”区域显示企业名称、标志和产品链接。

订阅ChatGPT Plus或Pro的用户不会看到广告；视觉广告目前仍处于计划中的美国测试阶段。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1004655/openai-chatgpt-visual-ads)

---

## TikTok推出AI购物助手与应用内一键结账 {#news-22}

> **TikTok**宣布推出AI购物助手Shopping Assistant和新的应用内结账功能，用户可直接从品牌购买商品。

![TikTok推出AI购物助手与应用内一键结账](https://techcrunch.com/wp-content/uploads/2026/05/GettyImages-2259084458.jpg?resize=1200,801)

TikTok将Shopping Assistant描述为对话式AI代理，可帮助用户发现和购买商品。

该助手能够理解对话上下文，并在对话过程中记住用户的偏好和需求。

它可提供产品详情、配送信息、尺码和库存等实时购物指导，并帮助用户完成购买。

新的结账功能支持用户在For You信息流中一键直接从品牌购买商品，相关功能与Salesforce、Shopify、Shoplazza和Stripe等合作开发。

[查看原文](https://techcrunch.com/2026/10/05/tiktok-rolls-out-an-ai-shopping-assistant-and-one-click-checkout/)

---

## Lola Vision Systems开发软硬件简化芯片部署AI模型 {#news-23}

> 成立于2024年的 **Lola Vision Systems** 正开发软件与自有芯片，试图简化AI模型在设备端芯片上的部署。公司称，其软件可将模型转换为特定芯片能够执行的指令。

![Lola Vision Systems开发软硬件简化芯片部署AI模型](https://techcrunch.com/wp-content/uploads/2026/09/GettyImages-2248111953.jpg?resize=1200,600)

创始人Tayo Adesanya称，在新硬件上手动配置AI模型，开始测试前可能需要约200小时。

客户可提供自研或开源代码和AI模型，软件随后将其转换为客户芯片可执行的指令。

Lola Vision Systems总部位于华盛顿特区，并试图提供NVIDIA设备端AI运行技术的替代方案。

据公司称，约12家企业客户已签署购买芯片的意向函，另有一家客户已签约；公司还计划授权软件以更早获得收入。

[查看原文](https://techcrunch.com/2026/10/05/lola-vision-systems-is-trying-to-make-it-easier-to-run-ai-models-on-chips/)

---

## Google承认部分Intel Googlebook运行安卓应用或不流畅 {#news-24}

> **Google**承认，搭载Intel处理器的部分新款Googlebook在运行Android应用时可能存在流畅度问题。

![Google承认部分Intel Googlebook运行安卓应用或不流畅](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/268755_Google_event_Asus_Googlebook_14_ADiBenedetto_0006_0b94ab.jpg?quality=90&strip=all&crop=0,0,100,100)

Google此前强调，基于Android的Googlebook可以使用完整的Google Play商店应用库。

Google向Android Authority表示，所有应用都可以使用，但部分应用在每款Googlebook上的运行表现可能不流畅。

绝大多数Android应用在Intel和Qualcomm Googlebook上开箱即可流畅运行，Asus Googlebook是可能受影响的Intel机型之一。

目前尚未公布受影响应用的完整名单或具体性能限制。

[查看原文](https://www.theverge.com/tech/1004643/google-android-apps-intel-googlebooks-performance)


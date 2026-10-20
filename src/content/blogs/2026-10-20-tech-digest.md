---
title: 科技早报 2026-10-20
category: "科技, 科技早报"
excerpt: 英伟达发布开放权重模型，AI代理安全、开发者工具与推理芯片融资成为热点。
lastEdited: 2026年10月20日
tags: [人工智能, AI代理, 开放权重模型, 开发者工具, 网络安全, 推理芯片]
imageUrl: 
---

## 概览

### AI 与机器学习

- [英伟达发布面向企业代理的开放权重模型](#news-1)
- [MiniMax M3.1 Flash性能提升且成本降至前代一半](#news-2)
- [Kling AI发布4.0支持立体声与多语言唇形同步](#news-3)
- [Hugging Face称嵌入式 AI 评估器难成简单方案](#news-4)
- [白皮书：边缘人工智能推动城市迈向认知化系统](#news-5)
- [研究关注火灾、永久冻土与人工智能代理行为](#news-6)
### GitHub 热门项目

- [ComfyUI 登上热门榜：提供扩散模型图形界面与 API](#news-7)
- [GitHub 热门项目 headroom 压缩大模型输入令牌](#news-8)
- [Rust 项目 Codync：将多种 AI 代理变成可访问机器人](#news-9)
- [GitHub 热门 Rust 项目推出兼容多种 API 的 LLM 网关](#news-10)
- [GitHub 热门项目：Helm 管理 Kubernetes 应用](#news-11)
- [AI工具帮助用户把智能电视改回“哑电视”](#news-12)
### 开发者工具

- [AWS发布TorchNeuron助力AI应用迁移至Trainium芯片](#news-13)
- [Vibe coding加速音乐设备定制固件普及](#news-14)
### 安全与隐私

- [黑客入侵 OpenCode 平台并窃取用户 API 密钥](#news-15)
- [**微软**推出 **Guardian Agents** 监控企业 AI 代理风险](#news-16)
- [佛州机动车部门数据泄露波及现任及前居民](#news-17)
- [Apple收紧指南严禁应用伪装上线去衣功能](#news-18)
### 产品与平台

- [Replika创始人推出多人个人AI助手Wabi](#news-19)
- [Stripe称人工智能代理购物增加但未公布交易数量](#news-20)
- [Miles Plug推出99美元车载设备，主打定位与紧急救援](#news-21)
### 硬件与芯片

- [Tenstorrent估值升至62亿美元扩大开放权重芯片业务](#news-22)
- [Agility Robotics推出面向仓储重载任务的人形机器人](#news-23)
- [Baseus推出带追踪聚光灯的AI安防摄像头](#news-24)
---

## 英伟达发布面向企业代理的开放权重模型 {#news-1}

> **英伟达**发布面向常驻代理和边缘计算的新型开放权重模型，其中包括面向企业代理的Nemotron 3.5 Super VL。公司称，该模型可由组织使用自有数据后训练并部署在自有基础设施上。

![英伟达发布面向企业代理的开放权重模型](https://techcrunch.com/wp-content/uploads/2024/11/GettyImages-2183848501.jpg?resize=1200,800)

Nemotron 3.5 Super VL拥有1,200亿参数。英伟达称，尽管其参数量少于Nemotron 3 Ultra，但在指令遵循和工具使用任务上的准确率相近。

英伟达还发布两款轻量级Bolt模型，面向搭载Nvidia RTX Spark芯片的新款AI PC，以及运行DGX Spark的工作站本地运行。

面向消费者、程序员和企业知识工作者的相关电脑正通过微软、戴尔等合作伙伴投入市场。

英伟达声称，经过针对特定代理任务的后训练后，Super VL完成任务的速度超过Anthropic和OpenAI的相关竞争模型。

英伟达称Skydance、EY、Ramp、CrowdStrike、Perplexity和Salesforce正在使用Super VL；上述性能与采用情况属于公司声明。

[查看原文](https://techcrunch.com/2026/10/19/nvidia-launches-new-open-models-to-run-agents-in-the-enterprise-and-on-pcs/)

---

## MiniMax M3.1 Flash性能提升且成本降至前代一半 {#news-2}

> **MiniMax**发布的`M3.1 Flash`在Artificial Analysis Intelligence Index上获得42分，较前代产品提高13分。其成本约为前代产品的一半。

![MiniMax M3.1 Flash性能提升且成本降至前代一半](https://the-decoder.com/wp-content/uploads/2026/10/minimax.png)

在DeepSWE v1.1编码基准上，`MiniMax M3.1 Flash`得分为73.7%，单项任务成本低于0.30美元。

该模型在DeepSWE v1.1上的表现和价格，均与`Deepseek V4.1 Flash 1017`相当。

[查看原文](https://the-decoder.com/minimax-m3-1-flash-shows-chinas-ai-price-race-has-no-floor-in-sight/)

---

## Kling AI发布4.0支持立体声与多语言唇形同步 {#news-3}

> **Kling AI** 发布视频生成器 Kling 4.0，支持最长 30 秒的视频片段、立体声音频和多语言唇形同步。该版本还提供更轻量的 Flash 版本。

![Kling AI发布4.0支持立体声与多语言唇形同步](https://the-decoder.com/wp-content/uploads/2026/10/kling4.png)

Kling 4.0 支持输入最多 10 张关键帧图像，提示词理解长度扩展至 8,000 个 token。

文章称，在与 Wan 3.0 和 Seedance 2.5 的对比中，Kling 4.0 表现相当，但没有明显领先。

文章提到，AI 视频模型持续快速进步的趋势可能开始趋于平缓，但这一判断尚未得到确认。

[查看原文](https://the-decoder.com/kling-ai-drops-version-4-0-with-stereo-audio-multilingual-lip-sync-and-a-lighter-flash-variant/)

---

## Hugging Face称嵌入式 AI 评估器难成简单方案 {#news-4}

> Hugging Face 首席政策官 Irene Solaiman 表示，人工智能评估背后的方法较为复杂。她认为，相关评估方法仍处于发展和完善阶段。

人工智能实验室使用模型基准测试，衡量不同人工智能产品的表现。

这些评价通常用于比较一个人工智能产品是否优于另一个产品。

Irene Solaiman 表示，人工智能评估方法较为复杂，且仍在发展和完善中。

上述关于评估方法的表述来自她在讨论中的观点，原文内容并不完整。

[查看原文](https://techcrunch.com/2026/10/19/embedded-ai-evaluators-wont-be-an-easy-solution-hugging-faces-policy-chief-says/)

---

## 白皮书：边缘人工智能推动城市迈向认知化系统 {#news-5}

> 一份白皮书介绍了边缘人工智能与物理人工智能如何帮助城市从被动监控转向基于实时条件进行感知、推理和行动。

![白皮书：边缘人工智能推动城市迈向认知化系统](https://spectrum.ieee.org/media-library/black-intel-wordmark-logo-on-transparent-checkerboard-background.png?id=68424848&width=980)

白皮书指出，认知城市依赖能够进行推理和行动的基础设施，而不仅是用于监控的基础设施。

边缘人工智能支持低延迟决策，可将敏感数据保留在城市边界内，并减少对集中式云基础设施的依赖。

计算机视觉、多模态感知、生成式系统和智能体系统可协同用于公共安全、出行及基础设施管理。

分层边缘架构将监控、规划和行动任务分配到最边缘层、区域层和云层，同时对硬件与软件提出耐久性、安全性和互操作性要求。

[查看原文](https://content.knowledgehub.wiley.com/edge-ai-for-smart-cities-from-real-time-insights-to-cognitive-urban-systems/?utm_source=IEEE)

---

## 研究关注火灾、永久冻土与人工智能代理行为 {#news-6}

> 气候变化加剧火灾并推动永久冻土融化，研究人员正探索打破相关排放循环的方法。与此同时，人工智能代理在虚拟荒岛上的自主行为引发了对“玩耍”定义的讨论。

![研究关注火灾、永久冻土与人工智能代理行为](https://s.w.org/images/core/emoji/17.0.2/72x72/1f4c9.png)

2021年7月，阿拉斯加大学费尔班克斯分校校园的一场野火烧毁森林，也清除了保护永久冻土的苔藓和有机土壤。研究人员使用金属探针测量火灾后的地面冻融深度。

研究显示，火灾正在加速永久冻土融化并释放温室气体，研究人员正探索如何打破火灾、永久冻土融化与排放之间的循环。

研究人员曾让人工智能代理在虚拟荒岛上独处30小时。代理探索地图边界并形成目标，但文章指出，这些行为是否构成真正的玩耍仍不确定，也可能只是角色扮演。

文章还提及，**X-energy**提出的`Xe-100`反应堆使用氦气冷却；2025年，斯坦福大学博士生Samuel King曾用生成式人工智能模型提出微型病毒遗传蓝图，但这尚不属于人工智能生成生命。

[查看原文](https://www.technologyreview.com/2026/10/19/1147103/the-download-preserving-the-arctic-permafrost-and-playful-ai-agents/)

---

## ComfyUI 登上热门榜：提供扩散模型图形界面与 API {#news-7}

> GitHub Trending Python 项目 **Comfy-Org/ComfyUI** 当前获得 139135 颗星，今日新增 1011 颗星。项目提供扩散模型图形用户界面、API 和后端。

**ComfyUI** 使用 Python 开发，采用图形化节点界面。

项目定位为扩散模型的图形用户界面、API 和后端，支持相关模型推理流程。

项目描述称其为“最快的本地推理引擎”，这一表述未获原文提供的独立依据验证。

[查看原文](https://github.com/Comfy-Org/ComfyUI)

---

## GitHub 热门项目 headroom 压缩大模型输入令牌 {#news-8}

> GitHub Trending上的 Python 项目 **headroom** 用于在工具输出、日志、文件和检索增强生成文本块发送给大型语言模型前进行压缩。

项目页面显示，`headroomlabs-ai/headroom` 拥有 75,972 颗星，并在当天获得 317 颗星。

项目提供库、代理和 MCP 服务器等形式，用于压缩发送给大型语言模型的输入内容。

项目描述称，该工具可使编程代理使用的令牌减少 20%，JSON 使用的令牌减少 60% 至 95%。

上述令牌减少比例及保持相同答案的说法来自项目描述，提供的信息未给出独立验证。

[查看原文](https://github.com/headroomlabs-ai/headroom)

---

## Rust 项目 Codync：将多种 AI 代理变成可访问机器人 {#news-9}

> GitHub Trending Rust 项目 **leepokai/Codync** 获得 584 颗星，今日新增 49 颗星。项目定位为开源 Grok Bot 替代方案。

**Codync** 使用 Rust 开发，可将 Claude Code、Codex、Cursor、Gemini 及其他 40 多个 AI 代理作为机器人使用。

项目支持在用户自己的计算机上运行，并可通过 iPhone、Mac、Windows、Linux 或终端访问。

该项目免费提供，项目描述称其可作为 Muse 和 Dots 的替代方案。

[查看原文](https://github.com/leepokai/Codync)

---

## GitHub 热门 Rust 项目推出兼容多种 API 的 LLM 网关 {#news-10}

> Rust 项目 **smg-project/smg** 登上 GitHub Trending，定位为与推理引擎无关的 LLM 网关。项目支持 OpenAI 和 Anthropic API 兼容性，并可适配多类服务与引擎。

**smg-project/smg** 当前获得 626 颗星，今日新增 8 颗星，项目使用 Rust 开发。

项目说明称，该网关可适配 `vLLM`、`TRT-LLM`、`TokenSpeed`、`SGLang`、OpenAI 和 Gemini 等服务或引擎。

功能包括 gRPC 管道、基于 KV 缓存感知的路由、聊天历史、分词缓存、Responses API、嵌入、WASM 插件、MCP 和多租户身份验证。

“Industry-first”及相关兼容性、功能描述来自项目说明，原文未提供独立验证依据。

[查看原文](https://github.com/smg-project/smg)

---

## GitHub 热门项目：Helm 管理 Kubernetes 应用 {#news-11}

> **Helm** 是用于管理 Kubernetes 应用程序的工具，也被称为 Kubernetes 包管理器。项目当前稳定版本为 `Helm v4`，开发工作在 `main` 分支进行。

![GitHub 热门项目：Helm 管理 Kubernetes 应用](https://opengraph.githubassets.com/03142bcc6d2e503b2c179dd3f76792f090752bada05c289835cc5480fdad29c6/helm/helm)

Helm Chart 是预配置 Kubernetes 资源的软件包，至少包含一个 `Chart.yaml` 文件和一个或多个模板。

Helm 可用于查找和使用 Chart、分享应用程序、创建可复现构建，以及管理 Kubernetes 清单文件和软件包发布。

Helm 会渲染模板并与 Kubernetes API 通信，可运行于个人电脑、CI/CD 环境或其他环境。

`Helm v3` 处于支持模式，原文称其错误修复支持至 2026 年 7 月 8 日，安全修复支持至 2026 年 11 月 11 日；相关时间可能随项目更新变化。

[查看原文](https://github.com/helm/helm)

---

## AI工具帮助用户把智能电视改回“哑电视” {#news-12}

> 一些用户正借助人工智能代理和相关工具，移除智能电视广告、跟踪功能及臃肿软件。相关方案试图让电视只保留应用和 HDMI 输入。

![AI工具帮助用户把智能电视改回“哑电视”](https://techcrunch.com/wp-content/uploads/2024/05/Google-TV.jpeg?w=1200)

名为“dumbtv”的方案主张关闭电视广告、观看跟踪和未经同意的更新，并保留用户应用与 HDMI 输入。

“cleanyourtv”声称可通过 Wi-Fi 清理 Android TV 或 Google TV 软件，并将启动器替换为类似 Apple TV 的界面。

创建者 Gathin T. 表示，他使用 `Claude Code` 操作父母的电视，移除 25 个小米软件包并编写新启动器。

该方案已在多品牌电视和投影设备上完成测试。文章称，若此类改造普及，可能影响依靠观看数据和个性化广告获利的智能电视广告行业。

[查看原文](https://techcrunch.com/2026/10/19/people-are-using-ai-to-make-their-smart-tvs-dumb-again/)

---

## AWS发布TorchNeuron助力AI应用迁移至Trainium芯片 {#news-13}

> **亚马逊云服务** 发布 `TorchNeuron`，帮助 AI 初创企业将基于 `PyTorch` 的应用迁移至亚马逊 `Trainium` 芯片。AWS称，开发者只需修改一行配置，无需重写代码即可运行相关应用。

![AWS发布TorchNeuron助力AI应用迁移至Trainium芯片](https://techcrunch.com/wp-content/uploads/2025/03/GettyImages-2205217071.jpg?resize=1200,800)

`TorchNeuron` 与开源机器学习工具 `PyTorch` 配合使用，面向 AI 应用的训练和推理工作负载。

亚马逊表示，约 85% 的 AI 应用使用 `PyTorch` 编写；该项目自 2022 年起由 Linux Foundation 维护。

英伟达的 `CUDA` 软件基础设施支持 `PyTorch` 应用，是其硬件深度融入该生态的重要组成部分。

AWS称，`Trainium` 可与云基础设施集成，可能改善完整工作负载的经济性；相关成本优势说法来自 AWS。

[查看原文](https://techcrunch.com/2026/10/19/amazon-is-taking-its-biggest-shot-at-nvidia-yet-with-new-torchneuron-dev-tool/)

---

## Vibe coding加速音乐设备定制固件普及 {#news-14}

> 硬件合成器、采样器和律动盒的定制固件正在增加，日益成熟的 `vibe coding` 工具成为重要助力。业余开发者如今可在几天内改造部分廉价音乐设备。

![Vibe coding加速音乐设备定制固件普及](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/elektron-model-cycles-model-samples-8.jpg?quality=90&strip=all&crop=0,0,100,100)

在大型语言模型出现前，定制固件通常需要深厚专业知识和大量时间，因此相对罕见。

过去，为 **Korg Volca** 添加力度感应等简单功能，可能需要数周或数月。

如今，业余黑客能够在几天内将廉价的 Temu 合成器改造成具备完整律动盒功能的设备。

[查看原文](https://www.theverge.com/gadgets/1013493/vibe-coding-ai-music-gear-hacking-custom-firmware)

---

## 黑客入侵 OpenCode 平台并窃取用户 API 密钥 {#news-15}

> 黑客入侵了开源 AI 编程代理 **OpenCode** 在线平台的部分区域，并窃取部分用户的 API 密钥。相关事件可能导致用户 AI 账户产生未经授权的费用，但受影响范围和费用规模尚不明确。

**OpenCode** 是一款开源 AI 编程代理，已成为 `Claude Code` 和 `Cursor` 的热门替代品。

此次入侵涉及 OpenCode 在线平台的部分区域，黑客据称获取了部分用户的 API 密钥。

OpenCode 曾寻求 AI 工具协助查看相关恶意代码，但该工具拒绝处理。原文未说明受影响用户数量及未经授权费用规模。

[查看原文](https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/)

---

## **微软**推出 **Guardian Agents** 监控企业 AI 代理风险 {#news-16}

> 微软推出 **Guardian Agents**，用于监控企业使用的人工智能代理。微软高管称，前沿模型具有不可预测性，企业可能需要独立系统进行监控和控制。

![**微软**推出 **Guardian Agents** 监控企业 AI 代理风险](https://techcrunch.com/wp-content/uploads/2026/10/Networked-AI-swarm-with-glowing-nodes.png?resize=1200,600)

**Guardian Agents** 属于微软 6 月推出的 **Project Perception**，后者最初包括红队、蓝队和绿队三类代理。

微软首席执行官 Satya Nadella 警告称，企业部署并付费使用的人工智能代理可能像失职员工一样构成内部威胁。

微软安全业务负责人 Hayete Gallot 表示，无论来源如何，前沿模型都不能被信任；相关判断主要来自微软方面，原文未提供独立验证。

微软与 **OpenAI**、**Anthropic** 存在投资或业务关系，同时希望企业购买其代理安全产品。

[查看原文](https://techcrunch.com/2026/10/19/microsoft-says-ai-agents-are-like-insider-threats-as-frontier-models-cant-be-trusted/)

---

## 佛州机动车部门数据泄露波及现任及前居民 {#news-17}

> 佛罗里达州公路安全与机动车辆部门开始通知数据泄露事件的潜在受影响人员，恶意行为者曾使用泄露凭据访问部分部门记录。

该部门确认，恶意行为者于2026年9月4日访问了部分记录，可能涉及驾驶证和机动车数据、证件图像及其他个人信息。

佛罗里达州公路安全与机动车辆部门表示，目前没有证据表明这些数据已经被滥用。

该部门将向受影响人员提供由Sontiq提供的一年信用监测服务。

由于部分前佛罗里达州居民的联系方式可能已过时，所有潜在受影响者未必都能收到通知；相关人员可通过电子邮件联系该部门确认情况。

[查看原文](https://arstechnica.com/tech-policy/2026/10/huge-dmv-data-breach-impacted-current-and-former-florida-residents/)

---

## Apple收紧指南严禁应用伪装上线去衣功能 {#news-18}

> Apple更新开发者指南，禁止人工智能应用生成冒犯性内容，并明确禁止应用在审核时伪装成普通应用、获批后再启用“去衣”功能。

![Apple收紧指南严禁应用伪装上线去衣功能](https://techcrunch.com/wp-content/uploads/2024/01/app-store-2024-v1.jpg?resize=1200,675)

**Apple**要求承载用户生成内容的应用过滤令人反感的材料，并提供举报冒犯性内容和屏蔽滥用账号的功能。

Apple表示，将移除那些在审核通过后增加提交版本中不存在功能的应用。相关法律条款也重申，禁止宣传人口贩运和剥削儿童的应用。

Apple称，其审核流程去年阻止超过15万款应用向用户提供服务，并因欺诈和滥用移除了193000个开发者账号。

文章提及的旧金山市相关要求及应用商店曾托管此类应用的报告，属于监管背景，并非本次指南更新本身的措施。

[查看原文](https://techcrunch.com/2026/10/19/apple-updates-guidelines-to-ban-nudify-apps-masquerading-as-regular-apps-to-pass-review/)

---

## Replika创始人推出多人个人AI助手Wabi {#news-19}

> Replika创始人Eugenia Kuyda推出多人个人AI助手**Wabi**，产品以消息应用形式运行。Wabi可围绕任务和长期目标创建多个代理线程。

![Replika创始人推出多人个人AI助手Wabi](https://techcrunch.com/wp-content/uploads/2026/10/wabi-ios-home.png?resize=1200,1200)

12年前，Kuyda曾在TechCrunch Disrupt展示对话式聊天机器人IO，帮助用户预订餐厅和旅行。

IO是Kuyda创办的Luka公司的首款产品，Luka后来转型为AI陪伴公司Replika。

Wabi允许用户围绕不同任务建立代理线程，并在每个线程中创建和使用自定义应用。

Wabi 2.0会根据用户需求决定创建哪些应用；连接邮箱后，系统可自动生成线程和应用。

[查看原文](https://techcrunch.com/2026/10/19/replikas-founder-built-the-ai-assistant-she-pitched-at-disrupt-12-years-ago/)

---

## Stripe称人工智能代理购物增加但未公布交易数量 {#news-20}

> **Stripe** 表示，人工智能代理正越来越多地使用其支付服务 `Link` 代表用户购物。公司确认相关购买行为正在增加，但未公布具体交易数量。

![Stripe称人工智能代理购物增加但未公布交易数量](https://the-decoder.com/wp-content/uploads/2026/08/stripe_logo_wall.png)

有关人工智能代理使用 `Link` 购物的报道来自 Upstarts Media。

**Stripe** 表示，人工智能代理产生的购买行为正在增加。

不过，**Stripe** 没有分享人工智能代理购买交易的具体数字，相关趋势的规模仍未披露。

[查看原文](https://the-decoder.com/stripe-says-ai-agent-purchases-are-adding-up-but-it-wont-share-the-numbers/)

---

## Miles Plug推出99美元车载设备，主打定位与紧急救援 {#news-21}

> **Miles Plug**是一款插入汽车 OBD-II 接口的小型设备，可监测车辆位置、驾驶习惯和车辆状况。文章称，该产品面向青少年驾驶者，并提供事故紧急响应与道路救援服务。

![Miles Plug推出99美元车载设备，主打定位与紧急救援](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/LR6B6271.jpeg?quality=90&strip=all&crop=0,0,100,100)

Miles Plug 可接入汽车 OBD-II 接口，持续获取车辆位置、驾驶习惯及车辆状况等信息。

文章将其描述为面向青少年驾驶者的汽车智能设备，作者因女儿刚取得学习驾照而进行测试。

文章摘要显示，该设备售价为 99 美元，并承诺不出售用户数据；但正文节选未进一步说明数据政策或完整规格。

作者还提到，自己曾测试已停产的 Ring Car Cam，但其儿子学车时拒绝开启该设备。

[查看原文](https://www.theverge.com/tech/1013918/miles-plug-vehicle-tracking-data-privacy-specs-price-launch-date)

---

## Tenstorrent估值升至62亿美元扩大开放权重芯片业务 {#news-22}

> 推理芯片初创公司**Tenstorrent**已融资15亿美元，估值达到62亿美元。公司计划利用新资金扩大面向开放权重AI模型和视频生成的芯片业务。

![Tenstorrent估值升至62亿美元扩大开放权重芯片业务](https://techcrunch.com/wp-content/uploads/2023/08/rnuUXh8kprc7HfoRAGgTvZ-1200-80.jpg?w=970)

本轮融资由Trace Capital和Innovation X领投，Cadence Ventures、Eclipse、Fidelity、SanDisk及T. Rowe Price等参与。

**Tenstorrent**最新估值较其2024年末获得的26亿美元估值增加一倍以上。

首席执行官Jim Keller表示，公司展示Galaxy服务器运行DeepSeek模型后，决定保持独立并继续筹资。

公司本轮融资发生在其据报道于五个月前受到英特尔和高通收购兴趣之后；相关兴趣据报道最高对应50亿美元估值。

[查看原文](https://techcrunch.com/2026/10/19/tenstorrent-hits-6-2b-valuation-to-scale-open-weight-ai-chips/)

---

## Agility Robotics推出面向仓储重载任务的人形机器人 {#news-23}

> **Agility Robotics**推出人形机器人`Digit 5`，目标是在真实环境中安全、经济地执行大规模工作。该机器人面向仓库等场景，可搬运重达23公斤的箱子。

![Agility Robotics推出面向仓储重载任务的人形机器人](https://spectrum.ieee.org/media-library/author-jonathan-hurst-a-tall-slim-white-man-wearing-a-black-long-sleeve-shirt-and-dark-jeans-stands-next-to-his-digit-5-humano.jpg?id=68441166&width=1245&height=700&coordinates=0%2C1422%2C0%2C1423)

**Agility Robotics**于2015年由作者等人从俄勒冈州立大学机器人实验室共同创立，联合创始人包括Damion Shelton和Mikhail Jones。

`Digit 5`被设计用于仓库等真实环境，可将23公斤的箱子举到高货架，并计划连续处理重型任务。

该机器人电池可运行90分钟，并可在9分钟内完成充电。

俄勒冈州立大学动态机器人实验室于2008年启动，并研发了双足机器人`ATRIAS`。

[查看原文](https://spectrum.ieee.org/agility-robotics-digit-5-redesign)

---

## Baseus推出带追踪聚光灯的AI安防摄像头 {#news-24}

> **Baseus**宣布推出AI辅助安防摄像头产品 **Baseus Security PrimeSentinel U2 Pro Outdoor 3K Dual Camera**。该产品配备可跟随移动目标的电动聚光灯。

![Baseus推出带追踪聚光灯的AI安防摄像头](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/baseus1.jpg?quality=90&strip=all&crop=0,0,100,100)

摄像头的电动聚光灯可以直接照射在移动目标上，即使目标正在房产范围内移动。

定向光束旨在震慑不受欢迎的访客，同时提升夜间拍摄视频的质量。

更清晰的夜间画面有助于增加识别目标的可能性，聚光灯也可协助家庭进行夜间活动，例如遛狗。

[查看原文](https://www.theverge.com/tech/1005073/baseus-security-primesentinel-u2-pro-outdoor-3k-dual-camera-tracking-spotlight)


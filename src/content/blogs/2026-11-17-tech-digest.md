---
title: 科技早报 2026-11-17
category: "科技, 科技早报"
excerpt: 金融与航空系统故障频发，AI模型与智能体进展、开源项目和自动化网络攻击成为焦点。
lastEdited: 2026年11月17日
tags: [科技早报, 人工智能, 网络安全, 云服务, 开源生态, 自动驾驶, OpenAI]
imageUrl: 
---

## 概览

### 要闻

- [多家金融机构现技术故障原因仍待厘清](#news-1)
- [联合航空系统中断影响航班出发安排](#news-2)
- [FAA全国地面停飞暴露航空通信故障影响](#news-3)
### AI 与机器学习

- [OpenAI发布CSAM图像分类器并强化ChatGPT警告](#news-4)
- [阿里发布Qwen4-Max，主打低成本长上下文处理](#news-5)
- [Tunix实现TPU同策略强化学习训练推理按位一致](#news-6)
- [OpenAI将安排Apollo研究人员调查AI颠覆行为](#news-7)
- [Anthropic研究：代理记忆关键在于知道忘记什么](#news-8)
- [Moonshot AI将Kimi从编程转向科学研究](#news-9)
### GitHub 热门项目

- [GitHub热门项目推出Stitch MCP技能库](#news-10)
- [GitHub热门项目ag-ui协议推动智能体接入前端应用](#news-11)
- [GitHub热门项目PaperOrchestra可自动撰写AI论文](#news-12)
- [Rust项目Lance面向多模态AI提供Lakehouse格式](#news-13)
- [Arcane开源Docker管理项目登上GitHub热门](#news-14)
- [Kubescape开源平台覆盖Kubernetes安全与合规扫描](#news-15)
### 开源生态

- [Google介绍GKE代理会话停放方案，节点成本最高降40%](#news-16)
- [开源阵营请愿要求恢复黄仁勋英伟达首席职位](#news-17)
### 安全与隐私

- [美国联邦调查局警告开源AI工具加速网络入侵](#news-18)
- [Google称全自动网络攻击已出现且可能迅速恶化](#news-19)
- [Uber称数据泄露导致近十五万名司机信息被盗](#news-20)
- [苹果将在 macOS 27.3 增加 Mac 权限控制](#news-21)
### 产品与平台

- [微软披露云网关缺陷等三因素引发全球宕机](#news-22)
- [Zoox无人驾驶出租车接入Uber拉斯维加斯服务](#news-23)
- [Zoox无人驾驶出租车正式出现在Uber拉斯维加斯应用中](#news-24)
---

## 多家金融机构现技术故障原因仍待厘清 {#news-1}

> 美国多家主要金融机构客户周一报告遇到技术问题，相关报告在Downdetector.com上达到数千条。**JPMorganChase**称，本地硬件系统的软件漏洞导致服务暂时变慢。

![多家金融机构现技术故障原因仍待厘清](https://media.wired.com/photos/6afb6cf38468d112312ff4b9/191:100/w_1280,c_limit/Security_Yes,%20Your%20Bank%20Is%20Having%20an%20Outage_v2.jpg)

**JPMorganChase**表示，部分客户获得服务所需时间比平时更长，但没有证据表明事件与网络攻击有关，也不是系统性问题。

该行称，其他银行只有在参与涉及**JPMorganChase**的交易时，才可能受到交易处理变慢的影响；客户仍可访问账户和资金。

相关问题约于美国东部时间上午9时30分开始，下午2时左右达到峰值。**Zelle**、Mastercard和Visa称各自系统运行正常。

目前尚不清楚多家机构受影响的完整原因，部分信息来自用户向Downdetector提交的报告。

[查看原文](https://www.wired.com/story/jpmorganchase-bank-outage-oh-come-on/)

---

## 联合航空系统中断影响航班出发安排 {#news-2}

> **联合航空**发生系统中断，影响部分出发航班。该事件发生在美国联邦航空管理局因空管通信和雷达问题暂停全国起飞不到一周后。

![联合航空系统中断影响航班出发安排](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/gettyimages-2304760092.jpg?quality=90&strip=all&crop=0,0,100,100)

联合航空表示正在努力尽快恢复系统运行，但未提供有关此次问题的太多技术细节。

一些乘客在社交媒体发帖称，机上飞行员告知他们联合航空发生了系统范围的IT中断。

有关系统范围IT中断导致航班受影响的信息，部分来自社交媒体帖子，具体技术原因尚未披露。

[查看原文](https://www.theverge.com/transportation/1035025/united-airlines-outage-down-departures)

---

## FAA全国地面停飞暴露航空通信故障影响 {#news-3}

> 美国联邦航空管理局（FAA）于2026年11月13日发布全国范围紧急地面停飞令。一起通信问题随后在全美范围产生连锁影响。

![FAA全国地面停飞暴露航空通信故障影响](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/gettyimages-2304497345.jpg?quality=90&strip=all&crop=0,0,100,100)

亚特兰大以外约30分钟飞行距离处，一名飞行员通过机内广播表示出现问题。

飞行员称，相关问题可能影响登机口使用和转机航班。

圣迭戈国际机场的航班状态由延误变为取消，通信故障影响持续扩大。

Amanda Khera一家原计划从伯利兹附近返程。其22个月大的儿子Rio因高烧被送往当地诊所。

[查看原文](https://www.theverge.com/transportation/1034039/faa-aviation-glitch-meltdown-ground-stop)

---

## OpenAI发布CSAM图像分类器并强化ChatGPT警告 {#news-4}

> OpenAI发布用于检测儿童性虐待材料（CSAM）的图像分类器，并将通过 API 向部分选定公司免费提供。ChatGPT也将针对相关违规行为增加警告和账户处置措施。

![OpenAI发布CSAM图像分类器并强化ChatGPT警告](https://techcrunch.com/wp-content/uploads/2026/11/OpenAI-chatgpt-CSAM.jpeg?resize=1200,675)

该分类器可检测人工智能生成的相关图像，并根据视觉虐待迹象评分，为审核人员处理 CSAM 提供参考。

OpenAI称，该工具由其与美国国家失踪与受剥削儿童中心共同开发，并与 Tech Coalition、ROOST 合作共享访问权限。

早期测试显示，在发现相同数量虐待图像的同时，标记图像数量减少48%；被标记图像成为虐待图像的可能性是其他图像的两倍。

ChatGPT将向访问儿童性化内容的用户显示警告、提供专业支持渠道，并暂停账户24小时；重复违规可能导致永久移除。上述效果数据来自早期测试，实际广泛表现仍不确定。

[查看原文](https://techcrunch.com/2026/11/16/openai-releases-a-new-image-classifier-and-chatgpt-warnings-to-combat-csam/)

---

## 阿里发布Qwen4-Max，主打低成本长上下文处理 {#news-5}

> **阿里巴巴**发布旗舰模型 `Qwen4-Max`，模型拥有2.4万亿参数，并通过混合架构降低长上下文处理成本。

![阿里发布Qwen4-Max，主打低成本长上下文处理](https://the-decoder.com/wp-content/uploads/2026/07/qwen_logo-1.png)

`Qwen4-Max` 每个 token 仅激活710亿参数，采用混合架构以降低长上下文处理成本。

在 Artificial Analysis Intelligence Index 上，`Qwen4-Max` 排名略低于 `Kimi K3.1 Pro`。

**阿里巴巴**计划将规模更小的 `Qwen4` 模型开源。

[查看原文](https://the-decoder.com/alibabas-qwen4-max-takes-on-opus-5-5-gpt-6-and-kimi-k3-1-pro-at-much-lower-prices/)

---

## Tunix实现TPU同策略强化学习训练推理按位一致 {#news-6}

> Google文章讨论 TPU 上大语言模型同策略强化学习中的训练与推理数值不一致问题，并介绍 Tunix 中实现的 Zero-TIM 方案。该方案旨在让采样器与训练器对相同动作及令牌历史给出按位一致的对数概率。

![Tunix实现TPU同策略强化学习训练推理按位一致](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/zero_tim_tpu_blog_header_1600x900.2e16d0ba.fill-1200x600.png)

即使使用相同权重，采样器和训练器也可能因执行路径不同，为同一令牌及上下文计算出不同的对数概率。

浮点加法不满足结合律，归约树变化会改变舍入位置，这一问题在 `bfloat16` 中更容易显现。

原有系统的采样解码与训练前向计算使用不同令牌数组形状和实现，导致归约顺序及中间精度不一致。

Zero-TIM 已在 64 个 Cloud TPU v5p 芯片上完成多主机规模验证，配置为 `DP8×TP8`。文章未说明结果是否适用于其他硬件规模或配置。

[查看原文](https://developers.googleblog.com/unlocking-stable-on-policy-rl-on-tpu-with-bitwise-zero-traininference-mismatch/)

---

## OpenAI将安排Apollo研究人员调查AI颠覆行为 {#news-7}

> OpenAI将安排 Apollo Research 的6名评估人员参与相关研究，调查其人工智能模型是否会实施颠覆性行为。

这些评估人员将参与对 OpenAI 模型行为的评估，研究重点是模型是否可能实施颠覆性行为。

文章指出，研究人员的访问权限和信息披露受到限制，这可能影响 Apollo Research 评估人员的独立性。

[查看原文](https://techcrunch.com/2026/11/16/openai-will-embed-apollo-researchers-to-investigate-ai-subversion/)

---

## Anthropic研究：代理记忆关键在于知道忘记什么 {#news-8}

> Anthropic研究了Claude如何跨会话保留知识，结果显示，选择性记录的效果明显优于详尽档案。

![Anthropic研究：代理记忆关键在于知道忘记什么](https://the-decoder.com/wp-content/uploads/2026/10/anthropic_claude-2.png)

在《Pokémon Red》测试中，**Claude Fable 5**通过保留少量策略文件，取得了比`Sonnet 3.7`远四倍的进展。

测试中，`Claude Fable 5`仅保留少量策略文件，而`Sonnet 3.7`使用了400多个文件。

研究还介绍了“Dreaming”过程，该过程会追溯性地纠正错误记忆。

[查看原文](https://the-decoder.com/anthropic-says-the-key-to-agent-memory-is-knowing-what-to-forget-not-how-much-to-store/)

---

## Moonshot AI将Kimi从编程转向科学研究 {#news-9}

> 北京初创公司Moonshot AI表示，将不再继续追逐编程基准测试。公司正把**Kimi**语言模型转向生物学、化学和制药研究。

![Moonshot AI将Kimi从编程转向科学研究](https://the-decoder.com/wp-content/uploads/2026/11/moonshot_ai_sciences.png)

Moonshot AI认为，科学领域对人工智能能力的要求高于法律、金融或编程领域。

该公司此次调整将重点放在利用Kimi支持生物学、化学和制药研究。

[查看原文](https://the-decoder.com/moonshot-ai-pivots-kimi-models-from-coding-to-science-as-benchmark-gains-flatten/)

---

## GitHub热门项目推出Stitch MCP技能库 {#news-10}

> GitHub Trending 项目 **google-labs-code/stitch-skills** 是一个为 Stitch MCP 服务器设计的 Agent Skills 库。项目使用 TypeScript 编写，已获得 9593 颗星，文章记录其当天新增 540 颗星。

该项目中的每个技能都遵循 Agent Skills 开放标准。

项目描述称，技能库兼容 **Antigravity**、**Gemini CLI**、**Claude Code** 和 **Cursor** 等编码代理。

[查看原文](https://github.com/google-labs-code/stitch-skills)

---

## GitHub热门项目ag-ui协议推动智能体接入前端应用 {#news-11}

> GitHub Trending 项目 `ag-ui-protocol/ag-ui` 使用 TypeScript 编写，项目名为 AG-UI，即 Agent-User Interaction Protocol。

该项目目前拥有18407颗星，文章记录其当天新增790颗星。

项目描述称，AG-UI 用于将智能体引入前端应用。

[查看原文](https://github.com/ag-ui-protocol/ag-ui)

---

## GitHub热门项目PaperOrchestra可自动撰写AI论文 {#news-12}

> GitHub Trending项目 **google-research/paper-orchestra** 使用Python开发，被描述为用于自动撰写人工智能研究论文的多智能体框架。

该项目当前拥有1,024颗星，今日新增306颗星。

项目定位为多智能体框架，面向人工智能研究论文的自动撰写。

[查看原文](https://github.com/google-research/paper-orchestra)

---

## Rust项目Lance面向多模态AI提供Lakehouse格式 {#news-13}

> GitHub Trending项目 **lance-format/lance** 使用Rust开发，被描述为面向多模态人工智能的开放式Lakehouse格式。

Lance当前拥有7,329颗星，今日新增18颗星。

项目描述称，Lance可通过两行代码从Parquet转换而来，并支持向量索引和数据版本控制。

该项目兼容Pandas、DuckDB、Polars、PyArrow和PyTorch，并计划继续增加更多集成。

[查看原文](https://github.com/lance-format/lance)

---

## Arcane开源Docker管理项目登上GitHub热门 {#news-14}

> **Arcane**是一款面向所有用户的现代化Docker管理项目，支持Docker、Docker Compose、容器管理和自托管。项目采用Go、SvelteKit与TypeScript构建。

![Arcane开源Docker管理项目登上GitHub热门](https://repository-images.githubusercontent.com/968905557/41c6a985-ef5a-4ec5-b20d-04ce885cc6ac)

Arcane主分支为v3版本，2.x系列的最新版本位于`release/2.x.x`分支。

项目提供官方文档，涵盖安装、配置和开发指南，并采用BSD-3-Clause许可证。

GitHub仓库页面显示，Arcane约有8400颗Stars、354个Forks和14名Watchers。

[查看原文](https://github.com/getarcaneapp/arcane)

---

## Kubescape开源平台覆盖Kubernetes安全与合规扫描 {#news-15}

> **Kubescape**是一款开源Kubernetes安全平台，可用于IDE、CI/CD流水线和集群，提供风险分析、安全、合规性及配置错误扫描。

项目面向Kubernetes用户和管理员，旨在帮助其节省时间、精力和资源。

Kubescape可在IDE、CI/CD流水线和集群等场景中使用，覆盖多类安全与配置检查。

`kubescape/kubescape`是GitHub Trending上的Go语言项目。仓库页面显示其拥有11934颗Stars，今日新增26颗Stars。

[查看原文](https://github.com/kubescape/kubescape)

---

## Google介绍GKE代理会话停放方案，节点成本最高降40% {#news-16}

> Google介绍了面向AI agent会话的GKE资源管理方法。借助开源工具Agent Substrate和AX，空闲会话可停放至对象存储，同时保留会话状态。

AI agent会话在工作日大部分时间保持活动状态，但通常处于空闲状态。传统的“一会话一Pod”方式会降低集群资源利用效率。

在GKE上，Agent Substrate和AX可以将空闲会话停放到对象存储中，从而释放计算资源。

该方法旨在优化资源利用率，并使Kubernetes节点成本最高降低40%。文中未提供具体测试条件或适用范围。

[查看原文](https://developers.googleblog.com/agents-are-sessions-not-requests-size-gke-node-pools-for-ai-agent-sessions/)

---

## 开源阵营请愿要求恢复黄仁勋英伟达首席职位 {#news-17}

> 一项要求恢复 Jensen Huang 英伟达首席执行官职位的请愿书在社交媒体上传播，到周一已获得超过11.5万个签名。签名者包括 Elon Musk、英伟达部分研究人员及多家科技机构相关人士。

请愿书签名者还包括 Hugging Face、Andreessen Horowitz 和 Sequoia Capital 的相关人士。文章将开放源代码人工智能模型描述为可下载并独立运行的模型。

Jensen Huang 曾作为开放源代码人工智能倡导者，向政策制定者为这类模型进行辩护。

前 OpenAI 研究员 Will DePue 在 Huang 辞职当天发布在线研究结果，称中国人工智能公司获得英伟达先进 Blackwell 芯片的程度可能高于此前估计。

相关研究结果尚未经过独立分析确认，芯片如何进入中国也不清楚；文章称没有证据表明英伟达帮助中国公司获得这些芯片。

[查看原文](https://www.technologyreview.com/2026/11/16/1148624/the-open-source-movement-wants-jensen-huang-back/)

---

## 美国联邦调查局警告开源AI工具加速网络入侵 {#news-18}

> 美国联邦调查局警告，黑客正使用 **Artex** 等开源人工智能工具发起自主式网络攻击。部分相关攻击据称可在不到三小时内从锁定系统发展为实际入侵。

![美国联邦调查局警告开源AI工具加速网络入侵](https://techcrunch.com/wp-content/uploads/2026/02/china-hacker-computer-flag.jpg?resize=1200,675)

**Artex** 可连接 Anthropic、OpenAI 等公司的前沿大语言模型，也支持开源模型和非美国模型。

该工具通常会扫描受害者网络，利用薄弱防护、暴露或被盗密码取得立足点，并进一步访问数据库、邮箱等敏感信息。

美国联邦调查局称，Artex 曾被用于攻击韩国多家金融机构，导致至少6.8万人的个人数据被窃取。该机构还确认了微软此前关于 ConnectWise 遭入侵的发现。

相关攻击者据称获取了至少2250家 ConnectWise 客户的 Microsoft 365 云环境访问权限。Barracuda 也披露曾因第三方服务暴露凭据遭遇相关攻击；ConnectWise 未回应置评请求。

[查看原文](https://techcrunch.com/2026/11/16/fbi-says-artex-ai-open-source-hacking-tool-used-to-breach-networks-in-under-three-hours/)

---

## Google称全自动网络攻击已出现且可能迅速恶化 {#news-19}

> Google威胁情报小组首次发现，攻击者在完全没有人类参与的情况下寻找并利用安全漏洞。研究人员在一台暴露的服务器上发现了名为“exploit_agent”的人工智能框架。

“exploit_agent”能够自动比较软件在补丁前后的代码，以识别潜在漏洞。

该框架还能自动构建漏洞利用程序，并自行运行构建出的程序。

[查看原文](https://the-decoder.com/google-warns-that-fully-automated-cyberattacks-have-arrived-and-will-get-worse-fast/)

---

## Uber称数据泄露导致近十五万名司机信息被盗 {#news-20}

> **Uber** 通知近15万名司机，其个人信息和驾驶执照信息在技术供应商10月发生的数据泄露事件中被盗。通知涉及的信息总数为149346人。

![Uber称数据泄露导致近十五万名司机信息被盗](https://techcrunch.com/wp-content/uploads/2026/11/uber-breach-2288234319.jpg?resize=1200,820)

被盗信息包括司机姓名、地址、出生日期和驾驶执照号码。Uber称，黑客窃取供应商内部凭据，并利用这些凭据访问其数据。

涉事供应商为 **Fireworks AI**，该公司向开发者提供访问和使用开放人工智能模型的服务。由于使用的是 Fireworks 的内部凭据，Uber 的未经授权访问警报没有触发。

Fireworks称，事件与一个以经济利益为目的、试图出售大型语言模型访问令牌的网络犯罪团伙有关。截至原文所述时间，尚无团伙声称对此负责。

受影响司机的确切人数是否会增加尚不清楚，Uber也未说明具体受影响司机数量。

[查看原文](https://techcrunch.com/2026/11/16/uber-confirms-hackers-stole-thousands-of-drivers-license-information-in-data-breach/)

---

## 苹果将在 macOS 27.3 增加 Mac 权限控制 {#news-21}

> 苹果宣布调整 Mac 安全控制，以降低 AI 代理及相关应用申请完整磁盘访问带来的数据风险。相关权限、警告和透明度功能计划随 macOS 27.3 推出。

![苹果将在 macOS 27.3 增加 Mac 权限控制](https://techcrunch.com/wp-content/uploads/2024/11/CMC_8152.jpg?resize=1200,800)

苹果计划将 Device Control 和 Data Access 拆分为 System & App Protection Override 与 Accessibility 两项设置。

用户可从列表中选择申请权限的应用，并将应用设置为每次访问时重新请求权限。

苹果将提供更多可见性，说明应用获得完整权限后可访问或控制的数据范围。

当应用通过 System & App Protection Override 控制另一应用时，系统将显示新的透明度指示器。

这些变化不会阻止用户安装和运行高权限 AI 代理或其他应用，而是提供更细化的权限选项。

[查看原文](https://techcrunch.com/2026/11/16/apple-reveals-new-mac-security-controls-as-ai-agents-raise-privacy-risks/)

---

## 微软披露云网关缺陷等三因素引发全球宕机 {#news-22}

> 微软初步事后报告称，云网关潜在缺陷、流量变化和服务器容量减少共同导致 Microsoft 365 及 Exchange 大部分基础设施离线。微软表示，该事件与网络攻击或 AI、代理无关。

中断发生在11月12日16:20 UTC至11月13日16:10 UTC之间，持续时间略少于24小时。

微软称，一个自7月起潜伏于云网关中的隐藏缺陷，是此次大规模服务中断的原因之一。

微软表示，针对受影响系统的额外监控持续到11月14日，事件编号为 `EX1550543` 和 `MO1550821`。

该报告仍为初步事后报告，微软最终调查是否完成尚未明确。

[查看原文](https://arstechnica.com/gadgets/2026/11/microsoft-details-how-three-problems-combined-for-a-global-outage/)

---

## Zoox无人驾驶出租车接入Uber拉斯维加斯服务 {#news-23}

> 亚马逊旗下 **Zoox** 的专用双向自动驾驶出租车已在拉斯维加斯接入Uber。用户无需额外付费，但目前可能被匹配到Zoox车辆，不能直接指定。

![Zoox无人驾驶出租车接入Uber拉斯维加斯服务](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/MGM-x-Uber-x-Zoox.jpg?quality=90&strip=all&crop=0,0,100,100)

这是Uber首次将无方向盘的专用自动驾驶车辆加入其服务网络，也是Zoox首次向第三方应用开放车队。

用户订购UberX、Uber Comfort、Uber Electric、Uber Comfort Electric或Wait & Save时，可能匹配到Zoox车辆。

Zoox自动驾驶出租车由亚马逊拥有。

[查看原文](https://www.theverge.com/transportation/1032984/uber-zoox-robotaxi-las-vegas-launch-mgm-resorts-los-angeles)

---

## Zoox无人驾驶出租车正式出现在Uber拉斯维加斯应用中 {#news-24}

> **Zoox** 无人驾驶出租车已通过Uber应用在拉斯维加斯提供服务，这是其首次与第三方网约车平台合作。用户目前不能直接选择Zoox车辆，但可通过设置提高匹配机会。

![Zoox无人驾驶出租车正式出现在Uber拉斯维加斯应用中](https://techcrunch.com/wp-content/uploads/2026/11/zoox-uber.jpg?resize=1200,801)

用户请求UberX、Uber Comfort、Uber Electric、Uber Comfort Electric或Wait & Save行程时，可能被匹配到Zoox车辆。

用户可在Uber应用的“ride preferences”中选择自动驾驶行程，以提高匹配Zoox车辆的机会。

Uber与Zoox已宣布和MGM Resorts International建立多年合作关系，为其拉斯维加斯物业提供网约车和无人驾驶出租车服务。

Zoox计划今年在洛杉矶推出商业服务，并计划在2027年通过Uber应用提供乘车服务；这些安排仍属计划。

Uber表示，待车辆可用性和可靠性提高后，计划在应用中推出专门的自动驾驶选项。

[查看原文](https://techcrunch.com/2026/11/16/zoox-robotaxis-are-now-on-the-uber-app-in-las-vegas/)


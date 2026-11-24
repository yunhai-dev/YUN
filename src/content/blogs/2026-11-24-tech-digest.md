---
title: 科技早报 2026-11-24
category: "科技, 科技早报"
excerpt: 本期聚焦AI模型与代码代理升级、Grok安全诉讼、CrowdStrike收购Zscaler及英伟达高层变动。
lastEdited: 2026年11月24日
tags: [人工智能, AI代理, 网络安全, Anthropic, OpenAI, 英伟达, 脑机接口]
imageUrl: 
---

## 概览

### 要闻

- [美国航班大范围停飞被指与故障路由器有关](#news-1)
### AI 与机器学习

- [Anthropic让Claude自主审查并修复代码请求](#news-2)
- [**OpenAI**将`GPT-6.2 Sol`设为ChatGPT默认模型](#news-3)
- [Z.ai发布7500亿参数GLM-5.4并转向循环架构](#news-4)
- [Anthropic发布Claude Ship自动审查与审批代码变更](#news-5)
- [Walmart将让Meta Muse代理用户购买黑色星期五商品](#news-6)
- [OpenAI呼吁行业为AI进展建立共同限制](#news-7)
### 安全与隐私

- [CrowdStrike同意以439亿美元全股票收购Zscaler](#news-8)
- [俄勒冈与弗吉尼亚起诉SpaceX及X指控Grok安全失职](#news-9)
- [Google语义治理策略降低AI代理意图劫持风险](#news-10)
- [两州起诉SpaceX要求限制Grok生成有害影像](#news-11)
### 产品与平台

- [Kagi推出无广告邮件服务公开测试版](#news-12)
- [独立浏览器Ladybird开放macOS与Linux Alpha测试](#news-13)
- [Google Maps被指未有效呈现约旦河西岸通行限制](#news-14)
- [Nothing发布Ear Note耳塞，支持录音转录与AI摘要](#news-15)
### 硬件与芯片

- [华硕ProArt P16探索本地AI电脑新形态](#news-16)
- [Paradromics与英伟达合作推进便携式脑机接口](#news-17)
- [5G非地面网络架构与测试将支撑6G演进](#news-18)
- [AirPods Pro 3黑五前降价至149美元](#news-19)
### 科技行业动态

- [英伟达宣布黄仁勋复职出任首席执行官](#news-20)
- [Nvidia董事会宣布Jensen Huang回任CEO](#news-21)
- [Sierra获175亿美元融资六个月内估值翻倍](#news-22)
- [英伟达董事会恢复黄仁勋CEO及董事职务](#news-23)
### 前瞻与传闻

- [亚马逊据报75亿美元收购Decart大部分业务](#news-24)
---

## 美国航班大范围停飞被指与故障路由器有关 {#news-1}

> 美国联邦航空管理局曾于11月13日让全美所有出港航班停飞超过4小时。文章将这次全国性停飞与一个故障路由器联系起来，但相关细节并不完整。

![美国航班大范围停飞被指与故障路由器有关](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/FAA_dcd.jpg?quality=90&strip=all&crop=0,0,100,100)

事件发生在阿肯色州埃尔多拉多，该地位于大型数据和电信骨干网络的一端。

文章称，事件暴露出航空基础设施过时，以及管理失误层层叠加并影响数百万人的问题。

自由记者、航空专家Dar​​ryl Campbell参与相关讨论，他也是《Fatal Abstraction: Why the Managerial Class Loses Control of Software》作者。

事件曾引发关于人工智能和网络攻击的猜疑，但文章称实际原因更为普通；正文未提供后续影响链条和政府应对计划的完整细节。

[查看原文](https://www.theverge.com/podcast/1039215/faa-ground-stop-cause-trump-elon-musk-doge-airlines-safety)

---

## Anthropic让Claude自主审查并修复代码请求 {#news-2}

> Anthropic正在推出帮助软件工程师交付代码的新功能。作为 **Claude Ship** 的一部分，Claude现在可以审查、修复并批准拉取请求。

![Anthropic让Claude自主审查并修复代码请求](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/STKB364_CLAUDE_2_C_96d15c-1.jpg?quality=90&strip=all&crop=0,0,100,100)

**Claude** 的 `Code Review` 功能于3月宣布，并于10月正式提供。

`PR Steward` 和 `Claude Approvals` 两个代理将于今日以测试版发布。

`PR Steward` 可处理持续集成检查失败、合并冲突，以及来自代码审查工具或团队成员的反馈。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1040134/anthropic-claude-ship-ai-pull-requests)

---

## **OpenAI**将`GPT-6.2 Sol`设为ChatGPT默认模型 {#news-3}

> **OpenAI**已将`GPT-6.2 Sol`设为ChatGPT聊天标签页的新默认模型，并在全球范围内推出。内部测试显示，该模型的图像理解和困难指令处理表现有所提升。

![**OpenAI**将`GPT-6.2 Sol`设为ChatGPT默认模型](https://the-decoder.com/wp-content/uploads/2026/11/openai_chatgpt_pattern.png)

内部测试中，`GPT-6.2 Sol`的图像理解得分从47.4%提升至71.7%。

测试还显示，该模型正确处理困难指令的比例为78.1%，并被称为更一致地遵守安全政策。

上述性能数据来自内部测试，文中未说明具体测试方法，也未提供外部验证情况。

[查看原文](https://the-decoder.com/openai-updates-chatgpt-to-handle-complex-everyday-questions-web-searches-and-images-more-reliably/)

---

## Z.ai发布7500亿参数GLM-5.4并转向循环架构 {#news-4}

> **Z.ai**正将旗舰模型`GLM-5.4`转向循环架构，让28层网络运行两次。公司称，该模型可匹配拥有2万亿至3万亿参数的模型，但现有基准成绩仅来自300亿参数测试模型。

![Z.ai发布7500亿参数GLM-5.4并转向循环架构](https://the-decoder.com/wp-content/uploads/2026/06/zhipu-ai-logo-wall-nano-banana-pro.jpg)

Z.ai称，`GLM-5.4`拥有7500亿参数，并可匹配参数规模为2万亿至3万亿的模型。

不过，目前公布的基准测试成绩仅适用于规模较小的300亿参数测试模型。

Z.ai将`GLM-5.4`定位为“Generalized Coding”的起点，主张代码还可用于生成视频、游戏和CAD模型。

关于模型能力的比较来自Z.ai，相关结论仍需结合完整旗舰模型的基准结果评估。

[查看原文](https://the-decoder.com/z-ai-follows-openai-into-loop-transformer-territory-with-its-new-750b-flagship-model/)

---

## Anthropic发布Claude Ship自动审查与审批代码变更 {#news-5}

> Anthropic发布Claude Ship，用于自动化代码审查、修复和批准常规代码变更。该工具目前以测试版面向Claude Team和Enterprise计划开放。

![Anthropic发布Claude Ship自动审查与审批代码变更](https://techcrunch.com/wp-content/uploads/2026/10/GettyImages-2295579000.jpg?resize=1200,800)

Claude Ship可以审查拟议的代码变更、识别并处理问题，并依据开发团队设定的政策自动批准变更。

该工具包含已正式发布的`Code Review`，以及处于测试阶段的`PR Steward`和`Claude Approvals`两个代理。

`PR Steward`负责处理失败的持续集成检查、合并冲突和审查反馈，并在每次推送后说明修改内容及回滚方式。

`Claude Approvals`根据代码仓库中的审批政策执行审批。该政策可使用自然语言，并纳入审查结果或企业自有分类器等信号。

[查看原文](https://techcrunch.com/2026/11/23/anthropic-launches-claude-ship-letting-ai-agents-review-fix-and-approve-code-changes/)

---

## Walmart将让Meta Muse代理用户购买黑色星期五商品 {#news-6}

> **Walmart**计划允许**Meta Muse**代表用户寻找并购买黑色星期五优惠商品。Walmart表示，其Agent Gateway可让AI代理寻找相关产品，无需分享用户购买历史。

![Walmart将让Meta Muse代理用户购买黑色星期五商品](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/Walmart-Meta-Muse-Agent-Gateway.jpg?quality=90&strip=all&crop=0,0,100,100)

Walmart计划于11月24日推出Agent Gateway的实际应用，相关时间为报道发布后的次日。

用户可通过Walmart账户中的“Agent Profiles”让Muse进行购买。

“Agent Profiles”支持设置消费限额、批准购买，并查看相关购买历史。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1039874/walmart-agent-gateway-meta-muse-black-friday)

---

## OpenAI呼吁行业为AI进展建立共同限制 {#news-7}

> OpenAI首席科学家Jakub Pachocki公布整个GPT系列的内部困惑度分数，并呼吁行业在控制能力减弱前建立共同限制。

![OpenAI呼吁行业为AI进展建立共同限制](https://the-decoder.com/wp-content/uploads/2026/10/openai_safety.png)

Pachocki首次公布了整个GPT系列的内部困惑度（perplexity）分数，数据还覆盖一个尚未发布的模型。

该模型据称能力超过当前一代，相关能力和分数目前无法通过公开产品验证。

文章称，困惑度指标显示，核心能力会在较为精确的阈值上出现，Pachocki正推动将其作为行业进展衡量指标。

Pachocki还主张，在行业对人工智能行为的控制能力减弱之前，建立共同限制。

[查看原文](https://the-decoder.com/openai-warns-that-upcoming-ai-systems-could-outpace-safety-checks-and-urges-rivals-to-agree-on-shared-limits/)

---

## CrowdStrike同意以439亿美元全股票收购Zscaler {#news-8}

> **CrowdStrike**已同意以439亿美元的全股票交易收购**Zscaler**。两家公司称，交易将创造网络安全领域“最大的单一可寻址市场”。

![CrowdStrike同意以439亿美元全股票收购Zscaler](https://techcrunch.com/wp-content/uploads/2026/11/crowdstrike-2162041873.jpg?resize=1200,800)

总部位于美国圣何塞的Zscaler为约8,000家企业提供云网络安全产品，并提供零信任技术。

该技术要求员工每次访问内部系统或资源时进行身份验证。CrowdStrike将把端点保护软件与Zscaler零信任平台结合。

两家公司表示，合并将帮助客户更安全地采用人工智能，并更好地防御数据泄露。

交易仍须获得监管批准，预计约在2027年11月前后完成。

[查看原文](https://techcrunch.com/2026/11/23/crowdstrike-to-acquire-zscaler-for-44-billion/)

---

## 俄勒冈与弗吉尼亚起诉SpaceX及X指控Grok安全失职 {#news-9}

> 俄勒冈州和弗吉尼亚州总检察长分别起诉**SpaceX**及**X Corp.**，指控其违反消费者保护法。诉讼涉及**Grok**生成性人工智能工具的安全性及相关有害内容传播问题。

![俄勒冈与弗吉尼亚起诉SpaceX及X指控Grok安全失职](https://media.wired.com/photos/6b00c213fb286bb31d23bec0/191:100/w_1280,c_limit/Security_Virginia%20and%20Oregon%20Sue%20Grok%20Over%20Nonconsensual%20Intimate%20Imagery_v1.jpg)

诉状称，相关公司在生成式人工智能工具的安全性，以及阻止儿童性虐待材料（CSAM）和未经同意的私密影像（NCII）传播方面误导用户。

文章称，用户曾批量提示**Grok**生成女性和未成年人的性化照片，相关网站随后还出现展示女性名人从事性活动的人工智能生成视频。

两州指称，Grok发布新模型前未接受足够的第三方评估，并采用较弱的安全防护措施。诉状还称，xAI向CyberTipline提交的数万份报告中，约90%因缺少关键信息而无法采取行动。

**SpaceX**于2026年2月收购xAI后获得**Grok**及**X Corp.**所有权。上述内容均来自两州诉状，文章未说明法院是否已作出最终裁决。

[查看原文](https://www.wired.com/story/states-sue-spacex-over-grok-deepfakes/)

---

## Google语义治理策略降低AI代理意图劫持风险 {#news-10}

> Google介绍语义治理策略，通过在工具调用执行前验证用户意图与自然语言约束，防范AI代理遭遇间接提示注入和意图劫持。

该机制会在每次拟议的工具调用执行前，检查其是否符合用户意图和自然语言约束。

在使用`Gemini 2.5 Flash`代理的AgentDojo基准测试中，攻击成功率从48.7%降至0.9%。

Google称，该机制在降低攻击成功率的同时，仍保持较高的任务效用。

开发者目前可通过Gemini平台中的Agent Gateway，以预览版使用这些语义治理策略。

[查看原文](https://developers.googleblog.com/did-the-user-ask-for-this-securing-ai-agents-against-intent-hijacking-with-semantic-governance-policies/)

---

## 两州起诉SpaceX要求限制Grok生成有害影像 {#news-11}

> 弗吉尼亚州和俄勒冈州起诉**SpaceX**，指控Grok持续将真实照片进行未经控制的性化处理。州检察长称，相关系统仍可能生成未经同意的私密影像和儿童性虐待材料。

两州于周一成为首批起诉SpaceX的州。诉讼指控对象主要涉及女性和儿童的真实照片。

SpaceX于2月收购xAI后，需要应对Grok“spicy mode”引发的争议。该功能此前被发现会生成大量NCII和CSAM。

早期安全措施较为宽松，Grok有时会在用户未提出要求的情况下生成裸体图像。相关公司后来道歉，并表示已增加安全措施、重新设计政策。

州检察长称相关说法具有误导性，并指控Grok仍在生成NCII和CSAM。上述内容属于诉讼指控，原文未说明案件已获法院裁决。

[查看原文](https://arstechnica.com/tech-policy/2026/11/states-sue-spacex-to-stop-grok-from-generating-child-sex-images-revenge-porn/)

---

## Kagi推出无广告邮件服务公开测试版 {#news-12}

> 搜索服务商 **Kagi** 宣布推出 Kagi Mail 公开测试版，并将其定位为 **Gmail** 的替代服务。该服务主打无监控、无广告和开放标准。

![Kagi推出无广告邮件服务公开测试版](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/mail-inbox-overview.RlzZ8Gtt.png?quality=90&strip=all&crop=0,0,100,100)

Kagi Mail 为用户提供 `@kagimail.com` 地址，并支持不限数量的别名和域名。

服务提供 50GB 存储空间和内置日历，宣传称不会锁定用户。

**Kagi** 目前还提供付费搜索服务和 **Orion** 浏览器。

公司计划在 2027 年第一季度推出联系人和地址簿功能，原生移动应用预计不会在 2027 年第三季度前推出；相关时间表仍属计划。

[查看原文](https://www.theverge.com/tech/1041000/kagi-mail-email-google-gmail-alternative)

---

## 独立浏览器Ladybird开放macOS与Linux Alpha测试 {#news-13}

> 采用全新浏览器引擎构建的独立浏览器Ladybird，已在macOS和Linux上以alpha版本开放测试。

![独立浏览器Ladybird开放macOS与Linux Alpha测试](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/ladybird-screenshot.webp?quality=90&strip=all&crop=0,0,100,100)

开发者Andreas Kling表示，Ladybird经过四年多开发后发布alpha版本。文章称，这是多年来首个采用全新浏览器引擎的浏览器。

目前最受欢迎的浏览器主要使用Gecko、Blink和WebKit三种引擎，Ladybird则采用从头构建的浏览器引擎。

Ladybird的Windows版本计划在项目后期推出，但文章未提供具体发布时间。

[查看原文](https://www.theverge.com/tech/1040872/ladybird-indie-browser-engine-alpha-testing)

---

## Google Maps被指未有效呈现约旦河西岸通行限制 {#news-14}

> 约旦河西岸部分道路上的检查站、路障和士兵等现实通行情况，没有显示在**Google Maps**上。多名现任和前任Google员工表示，公司最终放弃了改善相关服务的努力。

![Google Maps被指未有效呈现约旦河西岸通行限制](https://media.wired.com/photos/6afcd9e7dd75ebb0e0f145e2/191:100/w_1280,c_limit/business_west_bank_google_maps.jpg)

报道援引资料称，巴勒斯坦司机需要应对包括检查站在内的900多个通行障碍。

前Google产品经理Rubén Lozano自2019年起推动改善Google Maps对约旦河西岸道路限制的呈现。

巴勒斯坦用户也使用包括Road Conditions Telegram频道在内的临时导航方案，以获取出行信息。

[查看原文](https://www.wired.com/story/inside-googles-failure-to-make-google-maps-work-for-palestinians/)

---

## Nothing发布Ear Note耳塞，支持录音转录与AI摘要 {#news-15}

> **Nothing**推出Ear Note耳塞系统，可录音并转录对话，配套应用还能生成AI摘要。该产品计划于12月8日发布，但价格尚未确定。

![Nothing发布Ear Note耳塞，支持录音转录与AI摘要](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/nothing.jpg?quality=90&strip=all&crop=0,0,100,100)

Ear Note由一套耳塞和带麦克风的配套充电盒组成，支持录音与对话转录。

配套应用可管理录音、转录文本和AI生成的摘要。

Nothing首席执行官Carl Pei曾向彭博社演示Ear Note。

据报道，Nothing的AI智能手表和智能眼镜计划已推迟，但相关安排仍存在不确定性。

[查看原文](https://www.theverge.com/gadgets/1040357/nothing-ear-note-earbuds-ai-recording)

---

## 华硕ProArt P16探索本地AI电脑新形态 {#news-16}

> 华硕在最新 ProArt 产品线中采用英伟达 RTX Spark 芯片，ProArt P16 最高提供 128GB 内存。文章称，这款电脑可用于运行本地人工智能模型，并兼顾游戏与生产力用途。

文章称，ProArt P16 没有传统意义上的 GPU，但仍可作为主要的游戏和生产力电脑使用。

英伟达将 RTX Spark 定位为可同时用于人工智能、生产力和游戏的一体化设备。

顶配 ProArt P16 售价为 7000 美元，相关价格和配置针对文章评测产品。

文章指出，在 Windows 上运行本地人工智能虽然更容易接近，但仍需要大量试错。

[查看原文](https://arstechnica.com/reviews/2026/11/review-the-asus-proart-p16-offers-a-glimpse-of-a-future-powered-by-local-ai/)

---

## Paradromics与英伟达合作推进便携式脑机接口 {#news-17}

> 脑机接口公司 **Paradromics** 宣布与 **Nvidia** 合作，使用其硬件和软件处理脑部数据，并计划缩小语音解码设备的体积。

![Paradromics与英伟达合作推进便携式脑机接口](https://media.wired.com/photos/6b00bf3096143f394c42fff6/191:100/w_1280,c_limit/Nvidia-Powering%20Brain-Computer-Interfaces-mary-connexus-control-unit-Science.jpg)

**Paradromics** 的脑植入物使用超过400个嵌入式电极捕捉神经信号，再由计算机利用人工智能推断用户想表达的内容。

文章描述的案例中，患运动神经元疾病、难以说话的 Mary 可通过植入物和电脑合成语音表达想法。

公司计划使用 **Nvidia Jetson** 低功耗计算模块，在靠近用户的小型设备中完成语音解码，并使用 `Holoscan` 人工智能传感器软件降低交互延迟。

目前设备需要一整车电子设备、连接电源插座，并要求用户处于设备范围内。Paradromics 计划约一年后将设备缩小至轮椅可放置的盒子，最终缩小到手机大小。

[查看原文](https://www.wired.com/story/nvidia-is-powering-brain-computer-interfaces-now/)

---

## 5G非地面网络架构与测试将支撑6G演进 {#news-18}

> 从 3GPP Release 15 到 Release 19 的标准为 NR-NTN 奠定基础。该技术可将 5G 覆盖扩展至海洋、农村地区和灾害区域。

![5G非地面网络架构与测试将支撑6G演进](https://spectrum.ieee.org/media-library/rohde-schwarz-logo-with-slogan-make-ideas-real-and-stylized-rs-emblem-in-a-diamond.png?id=68750286&width=980)

透明型与再生型卫星载荷架构在往返时延、链路预算和硬件复杂度方面存在差异。

长距离、高速移动卫星和多普勒频移会给同步、定时提前量及 HARQ 运行带来物理层挑战。

NTN 移动性机制包括小区选择、条件切换、馈电链路切换，以及地面网络与非地面网络之间的移动。

设备、卫星和网络可通过射频、协议及空中测试，在真实衰落和传播条件下进行验证。

NTN 将向 6G 统一网络演进，并结合多频段、网络层级与维度，引入感知、定位和人工智能。

[查看原文](https://content.knowledgehub.wiley.com/5g-ntn-takes-flight-a-deep-dive-into-nr-ntn-technology-and-testing-aspects/)

---

## AirPods Pro 3黑五前降价至149美元 {#news-19}

> **AirPods Pro 3**在Amazon和Walmart的售价降至149美元，较249美元原价低40%。Best Buy当前售价为169美元。

![AirPods Pro 3黑五前降价至149美元](https://platform.theverge.com/wp-content/uploads/sites/2/2025/09/257943_Airpods_Pro3_AKrales_0108.jpg?quality=90&strip=all&crop=0,0,100,100)

AirPods Pro 3配有五种硅胶耳塞，并支持IP57防水等级。

相比第二代产品，该耳机单次充电续航从6小时提升至8小时，降噪功能也有所改进。

耳机支持通过内置传感器感知心率，充电盒搭载Apple第二代超宽带芯片。

文章称，AirPods Pro 3是Apple声音表现最好、续航时间最长的AirPods。

[查看原文](https://www.theverge.com/gadgets/1039978/airpods-pro-3-apple-earbuds-black-friday-2026-deal-sale)

---

## 英伟达宣布黄仁勋复职出任首席执行官 {#news-20}

> 英伟达董事会宣布，黄仁勋立即恢复担任公司首席执行官。此次复职距离他辞职仅11天。

![英伟达宣布黄仁勋复职出任首席执行官](https://media.wired.com/photos/6b04495d307e146147156b9d/191:100/w_1280,c_limit/GettyImages-2266718431.jpg)

黄仁勋于11月12日辞去英伟达首席执行官职务，长期担任首席财务官的科莱特·克雷斯随后出任临时首席执行官。

英伟达董事会主席哈维·琼斯表示，董事会认为黄仁勋是领导公司的合适人选，复职符合股东、员工、合作伙伴和客户的最佳利益。

董事会称，已对黄仁勋的坦诚程度和领导能力感到满意，并在决定前获得了美国政府高层的意见。

此前董事会曾表示无意让黄仁勋复任。美国总统唐纳德·特朗普则称，董事会让黄仁勋回任是正确且恰当的决定。

[查看原文](https://www.wired.com/story/jensen-huang-is-back-as-nvidia-ceo/)

---

## Nvidia董事会宣布Jensen Huang回任CEO {#news-21}

> Nvidia董事会于11月23日宣布，Jensen Huang将回任公司CEO，并称该决定获得了美国政府高级层级的意见。

![Nvidia董事会宣布Jensen Huang回任CEO](https://platform.theverge.com/wp-content/uploads/sites/2/2026/07/STKP210_JENSEN_HUANG_A.jpg?quality=90&strip=all&crop=0,0,100,100)

Jensen Huang是Nvidia的CEO、总裁和联合创始人。此前，他承认曾与Megaspeed高管Alice Huang发生婚外情。

Nvidia最初宣布展开调查。《纽约时报》报道称，另有证据显示Huang曾与一名直接向他汇报的Nvidia高管发生婚外情。

随后，Nvidia董事会接受了Huang的辞职，并任命CFO Colette Kress为临时CEO。有关另一段婚外情的报道细节未在文章中披露。

文章称，Nvidia已成为Trump政府人工智能政策的重要组成部分，并参与有关中国获取先进人工智能硬件的谈判；其市值已超过4万亿美元。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1030422/nvidia-jensen-huang-ai-china-alice-huang)

---

## Sierra获175亿美元融资六个月内估值翻倍 {#news-22}

> 企业客户体验公司**Sierra**宣布完成17.5亿美元F轮融资，估值在六个月内从150亿美元升至300亿美元。

![Sierra获175亿美元融资六个月内估值翻倍](https://techcrunch.com/wp-content/uploads/2022/10/AP22166762816752.jpg?w=1200)

本轮融资由Greenoaks和Lightspeed Venture Partners领投，多家现有投资者参与。

Sierra表示，公司目前服务于近50%的《财富》杂志美国50强企业，客户包括BNY、HSBC和Wells Fargo等。

公司称，其结果导向定价模式推动经常性收入在五个月内翻倍至4亿美元。

Sierra计划用新资金建设技术栈、部署服务代理并扩大销售团队。上述数据主要来自公司公开表述，文章未提供独立核验信息。

[查看原文](https://techcrunch.com/2026/11/23/sierra-doubles-valuation-to-30b-within-six-months-as-demand-for-ai-in-cx-takes-off/)

---

## 英伟达董事会恢复黄仁勋CEO及董事职务 {#news-23}

> **英伟达**董事会投票决定恢复Jensen Huang的CEO和董事职务，任命在其辞职约一周后立即生效。

董事会表示，此次决定部分基于美国政府高级层级官员提供的意见。相关官员称，恢复Huang职务不会构成国家安全风险。

Huang此前承认与一名女性存在婚外情。美国情报来源认为，该女性可能是一名间谍。

多个政府部门正在调查这段关系是否帮助规避阻止英伟达芯片流向中国的出口管制。有关说法仍涉及情报来源判断和正在进行的调查。

[查看原文](https://arstechnica.com/ai/2026/11/jensen-huang-reinstated-as-nvidia-ceo-board-chair/)

---

## 亚马逊据报75亿美元收购Decart大部分业务 {#news-24}

> 亚马逊已同意收购以色列初创公司**Decart**的大部分业务，彭博社称交易金额为75亿美元。亚马逊将获得其优化技术及创始团队、人工智能研究人员和工程师团队。

![亚马逊据报75亿美元收购Decart大部分业务](https://techcrunch.com/wp-content/uploads/2024/12/Decart-Founders-Dean-Leitersdorf-CEO-and-Moshe-Shalev-CPO.jpg?resize=1200,800)

交易将包括 `Decart Optimization Stack`（DOS）背后的技术。Decart此前开发了交互式实时世界模型和人工智能视频生成工具。

DOS旨在帮助人工智能模型更高效地运行于英伟达、亚马逊和谷歌的硬件上。

亚马逊目前在自有数据中心使用 `Trainium` 芯片，并准备向客户销售这些芯片，以与英伟达竞争。

亚马逊表示，Decart技术可能帮助客户在其芯片而非英伟达芯片上运行工作负载。75亿美元金额来自彭博社报道，双方当时未立即回应置评请求。

[查看原文](https://techcrunch.com/2026/11/23/amazon-snaps-up-decarts-ai-optimization-tech-for-7-5b-as-it-prepares-to-sell-trainium-chips/)


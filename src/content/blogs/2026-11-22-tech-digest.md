---
title: 科技早报 2026-11-22
category: "科技, 科技早报"
excerpt: AI代理治理与安全、开放模型进展、科技股波动及多起疑似网络攻击成为焦点。
lastEdited: 2026年11月22日
tags: [AI代理, 开放模型, 网络安全, Anthropic, 英伟达, 科技股, Google Cloud]
imageUrl: 
---

## 概览

### 要闻

- [联合国未能就杀手机器人监管规则达成一致](#news-1)
### AI 与机器学习

- [英伟达研究人员质疑超大AI上下文窗口](#news-2)
- [OpenAI为GPT-6.2系列发布新提示词模板](#news-3)
- [开放模型 Inkling 2 Mini 通过循环推理降低运行成本](#news-4)
- [字节跳动推出三阶段训练的开放代理模型 Axion 1.0](#news-5)
- [Google Cloud推出跨云代理异常检测功能](#news-6)
- [短信AI代理兴起，可直接安排日程与预订](#news-7)
### 安全与隐私

- [Together AI披露部分提示词遭未授权下载](#news-8)
- [Signal将在移动应用中限制屏幕截图功能](#news-9)
- [多项技术中断接连发生，AI加剧系统修补压力](#news-10)
- [Google推出AI代理工具调用前的语义治理策略](#news-11)
### 产品与平台

- [Google发布Cloud Run内部MCP服务器安全连接方案](#news-12)
- [评测称小米18 Pro后置屏自拍外实用性有限](#news-13)
- [Soundcore Liberty 5 Pro耳机降至历史最低价](#news-14)
- [GitHub发帖邀请用户测试知识并公布真实得分](#news-15)
### 硬件与芯片

- [Harbinger获2.4亿美元融资押注商用电动卡车](#news-16)
### 科技行业动态

- [Anthropic上市后面临AI安全与盈利张力](#news-17)
- [AI疑虑叠加，美科技股创疫情以来最差周表现](#news-18)
- [Tasklet在旧金山招聘五类产品与代理基础设施人才](#news-19)
- [硅谷部分AI末日论者转向宗教式团体实践](#news-20)
### 前瞻与传闻

- [FBI调查国家犯罪信息中心疑似遭入侵](#news-21)
- [美国农业部与联邦调查局据报遭黑客攻击](#news-22)
- [特朗普称联邦调查局数据库据报遭攻击不是好事](#news-23)
---

## 联合国未能就杀手机器人监管规则达成一致 {#news-1}

> 联合国外交官本周在日内瓦讨论自主武器监管规则，但经过一周谈判，各国代表未取得实质成果。代表最终同意“开始讨论选项”。

![联合国未能就杀手机器人监管规则达成一致](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/13611631/503831564.jpg.jpg?quality=90&strip=all&crop=0,0,100,100)

自主武器也被称为“杀手机器人”（killer robots）。会议议程之一是制定有关其使用的规则。

国际红十字委员会表示，必须在一年内起草具有法律约束力的规则。

这一呼吁获得联合国秘书长和教皇利奥的支持。

相关正文在“各国将改为……”处截断，妥协方案的完整内容尚未呈现。

[查看原文](https://www.theverge.com/tech/1039554/un-regulations-killer-robots)

---

## 英伟达研究人员质疑超大AI上下文窗口 {#news-2}

> 英伟达研究人员认为，语言模型通常无需使用完整的超大上下文窗口。测试显示，定期摘要与针对性关键词搜索通常可取得相当结果，同时降低成本。

![英伟达研究人员质疑超大AI上下文窗口](https://the-decoder.com/wp-content/uploads/2026/11/you-dont-need-long-context-nano-banana-pro.jpg)

研究人员指出，超大上下文窗口速度较慢、成本较高，并且更容易产生错误。

测试显示，定期生成摘要和有针对性的关键词搜索，通常能达到使用完整上下文相当的效果。

摘要和关键词搜索的测试成本仅为完整上下文的一小部分，但原文未称其在所有情况下都能替代完整上下文。

研究团队还提出了一类使用短笔记而非长上下文的新模型。

[查看原文](https://the-decoder.com/nvidia-researchers-argue-huge-ai-context-windows-are-a-dead-end/)

---

## OpenAI为GPT-6.2系列发布新提示词模板 {#news-3}

> **OpenAI** 发布适用于 `GPT-6.2 Astra` 和 `Sol` 的新提示词模板，旨在改善回答过于简短、提出不必要后续问题等行为。模板还面向编程场景中过度测试的问题。

![OpenAI为GPT-6.2系列发布新提示词模板](https://the-decoder.com/wp-content/uploads/2026/06/openai_logo_chatgpt-2.png)

新模板用于调整模型的回答方式，减少部分常见行为。

OpenAI 的 API 也在发生变化，编辑对话历史可能会丢弃推理内容。

文章称，编辑对话历史还可能降低模型响应质量。

[查看原文](https://the-decoder.com/openai-shares-new-prompting-tips-for-gpt-6-2-astra-and-sol-to-fix-brief-answers-and-unnecessary-questions/)

---

## 开放模型 Inkling 2 Mini 通过循环推理降低运行成本 {#news-4}

> **Thinking Machines** 发布开放循环式 Transformer 模型 `Inkling 2 Mini`。该模型通过循环运行部分层，在不生成额外文本的情况下进行更长时间的内部推理。

![开放模型 Inkling 2 Mini 通过循环推理降低运行成本](https://the-decoder.com/wp-content/uploads/2025/09/thinking_machines_ca_illustration.png)

`Inkling 2 Mini` 的24层中有12层会针对每个词元运行三次。

在 Artificial Analysis 的 Intelligence Index 上，该模型表现与 `Qwen3.8 27B` 持平，成本约低六倍。

[查看原文](https://the-decoder.com/new-open-model-inkling-2-mini-thinks-in-loops-to-solve-problems-with-fewer-words-and-still-runs-on-a-laptop/)

---

## 字节跳动推出三阶段训练的开放代理模型 Axion 1.0 {#news-5}

> **字节跳动**与多所美国大学推出人工智能代理 `Axion 1.0`。该模型仅经过三个训练阶段，便在基准测试中达到可与 OpenAI 和 Anthropic 顶级商业模型竞争的表现。

![字节跳动推出三阶段训练的开放代理模型 Axion 1.0](https://the-decoder.com/wp-content/uploads/2026/11/bytedance-axio-training-pipeline-nano-banana-pro.jpg)

研究人员将模型性能提升归因于精心筛选训练数据，而非不断增加训练步骤。

`Axion 1.0` 的模型、数据和代码均可免费获取。

[查看原文](https://the-decoder.com/bytedance-argues-most-ai-training-phases-are-unnecessary-and-backs-it-up-with-a-competitive-open-model/)

---

## Google Cloud推出跨云代理异常检测功能 {#news-6}

> **Agent Anomaly Detection**现可监控运行在AWS、Azure或本地环境中的ADK代理。该功能通过分析代理追踪记录和日志，评估完整对话中的行为偏移。

该功能将监控数据保存在用户的Google Cloud项目中，并通过`Telemetry API`接收OpenTelemetry格式的数据。

它无需访问代理底层运行时，即可帮助安全团队检测异常行为、工具误用和资源耗尽等风险。

[查看原文](https://developers.googleblog.com/agent-anomaly-detection-safeguarding-agents-across-other-clouds/)

---

## 短信AI代理兴起，可直接安排日程与预订 {#news-7}

> 越来越多的 AI 代理开始通过短信提供服务，用户无需下载额外应用即可安排预约、管理日历、规划旅行或完成预订。

![短信AI代理兴起，可直接安排日程与预订](https://techcrunch.com/wp-content/uploads/2017/12/gettyimages-673436934.jpg?resize=1200,813)

这类代理可以记忆上下文、连接已有应用和服务，并执行发送邮件、网购和设置提醒等任务。

**Ask Proxy** 可通过短信提供礼物建议、活动规划和日常决策帮助，也能添加日历事项、设置提醒并接收照片。

Ask Proxy 个人版收费为每天1美元；企业版大型公司起价为每名员工每月15美元，小型团队起价为每名员工每月23美元。

**Caddy** 运行于 iPhone 的 iMessage 和安卓设备的 RCS，可连接日历和对话，添加日程、设置提醒、跟进事项并开展研究；其公开测试版自2026年4月起提供。

**Instinct** 在最新一轮融资中获得10亿美元，估值达到100亿美元。

[查看原文](https://techcrunch.com/2026/11/21/all-the-ai-agents-that-can-live-in-your-text-messages/)

---

## Together AI披露部分提示词遭未授权下载 {#news-8}

> **Together AI** 通知客户，2026年6月和7月提交的部分提示词涉及一起安全事件。未经授权的一方曾下载相关提示词样本，受影响内容仍在审查中。

![Together AI披露部分提示词遭未授权下载](https://cdn.prod.website-files.com/69654e88dce9154b5f12070c/6b022ac06b3b148585570c47_OG-image_20261121-security-event-prompt-leakage2.png)

事件源于私有 **Hugging Face** 仓库凭据暴露于公共代码仓库。相关凭据在开发 **Together AI** 公共 GitHub 仓库 xorl 时被提交到代码中。

未经授权的一方使用该凭据下载提示词样本，并搜索其中其他服务的凭据及测试其有效性。样本来自 `MiniMax M3`、`GLM-5.2` 和 `Kimi K2.6` 请求。

相关请求主要发生在2026年6月24日、7月4日、7月8日和7月14日。Together AI称，目前未发现超出此次事件范围的其他提示词泄露证据。

Together AI仍在审查受影响提示词，以确定是否包含敏感个人信息或其他客户数据，并将根据调查结果直接联系受影响客户。

公司称已加强凭据和客户数据控制，包括采用范围受限或短期凭据、检查拉取请求中的凭据，并将零数据保留设为新账户默认选项。

[查看原文](https://www.together.ai/blog/security-event-prompt-leakage-for-requests-in-june-and-july-of-2026)

---

## Signal将在移动应用中限制屏幕截图功能 {#news-9}

> **Signal**宣布将在 Android 和 iOS 应用中限制用户截取屏幕，以应对具备代理式 AI 的操作系统可能扫描应用界面的风险。

![Signal将在移动应用中限制屏幕截图功能](https://techcrunch.com/wp-content/uploads/2026/05/signal-app-icon-phone.jpg?resize=1200,800)

该限制类似 Windows 应用默认屏蔽截图的做法，用户仍可在 Android 和 iOS 设置中自行关闭。

Signal 总裁 Meredith Whittaker 表示，关闭限制可能破坏 Signal 对隐私的保障。

她同时承认，截图限制只能缓解部分风险，无法解决 AI 代理通过其他隐蔽方式访问应用数据的问题。

[查看原文](https://techcrunch.com/2026/11/21/signal-restricts-mobile-screenshots-as-it-confronts-existential-threat-of-ai-surveillance/)

---

## 多项技术中断接连发生，AI加剧系统修补压力 {#news-10}

> 过去一周，Outlook、苹果系统、数家美国银行、联合航空及美国国家安全局机密网络相继发生技术中断。文章称，目前没有证据表明这些事件由网络攻击造成。

![多项技术中断接连发生，AI加剧系统修补压力](https://media.wired.com/photos/6b00ba06fb286bb31d23be2b/191:100/w_1280,c_limit/Kernel-Panic-Brace-for-More-Outages-Security.jpg)

文章称，这些中断单独来看都有较为常规的解释，包括错误更新、网络故障和内部更新。

微软 365 的大规模中断由基础设施中的错误更新及其他网络故障共同加剧。

美国国家安全局内部通信系统的中断，据官员称与处理 10 月关键 PHP 更新后的错误补丁操作有关。

文章称，AI 辅助漏洞发现和攻击者使用 AI 工具，正在加大组织及时修补系统的压力。

[查看原文](https://www.wired.com/story/brace-yourself-for-years-of-outage-chaos/)

---

## Google推出AI代理工具调用前的语义治理策略 {#news-11}

> Google介绍了 Semantic governance policies，可在 AI 代理执行工具调用前，对每项拟议操作进行内联评估。

该策略引擎通过 Agent Gateway 运行，并依据用户意图和自然语言规则检查每项操作。

相关策略旨在防止未经授权的数据共享和提示注入攻击。

开发者可以为 AI 代理附加自然语言约束，并通过 Cloud Logging 监控可审计的判定结果。

[查看原文](https://developers.googleblog.com/check-what-your-ai-agents-do-before-they-do-it-with-semantic-governance-policies/)

---

## Google发布Cloud Run内部MCP服务器安全连接方案 {#news-12}

> Google介绍了一套将**Gemini Enterprise**私密连接到Cloud Run内部StreamableHTTP MCP服务器的方案。该方案结合网关、私有连接和OAuth 2.0身份验证。

方案使用Egress Agent Gateway、Private Service Connect，以及按FQDN限定范围的Private Cloud DNS。

身份验证采用双请求头OAuth 2.0方式，用于连接Gemini Enterprise与内部MCP服务器。

[查看原文](https://developers.googleblog.com/how-to-securely-connect-internal-cloud-run-mcp-servers-to-gemini-enterprise/)

---

## 评测称小米18 Pro后置屏自拍外实用性有限 {#news-13}

> **小米** 18 Pro 和 18 Pro Max 均配备后置显示屏，可用于自拍、查看通知和运行 AI 应用。评测者体验一到两周后认为，该屏幕最明显的用途是辅助自拍，其他实用性有限。

![评测称小米18 Pro后置屏自拍外实用性有限](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/xiaomi-18-pro-max-11.jpg?quality=90&strip=all&crop=0,0,100,100)

小米上一代 17 Pro 系列也曾引入第二块屏幕，但没有在中国以外地区发售。

评测者表示，后置显示屏能够帮助用户使用主摄像头进行自拍。

关于后置屏幕实用性的结论来自一到两周的使用体验，不代表所有用户的感受。

[查看原文](https://www.theverge.com/tech/1038562/xiaomi-18-pro-max-review)

---

## Soundcore Liberty 5 Pro耳机降至历史最低价 {#news-14}

> **Soundcore Liberty 5 Pro**目前在 Amazon、Best Buy 和 Walmart 售价为129.99美元，文章称这是该耳机目前见过的最低价。该促销预计持续至11月30日，但价格和库存可能受活动条件影响。

![Soundcore Liberty 5 Pro耳机降至历史最低价](https://platform.theverge.com/wp-content/uploads/sites/2/2026/05/268539_Soundcore_Liberty_5_Pro_JHiggins_0001.jpg?quality=90&strip=all&crop=0,0,100,100)

这款耳机通常售价为169.99美元，目前黑色、白色、蓝色和粉色版本均参与折扣。

Liberty 5 Pro支持 `LDAC` 高解析音频，并具备IP55防尘防水等级。

耳机配备降噪麦克风，可过滤背景噪音；充电盒带有0.96英寸屏幕，可调整主动降噪和声音配置。

[查看原文](https://www.theverge.com/gadgets/1039160/anker-soundcore-liberty-5-pro-black-friday-2026-deal-sale)

---

## GitHub发帖邀请用户测试知识并公布真实得分 {#news-15}

> **GitHub**在社交平台发帖，邀请用户测试自己的GitHub知识并告知真实得分。帖子带有`#GitHubUniverse`话题标签。

该帖子以正确和错误符号作为配图或标记，并面向用户发起知识测试邀请。

帖子同时要求参与者分享自己的实际得分。

[查看原文](https://bsky.app/profile/github.com/post/3n2tysny6ep2x)

---

## Harbinger获2.4亿美元融资押注商用电动卡车 {#news-16}

> 电动卡车制造商 **Harbinger** 本月早些时候完成了2.4亿美元 D 轮融资，并将业务重点放在商用运输领域。

![Harbinger获2.4亿美元融资押注商用电动卡车](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/gang-shot-7.jpg?quality=90&strip=all&crop=0,0,100,100)

**Harbinger** 主要关注4至6级商用车，包括配送厢式货车和厢式卡车。公司选择避开面向消费者的电动汽车市场。

公司已获得 **FedEx** 一笔价值3亿美元的订单，并获得一份与美国军方相关的新国防合同。

Harbinger 的业务方向聚焦为经济运输提供商用电动车辆。

[查看原文](https://www.theverge.com/transportation/1038448/harbinger-ev-startup-240m-series-d-fedex-army-trucks)

---

## Anthropic上市后面临AI安全与盈利张力 {#news-17}

> **Anthropic**在纳斯达克上市，成为首家上市的纯人工智能实验室。公司首次公开募股定价为每股83美元，股价一度升至111美元，但后续价格可能发生变化。

![Anthropic上市后面临AI安全与盈利张力](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/VRG_DCD_1121_Site.jpg?quality=90&strip=all&crop=0,0,100,100)

Anthropic是人工智能模型**Claude**背后的实验室，并已成为全球最有价值的公司之一。

文章讨论了公司上市后继续投入人工智能安全，同时回应股东诉求所面临的治理张力。

Anthropic采用独特的公司治理结构，创始人实际拥有的控制权可能高于外界预期。

文章称，公司未来几年预计需要支付总额约9000亿美元的计算成本，其面向大型客户的核心宣传与人工智能安全有关。

[查看原文](https://www.theverge.com/podcast/1038701/anthropic-ipo-ai-safety-openai-nvidia-structure)

---

## AI疑虑叠加，美科技股创疫情以来最差周表现 {#news-18}

> 纳斯达克100指数经历自新冠疫情危机以来最严重的单周下跌后进入熊市。人工智能疑虑、丑闻、利率上升和政治阻力共同冲击科技公司估值。

![AI疑虑叠加，美科技股创疫情以来最差周表现](https://the-decoder.com/wp-content/uploads/2026/11/tech_crash_synth.png)

英伟达股价下跌14%，文章称美国证券交易委员会正在审查其会计处理，但未说明审查结论。

Anthropic 在创纪录首次公开募股后的第二天，几乎回吐此前获得的全部涨幅。

[查看原文](https://the-decoder.com/us-technology-stocks-suffer-their-worst-weekly-loss-since-the-pandemic-as-ai-doubts-pile-up/)

---

## Tasklet在旧金山招聘五类产品与代理基础设施人才 {#news-19}

> YC P26 公司 **Tasklet** 正在旧金山招聘全职现场员工，开放职位涵盖产品、软件、AI 基础设施和客户成功等方向。

![Tasklet在旧金山招聘五类产品与代理基础设施人才](https://tasklet.ai/og-image.png)

Tasklet目前列出5个职位，包括设计工程负责人、平台软件工程师和 AI 基础设施软件工程师。

公司还招聘产品软件工程师与客户成功工程师，所有职位要求在旧金山全职现场办公。

Tasklet正在开发能够承担实际工作职责的 AI 员工，并连接企业业务工具、定制代理及代理行为控制能力。

申请者需提交不超过5分钟的视频介绍、简历及相关链接，页面明确说明目前不为新签证提供赞助。

[查看原文](https://tasklet.ai/careers)

---

## 硅谷部分AI末日论者转向宗教式团体实践 {#news-20}

> 佛蒙特州的Maple佛教寺院希望成为硅谷的精神权威，并创建属于自己的人工智能神。相关报道还提到，前成员指控该团体存在操纵行为，且有人出现心理崩溃。

![硅谷部分AI末日论者转向宗教式团体实践](https://the-decoder.com/wp-content/uploads/2026/11/buddhist_ai_sect.png)

据《纽约客》报道，Soryu Forall领导的团体记录成员的每一次呼吸，用于训练一个以他为形象的人工智能。

Maple位于佛蒙特州，目标包括建立自身的精神权威和人工智能神。

关于操纵行为和心理崩溃的说法来自前成员；有关Maple及其团体的部分信息转引自《纽约客》报道。

[查看原文](https://the-decoder.com/silicon-valleys-growing-obsession-with-ai-doomsday-is-turning-parts-of-the-tech-industry-toward-cult-like-devotion/)

---

## FBI调查国家犯罪信息中心疑似遭入侵 {#news-21}

> 美国联邦调查局正在调查其犯罪信息数据库疑似遭到入侵的事件。报道指向国家犯罪信息中心数据库，但 FBI 尚未公开回应。

![FBI调查国家犯罪信息中心疑似遭入侵](https://ichef.bbci.co.uk/news/1024/branded_news/3fd7/live/9009b220-e58d-11f1-99a1-253766e7ad8b.jpg)

美国媒体援引两名知情人士称，遭调查的数据库是国家犯罪信息中心数据库。该系统用于联邦和地方执法部门共享逮捕令及背景调查信息。

此前，FBI 曾表示正在调查网络犯罪团体 ShinyHunters 的一次疑似入侵。该团体声称窃取约3.8万名 FBI 工作人员的敏感信息。

另据 NBC 报道，美国农业部农场付款系统也遭遇疑似网络攻击，但相关说法尚未获美国农业部公开确认。

[查看原文](https://www.bbc.com/news/articles/cvze7de86pk3o)

---

## 美国农业部与联邦调查局据报遭黑客攻击 {#news-22}

> 据报道，美国农业部和联邦调查局周五遭到黑客攻击。联邦调查局涉事目标据称为国家犯罪信息中心，美国农业部已知范围包括支付数据库。

![美国农业部与联邦调查局据报遭黑客攻击](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23318430/akrales_220309_4977_0038.jpg?quality=90&strip=all&crop=0,0,100,100)

据CNN报道，**联邦调查局**此次遭攻击的目标是国家犯罪信息中心（NCIC）。该系统供联邦、州和地方执法部门共享逮捕令、失踪人员等信息。

美国总统唐纳德·特朗普随后在接受福克斯新闻采访时确认，联邦调查局遭到黑客攻击。

NBC首先报道了**美国农业部**遭攻击的消息。路透社称，目前已知入侵范围包括该部门的支付数据库。

相关报道均使用了“据报道”等表述，美国农业部事件的整体影响目前仍有限。

[查看原文](https://www.theverge.com/tech/1039543/fbi-usda-hacked)

---

## 特朗普称联邦调查局数据库据报遭攻击不是好事 {#news-23}

> 据报道，联邦调查局正在调查国家犯罪信息中心遭黑客攻击的事件。特朗普表示，据报道发生的联邦调查局数据库遭攻击“不是好事”。

涉事数据库为国家犯罪信息中心（National Crime Information Center）。

目前信息仅称**联邦调查局**据报道正在调查该事件，尚未确认黑客攻击是否确实发生。

特朗普针对据报道发生的数据库攻击发表评论，称这“不是好事”。

[查看原文](https://techcrunch.com/2026/11/21/trump-says-reported-fbi-database-hack-is-not-good/)


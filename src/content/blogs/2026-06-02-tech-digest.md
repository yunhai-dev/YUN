---
title: 科技早报 2026-06-02
category: "科技, 科技早报"
excerpt: 谷歌TPU实现LLM推理3倍加速，Jane Street推出终端UI调试工具，前Meta CTO创立的Gigascale基金聚焦气候科技。
lastEdited: 2026年6月2日
tags: [科技早报, AI, 机器学习, 开发者工具, 安全与隐私, 产品与平台, 科技行业动态, 气候科技]
imageUrl: 
---

## 概览

### AI 与机器学习

- [谷歌TPU实现LLM推理3倍加速：基于扩散的推测解码方法](#news-1)
### 开发者工具

- [Jane Street 推出 strace-ui 等工具，引领终端 UI 复兴浪潮](#news-2)
### 安全与隐私

- [IEEE主席呼吁为儿童设计更安全的数字世界](#news-3)
### 产品与平台

- [Revolut在印度启动受控测试，服务数千用户](#news-4)
- [Pebblebee Halo蓝牙追踪器促销至49.99美元](#news-5)
- [Ugreen蓝牙追踪器降价至15美元，续航七年](#news-6)
### 科技行业动态

- [TechCrunch追踪Startup Battlefield校友后续发展](#news-7)
- [前 Meta CTO 创立的 Gigascale 基金募集 2.5 亿美元聚焦气候科技](#news-8)
---

## 谷歌TPU实现LLM推理3倍加速：基于扩散的推测解码方法 {#news-1}

> 加州大学圣地亚哥分校（**UCSD**）研究人员在 **Google TPU** 上实现了名为 **DFlash** 的推测解码方法，实现了平均 **3.13 倍** 的加速。

该方法通过在一次前向传播中“绘制”整个候选词块，绕过了传统自回归草稿的顺序瓶颈。

其峰值性能几乎是现有方法（如 **EAGLE-3**）的两倍。该集成已开源并整合到 **vLLM** 生态系统中。

此项研究旨在优化 **TPU** 硬件以提升大语言模型（**LLM**）的推理效率。

[查看原文](https://developers.googleblog.com/supercharging-llm-inference-on-google-tpus-achieving-3x-speedups-with-diffusion-style-speculative-decoding/)

---

## Jane Street 推出 strace-ui 等工具，引领终端 UI 复兴浪潮 {#news-2}

> **Jane Street** 开发者发布 `strace-ui` 等工具，将系统跟踪转化为交互式终端界面，旨在提升调试效率与开发者体验。

![Jane Street 推出 strace-ui 等工具，引领终端 UI 复兴浪潮](https://blog.janestreet.com/strace-ui-bonsai-term-and-the-tui-renaissance/bonsai-trees.gif)

`strace-ui` 是一个将 `strace` 转化为交互式终端 UI 的工具，它为进程 ID 分配短 ID，格式化结构体，并以十六进制转储方式渲染缓冲区。

该工具支持交互式过滤功能，允许用户按文件描述符跟踪或排除特定系统调用，从而简化调试过程。

`strace-ui` 由 **Jane Street** 的开发者 **Ian Henry** 创建，旨在解决他自己在日常工作中遇到的痛点。

文章同时介绍了 **Bonsai**，这是一个由 **Jane Street** 开发的、用于构建反应式 UI 的强大框架，其灵感部分源自 Elm。

[查看原文](https://blog.janestreet.com/strace-ui-bonsai-term-and-the-tui-renaissance/)

---

## IEEE主席呼吁为儿童设计更安全的数字世界 {#news-3}

> IEEE主席指出，2013年后出生的数字原生代儿童所处的数字环境并非为他们设计，亟需通过适龄设计标准来保护其在线安全。

![IEEE主席呼吁为儿童设计更安全的数字世界](https://spectrum.ieee.org/media-library/person-wearing-a-scarf-over-a-dark-sweater-with-a-blue-background.png?id=65004859&width=1245&height=700&coordinates=0%2C119%2C0%2C120)

根据联合国儿童基金会数据，全球三分之一互联网用户年龄在18岁以下。这些在数字系统中成长的儿童面临着成瘾性功能、不当内容和算法风险。

澳大利亚、巴西、欧盟、印度尼西亚和美国等国的政策制定者正对此做出回应。印度尼西亚和巴西分别是亚洲和拉丁美洲首个采用适龄设计法规的国家。

IEEE于2021年发布了关于适龄设计的首个标准，其“可信数字体验”标准组合为政府和行业提供了保护儿童的实用技术框架。

目前，IEEE正协助各国政府从被动监管转向主动、协调且基于全球信息的儿童在线保护策略。希腊在数字化转型中也与IEEE合作。

[查看原文](https://spectrum.ieee.org/ieee-presidents-note-june-2026)

---

## Revolut在印度启动受控测试，服务数千用户 {#news-4}

> 英国金融科技公司 **Revolut** 已在印度向数千名用户开放其平台服务，这是其更广泛推出前的重要一步。

![Revolut在印度启动受控测试，服务数千用户](https://techcrunch.com/wp-content/uploads/2025/10/PR-lib-office-exterior-4.png?resize=1200,629)

目前，用户可访问 **UPI** 支付、电子钱包、国内预付卡及多币种卡等功能。测试版应用已本地化并在主流应用商店上架。

**Revolut** 在印度的等待名单用户约为 **45 万**，此次测试覆盖其中一小部分。该公司自 **2021** 年起在印度建设业务，并已获得印度储备银行的预付支付工具（**PPI**）牌照。

公司计划在扩展推出前添加其 Lifestyle 和 **RevPoints** 产品。由于需要银行牌照，印度市场不会提供家庭账户功能。

[查看原文](https://techcrunch.com/2026/06/01/revolut-rolls-out-services-to-thousands-of-users-in-india-ahead-of-broader-launch/)

---

## Pebblebee Halo蓝牙追踪器促销至49.99美元 {#news-5}

> 结合蓝牙追踪与个人安全功能的**Pebblebee Halo**目前在亚马逊以历史最低价49.99美元销售，并有买三赠一活动。

![Pebblebee Halo蓝牙追踪器促销至49.99美元](https://platform.theverge.com/wp-content/uploads/sites/2/2026/04/pebblebee_halo2.jpg?quality=90&strip=all&crop=0,0,100,100)

**Pebblebee Halo**将物品追踪器和个人安全设备结合在一起。它提供长达500英尺的蓝牙范围，并接入苹果和谷歌的查找网络。

该设备具备个人安全功能：拉动拉环可触发130分贝警报和频闪灯，并自动与一名受信任的联系人共享位置。

要实时与多个联系人共享位置，需要订阅**Pebblebee**的Alert Live服务，该服务首年免费。

[查看原文](https://www.theverge.com/gadgets/941273/pebblebee-halo-bluetooth-tracker-personal-safety-deal-sale)

---

## Ugreen蓝牙追踪器降价至15美元，续航七年 {#news-6}

> **Ugreen** 的 **FineTrack 2** 蓝牙追踪器目前在亚马逊上以 **14.99 美元** 的价格限时特价出售。

![Ugreen蓝牙追踪器降价至15美元，续航七年](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/finetrack2.png?quality=90&strip=all&crop=0,0,100,100)

这款球形追踪器具有 **IP68** 防水防尘等级，在黑暗中会发光，并配有 **110 分贝** 的响亮警报。

其内置电池不可充电，但官方宣称可使用长达七年。该促销价为 **Prime** 会员专享。

此外，**Google Pixel Buds 2A** 耳塞降至 **109 美元**，**Bose QuietComfort Ultra** 头戴式耳机在 **eBay** 上以翻新价 **188 美元** 出售。

[查看原文](https://www.theverge.com/gadgets/940830/find-my-bluetooth-tracker-bose-qc-ultra-google-pixel-buds-deal-sale)

---

## TechCrunch追踪Startup Battlefield校友后续发展 {#news-7}

> TechCrunch正在追踪其著名创业比赛Startup Battlefield校友的后续发展情况，展示他们在比赛结束后的创业历程。

文章旨在展示曾参加Startup Battlefield比赛的初创公司，在比赛结束后的发展轨迹和现状。

许多校友也曾参与TechCrunch的播客节目《Build Mode: The Founder Survival Guide》，分享他们的创业经验。

[查看原文](https://techcrunch.com/2026/06/01/from-the-stage-to-the-future-where-are-startup-battlefields-alumni-now/)

---

## 前 Meta CTO 创立的 Gigascale 基金募集 2.5 亿美元聚焦气候科技 {#news-8}

> 由前 **Meta** 首席技术官 **Mike Schroepfer** 领导的风险投资公司 **Gigascale** 宣布，已成功为其第二支基金募集 2.5 亿美元，专注于气候科技领域。

![前 Meta CTO 创立的 Gigascale 基金募集 2.5 亿美元聚焦气候科技](https://techcrunch.com/wp-content/uploads/2026/06/Mike-Schroepfer-Gigascale-Capital.jpeg?resize=1200,1029)

新基金将重点投资于能源、电网基础设施和关键矿产等方向，旨在通过支持初创公司应对气候变化挑战。

**Gigascale** 的第二支基金是其创立三年多来投资的延续，此前已投资了包括 **Commonwealth Fusion Systems** 和 **Form Energy** 在内的多家初创公司。

这是该基金首次设立早期阶段重点并引入机构投资者，标志着其投资策略的深化。

**Schroepfer** 认为，AI 和广泛的电气化趋势正在给电网接入带来压力，这为能源初创公司创造了重要机遇。

[查看原文](https://techcrunch.com/2026/06/01/zigging-when-most-are-zagging-ex-meta-cto-raises-250m-climate-fund/)


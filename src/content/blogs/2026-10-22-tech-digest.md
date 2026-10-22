---
title: 科技早报 2026-10-22
category: "科技, 科技早报"
excerpt: 本期聚焦AI模型与智能体应用、PHP高危漏洞修复，以及自动驾驶、云游戏和人形机器人进展。
lastEdited: 2026年10月22日
tags: [人工智能, AI智能体, PHP安全, 开源项目, 自动驾驶, 云游戏, 人形机器人]
imageUrl: 
---

## 概览

### 要闻

- [PFAS清理仍面临分解难与规模化处置挑战](#news-1)
### AI 与机器学习

- [Recursive发布可在笔记本运行的Flint编程模型](#news-2)
- [Anthropic发布Claude Duet，面向专业用户的AI智能体](#news-3)
- [Google Cloud同平台提供Gemini、Claude与GPT模型](#news-4)
- [Recursive发布开放权重编程模型Flint](#news-5)
- [通用汽车将为OnStar加入AI助手与智能功能](#news-6)
- [沃尔玛将允许用户连接AI代理代为购物](#news-7)
### GitHub 热门项目

- [vLLM开源推理库支持多种量化与并行方案](#news-8)
- [GitHub 项目 cua 探索开源 computer-use 2.0 基础设施](#news-9)
- [GitHub 项目 agent-beacon 提供 AI agents 跨运行记忆层](#news-10)
- [OpenUI以流式语言驱动跨框架生成式界面](#news-11)
- [开源求职搜索引擎项目Freehire获近两千Stars](#news-12)
- [开源CRM项目Twenty提供云端与自托管部署能力](#news-13)
### 开发者工具

- [Blacksmith获6600万美元C轮融资估值达十亿美元](#news-14)
### 安全与隐私

- [PHP两项严重漏洞导致多家网站出现重大问题](#news-15)
- [PHP紧急更新修复高危漏洞，近七成网站需更新软件](#news-16)
- [全球多项网络安全事件集中暴露系统风险](#news-17)
- [PHP两项关键漏洞紧急修复，更新被称唯一安全选择](#news-18)
### 产品与平台

- [沃尔玛推出支持AI代理代客购物的新技术](#news-19)
- [Waymo开始提供拉斯维加斯机场接送服务](#news-20)
- [Xbox云游戏按次付费模式起价3.99美元](#news-21)
- [Xbox推出按小时购买云游戏时长功能，最低约0.24美元](#news-22)
### 硬件与芯片

- [Tesla在加州启动Optimus生产线，季度利润同比降43%](#news-23)
- [英伟达发布模块化AI工厂，计划推动欧洲机器人发展](#news-24)
---

## PFAS清理仍面临分解难与规模化处置挑战 {#news-1}

> 被称为“永久化学品”的PFAS已广泛存在于人体和环境中，清理工作仍面临化学性质稳定、种类繁多及后续处置成本高等问题。

![PFAS清理仍面临分解难与规模化处置挑战](https://wp.technologyreview.com/wp-content/uploads/2026/10/purple-24.svg)

PFAS数十年来被用于不粘锅、消防泡沫等产品，并与生育问题、发育迟缓、癌症和免疫反应降低等风险有关。

由于碳氟键很强，PFAS难以被环境分解。科学家已在人体血液、南极雪等介质中发现这类物质。

反渗透可用于家庭终端用水过滤，泡沫分馏等技术可能适用于大规模去除。佐治亚大学教授Jack Huang测试的电化学方法在测试中破坏了超过90%的PFAS质量，相关产品已授权给AECOM。

PFAS污染土壤的清理仍处于早期阶段。捕获方法会产生含PFAS的浓盐水，后续销毁成本高且耗能，技术和政策仍存在限制。

[查看原文](https://www.technologyreview.com/2026/10/21/1146128/cleaning-up-pfas-impossible-issue/)

---

## Recursive发布可在笔记本运行的Flint编程模型 {#news-2}

> AI初创公司**Recursive**发布了可在笔记本电脑上运行的免费编程模型Flint。公司称，其自动化研究系统Eureka Machine参与了模型开发的几乎每个环节。

![Recursive发布可在笔记本运行的Flint编程模型](https://techcrunch.com/wp-content/uploads/2026/05/GettyImages-2157738833.jpg?resize=1200,800)

**Recursive**称，一个小团队在不到四个月内从零构建了Flint。该模型可从Hugging Face免费下载，并采用允许免费使用和修改的Apache 2.0许可证。

Flint是混合专家模型，单项任务仅使用400亿参数中的25亿参数。在搭载Apple M4 Pro芯片的MacBook Pro上，该模型每秒生成约131个token。

在Recursive的测试中，Flint在SWE-Bench Verified测试中的表现超过参数量低于500亿的其他模型；其六项测试自有平均成绩仅低于阿里巴巴的Qwen3.8 27B。

Recursive表示，相比大型付费编程助手，Flint需要更多指导，并建议将大型任务拆分为较小步骤。上述性能数据主要来自公司自有测试。

**Recursive**已获得6.5亿美元融资，估值为46.5亿美元，投资方包括GV、英伟达和AMD Ventures。

[查看原文](https://techcrunch.com/2026/10/21/recursive-launches-flint-a-laptop-coding-model-it-says-was-largely-built-by-ai/)

---

## Anthropic发布Claude Duet，面向专业用户的AI智能体 {#news-3}

> Anthropic宣布推出AI智能体**Claude Duet**，面向专业人士和小型企业主，目前以“研究预览”形式发布。

![Anthropic发布Claude Duet，面向专业用户的AI智能体](https://platform.theverge.com/wp-content/uploads/sites/2/2026/06/STKB364_CLAUDE_D.jpg?quality=90&strip=all&crop=0,0,100,100)

**Claude Duet**定位为**Meta Muse**和**OpenAI Dots**的竞争产品，基于`Claude Opus 5.5`构建。

该智能体可作为iOS和Android上的独立应用使用，也可通过网页端**Claude**访问。

它每天早晨会根据用户连接的应用发送重要事项简报，并在全天关注这些应用，仅在需要用户注意时发送消息。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1015843/anthropic-claude-duet-ai-agent)

---

## Google Cloud同平台提供Gemini、Claude与GPT模型 {#news-4}

> **Google Cloud**现已在同一平台提供 **Gemini**、**Claude** 和 **OpenAI GPT** 模型。文章称，该平台成为首家同时提供这三类模型的主要云服务商。

![Google Cloud同平台提供Gemini、Claude与GPT模型](https://the-decoder.com/wp-content/uploads/2026/05/google_logo_wall.png)

上线时，`GPT-6 Astra`、`GPT-6.1 Sol` 和 `GPT-6 Luna`面向企业客户提供私人预览。

上述OpenAI模型均通过 **Google Cloud** 平台提供，当前仍处于企业客户私人预览阶段。

[查看原文](https://the-decoder.com/google-cloud-now-offers-openai-models-alongside-gemini-and-claude-becoming-the-only-major-provider-with-all-three/)

---

## Recursive发布开放权重编程模型Flint {#news-5}

> AI公司Recursive发布首个产品Flint，这是一款开放权重的人工智能编程模型。公司称，模型开发流程几乎完全由人工智能完成并改进。

![Recursive发布开放权重编程模型Flint](https://media.wired.com/photos/6ad8079d19d8dd7213438cc0/191:100/w_1280,c_limit/business_ai_lab_recursive_improvement.jpg)

**Recursive**致力于利用递归自我改进推进人工智能及其他由人工智能辅助的科学领域。

公司使用名为“Eureka Machine”的递归人工智能系统，自动化了模型开发的大部分环节。

Recursive首席执行官兼联合创始人Richard Socher表示，该系统设计了基础模型训练方法、模型架构及针对特定芯片优化的代码等创新。

根据Recursive公布的基准测试分数，Flint在编程任务上的表现超过规模和架构相近的其他模型。相关性能优势主要依据公司公布的数据及Socher的说法。

Socher表示，Flint使用的系统无法逃脱人类控制。Recursive计划推进完全递归自我改进，但目前仍由人类监督，并且相关技术仍受到限制。公司已筹集6.5亿美元，估值为46.5亿美元。

[查看原文](https://www.wired.com/story/recursive-self-improvement-flint-latest-model-scary-good/)

---

## 通用汽车将为OnStar加入AI助手与智能功能 {#news-6}

> **通用汽车**计划为订阅制联网汽车服务 **OnStar** 加入个人人工智能助手，并将其转型为联网智能平台。相关功能将在未来几个月首先登陆2027款凯迪拉克Lyriq。

![通用汽车将为OnStar加入AI助手与智能功能](https://techcrunch.com/wp-content/uploads/2026/10/OnStar-AI-Assistant.jpg?resize=1200,624)

`OnStar AI Assistant`随后将覆盖更多通用汽车车型，用户可通过语音控制部分车辆功能并询问车辆功能。

通用汽车计划在2027年推出新的OnStar移动应用，与车内软件配合并同步。该应用将取代 `OnStar Guardian` 及多个品牌车辆应用。

车辆摄像头将接入软件，提供实时画面以及碰撞和安全记录；用户也可设置在车辆感知潜在事件时自动开启并上传记录。

此前，通用汽车曾使用Google Cloud的 `Dialogflow` 识别语音请求，并扩展系统回答路线和导航等问题。

[查看原文](https://techcrunch.com/2026/10/21/gm-is-giving-onstar-an-ai-makeover/)

---

## 沃尔玛将允许用户连接AI代理代为购物 {#news-7}

> 沃尔玛计划从下月起允许用户将自己的人工智能代理连接到其网站购物，并提供购买审批、审查机制和支出限额设置。

![沃尔玛将允许用户连接AI代理代为购物](https://platform.theverge.com/wp-content/uploads/sites/2/2026/08/gettyimages-2247092603.jpg?quality=90&strip=all&crop=0,0,100,100)

沃尔玛表示，用户可以为人工智能代理设置支出限额，并对相关购买进行审批和审查。

根据沃尔玛的规定，人工智能代理不得执行超出购物者意图的操作。

人工智能代理也不得更改客户的付款方式，并必须遵守沃尔玛制定的相关规则。

[查看原文](https://www.theverge.com/ai-artificial-intelligence/1015715/walmart-ai-shopping-agents)

---

## vLLM开源推理库支持多种量化与并行方案 {#news-8}

> **vLLM** 是一个面向大语言模型推理和服务的开源库，强调高吞吐与高效内存管理。项目支持多种量化、推测解码和分布式推理能力。

![vLLM开源推理库支持多种量化与并行方案](https://opengraph.githubassets.com/3e6b4c6f00c23a206bac3b6b475b6d089b84cae809942f12c16a48eb96629645/vllm-project/vllm)

**vLLM** 最初由加州大学伯克利分校 Sky Computing Lab 开发，项目称目前由来自 2000 多名贡献者的学术机构和公司社区共同维护。

项目使用 `PagedAttention` 管理注意力机制中的键值内存，并支持连续批处理、分块预填充和前缀缓存。

在模型压缩方面，**vLLM** 支持 `FP8`、`MXFP8`、`MXFP4`、`NVFP4`、`INT8`、`INT4`、`GPTQ/AWQ` 和 `GGUF` 等量化方式。

项目还支持 `n-gram`、`suffix`、`EAGLE` 和 `DFlash` 推测解码，以及张量、流水线、数据、专家和上下文并行，并提供兼容 OpenAI 的 API 服务器、Anthropic Messages API 和 gRPC。相关贡献者数量、硬件支持范围及性能优势为项目说明，未提供独立验证或具体基准数据。

[查看原文](https://github.com/vllm-project/vllm)

---

## GitHub 项目 cua 探索开源 computer-use 2.0 基础设施 {#news-9}

> **trycua/cua** 是一个主要使用 Rust 语言开发的开源项目，旨在通过多项基础设施扩展 computer-use 2.0。

项目目前获得 30,509 颗 Stars，当天新增 208 颗 Stars。

项目提供开源驱动程序和跨操作系统沙箱。

项目还面向训练、评估和数据生成提供基准。

[查看原文](https://github.com/trycua/cua)

---

## GitHub 项目 agent-beacon 提供 AI agents 跨运行记忆层 {#news-10}

> **Asymptote-Labs/agent-beacon** 是一个主要使用 Go 语言开发的 AI agents 跨运行框架，提供自我改进的记忆层。

项目目前获得 2,288 颗 Stars，当天新增 447 颗 Stars。

项目描述显示，其面向 AI agents 提供跨运行能力和自我改进的记忆层。

项目页面还提供了 Discord 社区邀请链接。

[查看原文](https://github.com/Asymptote-Labs/agent-beacon)

---

## OpenUI以流式语言驱动跨框架生成式界面 {#news-11}

> 开源项目**OpenUI**是一套全栈、与框架无关的生成式UI框架，围绕支持流式处理的OpenUI Lang构建。

![OpenUI以流式语言驱动跨框架生成式界面](https://repository-images.githubusercontent.com/897268988/21cdb909-ce01-468d-85bd-bfc455e47ebc)

OpenUI核心支持React、Vue、Svelte和Angular运行时，React版本内置组件库和可直接使用的聊天界面。

OpenUI Lang用于结构化UI生成，可在模型输出流式到达时逐步解析并渲染界面。

项目内置图表、表单、表格和布局等组件，也支持用户扩展组件。项目声明未发行官方加密货币、代币或硬币。

[查看原文](https://github.com/thesysdev/openui)

---

## 开源求职搜索引擎项目Freehire获近两千Stars {#news-12}

> 面向求职者的开源搜索引擎项目 **strelov1/freehire** 使用 Go 语言开发。项目当天新增 405 个 Stars，累计获得 1,993 个 Stars。

**strelov1/freehire** 是一个面向求职者的开源搜索引擎项目，使用 Go 语言开发。

根据提供信息，该项目目前获得 1,993 个 Stars，当天新增 405 个 Stars。

[查看原文](https://github.com/strelov1/freehire)

---

## 开源CRM项目Twenty提供云端与自托管部署能力 {#news-13}

> 开源CRM项目**Twenty**定位为Salesforce的开放替代方案，为技术团队提供构建定制CRM所需的基础模块。

![开源CRM项目Twenty提供云端与自托管部署能力](https://repository-images.githubusercontent.com/572984571/ef151ee9-3060-418b-bf88-cb689ab78c7b)

**Twenty**提供对象、视图、工作流和代理等模块，支持通过代码定义对象、字段和视图。

用户可使用`Twenty CLI`创建应用，也可以在twenty.com注册工作区，使用云端服务而无需自行管理基础设施。

项目同时支持通过Docker Compose部署到用户自己的基础设施，并提供面向`Claude Code`、`Codex`和`Cursor`的官方应用技能。

[查看原文](https://github.com/twentyhq/twenty)

---

## Blacksmith获6600万美元C轮融资估值达十亿美元 {#news-14}

> 软件开发平台 **Blacksmith** 宣布完成由Sequoia领投的6600万美元C轮融资，公司估值达到10亿美元。

![Blacksmith获6600万美元C轮融资估值达十亿美元](https://techcrunch.com/wp-content/uploads/2026/10/Blacksmith.jpg?resize=1200,800)

**Blacksmith** 提供帮助企业构建和测试软件的平台，支持由AI编写代码。公司成立目标是让持续集成过程更易于处理。

公司称年度经常性收入增长了17倍，并已运行超过9000万次持续集成任务，客户包括Mercury和Granola。

本轮融资距其4500万美元B轮融资仅两个月；B轮融资时公司估值为5.5亿美元。

Blacksmith迄今累计融资1.25亿美元。

[查看原文](https://techcrunch.com/2026/10/21/blacksmith-hits-unicorn-valuation-after-sequoia-leads-series-c/)

---

## PHP两项严重漏洞导致多家网站出现重大问题 {#news-15}

> PHP编程语言中发现两项被称为“严重漏洞”的安全问题，导致4chan、DeviantArt和Wikipedia等网站当天出现重大问题。

![PHP两项严重漏洞导致多家网站出现重大问题](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23318433/akrales_220309_4977_0182.jpg?quality=90&strip=all&crop=0,0,100,100)

PHP支撑着大量互联网网站，包括使用WordPress构建的网站。

一些荷兰和芬兰政府机构出于预防目的关闭网站。美国国家安全局网络安全账号建议，无法立即更新的组织应将系统下线。

英国国家网络安全中心也提出了同样建议。原文称漏洞由人工智能发现，但未说明发现过程、漏洞编号及完整影响范围。

[查看原文](https://www.theverge.com/tech/1015906/php2shell-vulnerability-october-2026)

---

## PHP紧急更新修复高危漏洞，近七成网站需更新软件 {#news-16}

> PHP发布紧急安全更新，修复两项可能让攻击者在脆弱服务器上执行任意代码的严重漏洞。相关漏洞编号为`CVE-2026-109618`和`CVE-2026-109619`。

![PHP紧急更新修复高危漏洞，近七成网站需更新软件](https://krebsonsecurity.com/wp-content/uploads/2026/10/shutterstock-codeonscreenphp.png)

据报道，近70%的网站需要更新核心软件；漏洞可能导致攻击者完全控制受影响服务器。

漏洞已在PHP `8.5.12`、`8.4.27`、`8.3.36`和`8.2.35`中修复，过去十年发布的PHP版本至少受到其中一个漏洞影响。

**Cloudflare**称已检测到部分利用，并在协调世界时3:02部署Web应用防火墙规则，拦截相关攻击流量。

**OpenAI**参与了漏洞研究和沟通。**Wiz**称，漏洞可能被用于安装Web后门或Web Shell；专家认为已有可用利用工具并出现了在野外利用。

[查看原文](https://krebsonsecurity.com/2026/10/widespread-php-flaw-may-cause-many-site-outages-today/)

---

## 全球多项网络安全事件集中暴露系统风险 {#news-17}

> 近期多项网络安全事件接连发生，涉及 **PHP**、`Node.js`、**LiteLLM**及证书颁发机构等关键软件和服务。美国国家安全局建议使用 PHP 的组织立即更新系统，或在完成更新前将相关系统下线。

![全球多项网络安全事件集中暴露系统风险](https://techcrunch.com/wp-content/uploads/2024/05/cybersecurity-data-sharing-2024-v1.jpg?resize=1200,675)

AI 发现了影响 **PHP** 的严重安全漏洞，导致全球多个政府网站下线。相关组织被建议尽快完成系统更新。

`Node.js` 最新版本修复四个高严重性漏洞，其中一个可能导致远程代码执行，另外两个可能导致 TLS 验证绕过。

攻击者入侵 **LiteLLM**，并将恶意代码发布到 PyPI、Docker Hub 和 GitHub Container Registry。该代码据称包含窃取云凭证、密码和 AI 服务凭证的程序，以及可执行命令的远程访问木马。

印度证书颁发机构 **eMudhra** 的私钥遭泄露，攻击者可能借此签发欺诈性证书并冒充合法网站。此外，TiDB Cloud此前披露过安全漏洞，Plex Media Server 的四个已修复漏洞也遭到利用。

[查看原文](https://techcrunch.com/2026/10/21/the-internet-is-having-a-very-bad-cybersecurity-day/)

---

## PHP两项关键漏洞紧急修复，更新被称唯一安全选择 {#news-18}

> PHP开发者发布紧急安全更新，修复编号为`CVE-2026-109618`和`CVE-2026-109619`的两个关键漏洞。PHP Foundation表示，目前没有完整缓解措施，更新是唯一安全选择。

![PHP两项关键漏洞紧急修复，更新被称唯一安全选择](https://media.wired.com/photos/6ad8c3fad8fc6a7c8e751dc0/191:100/w_1280,c_limit/102126-PHP.jpg)

两个漏洞影响自2004年7月PHP 5发布以来、用于处理Web请求的PHP安装。

目前仍受支持并获得补丁的是PHP 8.2及更高版本，部分发行版和第三方供应商仍提供旧版本修复。

**Cloudflare**称，在漏洞被详细披露并发布修复前已观察到早期攻击。**Sansec**预计修复发布后15分钟内可能出现大规模攻击。

**WordPress**、**Drupal**和**Adobe Magento**等系统均建立在PHP之上。专家警告可能出现蠕虫式恶意软件，但相关后果尚未确认。

[查看原文](https://www.wired.com/story/this-is-not-a-drill-2-php-vulnerabilities-are-setting-the-internet-on-fire/)

---

## 沃尔玛推出支持AI代理代客购物的新技术 {#news-19}

> 亚马逊阻止AI代理在其网站上购物，沃尔玛则推出支持AI代理代表客户购买商品的新技术。

沃尔玛的相关技术包含支出控制机制，可对AI代理的消费进行限制。

该技术还提供交易审批机制，用于处理AI代理代表客户发起的购买交易。

[查看原文](https://techcrunch.com/2026/10/21/while-amazon-blocks-ai-agents-walmart-rolls-out-the-welcome-mat/)

---

## Waymo开始提供拉斯维加斯机场接送服务 {#news-20}

> Waymo已开始为拉斯维加斯哈里·里德国际机场提供接送服务，服务将在两座航站楼的专用自动驾驶车辆区域进行。

![Waymo开始提供拉斯维加斯机场接送服务](https://techcrunch.com/wp-content/uploads/2026/09/waymo-ojai-street.jpg?resize=1200,801)

机场接送服务覆盖1号航站楼和3号航站楼，这是**Waymo**提供服务的第六座主要机场。

目前，Waymo还在凤凰城天港机场、纳什维尔国际机场、圣安东尼奥国际机场、旧金山国际机场和圣何塞国际机场提供乘车服务。

Waymo于2026年9月开始在拉斯维加斯向公众提供乘车服务，目前覆盖该市24平方英里的区域。

往返拉斯维加斯机场的服务初期仅面向少数乘客，之后将向所有客户开放，具体时间尚未公布。Amazon旗下**Zoox**已在该机场提供乘车服务。

[查看原文](https://techcrunch.com/2026/10/21/waymo-starts-offering-rides-at-the-las-vegas-airport/)

---

## Xbox云游戏按次付费模式起价3.99美元 {#news-21}

> 微软将于11月开放Xbox Cloud Gaming的按次付费模式，用户无需订阅Xbox Game Pass即可使用云游戏服务。首批时长套餐起价为3.99美元，可使用10小时。

![Xbox云游戏按次付费模式起价3.99美元](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/22478836/acastro_210429_1777_0004.jpg?quality=90&strip=all&crop=0,0,100,100)

新的按次付费模式要求玩家购买云游戏时长套餐，具体面向更广泛用户的开放日期尚未公布。

没有Game Pass订阅的**Xbox Insiders**可提前购买云游戏时长。

介绍性套餐包括10小时3.99美元、25小时7.99美元和50小时11.99美元。

[查看原文](https://www.theverge.com/news/1015321/xbox-cloud-gaming-pay-as-you-go-cloud-hours-pricing)

---

## Xbox推出按小时购买云游戏时长功能，最低约0.24美元 {#news-22}

> 微软向Xbox Insiders推出按小时购买云端游戏时间的功能，非订阅用户可串流已购买且符合条件的游戏。介绍性价格最低约为每小时0.24美元。

非订阅用户可通过**Xbox Store**购买云游戏时长，并在受支持设备上串流自己已经拥有的符合条件的游戏。

10小时云游戏时长的介绍性价格为4美元，约合每小时0.40美元；25小时套餐为8美元。

50小时套餐价格为12美元，约合每小时0.24美元。相关价格均被标注为介绍性上线价格。

购买的游戏时长在使用前不会过期，将一直保留至全部使用完毕。目前该功能仅向Xbox Insiders推出。

[查看原文](https://arstechnica.com/gaming/2026/10/xbox-wants-you-to-pay-24-to-40-cents-per-hour-to-stream-games-you-already-bought/)

---

## Tesla在加州启动Optimus生产线，季度利润同比降43% {#news-23}

> **Tesla**宣布已在加利福尼亚州弗里蒙特工厂开始生产Optimus人形机器人。公司第三季度净利润为7.87亿美元，同比下降43%。

![Tesla在加州启动Optimus生产线，季度利润同比降43%](https://techcrunch.com/wp-content/uploads/2026/04/tesla-opitmus-Getty.jpg?resize=1200,800)

Tesla称，从该生产线下线的机器人是公司制造的首批达到量产质量标准的机器人，并认为当前Optimus制造流程适合商业产品。

Tesla第三季度总营收为280.4亿美元，略低于2025年同期的280.9亿美元；汽车交付量为486532辆，较上一季度增加约6000辆，但低于上年同期。

Tesla太阳能和储能业务收入同比下降16%至28亿美元，公司将其归因于与关税相关的客户退款。

服务业务收入同比增长33%至46亿美元，其中包括客户购买全自动驾驶高级驾驶辅助软件的订阅；服务及其他业务毛利润为7.34亿美元。

Tesla表示将继续迭代Optimus的硬件和制造流程，因此其商业化生产流程仍可能调整。

[查看原文](https://techcrunch.com/2026/10/21/tesla-stars-optimus-robot-production-in-california-as-profit-falls-43/)

---

## 英伟达发布模块化AI工厂，计划推动欧洲机器人发展 {#news-24}

> **Jensen Huang**在柏林举行的GTC大会上介绍了欧洲未来构想，重点涉及机器人、AI智能体和模块化数据中心。**Nvidia**同时公布了模块化“AI工厂”DSX Pod及多项机器人计划。

![英伟达发布模块化AI工厂，计划推动欧洲机器人发展](https://media.wired.com/photos/6ad8c8882adb51db52e1a235/191:100/w_1280,c_limit/GettyImages-2301295306.jpg)

DSX Pod的组件预先组装在大型金属集装箱中，并配备**Nvidia**的Vera Rubin计算机架。

**Nvidia**称，DSX Pod可在14天内上线，而传统数据中心建设可能需要数月或数年。

公司宣布与欧洲汽车制造商**大众**和**梅赛德斯**开展自动驾驶汽车合作，并推出全栈机器人平台。

名为Agile One的预配置参考机器人计划于次年第一季度提供，用于帮助开发者构建实体AI系统。上述时间和能力属于公司计划或预测。

[查看原文](https://www.wired.com/story/jensen-huangs-vision-for-europe-runs-on-plug-in-data-centers/)


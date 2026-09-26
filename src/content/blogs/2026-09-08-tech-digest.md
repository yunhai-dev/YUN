---
title: 科技早报 2026-09-08
category: "科技, 科技早报"
excerpt: 今日热点聚焦全球天气AI模型、智能代理与开源项目，并覆盖华为三折手机和Arm移动GPU发布。
lastEdited: 2026年9月8日
tags: [人工智能, 智能代理, 开源项目, Google, 华为, Arm]
imageUrl: 
---

## 概览

### AI 与机器学习

- [PyTorch 提供张量计算与 GPU 加速能力](#news-1)
- [Google 发布 WeatherNext 3：号称最先进全球天气 AI 模型](#news-2)
- [vLLM在AMD GPU上测试五种推测解码方法](#news-3)
- [GPT-6 Astra 无需人类干预，24 小时内独立通关《Portal》](#news-4)
- [评测编码代理：提示中加入测试技术能否提升正确性](#news-5)
- [OpenAI称AI代理已达“自动化研究实习生”目标](#news-6)
### GitHub 热门项目

- [Deer-Flow登GitHub热榜，支持长周期智能代理任务](#news-7)
- [Context-Mode登GitHub热榜，聚焦AI代理上下文优化](#news-8)
- [OpenAI skills 仓库标注已弃用，Codex 技能转向 Plugins](#news-9)
- [MarkItDown支持多格式文档转Markdown](#news-10)
- [AutoHedge 登 GitHub 热榜：群体智能加 AI 代理自动化交易](#news-11)
- [开源工具Hetty提供HTTP代理与安全研究能力](#news-12)
### 开源生态

- [aispace 开源客户端：为 AI agent 与人类提供临时文件安全共享](#news-13)
- [Google开源团队将赴布拉格参加开源峰会与嵌入式Linux大会](#news-14)
### 安全与隐私

- [作者称开放权重模型压缩安全修复时间窗口](#news-15)
### 产品与平台

- [云端微型虚拟机支撑手机访问多款智能代理](#news-16)
- [Voicebox让手机语音反馈成为客户意见新入口](#news-17)
### 硬件与芯片

- [华为发布第三款三折手机Mate XT 2并加入隐私显示](#news-18)
- [Arm发布Mali G2-Ultra NX：面向移动图形的AI原生GPU](#news-19)
- [EcoFlow 发布第四代 River 便携电源，更小体型采用 LFP 电池](#news-20)
- [时隔六年：索尼发布 WH-1000XM4C 复刻经典降噪耳机](#news-21)
### 科技行业动态

- [Mistral完成30亿欧元融资估值超210亿欧元](#news-22)
- [32亿美元AI数据中心起火，复杂公司结构引发问责难题](#news-23)
- [Similarweb：ChatGPT流量份额回升至55.5%，Gemini短暂回暖消退](#news-24)
---

## PyTorch 提供张量计算与 GPU 加速能力 {#news-1}

> **PyTorch** 是一个 Python 软件包，提供张量计算、GPU 加速和基于 tape-based autograd 的深度神经网络功能。

![PyTorch 提供张量计算与 GPU 加速能力](https://opengraph.githubassets.com/91fabd6304a8ab28cbf4df1121a3002797af52570d406ff286ef9ba76eb874bd/pytorch/pytorch)

PyTorch 支持复用 NumPy、SciPy 和 Cython 等 Python 软件包进行扩展。

仓库主分支为 `main`，页面显示有 110,020 次提交、约 29.1k 个 Fork 和 103k 个 Star。

安装与构建说明覆盖 NVIDIA CUDA、AMD ROCm、Intel GPU、NVIDIA Jetson 及 Docker 镜像。

[查看原文](https://github.com/pytorch/pytorch)

---

## Google 发布 WeatherNext 3：号称最先进全球天气 AI 模型 {#news-2}

> **Google** 发布 **WeatherNext 3**，称其为目前最先进、最准确的全球天气人工智能模型，空间分辨率较此前版本提高五倍。该模型已集成到多项 Google 产品中。

![Google 发布 WeatherNext 3：号称最先进全球天气 AI 模型](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/WeatherNext3_Title.width-1300.png)

**WeatherNext 3** 引入实时卫星数据、每小时更新、更高空间分辨率、降水预测以及清洁能源相关变量。

模型可提供每小时的高分辨率天气预报，分辨率比此前版本提高五倍，并改进了降雨和降雪预测。

文章指出，局地且快速变化的天气预测此前仍是挑战，既有模型往往缺乏足够的空间分辨率。

该模型已集成到 **Google Search**、**Gemini**、**Google Maps**、Google Maps Platform 和 **Google Cloud**。

[查看原文](https://blog.google/innovation-and-ai/models-and-research/google-deepmind/introducing-weathernext-3/)

---

## vLLM在AMD GPU上测试五种推测解码方法 {#news-3}

> vLLM文章介绍了在AMD GPU上进行推测解码实验的方法，并比较五种推测草稿方案。实验使用ROCm平台，测试硬件包括AMD Instinct MI300X和MI355X。

![vLLM在AMD GPU上测试五种推测解码方法](https://vllm.ai/og?title=Exploring%20Speculative%20Decoding%20in%20vLLM%20on%20AMD%20GPUs&authors=AMD%20and%20Embedded%20LLM&date=2026-08-23&path=/blog)

推测解码让轻量级草稿组件先提出多个候选令牌，再由目标模型一次验证多个候选令牌。

当多个草稿令牌被接受时，系统可在一次目标模型验证步骤中提交多个输出令牌，同时保持目标模型的输出行为。

文章考察了原生MTP、Gemma 4 MTP、EAGLE-3、DFlash和DSpark五种方法。

实验显示，输出令牌吞吐量取决于草稿方法、提议长度、模型家族、草稿检查点、工作负载和令牌接受行为，不能概括为固定的性能提升。

[查看原文](https://vllm.ai/blog/2026-08-23-speculative-decoding-amd-gpus)

---

## GPT-6 Astra 无需人类干预，24 小时内独立通关《Portal》 {#news-4}

> 开发者 cozyblaze 让 `GPT-6 Astra` 在仅设定初始目标后独立通关益智游戏《Portal》，全程耗时约 24 小时，未获任何人类帮助。

![GPT-6 Astra 无需人类干预，24 小时内独立通关《Portal》](https://the-decoder.com/wp-content/uploads/2026/09/gpt6astra_portal.png)

`GPT-6 Astra` 在设定初始目标后完全独立完成《Portal》通关，耗时约 24 小时，过程中没有人类介入。

开发者 cozyblaze 已在 **GitHub** 上发布相关代码和文档，供外界查看实验细节。

cozyblaze 将 Astra 称为“我们将获得的最差模型”，以此描述该模型在其眼中的定位。

[查看原文](https://the-decoder.com/gpt-6-astra-beat-portal-start-to-finish-without-human-help-in-under-24-hours/)

---

## 评测编码代理：提示中加入测试技术能否提升正确性 {#news-5}

> Dan Luu 发文评估在提示中加入测试技术或测试库的简单指令，能否提高编码代理的实现正确性，覆盖 26 种提示条件，实现均使用 `Rust`。

评估复用了此前讨论过的 Zstd 实现测试，比较不同附加提示条件下代理的表现，所有实现均使用 `Rust`。

测试包含 26 个提示条件，涵盖测试驱动开发、形式化方法、模糊测试、属性测试、差分测试、变形测试及多种测试库和工具。

文章还测试了 4 项技能，包括官方 `Hegel` 技能、`ECC Rust` 测试技能、`Trail of Bits` 属性测试技能及作者自编的测试技能。

除 Zstd 外，作者还进行了包括 `IMAP RFC` 在内的其他评估。其预注册预测包括 TDD 可能表现较差、形式化方法或不优于其他条件。

需注意：作者明确表示对 TDD 和形式化方法的预测信心较低，且所提供正文在实验假设处截断，未包含完整评估结果。

[查看原文](https://danluu.com/agentic-testing/)

---

## OpenAI称AI代理已达“自动化研究实习生”目标 {#news-6}

> **OpenAI**称，其内部研究中的AI代理目前每名人类工作日可处理相当于3.1个人类工作日的工作量。公司表示，已实现打造“自动化研究实习生”的目标。

![OpenAI称AI代理已达“自动化研究实习生”目标](https://the-decoder.com/wp-content/uploads/2026/09/openai_gpt_6_stars_astra.png)

OpenAI未说明3.1个工作日这一数据的具体测量方法。

首席科学家Pachocki警告称，目前没有任何实验室对对齐和监控拥有足够把握。

他表示，现有对齐与监控能力不足以支持以最高速度持续扩大规模。

[查看原文](https://the-decoder.com/openai-reports-ai-research-interns-and-warns-about-its-own-pace-at-the-same-time/)

---

## Deer-Flow登GitHub热榜，支持长周期智能代理任务 {#news-7}

> **bytedance/deer-flow**登上GitHub Trending，定位为开源的长周期SuperAgent harness。项目描述称，它可执行研究、编程和创作任务。

该项目使用 Python 编写，当前获得 81,670 个 Stars，当天新增 188 个。

Deer-Flow借助沙箱、记忆、工具、技能、子代理和消息网关处理不同层级的任务。

项目描述称，其任务处理时长可从几分钟持续到数小时。

[查看原文](https://github.com/bytedance/deer-flow)

---

## Context-Mode登GitHub热榜，聚焦AI代理上下文优化 {#news-8}

> **mksglu/context-mode**登上GitHub Trending，面向AI编程代理进行上下文窗口优化。项目描述称，该工具可对工具输出进行沙箱处理。

该项目使用 TypeScript 编写，当前获得 20,516 个 Stars，当天新增 85 个。

项目描述称，Context-Mode可将工具输出减少 98%。

该工具支持[用户触发屏蔽词]会话记忆，并通过 MCP 和 hooks 在 17 个平台之间实施路由。

[查看原文](https://github.com/mksglu/context-mode)

---

## OpenAI skills 仓库标注已弃用，Codex 技能转向 Plugins {#news-9}

> OpenAI 公开的 `openai/skills` 仓库定位为 Codex 的技能目录，README 已标注项目弃用，建议改用 OpenAI Plugins 仓库获取当前技能与插件示例。仓库现有 25.9k Star。

![OpenAI skills 仓库标注已弃用，Codex 技能转向 Plugins](https://opengraph.githubassets.com/6e49eb47178cf3b27a190d05cdc4a16c083d9fdab91cd951bd8f65ce66e48182/openai/skills)

`Agent Skills` 是由指令、脚本和资源组成的文件夹，可供 AI 智能体发现并用于执行特定任务。

Codex 使用 skills 将团队和个人可重复完成的任务能力打包复用。

位于 `.system` 目录中的技能会自动安装在最新版本的 Codex 中，精选或实验性技能可通过 Codex 内的 `$skill-installer` 安装。

安装技能后需要重启 Codex 才能加载新技能。仓库页面显示 25.9k stars、1.7k forks 和 148 个 watchers。

[查看原文](https://github.com/openai/skills)

---

## MarkItDown支持多格式文档转Markdown {#news-10}

> **MarkItDown** 是一个轻量级 Python 工具，可将多种文件和办公文档转换为 Markdown，面向大语言模型和文本分析工具使用。

![MarkItDown支持多格式文档转Markdown](https://opengraph.githubassets.com/87e413a41e17a4daeb520b7124df6985855632c294b08c355593ad15c8c49fec/microsoft/markitdown)

该工具支持 PDF、PowerPoint、Word、Excel、图片、音频、HTML、CSV、JSON、XML、ZIP、YouTube URL 和 EPUB 等内容。

MarkItDown 侧重保留标题、列表、表格和链接等文档结构，要求使用 Python 3.10 或更高版本。

项目说明称，其输出通常具备较好的可读性，但不一定适合对人类用户要求高保真的文档转换场景。

工具执行 I/O 操作时使用当前进程权限；在不受信任环境中，项目建议先清理输入并使用范围更窄的转换函数。

[查看原文](https://github.com/microsoft/markitdown)

---

## AutoHedge 登 GitHub 热榜：群体智能加 AI 代理自动化交易 {#news-11}

> **The-Swarm-Corporation** 发布的 Python 项目 `AutoHedge` 声称利用群体智能和 AI 代理自动化市场分析、风险管理与交易执行。项目累计 5,046 颗 Star，当天新增 541 颗。

项目描述称，用户可用 `AutoHedge` 在几分钟内构建自动化对冲基金，覆盖市场分析、风险管理和交易执行环节。

该仓库为 Python 项目，当前累计 5,046 颗 Star，单日新增 541 颗，登上 GitHub 热门趋势。

需注意：提供内容未说明项目的实际投资表现、风险或合规情况，相关能力均以项目页面自述为准。

[查看原文](https://github.com/The-Swarm-Corporation/AutoHedge)

---

## 开源工具Hetty提供HTTP代理与安全研究能力 {#news-12}

> **Hetty** 是面向安全研究的信息安全工具包，目标是成为商业软件 Burp Suite Pro 的开源替代方案。

![开源工具Hetty提供HTTP代理与安全研究能力](https://repository-images.githubusercontent.com/222258954/97473f06-84ac-4fc6-ad06-6392a920ac97)

Hetty 提供带日志和高级搜索功能的中间人 HTTP 代理，支持手动创建或编辑请求，以及重放代理请求。

工具还支持拦截请求和响应进行人工审核，并提供范围管理、基于项目的数据库存储和网页管理界面。

Hetty 可通过 macOS Homebrew、Linux Snap、Windows Scoop、GitHub 发布包或 Docker 安装和运行。

启动后，Hetty 会运行带有中间人代理、GraphQL 服务和网页管理界面的 HTTP 服务器；项目仍在积极开发中。

[查看原文](https://github.com/dstotijn/hetty)

---

## aispace 开源客户端：为 AI agent 与人类提供临时文件安全共享 {#news-13}

> 开源项目 **aispace** 面向 AI agent 与人类提供安全临时文件共享，具备可脚本化 CLI、可过期链接与可选本地 age 加密。

![aispace 开源客户端：为 AI agent 与人类提供临时文件安全共享](https://opengraph.githubassets.com/9d5ff29b7857211553d98b8017a337b2b8f65c2dfd81c059174a52ff36a617be/aispace-sh/aispace-client)

该客户端支持文件过期、链接单独过期、链接撤销，以及可选的每个链接下载次数限制。

项目采用本地 `age` X25519 加密，解密身份不会发送到 aispace；自动化流程无需交互式提示。

支持流式上传、`stdin`、稳定退出码、结构化 JSON 输出与文档化错误，便于脚本与 agent 集成。

提供 **macOS**、**Linux** 和 **Windows** 的 amd64 与 arm64 二进制文件；可通过 `aispace login --key` 认证，用 `aispace upload` 上传文件。

需注意：托管服务由独立方运营，该仓库仅包含客户端、agent skill 与集成示例，不含服务器端代码。

[查看原文](https://github.com/aispace-sh/aispace-client)

---

## Google开源团队将赴布拉格参加开源峰会与嵌入式Linux大会 {#news-14}

> @opensource.google宣布，将参加10月7日至9日在布拉格举行的Open Source Summit与Embedded Linux Conference Europe。

![Google开源团队将赴布拉格参加开源峰会与嵌入式Linux大会](https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:x6bnzgic7duwjxogg7zb3qas/bafkreihsujvunzb57j4iixvnwisxbhe3s3uwghpibq3w5rvhwuozj5yhk4)

**Google开源团队**（@opensource.google）发帖表示，将参加Open Source Summit和Embedded Linux Conference Europe。

活动时间为10月7日至10月9日，地点在布拉格，帖子邀请用户注册并到场交流。

原帖未说明活动的具体年份，也未提供议程或参会人员的更多细节。

[查看原文](https://bsky.app/profile/opensource.google/post/3muwyacdfgs2e)

---

## 作者称开放权重模型压缩安全修复时间窗口 {#news-15}

> 文章称，随着 `GLM 5.3-flash` 发布，Project Glasswing 和 Daybreak 可用于修复科技行业安全问题的时间正在减少。相关模型能力、硬件价格与发布时间部分仍包含估计。

![作者称开放权重模型压缩安全修复时间窗口](https://jyn.dev/assets/pipebomb.png)

**Z.ai**（前身为 Zhipu AI）开发的 GLM 系列以开放权重形式发布，用户可以下载并运行。

文章称，**DeAlignAI** 发布了移除任务拒答机制的“abliterated”模型，其在 HarmBench-320 上的拒答得分为 0%。

文章称 `GLM 5.3-flash` 可在消费级硬件上本地运行；一个线上基准显示，其在约 6000 美元的 NVIDIA GPU 上达到约每秒 20 个 token。

文章还称苹果可能于 9 月 22 日发布配备 256 GB 统一内存的 M5 Mac Studio，预计起售价约为 9500 美元。

[查看原文](https://jyn.dev/a-year-to-fix-security/)

---

## 云端微型虚拟机支撑手机访问多款智能代理 {#news-16}

> 文章称，Claude Code、Instinct 和 Poke 等代理正从用户本地电脑迁移到云端，用户可通过手机使用这些代理。Claude Code 的云端环境基于 Firecracker 微型虚拟机。

该虚拟机是带有独立内核的 KVM 客户机，直接启动 Rust 编写的 init 程序。`process_api` 作为 PID 1 运行，负责挂载磁盘，并通过 vsock 端口 2024 接收主机控制。

Claude Code 的磁盘包括用户拥有的可写持久盘和平台拥有的只读共享盘，示例中用户磁盘 vda 容量为 256G。

文章称，324 MB 的 Bun harness 位于只读磁盘上，用于运行工具调用；模型推理通过 HTTPS/2 上的 Server-Sent Events 连接至 `/v1/messages`。

该环境没有入站网络连接，出站流量经过仅开放 443 端口的出口网关；认证使用主机签发、每次启动轮换的 OAuth token。

虚拟机空闲时可能被回收，但用户持久磁盘会保留，并在下一次冷启动时重新挂载。

[查看原文](https://rohanadwankar.github.io/posts/platforms.html)

---

## Voicebox让手机语音反馈成为客户意见新入口 {#news-17}

> **Voicebox**允许用户通过手机录制语音留言提交客户反馈，并自动转录后发送至企业仪表板。企业还可使用情感分析功能，并通过电子邮件跟进用户意见。

![Voicebox让手机语音反馈成为客户意见新入口](https://media.wired.com/photos/6a994fa2bf4e66136bddb432/191:100/w_1280,c_limit/HowYouReallyFeel.jpg)

用户可在商店扫描二维码或触碰NFC芯片，随后直接说出反馈内容。

Voicebox已与机场航站楼合作，收集旅客对卫生间整洁度、登机口指引等问题的反馈。

公司创始人兼CEO为Karan Gupta，他此前创办过安全转录语音应用Alice。

Voicebox近期推出directory功能，计划支持用户从任何地点发送反馈，并在未来查看其他人对特定企业的公开评价；原文相关介绍不完整。

[查看原文](https://www.wired.com/story/whispering-complaints-into-your-phone-may-be-the-future-of-customer-feedback/)

---

## 华为发布第三款三折手机Mate XT 2并加入隐私显示 {#news-18}

> **华为**已在中国发布第三款三折手机Mate XT 2，并采用增强隐私功能的显示屏。该机使用向内折叠形态，与三星Galaxy Z TriFold相同。

![华为发布第三款三折手机Mate XT 2并加入隐私显示](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/huawei-mate-xt-2-ultimate-design-design-2x.jpg?quality=90&strip=all&crop=0,0,100,100)

Mate XT 2采用向内折叠设计，是首款配备此类隐私显示屏的折叠屏手机。

三星今年已在Galaxy S26 Ultra上加入类似的隐私显示功能。

第一代Mate XT于2024年末在中国上市，数月后进入国际市场。其采用类似手风琴的折叠设计，无需额外外屏，但折叠屏部分区域会长期暴露在外。

目前提供的信息未包含Mate XT 2的完整规格、价格和上市安排。

[查看原文](https://www.theverge.com/tech/990958/huawei-mate-xt-2-trifold-launch-china-privacy-display)

---

## Arm发布Mali G2-Ultra NX：面向移动图形的AI原生GPU {#news-19}

> **Arm**在其文章中介绍了Mali G2-Ultra NX GPU，称其配备专用神经加速器、新执行引擎和第三代光线追踪单元。Arm将其称为首款AI原生Mali GPU。

![Arm发布Mali G2-Ultra NX：面向移动图形的AI原生GPU](https://newsroom.arm.com/wp-content/uploads/2026/09/Arm-Newsroom-AI-native-graphics-image-1600x900-1.jpg)

Mali G2-Ultra NX将神经加速直接集成到图形管线，并紧密连接神经加速器与着色器核心。

该设计复用GPU内存系统、一致性缓存和控制结构，旨在减少数据移动。

Arm介绍了三项神经图形技术：神经超采样（NSS）、神经帧率提升（NFRU），以及神经超采样与降噪（NSSD）。

其中，NSS可根据较低分辨率渲染结果重建高分辨率图像；NSSD将神经升频与降噪结合，用于改善光线追踪场景的图像质量。原文对NFRU的说明不完整。

Arm表示，其Mali GPU累计出货量已超过140亿颗。

[查看原文](https://newsroom.arm.com/blog/arm-mali-g2-ultra-nx-ai-native-mobile-graphics)

---

## EcoFlow 发布第四代 River 便携电源，更小体型采用 LFP 电池 {#news-20}

> **EcoFlow** 推出第四代 River 系列便携电源，`River 260 Gen4` 与 `River 520 Gen4` 分别配备 256Wh 与 512Wh 电池，均采用 LFP 电池化学体系。

![EcoFlow 发布第四代 River 便携电源，更小体型采用 LFP 电池](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/IFA_R4_0.3kWh_Outdoor.jpg?quality=90&strip=all&crop=0,0,100,100)

按文章说法，256Wh 与 512Wh 电池储存的能量分别约为最大航空批准型充电宝的 2.5 倍和 5 倍；文章称 LFP 体系寿命更长且稳定性更高。

`River 260 Gen4` 配备 4 个 USB 接口和 1 个交流电源插座，最大持续输出功率 300W。

文章后段将大容量型号写作 `River 500 Gen4`，称其 USB 接口配置与 260 版相同并配备 2 个交流插座，与前文 `River 520 Gen4` 的型号表述存在不一致。

[查看原文](https://www.theverge.com/science/991033/ecoflow-makes-the-miniature-power-station-even-smaller)

---

## 时隔六年：索尼发布 WH-1000XM4C 复刻经典降噪耳机 {#news-21}

> 索尼发布 `WH-1000XM4C` 耳机，作为 2020 年经典款 WH-1000XM4 的回归版本，外观基本相同并带来小幅改进。新机新增薰衣草色选项。

![时隔六年：索尼发布 WH-1000XM4C 复刻经典降噪耳机](https://platform.theverge.com/wp-content/uploads/sites/2/2026/09/sony-wh-1000xm4c-headphones-comparison.jpg?quality=90&strip=all&crop=0,0,100,100)

原版 **WH-1000XM4** 于 2020 年秋季发布，文章称其凭借音质、降噪表现和紧凑尺寸长期位居优秀耳机榜单前列。

`WH-1000XM4C` 保留了原版的铰链设计和折叠能力，外观与原版基本相同，主要变化是新增薰衣草色选项。

索尼在 2022 年发布 XM5 时采用了不同于 XM4 的设计，此次回归 XM4 设计路线形成对比。

[查看原文](https://www.theverge.com/tech/990687/sony-announces-xm4c-headphones)

---

## Mistral完成30亿欧元融资估值超210亿欧元 {#news-22}

> **Mistral**宣布完成30亿欧元D轮融资，投后估值超过210亿欧元。公司称，该轮融资是欧洲科技公司迄今最大规模的股权融资。

![Mistral完成30亿欧元融资估值超210亿欧元](https://mistral.ai/cms-media/api/media/file/fundraise.jpg)

本轮融资由三星电子领投，Scaleup Europe Fund（由EQT管理）和现有投资者PSG Equity共同领投。

**Mistral**目前在20个国家开展业务，为超过125家全球企业提供关键任务AI转型支持。

其客户包括空中客车、ASML和汇丰银行；此前C轮融资由ASML领投，本轮则由三星电子领投。

公司将其技术栈定位为“主权AI层”，强调对数据、模型、算力和生产系统四个维度保持控制权。

[查看原文](https://mistral.ai/news/mistral-makes-sovereign-open-weight-ai-to-frontier/)

---

## 32亿美元AI数据中心起火，复杂公司结构引发问责难题 {#news-23}

> 纽约州萨默塞特**Lake Mariner**数据中心一栋未完工建筑6月初起火，据报道现场无正常警报、无灭火系统且消防栓失效。该项目由**TeraWulf**持有，**Google**持有认股权证，**Anthropic**是目标客户之一。

6月初，纽约州萨默塞特**Lake Mariner**数据中心一栋尚未完工的建筑发生火灾。据报道，消防人员发现现场没有正常工作的警报器、没有灭火系统，并有三个失效的消防栓。

Barker消防部门负责人Steve Matisz表示，消防人员在不清楚相关化学品身份的情况下进入建筑，浓重黑烟严重影响现场能见度。

该园区投资32亿美元，是纽约州规模较大的AI数据中心建设项目之一，坐落于安大略湖畔一座 former 煤矿旧址。

**TeraWulf**拥有并运营该中心，土地由其首席执行官旗下公司出租；**Fluidstack**将负责运营，**Google**持有未来获得14%股权的认股权证并担保租赁付款，**Anthropic**是其所服务的AI公司之一。

据报道安全文件在火灾中烧毁，该说法尚未得到明确确认，Steve Matisz也表示不确定如何看待这一表述。

[查看原文](https://arstechnica.com/ai/2026/09/the-ai-data-center-boom-is-causing-new-accountability-problems/)

---

## Similarweb：ChatGPT流量份额回升至55.5%，Gemini短暂回暖消退 {#news-24}

> Similarweb数据显示，ChatGPT在AI聊天机器人网站流量中的份额回升至55.5%，Gemini此前的短暂回暖有所消退。

![Similarweb：ChatGPT流量份额回升至55.5%，Gemini短暂回暖消退](https://the-decoder.com/wp-content/uploads/2025/05/chatgpt_website_stats.png)

据Similarweb统计，**ChatGPT**在人工智能聊天机器人网站流量中的份额回升至55.5%。

与去年同期相比，ChatGPT的领先幅度已从73.3%大幅收窄，竞争格局出现变化。

**Gemini**的流量份额同比翻倍，**Claude**的份额同比增长近五倍。

需要注意的是，该统计仅覆盖网站流量，不包括移动应用和桌面客户端数据。

[查看原文](https://the-decoder.com/chatgpt-claws-back-web-traffic-share-to-55-5-percent-as-geminis-brief-comeback-fades/)


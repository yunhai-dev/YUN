---
title: 科技早报 2026-11-06
category: "科技, 科技早报"
excerpt: 腾讯Hy4、百度ERNIE 5.5 Flash Base与OpenAI网络安全模型相继发布，Alpine Linux披露OpenSSH认证绕过漏洞。
lastEdited: 2026年11月6日
tags: [人工智能, 腾讯, 百度, OpenAI, 开源模型, 网络安全, OpenSSH, GitHub]
imageUrl: 
---

## 概览

### AI 与机器学习

- [腾讯发布Hy4模型，新增视觉理解与计算机使用能力](#news-1)
- [OpenAI发布网络安全模型并披露漏洞发现进展](#news-2)
- [OpenAI发布GPT-6 Cyber：可发现漏洞并提出修复方案](#news-3)
- [百度开源2800亿参数ERNIE 5.5 Flash Base模型](#news-4)
- [百度发布 `ERNIE-5.5-Flash-Base` 稀疏混合专家模型](#news-5)
- [Google Gemini Omni 1.2 Flash支持生成15秒视频](#news-6)
### GitHub 热门项目

- [Stroq开源本地审计编程智能体行为与密钥风险](#news-7)
- [Scenario Labs推出面向生产的多模态内容代理技能](#news-8)
- [Rust 开源 WhatsApp 客户端 ZapFast 登上 GitHub 热门](#news-9)
- [Rust 项目 voxl 实现浏览器低延迟桌面流式传输](#news-10)
- [Terraform AzureRM Provider支持Azure资源管理](#news-11)
- [Immich 提供自托管照片视频管理与智能搜索](#news-12)
### 开源生态

- [Google 开源 XLA Serving Engine 支持多平台模型服务](#news-13)
- [三款C与Rust极简浏览器更新网页标准支持](#news-14)
- [OpenTelemetry JavaScript三种遥测信号正式稳定](#news-15)
- [Google将Agent Substrate与gVisor捐赠给CNCF](#news-16)
### 开发者工具

- [MCP Explained页面梳理模型上下文协议课程与规范](#news-17)
### 安全与隐私

- [Alpine Linux警告OpenSSH密码认证绕过漏洞](#news-18)
- [约十年OpenSSH与musl漏洞可让部分Linux设备免密登录](#news-19)
- [美国政府警告联网制冷系统面临持续网络威胁](#news-20)
- [GitHub推迟默认阻止`pull_request_target`工作流至12月2日](#news-21)
### 产品与平台

- [Discord 将放弃 Electron 并全面迁移至 Rust](#news-22)
- [Serve Robotics推出机器人物理AI服务业务](#news-23)
- [微软推出新版Xbox应用并加速云游戏界面更新](#news-24)
---

## 腾讯发布Hy4模型，新增视觉理解与计算机使用能力 {#news-1}

> **腾讯**宣布发布新一代大语言模型Tencent Hy4，并称其跻身全球领先的开源人工智能模型之列。模型权重和系统卡计划于未来几天发布。

![腾讯发布Hy4模型，新增视觉理解与计算机使用能力](https://www.tencent.com/wp-content/uploads/2026/11/H4_thumbnail_4x3-1.png)

Hy4首次加入视觉理解能力，并改进指令遵循、长上下文理解和长时程智能体任务能力。

该模型支持细粒度图像处理、复杂图表分析和数学视觉推理等任务。

Hy4首次加入计算机使用能力，可与命令行界面和图形用户界面交互，并接受Blender、CAD等软件专项训练。

在腾讯WorkBuddy评测中，Hy4平均表现得分为83.18%，通过率为96.15%，并在中国大陆12个场景中的9个排名第一。

[查看原文](https://www.tencent.com/tencent-launches-hy4-joining-the-ranks-of-the-worlds-leading-open-source-ai-models/)

---

## OpenAI发布网络安全模型并披露漏洞发现进展 {#news-2}

> OpenAI宣布面向网络安全的ChatGPT Cyber模型，并披露其AI工具发现Linux内核及Firefox漏洞的情况。与此同时，一名研究者使用GPT 5.6 Sol发现了一个可能影响Ubuntu服务器的严重漏洞。

![OpenAI发布网络安全模型并披露漏洞发现进展](https://techcrunch.com/wp-content/uploads/2026/08/openai-daybreak.jpg?resize=1200,798)

Charge Robotics首席技术官兼联合创始人Max Justicz通过OpenAI的Daybreak Blue项目使用GPT 5.6 Sol发现该漏洞。

Justicz将问题报告给Debian项目，后者随后发布了修复补丁。截至文章所述时间，没有已知证据表明该漏洞已被利用。

OpenAI称，ChatGPT Cyber曾帮助扫描并准备Linux内核漏洞补丁，发现948个潜在问题，并在Firefox中发现81个“新颖”漏洞。

OpenAI表示，ChatGPT Cyber将向Daybreak Red网络安全项目中最高级别的用户开放。Justicz称其个人相关订阅费和令牌费用约为5000美元。

[查看原文](https://techcrunch.com/2026/11/05/openai-released-a-new-cybersecurity-model-is-that-enough/)

---

## OpenAI发布GPT-6 Cyber：可发现漏洞并提出修复方案 {#news-3}

> **OpenAI**推出GPT-6 Cyber，用于发现软件安全漏洞、开发漏洞利用程序并提出补丁建议。关于其发现和开发数量的相关数据，均为OpenAI方面的说法。

![OpenAI发布GPT-6 Cyber：可发现漏洞并提出修复方案](https://the-decoder.com/wp-content/uploads/2026/11/openai_cybersecurity.png)

据OpenAI称，GPT-6 Cyber已在Firefox中发现81个此前未知的漏洞。

据OpenAI称，该模型还为Linux内核开发出948个可运行的漏洞利用程序。

该模型同时具备寻找漏洞、开发利用程序和建议修复方案的用途。文章称，其相关表现显著超过前代模型。

[查看原文](https://the-decoder.com/openais-gpt-6-cyber-can-both-break-into-systems-and-propose-how-to-fix-them/)

---

## 百度开源2800亿参数ERNIE 5.5 Flash Base模型 {#news-4}

> 百度发布开放源代码基础模型`ERNIE 5.5 Flash Base`。该模型采用混合专家架构，拥有2800亿参数，并使用33.5万亿个词元完成预训练。

![百度开源2800亿参数ERNIE 5.5 Flash Base模型](https://the-decoder.com/wp-content/uploads/2026/11/ernie_logo.png)

`ERNIE 5.5 Flash Base`发布时尚未进行微调，开发者可以根据自身需求使用和调整该模型。

该模型定位为开放源代码基础模型，百度此次公布了其参数规模和预训练词元数量。

[查看原文](https://the-decoder.com/baidu-releases-ernie-5-5-flash-base-with-280-billion-parameters-as-an-open-source-foundation-model/)

---

## 百度发布 `ERNIE-5.5-Flash-Base` 稀疏混合专家模型 {#news-5}

> 百度于2026年11月5日发布 `ERNIE-5.5-Flash-Base`，这是一款总参数量2800亿的稀疏混合专家语言模型。

![百度发布 `ERNIE-5.5-Flash-Base` 稀疏混合专家模型](https://ernie.baidu.com/assets/wenxin-mark.svg)

该模型每个令牌激活140亿参数，使用33.5万亿个令牌从零开始预训练。训练上下文长度最高为128K，并支持最高1M令牌的微调和推理上下文。

此次发布的权重是预训练结束时的检查点，尚未经过中期训练或后训练，可用于领域适配、指令微调和强化学习研究。

模型采用稀疏MoE与混合稀疏注意力架构，以平衡模型容量、激活计算量和长上下文成本。

[查看原文](https://ernie.baidu.com/release/ernie-5-5-flash-base/)

---

## Google Gemini Omni 1.2 Flash支持生成15秒视频 {#news-6}

> **Google DeepMind**宣布 `Gemini Omni 1.2 Flash` 正式提供使用，可生成最长15秒的视频片段。该模型还支持通过对话逐步编辑视频。

![Google Gemini Omni 1.2 Flash支持生成15秒视频](https://the-decoder.com/wp-content/uploads/2026/10/gemini_4_logo_wall.png)

`Gemini Omni 1.2 Flash`生成720p视频的价格为每秒0.07美元，较前代产品降低30%。

用户可以先以低分辨率生成视频，再仅对最终结果进行放大，以进一步节省成本。

[查看原文](https://the-decoder.com/googles-gemini-omni-1-2-flash-stretches-ai-video-clips-to-15-seconds-and-cuts-pricing-by-30-percent/)

---

## Stroq开源本地审计编程智能体行为与密钥风险 {#news-7}

> 开源项目**Stroq**读取用户自己的Claude Code和Codex会话，审计智能体读取的文本及离开设备的密钥，并称不会发送数据。

![Stroq开源本地审计编程智能体行为与密钥风险](https://repository-images.githubusercontent.com/1356786315/48fcff41-50bf-4992-bc12-087ec7b651e7)

Stroq默认读取最近30天的会话、密钥文件和智能体工作目录，只打印密钥名称，并在`~/.stroq`写入小型缓存。

项目支持Claude Code、Cursor和Codex CLI等工具，提供`npx @stroq/cli`、`init`、`why`、`attack`和`uninstall`命令。

其钩子会在工具调用执行前进行判断，可阻止`curl | sh`及携带设备已知秘密的出站调用。

Stroq需要Node.js 22或更高版本，采用Apache-2.0许可证；项目演示使用虚构环境，未执行实际操作。

[查看原文](https://github.com/AGGIB/Stroq)

---

## Scenario Labs推出面向生产的多模态内容代理技能 {#news-8}

> GitHub Trending上的 Python 项目 **scenario-labs/skills**，旨在通过 Scenario MCP 让 AI 代理生成可用于生产的图像、视频、音频和 3D 内容。

项目页面记录显示，该项目拥有 2725 颗 Stars，当天新增 224 颗。

项目支持选择合适模型、在消费前预估价格，并帮助保持角色和品牌一致性。

此外，项目还提供可驱动 Blender、Maya、ZBrush、Unreal 和 Unity 的专家团队。

[查看原文](https://github.com/scenario-labs/skills)

---

## Rust 开源 WhatsApp 客户端 ZapFast 登上 GitHub 热门 {#news-9}

> **ZapFast** 是一款使用 Rust 编写的 WhatsApp 桌面客户端，支持 Linux、macOS 和 Windows，且不依赖浏览器引擎。

![Rust 开源 WhatsApp 客户端 ZapFast 登上 GitHub 热门](https://repository-images.githubusercontent.com/1350713137/51d132b5-ac5f-4382-ad0a-2720c41f2a60)

ZapFast 基于 `egui` 和 `fastframe`，通过 `whatsapp-rust` 作为伴侣设备连接用户手机。

项目 README 称，在其 Linux 测试中，ZapFast 启动时间不到一秒，空闲内存占用约为 200 MB。

README 同时称，WhatsApp Web 的内存占用为 1.13 GB。客户端支持消息编辑、回复、反应、文件、贴纸、GIF、投票和语音消息等功能。

ZapFast 提供英文、简体中文、繁体中文、法文、德文等多种界面语言。

[查看原文](https://github.com/crmne/zapfast)

---

## Rust 项目 voxl 实现浏览器低延迟桌面流式传输 {#news-10}

> 开源项目 **voxl** 使用 Rust 编写，可将多种桌面画面以 H.264 格式通过 WebSocket 传输到网页客户端。原文基准测试显示，其在特定测试环境下平均达到 60 FPS。

![Rust 项目 voxl 实现浏览器低延迟桌面流式传输](https://repository-images.githubusercontent.com/1273845951/8278b4bf-c6c0-4b03-a342-be6d83ed3ec4)

**voxl** 支持传输 X11 显示器、Mac 屏幕和 Windows 桌面，网页端使用 WebCodecs 解码。

项目还支持输入、剪贴板、音频、麦克风、文件和文件夹传输，以及动态分辨率。

快速开始示例使用 `cargo install voxl-server` 安装服务端，并通过 `DISPLAY=:1` 流式传输显示器 :1。

原文测试中位延迟为 12 至 99 毫秒；数据基于特定硬件、网络条件和工作负载，不能代表所有环境。

[查看原文](https://github.com/tembo/voxl)

---

## Terraform AzureRM Provider支持Azure资源管理 {#news-11}

> **hashicorp/terraform-provider-azurerm** 是用于 Azure Resource Manager 的 Terraform Provider，可用于管理 Azure Resource Manager 中的资源。

![Terraform AzureRM Provider支持Azure资源管理](https://opengraph.githubassets.com/5ad3fc8149e8e0311adbbe5b899689fe2a8d7f1f07daa530e5b79623f8d87296/hashicorp/terraform-provider-azurerm)

原文建议使用 AzureRM Provider `5.0` 版本时，搭配 Terraform Core 的最新版本；具体版本未在原文列出。

AzureRM Provider 支持通过 Azure CLI、托管身份和服务主体进行身份验证。

仓库示例展示了 AzureRM Provider 的配置，以及资源组和虚拟网络的创建。该页面显示仓库包含 35,791 次提交。

[查看原文](https://github.com/hashicorp/terraform-provider-azurerm)

---

## Immich 提供自托管照片视频管理与智能搜索 {#news-12}

> 开源项目 **immich** 定位为高性能、自托管的照片和视频管理解决方案，提供移动端与 Web 端应用。项目支持多种媒体管理、搜索和分享功能。

![Immich 提供自托管照片视频管理与智能搜索](https://repository-images.githubusercontent.com/455229168/ebba3238-9ef5-4891-ad58-a3b0223b12bd)

**immich** 支持上传和查看照片与视频、自动备份、相册管理以及多用户使用。

项目可按元数据、对象、人脸和 CLIP 进行搜索，并支持 RAW、EXIF 和地图元数据。

功能还包括 OAuth、公共分享、合作伙伴分享、人脸识别与聚类等。

原文提醒用户为重要照片和视频遵循 3-2-1 备份计划。

[查看原文](https://github.com/immich-app/immich)

---

## Google 开源 XLA Serving Engine 支持多平台模型服务 {#news-13}

> Google 开源了 XLA Serving Engine（XSE），这是一个使用 C++ 编写的运行时，用于服务导出为 StableHLO 的 JAX 模型。

XSE 支持在 Cloud TPU、GPU 和 CPU 上提供模型服务。

该 Bluesky 帖文声称，XSE 的吞吐量是纯 Python 服务端的 2 至 5 倍。

帖文未提供这一对比结果的测试条件或测量细节。

[查看原文](https://bsky.app/profile/opensource.google/post/3mzkuwql2jy2t)

---

## 三款C与Rust极简浏览器更新网页标准支持 {#news-14}

> 开源项目推出基于C和Rust的极简浏览器，重点支持HTML与CSS标准。项目页面显示，**Nordstjernen**相关HTML、DOM和URL子测试通过率为91.5%。

![三款C与Rust极简浏览器更新网页标准支持](https://www.nordstjernen.org/screenshots/northstar-1-0-20.png)

**Nordstjernen**从头开始使用C语言编写，可运行于Windows、macOS和Linux，并提供多个其他平台构建版本。

其Sol 1.0.40支持Shared Web Workers、ElementInternals、弹出窗口通信，以及通过GStreamer进行多种视频硬件解码。

Northstar Browser 1.0.20加入FontFace API支持、YouTube和Media Source修复，并包含多项安全修复。

Southstar Browser 1.0.6是Nordstjernen的Rust版本，在Windows上通过Media Foundation支持MP4和H.264播放。

项目称其采用每个标签页独立沙箱渲染进程，JavaScript和WebAssembly引擎均不使用JIT；兼容性数据为项目方自述。

[查看原文](https://nordstjernen.org/)

---

## OpenTelemetry JavaScript三种遥测信号正式稳定 {#news-15}

> **OpenTelemetry JavaScript**的三种遥测信号现已达到稳定状态。其 `SDK 3.0`同时支持 ESM 和 CommonJS 双重导出。

**OpenTelemetry SDK 3.0**提供了对复杂属性的部分支持。

该版本还简化了追踪 SDK，进一步调整了 JavaScript 开发者的使用方式。

[查看原文](https://bsky.app/profile/opentelemetry.io/post/3mzldn2qftm2d)

---

## Google将Agent Substrate与gVisor捐赠给CNCF {#news-16}

> Google已将**Agent Substrate**和**gVisor**捐赠给云原生计算基金会（CNCF）。Google称，AI智能体需要在长时间空闲后实现亚秒级唤醒。

![Google将Agent Substrate与gVisor捐赠给CNCF](https://cdn.bsky.app/img/feed_thumbnail/plain/did:plc:x6bnzgic7duwjxogg7zb3qas/bafkreif4ebct7ccgdg3qm3ervugrt2reouyythhrhnistnomvyt4pqexn4)

Google称，AI智能体有90%至95%的时间处于等待模型响应的空闲状态，但仍需要亚秒级唤醒。

**Agent Substrate**用于在**Google Kubernetes Engine（GKE）**上编排有状态智能体。

Google邀请相关人员在北美KubeCon期间了解Agent Substrate。

[查看原文](https://bsky.app/profile/opensource.google/post/3mzldzkyep522)

---

## MCP Explained页面梳理模型上下文协议课程与规范 {#news-17}

> “MCP Explained”页面介绍了Model Context Protocol，并列出相关课程与规范内容。页面包含版本、网络和消息流等条目。

![MCP Explained页面梳理模型上下文协议课程与规范](https://mcp-explained.com/og.png)

页面列出了Model Context Protocol及其课程（Lessons）和规范（Spec）相关内容。

导航或页面内容包含Spec version、Network、Sequence、Message flow和Step等条目。

页面还包含“Reset”条目。

[查看原文](https://mcp-explained.com/)

---

## Alpine Linux警告OpenSSH密码认证绕过漏洞 {#news-18}

> **Alpine Linux** 发布公告称，特定配置下的 `openssh-server` 存在密码认证绕过漏洞。运行 `sshd` 的用户应立即更新软件包并重启服务。

![Alpine Linux警告OpenSSH密码认证绕过漏洞](https://alpinelinux.org/alpinelinux-logo.svg)

攻击者在可访问 SSH 端口、目标账户密码字段为 `*`，且系统存在 `$5$` 或 `$6$` 哈希账户时，可能利用超长密码登录。

受影响配置包括未启用 PAM 构建的 `openssh-server`，以及设置 `UsePAM no` 且 `PasswordAuthentication yes` 的系统。

如果暂时无法更新，可将 `PasswordAuthentication` 设置为 `no`，并重启 `sshd`。仅升级软件包而不重启服务，无法替换正在运行的程序。

公告称 Alpine 3.16 至 3.24 及 `edge` 均受影响；撰写时尚未分配 CVE 编号，修复版本信息也未完整列出。

[查看原文](https://alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass/)

---

## 约十年OpenSSH与musl漏洞可让部分Linux设备免密登录 {#news-19}

> 部分配置的Alpine Linux设备受到一个存在约十年的漏洞影响，攻击者可能无需密码登录设备。该问题源于OpenSSH与musl之间的交互。

**Alpine Linux**使用轻量级libc替代方案**musl**，而使用musl的**OpenSSH**无法同时启用PAM。PAM负责用户身份验证和账户访问检查。

成功利用该漏洞还需要系统至少存在一个可通过SHA256或SHA512密码哈希访问的用户账户。

目标账户还必须在`/etc/shadow`的密码字段中填写“*”，被配置为无密码账户。

文章称，若其他平台采用相同配置，也可能受到影响，但目前未确认具体范围。

[查看原文](https://arstechnica.com/security/2026/11/vulnerability-allows-attackers-to-log-into-some-linux-devices-sans-password/)

---

## 美国政府警告联网制冷系统面临持续网络威胁 {#news-20}

> 美国政府发布联合声明，警告针对工业制冷设备和冷链监控系统的“持续性网络威胁”。相关攻击据称已影响食品、农业、交通和药品运输等关键基础设施领域。

![美国政府警告联网制冷系统面临持续网络威胁](https://techcrunch.com/wp-content/uploads/2026/11/freezer-hacks-2299339780.jpg?resize=1200,800)

CISA、FBI及其他联邦部门称，黑客正攻击并控制杂货店和冷库设施中的联网制冷与冷链监控系统。

攻击者若成功，可能改变设备温度，带来火灾风险、库存损失以及设备使用寿命变化等物理影响。

英国和欧洲多个国家近期发生多轮攻击，至少十几个国家的冷冻和冷藏设备温度被调高，造成食品和农产品损毁。

美国国防部正在调查针对军方运营冷冻设备的攻击。美国政府尚未将攻击归因于特定组织或政府。

相关部门建议将远程控制系统移出互联网、强化密码、及时安装补丁，并淘汰供应商不再支持的设备。

[查看原文](https://techcrunch.com/2026/11/05/u-s-government-warns-of-ongoing-cyber-threat-amid-mass-hacks-of-industrial-retail-and-military-freezers/)

---

## GitHub推迟默认阻止`pull_request_target`工作流至12月2日 {#news-21}

> **GitHub**将默认阻止`pull_request_target`工作流的时间推迟到12月2日。该变更旨在收紧安全控制，但可能影响部分开源自动化流程。

此次变更涉及GitHub对`pull_request_target`工作流的默认安全策略调整。

Socket.dev表示，维护者需要了解这一变更及其可能带来的影响。

文章称，该调整可能干扰合法的开源软件自动化流程，但未说明具体受影响项目或最终范围。

[查看原文](https://bsky.app/profile/socket.dev/post/3mzlpormax22k)

---

## Discord 将放弃 Electron 并全面迁移至 Rust {#news-22}

> Discord 正在放弃用于构建跨平台桌面应用的 Electron 框架，并表示桌面应用将全面迁移到 Rust。迁移完成后，客户端也将移除 Electron 和 React Native。

![Discord 将放弃 Electron 并全面迁移至 Rust](https://platform.theverge.com/wp-content/uploads/sites/2/2025/03/acastro_STK062_01.jpg?quality=90&strip=all&crop=0,0,100,100)

Discord 首席技术官 Stanislav Vishnevskiy 表示，公司自 2018 年起一直采用 Rust。

目前 Discord 的基础设施、语音技术和部分现有客户端已经使用 Rust。

文章称，迁移完成后 Discord 客户端将不再使用 Electron，React Native 也将被移除。

[查看原文](https://www.theverge.com/news/1027379/discord-ditching-electron-web-app)

---

## Serve Robotics推出机器人物理AI服务业务 {#news-23}

> **Serve Robotics**宣布推出Physical AI Services业务，向其他机器人公司提供连接和数据工具。公司称，**Bedrock Robotics**已成为该业务客户，并正与**T-Mobile**合作推进边缘计算。

![Serve Robotics推出机器人物理AI服务业务](https://techcrunch.com/wp-content/uploads/2023/08/Serve_robot_05.jpg?resize=1200,800)

Physical AI Services包括Serve Link、数据整理工具，以及基于Serve人行道机器人构建的现实世界基础模型数据目录。

Serve Link可将现场机器人连接至数据中心的人工智能系统，使客户无需在机器人端部署全部计算能力，也可能使用更强大的模型。

Serve Robotics目前生产人行道配送机器人和医院机器人。其配送业务正从Uber扩展至DoorDash、Wonder等合作伙伴。

文中未披露Bedrock Robotics的合作规模或商业条款，原文结尾处有所截断。

[查看原文](https://techcrunch.com/2026/11/05/serve-robotics-launches-new-business-to-become-the-aws-for-robots/)

---

## 微软推出新版Xbox应用并加速云游戏界面更新 {#news-24}

> 微软正在推出重新设计的 **Xbox PC 应用**，其启动速度据称最高提升 60%。更新后的云游戏界面将在未来几周陆续推出。

![微软推出新版Xbox应用并加速云游戏界面更新](https://platform.theverge.com/wp-content/uploads/sites/2/2026/11/ApplicationFrameHost_463qT9deYw.jpg?quality=90&strip=all&crop=0,0,100,100)

新版 Xbox PC 应用采用重新设计的界面，并对 Windows 体验进行了简化，使其更接近 Xbox 主机。

Xbox Insiders 当天即可开始测试更新后的 PC 应用。

更新后的 **Xbox Cloud Gaming** 界面将在未来几周覆盖网页和智能电视等使用场景。

“最高快 60%”是微软对启动速度的表述，具体提升幅度可能因用户或场景而异。

[查看原文](https://www.theverge.com/news/1027353/microsoft-new-xbox-pc-app-redesign)


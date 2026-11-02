---
title: 科技早报 2026-11-02
category: "科技, 科技早报"
excerpt: Google密集推进AI训练、智能体评估与边缘推理，GitHub开源项目和Binance安全事件引发关注。
lastEdited: 2026年11月2日
tags: [科技早报, Google, 智能体, 边缘AI, GitHub, 开源项目, 网络安全]
imageUrl: 
---

## 概览

### AI 与机器学习

- [TorchTPU接入TorchTitan以优化TPU模型训练](#news-1)
- [Google Play服务集成LiteRT助力应用缩小与GPU推理](#news-2)
- [Google发布多轮AI智能体持续评估指南](#news-3)
- [Google更新A2UI支持可切换推理格式](#news-4)
- [Google与CopilotKit介绍A2UI生成式界面应用构建方案](#news-5)
- [Google指南介绍使用ADK构建不中断语音代理](#news-6)
### GitHub 热门项目

- [开源项目 AiSOC 支持大模型代理分诊与安全调查](#news-7)
- [GitHub 热门项目 FreeToken 将数据中心模型服务带到桌面](#news-8)
- [Kornia 提供基于 PyTorch 的可微分视觉算子](#news-9)
- [GitHub热门项目：Hex提供本地语音听写工具](#news-10)
- [GitHub 热门项目 ezBookkeeping 支持自托管](#news-11)
- [GitHub 热门项目 Xray-core 获超四万二千颗星](#news-12)
### 开发者工具

- [Google Agents CLI引入持续评估循环改进智能体质量](#news-13)
- [Google API Gateway新增流式传输支持面向实时与AI应用](#news-14)
### 安全与隐私

- [Binance 遭遇 63 亿美元盗窃后分阶段恢复取款](#news-15)
### 产品与平台

- [Google Docs与Drive原生支持Markdown文件协作](#news-16)
### 硬件与芯片

- [Google开源Coral NPU架构推动边缘AI部署](#news-17)
### 科技行业动态

- [Google DevFest 2026将全球举办超800场活动](#news-18)
- [GitHub Game Off 2026公布主题：SHIFT贯穿整个11月](#news-19)
- [AI高管谈人工智能便利生活引发脱节争议](#news-20)
### 前瞻与传闻

- [Trucks VC称自动驾驶初创或迎更大浪潮](#news-21)
- [NASA 面向商业航天征集方案延长哈勃寿命](#news-22)
- [Apple HomeView或将支持安全摄像头功能](#news-23)
---

## TorchTPU接入TorchTitan以优化TPU模型训练 {#news-1}

> Google介绍了将 **TorchTPU** 集成到 **TorchTitan** 的方案，为在 Google Cloud TPU 上训练大规模模型提供 PyTorch 原生后端支持。

TorchTPU 将原生的 `torch.device("tpu")` 后端直接集成到 PyTorch，开发者无需将代码重写为 JAX。

TorchTitan TPU 分支提供 SimpleFSDP、Graph Trainer 和自定义 Pallas 内核等扩展。

这些扩展面向密集架构和混合专家（MoE）架构，并用于实现较高的模型浮点利用率（MFU）。

开发者还可以使用相关优化方案、配方和 Hugging Face 建模后端，在 TPU 基础设施上扩展工作负载。

[查看原文](https://developers.googleblog.com/integrating-torchtpu-into-torchtitan-and-optimizing-models-for-tpu/)

---

## Google Play服务集成LiteRT助力应用缩小与GPU推理 {#news-2}

> Google Play services中的LiteRT新增GPU推理能力，并结合新的`CompiledModel API`提升推理性能。开发者切换运行时后，应用体积预计可减少约8 MB。

此次GPU推理由ML Drift提供支持，性能结合新的`CompiledModel API`后约提升至原来的1.4倍。

开发者从应用内置二进制文件切换后，应用体积可减少约8 MB。

Google Play services中的运行时更新可在数十亿台设备上自动进行。

开发者可更新依赖项，并使用Android Studio LiteRT skill进行自动迁移。

[查看原文](https://developers.googleblog.com/smaller-apps-and-faster-gpu-inference-with-litert-in-google-play-services/)

---

## Google发布多轮AI智能体持续评估指南 {#news-3}

> Google介绍了一套面向多轮 AI 智能体的持续评估流水线，旨在帮助开发者开展持续测试与评估。

文章提供了建立持续评估流水线的工程指南，并给出相关参考架构。

该方案涉及 **Gemini Enterprise Agent Platform** 和 **Google ADK**。

评估流程采用 **OpenInference** 标准，用于支持相关智能体评估工作。

[查看原文](https://developers.googleblog.com/evaluating-ai-agents-moving-past-the-vibe-check/)

---

## Google更新A2UI支持可切换推理格式 {#news-4}

> Google介绍了支持可切换推理格式的 A2UI 更新，包括 A2UI Express 和受控生成能力。原文称，相关方案可在特定场景下降低令牌使用量与界面渲染延迟。

**A2UI Express** 使用紧凑的 Python 风格语法，并通过 Agent SDK 编译为标准 A2UI JSON。

原文称，A2UI Express 最多可减少 3 倍令牌使用量并降低延迟，实际效果取决于具体场景。

TypeSafe 的 Jev 系统决策模型支持受控生成，可用于渲染已知形状的界面屏幕。

原文称，使用受控生成时，已知形状的屏幕可在 300 毫秒以内渲染，同时由较小模型流式生成文本。

相关更新无需修改前端渲染器或组件目录，并适用于 Python、TypeScript 和 Dart。

[查看原文](https://developers.googleblog.com/fast-reliable-a2ui/)

---

## Google与CopilotKit介绍A2UI生成式界面应用构建方案 {#news-5}

> 生成式 UI 可让 agents 根据用户请求在运行时构建界面，提供交互式体验。**Google** 提出的 A2UI 是一个与具体框架无关的生成式 UI 开放标准。

![Google与CopilotKit介绍A2UI生成式界面应用构建方案](https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/cover-without-title.2e16d0ba.fill-1200x600.png)

A2UI 让 agent 以数据形式描述界面，由应用使用已有组件完成绘制，并采用声明式数据格式而非可执行代码。客户端可维护可信组件目录。

**CopilotKit** 提供连接 agent 框架与应用的集成栈，支持 LangChain、AWS Strands 和 Google ADK 等框架。

CopilotKit 的 A2UI 工具包包括聊天界面和运行时，支持 React 与 Angular 渲染器，并提供面向 Vue 和 Slack 的定制渲染器。

A2UI 可支持从预定义组件到开放式 UI 代码生成的不同方式，其中声明式模式允许 agent 使用通用语言组合现有组件。

[查看原文](https://developers.googleblog.com/build-generative-ui-apps-with-a2ui-copilotkit-agents/)

---

## Google指南介绍使用ADK构建不中断语音代理 {#news-6}

> Google发布指南，介绍如何使用开源Agent Development Kit（ADK）和`gemini-3.8-live`构建响应式语音代理。该方案通过工具调度与后台执行维持对话流畅性。

开发者可以使用Python实现非阻塞工具，并通过流式工具输出进度更新。

后台执行模式可用于处理耗时较长的后端查询，减少长时间任务对对话流程的影响。

WHEN_IDLE、INTERRUPT和SILENT等响应调度行为，可控制工具结果何时传递到对话中。

[查看原文](https://developers.googleblog.com/step-by-step-guide-build-a-voice-agent-that-never-goes-silent-using-adk/)

---

## 开源项目 AiSOC 支持大模型代理分诊与安全调查 {#news-7}

> GitHub Trending 项目 **beenuar/AiSOC** 是一个开源 AI 安全运营中心，支持告警融合、基于大语言模型代理的分诊和 MITRE ATT&CK 调查。项目还为每个代理步骤提供可回放的决策账本。

**AiSOC** 支持自行托管，无需 API 密钥，并采用 MIT 许可证。

项目提供可供 Claude、Cursor 和 Continue 使用的 MCP 服务器。

该项目使用 Python，拥有 6,028 个 Stars，当天新增 436 个 Stars。

[查看原文](https://github.com/beenuar/AiSOC)

---

## GitHub 热门项目 FreeToken 将数据中心模型服务带到桌面 {#news-8}

> GitHub Trending 项目 **FlashML-org/FreeToken** 使用 Python 开发，致力于将数据中心规模的模型服务带到桌面设备。项目支持本地运行大型模型，并强调运行速度和效率。

**FreeToken** 当前拥有 15,239 个 Stars，当天新增 232 个 Stars。

项目支持在桌面设备本地运行大型模型，目标是提供数据中心规模的模型服务体验。

该项目使用 Python 语言开发。

[查看原文](https://github.com/FlashML-org/FreeToken)

---

## Kornia 提供基于 PyTorch 的可微分视觉算子 {#news-9}

> **Kornia** 是构建于 PyTorch 之上的可微分计算机视觉库，支持批量变换、自动微分和 GPU 加速。

![Kornia 提供基于 PyTorch 的可微分视觉算子](https://opengraph.githubassets.com/d8025e073959b6d2f38ba66d717978c70cc2b03df5fee76e93eca1d8d3d3c48d/kornia/kornia)

项目覆盖图像变换、数据增强和 AI 驱动的图像处理等用途，介绍称目前提供 1,200 多个公开算子。

Kornia 支持在一次批量调用中使用逐样本参数，可为高斯模糊、旋转以及仿射或透视变换传入不同样本参数。

从 `Kornia 0.9.1` 起，sigma 张量以及 gamma、contrast、solarize 等增强值会在设备端进行检查。

项目介绍称，其方向是成为 PyTorch 生态中可微分计算机视觉和几何领域的参考实现及可执行规范。

[查看原文](https://github.com/kornia/kornia)

---

## GitHub热门项目：Hex提供本地语音听写工具 {#news-10}

> **Hex** 是一款面向 macOS、Windows 和 Linux 的本地语音听写工具。用户按住快捷键讲话后，工具会在设备上转录语音，并将文字粘贴到当前应用。

![GitHub热门项目：Hex提供本地语音听写工具](https://opengraph.githubassets.com/eed923db5850491cce019c31eb38e566d05186394a21f649ce20a2c5cfb85387/anomalyco/hex)

Hex首次运行时需要下载语音模型，之后语音内容不会离开用户设备。

项目提供 macOS Apple silicon、Windows x64、Windows ARM64、Linux x86_64 和 Linux ARM64 的稳定版与开发版下载。

该项目采用 MIT 许可证，仓库页面显示有2.9k颗 Stars和173个 Forks。

项目使用 Rust，仓库包含 `app`、`crates`、`macos/HexMicrophoneDriver`、`native`、`sdk` 和 `tests` 等目录或文件。

[查看原文](https://github.com/anomalyco/hex)

---

## GitHub 热门项目 ezBookkeeping 支持自托管 {#news-11}

> Go 语言开源项目 **mayswind/ezbookkeeping** 登上 GitHub Trending。该项目是一款支持自托管的个人财务应用。

**ezBookkeeping** 使用 Go 语言开发，定位为开源个人财务应用。

项目页面显示，该项目已有 5,919 个 Stars，当天新增 19 个 Stars。

原文称，该应用支持自托管，并具备功能强大且易于使用的特点。

[查看原文](https://github.com/mayswind/ezbookkeeping)

---

## GitHub 热门项目 Xray-core 获超四万二千颗星 {#news-12}

> Go 语言项目 **XTLS/Xray-core** 登上 GitHub Trending，项目已有 42,542 个 Stars。项目描述称其为面向多种用途的开放平台。

**XTLS/Xray-core** 使用 Go 语言开发，当天新增 31 个 Stars。

项目描述将 Xray 称为“Penetrates Everything”，并称其为“the best v2ray-core”。

项目定位为一个面向多种用途的开放平台。

[查看原文](https://github.com/XTLS/Xray-core)

---

## Google Agents CLI引入持续评估循环改进智能体质量 {#news-13}

> Google 介绍了基于 Agents CLI 的智能体评估流程，通过持续测试和评分，帮助开发者系统改进智能体性能。该流程还支持发现提示词回归和比较模型后端替换影响。

Agents CLI 可自动执行评估流程，并通过持续测试和评分跟踪智能体质量。

开发者可以利用该流程发现提示词回归问题。

通过并排比较运行轨迹，开发者可以评估更换模型后端带来的影响。

该工具支持集成夜间定时运行和基于阈值的告警，以持续监测质量变化。

[查看原文](https://developers.googleblog.com/hill-climbing-agent-quality-with-agents-cli-evaluation/)

---

## Google API Gateway新增流式传输支持面向实时与AI应用 {#news-14}

> Google API Gateway新增实时流式传输能力，支持多种流式协议，开发者无需修改现有API规范即可使用。该功能目前处于Public Preview阶段。

新增能力覆盖Server-Sent Events、WebSockets、gRPC和分块传输编码。

开发者可通过网关路由长连接双向流和AI工作负载。

API Gateway继续提供一致的身份验证、速率限制和可观测性。

网关还新增确定性的默认主机名，以简化环境配置和基础设施即代码管理。

[查看原文](https://developers.googleblog.com/streaming-comes-to-api-gateway-real-time-and-ai-ready-apis-without-changing-your-spec/)

---

## Binance 遭遇 63 亿美元盗窃后分阶段恢复取款 {#news-15}

> **Binance** 表示，在黑客从其钱包窃取价值 63 亿美元的加密货币后，将分阶段恢复取款。交易所称已覆盖被盗资产的 95%，并将承担相关财务影响。

![Binance 遭遇 63 亿美元盗窃后分阶段恢复取款](https://techcrunch.com/wp-content/uploads/2026/10/binance-2206279918.jpg?resize=1200,800)

Binance 此前冻结了所有存款和取款，恢复安排将根据网络和资产类型分阶段进行。用户可能遇到临时延迟或更长处理时间。

截至报道时，网络状态页面显示不同资产的存取款状态不一，比特币存取款部分暂停，以太坊存款正常但取款部分暂停。

Binance 表示仍在设法购买剩余受影响资产，并将在调查完成后发布更深入的事件报告。

Binance 此前指责朝鲜黑客实施攻击；美国联邦调查局称朝鲜组织 TraderTraitor 对此负责。该归属信息仍属相关方面指称，调查尚未完成。

[查看原文](https://techcrunch.com/2026/11/01/binance-resumes-withdrawals-following-6-3-billion-breach/)

---

## Google Docs与Drive原生支持Markdown文件协作 {#news-16}

> **Google Workspace**现已支持在 **Google Docs** 和 **Google Drive** 中原生使用 Markdown（`.md`）文件。开发者与 AI agents 无需手动转换格式，即可协作处理文档。

此次集成旨在保留 Markdown 文件的原生一致性，方便其与 Git 仓库及开发者工具配合使用。

功能支持 **Google Docs** 逐行评论、**Google Drive** 渲染预览以及版本历史记录。

[查看原文](https://developers.googleblog.com/preview-edit-and-collaborate-on-markdown-md-files-natively-in-google-docs-and-drive/)

---

## Google开源Coral NPU架构推动边缘AI部署 {#news-17}

> Google Research完成了32位开源Coral NPU RISC-V架构，面向边缘推理，目标平均功耗为10 mW。其编译器工具链支持多种主流机器学习框架直接部署。

该架构引入Matrix Execution Unit，最高可提供1 TOPS的计算能力。

开源IREE/MLIR编译器`v1.0`已发布，可将JAX、PyTorch和TensorFlow模型直接部署到Coral NPU硬件。

开发者无需编写定制汇编代码，也可以使用Synaptics Astra SR200 MCU系列和Coralboard开发套件进行原型开发。

相关工具面向多模态边缘应用的开发与部署。

[查看原文](https://developers.googleblog.com/unifying-edge-ai-how-coral-npus-open-standard-brings-portable-energy-viable-intelligence-from-model-to-silicon/)

---

## Google DevFest 2026将全球举办超800场活动 {#news-18}

> Google DevFest 2026 将于 10 月 1 日至 12 月 31 日举行，全球预计举办 800 多场活动。活动主题为“Build, Secure, Scale”，聚焦智能代理 AI 时代。

**DevFest 2026** 预计吸引近百万名开发者参与，活动将在全球范围举办。

参与者可通过现场工作坊和代码实验体验 **Gemini**、**Google AI Studio**、**Google Antigravity** 和 **Web MCP**。

活动内容强调快速原型开发、安全且私密的部署，以及面向生产环境的基础设施。

[查看原文](https://developers.googleblog.com/devfest-is-back/)

---

## GitHub Game Off 2026公布主题：SHIFT贯穿整个11月 {#news-19}

> GitHub Game Off 2026 的主题确定为“SHIFT”。参赛者将在整个 11 月围绕换挡、视角转换等方向创作游戏。

**GitHub Game Off 2026** 鼓励参赛者制作新奇且富有创意的游戏。

参赛作品可以围绕换挡、转换视角、改变现实等概念展开。

参赛者也可以使用 Shift 键作为游戏控制方式，完成主题创作。

活动将在整个 11 月进行。

[查看原文](https://bsky.app/profile/github.com/post/3mzbree4b322m)

---

## AI高管谈人工智能便利生活引发脱节争议 {#news-20}

> 多名科技公司高管分享人工智能改善育儿、社交等生活场景的观点，但相关言论引发了与普通人生活脱节的批评。

![AI高管谈人工智能便利生活引发脱节争议](https://techcrunch.com/wp-content/uploads/2026/11/GettyImages-1481617564.jpg?resize=1200,680)

**Dazzle AI** CEO Marissa Mayer因使用AI工具帮助描述女儿的学校作业而受到批评。

**OpenAI** CEO Sam Altman曾建议家长为孩子上学路上制作个性化播客，并称难以想象没有ChatGPT的育儿生活。

**Meta** CEO Mark Zuckerberg曾表示，通过AI满足社交和恋爱需求将越来越被接受。

TechCrunch播客《Equity》讨论称，AI行业领导者显得脱节，既涉及营销问题，也涉及产品问题。

[查看原文](https://techcrunch.com/2026/11/01/ai-can-make-tech-ceos-lives-easier-what-about-everyone-else/)

---

## Trucks VC称自动驾驶初创或迎更大浪潮 {#news-21}

> Trucks VC称，2026年至今已有81家自动驾驶汽车初创公司寻求融资，数量较上一年增加三分之二。该机构认为，行业可能正进入由技术突破推动的新一轮自动驾驶浪潮。

![Trucks VC称自动驾驶初创或迎更大浪潮](https://techcrunch.com/wp-content/uploads/2026/10/robotaxi-illustration.jpg?resize=1200,1058)

Trucks VC表示，今年收到的自动驾驶汽车初创公司融资推介达到81家，超过约十年前行业繁荣时期的水平。

文章称，基础模型可能支持自动驾驶端到端系统，并帮助降低部署成本、加快部署速度。

Nvidia 的 `Alpamayo` 和 Qwen 的通用视觉语言动作模型，被列为降低进入门槛的开源模型。

这些初创公司覆盖建筑、仓储、农业、采矿和 robotaxi 等方向。Trucks VC合伙人称，部分公司已在数月内完成部署，融资额低于100万美元。

[查看原文](https://techcrunch.com/2026/11/01/techcrunch-mobility-a-new-bigger-av-boom-is-here/)

---

## NASA 面向商业航天征集方案延长哈勃寿命 {#news-22}

> NASA 正向私营部门征集方案，以评估是否能够帮助延长**哈勃太空望远镜**的运行寿命。文章称，若不提升轨道，哈勃的运行时间可能在 2030 年代初至中期结束。

![NASA 面向商业航天征集方案延长哈勃寿命](https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/13237317/PIA18165_large.jpg?quality=90&strip=all&crop=0,0,100,100)

哈勃目前没有即将烧毁于地球大气层的直接危险，但其长期运行仍受到轨道变化影响。

NASA 管理员 Jared Isaacman 表示，哈勃仍有重要科学工作，应考虑一切合理机会，让其尽可能长时间继续提供成果。

目前 NASA 仍处于征集私营部门提案阶段，具体救援方案、执行机构和最终决定尚未确认。

[查看原文](https://www.theverge.com/science/1024239/nasa-commercial-space-save-hubble)

---

## Apple HomeView或将支持安全摄像头功能 {#news-23}

> 有用户在 **HomeView 27.2** 代码中发现了与安全摄像头功能有关的线索。相关功能目前尚未获 **Apple** 正式确认。

![Apple HomeView或将支持安全摄像头功能](https://platform.theverge.com/wp-content/uploads/sites/2/2026/10/LR6B6101.jpeg?quality=90&strip=all&crop=0,0,100,100)

Reddit 用户 pdfu 发现，代码字符串提到了安全摄像头模式、移动检测、实时串流和录制选项。

设置页面显示：“Your HomeView can be used as a security camera with HomeKit Secure Video.”

代码还提到隐私功能。据称，视频画面仅对家庭成员可见。

据称，当有人观看画面或摄像头开始录制时，设备会亮起指示灯并播放声音。

[查看原文](https://www.theverge.com/tech/1024219/apples-homeview-could-add-security-camera-features)


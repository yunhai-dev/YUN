---
title: 科技早报 2026-08-03
category: "科技, 科技早报"
excerpt: AI代理开源项目与企业服务持续涌现，欧盟人工智能法案生效并引发安全隐私讨论。
lastEdited: 2026年8月3日
tags: [人工智能, AI代理, 开源生态, 欧盟人工智能法案, 网络安全, OpenAI, 开发者工具]
imageUrl: 
---

## 概览

### AI 与机器学习

- [Nous Research开源自我改进型AI代理项目hermes-agent](#news-1)
- [欧盟人工智能法案模型规则于2026年8月开始适用](#news-2)
- [Voice-Pro集成语音克隆与多语言处理功能](#news-3)
- [Meta AI引入记忆代理，帮助长任务减少重复失败](#news-4)
- [Claude Opus 5 被称可从提示生成带物理音乐的3D游戏](#news-5)
- [Altman称AI行业或需控制开发节奏](#news-6)
### GitHub 热门项目

- [GitHub热门项目 Agent-Reach支持多平台内容检索](#news-7)
- [Komodo登GitHub热门：面向多服务器构建部署](#news-8)
- [GitHub热门项目 inkos面向多类内容创作场景](#news-9)
- [GitHub Actions checkout更新安全策略与运行环境](#news-10)
- [开源 CRM 项目将智能代理置于产品核心位置](#news-11)
- [ZeroClaw登上GitHub热门项目，提供自主AI助理基础设施](#news-12)
### 开源生态

- [Mu 将 67 个智能体工具整合到单一 MCP 端点](#news-13)
- [F*面向证明的通用编程语言开源发布](#news-14)
- [Bor v0.8.0发布新增三类Linux桌面策略](#news-15)
- [Statcounter数据显示Linux北美桌面占比升至10.65%](#news-16)
### 开发者工具

- [Fuse推出静态类型纯函数式编程语言工具链](#news-17)
- [作者总结 Tailwind CSS 在中大型项目中的使用争议](#news-18)
### 安全与隐私

- [欧盟年龄验证项目将硬件绑定证明列为架构要求](#news-19)
- [AI生成虚假报告致苹果漏洞赏金计划处理受阻](#news-20)
- [AI发现漏洞数量多但实际利用案例寥寥](#news-21)
- [智能眼镜隐私设计面临录制与滥用风险](#news-22)
### 产品与平台

- [OpenAI推出Presence，面向企业部署AI代理](#news-23)
- [AI代理预测之外App Store仍涌现新软件](#news-24)
---

## Nous Research开源自我改进型AI代理项目hermes-agent {#news-1}

> **Nous Research** 开发的 `hermes-agent` 是一个自我改进型 AI agent，项目以公开仓库形式发布。

![Nous Research开源自我改进型AI代理项目hermes-agent](https://opengraph.githubassets.com/d37ccb8db31535beb91691513997344dbeba5e3fa3ae17a747934169f550b280/NousResearch/hermes-agent)

该仓库页面显示有 224k 个 Star、43.3k 个 Fork 和 20,128 次提交。

仓库包含 `agent`、`apps`、`gateway`、`hermes_cli`、`plugins`、`skills`、`tests` 和 `web` 等目录或组件。

项目仓库提供英文、西班牙文、简体中文和乌尔都文 README 文件。由于提供的项目介绍正文在开头处截断，无法据此确认其完整功能和支持范围。

[查看原文](https://github.com/NousResearch/hermes-agent)

---

## 欧盟人工智能法案模型规则于2026年8月开始适用 {#news-2}

> 欧盟《人工智能法案》关于大型语言模型的部分重要条款于 2026 年 8 月开始适用，相关模型开发者将面临新的信息披露要求。

![欧盟人工智能法案模型规则于2026年8月开始适用](https://images.euronews.com/articles/stories/09/85/74/44/1200x675_cmsv2_b29bb7fe-1f9b-589f-875a-c78ca851d748-9857444.jpg)

法案覆盖缺乏特定用途、可适配多种场景的模型，要求开发者说明模型构建方式、训练中使用的受版权保护内容及模型能力。

针对推动技术边界的高能力“前沿”模型，法案要求开发公司识别并降低其对社会造成的风险。

欧盟委员会设立欧洲人工智能办公室，推动模型相关规则执行，并认可由专家起草的自愿行为准则。

文章称多数主要西方人工智能实验室已签署该准则，但 Meta 未签署；执行仍面临技术复杂、资源有限和人才竞争等挑战。

[查看原文](https://www.euronews.com/my-europe/2026/08/02/eu-rules-on-ai-models-become-enforceable-whats-going-to-change)

---

## Voice-Pro集成语音克隆与多语言处理功能 {#news-3}

> 面向创作者和开发者的 **voice-pro** 提供基于 Gradio 的 WebUI，集成文本转语音、语音克隆和音频处理功能。

**voice-pro** 使用 Python 编写，支持基于 Edge-TTS 和 kokoro 的文本转语音。

项目支持使用 E2、F5-TTS 和 CosyVoice 进行零样本语音克隆，并使用 Whisper 处理音频。

此外，voice-pro 提供 YouTube 下载、Demucs 人声分离和多语言翻译功能。

GitHub 页面显示，该项目已获得 11,939 个 Star，当日新增 58 个 Star。

[查看原文](https://github.com/abus-aikorea/voice-pro)

---

## Meta AI引入记忆代理，帮助长任务减少重复失败 {#news-4}

> **Meta AI**提出为AI代理配备独立的记忆代理，以减少主代理忘记已诊断错误、重复执行失败步骤的问题。

![Meta AI引入记忆代理，帮助长任务减少重复失败](https://the-decoder.com/wp-content/uploads/2026/08/memory-agent-meta-generated-image-nano-banana-pro.jpg)

记忆代理维护结构化记忆库，并决定何时提醒主代理，以及何时保持沉默。

在两项基准测试中，该系统的得分最高提升了8.3个百分点。

原文未说明两项基准测试的具体名称，也未披露详细评测方法。

[查看原文](https://the-decoder.com/meta-ai-uses-a-second-ai-agent-as-a-memory-coach-to-keep-long-tasks-on-track/)

---

## Claude Opus 5 被称可从提示生成带物理音乐的3D游戏 {#news-5}

> 文章称 Anthropic 的 **Claude Opus 5** 可根据单个提示生成完整的 3D 游戏，生成结果能够直接在浏览器中运行。

![Claude Opus 5 被称可从提示生成带物理音乐的3D游戏](https://the-decoder.com/wp-content/uploads/2026/08/spielwelten-3d.png)

文章列举的示例包括第一人称射击游戏、卡丁车竞速游戏和 Minecraft 克隆游戏。

这些示例不使用外部素材，几何体、纹理、物理效果以及部分情况下的音乐由代码生成。

生成的游戏代码可以直接在浏览器中运行，文章将其描述为从简单色块原型向完整 3D 原型的推进。

文章称，在与 `GPT-5.6 Sol` 和 `Kimi K3` 的并列比较中，Claude Opus 5 生成的结果细节明显更多。

[查看原文](https://the-decoder.com/claude-opus-5-pushes-prompt-to-game-ai-from-rough-color-blocks-to-full-3d-prototypes-with-physics-and-music/)

---

## Altman称AI行业或需控制开发节奏 {#news-6}

> **OpenAI** CEO Sam Altman近日表示，人工智能行业可能需要放慢开发速度，以便社会适应新的能力水平。TechCrunch播客围绕这一表态及相关争议展开讨论。

![Altman称AI行业或需控制开发节奏](https://techcrunch.com/wp-content/uploads/2026/05/openai-logo-code-background.jpg?resize=1200,798)

播客提到，这一表态可能与近期**OpenAI**智能体入侵**Hugging Face**系统的事件有关。Sean O’Kane称，该事件并非新的高级攻击，而是系统不需要隐蔽性且未被如此指示。

O’Kane表示，Altman并未呼吁暂停人工智能开发，而是谨慎使用了“控制节奏”的表述。**OpenAI**和**Anthropic**曾支持一项与相关表态相呼应的请愿。

讨论者质疑，**OpenAI**能否在继续创收、融资或实现成功IPO的同时控制开发节奏。文章还提出，行业或可通过设置不同护栏和发展路径应对风险。

[查看原文](https://techcrunch.com/2026/08/02/sam-altman-and-ais-decel-debate/)

---

## GitHub热门项目 Agent-Reach支持多平台内容检索 {#news-7}

> GitHub Trending 项目 **Panniantong/Agent-Reach** 使用 Python 编写，项目描述称其可让 AI agent 读取和搜索多个内容平台。

该项目目前有 64,255 个 Stars，当天新增 645 个 Stars。

项目描述称，Agent-Reach 支持 Twitter、Reddit、YouTube、GitHub、Bilibili 和小红书。

用户可通过 CLI 使用相关功能，项目描述称其无需支付 API 费用。

[查看原文](https://github.com/Panniantong/Agent-Reach)

---

## Komodo登GitHub热门：面向多服务器构建部署 {#news-8}

> **Komodo** 是一款用于在多台服务器上构建和部署软件的工具，由 **moghtech** 维护。其 GitHub 仓库目前显示有 11.8k 个 stars。

![Komodo登GitHub热门：面向多服务器构建部署](https://repository-images.githubusercontent.com/github-production-repository-image-32fea6/469321930/bc39ce63-1d6c-4805-ab85-f2dc6a9084b2?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20260802%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260802T105741Z&X-Amz-Expires=300&X-Amz-Signature=2b064c22412dea6c0a2895a498e4ae4bacad91d3575303410debbdde843143e6&X-Amz-SignedHeaders=host&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoiaHR0cHM6Ly9yZXBvc2l0b3J5LWltYWdlcy5naXRodWJ1c2VyY29udGVudC5jb20vIiwia2V5Ijoia2V5MSIsImV4cCI6MTc4NTY2ODU2MSwibmJmIjoxNzg1NjY4MjYxLCJwYXRoIjoicmVwb3NpdG9yeS1pbWFnZXMuZ2l0aHVidXNlcmNvbnRlbnQuY29tIn0.Zvlmt1vl4QU51xOHU1nLVSyoDKzHaMX9gZ0MEtAVjjc)

**Komodo** 公开仓库的默认分支为 `main`，页面显示累计 365 个 forks 和 2,857 次提交。

项目提供文档、演示环境以及构建服务器入口，采用 `GPL-3.0` 许可证发布。

项目声明软件不提供任何保证；维护者称将尽力确保版本稳定且无错误，但使用风险由使用者自行承担。

[查看原文](https://github.com/moghtech/komodo)

---

## GitHub热门项目 inkos面向多类内容创作场景 {#news-9}

> GitHub Trending 项目 **Narcooo/inkos** 使用 TypeScript 编写，项目描述称其是一款故事创作 AI agent。

该项目目前有 8,612 个 Stars，当天新增 55 个 Stars。

项目描述称，inkos 适用于小说、剧本和翻译等内容创作场景。

此外，该项目还面向互动游戏和 IP 内容创作。

[查看原文](https://github.com/Narcooo/inkos)

---

## GitHub Actions checkout更新安全策略与运行环境 {#news-10}

> **actions/checkout** 是用于检出仓库的 GitHub Action。项目近期版本更新了 fork 拉取请求检出策略、运行时和凭据存储方式。

![GitHub Actions checkout更新安全策略与运行环境](https://opengraph.githubassets.com/c470beb9f5e61ecefc59ac1ec53d22568b3193cd73b9a3bebfbece75a622717c/actions/checkout)

Checkout v7 默认拒绝在 `pull_request_target` 或 `workflow_run` 工作流中检出来自 fork 的拉取请求代码。用户审查风险后，可设置 `allow-unsafe-pr-checkout: true` 启用该功能。

项目已迁移到 ESM，以支持新版本的 `@actions/*` 软件包，并更新了直接依赖和传递依赖。

Checkout v6 将 `persist-credentials` 存储在 `RUNNER_TEMP` 下的单独文件中；Checkout v5 使用 `node24`，要求 Actions Runner 至少为 `v2.327.1`。

Checkout v4 默认仅获取触发工作流的 ref 或 SHA 对应的单个提交，设置 `fetch-depth: 0` 可获取所有分支和标签的历史记录。不同版本对运行环境和配置有明确限制。

[查看原文](https://github.com/actions/checkout)

---

## 开源 CRM 项目将智能代理置于产品核心位置 {#news-11}

> 开源项目 `trycompai/crm` 将智能代理作为 CRM 的核心，而不是附加功能。项目面向单租户和内部使用，作者建议处理真实客户数据前阅读 `SECURITY.md`。

![开源 CRM 项目将智能代理置于产品核心位置](https://opengraph.githubassets.com/c431548e25581065172d3f1a83d6eadfa93129df97468c9f76c9f679abd4c1a9/trycompai/crm)

项目将数据库主要用于记录智能代理的研究结果，代理则运行在自己的部署、计划和工作队列上。

代理可以决定下一步研究内容、安排后续任务，并在研究预算用尽时停止。项目 API 不包含智能能力，`NestJS` 通过向队列写入记录报告事件。

代理会租用队列记录并决定其含义。项目规定不得猜测任何人的信息，工具只报告观察结果，强证据写入记录，弱证据转为人工处理建议。

该项目使用 Google 登录，访问控制名单通过环境变量配置；获得访问权限的用户可以查看全部内容。

[查看原文](https://github.com/trycompai/crm)

---

## ZeroClaw登上GitHub热门项目，提供自主AI助理基础设施 {#news-12}

> **zeroclaw-labs/zeroclaw** 登上 GitHub Trending，项目使用 Rust 编写，定位为快速、小型且完全自主的 AI 个人助理基础设施。

项目描述称，ZeroClaw 支持任意操作系统和平台。

该项目可部署到不同环境，并支持替换组件。

项目当前有 32,484 个 Stars，当天新增 14 个 Stars。

[查看原文](https://github.com/zeroclaw-labs/zeroclaw)

---

## Mu 将 67 个智能体工具整合到单一 MCP 端点 {#news-13}

> 开源项目 Mu 把新闻、邮件、搜索、文件、日历等 67 个工具聚合到同一个 MCP 端点，智能体通过一次连接即可调用。

![Mu 将 67 个智能体工具整合到单一 MCP 端点](https://opengraph.githubassets.com/230a8975af036b5fe4c1bce7ab8050cc505aaa8e2a73ed9dbe22eb4e8a7174a4/micro/mu)

Mu 自带邮件服务器、信息聚合器、搜索索引、应用沙箱与钱包；`mail_inbox` 等工具会读写真实数据。

对应 Web 应用托管在 `micro.mu`，用户也可自行部署单个 Go 二进制；项目采用 `AGPL-3.0` 许可。

支持 MCP 授权规范的客户端（如 `Claude Desktop` 与 Cursor）可直接接入；不支持的客户端可使用个人访问令牌。

读取本实例自身内容包含在服务中，付费模型或第三方 API 调用会从用户余额中扣除积分。

[查看原文](https://github.com/micro/mu)

---

## F*面向证明的通用编程语言开源发布 {#news-14}

> F*是一种面向证明的通用编程语言，支持纯函数式编程和带副作用的编程。项目结合依赖类型、SMT证明自动化与交互式定理证明。

![F*面向证明的通用编程语言开源发布](https://fstar-lang.org/i/fstar-new.png)

F*程序默认编译为 `OCaml`，并可通过 `KaRaMeL` 提取为 `F#`、`C` 或 `Wasm`。

通过 `Vale` 工具链，部分F*代码还可以提取为汇编代码。

F*本身使用F*实现，并通过OCaml完成引导启动；项目在GitHub上由**Microsoft Research**、**Inria**和社区维护。

项目采用 `Apache 2.0` 许可证，提供Windows、Linux和Mac OS X的定期二进制版本，并配有在线书籍及教程资料。

[查看原文](https://fstar-lang.org/)

---

## Bor v0.8.0发布新增三类Linux桌面策略 {#news-15}

> 开源Linux桌面策略管理项目 **Bor** 发布 `v0.8.0`，新增 Thunderbird、Microsoft Edge for Business 和 Firewalld zones 策略类型。

![Bor v0.8.0发布新增三类Linux桌面策略](https://getbor.dev/images/bor-start.png)

Thunderbird策略可管理已注册桌面，由代理生成并维护 `policies.json`，支持 Flatpak、RPM和DEB安装。

Microsoft Edge for Business策略会写入 `bor_managed.json`，并提供树形编辑器、JSON校验和设置预览。

Firewalld策略覆盖服务、端口、转发端口、富规则、伪装、接口、来源和区域目标，并通过 `firewall-cmd --check-config` 校验后重新加载。

新版本还加入细粒度RBAC、Polkit可变条件，以及基于 PatternFly 6 改版的Web UI。

[查看原文](https://getbor.dev/blog/2026-08-02-bor-v080-release/)

---

## Statcounter数据显示Linux北美桌面占比升至10.65% {#news-16}

> 根据 Statcounter 数据，Linux 在 2026 年 7 月的北美桌面使用量占比为 10.65%，高于 6 月的 5.52%。

![Statcounter数据显示Linux北美桌面占比升至10.65%](https://linuxiac.com/wp-content/uploads/2026/08/linux-10-percent-north-america.jpg)

文章称，Windows 仍是北美占主导地位的桌面操作系统，Apple 的 OS X 和 macOS 类别也保持相当市场份额。

2026 年 6 月，Statcounter 数据中的“Unknown”类别占比为 9.24%，其减少与 Linux 占比上升同时出现。

Cloudflare Radar 对过去 28 天北美桌面 HTTP 流量的统计，也显示 Linux 具有较高存在比例。

Statcounter 基于分析网络中的页面浏览量，数据可能在 45 天质量保证期内修订，10.65% 不应直接理解为用户切换比例。

[查看原文](https://linuxiac.com/linux-desktop-market-share-surpasses-10-in-north-america/)

---

## Fuse推出静态类型纯函数式编程语言工具链 {#news-17}

> **Fuse** 是一种静态类型、纯函数式编程语言，类型系统基于 System F，并支持高阶多态与特设多态。

![Fuse推出静态类型纯函数式编程语言工具链](https://fuselang.org/fuse-icon_hu_db4cf4be1a7fd488.png)

Fuse 编译到 **GRIN** 全程序优化器，并通过 **LLVM** 生成原生代码。其语法借鉴 Rust、Python、Scala 和 Haskell。

该语言采用缩进式块结构与 ML 风格语法，类型检查采用双向方式，除函数签名外其余类型可自动推断。

目前工具链支持 Linux `x86_64` 与 macOS `ARM64` 平台，可通过 `curl` 运行 `https://fuselang.github.io/fuse/fuseup` 脚本安装。

[查看原文](https://fuselang.org)

---

## 作者总结 Tailwind CSS 在中大型项目中的使用争议 {#news-18}

> Tailwind CSS 能帮助开发者快速构建界面，但作者认为，其工具类数量、HTML 类名规模和语义一致性可能带来维护问题。

![作者总结 Tailwind CSS 在中大型项目中的使用争议](https://img.andros.dev/2v0BIVF4Nhf-We11Un2zAvL4xJM=/600x0/filters:format(avif):quality(85)/https://andros.dev/media/thumbnails/ai_thumbnail_8a4eed17.png)

**Tailwind CSS** 是流行的 CSS 框架，可用于标准化网页开发中的间距、颜色和尺寸。作者曾在多个项目中使用它，并表示该框架有助于快速构建用户界面。

文章指出，Tailwind CSS 包含数千个工具类，开发者初期可能需要频繁查阅文档和搜索基础类名。

如果不使用 `@apply` 组合工具类，HTML 中可能出现大量类名，进而增加体积并降低可读性。

作者认为，Tailwind CSS 让 HTML 依赖 CSS 工具类；此外，`items-center`、`justify-center`、`text-center` 和 `place-content-center` 等名称的差异有时不够直观。

[查看原文](https://en.andros.dev/blog/af3ee191/why-i-dont-recommend-tailwind-css/)

---

## 欧盟年龄验证项目将硬件绑定证明列为架构要求 {#news-19}

> 欧盟开源年龄验证项目维护者确认，硬件绑定证明是架构要求，而非可删除的实现细节。该方案旨在证明用户达到特定年龄，同时不披露姓名、确切出生日期或完整证件信息。

![欧盟年龄验证项目将硬件绑定证明列为架构要求](https://linuxiac.com/wp-content/uploads/2026/08/eu-digital-identity.jpg)

项目依靠存储在 Android TEE、StrongBox 或 Apple Secure Enclave 等受保护硬件中的密钥，防止凭据被复制或克隆。

技术规范要求年龄验证应用在可用时使用原生加密硬件；Root 检测、Google Play Integrity 和 Apple App Attest 未被参考实现普遍强制要求。

Linux 用户可以访问网站，并使用受支持的移动钱包扫描二维码；当前架构不提供原生 Linux 钱包。

年龄证明提供方预计只向欧盟委员会合规应用列表中的应用发放凭据，开源代码不自动保证社区构建版本可使用真实服务。

项目邀请提交替代架构方案，并将发布专门的安全审查和威胁模型；生产部署的具体严格程度目前仍不明确。

[查看原文](https://linuxiac.com/eu-age-verification-project-mandates-hardware-bound-attestation/)

---

## AI生成虚假报告致苹果漏洞赏金计划处理受阻 {#news-20}

> 据报道，**Apple** 漏洞赏金计划因收到大量 AI 生成的虚假漏洞报告而处理能力过载，一项严重 macOS 漏洞一度因此无法提交。

![AI生成虚假报告致苹果漏洞赏金计划处理受阻](https://the-decoder.com/wp-content/uploads/2026/07/apple_logo_neon_green.png)

Apple 随后限制每位研究人员可提交的漏洞报告数量。

意大利初创公司 **Bynario** 表示，其发现的一个严重 macOS 漏洞一度无法上报。

该漏洞据称在黑市上的价值最高可达20万美元，但文章摘要未提供技术细节或 Apple 的官方回应。

[查看原文](https://the-decoder.com/a-real-macos-flaw-worth-200k-went-unreported-because-apples-bug-bounty-inbox-was-full-of-ai-slop/)

---

## AI发现漏洞数量多但实际利用案例寥寥 {#news-21}

> VulnCheck统计显示，2026年上半年人工智能发现的1,061个漏洞中，仅14个确认遭到攻击。确认被利用的漏洞占比为1.3%。

![AI发现漏洞数量多但实际利用案例寥寥](https://the-decoder.com/wp-content/uploads/2026/07/cybersecurity_AI_pattern-scaled.png)

统计结果显示，这一比例与全部漏洞被利用的总体比例相同。

漏洞利用出现得更快，相关利用的中位时间从120天降至80天。

该统计仅覆盖2026年上半年，并以“确认遭到攻击”作为漏洞被利用的判定条件。

[查看原文](https://the-decoder.com/ai-finds-plenty-of-security-flaws-but-almost-none-of-them-get-exploited/)

---

## 智能眼镜隐私设计面临录制与滥用风险 {#news-22}

> 配备摄像头的智能眼镜可能在他人不知情或未同意的情况下拍摄，引发隐私担忧。相关产品也在探索字幕、视障辅助等应用。

![智能眼镜隐私设计面临录制与滥用风险](https://media.wired.com/photos/6a6d1675ffa01fba7c8c3164/191:100/w_1280,c_limit/GettyImages-2162375654.jpg)

**Meta** 智能眼镜可捕捉佩戴者注视对象的图像、音频和视频，并通过指示灯提醒旁观者正在录制。

部分用户曾找到关闭指示灯的方法；Meta随后加入防篡改功能，用户改动眼镜后设备会被禁用。

Meta曾在眼镜中加入可启用的人脸识别功能 Name Tag，之后从应用中删除相关代码。

**Even Realities**推出无摄像头智能眼镜，**Solos**新款眼镜则提供可覆盖摄像头镜片的隐私遮罩。

[查看原文](https://www.wired.com/story/is-it-possible-to-make-privacy-friendly-smart-glasses/)

---

## OpenAI推出Presence，面向企业部署AI代理 {#news-23}

> **OpenAI**推出企业服务**Presence**，旨在帮助AI代理应用于客户服务和企业内部工作流程。

![OpenAI推出Presence，面向企业部署AI代理](https://the-decoder.com/wp-content/uploads/2026/08/openai-scientific-software-nano-banana-pro.jpg)

与现有的`Workspace Agents`不同，Presence主要面向外部部署场景。

对于复杂案例，OpenAI自己的工程师会介入处理。

[查看原文](https://the-decoder.com/openai-presence-wants-to-make-ai-agents-production-ready-for-businesses/)

---

## AI代理预测之外App Store仍涌现新软件 {#news-24}

> 尽管有人预测AI代理可能使传统应用过时，开发者仍在持续发布新软件。文章盘点了近期值得关注的多款App Store应用。

文章介绍的应用类型包括智能书签工具、社区市场、数字笔友和自然日志。

这些应用被列为近期值得添加到主屏幕的App Store软件。

AI代理可能取代传统应用的说法在文中以预测形式出现，尚未被确认为已经发生的事实。

[查看原文](https://techcrunch.com/2026/08/02/these-app-store-hidden-gems-prove-theres-still-room-for-great-software-in-the-ai-era/)


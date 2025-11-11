import {Tool} from "@/types/tools";

const localTools: Tool[] = [
    {
        id: 'lrc-edit',
        name: 'LRC 歌词编辑器',
        description: '制作和编辑LRC格式的歌词文件，支持时间轴同步、音频播放和实时预览。',
        href: '/tools/lrc-edit',
        category: '媒体工具',
    },
    {
        id: 'flv-online',
        name: 'FLV 直播流播放器',
        description: '在线播放 FLV 格式的直播流，支持实时播放、截图和全屏功能。',
        href: '/tools/flv-online',
        category: '媒体工具',
    },
    {
        id: 'json-formatter',
        name: 'JSON 格式化工具',
        description: '在线格式化、校验和美化 JSON 数据。',
        href: '/tools/json-formatter',
        category: '开发工具',
    },
    {
        id: 'url-encoder',
        name: 'URL 编码解码工具',
        description: '在线编码和解码 URL 字符串,支持 encodeURIComponent 和 encodeURI 两种模式。',
        href: '/tools/url-encoder',
        category: '开发工具',
    },
    {
        id: 'text-diff',
        name: '文本对比工具',
        description: '在线对比两段文本的差异,逐行显示增删改情况。',
        href: '/tools/text-diff',
        category: '开发工具',
    },
    {
        id: 'color-picker',
        name: '颜色选择器',
        description: '从调色板或屏幕上选择颜色,并获取其代码 (HEX, RGB, HSL)。',
        href: '/tools/color-picker',
        category: '设计工具',
    },
    {
        id: 'mermaid',
        name: 'Mermaid 图表转换器',
        description: '在线将 Mermaid 代码转换为 SVG 图表，支持流程图、时序图、甘特图等多种图表类型。',
        href: '/tools/mermaid',
        category: '开发工具',
    },
    {
        id: 'tree-converter',
        name: '文件树转换器',
        description: '将缩进格式的文本转换为树形结构显示。',
        href: '/tools/tree-converter',
        category: '开发工具',
    },
    {
        id: 'markdown-editor',
        name: 'Markdown 编辑器',
        description: '在线编辑和预览 Markdown 文档，支持实时预览、语法高亮和常用格式工具栏。',
        href: '/tools/markdown-editor',
        category: '开发工具',
    },
    {
        id: 'comment-system',
        name: '评论系统客户端',
        description: '静态网站评论系统的客户端工具，支持API地址配置、评论管理和多层级回复功能。',
        href: '/tools/comment-system',
        category: '开发工具',
    },
]

const devTools: Tool[] = [
    {
        id: 'regexr',
        name: 'Regexr',
        description: '在线正则表达式测试和学习工具。',
        href: 'https://regexr-cn.com/',
        category: '开发工具',
    },
    {
        id: 'ahooks',
        name: 'ahooks',
        description: '高质量且可靠的 React Hooks 库，支持 SSR，包含丰富基础与高级 Hooks，TypeScript 编写。',
        href: 'https://ahooks.js.org/',
        category: '开发工具'
    },
    {
        id: 'shadcn-ui',
        name: 'shadcn/ui',
        description: 'shadcn/ui 提供设计精美、易于访问的组件以及一个与各种框架兼容的代码分发平台。',
        href: 'https://ui.shadcn.com/',
        category: '开发工具',
    },
    {
        id: 'react-flow',
        name: 'React Flow',
        description: '用于构建节点图和流程图的 React 库，支持拖放、缩放和平移等功能。',
        href: 'https://reactflow.dev/',
        category: '开发工具',
    },
    {
        id: 'community-shadcn-ui',
        name: 'Community shadcn/ui',
        description: 'Community shadcn/ui 是一个由社区维护的 shadcn/ui 组件库，提供更多实用组件和示例。',
        href: 'https://www.shadcn.io',
        category: '开发工具',
    },
    {
        id: 'react-bits',
        name: 'React Bits',
        description: '一个收集了许多 React 技巧和最佳实践的资源库，帮助开发者提升 React 开发技能。',
        href: 'https://reactbits.dev/',
        category: '开发工具',
    },
    {
        id: 'allinssl',
        name: 'AllinSSL',
        description: '一个用于自动申请和部署 HTTPS 证书的开源工具集，支持多种平台和服务器环境。',
        href: 'https://github.com/allinssl/allinssl',
        category: '开发工具'
    },
    {
        id: "yaml-resume",
        name: "YAMLResume",
        description: "一个允许用户使用 YAML 编写简历并生成专业 PDF 的开源工具。",
        href: "https://github.com/yamlresume/yamlresume",
        category: "开发工具"
    },
    {
        id: 'regex-tester',
        name: '正则表达式测试器',
        description: '在线测试和调试正则表达式。',
        href: 'https://regex101.com/',
        category: '开发工具',
    },
    {
        id: 'chatlog',
        name: 'chatlog',
        description: '微信聊天记录管理工具',
        href: 'https://github.com/sjzar/chatlog',
        category: '开发工具',
    },
    {
        id: 'zashboard',
        name: 'zashboard',
        description: 'Mihomo 内核 Web 控制台',
        href: 'https://github.com/Zephyruso/zashboard',
        category: '开发工具',
    },
    {
        id: 'better-auth',
        name: 'Better Auth',
        description: '一个用于简化前端认证和授权过程的工具或框架，旨在提供更安全、更便捷的身份验证解决方案。',
        href: 'https://github.com/better-auth/better-auth',
        category: '开发工具'
    },
    {
        id: 'myocr',
        name: 'MyOCR',
        description: '一个高度可扩展和自定义的OCR系统构建框架。工程师可以轻松地训练、集成深度学习模型到针对实际应用的自定义OCR管道中。',
        href: 'https://github.com/robbyzhaox/myocr',
        category: '开发工具'
    },
    {
        id: 'sealos',
        name: 'Sealos',
        description: '一站式云开发平台，提供即时协作开发、无缝部署和环境隔离能力，助您高效管理开发工作流程，轻松实现团队协作。',
        href: 'https://sealos.run/?s=%E9%A6%96%E9%A1%B5',
        category: '开发工具'
    },
    {
        id: 'pake',
        name: 'Pake',
        description: '使用 Rust 轻松将任何网页转变为桌面应用程序。',
        href: 'https://github.com/tw93/Pake',
        category: '开发工具',
    },
    {
        id: 'uiverse',
        name: 'Uiverse',
        description: '一个开源的 UI 组件库。',
        href: 'https://uiverse.io/',
        category: '开发工具',
    },
    {
        id: 'clawcloud',
        name: 'Claw Cloud',
        description: '面向开发人员的云基础设施和应用部署平台。',
        href: 'https://uiverse.io/',
        category: '开发工具',
    },
    {
        id: 'onlook',
        name: 'Onlook',
        description: '直观地编辑您的 React 网站或 Web 应用程序，并将更改实时写回代码。',
        href: 'https://onlook.com/',
        category: '开发工具',
    },
    {
        id: '21st',
        name: '21st',
        description: '一个用于获得设计灵感的 React 组件库',
        href: 'https://21st.dev/',
        category: '开发工具',
    },
    {
        id: 'animejs',
        name: 'Anime.js',
        description: 'JavaScript 动画库。',
        href: 'https://animejs.com/',
        category: '开发工具',
    },
    {
        id: 'chat-ui',
        name: 'Chat UI',
        description: '达摩院阿里小蜜孵化的AI对话组件库',
        href: 'https://chatui.io/',
        category: '开发工具'
    },
    {
        id: 'icraft',
        name: 'iCraft Editor',
        description: '轻松创建直观的3D架构图，让复杂的系统一目了然！',
        href: 'https://icraft.gantcloud.com/zh-CN',
        category: '开发工具'
    },
    {
        id: 'neon',
        name: 'Neon',
        description: '便捷的云上 Postgres 数据库，免费 500MB 大小',
        href: 'https://neon.tech/',
        category: '开发工具'
    },
    {
        id: 'mongodb-atlas',
        name: 'MongoDB Atlas',
        description: '云 MongoDB 数据库托管服务，免费 500 MB 大小',
        href: 'https://neon.tech/',
        category: '开发工具'
    },
    {
        id: 'pypistats',
        name: 'PyPI Stats',
        description: '查看 PyPI 模块的下载统计信息。',
        href: 'https://pypistats.org/',
        category: '开发工具',
    },
    {
        id: 'lorem-picsum',
        name: 'Lorem Picsum',
        description: '随机占位图片',
        href: 'https://picsum.photos/',
        category: '开发工具',
    },
    {
        id: 'pake',
        name: 'Pake',
        description: '利用 Rust 轻松构建轻量级多端桌面应用 (打包网页)。',
        href: 'https://github.com/tw93/Pake',
        category: '开发工具',
    },
    {
        id: 'astexplorer',
        name: 'AST Explorer',
        description: 'AST 在线查看器',
        href: 'https://astexplorer.net/',
        category: '开发工具'
    },
    {
        id: 'fumadocs',
        name: 'Fumadocs',
        description: 'Fumadocs 是一个基于 nextjs 面向开发人员的现代文档框架',
        href: 'https://fumadocs.vercel.app/',
        category: '开发工具',
    },
    {
        id: 'slidev',
        name: 'Slidev',
        description: 'Slidev 位开发者打造的演示文稿工具',
        href: 'https://cn.sli.dev/',
        category: '开发工具',
    },
    {
        id: 'curlconverter',
        name: 'CurlConverter',
        description: '将 curl 命令转换为多种编程语言的代码。',
        href: 'https://curlconverter.com/',
        category: '开发工具',
    },
    {
        id: 'shields-io',
        name: 'Shields.io',
        description: '为开源项目创建信息徽章 (小标签)。',
        href: 'https://shields.io/',
        category: '开发工具',
    },
    {
        id: 'css-box-shadow-examples',
        name: 'CSS Box Shadow Examples',
        description: '漂亮的 CSS 盒子阴影示例集合。',
        href: 'https://getcssscan.com/css-box-shadow-examples',
        category: '开发工具',
    },
    {
        id: 'sealos',
        name: 'Sealos',
        description: '一站式云开发平台，提供即时协作开发、无缝部署和环境隔离能力，助您高效管理开发工作流程，轻松实现团队协作。',
        href: 'https://sealos.run/',
        category: '开发工具',
    }
]

const mcpTools: Tool[] = [
    {
        id: 'yun-music',
        name: 'YUN Music',
        description: 'YUN MCP 音乐工具',
        href: '/blog/yun-music',
        category: 'MCP',
    },
    {
        id: 'pydantic-python-mcp',
        name: 'mcp-run-python',
        description: 'Pydantic 官方出品，在安全的沙盒环境中运行 Python 代码，适合开发编程代理。',
        href: 'https://github.com/pydantic/pydantic-ai/tree/main/mcp-run-python',
        category: 'MCP',
    },
    {
        id: 'jetbrains-mcp',
        name: 'JetBrains MCP',
        description: 'JetBrains 出品，为 JetBrains IDE 提供模型上下文协议（MCP）服务器功能。',
        href: 'https://github.com/JetBrains/mcp-jetbrains',
        category: 'MCP',
    },
    {
        id: 'playwright-mcp',
        name: 'Playwright MCP',
        description: '微软的Playwright MCP服务器，为大型语言模型提供浏览器自动化能力，通过结构化可访问性快照与网页交互。',
        href: 'https://github.com/microsoft/playwright-mcp',
        category: 'MCP',
    },
    {
        id: 'smithery',
        name: 'Smithery',
        description: 'MCP 服务集合',
        href: 'https://smithery.ai/',
        category: 'MCP',
    },
    {
        id: 'mcp-filesystem',
        name: 'MCP Filesystem',
        description: '使用可配置的访问控件安全文件操作',
        href: 'https://github.com/modelcontextprotocol/servers/blob/main/src/filesystem',
        category: 'MCP',
    },
    {
        id: 'mcp-github',
        name: 'MCP GitHub',
        description: '存储库管理，文件操作和GitHub API集成',
        href: 'https://github.com/modelcontextprotocol/servers/blob/main/src/github',
        category: 'MCP',
    },
    {
        id: 'mcp-google-drive',
        name: 'MCP Google Drive',
        description: '文件访问和搜索功能的Google Drive',
        href: 'https://github.com/modelcontextprotocol/servers/blob/main/src/gdrive',
        category: 'MCP',
    },
    {
        id: 'mcp-blender',
        name: 'MCP Blender',
        description: 'MCP 实现快速辅助 3D 建模、场景创建和操作',
        href: 'https://github.com/ahujasid/blender-mcp',
        category: 'MCP',
    },
    {
        id: 'mcp-browser-tools',
        name: 'MCP BrowserTools',
        description: 'MCP 浏览器监控和交互工具',
        href: 'https://github.com/AgentDeskAI/browser-tools-mcp',
        category: 'MCP',
    },
    {
        id: 'smithery',
        name: 'Smithery',
        description: 'MCP 服务集合',
        href: 'https://smithery.ai/',
        category: 'MCP',
    }

];

const aiCommunityTools: Tool[] = [
    {
        id: 'hugging-face',
        name: 'Hugging Face',
        description: '机器学习社区在模型、数据集和应用程序上进行协作的平台。',
        href: 'https://huggingface.co/',
        category: 'AI 社区',
    },
    {
        id: 'modelscope',
        name: '魔搭社区',
        description: '阿里巴巴通义旗下 AI 社区。共享 · 共创 · 共进，构建持续创新的 AI 开源生态。',
        href: 'https://www.modelscope.cn/home',
        category: 'AI 社区',
    },
    {
        id: 'bohrium',
        name: 'Bohrium',
        description: '有免费额度适合学习。',
        href: 'https://bohrium.dp.tech',
        category: 'AI 社区',
    },
    {
        id: 'lmarena',
        name: 'Lmarena',
        description: '免费的大模型竞技场，可以体验国内外主流大模型。',
        href: 'https://lmarena.ai/',
        category: 'AI 社区'
    },
    {
        id: 'autodl',
        name: 'AutoDL',
        description: '稳定可靠、价格公道的GPU租赁算力云',
        href: 'https://www.autodl.com/',
        category: 'AI 社区'
    },
]

const llmProviderTools: Tool[] = [
    {
        id: 'claude',
        name: 'Claude',
        description: 'Anthropic自研模型，代码编写方向突出。',
        href: 'https://claude.ai',
        category: 'AI 模型'
    },
    {
        id: 'chat-gpt',
        name: 'Chat GPT',
        description: 'ChatGPT（全名：Chat Generative Pre-trained Transformer）。OpenAI 于2022年11月30日发布, 开启了 AI 元年的序幕。',
        href: 'https://chatgpt.com/',
        category: 'AI 模型',
    },
    {
        id: 'grok',
        name: 'Grok',
        description: 'Grok 是由 xAI 设计的一款免费 AI 助手，旨在最大化事实与客观性。Grok 提供实时搜索、图像生成、趋势分析等多种功能。',
        href: 'https://grok.com/',
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        description: '深度求索（DeepSeek），成立于2023年，专注于研究世界领先的通用人工智能底层模型与技术，挑战人工智能前沿性难题。',
        href: 'https://deepseek.com/',
    },
    {
        id: 'minimax',
        name: 'MiniMax',
        description: 'MiniMax 成立于 2022 年初，致力于通过“人人共享智能”的使命，推动人工智能向通用人工智能（AGI）迈进。',
        href: 'https://minimax.io/',
        category: 'AI 模型',
    },
    {
        id: 'glm',
        name: 'GLM',
        description: '清华大学 KEG 实验室和智谱 AI 联合发布的通用大模型。',
        href: 'https://bigmodel.cn/',
        category: 'AI 模型',
    },
    {
        id: 'gemini',
        name: 'Gemini',
        description: '谷歌双子座。在长文本小说写作方向突出。',
        href: 'https://gemini.google.com/prompt',
        category: 'AI 模型',
    },
    {
        id: 'kimi',
        name: 'Kimi',
        description: '由月之暗面发布, 长文本突出。',
        href: 'https://kimi.moonshot.cn/',
        category: 'AI 模型',
    },
    {
        id: 'tongyi-qianwen',
        name: '通义千问',
        description: '国内开源大模型, 多模态多参数。',
        href: 'https://tongyi.aliyun.com/qianwen',
        category: 'AI 模型',
    },
    {
        id: 'wenxin-yiyan',
        name: '文心一言',
        description: '百度自研模型。',
        href: 'https://yiyan.baidu.com/welcome',
        category: 'AI 模型'
    },
    {
        id: 'doubao',
        name: '豆包',
        description: '字节自研大模型，应用体验极佳。',
        href: 'https://www.doubao.com/chat/',
        category: 'AI 模型'
    },
    {
        id: 'xf-xinghuo',
        name: '星火',
        description: '科大讯飞自研模型。',
        href: 'https://xinghuo.xfyun.cn/desk',
        category: 'AI 模型'
    },
    {
        id: 'ocoolai',
        name: 'ocoolAI',
        description: '大模型 API 聚合服务商',
        href: 'https://one.ooo.cool/',
        category: '模型服务商'
    },
    {
        id: 'siliconflow',
        name: '硅基流动',
        description: '为开发者和企业提供高效、低成本且全面的生成式人工智能（GenAI）模型服务',
        href: 'https://siliconflow.cn/zh-cn/',
        category: '模型服务商'
    },
    {
        id: 'o3',
        name: 'O3',
        description: '多服务商模型集成系统,大模型 API 聚合服务商',
        href: 'https://o3.fan/',
        category: '模型服务商'
    },
    {
        id: 'jimeng',
        name: '即梦',
        description: 'AI 绘图工具。',
        href: 'https://jimeng.jianying.com/ai-tool/home',
        category: '模型服务商'
    },
    {
        id: 'ailogomaker',
        name: 'AILogoMaker',
        description: '免费 AI LOGO 生成。',
        href: 'https://ailogomaker.io/zh-CN/app',
        category: '模型服务商',
    },
    {
        id: '火山方舟',
        name: '火山方舟',
        description: '火山方舟是字节跳动推出的通用人工智能平台，提供多种 AI 模型和服务，支持文本、图像等多模态交互。',
        href: 'https://www.volcengine.com/',
        category: '模型服务商',
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        description: 'OpenRouter 是一个 AI 模型聚合平台，提供多种模型的 API 接入，支持多种编程语言和框架。',
        href: 'https://openrouter.ai/',
        category: '模型服务商',
    },
    {
        id: 'azure',
        name: 'Azure',
        description: '微软的云计算平台，提供多种 AI 服务和模型，包括 Azure OpenAI Service。',
        href: 'https://azure.microsoft.com/zh-cn/',
        category: '模型服务商',
    },
    {
        id: 'ollama',
        name: 'Ollama',
        description: '一个开源的 AI 模型运行平台，支持多种模型的本地部署和运行。',
        href: 'https://ollama.com/',
        category: '模型服务商',
    },

]

const aiTools: Tool[] = [
    {
        id: 'everywhere',
        name: 'Everywhere',
        description: '具备情境感知能力的交互式 AI 助手，即时感知并理解屏幕上的任何内容。',
        href: 'https://github.com/DearVa/Everywhere',
        category: 'AI 衍生工具'
    },
    {
        id: 'wan-2.2-animate-14b',
        name: 'Wan 2.2 Animate 14B',
        description: '角色动画和替换的统一模型，能够实现整体动作和表情的复制。',
        href: 'https://huggingface.co/Wan-AI/Wan2.2-Animate-14B',
        category: 'AI 衍生工具'
    },
    {
        id: 'vizard-audio2text',
        name: 'Vizard Audio2Text',
        description: '使用人工智能自动将音频转录为文本，在线，免费。支持超过130种语言。',
        href: 'https://vizard.ai/cn/tools/transcribe-audio-to-text',
        category: 'AI 衍生工具'
    },
    {
        id: 'nero',
        name: 'Nero AI',
        description: '图片借助模型高清修复至最高4x清晰度工具',
        href: 'https://ai.nero.com/zh-cn',
        category: 'AI 衍生工具'
    },
    {
        id: 'free-qwen3',
        name: 'Free Qwen3',
        description: '世界首个免费无限制 分布式 AI 算力平台',
        href: 'https://qwen3.slmnb.cn',
        category: 'AI 衍生工具'
    },
    {
        id: 'lm-speed',
        name: 'LM Speed',
        description: '全面的速度测试和分析优化 AI 应用性能',
        href: 'https://lmspeed.net/',
        category: 'AI 衍生工具'
    },
    {
        id: 'napkin-ai',
        name: 'Napkin AI',
        description: '将文本内容自动生成可编辑的可视化图表、流程图和信息图，适用于演示、博客、社交媒体等多场景。',
        href: 'https://www.napkin.ai/',
        category: 'AI 衍生工具'
    },
    {
        id: 'mathmodelagent',
        name: 'MathModelAgent',
        description: '一个专注于数学建模的AI智能体，提供模型构建、求解和分析的一站式服务。',
        href: 'https://github.com/jihe520/MathModelAgent',
        category: 'AI 衍生工具'
    },
    {
        id: 'scribe',
        name: 'Scribe',
        description: 'AI 根据操作生成产品文档。',
        href: 'https://scribehow.com',
        category: 'AI 衍生工具'
    },
    {
        id: 'jan-ai',
        name: 'Jan AI',
        description: '本地大模型使用解决方案，界面美观，无中文语言支持。一个开源 ChatGPT 替代方案，100% 离线运行。',
        href: 'https://jan.ai/',
        category: 'AI 衍生工具',
    },
    {
        id: 'jan-ai',
        name: 'Jan AI',
        description: '本地大模型使用解决方案，界面美观，无中文语言支持。一个开源 ChatGPT 替代方案，100% 离线运行。',
        href: 'https://jan.ai/',
        category: 'AI 衍生工具',
    },
    {
        id: 'aieditor',
        name: 'AIEditor',
        description: '集成 AI 的前端富文本编辑器。',
        href: 'https://aieditor.dev/',
        category: 'AI 衍生工具',
    },
    {
        id: 'memo-ai',
        name: 'Memo AI',
        description: 'YouTube、播客、本地音频视频轻松转文字、字幕翻译、语音合成，还可以由多种 AI 模型提炼内容精华总结，生成思维导图。',
        href: 'https://memo.ac/zh/',
        category: 'AI 衍生工具',
    },
    {
        id: 'ttson-old',
        name: 'TTS-Old',
        description: '文本转语音工具 (旧版)。',
        href: 'https://old.ttson.cn/',
        category: 'AI 衍生工具'
    },
    {
        id: 'ttson-new',
        name: 'TTS-New',
        description: '文本转语音工具 (新版)。',
        href: 'https://www.ttson.cn/',
        category: 'AI 衍生工具'
    },
    {
        id: 'ttsmaker',
        name: 'TTSMAKER',
        description: '文本转语音工具。',
        href: 'https://ttsmaker.cn/',
        category: 'AI 衍生工具'
    },
    {
        id: 'cherry-studio',
        name: 'Cherry Studio',
        description: '一个多模型对话、知识库管理、AI绘图和翻译于一体的AI助手平台。',
        href: 'https://docs.cherry-ai.com/',
        category: 'AI 衍生工具',
    },
    {
        id: 'chatwise',
        name: 'ChatWise',
        description: '最快的AI聊天机器人，支持多种LLM模型，并提供多模态聊天、本地数据存储和网页搜索等功能。',
        href: 'https://chatwise.app/',
        category: 'AI 衍生工具',
    },
    {
        id: '5ire-ai-zhushou',
        name: '5ire AI 助手',
        description: '免费开源的桌面 AI 助手和模型上下文协议（MCP）客户端。',
        href: 'https://5ire.app/#supported-providers',
        category: 'AI 衍生工具',
    },
    {
        id: 'witsy',
        name: 'Witsy',
        description: '一个包含多种功能的桌面端GPT助手 (聊天, 草稿板, 智能指令等)。',
        href: 'https://witsyai.com',
        category: 'AI 衍生工具',
    },
    {
        id: 'same',
        name: 'Same',
        description: '自然语言提示即可无代码快速创建、迭代并部署 AI 驱动的 Web 应用',
        href: 'https://same.new/',
        category: 'AI 衍生工具',
    },
]

const designTools: Tool[] = [
    {
        id: 'free-font',
        name: 'Free Font',
        description: '免费商用字体下载。',
        href: 'https://github.com/jaywcjlove/free-font',
        category: '图标库',
    },
    {
        id: 'lucide',
        name: 'Lucide',
        description: '一个简单且可定制的开源图标库，包含超过 450 个图标。',
        href: 'https://lucide.dev/',
        category: '图标库',
    },
    {
        id: 'heroicons',
        name: 'Heroicons',
        description: '精美的手工制作的 SVG 图标，由 Tailwind CSS 的制作者提供。',
        href: 'https://heroicons.com/',
        category: '图标库',
    },
    {
        id: 'iconkitchen',
        name: 'IconKitchen',
        description: '生成简洁的应用图标。',
        href: 'https://icon.kitchen',
        category: '图标库',
    },
    {
        id: 'logofast',
        name: 'LogoFast',
        description: '生成简洁的应用图标。',
        href: 'https://logofa.st/',
        category: '图标库',
    },
    {
        id: 'free-app-icon',
        name: 'Free App Icon',
        description: '下载公开软件的应用图标。',
        href: 'https://appicons.co/',
        category: '图标库',
    },
    {
        id: 'vectorcraftr',
        name: 'vectorCraftr',
        description: '开源插画网站。',
        href: 'https://vectorcraftr.com/',
        category: '图标库',
    },
    {
        id: 'undraw',
        name: 'unDraw',
        description: '各个领域的插画，可自定义颜色。',
        href: 'https://undraw.co/illustrations',
        category: '图标库',
    },
]

const serverTools: Tool[] = [
    {
        id: 'fastfetch',
        name: 'Fastfetch',
        description: '终端系统信息获取工具，注重性能和可定制性。',
        href: 'https://github.com/fastfetch-cli/fastfetch',
        category: '命令行工具',
    },
    {
        id: 'fd-find',
        name: 'fd (fd-find)',
        description: 'find 命令的简单、快速和用户友好的替代品。',
        href: 'https://github.com/sharkdp/fd',
        category: '命令行工具',
    },
    {
        id: 'starship',
        name: 'Starship',
        description: '轻量、迅速、客制化的高颜值终端！',
        href: 'https://starship.rs/zh-CN/',
        category: '命令行工具',
    },
    {
        id: 'trzsz-tssh',
        name: 'trzsz / tssh',
        description: '优秀的文件传输工具 (trz/tsz) 和兼容 tmux 的 ssh 客户端替代品 (tssh)。',
        href: 'https://trzsz.github.io/cn/',
        category: '命令行工具',
    },
    {
        id: 'akile-monitor',
        name: 'Akile Monitor',
        description: '开源、轻量、易用、简洁的服务器监控。',
        href: 'https://github.com/akile-network/akile_monitor',
        category: '服务器监控',
    },
    {
        id: 'uptime-kuma',
        name: 'uptime Kuma',
        description: '开源免费的易于使用的自托管的服务监控工具。',
        href: 'https://github.com/louislam/uptime-kuma',
        category: '服务器监控',
    },
    {
        id: 'beszel',
        name: 'Beszel',
        description: '轻量级服务器监控平台，包含 Docker 统计、历史数据和警报功能。',
        href: 'https://github.com/henrygd/beszel',
        category: '服务器监控',
    },
]

// 从 tools.md 提取的新工具数据
const otherTools: Tool[] = [
    {
        id: 'spleeter',
        name: 'Spleeter',
        description: '由 Deezer 开发的开源音频分离工具，能够将音乐轨道分离为独立的声道，如人声和伴奏。',
        href: 'https://github.com/deezer/spleeter',
        category: '音频处理',
    },
    {
        id: 'betta-fish',
        name: 'BettaFish',
        description: '舆情分析的多智能体数据分析与监控系统项目',
        href: 'https://github.com/666ghj/BettaFish',
        category: '数据分析',
    },
    {
        id: 'frigate-nvr',
        name: 'Frigate NVR',
        description: '一款开源本地 AI 物体检测的网络视频录像（NVR）系统，支持隐私保护与智能家居集成。',
        href: 'https://frigate.video/',
        category: '监控系统'
    },
    {
        id: 'it-tools',
        name: 'IT Tools',
        description: '在线开发工具集。',
        href: 'https://it-tools.tech/',
        category: '工具集',
    },
    {
        id: 'qq-browser-tools',
        name: 'QQ浏览器工具集',
        description: '腾讯QQ浏览器提供的在线工具集。',
        href: 'https://tool.browser.qq.com/',
        category: '工具集',
    },
    {
        id: 'spiderbox',
        name: '虫盒',
        description: '爬虫工具箱。',
        href: 'https://spiderbox.cn',
        category: '工具集',
    },
    {
        id: 'docsmall',
        name: 'docsmall',
        description: '在线文件处理工具集 (PDF压缩等)。',
        href: 'https://docsmall.com/pdf-compress',
        category: '工具集',
    },
    {
        id: 'barcode-maker',
        name: '条形码生成器',
        description: '一个开源在线工具，用于快速创建各种类型的条形码，支持多种格式导出，适用于产品管理、库存控制等。',
        href: 'https://barcode-maker.com/zh',
        category: '工具集'
    },
    {
        id: 'bongo-cat',
        name: 'Bongo Cat',
        description: '可爱的"打击乐猫"桌面宠物。',
        href: 'https://github.com/ayangweb/BongoCat',
        category: '桌面工具'
    },
    {
        id: 'wallspic',
        name: 'Wallspic',
        description: '免费的壁纸软件',
        href: 'https://wallspic.com/cn',
        category: '壁纸资源',
    },
    {
        id: '100font',
        name: '100 Font',
        description: '聚合字体网站，包含免费及付费的文字',
        href: 'https://www.100font.com/',
        category: '字体资源',
    },
    {
        id: 'pixabay',
        name: 'Pixabay',
        description: '免费正版的音频、视频、图片网站',
        href: 'https://pixabay.com/zh/',
        category: '设计资源',
    },
    {
        id: 'vtracer',
        name: 'vtracer',
        description: '将 JPEG/PNG 等光栅图像转换为矢量图 SVG。',
        href: 'https://github.com/visioncortex/vtracer',
        category: '文件转换',
    },
    {
        id: 'next-bconvert',
        name: 'Next BConvert',
        description: '一个免费、快速的在线文件转换工具，支持在浏览器中进行图像、音频和文档格式的批量转换与编辑，注重用户隐私保护。',
        href: 'https://nextbconvert.com/',
        category: '文件转换'
    },
    {
        id: 'omakub',
        name: 'OMAKUB',
        description: 'Ubuntu 集成开发环境一键安装。',
        href: 'https://omakub.org/',
        category: '开发环境',
    },
    {
        id: 'tubedown',
        name: 'TubeDown',
        description: '专注下载YouTube视频，音乐，字幕与封面，兼容多个网站。',
        href: 'https://tubedown.cn/',
        category: '解析工具',
    },
    {
        id: 'snapany',
        name: 'SnapAny',
        description: '万能视频图片解析下载',
        href: 'https://snapany.com/zh',
        category: '解析工具'
    },
    {
        id: 'kedou-视频解析',
        name: 'Kedou视频解析',
        description: '支持超1000+视频网站的视频、图片、音频及文档解析下载，提供无水印下载和多线程下载器。',
        href: 'https://www.kedou.life/',
        category: '解析工具'
    },
    {
        id: 'xyjun',
        name: '视频解析',
        description: '免费全网VIP视频会员免广告看电影',
        href: 'http://www.xyjun.com/vip/',
        category: '解析工具',
    },
    {
        id: 'freefilesync',
        name: 'FreeFileSync',
        description: '高效免费的文件同步软件',
        href: 'https://freefilesync.org/',
        category: '文件同步',
    },
    {
        id: 'patorjk-taag',
        name: 'Text to ASCII Art',
        description: '在线生成 ASCII 艺术字。',
        href: 'https://www.patorjk.com/software/taag/#p=display&f=Rectangles&t=DF-CLI',
        category: '趣味工具',
    },
    {
        id: 'excalidraw',
        name: 'Excalidraw',
        description: '虚拟协作白板工具，类手写风格, 简洁易用。',
        href: 'https://excalidraw.com/',
        category: '绘图工具',
    },
    {
        id: 'tldraw',
        name: 'Tldraw',
        description: '简单有趣的在线绘图工具。',
        href: 'https://www.tldraw.com',
        category: '绘图工具',
    },
    {
        id: 'easychuan',
        name: '轻松传',
        description: '跨设备文件互传工具。',
        href: 'https://easychuan.cn/?mode=standalone',
        category: '文件传输',
    },
    {
        id: 'howtocook',
        name: '程序员做饭指南',
        description: '教程序员做饭的菜谱集合。🤣',
        href: 'https://github.com/Anduin2017/HowToCook/',
        category: '趣味工具',
    },
    {
        id: 'netbian',
        name: '彼岸图网',
        description: '免费壁纸网站。',
        href: 'https://pic.netbian.com/',
        category: '设计资源',
    },
    {
        id: 'bootcdn',
        name: 'Boot CDN',
        description: '稳定、快速、免费的前端开源项目 CDN 加速服务。',
        href: 'https://www.bootcdn.cn/',
        category: 'CDN 服务',
    },
    {
        id: 'free-api',
        name: 'FREE-API',
        description: '免费 API 接口集合。',
        href: 'https://www.free-api.com/',
        category: 'API 服务',
    },
    {
        id: 'datafountain',
        name: 'DataFountain',
        description: '人工智能数据集和竞赛平台。',
        href: 'https://www.datafountain.cn/datasets',
        category: '数据集',
    },
    {
        id: 'sms-activate',
        name: 'sms-activate',
        description: '在线接码平台。',
        href: 'https://sms-activate.io/cn',
        category: 'API 服务',
    },
    {
        id: 'tututo',
        name: '图图',
        description: '免费在线图床。',
        href: 'https://tutu.to/upload',
        category: '图床',
    },
    {
        id: 'Umami',
        name: 'Umami',
        description: '开源、隐私友好的网页分析工具。',
        href: 'https://umami.is/',
        category: '网站分析',
    }
];

const netTools: Tool[] = [
    {
        id: 'zashboard',
        name: 'zashboard',
        description: 'Mihomo 内核 Web 控制台',
        href: 'https://github.com/Zephyruso/zashboard',
        category: '网络工具',
    },
    {
        id: 'wetest',
        name: '微测网',
        description: '提供全球主流云服务商的 CDN IP 优选、节点状态监测等服务，助力您的网络连接。',
        href: 'https://www.wetest.vip/',
        category: '网络工具',
    },
    {
        id: 'natfrp',
        name: 'SAKURA FRP',
        description: '免费易用的内网穿透工具，提供稳定的端口映射服务。',
        href: 'www.natfrp.com',
        category: '网络工具',
    },
    {
        id: 'ustc-speedtest',
        name: '中科大测速网站',
        description: '中国科学技术大学提供的网络测速服务。',
        href: 'https://test.ustc.edu.cn/#',
        category: '网络工具',
    },
    {
        id: 'ipinfo-lite',
        name: 'IPinfo Lite',
        description: '一个轻量级的 IP 地址查询工具，提供快速、简洁的 IP 地理位置和元数据查询服务。',
        href: 'https://ipinfo.io/lite',
        category: '网络工具'
    },
    {
        id: 'itdog-http',
        name: 'IT Dog HTTP 测试',
        description: '测试目标网站的访问速度和可用性。',
        href: 'https://www.itdog.cn/http/',
        category: '网络工具',
    },
    {
        id: 'suburl',
        name: '订阅转换',
        description: '订阅转换工具，支持将各种订阅链接转换为标准格式。',
        href: 'https://suburl.v1.mk/',
        category: '网络工具'
    },
    {
        id: 'digital-plat',
        name: 'DigitalPlat',
        description: '提供永久免费的域名',
        href: 'https://dash.domain.digitalplat.org/',
        category: '网络工具'
    },
    {
        id: 'gh-proxy',
        name: 'Github 加速',
        description: '将GitHub链接转换为多区域加速链接，解决GitHub访问慢、下载失败等问题',
        href: 'https://gh-proxy.com/',
        category: '网络工具'
    },
]

// 存储所有工具，确保 id 唯一
const allToolDataMap = new Map<string, Tool>();

[
    ...localTools,
    ...devTools,
    ...mcpTools,
    ...aiCommunityTools,
    ...llmProviderTools,
    ...aiTools,
    ...designTools,
    ...serverTools,
    ...otherTools,
    ...netTools
].forEach(tool => {
    if (!allToolDataMap.has(tool.id)) {
        allToolDataMap.set(tool.id, tool); // 添加唯一工具到 Map
    }
});

// 将 Map 转回数组
const allToolsArray = Array.from(allToolDataMap.values());

export function getAllTools(): Tool[] {
    return allToolsArray; // 返回包含所有唯一工具的数组
}

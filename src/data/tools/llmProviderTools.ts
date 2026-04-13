import { Tool } from "@/types/tools";

export const llmProviderTools: Tool[] = [
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
        category: 'AI 模型',
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        description: '深度求索（DeepSeek），成立于2023年，专注于研究世界领先的通用人工智能底层模型与技术，挑战人工智能前沿性难题。',
        href: 'https://deepseek.com/',
        category: 'AI 模型',
    },
    {
        id: 'minimax',
        name: 'MiniMax',
        description: 'MiniMax 成立于 2022 年初，致力于通过"人人共享智能"的使命，推动人工智能向通用人工智能（AGI）迈进。',
        href: 'https://www.minimaxi.com/',
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
        id: 'megallm',
        name: 'MegaLLM',
        description: 'MegaLLM 是一个 API 中转服务，支持主流模型 OpenAI、Anthropic、Google、Meta 等',
        href: 'https://megallm.io/',
        category: '模型服务商'
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
    {
        id: 'promptpilot',
        name: 'PromptPilot',
        description: '火山引擎提供的提示词管理与优化平台。',
        href: 'https://promptpilot.volcengine.com/home',
        category: '模型服务商',
    }
];

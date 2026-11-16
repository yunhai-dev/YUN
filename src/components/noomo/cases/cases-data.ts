export interface CaseStudyData {
  slug: string;
  image: string;
  accentGradient: [string, string];
  hero: {
    title: string;
    tags: string[];
    caseLink: string;
    buttonText: string;
    external?: boolean;
  };
  body: {
    title: string;
    texts: string;
  };
  next: {
    title: string;
    link: string;
  };
}

export const NOOMO_CASES: Record<string, CaseStudyData> = {
  clouisle: {
    slug: 'clouisle',
    image: 'https://rustfs-endpoint.yhnotes.com/content/admin-panel.webp',
    accentGradient: ['#0b1635', '#1b2d68'],
    hero: {
      title: 'Clou<span class="text-serif-66">is</span>le',
      tags: ['AI Agent', 'RAG 知识库', 'Workflow 编排'],
      caseLink: 'https://clouisle.asia',
      buttonText: '访问站点',
      external: true,
    },
    body: {
      title:
        '<span class="text-serif-50">将</span> 零散的知识与多模型工作流，编织成真正可落地的企业级 AI 协作底座。',
      texts: `
        <p>Clouisle 是我持续打磨的 AI 知识库与工作流平台。在构建过大量 LLM 应用之后，我越来越意识到：单次对话只能解决表层问题，真正决定生产力上限的，是文档解析、向量检索（RAG）与可视化工作流之间的无缝协同。</p>
        <p>系统后端基于 Python 与异步任务队列构建，支持多模态文档切片、混合检索重排以及 MCP 工具挂载；前端则以清晰直观的控制台呈现知识图谱、模型路由与实时调试面板。</p>
        <p>我们希望让开发者与团队不必反复造轮子，就能在一套统一而透明的架构之上，快速部署属于自己的智能体应用。</p>
      `,
    },
    next: {
      title: 'D0 Tools',
      link: '/cases/d0-tools',
    },
  },
  'd0-tools': {
    slug: 'd0-tools',
    image: 'https://rustfs-endpoint.yhnotes.com/content/data-label.webp',
    accentGradient: ['#10182b', '#273b69'],
    hero: {
      title: 'D0 <span class="text-serif-66">To</span>ols',
      tags: ['数据标注', 'AI 辅助', 'Open Source'],
      caseLink: 'https://github.com/yunhai-dev/D0-Tools',
      buttonText: '查看源码',
      external: true,
    },
    body: {
      title:
        '<span class="text-serif-50">让</span> 繁琐的数据清洗与标注流程，在智能预标与高效交互中变得轻盈而准确。',
      texts: `
        <p>模型效果的上限往往取决于数据质量，而传统的数据标注工作总是枯燥且容易出错。D0 Tools 诞生于真实的数据工程需求，旨在用自动化预处理与大模型辅助标注，把人从重复劳动中解放出来。</p>
        <p>工具内置了灵活的任务流水线与快捷键驱动的标注界面，支持文本分类、实体抽取及自定义 Schema 校验，能够直接衔接微调与评估流程。</p>
        <p>作为开源项目，D0 Tools 追求「开箱即用、足够克制」——没有冗余配置，只保留真正提升标注吞吐量的核心能力。</p>
      `,
    },
    next: {
      title: 'Crawlsy',
      link: '/cases/crawlsy',
    },
  },
  crawlsy: {
    slug: 'crawlsy',
    image: 'https://rustfs-endpoint.yhnotes.com/content/carwlsy.png',
    accentGradient: ['#081326', '#16325c'],
    hero: {
      title: 'Crawl<span class="text-serif-66">sy</span>',
      tags: ['数据采集', '协议逆向', 'Python 异步'],
      caseLink: 'https://github.com/yunhai-dev/crawlsy',
      buttonText: '查看源码',
      external: true,
    },
    body: {
      title:
        '<span class="text-serif-50">在</span> 动态反爬与加密协议交织的网页世界里，构建高可扩展的工程化采集框架。',
      texts: `
        <p>Crawlsy 凝聚了我在数据工程与 JavaScript 逆向分析中的长期实践。面对 WebSocket 加密通信、动态签名校验以及复杂页面调度，仅靠零散脚本很快就会陷入维护泥潭。</p>
        <p>因此 Crawlsy 采用高度模块化的中间件架构，将请求调度、指纹伪装、代理池管理与结构化解析彻底解耦，让每一个采集任务都能像工程模块一样复用与监控。</p>
        <p>它既能胜任轻量级的定时抓取，也能够通过异步并发扩展至大规模公开数据采集场景。</p>
      `,
    },
    next: {
      title: 'Yundownload',
      link: '/cases/yundownload',
    },
  },
  yundownload: {
    slug: 'yundownload',
    image: '/atelier/featured-work.webp',
    accentGradient: ['#0a1428', '#1f355e'],
    hero: {
      title: 'Yun<span class="text-serif-66">down</span>load',
      tags: ['CLI 工具', '多协议并发', '断点续传'],
      caseLink: 'https://github.com/yunhai-dev/yundownload',
      buttonText: '查看源码',
      external: true,
    },
    body: {
      title:
        '<span class="text-serif-50">回归</span> 命令行的纯粹速度：一个为开发者打造的多协议异步下载器。',
      texts: `
        <p>Yundownload 源于日常开发与大文件分发中的高频痛点——面对分片流媒体、HTTP 大文件与不稳定的网络环境，我需要一个足够轻量、直观且可控的命令行下载工具。</p>
        <p>项目围绕异步协程与分块并发调度构建，支持自动重试、限速控制、断点续传与清晰的终端进度可视化，在保持低内存占用的同时榨干带宽潜力。</p>
        <p>越是基础的工具，越值得在细节处打磨边界条件与交互反馈。</p>
      `,
    },
    next: {
      title: 'Naive for Qt',
      link: '/cases/naive-for-qt',
    },
  },
  'naive-for-qt': {
    slug: 'naive-for-qt',
    image: '/atelier/hero.webp',
    accentGradient: ['#0c152d', '#243a6e'],
    hero: {
      title: 'Naive <span class="text-serif-66">for</span> Qt',
      tags: ['Desktop UI', 'Qt 组件库', 'Design System'],
      caseLink: 'https://github.com/yunhai-dev/naive-for-qt',
      buttonText: '查看源码',
      external: true,
    },
    body: {
      title:
        '<span class="text-serif-50">把</span> 现代 Web 设计系统的克制与灵动，带入原生 Qt 桌面应用世界。',
      texts: `
        <p>传统的桌面端开发往往在「原生性能」与「现代视觉」之间难以兼顾。Naive for Qt 借鉴了现代前端组件库的设计语言，为 Qt 应用提供了一套开箱即用、高度可定制的 UI 组件体系。</p>
        <p>从圆角阴影、主题 Token、平滑状态过渡到表单与弹窗交互，每个控件都经过像素级调校，让开发者无需从零编写繁琐的 QSS 样式表即可获得一致的质感。</p>
        <p>这是我在跨端美学与桌面工程之间的一次有趣探索。</p>
      `,
    },
    next: {
      title: 'Job Hive',
      link: '/cases/job-hive',
    },
  },
  'job-hive': {
    slug: 'job-hive',
    image: '/atelier/note-0.webp',
    accentGradient: ['#091326', '#1e3259'],
    hero: {
      title: 'Job <span class="text-serif-66">Hi</span>ve',
      tags: ['岗位聚合', '智能匹配', 'Full Stack'],
      caseLink: 'https://github.com/yunhai-dev/job_hive',
      buttonText: '查看源码',
      external: true,
    },
    body: {
      title:
        '<span class="text-serif-50">用</span> 工程化聚合与语义检索，在海量招聘信息中精准定位真正契合的机会。',
      texts: `
        <p>求职过程中最消耗精力的，往往不是准备面试本身，而是在碎片化的平台之间反复筛选、去重与比对需求。Job Hive 试图用全栈工程能力重构这一过程。</p>
        <p>平台将多源职位信息进行清洗、标准化与标签提取，并结合语义相似度计算，帮助求职者快速过滤噪音，把注意力留给真正匹配的岗位。</p>
        <p>这是数据采集、后端检索与现代 Web 交互结合的一次完整全栈实践。</p>
      `,
    },
    next: {
      title: 'Yun Chat',
      link: '/cases/yun-chat',
    },
  },
  'yun-chat': {
    slug: 'yun-chat',
    image: '/atelier/closing.webp',
    accentGradient: ['#0b1633', '#293e7a'],
    hero: {
      title: 'Yun <span class="text-serif-66">Ch</span>at',
      tags: ['LLM Playground', '多模型对话', '流式交互'],
      caseLink: '/chat/',
      buttonText: '立即体验',
      external: false,
    },
    body: {
      title:
        '<span class="text-serif-50">一个</span> 简洁、高速、可直接运行在站内的全栈 AI 对话游乐场。',
      texts: `
        <p>Yun Chat 是云云亦海站内直接集成的 AI 对话实验空间，支持多模型切换、流式 Markdown/代码高亮输出以及上下文会话管理。</p>
        <p>在设计它时，我刻意去掉了所有喧宾夺主的装饰，只保留流畅的打字机流式反馈、清晰的 Prompt 控制以及随时可复制的代码块体验。</p>
        <p>你可以点击上方按钮直接在站内开启对话，也可以在 GitHub 上查阅完整源码。</p>
      `,
    },
    next: {
      title: 'Clouisle',
      link: '/cases/clouisle',
    },
  },
};

export const NOOMO_CASE_SLUGS = Object.keys(NOOMO_CASES);

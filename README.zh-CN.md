# 云海

基于Next.js构建的个人网站，用于分享技术文章、项目经验和生活点滴。

## 技术栈

- **框架**: Next.js 15.3.3 (App Router)
- **UI 组件**: Radix UI
- **样式**: Tailwind CSS
- **动画**: Framer Motion, GSAP
- **Markdown 处理**: Marked, Remark
- **代码高亮**: Highlight.js
- **图表**: Mermaid
- **类型系统**: TypeScript
- **API文档**: OpenAPI 查看器

## 项目结构

```
src/
├── app/           # Next.js 应用主目录
│   ├── about/     # 关于页面
│   ├── api/       # API文档页面
│   ├── blog/      # 博客相关页面
│   ├── contact/   # 联系页面
│   ├── docs/      # 文档页面
│   ├── media/     # 媒体资源
│   ├── prompt/    # 提示相关
│   ├── test/      # 测试相关
│   ├── tools/     # 工具页面
│   ├── layout.tsx # 根布局
│   ├── page.tsx   # 首页
│   ├── globals.css # 全局样式
│   └── ClientBody.tsx # 客户端组件
│
├── components/    # 可复用组件
│   ├── api-viewer.tsx # OpenAPI文档查看器
│   └── ui/        # UI组件
├── config/        # 配置文件
├── content/       # 内容管理目录
│   ├── apis/      # API规范文件(OpenAPI)
│   ├── blogs/     # 博客文章内容
│   └── docs/      # 文档内容
├── data/          # 数据文件
├── hooks/         # 自定义React钩子
├── lib/           # 工具函数
└── types/         # TypeScript类型定义
```

## 开始使用

### 环境要求

- Node.js 18+ 或 Bun 1.0+
- npm/yarn/pnpm/bun

### 安装依赖

```bash
# 使用 npm
npm install

# 使用 yarn
yarn install

# 使用 pnpm
pnpm install

# 使用 bun
bun install
```

### 开发环境

```bash
# 使用 npm
npm run dev

# 使用 yarn
yarn dev

# 使用 pnpm
pnpm dev

# 使用 bun
bun dev
```

开发服务器将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 使用 yarn
yarn build

# 使用 pnpm
pnpm build

# 使用 bun
bun run build
```

### 启动生产服务器

```bash
# 使用 npm
npm run start

# 使用 yarn
yarn start

# 使用 pnpm
pnpm start

# 使用 bun
bun run start
```

## 主要功能

- 个人博客系统
  - 技术文章
  - 项目经验
  - 生活随笔
- 综合性文档
  - 多种编程语言（Python、Rust、JavaScript等）
  - 框架和工具（Django、Vue、React等）
  - 开发运维（Docker、Git等）
- API文档查看器
  - 支持OpenAPI规范
  - 交互式API端点浏览器
  - 请求/响应模式可视化
  - 支持GET、POST、PUT、DELETE等HTTP方法
  - 层级式端点导航
- 响应式设计
- Markdown 支持
  - 自定义容器支持（info | warn | tip | danger）
    - 语法 `::: danger :::`
  - mermaid 图表支持
  - 终端播放器支持（交互式命令演示）
- 代码高亮
- 图表渲染
- 动画效果
- SEO优化

## 终端播放器

一个用于演示命令行交互的终端播放器组件，支持打字机动画效果。

### 在 Markdown 中使用

在 Markdown 文件中使用 `terminal` 代码块：

````markdown
```terminal
npm install react-dom
added 45 packages, and audited 1234 packages in 23s
---
npm run build
Creating optimized production build...
Compiled successfully!
✨ Done in 12.34s.
---
echo "Hello, World!"
Hello, World!
```
````

**语法说明：**
- 每个命令块使用 `---` 分隔
- 第一行是要执行的命令
- 后续行是命令输出

### 作为 React 组件使用

```tsx
import TerminalPlayer, { TerminalCommand } from '@/components/terminal-player';

const commands: TerminalCommand[] = [
  {
    command: 'npm install',
    output: 'added 125 packages',
    delay: 800, // 显示输出前的延迟（毫秒）
  },
  {
    command: 'npm run build',
    output: 'Successfully compiled 234 files',
    delay: 600,
  },
];

<TerminalPlayer 
  commands={commands} 
  typingSpeed={40}      // 打字速度（毫秒/字符）
  autoPlay={false}      // 是否自动播放
  title="我的终端"       // 终端标题
/>
```

### 功能特性

- ⌨️ 命令输入打字机效果
- 🎬 播放/暂停/重置控制
- 📊 可点击的进度条节点
- 🎨 macOS 风格终端窗口
- 🌙 深色主题优化

## 开发指南

1. 项目使用 TypeScript 进行开发，确保类型安全
2. 使用 Tailwind CSS 进行样式开发
3. 遵循 Next.js 的 App Router 规范
4. 使用 ESLint 进行代码规范检查

## 部署

项目可以部署到 Vercel 平台：

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yunhai-dev/YUN)

### Vercel 部署说明

1. 访问 [Vercel 平台](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
2. 导入您的 GitHub 仓库
3. 配置项目设置：
   - 框架预设：Next.js
   - 构建命令：`npm run build` 或 `yarn build` 或 `pnpm build`
   - 输出目录：`.next`
   - 安装命令：`npm install` 或 `yarn install` 或 `pnpm install`
4. 点击部署按钮

部署完成后，Vercel 会自动为您的项目提供一个域名，您可以在项目设置中配置自定义域名。

更多部署详情，请参考 [Next.js 部署文档](https://nextjs.org/docs/app/building-your-application/deploying)。

## 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

GNU GPL v3 
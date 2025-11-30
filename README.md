# YunHai

A personal website built with Next.js to share technical articles, project experiences, and life stories.

## Tech Stack

- **Framework**: Next.js 15.3.3 (App Router)
- **UI Components**: Radix UI
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, GSAP
- **Markdown Processing**: Marked, Remark
- **Code Highlighting**: Highlight.js
- **Charts**: Mermaid
- **Type System**: TypeScript
- **API Documentation**: OpenAPI Viewer

## Project Structure

```
src/
├── app/           # Next.js app directory
│   ├── about/     # About page
│   ├── api/       # API documentation pages
│   ├── blog/      # Blog pages
│   ├── contact/   # Contact page
│   ├── docs/      # Documentation pages
│   ├── media/     # Media resources
│   ├── prompt/    # Prompt related
│   ├── test/      # Testing related
│   ├── tools/     # Tools pages
│   ├── layout.tsx # Root layout
│   ├── page.tsx   # Home page
│   ├── globals.css # Global styles
│   └── ClientBody.tsx # Client component
│
├── components/    # Reusable components
│   ├── api-viewer.tsx # OpenAPI documentation viewer
│   └── ui/        # UI components
├── config/        # Configuration files
├── content/       # Content management
│   ├── apis/      # API specifications (OpenAPI)
│   ├── blogs/     # Blog content
│   └── docs/      # Documentation content
├── data/          # Data files
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
└── types/         # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- npm/yarn/pnpm/bun

### Installation

```bash
# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install

# Using bun
bun install
```

### Development

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev

# Using bun
bun dev
```

The development server will start at [http://localhost:3000](http://localhost:3000).

### Build

```bash
# Using npm
npm run build

# Using yarn
yarn build

# Using pnpm
pnpm build

# Using bun
bun run build
```

### Start Production Server

```bash
# Using npm
npm run start

# Using yarn
yarn start

# Using pnpm
pnpm start

# Using bun
bun run start
```

## Key Features

- Personal Blog System
  - Technical articles
  - Project experiences
  - Life stories
- Comprehensive Documentation
  - Various programming languages (Python, Rust, JavaScript, etc.)
  - Frameworks and tools (Django, Vue, React, etc.)
  - DevOps (Docker, Git, etc.)
- API Documentation Viewer
  - OpenAPI specification support
  - Interactive API endpoint explorer
  - Request/response schema visualization
  - Support for GET, POST, PUT, DELETE and other HTTP methods
  - Hierarchical endpoint navigation
- Responsive Design
- Markdown Support
  - Custom container support (`info` | `warn` | `tip` | `danger`)
     - Syntax: `::: danger :::`
  - Mermaid diagram support
  - Terminal Player support (interactive command demonstration)
- Code Highlighting
- Chart Rendering
- Animation Effects
- SEO Optimized

## Terminal Player

A terminal player component for demonstrating command-line interactions with typing animation effects.

### Usage in Markdown

Use the `terminal` code block in your Markdown files:

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

**Syntax:**
- Each command block is separated by `---`
- First line is the command to execute
- Following lines are the command output

### Usage as React Component

```tsx
import TerminalPlayer, { TerminalCommand } from '@/components/terminal-player';

const commands: TerminalCommand[] = [
  {
    command: 'npm install',
    output: 'added 125 packages',
    delay: 800, // delay before showing output (ms)
  },
  {
    command: 'npm run build',
    output: 'Successfully compiled 234 files',
    delay: 600,
  },
];

<TerminalPlayer 
  commands={commands} 
  typingSpeed={40}      // typing speed (ms per character)
  autoPlay={false}      // auto play on mount
  title="My Terminal"   // terminal title
/>
```

### Features

- ⌨️ Typewriter effect for command input
- 🎬 Play/Pause/Reset controls
- 📊 Progress bar with clickable nodes
- 🎨 macOS-style terminal window
- 🌙 Dark theme optimized

## Development Guidelines

1. Use TypeScript for type safety
2. Style with Tailwind CSS
3. Follow Next.js App Router conventions
4. Use ESLint for code quality

## Deployment

The project can be deployed to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yunhai-dev/YUN)

### Vercel Deployment Guide

1. Visit [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
2. Import your GitHub repository
3. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: `npm run build` or `yarn build` or `pnpm build`
   - Output Directory: `.next`
   - Install Command: `npm install` or `yarn install` or `pnpm install`
4. Click Deploy

After deployment, Vercel will automatically provide a domain for your project. You can configure a custom domain in the project settings.

For more deployment details, refer to the [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Issues and Pull Requests are welcome to help improve the project.

## License

GNU GPL v3

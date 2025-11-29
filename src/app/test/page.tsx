"use client";

import LoginPage from "@/app/test/login";
import SlideHorizontallyPage from "@/app/test/slide-horizontally";
import TerminalPlayer, { TerminalCommand } from "@/components/terminal-player";

function TestPage() {
    const terminalCommands: TerminalCommand[] = [
        {
            command: 'npm install react-dom',
            output: 'added 45 packages, and audited 1234 packages in 23s',
            delay: 800,
        },
        {
            command: 'npm run build',
            output: 'Creating optimized production build...\nCompiled successfully!\n✨ Done in 12.34s.',
            delay: 600,
        },
        {
            command: 'git status',
            output: 'On branch dev\nYour branch is ahead of \'origin/dev\' by 2 commits.\n\n    modified:   src/app/test/page.tsx\n    new file:   src/app/test/terminal-player.tsx',
            delay: 500,
        },
        {
            command: 'git commit -m "feat: add terminal player"',
            output: '[dev 1a2b3c4] feat: add terminal player\n 2 files changed, 350 insertions(+)',
            delay: 600,
        },
        {
            command: 'git push origin dev',
            output: 'Enumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nDelta compression using up to 8 threads\nTo github.com:yunhai-dev/YUN.git\n   2a3b4c5..1a2b3c4  dev -> dev',
            delay: 800,
        },
    ];

    return (
        <div className="main pt-32">
            <div className="flex items-center justify-between mb-16">
                <h1 className="text-4xl font-bold">探索 · 测试</h1>
            </div>

            <div className="mt-2 text-3xl mb-10">终端播放器</div>
            <div className="mt-2 mb-16 h-96">
                <TerminalPlayer 
                    commands={terminalCommands} 
                    typingSpeed={40}
                    autoPlay={false}
                />
            </div>

            <div className="mt-2 text-3xl mb-10">Login Page</div>
            <div className="mt-2">
                <LoginPage/>
            </div>


            <div className="mt-2 text-3xl mb-10">横向滑动</div>
            <div className="mt-2">
                <SlideHorizontallyPage/>
            </div>
        </div>
    );
}

export default TestPage;
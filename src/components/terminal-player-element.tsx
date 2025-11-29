'use client';

import React from 'react';
import TerminalPlayer, {TerminalCommand} from '@/components/terminal-player';

export interface TerminalPlayerComponentProps {
    commands: TerminalCommand[];
}

/**
 * 用于 Markdown 渲染的终端播放器包装组件
 * 由 marked 扩展生成的 HTML 标签调用
 */
const TerminalPlayerComponent: React.FC<TerminalPlayerComponentProps> = ({commands}) => {
    return (
        <div className="my-4 h-96 w-full">
            <TerminalPlayer
                commands={commands}
                typingSpeed={40}
                autoPlay={false}
            />
        </div>
    );
};

/**
 * 在浏览器中注册自定义元素，用来渲染 marked 生成的 terminal-player 标签
 */
if (typeof window !== 'undefined' && !customElements.get('terminal-player')) {
    class TerminalPlayerElement extends HTMLElement {
        connectedCallback() {
            const commandsJson = this.getAttribute('data-commands');
            if (commandsJson) {
                try {
                    const commands = JSON.parse(commandsJson);

                    // 清空元素内容
                    this.innerHTML = '';

                    // 设置元素样式
                    this.style.display = 'block';
                    this.style.width = '100%';
                    this.style.height = '24rem';
                    this.style.marginTop = '1rem';
                    this.style.marginBottom = '1rem';

                    const root = document.createElement('div');
                    root.style.width = '100%';
                    root.style.height = '100%';
                    this.appendChild(root);

                    // 动态导入 React 并渲染
                    import('react-dom/client').then(({createRoot}) => {
                        const reactRoot = createRoot(root);
                        reactRoot.render(
                            <TerminalPlayerComponent commands={commands}/>
                        );
                    });
                } catch (e) {
                    console.error('Failed to parse terminal-player commands:', e);
                }
            }
        }
    }

    customElements.define('terminal-player', TerminalPlayerElement);
}

export default TerminalPlayerComponent;

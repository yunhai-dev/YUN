import { TokenizerAndRendererExtension } from 'marked';

export interface TerminalCommand {
  command: string;
  output: string;
  delay?: number;
}

/**
 * Marked 扩展：支持在 Markdown 中使用终端播放器
 * 
 * 使用语法：
 * ```terminal
 * npm install react-dom
 * added 45 packages
 * ---
 * npm run build
 * Successfully compiled!
 * ---
 * echo "Hello"
 * Hello
 * ```
 * 
 * 每个 --- 分隔符用来分隔不同的命令和输出
 * 第一行是命令，随后的行是输出（直到下一个 --- 或结束）
 */

export const terminalPlayerExtension: TokenizerAndRendererExtension = {
  name: 'terminalPlayer',
  level: 'block',
  start(src) {
    return src.match(/```terminal\n/)?.index;
  },
  tokenizer(src, tokens) {
    const rule = /^```terminal\n([\s\S]*?)```/;
    const match = rule.exec(src);
    if (match) {
      const [raw, content] = match;
      const commands = parseTerminalContent(content.trim());
      
      return {
        type: 'terminalPlayer',
        raw,
        commands: commands,
      };
    }
  },
  renderer(token) {
    const commands = token.commands as TerminalCommand[];
    const commandsJson = JSON.stringify(commands).replace(/"/g, '&quot;');
    
    return `<terminal-player data-commands="${commandsJson}"></terminal-player>`;
  }
};

/**
 * 解析终端内容
 * 格式：
 * command1
 * output1
 * ---
 * command2
 * output2
 */
function parseTerminalContent(content: string): TerminalCommand[] {
  const sections = content.split(/\n---\n/);
  const commands: TerminalCommand[] = [];

  sections.forEach((section) => {
    const lines = section.trim().split('\n');
    if (lines.length > 0) {
      const command = lines[0].trim();
      const output = lines.slice(1).join('\n').trim();
      
      if (command) {
        commands.push({
          command,
          output,
          delay: 500,
        });
      }
    }
  });

  return commands;
}

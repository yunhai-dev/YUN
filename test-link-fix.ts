import { parseInlineTokens } from './src/lib/markdown-to-docx';
import { Marked } from 'marked';

// 测试用例
const testCases = [
  '([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))',
  '[maxkb](https://maxkb.cn/?utm_source=chatgpt.com)',
  '(测试 [maxkb](https://maxkb.cn/?utm_source=chatgpt.com) 链接)'
];

const marked = new Marked();

console.log('=== 测试链接修复效果 ===\n');

testCases.forEach((markdown, index) => {
  console.log(`测试用例 ${index + 1}: ${markdown}`);
  
  // 解析为tokens
  const tokens = marked.lexer(markdown);
  const paragraphToken = tokens.find(token => token.type === 'paragraph');
  
  if (paragraphToken && 'tokens' in paragraphToken && Array.isArray(paragraphToken.tokens)) {
    // 调用parseInlineTokens函数
    const runs = parseInlineTokens(paragraphToken.tokens);
    
    console.log(`  生成 ${runs.length} 个元素:`);
    runs.forEach((run, runIndex) => {
      const runType = run.constructor.name;
      if (runType === 'TextRun') {
        const text = (run as any).properties.text;
        console.log(`    元素 ${runIndex + 1}: 文本 "${text}"`);
      } else if (runType === 'ExternalHyperlink') {
        const children = (run as any).children;
        const textRun = children && children[0];
        const text = textRun && textRun.properties.text;
        const link = (run as any).properties.link;
        console.log(`    元素 ${runIndex + 1}: 链接 "${text}" (${link})`);
      } else {
        console.log(`    元素 ${runIndex + 1}: ${runType}`);
      }
    });
  }
  
  console.log('');
});

console.log('=== 测试完成 ===');

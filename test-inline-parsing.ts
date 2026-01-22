import { parseInlineTokens } from './src/lib/markdown-to-docx';
import { Marked, type Token } from 'marked';

// 测试带括号的链接
const testMarkdown = '([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';

// 创建marked实例
const marked = new Marked();

// 解析为tokens
const tokens = marked.lexer(testMarkdown);

// 找到段落token
const paragraphToken = tokens.find(token => token.type === 'paragraph');

if (paragraphToken && 'tokens' in paragraphToken && Array.isArray(paragraphToken.tokens)) {
  console.log('=== 段落Token ===');
  console.log(`类型: ${paragraphToken.type}`);
  console.log(`包含 ${paragraphToken.tokens.length} 个tokens:`);
  
  // 打印所有子token
  paragraphToken.tokens.forEach((token, index) => {
    console.log(`\nToken ${index + 1}:`);
    console.log(`  类型: ${token.type}`);
    console.log(`  完整token: ${JSON.stringify(token)}`);
    console.log(`  文本属性: ${JSON.stringify((token as any).text)}`);
    console.log(`  文本属性类型: ${typeof (token as any).text}`);
    if ((token as any).href) {
      console.log(`  链接: ${(token as any).href}`);
    }
  });
  
  console.log('\n=== 调用parseInlineTokens ===');
  // 调用parseInlineTokens函数
  const runs = parseInlineTokens(paragraphToken.tokens);
  
  console.log(`parseInlineTokens返回 ${runs.length} 个元素:`);
  runs.forEach((run, index) => {
    console.log(`\nRun ${index + 1}:`);
    console.log(`  类型: ${run.constructor.name}`);
    console.log(`  完整run对象: ${JSON.stringify(run, (key, value) => {
      // 过滤掉循环引用
      if (key === '_parent' || key === '_children') return undefined;
      return value;
    }, 2)}`);
  });
} else {
  console.log('未找到段落token或段落不包含tokens');
}

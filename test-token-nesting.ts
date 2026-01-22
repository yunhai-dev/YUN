import { Marked, type Token } from 'marked';

// 测试带括号的链接
const testMarkdown = '([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';

// 创建marked实例
const marked = new Marked();

// 解析为tokens
const tokens = marked.lexer(testMarkdown);

// 打印段落token的详细结构
console.log('=== 段落Token详细结构 ===');
const paragraphToken = tokens.find(token => token.type === 'paragraph');
if (paragraphToken && 'tokens' in paragraphToken && Array.isArray(paragraphToken.tokens)) {
  console.log(`段落包含 ${paragraphToken.tokens.length} 个tokens:`);
  
  for (let i = 0; i < paragraphToken.tokens.length; i++) {
    const token = paragraphToken.tokens[i];
    console.log(`\nToken ${i + 1}:`);
    console.log(`  Type: ${token.type}`);
    console.log(`  Has text: ${'text' in token}`);
    if ('text' in token) {
      console.log(`  Text: ${JSON.stringify(token.text)}`);
    }
    console.log(`  Has tokens: ${'tokens' in token}`);
    if ('tokens' in token) {
      console.log(`  Tokens is array: ${Array.isArray(token.tokens)}`);
      if (Array.isArray(token.tokens)) {
        console.log(`  Tokens length: ${token.tokens.length}`);
        for (let j = 0; j < token.tokens.length; j++) {
          const nestedToken = token.tokens[j];
          console.log(`    Nested Token ${j + 1}:`);
          console.log(`      Type: ${nestedToken.type}`);
          if ('text' in nestedToken) {
            console.log(`      Text: ${JSON.stringify(nestedToken.text)}`);
          }
          if ('href' in nestedToken) {
            console.log(`      Href: ${nestedToken.href}`);
          }
        }
      }
    }
  }
}

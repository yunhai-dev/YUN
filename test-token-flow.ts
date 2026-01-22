import { Marked } from 'marked';

// 测试用例
const testCases = [
  '([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))',
  '[maxkb](https://maxkb.cn/?utm_source=chatgpt.com)',
  '(测试 [maxkb](https://maxkb.cn/?utm_source=chatgpt.com) 链接)'
];

const marked = new Marked();

console.log('=== 测试Token解析流程 ===\n');

testCases.forEach((markdown, index) => {
  console.log(`测试用例 ${index + 1}: ${markdown}`);
  
  // 解析为tokens
  const tokens = marked.lexer(markdown);
  const paragraphToken = tokens.find(token => token.type === 'paragraph');
  
  if (paragraphToken && 'tokens' in paragraphToken && Array.isArray(paragraphToken.tokens)) {
    console.log(`  段落包含 ${paragraphToken.tokens.length} 个tokens:`);
    
    paragraphToken.tokens.forEach((token, tokenIndex) => {
      console.log(`    Token ${tokenIndex + 1}:`);
      console.log(`      类型: ${token.type}`);
      
      if (token.type === 'text') {
        console.log(`      文本: ${JSON.stringify((token as any).text)}`);
        console.log(`      包含嵌套tokens: ${'tokens' in token && Array.isArray((token as any).tokens)}`);
        if ('tokens' in token && Array.isArray((token as any).tokens)) {
          const nestedTokens = (token as any).tokens;
          console.log(`      嵌套tokens数量: ${nestedTokens.length}`);
          nestedTokens.forEach((nestedToken, nestedIndex) => {
            console.log(`        嵌套Token ${nestedIndex + 1}:`);
            console.log(`          类型: ${nestedToken.type}`);
            console.log(`          文本: ${JSON.stringify((nestedToken as any).text)}`);
            if ((nestedToken as any).href) {
              console.log(`          链接: ${(nestedToken as any).href}`);
            }
          });
        }
      } else if (token.type === 'link') {
        console.log(`      文本: ${JSON.stringify((token as any).text)}`);
        console.log(`      链接: ${(token as any).href}`);
      }
    });
  }
  
  console.log('');
});

console.log('=== 测试完成 ===');

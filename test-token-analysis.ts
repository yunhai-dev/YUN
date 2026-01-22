import { Marked, type Token } from 'marked';

// 测试带括号的链接
const testMarkdown = '([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';

// 创建marked实例
const marked = new Marked();

// 解析为tokens
const tokens = marked.lexer(testMarkdown);

// 递归打印tokens信息
function printTokens(tokens: Token[], indent: string = ''): void {
  for (const token of tokens) {
    console.log(`${indent}Token: ${token.type}`);
    
    // 打印基本属性
    if ('text' in token) {
      console.log(`${indent}  Text: ${JSON.stringify(token.text)}`);
    }
    if ('href' in token) {
      console.log(`${indent}  Href: ${token.href}`);
    }
    if ('depth' in token) {
      console.log(`${indent}  Depth: ${token.depth}`);
    }
    if ('ordered' in token) {
      console.log(`${indent}  Ordered: ${token.ordered}`);
    }
    if ('lang' in token) {
      console.log(`${indent}  Lang: ${token.lang}`);
    }
    
    // 递归打印嵌套tokens
    if ('tokens' in token && Array.isArray(token.tokens)) {
      console.log(`${indent}  Nested Tokens:`);
      printTokens(token.tokens, indent + '    ');
    }
    
    // 如果是列表项，打印item的tokens
    if ('items' in token && Array.isArray(token.items)) {
      console.log(`${indent}  List Items:`);
      for (let i = 0; i < token.items.length; i++) {
        const item = token.items[i];
        console.log(`${indent}    Item ${i + 1}:`);
        if ('tokens' in item && Array.isArray(item.tokens)) {
          printTokens(item.tokens, indent + '      ');
        }
      }
    }
  }
}

console.log('=== Token Analysis Results ===');
console.log('Input Markdown:', JSON.stringify(testMarkdown));
console.log('');
console.log('Parsed Tokens:');
printTokens(tokens);

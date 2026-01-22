import { marked } from 'marked';

// 测试括号中的链接
const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';

// 使用marked的lexer获取tokens
const tokens = marked.lexer(markdown);

// 打印所有tokens
console.log('所有tokens:');
console.log(JSON.stringify(tokens, null, 2));

// 特别检查链接tokens
console.log('\n链接tokens:');
tokens.forEach(token => {
  if (token.type === 'paragraph') {
    if (token.tokens) {
      token.tokens.forEach(inlineToken => {
        if (inlineToken.type === 'link') {
          console.log(JSON.stringify(inlineToken, null, 2));
        }
      });
    }
  }
});

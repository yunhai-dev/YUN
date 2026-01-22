import { Marked } from 'marked';

// 创建一个marked实例
const marked = new Marked();

// 测试用户报告的链接格式
const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';

// 解析为tokens
const tokens = marked.lexer(markdown);

// 打印解析结果
console.log('解析结果:');
console.log(JSON.stringify(tokens, null, 2));

// 测试其他变体
const markdown2 = '这是另一个测试 ([链接文本](https://www.example.com)) 示例';
const tokens2 = marked.lexer(markdown2);
console.log('\n第二个测试解析结果:');
console.log(JSON.stringify(tokens2, null, 2));

const markdown3 = '(单独的括号链接：[maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';
const tokens3 = marked.lexer(markdown3);
console.log('\n第三个测试解析结果:');
console.log(JSON.stringify(tokens3, null, 2));

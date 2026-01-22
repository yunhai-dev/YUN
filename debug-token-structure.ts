import { Marked } from 'marked';

// 创建一个marked实例
const marked = new Marked();

// 测试用户报告的链接格式
const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';

// 解析为tokens
const tokens = marked.lexer(markdown);

// 获取段落内的tokens
const paragraphTokens = tokens[0]?.tokens || [];

// 查找link类型的token
console.log('查找link类型的token...');
const linkToken = paragraphTokens.find(token => token.type === 'link');

if (linkToken) {
    console.log('\n找到link类型的token:');
    console.log('token类型:', linkToken.type);
    console.log('token的所有属性:', Object.keys(linkToken));
    console.log('token的原始内容:', linkToken.raw);
    
    // 检查各种可能的属性名
    console.log('\n检查可能的属性:');
    console.log('token.href:', linkToken.href);
    console.log('token.url:', linkToken.url);
    console.log('token.target:', linkToken.target);
    console.log('token.text:', linkToken.text);
    console.log('token.content:', linkToken.content);
    
    // 检查tokens属性
    if ('tokens' in linkToken) {
        console.log('\nlinkToken.tokens:');
        console.log('类型:', Array.isArray(linkToken.tokens) ? '数组' : typeof linkToken.tokens);
        console.log('长度:', Array.isArray(linkToken.tokens) ? linkToken.tokens.length : 'N/A');
        
        if (Array.isArray(linkToken.tokens)) {
            linkToken.tokens.forEach((t, i) => {
                console.log(`  token ${i + 1}:`);
                console.log(`    类型: ${t.type}`);
                console.log(`    所有属性: ${Object.keys(t)}`);
                console.log(`    文本: ${t.text || t.content || '无'}`);
            });
        }
    }
} else {
    console.log('没有找到link类型的token');
    // 打印所有tokens
    console.log('\n所有tokens:');
    paragraphTokens.forEach((t, i) => {
        console.log(`token ${i + 1}:`);
        console.log(`  类型: ${t.type}`);
        console.log(`  所有属性: ${Object.keys(t)}`);
        console.log(`  文本: ${t.text || t.content || '无'}`);
    });
}

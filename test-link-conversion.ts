import { parseInlineTokens } from './src/lib/markdown-to-docx';
import { marked } from 'marked';

// 测试括号中的链接
const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';

// 获取tokens
const tokens = marked.lexer(markdown);

// 获取段落的内联tokens
const paragraph = tokens.find(token => token.type === 'paragraph');
if (paragraph && paragraph.tokens) {
    console.log('段落内联tokens:');
    console.log(JSON.stringify(paragraph.tokens, null, 2));
    
    // 测试parseInlineTokens
    const runs = parseInlineTokens(paragraph.tokens);
    
    console.log('\n转换后的runs:');
    console.log(runs);
    
    // 检查是否有ExternalHyperlink
    const hasLink = runs.some(run => run.constructor.name === 'ExternalHyperlink');
    console.log('\n是否包含ExternalHyperlink:', hasLink);
    
    // 如果有链接，打印链接信息
    runs.forEach(run => {
        if (run.constructor.name === 'ExternalHyperlink') {
            console.log('\n链接信息:');
            console.log('链接构造函数:', run.constructor.name);
            console.log('链接属性:', Object.keys(run));
            // 尝试获取链接的私有属性
            console.log('链接href:', (run as any).link);
            console.log('链接children:', (run as any).children);
        }
    });
}

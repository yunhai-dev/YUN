import { Marked } from 'marked';
import { parseInlineTokens } from './src/lib/markdown-to-docx';
import { TextRun, ExternalHyperlink } from 'docx';

// 创建一个marked实例
const marked = new Marked();

// 测试用户报告的链接格式
const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';

// 解析为tokens
const tokens = marked.lexer(markdown);

// 获取段落内的tokens
const paragraphTokens = tokens[0]?.tokens || [];

// 调用parseInlineTokens函数
console.log('开始调用parseInlineTokens函数...');
const result = parseInlineTokens(paragraphTokens);

// 打印处理结果
console.log('\nparseInlineTokens函数返回结果:');
console.log('结果类型:', Array.isArray(result) ? '数组' : typeof result);
console.log('结果长度:', Array.isArray(result) ? result.length : 'N/A');

if (Array.isArray(result)) {
    result.forEach((item, index) => {
        console.log(`\n元素 ${index + 1}:`);
        console.log('类型:', item.constructor.name);
        
        if (item instanceof TextRun) {
            console.log('是TextRun');
            console.log('文本内容:', item.text);
        } else if (item instanceof ExternalHyperlink) {
            console.log('是ExternalHyperlink');
            console.log('链接地址:', item.link);
            console.log('链接子元素数量:', item.children?.length);
            if (item.children) {
                item.children.forEach((child, childIndex) => {
                    console.log(`  子元素 ${childIndex + 1} 类型:`, child.constructor.name);
                    if (child instanceof TextRun) {
                        console.log(`  子元素 ${childIndex + 1} 文本:`, child.text);
                        console.log(`  子元素 ${childIndex + 1} 颜色:`, child.color);
                        console.log(`  子元素 ${childIndex + 1} 是否有下划线:`, !!child.underline);
                    }
                });
            }
        } else {
            console.log('未知类型:', typeof item);
        }
    });
}

// 检查是否包含ExternalHyperlink
const hasHyperlink = Array.isArray(result) && result.some(item => item instanceof ExternalHyperlink);
console.log('\n结果中是否包含ExternalHyperlink:', hasHyperlink);

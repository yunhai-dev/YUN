import { Marked } from 'marked';
import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import fs from 'fs';
import path from 'path';

// 读取测试用的Markdown文件
const testMarkdown = fs.readFileSync('./test-nested-markdown.md', 'utf8');

// 解析Markdown为tokens以查看结构
const markedInstance = new Marked();
const tokens = markedInstance.lexer(testMarkdown);

console.log('=== Markdown Tokens Structure ===');
console.log(JSON.stringify(tokens, null, 2));

// 创建一个简单的测试来验证转换是否正确
async function testConversion() {
    try {
        console.log('\n=== Testing DOCX Conversion ===');
        const blob = await markdownToDocxBlob(testMarkdown);
        console.log('Conversion successful:', blob.size, 'bytes');
        
        // 保存测试结果
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync('./test-output.docx', buffer);
        console.log('Test output saved to test-output.docx');
    } catch (error) {
        console.error('Conversion failed:', error);
    }
}

testConversion();

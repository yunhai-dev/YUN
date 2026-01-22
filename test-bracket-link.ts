import { Marked } from 'marked';
import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import { writeFileSync } from 'fs';

const marked = new Marked();

// 读取测试文件内容
import { readFileSync } from 'fs';
const markdownContent = readFileSync('./test-bracket-link.md', 'utf8');

console.log('=== 原始Markdown内容 ===');
console.log(markdownContent);
console.log('\n=== 解析后的Tokens ===');

// 解析Markdown为tokens
const tokens = marked.lexer(markdownContent);
console.log(JSON.stringify(tokens, null, 2));

// 转换为Word文档
console.log('\n=== 转换为Word文档 ===');

// 正确处理Blob返回值
markdownToDocxBlob(markdownContent)
  .then(blob => {
    // 将Blob转换为Buffer
    return blob.arrayBuffer();
  })
  .then(arrayBuffer => {
    const buffer = Buffer.from(arrayBuffer);
    writeFileSync('bracket-link-test.docx', buffer);
    console.log(`转换成功: ${buffer.length} bytes`);
    console.log('测试输出已保存到 bracket-link-test.docx');
  })
  .catch(error => {
    console.error('转换失败:', error);
  });

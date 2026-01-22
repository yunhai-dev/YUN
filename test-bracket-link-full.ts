import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import { writeFileSync } from 'fs';

// 测试带括号的链接
const testMarkdown = `# 测试括号中的链接

([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))

这是一个普通链接：[maxkb](https://maxkb.cn/?utm_source=chatgpt.com)

这是一个带文本的括号链接：(测试 [maxkb](https://maxkb.cn/?utm_source=chatgpt.com) 链接)`;

console.log('开始转换...');

// 调用转换函数
markdownToDocxBlob(testMarkdown)
  .then(blob => {
    console.log('转换完成，开始保存文件...');
    // 将Blob转换为ArrayBuffer
    return blob.arrayBuffer();
  })
  .then(arrayBuffer => {
    // 将ArrayBuffer转换为Buffer
    const buffer = Buffer.from(arrayBuffer);
    // 保存为Word文件
    writeFileSync('bracket-link-test.docx', buffer);
    console.log(`文件保存成功: bracket-link-test.docx (${buffer.length} bytes)`);
  })
  .catch(error => {
    console.error('转换过程中出错:', error);
  });

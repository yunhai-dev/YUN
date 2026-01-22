import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import { writeFile } from 'fs/promises';

async function testCompleteConversion() {
  try {
    // 测试括号中的链接
    const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';
    
    console.log('正在转换markdown:', markdown);
    const blob = await markdownToDocxBlob(markdown);
    
    console.log('转换成功，生成docx文件...');
    const buffer = Buffer.from(await blob.arrayBuffer());
    await writeFile('test-complete-conversion.docx', buffer);
    
    console.log('文件已保存: test-complete-conversion.docx');
    
    // 同时测试普通链接和括号中的链接
    const complexMarkdown = `
# 测试文档

这是一个普通链接：[maxkb](https://maxkb.cn/?utm_source=chatgpt.com)

这是一个括号中的链接：([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))

这是一个带有多个括号的链接：[[maxkb](https://maxkb.cn/?utm_source=chatgpt.com)]

这是一个在列表中的链接：
- 项目1：[链接1](https://example.com/1)
- 项目2：([链接2](https://example.com/2))

这是一个在引用中的链接：
> 这是引用中的链接：[maxkb](https://maxkb.cn/?utm_source=chatgpt.com)
> 这是引用中的括号链接：([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))
    `;
    
    console.log('\n正在转换复杂markdown...');
    const complexBlob = await markdownToDocxBlob(complexMarkdown);
    const complexBuffer = Buffer.from(await complexBlob.arrayBuffer());
    await writeFile('test-complex-conversion.docx', complexBuffer);
    
    console.log('复杂测试文件已保存: test-complex-conversion.docx');
    
  } catch (error) {
    console.error('转换错误:', error);
  }
}

testCompleteConversion();

import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import { writeFile } from 'fs/promises';

async function testParenthesesLinkSimple() {
  try {
    // 测试括号中的链接
    const markdown = '这是一个括号中的链接：([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';
    
    console.log('测试内容:', markdown);
    const blob = await markdownToDocxBlob(markdown);
    
    console.log('转换成功！');
    const buffer = Buffer.from(await blob.arrayBuffer());
    await writeFile('test-parentheses-link-simple.docx', buffer);
    
    console.log('文件已保存: test-parentheses-link-simple.docx');
    console.log('修复完成，括号中的链接现在应该能正确导出到Word文档了。');
    
  } catch (error) {
    console.error('转换错误:', error);
  }
}

testParenthesesLinkSimple();

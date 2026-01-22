import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import { writeFile } from 'fs/promises';

async function testParenthesesLink() {
  try {
    // 测试用户报告的问题：链接被括号包裹
    const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';
    const blob = await markdownToDocxBlob(markdown);
    await writeFile('test-parentheses-link.docx', Buffer.from(await blob.arrayBuffer()));
    console.log('括号包裹链接测试完成');

    // 测试其他可能的变体
    const markdown2 = '这是另一个测试 ([链接文本](https://www.example.com)) 示例';
    const blob2 = await markdownToDocxBlob(markdown2);
    await writeFile('test-parentheses-link2.docx', Buffer.from(await blob2.arrayBuffer()));
    console.log('括号包裹链接测试2完成');

    const markdown3 = '(单独的括号链接：[maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';
    const blob3 = await markdownToDocxBlob(markdown3);
    await writeFile('test-parentheses-link3.docx', Buffer.from(await blob3.arrayBuffer()));
    console.log('单独括号链接测试完成');

  } catch (error) {
    console.error('测试出错:', error);
  }
}

testParenthesesLink();

import { markdownToDocxBlob } from './src/lib/markdown-to-docx';
import { writeFile } from 'fs/promises';
import * as fs from 'fs';

async function verifyLinkFix() {
  try {
    // 测试用户报告的问题：链接被括号包裹
    console.log('测试用户报告的问题：([maxkb](https://maxkb.cn/?utm_source=chatgpt.com))');
    const markdown = '这是一个测试 ([maxkb](https://maxkb.cn/?utm_source=chatgpt.com)) 链接';
    const blob = await markdownToDocxBlob(markdown);
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    // 检查文档大小
    console.log('生成的文档大小:', buffer.length, '字节');
    
    // 将文档保存到文件
    await writeFile('verify-parentheses-link.docx', buffer);
    console.log('文档已保存到 verify-parentheses-link.docx');
    
    // 测试其他变体
    console.log('\n测试其他变体:');
    
    // 测试单独的括号链接
    const markdown2 = '(单独的括号链接：[maxkb](https://maxkb.cn/?utm_source=chatgpt.com))';
    const blob2 = await markdownToDocxBlob(markdown2);
    await writeFile('verify-parentheses-link2.docx', Buffer.from(await blob2.arrayBuffer()));
    console.log('单独的括号链接测试完成，文档已保存');
    
    // 测试普通链接（非括号内的）
    const markdown3 = '这是一个普通的 [链接](https://example.com) 测试';
    const blob3 = await markdownToDocxBlob(markdown3);
    await writeFile('verify-normal-link.docx', Buffer.from(await blob3.arrayBuffer()));
    console.log('普通链接测试完成，文档已保存');
    
    console.log('\n所有测试完成！请打开生成的Word文档查看链接是否正确显示。');
    console.log('1. verify-parentheses-link.docx: 括号包裹的链接');
    console.log('2. verify-parentheses-link2.docx: 单独的括号链接');
    console.log('3. verify-normal-link.docx: 普通链接（用于对比）');
    
  } catch (error) {
    console.error('验证过程中出错:', error);
  }
}

verifyLinkFix();

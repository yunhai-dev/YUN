import { ExternalHyperlink, TextRun } from 'docx';

// 测试ExternalHyperlink的构造和属性
const link = new ExternalHyperlink({
    link: 'https://maxkb.cn/?utm_source=chatgpt.com',
    children: [
        new TextRun({
            text: 'maxkb',
            color: '2563EB',
            underline: { type: 'single' },
        })
    ],
});

console.log('ExternalHyperlink对象:');
console.log('构造函数:', link.constructor.name);
console.log('所有属性:', Object.keys(link));
console.log('options:', link.options);
console.log('root:', link.root);

// 检查链接是否被正确构造
console.log('\n链接信息检查:');
console.log('options.link:', link.options.link);
console.log('options.children:', link.options.children);

// 尝试创建完整的段落测试
import { Paragraph } from 'docx';

const paragraph = new Paragraph({
    children: [
        new TextRun('这是一个测试 ('),
        link,
        new TextRun(') 链接'),
    ],
});

console.log('\n段落构造测试:');
console.log('段落构造函数:', paragraph.constructor.name);
console.log('段落children数量:', paragraph.children.length);
console.log('段落children类型:', paragraph.children.map(child => child.constructor.name));

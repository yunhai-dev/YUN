import { ExternalHyperlink, TextRun } from 'docx';

// 测试ExternalHyperlink构造函数
console.log('测试ExternalHyperlink构造函数...');

// 创建一个简单的TextRun
const textRun = new TextRun({text: '测试链接', color: '2563EB', underline: {type: 'single'}});

// 创建ExternalHyperlink
const hyperlink = new ExternalHyperlink({
    children: [textRun],
    link: 'https://example.com'
});

// 打印创建的hyperlink对象
console.log('\n创建的ExternalHyperlink对象:');
console.log('类型:', hyperlink.constructor.name);
console.log('所有属性:', Object.keys(hyperlink));

// 检查可能的链接属性
console.log('\n检查链接属性:');
console.log('hyperlink.link:', hyperlink.link);
console.log('hyperlink.url:', hyperlink.url);
console.log('hyperlink.target:', hyperlink.target);
console.log('hyperlink.children:', hyperlink.children);

// 检查children属性
if (hyperlink.children && Array.isArray(hyperlink.children)) {
    console.log('\n检查children:');
    hyperlink.children.forEach((child, index) => {
        console.log(`Child ${index + 1}:`, child.constructor.name);
        if (child instanceof TextRun) {
            console.log(`  Text:`, child.text);
            console.log(`  Color:`, child.color);
            console.log(`  Underline:`, child.underline);
        }
    });
}

// 尝试访问private属性
console.log('\n尝试访问private属性:');
try {
    console.log('hyperlink.root:', hyperlink.root);
    if (hyperlink.root && Array.isArray(hyperlink.root)) {
        console.log('hyperlink.root.length:', hyperlink.root.length);
        hyperlink.root.forEach((item, index) => {
            console.log(`Root ${index}:`, typeof item);
        });
    }
} catch (error) {
    console.log('无法访问root属性:', error.message);
}

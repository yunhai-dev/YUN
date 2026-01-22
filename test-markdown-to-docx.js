const fs = require('fs');
const path = require('path');

// 由于markdown-to-docx.ts使用了浏览器API，我们需要在浏览器环境中测试
// 这里我们创建一个简单的HTML文件来测试
const testHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>测试Markdown到DOCX转换</title>
    <script src="https://unpkg.com/marked@15.0.12/lib/marked.js"></script>
</head>
<body>
    <h1>测试Markdown到DOCX转换</h1>
    <button onclick="testConversion()">开始转换</button>
    <div id="status"></div>

    <script type="module">
        // 导入我们的markdown-to-docx函数
        import { markdownToDocxBlob } from './src/lib/markdown-to-docx.ts';
        import { saveAs } from 'https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js';

        // 读取测试文件内容
        async function loadTestContent() {
            const response = await fetch('./test-nested-structures.md');
            return await response.text();
        }

        // 测试转换功能
        async function testConversion() {
            const statusDiv = document.getElementById('status');
            statusDiv.innerHTML = '正在转换...';

            try {
                // 加载测试内容
                const markdownContent = await loadTestContent();
                
                // 转换为DOCX
                const docxBlob = await markdownToDocxBlob(markdownContent, {
                    title: '嵌套结构测试文档',
                    creator: '测试脚本',
                    description: '测试多层嵌套结构的Markdown到Word转换'
                });

                // 保存文件
                saveAs(docxBlob, 'test-nested-structures.docx');
                
                statusDiv.innerHTML = '转换成功！文件已下载。';
            } catch (error) {
                console.error('转换失败:', error);
                statusDiv.innerHTML = `转换失败: ${error.message}`;
            }
        }

        // 暴露函数到全局
        window.testConversion = testConversion;
    </script>
</body>
</html>
`;

// 保存HTML测试文件
fs.writeFileSync(path.join(__dirname, 'test-markdown-to-docx.html'), testHtml);

console.log('测试HTML文件已创建: test-markdown-to-docx.html');
console.log('请在浏览器中打开此文件并点击"开始转换"按钮进行测试。');

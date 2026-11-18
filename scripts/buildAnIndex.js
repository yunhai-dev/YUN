import fs from 'fs';
import path from "path";
import matter from "gray-matter";


const allIndex = []

// 搜索只需要可检索的正文摘要，完整 markdown（含代码块）会让索引膨胀到 4MB+。
const SEARCH_TEXT_LIMIT = 600;
const toSearchText = (markdown) => markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, SEARCH_TEXT_LIMIT)


// build blogs index
const blogsDirectory = path.join(process.cwd(), 'src/content/blogs');

const fileNames = fs.readdirSync(blogsDirectory);
fileNames.forEach(fileName => {
    const fullPath = path.join(blogsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const {data, content} = matter(fileContents);

    allIndex.push({
        type: 'blog',
        id: fileName.replace(/\.md$/, ''),
        title: data.title || '无标题',
        content: toSearchText(content || ''),
    })
})

// build docs index
const docsDirs = path.join(process.cwd(), 'src/content/docs');
const findDocNavigation = (docsDirectory = docsDirs) => {
    fs.readdirSync(docsDirectory).forEach(file => {
        if (fs.statSync(path.join(docsDirectory, file)).isDirectory()) {
            findDocNavigation(path.join(docsDirectory, file))
        } else {
            if (!file.endsWith('.md')) return; // 只处理Markdown文件
            const fullPath = path.join(docsDirectory, file);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const {data, content} = matter(fileContents);
            const slug = path.relative(docsDirs, fullPath)
                .replace(/\.md$/, '')
                .replace(/\\/g, '/')
                .replace(/\//g, '-yun-');
            allIndex.push({
                type: 'docs',
                id: slug,
                title: data.title || slug,
                content: toSearchText(content || ''),
            })
            // console.log(`Indexed doc: ${slug}`);

            // 清空变量

        }
    });
}
findDocNavigation();


// write index file
const indexFilePath = path.join(process.cwd(), 'public', 'index.json');
fs.writeFileSync(indexFilePath, JSON.stringify(allIndex, null, 2), 'utf8');
console.log(`Index file created at ${indexFilePath}`);

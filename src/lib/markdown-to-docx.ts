import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableRow,
    TableCell,
    WidthType,
    AlignmentType,
    BorderStyle,
    ExternalHyperlink,
    convertInchesToTwip,
    LevelFormat,
    ShadingType,
    ImageRun,
} from 'docx';
import {saveAs} from 'file-saver';
import {Marked, type Token, type Tokens} from 'marked';

type DocxChild = Paragraph | Table;

// 图片缓存
const imageCache = new Map<string, { data: ArrayBuffer; width: number; height: number }>();

// 获取图片数据和尺寸
async function fetchImage(url: string): Promise<{ data: ArrayBuffer; width: number; height: number } | null> {
    if (imageCache.has(url)) return imageCache.get(url)!;
    try {
        const res = await fetch(url);
        if (!res.ok) return null;
        const data = await res.arrayBuffer();

        // 获取图片尺寸
        const blob = new Blob([data]);
        const imgUrl = URL.createObjectURL(blob);
        const img = new Image();
        await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = imgUrl;
        });
        URL.revokeObjectURL(imgUrl);

        const result = {data, width: img.width, height: img.height};
        imageCache.set(url, result);
        return result;
    } catch {
        return null;
    }
}

// 计算适合文档的图片尺寸 (最大宽度 6 英寸)
function calcImageSize(width: number, height: number, maxWidth = 6 * 72): { width: number; height: number } {
    if (width <= maxWidth) return {width, height};
    const ratio = maxWidth / width;
    return {width: maxWidth, height: Math.round(height * ratio)};
}

// 颜色配置
const colors = {
    primary: '2563EB',
    heading1: '1E293B',
    heading2: '334155',
    heading3: '475569',
    text: '374151',
    code: '1F2937',
    codeBg: 'F3F4F6',
    tableBorder: 'E5E7EB',
    tableHeader: 'F9FAFB',
    quote: '6B7280',
    quoteBorder: 'D1D5DB',
    link: '2563EB',
};

// 字体配置
const fonts = {
    heading: '微软雅黑',
    body: '微软雅黑',
    code: 'Consolas',
};

// 字号配置 (half-points, 24 = 12pt)
const sizes = {
    h1: 48,
    h2: 36,
    h3: 28,
    h4: 24,
    body: 22,
    code: 20,
    small: 18,
};

// 文档样式
const styles = {
    default: {
        document: {
            run: {font: fonts.body, size: sizes.body, color: colors.text},
            paragraph: {spacing: {after: 200, line: 360}},
        },
        heading1: {
            run: {font: fonts.heading, size: sizes.h1, bold: true, color: colors.heading1},
            paragraph: {spacing: {before: 400, after: 200}},
        },
        heading2: {
            run: {font: fonts.heading, size: sizes.h2, bold: true, color: colors.heading2},
            paragraph: {spacing: {before: 360, after: 160}},
        },
        heading3: {
            run: {font: fonts.heading, size: sizes.h3, bold: true, color: colors.heading3},
            paragraph: {spacing: {before: 320, after: 120}},
        },
    },
    paragraphStyles: [
        {id: 'Normal', name: 'Normal', basedOn: 'Normal', next: 'Normal', run: {font: fonts.body, size: sizes.body}},
    ],
};

// 列表编号配置
const numbering = {
    config: [{
        reference: 'bullet-list',
        levels: [
            {
                level: 0,
                format: LevelFormat.BULLET,
                text: '•',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25)}}}
            },
            {
                level: 1,
                format: LevelFormat.BULLET,
                text: '•',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(1.0), hanging: convertInchesToTwip(0.25)}}}
            },
            {
                level: 2,
                format: LevelFormat.BULLET,
                text: '•',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(1.5), hanging: convertInchesToTwip(0.25)}}}
            },
            {
                level: 3,
                format: LevelFormat.BULLET,
                text: '•',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(2.0), hanging: convertInchesToTwip(0.25)}}}
            }
        ],
    }, {
        reference: 'ordered-list',
        levels: [
            {
                level: 0,
                format: LevelFormat.DECIMAL,
                text: '%1.',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(0.5), hanging: convertInchesToTwip(0.25)}}}
            },
            {
                level: 1,
                format: LevelFormat.DECIMAL,
                text: '%1.%2.',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(1.0), hanging: convertInchesToTwip(0.5)}}}
            },
            {
                level: 2,
                format: LevelFormat.DECIMAL,
                text: '%1.%2.%3.',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(1.5), hanging: convertInchesToTwip(0.75)}}}
            },
            {
                level: 3,
                format: LevelFormat.DECIMAL,
                text: '%1.%2.%3.%4.',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(2.0), hanging: convertInchesToTwip(1.0)}}}
            }
        ],
    }],
};

// 样式覆盖选项
interface StyleOverride {
    bold?: boolean;
    italics?: boolean;
    font?: string;
    size?: number;
    color?: string;
}

// 解析内联 tokens
export function parseInlineTokens(tokens: Token[], styleOverride?: StyleOverride): (TextRun | ExternalHyperlink)[] {
    const runs: (TextRun | ExternalHyperlink)[] = [];
    const baseStyle = {
        font: styleOverride?.font ?? fonts.body,
        size: styleOverride?.size ?? sizes.body,
        color: styleOverride?.color,
        bold: styleOverride?.bold,
        italics: styleOverride?.italics,
    };

    for (const token of tokens) {
        switch (token.type) {
            case 'text':
                runs.push(new TextRun({text: token.text, ...baseStyle}));
                break;
            case 'strong':
                if ('tokens' in token && Array.isArray(token.tokens)) {
                    runs.push(...parseInlineTokens(token.tokens, {...styleOverride, bold: true}));
                } else {
                    runs.push(new TextRun({text: token.text, ...baseStyle, bold: true}));
                }
                break;
            case 'em':
                if ('tokens' in token && Array.isArray(token.tokens)) {
                    runs.push(...parseInlineTokens(token.tokens, {...styleOverride, italics: true}));
                } else {
                    runs.push(new TextRun({text: token.text, ...baseStyle, italics: true}));
                }
                break;
            case 'codespan':
                runs.push(new TextRun({
                    text: ` ${token.text} `,
                    font: fonts.code,
                    size: sizes.code,
                    color: colors.code,
                    shading: {type: ShadingType.SOLID, fill: colors.codeBg, color: colors.codeBg},
                }));
                break;
            case 'link':
                // 确保token具有href属性
                if (!token.href) break;
                
                // 创建链接文本
                let linkText: string;
                if ('tokens' in token && Array.isArray(token.tokens) && token.tokens.length > 0 && 'text' in token.tokens[0]) {
                    linkText = token.tokens[0].text;
                } else {
                    linkText = token.text || '';
                }
                
                // 为当前版本的docx库创建正确的ExternalHyperlink
                runs.push(new ExternalHyperlink({
                    link: token.href,
                    children: [
                        new TextRun({
                            text: linkText,
                            color: colors.link,
                            underline: { type: 'single' },
                            font: styleOverride?.font ?? fonts.body,
                            size: styleOverride?.size ?? sizes.body,
                            bold: styleOverride?.bold,
                            italics: styleOverride?.italics,
                        })
                    ],
                }));
                break;
            case 'del':
                if ('tokens' in token && Array.isArray(token.tokens)) {
                    runs.push(...parseInlineTokens(token.tokens, {...styleOverride, strike: true} as StyleOverride));
                } else {
                    runs.push(new TextRun({text: token.text, ...baseStyle, strike: true}));
                }
                break;
            case 'image':
                // 图片在段落级别处理，这里跳过
                break;
            case 'br':
                runs.push(new TextRun({text: '', break: 1}));
                break;
            case 'html':
                // HTML标签转为纯文本
                runs.push(new TextRun({text: token.text.replace(/<[^>]*>/g, ''), ...baseStyle}));
                break;
            default:
                if ('text' in token && typeof token.text === 'string') {
                    runs.push(new TextRun({text: token.text, ...baseStyle}));
                }
        }
    }
    return runs;
}


// 解析表格
function parseTable(token: Tokens.Table): Table {
    const headerCells = token.header.map(cell => new TableCell({
        children: [new Paragraph({children: parseInlineTokens(cell.tokens), alignment: AlignmentType.CENTER})],
        shading: {fill: colors.tableHeader, type: ShadingType.SOLID, color: colors.tableHeader},
        margins: {top: 80, bottom: 80, left: 120, right: 120},
    }));

    const bodyRows = token.rows.map(row => new TableRow({
        children: row.map(cell => new TableCell({
            children: [new Paragraph({children: parseInlineTokens(cell.tokens)})],
            margins: {top: 60, bottom: 60, left: 120, right: 120},
        })),
    }));

    return new Table({
        rows: [new TableRow({children: headerCells, tableHeader: true}), ...bodyRows],
        width: {size: 100, type: WidthType.PERCENTAGE},
        borders: {
            top: {style: BorderStyle.SINGLE, size: 8, color: colors.tableBorder},
            bottom: {style: BorderStyle.SINGLE, size: 8, color: colors.tableBorder},
            left: {style: BorderStyle.SINGLE, size: 8, color: colors.tableBorder},
            right: {style: BorderStyle.SINGLE, size: 8, color: colors.tableBorder},
            insideHorizontal: {style: BorderStyle.SINGLE, size: 4, color: colors.tableBorder},
            insideVertical: {style: BorderStyle.SINGLE, size: 4, color: colors.tableBorder},
        },
    });
}

// 解析列表
function parseList(token: Tokens.List, level: number = 0): Paragraph[] {
    const paragraphs: Paragraph[] = [];
    
    for (const item of token.items) {
        // 处理当前列表项的内容
        const inlineTokens: Token[] = [];
        const nestedBlocks: Paragraph[] = [];
        
        for (const t of item.tokens) {
            if (t.type === 'paragraph' && 'tokens' in t) {
                inlineTokens.push(...(t.tokens as Token[]));
            } else if (t.type === 'text' && 'tokens' in t && Array.isArray(t.tokens)) {
                inlineTokens.push(...t.tokens);
            } else if (t.type === 'list') {
                // 递归处理嵌套列表
                nestedBlocks.push(...parseList(t as Tokens.List, level + 1));
            } else {
                // 将所有非段落文本和内联元素添加到当前列表项
                inlineTokens.push(t);
            }
        }
        
        // 添加当前列表项
        if (inlineTokens.length > 0) {
            paragraphs.push(new Paragraph({
                children: parseInlineTokens(inlineTokens),
                numbering: {reference: token.ordered ? 'ordered-list' : 'bullet-list', level},
                spacing: {after: 80},
            }));
        }
        
        // 添加嵌套块级元素
        paragraphs.push(...nestedBlocks);
    }
    
    return paragraphs;
}

// 解析代码块
function parseCodeBlock(text: string, lang?: string): Paragraph[] {
    const lines = text.split('\n');
    return lines.map((line, i) => new Paragraph({
        children: [new TextRun({text: line || ' ', font: fonts.code, size: sizes.code, color: colors.code})],
        shading: {type: ShadingType.SOLID, fill: colors.codeBg, color: colors.codeBg},
        spacing: {before: i === 0 ? 200 : 0, after: i === lines.length - 1 ? 200 : 0, line: 280},
        indent: {left: 200, right: 200},
    }));
}

// 主转换函数
async function tokensToDocx(tokens: Token[]): Promise<DocxChild[]> {
    const children: DocxChild[] = [];

    for (const token of tokens) {
        switch (token.type) {
            case 'heading': {
                const level = token.depth;
                const size = level === 1 ? sizes.h1 : level === 2 ? sizes.h2 : level === 3 ? sizes.h3 : sizes.h4;
                const color = level === 1 ? colors.heading1 : level === 2 ? colors.heading2 : colors.heading3;
                children.push(new Paragraph({
                    children: parseInlineTokens(token.tokens ?? [], {bold: true, font: fonts.heading, size, color}),
                    heading: level <= 3 ? [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][level - 1] : HeadingLevel.HEADING_4,
                    spacing: {before: level === 1 ? 400 : 320, after: 160},
                }));
                break;
            }
            case 'paragraph': {
                const imgTokens = (token.tokens ?? []).filter(t => t.type === 'image') as Tokens.Image[];
                const nonImgTokens = (token.tokens ?? []).filter(t => t.type !== 'image');

                // 先输出非图片内容
                if (nonImgTokens.length > 0) {
                    children.push(new Paragraph({
                        children: parseInlineTokens(nonImgTokens),
                        spacing: {after: imgTokens.length > 0 ? 100 : 200, line: 360},
                    }));
                }

                // 再输出所有图片
                for (const imgToken of imgTokens) {
                    const imgData = await fetchImage(imgToken.href);
                    if (imgData) {
                        const {width, height} = calcImageSize(imgData.width, imgData.height);
                        children.push(new Paragraph({
                            children: [new ImageRun({
                                data: imgData.data,
                                transformation: {width, height},
                                type: 'png'
                            })],
                            spacing: {before: 100, after: 200},
                        }));
                    } else {
                        children.push(new Paragraph({
                            children: [new TextRun({
                                text: `[图片: ${imgToken.text || imgToken.href}]`,
                                color: colors.quote,
                                italics: true
                            })],
                            spacing: {after: 200},
                        }));
                    }
                }
                break;
            }
            case 'code':
                children.push(...parseCodeBlock(token.text, token.lang));
                break;
            case 'blockquote': {
                // 简化引用块处理，使用递归调用tokensToDocx来处理所有嵌套内容
                // 这样可以确保所有嵌套的块级元素都能正确处理
                const nestedChildren = await tokensToDocx(token.tokens ?? []);
                
                // 为所有段落添加引用样式
                for (const child of nestedChildren) {
                    if (child instanceof Paragraph) {
                        // 直接处理原始Paragraph的children，而不是尝试复制整个Paragraph
                        const processedChildren = (child as { children?: (TextRun | ExternalHyperlink)[] }).children?.map((run) => {
                            if (run instanceof TextRun) {
                                // 对于普通文本，添加斜体和引用颜色
                                return new TextRun({
                                    ...run,
                                    italics: true,
                                    color: colors.quote,
                                });
                            } else if (run instanceof ExternalHyperlink) {
                                // 对于链接，保留原始链接样式，只添加斜体
                                // 在docx v9.5.1中，ExternalHyperlink的属性保存在options中
                                const link = (run as any).options?.link || '';
                                const originalChildren = (run as any).options?.children || [];
                                
                                // 从原始链接中提取文本
                                let linkText = '';
                                for (const child of originalChildren) {
                                    if (child instanceof TextRun) {
                                        linkText += (child as any).text;
                                    }
                                }
                                
                                // 重新构造链接
                                return new ExternalHyperlink({
                                    link: link,
                                    children: [
                                        new TextRun({
                                            text: linkText,
                                            color: colors.link,
                                            underline: { type: 'single' },
                                            italics: true,
                                            font: fonts.body,
                                            size: sizes.body,
                                        })
                                    ],
                                });
                            }
                            return run;
                        }) || [];
                        
                        // 创建新的段落，应用引用样式和处理后的子元素
                        children.push(new Paragraph({
                            children: processedChildren,
                            indent: { left: convertInchesToTwip(0.5) },
                            border: { left: { style: BorderStyle.SINGLE, size: 24, color: colors.quoteBorder, space: 10 } },
                            spacing: { before: 200, after: 200 },
                        }));
                    } else {
                        // 非段落元素（如表）直接添加，并在前后添加引用样式的空段落
                        children.push(new Paragraph({
                            border: { left: { style: BorderStyle.SINGLE, size: 24, color: colors.quoteBorder, space: 10 } },
                            spacing: { before: 200, after: 0 },
                        }));
                        children.push(child);
                        children.push(new Paragraph({
                            border: { left: { style: BorderStyle.SINGLE, size: 24, color: colors.quoteBorder, space: 10 } },
                            spacing: { before: 0, after: 200 },
                        }));
                    }
                }
                break;
            }
            case 'list':
                children.push(...parseList(token as Tokens.List));
                break;
            case 'table':
                children.push(parseTable(token as Tokens.Table));
                break;
            case 'hr':
                children.push(new Paragraph({
                    border: {bottom: {style: BorderStyle.SINGLE, size: 6, color: colors.tableBorder}},
                    spacing: {before: 300, after: 300},
                }));
                break;
            case 'space':
                children.push(new Paragraph({spacing: {after: 100}}));
                break;
            case 'text':
                // 顶层文本（非段落内的）
                children.push(new Paragraph({
                    children: [new TextRun({text: token.text})],
                    spacing: {after: 200, line: 360},
                }));
                break;
            case 'html':
                // HTML块转为纯文本
                const htmlText = token.text.replace(/<[^>]*>/g, '').trim();
                if (htmlText) {
                    children.push(new Paragraph({
                        children: [new TextRun({text: htmlText})],
                        spacing: {after: 200},
                    }));
                }
                break;
        }
    }
    return children;
}

export interface MarkdownToDocxOptions {
    title?: string;
    creator?: string;
    description?: string;
}

export async function markdownToDocxBlob(markdown: string, options: MarkdownToDocxOptions = {}): Promise<Blob> {
    const marked = new Marked();
    const tokens = marked.lexer(markdown);
    const children = await tokensToDocx(tokens);

    const doc = new Document({
        title: options.title,
        creator: options.creator || 'Markdown Editor',
        description: options.description,
        styles,
        numbering,
        sections: [{
            properties: {
                page: {
                    margin: {
                        top: convertInchesToTwip(1),
                        right: convertInchesToTwip(1),
                        bottom: convertInchesToTwip(1),
                        left: convertInchesToTwip(1)
                    }
                }
            },
            children,
        }],
    });

    return await Packer.toBlob(doc);
}

export async function downloadMarkdownAsDocx(markdown: string, filename: string = 'document.docx', options: MarkdownToDocxOptions = {}): Promise<void> {
    const blob = await markdownToDocxBlob(markdown, options);
    saveAs(blob, filename.endsWith('.docx') ? filename : `${filename}.docx`);
}

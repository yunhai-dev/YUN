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
                style: {paragraph: {indent: {left: convertInchesToTwip(1.0), hanging: convertInchesToTwip(0.25)}}}
            },
            {
                level: 2,
                format: LevelFormat.DECIMAL,
                text: '%1.%2.%3.',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(1.5), hanging: convertInchesToTwip(0.25)}}}
            },
            {
                level: 3,
                format: LevelFormat.DECIMAL,
                text: '%1.%2.%3.%4.',
                alignment: AlignmentType.LEFT,
                style: {paragraph: {indent: {left: convertInchesToTwip(2.0), hanging: convertInchesToTwip(0.25)}}}
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
function parseInlineTokens(tokens: Token[], styleOverride?: StyleOverride): (TextRun | ExternalHyperlink)[] {
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
                if ('tokens' in token && Array.isArray(token.tokens)) {
                    // 递归处理嵌套的文本tokens
                    runs.push(...parseInlineTokens(token.tokens, styleOverride));
                } else if (token.text) {
                    runs.push(new TextRun({text: token.text, ...baseStyle}));
                }
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
                // 处理链接，确保在任何情况下都能正确显示
                const linkText = 'text' in token ? token.text : '';
                
                // 创建基础文本运行
                const textRun = new TextRun({
                    text: linkText,
                    font: styleOverride?.font ?? fonts.body,
                    size: styleOverride?.size ?? sizes.body,
                    color: colors.link,
                    underline: {type: 'single'},
                    bold: styleOverride?.bold,
                    italics: styleOverride?.italics,
                });
                
                // 创建外部超链接
                runs.push(new ExternalHyperlink({
                    children: [textRun],
                    link: token.href,
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

// 解析列表项内容，递归处理嵌套元素
async function parseListItemContent(item: Tokens.ListItem, listType: 'ordered' | 'bullet', level: number = 0): Promise<DocxChild[]> {
    const children: DocxChild[] = [];
    const numberingRef = listType === 'ordered' ? 'ordered-list' : 'bullet-list';
    
    for (const t of item.tokens) {
        if (t.type === 'paragraph' && 'tokens' in t) {
            // 处理段落内容
            const inlineTokens: Token[] = [];
            for (const pt of t.tokens as Token[]) {
                if (pt.type === 'text' && 'tokens' in pt && Array.isArray(pt.tokens)) {
                    inlineTokens.push(...pt.tokens);
                } else {
                    inlineTokens.push(pt);
                }
            }
            children.push(new Paragraph({
                children: parseInlineTokens(inlineTokens),
                numbering: {reference: numberingRef, level: level},
                spacing: {after: 80},
            }));
        } else if (t.type === 'list') {
            // 递归处理嵌套列表
            const nestedList = t as Tokens.List;
            const nestedChildren = await parseList(nestedList, level + 1);
            children.push(...nestedChildren);
        } else if (t.type === 'text' && 'tokens' in t && Array.isArray(t.tokens)) {
            // 直接文本内容
            children.push(new Paragraph({
                children: parseInlineTokens(t.tokens),
                numbering: {reference: numberingRef, level: level},
                spacing: {after: 80},
            }));
        } else {
            // 其他类型的token
            children.push(new Paragraph({
                children: parseInlineTokens([t]),
                numbering: {reference: numberingRef, level: level},
                spacing: {after: 80},
            }));
        }
    }
    
    return children;
}

// 解析列表
async function parseList(token: Tokens.List, level: number = 0): Promise<DocxChild[]> {
    const children: DocxChild[] = [];
    const listType = token.ordered ? 'ordered' : 'bullet';
    
    for (const item of token.items) {
        // 递归处理每个列表项的内容
        const itemContent = await parseListItemContent(item, listType, level);
        children.push(...itemContent);
    }
    
    return children;
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
                // 处理引用块的嵌套内容
                const quoteChildren: DocxChild[] = [];
                for (const t of token.tokens ?? []) {
                    if (t.type === 'paragraph' && 'tokens' in t) {
                        // 段落内容
                        quoteChildren.push(new Paragraph({
                            children: parseInlineTokens(t.tokens, {italics: true, color: colors.quote}),
                            indent: {left: convertInchesToTwip(0.5)},
                            border: {left: {style: BorderStyle.SINGLE, size: 24, color: colors.quoteBorder, space: 10}},
                            spacing: {before: 0, after: 100},
                        }));
                    } else if (t.type === 'list') {
                        // 嵌套列表
                        const nestedList = await parseList(t as Tokens.List, 0);
                        // 为嵌套列表添加引用样式
                        nestedList.forEach(item => {
                            if (item instanceof Paragraph) {
                                (item as any).properties.indent = {
                                    left: convertInchesToTwip(0.5),
                                    hanging: (item as any).properties.indent?.hanging
                                };
                                (item as any).properties.border = {
                                    left: {style: BorderStyle.SINGLE, size: 24, color: colors.quoteBorder, space: 10}
                                };
                            }
                        });
                        quoteChildren.push(...nestedList);
                    } else if (t.type === 'blockquote') {
                        // 嵌套引用块
                        const nestedQuoteChildren = await tokensToDocx([t]);
                        nestedQuoteChildren.forEach(item => {
                            if (item instanceof Paragraph) {
                                // 确保properties对象存在
                                if (!(item as any).properties) {
                                    (item as any).properties = {};
                                }
                                // 确保indent对象存在
                                if (!(item as any).properties.indent) {
                                    (item as any).properties.indent = {};
                                }
                                // 增加嵌套引用的缩进
                                (item as any).properties.indent.left = convertInchesToTwip(1.0);
                            }
                        });
                        quoteChildren.push(...nestedQuoteChildren);
                    } else {
                        // 其他类型的内容
                        quoteChildren.push(new Paragraph({
                            children: parseInlineTokens([t], {italics: true, color: colors.quote}),
                            indent: {left: convertInchesToTwip(0.5)},
                            border: {left: {style: BorderStyle.SINGLE, size: 24, color: colors.quoteBorder, space: 10}},
                            spacing: {before: 0, after: 100},
                        }));
                    }
                }
                children.push(...quoteChildren);
                break;
            }
            case 'list':
                const listChildren = await parseList(token as Tokens.List);
                children.push(...listChildren);
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

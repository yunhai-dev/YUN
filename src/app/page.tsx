import {FAQStructuredData} from '@/components/structured-data';
import {GalleryStory} from '@/components/gallery-story';

const homeFAQs = [
    {
        question: '云云亦海是什么网站？',
        answer: '云云亦海是开发者 YunHai 的个人网站，记录 AI 应用、全栈开发、开源项目与持续写作。',
    },
    {
        question: '在哪里了解 YunHai 的作品？',
        answer: '首页数字艺术馆介绍 YunHai、Clouisle、Crawlsy 与文章档案；关于、博客和文档页面提供更多内容。',
    },
];

export default function Home() {
    return (
        <>
            <FAQStructuredData faqs={homeFAQs} />
            <GalleryStory />
        </>
    );
}

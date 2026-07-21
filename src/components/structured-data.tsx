import Script from 'next/script';
import { baseUrl, siteName, image } from '@/config/site';

// 网站级别结构化数据
export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": siteName,
    "alternateName": ["云云亦海", "YunHai Notes"],
    "url": baseUrl,
    "description": `${siteName}，专注于技术文章、项目经验、生活点滴与云端分享。`,
    "inLanguage": "zh-CN",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/docs?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// 个人/组织结构化数据
export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "YunHai",
    "alternateName": "云海",
    "url": baseUrl,
    "image": image,
    "description": "全栈开发者 & AI 应用开发者，专注于 Python、React/Next.js、LLM 开发",
    "sameAs": [
      "https://github.com/yunhai-dev",
      "https://gitee.com/yun2hai"
    ],
    "jobTitle": "全栈开发者",
    "knowsAbout": [
      "Python", "Django", "FastAPI",
      "React", "Next.js", "Vue.js",
      "TypeScript", "JavaScript",
      "AI/LLM Development", "LangChain",
      "Web Scraping", "Data Engineering"
    ]
  };

  return (
    <Script
      id="person-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// 面包屑结构化数据
interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbStructuredData({ items }: { items: BreadcrumbItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };

  return (
    <Script
      id="breadcrumb-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// FAQ 结构化数据
interface FAQItem {
  question: string;
  answer: string;
}

export function FAQStructuredData({ faqs }: { faqs: FAQItem[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

// 软件应用/项目结构化数据
interface SoftwareAppData {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

export function SoftwareAppStructuredData({ app }: { app: SoftwareAppData }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name,
    "description": app.description,
    "url": app.url,
    "applicationCategory": app.applicationCategory || "DeveloperApplication",
    "operatingSystem": app.operatingSystem || "Cross-platform",
    "author": {
      "@type": "Person",
      "name": "YunHai",
      "url": baseUrl
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <Script
      id={`software-app-${app.name}-structured-data`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

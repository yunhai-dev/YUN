import { getAllAPIDocuments } from "@/lib/api";
import { siteName } from "@/config/site";
import { Metadata } from "next";
import { Link } from "next-view-transitions";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: `API 文档`,
  description: `浏览 ${siteName} 提供的API文档组件`,
};

export default async function APIPage() {
  const apiDocuments = await getAllAPIDocuments();

  return (
    <main className="flex-1 min-h-screen pt-28 md:pt-36 pb-24">
      <div className="max-w-[1440px] w-full mx-auto px-5 md:px-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-10 border-b border-border/60 mb-8">
          <h1 className="font-serif-sc text-5xl sm:text-6xl font-medium tracking-tight">
            API 文档
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-md md:text-right">
            探索可集成的服务接口规范、请求参数与响应结构。
          </p>
        </header>

        {apiDocuments.length > 0 ? (
          <div className="divide-y divide-border/45">
            {apiDocuments.map((api) => (
              <Link
                key={api.id}
                href={`/api/${api.id}`}
                className="group grid grid-cols-1 md:grid-cols-12 items-baseline gap-3 md:gap-6 py-6 px-2 -mx-2 rounded-lg hover:bg-primary/5 transition-colors"
              >
                <span className="md:col-span-2 text-xs text-muted-foreground tabular-nums">
                  v{api.version}
                </span>
                <span className="md:col-span-4 font-serif-sc text-xl font-medium group-hover:text-primary transition-colors">
                  {api.title}
                </span>
                <span className="md:col-span-5 text-sm text-muted-foreground line-clamp-2">
                  {api.description || "OpenAPI 规范文档"}
                </span>
                <span className="hidden md:flex md:col-span-1 justify-end text-muted-foreground/50 group-hover:text-primary transition-all group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            <p>暂无可用的 API 文档</p>
            <p className="mt-2 text-sm">API 文档将显示在 src/content/apis/ 目录中的 JSON 文件</p>
          </div>
        )}
      </div>
    </main>
  );
}

import type {Tool} from "@/hooks/use-chat";
import {getSearchIndex} from "@/lib/search-service";

/**
 * 获取当前时间工具
 */
export const getCurrentTimeTool: Tool = {
  name: "get_current_time",
  description: "获取当前的日期和时间信息，包括年月日、时分秒和星期等",
  parameters: {
    type: "object",
    properties: {
      format: {
        type: "string",
        enum: ["full", "date", "time"],
        description: "返回格式：full-完整日期时间，date-仅日期，time-仅时间",
      },
      timezone: {
        type: "string",
        description: "时区，例如 Asia/Shanghai、America/New_York，默认为本地时区",
      },
    },
  },
  execute: async (args: Record<string, unknown>) => {
    const format = (args.format as string) || "full";
    const timezone = args.timezone as string | undefined;

    const now = new Date();
    const options: Intl.DateTimeFormatOptions = timezone ? {timeZone: timezone} : {};

    const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    const weekday = weekdays[now.getDay()];

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const dateStr = `${year}年${month}月${day}日`;
    const timeStr = `${hours}:${minutes}:${seconds}`;

    switch (format) {
      case "date":
        return {
          date: dateStr,
          weekday,
          timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
      case "time":
        return {
          time: timeStr,
          timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
      case "full":
      default:
        return {
          datetime: `${dateStr} ${timeStr}`,
          date: dateStr,
          time: timeStr,
          weekday,
          timestamp: now.getTime(),
          timezone: timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
        };
    }
  },
};

/**
 * 搜索网站资源工具
 */
export const searchWebsiteTool: Tool = {
  name: "search_website",
  description: "搜索网站内容，包括博客文章、文档、工具和媒体资源。返回最相关的搜索结果",
  parameters: {
    type: "object",
    properties: {
      query: {
        type: "string",
        description: "搜索关键词或短语",
      },
      limit: {
        type: "number",
        description: "返回结果数量限制，默认为 5，最多 20",
      },
    },
    required: ["query"],
  },
  execute: async (args: Record<string, unknown>) => {
    const query = (args.query as string) || "";
    const limit = Math.min((args.limit as number) || 5, 20);

    if (!query.trim()) {
      return {error: "搜索关键词不能为空"};
    }

    const ms = await getSearchIndex();
    if (!ms) {
      return {error: "搜索索引加载失败"};
    }

    const results = ms
      .search(query, {
        prefix: true,
        fuzzy: 0.2,
      })
      .slice(0, limit);

    const formattedResults = results.map((result) => ({
      id: result.id,
      title: result.title,
      type: result.type,
      content: result.content,
      score: result.score,
      url: `/${result.type}/${result.id}/`,
    }));

    if (formattedResults.length === 0) {
      return {
        message: `未找到包含"${query}"的相关内容`,
        results: [],
      };
    }

    return {
      message: `找到 ${formattedResults.length} 条相关结果`,
      query,
      results: formattedResults,
    };
  },
};

/**
 * 所有可用工具列表
 */
export const chatTools: Tool[] = [getCurrentTimeTool, searchWebsiteTool];

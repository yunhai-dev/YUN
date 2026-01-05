"use client";

import { useEffect } from "react";

// Web Vitals 类型定义
interface WebVitalsMetric {
  name: "CLS" | "FCP" | "FID" | "INP" | "LCP" | "TTFB";
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

// 发送到 Umami 的函数
function sendToUmami(metric: WebVitalsMetric) {
  // 检查 umami 是否可用
  if (typeof window !== "undefined" && (window as typeof window & { umami?: { track: (event: string, data: Record<string, unknown>) => void } }).umami) {
    (window as typeof window & { umami?: { track: (event: string, data: Record<string, unknown>) => void } }).umami?.track("web-vitals", {
      metric: metric.name,
      value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
      rating: metric.rating,
    });
  }
}

export function WebVitals() {
  useEffect(() => {
    // 动态导入 web-vitals 库
    import("web-vitals").then(({ onCLS, onFCP, onFID, onINP, onLCP, onTTFB }) => {
      // 报告各项性能指标
      onCLS(sendToUmami);
      onFCP(sendToUmami);
      onFID(sendToUmami);
      onINP(sendToUmami);
      onLCP(sendToUmami);
      onTTFB(sendToUmami);
    }).catch(() => {
      // web-vitals 未安装，静默忽略
    });
  }, []);

  return null;
}

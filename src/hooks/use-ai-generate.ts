import { useState, useCallback, useRef, useEffect } from "react";

export interface UseAIGenerateOptions {
  systemPrompt?: string;
  onStream?: (text: string) => void;
  onComplete?: (text: string) => void;
  onError?: (error: Error) => void;
}

export function useAIGenerate(options: UseAIGenerateOptions = {}) {
  const { systemPrompt } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  // 使用 ref 存储回调，避免闭包问题
  const callbacksRef = useRef(options);
  useEffect(() => {
    callbacksRef.current = options;
  }, [options]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsLoading(false);
  }, []);

  const generate = useCallback(
    async (prompt: string) => {
      const apiKey = localStorage.getItem("chat-api-key");
      const baseUrl = localStorage.getItem("chat-base-url") || "https://ai.megallm.io";
      const model = localStorage.getItem("chat-model-id") || "openai-gpt-oss-20b";

      if (!apiKey) {
        callbacksRef.current.onError?.(new Error("请先在 Chat 页面配置 API Key"));
        return;
      }

      // 先重置状态
      setResult("");
      setIsLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const messages = [
        ...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
        { role: "user", content: prompt },
      ];

      try {
        const res = await fetch(`${baseUrl.replace(/\/+$/, "")}/v1/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({ model, messages, stream: true }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err.error?.message || `HTTP ${res.status}`);
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let content = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (!data || data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed?.choices?.[0]?.delta?.content;
              if (delta) {
                content += delta;
                setResult(content);
                callbacksRef.current.onStream?.(content);
              }
            } catch {}
          }
        }

        // 处理剩余 buffer
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data:")) {
            const data = trimmed.slice(5).trim();
            if (data && data !== "[DONE]") {
              try {
                const parsed = JSON.parse(data);
                const delta = parsed?.choices?.[0]?.delta?.content;
                if (delta) {
                  content += delta;
                  setResult(content);
                }
              } catch {}
            }
          }
        }

        if (content) {
          callbacksRef.current.onComplete?.(content);
        }
      } catch (err) {
        if ((err as DOMException)?.name !== "AbortError") {
          callbacksRef.current.onError?.(err as Error);
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [systemPrompt]
  );

  return { generate, isLoading, result, stop };
}

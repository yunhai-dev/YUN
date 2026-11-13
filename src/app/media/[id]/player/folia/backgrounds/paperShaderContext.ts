import type { PaperShaderElement } from '@paper-design/shaders';

// Context options and teardown for full-screen paper-shaders backgrounds, copied from Folia's
// utils/paperShaderContext.ts.

/**
 * The paper shaders draw one full-screen quad with no depth test, so WebGL's default MSAA and
 * depth buffer only cost memory and a per-frame resolve. paper-shaders reads this once, when the
 * context is created.
 */
export const PAPER_SHADER_CONTEXT_ATTRIBUTES: WebGLContextAttributes = Object.freeze({
    antialias: false,
    depth: false,
});

/**
 * A ref for a paper shader's host element that gives the WebGL context back once the shader
 * unmounts. paper-shaders' dispose() deletes its program and removes the canvas, but never loses
 * the context, so drawing buffers stay alive until the canvas is garbage-collected.
 */
export const createPaperShaderReleaseRef = (target: {current: PaperShaderElement | null}) => (
    (element: PaperShaderElement | null) => {
        target.current = element;
        if (!element) return undefined;
        return () => {
            target.current = null;
            const canvas = element.paperShaderMount?.canvasElement;
            if (!canvas) return;
            const gl = canvas.getContext('webgl2');
            queueMicrotask(() => {
                if (!gl || canvas.isConnected || gl.isContextLost()) return;
                gl.getExtension('WEBGL_lose_context')?.loseContext();
            });
        };
    }
);

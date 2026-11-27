import type { PaperShaderElement } from '@paper-design/shaders';

// Paper shader uniform writes can skip an immediate draw when another draw is already scheduled.

export type PaperShaderMount = NonNullable<PaperShaderElement['paperShaderMount']>;
export type PaperShaderUniforms = Parameters<PaperShaderMount['setUniforms']>[0];

/**
 * Pushes uniforms to a shader without drawing it. `setUniforms` renders the whole shader on the
 * spot and re-arms its frame loop. Use the deferred write when the caller or the shader will
 * draw the frame separately.
 */
export const updatePaperShaderUniforms = (
    mount: PaperShaderMount,
    uniforms: PaperShaderUniforms,
    willRender: boolean,
) => {
    const writer = (mount as unknown as {setUniformValues?: (values: PaperShaderUniforms) => void}).setUniformValues;
    if (willRender && typeof writer === 'function') {
        writer(uniforms);
        return;
    }
    mount.setUniforms(uniforms);
};

import type { PaperShaderElement } from '@paper-design/shaders';

// paper-shaders uniform writes, copied from Folia's utils/paperShaderUniforms.ts. While the
// shader runs its own frame loop this only writes the values so it is not drawn twice per frame.

export type PaperShaderMount = NonNullable<PaperShaderElement['paperShaderMount']>;
export type PaperShaderUniforms = Parameters<PaperShaderMount['setUniforms']>[0];

/**
 * Pushes uniforms to a shader without drawing it. `setUniforms` renders the whole shader on the
 * spot and re-arms the frame loop; a stopped shader has no loop, so it still gets that draw.
 */
export const updatePaperShaderUniforms = (
    mount: PaperShaderMount,
    uniforms: PaperShaderUniforms,
    animating: boolean,
) => {
    const writer = (mount as unknown as {setUniformValues?: (values: PaperShaderUniforms) => void}).setUniformValues;
    if (animating && typeof writer === 'function') {
        writer(uniforms);
        return;
    }
    mount.setUniforms(uniforms);
};

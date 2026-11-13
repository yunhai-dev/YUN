import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

// 从 three.js r186 examples/jsm/postprocessing/FXAAPass.js 原样移植（MIT）：项目里的 three@0.167.1 还没有这道 pass，
// 但它的 FXAAShader 和 ShaderPass 已经有了，所以这里只是补上那层薄封装。

/** FXAA 后处理：全屏 shader pass，setSize 时按画布尺寸更新边缘检测的像素步长。 */
class FXAAPass extends ShaderPass {
    constructor() {
        super(FXAAShader);
    }

    setSize(width: number, height: number) {
        this.material.uniforms['resolution'].value.set(1 / width, 1 / height);
    }
}

export { FXAAPass };

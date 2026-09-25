'use client';

import {useEffect, useRef} from 'react';
import {
    ACESFilmicToneMapping, AmbientLight, CatmullRomCurve3, Color, HemisphereLight,
    MathUtils, PerspectiveCamera, Quaternion, Scene, SpotLight, SRGBColorSpace, Vector3, WebGLRenderer,
} from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import type {Material, Mesh, Object3D, Texture} from 'three';

type GallerySceneProps = {
    progress: number;
    onReady: () => void;
    onError: () => void;
};

type CameraPose = {position: Vector3; rotation: Quaternion; fov: number};

const cameraNames = [
    'CAM_00 • pavilion overview',
    'CAM_01 • entrance and author',
    'CAM_02 • Clouisle',
    'CAM_03 • Crawlsy',
    'CAM_04 • archive',
];

// The hidden Blender visitor route uses Blender X/Y/Z; glTF maps it to X/Z/-Y.
const routeWaypoints = [
    [],
    [new Vector3(-2.6, 2.8, -1.3), new Vector3(1.3, 2.9, -6.5)],
    [new Vector3(2.1, 2.9, -12.8), new Vector3(-1.9, 2.9, -18.2)],
    [new Vector3(-2.1, 2.9, -24.6), new Vector3(1.3, 2.9, -31.5)],
];

function disposeGallery(root: Object3D) {
    const geometries = new Set<Mesh['geometry']>();
    const materials = new Set<Material>();
    const textures = new Set<Texture>();
    root.traverse(object => {
        if (!('isMesh' in object) || !object.isMesh) return;
        const mesh = object as Mesh;
        geometries.add(mesh.geometry);
        const meshMaterials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        meshMaterials.forEach(material => {
            materials.add(material);
            Object.values(material).forEach(value => {
                if (value && typeof value === 'object' && 'isTexture' in value && value.isTexture) {
                    textures.add(value as Texture);
                }
            });
        });
    });
    textures.forEach(texture => texture.dispose());
    materials.forEach(material => material.dispose());
    geometries.forEach(geometry => geometry.dispose());
}

export function GalleryScene({progress, onReady, onError}: GallerySceneProps) {
    const mountRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef(progress);
    const wakeRef = useRef<() => void>(() => {});

    useEffect(() => {
        targetRef.current = progress;
        wakeRef.current();
    }, [progress]);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;
        let disposed = false;
        let renderer: WebGLRenderer;
        let frame = 0;
        let gallery: Object3D | null = null;
        let poses: CameraPose[] = [];
        let curves: Array<CatmullRomCurve3 | null> = [];
        let currentProgress = targetRef.current;
        const scene = new Scene();
        scene.background = new Color('#a8bbc2');
        scene.add(new HemisphereLight(0xeaf5ff, 0xa68d70, 1.65));
        scene.add(new AmbientLight(0xffffff, 0.32));
        const camera = new PerspectiveCamera(48, 1, 0.1, 150);

        const setPose = (value: number) => {
            if (poses.length !== cameraNames.length) return;
            const scaled = MathUtils.clamp(value, 0, 1) * (poses.length - 1);
            const index = Math.min(poses.length - 2, Math.floor(scaled));
            const t = MathUtils.smoothstep(scaled - index, 0, 1);
            const from = poses[index], to = poses[index + 1];
            if (curves[index]) curves[index]!.getPoint(t, camera.position);
            else camera.position.copy(from.position).lerp(to.position, t);
            camera.quaternion.slerpQuaternions(from.rotation, to.rotation, t);
            camera.fov = MathUtils.lerp(from.fov, to.fov, t);
            camera.updateProjectionMatrix();
        };

        const render = () => {
            frame = 0;
            if (disposed || !gallery) return;
            const delta = targetRef.current - currentProgress;
            currentProgress += Math.abs(delta) < 0.00025 ? delta : delta * 0.15;
            setPose(currentProgress);
            renderer.render(scene, camera);
            if (Math.abs(targetRef.current - currentProgress) >= 0.00025) {
                frame = requestAnimationFrame(render);
            }
        };
        const wake = () => {
            if (!frame && !disposed && gallery) frame = requestAnimationFrame(render);
        };
        wakeRef.current = wake;

        try {
            if ((navigator.hardwareConcurrency || 4) <= 2) throw new Error('Reduced device capability');
            renderer = new WebGLRenderer({antialias: true, powerPreference: 'high-performance'});
            renderer.outputColorSpace = SRGBColorSpace;
            renderer.toneMapping = ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.0;
            renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.25 : 1.6));
            mount.appendChild(renderer.domElement);
        } catch {
            onError();
            return;
        }

        const resize = () => {
            if (disposed) return;
            const width = Math.max(1, mount.clientWidth);
            const height = Math.max(1, mount.clientHeight);
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            wake();
        };
        const observer = new ResizeObserver(resize);
        observer.observe(mount);
        renderer.domElement.addEventListener('webglcontextlost', onError);
        resize();

        new GLTFLoader().load('/gallery/personal-gallery.glb', gltf => {
            if (disposed) {
                disposeGallery(gltf.scene);
                return;
            }
            try {
                gltf.scene.updateMatrixWorld(true);
                poses = cameraNames.map(name => {
                    const source = gltf.scene.getObjectByName(name) as PerspectiveCamera | undefined;
                    if (!source?.isPerspectiveCamera) throw new Error('Missing gallery camera: ' + name);
                    return {
                        position: source.getWorldPosition(new Vector3()),
                        rotation: source.getWorldQuaternion(new Quaternion()),
                        fov: source.fov,
                    };
                });
                curves = routeWaypoints.map((waypoints, index) =>
                    waypoints.length ? new CatmullRomCurve3([poses[index].position, ...waypoints, poses[index + 1].position], false, 'centripetal') : null
                );
                gltf.scene.traverse(object => {
                    // Blender area lights do not export to glTF. Keep its warm spots,
                    // but cap the conversion's very high luminous intensity for the web.
                    if (object instanceof SpotLight) object.intensity = Math.min(object.intensity, 115);
                });
                gallery = gltf.scene;
                scene.add(gallery);
                setPose(currentProgress);
                wake();
                onReady();
            } catch {
                onError();
            }
        }, undefined, onError);

        return () => {
            disposed = true;
            wakeRef.current = () => {};
            if (frame) cancelAnimationFrame(frame);
            observer.disconnect();
            renderer.domElement.removeEventListener('webglcontextlost', onError);
            if (gallery) disposeGallery(gallery);
            renderer.dispose();
            renderer.forceContextLoss();
            renderer.domElement.remove();
        };
    }, [onReady, onError]);

    return <div className="gallery-renderer" ref={mountRef} />;
}

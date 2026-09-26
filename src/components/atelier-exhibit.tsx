"use client";

import Image from 'next/image';
import {useRef} from 'react';
import type {PointerEvent} from 'react';
import {STORAGE_HOST} from '@/data/baseUrl';

export function AtelierExhibit() {
    const exhibitRef = useRef<HTMLDivElement>(null);
    const pointer = useRef({x: 0, y: 0});
    const frame = useRef<number | null>(null);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = event.currentTarget.getBoundingClientRect();
        pointer.current = {
            x: Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1)),
            y: Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1)),
        };
        if (frame.current !== null) return;

        frame.current = window.requestAnimationFrame(() => {
            const node = exhibitRef.current;
            if (!node) return;
            const {x, y} = pointer.current;
            node.style.setProperty('--scene-x', `${x * -7}px`);
            node.style.setProperty('--scene-y', `${y * -5}px`);
            node.style.setProperty('--card-x', `${x * 15}px`);
            node.style.setProperty('--card-y', `${y * 11}px`);
            node.style.setProperty('--card-tilt', `${1.2 + x * -1.3}deg`);
            node.style.setProperty('--petal-a-x', `${x * -11}px`);
            node.style.setProperty('--petal-a-y', `${y * -8}px`);
            node.style.setProperty('--petal-a-tilt', `${-24 + x * 5}deg`);
            node.style.setProperty('--petal-b-x', `${x * 13}px`);
            node.style.setProperty('--petal-b-y', `${y * 9}px`);
            node.style.setProperty('--petal-b-tilt', `${38 + x * -6}deg`);
            node.style.setProperty('--petal-c-x', `${x * -8}px`);
            node.style.setProperty('--petal-c-y', `${y * 13}px`);
            node.style.setProperty('--petal-c-tilt', `${-42 + x * 4}deg`);
            frame.current = null;
        });
    };

    const handlePointerLeave = () => {
        if (frame.current !== null) window.cancelAnimationFrame(frame.current);
        frame.current = null;
        const node = exhibitRef.current;
        if (!node) return;
        for (const property of [
            '--scene-x', '--scene-y', '--card-x', '--card-y', '--petal-a-x', '--petal-a-y',
            '--petal-b-x', '--petal-b-y', '--petal-c-x', '--petal-c-y',
        ]) node.style.setProperty(property, '0px');
        node.style.setProperty('--card-tilt', '1.2deg');
        node.style.setProperty('--petal-a-tilt', '-24deg');
        node.style.setProperty('--petal-b-tilt', '38deg');
        node.style.setProperty('--petal-c-tilt', '-42deg');
    };

    return (
        <div
            ref={exhibitRef}
            className="atelier-featured-visual atelier-reveal atelier-exhibit"
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            <Image src="/atelier/featured-work.webp" alt="" fill sizes="(max-width: 900px) 100vw, 40vw" loading="lazy" aria-hidden="true" />
            <div className="atelier-floating-petals" aria-hidden="true">
                <span className="atelier-floating-petal atelier-floating-petal-a"><i /></span>
                <span className="atelier-floating-petal atelier-floating-petal-b"><i /></span>
                <span className="atelier-floating-petal atelier-floating-petal-c"><i /></span>
            </div>
            <div className="atelier-project-preview">
                <div className="atelier-project-preview-screen">
                    <Image src={`${STORAGE_HOST}/admin-panel.webp`} alt="Clouisle AI 管理平台界面" fill sizes="(max-width: 650px) 84vw, (max-width: 900px) 52vw, 22vw" loading="lazy" />
                </div>
                <div className="atelier-project-preview-caption"><span>01 / PRODUCT INTERFACE</span><strong>Clouisle · AI Workspace</strong></div>
            </div>
            <span className="atelier-exhibit-mark">YH / SELECTED WORKS</span>
        </div>
    );
}

'use client';

import { useEffect } from 'react';

export function ToolsPwaRegister() {
    useEffect(() => {
        const manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
        if (manifest) {
            manifest.href = '/tools/manifest.json';
        }

        if (!('serviceWorker' in navigator)) {
            return;
        }

        navigator.serviceWorker.register('/sw.js', { scope: '/tools/' }).catch(() => {});
    }, []);

    return null;
}

'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

type BeforeInstallPromptEvent = Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

function isStandalone() {
    return window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true;
}

function isIosLike() {
    return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

export function ToolsInstallButton() {
    const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showIosHint, setShowIosHint] = useState(false);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        if (isStandalone()) {
            setInstalled(true);
            return;
        }

        setShowIosHint(isIosLike());

        const handleBeforeInstallPrompt = (event: Event) => {
            event.preventDefault();
            setInstallPrompt(event as BeforeInstallPromptEvent);
            setShowIosHint(false);
        };

        const handleAppInstalled = () => {
            setInstalled(true);
            setInstallPrompt(null);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.addEventListener('appinstalled', handleAppInstalled);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
            window.removeEventListener('appinstalled', handleAppInstalled);
        };
    }, []);

    const handleInstall = async () => {
        if (!installPrompt) {
            setShowIosHint(true);
            return;
        }

        await installPrompt.prompt();
        await installPrompt.userChoice;
        setInstallPrompt(null);
    };

    if (installed) {
        return null;
    }

    return (
        <div className="flex flex-col items-end gap-2">
            {(installPrompt || showIosHint) && (
                <button
                    type="button"
                    onClick={handleInstall}
                    className="inline-flex items-center gap-2 rounded-lg border border-violet-500/40 bg-violet-500/10 px-3 py-2 text-sm font-medium text-violet-200 transition-colors hover:bg-violet-500/20"
                >
                    <Download className="h-4 w-4" />
                    安装工具箱
                </button>
            )}
            {showIosHint && !installPrompt && (
                <p className="max-w-48 text-right text-xs text-muted-foreground">
                    请通过浏览器分享菜单添加到主屏幕。
                </p>
            )}
        </div>
    );
}

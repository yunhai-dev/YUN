"use client";

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BackgroundDisplayMode, PlayerPrefs } from '../hooks/usePlayerPrefs';
import { BACKGROUND_TYPE_OPTIONS } from '../folia/backgrounds/definition';
import { CROSSFADE_MAX_SEC, CROSSFADE_MIN_SEC } from '../playback/crossfade';
import type { VisualizerMode } from '../visualizers/types';

interface PlayerSettingsPanelProps {
    prefs: PlayerPrefs;
    mode: VisualizerMode;
    onChange: (patch: Partial<PlayerPrefs>) => void;
    onModeChange: (mode: VisualizerMode) => void;
    onClose: () => void;
}

const STYLE_OPTIONS: Array<{id: VisualizerMode; label: string}> = [
    {id: 'sonnet', label: '商籁'},
    {id: 'diorama', label: '镜台'},
    {id: 'tilt', label: '倾诉'},
    {id: 'monet', label: '莫奈'},
    {id: 'tempera', label: '凝彩'},
    {id: 'partita', label: '云阶'},
    {id: 'cadenza', label: 'Mindscape'},
    {id: 'cappella', label: 'Cappella'},
    {id: 'claddagh', label: 'Claddagh'},
    {id: 'classic', label: 'Luminous'},
    {id: 'nebbia', label: '雾笺'},
    {id: 'fume', label: '浮名'},
    {id: 'hanabi', label: '花火'},
    {id: 'lumiere', label: '绘光'},
    {id: 'machi', label: '町景'},
    {id: 'still', label: '静止'},
    {id: 'pendolo', label: '时计'},
];

const BACKGROUND_OPTIONS: Array<{id: BackgroundDisplayMode; label: string}> = [
    {id: 'both', label: '网格 + 颗粒'},
    {id: 'mesh', label: '仅网格'},
    {id: 'dithering', label: '仅颗粒'},
];

const SettingRow = ({label, description, children}: {
    label: string;
    description?: string;
    children: React.ReactNode;
}) => (
    <div className="flex items-center justify-between gap-4 py-3">
        <div className="min-w-0">
            <p className="text-sm text-white/85">{label}</p>
            {description ? <p className="mt-0.5 text-[11px] leading-4 text-white/40">{description}</p> : null}
        </div>
        <div className="shrink-0">{children}</div>
    </div>
);

const Toggle = ({active, label, onToggle}: {active: boolean; label: string; onToggle: () => void}) => (
    <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={label}
        onClick={onToggle}
        className={cn(
            'relative h-5 w-9 rounded-full transition-colors',
            active ? 'bg-white' : 'bg-white/20',
        )}
    >
        <span
            className={cn(
                'absolute top-0.5 h-4 w-4 rounded-full transition-transform',
                active ? 'translate-x-[18px] bg-black' : 'translate-x-0.5 bg-white/70',
            )}
        />
    </button>
);

const SectionTitle = ({children}: {children: React.ReactNode}) => (
    <h3 className="mt-5 mb-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">{children}</h3>
);

/**
 * The player page's settings sheet: the subset of Folia's settings this player actually honours —
 * lyric style, backdrop composition/motion, the bottom subtitle and the chrome auto-hide.
 */
export const PlayerSettingsPanel = ({prefs, mode, onChange, onModeChange, onClose}: PlayerSettingsPanelProps) => {
    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-30" onClick={onClose} role="presentation">
            <div className="absolute inset-0 bg-black/30"/>
            <aside
                role="dialog"
                aria-modal="true"
                aria-label="播放器设置"
                className="absolute inset-y-3 right-3 flex w-[min(20rem,86vw)] flex-col overflow-y-auto rounded-2xl border border-white/10 bg-black/60 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-2xl md:inset-y-4 md:right-4"
                onClick={event => event.stopPropagation()}
            >
                <header className="flex items-center justify-between">
                    <h2 className="text-base font-semibold tracking-wide text-white">播放器设置</h2>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        title="关闭"
                        aria-label="关闭设置"
                    >
                        <X size={18}/>
                    </button>
                </header>

                <SectionTitle>歌词样式</SectionTitle>
                <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/15 bg-white/5 p-1">
                    {STYLE_OPTIONS.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onModeChange(item.id)}
                            aria-pressed={mode === item.id}
                            className={cn(
                                'rounded-lg px-1.5 py-1.5 text-[11px] tracking-[0.08em] transition-colors',
                                mode === item.id ? 'bg-white text-black' : 'text-white/60 hover:text-white',
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <SectionTitle>背景</SectionTitle>
                <div className="grid grid-cols-3 gap-1 rounded-xl border border-white/15 bg-white/5 p-1">
                    {BACKGROUND_TYPE_OPTIONS.map(item => (
                        <button
                            key={item.type}
                            onClick={() => onChange({backgroundType: item.type})}
                            aria-pressed={prefs.backgroundType === item.type}
                            className={cn(
                                'rounded-lg px-1.5 py-1.5 text-[11px] tracking-[0.08em] transition-colors',
                                prefs.backgroundType === item.type ? 'bg-white text-black' : 'text-white/60 hover:text-white',
                            )}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
                {prefs.backgroundType === 'latent' && (
                    <div className="mt-3">
                        <p className="mb-1.5 text-[11px] text-white/45">隐现图层</p>
                        <div className="flex items-center rounded-full border border-white/15 bg-white/5 p-1">
                            {BACKGROUND_OPTIONS.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onChange({backgroundMode: item.id})}
                                    aria-pressed={prefs.backgroundMode === item.id}
                                    className={cn(
                                        'flex-1 rounded-full px-2 py-1.5 text-[11px] transition-colors',
                                        prefs.backgroundMode === item.id
                                            ? 'bg-white text-black'
                                            : 'text-white/60 hover:text-white',
                                    )}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {prefs.backgroundType === 'url' && (
                    <div className="mt-3">
                        <input
                            type="url"
                            value={prefs.urlBackgroundUrl}
                            onChange={event => onChange({urlBackgroundUrl: event.target.value})}
                            placeholder="https://example.com/"
                            aria-label="嵌入网址"
                            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/85 transition-colors outline-none placeholder:text-white/30 focus:border-white/30"
                        />
                        <p className="mt-1.5 text-[11px] leading-4 text-white/40">只支持 http(s) 页面，且站点需允许 iframe 嵌入。</p>
                    </div>
                )}
                <SettingRow label="背景动效" description="关闭后当前背景保持静止">
                    <Toggle
                        active={prefs.backgroundMotion}
                        label="背景动效"
                        onToggle={() => onChange({backgroundMotion: !prefs.backgroundMotion})}
                    />
                </SettingRow>

                <SectionTitle>歌词</SectionTitle>
                <SettingRow label="底部字幕" description="在播放器上方显示当前歌词行">
                    <Toggle
                        active={prefs.subtitle}
                        label="底部字幕"
                        onToggle={() => onChange({subtitle: !prefs.subtitle})}
                    />
                </SettingRow>

                <SectionTitle>智能过渡</SectionTitle>
                <SettingRow label="智能过渡" description="自动连播时，在歌曲末尾与下一首交叉淡化">
                    <Toggle
                        active={prefs.smartTransition}
                        label="智能过渡"
                        onToggle={() => onChange({smartTransition: !prefs.smartTransition})}
                    />
                </SettingRow>
                <div className={cn('pb-2', !prefs.smartTransition && 'opacity-40')}>
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] text-white/45">过渡时长</span>
                        <span className="text-[11px] tabular-nums text-white/70">{prefs.crossfadeSeconds} 秒</span>
                    </div>
                    <input
                        type="range"
                        min={CROSSFADE_MIN_SEC}
                        max={CROSSFADE_MAX_SEC}
                        step={1}
                        value={prefs.crossfadeSeconds}
                        disabled={!prefs.smartTransition}
                        onChange={event => onChange({crossfadeSeconds: Number(event.target.value)})}
                        aria-label="过渡时长"
                        className="mt-2 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/20 accent-white disabled:cursor-not-allowed [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                </div>

                <SectionTitle>控件</SectionTitle>
                <SettingRow label="空闲自动隐藏" description="指针静止 3 秒后隐藏控件与光标">
                    <Toggle
                        active={prefs.autoHideChrome}
                        label="空闲自动隐藏"
                        onToggle={() => onChange({autoHideChrome: !prefs.autoHideChrome})}
                    />
                </SettingRow>
            </aside>
        </div>
    );
};

export default PlayerSettingsPanel;

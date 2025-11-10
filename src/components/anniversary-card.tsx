'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface Anniversary {
    id: string;
    title: string;
    date: string;          // 基础日期 YYYY-MM-DD
    dateTime?: string;     // 可选：更精确的起点 YYYY-MM-DDTHH:mm (本地时间或 UTC，使用前确保一致)
    repeat: boolean;
    category?: string;
    createdAt?: string;
}

interface AnniversaryCardProps {
    item: Anniversary;
    defaultExpanded?: boolean;
    showJson?: boolean;
    showTimeline?: boolean;
    draggable?: boolean;
    countdownThresholdDays?: number;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onToggleExpand?: (id: string, expanded: boolean) => void;
    onDragStart?: (id: string, ev: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (id: string, ev: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (id: string, ev: React.DragEvent<HTMLDivElement>) => void;
    className?: string;
    rippleBaseSizeRatio?: number;
    rippleMaxScale?: number;
    /** 是否在详情处显示“总小时”提示 */
    showTotalHours?: boolean;
    /** 控制右侧“过去了多久”展示模式: 'both' | 'hours' | 'days' */
    hoursLabelMode?: 'both' | 'hours' | 'days';
}

function today(): Date {
    const n = new Date();
    return new Date(n.getFullYear(), n.getMonth(), n.getDate(), n.getHours(), n.getMinutes(), n.getSeconds());
}

function parseDateOrDateTime(item: Anniversary): Date {
    if (item.dateTime) {
        // 允许直接用 new Date 解析。若需严格本地处理，可改为手动解析。
        const dt = new Date(item.dateTime);
        if (!isNaN(dt.getTime())) return dt;
    }
    const [y, m, d] = item.date.split('-').map(Number);
    return new Date(y, m - 1, d, 0, 0, 0);
}

function diffHours(a: Date, b: Date): number {
    return Math.floor((b.getTime() - a.getTime()) / 3600000);
}

function diffDays(a: Date, b: Date): number {
    return Math.floor((b.getTime() - a.getTime()) / 86400000);
}

function nextOccurrence(item: Anniversary): { date: Date; years: number; last: Date } {
    const origin = parseDateOrDateTime(item);
    const now = today();
    if (!item.repeat) return { date: origin, years: now.getFullYear() - origin.getFullYear(), last: origin };
    let year = now.getFullYear();
    let candidate = new Date(year, origin.getMonth(), origin.getDate(), origin.getHours(), origin.getMinutes(), origin.getSeconds());
    let last = new Date(year - 1, origin.getMonth(), origin.getDate(), origin.getHours(), origin.getMinutes(), origin.getSeconds());
    if (candidate < now) {
        year += 1;
        last = candidate;
        candidate = new Date(year, origin.getMonth(), origin.getDate(), origin.getHours(), origin.getMinutes(), origin.getSeconds());
    }
    return { date: candidate, years: year - origin.getFullYear(), last };
}

function computeMetrics(item: Anniversary) {
    const origin = parseDateOrDateTime(item);
    const now = today();
    const nxt = nextOccurrence(item);
    const pastHours = diffHours(origin, now);
    const pastDays = Math.floor(pastHours / 24);
    const remainderHours = pastHours - pastDays * 24;
    const daysToNext = diffDays(now, nxt.date);
    const isPastNonRepeat = !item.repeat && nxt.date < now;

    // 周期进度（按天）
    const totalCycleDays = item.repeat ? diffDays(nxt.last, nxt.date) : Math.max(diffDays(origin, nxt.date), 1);
    const progressDays = item.repeat ? diffDays(nxt.last, now) : Math.min(pastDays, totalCycleDays);
    const progressRatio = Math.min(Math.max(progressDays / totalCycleDays, 0), 1);

    return {
        pastHours,
        pastDays,
        remainderHours,
        daysToNext,
        years: nxt.years,
        nextDate: nxt.date,
        lastDate: nxt.last,
        isPastNonRepeat,
        totalCycleDays,
        progressDays,
        progressRatio
    };
}

function formatDate(d: Date): string {
    const iso = d.toISOString(); // UTC 显示可能与本地不一致，可根据需要改为本地格式
    return iso.split('T')[0];
}

function escapeHTML(str: string): string {
    return str.replace(/[&<>"']/g, s => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[s]!));
}

const AnniversaryCard: React.FC<AnniversaryCardProps> = ({
                                                             item,
                                                             defaultExpanded = false,
                                                             showJson = true,
                                                             showTimeline = true,
                                                             draggable = false,
                                                             countdownThresholdDays = 7,
                                                             onEdit,
                                                             onDelete,
                                                             onToggleExpand,
                                                             onDragStart,
                                                             onDragOver,
                                                             onDrop,
                                                             className = '',
                                                             rippleBaseSizeRatio = 0.45,
                                                             rippleMaxScale = 1.9,
                                                             showTotalHours = true,
                                                             hoursLabelMode = 'both'
                                                         }) => {
    const metrics = computeMetrics(item);
    const [expanded, setExpanded] = useState(defaultExpanded);
    const [countdownText, setCountdownText] = useState('');
    const cardRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (metrics.isPastNonRepeat || metrics.daysToNext > countdownThresholdDays) return;
        function update() {
            const end = metrics.nextDate.getTime();
            const now = Date.now();
            let diff = end - now;
            if (diff <= 0) {
                setCountdownText('纪念日已到达！');
                return;
            }
            const d = Math.floor(diff / 86400000);
            diff -= d * 86400000;
            const h = Math.floor(diff / 3600000);
            diff -= h * 3600000;
            const m = Math.floor(diff / 60000);
            const s = Math.floor((diff - m * 60000) / 1000);
            setCountdownText(`剩余 ${d}天 ${pad2(h)}:${pad2(m)}:${pad2(s)}`);
        }
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [metrics.isPastNonRepeat, metrics.daysToNext, metrics.nextDate, countdownThresholdDays]);

    function pad2(n: number) {
        return n.toString().padStart(2, '0');
    }

    const toggleExpand = useCallback(() => {
        setExpanded(prev => {
            const next = !prev;
            onToggleExpand?.(item.id, next);
            return next;
        });
    }, [onToggleExpand, item.id]);

    const handleKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
        } else if (e.key === 'Delete') {
            e.preventDefault();
            onDelete?.(item.id);
        }
    };

    const handleClickRipple = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        if (rippleBaseSizeRatio <= 0) return;
        const isActionButton = (e.target as HTMLElement).closest('[data-action]');
        if (isActionButton) return;
        const rect = cardRef.current.getBoundingClientRect();
        const maxSide = Math.max(rect.width, rect.height);
        const size = maxSide * rippleBaseSizeRatio;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        const span = document.createElement('span');
        span.className = 'ripple-el-invert-sm';
        span.style.cssText = `
      position:absolute;
      left:${x}px;
      top:${y}px;
      width:${size}px;
      height:${size}px;
      background:#ffffff;
      opacity:.38;
      border-radius:50%;
      pointer-events:none;
      transform:scale(.35);
      animation:rippleAnimInvertSm 0.5s ease-out forwards;
      mix-blend-mode:screen;
    `;
        cardRef.current.appendChild(span);
        setTimeout(() => span.remove(), 520);
    };

    const handleDragStart = (ev: React.DragEvent<HTMLDivElement>) => {
        onDragStart?.(item.id, ev);
        ev.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
        onDragOver?.(item.id, ev);
        ev.preventDefault();
    };
    const handleDrop = (ev: React.DragEvent<HTMLDivElement>) => {
        onDrop?.(item.id, ev);
        ev.preventDefault();
    };

    // 右侧“过去了多久”显示内容
    const elapsedDisplay = (() => {
        if (hoursLabelMode === 'hours') {
            return `约 ${metrics.pastHours} 小时`;
        }
        const base = `已过去 ${metrics.pastDays} 天 ${metrics.remainderHours} 小时`;
        if (hoursLabelMode === 'days') return base;
        // both
        return `${base}（≈ ${metrics.pastHours} 小时）`;
    })();

    // 时间轴数据
    const timelineYears = (() => {
        if (!showTimeline) return [];
        const originDT = parseDateOrDateTime(item);
        const nowYear = today().getFullYear();
        const endYear = item.repeat ? nowYear + 1 : originDT.getFullYear();
        const years: { date: Date; passed: boolean }[] = [];
        for (let y = originDT.getFullYear(); y <= endYear; y++) {
            const d = new Date(y, originDT.getMonth(), originDT.getDate(), originDT.getHours(), originDT.getMinutes(), originDT.getSeconds());
            if (!item.repeat && y !== originDT.getFullYear()) break;
            years.push({ date: d, passed: d <= today() });
        }
        return years;
    })();

    return (
        <div
            ref={cardRef}
            className={[
                'relative bg-black text-white border border-white rounded-[14px] p-5 flex flex-col gap-4 transition-all duration-200',
                'select-none hover:shadow-[0_4px_18px_-6px_rgba(255,255,255,0.35)]',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-white',
                expanded ? 'border-2' : '',
                draggable ? 'cursor-grab' : '',
                className
            ].join(' ')}
            tabIndex={0}
            onKeyDown={handleKey}
            onClick={handleClickRipple}
            draggable={draggable}
            onDragStart={draggable ? handleDragStart : undefined}
            onDragOver={draggable ? handleDragOver : undefined}
            onDrop={draggable ? handleDrop : undefined}
            data-expanded={expanded}
            data-id={item.id}
        >
            {/* 光泽层 */}
            <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 hover:opacity-100 transition-opacity"
                style={{
                    background:
                        'linear-gradient(115deg,rgba(255,255,255,0) 40%,rgba(255,255,255,.12) 60%,rgba(255,255,255,0) 75%)'
                }}
            />

            {/* 顶部操作按钮 */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 focus-within:opacity-100 transition">
                <button
                    type="button"
                    data-action="edit"
                    onClick={() => onEdit?.(item.id)}
                    className="text-xs px-2 py-1 border border-white rounded-md hover:bg-white hover:text-black transition bg-transparent"
                >
                    编辑
                </button>
                <button
                    type="button"
                    data-action="delete"
                    onClick={() => onDelete?.(item.id)}
                    className="text-xs px-2 py-1 border border-white rounded-md hover:bg-white hover:text-black transition bg-transparent"
                >
                    删除
                </button>
                <button
                    type="button"
                    data-action="expand"
                    onClick={toggleExpand}
                    className="text-xs px-2 py-1 border border-white rounded-md hover:bg-white hover:text-black transition bg-transparent"
                >
                    {expanded ? '收起' : '展开'}
                </button>
            </div>

            {/* 标题 + 右侧已过去多久 */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-semibold m-0">{item.title}</h3>
                        {item.repeat && (
                            <span className="text-[10px] tracking-wider px-2 py-1 border border-white rounded-md uppercase">
                每年
              </span>
                        )}
                        {item.category && (
                            <span className="text-[10px] tracking-wider px-2 py-1 border border-white rounded-md uppercase">
                {item.category}
              </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-300">
                        <span>原始日期：{item.date}</span>
                        {item.dateTime && <span>起始时间：{item.dateTime.replace('T', ' ')}</span>}
                        {item.createdAt && <span>创建：{item.createdAt.split('T')[0]}</span>}
                    </div>
                </div>
                <div className="flex flex-col items-end text-right text-xs min-w-[140px]">
          <span className="uppercase tracking-wider text-[10px] text-gray-400">
            过去了多久
          </span>
                    <span className="font-medium leading-snug">
              {elapsedDisplay}
            </span>
                </div>
            </div>

            {/* 指标行 */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-300">
        <span>
          第 <strong className="font-semibold text-white">{metrics.years}</strong> 周年
        </span>
                <span>
          {metrics.daysToNext === 0
              ? '今天就是纪念日！'
              : metrics.isPastNonRepeat
                  ? '已结束（不重复）'
                  : <>距离下次 <strong className="font-semibold text-white">{metrics.daysToNext}</strong> 天</>}
        </span>
                <span>下次：{formatDate(metrics.nextDate)}</span>
            </div>

            {/* 进度与倒计时 */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-[11px] tracking-wide text-gray-300">
                    <span>{metrics.isPastNonRepeat ? '一次性事件进度' : '周期进度'}</span>
                    <span>
            {metrics.progressDays}/{metrics.totalCycleDays} 天
          </span>
                </div>
                <div className="h-2 border border-white rounded-md overflow-hidden bg-black">
                    <div
                        className="h-full bg-white transition-all"
                        style={{ width: `${metrics.progressRatio * 100}%` }}
                    />
                </div>
                <div className="text-xs font-medium text-gray-200">
                    {metrics.isPastNonRepeat
                        ? '不再倒计时（一次性）'
                        : metrics.daysToNext > countdownThresholdDays
                            ? '距离：> 7 天'
                            : countdownText || '倒计时加载中...'}
                </div>
            </div>

            {/* 展开按钮 */}
            <button
                type="button"
                onClick={toggleExpand}
                className="text-xs underline underline-offset-4 self-start px-2 py-1 rounded hover:bg-white hover:text-black transition"
            >
                {expanded ? '收起详情' : '展开详情'}
            </button>

            {/* 详情区 */}
            {expanded && (
                <div className="border-t border-dashed border-white pt-4 animate-fadeIn flex flex-col gap-4">
                    <div className="text-xs text-gray-200">
                        周期：
                        {item.repeat
                            ? `从 ${formatDate(metrics.lastDate)} 到 ${formatDate(metrics.nextDate)} （共 ${metrics.totalCycleDays} 天）`
                            : '一次性事件'}
                    </div>

                    {showTotalHours && (
                        <div className="text-xs text-gray-300">
                            累计小时：<strong className="text-white">{metrics.pastHours}</strong> 小时
                        </div>
                    )}

                    {showTimeline && (
                        <div className="flex flex-col gap-2">
                            <div className="text-xs font-semibold text-white">年度时间轴</div>
                            <div className="grid gap-2">
                                {timelineYears.map(y => (
                                    <div
                                        key={y.date.getFullYear()}
                                        className="flex justify-between text-[11px] px-3 py-2 border border-white rounded-md bg-transparent hover:bg-white hover:text-black transition"
                                    >
                                        <span>{formatDate(y.date)}</span>
                                        <span>{y.passed ? '已发生' : '待到来'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {showJson && (
                        <div className="flex flex-col gap-2">
                            <div className="text-xs font-semibold text-white">原始 JSON</div>
                            <pre className="text-[11px] bg-black text-white p-3 rounded-md max-h-48 overflow-auto leading-relaxed">
                {escapeHTML(JSON.stringify(item, null, 2))}
              </pre>
                        </div>
                    )}
                </div>
            )}

            <style>
                {`
          @keyframes rippleAnimInvertSm {
            to { transform: scale(${rippleMaxScale}); opacity: 0; }
          }
          .animate-fadeIn {
            animation: fadeIn .4s ease;
          }
          @keyframes fadeIn {
            from { opacity:0; transform:translateY(4px); }
            to { opacity:1; transform:translateY(0); }
          }
        `}
            </style>
        </div>
    );
};

export default AnniversaryCard;

/* 使用示例：
<AnniversaryCard
  item={{
    id:'x1',
    title:'项目启动',
    date:'2024-10-01',
    dateTime:'2024-10-01T09:30', // 具有小时精度
    repeat:false
  }}
  hoursLabelMode="both"
  showTotalHours
/>
*/
"use client";

import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
    Plus,
    Upload,
    Download,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Wallet,
    CalendarDays,
    List,
    BarChart3,
    FolderOpen,
    Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type Cycle = 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';

interface Expense {
    id: string;
    name: string;
    amount: number;
    category: string;
    dayOfMonth: number;
    cycle: Cycle;
    startMonth: string; // YYYY-MM
    durationMonths: number;
    note: string;
    /** 是否关联发薪日：true 时实际扣款日 = 发薪日 + offsetDays */
    linkedToPayday?: boolean;
    /** 相对发薪日的偏移天数，0 = 发薪日当天，负数 = 发薪日后 N 天扣款（如信用卡发薪后还款），正数 = 发薪前 N 天预扣 */
    paydayOffset?: number;
}

interface Settings {
    paydays: number[]; // 每月发薪日（1-31），可多个（如 15、25）
}

type ViewTab = 'calendar' | 'list' | 'summary' | 'all';

const STORAGE_KEY = 'expense_tracker_v1';
const VIEW_KEY = 'expense_tracker_view';
const SETTINGS_KEY = 'expense_tracker_settings';

const CYCLE_LABELS: Record<Cycle, string> = {
    monthly: '每月',
    quarterly: '每季度',
    'half-yearly': '每半年',
    yearly: '每年',
};

const DEFAULT_CATEGORY_COLORS: Record<string, { bg: string; dot: string; text: string }> = {
    住房: { bg: 'bg-blue-100 dark:bg-blue-500/25', dot: 'bg-blue-600 dark:bg-blue-300', text: 'text-blue-900 dark:text-blue-100' },
    交通: { bg: 'bg-emerald-100 dark:bg-emerald-500/25', dot: 'bg-emerald-600 dark:bg-emerald-300', text: 'text-emerald-900 dark:text-emerald-100' },
    通讯: { bg: 'bg-amber-100 dark:bg-amber-500/25', dot: 'bg-amber-600 dark:bg-amber-300', text: 'text-amber-900 dark:text-amber-100' },
    订阅: { bg: 'bg-pink-100 dark:bg-pink-500/25', dot: 'bg-pink-600 dark:bg-pink-300', text: 'text-pink-900 dark:text-pink-100' },
    保险: { bg: 'bg-indigo-100 dark:bg-indigo-500/25', dot: 'bg-indigo-600 dark:bg-indigo-300', text: 'text-indigo-900 dark:text-indigo-100' },
    教育: { bg: 'bg-orange-100 dark:bg-orange-500/25', dot: 'bg-orange-600 dark:bg-orange-300', text: 'text-orange-900 dark:text-orange-100' },
    其他: { bg: 'bg-slate-200 dark:bg-slate-500/25', dot: 'bg-slate-600 dark:bg-slate-300', text: 'text-slate-900 dark:text-slate-100' },
};

const FALLBACK_PALETTE: { bg: string; dot: string; text: string }[] = [
    { bg: 'bg-cyan-100 dark:bg-cyan-500/25', dot: 'bg-cyan-600 dark:bg-cyan-300', text: 'text-cyan-900 dark:text-cyan-100' },
    { bg: 'bg-teal-100 dark:bg-teal-500/25', dot: 'bg-teal-600 dark:bg-teal-300', text: 'text-teal-900 dark:text-teal-100' },
    { bg: 'bg-rose-100 dark:bg-rose-500/25', dot: 'bg-rose-600 dark:bg-rose-300', text: 'text-rose-900 dark:text-rose-100' },
    { bg: 'bg-fuchsia-100 dark:bg-fuchsia-500/25', dot: 'bg-fuchsia-600 dark:bg-fuchsia-300', text: 'text-fuchsia-900 dark:text-fuchsia-100' },
    { bg: 'bg-lime-100 dark:bg-lime-500/25', dot: 'bg-lime-600 dark:bg-lime-300', text: 'text-lime-900 dark:text-lime-100' },
    { bg: 'bg-violet-100 dark:bg-violet-500/25', dot: 'bg-violet-600 dark:bg-violet-300', text: 'text-violet-900 dark:text-violet-100' },
    { bg: 'bg-sky-100 dark:bg-sky-500/25', dot: 'bg-sky-600 dark:bg-sky-300', text: 'text-sky-900 dark:text-sky-100' },
];

function hashString(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) {
        h = (h * 31 + s.charCodeAt(i)) | 0;
    }
    return Math.abs(h);
}

function colorOf(category: string) {
    return (
        DEFAULT_CATEGORY_COLORS[category] ??
        FALLBACK_PALETTE[hashString(category) % FALLBACK_PALETTE.length]
    );
}

// ============ 纯算法 ============

function addMonths(ym: string, n: number): string {
    const [yStr, mStr] = ym.split('-');
    let y = parseInt(yStr, 10);
    let m = parseInt(mStr, 10) + n;
    while (m > 12) {
        m -= 12;
        y += 1;
    }
    while (m < 1) {
        m += 12;
        y -= 1;
    }
    return `${y}-${String(m).padStart(2, '0')}`;
}

function endMonthOf(exp: Expense): string {
    return addMonths(exp.startMonth, exp.durationMonths - 1);
}

function compareYm(a: string, b: string): number {
    if (a === b) return 0;
    return a < b ? -1 : 1;
}

function isActiveInMonth(exp: Expense, ym: string): boolean {
    const end = endMonthOf(exp);
    return compareYm(exp.startMonth, ym) <= 0 && compareYm(ym, end) <= 0;
}

function shouldOccurInMonth(exp: Expense, ym: string): boolean {
    if (!isActiveInMonth(exp, ym)) return false;
    const monthOfYm = parseInt(ym.split('-')[1], 10);
    const monthOfStart = parseInt(exp.startMonth.split('-')[1], 10);
    switch (exp.cycle) {
        case 'monthly':
            return true;
        case 'quarterly':
            return ((monthOfYm - monthOfStart) + 12) % 3 === 0;
        case 'half-yearly':
            return ((monthOfYm - monthOfStart) + 12) % 6 === 0;
        case 'yearly':
            return monthOfYm === monthOfStart;
        default:
            return false;
    }
}

/**
 * 计算支出在某个月的实际扣款日（1-月末），关联发薪日时 = 发薪日 + offset 后的有效日。
 * 未关联发薪日时返回 exp.dayOfMonth；超过月末则钳到月末（如 31 号在 2 月扣月末），保证每月都有扣款日。
 */
function actualChargeDay(
    exp: Expense,
    ym: string,
    paydays: number[]
): number | null {
    const dim = daysInMonth(ym);
    if (exp.linkedToPayday && paydays.length > 0) {
        // 选最近的发薪日（按月固定偏移）
        const offset = exp.paydayOffset ?? 0;
        // 优先用偏移后仍在本月内的发薪日；若都越过月末则取最后一个发薪日 + offset
        const candidates = paydays
            .map((p) => p + offset)
            .filter((d) => d >= 1 && d <= dim)
            .sort((a, b) => a - b);
        if (candidates.length > 0) return candidates[0];
        // 偏移后越界：退回 exp.dayOfMonth；超过月末则扣到月末
        return Math.min(Math.max(exp.dayOfMonth, 1), dim);
    }
    return Math.min(Math.max(exp.dayOfMonth, 1), dim);
}

/** 支出在 ym 月是否会发生扣款（周期匹配且本月存在有效扣款日） */
function willChargeInMonth(exp: Expense, ym: string, paydays: number[]): boolean {
    if (!shouldOccurInMonth(exp, ym)) return false;
    return actualChargeDay(exp, ym, paydays) !== null;
}

/** 判断 ymd 是否为某月任一发薪日（按有效日修正） */
function isPayday(ymd: string, paydays: number[]): boolean {
    if (paydays.length === 0) return false;
    const [, , dStr] = ymd.split('-');
    const d = parseInt(dStr, 10);
    return paydays.includes(d);
}

function daysInMonth(ym: string): number {
    const [yStr, mStr] = ym.split('-');
    const y = parseInt(yStr, 10);
    const m = parseInt(mStr, 10);
    return new Date(y, m, 0).getDate();
}

function ymToDate(ym: string): Date {
    const [yStr, mStr] = ym.split('-');
    return new Date(parseInt(yStr, 10), parseInt(mStr, 10) - 1, 1);
}

function formatYMD(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatYM(ym: string): string {
    const [y, m] = ym.split('-');
    return `${y} 年 ${parseInt(m, 10)} 月`;
}

function formatAmount(n: number): string {
    return `¥${Math.round(n).toLocaleString('zh-CN')}`;
}

function genId(): string {
    return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function todayYm(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

function todayYmd(): string {
    return formatYMD(new Date());
}

function weekdayZh(d: Date): string {
    return ['日', '一', '二', '三', '四', '五', '六'][d.getDay()];
}

// ============ localStorage ============

function loadExpenses(): Expense[] {
    if (typeof window === 'undefined') return [];
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) return [];
        return parsed.filter(isValidExpense);
    } catch {
        return [];
    }
}

function saveExpenses(expenses: Expense[]) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

function isValidExpense(x: unknown): x is Expense {
    if (!x || typeof x !== 'object') return false;
    const o = x as Record<string, unknown>;
    return (
        typeof o.id === 'string' &&
        typeof o.name === 'string' &&
        typeof o.amount === 'number' &&
        typeof o.category === 'string' &&
        typeof o.dayOfMonth === 'number' &&
        typeof o.startMonth === 'string' &&
        typeof o.durationMonths === 'number' &&
        typeof o.note === 'string' &&
        ['monthly', 'quarterly', 'half-yearly', 'yearly'].includes(o.cycle as string)
    );
}

function loadSettings(): Settings {
    if (typeof window === 'undefined') return { paydays: [] };
    try {
        const raw = window.localStorage.getItem(SETTINGS_KEY);
        if (!raw) return { paydays: [] };
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed?.paydays) ? parsed.paydays : [];
        const valid = list.filter(
            (n: unknown) => typeof n === 'number' && Number.isInteger(n) && n >= 1 && n <= 31
        );
        return { paydays: Array.from(new Set(valid as number[])).sort((a, b) => a - b) };
    } catch {
        return { paydays: [] };
    }
}

function saveSettings(s: Settings) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
}

function loadView(): ViewTab {
    if (typeof window === 'undefined') return 'calendar';
    const v = window.localStorage.getItem(VIEW_KEY);
    if (v === 'calendar' || v === 'list' || v === 'summary' || v === 'all') return v;
    return 'calendar';
}

function saveView(v: ViewTab) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(VIEW_KEY, v);
}

// ============ 主组件 ============

const ExpenseTrackerPage = () => {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [view, setView] = useState<ViewTab>('calendar');
    const [currentYm, setCurrentYm] = useState<string>('');
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dayDetail, setDayDetail] = useState<{ ymd: string; items: Expense[] } | null>(null);
    const [settings, setSettings] = useState<Settings>({ paydays: [] });
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    useEffect(() => {
        setExpenses(loadExpenses());
        setView(loadView());
        setSettings(loadSettings());
        setCurrentYm(todayYm());
        setHydrated(true);
    }, []);

    // 从已有数据中按出现次数倒序动态提取分类
    const existingCategories = useMemo(() => {
        const counts = new Map<string, number>();
        const order: string[] = [];
        for (const e of expenses) {
            if (!counts.has(e.category)) order.push(e.category);
            counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
        }
        return order.sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
    }, [expenses]);

    useEffect(() => {
        if (expenses.length > 0 || typeof window === 'undefined') saveExpenses(expenses);
    }, [expenses]);

    useEffect(() => {
        saveView(view);
    }, [view]);

    useEffect(() => {
        saveSettings(settings);
    }, [settings]);

    function changeView(v: ViewTab) {
        setView(v);
    }

    function openAdd() {
        setEditingExpense(null);
        setDialogOpen(true);
    }

    function openEdit(exp: Expense) {
        setEditingExpense(exp);
        setDialogOpen(true);
    }

    function deleteExpense(id: string) {
        const target = expenses.find((e) => e.id === id);
        if (!target) return;
        if (!window.confirm(`确定删除「${target.name}」吗？`)) return;
        setExpenses((prev) => prev.filter((e) => e.id !== id));
        toast({ title: '已删除' });
    }

    function saveExpense(input: Omit<Expense, 'id'> & { id?: string }) {
        if (editingExpense) {
            setExpenses((prev) =>
                prev.map((e) => (e.id === editingExpense.id ? { ...input, id: editingExpense.id } : e))
            );
            toast({ title: '已保存' });
        } else {
            const exp: Expense = { ...input, id: genId() };
            setExpenses((prev) => [...prev, exp]);
            toast({ title: '已添加' });
        }
        setDialogOpen(false);
    }

    function exportJson() {
        if (expenses.length === 0) {
            toast({ title: '暂无数据可导出' });
            return;
        }
        const blob = new Blob([JSON.stringify(expenses, null, 2)], {
            type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const date = new Date();
        const stamp = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
        a.href = url;
        a.download = `expenses-${stamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: '已导出' });
    }

    function importJson(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result as string);
                if (!Array.isArray(parsed)) throw new Error('JSON 格式错误：应为数组');
                const valid = parsed.filter(isValidExpense);
                if (valid.length === 0) throw new Error('没有合法的支出项');
                if (
                    expenses.length > 0 &&
                    !window.confirm(
                        `即将导入 ${valid.length} 笔支出，覆盖当前 ${expenses.length} 笔。确定继续？`
                    )
                ) {
                    return;
                }
                setExpenses(valid);
                toast({ title: `已导入 ${valid.length} 笔` });
            } catch (err) {
                toast({ title: '导入失败', description: (err as Error).message });
            }
        };
        reader.readAsText(file);
        // 重置 input，允许同名文件再次导入
        e.target.value = '';
    }

    if (!hydrated) {
        return (
            <main className="min-h-screen flex flex-col">
                <div className="main pt-32 pb-16" />
            </main>
        );
    }

    return (
        <main className="min-h-screen flex flex-col">
            <div className="main pt-32 pb-16">
                {/* 顶栏 */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <Wallet className="h-8 w-8 text-primary" />
                        <div>
                            <h1 className="text-4xl font-bold">固定支出管理</h1>
                            <p className="text-sm text-muted-foreground">
                                记录每月固定支出，日历 / 列表 / 汇总视图，本地存储
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button onClick={openAdd}>
                            <Plus className="h-4 w-4 mr-1" /> 添加支出
                        </Button>
                        <Button variant="outline" onClick={() => setSettingsOpen(true)}>
                            <Coins className="h-4 w-4 mr-1" /> 发薪日
                            {settings.paydays.length > 0 && (
                                <span className="ml-1.5 inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                                    {settings.paydays.length}
                                </span>
                            )}
                        </Button>
                        <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-1" /> 导入
                        </Button>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="application/json"
                            className="hidden"
                            onChange={importJson}
                        />
                        <Button variant="outline" onClick={exportJson}>
                            <Download className="h-4 w-4 mr-1" /> 导出
                        </Button>
                    </div>
                </div>

                {/* Tab */}
                <div className="flex flex-wrap gap-2 mb-4 border-b border-border">
                    {(
                        [
                            { key: 'calendar', label: '日历', Icon: CalendarDays },
                            { key: 'list', label: '列表(30天)', Icon: List },
                            { key: 'summary', label: '汇总(12月)', Icon: BarChart3 },
                            { key: 'all', label: '全部支出', Icon: FolderOpen },
                        ] as { key: ViewTab; label: string; Icon: React.ComponentType<{ className?: string }> }[]
                    ).map((t) => (
                        <button
                            key={t.key}
                            onClick={() => changeView(t.key)}
                            className={cn(
                                'px-4 py-2 text-sm transition-colors border-b-2 -mb-px inline-flex items-center gap-1.5',
                                view === t.key
                                    ? 'border-primary text-foreground font-medium'
                                    : 'border-transparent text-muted-foreground hover:text-foreground'
                            )}
                        >
                            <t.Icon className="h-4 w-4" />
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* 月份切换器（日历 / 汇总视图需要） */}
                {(view === 'calendar' || view === 'summary') && (
                    <div className="flex items-center gap-3 mb-4">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentYm((v) => addMonths(v, -1))}
                            disabled={!hydrated}
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold min-w-[120px] text-center">
                            {hydrated ? formatYM(currentYm) : '----年--月'}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setCurrentYm((v) => addMonths(v, 1))}
                            disabled={!hydrated}
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setCurrentYm(todayYm())}
                            disabled={!hydrated}
                        >
                            今天
                        </Button>
                    </div>
                )}

                {/* 主区域 */}
                <div>
                    {hydrated && view === 'calendar' && (
                        <CalendarView
                            ym={currentYm}
                            expenses={expenses}
                            paydays={settings.paydays}
                            onCellClick={(ymd, items) => setDayDetail({ ymd, items })}
                        />
                    )}
                    {hydrated && view === 'list' && <List30View expenses={expenses} paydays={settings.paydays} />}
                    {hydrated && view === 'summary' && <SummaryView baseYm={currentYm} expenses={expenses} paydays={settings.paydays} />}
                    {hydrated && view === 'all' && (
                        <AllExpensesView
                            expenses={expenses}
                            onEdit={openEdit}
                            onDelete={deleteExpense}
                        />
                    )}
                </div>

                {/* 底部统计 */}
                {hydrated && <FooterStats expenses={expenses} paydays={settings.paydays} />}
            </div>

            {/* 添加 / 编辑弹窗 */}
            <ExpenseDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                editing={editingExpense}
                onSave={saveExpense}
                existingCategories={existingCategories}
                paydays={settings.paydays}
            />

            {/* 日期详情弹窗 */}
            <DayDetailDialog
                detail={dayDetail}
                onClose={() => setDayDetail(null)}
            />

            {/* 发薪日设置弹窗 */}
            <SettingsDialog
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
                settings={settings}
                onChange={setSettings}
            />
        </main>
    );
};

// ============ 日历视图 ============

function CalendarView({
    ym,
    expenses,
    paydays,
    onCellClick,
}: {
    ym: string;
    expenses: Expense[];
    paydays: number[];
    onCellClick: (ymd: string, items: Expense[]) => void;
}) {
    const firstDate = ymToDate(ym);
    const totalDays = daysInMonth(ym);
    const firstWeekday = firstDate.getDay(); // 0=日

    const cells: { ymd: string; inMonth: boolean }[] = [];
    // 上月填充
    for (let i = firstWeekday - 1; i >= 0; i--) {
        const d = new Date(firstDate);
        d.setDate(d.getDate() - (i + 1));
        cells.push({ ymd: formatYMD(d), inMonth: false });
    }
    // 当月
    for (let day = 1; day <= totalDays; day++) {
        const d = new Date(parseInt(ym.split('-')[0]), parseInt(ym.split('-')[1]) - 1, day);
        cells.push({ ymd: formatYMD(d), inMonth: true });
    }
    // 下月填充到 6 行 = 42 格
    while (cells.length < 42) {
        const last = cells[cells.length - 1];
        const [ly, lm, ld] = last.ymd.split('-').map(Number);
        const d = new Date(ly, lm - 1, ld + 1);
        cells.push({ ymd: formatYMD(d), inMonth: false });
    }

    // 把 expenses 按发生日（年月日）聚合
    const itemsByYmd = useMemo(() => {
        const map = new Map<string, Expense[]>();
        for (const cell of cells) {
            const [y, m] = cell.ymd.split('-');
            const cellYm = `${y}-${m}`;
            const day = parseInt(cell.ymd.split('-')[2], 10);
            const items = expenses.filter((e) => {
                if (!shouldOccurInMonth(e, cellYm)) return false;
                const chargeDay = actualChargeDay(e, cellYm, paydays);
                return chargeDay === day;
            });
            map.set(cell.ymd, items);
        }
        return map;
    }, [cells, expenses, paydays]);

    const today = todayYmd();

    return (
        <div className="rounded-lg border border-border overflow-hidden">
            <div className="grid grid-cols-7 bg-muted/40 text-xs text-muted-foreground">
                {['日', '一', '二', '三', '四', '五', '六'].map((w) => (
                    <div key={w} className="px-2 py-2 text-center font-medium">
                        {w}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-7">
                {cells.map((cell, idx) => {
                    const items = itemsByYmd.get(cell.ymd) ?? [];
                    const dayNum = parseInt(cell.ymd.split('-')[2], 10);
                    const dayTotal = items.reduce((s, e) => s + e.amount, 0);
                    const isToday = cell.ymd === today;
                    const isPay = cell.inMonth && isPayday(cell.ymd, paydays);
                    const visible = items.slice(0, 6);
                    const overflow = items.length - visible.length;
                    const overflowTotal = items.slice(6).reduce((s, e) => s + e.amount, 0);
                    return (
                        <div
                            key={idx}
                            className={cn(
                                'min-h-[110px] border-t border-l border-border p-1.5 flex flex-col gap-1 cursor-pointer hover:bg-accent/30 transition-colors',
                                idx % 7 === 6 && 'border-r',
                                !cell.inMonth && 'bg-muted/20 text-muted-foreground',
                                isPay && 'bg-emerald-100 dark:bg-emerald-500/25 ring-2 ring-emerald-500 dark:ring-emerald-400',
                                idx >= 35 && 'border-b'
                            )}
                            onClick={() => items.length > 0 && onCellClick(cell.ymd, items)}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={cn(
                                        'text-sm font-medium inline-flex items-center gap-1',
                                        isToday &&
                                            'inline-flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white',
                                        isPay && !isToday && 'text-emerald-800 dark:text-emerald-300 font-bold'
                                    )}
                                >
                                    {dayNum}
                                    {isPay && (
                                        <Coins
                                            className="h-3 w-3 text-emerald-700 dark:text-emerald-200"
                                            aria-label="发薪日"
                                        />
                                    )}
                                </span>
                                {items.length > 0 && (
                                    <span
                                        className={cn(
                                            'text-xs font-semibold text-muted-foreground',
                                            isPay && 'text-emerald-800 dark:text-emerald-300'
                                        )}
                                    >
                                        {formatAmount(dayTotal)}
                                    </span>
                                )}
                            </div>
                            <div className="flex-1 flex flex-col gap-0.5 text-xs overflow-hidden">
                                {visible.map((e) => {
                                    const c = colorOf(e.category);
                                    return (
                                        <div
                                            key={e.id}
                                            className={cn(
                                                'flex items-center gap-1 px-1 rounded truncate',
                                                c.bg,
                                                c.text
                                            )}
                                            title={`${e.name} · ${formatAmount(e.amount)}`}
                                        >
                                            <span className={cn('h-1.5 w-1.5 rounded-full flex-shrink-0', c.dot)} />
                                            <span className="truncate">{e.name}</span>
                                            <span className="ml-auto tabular-nums hidden sm:inline">
                                                {Math.round(e.amount).toLocaleString('zh-CN')}
                                            </span>
                                        </div>
                                    );
                                })}
                                {overflow > 0 && (
                                    <button
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            onCellClick(cell.ymd, items);
                                        }}
                                        className="text-blue-600 dark:text-blue-400 text-xs px-1 text-left hover:underline"
                                    >
                                        +{overflow} 更多 · {formatAmount(overflowTotal)}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

// ============ 30 天列表 ============

function List30View({ expenses, paydays }: { expenses: Expense[]; paydays: number[] }) {
    const today = new Date();
    const days: { ymd: string; date: Date }[] = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
        days.push({ ymd: formatYMD(d), date: d });
    }

    const grouped = useMemo(() => {
        const map = new Map<string, Expense[]>();
        for (const day of days) {
            const [y, m] = day.ymd.split('-');
            const cellYm = `${y}-${m}`;
            const dayNum = parseInt(day.ymd.split('-')[2], 10);
            const items = expenses.filter((e) => {
                if (!shouldOccurInMonth(e, cellYm)) return false;
                const chargeDay = actualChargeDay(e, cellYm, paydays);
                return chargeDay === dayNum;
            });
            map.set(day.ymd, items);
        }
        return map;
    }, [days, expenses, paydays]);

    const totalAmount = Array.from(grouped.values())
        .flat()
        .reduce((s, e) => s + e.amount, 0);
    const totalCount = Array.from(grouped.values()).reduce((s, arr) => s + arr.length, 0);

    if (totalCount === 0) {
        return (
            <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
                未来 30 天内暂无支出
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
                未来 30 天合计：<span className="font-semibold text-foreground">{formatAmount(totalAmount)}</span>
                <span className="ml-2">（{totalCount} 笔）</span>
            </div>
            {days.map((d) => {
                const items = grouped.get(d.ymd) ?? [];
                if (items.length === 0) return null;
                const dayTotal = items.reduce((s, e) => s + e.amount, 0);
                const isPay = isPayday(d.ymd, paydays);
                return (
                    <div
                        key={d.ymd}
                        className={cn(
                            'rounded-lg border bg-card overflow-hidden',
                            isPay
                                ? 'border-emerald-400 dark:border-emerald-700'
                                : 'border-border'
                        )}
                    >
                        <div
                            className={cn(
                                'flex items-center justify-between px-4 py-2 border-b',
                                isPay
                                    ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800'
                                    : 'bg-muted/30 border-border'
                            )}
                        >
                            <div className="font-medium inline-flex items-center gap-1.5">
                                {d.ymd} <span className="text-muted-foreground text-sm">周{weekdayZh(d.date)}</span>
                                {isPay && (
                                    <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-medium">
                                        <Coins className="h-3 w-3" /> 发薪日
                                    </span>
                                )}
                            </div>
                            <div className="text-sm">
                                <span className="font-semibold">{formatAmount(dayTotal)}</span>
                                <span className="text-muted-foreground ml-2">· {items.length} 笔</span>
                            </div>
                        </div>
                        <div className="divide-y divide-border">
                            {items.map((e) => {
                                const c = colorOf(e.category);
                                return (
                                    <div key={e.id} className="flex items-center gap-3 px-4 py-2">
                                        <span className={cn('h-2 w-2 rounded-full flex-shrink-0', c.dot)} />
                                        <span className="flex-1 truncate">
                                            {e.name}
                                            <span className="text-xs text-muted-foreground ml-2">
                                                {CYCLE_LABELS[e.cycle]}
                                                {e.linkedToPayday && (
                                                    <span className="ml-1 text-emerald-600 dark:text-emerald-400">
                                                        · 跟发薪日
                                                    </span>
                                                )}
                                            </span>
                                        </span>
                                        <span className="text-sm font-semibold tabular-nums">
                                            {formatAmount(e.amount)}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ============ 12 月汇总 ============

function SummaryView({ baseYm, expenses, paydays }: { baseYm: string; expenses: Expense[]; paydays: number[] }) {
    const months: string[] = [];
    for (let i = 0; i < 12; i++) months.push(addMonths(baseYm, i));
    const baseMonthIdx = months.indexOf(baseYm);

    // 收集所有出现过的分类（保持稳定顺序：先按出现次数倒序，再按首次出现的索引）
    const categoryList = useMemo(() => {
        const counts = new Map<string, number>();
        const order: string[] = [];
        for (const e of expenses) {
            if (!counts.has(e.category)) order.push(e.category);
            counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
        }
        return order.sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
    }, [expenses]);

    // category -> month -> amount
    const matrix = useMemo(() => {
        const m: Record<string, Record<string, number>> = {};
        for (const c of categoryList) {
            m[c] = {};
            for (const mo of months) m[c][mo] = 0;
        }
        for (const e of expenses) {
            for (const mo of months) {
                if (willChargeInMonth(e, mo, paydays)) {
                    m[e.category][mo] += e.amount;
                }
            }
        }
        return m;
    }, [expenses, months, categoryList, paydays]);

    const monthTotals = useMemo(() => {
        const t: Record<string, number> = {};
        for (const mo of months) {
            t[mo] = categoryList.reduce((s, c) => s + (matrix[c][mo] || 0), 0);
        }
        return t;
    }, [matrix, months, categoryList]);

    const yearTotal = months.reduce((s, mo) => s + (monthTotals[mo] || 0), 0);

    return (
        <div className="rounded-lg border border-border overflow-x-auto">
            <table className="w-full text-sm min-w-[800px]">
                <thead className="bg-muted/40">
                    <tr>
                        <th className="px-3 py-2 text-left font-medium sticky left-0 bg-muted/40 z-10">
                            分类
                        </th>
                        {months.map((mo, i) => (
                            <th
                                key={mo}
                                className={cn(
                                    'px-3 py-2 text-right font-medium',
                                    i === baseMonthIdx && 'bg-blue-50 dark:bg-blue-950/30'
                                )}
                            >
                                {parseInt(mo.split('-')[1], 10)}月
                            </th>
                        ))}
                        <th className="px-3 py-2 text-right font-medium">合计</th>
                    </tr>
                </thead>
                <tbody>
                    {categoryList.map((c) => {
                        const c2 = colorOf(c);
                        const rowTotal = months.reduce((s, mo) => s + (matrix[c][mo] || 0), 0);
                        return (
                            <tr key={c} className="border-t border-border">
                                <td className="px-3 py-2 sticky left-0 bg-card z-10">
                                    <span className="inline-flex items-center gap-2">
                                        <span className={cn('h-2 w-2 rounded-full', c2.dot)} />
                                        {c}
                                    </span>
                                </td>
                                {months.map((mo, i) => {
                                    const v = matrix[c][mo];
                                    return (
                                        <td
                                            key={mo}
                                            className={cn(
                                                'px-3 py-2 text-right tabular-nums',
                                                i === baseMonthIdx && 'bg-blue-50/50 dark:bg-blue-950/20'
                                            )}
                                        >
                                            {v === 0 ? (
                                                <span className="text-muted-foreground">-</span>
                                            ) : (
                                                Math.round(v).toLocaleString('zh-CN')
                                            )}
                                        </td>
                                    );
                                })}
                                <td className="px-3 py-2 text-right tabular-nums font-semibold">
                                    {Math.round(rowTotal).toLocaleString('zh-CN')}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
                <tfoot>
                    <tr className="border-t-2 border-border bg-muted/20">
                        <td className="px-3 py-2 font-semibold sticky left-0 bg-muted/20 z-10">
                            合计
                        </td>
                        {months.map((mo, i) => (
                            <td
                                key={mo}
                                className={cn(
                                    'px-3 py-2 text-right tabular-nums font-semibold',
                                    i === baseMonthIdx && 'bg-blue-100/50 dark:bg-blue-950/30'
                                )}
                            >
                                {Math.round(monthTotals[mo] || 0).toLocaleString('zh-CN')}
                            </td>
                        ))}
                        <td className="px-3 py-2 text-right tabular-nums font-bold">
                            {Math.round(yearTotal).toLocaleString('zh-CN')}
                        </td>
                    </tr>
                </tfoot>
            </table>
            <div className="px-3 py-2 text-xs text-muted-foreground border-t border-border">
                12 个月累计：{formatAmount(yearTotal)}
            </div>
        </div>
    );
}

// ============ 全部支出 ============

function AllExpensesView({
    expenses,
    onEdit,
    onDelete,
}: {
    expenses: Expense[];
    onEdit: (e: Expense) => void;
    onDelete: (id: string) => void;
}) {
    const sorted = useMemo(() => {
        return [...expenses].sort((a, b) => {
            const c1 = compareYm(a.startMonth, b.startMonth);
            if (c1 !== 0) return c1;
            return a.dayOfMonth - b.dayOfMonth;
        });
    }, [expenses]);

    if (sorted.length === 0) {
        return (
            <div className="rounded-lg border border-border bg-card p-12 text-center text-muted-foreground">
                暂无支出，点击右上添加支出按钮开始记录
            </div>
        );
    }

    return (
        <div className="rounded-lg border border-border overflow-x-auto">
            <table className="w-full text-sm min-w-[700px]">
                <thead className="bg-muted/40">
                    <tr>
                        <th className="px-3 py-2 text-left font-medium">名称</th>
                        <th className="px-3 py-2 text-left font-medium">分类</th>
                        <th className="px-3 py-2 text-right font-medium">金额</th>
                        <th className="px-3 py-2 text-center font-medium">扣款日</th>
                        <th className="px-3 py-2 text-left font-medium">周期</th>
                        <th className="px-3 py-2 text-left font-medium">起始月</th>
                        <th className="px-3 py-2 text-right font-medium">持续</th>
                        <th className="px-3 py-2 text-left font-medium">结束月</th>
                        <th className="px-3 py-2 text-right font-medium">操作</th>
                    </tr>
                </thead>
                <tbody>
                    {sorted.map((e) => {
                        const c = colorOf(e.category);
                        return (
                            <tr key={e.id} className="border-t border-border hover:bg-muted/20">
                                <td className="px-3 py-2 font-medium">{e.name}</td>
                                <td className="px-3 py-2">
                                    <span className="inline-flex items-center gap-1.5">
                                        <span className={cn('h-2 w-2 rounded-full', c.dot)} />
                                        {e.category}
                                    </span>
                                </td>
                                <td className="px-3 py-2 text-right tabular-nums font-semibold">
                                    {formatAmount(e.amount)}
                                </td>
                                <td className="px-3 py-2 text-center">
                                    {e.dayOfMonth} 号
                                    {e.linkedToPayday && (
                                        <span
                                            className="ml-1 inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs"
                                            title={`跟随发薪日，偏移 ${e.paydayOffset ?? 0} 天`}
                                        >
                                            跟薪
                                        </span>
                                    )}
                                </td>
                                <td className="px-3 py-2">{CYCLE_LABELS[e.cycle]}</td>
                                <td className="px-3 py-2">{e.startMonth}</td>
                                <td className="px-3 py-2 text-right tabular-nums">{e.durationMonths}</td>
                                <td className="px-3 py-2">{endMonthOf(e)}</td>
                                <td className="px-3 py-2">
                                    <div className="flex justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onEdit(e)}
                                            title="编辑"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => onDelete(e.id)}
                                            title="删除"
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

// ============ 底部统计 ============

function FooterStats({ expenses, paydays }: { expenses: Expense[]; paydays: number[] }) {
    const ym = todayYm();
    const ymThisYear = ym.slice(0, 4);
    let monthTotal = 0;
    let monthCount = 0;
    for (const e of expenses) {
        if (willChargeInMonth(e, ym, paydays)) {
            monthTotal += e.amount;
            monthCount += 1;
        }
    }

    // 本年累计：未来 12 个月内每月汇总（从本月起）
    let yearTotal = 0;
    for (let i = 0; i < 12; i++) {
        const mo = addMonths(ym, i);
        yearTotal += expenses
            .filter((e) => willChargeInMonth(e, mo, paydays))
            .reduce((s, e) => s + e.amount, 0);
    }

    // 本年（自然年）已发生的累计：1 月到现在
    const [yNum] = ym.split('-');
    let calendarYearTotal = 0;
    for (let m = 1; m <= parseInt(ym.split('-')[1], 10); m++) {
        const mo = `${yNum}-${String(m).padStart(2, '0')}`;
        calendarYearTotal += expenses
            .filter((e) => willChargeInMonth(e, mo, paydays))
            .reduce((s, e) => s + e.amount, 0);
    }

    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 text-sm">
            <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-muted-foreground mb-1">本月合计</div>
                <div className="text-xl font-bold">
                    {formatAmount(monthTotal)}{' '}
                    <span className="text-sm font-normal text-muted-foreground">({monthCount} 笔)</span>
                </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-muted-foreground mb-1">本年累计（自然年）</div>
                <div className="text-xl font-bold">{formatAmount(calendarYearTotal)}</div>
            </div>
            <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-muted-foreground mb-1">未来 12 个月累计</div>
                <div className="text-xl font-bold">{formatAmount(yearTotal)}</div>
            </div>
            <NextPaydayCard expenses={expenses} paydays={paydays} />
        </div>
    );
}

// ============ 下一个发薪日卡片 ============

function NextPaydayCard({ expenses, paydays }: { expenses: Expense[]; paydays: number[] }) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 找下一个发薪日：从今天起到未来 60 天内最近的一个
    let nextYmd: string | null = null;
    let daysUntil = Infinity;
    if (paydays.length > 0) {
        for (let i = 0; i < 60; i++) {
            const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
            const ymd = formatYMD(d);
            if (isPayday(ymd, paydays)) {
                nextYmd = ymd;
                daysUntil = i;
                break;
            }
        }
    }

    if (!nextYmd) {
        return (
            <div className="rounded-lg border border-border bg-card p-4">
                <div className="text-muted-foreground mb-1">距离下一个发薪日</div>
                <div className="text-xl font-bold text-muted-foreground">未设置</div>
                <div className="text-xs text-muted-foreground mt-1">在顶部"发薪日"中配置 1-31 号</div>
            </div>
        );
    }

    // 统计 [今天, nextYmd) 区间内的支出卡片
    const todayStr = formatYMD(today);
    const [tY, tM] = [parseInt(todayStr.slice(0, 4), 10), parseInt(todayStr.slice(5, 7), 10)];
    const [nY, nM] = nextYmd.split('-').map(Number);
    const charges: { exp: Expense; chargeYmd: string }[] = [];
    let cy = tY;
    let cm = tM;
    while (true) {
        const cellYm = `${cy}-${String(cm).padStart(2, '0')}`;
        for (const e of expenses) {
            if (!shouldOccurInMonth(e, cellYm)) continue;
            const chargeDay = actualChargeDay(e, cellYm, paydays);
            if (chargeDay === null) continue;
            const chargeYmd = `${cellYm}-${String(chargeDay).padStart(2, '0')}`;
            if (chargeYmd >= todayStr && chargeYmd < nextYmd) {
                charges.push({ exp: e, chargeYmd });
            }
        }
        if (cy === nY && cm === nM) break;
        cm += 1;
        if (cm > 12) {
            cm = 1;
            cy += 1;
        }
    }
    const upcomingCount = new Set(charges.map((c) => c.exp.id)).size;
    const upcomingTotal = charges.reduce((s, c) => s + c.exp.amount, 0);

    const dayLabel = daysUntil === 0 ? '就是今天' : `还有 ${daysUntil} 天`;

    return (
        <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/70 dark:border-emerald-500/60 bg-gradient-to-br from-emerald-50 to-emerald-100/70 dark:from-emerald-950 dark:via-emerald-900/80 dark:to-emerald-950 p-4 shadow-sm dark:shadow-[0_0_0_1px_rgba(16,185,129,0.15),0_8px_24px_-8px_rgba(16,185,129,0.25)]">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/10 dark:bg-emerald-400/10 blur-2xl pointer-events-none" />
            <div className="relative">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-emerald-700 dark:text-emerald-300 font-medium text-sm">距离下一个发薪日</span>
                    <Coins className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-100 tabular-nums tracking-tight">{dayLabel}</div>
                <div className="text-xs text-emerald-700/80 dark:text-emerald-300/80 mt-1">
                    {nextYmd} 周{weekdayZh(new Date(nextYmd))}
                </div>
                <div className="mt-3 pt-3 border-t border-emerald-300/60 dark:border-emerald-400/20">
                    <div className="text-xs text-emerald-700/80 dark:text-emerald-300/80">发薪前需支出</div>
                    <div className="text-base font-semibold tabular-nums text-emerald-900 dark:text-white">
                        {upcomingCount} 张卡片 · {formatAmount(upcomingTotal)}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ============ 添加/编辑弹窗 ============

function ExpenseDialog({
    open,
    onOpenChange,
    editing,
    onSave,
    existingCategories,
    paydays,
}: {
    open: boolean;
    onOpenChange: (b: boolean) => void;
    editing: Expense | null;
    onSave: (e: Omit<Expense, 'id'> & { id?: string }) => void;
    existingCategories: string[];
    paydays: number[];
}) {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState<string>('');
    const [customCategory, setCustomCategory] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState('1');
    const [cycle, setCycle] = useState<Cycle>('monthly');
    const [startMonth, setStartMonth] = useState('');
    const [durationMonths, setDurationMonths] = useState('12');
    const [note, setNote] = useState('');
    const [linkedToPayday, setLinkedToPayday] = useState(false);
    const [paydayOffset, setPaydayOffset] = useState('0');

    useEffect(() => {
        setStartMonth((prev) => prev || todayYm());
    }, []);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            if (editing) {
                setName(editing.name);
                setAmount(String(editing.amount));
                const isExisting = existingCategories.includes(editing.category);
                setCategory(isExisting ? editing.category : '__custom__');
                setCustomCategory(isExisting ? '' : editing.category);
                setDayOfMonth(String(editing.dayOfMonth));
                setCycle(editing.cycle);
                setStartMonth(editing.startMonth);
                setDurationMonths(String(editing.durationMonths));
                setNote(editing.note);
                setLinkedToPayday(!!editing.linkedToPayday);
                setPaydayOffset(String(editing.paydayOffset ?? 0));
            } else {
                setName('');
                setAmount('');
                setCategory(existingCategories[0] ?? '__custom__');
                setCustomCategory('');
                setDayOfMonth('1');
                setCycle('monthly');
                setStartMonth(todayYm());
                setDurationMonths('12');
                setNote('');
                setLinkedToPayday(false);
                setPaydayOffset('0');
            }
            setError(null);
        }
    }, [open, editing, existingCategories]);

    function handleSave() {
        const finalCategory = category === '__custom__' ? customCategory.trim() : category;
        if (!name.trim()) return setError('请输入名称');
        const amountNum = parseFloat(amount);
        if (!isFinite(amountNum) || amountNum <= 0) return setError('请输入大于 0 的金额');
        if (!finalCategory) return setError('请选择或输入分类');
        const dayNum = parseInt(dayOfMonth, 10);
        if (!isFinite(dayNum) || dayNum < 1 || dayNum > 31) return setError('扣款日必须在 1-31 之间');
        if (!/^\d{4}-\d{2}$/.test(startMonth)) return setError('起始月格式错误（YYYY-MM）');
        const durNum = parseInt(durationMonths, 10);
        if (!isFinite(durNum) || durNum < 1) return setError('持续月数必须 ≥ 1');

        const offsetNum = parseInt(paydayOffset, 10);
        const usePayday = linkedToPayday && paydays.length > 0;
        if (linkedToPayday && paydays.length === 0) {
            return setError('请先在"发薪日设置"中配置发薪日');
        }
        if (usePayday && (!isFinite(offsetNum))) {
            return setError('发薪日偏移必须是整数');
        }

        onSave({
            name: name.trim(),
            amount: amountNum,
            category: finalCategory,
            dayOfMonth: dayNum,
            cycle,
            startMonth,
            durationMonths: durNum,
            note: note.trim(),
            linkedToPayday: usePayday ? true : undefined,
            paydayOffset: usePayday ? offsetNum : undefined,
        });
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{editing ? '编辑支出' : '添加支出'}</DialogTitle>
                    <DialogDescription>
                        配置周期（每月/每季/每半年/每年）+ 起始月 + 持续月数。
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                    <div className="grid gap-1.5">
                        <Label htmlFor="name">名称</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="如：房租" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-1.5">
                            <Label htmlFor="amount">金额（元）</Label>
                            <Input
                                id="amount"
                                type="number"
                                step="0.01"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="3500"
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="day">扣款日</Label>
                            <Input
                                id="day"
                                type="number"
                                min={1}
                                max={31}
                                value={dayOfMonth}
                                onChange={(e) => setDayOfMonth(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="category">分类</Label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            {existingCategories.length === 0 && (
                                <option value="__custom__">+ 新建分类...</option>
                            )}
                            {existingCategories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                            {existingCategories.length > 0 && (
                                <option value="__custom__">+ 新建分类...</option>
                            )}
                        </select>
                        {category === '__custom__' && (
                            <Input
                                value={customCategory}
                                onChange={(e) => setCustomCategory(e.target.value)}
                                placeholder="输入新分类名称"
                                className="mt-1.5"
                            />
                        )}
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="cycle">周期</Label>
                        <select
                            id="cycle"
                            value={cycle}
                            onChange={(e) => setCycle(e.target.value as Cycle)}
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            {(Object.keys(CYCLE_LABELS) as Cycle[]).map((k) => (
                                <option key={k} value={k}>
                                    {CYCLE_LABELS[k]}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="grid gap-1.5">
                            <Label htmlFor="startMonth">起始月</Label>
                            <Input
                                id="startMonth"
                                type="month"
                                value={startMonth}
                                onChange={(e) => setStartMonth(e.target.value)}
                            />
                        </div>
                        <div className="grid gap-1.5">
                            <Label htmlFor="duration">持续月数</Label>
                            <Input
                                id="duration"
                                type="number"
                                min={1}
                                value={durationMonths}
                                onChange={(e) => setDurationMonths(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="grid gap-1.5">
                        <Label htmlFor="note">备注</Label>
                        <Input
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="可选"
                        />
                    </div>

                    {/* 发薪日关联 */}
                    <div className="rounded-md border border-dashed border-border p-3 grid gap-2">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={linkedToPayday}
                                onChange={(e) => setLinkedToPayday(e.target.checked)}
                                disabled={paydays.length === 0}
                                className="h-4 w-4 rounded border-input"
                            />
                            <span>实际扣款日跟发薪日走</span>
                            {paydays.length === 0 && (
                                <span className="text-xs text-muted-foreground">
                                    （需先在顶部"发薪日"中设置）
                                </span>
                            )}
                            {paydays.length > 0 && (
                                <span className="text-xs text-muted-foreground">
                                    （发薪日：{paydays.join('、')} 号）
                                </span>
                            )}
                        </label>
                        {linkedToPayday && paydays.length > 0 && (
                            <div className="grid grid-cols-[auto_1fr] gap-2 items-center pl-6">
                                <Label htmlFor="paydayOffset" className="text-xs whitespace-nowrap">
                                    偏移天数
                                </Label>
                                <Input
                                    id="paydayOffset"
                                    type="number"
                                    step="1"
                                    value={paydayOffset}
                                    onChange={(e) => setPaydayOffset(e.target.value)}
                                    placeholder="0 = 发薪日当天；负数 = 发薪后扣款"
                                />
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-md border border-red-200 dark:border-red-900">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        取消
                    </Button>
                    <Button onClick={handleSave}>保存</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// ============ 发薪日设置弹窗 ============

function SettingsDialog({
    open,
    onOpenChange,
    settings,
    onChange,
}: {
    open: boolean;
    onOpenChange: (b: boolean) => void;
    settings: Settings;
    onChange: (s: Settings) => void;
}) {
    const { toast } = useToast();
    const [draft, setDraft] = useState<number[]>([]);
    const [input, setInput] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (open) {
            setDraft([...settings.paydays]);
            setInput('');
            setError(null);
        }
    }, [open, settings.paydays]);

    function addDay() {
        const n = parseInt(input, 10);
        if (!isFinite(n) || n < 1 || n > 31) {
            setError('请输入 1-31 之间的整数');
            return;
        }
        if (draft.includes(n)) {
            setError(`${n} 号已在列表中`);
            return;
        }
        setDraft([...draft, n].sort((a, b) => a - b));
        setInput('');
        setError(null);
    }

    function removeDay(d: number) {
        setDraft(draft.filter((x) => x !== d));
    }

    function handleSave() {
        onChange({ paydays: draft });
        toast({ title: '发薪日已保存' });
        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>发薪日设置</DialogTitle>
                    <DialogDescription>
                        配置你每月的发薪日（日历会用特殊颜色高亮发薪日）。关联发薪日的支出，实际扣款日会随发薪日变化。
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3">
                    <div className="flex flex-wrap gap-1.5 min-h-[40px] p-2 rounded-md border border-border bg-muted/20">
                        {draft.length === 0 ? (
                            <span className="text-sm text-muted-foreground">尚未设置发薪日</span>
                        ) : (
                            draft.map((d) => (
                                <span
                                    key={d}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-sm"
                                >
                                    {d} 号
                                    <button
                                        type="button"
                                        onClick={() => removeDay(d)}
                                        className="hover:text-emerald-900 dark:hover:text-emerald-100"
                                        aria-label={`移除 ${d} 号`}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Input
                            type="number"
                            min={1}
                            max={31}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addDay();
                                }
                            }}
                            placeholder="输入 1-31 的发薪日"
                        />
                        <Button type="button" variant="outline" onClick={addDay}>
                            添加
                        </Button>
                    </div>
                    {error && (
                        <div className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-3 py-2 rounded-md border border-red-200 dark:border-red-900">
                            {error}
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        取消
                    </Button>
                    <Button onClick={handleSave}>保存</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// ============ 日期详情弹窗 ============

function DayDetailDialog({
    detail,
    onClose,
}: {
    detail: { ymd: string; items: Expense[] } | null;
    onClose: () => void;
}) {
    const open = !!detail;
    const total = detail?.items.reduce((s, e) => s + e.amount, 0) ?? 0;
    return (
        <Dialog open={open} onOpenChange={(b) => !b && onClose()}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>{detail?.ymd}</DialogTitle>
                    <DialogDescription>
                        共 {detail?.items.length ?? 0} 笔 · {formatAmount(total)}
                    </DialogDescription>
                </DialogHeader>
                {detail && (
                    <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                        {detail.items.map((e) => {
                            const c = colorOf(e.category);
                            return (
                                <div
                                    key={e.id}
                                    className="flex items-center gap-3 px-3 py-2 rounded-md bg-muted/30"
                                >
                                    <span className={cn('h-2.5 w-2.5 rounded-full flex-shrink-0', c.dot)} />
                                    <div className="flex-1 min-w-0">
                                        <div className="font-medium truncate">{e.name}</div>
                                        <div className="text-xs text-muted-foreground">
                                            {e.category} · {CYCLE_LABELS[e.cycle]} · {e.startMonth} 起 ·{' '}
                                            {e.durationMonths} 个月
                                        </div>
                                    </div>
                                    <div className="font-semibold tabular-nums">{formatAmount(e.amount)}</div>
                                </div>
                            );
                        })}
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>
                        关闭
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ExpenseTrackerPage;
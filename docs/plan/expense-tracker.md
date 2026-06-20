# 固定支出管理工具 - 设计文档

## 背景与目标

**问题**：用户每月有 30+ 笔固定支出（房租、订阅、车险、网费等），记不清哪天扣、有效期是几月到几月、当月总额多少。

**目标**：用单个 Next.js 客户端页面提供日历/列表/汇总/全部支出四个视图，本地 localStorage 持久化，无需后端。

**成功标准**：

- 添加/编辑/删除一笔支出后立即在日历、列表、汇总视图同步
- 周期（每月/每季/每半年/每年）+ 持续月数 + 起始月模型能正确表达"3/15 起持续 6 个月"
- 30+ 笔支出在日历视图不挤压/遮挡
- 关闭页面再打开数据仍在
- 可导出/导入 JSON

## 高层设计

**模块**（单文件 page.tsx）：

- 类型与常量（Expense、Cycle、Category）
- 纯算法函数（addMonths、isActiveInMonth、shouldOccurInMonth、ymToDate、formatYMD 等）
- localStorage 读写
- 4 个视图组件（CalendarView、List30View、SummaryView、AllExpensesView）
- CRUD 弹窗（ExpenseDialog）和日期详情弹窗（DayDetailDialog）
- 顶栏 + Tab 切换 + 月份切换器

**数据流**：

```
localStorage → state.expenses（数组）
  ↓
state.currentYm, state.view → render()
  ↓
useMemo 计算月度发生列表 → 4 个视图按需渲染
```

## 数据模型

```ts
interface Expense {
  id: string;                // Date.now() + Math.random()
  name: string;
  amount: number;            // 正数（元）
  category: string;          // 7 个预置 + 自定义
  dayOfMonth: number;        // 1-31
  cycle: 'monthly' | 'quarterly' | 'half-yearly' | 'yearly';
  startMonth: string;        // 'YYYY-MM'
  durationMonths: number;    // 1=仅当月
  note: string;
}
```

**localStorage 键**：`expense_tracker_v1`（数组 JSON）+ `expense_tracker_view`（视图偏好）

## 核心算法

```ts
addMonths(ym, n)              // YYYY-MM + n，正确处理跨年
endMonthOf(exp)               // = addMonths(startMonth, durationMonths - 1)
isActiveInMonth(exp, ym)      // ym ∈ [startMonth, endMonthOf(exp)]
shouldOccurInMonth(exp, ym)   // active && (cycle 匹配)
```

**周期匹配**：

- `monthly`：true
- `quarterly`：month % 3 === 1（即 1/4/7/10）
- `half-yearly`：month === 1 || month === 7
- `yearly`：month === startMonth.month

## 实现计划

### Stage 1：脚手架 + 数据层

- **文件**：`src/app/tools/expense-tracker/page.tsx`
- **内容**：组件骨架 + 类型 + 纯算法函数 + localStorage 读写 + 默认视图渲染（先做最简的"全部支出"列表）
- **验证**：添加 2 笔测试支出，刷新页面数据仍在

### Stage 2：日历视图

- **文件**：同 page.tsx
- **内容**：月份网格 + 单元格显示当日明细 + 月份切换器
- **关键点**：
  - 同周单元格 `min-height` 一致
  - 单格最多显示 6 条完整条目，超出折叠为 `+N 更多 · ¥金额`
  - 点击单元格打开日期详情弹窗
- **验证**：6 笔/天全可见；11 笔/天折叠为「+5 更多」

### Stage 3：列表（30 天）+ 汇总（12 月）视图

- **列表**：从今天起 30 天内按日期分组，每天显示明细
- **汇总**：分类 × 月份矩阵，行尾列尾汇总，当前月高亮
- **验证**：30 天范围内的支出都能在列表里找到；12 个月矩阵每月每分类正确

### Stage 4：CRUD + 弹窗

- 添加/编辑表单（名称、金额、分类、扣款日、周期、起始月、持续月数、备注）
- 删除确认（用 `confirm()` 简单实现）
- 分类支持自定义输入
- **验证**：增删改后各视图同步刷新

### Stage 5：导入/导出 JSON

- 导出：下载 `expenses-YYYYMMDD.json`
- 导入：选择 JSON 文件 → 解析 → 覆盖当前数据
- **验证**：导出后清空再导入数据完全恢复

## UI 设计

```
┌─────────────────────────────────────────────┐
│ 💰 固定支出管理    [+添加][导入][导出]      │
├─────────────────────────────────────────────┤
│ [📅日历][📋列表][📊汇总][🗂️全部]            │
├─────────────────────────────────────────────┤
│ ◀  2026 年 6 月  ▶         [今天]           │
├─────────────────────────────────────────────┤
│ 一  二  三  四  五  六  日                    │
│  1   2   3   4   5   6   7                  │
│  ↓ 单元格 (色点+名称+金额，超过 6 折叠)       │
├─────────────────────────────────────────────┤
│ 本月合计 ¥14,590 (19 笔) │ 本年累计 ¥122,630 │
└─────────────────────────────────────────────┘
```

**配色**（分类色点 + 浅背景）：

| 分类 | 背景 | 色点 |
|---|---|---|
| 住房 | blue-100 | blue-600 |
| 交通 | emerald-100 | emerald-600 |
| 通讯 | amber-100 | amber-600 |
| 订阅 | pink-100 | pink-600 |
| 保险 | indigo-100 | indigo-600 |
| 教育 | orange-100 | orange-600 |
| 其他 | gray-100 | gray-500 |

## 测试策略

**手动验证清单**（DoD）：

- [ ] 添加一笔"房租 3500 元，5 号，每月，2026-06 起持续 12 个月"，日历 6/7/8/9/10/11/12/1/2/3/4/5 各月 5 号可见
- [ ] 添加一笔"采暖费 800 元，15 号，每月，2026-10 起持续 6 个月"，10/11/12/1/2/3 每月 15 号可见，4 月起消失
- [ ] 添加一笔"年费 4500 元，3 号，每年，2026-03 起持续 60 月"，每年 3 月可见，其它月份无
- [ ] 列表视图只显示未来 30 天支出
- [ ] 汇总视图 12 个月×分类矩阵正确
- [ ] 编辑/删除后日历、列表、汇总同步
- [ ] 导出 JSON、清空、导入 → 数据完全恢复
- [ ] 刷新页面数据仍在

## 风险与缓解

| 风险 | 缓解 |
|---|---|
| dayOfMonth=31 在 2 月没有 | 算法里检测该月天数 < dayOfMonth 则跳过该月 |
| 30+ 笔挤在某一天 | 单格最多 6 条 + `+N 更多` 折叠 + 点击展开详情弹窗 |
| 视图间状态不同步 | 单 state.expenses，所有视图 useMemo 派生 |
| localStorage 容量限制 | 单条 < 200 字节、30 条 ~6KB，远低于 5MB 上限 |
| 导入 JSON 损坏 | 解析失败弹错误提示，不覆盖现有数据 |
# IMPLEMENTATION PLAN

- [ ] Homepage redesign
  - [x] Homepage route rebuild and homepage-specific styling
  - [x] Project showcase scroll section refinement
  - [x] Skills container physics section
  - [ ] Validation and regression pass
  - See `docs/plan/homepage-redesign.md`

- [ ] Expense tracker tool (固定支出管理)
  - [x] Register tool entry in `src/data/tools/devTools.ts`
  - [x] Design doc at `docs/plan/expense-tracker.md`
  - [ ] Implement `src/app/tools/expense-tracker/page.tsx`
    - Data layer + core algorithms + localStorage
    - Calendar view (with overflow folding + day detail dialog)
    - 30-day list view
    - 12-month summary view
    - All-expenses CRUD view
    - Add/edit/delete dialog
    - Import/export JSON
  - [ ] Browser verification with Chrome DevTools MCP
  - See `docs/plan/expense-tracker.md`

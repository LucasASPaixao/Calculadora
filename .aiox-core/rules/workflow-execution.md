
# Workflow Execution — Detailed Rules

## Task-First Principle

Workflows são compostos por tasks conectadas, não por agentes conectados. Cada task define seus inputs, outputs, pre/post-conditions e execution modes. Uma task validada é lei: deve ser executada conforme configurada.

## 4 Primary Workflows

### 1. Story Development Cycle (SDC) — PRIMARY

**Phase 1: Create (@sm)** — `create-next-story.md` → `{epicNum}.{storyNum}.story.md`
**Phase 2: Validate (@po)** — `validate-next-story.md` → GO (>=7/10) or NO-GO
**Phase 3: Implement (@dev)** — `dev-develop-story.md` → Interactive/YOLO/Pre-Flight modes
**Phase 4: QA Gate (@qa)** — `qa-gate.md` → PASS/CONCERNS/FAIL/WAIVED

### 2. QA Loop — ITERATIVE REVIEW

```
@qa review → verdict → @dev fixes → re-review (max 5)
```

Verdicts: APPROVE → Done | REJECT → @dev fixes | BLOCKED → Escalate immediately

Escalation triggers: `max_iterations_reached`, `verdict_blocked`, `fix_failure`, `manual_escalate`

### 3. Spec Pipeline — PRE-IMPLEMENTATION

| Phase | Agent | Output | Skip If |
|-------|-------|--------|---------|
| 1. Gather | @pm | `requirements.json` | Never |
| 2. Assess | @architect | `complexity.json` | source=simple |
| 3. Research | @analyst | `research.json` | SIMPLE class |
| 4. Write Spec | @pm | `spec.md` | Never |
| 5. Critique | @qa | `critique.json` | Never |
| 6. Plan | @architect | `implementation.yaml` | If APPROVED |

Complexity Classes: SIMPLE (≤8) → 3 phases | STANDARD (9-15) → 6 phases | COMPLEX (≥16) → 6 + revision

### 4. Brownfield Discovery — LEGACY ASSESSMENT

10-phase technical debt assessment:
- Phases 1-3: Data Collection (@architect, @data-engineer, @ux-design-expert)
- Phases 4-7: Draft & Validation (QA Gate: APPROVED | NEEDS WORK)
- Phases 8-10: Finalization → Executive report → Epic + stories

## Workflow Selection Guide

| Situation | Workflow |
|-----------|---------|
| New story from epic | Story Development Cycle |
| QA found issues, need iteration | QA Loop |
| Complex feature needs spec | Spec Pipeline → then SDC |
| Joining existing project | Brownfield Discovery |
| Simple bug fix | SDC only (YOLO mode) |

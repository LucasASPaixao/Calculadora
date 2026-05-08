
# Agent Authority — Detailed Rules

## Delegation Matrix

### @devops (Gage) — EXCLUSIVE Authority

| Operation | Exclusive? | Other Agents |
|-----------|-----------|--------------|
| `git push` / `git push --force` | YES | BLOCKED |
| `gh pr create` / `gh pr merge` | YES | BLOCKED |
| MCP add/remove/configure | YES | BLOCKED |
| CI/CD pipeline management | YES | BLOCKED |
| Release management | YES | BLOCKED |

### @pm (Morgan) — Epic Orchestration

| Operation | Exclusive? |
|-----------|-----------|
| `*execute-epic` / `*create-epic` | YES |
| EPIC-{ID}-EXECUTION.yaml management | YES |
| Requirements gathering & spec writing | YES |

### @po (Pax) — Story Validation

| Operation | Exclusive? |
|-----------|-----------|
| `*validate-story-draft` (10-point checklist) | YES |
| Story context tracking / backlog prioritization | YES |

### @sm (River) — Story Creation

| Operation | Exclusive? |
|-----------|-----------|
| `*draft` / `*create-story` | YES |

### @dev (Dex) — Implementation

| Allowed | Blocked |
|---------|---------|
| `git add`, `git commit`, `git status` | `git push` (delegate to @devops) |
| `git branch`, `git checkout`, `git merge` (local) | `gh pr create/merge` (delegate to @devops) |
| Story file updates (File List, checkboxes) | Story file updates (AC, scope, title) |

### @architect (Aria) — Design Authority

Owns: System architecture decisions, Technology selection, Integration patterns
Delegates: Detailed DDL → @data-engineer, Query optimization → @data-engineer

### @aiox-master — Framework Governance

Execute ANY task directly. Override agent boundaries when necessary for framework health.

## Cross-Agent Delegation Patterns

### Git Push Flow
```
ANY agent → @devops *push
```

### Story Flow
```
@sm *draft → @po *validate → @dev *develop → @qa *qa-gate → @devops *push
```

### Epic Flow
```
@pm *create-epic → @pm *execute-epic → @sm *draft (per story)
```

## Escalation Rules

1. Agent cannot complete task → Escalate to @aiox-master
2. Quality gate fails → Return to @dev with specific feedback
3. Constitutional violation detected → BLOCK, require fix before proceed
4. Agent boundary conflict → @aiox-master mediates

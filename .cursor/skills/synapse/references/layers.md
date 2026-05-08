# SYNAPSE 8-Layer Architecture Reference

## Overview

SYNAPSE processes rules through an **8-layer pipeline** applied in sequence. Each layer has a purpose, trigger, and priority. The reference orchestrator (`.aiox-core/core/synapse/engine.js`) chains all layers; in IDEs **without** that runtime, agents should still follow the **same order and priorities** when assembling context mentally.

## Layer Pipeline

```
L0 Constitution → L1 Global → L2 Agent → L3 Workflow → L4 Task → L5 Squad → L6 Keyword → L7 Star-Command
```

Layers apply in order. Higher specificity generally wins on conflicts (see below), except L0 which is never overridden.

## Layer Details

### L0: Constitution (NON-NEGOTIABLE)

| Property | Value |
|----------|-------|
| **Purpose** | Enforce inviolable framework principles (6 articles) |
| **Trigger** | Always active (`ALWAYS_ON=true`, `NON_NEGOTIABLE=true`) |
| **Priority** | Highest — cannot be overridden by any other layer |
| **Domain file** | `.synapse/constitution` (when using full runtime) |
| **Source** | Auto-generated from `.aiox-core/constitution.md` via `generate-constitution.js` |
| **Implementation** | `.aiox-core/core/synapse/layers/l0-constitution.js` |

**Articles:** CLI First, Agent Authority, Story-Driven Development, No Invention, Quality First, Absolute Imports.

### L1: Global + Context

| Property | Value |
|----------|-------|
| **Purpose** | Universal rules applied to all prompts + bracket-specific behavior |
| **Trigger** | Always active (`ALWAYS_ON=true`) |
| **Priority** | High — applies to every prompt regardless of context |
| **Domain files** | `.synapse/global`, `.synapse/context` (when using full runtime) |
| **Implementation** | `.aiox-core/core/synapse/layers/l1-global.js` |

**Content:** Coding standards, import rules, TypeScript rules, error handling patterns, bracket-specific context rules.

### L2: Agent-Scoped

| Property | Value |
|----------|-------|
| **Purpose** | Inject agent-specific rules when an agent is active |
| **Trigger** | Active agent ID matches session / user activation (e.g. `@dev`) |
| **Priority** | Medium-high — only when an agent is active |
| **Domain files** | `.synapse/agent-dev`, `.synapse/agent-qa`, `.synapse/agent-architect`, etc. (12 total) |
| **Implementation** | `.aiox-core/core/synapse/layers/l2-agent.js` |

**Agents covered:** dev, qa, architect, pm, po, sm, devops, analyst, data-engineer, ux (ux-design-expert), aiox-master, squad-creator.

### L3: Workflow-Scoped

| Property | Value |
|----------|-------|
| **Purpose** | Inject workflow-specific rules when a workflow is active |
| **Trigger** | Active workflow matches session state |
| **Priority** | Medium — during specific development workflows |
| **Domain files** | `.synapse/workflow-story-dev`, `.synapse/workflow-epic-create`, `.synapse/workflow-arch-review` |
| **Implementation** | `.aiox-core/core/synapse/layers/l3-workflow.js` |

### L4: Task Context

| Property | Value |
|----------|-------|
| **Purpose** | Inject context about the currently active task |
| **Trigger** | Active task detected in session or user-provided task context |
| **Priority** | Medium — during task execution |
| **Domain files** | Dynamic (from session context) |
| **Implementation** | `.aiox-core/core/synapse/layers/l4-task.js` |

### L5: Squad Discovery

| Property | Value |
|----------|-------|
| **Purpose** | Discover and inject rules from active squad domains |
| **Trigger** | Squad is active in session |
| **Priority** | Medium-low — only when working with squads |
| **Domain files** | Squad-specific domains (discovered at runtime) |
| **Implementation** | `.aiox-core/core/synapse/layers/l5-squad.js` |

### L6: Keyword (RECALL)

| Property | Value |
|----------|-------|
| **Purpose** | Activate domains when the user prompt contains matching keywords |
| **Trigger** | Keyword listed in a domain’s `RECALL` field (when manifest is used) |
| **Priority** | Low — optional; may be skipped when context is constrained |
| **Domain files** | Any domain with `RECALL` key in manifest |
| **Implementation** | `.aiox-core/core/synapse/layers/l6-keyword.js` |

### L7: Star-Command

| Property | Value |
|----------|-------|
| **Purpose** | Detect and apply mode-switching or explicit commands (`*brief`, `*dev`, project-defined `*synapse` subcommands, etc.) |
| **Trigger** | User types `*command` in the prompt |
| **Priority** | Highest for explicit commands — user intent is paramount |
| **Domain file** | `.synapse/commands` (when using full runtime) |
| **Implementation** | `.aiox-core/core/synapse/layers/l7-star-command.js` |

## Pipeline execution (two modes)

### A — Reference engine (when wired)

When the project’s SYNAPSE runtime is connected (e.g. automated injection in supported environments), the engine:

1. Loads session state and computes context bracket when applicable.
2. Determines which layers are active for the current bracket.
3. For each active layer (L0 → L7): loads domains, filters rules, collects output.
4. May consult optional memory bridge (feature-gated) in constrained brackets.
5. Formats consolidated rules (e.g. `<synapse-rules>` XML) within token budget.

### B — Portable mode (this document + SKILL)

In any IDE, **without** assuming hooks or stdin wiring:

1. Apply layers **in order** when reasoning about the answer.
2. Prefer **L0** over conflicting lower-priority material.
3. Honor **L7** explicit `*commands` over automatic L1/L6 suggestions when the user’s intent is clear.

## Conflict resolution

When rules from different layers conflict:

1. **NON_NEGOTIABLE wins** — L0 Constitution rules cannot be overridden.
2. **Higher layer number = more specific** — L7 can override L1 for the current prompt when the user explicitly commands it.
3. **Agent > Global** — L2 agent-scoped rules take precedence over L1 global rules when both apply.
4. **Workflow > Agent** — L3 workflow rules can augment L2 agent rules.
5. **Explicit > Implicit** — Star-commands (explicit user intent) override automatic rules.

## Conceptual output shape

When consolidating mentally or documenting what governed a response, you can mirror this structure (the reference formatter uses XML):

```xml
<synapse-rules>
[CONTEXT BRACKET: MODERATE] (when bracket model applies)
[CONSTITUTION] (NON-NEGOTIABLE) CLI First | Agent Authority | Story-Driven | No Invention | Quality First | Absolute Imports
[ACTIVE AGENT: @dev] …
[ACTIVE WORKFLOW: story_development] …
[TASK CONTEXT] …
[SQUAD: …] …
[STAR-COMMANDS] …
[LOADED DOMAINS SUMMARY] …
</synapse-rules>
```

**Section ordering** (highest priority first):

1. CONTEXT_BRACKET (when used)
2. CONSTITUTION
3. AGENT
4. WORKFLOW
5. TASK
6. SQUAD
7. KEYWORD
8. MEMORY_HINTS (optional, pro/runtime)
9. STAR_COMMANDS
10. DEVMODE (optional)
11. SUMMARY

## Performance targets (reference engine)

When the Node engine runs, typical targets are sub-100ms total pipeline; individual layers have small budgets. **Portable mode** does not impose timing—focus on correct layer ordering and conflicts.

## Source files (framework)

| File | Purpose |
|------|---------|
| `.aiox-core/core/synapse/engine.js` | SynapseEngine orchestrator |
| `.aiox-core/core/synapse/layers/l0-constitution.js` … `l7-star-command.js` | Layer processors |
| `.aiox-core/core/synapse/layers/layer-processor.js` | Abstract base class |
| `.aiox-core/core/synapse/output/formatter.js` | Formatter + token budget |

Hook-specific entry points are **not** part of this portable reference; they belong to environment-specific setup.

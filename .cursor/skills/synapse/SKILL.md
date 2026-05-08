---
name: synapse
description: "AIOX context pipeline (L0-L7): apply layered rules on every response — constitution, global, agent, workflow, task, squad, keyword, star-command."
---

# AIOX Synapse Context Framework

## Overview

SYNAPSE (Synkra Adaptive Processing & State Engine) defines the **canonical 8-layer context pipeline** for AIOX. Every assistant in this project should align with this ordering when reasoning, planning, and answering—whether or not a runtime engine injects rules automatically.

**What this skill is for (IDEs without automatic injection):**

- Apply the **same L0→L7 mental model** that the framework specifies.
- Resolve conflicts using the **same priority rules** as the reference engine (see [references/layers.md](references/layers.md)).
- Treat **L0 Constitution** (from `.aiox-core/constitution.md`) as **non-negotiable** over other layers.

**What this skill is not:**

- It does not require any vendor-specific hook, extension, or CLI. No assumption about Claude Code, Cursor, Codex, etc.

## How to apply the pipeline

On each user turn, conceptually walk the layers in order:

1. **L0 Constitution** — Always: the six AIOX principles (CLI First, Agent Authority, Story-Driven, No Invention, Quality First, Absolute Imports).
2. **L1 Global** — Project-wide rules and coding standards (see synced rules and `.aiox-core` conventions).
3. **L2 Agent** — If the user activated an agent persona (e.g. `@dev`, `@architect`), scope behavior to that agent’s authority and commands.
4. **L3 Workflow** — If a named workflow is active, follow its phases and artifacts.
5. **L4 Task** — If a task or story checklist is in focus, align actions to that task.
6. **L5 Squad** — If a squad context applies, add squad-specific constraints.
7. **L6 Keyword** — If the prompt recalls a domain/epic by keyword, pull in the relevant context (when token budget allows).
8. **L7 Star-command** — If the user uses explicit `*commands` (e.g. `*brief`, `*dev`), treat them as **explicit intent** and prioritize them over generic rules where they conflict.

When in doubt, prefer **explicit user intent (L7)** and **constitution (L0)** over broader defaults—see conflict rules in [references/layers.md](references/layers.md).

## Reference implementation (optional)

The same pipeline is implemented in code under `.aiox-core/core/synapse/` (orchestrator `engine.js`, layers `l0-constitution.js` … `l7-star-command.js`). That engine may run automatically only in environments wired to the project’s hook/runtime; **this skill remains the portable contract** for all IDEs.

## Deep dive

| Document | Contents |
|----------|----------|
| [references/layers.md](references/layers.md) | Full layer definitions, conflict resolution, conceptual output shape |

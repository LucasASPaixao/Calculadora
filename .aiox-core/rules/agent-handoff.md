
# Agent Handoff Protocol

## Purpose

Prevent context accumulation when switching between AIOX agents. Each agent switch creates a structured handoff artifact to preserve critical context while discarding the previous agent's persona.

## When This Applies

This protocol activates whenever:
1. A user invokes a new agent via `@agent-name`
2. The current session already has a different agent active

## Handoff Protocol

### On Agent Switch (outgoing agent)

Before loading the new agent, generate a handoff artifact:

```yaml
handoff:
  from_agent: "{current_agent_id}"
  to_agent: "{new_agent_id}"
  story_context:
    story_id: "{active story ID}"
    story_path: "{active story path}"
    story_status: "{current status}"
    current_task: "{last task being worked on}"
    branch: "{current git branch}"
  decisions:
    - "{key decision 1}"
    - "{key decision 2}"
  files_modified:
    - "{file 1}"
    - "{file 2}"
  blockers:
    - "{any active blockers}"
  next_action: "{what the incoming agent should do}"
```

### On Agent Switch (incoming agent)

The incoming agent receives:
1. Its own **full agent profile** (persona, commands, dependencies)
2. The **handoff artifact** from the previous agent (compact summary)
3. **NOT** the previous agent's full persona/instructions

### Handoff Size Guidelines

| Limit | Guideline |
|-------|-----------|
| Max decisions in artifact | 5 |
| Max files_modified entries | 10 |
| Max blockers | 3 |
| Max retained handoff summaries | 3 (discard oldest on 4th switch) |

### What to Preserve (ALWAYS include)

- Active story ID and path
- Current task being worked on
- Git branch name
- Key architectural decisions made
- Files created or modified
- Active blockers

### What to Discard (NEVER carry forward)

- Previous agent's full persona definition
- Previous agent's command list
- Previous agent's dependency list
- Previous agent's tool configurations
- Previous agent's greeting templates

## Storage

Handoff artifacts stored at `.aiox/handoffs/`. Format: `handoff-{from}-to-{to}-{timestamp}.yaml`.

## Template Reference

Full template: `.aiox-core/development/templates/agent-handoff-tmpl.yaml`

## Example

Session: `@sm` creates story → `@dev` implements → `@qa` reviews

After `@sm` → `@dev` switch:
- `@sm` full persona is **discarded**
- Handoff artifact is **retained**: story ID, decisions, files, next action
- `@dev` full persona is **loaded**

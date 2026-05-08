---
name: obsidian-bases
description: Create and edit Obsidian Bases (.base files) for database-like views of notes. Use when working with .base files, creating table, card, list or map views, defining filters and formulas, or when the user mentions Bases in Obsidian.
---

# Obsidian Bases Skill

Use this skill when working with `.base` files, creating database-like views of notes, or when the user mentions Bases, table views, card views, filters, or formulas in Obsidian.

## Workflow

1. **Create the file**: Create a `.base` file in the vault with valid YAML content
2. **Define scope**: Add `filters` to select which notes appear
3. **Add formulas** (optional): Define computed properties in the `formulas` section
4. **Configure views**: Add one or more views (`table`, `cards`, `list`, or `map`)
5. **Validate**: Verify the file is valid YAML with no syntax errors
6. **Test in Obsidian**: Open the `.base` file to confirm the view renders correctly

## Schema

```yaml
filters:
  and: []
  or: []
  not: []

formulas:
  formula_name: 'expression'

properties:
  property_name:
    displayName: "Display Name"

views:
  - type: table | cards | list | map
    name: "View Name"
    limit: 10
    groupBy:
      property: property_name
      direction: ASC | DESC
    order:
      - file.name
      - property_name
      - formula.formula_name
    summaries:
      property_name: Average
```

## Filter Syntax

```yaml
filters: 'status == "done"'

filters:
  and:
    - 'status == "done"'
    - 'priority > 3'

filters:
  or:
    - 'file.hasTag("book")'
    - 'file.hasTag("article")'
```

## Formula Syntax

```yaml
formulas:
  total: "price * quantity"
  status_icon: 'if(done, "✅", "⏳")'
  days_old: '(now() - file.ctime).days'
  days_until_due: 'if(due_date, (date(due_date) - today()).days, "")'
```

## Complete Example

```yaml
filters:
  and:
    - file.hasTag("task")

formulas:
  days_until_due: 'if(due, (date(due) - today()).days, "")'
  priority_label: 'if(priority == 1, "🔴 High", if(priority == 2, "🟡 Medium", "🟢 Low"))'

views:
  - type: table
    name: "Active Tasks"
    filters:
      and:
        - 'status != "done"'
    order:
      - file.name
      - status
      - formula.priority_label
      - due
      - formula.days_until_due
    groupBy:
      property: status
      direction: ASC
```

## References

- [Bases Syntax](https://help.obsidian.md/bases/syntax)
- [Functions](https://help.obsidian.md/bases/functions)

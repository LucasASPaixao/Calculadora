---
name: obsidian-cli
description: Interact with an Obsidian vault from the command line. Use when the user asks to create, read, append or search notes, manage tags, properties or backlinks, run daily note operations, or develop and debug Obsidian plugins via the obsidian CLI.
---

# Obsidian CLI Skill

Use this skill when the user asks to interact with their Obsidian vault, manage notes, search vault content, perform vault operations from the command line, or develop and debug Obsidian plugins and themes.

Requires Obsidian to be open. Run `obsidian help` for the full command list.

## Syntax

```bash
obsidian create name="My Note" content="Hello world"
obsidian create name="My Note" silent overwrite
```

For multiline content use `\n` for newline and `\t` for tab.

## File targeting

- `file= ` — resolves like a wikilink (name only, no path or extension needed)
- `path= ` — exact path from vault root, e.g. `folder/note.md`

## Vault targeting

```bash
obsidian vault="My Vault" search query="test"
```

## Common patterns

```bash
obsidian read file="My Note"
obsidian create name="New Note" content="# Hello" template="Template" silent
obsidian append file="My Note" content="New line"
obsidian search query="search term" limit=10
obsidian daily:read
obsidian daily:append content="- [ ] New task"
obsidian property:set name="status" value="done" file="My Note"
obsidian tasks daily todo
obsidian tags sort=count counts
obsidian backlinks file="My Note"
```

## Plugin development

```bash
obsidian plugin:reload id=my-plugin
obsidian dev:errors
obsidian dev:screenshot path=screenshot.png
obsidian dev:dom selector=".workspace-leaf" text
obsidian dev:console level=error
obsidian eval code="app.vault.getFiles().length"
obsidian dev:css selector=".workspace-leaf" prop=background-color
obsidian dev:mobile on
```

Full docs: https://help.obsidian.md/cli

---
name: validate-installation
id: validate-installation
version: "1.0.0"
command: "*validate-installation"
aliases:
  - "*check-install"
  - "*vi"
category: devops
owner: aiox-master
description: |
  Valida se a instalação do AIOX está completa e funcional.
  Verifica estrutura de pastas, AGENTS.md, agents, rules, skills,
  recursos do Pro, docs scaffold e integridade geral do framework.

parameters:
  - name: ide
    type: string
    default: all
    description: "all | cursor | antigravity | claude-code | codex | gemini | windsurf"
  - name: verbose
    type: boolean
    default: false
    description: "Exibir detalhes de cada item verificado"

---

# Validate Installation — AIOX

## Como usar este checklist

### Opção 1 — Prompt direto para qualquer agente AIOX

Cole o prompt abaixo na conversa com o agente (ex.: `@aiox-master`, `@devops`, ou `@qa`):

```
Leia o arquivo .aiox-core/development/tasks/validate-installation.md e execute
*validate-installation para este projeto. Para cada item do checklist:
1. Verifique se existe e está correto
2. Marque [x] quando OK ou [!] quando há problema
3. Descreva o que encontrou (verbose = true)
4. Ao final, produza um relatório resumido com: ✅ OK | ❌ Falha | ⚠️ Atenção
```

### Opção 2 — Ativação via comando de agente

```
@aiox-master *validate-installation
```

```
@devops *validate-installation --ide all --verbose true
```

---

## Checklist de Validação

### BLOCO 0 — Pré-check: IDEs instaladas

> **Execute este bloco PRIMEIRO.** O resultado determina quais blocos subsequentes
> são aplicáveis. Itens de IDEs não detectadas devem ser marcados como `[N/A]`.

| # | Item | Como detectar | Status |
|---|------|---------------|--------|
| 0.1 | Ler `ide.selected` em `.aiox-core/core-config.yaml` | `grep -A5 "ide:" .aiox-core/core-config.yaml` — listar valores do array | [ ] |
| 0.2 | Verificar pasta raiz do Cursor | `ls -d .cursor/ 2>/dev/null && echo EXISTS \|\| echo ABSENT` | [ ] |
| 0.3 | Verificar pasta raiz do Antigravity | `ls -d .antigravity/ 2>/dev/null && echo EXISTS \|\| echo ABSENT` | [ ] |
| 0.4 | Verificar pasta raiz do Claude Code | `ls -d .claude/ 2>/dev/null && echo EXISTS \|\| echo ABSENT` | [ ] |
| 0.5 | Verificar pasta raiz do Codex | `ls -d .codex/ 2>/dev/null && echo EXISTS \|\| echo ABSENT` | [ ] |
| 0.6 | Verificar pasta raiz do Gemini | `ls -d .gemini/ 2>/dev/null && echo EXISTS \|\| echo ABSENT` | [ ] |
| 0.7 | Verificar pasta raiz do Windsurf | `ls -d .windsurf/ 2>/dev/null && echo EXISTS \|\| echo ABSENT` | [ ] |

**Regra de ouro para todos os blocos seguintes:**

> Para **qualquer item que referencie uma pasta de IDE** (ex.: `.cursor/agents/`,
> `.antigravity/skills/`), aplique a seguinte lógica antes de validar:
>
> 1. A IDE está em `ide.selected`? → Se não: marcar `[N/A]`
> 2. A pasta raiz da IDE existe no sistema de arquivos? → Se não: marcar `[N/A]`
> 3. Ambas as condições satisfeitas? → Validar normalmente `[ ]` / `[x]` / `[!]`
>
> **Nunca marque falha (`[!]`) em itens de uma IDE que não está instalada.**

**Verificação do agente:**

```bash
# Detectar IDEs configuradas:
grep -A10 "^ide:" .aiox-core/core-config.yaml

# Detectar pastas raiz presentes:
for ide_dir in .cursor .antigravity .claude .codex .gemini .windsurf; do
  [ -d "$ide_dir" ] && echo "✅ $ide_dir presente" || echo "⬜ $ide_dir ausente (N/A)"
done
```

---

### BLOCO 1 — Arquivos raiz obrigatórios

| # | Item | Como validar | Status |
|---|------|--------------|--------|
| 1.1 | `AGENTS.md` existe na raiz | `ls AGENTS.md` | [ ] |
| 1.2 | `.env` existe e não está vazio | `ls .env && wc -l .env` | [ ] |
| 1.3 | `.env.example` existe | `ls .env.example` | [ ] |
| 1.4 | `.gitignore` existe | `ls .gitignore` | [ ] |
| 1.5 | `.aiox-core/core-config.yaml` existe | `ls .aiox-core/core-config.yaml` | [ ] |

**Verificação do agente:**
- Ler e confirmar que cada arquivo existe
- Para `.env`: verificar que `AIOX_VERSION` está definido
- Para `.gitignore`: confirmar que contém `.aiox-core`, `.cursor`, `.antigravity`

---

### BLOCO 2 — AGENTS.md (integridade do arquivo)

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 2.1 | Seção `## Fast Path` presente | Contém `FAST PATH:` ou `## Fast Path` | [ ] |
| 2.2 | Atalhos de agente definidos | `@architect`, `@dev`, `@qa`, `@pm`, `@po`, `@sm`, `@analyst` mapeados para `.aiox-core/development/agents/` | [ ] |
| 2.3 | Tabela de Skills presente | Contém `.cursor/skills/` ou `.antigravity/skills/` como referência | [ ] |
| 2.4 | Protocolo L0-L2 definido | Contém `L0`, `L1`, `L2` ou `Context Protocol` | [ ] |
| 2.5 | Compatibilidade multi-IDE | Contém referência ao Cursor e/ou Antigravity | [ ] |
| 2.6 | Quality Gates definidos | Contém `npm run lint`, `npm run test` | [ ] |

**Verificação do agente:**
- Ler `AGENTS.md` completo
- Confirmar que cada seção existe com conteúdo real (não apenas stub)

---

### BLOCO 3 — Agentes instalados nas IDEs

> Para cada IDE selecionada, verificar a pasta de agents.

#### 3A — Cursor (`.cursor/agents/`)

> **Precondição:** somente se `.cursor/` existir (BLOCO 0.2 = EXISTS).
> Se `.cursor/` estiver ausente, marcar todos os itens 3A como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 3A.1 | Pasta `.cursor/agents/` existe | `ls .cursor/agents/` | [ ] |
| 3A.2 | Agents core presentes (mínimo 10) | `aiox-master.md`, `analyst.md`, `architect.md`, `data-engineer.md`, `dev.md`, `devops.md`, `pm.md`, `po.md`, `qa.md`, `sm.md` | [ ] |
| 3A.3 | Formato condensado | Arquivo NÃO tem bloco YAML longo (frontmatter) — apenas cabeçalho `#`, Quick Commands, All Commands | [ ] |
| 3A.4 | Rodapé de sync presente | Contém `*AIOX Agent - Synced from .aiox-core/development/agents/` | [ ] |
| 3A.5 | **SEM** subpasta `agents/` em `.cursor/rules/` | `.cursor/rules/agents/` NÃO deve existir | [ ] |

#### 3B — Antigravity (`.antigravity/agents/`)

> **Precondição:** somente se `.antigravity/` existir (BLOCO 0.3 = EXISTS).
> Se `.antigravity/` estiver ausente, marcar todos os itens 3B como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 3B.1 | Pasta `.antigravity/agents/` existe | `ls .antigravity/agents/` | [ ] |
| 3B.2 | Agents core presentes (mínimo 10) | Mesma lista de 3A.2 | [ ] |
| 3B.3 | Formato condensado | Igual ao 3A.3 | [ ] |
| 3B.4 | Rodapé de sync presente | Igual ao 3A.4 | [ ] |
| 3B.5 | **SEM** subpasta `agents/` em `.antigravity/rules/` | `.antigravity/rules/agents/` NÃO deve existir | [ ] |
| 3B.6 | `antigravity.json` configurado | `"directory": ".antigravity/agents"` e `"file": ".antigravity/rules.md"` | [ ] |
| 3B.7 | Paths de tasks/workflows corretos | `"tasks": ".aiox-core/development/tasks"` e `"workflows": ".aiox-core/development/workflows"` | [ ] |

#### 3C — Claude Code (`.claude/agents/`)

> **Precondição:** somente se `.claude/` existir (BLOCO 0.4 = EXISTS).
> Se `.claude/` estiver ausente, marcar todos os itens 3C como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 3C.1 | Pasta `.claude/agents/` existe | `ls .claude/agents/` | [ ] |
| 3C.2 | Agents core presentes (mínimo 10) | `aiox-master.md`, `analyst.md`, `architect.md`, `data-engineer.md`, `dev.md`, `devops.md`, `pm.md`, `po.md`, `qa.md`, `sm.md` | [ ] |
| 3C.3 | Formato full-markdown-yaml | Cada `.md` contém bloco YAML completo com `agent:` e seções de comandos — **não** formato condensado | [ ] |
| 3C.4 | Rodapé de sync presente | Contém `*AIOX Agent - Synced from .aiox-core/development/agents/` | [ ] |
| 3C.5 | **SEM** path obsoleto `.claude/commands/AIOX/` | `.claude/commands/AIOX/agents/` NÃO deve existir — agents foram migrados para `.claude/agents/` | [ ] |

**Verificação do agente:**

```bash
# Confirmar que agents/ existe e tem conteúdo:
ls .claude/agents/*.md 2>/dev/null | wc -l

# Confirmar que path obsoleto não existe:
[ -d ".claude/commands/AIOX" ] && echo "❌ AIOX/ obsoleto encontrado" || echo "✅ sem commands/AIOX/"
```

#### 3D — Codex (`.codex/agents/`)

> **Precondição:** somente se `.codex/` existir (BLOCO 0.5 = EXISTS).
> Se `.codex/` estiver ausente, marcar todos os itens 3D como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 3D.1 | Pasta `.codex/agents/` existe | `ls .codex/agents/` | [ ] |
| 3D.2 | Agents core presentes (mínimo 10) | Mesma lista de 3A.2 | [ ] |
| 3D.3 | Formato full-markdown-yaml | Mesmo formato do Claude Code (3C.3) | [ ] |
| 3D.4 | Rodapé de sync presente | Igual ao 3A.4 | [ ] |
| 3D.5 | Squads em **subpastas** dentro de `agents/` | Squads ficam em `.codex/agents/{squad}/` — NÃO misturados na raiz de `agents/` | [ ] |

**Verificação do agente:**

```bash
# Listar agents core (arquivos diretos na raiz):
ls .codex/agents/*.md 2>/dev/null | wc -l

# Listar squads (subpastas):
ls -d .codex/agents/*/ 2>/dev/null | head -10
```

#### 3G — Windsurf (`.windsurf/agents/`)

> **Precondição:** somente se `.windsurf/` existir (BLOCO 0.7 = EXISTS).
> Se `.windsurf/` estiver ausente, marcar todos os itens 3G como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 3G.1 | Pasta `.windsurf/agents/` existe | `ls .windsurf/agents/` | [ ] |
| 3G.2 | Agents core presentes (mínimo 10) | `aiox-master.md`, `analyst.md`, `architect.md`, `data-engineer.md`, `dev.md`, `devops.md`, `pm.md`, `po.md`, `qa.md`, `sm.md` | [ ] |
| 3G.3 | Formato Windsurf com frontmatter | Cada `.md` começa com `---`, `trigger: model_decision` e `description:` | [ ] |
| 3G.4 | Rodapé de sync presente | Contém `*AIOX Agent - Synced from .aiox-core/development/agents/` | [ ] |
| 3G.5 | **SEM** agents em `.windsurf/rules/` | `.windsurf/rules/` contém **apenas** governance rules — NÃO deve ter `aiox-master.md`, `dev.md` etc. | [ ] |
| 3G.6 | **SEM** subpasta `AIOX/` em `.windsurf/rules/` | `.windsurf/rules/AIOX/` NÃO deve existir (path obsoleto) | [ ] |

**Verificação do agente:**

```bash
# Verificar frontmatter dos agents Windsurf:
for f in .windsurf/agents/*.md; do
  trigger=$(grep "trigger:" "$f" | head -1)
  echo "$(basename $f): $trigger"
done

# Confirmar que rules/ não tem agents misturados:
ls .windsurf/rules/ | grep -E "^(aiox-master|dev|pm|qa|analyst|architect)\.md$" \
  && echo "⚠️ agents encontrados em rules/" || echo "✅ rules/ limpa"

# Confirmar que AIOX/ obsoleto não existe:
[ -d ".windsurf/rules/AIOX" ] && echo "❌ AIOX/ obsoleto encontrado" || echo "✅ sem AIOX/"
```

---

### BLOCO 4 — Rules instaladas nas IDEs

#### 4A — Cursor (`.cursor/rules/`)

> **Precondição:** somente se `.cursor/` existir (BLOCO 0.2 = EXISTS).
> Se `.cursor/` estiver ausente, marcar todos os itens 4A como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 4A.1 | `.cursor/rules/` contém `.mdc` | Mínimo 8 arquivos `.mdc`: `agent-authority`, `agent-handoff`, `agent-signature`, `story-lifecycle`, `workflow-execution`, `ids-principles`, `no-any-typescript`, `git-commit-ptbr` | [ ] |
| 4A.2 | `.cursor/rules/*.mdc` com frontmatter | Cada `.mdc` começa com `---` e `alwaysApply:` | [ ] |
| 4A.3 | `rules.md` em `.cursor/` | `.cursor/rules.md` existe | [ ] |

#### 4B — Antigravity (`.antigravity/rules/`)

> **Precondição:** somente se `.antigravity/` existir (BLOCO 0.3 = EXISTS).
> Se `.antigravity/` estiver ausente, marcar todos os itens 4B como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 4B.1 | `.antigravity/rules/` contém `.md` | Mesmas regras em formato `.md` (sem frontmatter) | [ ] |
| 4B.2 | `rules.md` em `.antigravity/` | `.antigravity/rules.md` existe | [ ] |

#### 4C — Claude Code (`.claude/rules/`)

> **Precondição:** somente se `.claude/` existir (BLOCO 0.4 = EXISTS).
> Se `.claude/` estiver ausente, marcar todos os itens 4C como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 4C.1 | `.claude/rules/` contém `.md` | Mínimo 8 arquivos `.md`: `agent-authority`, `agent-handoff`, `agent-signature`, `story-lifecycle`, `workflow-execution`, `ids-principles`, `no-any-typescript`, `git-commit-ptbr` | [ ] |
| 4C.2 | Formato plain-md (sem frontmatter de IDE) | Nenhum `.md` começa com `alwaysApply:` ou `trigger:` — Claude lê markdown puro | [ ] |
| 4C.3 | `CLAUDE.md` na raiz de `.claude/` | `.claude/CLAUDE.md` existe e não está vazio | [ ] |

**Verificação do agente:**

```bash
# Contar rules:
ls .claude/rules/*.md 2>/dev/null | wc -l

# Verificar CLAUDE.md:
wc -l .claude/CLAUDE.md 2>/dev/null || echo "❌ CLAUDE.md ausente"
```

#### 4D — Windsurf (`.windsurf/rules/`)

> **Precondição:** somente se `.windsurf/` existir (BLOCO 0.7 = EXISTS).
> Se `.windsurf/` estiver ausente, marcar todos os itens 4D como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 4D.1 | `.windsurf/rules/` contém `.md` | Mínimo 8 arquivos `.md`: `agent-authority`, `agent-handoff`, `agent-signature`, `story-lifecycle`, `workflow-execution`, `ids-principles`, `no-any-typescript`, `git-commit-ptbr` | [ ] |
| 4D.2 | Formato plain-md (sem frontmatter YAML) | Nenhum `.md` em `.windsurf/rules/` começa com `---` seguido de `alwaysApply:` — Windsurf lê markdown puro | [ ] |
| 4D.3 | **SEM** subpastas dentro de `.windsurf/rules/` | Windsurf **não** lê regras em subdiretórios — não deve existir `AIOX/`, `squads/`, `agents/` dentro de `rules/` | [ ] |
| 4D.4 | Rules NÃO contêm agents | Nenhum agent core (`aiox-master.md`, `dev.md` etc.) deve estar em `.windsurf/rules/` — agents ficam em `.windsurf/agents/` | [ ] |

**Verificação do agente:**

```bash
# Verificar que rules/ não tem frontmatter de IDE:
grep -l "^alwaysApply:" .windsurf/rules/*.md 2>/dev/null \
  && echo "⚠️ frontmatter Cursor encontrado em Windsurf rules" || echo "✅ plain-md correto"

# Verificar ausência de subpastas:
find .windsurf/rules -mindepth 1 -type d 2>/dev/null \
  && echo "❌ subpastas encontradas" || echo "✅ sem subpastas"

# Contar arquivos de governance:
ls .windsurf/rules/*.md 2>/dev/null | wc -l
```

---

### BLOCO 5 — Skills instaladas nas IDEs

#### 5A — Cursor (`.cursor/skills/`)

> **Precondição:** somente se `.cursor/` existir (BLOCO 0.2 = EXISTS).
> Se `.cursor/` estiver ausente, marcar todos os itens 5A como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 5A.1 | `.cursor/skills/` existe | `ls .cursor/skills/` | [ ] |
| 5A.2 | Skills core presentes | Subpastas: `architect-first`, `checklist-runner`, `coderabbit-review`, `tech-search`, `synapse` | [ ] |
| 5A.3 | Cada skill core tem `SKILL.md` | `ls .cursor/skills/architect-first/SKILL.md` (e demais) | [ ] |

#### 5B — Antigravity (`.antigravity/skills/`)

> **Precondição:** somente se `.antigravity/` existir (BLOCO 0.3 = EXISTS).
> Se `.antigravity/` estiver ausente, marcar todos os itens 5B como `[N/A]`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 5B.1 | `.antigravity/skills/` existe | `ls .antigravity/skills/` | [ ] |
| 5B.2 | Skills espelhadas no Antigravity | Mesmas skills do Cursor (5A.2) presentes | [ ] |

---

### BLOCO 6 — Pro resources

> **Precondição:** somente executar este bloco se `pro.enabled: true` em `.aiox-core/core-config.yaml`
> (verificado no BLOCO 8.1). Se `pro.enabled: false` ou campo ausente, marcar **todos** os itens
> 6.1–6.C como `[N/A]` — não conta como falha.

#### 6A — Presença e identidade

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 6A.1 | `pro.enabled: true` no core-config | `grep "enabled:" .aiox-core/core-config.yaml` — confirmar `true` sob `pro:` | [ ] |
| 6A.2 | `pro-installed-manifest.yaml` existe | `ls pro-installed-manifest.yaml` | [ ] |
| 6A.3 | `pro-version.json` existe e tem conteúdo | `cat pro-version.json` — deve ter `version`, `installedAt` ou campos equivalentes | [ ] |
| 6A.4 | `squads/` na raiz (fonte canônica) | `ls squads/` — pasta de fontes dos squads Pro | [ ] |

**Verificação do agente:**

```bash
# Checar flag Pro:
grep -A3 "^pro:" .aiox-core/core-config.yaml

# Checar manifesto e versão:
cat pro-installed-manifest.yaml
cat pro-version.json
```

#### 6B — Conteúdo do manifesto

> O `pro-installed-manifest.yaml` usa formato de lista de arquivos com path e timestamp
> (gerado automaticamente pelo instalador). **Não possui campos `squads:` / `name:`** —
> a presença dos squads é inferida pelos paths `squads/<name>/` dentro de `files:`.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 6B.1 | Manifesto tem campo `files:` não vazio | `grep -c "path:" pro-installed-manifest.yaml` — deve retornar ≥ 1 | [ ] |
| 6B.2 | Manifesto referencia pelo menos 1 squad | `grep "path: squads/" pro-installed-manifest.yaml` — pelo menos 1 entrada | [ ] |
| 6B.3 | Cada squad referenciado tem pasta fonte em `squads/` | Extrair nomes únicos de `squads/<name>/` no manifesto e confirmar que cada pasta existe | [ ] |
| 6B.4 | `totalFiles` bate com a contagem real de `files:` | `grep "totalFiles:" pro-installed-manifest.yaml` vs `grep -c "path:" pro-installed-manifest.yaml` | [ ] |

**Verificação do agente:**

```bash
# Confirmar estrutura do manifesto:
head -5 pro-installed-manifest.yaml

# Extrair squads referenciados no manifesto e cruzar com pastas:
grep "path: squads/" pro-installed-manifest.yaml \
  | awk '{print $2}' \
  | cut -d'/' -f1-2 \
  | sort -u \
  | while read squadpath; do
      [ -d "$squadpath" ] && echo "✅ $squadpath" || echo "❌ $squadpath — pasta ausente"
    done

# Verificar totalFiles vs contagem real:
total=$(grep "totalFiles:" pro-installed-manifest.yaml | awk '{print $2}')
actual=$(grep -c "  - path:" pro-installed-manifest.yaml)
echo "totalFiles declarado: $total | entradas reais: $actual"
```

#### 6C — Squads instalados nas IDEs

> Aplique a regra do BLOCO 0: só validar pasta de IDE se sua raiz existir.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 6C.1 | Squad `claude-code-mastery` no Cursor | **Somente se `.cursor/` existe:** `ls .cursor/agents/claude-code-mastery/` | [ ] |
| 6C.2 | Squad `claude-code-mastery` no Antigravity | **Somente se `.antigravity/` existe:** `ls .antigravity/agents/claude-code-mastery/` | [ ] |
| 6C.3 | Squad `mmos-squad` no Cursor | **Somente se `.cursor/` existe:** `ls .cursor/agents/mmos-squad/` | [ ] |
| 6C.4 | Squad `mmos-squad` no Antigravity | **Somente se `.antigravity/` existe:** `ls .antigravity/agents/mmos-squad/` | [ ] |
| 6C.5 | Cada squad tem mínimo 2 agentes `.md` | Para cada subpasta de squad em cada IDE: `ls *.md \| wc -l` ≥ 2 | [ ] |
| 6C.6 | Squad `claude-code-mastery` no Windsurf | **Somente se `.windsurf/` existe:** `ls .windsurf/agents/claude-code-mastery/` | [ ] |
| 6C.7 | Squad `mmos-squad` no Windsurf | **Somente se `.windsurf/` existe:** `ls .windsurf/agents/mmos-squad/` | [ ] |
| 6C.8 | Squad `claude-code-mastery` no Claude Code | **Somente se `.claude/` existe:** `ls .claude/commands/claude-code-mastery/` — squads Claude ficam em `commands/` (slash commands nativos) | [ ] |
| 6C.9 | Squad `mmos-squad` no Claude Code | **Somente se `.claude/` existe:** `ls .claude/commands/mmos-squad/` | [ ] |
| 6C.10 | Squad `claude-code-mastery` no Codex | **Somente se `.codex/` existe:** `ls .codex/agents/claude-code-mastery/` — squads Codex ficam em subpasta de `agents/` | [ ] |
| 6C.11 | Squad `mmos-squad` no Codex | **Somente se `.codex/` existe:** `ls .codex/agents/mmos-squad/` | [ ] |

**Verificação do agente:**

```bash
# Cursor, Antigravity, Windsurf — squads em agents/:
for ide in .cursor .antigravity .windsurf; do
  [ -d "$ide/agents" ] || continue
  echo "=== $ide/agents (squads) ==="
  ls "$ide/agents/" | grep -vE "^(aiox-master|analyst|architect|data-engineer|dev|devops|pm|po|qa|sm|squad-creator|ux-design-expert)\.md$"
done

# Codex — squads em subpastas de agents/:
echo "=== .codex/agents (squads) ==="
ls -d .codex/agents/*/ 2>/dev/null | xargs -I{} basename {}

# Claude Code — squads em commands/:
echo "=== .claude/commands (squads) ==="
ls -d .claude/commands/*/ 2>/dev/null | xargs -I{} basename {} \
  | grep -vE "^(AIOX|synapse)$"

# Contar agentes por squad no Cursor (referência):
for squad in .cursor/agents/*/; do
  count=$(ls "$squad"*.md 2>/dev/null | wc -l)
  name=$(basename "$squad")
  [ "$count" -ge 2 ] && echo "✅ $name ($count agentes)" || echo "⚠️ $name ($count agentes — esperado ≥2)"
done
```

---

### BLOCO 7 — Docs scaffold

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 7.1 | `docs/` existe | `ls docs/` | [ ] |
| 7.2 | `docs/prd.md` presente | `ls docs/prd.md` | [ ] |
| 7.3 | `docs/architecture.md` presente | `ls docs/architecture.md` | [ ] |
| 7.4 | `docs/framework/` presente | `ls docs/framework/` — deve ter `tech-stack.md`, `source-tree.md`, `coding-standards.md` | [ ] |
| 7.5 | `docs/stories/` presente | `ls docs/stories/README.md` | [ ] |
| 7.6 | `docs/architecture/` presente | `ls docs/architecture/` — deve ter `design.md`, `business-rules.md` | [ ] |

---

### BLOCO 8 — AIOX Core (`.aiox-core/`)

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 8.1 | `.aiox-core/core-config.yaml` legível | Ler e confirmar campos: `project.type`, `ide.selected`, `pro.enabled` | [ ] |
| 8.2 | `ide.selected` lista as IDEs instaladas | Array não vazio | [ ] |
| 8.3 | `.aiox-core/development/agents/` com fontes | Mínimo 10 arquivos `.md` (fontes canônicas) | [ ] |
| 8.4 | `.aiox-core/development/tasks/` existe | `ls .aiox-core/development/tasks/` | [ ] |
| 8.5 | `.aiox-core/development/workflows/` existe | `ls .aiox-core/development/workflows/` | [ ] |
| 8.6 | `.aiox-core/rules/` com regras canônicas | `ls .aiox-core/rules/` — deve ter `agent-authority.md`, `story-lifecycle.md`, etc. | [ ] |

---

### BLOCO 9 — Integridade entre componentes

> Itens que cruzam com pastas de IDEs (9.1, 9.2, 9.5, 9.6) aplicam a regra do BLOCO 0:
> só verificar a IDE se sua pasta raiz existir.

| # | Item | O que verificar | Status |
|---|------|-----------------|--------|
| 9.1 | Agents source ↔ IDE agents sincronizados | Para cada IDE com pasta raiz presente: nomes em `.aiox-core/development/agents/*.md` batem com agentes na IDE | [ ] |
| 9.2 | Rules source ↔ IDE rules sincronizadas | Para cada IDE com pasta raiz presente: nomes em `.aiox-core/rules/` aparecem na IDE | [ ] |
| 9.3 | AGENTS.md aponta para paths existentes | Todos os paths de agentes no `AGENTS.md` resolvem para arquivos reais | [ ] |
| 9.4 | Atalhos do AGENTS.md cobrem todos os agentes | Para cada `.md` em `.aiox-core/development/agents/` há um atalho `@<id>` no `AGENTS.md` | [ ] |
| 9.5 | Skills no AGENTS.md ↔ skills instaladas | Skills no `AGENTS.md` existem nas IDEs instaladas — **somente verificar `.cursor/skills/` se `.cursor/` existir; `.antigravity/skills/` se `.antigravity/` existir** | [ ] |
| 9.6 | `antigravity.json` aponta para `.antigravity/agents/` | **Somente se `.antigravity/` existir (BLOCO 0.3 = EXISTS):** campo `agents.directory` = `.antigravity/agents` — caso contrário: `[N/A]` | [ ] |

---

### BLOCO 10 — Skills customizadas nos agentes fonte

> Verifica se os agentes em `.aiox-core/development/agents/` declaram corretamente
> as seções de skills customizadas instaladas no projeto.
>
> **Como funciona:** cada skill customizada integrada ao AIOX define um bloco
> `<skill_id>_skill_integration` dentro do YAML de cada agente relevante.
> Este bloco contém `enabled_when`, `skill_path` e `capabilities`.
> Deve existir apenas nos agentes que têm fit real com a skill.

#### 10A — TLC Spec-Driven (`tlc_skill_integration`)

> Skill path: `.aiox-core/skills/tlc-spec-driven`
> Agentes esperados: `architect`, `dev`, `po`, `analyst`, `qa`, `devops`, `data-engineer`
> Agentes SEM bloco (correto): `pm`, `sm`, `ux-design-expert`, `squad-creator`, `aiox-master`

| # | Item | Como validar | Status |
|---|------|--------------|--------|
| 10A.1 | Skill existe em `.aiox-core/skills/` | `ls .aiox-core/skills/tlc-spec-driven/SKILL.md` | [ ] |
| 10A.2 | `architect.md` tem `tlc_skill_integration` com 4 capabilities | `grep -c "name:" .aiox-core/development/agents/architect.md` — espera 4 dentro do bloco | [ ] |
| 10A.3 | `dev.md` tem `tlc_skill_integration` com 2 capabilities | `implement-protocol` e `quick-mode` presentes | [ ] |
| 10A.4 | `po.md` tem `tlc_skill_integration` com 1 capability | `specify-stories` presente | [ ] |
| 10A.5 | `analyst.md` tem `tlc_skill_integration` com 1 capability | `discuss-gray-areas` presente | [ ] |
| 10A.6 | `qa.md` tem `tlc_skill_integration` com 1 capability | `validate` presente | [ ] |
| 10A.7 | `devops.md` tem `tlc_skill_integration` com 1 capability | `concerns-infra` presente | [ ] |
| 10A.8 | `data-engineer.md` tem `tlc_skill_integration` com 1 capability | `brownfield-db` presente | [ ] |
| 10A.9 | `pm.md` NÃO tem `tlc_skill_integration` | `grep "tlc_skill_integration" .aiox-core/development/agents/pm.md` — deve retornar vazio | [ ] |
| 10A.10 | `sm.md` NÃO tem `tlc_skill_integration` | Idem para `sm.md` | [ ] |
| 10A.11 | Todos os blocos têm `enabled_when` correto | `grep "enabled_when" .aiox-core/development/agents/*.md` — deve ser `core-config.tlc_spec_driven.enabled == true` | [ ] |
| 10A.12 | `skill_path` aponta para path correto | `grep "skill_path" .aiox-core/development/agents/*.md` — deve ser `.aiox-core/skills/tlc-spec-driven` | [ ] |

**Verificação do agente:**

```bash
# Listar agentes que têm o bloco:
grep -l "tlc_skill_integration" .aiox-core/development/agents/*.md

# Verificar agentes que NÃO devem ter o bloco:
for f in pm.md sm.md ux-design-expert.md squad-creator.md aiox-master.md; do
  count=$(grep -c "tlc_skill_integration" .aiox-core/development/agents/$f 2>/dev/null || echo 0)
  echo "$f: $count (esperado: 0)"
done

# Verificar enabled_when em todos:
grep "enabled_when" .aiox-core/development/agents/*.md
```

#### 10B — Template para skills futuras

> Quando uma nova skill for integrada (ex.: `mermaid-studio`, `codenavi`),
> adicionar uma subseção `10C`, `10D`, etc. com:
> - Nome e path da skill
> - Lista de agentes esperados (com fit real) e agentes excluídos
> - Itens de validação por agente

| # | Item | Como validar | Status |
|---|------|--------------|--------|
| 10B.1 | Toda skill em `.aiox-core/skills/` tem `SKILL.md` | `for d in .aiox-core/skills/*/; do ls "${d}SKILL.md" 2>/dev/null || echo "FALTA: $d"; done` | [ ] |
| 10B.2 | Nenhum agente tem `skill_path` apontando para skill inexistente | `grep "skill_path" .aiox-core/development/agents/*.md` — todos os paths existem | [ ] |
| 10B.3 | Skills em `.aiox-core/skills/` estão espelhadas nas IDEs instaladas | Para cada IDE com pasta raiz presente: `diff <(ls .aiox-core/skills/) <(ls .<ide>/skills/)` — **somente executar se a pasta raiz da IDE existir (BLOCO 0)** | [ ] |

**Verificação do agente:**

```bash
# Listar todas as skills instaladas no core:
ls .aiox-core/skills/

# Verificar se todas têm SKILL.md:
for d in .aiox-core/skills/*/; do
  skill=$(basename "$d")
  [ -f "${d}SKILL.md" ] && echo "✅ $skill" || echo "❌ $skill — SKILL.md ausente"
done

# Cruzar paths declarados nos agentes com skills existentes:
grep "skill_path:" .aiox-core/development/agents/*.md | awk '{print $2}' | sort -u | while read p; do
  [ -d "$p" ] && echo "✅ $p" || echo "❌ $p — diretório não encontrado"
done
```

---

## Critério de aprovação

| Score | Resultado |
|-------|-----------|
| 100% dos itens obrigatórios OK ou N/A | ✅ Instalação aprovada — AIOX pronto para uso |
| Falha em BLOCO 1 ou BLOCO 8 | ❌ Instalação incompleta — reexecutar wizard |
| Falha em BLOCO 6A ou 6B | ⚠️ Pro instalado mas manifesto/versão inválidos — verificar instalação Pro |
| Falha em BLOCO 6C | ⚠️ Squads Pro ausentes nas IDEs — executar `npm run sync:ide` |
| Falha em BLOCO 10A ou 10B | ⚠️ Skills customizadas com drift — verificar agentes e paths |
| Falha isolada em 1–3 itens | ⚠️ Drift parcial — executar `npm run sync:ide` |
| Item marcado `[N/A]` | ⬜ IDE não instalada — ignorar (não conta como falha) |

---

## Ações de correção automática

Ao detectar falhas, o agente deve sugerir:

```bash
# Resincronizar agents/rules nas IDEs
npm run sync:ide

# Validar drift (dry run)
npm run sync:ide:check

# Verificar estrutura de agentes
npm run validate:agents

# Reexecutar instalação (se falha grave)
npx @aiox-fullstack/installer
```

---

## Template de relatório do agente

Após executar o checklist, o agente deve produzir:

```
## Relatório de Validação AIOX — <projeto> — <data>

### Resumo
- ✅ Itens OK: XX/YY
- ❌ Falhas: N
- ⚠️ Atenção: N
- ⬜ N/A (IDE não instalada): N

### Falhas encontradas
| Bloco | Item | Problema | Ação sugerida |
|-------|------|----------|---------------|
| 3A.5 | .cursor/rules/agents/ | Pasta obsoleta ainda presente | `rm -rf .cursor/rules/agents` |

### Status geral
[APROVADO / REQUER ATENÇÃO / INSTALAÇÃO INCOMPLETA]

### Skills customizadas
| Skill | Agentes com bloco | Agentes sem bloco (correto) | Status |
|-------|-------------------|-----------------------------|--------|
| tlc-spec-driven | architect, dev, po, analyst, qa, devops, data-engineer | pm, sm, ... | [ ] |

### Pro resources
| Item | Encontrado | Status |
|------|-----------|--------|
| pro.enabled | true/false | [ ] |
| Squads no manifesto | squad-a, squad-b | [ ] |
| Skills Pro no manifesto | skill-a | [ ] |
| Squads nas IDEs | cursor: X squads · antigravity: X squads | [ ] |

### Próximos passos
1. ...
```

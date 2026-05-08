# AGENTS.md - Synkra AIOX

Este arquivo define as instrucoes do projeto para agentes de IA.

<!-- AIOX-MANAGED-START: core -->
## Core Rules

1. Siga a Constitution em `.aiox-core/constitution.md`
2. Priorize `CLI First -> Observability Second -> UI Third`
3. Trabalhe por stories em `docs/stories/`
4. Nao invente requisitos fora dos artefatos existentes
<!-- AIOX-MANAGED-END: core -->

<!-- AIOX-MANAGED-START: quality -->
## Quality Gates

- Rode `npm run lint`
- Rode `npm run typecheck`
- Rode `npm test`
- Atualize checklist e file list da story antes de concluir
<!-- AIOX-MANAGED-END: quality -->

<!-- AIOX-MANAGED-START: codebase -->
## Project Map

- Core framework: `.aiox-core/`
- CLI entrypoints: `bin/`
- Shared packages: `packages/`
- Tests: `tests/`
- PRD: `docs/prd.md`
- Arquitetura: `docs/architecture.md` e `docs/architecture/`
- Framework (devLoadAlwaysFiles): `docs/framework/`
- Stories: `docs/stories/` (ex.: `docs/stories/epic-001/story-1.1.titulo.md`)
<!-- AIOX-MANAGED-END: codebase -->

<!-- AIOX-MANAGED-START: commands -->
## Common Commands

- `npm run sync:ide`
- `npm run sync:ide:check`
- `npm run validate:structure`
- `npm run validate:agents`
<!-- AIOX-MANAGED-END: commands -->

<!-- AIOX-MANAGED-START: rules -->
## Governance Rules

Rules em `.aiox-core/rules/` (ou na pasta de rules da sua IDE). Carregue-as ao
iniciar a sessao — IDEs com suporte a pasta de rules fazem isso automaticamente.

### Sempre ativas

- `agent-authority.md`        — matriz de delegacao e operacoes exclusivas por agente
- `agent-handoff.md`          — protocolo de troca de agente com artefato de contexto
- `agent-signature.md`        — selecao automatica de agente + assinatura por resposta
- `workflow-execution.md`     — 4 workflows (SDC, QA Loop, Spec Pipeline, Brownfield)
- `story-lifecycle.md`        — ciclo de vida e transicoes de status de stories
- `ids-principles.md`         — hierarquia REUSE > ADAPT > CREATE
- `coderabbit-integration.md` — integracao CodeRabbit nas fases dev/qa
- `no-any-typescript.md`      — proibicao de `any` em TypeScript

### Condicionais

- `git-commit-ptbr.md`  — padrao SAM de commits em pt-BR
  (ativar ao trabalhar com git: commits, push, PR)
- `mcp-usage.md`        — governanca de ferramentas MCP e selecao de provider
  (ativar ao usar ou configurar servidores MCP)
<!-- AIOX-MANAGED-END: rules -->

<!-- AIOX-MANAGED-START: shortcuts -->
## Agent Shortcuts

Carregue o arquivo correspondente em `.aiox-core/development/agents/` e assuma
a persona ate `*exit`. No Codex CLI, voce tambem pode usar `/skills` e selecionar
`aiox-<agent-id>` de `.codex/skills`.

- `@architect`        -> `.aiox-core/development/agents/architect.md`
- `@dev`              -> `.aiox-core/development/agents/dev.md`
- `@qa`               -> `.aiox-core/development/agents/qa.md`
- `@pm`               -> `.aiox-core/development/agents/pm.md`
- `@po`               -> `.aiox-core/development/agents/po.md`
- `@sm`               -> `.aiox-core/development/agents/sm.md`
- `@analyst`          -> `.aiox-core/development/agents/analyst.md`
- `@devops`           -> `.aiox-core/development/agents/devops.md`
- `@data-engineer`    -> `.aiox-core/development/agents/data-engineer.md`
- `@ux-design-expert` -> `.aiox-core/development/agents/ux-design-expert.md`
- `@squad-creator`    -> `.aiox-core/development/agents/squad-creator.md`
- `@aiox-master`      -> `.aiox-core/development/agents/aiox-master.md`
<!-- AIOX-MANAGED-END: shortcuts -->

---

## Fast Path

> **SE** a tarefa for: corrigir typo · renomear campo · ajuste de import · bugfix em ate 2 arquivos sem regra de negocio
> **→ SKIP** o protocolo abaixo. Implementar usando `docs/framework/coding-standards.md`.

> **SE** a tarefa envolver: nova feature · regra de negocio · integracao · decisao arquitetural · cruzar modulos
> **→ Seguir** o Protocolo de Auto-Contextualizacao abaixo.

---

## Skills Disponiveis

| Skill | Path | Quando usar |
|-------|------|-------------|
| `architect-first` | `.cursor/skills/architect-first/SKILL.md` | Decisoes arquiteturais, refactor |
| `checklist-runner` | `.cursor/skills/checklist-runner/SKILL.md` | Executar qualquer checklist `.md` |
| `coderabbit-review` | `.cursor/skills/coderabbit-review/SKILL.md` | Review via CodeRabbit CLI |
| `tech-search` | `.cursor/skills/tech-search/SKILL.md` | Pesquisa tecnica com validacao |
| `synapse` | `.cursor/skills/synapse/SKILL.md` | Pipeline de contexto L0-L7 |
| _(adicione skills do projeto)_ | _(path)_ | _(quando usar)_ |

---

## Contexto de Framework

Carregados pelo `@dev` via `devLoadAlwaysFiles` em `core-config.yaml`. Demais agentes: carregar ao trabalhar com codigo.

| Arquivo | Conteudo |
|---------|----------|
| `docs/framework/coding-standards.md` | Naming, tipagem, erros, testes |
| `docs/framework/tech-stack.md` | Stack, versoes, libs aprovadas |
| `docs/framework/source-tree.md` | Modulos, pastas, ciclo de request |

---

## Protocolo de Auto-Contextualizacao

### Nivel 0 — Universal

| Arquivo | Quando |
|---------|--------|
| `docs/framework/coding-standards.md` | Sempre que houver codigo |
| `docs/framework/tech-stack.md` | Stack ou infraestrutura |
| `docs/framework/source-tree.md` | Modulos ou estrutura de pastas |

### Nivel 1 — Transversal (trigger)

| Trigger | Carregar |
|---------|----------|
| Decisao arquitetural / visao geral | `docs/architecture.md` |
| Detalhe por dominio | `docs/architecture/{dominio}.md` (se existir) |
| Regras de negocio | `docs/architecture/business-rules.md` |
| Enums / constantes | `docs/architecture/enums.md` |
| Padroes de implementacao / templates por camada | `docs/architecture/design.md` |
| Integracoes (detalhe alem do tech-stack) | `docs/architecture/integrations.md` |
| Setup local, Docker, env | `docs/architecture/setup.md` |
| Produto / requisitos | `docs/prd.md` |

### Nivel 2 — Por dominio (keywords)

> Ultima revisao: 2026-05-08

| Dominio / Epico | Palavras-chave para acionar | Carregar |
|-----------------|----------------------------|----------|
| Calculadora — MVP (Epic-001) | calculadora, display, visor, expressao, resultado, operacao, digito, operador, decimal, botao, teclado, clear, delete, equals, estado, calculatorState | `docs/stories/epic-001/epic-001.md` |
| Logica de avaliacao | sanitize, new Function, eval, expressao matematica, resultado ao vivo, evaluateExpression, lastActionWasEquals | `docs/stories/epic-001/story-1.3.logica-calculadora.md` |
| Interface e estilizacao | CSS, grid, flexbox, tema escuro, botao, key-operator, key-equals, styles, responsivo | `docs/stories/epic-001/story-1.2.estilizacao.md` |
| Suporte a teclado | keydown, keyboard, teclado, handleKeyDown, Backspace, Escape, Enter | `docs/stories/epic-001/story-1.4.suporte-teclado.md` |
| Qualidade e testes | teste, test, Vitest, Jest, cobertura, coverage, funcao pura, refatorar | `docs/architecture/concerns.md` |
| Seguranca | sanitizacao, new Function, eval, XSS, injection | `docs/architecture/concerns.md`, `docs/architecture/business-rules.md` |

Regra: carregar epic/story antes de implementar; nao inventar comportamento fora do documentado.

---

## Compatibilidade Multi-IDE

| Ferramenta | Arquivo nativo | Le AGENTS.md? | Observacao |
|------------|----------------|---------------|------------|
| Codex CLI | `AGENTS.md` | Sim | Principal |
| Claude Code | `CLAUDE.md` + `.claude/rules/` | Sim | |
| Cursor | `.cursor/rules/*.mdc` | Sim | |
| GitHub Copilot | `.github/copilot-instructions.md` | Sim | Chat |
| Gemini CLI | `GEMINI.md` + `.gemini/rules/` | Sim | |
| Windsurf | `.windsurfrules` | Parcial | Resumo |
| Antigravity | `.antigravity/agents/` | Sim | |

---

## Protocolo de Manutencao

**Ao criar novo epic ou story de dominio:**
- [ ] Atualizar tabela do Nivel 2 com keywords
- [ ] Atualizar "Ultima revisao" no topo (se usar)

**Ao adicionar skill:**
- [ ] Nova linha em Skills Disponiveis

**Ao mudar estrutura de pastas:**
- [ ] Atualizar Project Map (bloco managed) se aplicavel
- [ ] Atualizar Nivel 1 se novos docs em `docs/architecture/`

---
# Fill Project Docs — Task Relay
# Este arquivo é invocado por @architect via *fill-project-docs
# O workflow completo (multi-agente) está em:
#   .aiox-core/development/workflows/fill-project-docs.yaml

name: fill-project-docs
id: fill-project-docs
version: "1.0.0"
command: "*fill-project-docs"
aliases:
  - "*fpd"
category: documentation
owner: architect
workflow: fill-project-docs.yaml

description: |
  Preenche os stubs de docs/ gerados pelo instalador AIOX com conteúdo
  real do projeto. Orquestra 5 fases com 5 agentes.

  Para execução completa, use o workflow:
  .aiox-core/development/workflows/fill-project-docs.yaml

parameters:
  - name: scope
    type: string
    default: all
    description: "all | technical | prd | stories"
  - name: confirm
    type: boolean
    default: true
    description: "false = sem paradas entre seções (modo yolo)"
---

# fill-project-docs — Task

Este task é o **ponto de entrada** para o workflow multi-agente que preenche
os docs do scaffold AIOX. O workflow completo está em:

```
.aiox-core/development/workflows/fill-project-docs.yaml
```

## Ativação rápida

```
@architect *fill-project-docs
```

## Fases e Agentes

| Fase | Agente | Escopo | Depende de |
|------|--------|--------|------------|
| 1a | `@architect` | docs/framework/ + docs/architecture/ (técnico) | — |
| 1b | `@analyst` | Elicitação de negócio (interview) | — |
| 2 | `@pm` | docs/prd.md | 1a + 1b |
| 3a | `@po` | docs/stories/ (épicos + stories) | 2 |
| 3b | `@architect` | business-rules.md (produto) | 2 |
| 4 | `@dev` | Revisão técnica de stories (opcional) | 3a + 3b |
| 5 | `@architect` | AGENTS.md — Nível 2 | 4 (ou 3a se 4 pulada) |

**Fases 1a e 1b** rodam em **paralelo** (sem dependências entre si).  
**Fases 3a e 3b** rodam em **paralelo** (ambas dependem apenas da fase 2).

## Escopo parcial

| Parâmetro | Fases executadas |
|-----------|-----------------|
| `--scope technical` | Apenas fase 1a (@architect) |
| `--scope prd` | Fase 2 (@pm) — requer fase 1a + 1b prontas |
| `--scope stories` | Fase 3a (@po) — requer fase 2 pronta |
| `--scope all` | Todas as fases na ordem correta |

## Outputs esperados

```
docs/
├── prd.md
├── architecture.md
├── framework/tech-stack.md
├── framework/source-tree.md
├── framework/coding-standards.md
├── architecture/business-rules.md
├── architecture/design.md
├── architecture/enums.md
├── architecture/integrations.md
├── architecture/setup.md
├── architecture/concerns.md
└── stories/epic-NNN/story-N.M.titulo.md

AGENTS.md — Nível 2 atualizado
```

## Instruções por fase

### Fase 1a — @architect (scope: technical)

Analisar o codebase e preencher os docs técnicos:

1. **Fontes a ler:** `package.json`, `docker-compose.yml`, `.env.example`,
   estrutura de pastas, entry points, arquivos de configuração, CI/CD
2. **docs/framework/tech-stack.md** — runtime, versões, ORM, banco, build tools
3. **docs/framework/source-tree.md** — árvore real de módulos com responsabilidades
4. **docs/framework/coding-standards.md** — naming, tipagem, estrutura de testes, imports
5. **docs/architecture.md** — tipo de arquitetura, camadas, fluxo de request
6. **docs/architecture/design.md** — camadas e deps, templates por camada, anti-padrões
7. **docs/architecture/enums.md** — todos os enums/constantes com valores e localização
8. **docs/architecture/integrations.md** — serviços externos, tipo, autenticação (sem credenciais)
9. **docs/architecture/setup.md** — setup local, variáveis obrigatórias, comandos de banco
10. **docs/architecture/business-rules.md** — regras técnicas do código;
    seção "Regras de Produto" deixar com nota: "A validar com PM/PO — Fase 3b"
11. **docs/architecture/concerns.md** — tech debt, riscos e gaps com evidência (paths); se `tlc_spec_driven.enabled`, seguir `.aiox-core/skills/tlc-spec-driven/references/concerns.md`

**Regra:** substituir hints `_(...)_` pelo conteúdo real. Se sem evidência: `A definir — [razão]`.

---

### Fase 1b — @analyst (scope: elicitation)

Conduzir sessão de elicitação com o usuário:

- Objetivo do produto, personas, funcionalidades existentes
- Regras de negócio que o código não revela
- Roadmap / features planejadas, documentação existente
- Salvar em: `docs/_business-discovery.md` (artefato interno)

---

### Fase 2 — @pm (scope: prd)

Ler `docs/architecture.md` + `docs/_business-discovery.md` e preencher `docs/prd.md`:
- Objetivo, personas, funcionalidades por épico, roadmap
- Não duplicar conteúdo técnico já em `docs/architecture/`

---

### Fase 3a — @po (scope: stories)

Ler `docs/prd.md` e criar estrutura de stories:
1. Propor mapeamento de épicos → aguardar confirmação do usuário
2. Criar `docs/stories/epic-NNN/` com épico e story stubs
3. Stories existentes: status `done` | Stories sugeridas: status `draft`
4. ACs baseados em comportamento real do código — não inventar

---

### Fase 3b — @architect (scope: business-rules)

Ler `docs/prd.md` + `docs/_business-discovery.md` e complementar
`docs/architecture/business-rules.md` com as regras de produto elicitadas.

---

### Fase 4 — @dev (scope: dev-review, opcional)

Revisar stories criadas pelo @po:
- Viabilidade técnica dos ACs com a stack atual
- Dependências entre stories não mapeadas
- Complexidade estimada: Simples / Médio / Complexo
- Salvar em: `docs/stories/_dev-review.md` (artefato interno)

---

### Fase 5 — @architect (scope: agents-md)

Atualizar `AGENTS.md` — seção Nível 2 (fora dos blocos AIOX-MANAGED):
- Tabela: Domínio → Keywords reais → Doc a carregar
- Atualizar "Última revisão" no cabeçalho
- Nunca editar blocos `<!-- AIOX-MANAGED-START/END -->`

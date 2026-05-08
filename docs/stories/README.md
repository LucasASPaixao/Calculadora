# Stories

> **Dono:** `@sm` / `@po`  
> **Última revisão:** 2026-05-08  
> Unidades de trabalho no padrão AIOX: arquivos em `docs/stories/`, com subpastas por épico.

## Índice de épicos

| Epic | Nome | Status | Stories |
|------|------|--------|---------|
| [Epic-001](epic-001/epic-001.md) | Calculadora Básica — MVP | ✅ Concluído | 4 stories |

## Convenção de arquivos

```
docs/stories/
└── epic-001/
    ├── epic-001.md                  ← visão do épico
    ├── story-1.1.layout-html.md
    ├── story-1.2.estilizacao.md
    ├── story-1.3.logica-calculadora.md
    └── story-1.4.suporte-teclado.md
```

- Use **`docs/stories/{storyId}/story.yaml`** quando o fluxo do projeto exigir (gates do `@dev *develop`).
- Não altere `devStoryLocation` em `core-config.yaml` sem revisar os gates em `.aiox-core/development/tasks/`.

## Status de story (padrão AIOX)

| Status | Significado |
|--------|------------|
| `draft` | Rascunho — aguardando refinamento |
| `approved` | Aprovada pelo PO — pronta para desenvolvimento |
| `in-progress` | Em desenvolvimento |
| `done` | Implementada e verificada |

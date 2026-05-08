# Stories

> **Dono:** `@sm` / `@po`  
> Unidades de trabalho no padrão AIOX: arquivos em `docs/stories/`, com subpastas por épico quando fizer sentido.

## Convenção recomendada

```
docs/stories/
└── epic-001/
    ├── epic-001.md           ← visão do épico (opcional)
    └── story-1.1.titulo.md   ← story no formato N.M
```

- Use **`docs/stories/{storyId}/story.yaml`** quando o fluxo do projeto exigir (gates do `@dev *develop`).
- Não altere `devStoryLocation` em `core-config.yaml` sem revisar os gates em `.aiox-core/development/tasks/`.

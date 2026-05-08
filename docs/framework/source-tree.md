# Source tree — mapa de módulos

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

## Estrutura de diretórios

```
Calculadora/
├── index.html                  ← Entry point único — estrutura HTML + ARIA markup
├── assets/
│   ├── js/
│   │   └── calculator.js       ← Toda a lógica: estado, ações, evaluação, eventos
│   └── css/
│       └── styles.css          ← Layout Grid 4 colunas, tema escuro, responsividade
├── package.json                ← Apenas `serve` como devDependency
├── README.md                   ← Visão geral, como rodar, decisões técnicas
├── PRD.md                      ← (raiz) Product Requirements Document legado
├── RESEARCH_BRIEF.md           ← (raiz) Briefing de pesquisa legado
├── SPECS.md                    ← (raiz) Especificações técnicas legado
├── AGENTS.md                   ← Instruções para agentes de IA (AIOX)
├── docs/                       ← Documentação AIOX (padrão do projeto)
│   ├── prd.md
│   ├── architecture.md
│   ├── framework/              ← Carregados sempre pelo @dev
│   │   ├── tech-stack.md
│   │   ├── source-tree.md
│   │   └── coding-standards.md
│   ├── architecture/
│   │   ├── design.md
│   │   ├── business-rules.md
│   │   ├── enums.md
│   │   ├── integrations.md
│   │   ├── setup.md
│   │   └── concerns.md
│   └── stories/
│       └── epic-001/           ← Stories do MVP da calculadora
└── .aiox-core/                 ← Framework AIOX (não editar manualmente)
```

## Responsabilidade de cada arquivo principal

| Arquivo | Responsabilidade |
|---------|-----------------|
| `index.html` | Estrutura semântica da UI (seção `display` + seção `keys`). Atributos `data-action` e `data-value` nos botões são o contrato entre HTML e JS. |
| `assets/js/calculator.js` | Estado centralizado (`calculatorState`), todas as ações (digit, operator, decimal, clear, delete, equals), avaliação ao vivo e final, event listeners (click + keydown). |
| `assets/css/styles.css` | Grid 4 colunas para teclado, Flexbox para display, tema escuro (`#0d1017` background), classes de variante (`.key-operator`, `.key-control`, `.key-equals`, `.key-zero`). |

## Fluxo de um evento de botão

```
Usuário clica botão
    └─> keysContainer (event delegation via 'click')
        └─> handleButtonClick()
            └─> lê data-action do target
                └─> chama função de ação (appendDigit / appendOperator / etc.)
                    └─> atualiza calculatorState
                        └─> evaluateExpressionLive() ou updateDisplays()
                            └─> atualiza DOM (expressionDisplay, resultDisplay)
```

## Fluxo de um evento de teclado

```
Usuário pressiona tecla
    └─> document (keydown)
        └─> handleKeyDown()
            └─> mapeamento de key → função de ação
```

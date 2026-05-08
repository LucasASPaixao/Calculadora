# Arquitetura do projeto

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

## Visão geral

**Calculadora Web** é uma SPA estática (Single-Page Application) sem framework e sem servidor de aplicação. Todo o processamento ocorre no navegador do usuário. A arquitetura segue o modelo clássico de separação de camadas HTML/CSS/JS aplicado a uma UI orientada a eventos.

```
┌──────────────────────────────────────────────┐
│                  NAVEGADOR                   │
│  ┌────────────┐  ┌──────────┐  ┌──────────┐ │
│  │  index.html│  │styles.css│  │calc.js   │ │
│  │ (estrutura)│  │(visual)  │  │(lógica)  │ │
│  └─────┬──────┘  └──────────┘  └────┬─────┘ │
│        │  DOM events                │        │
│        └────────────────────────────┘        │
│                  ↕ DOM API                   │
└──────────────────────────────────────────────┘
```

## Estilo arquitetural

**Event-driven UI com estado centralizado.**

- Não há framework MVC/MVVM — o estado vive em um objeto literal (`calculatorState`) e as funções o mutam diretamente
- A UI é atualizada de forma imperativa via `updateDisplays()` após cada ação
- Event delegation minimiza a quantidade de listeners registrados

## Componentes principais

| Componente | Arquivo | Papel |
|------------|---------|-------|
| UI Structure | `index.html` | Define display (expressão + resultado) e grid de botões; contrato via `data-action`/`data-value` |
| State + Logic | `assets/js/calculator.js` | Estado, ações, avaliação de expressão, event handlers |
| Presentation | `assets/css/styles.css` | Layout, tema escuro, responsividade |
| Dev server | `serve` (npm) | Serve arquivos estáticos localmente |

## Decisões relevantes

| Decisão | Motivo |
|---------|--------|
| Vanilla JS (sem framework) | Projeto educacional/portfólio — zero overhead, máximo aprendizado de fundamentos |
| `new Function()` para avaliar expressão | Permite expressões matemáticas em texto sem parser dedicado; mitigado por sanitização de caracteres |
| Event delegation em `.keys` | Evita N listeners nos N botões; facilita adição de novos botões sem re-registrar eventos |
| Dois visores (expressão + resultado) | UX: usuário vê a expressão completa enquanto digita e o resultado parcial em tempo real |
| `toFixed(8)` no resultado | Limita imprecisão de ponto flutuante sem arredondar valores inteiros visualmente |
| Zero build step | Compatibilidade máxima com qualquer host estático; sem toolchain para manter |

## Fluxo de dados

```
Input (click/keydown)
    → identificação da ação (data-action ou key)
        → mutação de calculatorState
            → (re)avaliação da expressão via new Function()
                → atualização do DOM (textContent dos displays)
```

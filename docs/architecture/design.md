# Design de implementação

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

## Camadas e dependências

```
┌─────────────────────────────────────────────┐
│  Presentation (HTML + CSS)                  │
│  index.html + assets/css/styles.css         │
│  → Define estrutura e aparência             │
│  → Expõe contrato: data-action, data-value  │
└───────────────────┬─────────────────────────┘
                    │ DOM API (getElementById, querySelector,
                    │ addEventListener, textContent)
┌───────────────────▼─────────────────────────┐
│  Application Logic (JS)                     │
│  assets/js/calculator.js                    │
│  → Estado: calculatorState {}               │
│  → Ações: appendDigit, appendOperator, …    │
│  → Avaliação: evaluateExpressionLive/Final  │
│  → Handlers: handleButtonClick, handleKeyDown│
└─────────────────────────────────────────────┘
```

Não há camada de dados separada — a persistência existe apenas em memória durante a sessão.

## Padrões de implementação

### Estado centralizado (objeto literal)

```js
// ver assets/js/calculator.js — linha 1
const calculatorState = {
  currentExpression: "",
  currentResult: "0",
  lastActionWasEquals: false,
};
```

Toda mutação de estado ocorre dentro das funções de ação. Nunca ler/escrever `calculatorState` diretamente no DOM.

### Separação de avaliação ao vivo × final

| Função | Quando | Comportamento em erro |
|--------|--------|-----------------------|
| `evaluateExpressionLive()` | A cada keystroke | Silencia erro — mantém display em branco |
| `evaluateFinal()` | Ao pressionar `=` / `Enter` | Exibe "Erro" e seta `lastActionWasEquals = true` |

### Guard de operador duplicado

```js
// ver canAppendOperator() em calculator.js
// Substitui o último operador ao invés de empilhar (ex.: "5*" + "+" → "5+")
```

### Fluxo após "="

```
lastActionWasEquals = true
    ├─ próxima ação: digit   → zera expressão, começa nova (não concatena ao resultado)
    └─ próxima ação: operator → reaproveita currentResult como base da nova expressão
```

## Anti-padrões visíveis (a evitar em novas contribuições)

| Anti-padrão | Onde | Impacto |
|-------------|------|---------|
| `new Function()` sem caixa de areia real | `calculator.js` linha 115 e 144 | Se a sanitização falhar, permite execução de código arbitrário; baixo risco no contexto atual mas seria crítico com input externo |
| Estado global mutável | `calculatorState` | Dificulta testes unitários das funções de ação; refatorar para funções puras que recebem/retornam estado |
| Sem separação de módulos | arquivo único `calculator.js` | À medida que o projeto crescer, considerar módulos ES (`import/export`) ou quebrar em arquivos por responsabilidade |

## Template por camada

### Adicionar nova ação ao teclado

1. **HTML** (`index.html`): adicionar `<button data-action="novaAcao" data-value="...">` na seção `.keys`
2. **JS** (`calculator.js`): adicionar `case "novaAcao":` no switch de `handleButtonClick` + função correspondente
3. **CSS** (`styles.css`): adicionar classe de variante se necessário (ex.: `.key-nova`)
4. **Teclado** (`handleKeyDown`): mapear a tecla correspondente se houver

### Adicionar nova variante visual de botão

1. Criar classe CSS em `styles.css` (ex.: `.key-special { background: #...; }`)
2. Aplicar no botão em `index.html` via `class="key key-special"`

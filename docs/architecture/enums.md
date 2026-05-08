# Enums e constantes de domínio

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

Não há enums formais (TypeScript `enum` ou `Object.freeze`) no projeto. Os valores de domínio são strings literais usadas como contrato entre HTML e JS.

## Ações de botão (`data-action`)

Definidas nos atributos HTML `data-action` e consumidas no `switch` de `handleButtonClick()` em `assets/js/calculator.js`.

| Valor | Botão | Função chamada |
|-------|-------|---------------|
| `"digit"` | 0–9 | `appendDigit(data-value)` |
| `"add"` | `+` | `appendOperator("+")` |
| `"subtract"` | `-` | `appendOperator("-")` |
| `"multiply"` | `*` | `appendOperator("*")` |
| `"divide"` | `/` | `appendOperator("/")` |
| `"decimal"` | `.` | `appendDecimal()` |
| `"clear"` | `C` | `clearAll()` |
| `"delete"` | `DEL` | `deleteLast()` |
| `"equals"` | `=` | `evaluateFinal()` |

## Teclas do teclado (`handleKeyDown`)

Definidas em `assets/js/calculator.js` na função `handleKeyDown`.

| Tecla | Ação equivalente |
|-------|-----------------|
| `0`–`9` | `appendDigit(key)` |
| `+` `-` `*` `/` | `appendOperator(key)` |
| `.` `,` | `appendDecimal()` (vírgula prevenida com `preventDefault`) |
| `Enter` `=` | `evaluateFinal()` |
| `Backspace` | `deleteLast()` |
| `Escape` | `clearAll()` |

## Propriedades do estado (`calculatorState`)

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `currentExpression` | `string` | Expressão em construção (ex.: `"3+5*2"`) |
| `currentResult` | `string` | Resultado parcial ou final (default `"0"`) |
| `lastActionWasEquals` | `boolean` | Flag que muda o comportamento do próximo input após `=` |

## Classes CSS de variante de botão

| Classe | Aplicada a | Cor de fundo |
|--------|-----------|--------------|
| `.key` | Todos os botões (base) | `#1f2933` |
| `.key-operator` | `+` `-` `*` `/` | `#4338ca` (indigo) |
| `.key-control` | `C` `DEL` | `#374151` (gray) |
| `.key-equals` | `=` | `#10b981` (emerald) |
| `.key-zero` | `0` | Base + `grid-column: span 2` |
| `.key-spacer` | Espaçador visual | `visibility: hidden` |

# Regras de negócio

> **Dono:** `@architect` (parte técnica) + `@pm`/`@po` (parte de produto)  
> **Última revisão:** 2026-05-08

## Regras de Código (extraídas do codebase)

| # | Regra | Onde no código | Quando se aplica |
|---|-------|---------------|-----------------|
| R01 | Operador no início da expressão: apenas `-` é permitido (para número negativo). Outros operadores são ignorados. | `canAppendOperator()` em `calculator.js` | Ao pressionar operador com expressão vazia |
| R02 | Operador duplicado: se o último caractere já for um operador, substitui pelo novo (ex.: `5*` + `+` → `5+`). | `canAppendOperator()` em `calculator.js` | Ao pressionar operador após outro operador |
| R03 | Ponto decimal: apenas um ponto permitido por número. Se o número corrente já tem `.`, o input de `.` é ignorado. | `appendDecimal()` em `calculator.js` | Ao pressionar `.` |
| R04 | Expressão vazia + `.`: autocompleta para `0.` antes de prosseguir. | `appendDecimal()` em `calculator.js` | `.` pressionado com expressão vazia |
| R05 | Após `=` + dígito: inicia nova expressão (não concatena ao resultado anterior). | `appendDigit()` em `calculator.js` | Primeiro dígito após `=` |
| R06 | Após `=` + operador: reaproveita o resultado atual como base da nova expressão. | `appendOperator()` em `calculator.js` | Primeiro operador após `=` |
| R07 | Avaliação ao vivo: a cada keystroke, a expressão é avaliada e o resultado parcial é exibido. Erros intermediários são silenciados (display fica vazio). | `evaluateExpressionLive()` em `calculator.js` | A cada ação de entrada |
| R08 | Avaliação final (`=`): erros de parse ou resultado não-finito exibem `"Erro"` no visor de resultado. | `evaluateFinal()` em `calculator.js` | Ao pressionar `=` ou `Enter` |
| R09 | Formatação de resultado: limitado a 8 casas decimais via `toFixed(8)`, depois convertido para string (remove zeros à direita). | `evaluateExpressionLive()` e `evaluateFinal()` | Resultado de ponto flutuante |
| R10 | Divisão por zero: resulta em `Infinity` (comportamento nativo do JS) — não exibe mensagem específica. | `evaluateFinal()` em `calculator.js` | `x / 0` |
| R11 | Sanitização de expressão: apenas caracteres `[0-9+\-*/.() ]` são permitidos — outros são removidos antes da avaliação. | `sanitizeExpression()` em `calculator.js` | Antes de cada avaliação |
| R12 | DEL: apaga apenas o último caractere da expressão. Se a expressão estiver vazia, não faz nada. | `deleteLast()` em `calculator.js` | Ao pressionar `DEL` ou `Backspace` |
| R13 | C (Clear): zera expressão, resultado e flag `lastActionWasEquals`. | `clearAll()` em `calculator.js` | Ao pressionar `C` ou `Escape` |

## Regras de Produto (elicitadas)

| # | Regra | Fonte | Impacto |
|---|-------|-------|---------|
| P01 | A calculadora deve suportar as 4 operações básicas: adição, subtração, multiplicação e divisão. | README + produto | Define o escopo funcional mínimo |
| P02 | O visor superior exibe a expressão completa; o visor inferior exibe o resultado em tempo real. | README + produto | Padrão de UX diferenciador (dois visores) |
| P03 | Suporte a números negativos (operador `-` no início). | README + produto | Usabilidade básica |
| P04 | Suporte completo a teclado (dígitos, operadores, Enter, Backspace, Escape). | README + produto | Acessibilidade e usabilidade |

## A Validar

| Item | Responsável | Observação |
|------|-------------|------------|
| Comportamento esperado para divisão por zero (`Infinity` vs mensagem amigável) | `@po` / stakeholder | README menciona como melhoria futura |
| Suporte a parênteses (já parcialmente funcional via sanitização) | `@po` / stakeholder | Regex permite `()` mas não há botão na UI |
| Persistência de histórico de cálculos | `@po` / stakeholder | Não implementado |

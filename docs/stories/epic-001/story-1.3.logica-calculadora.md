# Story 1.3 — Lógica de estado e operações

> **ID:** 1.3  
> **Epic:** Epic-001 — Calculadora Básica (MVP)  
> **Status:** ✅ done  
> **Dono:** `@dev`

## Descrição

Como usuário, quero realizar cálculos com as quatro operações básicas, vendo a expressão completa enquanto digito e o resultado parcial em tempo real, para que eu possa verificar o que estou calculando antes de confirmar.

## Acceptance Criteria

- [x] Clicar em dígitos (0–9) acrescenta à expressão e atualiza o resultado ao vivo
- [x] Clicar em operador (`+`, `-`, `*`, `/`) acrescenta à expressão; substitui o último operador se o anterior também for um operador
- [x] Operador `-` pode ser o primeiro caractere (número negativo)
- [x] Clicar em `.` adiciona ponto decimal; apenas um por número
- [x] Expressão vazia + `.` gera `"0."`
- [x] `C` limpa expressão, resultado e estado de `lastActionWasEquals`
- [x] `DEL` apaga o último caractere; não faz nada se a expressão estiver vazia
- [x] `=` finaliza: limpa expressão, mantém resultado, define `lastActionWasEquals = true`
- [x] Após `=` + dígito: nova expressão (não concatena ao resultado)
- [x] Após `=` + operador: continua a partir do resultado
- [x] Resultado em tempo real: expressão inválida/incompleta → display de resultado em branco (não quebra a UI)
- [x] Resultado final com erro (divisão por zero, expressão inválida) → exibe `"Erro"`
- [x] Resultado limitado a 8 casas decimais
- [x] Sanitização antes de avaliar: apenas `[0-9+\-*/.() ]` permitidos

## Arquivos relevantes

- `assets/js/calculator.js` — implementação completa (funções: `appendDigit`, `appendOperator`, `appendDecimal`, `deleteLast`, `clearAll`, `evaluateExpressionLive`, `evaluateFinal`, `sanitizeExpression`, `canAppendOperator`, `updateDisplays`)

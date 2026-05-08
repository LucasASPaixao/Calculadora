# Concerns e riscos do codebase

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08  
> Documento vivo. Atualizar ao descobrir novos problemas ou resolver existentes.

## Tech debt

| Item | Arquivo | Impacto | Prioridade |
|------|---------|---------|------------|
| Estado global mutável — `calculatorState` não é encapsulado; funções o mutam diretamente | `assets/js/calculator.js` linha 1–5 | Dificulta testes unitários das funções de ação | Média |
| Arquivo JS único monolítico | `assets/js/calculator.js` (241 linhas) | À medida que novas features forem adicionadas, ficará difícil de manter | Baixa (escopo atual) |
| Sem módulos ES | `index.html` carrega script global | Sem tree-shaking, sem lazy-loading (irrelevante no escopo atual, relevante se app crescer) | Baixa |
| `npm test` não funciona | `package.json` script test | Zero cobertura de testes automatizados | Alta |

## Bugs conhecidos

| Sintoma | Reprodução | Arquivo |
|---------|-----------|---------|
| Divisão por zero retorna `Infinity` sem mensagem amigável | Digitar `5 / 0 =` | `calculator.js` `evaluateFinal()` — `Number.isFinite(Infinity)` é `false`, logo cai no `else → "Erro"`. Na prática retorna "Erro", mas sem contexto específico. |

> **Atualização:** ao testar, `5 / 0` resulta em `Infinity` no visor ao vivo e `"Erro"` ao pressionar `=` (pois `isFinite(Infinity) === false`). Comportamento é aceitável mas pode confundir o usuário.

## Riscos de segurança

| Risco | Severidade | Mitigação atual | Mitigação recomendada |
|-------|-----------|----------------|----------------------|
| `new Function()` para avaliação de expressão — equivalente a `eval` | **Alta** (em contexto de input externo) | `sanitizeExpression()` permite apenas `[0-9+\-*/.() ]` | No contexto atual (input apenas via botões/teclado mapeados), o risco é baixo. Se houver input livre (ex.: campo de texto), implementar parser matemático dedicado (ex.: `math.js`) |

## Gargalos de performance

Não identificados. A aplicação é trivialmente pequena (< 250 linhas JS, < 150 linhas CSS). Qualquer dispositivo moderno executa sem impacto.

## Áreas frágeis

| Área | O que pode quebrar | Como alterar com segurança |
|------|--------------------|---------------------------|
| Contrato `data-action` (HTML ↔ JS) | Renomear um valor de `data-action` no HTML sem atualizar o `switch` no JS quebra silenciosamente a ação | Sempre alterar HTML e JS em conjunto; adicionar caso `default` com log para ações desconhecidas |
| `sanitizeExpression()` regex | Ampliar os caracteres permitidos sem validar o impacto na segurança | Revisar a regra R11 em `business-rules.md` antes de alterar |
| `lastActionWasEquals` flag | Lógica sensível a ordem de operações — testar todos os cenários de continuação após `=` ao modificar | Adicionar testes unitários para `appendDigit` e `appendOperator` nos cenários pós-`=` |

## Limites de escalabilidade

O projeto é intencional como MVP de calculadora básica. Limites atuais:

| Limite | Impacto |
|--------|---------|
| Sem persistência (sessionStorage/localStorage) | Recarregar a página limpa o estado |
| Sem histórico de cálculos | Um cálculo por vez |
| Sem suporte a funções matemáticas (sen, cos, log, etc.) | Escopo propositalmente limitado |

## Dependências em risco

| Pacote | Risco | Observação |
|--------|-------|------------|
| `serve@^14.2.6` | Baixo | Apenas devDep; não afeta produção |

## Gaps de cobertura de testes

**100% de cobertura ausente** — não há nenhum teste automatizado.

Caminhos críticos sem cobertura:

| Função | Cenários críticos sem teste |
|--------|---------------------------|
| `sanitizeExpression()` | Input com scripts maliciosos, caracteres unicode |
| `canAppendOperator()` | Operador duplicado, operador no início |
| `appendDecimal()` | Múltiplos pontos, expressão vazia |
| `evaluateExpressionLive()` | Expressão incompleta, resultado `Infinity`, resultado negativo |
| `evaluateFinal()` | Divisão por zero, expressão vazia, continuação após `=` |
| `handleKeyDown()` | Teclas não mapeadas (devem ser ignoradas) |

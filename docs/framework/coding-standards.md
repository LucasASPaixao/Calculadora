# Coding standards

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

## Linguagem e sintaxe

- **JavaScript ES2020+** — vanilla, sem transpilação (Babel, tsc, etc.)
- Sem módulos ES (`import/export`) — scripts carregados diretamente via `<script src>` no HTML
- Sem classes — preferência por funções e objetos literais
- `const` por padrão; `let` apenas quando reatribuição é necessária; jamais `var`

## Nomenclatura

| Contexto | Convenção | Exemplo |
|----------|-----------|---------|
| Variáveis e funções | `camelCase` | `calculatorState`, `appendDigit` |
| Constantes de valor fixo | `camelCase` (não há enums formais) | `expressionDisplay` |
| Seletores de DOM | `camelCase` (const) | `keysContainer` |
| Classes CSS | `kebab-case` | `.key-operator`, `.display-top` |
| Atributos HTML de contrato | `kebab-case` | `data-action`, `data-value` |

## Estrutura de funções

- **Funções pequenas e com uma responsabilidade** — ver `appendDigit`, `appendOperator`, `appendDecimal`, `deleteLast`, `clearAll`, `evaluateExpressionLive`, `evaluateFinal`
- **Estado centralizado** em objeto literal `calculatorState`; funções lêem/escrevem nele diretamente (sem getter/setter formal)
- Funções que modificam estado sempre terminam chamando `updateDisplays()` ou `evaluateExpressionLive()` (que chama `updateDisplays()`)

## Event handling

- **Event delegation** — listener único em `.keys` (container), não em cada botão individual
- Contrato HTML → JS via `data-action` (tipo de ação) e `data-value` (valor para dígitos)
- Teclado: listener em `document` para capturar globalmente

## Avaliação de expressões

- Usa `new Function(\`return \${sanitized}\`)` — equivalente a `eval` mas escoped
- **Sempre precedido de `sanitizeExpression()`** que permite apenas `[0-9+\-*/.() ]`
- Resultado formatado com `Number(value.toFixed(8)).toString()` — limita casas decimais sem arredondar visualmente valores inteiros
- Erros de parse (expressão incompleta) são capturados silenciosamente no catch — não quebram a UI

## CSS

- **Grid** para o teclado (`grid-template-columns: repeat(4, 1fr)`)
- **Flexbox** para o display e para centralizar a calculadora na página
- Unidades relativas: `rem` para espaçamentos e fontes
- Sem variáveis CSS (`custom properties`) por ora
- Media query única: `@media (max-width: 400px)` para ajuste em telas pequenas

## HTML / Acessibilidade

- `lang="pt-BR"` no `<html>`
- `aria-label` em elementos interativos e regiões
- `aria-live="polite"` no visor de resultado para leitores de tela
- Botões com `type="button"` explícito (evita submit acidental em formulário)

## O que NÃO usar

- ❌ `var`
- ❌ `eval()` diretamente (usar `new Function` com sanitização)
- ❌ `innerHTML` para conteúdo de usuário (usar `textContent`)
- ❌ Frameworks ou libs externas sem aprovação explícita no `tech-stack.md`
- ❌ `document.write()`

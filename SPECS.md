# Specs Técnicas – Calculadora Web

## 1. Stack e arquitetura

- **Frontend only**:
  - HTML5
  - CSS3
  - JavaScript puro (ES6+)
- **Sem dependências externas** (frameworks ou bibliotecas) por padrão.
- Estrutura de pastas sugerida (poderá ser ajustada se solicitado):
  - `index.html`
  - `assets/`
    - `css/`
      - `styles.css`
    - `js/`
      - `calculator.js`

## 2. Estrutura de HTML (alto nível)

- Elementos principais:
  - `main.calculator`
    - `section.display`
      - `div.display-top` – visor superior (expressão)
      - `div.display-bottom` – visor inferior (resultado)
    - `section.keys`
      - Grade de botões (`button`) para dígitos, operações e ações (`C`, `DEL`, `=`).

- Atributos recomendados:
  - `data-key` para identificar o tipo de cada botão (ex.: `data-key="digit-1"`, `data-key="op-plus"`, `data-key="equals"`).
  - IDs ou classes claras para visores (ex.: `id="display-expression"`, `id="display-result"`).

## 3. Comportamento detalhado da lógica

### 3.1. Estado interno

- Objeto de estado (exemplo conceitual):

```text
calculatorState = {
  currentExpression: string,
  currentResult: string | null,
  lastActionWasEquals: boolean
}
```

### 3.2. Fluxo de atualização

- **Entrada de dígitos (0–9)**:
  - Anexar o dígito ao `currentExpression`.
  - Tentar avaliar a expressão resultante:
    - Se válido → atualizar `currentResult`.
    - Se inválido → manter `currentResult` anterior ou `null`.

- **Entrada de operadores (+, -, *, /)**:
  - Validar contexto (ex.: evitar operadores duplicados como `5++`).
  - Permitir `-` como primeiro caractere (para número negativo inicial).
  - Atualizar `currentExpression` e tentar reavaliar, se possível.

- **Botão "." (ponto decimal, se incluído)**:
  - Garantir que não sejam inseridos múltiplos pontos no mesmo número.

- **Botão "C" (clear)**:
  - Zera `currentExpression`, `currentResult` e `lastActionWasEquals`.

- **Botão "DEL" (backspace)**:
  - Remove o último caractere de `currentExpression`.
  - Reavalia a expressão se ainda restar conteúdo.

- **Botão "="**:
  - Avalia a expressão atual (se válida).
  - Atualiza `currentResult` com o valor final.
  - Limpa `currentExpression`.
  - Seta `lastActionWasEquals = true`.

- **Continuação após "="**:
  - Na próxima entrada:
    - Se for dígito ou operador que indica nova expressão:
      - Copiar `currentResult` para `currentExpression` como base.
      - Anexar o novo símbolo.
      - `lastActionWasEquals = false`.

## 4. Avaliação da expressão

- **Requisito**: apenas operações `+`, `-`, `*`, `/` com números (possivelmente negativos).
- **Opções**:
  - Implementar um parser simples (tokenização + avaliação).
  - Usar `eval` com sanitização rígida e filtragem de caracteres (somente `0-9`, `+`, `-`, `*`, `/`, `.`, parênteses se futuramente usados).
- **Formato de saída**:
  - Trabalhar com `number` internamente.
  - Formatar para string no visor (ex.: limite de casas decimais, arredondamento simples).

## 5. Regras visuais (CSS)

- Layout:
  - `main.calculator` centralizado na tela (flexbox ou grid no body).
  - `section.display` em coluna, com:
    - `display-top` com fonte menor e cor mais suave.
    - `display-bottom` com fonte maior, peso maior, contraste alto.
  - `section.keys` em grade de 4 colunas, com:
    - Tamanho consistente dos botões.
    - Coluna da direita dedicada apenas a operadores e `=`.
    - Layout fixo de linhas:
      - `C`, `DEL`, espaço reservado, `/`
      - `7`, `8`, `9`, `*`
      - `4`, `5`, `6`, `-`
      - `1`, `2`, `3`, `+`
      - `0` (span de 2 colunas), `.`, `=`

- Estilo:
  - Tema básico (claro ou escuro), com cores suaves e bom contraste.
  - Efeito `:active`/`:hover` nos botões.

## 6. Padrões e boas práticas

- **JavaScript**:
  - Funções pequenas: `handleButtonClick`, `appendDigit`, `appendOperator`, `clearAll`, `deleteLast`, `evaluateExpression`, `updateDisplays`, etc.
  - Nenhuma lógica de negócio dentro de listeners diretamente; apenas delegar para funções.
  - Evitar variáveis globais soltas; agrupar estado em um único objeto ou módulo.

- **HTML/CSS**:
  - Sem estilos inline.
  - Uso de classes descritivas.
  - Sem dependência de IDs para tudo; balancear com classes reutilizáveis.

## 7. Testabilidade (conceitual)

- Testes manuais esperados:
  - `2+2=4`, `2+2*3=8`, `-3+5=2`, `-3+5*2=7`, `10/2=5`, continuação `+5=10`.
  - Testar `C` e `DEL` em diferentes momentos.
  - Testar sequência com múltiplos `=` e continuação.

- Extensões futuras:
  - Definir casos de teste específicos para:
    - divisão por zero,
    - limites de dígitos/valor,
    - precisão de ponto flutuante (com arredondamento),
    - uso de teclado físico e foco de acessibilidade.
  - Considerar testes automatizados de funções puras de avaliação e formatação de resultado.

## 8. Considerações de ambiente

- Projeto simples estático, podendo ser servido por qualquer servidor HTTP.
- Mesmo código-base para dev/test/prod; diferenças apenas na forma de servir/implantar.

## 9. Acessibilidade e UX avançada (técnico)

- **Acessibilidade**:
  - Mapear teclas físicas (`0–9`, `+`, `-`, `*`, `/`, `Enter`, `Backspace`) para as mesmas ações dos botões na UI.
  - Marcar o visor de resultado com `aria-live="polite"` para anunciar mudanças sem interromper o usuário.
  - Garantir contraste adequado entre fundo e texto de visores e botões.
- **UX avançada**:
  - Implementar uma estratégia de formatação de resultado (limite de casas decimais e arredondamento).
  - Definir comportamento visual e lógico para divisão por zero e valores fora de faixa (exibir mensagem amigável e impedir propagação de `NaN`).
  - Adicionar modo claro/escuro simples, controlado por classe no `body`.
  - Implementar animações suaves em CSS para cliques de botões e atualização do visor, sem afetar a legibilidade.
  - Prever uma flag de “debug” no código para habilitar logs adicionais sem afetar o ambiente de produção.


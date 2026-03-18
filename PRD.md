# PRD – Calculadora Web de Quatro Operações

## 1. Visão geral do produto

Uma calculadora web, simples e moderna, com:
- Quatro operações básicas: adição (+), subtração (-), multiplicação (*) e divisão (/).
- Suporte a números positivos e negativos.
- Dois visores:
  - **Visor superior (Expressão)**: exibe a expressão completa digitada (ex.: `-3+5*9/2`).
  - **Visor inferior (Resultado)**: exibe o resultado em tempo real da expressão válida.

## 2. Objetivos

- Prover uma experiência de cálculo clara, com visibilidade da expressão e do resultado.
- Mostrar boas práticas de organização de código front-end (HTML/CSS/JS separados).
- Manter a implementação simples e fácil de manter/estender.

## 3. Escopo funcional

### 3.1. Funcionalidades obrigatórias

- **Entrada de dados via UI**:
  - Botões de dígitos: `0–9`.
  - Botões de operação: `+`, `-`, `*`, `/`.
  - Botão de ponto decimal: `.` (se incluirmos suporte a decimais).
  - Botão `C` (clear) para limpar tudo.
  - Botão `DEL` (backspace) para apagar o último caractere.
  - Botão `=` para finalizar o cálculo.

- **Dois visores**:
  - Visor superior:
    - Mostra a expressão que o usuário está montando.
    - Após `=`, é limpo.
  - Visor inferior:
    - Mostra o resultado da expressão atual sempre que a expressão for válida.
    - Após `=`, exibe apenas o resultado final, até que nova entrada seja feita.

- **Comportamento do botão "="**:
  - Avalia a expressão atual do visor superior.
  - Exibe o resultado no visor inferior.
  - Limpa o visor superior.
  - Marca internamente que a última ação foi `=` (para controle de próximo fluxo).

- **Continuação do cálculo após "="**:
  - Se o usuário começar a digitar uma nova operação após `=`:
    - O valor que estava no visor inferior deve ser copiado para o visor superior como base.
    - A nova expressão continua a partir desse valor (ex.: resultado foi `10`, usuário aperta `+ 5`, passa a mostrar no superior `10+5`).

- **Suporte a negativos**:
  - Permitir iniciar a expressão com `-` (ex.: `-3+5`).
  - Permitir uso de negativos após operadores, conforme comportamento definido na lógica de parsing/avaliação.

### 3.2. Funcionalidades fora de escopo (por enquanto)

- Funções científicas (raiz, potência, trigonometria).
- Histórico de múltiplas expressões passadas.
- Suporte a memória (M+, M-, MR, MC).
- Localização/multilíngue.

## 4. Requisitos não-funcionais

- **Tecnologia**:
  - HTML5 para estrutura.
  - CSS3 para estilo (sem frameworks obrigatórios).
  - JavaScript puro para lógica.

- **Performance**:
  - Atualização praticamente instantânea do resultado a cada entrada.
  - Operações restritas às quatro básicas, mantendo a complexidade baixa.

- **Manutenibilidade**:
  - Código modular, com funções pequenas e coesas.
  - Separação clara entre camada de apresentação (HTML/CSS) e lógica (JS).

- **Compatibilidade**:
  - Suporte a navegadores modernos (últimas versões de Chrome, Firefox e Edge).

## 5. UX e UI

- Layout de calculadora tradicional:
  - Dois visores na parte superior.
  - Grade de botões abaixo, organizada de forma familiar, com layout fixo:
    - Linha: `C`, `DEL`, espaço em branco, `/`
    - Linha: `7`, `8`, `9`, `*`
    - Linha: `4`, `5`, `6`, `-`
    - Linha: `1`, `2`, `3`, `+`
    - Linha: `0` (ocupando duas colunas), `.`, `=`
- Diferenciação visual:
  - Visor superior com tipografia menor/mais discreta (histórico de expressão).
  - Visor inferior com tipografia maior e destaque (resultado principal).
- Feedback de interação:
  - Efeito visual de clique nos botões.
  - Estado “focado” ou “pressionado” perceptível.

## 6. Estados e fluxos principais

### 6.1. Estado interno mínimo

- `currentExpression` (string): expressão exibida no visor superior.
- `currentResult` (string/number): resultado exibido no visor inferior.
- `lastActionWasEquals` (boolean): indica se a última ação foi `=`.

### 6.2. Fluxos

- **Fluxo de digitação normal**:
  - Usuário digita dígitos e operadores → `currentExpression` é atualizado.
  - Sempre que a expressão for válida, `currentResult` é recalculado.

- **Fluxo ao pressionar "="**:
  - Expressão é avaliada.
  - `currentResult` recebe o resultado final.
  - `currentExpression` é limpo.
  - `lastActionWasEquals = true`.

- **Fluxo de continuação**:
  - Se `lastActionWasEquals` for `true` e o usuário iniciar nova digitação:
    - `currentExpression` recebe inicialmente o valor de `currentResult`.
    - `lastActionWasEquals = false`.

## 7. Critérios de aceitação

- O usuário consegue:
  - Montar expressões simples com `+`, `-`, `*`, `/`.
  - Ver o resultado sendo atualizado conforme digita.
  - Pressionar `=` e ver o visor superior limpar, mantendo o resultado no inferior.
  - Continuar calculando a partir do resultado anterior.
- Expressões inválidas não travam a UI e não quebram a página.

## 8. Melhorias opcionais (backlog inicial)

- **Acessibilidade**:
  - Uso de teclado físico (números, operadores, Enter, Backspace) como forma alternativa de entrada.
  - Suporte a leitores de tela com uso de `aria-live` no resultado e rótulos apropriados nos botões.
- **Formatação e erros numéricos**:
  - Configuração simples de casas decimais e arredondamento numérico.
  - Tratamento explícito de divisão por zero e limites de valor/dígitos, com mensagens amigáveis na UI.
- **Experiência de interface**:
  - Suporte a modo claro/escuro.
  - Animações sutis em botões/visores (ex.: ao pressionar `=`) sem comprometer performance.
- **Qualidade de engenharia**:
  - Planejamento de testes automatizados para a lógica de cálculo.
  - Modo de debug (flag) para habilitar logs adicionais durante desenvolvimento.

## 9. Riscos e considerações

- Uso de `eval` em JavaScript é arriscado; se for considerado, deve ser restringido e/ou substituído por uma forma mais segura de avaliação de expressão.
- Precisão de ponto flutuante (ex.: `0.1 + 0.2`) precisa ser tratada/formatada para o usuário final (pelo menos no nível básico, com arredondamento).


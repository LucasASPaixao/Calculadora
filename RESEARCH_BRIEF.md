# Research Brief – Calculadora Web de Quatro Operações

## 1. Contexto e problema

Hoje, exemplos de calculadoras na web geralmente:
- São muito simples (apenas resultado final, sem histórico) ou
- São muito complexas (científicas ou cheias de funcionalidades pouco usadas).

Queremos uma calculadora **focada nas quatro operações básicas**, com **dois visores**, que:
- Mostre a expressão completa em tempo real.
- Atualize o resultado enquanto o usuário digita.
- Tenha comportamento consistente e previsível ao usar `=`.

## 2. Objetivo da solução

Criar uma calculadora web que:
- Funcione em qualquer navegador moderno (HTML5, CSS3, JavaScript puro).
- Tenha experiência fluida e clara para o usuário comum.
- Sirva como base didática e de demonstração de boas práticas de organização front-end.

## 3. Usuários-alvo

- **Estudantes**: que precisam visualizar passo a passo expressões aritméticas.
- **Usuário comum**: que precisa de uma calculadora simples, mas com histórico curto.
- **Desenvolvedores/juniores**: que podem usar o projeto como referência de boas práticas.

## 4. Análise de soluções existentes (benchmark leve)

- **Calculadora nativa do sistema**: geralmente ótima UX, mas sem visibilidade de expressão completa em todas as plataformas.
- **Calculadoras web simples**: muitas atualizam apenas após pressionar `=`, sem “preview” de resultado.
- **Calculadoras científicas online**: excesso de funcionalidades para o caso de uso simples.

O diferencial proposto:
- Dois visores bem definidos (expressão e resultado).
- Atualização contínua do resultado enquanto o usuário monta a expressão.
- Fluxo claro depois de `=` (resultado permanece, expressão some, e o resultado pode ser reusado).
- Layout de teclado numérico inspirado na calculadora padrão (7–8–9 /, 4–5–6 *, 1–2–3 -, 0 . =).

## 5. Hipóteses de valor

- H1: Ver a expressão completa reduz erros de digitação e melhora a confiança do usuário.
- H2: Ver o resultado em tempo real torna a experiência mais rápida e intuitiva.
- H3: Um layout limpo e responsivo aumenta a adoção em dispositivos móveis.

## 6. Restrições e não-objetivos

- Não é objetivo implementar funções científicas (raiz, potências, seno etc.).
- Não é objetivo implementar histórico longo de múltiplos cálculos.
- Não serão usadas bibliotecas externas de UI ou de cálculo, salvo solicitação explícita.

## 7. Métricas de sucesso (qualitativas)

- Facilidade de entendimento da interface sem tutorial.
- Ausência de travamentos/erros visíveis durante digitação de expressões simples.
- Clareza do comportamento ao pressionar `=` e continuar calculando.

## 8. Direções futuras e diferenciais adicionais

- **Acessibilidade**:
  - Suporte completo a teclado físico (números, operadores, Enter, Backspace).
  - Uso de regiões com `aria-live` para o visor de resultado e rótulos acessíveis nos botões.
- **Qualidade numérica**:
  - Regras claras de formatação (limite de casas decimais, arredondamento amigável).
  - Comportamento definido para divisão por zero e limites de valor/dígitos.
- **Experiência de uso avançada**:
  - Modo claro/escuro simples.
  - Animações sutis em botões e visores para reforçar interação e conclusão de cálculo.
- **Qualidade de engenharia**:
  - Planejamento de testes automatizados para a lógica de expressão.
  - Possível modo de “debug” com logs controlados por flag para auxiliar evolução.


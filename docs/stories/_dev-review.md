# Dev Technical Review — Stories

> Data: 2026-05-08  
> Revisado por: @dev  
> ⚠️ Artefato interno — pode ser removido após AGENTS.md estar atualizado.

## Stories Aprovadas sem Ressalvas

- **1.1** — Layout e estrutura HTML: ACs totalmente atendidos; `index.html` conforme
- **1.2** — Estilização: ACs totalmente atendidos; `styles.css` conforme
- **1.3** — Lógica de estado e operações: ACs atendidos; lógica em `calculator.js` cobre todos os cenários documentados
- **1.4** — Suporte a teclado: ACs atendidos; `handleKeyDown` mapeia todas as teclas esperadas

## Stories com Observações Técnicas

| Story | Observação | Ação Recomendada |
|-------|------------|------------------|
| 1.3 | `new Function()` para avaliação de expressão — equivalente a `eval`. Sanitização atual (`[0-9+\-*/.() ]`) é adequada para input via botões, mas frágil se a expressão vier de outra fonte | Manter como está; documentar em `concerns.md` (já feito). Se adicionar input de texto livre no futuro, substituir por parser matemático (ex.: `math.js`) |
| 1.3 | `calculatorState` é um objeto global mutável — dificulta testes unitários | Story de refatoração sugerida: funções puras que recebem/retornam estado |
| 1.3 | Divisão por zero: `5/0` ao vivo exibe `Infinity`; ao pressionar `=` exibe `"Erro"` (pois `Infinity` não passa em `Number.isFinite`) — comportamento inconsistente | Criar story no Epic-002 para unificar comportamento com mensagem específica |

## Stories Bloqueadas

Nenhuma.

## Dependências Não Mapeadas

- Story 1.3 e 1.4 compartilham as funções de ação (`appendDigit`, etc.) — são a **mesma camada**, não dependências entre stories separadas. Correto como implementado.

## Sugestão de Ordem de Desenvolvimento (Epic-002)

Para o próximo épico, sugere-se a seguinte ordem:

1. **Testes automatizados** (Vitest) — antes de qualquer refatoração
2. **Divisão por zero** — mensagem específica (baixo risco, cobertura por testes)
3. **Refatoração: funções puras de estado** — requer testes como segurança
4. **Histórico de cálculos** — nova feature, adiciona após estabilização
5. **Suporte a parênteses** — botão na UI; lógica já parcialmente suportada

## Estimativa de Complexidade das Stories do Epic-001

| Story | Complexidade | Justificativa |
|-------|-------------|--------------|
| 1.1 | Simples | HTML estrutural puro |
| 1.2 | Simples | CSS declarativo; grid e flexbox padrão |
| 1.3 | Médio | Múltiplos casos de borda de estado; avaliação de expressão |
| 1.4 | Simples | Mapeamento de teclas para funções existentes |

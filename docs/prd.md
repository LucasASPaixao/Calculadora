# Product Requirements Document (PRD)

> **Dono:** `@pm`  
> **Última revisão:** 2026-05-08  
> **Status:** Preenchido — baseado na análise técnica (@architect, fase 1a) e discovery de negócio (@analyst, fase 1b)

## Objetivos

Disponibilizar uma **calculadora de quatro operações** (+ - * /) moderna e acessível, executada integralmente no navegador, sem instalação ou backend. O produto serve dois públicos: usuários que precisam calcular rapidamente e desenvolvedores/recrutadores que avaliam o código como portfólio.

**Resultado desejado:** interface limpa, responsiva, com suporte a teclado e dois visores (expressão + resultado em tempo real) — diferencial de UX em relação a calculadoras online comuns.

## Personas

| Persona | Contexto | Objetivo Principal | Critério de sucesso |
|---------|---------|-------------------|---------------------|
| **Usuário casual** | Acessa pelo navegador no desktop ou mobile | Calcular rapidamente sem fricção | Operação completa em < 5 cliques/toques, resultado correto imediato |
| **Desenvolvedor / recrutador** | Avalia o código do portfólio | Verificar qualidade técnica e boas práticas | Código legível, bem documentado, sem framework desnecessário |

## Requisitos funcionais

### RF-01 — Quatro operações básicas
A calculadora deve suportar adição (`+`), subtração (`-`), multiplicação (`*`) e divisão (`/`).

### RF-02 — Dois visores
- **Visor superior:** exibe a expressão completa conforme o usuário digita (ex.: `-3+5*9/2`)
- **Visor inferior:** exibe o resultado calculado em tempo real enquanto a expressão é construída

### RF-03 — Suporte a números negativos
Digitar `-` como primeiro caractere da expressão inicia um número negativo.

### RF-04 — Suporte a números decimais
O botão `.` (ou tecla `.`/`,`) insere ponto decimal. Apenas um ponto por número é permitido.

### RF-05 — Controles de edição
- `C` — limpa tudo (expressão + resultado)
- `DEL` — apaga o último caractere da expressão

### RF-06 — Finalização de cálculo
- Pressionar `=` ou `Enter` finaliza o cálculo:
  - Limpa o visor de expressão
  - Mantém o resultado no visor inferior
- Após `=`: digitar número inicia nova expressão; digitar operador continua a partir do resultado

### RF-07 — Suporte a teclado
- Dígitos `0–9`, operadores `+ - * /`, ponto `.`, vírgula `,`
- `Enter` ou `=` para finalizar
- `Backspace` para apagar
- `Escape` para limpar

### RF-08 — Responsividade
A calculadora deve ser usável em telas a partir de 320px de largura.

## Requisitos não funcionais

| NFR | Descrição | Meta |
|-----|-----------|------|
| Performance | Resposta a input | < 16ms (1 frame a 60fps) — trivial no escopo atual |
| Acessibilidade | ARIA labels em displays e botões, `aria-live` no resultado | WCAG 2.1 AA básico |
| Compatibilidade | Navegadores modernos | Chrome 90+, Firefox 88+, Safari 14+ |
| Zero dependências de runtime | Sem frameworks, sem CDN externo | ✅ atendido |
| Segurança | Input sanitizado antes da avaliação | Regex `[0-9+\-*/.() ]` |

## Épicos

| Epic | Nome | Status | Stories |
|------|------|--------|---------|
| Epic-001 | Calculadora Básica — MVP | ✅ Implementado | ver `docs/stories/epic-001/` |

### Roadmap — próximas features (priorizadas)

| Prioridade | Feature | Referência |
|-----------|---------|-----------|
| Alta | Testes automatizados para funções puras de avaliação | `concerns.md` — gaps de cobertura |
| Alta | Mensagem específica para divisão por zero | `business-rules.md` — R10 |
| Média | Histórico de cálculos (sessionStorage) | A definir — não documentado |
| Baixa | Suporte a parênteses via botão na UI | `business-rules.md` — R11 (regex já permite) |
| Baixa | Tema claro / escuro alternável | A definir — não documentado |
| Baixa | Refinar acessibilidade (navegação por teclado avançada) | README — próximos passos |

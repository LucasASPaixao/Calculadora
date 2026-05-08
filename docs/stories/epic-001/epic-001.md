# Epic 001 — Calculadora Básica (MVP)

> **Status:** ✅ Concluído  
> **Dono:** `@po`  
> **Última revisão:** 2026-05-08

## Visão

Construir uma calculadora web de quatro operações (+, -, *, /) executada integralmente no navegador, com interface moderna, dois visores (expressão + resultado em tempo real), suporte a teclado e responsividade. Sem framework, sem backend, sem dependências de runtime.

## Objetivo de negócio

Demonstrar domínio de HTML5 semântico, CSS3 (Grid/Flexbox, tema escuro) e JavaScript vanilla no contexto de um portfólio profissional, entregando ao mesmo tempo uma ferramenta funcional para o usuário final.

## Stories

| Story ID | Título | Status |
|----------|--------|--------|
| [1.1](story-1.1.layout-html.md) | Layout e estrutura HTML | ✅ done |
| [1.2](story-1.2.estilizacao.md) | Estilização — tema escuro e grid | ✅ done |
| [1.3](story-1.3.logica-calculadora.md) | Lógica de estado e operações | ✅ done |
| [1.4](story-1.4.suporte-teclado.md) | Suporte a teclado | ✅ done |

## Critérios de conclusão do épico

- [x] Quatro operações funcionando via botões
- [x] Dois visores (expressão + resultado ao vivo)
- [x] Suporte a números negativos e decimais
- [x] Controles C e DEL
- [x] Comportamento correto após `=` (continuar ou nova expressão)
- [x] Suporte a teclado (dígitos, operadores, Enter, Backspace, Escape)
- [x] Layout responsivo (≥ 320px)
- [x] ARIA básico para acessibilidade

## Próximo épico sugerido

**Epic-002 — Qualidade e Acessibilidade**
- Testes automatizados (Vitest/Jest)
- Mensagem específica para divisão por zero
- Histórico de cálculos
- Suporte a parênteses via botão

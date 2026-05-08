# Story 1.2 — Estilização — tema escuro e grid

> **ID:** 1.2  
> **Epic:** Epic-001 — Calculadora Básica (MVP)  
> **Status:** ✅ done  
> **Dono:** `@dev`

## Descrição

Como usuário, quero que a calculadora tenha uma aparência moderna com tema escuro e botões bem definidos, para uma experiência visual agradável.

## Acceptance Criteria

- [x] Fundo da página: gradiente radial escuro (`#20242f` → `#0d1017`)
- [x] Container `.calculator`: max-width 360px, centralizado, `border-radius: 1rem`, sombra pronunciada
- [x] Display com fundo preto (`#05060b`), visor superior em cinza claro, visor inferior em branco e maior
- [x] Grade de botões: CSS Grid com 4 colunas iguais e gap de 0.6rem
- [x] Variantes visuais de botão: operadores (indigo `#4338ca`), controles (cinza `#374151`), igual (emerald `#10b981`), zero (span 2 colunas)
- [x] Efeito de pressionar botão: `translateY(1px)` + redução de sombra
- [x] Foco visível via `outline` para acessibilidade
- [x] Media query `@media (max-width: 400px)` para ajuste em telas pequenas

## Arquivos relevantes

- `assets/css/styles.css` — implementação completa

# Story 1.1 — Layout e estrutura HTML

> **ID:** 1.1  
> **Epic:** Epic-001 — Calculadora Básica (MVP)  
> **Status:** ✅ done  
> **Dono:** `@dev`

## Descrição

Como usuário, quero ver a interface da calculadora com display e teclado organizados, para poder interagir com a calculadora de forma intuitiva.

## Acceptance Criteria

- [x] `index.html` renderiza a calculadora centralizada na tela
- [x] Seção `display` contém dois visores: expressão (linha superior) e resultado (linha inferior)
- [x] Seção `keys` contém os botões: `C`, `DEL`, espaçador, `/`, `7`, `8`, `9`, `*`, `4`, `5`, `6`, `-`, `1`, `2`, `3`, `+`, `0` (duplo), `.`, `=`
- [x] Cada botão tem `data-action` e, quando aplicável, `data-value` para identificar a ação
- [x] Marcação ARIA: `aria-label` nas seções e displays; `aria-live="polite"` no visor de resultado
- [x] `lang="pt-BR"` no elemento `<html>`
- [x] Todos os botões têm `type="button"` explícito

## Arquivos relevantes

- `index.html` — implementação completa

# Story 1.4 — Suporte a teclado

> **ID:** 1.4  
> **Epic:** Epic-001 — Calculadora Básica (MVP)  
> **Status:** ✅ done  
> **Dono:** `@dev`

## Descrição

Como usuário, quero usar o teclado físico para operar a calculadora, para que o uso seja mais rápido e natural, especialmente em desktop.

## Acceptance Criteria

- [x] Teclas `0`–`9` adicionam dígitos à expressão
- [x] Teclas `+`, `-`, `*`, `/` adicionam operadores
- [x] Teclas `.` e `,` adicionam ponto decimal (`,` com `preventDefault` para evitar comportamento padrão do OS)
- [x] `Enter` ou `=` finaliza o cálculo (com `preventDefault` para evitar submit de formulário)
- [x] `Backspace` apaga o último caractere
- [x] `Escape` limpa tudo
- [x] Teclas não mapeadas são ignoradas silenciosamente
- [x] Comportamento de teclado é consistente com comportamento dos botões da UI

## Arquivos relevantes

- `assets/js/calculator.js` — função `handleKeyDown` + `document.addEventListener('keydown', handleKeyDown)`

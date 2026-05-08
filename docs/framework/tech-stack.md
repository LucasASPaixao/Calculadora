# Stack tecnológica

> **Dono:** `@architect`  
> **Carregamento:** `devLoadAlwaysFiles` — lista o que é permitido usar.  
> **Última revisão:** 2026-05-08

## Runtime e linguagem

| Item | Detalhe |
|------|---------|
| Linguagem | JavaScript (ES2020+) — vanilla, sem transpilação |
| Ambiente de execução | Navegador (client-side only; zero servidor de aplicação) |
| HTML | HTML5 com semântica ARIA (`aria-label`, `aria-live`) |
| CSS | CSS3 — Grid, Flexbox, custom transitions |

## Frameworks e bibliotecas principais

**Nenhum framework JS** — a aplicação é vanilla puro.

| Dependência | Versão | Papel |
|-------------|--------|-------|
| `serve` (devDep) | `^14.2.6` | Servidor estático local para desenvolvimento |

> Alternativa de dev: `python3 -m http.server 8000`.

## Banco de dados e persistência

Nenhum. A aplicação é **stateless entre sessões** — o estado da calculadora reside apenas em memória JS (objeto `calculatorState`) e é perdido ao recarregar a página.

## Testes e qualidade

| Item | Status |
|------|--------|
| Framework de testes | ❌ Não configurado (`npm test` retorna erro) |
| Linter / Formatter | ❌ Não configurado formalmente (comentário `eslint-disable` no código sugere uso futuro) |
| CI/CD | ❌ Nenhum pipeline configurado |

> Próximo passo recomendado: adicionar Vitest ou Jest para testes das funções puras de avaliação.

## CI/CD e deploy

| Item | Detalhe |
|------|---------|
| Build | Zero-build — arquivos estáticos servidos diretamente |
| Dev server | `npm start` → `serve .` na porta padrão (geralmente 3000) |
| Deploy | A definir — qualquer CDN/static host (GitHub Pages, Netlify, Vercel) é compatível |
| Repositório | [github.com/LucasASPaixao/Calculadora](https://github.com/LucasASPaixao/Calculadora) |

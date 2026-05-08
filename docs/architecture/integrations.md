# Integrações externas

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

## Serviços externos

**Nenhuma integração com serviço externo.**

A aplicação é completamente autossuficiente no navegador — não realiza chamadas HTTP, não consome APIs, não autentica com nenhum provider.

## Dependências de runtime (browser APIs)

| API | Uso | Arquivo |
|-----|-----|---------|
| `document.getElementById` | Selecionar displays por ID | `calculator.js` |
| `document.querySelector` | Selecionar container de teclas | `calculator.js` |
| `addEventListener` | Registrar click e keydown | `calculator.js` |
| `new Function()` | Avaliar expressão matemática | `calculator.js` |
| `Number.isFinite` | Validar resultado | `calculator.js` |
| `Element.textContent` | Atualizar displays no DOM | `calculator.js` |

## Dependências de desenvolvimento

| Dependência | Versão | Uso | Tipo |
|-------------|--------|-----|------|
| `serve` | `^14.2.6` | Servidor estático local (`npm start`) | devDependency |

> **Nota:** `serve` não é usado em produção. Qualquer host de arquivos estáticos substitui.

## Deploy (potencial)

| Plataforma | Compatibilidade | Observação |
|------------|----------------|------------|
| GitHub Pages | ✅ | Deploy direto do repositório |
| Netlify | ✅ | Drag-and-drop ou via Git |
| Vercel | ✅ | Static output |
| AWS S3 + CloudFront | ✅ | Configuração de bucket estático |
| Qualquer CDN/nginx/apache | ✅ | Serve `index.html` na raiz |

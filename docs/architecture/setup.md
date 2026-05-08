# Setup local

> **Dono:** `@architect`  
> **Última revisão:** 2026-05-08

## Pré-requisitos

| Requisito | Versão mínima | Observação |
|-----------|---------------|------------|
| Navegador moderno | Chrome 90+ / Firefox 88+ / Safari 14+ | Qualquer browser com suporte a ES2020 |
| Node.js | 16+ (recomendado LTS 20+) | Necessário apenas para usar `npm start` |
| npm | 8+ | Vem com Node.js |

> **Alternativa sem Node:** Python 3 (`python3 -m http.server 8000`) funciona igualmente para servir os arquivos estáticos.

## Setup — Opção A: npm (recomendado)

```bash
# 1. Clonar o repositório
git clone https://github.com/LucasASPaixao/Calculadora.git
cd Calculadora

# 2. Instalar dependências (apenas serve como devDep)
npm install

# 3. Iniciar servidor local
npm start
```

Acesse a URL exibida no terminal, tipicamente `http://localhost:3000`.

## Setup — Opção B: Python

```bash
# Na pasta do projeto
cd /caminho/para/Calculadora
python3 -m http.server 8000
```

Acesse: `http://localhost:8000`

## Setup — Opção C: abrir direto no navegador

Como não há módulos ES (`import/export`), o `index.html` pode ser aberto diretamente como `file://` no navegador. Funcional para desenvolvimento básico, mas não recomendado (algumas APIs de segurança do browser se comportam diferente com `file://`).

## Variáveis de ambiente

**Nenhuma.** A aplicação não lê variáveis de ambiente — é 100% client-side estático.

## Comandos disponíveis

| Comando | O que faz |
|---------|-----------|
| `npm install` | Instala `serve` (único devDep) |
| `npm start` | Inicia servidor estático local com `serve .` |
| `npm test` | ⚠️ Retorna erro — testes não configurados |

## Verificar que está funcionando

1. Abra o endereço local no navegador
2. O visor deve mostrar `0`
3. Clique em `3`, `+`, `5`, `=` — o resultado deve ser `8`
4. Pressione `Escape` para limpar
5. Teste o teclado físico com dígitos e `Enter`

## Estrutura de portas padrão

| Ferramenta | Porta padrão |
|------------|-------------|
| `serve` | 3000 |
| Python http.server | 8000 |

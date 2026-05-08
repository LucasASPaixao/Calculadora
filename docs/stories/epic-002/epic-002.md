# Epic 002 — Autenticação de Usuário

> **Status:** 🟡 Em andamento  
> **Dono:** `@po`  
> **Última revisão:** 2026-05-08

## Visão

Adicionar uma camada de autenticação ao projeto Calculadora, com tela de login e cadastro (Vanilla JS), API backend em Node.js (Express + JWT) e banco de dados PostgreSQL provisionado via Docker. O frontend e o backend compartilham o mesmo repositório (monorepo).

## Objetivo de negócio

Demonstrar integração full-stack — frontend estático, API REST com autenticação stateless (JWT) e banco relacional — como extensão do portfólio iniciado no Epic-001.

## Stories

| Story ID | Título | Status |
|----------|--------|--------|
| 2.1 | Tela de login e cadastro (Vanilla JS) | ✅ done |
| 2.2 | API de autenticação (Node.js + Express + JWT) | ✅ done |
| 2.3 | Banco de dados PostgreSQL via Docker Compose | ✅ done |

## Critérios de conclusão do épico

- [x] Tela de login com abas Entrar / Criar conta
- [x] Cadastro de usuário com hash bcrypt (10 rounds)
- [x] Login com validação de credenciais e emissão de JWT (HS256, 1h)
- [x] Mensagem de erro para credenciais inválidas
- [x] Redirecionamento automático para calculadora após login
- [x] Banco PostgreSQL provisionado via `docker-compose.yml`
- [x] Migration automática na inicialização do container
- [x] Variáveis de ambiente separadas por arquivo (`.env` / `.env.example`)
- [ ] Proteção da rota da calculadora (redirect para /auth/ sem token)

---

## Cenários de Teste — Executados em 08/05/2026

> **Executor:** Cursor Agent (automatizado via browser)  
> **Ambiente:** `http://localhost:3000` / API `http://localhost:3001`  
> **Resultado geral:** ✅ 5/5 PASS

### TC-001 — Abrir tela de login

| Campo | Valor |
|-------|-------|
| **Pré-condição** | Servidor estático e API rodando |
| **Passos** | 1. Navegar para `http://localhost:3000/auth/` |
| **Resultado esperado** | Formulário com abas "Entrar" / "Criar conta" visível |
| **Resultado obtido** | ✅ PASS |
| **Observação** | Layout responsivo, tema escuro consistente com a calculadora |

---

### TC-002 — Cadastro de novo usuário

| Campo | Valor |
|-------|-------|
| **Pré-condição** | Banco limpo (primeiro acesso) |
| **Passos** | 1. Clicar na aba "Criar conta" <br>2. Preencher Nome: `Lucas Teste` <br>3. Preencher E-mail: `lucas@teste.com` <br>4. Preencher Senha: `senha123` <br>5. Clicar em "Cadastrar" |
| **Resultado esperado** | API retorna JWT; usuário redirecionado para `/` |
| **Resultado obtido** | ✅ PASS |
| **Observação** | Token salvo em `localStorage`; redirecionamento em ~400ms |

---

### TC-003 — Login com senha incorreta

| Campo | Valor |
|-------|-------|
| **Pré-condição** | Usuário `lucas@teste.com` já cadastrado |
| **Passos** | 1. Navegar para `/auth/` <br>2. Preencher E-mail: `lucas@teste.com` <br>3. Preencher Senha: `senhaerrada123` <br>4. Clicar em "Entrar" |
| **Resultado esperado** | Mensagem de erro vermelha: "Credenciais inválidas" |
| **Resultado obtido** | ✅ PASS |
| **Observação** | Permaneceu na tela de login; botão reabilitado após resposta da API (401) |

---

### TC-004 — Login com credenciais corretas

| Campo | Valor |
|-------|-------|
| **Pré-condição** | Usuário `lucas@teste.com` já cadastrado |
| **Passos** | 1. Preencher E-mail: `lucas@teste.com` <br>2. Preencher Senha: `senha123` <br>3. Clicar em "Entrar" |
| **Resultado esperado** | JWT salvo; redirecionado para `/index.html` (calculadora) |
| **Resultado obtido** | ✅ PASS |
| **Observação** | Calculadora carregou corretamente após o redirect |

---

### TC-005 — Redirecionamento pós-login exibe calculadora

| Campo | Valor |
|-------|-------|
| **Pré-condição** | Login bem-sucedido (TC-004) |
| **Passos** | 1. Observar URL e conteúdo após redirect |
| **Resultado esperado** | URL = `http://localhost:3000/` e calculadora visível |
| **Resultado obtido** | ✅ PASS |
| **Observação** | Todos os botões e displays da calculadora renderizados corretamente |

---

## Lacunas identificadas (backlog)

| Item | Prioridade | Observação |
|------|-----------|------------|
| Proteger rota `/index.html` — redirect para `/auth/` se não houver token | Alta | Atualmente a calculadora abre sem autenticação |
| Testes automatizados (Jest/Vitest) para endpoints da API | Alta | Nenhuma suite configurada |
| Refresh token / expiração tratada no frontend | Média | Token expira em 1h sem aviso |
| Rate limiting no endpoint `/api/auth/login` | Média | Sem proteção a força bruta |
| Variável `JWT_SECRET` com secret manager em produção | Alta | Atual config é apenas para dev |

## Próximo épico sugerido

**Epic-003 — Qualidade e Segurança**
- Testes automatizados de API (Jest + Supertest)
- Proteção de rotas no frontend
- Rate limiting
- CI/CD pipeline

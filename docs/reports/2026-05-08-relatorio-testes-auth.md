# Relatório de Testes — Autenticação (Epic-002)

> **Data de execução:** 08/05/2026 — 16:01 (UTC-3)  
> **Executor:** Cursor Agent (automatizado via browser)  
> **Ambiente:** `http://localhost:3000` / API `http://localhost:3001`  
> **Resultado geral:** ✅ 5/5 PASS

---

## Resumo

| Métrica | Valor |
|---------|-------|
| Cenários executados | 5 |
| Aprovados (PASS) | 5 |
| Reprovados (FAIL) | 0 |

---

## Infraestrutura validada

| Componente | Localização | Estado | Resultado |
|------------|-------------|--------|-----------|
| PostgreSQL 16-alpine | Docker (calculadora_db) | Rodando | ✅ PASS |
| API Node.js + Express | localhost:3001 | Rodando | ✅ PASS |
| Frontend estático (serve) | localhost:3000 | Rodando | ✅ PASS |
| JWT (HS256, 1h) | backend/.env | Configurado | ✅ PASS |
| bcrypt (10 rounds) | authController.js | Configurado | ✅ PASS |

---

## Cenários executados

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

## Cobertura do fluxo

| Cenário | Status |
|---------|--------|
| Cadastro de novo usuário com hash bcrypt | ✅ Coberto |
| Login com credenciais inválidas → 401 + mensagem de erro | ✅ Coberto |
| Login com credenciais válidas → JWT + redirect | ✅ Coberto |
| Calculadora acessível após autenticação | ✅ Coberto |
| Proteção da rota da calculadora (sem token → redirect para /auth/) | ⚠️ Não implementado |

---

## Lacunas identificadas

| Item | Prioridade |
|------|-----------|
| Proteger rota `/index.html` — redirect para `/auth/` se não houver token | Alta |
| Testes automatizados (Jest/Supertest) para endpoints da API | Alta |
| Refresh token / expiração tratada no frontend | Média |
| Rate limiting no endpoint `/api/auth/login` | Média |
| `JWT_SECRET` com secret manager em produção | Alta |

---

*Gerado por Cursor Agent · Calculadora monorepo · 2026-05-08*

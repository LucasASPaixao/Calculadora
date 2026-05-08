# Business Discovery — Calculadora Web

> Data: 2026-05-08  
> Conduzido por: @analyst  
> Fonte: análise do codebase + README + PRD.md (raiz) + SPECS.md (raiz)  
> ⚠️ Artefato interno — consumido por @pm na Fase 2. Pode ser removido após docs/prd.md estar completo.

## Objetivo do Produto

Fornecer uma **calculadora de quatro operações** (adição, subtração, multiplicação e divisão) simples e moderna, acessível via navegador, sem instalação. O projeto tem natureza **educacional/portfólio** — demonstra domínio de HTML5 semântico, CSS3 e JavaScript vanilla puro para o desenvolvedor Lucas.

## Personas

| Persona | Objetivo Principal | Dores |
|---------|-------------------|-------|
| **Usuário casual** | Realizar cálculos simples rapidamente no navegador, sem instalar app | Calculadoras online cheias de anúncios; interfaces lentas |
| **Desenvolvedor/recrutador** | Avaliar a qualidade técnica do código como portfólio | Código desorganizado, sem documentação |

## Funcionalidades Existentes (evidenciadas no código + README)

- Dois visores: expressão (linha superior) + resultado em tempo real (linha inferior)
- Quatro operações: `+`, `-`, `*`, `/`
- Suporte a números negativos (operador `-` no início)
- Suporte a números decimais (ponto `.`)
- Botão `C` (limpar tudo) e `DEL` (apagar último caractere)
- Botão `=` para finalizar cálculo
- Continuação após `=`: operador reutiliza resultado; dígito inicia nova expressão
- Suporte completo a teclado (dígitos, operadores, `Enter`, `Backspace`, `Escape`)
- Layout responsivo (adapta em telas ≤ 400px)
- Acessibilidade básica via ARIA

## Regras de Negócio (mencionadas / inferidas)

- Operadores duplicados são substituídos, não empilhados
- Ponto decimal: apenas um por número
- Resultado limitado a 8 casas decimais
- Divisão por zero retorna "Erro" (comportamento atual)
- Expressão inválida intermediária: display de resultado fica vazio (não quebra a UI)

## Roadmap / Próximas Features

Conforme README (`## Próximos passos`):

- Melhorar tratamento de divisão por zero (mensagem específica)
- Adicionar testes automatizados para funções puras
- Refinar acessibilidade (navegação por teclado mais completa, feedback visual adicional)

Features adicionais potenciais (não documentadas, a validar com o dono):
- Histórico de cálculos
- Suporte a parênteses (regex já permite, falta UI)
- Tema claro/escuro alternável

## Documentação de Produto Existente

| Arquivo | Conteúdo |
|---------|---------|
| `README.md` (raiz) | Visão geral, como rodar, decisões técnicas, próximos passos |
| `PRD.md` (raiz) | Requisitos de produto — versão legado (pré-AIOX) |
| `SPECS.md` (raiz) | Especificações técnicas — versão legado (pré-AIOX) |
| `RESEARCH_BRIEF.md` (raiz) | Briefing de pesquisa — versão legado (pré-AIOX) |

> Os arquivos na raiz são documentação legada. O padrão AIOX usa `docs/` como fonte de verdade.

## Estágio do Produto

**MVP** — funcionalidade básica completa e funcionando. Sem testes automatizados, sem CI/CD, sem deploy configurado.

# Calculadora Web (4 Operações)

Projeto de uma calculadora web simples e moderna, feita com **HTML5, CSS3 e JavaScript puro**, suportando as quatro operações básicas (**+**, **-**, **\***, **/**), com **dois visores** (expressão e resultado) e **suporte a números negativos**.

## Funcionalidades

- Dois visores:
  - **Visor superior**: mostra a expressão completa digitada (ex.: `-3+5*9/2`).
  - **Visor inferior**: mostra o resultado enquanto você digita.
- Atualização em tempo real: o resultado é recalculado sempre que a expressão mudar.
- Botão `=`:
  - Finaliza o cálculo,
  - mantém o resultado no visor inferior,
  - limpa o visor superior.
- Continuação após `=`:
  - Se você pressionar um operador (`+ - * /`), o cálculo continua a partir do resultado exibido.
  - Se você digitar um número após `=`, inicia uma nova expressão.
- Suporte a teclado:
  - Dígitos (`0–9`), operadores (`+ - * /`),
  - `Enter` ou `=` para finalizar,
  - `Backspace` para apagar,
  - `Escape` para limpar.

## Como rodar

### Opção A: npm (servidor local)

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor:

```bash
npm start
```

3. Abra a URL exibida no terminal no navegador (ex.: `http://localhost:3000`).

### Opção B: servidor estático (Python)

Na pasta do projeto:

```bash
cd /home/lucas/Projetos/Calculadora
python3 -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Estrutura do projeto

- `index.html`  
  Contém a estrutura dos visores e da grade de botões.
- `assets/css/styles.css`  
  Estilização da calculadora (layout, responsividade e tema).
- `assets/js/calculator.js`  
  Lógica de estado, atualização dos visores e avaliação das expressões.
- `PRD.md`, `RESEARCH_BRIEF.md`, `SPECS.md`  
  Documentação de produto e especificações técnicas.
- `.cursor/rules/calculadora.mdc`  
  Regras do Cursor para manter consistência de implementação.

## Decisões técnicas (resumo)

- O resultado é formatado com limitação simples de casas decimais (até 8 casas) para evitar excesso de dígitos flutuantes.
- A avaliação da expressão usa uma sanitização antes da execução, permitindo apenas os caracteres relacionados às operações suportadas.

## Próximos passos (possíveis melhorias)

- Melhorar o tratamento de casos numéricos (ex.: divisão por zero com uma mensagem mais detalhada).
- Adicionar testes automatizados para as funções puras de avaliação/formatação.
- Refinar acessibilidade e experiência (ex.: navegação mais completa por teclado e feedback visual adicional).


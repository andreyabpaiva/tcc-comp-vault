# Portal de TCCs — Cursos de Computação UFPA

Sistema web para consulta dos Trabalhos de Conclusão de Curso já defendidos nos
cursos de Ciência da Computação e Sistema de Informação da Universidade Federal
do Pará.

![SWI-Prolog](https://img.shields.io/badge/SWI--Prolog-9%2B-CC0000)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-18-087EA4?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

## Contexto

Trabalho desenvolvido como Avaliação 3 da disciplina. O enunciado define um
sistema web, com front-end e back-end, para consulta de TCCs por cinco
critérios, com a exigência de que as regras de consulta sejam implementadas em
linguagem lógica e de que a base de dados seja construída pela equipe.

O projeto atende a essas exigências da seguinte forma:

- A base de dados é constituída por fatos dinâmicos em Prolog, persistidos em
  arquivo.
- As cinco consultas são regras Prolog que operam sobre esses fatos.
- Os dados são obtidos da Biblioteca Digital de Monografias da UFPA (BDM,
  plataforma DSpace 7) em uma etapa de sincronização, e não a cada requisição.

## Escopo funcional

O sistema disponibiliza as seguintes consultas:

1. Por título.
2. Por autor.
3. Por orientador.
4. Por período (intervalo de anos).
5. Por palavra-chave.

Acrescentam-se a listagem completa do acervo, o filtro por curso (Ciência da
Computação ou Sistema de Informação) e o acesso ao arquivo PDF de cada trabalho.

## Arquitetura

```mermaid
flowchart TD
    BDM[("BDM / DSpace 7")]
    subgraph API["apps/api — SWI-Prolog"]
        direction TB
        ING["ingest.pl (sincronização)"]
        DB[("base dinâmica — tccs.db")]
        RULES["rules.pl (5 consultas lógicas)"]
        HTTP["server.pl (HTTP / JSON)"]
        ING -->|assertz| DB --> RULES --> HTTP
    end
    WEB["apps/web — Next.js + Tailwind"]
    USER(["Usuário"])

    BDM -->|sincronização única| ING
    HTTP -->|REST / JSON| WEB --> USER
```

Princípio que rege a implementação: nenhuma camada externa ao Prolog executa
filtragem, busca ou ordenação. A BDM é acessada apenas durante a sincronização;
toda consulta do usuário é resolvida pelas regras lógicas. O backend é escrito
exclusivamente em SWI-Prolog, o que impede que a lógica de consulta seja
deslocada para fora da linguagem lógica.

## Estrutura do repositório

```
apps/
  api/        Backend em SWI-Prolog (base de dados, regras, HTTP, sincronização)
  web/        Frontend em Next.js e Tailwind CSS
scripts/      sync.sh (sincronização) e serve.sh (execução do servidor)
```

## Requisitos

- SWI-Prolog 9 ou superior (`swipl` disponível no PATH).
- Node.js 18 ou superior.

## Execução

| Etapa | Comando | Resultado |
|---|---|---|
| 1 | `bash scripts/sync.sh` | Importa os TCCs da BDM e gera `apps/api/data/tccs.db`. |
| 2 | `bash scripts/serve.sh` | Inicia o backend em `http://localhost:8080`. |
| 3 | `cd apps/web && npm install && npm run dev` | Inicia o frontend em `http://localhost:3000`. |

A sincronização requer conexão com a internet e deve ser executada ao menos uma
vez antes de iniciar o servidor. As consultas subsequentes não acessam a BDM.


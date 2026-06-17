# Referência da API

API do Portal de TCCs, implementado em SWI-Prolog. A base de dados é
constituída por fatos dinâmicos persistidos e as cinco consultas são regras
lógicas. A Biblioteca Digital de Monografias da UFPA (BDM, DSpace 7) é consumida
apenas na etapa de sincronização.

## 1. Visão geral

```mermaid
flowchart LR
    ING["ingest.pl"] -->|assertz| DB[("tccs.db")]
    DB --> RULES["rules.pl"]
    RULES --> SER["serializa.pl"]
    SER --> SRV["server.pl"]
    SRV --> JSON(["resposta JSON"])
```

A sincronização (`ingest.pl`) materializa os dados da BDM como fatos na base
persistida (`db.pl`). As requisições HTTP (`server.pl`) selecionam a regra de
consulta apropriada (`rules.pl`), e o resultado é convertido em JSON
(`serializa.pl`). A camada HTTP não executa filtragem nem ordenação.

## 2. Modelo de dados

O modelo é relacional e normalizado: atributos multivalorados são representados
por múltiplos fatos. A persistência é gerida por `library(persistency)`, que
registra cada operação em `apps/api/data/tccs.db` e recarrega os fatos na
inicialização.

| Predicado | Argumentos | Descrição |
|---|---|---|
| `tcc/5` | `(Id, Titulo, Ano, Curso, PdfUrl)` | Fato principal de um TCC. |
| `resumo/2` | `(Id, Texto)` | Resumo do trabalho. |
| `autor/2` | `(Id, Nome)` | Um fato por autor. |
| `orientador/2` | `(Id, Nome)` | Um fato por orientador. |
| `palavra_chave/2` | `(Id, Palavra)` | Um fato por palavra-chave. |

- `Id`: identificador (UUID do item na BDM).
- `Ano`: inteiro, extraído de `dc.date.issued`.
- `Curso`: `"CC"` ou `"SI"`. Quando o texto da citação não permite distinguir
  (ex.: "Bacharelado em Computação"), atribui-se `"CC"` por padrão — a Faculdade
  não oferece curso chamado "Computação".

## 3. Regras de consulta

Cada critério é uma regra que unifica `Id` com os TCCs correspondentes. A
correspondência textual é parcial e insensível a acentuação e caixa, por meio do
predicado `contem/2` (módulo `normaliza`), que aplica decomposição Unicode (NFD)
e descarte de marcas combinantes a ambos os lados da comparação.

| Regra | Critério |
|---|---|
| `por_titulo/2` | Título. |
| `por_autor/2` | Autor. |
| `por_orientador/2` | Orientador. |
| `por_periodo/3` | Intervalo de anos. |
| `por_palavra/2` | Palavra-chave. |
| `listar_todos/1` | Listagem completa. |

Exemplo:

```prolog
por_titulo(Termo, Id) :-
    tcc(Id, Titulo, _, _, _),
    contem(Titulo, Termo).
```

## 4. Acesso às rotas (local)

Base: `http://localhost:8080`. Respostas em `application/json`. CORS habilitado.

### GET /api/tccs

Aplica um critério por requisição. A precedência, definida em `consultar/7`, é:
título, autor, orientador, palavra-chave, período; na ausência de qualquer um,
retorna a listagem completa. O filtro de curso (`curso_ok/2`) é combinado ao
critério principal.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `titulo` | texto | Consulta por título. |
| `autor` | texto | Consulta por autor. |
| `orientador` | texto | Consulta por orientador. |
| `palavra` | texto | Consulta por palavra-chave. |
| `inicio`, `fim` | inteiro | Intervalo de anos (consulta por período). |
| `curso` | `CC` ou `SI` | Filtro de curso, combinável com o critério acima. |
| `page` | inteiro | Página, indexada a partir de 0 (padrão 0). |
| `size` | inteiro | Itens por página (padrão 20). |

Resposta:

```json
{
  "total": 171,
  "page": 0,
  "size": 20,
  "resultados": [ "...lista de objetos TCC..." ]
}
```

### GET /api/tccs/:id

Retorna um único TCC pelo identificador. Responde com status 404 e
`{ "erro": "...", "id": "..." }` quando o identificador não existe.

### Objeto TCC

```json
{
  "id": "uuid",
  "titulo": "string",
  "ano": 2024,
  "curso": "CC",
  "autores": ["string"],
  "orientadores": ["string"],
  "palavras_chave": ["string"],
  "resumo": "string",
  "pdf_url": "string"
}
```

## 5. Sincronização

O módulo `ingest.pl` percorre a coleção de Computação da BDM, monta os fatos e os
insere na base. Características relevantes da integração:

- O acesso à API da BDM exige um cabeçalho User-Agent de navegador; sem ele a
  resposta é HTTP 403.
- Ciência da Computação e Sistema de Informação compartilham uma única coleção;
  o curso é inferido do texto de `dc.identifier.citation`.
- Mapeamento de campos: autor a partir de `dc.creator`; orientador a partir de
  `dc.contributor.advisor` e variantes; palavras-chave a partir de `dc.subject`;
  resumo a partir de `dc.description.resumo`, com `dc.description.abstract` como
  alternativa.
- A URL do PDF é resolvida pela cadeia bundles → bitstreams → conteúdo e
  armazenada no fato; o arquivo permanece hospedado na BDM.
- A obtenção de cada recurso possui repetição em caso de falha de rede, e itens
  individuais com erro não interrompem a sincronização.

A sincronização é completa por padrão: a base é limpa e reimportada.

## 6. Mapa dos módulos

| Arquivo | Responsabilidade |
|---|---|
| `src/db.pl` | Declaração e persistência dos fatos. |
| `src/normaliza.pl` | Normalização de texto e correspondência parcial. |
| `src/rules.pl` | As cinco consultas. |
| `src/serializa.pl` | Conversão de fatos em JSON. |
| `src/server.pl` | Servidor HTTP, roteamento e filtro de curso. |
| `src/ingest.pl` | Sincronização com a BDM. |
| `test/rules.plt` | Testes das regras de consulta. |

## 7. Execução e testes

```bash
bash scripts/sync.sh    # importa os dados e gera apps/api/data/tccs.db
bash scripts/serve.sh   # inicia o servidor em http://localhost:8080
```

Execução dos testes das regras:

```bash
swipl -q -g run_tests -t halt apps/api/test/rules.plt
```

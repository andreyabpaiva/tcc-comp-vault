# Diretrizes — Backend (apps/api)

Backend em SWI-Prolog puro. A base de dados são fatos dinâmicos persistidos e as
consultas são regras lógicas. A BDM/DSpace é consumida apenas na sincronização.

## Princípios gerais

DO
- Manter tom categórico, direto e formal em documentação e comentários.
- Comentar apenas o não-óbvio (o porquê), de forma breve.
- Verificar mudanças ponta a ponta com o backend em execução.
- Propor e confirmar antes de mudanças grandes ou irreversíveis.

DON'T
- Não usar emojis.
- Não usar títulos ou explicações conversacionais.
- Não herdar contexto de arquivos removidos; basear-se no código e na
  especificação do projeto.

## Diretrizes do backend

DO
- Manter toda a lógica de busca, filtro e ordenação em Prolog (`rules.pl`); um
  novo critério é uma nova regra.
- Tratar os fatos dinâmicos persistidos (`library(persistency)`) como o banco de
  dados.
- Manter `server.pl` apenas como transporte: ler parâmetro, chamar a regra,
  serializar.
- Acessar a BDM somente em `ingest.pl` (sincronização), nunca no caminho de
  requisição; enviar User-Agent de navegador nas chamadas.
- Adicionar e executar testes em `test/rules.plt` ao criar ou alterar regras.
- Atualizar `API.md` quando o contrato mudar.
- Respeitar as fronteiras de módulo (`db`, `normaliza`, `rules`, `serializa`,
  `server`, `ingest`).

DON'T
- Não filtrar, buscar ou ordenar fora do Prolog.
- Não consultar a BDM em tempo de requisição.
- Não introduzir banco SQL ou externo.
- Não duplicar valores com fatos auxiliares sem acento; normalizar na
  comparação.
- Não versionar `data/tccs.db` (é gerado pela sincronização).
- Não reintroduzir blocos de comentário longos nem docstring por predicado.

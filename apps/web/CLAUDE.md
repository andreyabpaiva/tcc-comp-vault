# Diretrizes — Frontend (apps/web)

Frontend em Next.js (App Router) com TypeScript e Tailwind CSS. Consome a API do
backend e não acessa a BDM diretamente.

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

## Diretrizes do frontend

DO
- Usar kebab-case em arquivos e pastas.
- Separar cada unidade em `index.tsx`, `types.ts`, `utils.ts` e `constants.ts`,
  conforme aplicável.
- Montar as telas em `views/` a partir de `components/`; as rotas em `app/`
  apenas montam as views (detalhe em `/tcc/[id]`).
- Usar Tailwind com os tokens definidos em `tailwind.config.ts`.
- Manter os estados de carregamento, vazio e erro na unidade que detém os dados;
  o skeleton fica junto do componente que representa.
- Consumir a API somente via `lib/api.ts` e a variável `NEXT_PUBLIC_API_BASE`.
- Definir tipos de domínio em `lib/types.ts` e Props no `types.ts` do componente.

DON'T
- Não usar acento ou caractere especial em identificadores e variáveis
  (`Computacao`, não `Computação`). Texto de interface em português e valores
  vindos do backend mantêm o acento.
- Não filtrar, buscar ou ordenar no cliente; delegar à API.
- Não colocar lógica de consulta em componentes ou views.
- Não acessar a BDM diretamente nem contornar `lib/api.ts`.
- Não usar estilo inline no lugar de Tailwind.
- Não duplicar tipos entre `lib/` e os componentes.

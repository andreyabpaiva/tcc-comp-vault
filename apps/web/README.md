# Frontend — Portal de TCCs

Interface web do Portal de TCCs, desenvolvida em Next.js (App Router) com
TypeScript e Tailwind CSS. Consome a API do backend e não acessa a BDM
diretamente.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript 5
- Tailwind CSS 3

## Estrutura

```
src/
  app/                 Rotas (App Router) e estilos globais
    page.tsx           Rota "/" — listagem e busca
    tcc/[id]/page.tsx  Rota "/tcc/:id" — detalhe do TCC
    layout.tsx         Layout raiz com cabeçalho e rodapé
    globals.css        Estilos globais e utilitários
  views/               Composição de tela
    list-view/         Busca, filtros, resultados e paginação
    detail-view/       Detalhe de um TCC
  components/          Componentes de interface
    header/  footer/
    search-panel/  course-filter/
    tcc-card/  results-grid/  pagination/
    badge/  keyword-chip/
  lib/                 Integração e domínio
    api.ts             Cliente HTTP da API
    types.ts           Tipos de domínio
    constants.ts       Constantes (URL da API, critérios, paginação)
    utils.ts           Funções utilitárias
```

## Convenções

- Nomes de arquivos e pastas em kebab-case.
- Cada unidade segue a separação `index.tsx` (componente), `types.ts` (tipos),
  `utils.ts` (utilitários) e `constants.ts` (constantes), conforme aplicável.
- As rotas em `app/` apenas montam as telas definidas em `views/`.
- Os estados de carregamento, vazio e erro pertencem à unidade que detém os
  dados; os skeletons ficam junto do componente que representam.

## Integração com a API

A URL do backend é definida pela variável de ambiente `NEXT_PUBLIC_API_BASE`.

```
NEXT_PUBLIC_API_BASE=http://localhost:8080
```

## Execução

```bash
npm install
npm run dev
```

A aplicação é servida em `http://localhost:3000` e requer o backend em execução.

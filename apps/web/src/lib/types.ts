export type Curso = "CC" | "SI";

export interface Tcc {
  id: string;
  titulo: string;
  ano: number;
  curso: Curso;
  autores: string[];
  orientadores: string[];
  palavras_chave: string[];
  resumo: string;
  pdf_url: string;
}

export interface RespostaBusca {
  total: number;
  page: number;
  size: number;
  resultados: Tcc[];
}

export type Criterio = "titulo" | "autor" | "orientador" | "palavra" | "periodo";

export type FiltroCurso = "todos" | "CC" | "SI";

export type Ordenacao = "recente" | "antigo" | "titulo" | "titulo_desc";

export interface Filtros {
  criterio: Criterio;
  query: string;
  anoDe: string;
  anoAte: string;
  curso: FiltroCurso;
  sort: Ordenacao;
}

export interface ParametrosBusca extends Filtros {
  page: number;
  size: number;
}

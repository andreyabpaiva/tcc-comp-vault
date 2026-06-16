export type Curso = "CC" | "SI" | "Computação";

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

export interface ParametrosBusca {
  criterio: Criterio;
  query: string;
  anoDe: string;
  anoAte: string;
  curso: FiltroCurso;
  page: number;
  size: number;
}

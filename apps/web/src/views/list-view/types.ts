import type { Criterio, FiltroCurso, Tcc } from "@/lib/types";

export interface EstadoLista {
  criterio: Criterio;
  query: string;
  anoDe: string;
  anoAte: string;
  curso: FiltroCurso;
  page: number;
  loading: boolean;
  error: boolean;
  total: number;
  itens: Tcc[];
}

import type { Criterio, FiltroCurso } from "@/lib/types";

export interface SearchPanelProps {
  criterio: Criterio;
  query: string;
  anoDe: string;
  anoAte: string;
  curso: FiltroCurso;

  onCriterio: (criterio: Criterio) => void;
  onQuery: (query: string) => void;
  onAnoDe: (ano: string) => void;
  onAnoAte: (ano: string) => void;
  onCurso: (curso: FiltroCurso) => void;
  onBuscar: () => void;
}

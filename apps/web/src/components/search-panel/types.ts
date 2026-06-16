import type { FiltroCurso, Filtros } from "@/lib/types";

export interface SearchPanelProps {
  filtros: Filtros;
  onChange: (patch: Partial<Omit<Filtros, "curso">>) => void;
  onCurso: (curso: FiltroCurso) => void;
  onBuscar: () => void;
}

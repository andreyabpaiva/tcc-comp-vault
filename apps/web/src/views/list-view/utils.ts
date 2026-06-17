import type { Criterio, ParametrosBusca } from "@/lib/types";
import { EstadoLista } from "./types";
import { PAGE_SIZE } from "@/lib/constants";

export function countLabel(total: number): string {
  return total === 1 ? "1 TCC encontrado" : `${total} TCCs encontrados`;
}

export function emptyTitle(
  criterio: Criterio,
  query: string,
  anoDe: string,
  anoAte: string,
): string {
  if (criterio === "periodo") {
    return `Nenhum TCC no período ${anoDe || "…"} – ${anoAte || "…"}`;
  }
  if (query.trim()) {
    return `Nenhum TCC encontrado para “${query.trim()}”`;
  }
  return "Nenhum TCC encontrado";
}

export function paramsDe(s: EstadoLista, pageOverride?: number): ParametrosBusca {
  return {
    criterio: s.criterio,
    query: s.query,
    anoDe: s.anoDe,
    anoAte: s.anoAte,
    curso: s.curso,
    sort: s.sort,
    page: pageOverride ?? s.page,
    size: PAGE_SIZE,
  };
}
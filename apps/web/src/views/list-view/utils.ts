import type { Criterio } from "@/lib/types";

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

import { API_BASE } from "./constants";
import type { ParametrosBusca, RespostaBusca, Tcc } from "./types";

export class ApiError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "ApiError";
  }
}

export async function buscarTccs(p: ParametrosBusca): Promise<RespostaBusca> {
  const qs = new URLSearchParams();

  if (p.criterio === "periodo") {
    if (p.anoDe.trim()) qs.set("inicio", p.anoDe.trim());
    if (p.anoAte.trim()) qs.set("fim", p.anoAte.trim());
  } else if (p.query.trim()) {
    qs.set(p.criterio, p.query.trim());
  }

  if (p.curso !== "todos") qs.set("curso", p.curso);

  qs.set("page", String(Math.max(0, p.page - 1)));
  qs.set("size", String(p.size));

  const res = await fetch(`${API_BASE}/api/tccs?${qs.toString()}`);
  if (!res.ok) {
    throw new ApiError(`Falha ao buscar TCCs (${res.status})`, res.status);
  }
  return res.json();
}

export async function obterTcc(id: string): Promise<Tcc> {
  const res = await fetch(`${API_BASE}/api/tccs/${encodeURIComponent(id)}`);
  if (!res.ok) {
    throw new ApiError(`TCC não encontrado (${res.status})`, res.status);
  }
  return res.json();
}

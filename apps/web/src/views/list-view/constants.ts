import type { EstadoLista } from "./types";

export const ESTADO_INICIAL: EstadoLista = {
  criterio: "titulo",
  query: "",
  anoDe: "",
  anoAte: "",
  curso: "todos",
  page: 1,
  loading: true,
  error: false,
  total: 0,
  itens: [],
};

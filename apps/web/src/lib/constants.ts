import type { Criterio } from "./types";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8080";

export const PAGE_SIZE = 8;

export const CRITERIOS: { value: Criterio; label: string }[] = [
  { value: "titulo", label: "Por título" },
  { value: "autor", label: "Por autor" },
  { value: "orientador", label: "Por orientador" },
  { value: "palavra", label: "Por palavra-chave" },
  { value: "periodo", label: "Por período" },
];

export const CURSO_LABEL: Record<string, string> = {
  CC: "Ciência da Computação",
  SI: "Sistema de Informação",
};

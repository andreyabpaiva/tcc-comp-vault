import type { Criterio, Ordenacao } from "./types";

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

export const ORDENACOES: { value: Ordenacao; label: string }[] = [
  { value: "recente", label: "Mais recentes" },
  { value: "antigo", label: "Mais antigos" },
  { value: "titulo", label: "Título (A-Z)" },
  { value: "titulo_desc", label: "Título (Z-A)" },
];

export const CURSO_LABEL: Record<string, string> = {
  CC: "Ciência da Computação",
  SI: "Sistema de Informação",
  Computação: "Computação",
};

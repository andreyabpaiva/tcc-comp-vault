import { CURSO_LABEL } from "./constants";
import type { Curso } from "./types";

export function cursoLabel(curso: Curso): string {
  return CURSO_LABEL[curso] ?? curso;
}

export function juntarNomes(nomes: string[]): string {
  return nomes.join("; ");
}

export function trechoResumo(resumo: string, max = 150): string {
  if (!resumo) return "";
  if (resumo.length <= max) return resumo;
  return resumo.slice(0, max).trim() + "…";
}

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const full = h.length === 3
    ? h.split("").map((c) => c + c).join("")
    : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

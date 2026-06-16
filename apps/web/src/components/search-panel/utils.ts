import type { Criterio } from "@/lib/types";
import { PLACEHOLDERS } from "./constants";

/** Placeholder do input de texto para o critério (vazio no modo período). */
export function placeholderFor(criterio: Criterio): string {
  if (criterio === "periodo") return "";
  return PLACEHOLDERS[criterio];
}

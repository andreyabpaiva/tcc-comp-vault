import type { Tcc } from "@/lib/types";
import { cursoLabel, juntarNomes, trechoResumo } from "@/lib/utils";

/** Campos derivados do TCC usados na renderização do card. */
export function dadosCard(tcc: Tcc) {
  return {
    autoresStr: juntarNomes(tcc.autores),
    cursoNome: cursoLabel(tcc.curso),
    trecho: trechoResumo(tcc.resumo),
    palavras: tcc.palavras_chave.slice(0, 3),
  };
}

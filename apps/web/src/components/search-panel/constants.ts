import type { Criterio } from "@/lib/types";

export const PLACEHOLDERS: Record<Exclude<Criterio, "periodo">, string> = {
  titulo: "Digite parte do título…",
  autor: "Digite o sobrenome do autor (ex: SOUZA)…",
  orientador: "Digite o nome do orientador (ex: FARIA)…",
  palavra: "Digite uma palavra-chave (ex: Segurança)…",
};

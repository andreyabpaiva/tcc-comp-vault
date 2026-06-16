"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/badge";
import { KeywordChip } from "@/components/keyword-chip";
import { obterTcc } from "@/lib/api";
import { cursoLabel, juntarNomes } from "@/lib/utils";
import type { Tcc } from "@/lib/types";
import type { DetailViewProps } from "./types";
import { DetailSkeleton } from "./skeleton";


export function DetailView({ id }: DetailViewProps) {
  const [tcc, setTcc] = useState<Tcc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ativo = true;
    setLoading(true);
    setError(false);
    obterTcc(id)
      .then((t) => ativo && setTcc(t))
      .catch(() => ativo && setError(true))
      .finally(() => ativo && setLoading(false));
    return () => {
      ativo = false;
    };
  }, [id]);

  return (
    <main className="mx-auto w-full max-w-[880px] flex-1 px-6 pb-16 pt-6">
      <Link
        href="/"
        className="mb-4 inline-flex items-center gap-[7px] py-2 text-[13px] font-medium text-ink-muted hover:text-primary"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Voltar aos resultados
      </Link>

      {loading ? (
        <DetailSkeleton />
      ) : error || !tcc ? (
        <div className="rounded-detail border border-line bg-white p-12 text-center">
          <div className="mb-1.5 text-[17px] font-medium text-ink">
            TCC não encontrado
          </div>
          <div className="text-[13px] text-ink-faint">
            O trabalho solicitado não está no acervo ou o endereço está incorreto.
          </div>
        </div>
      ) : (
        <article className="overflow-hidden rounded-detail border border-line bg-white">
          {/* Faixa com checkerboard */}
          <div className="bg-checkerboard border-b border-line px-9 pb-7 pt-8">
            <div className="mb-4 flex items-center gap-[9px]">
              <Badge curso={tcc.curso} />
              <span className="rounded-md border border-line bg-white px-[9px] py-[3px] text-xs font-medium text-ink-faint">
                {cursoLabel(tcc.curso)}
              </span>
              <span className="rounded-md border border-line bg-white px-[9px] py-[3px] text-xs font-medium text-ink-faint">
                {tcc.ano}
              </span>
            </div>
            <h1 className="m-0 text-[26px] font-bold leading-[1.3] tracking-[-0.02em] text-ink [text-wrap:balance]">
              {tcc.titulo}
            </h1>
          </div>

          {/* Corpo */}
          <div className="px-9 pb-8 pt-7">
            {/* Metadados */}
            <div className="mb-[26px] grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2">
              <div className="bg-white px-[18px] py-3.5">
                <div className="mb-[5px] text-[9.5px] font-medium uppercase tracking-[0.09em] text-ink-faint">
                  Autoria
                </div>
                <div className="text-sm font-medium leading-[1.4] text-ink">
                  {juntarNomes(tcc.autores)}
                </div>
              </div>
              <div className="bg-white px-[18px] py-3.5">
                <div className="mb-[5px] text-[9.5px] font-medium uppercase tracking-[0.09em] text-ink-faint">
                  Orientação
                </div>
                <div className="text-sm font-medium leading-[1.4] text-ink">
                  {juntarNomes(tcc.orientadores)}
                </div>
              </div>
            </div>

            {/* Palavras-chave */}
            {tcc.palavras_chave.length > 0 && (
              <div className="mb-[26px]">
                <div className="mb-[11px] text-[10px] font-medium uppercase tracking-[0.1em] text-ink">
                  Palavras-chave
                </div>
                <div className="flex flex-wrap gap-[7px]">
                  {tcc.palavras_chave.map((kw) => (
                    <KeywordChip key={kw} label={kw} variant="pill" />
                  ))}
                </div>
              </div>
            )}

            {/* Resumo */}
            {tcc.resumo && (
              <div className="mb-[30px]">
                <div className="mb-[11px] text-[10px] font-medium uppercase tracking-[0.1em] text-ink">
                  Resumo
                </div>
                <p className="m-0 text-[15px] leading-[1.75] text-ink-soft [text-wrap:pretty]">
                  {tcc.resumo}
                </p>
              </div>
            )}

            {/* Ações */}
            <div className="flex flex-wrap gap-2.5 border-t border-line-soft pt-[22px]">
              {tcc.pdf_url && (
                <a
                  href={tcc.pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-[9px] rounded-field bg-primary px-[26px] py-[13px] text-sm font-medium tracking-[0.02em] text-white hover:bg-primary-hover"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                  Abrir PDF
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              )}
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-field border-[1.5px] border-line-input bg-white px-[22px] py-[13px] text-sm font-medium text-ink-muted hover:border-[#C8C4BE]"
              >
                Voltar
              </Link>
            </div>
          </div>
        </article>
      )}
    </main>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import { SearchPanel } from "@/components/search-panel";
import { ResultsGrid } from "@/components/results-grid";
import { Pagination } from "@/components/pagination";
import { buscarTccs } from "@/lib/api";
import { PAGE_SIZE } from "@/lib/constants";
import type { FiltroCurso, Filtros, ParametrosBusca } from "@/lib/types";
import { ESTADO_INICIAL } from "./constants";
import type { EstadoLista } from "./types";
import { countLabel, emptyTitle, paramsDe } from "./utils";

export function ListView() {
  const [s, setS] = useState<EstadoLista>(ESTADO_INICIAL);

  const executar = useCallback(async (p: ParametrosBusca) => {
    setS((prev) => ({
      ...prev,
      loading: true,
      error: false,
      criterio: p.criterio,
      query: p.query,
      anoDe: p.anoDe,
      anoAte: p.anoAte,
      curso: p.curso,
      page: p.page,
    }));
    try {
      const r = await buscarTccs(p);
      setS((prev) => ({
        ...prev,
        loading: false,
        itens: r.resultados,
        total: r.total,
      }));
    } catch {
      setS((prev) => ({
        ...prev,
        loading: false,
        error: true,
        itens: [],
        total: 0,
      }));
    }
  }, []);

  useEffect(() => {
    executar(paramsDe(ESTADO_INICIAL, 1));
  }, [executar]);

  const onChange = (patch: Partial<Omit<Filtros, "curso">>) =>
    setS((p) => {
      const trocouCriterio =
        patch.criterio !== undefined && patch.criterio !== p.criterio;
      return trocouCriterio
        ? { ...p, ...patch, query: "", anoDe: "", anoAte: "", page: 1 }
        : { ...p, ...patch };
    });

  const onBuscar = () => executar(paramsDe(s, 1));
  const onCurso = (curso: FiltroCurso) => executar({ ...paramsDe(s, 1), curso });
  const onRetry = () => executar(paramsDe(s));
  const onGoTo = (page: number) => {
    executar(paramsDe(s, page));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const totalPages = Math.max(1, Math.ceil(s.total / PAGE_SIZE));
  const showPager = !s.loading && !s.error && s.total > 0 && totalPages > 1;

  return (
    <main className="mx-auto w-full max-w-[1200px] flex-1 px-6 pb-14 pt-7">
      <div className="mb-5">
        <h1 className="m-0 mb-1.5 text-[27px] font-bold tracking-[-0.025em] text-ink">
          Consulta de Trabalhos de Conclusão de Curso
        </h1>
        <p className="m-0 text-sm leading-[1.5] text-ink-muted">
          Acervo público dos TCCs de Ciência da Computação e Sistema de
          Informação da UFPA.
        </p>
      </div>

      <SearchPanel
        filtros={s}
        onChange={onChange}
        onCurso={onCurso}
        onBuscar={onBuscar}
      />

      <div className="mb-3.5 flex flex-wrap items-baseline gap-2.5">
        <span className="text-[15px] font-medium text-ink">
          {s.error ? "—" : countLabel(s.total)}
        </span>
        <div className="flex-1" />
        <span className="text-xs text-ink-faint">Ordenado por</span>
        <span className="text-xs font-medium text-ink-muted">mais recentes</span>
      </div>

      <ResultsGrid
        loading={s.loading}
        error={s.error}
        itens={s.itens}
        emptyTitle={emptyTitle(s.criterio, s.query, s.anoDe, s.anoAte)}
        onRetry={onRetry}
      />

      {showPager && (
        <Pagination page={s.page} totalPages={totalPages} onGoTo={onGoTo} />
      )}
    </main>
  );
}

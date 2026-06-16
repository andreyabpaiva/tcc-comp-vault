import Link from "next/link";
import { Badge } from "@/components/badge";
import { KeywordChip } from "@/components/keyword-chip";
import type { TccCardProps } from "./types";
import { dadosCard } from "./utils";

/** Card de um TCC na grade de resultados. Linka para /tcc/[id]. */
export function TccCard({ tcc }: TccCardProps) {
  const { autoresStr, cursoNome, trecho, palavras } = dadosCard(tcc);

  return (
    <Link
      href={`/tcc/${tcc.id}`}
      className="flex flex-col rounded-card border border-line bg-white p-[18px] transition hover:-translate-y-0.5 hover:border-primary-ring hover:shadow-[0_6px_20px_rgba(28,26,24,0.08)] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <div className="mb-3 flex items-center justify-between">
        <Badge curso={tcc.curso} />
        <span className="text-xs font-medium text-ink-faint">{tcc.ano}</span>
      </div>

      <div className="mb-[9px] text-sm font-medium leading-[1.4] text-ink">
        {tcc.titulo}
      </div>

      <div className="mb-3 flex items-center gap-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B8B0A8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[11.5px] text-ink-muted">
          {autoresStr}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-[5px]">
        {palavras.map((kw) => (
          <KeywordChip key={kw} label={kw} variant="soft" />
        ))}
      </div>

      <div className="mb-3.5 flex-1 text-xs leading-[1.55] text-[#8A837C]">
        {trecho}
      </div>

      <div className="flex items-center justify-between border-t border-line-soft pt-[11px]">
        <span className="text-[11px] text-ink-faint">{cursoNome}</span>
        <span className="flex items-center gap-[3px] text-xs font-medium text-primary">
          Ver detalhes
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4F8FD0"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

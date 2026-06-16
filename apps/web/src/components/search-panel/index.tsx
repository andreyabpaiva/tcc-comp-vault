import type { Criterio } from "@/lib/types";
import { CRITERIOS } from "@/lib/constants";
import { CourseFilter } from "@/components/course-filter";
import type { SearchPanelProps } from "./types";
import { placeholderFor } from "./utils";

const FIELD =
  "h-[46px] rounded-field border border-line-input outline-none focus:border-primary";

export function SearchPanel(props: SearchPanelProps) {
  const { filtros, onChange, onCurso, onBuscar } = props;
  const { criterio, query, anoDe, anoAte, curso } = filtros;

  const isPeriodo = criterio === "periodo";

  const onEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") onBuscar();
  };

  return (
    <div className="mb-[22px] rounded-panel border border-line bg-white p-5">
      <div className="flex flex-wrap items-stretch gap-2.5">
        <div className="relative shrink-0">
          <select
            aria-label="Critério de busca"
            value={criterio}
            onChange={(e) => onChange({ criterio: e.target.value as Criterio })}
            className="h-[46px] min-w-[180px] cursor-pointer appearance-none rounded-field border border-line-input bg-surface px-4 pr-[38px] text-[13px] font-medium text-ink outline-none focus:border-primary"
          >
            {CRITERIOS.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
          <svg
            className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#6A6460"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
        {!isPeriodo && (
          <div className="flex h-[46px] min-w-[220px] flex-1 items-center gap-2.5 rounded-field border border-line-input bg-white px-4 focus-within:border-primary">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A8A09A"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => onChange({ query: e.target.value })}
              onKeyDown={onEnter}
              placeholder={placeholderFor(criterio)}
              className="min-w-0 flex-1 border-none bg-transparent text-sm text-ink outline-none"
            />
          </div>
        )}

        {isPeriodo && (
          <div className="flex min-w-[220px] flex-1 items-center gap-2">
            <span className="shrink-0 text-[13px] text-ink-muted">De</span>
            <input
              type="number"
              value={anoDe}
              onChange={(e) => onChange({ anoDe: e.target.value })}
              onKeyDown={onEnter}
              placeholder="2019"
              className={`${FIELD} w-full bg-white px-3.5 text-sm text-ink`}
            />
            <span className="shrink-0 text-[13px] text-ink-muted">até</span>
            <input
              type="number"
              value={anoAte}
              onChange={(e) => onChange({ anoAte: e.target.value })}
              onKeyDown={onEnter}
              placeholder="2024"
              className={`${FIELD} w-full bg-white px-3.5 text-sm text-ink`}
            />
          </div>
        )}

        <button
          onClick={onBuscar}
          className="h-[46px] shrink-0 rounded-field bg-primary px-7 text-[13px] font-medium uppercase tracking-[0.04em] text-white hover:bg-primary-hover"
        >
          Buscar
        </button>
      </div>

      <div className="my-[15px] mt-[18px] h-px bg-line-soft" />

      <CourseFilter value={curso} onChange={onCurso} />
    </div>
  );
}

import type { PaginationProps } from "./types";
import { listaDePaginas } from "./utils";

const NAV_BASE =
  "inline-flex h-[34px] items-center gap-[5px] rounded-lg border border-line bg-white px-2 text-[12.5px] font-medium sm:px-3.5";
const NAV_ON = "cursor-pointer text-[#4F4A45]";
const NAV_OFF = "cursor-default text-[#C4C0B9]";

const NUM_BASE =
  "flex h-[34px] min-w-[34px] select-none cursor-pointer items-center justify-center rounded-lg border text-[13px]";

export function Pagination({ page, totalPages, onGoTo }: PaginationProps) {
  const temAnterior = page > 1;
  const temProxima = page < totalPages;

  return (
    <div className="mt-[26px] flex items-center justify-center gap-[7px]">
      <button
        onClick={() => temAnterior && onGoTo(page - 1)}
        disabled={!temAnterior}
        aria-label="Página anterior"
        className={`${NAV_BASE} ${temAnterior ? NAV_ON : NAV_OFF}`}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span className="hidden sm:inline">Anterior</span>
      </button>

      <div className="mx-1 flex items-center gap-[5px]">
        {listaDePaginas(page, totalPages).map((p, i) => {
          if (p === "…") {
            return (
              <span
                key={`gap-${i}`}
                className="flex h-[34px] min-w-[20px] select-none items-center justify-center text-[13px] text-ink-faint"
              >
                …
              </span>
            );
          }
          const ativo = p === page;
          return (
            <span
              key={p}
              onClick={() => onGoTo(p)}
              className={`${NUM_BASE} ${
                ativo
                  ? "border-primary bg-primary font-medium text-white"
                  : "border-line bg-white font-normal text-ink-muted"
              }`}
            >
              {p}
            </span>
          );
        })}
      </div>

      <button
        onClick={() => temProxima && onGoTo(page + 1)}
        disabled={!temProxima}
        aria-label="Próxima página"
        className={`${NAV_BASE} ${temProxima ? NAV_ON : NAV_OFF}`}
      >
        <span className="hidden sm:inline">Próxima</span>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

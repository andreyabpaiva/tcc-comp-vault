import type { EmptyStateProps } from "./types";

export function EmptyState({ title }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-[70px] text-center">
      <div className="mb-[18px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-line bg-white">
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#B8B0A8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </div>
      <div className="mb-1.5 text-[17px] font-medium text-ink">{title}</div>
      <div className="max-w-[380px] text-[13px] leading-[1.55] text-ink-faint">
        Tente outro termo, troque o critério de busca ou remova os filtros de
        curso.
      </div>
    </div>
  );
}

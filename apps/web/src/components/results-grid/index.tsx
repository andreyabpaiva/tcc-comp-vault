import { TccCard } from "@/components/tcc-card";
import { TccCardSkeleton } from "@/components/tcc-card/skeleton";
import { PAGE_SIZE } from "@/lib/constants";
import { EmptyState } from "./empty";
import { ErrorState } from "./error";
import type { ResultsGridProps } from "./types";

const GRID =
  "grid gap-3.5 [grid-template-columns:repeat(auto-fill,minmax(300px,1fr))]";

export function ResultsGrid({
  loading,
  error,
  itens,
  emptyTitle,
  onRetry,
}: ResultsGridProps) {
  return (
    <div className="min-h-[420px] overflow-hidden rounded-panel border border-[#E2DEDB] bg-checkerboard p-5">
      {loading ? (
        <div className={GRID}>
          {Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <TccCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorState onRetry={onRetry} />
      ) : itens.length === 0 ? (
        <EmptyState title={emptyTitle} />
      ) : (
        <div className={GRID}>
          {itens.map((tcc) => (
            <TccCard key={tcc.id} tcc={tcc} />
          ))}
        </div>
      )}
    </div>
  );
}

/** Skeleton do TccCard (mesmo layout), exibido enquanto a busca carrega. */
export function TccCardSkeleton() {
  return (
    <div className="rounded-card border border-[#EDEBE6] bg-white p-[18px]">
      <div className="skeleton mb-3.5 h-5 w-[54px] rounded-[5px]" />
      <div className="skeleton mb-2 h-3.5 w-full rounded" />
      <div className="skeleton mb-4 h-3.5 w-[70%] rounded" />
      <div className="skeleton mb-[18px] h-[11px] w-1/2 rounded" />
      <div className="skeleton h-8 w-[90%] rounded-md" />
    </div>
  );
}

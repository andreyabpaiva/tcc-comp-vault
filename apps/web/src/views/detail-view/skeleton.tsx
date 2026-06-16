export function DetailSkeleton() {
  return (
    <div className="overflow-hidden rounded-detail border border-line bg-white">
      <div className="bg-checkerboard border-b border-line p-9">
        <div className="skeleton mb-4 h-5 w-40 rounded" />
        <div className="skeleton mb-2.5 h-7 w-[85%] rounded" />
        <div className="skeleton h-7 w-1/2 rounded" />
      </div>
      <div className="p-9">
        <div className="skeleton mb-6 h-16 w-full rounded-[10px]" />
        <div className="skeleton mb-3 h-4 w-32 rounded" />
        <div className="skeleton mb-2 h-3.5 w-full rounded" />
        <div className="skeleton mb-2 h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-2/3 rounded" />
      </div>
    </div>
  );
}

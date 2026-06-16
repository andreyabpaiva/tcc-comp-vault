import type { Curso } from "@/lib/types";
import type { BadgeProps } from "./types";

const CORES: Record<Curso, string> = {
  CC: "bg-primary/[0.13] text-primary border-primary/40",
  SI: "bg-si/[0.13] text-si border-si/40",
  Computação: "bg-ink-muted/[0.12] text-ink-muted border-ink-muted/30",
};

export function Badge({ curso }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2.5 py-[3px] text-[10.5px] font-bold uppercase tracking-[0.06em] ${CORES[curso]}`}
    >
      {curso}
    </span>
  );
}

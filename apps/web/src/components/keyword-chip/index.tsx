import type { KeywordChipProps } from "./types";

const VARIANTES = {
  soft: "bg-line-soft text-ink-muted border-[#E4E0DA] rounded-[5px] px-2 py-0.5 text-[10.5px]",
  pill: "bg-primary-tint text-primary border-primary-ring rounded-full px-3 py-1 text-xs",
} as const;

export function KeywordChip({ label, variant = "soft" }: KeywordChipProps) {
  return (
    <span className={`inline-block border ${VARIANTES[variant]}`}>{label}</span>
  );
}

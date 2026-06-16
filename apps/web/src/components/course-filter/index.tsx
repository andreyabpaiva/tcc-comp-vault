import type { FiltroCurso } from "@/lib/types";
import type { CourseFilterProps } from "./types";

const OPCOES: { value: FiltroCurso; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "CC", label: "Ciência da Computação" },
  { value: "SI", label: "Sistema de Informação" },
];

const BASE =
  "cursor-pointer select-none whitespace-nowrap rounded-full border px-[15px] py-1.5 text-[12.5px]";
const ATIVO = "border-primary/40 bg-primary/10 font-medium text-primary";
const INATIVO = "border-line bg-white font-normal text-ink-muted";

export function CourseFilter({ value, onChange }: CourseFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-ink-faint">
        Curso
      </span>
      {OPCOES.map((opt) => (
        <span
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`${BASE} ${value === opt.value ? ATIVO : INATIVO}`}
        >
          {opt.label}
        </span>
      ))}
    </div>
  );
}

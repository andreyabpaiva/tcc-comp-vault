import type { FiltroCurso } from "@/lib/types";

export interface CourseFilterProps {
  value: FiltroCurso;
  onChange: (curso: FiltroCurso) => void;
}

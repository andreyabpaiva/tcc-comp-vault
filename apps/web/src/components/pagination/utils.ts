export function listaDePaginas(totalPages: number): number[] {
  return Array.from({ length: totalPages }, (_, i) => i + 1);
}

export type ItemPagina = number | "…";

export function listaDePaginas(
  page: number,
  totalPages: number,
  vizinhos = 1,
): ItemPagina[] {
  if (totalPages <= 1) return [1];

  const limite = 5 + vizinhos * 2;
  if (totalPages <= limite) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const inicio = Math.max(2, page - vizinhos);
  const fim = Math.min(totalPages - 1, page + vizinhos);

  const itens: ItemPagina[] = [1];
  if (inicio > 2) itens.push("…");
  for (let i = inicio; i <= fim; i++) itens.push(i);
  if (fim < totalPages - 1) itens.push("…");
  itens.push(totalPages);

  return itens;
}

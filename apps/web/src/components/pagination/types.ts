export interface PaginationProps {
  page: number;
  totalPages: number;
  onGoTo: (page: number) => void;
}

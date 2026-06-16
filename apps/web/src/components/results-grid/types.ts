import type { Tcc } from "@/lib/types";

export interface ResultsGridProps {
  loading: boolean;
  error: boolean;
  itens: Tcc[];
  emptyTitle: string;
  onRetry: () => void;
}

export interface EmptyStateProps {
  title: string;
}

export interface ErrorStateProps {
  onRetry: () => void;
}

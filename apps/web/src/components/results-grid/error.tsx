import type { ErrorStateProps } from "./types";

export function ErrorState({ onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-[70px] text-center">
      <div className="mb-[18px] flex h-[60px] w-[60px] items-center justify-center rounded-full border border-danger-ring bg-danger-tint">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C85151"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      </div>
      <div className="mb-1.5 text-[17px] font-medium text-ink">
        Não foi possível carregar os TCCs
      </div>
      <div className="mb-5 max-w-[360px] text-[13px] leading-[1.55] text-ink-faint">
        Ocorreu um erro ao consultar o acervo. Verifique sua conexão e tente
        novamente.
      </div>
      <button
        onClick={onRetry}
        className="rounded-lg border-[1.5px] border-danger-ring bg-white px-[22px] py-2.5 text-[13px] font-medium text-danger"
      >
        Tentar novamente
      </button>
    </div>
  );
}

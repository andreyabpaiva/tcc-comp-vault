import Link from "next/link";
import { NAV_LINKS } from "./constants";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-3.5 px-6 py-3.5">
        <Link href="/" className="flex items-center gap-[11px]">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[9px] bg-primary-ring">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4F8FD0"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div>
            <div className="text-[15px] font-bold leading-tight tracking-[-0.01em] text-ink">
              Portal de TCCs
            </div>
            <div className="text-[10px] font-normal tracking-[0.08em] text-ink-faint">
              COMPUTAÇÃO · UFPA
            </div>
          </div>
        </Link>

        <div className="flex-1" />

        {/* <nav className="flex items-center gap-0.5">
          {NAV_LINKS.map((label) => (
            <span
              key={label}
              className="cursor-pointer rounded-lg px-3.5 py-[7px] text-[13px] text-ink-muted hover:text-primary"
            >
              {label}
            </span>
          ))}
        </nav> */}
      </div>
    </header>
  );
}

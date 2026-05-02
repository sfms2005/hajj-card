"use client";

import { Home } from "lucide-react";
import Link from "next/link";

type StationPageShellProps = {
  title: string;
  bgClassName: string;
  variant?: "light" | "dark";
  children: React.ReactNode;
};

export function StationPageShell({
  title,
  bgClassName,
  variant = "light",
  children,
}: StationPageShellProps) {
  const isDark = variant === "dark";

  return (
    <div dir="rtl" className={`min-h-dvh ${bgClassName}`}>
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 px-4 pb-16 pt-8 sm:max-w-lg sm:gap-7 sm:px-6 sm:pt-10">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className={
              isDark
                ? "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-black/20 backdrop-blur-md transition hover:-translate-y-px hover:bg-white/15 active:scale-[0.98]"
                : "inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/12 bg-white/95 px-4 py-2 text-sm font-medium text-[#1e3a5f] shadow-[0_2px_12px_-4px_rgba(30,58,95,0.12)] backdrop-blur-sm transition hover:-translate-y-px hover:border-[#c9a227]/35 hover:shadow-md active:scale-[0.98]"
            }
          >
            <Home className="size-[18px] shrink-0 opacity-90" strokeWidth={1.75} />
            الرئيسية
          </Link>
          <h1
            className={
              isDark
                ? "text-[1.55rem] font-bold leading-tight tracking-tight text-white sm:text-[1.75rem]"
                : "text-[1.55rem] font-bold leading-tight tracking-tight text-[#1e3a5f] sm:text-[1.75rem]"
            }
          >
            {title}
          </h1>
          <p
            className={
              isDark ? "text-[0.9375rem] text-slate-400" : "text-[0.9375rem] text-[#64748b]"
            }
          >
            اختر بطاقتك
          </p>
        </header>
        {children}
      </div>
    </div>
  );
}

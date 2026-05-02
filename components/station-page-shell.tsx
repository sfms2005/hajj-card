"use client";

import { Home } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";

type StationPageShellProps = {
  title: string;
  /** Tailwind classes for outer wrapper (e.g. solid `bg-[#…]`). */
  bgClassName?: string;
  /** Inline background (use for gradients: only hex/rgb — html2canvas-safe). */
  shellStyle?: CSSProperties;
  variant?: "light" | "dark";
  children: React.ReactNode;
};

export function StationPageShell({
  title,
  bgClassName = "",
  shellStyle,
  variant = "light",
  children,
}: StationPageShellProps) {
  const isDark = variant === "dark";

  const lightLinkStyle: CSSProperties = {
    border: "1px solid rgba(30, 58, 95, 0.12)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: "#1e3a5f",
    boxShadow: "0 2px 12px -4px rgba(30, 58, 95, 0.12)",
  };

  const darkLinkStyle: CSSProperties = {
    border: "1px solid rgba(255, 255, 255, 0.15)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#ffffff",
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div
      dir="rtl"
      className={`min-h-dvh ${bgClassName}`.trim()}
      style={shellStyle}
    >
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center gap-6 px-4 pb-16 pt-8 sm:max-w-lg sm:gap-7 sm:px-6 sm:pt-10">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className={
              isDark
                ? "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-md transition hover:-translate-y-px active:scale-[0.98] hover:bg-[rgba(255,255,255,0.15)]"
                : "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm transition hover:-translate-y-px active:scale-[0.98] hover:border-[rgba(201,162,39,0.35)] hover:shadow-[0_8px_24px_-8px_rgba(30,58,95,0.15)]"
            }
            style={isDark ? darkLinkStyle : lightLinkStyle}
          >
            <Home className="size-[18px] shrink-0 opacity-90" strokeWidth={1.75} />
            الرئيسية
          </Link>
          <h1
            className={
              isDark
                ? "text-[1.55rem] font-bold leading-tight text-[#ffffff] sm:text-[1.75rem]"
                : "text-[1.55rem] font-bold leading-tight text-[#1e3a5f] sm:text-[1.75rem]"
            }
          >
            {title}
          </h1>
          <p
            className={
              isDark
                ? "text-[0.9375rem] text-[#94a3b8]"
                : "text-[0.9375rem] text-[#64748b]"
            }
          >
            اختر بطاقتك
          </p>
        </header>
        {children}
        <p
          className={
            isDark
              ? "mt-auto w-full pt-6 text-center text-xs text-[#94a3b8] sm:pt-8"
              : "mt-auto w-full pt-6 text-center text-xs text-[#9ca3af] sm:pt-8"
          }
        >
          صُنع بحب ❤️ — ساره السبيعي
        </p>
      </div>
    </div>
  );
}

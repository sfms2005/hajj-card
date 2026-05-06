"use client";

import { ChevronLeft, Gift, Landmark, Moon, Sun } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    href: "/mina",
    title: "منى",
    subtitle: "بطاقات أيام التشريق",
    Icon: Landmark,
  },
  {
    href: "/arafah",
    title: "عرفة",
    subtitle: "يوم الدعاء الأعظم",
    Icon: Sun,
  },
  {
    href: "/muzdalifah",
    title: "مزدلفة",
    subtitle: "سكينة وليلة خير",
    Icon: Moon,
  },
  {
    href: "/eid",
    title: "العيد",
    subtitle: "فرحة العيد وبهجته",
    Icon: Gift,
  },
] as const;

export default function Home() {
  return (
    <main
      dir="rtl"
      className="selection-gold relative min-h-screen text-[#152a45]"
    >
      <div className="relative mx-auto flex min-h-screen max-w-md flex-col px-5 pt-12 pb-16 sm:max-w-lg sm:px-6 sm:pt-16 sm:pb-20">
        <header className="animate-home-enter mb-10 text-center sm:mb-12">
          <h1 className="text-[1.65rem] font-bold leading-snug text-[#152a45] sm:text-3xl">
            بطاقات الحج والعيد
          </h1>
          <p className="mx-auto mt-4 max-w-[20rem] text-sm leading-relaxed text-[#5c6578] sm:text-[0.9375rem]">
            اختر الوجهة، ثم صمّم بطاقتك وشاركها مع أحبابك
          </p>
        </header>

        <nav
          className="flex flex-col gap-4 sm:gap-5"
          aria-label="اختيار الوجهة"
        >
          {destinations.map(({ href, title, subtitle, Icon }, index) => (
            <Link
              key={href}
              href={href}
              className="animate-home-enter group relative flex items-start gap-5 overflow-hidden rounded-[1.35rem] border border-[rgba(30,58,95,0.07)] bg-[rgba(255,255,255,0.85)] px-5 py-5 shadow-[0_4px_24px_-4px_rgba(30,58,95,0.12)] backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(201,162,39,0.25)] hover:bg-[#ffffff] hover:shadow-[0_16px_40px_-12px_rgba(30,58,95,0.18)] active:scale-[0.99] sm:rounded-[1.5rem] sm:px-6 sm:py-6"
              style={{ animationDelay: `${100 + index * 70}ms` }}
            >
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0eeea] text-[rgba(30,58,95,0.85)] transition duration-300 group-hover:bg-[#e8f2ed] group-hover:text-[#1a4d3a]"
                aria-hidden
              >
                <Icon className="size-[22px]" strokeWidth={1.65} />
              </span>

              <span className="min-w-0 flex-1 pt-0.5 text-right">
                <span className="block text-lg font-semibold text-[#152a45] transition group-hover:text-[#1e3a5f] sm:text-xl">
                  {title}
                </span>
                <span className="mt-1 block text-sm leading-relaxed text-[#6b7280]">
                  {subtitle}
                </span>
              </span>

              <span
                className="pointer-events-none absolute end-5 top-1/2 hidden h-9 w-9 -translate-y-1/2 rounded-full border border-[rgba(30,58,95,0.08)] bg-[#faf9f7] opacity-0 shadow-sm transition duration-300 group-hover:opacity-100 sm:flex sm:items-center sm:justify-center"
                aria-hidden
              >
                <ChevronLeft className="size-4 text-[rgba(30,58,95,0.45)]" strokeWidth={2} />
              </span>
            </Link>
          ))}
        </nav>

        <p
          className="mt-auto animate-home-enter pt-12 text-center text-xs text-[#9ca3af]"
          style={{ animationDelay: "480ms" }}
        >
          صُنع بحب ❤️ — ساره السبيعي
        </p>
      </div>
    </main>
  );
}

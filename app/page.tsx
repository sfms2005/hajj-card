import { Gift, Landmark, Moon, Sun } from "lucide-react";
import Link from "next/link";

const destinations = [
  {
    href: "/mina",
    label: "منى",
    description: "بطاقات أيام التشريق",
    icon: Landmark,
  },
  {
    href: "/arafah",
    label: "عرفة",
    description: "يوم الدعاء الأعظم",
    icon: Sun,
  },
  {
    href: "/muzdalifah",
    label: "مزدلفة",
    description: "سكينة وليلة خير",
    icon: Moon,
  },
  {
    href: "/eid",
    label: "العيد",
    description: "فرحة العيد وبهجته",
    icon: Gift,
  },
] as const;

export default function HomePage() {
  return (
    <div className="relative min-h-screen px-4 py-16 sm:px-6 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(45,106,79,0.14),transparent_55%),radial-gradient(circle_at_90%_60%,rgba(201,162,39,0.15),transparent_45%)]" />

      <div className="mx-auto flex max-w-lg flex-col items-center gap-14">
        <header className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-medium tracking-[0.28em] text-[#2d6a4f]">
            حج مبرور وذنب مغفور
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-[#152a45] sm:text-4xl">
            بطاقات الحج والعيد
          </h1>
          <p className="max-w-sm text-sm leading-relaxed text-[#1e3a5f]/68">
            اختر الوجهة، ثم الصمّم بطاقتك وشاركها مع أحبابك
          </p>
        </header>

        <nav
          className="grid w-full gap-4 sm:grid-cols-2"
          aria-label="تصفح بطاقات المناسك"
        >
          {destinations.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex flex-col gap-4 rounded-[20px] border border-[#1e3a5f]/10 bg-white/75 p-6 shadow-[0_16px_40px_-24px_rgba(30,58,95,0.35)] backdrop-blur-sm transition duration-300 ease-out hover:-translate-y-0.5 hover:border-[#c9a227]/40 hover:shadow-[0_22px_48px_-20px_rgba(45,106,79,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f4f1e8]"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2d6a4f]/12 to-[#1e3a5f]/10 text-[#1e3a5f] transition group-hover:from-[#c9a227]/20 group-hover:to-[#2d6a4f]/15">
                <Icon className="size-[22px]" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="flex flex-col gap-1 text-right">
                <span className="text-lg font-semibold text-[#152a45]">
                  {label}
                </span>
                <span className="text-sm text-[#1e3a5f]/60">{description}</span>
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

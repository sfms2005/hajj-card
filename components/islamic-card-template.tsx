"use client";

import { forwardRef, type ReactNode } from "react";
import {
  type CardTemplateThemeId,
  cardTemplateThemeIds,
  getCardTemplateTheme,
} from "@/lib/card-template-themes";
import { mixHex, rgbaFromHex } from "@/lib/html2canvas-colors";

export type IslamicCardTemplateProps = {
  title: string;
  text: string;
  name: string;
  theme: CardTemplateThemeId;
  className?: string;
};

function CardWaves({ accent }: { accent: string }) {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 h-[32%] w-full"
      viewBox="0 0 320 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M0,54 C53,32 107,62 160,46 C213,30 267,58 320,42 L320,100 L0,100 Z"
        fill={accent}
        fillOpacity={0.13}
      />
      <path
        d="M0,68 C80,46 160,76 240,56 C280,46 305,58 320,52 L320,100 L0,100 Z"
        fill={accent}
        fillOpacity={0.24}
      />
      <path
        d="M0,82 C100,64 200,88 320,72 L320,100 L0,100 Z"
        fill={accent}
        fillOpacity={0.36}
      />
    </svg>
  );
}

function MinaLineIcon({ stroke }: { stroke: string }) {
  return (
    <svg
      viewBox="0 0 72 58"
      className="mx-auto h-[3.25rem] w-[4.5rem] shrink-0 sm:h-14 sm:w-[4.75rem]"
      fill="none"
      aria-hidden
    >
      <path
        d="M 38 9.5 c 0.8 -3.6 5.8 -5.2 8.8 -2.8 c 1.8 1.4 2.1 3.8 1 5.6 c -2 3 -6.8 3.4 -9.6 1.2 c -0.8 -0.6 -1.4 -1.4 -1.8 -2.3"
        stroke={stroke}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.92}
      />
      <path
        d="M 10 47 L 20 26 L 30 47 M 26 47 L 36 27 L 46 47 M 42 47 L 52 26 L 62 47"
        stroke={stroke}
        strokeWidth={1.35}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.88}
      />
      <path
        d="M 7 46.5 h 58"
        stroke={stroke}
        strokeWidth={1.2}
        strokeLinecap="round"
        opacity={0.45}
      />
    </svg>
  );
}

function OrnamentDivider({ color }: { color: string }) {
  return (
    <div className="flex w-full items-center gap-0 px-1">
      <div
        className="h-px min-w-0 flex-1"
        style={{ backgroundColor: color, opacity: 0.38 }}
      />
      <div
        className="mx-2.5 size-[7px] shrink-0 rotate-45 border-[1.5px] border-solid sm:mx-3 sm:size-2"
        style={{
          borderColor: color,
          backgroundColor: mixHex(color, "#ffffff", 0.14),
        }}
        aria-hidden
      />
      <div
        className="h-px min-w-0 flex-1"
        style={{ backgroundColor: color, opacity: 0.38 }}
      />
    </div>
  );
}

function CornerAccent({
  accent,
  className,
}: {
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M17.5 2.5C7 2.5 2.5 7 2.5 17.5M2.5 17.5v-3.5M2.5 17.5h3.5"
        stroke={accent}
        strokeWidth={1.05}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.5}
      />
    </svg>
  );
}

function DecoTextFrame({
  accent,
  textColor,
  children,
}: {
  accent: string;
  textColor: string;
  children: ReactNode;
}) {
  return (
    <div
      className="relative rounded-xl border border-solid px-3.5 py-4 sm:rounded-2xl sm:px-4 sm:py-5"
      style={{
        borderColor: rgbaFromHex(accent, 0.3),
        backgroundColor: mixHex("#ffffff", accent, 72 / 76),
      }}
    >
      <CornerAccent
        accent={accent}
        className="absolute -right-0.5 -top-0.5 h-5 w-5 sm:h-6 sm:w-6"
      />
      <CornerAccent
        accent={accent}
        className="absolute -left-0.5 -top-0.5 h-5 w-5 scale-x-[-1] sm:h-6 sm:w-6"
      />
      <CornerAccent
        accent={accent}
        className="absolute -bottom-0.5 -right-0.5 h-5 w-5 scale-y-[-1] sm:h-6 sm:w-6"
      />
      <CornerAccent
        accent={accent}
        className="absolute -bottom-0.5 -left-0.5 h-5 w-5 scale-[-1] sm:h-6 sm:w-6"
      />
      <div style={{ color: textColor }} className="text-center [&>p]:m-0">
        {children}
      </div>
    </div>
  );
}

function LeafSprig({
  accent,
  className,
}: {
  accent: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 36"
      className={className}
      fill="none"
      aria-hidden
    >
      <path
        d="M14 34V14M14 26c-6-4-8-10-6-14M14 22c5-3 7-8 5-12M14 18c-4-2-5-6-3-9M14 20c4-2 6-6 4-9"
        stroke={accent}
        strokeWidth={1.15}
        strokeLinecap="round"
        opacity={0.62}
      />
    </svg>
  );
}

function Pill({
  accent,
  textColor,
  subtleBg,
  children,
}: {
  accent: string;
  textColor: string;
  subtleBg: string;
  children: ReactNode;
}) {
  return (
    <span
      className="inline-block max-w-full truncate rounded-full px-4 py-1.5 text-center text-[0.8125rem] font-semibold sm:px-5 sm:py-2 sm:text-sm"
      style={{
        color: textColor,
        backgroundColor: subtleBg,
        boxShadow: `inset 0 0 0 1px ${rgbaFromHex(accent, 0.22)}`,
      }}
    >
      {children}
    </span>
  );
}

export const IslamicCardTemplate = forwardRef<
  HTMLDivElement,
  IslamicCardTemplateProps
>(function IslamicCardTemplate(
  { title, text, name, theme, className = "" },
  ref,
) {
  const t = getCardTemplateTheme(theme);
  const badgeBg = mixHex(t.accent, t.surface, 0.18);
  const namePillBg = mixHex(t.accent, t.surface, 0.12);

  return (
    <div
      ref={ref}
      dir="rtl"
      className={`relative aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[1.85rem] sm:max-w-[320px] sm:rounded-[2.1rem] ${className}`}
      style={{
        backgroundColor: t.surface,
        boxShadow: t.shadow,
      }}
    >
      <CardWaves accent={t.accent} />

      <div className="relative z-[1] flex h-full flex-col px-5 pb-[26%] pt-6 sm:px-6 sm:pt-7">
        <MinaLineIcon stroke={t.accent} />

        <div className="mt-3 flex justify-center sm:mt-3.5">
          <Pill
            accent={t.accent}
            textColor={t.text}
            subtleBg={badgeBg}
          >
            {title}
          </Pill>
        </div>

        <div className="mt-4 shrink-0 sm:mt-5">
          <OrnamentDivider color={t.accent} />
        </div>

        <div className="mt-3 min-h-0 flex flex-1 flex-col justify-center sm:mt-4">
          <DecoTextFrame accent={t.accent} textColor={t.text}>
            <p className="text-[0.95rem] font-bold leading-[1.75] sm:text-[1.05rem] sm:leading-[1.8]">
              {text}
            </p>
          </DecoTextFrame>
        </div>

        <div className="mt-3 shrink-0 sm:mt-4">
          <OrnamentDivider color={t.accent} />
        </div>

        <div className="mt-3 flex items-center justify-center gap-1.5 sm:mt-4 sm:gap-2">
          <LeafSprig accent={t.accent} className="h-8 w-5 shrink-0 opacity-90 sm:h-9 sm:w-5" />
          <Pill
            accent={t.accent}
            textColor={name.trim() ? t.text : t.mutedText}
            subtleBg={namePillBg}
          >
            {name.trim() ? name.trim() : "ضع اسمك هنا"}
          </Pill>
          <LeafSprig
            accent={t.accent}
            className="h-8 w-5 shrink-0 scale-x-[-1] opacity-90 sm:h-9 sm:w-5"
          />
        </div>
      </div>
    </div>
  );
});

IslamicCardTemplate.displayName = "IslamicCardTemplate";

export type CardThemeSelectorProps = {
  value: CardTemplateThemeId;
  onChange: (theme: CardTemplateThemeId) => void;
  /** Optional label for accessibility */
  "aria-label"?: string;
  className?: string;
};

export function CardThemeSelector({
  value,
  onChange,
  "aria-label": ariaLabel = "اختيار ألوان البطاقة",
  className = "",
}: CardThemeSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`flex flex-wrap items-center justify-center gap-3 ${className}`}
    >
      {cardTemplateThemeIds.map((id) => {
        const t = getCardTemplateTheme(id);
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={selected}
            title={t.label}
            onClick={() => onChange(id)}
            className="relative size-9 rounded-full border-2 transition focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:size-10"
            style={{
              background: t.gradient,
              borderColor: selected
                ? t.accent
                : mixHex(t.accent, "#ffffff", 0.22),
              boxShadow: selected
                ? `0 0 0 2px ${mixHex(t.accent, "#ffffff", 0.3)}, 0 6px 16px -6px rgba(15, 23, 42, 0.12)`
                : "0 2px 8px rgba(15, 23, 42, 0.08)",
              outlineColor: t.accent,
            }}
          >
            <span className="sr-only">{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export type {
  CardTemplateTheme,
  CardTemplateThemeId,
} from "@/lib/card-template-themes";

export {
  cardTemplateThemeIds,
  cardTemplateThemes,
  getCardTemplateTheme,
} from "@/lib/card-template-themes";

"use client";

import { forwardRef } from "react";
import { getCardTemplateTheme } from "@/lib/card-template-themes";
import type { CardTemplateThemeId } from "@/lib/card-template-themes";
import {
  mixAccentWithBlack,
  mixHex,
  rgbaFromHex,
} from "@/lib/html2canvas-colors";
import { arabicTextSurfaceStyle } from "@/lib/arabic-text";

export type PremiumCardData = {
  id: number;
  text: string;
  image: string;
  /** لون/ثيم البطاقة — يظهر في المعاينة وحلقة الاختيار */
  theme: CardTemplateThemeId;
};

export function PremiumCardGrid({
  cards,
  selectedId,
  onSelect,
}: {
  cards: PremiumCardData[];
  selectedId: number;
  onSelect: (card: PremiumCardData) => void;
}) {
  return (
    <div className="flex w-full max-w-md flex-wrap justify-center gap-3 sm:max-w-lg sm:gap-4" dir="rtl">
      {cards.map((card) => {
        const isSel = selectedId === card.id;
        const t = getCardTemplateTheme(card.theme);
        return (
          <button
            key={card.id}
            type="button"
            dir="rtl"
            onClick={() => onSelect(card)}
            className={`group relative aspect-[3/4] w-[calc(33.333%-0.5rem)] min-w-[4.75rem] max-w-[6.75rem] overflow-hidden rounded-[22px] text-right transition duration-300 ease-out focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#facc15] sm:min-w-[5.5rem] sm:max-w-[7.5rem] sm:rounded-[24px] ${
              isSel
                ? "z-10 scale-105 opacity-100 shadow-xl"
                : "opacity-[0.82] hover:scale-[1.03] hover:opacity-100"
            }`}
            style={{
              boxShadow: isSel
                ? `0 0 0 3px ${t.accent}, 0 22px 48px -14px rgba(15, 23, 42, 0.22)`
                : `0 0 0 1px ${rgbaFromHex(t.accent, 0.28)}`,
            }}
          >
            <span
              className="absolute inset-0 bg-cover bg-center transition duration-300 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url('${card.image}')` }}
              aria-hidden
            />
            <span
              className="absolute inset-0 transition duration-300"
              style={{
                background: `linear-gradient(165deg, rgba(0,0,0,0.38) 0%, ${mixAccentWithBlack(t.accent, 0.42)} 100%)`,
              }}
              aria-hidden
            />
            <span className="relative z-10 flex h-full min-h-0 items-center justify-center overflow-hidden p-1.5 sm:p-2.5">
              <span
                className="text-center text-[0.55rem] font-semibold leading-[1.35] text-balance drop-shadow-md sm:text-[0.62rem]"
                style={{ color: "#ffffff", ...arabicTextSurfaceStyle }}
              >
                {card.text}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

export const PremiumCardPreview = forwardRef<
  HTMLDivElement,
  { card: PremiumCardData; name: string }
>(function PremiumCardPreview({ card, name }, ref) {
  const t = getCardTemplateTheme(card.theme);

  return (
    <div
      ref={ref}
      dir="rtl"
      className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[24px] bg-[#1a1a1a] sm:max-w-[320px] sm:rounded-[26px]"
      style={{
        ...arabicTextSurfaceStyle,
        boxShadow: `0 0 0 3px ${rgbaFromHex(t.accent, 0.55)}, 0 24px 56px -14px rgba(15, 23, 42, 0.38)`,
      }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${card.image}')` }}
        aria-hidden
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(170deg, rgba(0,0,0,0.38) 0%, ${mixAccentWithBlack(t.accent, 0.38)} 100%)`,
        }}
        aria-hidden
      />
      <div
        className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-4 py-7 text-center sm:px-6 sm:py-9"
        style={{ color: "#ffffff", ...arabicTextSurfaceStyle }}
      >
        <p
          className="w-full text-pretty text-sm font-semibold leading-relaxed drop-shadow-md sm:text-[0.9rem] sm:leading-snug"
          style={arabicTextSurfaceStyle}
        >
          {card.text}
        </p>
        {name.trim() ? (
          <p
            className="mt-4 shrink-0 text-base font-bold drop-shadow-md sm:mt-5 sm:text-lg"
            style={{
              ...arabicTextSurfaceStyle,
              color: mixHex("#ffffff", t.accent, 0.92),
            }}
          >
            {name.trim()}
          </p>
        ) : (
          <p
            className="mt-4 min-h-[1.5rem] shrink-0 text-sm sm:mt-5 sm:text-base"
            style={{ color: "rgba(255, 255, 255, 0.5)", ...arabicTextSurfaceStyle }}
          >
            —
          </p>
        )}
      </div>
    </div>
  );
});

PremiumCardPreview.displayName = "PremiumCardPreview";

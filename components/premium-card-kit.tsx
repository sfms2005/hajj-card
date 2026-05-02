"use client";

import { forwardRef } from "react";
import {
  getCardTemplateTheme,
  isMuzdalifahNightTheme,
} from "@/lib/card-template-themes";
import type { CardTemplateThemeId } from "@/lib/card-template-themes";
import { mixHex, rgbaFromHex } from "@/lib/html2canvas-colors";
import { arabicTextSurfaceStyle } from "@/lib/arabic-text";

export type PremiumCardData = {
  id: number;
  text: string;
  image: string;
  /** لون/ثيم البطاقة */
  theme: CardTemplateThemeId;
};

function nameColor(t: ReturnType<typeof getCardTemplateTheme>, themeId: CardTemplateThemeId) {
  if (
    themeId === "minaDune" ||
    themeId === "muzNightSlate" ||
    themeId === "arafahPeace" ||
    themeId === "eidPearl" ||
    themeId === "eidSky" ||
    themeId === "eidTea"
  ) {
    return mixHex(t.text, t.accent, 0.48);
  }
  if (isMuzdalifahNightTheme(themeId)) {
    return mixHex(t.text, t.accent, 0.38);
  }
  if (themeId === "eidGrape") {
    return mixHex("#ffffff", "#ddd6fe", 0.38);
  }
  if (themeId === "eidPink") {
    return mixHex("#ffffff", "#fecdd3", 0.38);
  }
  return mixHex(t.text, t.accent, 0.5);
}

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
        const ring = isSel
          ? `0 0 0 2px ${t.accent}, ${t.shadow}`
          : `0 0 0 1px ${rgbaFromHex(t.accent, 0.35)}`;

        return (
          <button
            key={card.id}
            type="button"
            dir="rtl"
            onClick={() => onSelect(card)}
            className={`relative aspect-[3/4] w-[calc(33.333%-0.5rem)] min-w-[4.75rem] max-w-[6.75rem] overflow-hidden rounded-[22px] text-right transition duration-300 ease-out focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227] sm:min-w-[5.5rem] sm:max-w-[7.5rem] sm:rounded-[24px] ${
              isSel ? "z-10 scale-105" : "opacity-90 hover:opacity-100"
            }`}
            style={{
              backgroundColor: t.surface,
              boxShadow: ring,
            }}
          >
            <span className="relative z-10 flex h-full min-h-0 items-center justify-center p-1.5 sm:p-2.5">
              <span
                dir="rtl"
                className="text-center text-[0.55rem] font-medium leading-snug tracking-normal sm:text-[0.62rem]"
                style={{
                  color: t.text,
                  ...arabicTextSurfaceStyle,
                }}
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
  const nColor = nameColor(t, card.theme);

  return (
    <div
      ref={ref}
      dir="rtl"
      className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden rounded-[24px] sm:max-w-[320px] sm:rounded-[26px]"
      style={{
        backgroundColor: t.surface,
        boxShadow: `0 0 0 1px ${rgbaFromHex(t.accent, 0.28)}, ${t.shadow}`,
        ...arabicTextSurfaceStyle,
      }}
    >
      <div
        className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-4 py-7 text-center sm:px-6 sm:py-9"
        dir="rtl"
        style={{ color: t.text, ...arabicTextSurfaceStyle }}
      >
        <p
          className="w-full text-sm font-medium leading-relaxed tracking-normal sm:text-[0.9rem] sm:leading-snug"
          style={{
            color: t.text,
            ...arabicTextSurfaceStyle,
          }}
        >
          {card.text}
        </p>
        {name.trim() ? (
          <p
            className="mt-4 shrink-0 text-base font-semibold tracking-normal sm:mt-5 sm:text-lg"
            style={{
              color: nColor,
              ...arabicTextSurfaceStyle,
            }}
          >
            {name.trim()}
          </p>
        ) : (
          <p
            className="mt-4 min-h-[1.5rem] shrink-0 text-sm sm:mt-5 sm:text-base"
            style={{
              color: t.mutedText,
              ...arabicTextSurfaceStyle,
            }}
          >
            —
          </p>
        )}
      </div>
    </div>
  );
});

PremiumCardPreview.displayName = "PremiumCardPreview";

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
  /** خلفية الصورة أو الـ SVG؛ طبقة التلوين التلقائية تُلغى بـ `backgroundImagePlain` */
  backgroundImage?: string;
  /** بدون تدرج لوني فوق الخلفية */
  backgroundImagePlain?: boolean;
  /** لا يُعرض نص الدعاء داخل البطاقة */
  hideMessage?: boolean;
  /** لون/ثيم البطاقة */
  theme: CardTemplateThemeId;
};

function ThemedPhotoBackground({
  src,
  themeSurface,
  tint,
}: {
  src: string;
  themeSurface: string;
  tint: boolean;
}) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${src})` }}
      />
      {tint ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(165deg, ${rgbaFromHex(themeSurface, 0.38)} 0%, ${rgbaFromHex(themeSurface, 0.78)} 100%)`,
          }}
        />
      ) : null}
    </div>
  );
}

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
            aria-label={card.hideMessage ? `بطاقة ${card.id}` : undefined}
            onClick={() => onSelect(card)}
            className={`relative aspect-[3/4] w-[calc(33.333%-0.5rem)] min-w-[4.75rem] max-w-[6.75rem] overflow-hidden rounded-[22px] text-right transition duration-300 ease-out focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227] sm:min-w-[5.5rem] sm:max-w-[7.5rem] sm:rounded-[24px] ${
              isSel ? "z-10 scale-105" : "opacity-90 hover:opacity-100"
            }`}
            style={{
              ...(card.backgroundImage ? {} : { backgroundColor: t.surface }),
              boxShadow: ring,
            }}
          >
            {card.backgroundImage ? (
              <ThemedPhotoBackground
                src={card.backgroundImage}
                themeSurface={t.surface}
                tint={!card.backgroundImagePlain}
              />
            ) : null}
            {card.hideMessage ? null : (
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
            )}
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
        ...(card.backgroundImage ? {} : { backgroundColor: t.surface }),
        boxShadow: `0 0 0 1px ${rgbaFromHex(t.accent, 0.28)}, ${t.shadow}`,
        ...arabicTextSurfaceStyle,
      }}
    >
      {card.backgroundImage ? (
        <ThemedPhotoBackground
          src={card.backgroundImage}
          themeSurface={t.surface}
          tint={!card.backgroundImagePlain}
        />
      ) : null}
      {!card.hideMessage ? (
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
      ) : (
        <div
          className="relative z-10 flex h-full min-h-0 flex-col items-center justify-end px-4 pb-8 text-center sm:px-6 sm:pb-10"
          dir="rtl"
          style={{ color: t.text, ...arabicTextSurfaceStyle }}
        >
          {name.trim() ? (
            <p
              className="shrink-0 text-base font-semibold tracking-normal sm:text-lg"
              style={{
                color: nColor,
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
                ...arabicTextSurfaceStyle,
              }}
            >
              {name.trim()}
            </p>
          ) : (
            <p
              className="min-h-[1.5rem] shrink-0 text-sm sm:text-base"
              style={{
                color: t.mutedText,
                textShadow: "0 1px 2px rgba(0,0,0,0.25)",
                ...arabicTextSurfaceStyle,
              }}
            >
              —
            </p>
          )}
        </div>
      )}
    </div>
  );
});

PremiumCardPreview.displayName = "PremiumCardPreview";

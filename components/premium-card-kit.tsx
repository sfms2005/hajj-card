"use client";

import { forwardRef } from "react";
import {
  getCardTemplateTheme,
  isArafahSpiritTheme,
  isMinaStationTheme,
  isMuzdalifahNightTheme,
} from "@/lib/card-template-themes";
import type { CardTemplateThemeId } from "@/lib/card-template-themes";
import { mixHex, rgbaFromHex } from "@/lib/html2canvas-colors";
import { arabicTextSurfaceStyle } from "@/lib/arabic-text";
import {
  StationCardLogos,
  type StationLogoLayoutTweak,
} from "@/components/station-card-logos";

/** Islamic template layout — pass only from the Mina page. */
export type MinaIslamicTemplateOptions = {
  templateSrc: string;
};

const MINA_TEMPLATE_FILL = "#f7f5ef";
const MINA_TEXT_DUA = "#3d5345";
const MINA_TEXT_NAME = "#5a6d54";
const MINA_TEXT_NAME_EMPTY = "#8a9a82";

/** تخصيص اختياري لموضع/حجم دعاء القالب الإسلامي (شبكة + معاينة) لكل بطاقة */
export type MinaIslamicPerCardTextTweak = {
  /** استبدال كلاسات المسافات العلوية والجانبية المشتركة بعد `flex-col` */
  contentInsetClassName?: string;
  /** استبدال كلاس نص الدعاء في المصغّرة */
  gridDuaClassName?: string;
  /** استبدال كلاس نص الدعاء في المعاينة الكبيرة */
  previewDuaClassName?: string;
};

const MINA_ISLAMIC_CONTENT_INSET_DEFAULT =
  "items-center justify-start px-[10%] pb-[6%] pt-[79%] text-center sm:px-[11%] sm:pb-[7%] sm:pt-[84%]";
const MINA_ISLAMIC_GRID_DUA_DEFAULT =
  "line-clamp-5 max-w-[94%] text-center text-[0.62rem] font-medium leading-[1.78] sm:text-[0.76rem] sm:leading-[1.8]";
const MINA_ISLAMIC_PREVIEW_DUA_DEFAULT =
  "max-w-[94%] text-[1.18rem] font-medium leading-[1.78] sm:text-[1.34rem] sm:leading-[1.8]";

const minaArabicStyle = {
  ...arabicTextSurfaceStyle,
  fontFamily:
    '"Traditional Arabic", "Segoe UI", Tahoma, Arial, sans-serif',
} as const;

function MinaTemplateBackdrop({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-[inherit] bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${src})` }}
    />
  );
}

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
  /** خلفية قالب منى الإسلامي؛ إن وُجد يُستخدم بدل `minaIslamicTemplate.templateSrc`. */
  minaTemplateBackground?: string;
  /** موضع/حجم دعاء القالب الإسلامي لهذه البطاقة فقط */
  minaIslamicTextTweak?: MinaIslamicPerCardTextTweak;
  /** مواضع شعارات السعادة/قاصد لهذه البطاقة فقط */
  stationLogoTweak?: StationLogoLayoutTweak;
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
  minaIslamicTemplate,
}: {
  cards: PremiumCardData[];
  selectedId: number;
  onSelect: (card: PremiumCardData) => void;
  minaIslamicTemplate?: MinaIslamicTemplateOptions;
}) {
  if (minaIslamicTemplate) {
    const { templateSrc } = minaIslamicTemplate;
    return (
      <div
        className="flex w-full max-w-md flex-wrap justify-center gap-3 sm:max-w-lg sm:gap-4"
        dir="rtl"
      >
        {cards.map((card) => {
          const isSel = selectedId === card.id;
          const t = getCardTemplateTheme(card.theme);
          const ring = isSel
            ? `0 0 0 2px ${t.accent}, ${t.shadow}`
            : `0 0 0 1px ${rgbaFromHex(t.accent, 0.35)}`;
          const inset =
            card.minaIslamicTextTweak?.contentInsetClassName ??
            MINA_ISLAMIC_CONTENT_INSET_DEFAULT;
          const gridDua =
            card.minaIslamicTextTweak?.gridDuaClassName ??
            MINA_ISLAMIC_GRID_DUA_DEFAULT;

          return (
            <button
              key={card.id}
              type="button"
              dir="rtl"
              onClick={() => onSelect(card)}
              className={`relative aspect-[2160/3360] w-[calc(33.333%-0.5rem)] min-w-[4.75rem] max-w-[6.75rem] overflow-hidden rounded-[8px] text-right transition duration-300 ease-out focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227] sm:min-w-[5.5rem] sm:max-w-[7.5rem] sm:rounded-[9px] ${
                isSel ? "z-10 scale-105" : "opacity-90 hover:opacity-100"
              }`}
              style={{
                backgroundColor: MINA_TEMPLATE_FILL,
                boxShadow: ring,
              }}
            >
              <MinaTemplateBackdrop
                src={card.minaTemplateBackground ?? templateSrc}
              />
              <span
                className={`relative z-10 flex h-full min-h-0 flex-col ${inset}`}
              >
                <span
                  dir="rtl"
                  className={gridDua}
                  style={{
                    color: MINA_TEXT_DUA,
                    ...minaArabicStyle,
                  }}
                >
                  {card.text}
                </span>
              </span>
              <StationCardLogos tweak={card.stationLogoTweak} />
            </button>
          );
        })}
      </div>
    );
  }

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
            className={`relative aspect-[2160/3360] w-[calc(33.333%-0.5rem)] min-w-[4.75rem] max-w-[6.75rem] overflow-hidden rounded-[8px] text-right transition duration-300 ease-out focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a227] sm:min-w-[5.5rem] sm:max-w-[7.5rem] sm:rounded-[9px] ${
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
              <span className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-[5%] py-[6%] text-center sm:px-[6%] sm:py-[7%]">
                <span
                  dir="rtl"
                  className="w-full text-center text-[0.53rem] font-medium leading-relaxed tracking-normal sm:text-[0.62rem] sm:leading-snug"
                  style={{
                    color: t.text,
                    ...arabicTextSurfaceStyle,
                  }}
                >
                  {card.text}
                </span>
              </span>
            )}
            <StationCardLogos tweak={card.stationLogoTweak} />
          </button>
        );
      })}
    </div>
  );
}

export const PremiumCardPreview = forwardRef<
  HTMLDivElement,
  {
    card: PremiumCardData;
    name: string;
    minaIslamicTemplate?: MinaIslamicTemplateOptions;
  }
>(function PremiumCardPreview({ card, name, minaIslamicTemplate }, ref) {
  if (minaIslamicTemplate) {
    const { templateSrc } = minaIslamicTemplate;
    const inset =
      card.minaIslamicTextTweak?.contentInsetClassName ??
      MINA_ISLAMIC_CONTENT_INSET_DEFAULT;
    const previewDua =
      card.minaIslamicTextTweak?.previewDuaClassName ??
      MINA_ISLAMIC_PREVIEW_DUA_DEFAULT;
    const extraNameTopMargin =
      isMuzdalifahNightTheme(card.theme) ||
      isMinaStationTheme(card.theme) ||
      isArafahSpiritTheme(card.theme);
    const nameMtClass = extraNameTopMargin
      ? "mt-14 shrink-0 text-[1.1rem] font-semibold sm:mt-16 sm:text-[1.26rem]"
      : "mt-7 shrink-0 text-[1.1rem] font-semibold sm:mt-8 sm:text-[1.26rem]";
    const nameEmptyMtClass = extraNameTopMargin
      ? "mt-14 min-h-[1.35rem] shrink-0 text-[1.05rem] sm:mt-16 sm:text-[1.18rem]"
      : "mt-7 min-h-[1.35rem] shrink-0 text-[1.05rem] sm:mt-8 sm:text-[1.18rem]";
    return (
      <div
        ref={ref}
        dir="rtl"
        className="relative mx-auto flex aspect-[2160/3360] w-full max-w-[320px] flex-col overflow-hidden rounded-[24px] sm:max-w-[360px] sm:rounded-[26px]"
        style={{
          backgroundColor: MINA_TEMPLATE_FILL,
          boxShadow:
            "0 0 0 1px rgba(82,98,78,0.12), 0 22px 50px -26px rgba(45,55,42,0.16)",
          ...minaArabicStyle,
        }}
      >
        <MinaTemplateBackdrop
          src={card.minaTemplateBackground ?? templateSrc}
        />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <div
            className={`flex min-h-0 flex-1 flex-col ${inset}`}
            dir="rtl"
          >
            <p
              className={previewDua}
              style={{ color: MINA_TEXT_DUA, ...minaArabicStyle }}
            >
              {card.text}
            </p>
            {name.trim() ? (
              <p
                className={nameMtClass}
                style={{ color: MINA_TEXT_NAME, ...minaArabicStyle }}
              >
                {name.trim()}
              </p>
            ) : (
              <p
                className={nameEmptyMtClass}
                style={{ color: MINA_TEXT_NAME_EMPTY, ...minaArabicStyle }}
              >
                —
              </p>
            )}
          </div>
        </div>
        <StationCardLogos tweak={card.stationLogoTweak} />
      </div>
    );
  }

  const t = getCardTemplateTheme(card.theme);
  const nColor = nameColor(t, card.theme);

  return (
    <div
      ref={ref}
      dir="rtl"
      className="relative mx-auto aspect-[2160/3360] w-full max-w-[320px] overflow-hidden rounded-[24px] sm:max-w-[360px] sm:rounded-[26px]"
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
            className="w-full text-[0.95rem] font-medium leading-relaxed tracking-normal sm:text-[1.02rem] sm:leading-snug"
            style={{
              color: t.text,
              ...arabicTextSurfaceStyle,
            }}
          >
            {card.text}
          </p>
          {name.trim() ? (
            <p
              className="mt-10 shrink-0 text-base font-semibold tracking-normal sm:mt-11 sm:text-lg"
              style={{
                color: nColor,
                ...arabicTextSurfaceStyle,
              }}
            >
              {name.trim()}
            </p>
          ) : (
            <p
              className="mt-10 min-h-[1.5rem] shrink-0 text-sm sm:mt-11 sm:text-base"
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
          className="relative z-10 flex h-full min-h-0 flex-col items-center justify-end px-4 pb-[4.25rem] text-center sm:px-6 sm:pb-[4.5rem]"
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
      <StationCardLogos tweak={card.stationLogoTweak} />
    </div>
  );
});

PremiumCardPreview.displayName = "PremiumCardPreview";

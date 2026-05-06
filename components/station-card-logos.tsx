"use client";

/** مسارات ثابتة من `public/` — ملاحظة حساسية الاسم: happy_logo.PNG */
export const STATION_QASED_LOGO_SRC = "/qased2_logo.png";
export const STATION_HAPPY_LOGO_SRC = "/happy_logo.PNG";

/** تخصيص اختياري لمواضع/قياسات الشعارات لكل بطاقة */
export type StationLogoLayoutTweak = {
  happyTop?: string;
  qasedTop?: string;
  happyCorner?: string;
  qasedCorner?: string;
  happyImg?: string;
  qasedImg?: string;
};

/**
 * قاصد يمين، Happiness Team يسار.
 * المواضع والأحجام كنِسَب من البطقة؛ يمكن تجاوزها بـ `tweak`.
 */
export function StationCardLogos({
  tweak,
}: {
  tweak?: StationLogoLayoutTweak;
}) {
  const happyTop = tweak?.happyTop ?? "top-[24%]";
  const qasedTop = tweak?.qasedTop ?? "top-[19%]";
  const happyCorner =
    tweak?.happyCorner ?? "left-[12.5%] sm:left-[13.5%]";
  const qasedCorner =
    tweak?.qasedCorner ?? "right-[15%] sm:right-[15.5%]";
  const happyImg =
    tweak?.happyImg ??
    "max-h-[12.9%] max-w-[42%] sm:max-h-[13.3%] sm:max-w-[42%]";
  const qasedImg =
    tweak?.qasedImg ??
    "max-h-[24.2%] max-w-[66%] sm:max-h-[24.5%] sm:max-w-[66%]";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[35]"
    >
      <img
        src={STATION_HAPPY_LOGO_SRC}
        alt=""
        decoding="async"
        draggable={false}
        className={`pointer-events-none absolute ${happyTop} ${happyCorner} h-auto w-auto object-contain ${happyImg}`}
      />
      <img
        src={STATION_QASED_LOGO_SRC}
        alt=""
        decoding="async"
        draggable={false}
        className={`pointer-events-none absolute ${qasedTop} ${qasedCorner} h-auto w-auto object-contain ${qasedImg}`}
      />
    </div>
  );
}

/** Canonical pixel size for card previews & PNG exports (عرض × ارتفاع). */
export const CARD_EXPORT_WIDTH_PX = 2160;
export const CARD_EXPORT_HEIGHT_PX = 3360;

/**
 * لقطة أغلى من الهدف ثم تصغير إلى 2160×3360 تعطي حواف أوضح من تصعيد لوحة صغيرة.
 * الحد الأقصى يحمي الذاكرة على الجوال.
 */
const HTML2CANVAS_SUPER_SAMPLE = 1.65;
const HTML2CANVAS_MAX_SCALE = 10;
const HTML2CANVAS_MIN_SCALE = 2;

/**
 * Scale so the rendered card maps ~1:1 to export width; height follows aspect ratio.
 */
export function getStationCardHtml2canvasScale(element: HTMLElement): number {
  const rect = element.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const base = CARD_EXPORT_WIDTH_PX / w;
  const scaled = base * HTML2CANVAS_SUPER_SAMPLE;
  return Math.min(
    Math.max(scaled, HTML2CANVAS_MIN_SCALE),
    HTML2CANVAS_MAX_SCALE,
  );
}

/** Resample captured canvas to exact export dimensions (high-quality smoothing). */
export function normalizeCardExportCanvas(
  source: HTMLCanvasElement,
): HTMLCanvasElement {
  const dw = Math.abs(source.width - CARD_EXPORT_WIDTH_PX);
  const dh = Math.abs(source.height - CARD_EXPORT_HEIGHT_PX);
  // تجنّب إعادة الرسم إذا كانت الأبعاد تقريبًا مطابقة — يقلّل ضبابية إضافية.
  if (dw <= 2 && dh <= 2) {
    return source;
  }

  const out = document.createElement("canvas");
  out.width = CARD_EXPORT_WIDTH_PX;
  out.height = CARD_EXPORT_HEIGHT_PX;
  const ctx = out.getContext("2d");
  if (!ctx) return source;

  const downscaling =
    source.width >= CARD_EXPORT_WIDTH_PX &&
    source.height >= CARD_EXPORT_HEIGHT_PX;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = downscaling ? "high" : "medium";
  ctx.drawImage(source, 0, 0, CARD_EXPORT_WIDTH_PX, CARD_EXPORT_HEIGHT_PX);
  return out;
}

import type { CSSProperties } from "react";

/** Arabic shaping + html2canvas: system fonts with reliable joining (no letter-spacing). */
export const ARABIC_FONT_STACK = "Tahoma, Arial, sans-serif" as const;

export const arabicTextSurfaceStyle: CSSProperties = {
  fontFamily: ARABIC_FONT_STACK,
  letterSpacing: 0,
  wordSpacing: "normal",
  fontFeatureSettings: "normal",
};

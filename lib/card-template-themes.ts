export type CardTemplateThemeId =
  | "green"
  | "gold"
  | "blue"
  | "purple"
  | "neutral";

export type CardTemplateTheme = {
  id: CardTemplateThemeId;
  /** Screen reader / tooltip */
  label: string;
  /** Card face — cream / off-white (slight tint per theme) */
  surface: string;
  /** Small UI preview (selector swatch) */
  gradient: string;
  /** Main headings & dua */
  text: string;
  /** Secondary label tone */
  mutedText: string;
  /** Waves, strokes, frame, sprigs */
  accent: string;
  /** Soft card shadow */
  shadow: string;
};

const softLift =
  "0 22px 56px -20px rgba(15, 23, 42, 0.11), 0 10px 26px -14px rgba(15, 23, 42, 0.06)";

export const cardTemplateThemes: Record<CardTemplateThemeId, CardTemplateTheme> =
  {
    green: {
      id: "green",
      label: "أخضر زمردي",
      surface: "#fdfcf8",
      gradient:
        "linear-gradient(165deg, #fdfcf8 0%, color-mix(in srgb, #5d8a6a 10%, #fdfcf8) 100%)",
      text: "#2a4a38",
      mutedText: "#3d5c4a",
      accent: "#5d8a6a",
      shadow: softLift,
    },
    gold: {
      id: "gold",
      label: "ذهبي دافئ",
      surface: "#fdfaf4",
      gradient:
        "linear-gradient(165deg, #fdfaf4 0%, color-mix(in srgb, #b08950 11%, #fdfaf4) 100%)",
      text: "#4a3d2c",
      mutedText: "#6b5d48",
      accent: "#b08950",
      shadow: softLift,
    },
    blue: {
      id: "blue",
      label: "أزرق هادئ",
      surface: "#f9fbfd",
      gradient:
        "linear-gradient(165deg, #f9fbfd 0%, color-mix(in srgb, #5c7fa1 10%, #f9fbfd) 100%)",
      text: "#243A52",
      mutedText: "#4a5f78",
      accent: "#5c7fa1",
      shadow: softLift,
    },
    purple: {
      id: "purple",
      label: "بنفسجي هادئ",
      surface: "#fcf9fc",
      gradient:
        "linear-gradient(165deg, #fcf9fc 0%, color-mix(in srgb, #8574ad 10%, #fcf9fc) 100%)",
      text: "#3a3248",
      mutedText: "#5c5470",
      accent: "#8574ad",
      shadow: softLift,
    },
    neutral: {
      id: "neutral",
      label: "محايد",
      surface: "#fbfbf9",
      gradient:
        "linear-gradient(165deg, #fbfbf9 0%, color-mix(in srgb, #7c786f 9%, #fbfbf9) 100%)",
      text: "#2c2b28",
      mutedText: "#5a5852",
      accent: "#7c786f",
      shadow: softLift,
    },
  };

export const cardTemplateThemeIds = Object.keys(
  cardTemplateThemes,
) as CardTemplateThemeId[];

export function getCardTemplateTheme(
  id: CardTemplateThemeId,
): CardTemplateTheme {
  return cardTemplateThemes[id];
}

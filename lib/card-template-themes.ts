import { mixHex } from "./html2canvas-colors";

export type CardTemplateThemeId =
  | "green"
  | "gold"
  | "blue"
  | "purple"
  | "neutral"
  | "minaSage"
  | "minaGilded"
  | "minaDune"
  /** مزدلفة — ألوان ترابية دافئة */
  | "muzNightDeep"
  | "muzNightNavy"
  | "muzNightSlate"
  | "arafahPeace"
  | "arafahRadiance"
  | "arafahGrace"
  | "eidPearl"
  | "eidGrape"
  | "eidPink"
  | "eidSky"
  | "eidTea";

export type CardTemplateTheme = {
  id: CardTemplateThemeId;
  label: string;
  surface: string;
  gradient: string;
  text: string;
  mutedText: string;
  accent: string;
  shadow: string;
};

const softLift =
  "0 22px 56px -20px rgba(15, 23, 42, 0.11), 0 10px 26px -14px rgba(15, 23, 42, 0.06)";

const minimalLiftWarm = "0 10px 28px -12px rgba(101, 76, 79, 0.18)";
const minimalLift = "0 10px 28px -12px rgba(0, 0, 0, 0.12)";
const minimalLiftDark = "0 12px 32px -12px rgba(0, 0, 0, 0.28)";

function solid(c: string): string {
  return `linear-gradient(180deg, ${c} 0%, ${c} 100%)`;
}

/** Page palettes — one main fill per card, high-contrast text. */
const MINA_A = "#5D2A42";
const MINA_B = "#FB6376";
const MINA_C = "#FCB1A6";

const ARAF_A = "#BDC667";
const ARAF_B = "#77966D";
const ARAF_C = "#626D58";

const MUZ_A = "#654C4F";
const MUZ_B = "#B26E63";
const MUZ_C = "#CEC075";

const EID_PEARL = "#F4E4BA";
const EID_GRAPE = "#6A4C93";
const EID_PINK = "#EF798A";
const EID_SKY = "#C6E0FF";
const EID_TEA = "#C0DFA1";

export const cardTemplateThemes: Record<CardTemplateThemeId, CardTemplateTheme> =
  {
    green: {
      id: "green",
      label: "أخضر زمردي",
      surface: "#fdfcf8",
      gradient: solid("#fdfcf8"),
      text: "#2a4a38",
      mutedText: "#3d5c4a",
      accent: "#5d8a6a",
      shadow: softLift,
    },
    gold: {
      id: "gold",
      label: "ذهبي دافئ",
      surface: "#fdfaf4",
      gradient: solid("#fdfaf4"),
      text: "#4a3d2c",
      mutedText: "#6b5d48",
      accent: "#b08950",
      shadow: softLift,
    },
    blue: {
      id: "blue",
      label: "أزرق هادئ",
      surface: "#f9fbfd",
      gradient: solid("#f9fbfd"),
      text: "#243A52",
      mutedText: "#4a5f78",
      accent: "#5c7fa1",
      shadow: softLift,
    },
    purple: {
      id: "purple",
      label: "بنفسجي هادئ",
      surface: "#fcf9fc",
      gradient: solid("#fcf9fc"),
      text: "#3a3248",
      mutedText: "#5c5470",
      accent: "#8574ad",
      shadow: softLift,
    },
    neutral: {
      id: "neutral",
      label: "محايد",
      surface: "#fbfbf9",
      gradient: solid("#fbfbf9"),
      text: "#2c2b28",
      mutedText: "#5a5852",
      accent: "#7c786f",
      shadow: softLift,
    },
    minaSage: {
      id: "minaSage",
      label: "منى",
      surface: MINA_A,
      gradient: solid(MINA_A),
      text: "#fafaf9",
      mutedText: "#e7e5e4",
      accent: mixHex(MINA_A, "#000000", 0.18),
      shadow: minimalLift,
    },
    minaGilded: {
      id: "minaGilded",
      label: "منى",
      surface: MINA_B,
      gradient: solid(MINA_B),
      text: "#fafaf9",
      mutedText: "#ffe4e6",
      accent: mixHex(MINA_B, "#000000", 0.12),
      shadow: minimalLift,
    },
    minaDune: {
      id: "minaDune",
      label: "منى",
      surface: MINA_C,
      gradient: solid(MINA_C),
      text: "#1c1917",
      mutedText: "#57534e",
      accent: mixHex(MINA_C, MINA_A, 0.28),
      shadow: minimalLift,
    },
    muzNightDeep: {
      id: "muzNightDeep",
      label: "مزدلفة",
      surface: MUZ_A,
      gradient: solid(MUZ_A),
      text: "#fafaf9",
      mutedText: "#d6d3d1",
      accent: mixHex(MUZ_A, "#000000", 0.2),
      shadow: minimalLiftWarm,
    },
    muzNightNavy: {
      id: "muzNightNavy",
      label: "مزدلفة",
      surface: MUZ_B,
      gradient: solid(MUZ_B),
      text: "#fafaf9",
      mutedText: "#e7e5e4",
      accent: mixHex(MUZ_B, "#000000", 0.15),
      shadow: minimalLiftWarm,
    },
    muzNightSlate: {
      id: "muzNightSlate",
      label: "مزدلفة",
      surface: MUZ_C,
      gradient: solid(MUZ_C),
      text: "#1c1917",
      mutedText: "#57534e",
      accent: mixHex(MUZ_C, "#654C4F", 0.3),
      shadow: minimalLiftWarm,
    },
    arafahPeace: {
      id: "arafahPeace",
      label: "عرفة",
      surface: ARAF_A,
      gradient: solid(ARAF_A),
      text: "#1c1917",
      mutedText: "#57534e",
      accent: mixHex(ARAF_A, ARAF_C, 0.22),
      shadow: minimalLift,
    },
    arafahRadiance: {
      id: "arafahRadiance",
      label: "عرفة",
      surface: ARAF_B,
      gradient: solid(ARAF_B),
      text: "#fafaf9",
      mutedText: "#e7e5e4",
      accent: mixHex(ARAF_B, "#000000", 0.12),
      shadow: minimalLift,
    },
    arafahGrace: {
      id: "arafahGrace",
      label: "عرفة",
      surface: ARAF_C,
      gradient: solid(ARAF_C),
      text: "#fafaf9",
      mutedText: "#d6d3d1",
      accent: mixHex(ARAF_C, "#000000", 0.15),
      shadow: minimalLift,
    },
    eidPearl: {
      id: "eidPearl",
      label: "العيد — بيج لؤلؤي",
      surface: EID_PEARL,
      gradient: solid(EID_PEARL),
      text: "#1c1917",
      mutedText: "#57534e",
      accent: mixHex(EID_PEARL, "#92400e", 0.2),
      shadow: minimalLift,
    },
    eidGrape: {
      id: "eidGrape",
      label: "العيد — عنب باهت",
      surface: EID_GRAPE,
      gradient: solid(EID_GRAPE),
      text: "#fafaf9",
      mutedText: "#e9d5ff",
      accent: mixHex(EID_GRAPE, "#000000", 0.14),
      shadow: minimalLift,
    },
    eidPink: {
      id: "eidPink",
      label: "العيد — وردي",
      surface: EID_PINK,
      gradient: solid(EID_PINK),
      text: "#fafaf9",
      mutedText: "#ffe4e6",
      accent: mixHex(EID_PINK, "#000000", 0.12),
      shadow: minimalLift,
    },
    eidSky: {
      id: "eidSky",
      label: "العيد — أزرق سماوي",
      surface: EID_SKY,
      gradient: solid(EID_SKY),
      text: "#1e293b",
      mutedText: "#475569",
      accent: mixHex(EID_SKY, "#1e40af", 0.22),
      shadow: minimalLift,
    },
    eidTea: {
      id: "eidTea",
      label: "العيد — أخضر شاي",
      surface: EID_TEA,
      gradient: solid(EID_TEA),
      text: "#1c1917",
      mutedText: "#3f6212",
      accent: mixHex(EID_TEA, "#365314", 0.25),
      shadow: minimalLift,
    },
  };

export const cardTemplateThemeIds = Object.keys(
  cardTemplateThemes,
) as CardTemplateThemeId[];

export function isMinaStationTheme(id: CardTemplateThemeId): boolean {
  return id === "minaSage" || id === "minaGilded" || id === "minaDune";
}

export function isMuzdalifahNightTheme(id: CardTemplateThemeId): boolean {
  return (
    id === "muzNightDeep" || id === "muzNightNavy" || id === "muzNightSlate"
  );
}

export function isArafahSpiritTheme(id: CardTemplateThemeId): boolean {
  return (
    id === "arafahPeace" || id === "arafahRadiance" || id === "arafahGrace"
  );
}

export function isEidFestiveTheme(id: CardTemplateThemeId): boolean {
  return (
    id === "eidPearl" ||
    id === "eidGrape" ||
    id === "eidPink" ||
    id === "eidSky" ||
    id === "eidTea"
  );
}

export function getCardTemplateTheme(
  id: CardTemplateThemeId,
): CardTemplateTheme {
  return cardTemplateThemes[id];
}

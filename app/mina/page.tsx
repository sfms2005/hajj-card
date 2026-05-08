"use client";

import html2canvas from "html2canvas";
import { useRef, useState } from "react";
import { StationActionBar } from "@/components/station-action-bar";
import {
  PremiumCardData,
  PremiumCardGrid,
  PremiumCardPreview,
} from "@/components/premium-card-kit";
import { StationPageShell } from "@/components/station-page-shell";
import {
  getStationCardHtml2canvasScale,
  normalizeCardExportCanvas,
} from "@/lib/card-dimensions";
import { arabicTextSurfaceStyle } from "@/lib/arabic-text";

const CARDS: PremiumCardData[] = [
  {
    id: 1,
    image: "/mina1.jpg",
    minaTemplateBackground: "/blue_card.png",
    theme: "minaSage",
    text: "اللهم تقبل منا ومنكم، واجعل حجنا مبرورًا وسعينا مشكورًا وذنبنا مغفورًا.",
  },
  {
    id: 2,
    image: "/mina2.jpg",
    minaTemplateBackground: "/purple_card.png",
    theme: "minaGilded",
    text: "اللهم ارزقنا القبول والرضا، واكتب لنا تمام الأجر وحسن الخاتمة.",
  },
  {
    id: 3,
    image: "/mina3.jpg",
    minaTemplateBackground: "/green_card.png",
    theme: "minaDune",
    text: "اللهم أعنا على ذكرك وشكرك وحسن عبادتك، واجعلنا من المقبولين.",
  },
  {
    id: 4,
    image: "/mina4.jpg",
    minaTemplateBackground: "/blue_card.png",
    theme: "minaSage",
    text: "اللهم في يوم التروية ارزق من أحب راحةً تملأ قلبه، وبركةً في عمره ورزقه، وطمأنينةً لا تزول.",
  },
  {
    id: 5,
    image: "/mina5.jpg",
    minaTemplateBackground: "/purple_card.png",
    theme: "minaGilded",
    text: "من منى أرفع دعائي لك: اللهم احفظ من أحب بعينك التي لا تنام، ووفقه لكل خير.",
  },
  {
    id: 6,
    image: "/mina6.jpg",
    minaTemplateBackground: "/green_card.png",
    theme: "minaDune",
    text: "اللهم في هذه المشاعر المباركة اجعل لمن أحب نصيبًا من الرحمة والمغفرة والقبول.",
  },
];

/** Shared Islamic template art — contained, no crop/stretch on card surface */
const MINA_ISLAMIC_TEMPLATE = "/mina_c1.png";

export default function MinaPage() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<PremiumCardData>(CARDS[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    const el = cardRef.current;
    if (!el) return;
    const raw = await html2canvas(el, {
      scale: getStationCardHtml2canvasScale(el),
      useCORS: true,
      backgroundColor: "#f7f5ef",
      logging: false,
      allowTaint: false,
    });
    const canvas = normalizeCardExportCanvas(raw);
    const link = document.createElement("a");
    link.download = "mina-hajj-card.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const sharePage = async () => {
    const url = window.location.href;
    const title = "بطاقات منى";
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "اختر بطاقة وأضف اسمك",
          url,
        });
        return;
      } catch {
        /* user cancelled */
      }
    }
    await navigator.clipboard.writeText(url);
    alert("تم نسخ رابط الصفحة.");
  };

  return (
    <StationPageShell title="بطاقات منى">
      <PremiumCardGrid
        cards={CARDS}
        selectedId={selected.id}
        minaIslamicTemplate={{ templateSrc: MINA_ISLAMIC_TEMPLATE }}
        onSelect={setSelected}
      />
      <PremiumCardPreview
        ref={cardRef}
        card={selected}
        name={name}
        minaIslamicTemplate={{ templateSrc: MINA_ISLAMIC_TEMPLATE }}
      />
      <label className="sr-only" htmlFor="mina-name">
        اسمك على البطاقة
      </label>
      <input
        id="mina-name"
        dir="rtl"
        style={arabicTextSurfaceStyle}
        className="w-full max-w-[360px] rounded-2xl border border-[#e8e4dc] bg-white px-4 py-3.5 text-right text-base text-[#1e293b] shadow-[0_2px_20px_-8px_rgba(30,58,95,0.08)] outline-none ring-2 ring-[rgba(201,162,39,0.2)] placeholder:text-[#94a3b8] focus:border-[rgba(201,162,39,0.5)] focus:ring-[rgba(201,162,39,0.35)]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اكتب اسمك"
        autoComplete="off"
      />
      <StationActionBar onDownload={downloadCard} onShare={sharePage} />
    </StationPageShell>
  );
}

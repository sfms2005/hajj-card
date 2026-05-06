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
    image: "/arafah1.jpg",
    minaTemplateBackground: "/blue_card.png",
    theme: "arafahPeace",
    text: "اللهم إنك عفو تحب العفو فاعفُ عنا، واغفر لنا وارحمنا.",
  },
  {
    id: 2,
    image: "/arafah2.jpg",
    minaTemplateBackground: "/purple_card.png",
    theme: "arafahRadiance",
    text: "اللهم اعتق رقابنا من النار، واكتبنا من أهل الجنة.",
  },
  {
    id: 3,
    image: "/arafah3.jpg",
    minaTemplateBackground: "/green_card.png",
    theme: "arafahGrace",
    text: "اللهم تقبل دعاءنا واغفر زلاتنا، وحقق لنا ما نتمنى.",
  },
];

/** نفس قالب منى — خلفيات البطاقات من `minaTemplateBackground` لكل بطاقة */
const ARAFAH_ISLAMIC_TEMPLATE = "/mina_c1.png";

export default function ArafahPage() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<PremiumCardData>(CARDS[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadBlob = async (): Promise<Blob | null> => {
    const el = cardRef.current;
    if (!el) return null;
    const raw = await html2canvas(el, {
      scale: getStationCardHtml2canvasScale(el),
      useCORS: true,
      backgroundColor: "#f7f5ef",
      logging: false,
      allowTaint: false,
    });
    const canvas = normalizeCardExportCanvas(raw);
    return new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/png");
    });
  };

  const downloadCard = async () => {
    const blob = await downloadBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "arafah-hajj-card.png";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareCard = async () => {
    const blob = await downloadBlob();
    if (!blob) {
      await downloadCard();
      return;
    }

    const file = new File([blob], "arafah-hajj-card.png", { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "بطاقة عرفة",
          text: name ? `بطاقة لِـ ${name}` : undefined,
        });
        return;
      } catch {
        /* fallback below */
      }
    }
    await downloadCard();
  };

  return (
    <StationPageShell title="بطاقات عرفة">
      <PremiumCardGrid
        cards={CARDS}
        selectedId={selected.id}
        minaIslamicTemplate={{ templateSrc: ARAFAH_ISLAMIC_TEMPLATE }}
        onSelect={setSelected}
      />
      <PremiumCardPreview
        ref={cardRef}
        card={selected}
        name={name}
        minaIslamicTemplate={{ templateSrc: ARAFAH_ISLAMIC_TEMPLATE }}
      />
      <label className="sr-only" htmlFor="arafah-name">
        اسمك على البطاقة
      </label>
      <input
        id="arafah-name"
        dir="rtl"
        style={arabicTextSurfaceStyle}
        className="w-full max-w-[360px] rounded-2xl border border-[#e8e4dc] bg-white px-4 py-3.5 text-right text-base text-[#1e293b] shadow-[0_2px_20px_-8px_rgba(30,58,95,0.08)] outline-none ring-2 ring-[rgba(201,162,39,0.2)] placeholder:text-[#94a3b8] focus:border-[rgba(201,162,39,0.5)] focus:ring-[rgba(201,162,39,0.35)]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اكتب اسمك"
        autoComplete="off"
      />
      <StationActionBar onDownload={downloadCard} onShare={shareCard} />
    </StationPageShell>
  );
}

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
import { arabicTextSurfaceStyle } from "@/lib/arabic-text";

const CARDS: PremiumCardData[] = [
  {
    id: 1,
    image: "/eid1.jpg",
    theme: "eidPearl",
    text: "عيدكم مبارك، وتقبل الله منا ومنكم صالح الأعمال.",
  },
  {
    id: 2,
    image: "/eid2.jpg",
    theme: "eidGrape",
    text: "كل عام وأنتم بخير، أعاده الله عليكم بالصحة والسعادة.",
  },
  {
    id: 3,
    image: "/eid3.jpg",
    theme: "eidPink",
    text: "مبارك عليكم العيد، وجعل أيامكم أفراحًا وبركة.",
  },
  {
    id: 4,
    image: "/eid4.jpg",
    theme: "eidSky",
    text: "تقبل الله طاعتكم، ورفع قدركم، وجمعنا وإياكم على الخير.",
  },
  {
    id: 5,
    image: "/eid5.jpg",
    theme: "eidTea",
    text: "عيد أضحى سعيد، جعله الله عيد فرح وسرور عليكم.",
  },
];

export default function EidPage() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<PremiumCardData>(CARDS[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadBlob = async (): Promise<Blob | null> => {
    const el = cardRef.current;
    if (!el) return null;
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#faf8f5",
      logging: false,
      allowTaint: false,
    });
    return new Promise((resolve) => {
      canvas.toBlob((b) => resolve(b), "image/png");
    });
  };

  const downloadCard = async () => {
    const blob = await downloadBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "eid-hajj-card.png";
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

    const file = new File([blob], "eid-hajj-card.png", { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "بطاقة العيد",
          text: name ? `بطاقة لِـ ${name}` : undefined,
        });
        return;
      } catch {
        /* fallback */
      }
    }
    await downloadCard();
  };

  return (
    <StationPageShell title="بطاقات العيد">
      <PremiumCardGrid
        cards={CARDS}
        selectedId={selected.id}
        onSelect={setSelected}
      />
      <PremiumCardPreview ref={cardRef} card={selected} name={name} />
      <label className="sr-only" htmlFor="eid-name">
        اسمك على البطاقة
      </label>
      <input
        id="eid-name"
        dir="rtl"
        style={arabicTextSurfaceStyle}
        className="w-full max-w-[300px] rounded-2xl border border-[#fed7aa] bg-white px-4 py-3.5 text-right text-base text-[#1e293b] shadow-[0_2px_20px_-8px_rgba(180,83,9,0.12)] outline-none ring-2 ring-[rgba(201,162,39,0.2)] placeholder:text-[#94a3b8] focus:border-[rgba(201,162,39,0.5)] focus:ring-[rgba(201,162,39,0.35)]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اكتب اسمك"
        autoComplete="off"
      />
      <StationActionBar onDownload={downloadCard} onShare={shareCard} />
    </StationPageShell>
  );
}

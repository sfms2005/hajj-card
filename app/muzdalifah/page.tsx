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
    image: "/muzdalifah1.jpg",
    theme: "green",
    text: "اللهم اكتب لنا السكينة والطمأنينة، واملأ قلوبنا بالإيمان.",
  },
  {
    id: 2,
    image: "/muzdalifah2.jpg",
    theme: "gold",
    text: "اللهم اجعلها ليلة خير وبركة، واكتب لنا فيها الأجر العظيم.",
  },
  {
    id: 3,
    image: "/muzdalifah3.jpg",
    theme: "blue",
    text: "اللهم تقبل منا صالح الأعمال، واجعلنا من الذاكرين الشاكرين.",
  },
];

export default function MuzdalifahPage() {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<PremiumCardData>(CARDS[0]);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadBlob = async (): Promise<Blob | null> => {
    const el = cardRef.current;
    if (!el) return null;
    const canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#0f172a",
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
    link.download = "muzdalifah-hajj-card.png";
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

    const file = new File([blob], "muzdalifah-hajj-card.png", { type: "image/png" });

    if (navigator.share && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: "بطاقة مزدلفة",
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
    <StationPageShell
      title="بطاقات مزدلفة"
      bgClassName=""
      shellStyle={{
        background:
          "linear-gradient(to bottom, #0c1220 0%, #111827 50%, #0f172a 100%)",
      }}
      variant="dark"
    >
      <PremiumCardGrid
        cards={CARDS}
        selectedId={selected.id}
        onSelect={setSelected}
      />
      <PremiumCardPreview ref={cardRef} card={selected} name={name} />
      <label className="sr-only" htmlFor="muz-name">
        اسمك على البطاقة
      </label>
      <input
        id="muz-name"
        dir="rtl"
        style={arabicTextSurfaceStyle}
        className="w-full max-w-[300px] rounded-2xl border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.95)] px-4 py-3.5 text-right text-base text-[#1e293b] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)] outline-none ring-2 ring-[rgba(201,162,39,0.25)] placeholder:text-[#64748b] focus:border-[rgba(201,162,39,0.55)] focus:ring-[rgba(201,162,39,0.35)]"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="اكتب اسمك"
        autoComplete="off"
      />
      <StationActionBar onDownload={downloadCard} onShare={shareCard} />
    </StationPageShell>
  );
}

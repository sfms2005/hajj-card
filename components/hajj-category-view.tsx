"use client";

import html2canvas from "html2canvas";
import { Download, Home, Share2 } from "lucide-react";
import Link from "next/link";
import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import type { HajjCardDef } from "@/lib/hajj-cards-data";
import { arabicTextSurfaceStyle } from "@/lib/arabic-text";

type HajjCategoryViewProps = {
  pageTitle: string;
  cards: HajjCardDef[];
};

/** Solid fallback if gradients fail to paint (html2canvas / export safety) */
const CARD_FALLBACK_BG = "#1a2f4a";

const CardFace = forwardRef<
  HTMLDivElement,
  {
    card: HajjCardDef;
    name: string;
    className?: string;
    isThumbnail?: boolean;
  }
>(function CardFace({ card, name, className, isThumbnail = false }, ref) {
  return (
    <div
      ref={ref}
      dir="rtl"
      className={`relative aspect-[4/5] w-full overflow-hidden rounded-[20px] ${card.style.shell} ${className ?? ""}`}
      style={{ backgroundColor: CARD_FALLBACK_BG, ...arabicTextSurfaceStyle }}
    >
      <div
        className={`absolute inset-0 z-0 bg-cover bg-center ${card.style.fill}`}
        aria-hidden
      />
      <div
        className={`pointer-events-none absolute inset-0 z-[1] bg-cover bg-center ${card.style.overlay}`}
        aria-hidden
      />
      <div
        className={`relative z-10 flex h-full flex-col items-center justify-center text-center ${
          isThumbnail ? "px-3 py-5 sm:px-4 sm:py-6" : "px-6 py-10 sm:px-10 sm:py-12"
        }`}
        dir="rtl"
        style={arabicTextSurfaceStyle}
      >
        <p
          className={`${card.style.message} ${
            isThumbnail
              ? "!text-[0.56rem] !leading-[1.35] text-balance sm:!text-[0.65rem]"
              : ""
          }`}
        >
          {card.message}
        </p>
        <p
          className={`${card.style.name} ${
            isThumbnail
              ? "!mt-2 !text-[0.62rem] sm:!text-[0.72rem]"
              : ""
          } ${!name.trim() && !isThumbnail ? "min-h-[1.5em] opacity-0" : ""}`}
        >
          {name.trim() || (isThumbnail ? "" : "\u00a0")}
        </p>
      </div>
    </div>
  );
});

CardFace.displayName = "CardFace";

/**
 * Download PNG: prefer object URL from toBlob; always fall back to toDataURL on `<a href>`.
 * Link is appended to body, clicked, then removed.
 */
function downloadPngFromCanvas(
  canvas: HTMLCanvasElement,
  filename: string,
): Promise<void> {
  return new Promise((resolve) => {
    const link = document.createElement("a");
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";
    link.style.position = "fixed";
    link.style.left = "-9999px";

    const finish = (href: string, revoke?: () => void) => {
      link.href = href;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      if (revoke) {
        window.setTimeout(() => revoke(), 250);
      }
      resolve();
    };

    try {
      canvas.toBlob(
        (blob) => {
          if (blob && blob.size > 0) {
            const objectUrl = URL.createObjectURL(blob);
            console.log("[hajj-cards] download: using object URL from toBlob");
            finish(objectUrl, () => URL.revokeObjectURL(objectUrl));
            return;
          }
          console.log(
            "[hajj-cards] download: toBlob empty — using toDataURL fallback",
          );
          finish(canvas.toDataURL("image/png"));
        },
        "image/png",
        1,
      );
    } catch {
      console.log(
        "[hajj-cards] download: toBlob threw — using toDataURL fallback",
      );
      finish(canvas.toDataURL("image/png"));
    }
  });
}

function isUserAbort(err: unknown): boolean {
  if (err instanceof DOMException && err.name === "AbortError") return true;
  if (err instanceof Error && err.name === "AbortError") return true;
  return false;
}

/** Share with `files` when possible; otherwise download the PNG. */
async function sharePngOrDownload(
  canvas: HTMLCanvasElement,
  blob: Blob,
  filename: string,
  title: string,
  text: string,
): Promise<void> {
  const nav = typeof navigator !== "undefined" ? navigator : undefined;
  const file = new File([blob], filename, {
    type: "image/png",
    lastModified: Date.now(),
  });

  if (!nav?.share) {
    console.log("[hajj-cards] share: Web Share not available — download");
    await downloadPngFromCanvas(canvas, filename);
    return;
  }

  try {
    if (typeof nav.canShare === "function" && !nav.canShare({ files: [file] })) {
      console.log("[hajj-cards] share: canShare(files) false — download");
      await downloadPngFromCanvas(canvas, filename);
      return;
    }
  } catch (e) {
    console.log("[hajj-cards] share: canShare threw — download", e);
    await downloadPngFromCanvas(canvas, filename);
    return;
  }

  try {
    console.log("[hajj-cards] share: calling navigator.share with files");
    await nav.share({
      files: [file],
      title,
      text,
    });
  } catch (err) {
    if (isUserAbort(err)) {
      console.log("[hajj-cards] share: user cancelled");
      return;
    }
    console.log("[hajj-cards] share: share failed — download", err);
    await downloadPngFromCanvas(canvas, filename);
  }
}

async function canvasToPngBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  const fromBlob = await new Promise<Blob | null>((resolve) => {
    try {
      canvas.toBlob((b) => resolve(b), "image/png", 1);
    } catch {
      resolve(null);
    }
  });
  if (fromBlob && fromBlob.size > 0) return fromBlob;

  try {
    const dataUrl = canvas.toDataURL("image/png");
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return blob.size > 0 ? blob : null;
  } catch {
    return null;
  }
}

export function HajjCategoryView({
  pageTitle,
  cards,
}: HajjCategoryViewProps) {
  const [selectedId, setSelectedId] = useState(cards[0]?.id ?? "");
  const [name, setName] = useState("");
  const [pending, setPending] = useState<null | "download" | "share">(null);
  /** Attached only to the large preview card (never thumbnails). */
  const previewCardRef = useRef<HTMLDivElement>(null);
  const exportInFlightRef = useRef(false);

  const selected = useMemo(
    () => cards.find((c) => c.id === selectedId) ?? cards[0],
    [cards, selectedId],
  );

  const exportFilename = useMemo(() => {
    const id = selected?.id ?? "card";
    const safe = id.replace(/[^a-zA-Z0-9-]/g, "");
    return `hajj-card-${safe || "card"}.png`;
  }, [selected?.id]);

  const capturePreviewToCanvas = useCallback(async () => {
    const node = previewCardRef.current;
    if (!node) {
      console.warn("[hajj-cards] capture: previewCardRef.current is null");
      return null;
    }

    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => resolve());
    });

    try {
      const canvas = await html2canvas(node, {
        scale: 2,
        useCORS: false,
        allowTaint: false,
        logging: false,
        backgroundColor: CARD_FALLBACK_BG,
      });
      return canvas;
    } catch (e) {
      console.error("[hajj-cards] capture: html2canvas failed", e);
      return null;
    }
  }, []);

  const handleDownload = useCallback(async () => {
    console.log("[hajj-cards] download button clicked");
    if (exportInFlightRef.current) return;
    exportInFlightRef.current = true;
    setPending("download");
    try {
      const canvas = await capturePreviewToCanvas();
      if (!canvas) return;
      await downloadPngFromCanvas(canvas, exportFilename);
    } finally {
      exportInFlightRef.current = false;
      setPending(null);
    }
  }, [capturePreviewToCanvas, exportFilename]);

  const handleShare = useCallback(async () => {
    console.log("[hajj-cards] share button clicked");
    if (exportInFlightRef.current) return;
    exportInFlightRef.current = true;
    setPending("share");
    try {
      const canvas = await capturePreviewToCanvas();
      if (!canvas) return;

      const blob = await canvasToPngBlob(canvas);
      if (!blob) {
        console.log(
          "[hajj-cards] share: no blob from canvas — using download only",
        );
        await downloadPngFromCanvas(canvas, exportFilename);
        return;
      }

      await sharePngOrDownload(
        canvas,
        blob,
        exportFilename,
        pageTitle,
        selected?.message ?? "",
      );
    } finally {
      exportInFlightRef.current = false;
      setPending(null);
    }
  }, [capturePreviewToCanvas, exportFilename, pageTitle, selected?.message]);

  if (!selected) {
    return null;
  }

  return (
    <div dir="rtl" className="relative min-h-screen pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 px-4 sm:px-6">
        <header className="flex flex-col items-center gap-6 text-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-[#1e3a5f]/15 bg-[rgba(255,255,255,0.7)] px-4 py-2 text-sm font-medium text-[#1e3a5f]/85 shadow-sm backdrop-blur-sm transition hover:border-[#c9a227]/45 hover:text-[#1e3a5f]"
          >
            <Home className="size-[18px] shrink-0 opacity-80" strokeWidth={1.75} />
            <span>الرئيسية</span>
          </Link>
          <h1 className="text-3xl font-semibold text-[#152a45] sm:text-4xl">
            {pageTitle}
          </h1>
        </header>

        <section className="flex flex-col gap-4" aria-labelledby="cards-heading">
          <h2 id="cards-heading" className="sr-only">
            اختيار التصميم
          </h2>
          <p className="text-center text-sm text-[#1e3a5f]/65">اختر بطاقتك</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {cards.map((card) => {
              const isActive = card.id === selected.id;
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => setSelectedId(card.id)}
                  aria-pressed={isActive}
                  className={`group relative rounded-[20px] p-0 text-right transition duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a227] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    isActive
                      ? "scale-[1.02] shadow-[0_20px_46px_-20px_rgba(30,58,95,0.55)]"
                      : "opacity-95 hover:scale-[1.02] hover:shadow-[0_14px_34px_-18px_rgba(15,61,46,0.4)]"
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute inset-0 z-20 rounded-[20px] transition duration-300 ${
                      isActive
                        ? "ring-2 ring-[#c9a227] ring-offset-2 ring-offset-[#f4f1e8]"
                        : "ring-0 ring-offset-0 group-hover:ring-1 group-hover:ring-[#2d6a4f]/35"
                    }`}
                  />
                  <CardFace
                    card={card}
                    name={name}
                    isThumbnail
                    className="origin-center transition duration-500 ease-out group-active:scale-[0.99]"
                  />
                </button>
              );
            })}
          </div>
        </section>

        <section className="flex flex-col gap-6" aria-labelledby="preview-heading">
          <h2 id="preview-heading" className="sr-only">
            المعاينة
          </h2>
          <div className="mx-auto w-full max-w-md">
            <div key={selected.id} className="hajj-preview-animate">
              <CardFace
                ref={previewCardRef}
                card={selected}
                name={name}
              />
            </div>
          </div>

          <div className="mx-auto w-full max-w-md space-y-4">
            <label className="sr-only" htmlFor="visitor-name">
              الاسم
            </label>
            <input
              id="visitor-name"
              type="text"
              dir="rtl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسمك"
              autoComplete="name"
              style={arabicTextSurfaceStyle}
              className="w-full rounded-[20px] border border-[#1e3a5f]/12 bg-[rgba(255,255,255,0.9)] px-5 py-4 text-right text-base text-[#152a45] shadow-sm outline-none backdrop-blur-sm transition placeholder:text-[#1e3a5f]/40 focus:border-[#2d6a4f]/35 focus:ring-2 focus:ring-[#c9a227]/25"
            />

            <div className="flex flex-col gap-3 sm:flex-row-reverse">
              <button
                type="button"
                onClick={() => void handleDownload()}
                disabled={pending !== null}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[20px] bg-[#1e3a5f] px-5 py-4 text-sm font-semibold text-[#fdfbf5] shadow-[0_14px_32px_-18px_rgba(30,58,95,0.6)] transition hover:bg-[#152a45] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Download className="size-5 shrink-0" strokeWidth={1.75} />
                {pending === "download" ? "جاري التحميل…" : "تحميل البطاقة"}
              </button>
              <button
                type="button"
                onClick={() => void handleShare()}
                disabled={pending !== null}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[20px] border border-[#1e3a5f]/15 bg-[rgba(255,255,255,0.95)] px-5 py-4 text-sm font-semibold text-[#1e3a5f] shadow-sm transition hover:border-[#c9a227]/45 hover:text-[#152a45] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Share2 className="size-5 shrink-0" strokeWidth={1.75} />
                {pending === "share" ? "جاري المشاركة…" : "مشاركة"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

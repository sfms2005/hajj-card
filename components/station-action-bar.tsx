"use client";

import { Download, Share2 } from "lucide-react";

type StationActionBarProps = {
  onDownload: () => void;
  onShare: () => void;
  downloadLabel?: string;
  shareLabel?: string;
};

export function StationActionBar({
  onDownload,
  onShare,
  downloadLabel = "تحميل البطاقة",
  shareLabel = "مشاركة",
}: StationActionBarProps) {
  return (
    <div className="flex w-full max-w-sm flex-row-reverse flex-wrap items-stretch justify-center gap-3 sm:max-w-md">
      <button
        type="button"
        onClick={onShare}
        className="inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-full border border-[#cbd5e1] bg-white px-5 py-3 text-sm font-semibold text-[#1e293b] shadow-sm transition hover:border-[#94a3b8] hover:bg-[#fafafa] active:scale-[0.98] sm:min-w-[8.5rem]"
      >
        <Share2 className="size-[18px] shrink-0" strokeWidth={1.75} />
        {shareLabel}
      </button>
      <button
        type="button"
        onClick={onDownload}
        className="inline-flex min-h-[3rem] flex-1 items-center justify-center gap-2 rounded-full bg-[#1e3a5f] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_24px_-6px_rgba(30,58,95,0.45)] transition hover:bg-[#152a45] active:scale-[0.98] sm:min-w-[8.5rem]"
      >
        <Download className="size-[18px] shrink-0" strokeWidth={1.75} />
        {downloadLabel}
      </button>
    </div>
  );
}

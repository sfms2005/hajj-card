export type CardVisualStyle = {
  /** outer frame: ring + shadow — hex/rgb only */
  shell: string;
  /** bottom layer: full-card gradient (no images; html2canvas-safe) */
  fill: string;
  /** top tint for text contrast — hex/rgb only */
  overlay: string;
  message: string;
  name: string;
};

export type HajjCardDef = {
  id: string;
  message: string;
  style: CardVisualStyle;
};

export const minaCards: HajjCardDef[] = [
  {
    id: "mina-1",
    message:
      "اللهم تقبل منا ومنكم، واجعل حجنا مبرورًا وسعينا مشكورًا وذنبنا مغفورًا.",
    style: {
      shell:
        "ring-1 ring-[#065f46]/25 shadow-[0_20px_50px_-15px_rgba(15,81,50,0.55)]",
      fill: "bg-gradient-to-br from-[#14532d] via-[#15803d] to-[#052e16]",
      overlay:
        "bg-gradient-to-b from-[#022c22]/88 via-[#143d2f]/55 to-[#061510]/92",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fffbeb] drop-shadow-md sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#ecfdf5]/95 sm:text-lg",
    },
  },
  {
    id: "mina-2",
    message:
      "اللهم ارزقنا القبول والرضا، واكتب لنا تمام الأجر وحسن الخاتمة.",
    style: {
      shell:
        "ring-1 ring-[#1e3a5f]/30 shadow-[0_18px_45px_-14px_rgba(30,58,95,0.5)]",
      fill: "bg-gradient-to-tr from-[#0c4a6e] via-[#134e4a] to-[#0f172a]",
      overlay:
        "bg-gradient-to-tr from-[#0f2744]/90 via-[#064e3b]/40 to-[#0a1f33]/88",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fdf6e3] sm:text-base",
      name: "mt-4 text-center text-sm font-medium text-[#fef3c7]/90 sm:text-lg",
    },
  },
  {
    id: "mina-3",
    message:
      "اللهم أعنا على ذكرك وشكرك وحسن عبادتك، واجعلنا من المقبولين.",
    style: {
      shell:
        "ring-1 ring-[#fcd34d]/40 shadow-[0_22px_48px_-16px_rgba(201,162,39,0.35)]",
      fill: "bg-gradient-to-b from-[#57534e] via-[#1c4538] to-[#1c1917]",
      overlay:
        "bg-gradient-to-b from-[#1c1917]/75 via-[#022c22]/50 to-[#0c0a09]/88",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fff8e7] sm:text-base",
      name: "mt-5 text-center text-base font-semibold text-[#fde68a]/95 sm:text-lg",
    },
  },
];

export const arafahCards: HajjCardDef[] = [
  {
    id: "arafah-1",
    message:
      "اللهم إنك عفو تحب العفو فاعفُ عنا، واغفر لنا وارحمنا.",
    style: {
      shell:
        "ring-1 ring-[#c9a227]/35 shadow-[0_20px_52px_-12px_rgba(30,58,95,0.45)]",
      fill: "bg-gradient-to-b from-[#1d4ed8] via-[#2d6a4f] to-[#0f172a]",
      overlay:
        "bg-gradient-to-b from-[#1a2f4d]/92 via-[#2d6a4f]/35 to-[#0c1524]/93",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fef3c7] sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#ecfdf5] sm:text-lg",
    },
  },
  {
    id: "arafah-2",
    message:
      "اللهم اعتق رقابنا من النار، واكتبنا من أهل الجنة.",
    style: {
      shell:
        "ring-1 ring-[rgba(255,255,255,0.2)] shadow-[0_16px_40px_-10px_rgba(15,61,46,0.5)]",
      fill: "bg-gradient-to-t from-[#78350f] via-[#3f6212] to-[#134e4a]",
      overlay:
        "bg-gradient-to-t from-[#022c22]/90 via-[#1b4332]/60 to-[rgba(255,255,255,0)]",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fafaf9] sm:text-base",
      name: "mt-5 text-center text-sm font-semibold text-[#fde68a]/95 sm:text-base",
    },
  },
  {
    id: "arafah-3",
    message:
      "اللهم تقبل دعاءنا واغفر زلاتنا، وحقق لنا ما نتمنى.",
    style: {
      shell:
        "ring-1 ring-[#047857]/30 shadow-[0_24px_55px_-18px_rgba(8,42,32,0.55)]",
      fill: "bg-gradient-to-br from-[#3730a3] via-[#0f766e] to-[#292524]",
      overlay:
        "bg-gradient-to-br from-[#0d1b2a]/88 via-[#064e3b]/55 to-[#100f0a]/90",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fefae0] sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#e7e5e4] sm:text-lg",
    },
  },
];

export const muzdalifahCards: HajjCardDef[] = [
  {
    id: "muz-1",
    message:
      "اللهم اكتب لنا السكينة والطمأنينة، واملأ قلوبنا بالإيمان.",
    style: {
      shell:
        "ring-1 ring-[#1e3a5f]/25 shadow-[0_18px_46px_-14px_rgba(24,44,72,0.48)]",
      fill: "bg-gradient-to-b from-[#312e81] via-[#166534] to-[#0c0a09]",
      overlay:
        "bg-gradient-to-b from-[#1e1b4b]/80 via-[#064e3b]/45 to-[#0c0a09]/90",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fffbeb] sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#d1fae5] sm:text-lg",
    },
  },
  {
    id: "muz-2",
    message:
      "اللهم اجعلها ليلة خير وبركة، واكتب لنا فيها الأجر العظيم.",
    style: {
      shell:
        "ring-1 ring-[#fde68a]/50 shadow-[0_20px_50px_-15px_rgba(45,106,79,0.42)]",
      fill: "bg-gradient-to-t from-[#064e3b] via-[#134e4a] to-[#44403c]",
      overlay:
        "bg-gradient-to-t from-[#041f17]/92 via-[#132f28]/55 to-[#1c1917]/25",
      message:
        "text-center text-sm font-semibold leading-snug text-[#f5f5f4] sm:text-base",
      name: "mt-5 text-center text-sm font-semibold text-[#fef3c7] sm:text-lg",
    },
  },
  {
    id: "muz-3",
    message:
      "اللهم تقبل منا صالح الأعمال، واجعلنا من الذاكرين الشاكرين.",
    style: {
      shell:
        "ring-1 ring-[#2d6a4f]/35 shadow-[0_22px_56px_-16px_rgba(12,25,40,0.5)]",
      fill: "bg-gradient-to-b from-[#172554] via-[#1e293b] to-[#020617]",
      overlay:
        "bg-gradient-to-b from-[#0b1324]/90 via-[#1b3a2f]/50 to-[#050a08]/92",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fffbeb] sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#d1fae5]/90 sm:text-lg",
    },
  },
];

export const eidCards: HajjCardDef[] = [
  {
    id: "eid-1",
    message:
      "عيدكم مبارك، وتقبل الله منا ومنكم صالح الأعمال.",
    style: {
      shell:
        "ring-1 ring-[#c9a227]/45 shadow-[0_22px_55px_-14px_rgba(201,162,39,0.4)]",
      fill: "bg-gradient-to-br from-[#1e3a5f] via-[#b45309] to-[#14532d]",
      overlay:
        "bg-gradient-to-br from-[#1e3a5f]/85 via-[#065f46]/40 to-[#1c1917]/88",
      message:
        "text-center text-base font-bold leading-snug text-[#fef3c7] sm:text-lg",
      name: "mt-5 text-center text-base font-semibold text-[#ecfdf5] sm:text-xl",
    },
  },
  {
    id: "eid-2",
    message:
      "كل عام وأنتم بخير، أعاده الله عليكم بالصحة والسعادة.",
    style: {
      shell:
        "ring-1 ring-[#059669]/25 shadow-[0_18px_44px_-12px_rgba(45,106,79,0.45)]",
      fill: "bg-gradient-to-b from-[#92400e] via-[#57534e] to-[#292524]",
      overlay:
        "bg-gradient-to-b from-[#1c1917]/78 via-[#2c1810]/45 to-[#1a120f]/90",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fffbeb] sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#f5f5f4] sm:text-lg",
    },
  },
  {
    id: "eid-3",
    message:
      "مبارك عليكم العيد، وجعل أيامكم أفراحًا وبركة.",
    style: {
      shell:
        "ring-1 ring-[rgba(255,255,255,0.25)] shadow-[0_20px_48px_-14px_rgba(30,58,95,0.4)]",
      fill: "bg-gradient-to-t from-[#14532d] via-[#15803d] to-[#0f172a]",
      overlay:
        "bg-gradient-to-t from-[#0f172a]/88 via-[#14532d]/50 to-[#022c22]/30",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fffbeb] sm:text-base",
      name: "mt-4 text-center text-sm font-medium text-[#fef3c7] sm:text-lg",
    },
  },
  {
    id: "eid-4",
    message:
      "تقبل الله طاعتكم، ورفع قدركم، وجمعنا وإياكم على الخير.",
    style: {
      shell:
        "ring-1 ring-[#1e3a5f]/35 shadow-[0_24px_58px_-16px_rgba(201,162,39,0.35)]",
      fill: "bg-gradient-to-b from-[#047857] via-[#1e40af] to-[#020617]",
      overlay:
        "bg-gradient-to-b from-[#022c22]/82 via-[#1e3a5f]/48 to-[#0f172a]/90",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fde68a] sm:text-base",
      name: "mt-5 text-center text-base font-semibold text-[#ecfdf5] sm:text-lg",
    },
  },
  {
    id: "eid-5",
    message:
      "عيد أضحى سعيد، جعله الله عيد فرح وسرور عليكم.",
    style: {
      shell:
        "ring-1 ring-[#fbbf24]/35 shadow-[0_20px_50px_-15px_rgba(15,81,50,0.48)]",
      fill: "bg-gradient-to-tr from-[#166534] via-[#44403c] to-[#1e3a5f]",
      overlay:
        "bg-gradient-to-tr from-[#0c1f17]/90 via-[#1c1917]/50 to-[#1e3a5f]/80",
      message:
        "text-center text-sm font-semibold leading-snug text-[#fafaf9] sm:text-base",
      name: "mt-4 text-center text-base font-medium text-[#fef3c7] sm:text-xl",
    },
  },
];

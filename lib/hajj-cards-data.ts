export type CardVisualStyle = {
  /** outer frame: ring + shadow */
  shell: string;
  /** full-bleed gradient overlay */
  overlay: string;
  message: string;
  name: string;
};

export type HajjCardDef = {
  id: string;
  image: string;
  message: string;
  style: CardVisualStyle;
};

export const minaCards: HajjCardDef[] = [
  {
    id: "mina-1",
    image: "/mina1.jpg",
    message: "اللهم تقبل منا ومنكم",
    style: {
      shell:
        "ring-1 ring-emerald-800/25 shadow-[0_20px_50px_-15px_rgba(15,81,50,0.55)]",
      overlay:
        "bg-gradient-to-b from-emerald-950/88 via-[#143d2f]/55 to-[#061510]/92",
      message:
        "text-center text-lg font-semibold leading-relaxed text-amber-50 drop-shadow-md sm:text-xl",
      name: "mt-4 text-center text-base font-medium text-emerald-50/95 sm:text-lg",
    },
  },
  {
    id: "mina-2",
    image: "/mina2.jpg",
    message: "اللهم اجعلها حجًا مبرورًا",
    style: {
      shell:
        "ring-1 ring-[#1e3a5f]/30 shadow-[0_18px_45px_-14px_rgba(30,58,95,0.5)]",
      overlay:
        "bg-gradient-to-tr from-[#0f2744]/90 via-emerald-900/40 to-[#0a1f33]/88",
      message:
        "text-center text-base font-semibold leading-relaxed text-[#fdf6e3] sm:text-xl",
      name: "mt-4 text-center text-sm font-medium text-amber-100/90 sm:text-lg",
    },
  },
  {
    id: "mina-3",
    image: "/mina3.jpg",
    message: "نسأل الله القبول والرضا",
    style: {
      shell:
        "ring-1 ring-amber-300/40 shadow-[0_22px_48px_-16px_rgba(201,162,39,0.35)]",
      overlay:
        "bg-gradient-to-b from-stone-900/75 via-emerald-950/50 to-stone-950/88",
      message:
        "text-center text-lg font-semibold leading-relaxed tracking-tight text-[#fff8e7] sm:text-2xl",
      name: "mt-5 text-center text-base font-semibold text-amber-200/95 sm:text-lg",
    },
  },
];

export const arafahCards: HajjCardDef[] = [
  {
    id: "arafah-1",
    image: "/arafah1.jpg",
    message: "خير الدعاء دعاء يوم عرفة",
    style: {
      shell:
        "ring-1 ring-[#c9a227]/35 shadow-[0_20px_52px_-12px_rgba(30,58,95,0.45)]",
      overlay:
        "bg-gradient-to-b from-[#1a2f4d]/92 via-[#2d6a4f]/35 to-[#0c1524]/93",
      message:
        "text-center text-lg font-bold leading-relaxed text-amber-100 sm:text-2xl",
      name: "mt-4 text-center text-base font-medium text-emerald-50 sm:text-lg",
    },
  },
  {
    id: "arafah-2",
    image: "/arafah2.jpg",
    message: "اللهم اغفر لنا وارحمنا",
    style: {
      shell:
        "ring-1 ring-white/20 shadow-[0_16px_40px_-10px_rgba(15,61,46,0.5)]",
      overlay:
        "bg-gradient-to-t from-emerald-950/90 via-[#1b4332]/60 to-transparent",
      message:
        "text-center text-base font-semibold leading-relaxed text-stone-50 sm:text-xl",
      name: "mt-5 text-center text-sm font-semibold text-amber-200/95 sm:text-base",
    },
  },
  {
    id: "arafah-3",
    image: "/arafah3.jpg",
    message: "اللهم اعتق رقابنا من النار",
    style: {
      shell:
        "ring-1 ring-emerald-700/30 shadow-[0_24px_55px_-18px_rgba(8,42,32,0.55)]",
      overlay:
        "bg-gradient-to-br from-[#0d1b2a]/88 via-emerald-900/55 to-[#100f0a]/90",
      message:
        "text-center text-lg font-semibold leading-relaxed text-[#fefae0] sm:text-xl",
      name: "mt-4 text-center text-base font-medium text-stone-200 sm:text-lg",
    },
  },
];

export const muzdalifahCards: HajjCardDef[] = [
  {
    id: "muz-1",
    image: "/muzdalifah1.jpg",
    message: "ذكر الله يطمئن القلوب",
    style: {
      shell:
        "ring-1 ring-[#1e3a5f]/25 shadow-[0_18px_46px_-14px_rgba(24,44,72,0.48)]",
      overlay:
        "bg-gradient-to-b from-indigo-950/80 via-emerald-900/45 to-stone-950/90",
      message:
        "text-center text-lg font-semibold leading-relaxed text-amber-50 sm:text-2xl",
      name: "mt-4 text-center text-base font-medium text-emerald-100 sm:text-lg",
    },
  },
  {
    id: "muz-2",
    image: "/muzdalifah2.jpg",
    message: "اللهم اكتب لنا السكينة",
    style: {
      shell:
        "ring-1 ring-amber-200/50 shadow-[0_20px_50px_-15px_rgba(45,106,79,0.42)]",
      overlay:
        "bg-gradient-to-t from-[#041f17]/92 via-[#132f28]/55 to-stone-900/25",
      message:
        "text-center text-base font-semibold leading-relaxed text-stone-100 sm:text-xl",
      name: "mt-5 text-center text-sm font-semibold text-amber-100 sm:text-lg",
    },
  },
  {
    id: "muz-3",
    image: "/muzdalifah3.jpg",
    message: "اللهم اجعلها ليلة خير",
    style: {
      shell:
        "ring-1 ring-[#2d6a4f]/35 shadow-[0_22px_56px_-16px_rgba(12,25,40,0.5)]",
      overlay:
        "bg-gradient-to-b from-[#0b1324]/90 via-[#1b3a2f]/50 to-[#050a08]/92",
      message:
        "text-center text-lg font-semibold leading-relaxed tracking-tight text-[#fffbeb] sm:text-xl",
      name: "mt-4 text-center text-base font-medium text-emerald-100/90 sm:text-lg",
    },
  },
];

export const eidCards: HajjCardDef[] = [
  {
    id: "eid-1",
    image: "/eid1.jpg",
    message: "عيدكم مبارك",
    style: {
      shell:
        "ring-1 ring-[#c9a227]/45 shadow-[0_22px_55px_-14px_rgba(201,162,39,0.4)]",
      overlay:
        "bg-gradient-to-br from-[#1e3a5f]/85 via-emerald-800/40 to-stone-900/88",
      message:
        "text-center text-2xl font-bold leading-snug text-amber-100 sm:text-3xl",
      name: "mt-5 text-center text-base font-semibold text-emerald-50 sm:text-xl",
    },
  },
  {
    id: "eid-2",
    image: "/eid2.jpg",
    message: "تقبل الله منا ومنكم",
    style: {
      shell:
        "ring-1 ring-emerald-600/25 shadow-[0_18px_44px_-12px_rgba(45,106,79,0.45)]",
      overlay:
        "bg-gradient-to-b from-stone-900/78 via-[#2c1810]/45 to-[#1a120f]/90",
      message:
        "text-center text-lg font-semibold leading-relaxed text-amber-50 sm:text-2xl",
      name: "mt-4 text-center text-base font-medium text-stone-100 sm:text-lg",
    },
  },
  {
    id: "eid-3",
    image: "/eid3.jpg",
    message: "كل عام وأنتم بخير",
    style: {
      shell:
        "ring-1 ring-white/25 shadow-[0_20px_48px_-14px_rgba(30,58,95,0.4)]",
      overlay:
        "bg-gradient-to-t from-[#0f172a]/88 via-[#14532d]/50 to-emerald-950/30",
      message:
        "text-center text-xl font-bold leading-relaxed text-[#fffbeb] sm:text-2xl",
      name: "mt-4 text-center text-sm font-medium text-amber-100 sm:text-lg",
    },
  },
  {
    id: "eid-4",
    image: "/eid4.jpg",
    message: "عيد سعيد",
    style: {
      shell:
        "ring-1 ring-[#1e3a5f]/35 shadow-[0_24px_58px_-16px_rgba(201,162,39,0.35)]",
      overlay:
        "bg-gradient-to-b from-emerald-950/82 via-[#1e3a5f]/48 to-[#0f172a]/90",
      message:
        "text-center text-2xl font-semibold leading-tight text-amber-200 sm:text-3xl",
      name: "mt-5 text-center text-base font-semibold text-emerald-50 sm:text-lg",
    },
  },
  {
    id: "eid-5",
    image: "/eid5.jpg",
    message: "مبارك عليكم العيد",
    style: {
      shell:
        "ring-1 ring-amber-400/35 shadow-[0_20px_50px_-15px_rgba(15,81,50,0.48)]",
      overlay:
        "bg-gradient-to-tr from-[#0c1f17]/90 via-stone-900/50 to-[#1e3a5f]/80",
      message:
        "text-center text-lg font-semibold leading-relaxed text-stone-50 sm:text-xl",
      name: "mt-4 text-center text-base font-medium text-amber-100 sm:text-xl",
    },
  },
];

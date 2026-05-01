import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "بطاقات الحج والعيد",
    template: "%s | بطاقات الحج",
  },
  description: "بطاقات تهنئة أنيقة لمناسك الحج والعيد — تصاميم فاخرة بألوان هادئة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body
        className={`${cairo.className} min-h-full bg-gradient-to-br from-[#f7f4ec] via-[#eef6f1] to-[#e6ebf4] text-[#152a45]`}
      >
        {children}
      </body>
    </html>
  );
}

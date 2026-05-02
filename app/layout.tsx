import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import "./html2canvas-overrides.css";

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
        className={`${cairo.className} min-h-full antialiased text-[#152a45]`}
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, #f7f4ec 0%, #eef6f1 50%, #e6ebf4 100%)",
        }}
      >
        {children}
      </body>
    </html>
  );
}

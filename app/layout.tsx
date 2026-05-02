import type { Metadata } from "next";
import "./globals.css";
import "./html2canvas-overrides.css";

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
    <html lang="ar" dir="rtl" className="min-h-screen antialiased">
      <body
        className="min-h-screen antialiased text-[#152a45]"
        style={{
          backgroundColor: "#f4f0e4",
          backgroundImage:
            "linear-gradient(165deg, #f5f1e6 0%, #e8f0e0 42%, #f0f6eb 100%)",
          backgroundAttachment: "fixed",
        }}
      >
        {children}
      </body>
    </html>
  );
}

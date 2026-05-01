import { HajjCategoryView } from "@/components/hajj-category-view";
import { arafahCards } from "@/lib/hajj-cards-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بطاقات عرفة",
  description: "بطاقات يوم عرفة — أذكار ودعاء بألوان هادئة",
};

export default function ArafahPage() {
  return <HajjCategoryView pageTitle="بطاقات عرفة" cards={arafahCards} />;
}

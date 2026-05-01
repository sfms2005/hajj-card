import { HajjCategoryView } from "@/components/hajj-category-view";
import { eidCards } from "@/lib/hajj-cards-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بطاقات العيد",
  description: "خمس بطاقات للعيد — هنّئ أحبابك بطريقة أنيقة",
};

export default function EidPage() {
  return <HajjCategoryView pageTitle="بطاقات العيد" cards={eidCards} />;
}

import { HajjCategoryView } from "@/components/hajj-category-view";
import { minaCards } from "@/lib/hajj-cards-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بطاقات منى",
  description: "ثلاث بطاقات فاخرة لأيام منى — صمّمها وحمّلها أو شاركها",
};

export default function MinaPage() {
  return <HajjCategoryView pageTitle="بطاقات منى" cards={minaCards} />;
}

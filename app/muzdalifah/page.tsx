import { HajjCategoryView } from "@/components/hajj-category-view";
import { muzdalifahCards } from "@/lib/hajj-cards-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "بطاقات مزدلفة",
  description: "بطاقات لمشعر مزدلفة — سكينة وذكر",
};

export default function MuzdalifahPage() {
  return (
    <HajjCategoryView pageTitle="بطاقات مزدلفة" cards={muzdalifahCards} />
  );
}

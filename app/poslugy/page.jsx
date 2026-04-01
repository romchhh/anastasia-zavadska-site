import { redirect } from "next/navigation";

/** Загальної сторінки «Послуги» немає — лише окремі URL /poslugy/[slug]. */
export default function PoslugyIndexPage() {
  redirect("/");
}

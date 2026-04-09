import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import PaymentSuccessView, {
  normalizeSuccessVariant,
} from "../../../components/payment/PaymentSuccessView";

const TITLES = {
  session: "Оплата сесії",
  self: "Практикум — самостійний старт",
  psychologist: "Практикум з психологом",
  journey: "Оплата практикуму",
};

export async function generateMetadata({ params }) {
  const { tariffType } = await params;
  const key = normalizeSuccessVariant(tariffType);
  return {
    title: `Успішно · ${TITLES[key] || TITLES.journey}`,
    description:
      "Оплату прийнято. Далі — Telegram або підтвердження запису залежно від обраної послуги.",
    robots: { index: false, follow: false },
  };
}

export default async function PaymentSuccessPage({ params, searchParams }) {
  const { tariffType } = await params;
  const sp = await searchParams;
  const variantKey = normalizeSuccessVariant(tariffType);
  const sessionSlotLine =
    variantKey === "session" && sp?.slotLine ? String(sp.slotLine) : "";

  return (
    <main>
      <Navbar />
      <PaymentSuccessView variantKey={variantKey} sessionSlotLine={sessionSlotLine} />
      <Footer />
    </main>
  );
}

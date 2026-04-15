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
  const orderRef = sp?.orderRef != null && String(sp.orderRef).trim() !== "" ? String(sp.orderRef) : "";
  const amountRaw = sp?.amount != null && String(sp.amount).trim() !== "" ? Number(sp.amount) : NaN;
  const currencyFromQs =
    sp?.currency != null && String(sp.currency).trim() !== "" ? String(sp.currency).trim() : "";
  const defaultCurrency = variantKey === "session" ? "USD" : "UAH";
  const purchaseMeta = orderRef
    ? {
        orderRef,
        value: Number.isFinite(amountRaw) ? amountRaw : undefined,
        currency: currencyFromQs || defaultCurrency,
        contentName: TITLES[variantKey] || TITLES.journey,
      }
    : null;

  return (
    <main>
      <Navbar />
      <PaymentSuccessView
        variantKey={variantKey}
        sessionSlotLine={sessionSlotLine}
        purchaseMeta={purchaseMeta}
      />
      <Footer />
    </main>
  );
}

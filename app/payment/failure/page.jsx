import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PaymentFailureView from "../../components/payment/PaymentFailureView";

export const metadata = {
  title: "Оплата не завершена",
  description: "Платіж не пройшов. Можна спробувати ще раз або написати в Telegram.",
  robots: { index: false, follow: false },
};

export default async function PaymentFailurePage() {
  return (
    <main>
      <Navbar />
      <PaymentFailureView />
      <Footer />
    </main>
  );
}

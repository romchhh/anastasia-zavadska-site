import Link from "next/link";
import { INDIVIDUAL_BOOKING_PAGE } from "../../data/siteData";

export default function PaymentFailureView() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');
        .pay-fail-page {
          font-family: 'Montserrat', sans-serif;
          min-height: calc(100vh - 72px);
          padding: clamp(40px, 8vw, 88px) clamp(20px, 5vw, 32px) clamp(56px, 10vw, 96px);
          box-sizing: border-box;
          background:
            radial-gradient(ellipse 100% 70% at 50% -15%, rgba(255, 120, 120, 0.12), transparent 50%),
            radial-gradient(ellipse 70% 50% at 0% 70%, rgba(99, 145, 255, 0.1), transparent 45%),
            linear-gradient(180deg, #fffbfb 0%, #ffffff 40%, #f8faff 100%);
        }
        .pay-fail-card {
          max-width: 520px;
          margin: 0 auto;
          background: #fff;
          border-radius: clamp(20px, 4vw, 28px);
          padding: clamp(28px, 5vw, 44px) clamp(22px, 4vw, 40px);
          box-shadow:
            0 4px 24px rgba(110, 140, 200, 0.08),
            0 24px 64px rgba(200, 120, 120, 0.08);
          border: 1px solid rgba(245, 230, 230, 0.85);
          text-align: center;
          box-sizing: border-box;
        }
        .pay-fail-badge {
          display: inline-block;
          font-size: clamp(10px, 1.6vw, 11px);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #c45c5c;
          background: #fff0f0;
          border: 1px solid rgba(220, 120, 120, 0.25);
          padding: 8px 14px;
          border-radius: 999px;
          margin-bottom: clamp(20px, 4vw, 28px);
        }
        .pay-fail-icon-wrap {
          width: clamp(72px, 14vw, 88px);
          height: clamp(72px, 14vw, 88px);
          margin: 0 auto clamp(20px, 3vw, 24px);
          border-radius: 50%;
          background: linear-gradient(145deg, #f0a0a0 0%, #e07070 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 32px rgba(224, 112, 112, 0.28);
        }
        .pay-fail-icon-wrap svg {
          width: 38%;
          height: 38%;
          stroke: #fff;
          stroke-width: 2.5;
          fill: none;
          stroke-linecap: round;
        }
        .pay-fail-title {
          font-weight: 800;
          font-size: clamp(22px, 4.2vw, 30px);
          line-height: 1.2;
          color: #111;
          margin: 0 0 12px 0;
          letter-spacing: -0.02em;
        }
        .pay-fail-body {
          font-weight: 500;
          font-size: clamp(14px, 2.1vw, 16px);
          color: #5c6478;
          line-height: 1.65;
          margin: 0 0 clamp(20px, 4vw, 26px) 0;
        }
        .pay-fail-actions {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pay-fail-primary {
          display: block;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          font-weight: 700;
          font-size: clamp(14px, 2vw, 16px);
          letter-spacing: 0.03em;
          text-decoration: none;
          color: #fff !important;
          background: linear-gradient(145deg, #6391ff 0%, #5080ee 100%);
          padding: 16px 24px;
          border-radius: 999px;
          box-shadow: 0 8px 28px rgba(99, 145, 255, 0.32);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .pay-fail-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(99, 145, 255, 0.4);
        }
        .pay-fail-secondary {
          font-weight: 600;
          font-size: 15px;
          color: #6391ff;
          text-decoration: none;
          padding: 8px;
        }
        .pay-fail-secondary:hover {
          text-decoration: underline;
        }
        .pay-fail-hint {
          margin-top: clamp(20px, 4vw, 28px);
          padding-top: clamp(18px, 3vw, 24px);
          border-top: 1px solid rgba(235, 238, 248, 0.95);
          font-size: 13px;
          color: #8b92a8;
          line-height: 1.5;
        }
      `}</style>
      <div className="pay-fail-page">
        <div className="pay-fail-card">
          <div className="pay-fail-badge">Оплата не завершена</div>
          <div className="pay-fail-icon-wrap" aria-hidden>
            <svg viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <h1 className="pay-fail-title">Платіж не пройшов</h1>
          <p className="pay-fail-body">
            Можливо, банк відхилив операцію, закінчився час сесії або вікно оплати було закрито. Кошти з
            картки зазвичай не списуються — перевірте виписку. Спробуйте ще раз або оберіть інший спосіб у
            WayForPay.
          </p>
          <div className="pay-fail-actions">
            <Link className="pay-fail-primary" href="/#практикум">
              Спробувати знову — практикум
            </Link>
            <Link className="pay-fail-secondary" href={INDIVIDUAL_BOOKING_PAGE}>
              Запис на індивідуальну сесію
            </Link>
            <Link className="pay-fail-secondary" href="/">
              На головну
            </Link>
          </div>
          <p className="pay-fail-hint">
            Якщо проблема повторюється — напишіть у Telegram, і ми допоможемо.
          </p>
        </div>
      </div>
    </>
  );
}

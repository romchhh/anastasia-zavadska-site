import Link from "next/link";

const TG_DEFAULT = "https://t.me/anastasia_zavadska";

const WORKSHOP_BOT_SELF =
  "https://t.me/Workshop_Journey_To_Yourself_Bot?start=self_access";
const WORKSHOP_BOT_PSYCHOLOGIST =
  "https://t.me/Workshop_Journey_To_Yourself_Bot?start=psychologist_access";

/** Нормалізація сегмента URL (будь-які регістри / зайві значення) */
export function normalizeSuccessVariant(tariffType) {
  const raw = String(tariffType || "")
    .toLowerCase()
    .trim();
  if (raw === "session") return "session";
  if (raw === "psychologist" || raw === "psych") return "psychologist";
  if (raw === "self") return "self";
  return "journey";
}

function buildVariants(sessionTgUrl, selfHref, psychHref, journeyHref) {
  return {
    session: {
      badge: "Індивідуальна сесія",
      title: "Оплату прийнято",
      lead: "Дякуємо за довіру — місце за вами зафіксовано.",
      body: "Найближчим часом я зв’яжуся з вами, щоб підтвердити час. Якщо хочете написати раніше — залишайте повідомлення в Telegram.",
      primaryLabel: "Написати в Telegram",
      primaryHref: sessionTgUrl,
      links: [{ href: "/", label: "На головну" }],
    },
    self: {
      badge: "Практикум — самостійний старт",
      title: "Вітаємо зі стартом",
      lead: "Оплата пройшла успішно — можна заходити в бота.",
      body: "У Telegram-боті вже чекають перші кроки програми «Подорож до себе». Відкрийте посилання кнопкою нижче, щоб почати в зручний для вас час.",
      primaryLabel: "Відкрити бота практикуму",
      primaryHref: selfHref,
      links: [
        { href: "/#практикум", label: "Про практикум на сайті" },
        { href: "/", label: "На головну" },
      ],
    },
    psychologist: {
      badge: "Практикум — з підтримкою психолога",
      title: "Дякуємо за вибір повного супроводу",
      lead: "Оплату отримано — готуємо ваш персональний формат.",
      body: "Далі — Telegram-бот практикуму з доступом для тарифу з психологом; окремо зв’яжуся щодо трьох індивідуальних сесій і вашого запиту. Якщо є термінові питання — напишіть у Telegram.",
      primaryLabel: "Перейти в Telegram",
      primaryHref: psychHref,
      links: [
        { href: "/#практикум", label: "Секція практикуму" },
        { href: "/", label: "На головну" },
      ],
    },
    journey: {
      badge: "Практикум «Подорож до себе»",
      title: "Оплату отримано",
      lead: "Дякуємо! Все пройшло успішно.",
      body: "Продовжіть у Telegram: там старт програми та матеріали. Якщо вікно не відкрилось — скопіюйте посилання з кнопки нижче.",
      primaryLabel: "Відкрити Telegram",
      primaryHref: journeyHref,
      links: [
        { href: "/#практикум", label: "Про програму" },
        { href: "/", label: "На головну" },
      ],
    },
  };
}

export default function PaymentSuccessView({ variantKey, sessionSlotLine = "" }) {
  const sessionTg =
    process.env.NEXT_PUBLIC_PAYMENT_SUCCESS_TELEGRAM_URL || TG_DEFAULT;
  const selfHref = WORKSHOP_BOT_SELF;
  const psychHref = WORKSHOP_BOT_PSYCHOLOGIST;
  const journeyHref = WORKSHOP_BOT_SELF;
  const variants = buildVariants(sessionTg, selfHref, psychHref, journeyHref);
  const v = variants[variantKey] || variants.journey;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&display=swap');
        .pay-result-page {
          font-family: 'Montserrat', sans-serif;
          min-height: calc(100vh - 72px);
          padding: clamp(40px, 8vw, 88px) clamp(20px, 5vw, 32px) clamp(56px, 10vw, 96px);
          box-sizing: border-box;
          background:
            radial-gradient(ellipse 120% 80% at 50% -20%, rgba(99, 145, 255, 0.22), transparent 55%),
            radial-gradient(ellipse 80% 50% at 100% 60%, rgba(180, 199, 249, 0.35), transparent 45%),
            linear-gradient(180deg, #f8faff 0%, #ffffff 38%, #f4f7ff 100%);
        }
        .pay-result-card {
          max-width: 520px;
          margin: 0 auto;
          background: #fff;
          border-radius: clamp(20px, 4vw, 28px);
          padding: clamp(28px, 5vw, 44px) clamp(22px, 4vw, 40px);
          box-shadow:
            0 4px 24px rgba(110, 140, 200, 0.1),
            0 24px 64px rgba(99, 145, 255, 0.12);
          border: 1px solid rgba(225, 232, 250, 0.95);
          text-align: center;
          box-sizing: border-box;
        }
        .pay-result-badge {
          display: inline-block;
          font-size: clamp(10px, 1.6vw, 11px);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6391ff;
          background: #eaf0ff;
          border: 1px solid rgba(99, 145, 255, 0.28);
          padding: 8px 14px;
          border-radius: 999px;
          margin-bottom: clamp(20px, 4vw, 28px);
        }
        .pay-result-icon-wrap {
          width: clamp(72px, 14vw, 88px);
          height: clamp(72px, 14vw, 88px);
          margin: 0 auto clamp(20px, 3vw, 24px);
          border-radius: 50%;
          background: linear-gradient(145deg, #6391ff 0%, #4a75e8 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 12px 36px rgba(99, 145, 255, 0.42);
        }
        .pay-result-icon-wrap svg {
          width: 40%;
          height: 40%;
          stroke: #fff;
          stroke-width: 3;
          fill: none;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        .pay-result-title {
          font-weight: 800;
          font-size: clamp(22px, 4.2vw, 30px);
          line-height: 1.2;
          color: #111;
          margin: 0 0 12px 0;
          letter-spacing: -0.02em;
        }
        .pay-result-lead {
          font-weight: 600;
          font-size: clamp(15px, 2.4vw, 17px);
          color: #2d3348;
          line-height: 1.45;
          margin: 0 0 16px 0;
        }
        .pay-result-body {
          font-weight: 500;
          font-size: clamp(14px, 2.1vw, 16px);
          color: #5c6478;
          line-height: 1.65;
          margin: 0 0 clamp(22px, 4vw, 28px) 0;
        }
        .pay-result-slot {
          text-align: left;
          background: #f4f7ff;
          border: 1px solid rgba(99, 145, 255, 0.2);
          border-radius: 14px;
          padding: 14px 16px;
          margin: 0 0 clamp(18px, 3vw, 24px) 0;
          box-sizing: border-box;
        }
        .pay-result-slot > span {
          display: block;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #6391ff;
          margin-bottom: 8px;
          font-family: 'Montserrat', sans-serif;
        }
        .pay-result-slot > p {
          margin: 0;
          font-weight: 700;
          font-size: clamp(15px, 2.2vw, 17px);
          color: #1a1f2e;
          line-height: 1.45;
          font-family: 'Montserrat', sans-serif;
        }
        .pay-result-primary {
          display: block;
          width: 100%;
          box-sizing: border-box;
          text-align: center;
          font-weight: 700;
          font-size: clamp(14px, 2vw, 16px);
          letter-spacing: 0.04em;
          text-decoration: none;
          color: #fff !important;
          background: linear-gradient(145deg, #6391ff 0%, #5080ee 100%);
          padding: 16px 24px;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(99, 145, 255, 0.38);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .pay-result-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 36px rgba(99, 145, 255, 0.45);
        }
        .pay-result-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: clamp(22px, 4vw, 28px);
          padding-top: clamp(18px, 3vw, 24px);
          border-top: 1px solid rgba(225, 232, 250, 0.9);
        }
        .pay-result-links a {
          font-weight: 600;
          font-size: 15px;
          color: #6391ff;
          text-decoration: none;
        }
        .pay-result-links a:hover {
          text-decoration: underline;
        }
        @media (max-width: 480px) {
          .pay-result-page {
            min-height: calc(100vh - 64px);
          }
        }
      `}</style>
      <div className="pay-result-page">
        <div className="pay-result-card">
          <div className="pay-result-badge">{v.badge}</div>
          <div className="pay-result-icon-wrap" aria-hidden>
            <svg viewBox="0 0 24 24">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="pay-result-title">{v.title}</h1>
          <p className="pay-result-lead">{v.lead}</p>
          {variantKey === "session" && sessionSlotLine.trim() ? (
            <div className="pay-result-slot">
              <span>Дата та час запису</span>
              <p>{sessionSlotLine.trim()}</p>
            </div>
          ) : null}
          <p className="pay-result-body">{v.body}</p>
          <a
            className="pay-result-primary"
            href={v.primaryHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            {v.primaryLabel}
          </a>
          <div className="pay-result-links">
            {v.links.map((l) => (
              <Link key={l.href + l.label} href={l.href}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

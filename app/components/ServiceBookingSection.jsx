"use client";

import { useCallback, useMemo, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";
import CtaPillButton from "./CtaPillButton";
import { CONTACTS } from "../data/siteData";
import { SECTION_INTRO_LEAD, SECTION_INTRO_TITLE } from "./sectionIntroStyles";

const UA_MONTHS = [
  "січня",
  "лютого",
  "березня",
  "квітня",
  "травня",
  "червня",
  "липня",
  "серпня",
  "вересня",
  "жовтня",
  "листопада",
  "грудня",
];
const UA_WEEKDAYS = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];

function formatSlotLine({ date, slot }) {
  const d = new Date(date);
  const wd = UA_WEEKDAYS[d.getDay()];
  return `${wd}, ${d.getDate()} ${UA_MONTHS[d.getMonth()]} — ${slot}`;
}

function bookingDurationLabel(service) {
  const extra = service.extra || "";
  const m = extra.match(/(\d+)\s*хв/);
  if (m) return `${m[1]} хв`;
  if (extra.includes("год")) {
    const g = extra.match(/(\d+(?:[.,]\d+)?)\s*год/);
    if (g) return `${g[1].replace(",", ".")} год`;
  }
  return extra || "—";
}

function bookingPriceLabel(service) {
  if (service.priceEmphasis) return service.priceEmphasis;
  if (service.price) return service.price;
  return "—";
}

function buildBookingMessage(service, fields, slotLine) {
  const lines = [
    `Запит з сайту — ${service.title}`,
    slotLine ? `Обраний час: ${slotLine}` : null,
    `Ім'я: ${fields.name.trim()}`,
    `Телефон: ${fields.phone.trim()}`,
    fields.social?.trim() ? `Зв'язок (соцмережі): ${fields.social.trim()}` : null,
    fields.description?.trim() ? `Контекст / запит: ${fields.description.trim()}` : null,
  ].filter(Boolean);
  return lines.join("\n");
}

const ICON = 44;
const accent = "#92B2FF";

const BOOKING_SECTION_STYLES = `
  .service-booking-section {
    background: #fff;
    box-sizing: border-box;
    padding: clamp(48px, 6vw, 64px) 120px clamp(56px, 8vw, 96px);
  }
  #booking-calendar,
  #booking-form {
    scroll-margin-top: 96px;
  }
  @media (max-width: 768px) {
    .service-booking-section {
      padding: clamp(40px, 5vw, 48px) 40px clamp(48px, 7vw, 64px);
    }
    #booking-calendar,
    #booking-form {
      scroll-margin-top: 80px;
    }
  }
`;

function SocialIcon({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      width={ICON}
      height={ICON}
      style={{
        width: ICON,
        height: ICON,
        objectFit: "contain",
        display: "block",
        flexShrink: 0,
      }}
    />
  );
}

export default function ServiceBookingSection({ service }) {
  const [confirmedSlot, setConfirmedSlot] = useState(null);

  const duration = useMemo(() => bookingDurationLabel(service), [service]);
  const price = useMemo(() => bookingPriceLabel(service), [service]);
  const slotSummary = confirmedSlot ? formatSlotLine(confirmedSlot) : null;

  const handleFormSubmit = useCallback(
    (fields) => {
      const slotLine = confirmedSlot ? formatSlotLine(confirmedSlot) : null;
      const text = buildBookingMessage(service, fields, slotLine);
      const url = `https://t.me/share/url?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    [service, confirmedSlot]
  );

  const instagramHref = `https://www.instagram.com/${CONTACTS.instagram.replace(/^@/, "")}/`;
  const iconLinks = [
    { href: instagramHref, label: "Instagram", icon: <SocialIcon src="/insta.png" alt="" /> },
    { href: CONTACTS.telegramLink, label: "Telegram", icon: <SocialIcon src="/telegram.png" alt="" /> },
    {
      href: `mailto:${CONTACTS.email}`,
      label: "Email",
      icon: <SocialIcon src="/mail.png" alt="" />,
      external: false,
    },
  ];

  if (!service.active) {
    return (
      <>
        <style>{BOOKING_SECTION_STYLES}</style>
        <section id="онлайн-запис" className="service-booking-section">
          <div style={{ width: "100%", margin: 0 }}>
          {/* Якір для «Записатися» на сторінках без календаря */}
          <div
            id="booking-calendar"
            style={{
              position: "relative",
              height: 0,
              width: 0,
              overflow: "hidden",
              pointerEvents: "none",
            }}
            aria-hidden
          />
          <h2
            style={{
              ...SECTION_INTRO_TITLE,
              textAlign: "left",
              marginBottom: "clamp(12px, 2vw, 20px)",
            }}
          >
            Зв&apos;яжіться зі мною
          </h2>
          <p
            style={{
              ...SECTION_INTRO_LEAD,
              textAlign: "left",
              maxWidth: "min(100%, 52ch)",
              marginBottom: 28,
            }}
          >
            Для цієї послуги онлайн-календар поки недоступний. Напишіть у зручний для вас канал — обговоримо
            формат і наступні кроки.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(20px, 4vw, 36px)" }}>
            {iconLinks.map(({ href, label, icon, external }) => (
              <a
                key={label}
                href={href}
                target={external === false ? undefined : "_blank"}
                rel={external === false ? undefined : "noreferrer"}
                aria-label={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textDecoration: "none",
                  color: accent,
                  transition: "opacity 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.85";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.transform = "none";
                }}
              >
                {icon}
              </a>
            ))}
            <CtaPillButton href={CONTACTS.telegramLink} target="_blank" rel="noreferrer" variant="periwinkle">
              Написати в телеграм
            </CtaPillButton>
          </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <style>{BOOKING_SECTION_STYLES}</style>
      <section id="онлайн-запис" className="service-booking-section">
        <div style={{ width: "100%", margin: 0 }}>
        <BookingCalendar onSelect={setConfirmedSlot} />

        <BookingForm
          duration={duration}
          price={price}
          slotSummary={slotSummary}
          onSubmit={handleFormSubmit}
        />

        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#666",
            textAlign: "center",
            margin: "clamp(40px, 6vw, 56px) 0 20px",
          }}
        >
          Або напишіть напряму
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(24px, 5vw, 40px)",
          }}
        >
          {iconLinks.map(({ href, label, icon, external }) => (
            <a
              key={label}
              href={href}
              target={external === false ? undefined : "_blank"}
              rel={external === false ? undefined : "noreferrer"}
              aria-label={label}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textDecoration: "none",
                color: accent,
                transition: "opacity 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.85";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "none";
              }}
            >
              {icon}
            </a>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}

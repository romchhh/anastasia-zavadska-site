"use client";

import { useCallback, useMemo, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";
import { CONTACTS } from "../data/siteData";

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
    padding: clamp(48px, 6vw, 64px) clamp(40px, 8vw, 120px) clamp(56px, 8vw, 96px);
  }
  #booking-calendar,
  #booking-form {
    scroll-margin-top: 96px;
  }
  @media (max-width: 768px) {
    .service-booking-section {
      padding: clamp(40px, 5vw, 48px) clamp(40px, 8vw, 120px) clamp(48px, 7vw, 64px);
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

const hiddenCalendarAnchor = (
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
);

export default function ServiceBookingSection({ service }) {
  const [confirmedSlot, setConfirmedSlot] = useState(null);

  const showBookingCalendar = service.showBookingCalendar === true;
  const onlinePayment = service.onlinePayment === true;

  const duration = useMemo(() => bookingDurationLabel(service), [service]);
  const price = useMemo(() => bookingPriceLabel(service), [service]);
  const slotSummary =
    showBookingCalendar && confirmedSlot ? formatSlotLine(confirmedSlot) : null;

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
          {hiddenCalendarAnchor}
        </section>
      </>
    );
  }

  return (
    <>
      <style>{BOOKING_SECTION_STYLES}</style>
      <section id="онлайн-запис" className="service-booking-section">
        <div style={{ width: "100%", margin: 0 }}>
        {showBookingCalendar ? (
          <BookingCalendar onSelect={setConfirmedSlot} />
        ) : (
          hiddenCalendarAnchor
        )}

        <BookingForm
          duration={duration}
          price={price}
          slotSummary={slotSummary}
          requireSlot={showBookingCalendar}
          onlinePayment={onlinePayment}
          onSubmit={handleFormSubmit}
        />
        </div>
      </section>
    </>
  );
}

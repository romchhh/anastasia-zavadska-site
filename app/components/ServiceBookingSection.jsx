"use client";

import { useCallback, useMemo, useState } from "react";
import BookingCalendar from "./BookingCalendar";
import BookingForm from "./BookingForm";
import { CONTACTS } from "../data/siteData";
import { submitWayForPayForm } from "@/lib/wayforpayClientSubmit";
import { PAGE_GUTTER_X, SECTION_SCROLL_MARGIN_TOP } from "./sectionIntroStyles";
import { kyivYmdKey } from "@/lib/kyivDate";
import { slotRangeToStartTime } from "@/lib/calendarSlots";

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

const ICON = 44;
const accent = "#92B2FF";

const BOOKING_SECTION_STYLES = `
  .service-booking-section {
    background: #fff;
    box-sizing: border-box;
    padding: clamp(44px, 5.5vw, 56px) ${PAGE_GUTTER_X} clamp(52px, 7vw, 88px);
  }
  #booking-calendar,
  #booking-form {
    scroll-margin-top: ${SECTION_SCROLL_MARGIN_TOP};
  }
  @media (max-width: 768px) {
    .service-booking-section {
      padding: clamp(28px, 4vw, 40px) ${PAGE_GUTTER_X} clamp(36px, 5vw, 48px);
    }
    #booking-calendar,
    #booking-form {
      scroll-margin-top: 72px;
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

export default function ServiceBookingSection({
  service,
  sessionPriceUah,
  bookingNotifyKind = "service",
}) {
  const [confirmedSlot, setConfirmedSlot] = useState(null);

  const showBookingCalendar = service.showBookingCalendar === true;
  const onlinePayment = service.onlinePayment === true;

  const duration = useMemo(() => bookingDurationLabel(service), [service]);
  const price = useMemo(() => bookingPriceLabel(service), [service]);
  const slotSummary =
    showBookingCalendar && confirmedSlot ? formatSlotLine(confirmedSlot) : null;

  const bookingSuccessCopy = useMemo(() => {
    if (bookingNotifyKind === "event") {
      return {
        successTitle: "Успішно зафіксовано",
        successText:
          "Дякуємо! Ваш запит на оновлення про бранчі та ретрити надіслано. Я зв’яжуся з вами, коли з’являться новини.",
      };
    }
    if (!onlinePayment) {
      return {
        successTitle: "Запит надіслано",
        successText:
          "Ми отримали ваші дані. Я відповім найближчим часом за вказаним телефоном або в соцмережах.",
      };
    }
    return {};
  }, [bookingNotifyKind, onlinePayment]);

  const handleFormSubmit = useCallback(
    async (fields) => {
      const slotLine = confirmedSlot ? formatSlotLine(confirmedSlot) : null;
      const calendarDate =
        showBookingCalendar && confirmedSlot ? kyivYmdKey(confirmedSlot.date) : undefined;
      const calendarTime =
        showBookingCalendar && confirmedSlot
          ? slotRangeToStartTime(confirmedSlot.slot) ?? undefined
          : undefined;

      const bookGoogleIfSlot = async () => {
        if (!showBookingCalendar || !confirmedSlot || !calendarDate || !calendarTime) return;
        const bookRes = await fetch("/api/calendar/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: calendarDate,
            time: calendarTime,
            name: fields.name.trim(),
            phone: fields.phone,
            consultationType: service.title,
            social: fields.social?.trim() || undefined,
            description: fields.description?.trim() || undefined,
          }),
        });
        if (!bookRes.ok) {
          const j = await bookRes.json().catch(() => ({}));
          throw new Error(j?.error || "calendar book failed");
        }
      };

      if (!onlinePayment) {
        const notifyRes = await fetch("/api/booking/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            kind: bookingNotifyKind === "event" ? "event" : undefined,
            serviceTitle: service.title,
            slotLine,
            name: fields.name,
            phone: fields.phone,
            social: fields.social,
            description: fields.description,
          }),
        });
        if (!notifyRes.ok) {
          throw new Error("notify failed");
        }
        await bookGoogleIfSlot();
        return;
      }

      const uah = typeof sessionPriceUah === "number" ? sessionPriceUah : 2100;
      const eventTitleBase = `${service.title} (онлайн)`;
      const eventTitle = slotLine ? `${eventTitleBase} | ${slotLine}` : eventTitleBase;
      const payRes = await fetch("/api/payment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentKind: "session",
          price: uah,
          eventTitle,
          tariffType: "session",
          clientFirstName: fields.name.trim().slice(0, 100),
          clientLastName: " ",
          clientPhone: String(fields.phone).replace(/\s/g, ""),
          bookingNotify: {
            kind: bookingNotifyKind === "event" ? "event" : undefined,
            serviceTitle: service.title,
            slotLine,
            name: fields.name,
            phone: fields.phone,
            social: fields.social,
            description: fields.description,
            calendarDate,
            calendarTime,
            consultationType: service.title,
          },
        }),
      });
      const payJson = await payRes.json();
      if (!payRes.ok || !payJson?.data) {
        throw new Error(payJson?.error || "payment create failed");
      }
      submitWayForPayForm(payJson.data);
      return false;
    },
    [
      service,
      confirmedSlot,
      onlinePayment,
      sessionPriceUah,
      bookingNotifyKind,
      showBookingCalendar,
    ]
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
          showOptionalFields={bookingNotifyKind !== "event"}
          successTitle={bookingSuccessCopy.successTitle}
          successText={bookingSuccessCopy.successText}
          onSubmit={handleFormSubmit}
        />
        </div>
      </section>
    </>
  );
}

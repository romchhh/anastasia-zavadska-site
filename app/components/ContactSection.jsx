"use client";

import { CONTACTS } from "../data/siteData";

const C = {
  border: "#A5C3FF",
  accent: "#8DAFFF",
  ctaBg: "#94AFFF",
  text: "#111",
  arrowInCircle: "#5c5c5c",
};

const font = "'Montserrat', sans-serif";

function SocialIcon({ src, alt }) {
  return (
    <img
      className="contact-social-icon"
      src={src}
      alt={alt}
      width={38}
      height={38}
      style={{ width: 38, height: 38, objectFit: "contain", display: "block", flexShrink: 0 }}
    />
  );
}

const instagramHref = `https://www.instagram.com/${CONTACTS.instagram.replace(/^@/, "")}/`;

export default function ContactSection() {
  const rows = [
    { icon: <SocialIcon src="/telegram.png" alt="Telegram" />, text: CONTACTS.telegram, href: CONTACTS.telegramLink },
    { icon: <SocialIcon src="/insta.png" alt="Instagram" />, text: CONTACTS.instagram, href: instagramHref },
    { icon: <SocialIcon src="/mail.png" alt="Email" />, text: CONTACTS.email, href: `mailto:${CONTACTS.email}` },
  ];

  return (
    <section
      id="контакти"
      className="contact-section-outer"
      style={{
        background: "#fff",
        padding: "80px 120px 96px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          fontFamily: font,
          fontSize: "clamp(28px, 5vw, 56px)",
          fontWeight: 900,
          color: C.text,
          textTransform: "uppercase",
          letterSpacing: ".02em",
          lineHeight: 1.05,
          margin: "0 0 20px 0",
        }}
      >
        Зв&apos;яжіться зі мною
      </h2>
      <p
        style={{
          fontFamily: font,
          fontSize: "clamp(15px, 1.5vw, 20px)",
          fontWeight: 400,
          color: "#444",
          lineHeight: 1.55,
          margin: "0 0 52px 0",
          maxWidth: "600px",
        }}
      >
        Напишіть — і ми разом знайдемо формат, який підійде саме вам
      </p>

      <div
        className="contact-section-row"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "clamp(24px, 4vw, 56px)",
          flexWrap: "wrap",
        }}
      >
        <div
          className="contact-info-card"
          style={{
            border: `1.5px solid ${C.border}`,
            borderRadius: "36px",
            padding: "clamp(40px, 5vw, 65px) clamp(40px, 5.5vw, 70px)",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(28px, 3.5vw, 40px)",
            minWidth: "min(100%, 380px)",
            flex: "0 1 auto",
            boxSizing: "border-box",
          }}
        >
          {rows.map(({ icon, text, href }) => (
            <a
              className="contact-link-row"
              key={text}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                fontFamily: font,
                fontSize: "clamp(17px, 1.75vw, 24px)",
                fontWeight: 500,
                color: C.accent,
                textDecoration: "none",
                transition: "opacity .2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.8"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
            >
              <span style={{ flexShrink: 0, display: "flex" }}>{icon}</span>
              {text}
            </a>
          ))}
        </div>

        <a
          className="contact-telegram-link"
          href={CONTACTS.telegramLink}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none", flexShrink: 0 }}
        >
          <span
            className="contact-telegram-cta"
            style={{
              fontFamily: font,
              background: C.ctaBg,
              border: "none",
              borderRadius: "999px",
              padding: "clamp(12px, 1.5vw, 18px) clamp(18px, 1.8vw, 22px) clamp(12px, 1.5vw, 18px) clamp(28px, 3vw, 44px)",
              fontSize: "clamp(11px, 1.15vw, 16px)",
              fontWeight: 800,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#fff",
              display: "inline-flex",
              alignItems: "center",
              gap: "clamp(12px, 1.4vw, 18px)",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(148, 175, 255, 0.35)",
              transition: "transform .2s, box-shadow .2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 32px rgba(148, 175, 255, 0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 4px 24px rgba(148, 175, 255, 0.35)";
            }}
          >
            Написати в телеграм
            <span
              className="contact-telegram-cta-arrow"
              style={{
                width: "clamp(40px, 4vw, 52px)",
                height: "clamp(40px, 4vw, 52px)",
                borderRadius: "50%",
                background: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "clamp(17px, 1.6vw, 22px)",
                color: C.arrowInCircle,
                flexShrink: 0,
                lineHeight: 1,
              }}
              aria-hidden
            >
              →
            </span>
          </span>
        </a>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .contact-section-row {
            gap: clamp(32px, 4vw, 73px) !important;
          }
          .contact-info-card {
            border-radius: 47px !important;
            padding: clamp(52px, 6.5vw, 85px) clamp(52px, 7vw, 91px) !important;
            gap: clamp(36px, 4.5vw, 52px) !important;
            min-width: min(100%, 494px) !important;
          }
          .contact-link-row {
            gap: 26px !important;
            font-size: clamp(22px, 1.75vw, 31px) !important;
          }
          .contact-social-icon {
            width: 50px !important;
            height: 50px !important;
          }
          .contact-telegram-cta {
            padding: clamp(16px, 1.5vw, 24px) clamp(23px, 1.8vw, 29px) clamp(16px, 1.5vw, 24px) clamp(36px, 3vw, 57px) !important;
            font-size: clamp(14px, 1.15vw, 21px) !important;
            gap: clamp(16px, 1.4vw, 24px) !important;
          }
          .contact-telegram-cta-arrow {
            width: clamp(52px, 4vw, 68px) !important;
            height: clamp(52px, 4vw, 68px) !important;
            font-size: clamp(22px, 1.6vw, 29px) !important;
          }
        }
        @media (max-width: 768px) {
          .contact-section-outer {
            padding: 56px 24px 72px !important;
          }
          .contact-section-row {
            flex-direction: column;
            align-items: stretch !important;
          }
          .contact-section-row > a {
            align-self: center;
            width: 100%;
            max-width: 400px;
          }
          .contact-telegram-cta {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box !important;
            padding: 18px 22px 18px 28px !important;
            font-size: 15px !important;
            gap: 18px !important;
            min-height: 58px;
          }
          .contact-telegram-cta-arrow {
            width: 54px !important;
            height: 54px !important;
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}

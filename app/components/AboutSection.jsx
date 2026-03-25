import { TAGS, ABOUT_PHOTO } from "../data/siteData";

export default function AboutSection() {
  return (
    <>
      <section
        id="про-мене"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#e8e8e8",
          minHeight: "100vh",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <img
          className="about-bg-img"
          src={ABOUT_PHOTO}
          alt="Анастасія"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "left center",
            filter: "grayscale(100%)",
            display: "block",
            zIndex: 0,
          }}
        />

        <div
          className="about-desktop-fade"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to right, transparent 30%, rgba(232,232,232,0.55) 52%, rgba(232,232,232,0.92) 68%, rgba(232,232,232,0.98) 80%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        <div
          className="about-tags-strip"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 2,
            width: "100%",
            boxSizing: "border-box",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px 10px",
            padding: "28px clamp(20px, 6vw, 120px) 16px",
            pointerEvents: "none",
          }}
        >
          {TAGS.map((tag, i) => (
            <span key={tag} style={{ display: "inline-flex", alignItems: "center" }}>
              <span style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(14px, 1.35vw, 17px)",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: ".04em",
                whiteSpace: "nowrap",
                textShadow: "0 0 18px rgba(0,0,0,.45), 0 1px 3px rgba(0,0,0,.75)",
              }}>
                {tag}
              </span>
              {i < TAGS.length - 1 && (
                <span style={{
                  color: "#fff",
                  fontSize: "clamp(16px, 1.5vw, 20px)",
                  lineHeight: 1,
                  margin: "0 4px",
                  opacity: 0.95,
                  textShadow: "0 0 14px rgba(0,0,0,.4), 0 1px 2px rgba(0,0,0,.7)",
                }}>·</span>
              )}
            </span>
          ))}
        </div>

        <div
          className="about-content"
          style={{
            position: "relative",
            zIndex: 2,
            marginLeft: "auto",
            width: "72%",
            maxWidth: "900px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "88px 120px 140px 28px",
            textAlign: "center",
          }}
        >
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(32px, 6.5vw, 64px)",
            fontWeight: 900,
            color: "#111",
            textTransform: "uppercase",
            lineHeight: "100%",
            margin: "0 0 36px 0",
            whiteSpace: "nowrap",
          }}>
            Привіт, я Анастасія
          </h2>

          {[
            "Я гештальт-психологиня, магістр психології. Працюю онлайн з дорослими — індивідуально та у групах.",
            "У моїй роботі головне — не швидкий результат, а процес. Процес турботливого й усвідомленого повернення до себе: до власних відчуттів, бажань і внутрішньої опори.",
            "Мій підхід побудований на присутності, довірі та м'якому супроводі. Я не «виправляю» — я поруч, поки ти проходиш свій шлях.",
          ].map((p, i) => (
            <p key={i} style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(15px, 1.35vw, 18px)",
              fontWeight: 500,
              lineHeight: 1.85,
              color: "#222",
              maxWidth: "min(100%, 680px)",
              width: "100%",
              margin: "0 0 20px 0",
            }}>
              {p}
            </p>
          ))}

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(15px, 1.35vw, 18px)",
            fontWeight: 700,
            color: "#111",
            maxWidth: "min(100%, 680px)",
            width: "100%",
            margin: "14px 0 14px 0",
          }}>
            Родзинка / особлива аудиторія:
          </p>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(15px, 1.35vw, 18px)",
            fontWeight: 500,
            lineHeight: 1.85,
            color: "#222",
            maxWidth: "min(100%, 680px)",
            width: "100%",
            margin: 0,
          }}>
            До психології я пройшла шлях у IT — як COO в технологічній компанії.
            Тому особливо добре розумію тих, хто живе в режимі ефективності,
            виснаження і постійного «треба більше». Але я працюю з усіма —
            головне, що ви готові зустрітися з собою.
          </p>
        </div>

        {/* Desktop wave */}
        <div
          className="about-desktop-wave"
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            lineHeight: 0, zIndex: 3, pointerEvents: "none",
          }}
        >
          <svg viewBox="0 0 1440 88" xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "88px" }}>
            <path d="M0,44 C180,88 360,0 540,44 C720,88 900,8 1080,44 C1200,64 1320,30 1440,44 L1440,88 L0,88 Z" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* ── MOBILE photo block ── */}
      <div className="about-mobile-photo" style={{ display: "none", position: "relative", background: "#e8e8e8" }}>

        {/* photo with top fade overlay */}
        <div style={{ position: "relative", lineHeight: 0 }}>
          <img
            src={ABOUT_PHOTO}
            alt="Анастасія"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              filter: "grayscale(100%)",
              objectFit: "cover",
              marginTop: "-60px",
            }}
          />
          {/* top fade: grey → transparent, overlaid on photo */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: "180px",
            background: "linear-gradient(to bottom, #e8e8e8 0%, rgba(232,232,232,0.7) 40%, transparent 100%)",
            pointerEvents: "none",
          }} />

          {/* bottom wave over the photo */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            lineHeight: 0,
            zIndex: 2,
            pointerEvents: "none",
          }}>
            <svg viewBox="0 0 768 88" xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              style={{ display: "block", width: "100%", height: "72px" }}>
              <path d="M0,44 C120,88 240,0 384,44 C528,88 648,8 768,44 L768,88 L0,88 Z" fill="#fff" />
            </svg>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #про-мене {
            min-height: unset !important;
            background: #e8e8e8 !important;
          }
          #про-мене .about-bg-img { display: none !important; }
          #про-мене .about-desktop-fade { display: none !important; }
          #про-мене .about-desktop-wave { display: none !important; }
          #про-мене .about-tags-strip {
            justify-content: center !important;
            padding: 22px 20px 12px !important;
            gap: 8px 12px !important;
          }
          #про-мене .about-tags-strip span span:first-child {
            color: #555 !important;
            text-shadow: none !important;
          }
          #про-мене .about-tags-strip span span:last-child {
            color: #999 !important;
            text-shadow: none !important;
          }
          #про-мене .about-content {
            width: 100% !important;
            margin-left: 0 !important;
            padding: 80px 28px 48px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          #про-мене .about-content h2 {
            white-space: normal !important;
            font-size: clamp(24px, 8vw, 40px) !important;
          }
          .about-mobile-photo { display: block !important; }
        }
      `}</style>
    </>
  );
}
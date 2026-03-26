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
        {/* Фото займає ліві 58% */}
        <img
          className="about-bg-img"
          src={ABOUT_PHOTO}
          alt="Анастасія"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "58%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
            zIndex: 0,
          }}
        />

        {/* Суцільний сірий блок справа */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          width: "45%",
          background: "#e8e8e8",
          zIndex: 0,
        }} />

        {/* Блюр-шар у зоні переходу */}
        <div style={{
          position: "absolute",
          top: 0,
          left: "38%",
          bottom: 0,
          width: "22%",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          maskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 30%, black 70%, transparent 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }} />

        {/* Плавний перехід фото → сірий */}
        <div
          className="about-desktop-fade"
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            bottom: 0,
            width: "50%",
            background: "linear-gradient(to right, transparent 0%, rgba(232,232,232,0.15) 20%, rgba(232,232,232,0.5) 45%, rgba(232,232,232,0.88) 68%, #e8e8e8 85%)",
            zIndex: 2,
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
            "Я психологиня, працюю в гештальт-підході. Проводжу індивідуальну та групову терапію онлайн.",
            "У своїй роботі я не про «швидко полагодити». Я про процес — коли ти поступово повертаєшся до себе: до своїх відчуттів, бажань і внутрішньої опори. Я не даю готових відповідей і не «виправляю». Я поруч — щоб ти міг/могла краще зрозуміти себе і знайти свій шлях.",
            "До того, як стати магістром психології, я працювала в ІТ — пройшла шлях від офіс-менеджера до HRD/COO. Тому добре розумію тих, хто живе в режимі ефективності, виснаження і постійного «треба більше».",
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
              textAlign: "left",
            }}>
              {p}
            </p>
          ))}
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

      {/* ── З чим я працюю ── */}
      <section
        className="about-work-section"
        style={{
          background: "#fff",
          padding: "clamp(56px, 8vw, 96px) 120px clamp(64px, 9vw, 112px)",
          boxSizing: "border-box",
        }}
      >
        <div
          className="about-work-inner"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(40px, 6vw, 96px)",
            alignItems: "start",
          }}
        >
          {/* Ліва колонка */}
          <div>
            <h3 style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(32px, 6.5vw, 64px)",
              fontWeight: 900,
              color: "#111",
              textTransform: "uppercase",
              lineHeight: "100%",
              margin: "0 0 clamp(24px, 3vw, 40px) 0",
              whiteSpace: "nowrap",
            }}>
              З чим я працюю
            </h3>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(15px, 1.3vw, 18px)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "#444",
              margin: "0 0 clamp(20px, 2.5vw, 32px) 0",
            }}>
              Буває, що проблему не завжди легко назвати одним словом на першому сеансі — і це нормально. Іноді ти просто відчуваєш, що щось не так. Ми починаємо з цього відчуття і поступово розбираємося, що за ним стоїть.
            </p>

            {/* Три стани */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "важкість, тривога і ніби всередині порожньо" },
                { label: "хвиля, яка накриває, і складно впоратися з думками або емоціями" },
                { label: "ззовні ніби все нормально, але жити так більше не хочеться" },
              ].map(({ label }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                    background: "#f5f7ff",
                    borderRadius: "14px",
                    padding: "14px 18px",
                  }}
                >
                  <span style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#94AFFF",
                    flexShrink: 0,
                    marginTop: "7px",
                  }} />
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(14px, 1.2vw, 16px)",
                    fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.6,
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Права колонка */}
          <div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              fontWeight: 700,
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "#111",
              margin: "0 0 20px 0",
              paddingBottom: "12px",
              borderBottom: "1.5px solid #e8eeff",
            }}>
              Я працюю з різними станами і запитами:
            </p>

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "2px" }}>
              {[
                "емоційне виснаження і вигорання",
                "складнощі у стосунках",
                "відчуття «я не розумію, чого хочу»",
                "тривога, напруга, постійне «не відпускає»",
                "депресивні стани, втрата енергії і сенсу",
                "наслідки травматичного досвіду, ПТСР",
                "нав'язливі думки і дії (ОКР)",
                "залежності — як хімічні, так і поведінкові",
              ].map((item, idx) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 4px",
                    borderBottom: idx < 7 ? "1px solid #f0f2fa" : "none",
                  }}
                >
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(11px, .9vw, 13px)",
                    fontWeight: 700,
                    color: "#c8d5fa",
                    minWidth: "22px",
                    textAlign: "right",
                    flexShrink: 0,
                  }}>
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(14px, 1.2vw, 16px)",
                    fontWeight: 500,
                    color: "#222",
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </div>

          <div
            className="about-thought-cloud"
            style={{
              gridColumn: "1 / -1",
              marginTop: "clamp(10px, 1.8vw, 18px)",
              background: "linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%)",
              border: "1.5px solid #dce7ff",
              borderRadius: "48px",
              padding: "clamp(24px, 3vw, 38px) clamp(22px, 4vw, 56px)",
              boxShadow: "0 16px 36px rgba(124, 156, 235, 0.16)",
            }}
          >
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(16px, 1.4vw, 22px)",
              fontWeight: 500,
              lineHeight: 1.75,
              color: "#2f3f66",
              margin: 0,
              textAlign: "center",
              maxWidth: "980px",
              marginInline: "auto",
            }}>
              Ми починаємо з симптому, але робота з психологом — про глибше: зрозуміти себе і поступово змінювати те, що заважає жити так, як хочеться.
            </p>
          </div>
        </div>
      </section>

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
            padding: 80px 28px 80px !important;
            justify-content: center !important;
            align-items: center !important;
          }
          #про-мене .about-content h2 {
            white-space: normal !important;
            font-size: clamp(24px, 8vw, 40px) !important;
          }
          .about-mobile-photo {
            display: block !important;
            margin-top: -200px;
          }
          .about-mobile-photo img {
            margin-top: 0 !important;
          }
        }
        @media (max-width: 768px) {
          .about-work-section {
            padding: 56px 28px 64px !important;
            margin-top: -24px;
            position: relative;
            z-index: 3;
          }
          .about-work-inner {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-thought-cloud {
            border-radius: 28px !important;
            padding: 20px 18px !important;
          }
        }
        @media (max-width: 420px) {
          .about-work-section {
            padding: 44px 20px 52px !important;
          }
        }
      `}</style>
    </>
  );
}
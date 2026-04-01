import { TAGS, ABOUT_PHOTO } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";

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

        {/* Блюр — по центру зони переходу фото (58%) → сірий */}
        <div
          className="about-desktop-blur"
          style={{
            position: "absolute",
            top: 0,
            left: "calc(58% - 11%)",
            bottom: 0,
            width: "22%",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            maskImage: "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 28%, black 72%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Плавний перехід фото → сірий (зсунуто правіше під новий блюр) */}
        <div
          className="about-desktop-fade"
          style={{
            position: "absolute",
            top: 0,
            left: "30%",
            bottom: 0,
            width: "48%",
            background: "linear-gradient(to right, transparent 0%, rgba(232,232,232,0.12) 18%, rgba(232,232,232,0.48) 42%, rgba(232,232,232,0.9) 64%, #e8e8e8 82%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

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
            padding: "88px 96px 140px clamp(44px, 5vw, 80px)",
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
          padding: "clamp(56px, 8vw, 96px) clamp(24px, 8vw, 120px) clamp(64px, 9vw, 112px)",
          boxSizing: "border-box",
        }}
      >
        <div
          className="about-work-stack"
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(48px, 7vw, 88px)",
          }}
        >
          {/* Верх: заголовок, текст, картки, CTA — по центру */}
          <div
            className="about-work-intro"
            style={{
              textAlign: "center",
              maxWidth: "820px",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <h3
              className="about-work-title about-work-title-services-match"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(36px, 6vw, 72px)",
                fontWeight: 900,
                color: "#111",
                textTransform: "uppercase",
                lineHeight: 1,
                margin: "0 0 16px 0",
              }}
            >
              З чим я працюю
            </h3>
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(15px, 1.35vw, 18px)",
                fontWeight: 400,
                lineHeight: 1.75,
                color: "#000",
                margin: "0 auto clamp(28px, 4vw, 40px)",
                maxWidth: "640px",
              }}
            >
              Буває, що проблему не завжди легко назвати одним словом на першому сеансі — і це нормально. Іноді ти просто відчуваєш, що щось не так. Ми починаємо з цього відчуття і поступово розбираємося, що за ним стоїть.
            </p>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(10px, 1.5vw, 14px)",
                margin: "0 0 clamp(36px, 5vw, 48px) 0",
                textAlign: "left",
              }}
            >
              {[
                "важкість, тривога і ніби всередині порожньо",
                "хвиля, яка накриває, і складно впоратися з думками або емоціями",
                "ззовні ніби все нормально, але жити так більше не хочеться",
              ].map((label) => (
                <div
                  key={label}
                  className="about-work-pill-row"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(12px, 2vw, 16px)",
                    background: "#E1E9FF",
                    borderRadius: "999px",
                    padding: "clamp(14px, 2vw, 18px) clamp(18px, 2.5vw, 24px)",
                  }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      marginTop: "1px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden
                  >
                    <img
                      src="/icon.svg"
                      alt=""
                      width={20}
                      height={21}
                      style={{
                        width: "clamp(17px, 2vw, 22px)",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </span>
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "clamp(14px, 1.15vw, 16px)",
                      fontWeight: 500,
                      color: "#000",
                      lineHeight: 1.55,
                    }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(14px, 1.2vw, 17px)",
                fontWeight: 500,
                color: "#000",
                lineHeight: 1.5,
                margin: "0 0 clamp(18px, 2.5vw, 24px) 0",
              }}
            >
              Знайоме відчуття? Можемо розібрати це разом
            </p>

            <div
              className="about-work-cta-link"
              style={{
                display: "inline-flex",
                maxWidth: "100%",
                justifyContent: "center",
              }}
            >
              <CtaPillButton href="#послуги">Записатися на консультацію</CtaPillButton>
            </div>
          </div>

          {/* Дві колонки: список + синій блок */}
          <div
            className="about-work-split"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
              gap: "clamp(28px, 5vw, 56px)",
              alignItems: "stretch",
            }}
          >
            <div className="about-work-list-col">
              <h3
                className="about-work-title-services-match"
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(36px, 6vw, 72px)",
                  fontWeight: 900,
                  color: "#111",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  margin: "0 0 clamp(22px, 3vw, 32px) 0",
                  textAlign: "left",
                }}
              >
                Я працюю з різними станами і запитами:
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(10px, 1.2vw, 14px)",
                }}
              >
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
                      alignItems: "baseline",
                      gap: "clamp(12px, 2vw, 18px)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(12px, 1vw, 14px)",
                        fontWeight: 700,
                        color: "#B4C2E8",
                        minWidth: "28px",
                        flexShrink: 0,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(14px, 1.15vw, 17px)",
                        fontWeight: 500,
                        color: "#000",
                        lineHeight: 1.5,
                      }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="about-work-visual"
              style={{
                background: "#C7D4FF",
                borderRadius: "clamp(20px, 3vw, 32px)",
                minHeight: "clamp(280px, 42vw, 420px)",
                width: "100%",
              }}
              aria-hidden
            />
          </div>

          <div
            className="about-thought-cloud"
            style={{
              background:
                "linear-gradient(90deg, rgba(165, 180, 252, 0.38) 0%, #fff 10%, #fff 90%, rgba(165, 180, 252, 0.38) 100%)",
              border: "none",
              borderRadius: "clamp(24px, 3vw, 36px)",
              padding: "clamp(28px, 3.5vw, 44px) clamp(22px, 4vw, 48px)",
              boxShadow:
                "0 12px 40px rgba(0, 0, 0, 0.07), -26px 0 42px -8px rgba(153, 178, 248, 0.55), 26px 0 42px -8px rgba(153, 178, 248, 0.55)",
            }}
          >
            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(15px, 1.35vw, 20px)",
                fontWeight: 500,
                lineHeight: 1.75,
                color: "#000",
                margin: 0,
                textAlign: "center",
                maxWidth: "920px",
                marginInline: "auto",
              }}
            >
              Ми починаємо з симптому, але{" "}
              <strong style={{ fontWeight: 800 }}>робота з психологом — про глибше:</strong>{" "}
              зрозуміти себе і поступово змінювати те, що заважає жити так, як хочеться.
            </p>
          </div>

          <p
            className="about-work-tags-line"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(12px, 1.05vw, 15px)",
              fontWeight: 500,
              color: "#555",
              textAlign: "center",
              lineHeight: 1.6,
              margin: 0,
              paddingTop: "clamp(4px, 1vw, 8px)",
            }}
          >
            {TAGS.join(" · ")}
          </p>
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
          #про-мене .about-desktop-blur { display: none !important; }
          #про-мене .about-desktop-wave { display: none !important; }
          #про-мене .about-content {
            width: 100% !important;
            margin-left: 0 !important;
            padding: 132px 28px 80px !important;
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
          .about-work-stack {
            gap: 40px !important;
          }
          .about-work-split {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .about-work-visual {
            min-height: 220px !important;
          }
          .about-work-pill-row {
            border-radius: 22px !important;
          }
          .about-work-cta-link {
            width: 100% !important;
            justify-content: center !important;
          }
          .about-work-cta-link .cta-pill {
            width: 100% !important;
            max-width: 100% !important;
            justify-content: space-between !important;
          }
          .about-thought-cloud {
            border-radius: 24px !important;
            padding: 22px 20px !important;
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
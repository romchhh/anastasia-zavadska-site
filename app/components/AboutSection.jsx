import { Fragment } from "react";
import { TAGS, ABOUT_PHOTO, INDIVIDUAL_BOOKING_PAGE } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";
import { PAGE_GUTTER_X, SECTION_INTRO_LEAD, SECTION_INTRO_TITLE } from "./sectionIntroStyles";

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

        {/* Блюр — ширша зона, сильніший blur для м’якого переходу фото → сірий */}
        <div
          className="about-desktop-blur"
          style={{
            position: "absolute",
            top: 0,
            left: "calc(58% - 15%)",
            bottom: 0,
            width: "30%",
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />

        {/* Плавний перехід фото → сірий (узгоджено з блюром — довший, м’якший градієнт) */}
        <div
          className="about-desktop-fade"
          style={{
            position: "absolute",
            top: 0,
            left: "32%",
            bottom: 0,
            width: "56%",
            background:
              "linear-gradient(to right, transparent 0%, rgba(232,232,232,0.05) 18%, rgba(232,232,232,0.22) 38%, rgba(232,232,232,0.5) 58%, rgba(232,232,232,0.82) 76%, #e8e8e8 90%, #e8e8e8 100%)",
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
            maxWidth: "920px",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            padding: `72px 80px 120px ${PAGE_GUTTER_X}`,
            textAlign: "left",
            boxSizing: "border-box",
          }}
        >
          <h2
            className="about-intro-heading"
            style={{
              ...SECTION_INTRO_TITLE,
              textAlign: "left",
              margin: "0 0 clamp(20px, 3vw, 28px) 0",
            }}
          >
            <span className="about-intro-desktop">Привіт, я Анастасія</span>
            <span className="about-intro-mobile">
              <span className="about-intro-mobile-line">Привіт,</span>
              <span className="about-intro-mobile-line">я Анастасія</span>
            </span>
          </h2>

          {[
            "Я психологиня, працюю в гештальт-підході. Проводжу індивідуальну та групову терапію онлайн.",
            "У своїй роботі я не про «швидко полагодити». Я про процес — коли ти поступово повертаєшся до себе: до своїх відчуттів, бажань і внутрішньої опори. Я не даю готових відповідей і не «виправляю». Я поруч — щоб ти міг/могла краще зрозуміти себе і знайти свій шлях.",
            "До того, як стати магістром психології, я працювала в ІТ — пройшла шлях від офіс-менеджера до HRD/COO. Тому добре розумію тих, хто живе в режимі ефективності, виснаження і постійного «треба більше».",
          ].map((p, i) => (
            <p
              key={i}
              style={{
                ...SECTION_INTRO_LEAD,
                fontWeight: i === 0 ? 600 : 400,
                maxWidth: "min(100%, 920px)",
                width: "100%",
                margin: "0 0 20px 0",
                textAlign: "left",
              }}
            >
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
            style={{ display: "block", width: "100%", height: "72px" }}>
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
          padding: `clamp(36px, 5.5vw, 64px) ${PAGE_GUTTER_X} clamp(42px, 6.5vw, 76px)`,
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
            gap: "clamp(28px, 4vw, 52px)",
          }}
        >
          {/* Верх: заголовок, текст, картки, CTA — по центру */}
          <div
            className="about-work-intro"
            style={{
              textAlign: "center",
              maxWidth: "min(100%, 1040px)",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <h3
              className="about-work-intro-heading"
              style={{
                ...SECTION_INTRO_TITLE,
              }}
            >
              З чим я працюю
            </h3>
            <p
              className="about-work-intro-lead"
              style={{
                ...SECTION_INTRO_LEAD,
                margin: "0 auto clamp(10px, 1.5vw, 16px)",
                maxWidth: "min(100%, 920px)",
                width: "100%",
              }}
            >
              Буває, що проблему не завжди легко назвати одним словом на першому сеансі — і це нормально. Іноді ти просто відчуваєш, що щось не так.
            </p>
            <p
              className="about-work-intro-lead about-work-intro-lead-second"
              style={{
                ...SECTION_INTRO_LEAD,
                margin: "0 auto clamp(20px, 3vw, 32px)",
                maxWidth: "min(100%, 920px)",
                width: "100%",
              }}
            >
              Ми починаємо з цього відчуття і поступово розбираємося, що за ним стоїть.
            </p>

            <div
              className="about-work-cards"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "clamp(16px, 2.5vw, 28px)",
                margin: "0 0 clamp(22px, 3.5vw, 36px) 0",
                width: "100%",
                maxWidth: "1000px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {[
                {
                  img: "/work-with/anxiety-empty.png",
                  label: "важкість, тривога і ніби всередині порожньо",
                },
                {
                  img: "/work-with/emotions-wave.png",
                  label: "хвиля, яка накриває, і складно впоратися з думками або емоціями",
                },
                {
                  img: "/work-with/facade-inner-tired.png",
                  label: "ззовні ніби все нормально, але жити так більше не хочеться",
                },
              ].map(({ img, label }) => (
                <div
                  key={label}
                  className="about-work-card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    textAlign: "center",
                    background: "#E8EEFF",
                    borderRadius: "clamp(20px, 3vw, 28px)",
                    aspectRatio: "5 / 4",
                    padding: "clamp(14px, 2.2vw, 22px) clamp(14px, 2vw, 22px)",
                    boxSizing: "border-box",
                    gap: "clamp(6px, 1vw, 10px)",
                  }}
                >
                  <div
                    style={{
                      flex: "0 0 auto",
                      width: "min(68%, 180px)",
                      maxHeight: "38%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    aria-hidden
                  >
                    <img
                      src={img}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        maxHeight: "clamp(80px, 17vw, 130px)",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "clamp(15px, 1.4vw, 19px)",
                      fontWeight: 400,
                      color: "#000",
                      lineHeight: 1.5,
                      margin: 0,
                      marginTop: "clamp(-4px, -0.6vw, -2px)",
                      flex: "1 1 auto",
                      alignSelf: "stretch",
                      textAlign: "center",
                    }}
                  >
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="about-work-intro-hint"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "clamp(14px, 1.2vw, 17px)",
                fontWeight: 500,
                color: "#000",
                lineHeight: 1.5,
                margin: "0 0 clamp(14px, 2vw, 20px) 0",
              }}
            >
              Знайоме відчуття?
              <br className="about-work-intro-hint__break" aria-hidden="true" />
              Можемо розібрати це разом
            </p>

            <div
              className="about-work-cta-link"
              style={{
                display: "inline-flex",
                maxWidth: "100%",
                justifyContent: "center",
              }}
            >
              <CtaPillButton href={INDIVIDUAL_BOOKING_PAGE}>Записатися на сесію</CtaPillButton>
            </div>
          </div>

          {/* Дві колонки: список + синій блок */}
          <div
            className="about-work-split"
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.15fr) minmax(0, 0.85fr)",
              gap: "clamp(20px, 3.5vw, 40px)",
              alignItems: "stretch",
            }}
          >
            <div className="about-work-list-col">
              <h3
                className="about-work-states-heading"
                style={{
                  ...SECTION_INTRO_TITLE,
                  fontSize: "clamp(26px, 5.2vw, 52px)",
                  margin: "0 0 clamp(16px, 2.2vw, 24px) 0",
                  textAlign: "left",
                }}
              >
                Я працюю з індивідуальними запитами:
              </h3>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "clamp(10px, 1.2vw, 15px)",
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
                ].map((item) => (
                  <li
                    key={item}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "clamp(12px, 2vw, 18px)",
                    }}
                  >
                    <span
                      style={{
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "clamp(26px, 3vw, 32px)",
                      }}
                      aria-hidden
                    >
                      <img
                        src="/icon.svg"
                        alt=""
                        width={22}
                        height={23}
                        style={{
                          width: "clamp(20px, 2.4vw, 26px)",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    </span>
                    <span
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "clamp(15px, 1.35vw, 20px)",
                        fontWeight: 500,
                        color: "#000",
                        lineHeight: 1.55,
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
                borderRadius: "clamp(20px, 3vw, 32px)",
                minHeight: "clamp(280px, 42vw, 420px)",
                width: "100%",
                overflow: "hidden",
                background: "#C7D4FF",
                position: "relative",
              }}
            >
              <img
                src="/hands.png"
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "clamp(280px, 42vw, 420px)",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            </div>
          </div>

          <div
            className="about-thought-cloud-wrap"
            style={{
              position: "relative",
              marginTop: 0,
              width: "100%",
              maxWidth: "980px",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "clamp(4px, 1vw, 12px)",
              boxSizing: "border-box",
            }}
          >
            <div
              className="about-thought-cloud"
              style={{
                position: "relative",
                border: "none",
                borderRadius: "clamp(20px, 2.8vw, 28px)",
                padding: "clamp(24px, 3vw, 40px) clamp(24px, 4vw, 48px)",
                background: "#ffffff",
                boxShadow: `
                  0 4px 6px rgba(200, 215, 245, 0.12),
                  0 12px 40px rgba(120, 150, 210, 0.14),
                  18px 0 48px -8px rgba(160, 188, 255, 0.65),
                  -18px 0 48px -8px rgba(160, 188, 255, 0.65),
                  0 0 56px rgba(150, 175, 235, 0.2)
                `,
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "clamp(15px, 1.35vw, 20px)",
                  fontWeight: 500,
                  lineHeight: 1.75,
                  color: "#111",
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
          </div>

          <p
            className="about-work-tags-line about-work-tags"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              fontWeight: 700,
              fontStyle: "normal",
              lineHeight: 1.35,
              letterSpacing: 0,
              color: "#6391FF",
              textAlign: "center",
              margin: 0,
              paddingTop: "clamp(8px, 1.5vw, 16px)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "baseline",
              columnGap: "0.45em",
              rowGap: "0.55em",
            }}
          >
            {TAGS.map((tag, i) => (
              <Fragment key={`${tag}-${i}`}>
                {i > 0 && (
                  <span className="about-work-tags__sep" aria-hidden>
                    ·
                  </span>
                )}
                <span className="about-work-tags__item">{tag}</span>
              </Fragment>
            ))}
          </p>
        </div>
      </section>

      <style>{`
        .about-intro-desktop {
          display: block;
          white-space: nowrap;
        }
        .about-intro-mobile {
          display: none;
        }
        .about-work-intro-hint__break {
          display: none;
        }
        .about-work-cta-link .cta-pill {
          font-family: 'Montserrat', sans-serif !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          line-height: 100% !important;
          letter-spacing: 0 !important;
        }
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
            /* Висота липкого навбару 68px — без додаткового «повітря», заголовок майже впритул під меню */
            padding: 68px 28px 64px !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            text-align: left !important;
          }
          #про-мене .about-content h2.about-intro-heading {
            font-size: clamp(24px, 8vw, 40px) !important;
            text-align: left !important;
          }
          #про-мене .about-content h2.about-intro-heading .about-intro-desktop {
            display: none !important;
          }
          #про-мене .about-content h2.about-intro-heading .about-intro-mobile {
            display: flex !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.1em !important;
            text-transform: none !important;
            letter-spacing: -0.02em !important;
            line-height: 1.08 !important;
          }
          #про-мене .about-content h2.about-intro-heading .about-intro-mobile-line {
            display: block !important;
          }
          #про-мене .about-content p {
            text-align: left !important;
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
            padding: 44px 28px 52px !important;
            margin-top: -24px;
            position: relative;
            z-index: 3;
          }
          .about-work-stack {
            gap: 28px !important;
          }
          .about-work-split {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .about-work-visual {
            min-height: 220px !important;
          }
          .about-work-visual img {
            min-height: 220px !important;
          }
          .about-work-intro {
            text-align: left !important;
          }
          .about-work-intro .about-work-intro-heading {
            text-align: left !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .about-work-intro .about-work-intro-lead {
            text-align: left !important;
            margin-left: 0 !important;
            margin-right: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .about-work-intro .about-work-intro-hint {
            text-align: center !important;
            margin-left: auto !important;
            margin-right: auto !important;
            max-width: 100% !important;
            width: 100% !important;
          }
          .about-work-intro-hint__break {
            display: block !important;
          }
          .about-work-intro-heading {
            font-size: clamp(24px, 8vw, 40px) !important;
          }
          .about-work-states-heading {
            font-size: clamp(22px, 7vw, 36px) !important;
          }
          .about-work-tags-line.about-work-tags {
            font-size: clamp(12px, 3.2vw, 16px) !important;
            line-height: 1.42 !important;
            padding-top: 6px !important;
            margin-top: -8px !important;
            padding-bottom: 0 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            justify-content: center !important;
            column-gap: 0.4em !important;
            row-gap: 0.48em !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            box-sizing: border-box !important;
          }
          .about-work-tags-line .about-work-tags__sep {
            padding: 0 !important;
            flex-shrink: 0 !important;
            opacity: 0.88 !important;
          }
          .about-work-tags-line .about-work-tags__item {
            text-align: center !important;
            max-width: 100% !important;
          }
          .about-work-cards {
            grid-template-columns: 1fr !important;
            max-width: 100% !important;
            margin-left: auto !important;
            margin-right: auto !important;
            gap: 10px !important;
          }
          .about-work-card {
            aspect-ratio: unset !important;
            min-height: 0 !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: flex-start !important;
            text-align: center !important;
            padding: 12px 14px !important;
            gap: 14px !important;
            border-radius: 16px !important;
          }
          .about-work-card > div:first-of-type {
            width: 56px !important;
            min-width: 56px !important;
            max-height: 56px !important;
            flex-shrink: 0 !important;
          }
          .about-work-card > div:first-of-type img {
            max-height: 52px !important;
            width: auto !important;
            max-width: 100% !important;
            margin: 0 auto !important;
          }
          .about-work-card p {
            text-align: center !important;
            margin-top: 0 !important;
            font-size: clamp(13px, 3.6vw, 16px) !important;
            line-height: 1.45 !important;
            font-weight: 400 !important;
            flex: 1 1 auto !important;
            min-width: 0 !important;
          }
          .about-work-cta-link {
            width: 100% !important;
            justify-content: center !important;
          }
          .about-work-cta-link .cta-pill {
            width: 100% !important;
            max-width: 100% !important;
            justify-content: space-between !important;
            font-size: clamp(16px, 4.2vw, 22px) !important;
          }
          .about-thought-cloud {
            border-radius: 20px !important;
            padding: 24px 18px !important;
            box-shadow:
              0 6px 24px rgba(120, 150, 210, 0.12),
              10px 0 36px -6px rgba(160, 188, 255, 0.5),
              -10px 0 36px -6px rgba(160, 188, 255, 0.5),
              0 0 40px rgba(150, 175, 235, 0.16) !important;
          }
        }
        @media (max-width: 420px) {
          .about-work-section {
            padding: 44px 20px 52px !important;
          }
          .about-work-card {
            padding: 10px 12px !important;
            gap: 12px !important;
            border-radius: 14px !important;
          }
          .about-work-card > div:first-of-type {
            width: 48px !important;
            min-width: 48px !important;
            max-height: 48px !important;
          }
          .about-work-card > div:first-of-type img {
            max-height: 44px !important;
          }
        }
      `}</style>
    </>
  );
}
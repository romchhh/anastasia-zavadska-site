import { ABOUT_PHOTO, INDIVIDUAL_BOOKING_PAGE, TAGS } from "../data/siteData";
import CtaPillButton from "./CtaPillButton";
import {
  PAGE_GUTTER_X,
  SECTION_INTRO_LEAD,
  SECTION_INTRO_TITLE,
  SECTION_TITLE_MAX_WIDTH,
} from "./sectionIntroStyles";

export default function AboutSection() {
  return (
    <>
      <section
        id="про-мене"
        lang="uk"
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
            width: "78%",
            maxWidth: "min(100%, 880px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
            justifyContent: "center",
            padding: `72px ${PAGE_GUTTER_X} 120px clamp(20px, 2.8vw, 48px)`,
            textAlign: "left",
            boxSizing: "border-box",
          }}
        >
          <div
            className="about-intro-copy"
            style={{
              width: "100%",
              maxWidth: SECTION_TITLE_MAX_WIDTH,
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              boxSizing: "border-box",
            }}
          >
            <h2
              className="about-intro-heading"
              style={{
                ...SECTION_INTRO_TITLE,
                fontSize: "clamp(28px, 4.75vw, 62px)",
                lineHeight: "1.06",
                letterSpacing: "-0.028em",
                maxWidth: "100%",
                width: "100%",
                minWidth: 0,
                marginLeft: 0,
                marginRight: 0,
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

            <p
              className="about-intro-body"
              style={{
                ...SECTION_INTRO_LEAD,
                fontSize: "clamp(16px, 2.2vw, 22px)",
                fontWeight: 600,
                maxWidth: "100%",
                width: "100%",
                margin: "0 0 clamp(14px, 1.8vw, 20px) 0",
                textAlign: "left",
              }}
            >
              Я психологиня, працюю в гештальт-підході. Проводжу індивідуальну та групову терапію онлайн.
            </p>
            <p
              className="about-intro-body"
              style={{
                ...SECTION_INTRO_LEAD,
                fontSize: "clamp(16px, 2.2vw, 22px)",
                fontWeight: 400,
                maxWidth: "100%",
                width: "100%",
                margin: "0 0 clamp(14px, 1.8vw, 20px) 0",
                textAlign: "left",
              }}
            >
              У своїй роботі я не про «швидко полагодити». Я про процес — коли ти поступово повертаєшся до себе: до своїх відчуттів, бажань і внутрішньої опори. Я не даю готових відповідей і не «виправляю». Я поруч — щоб ти міг/могла краще зрозуміти себе і знайти свій шлях.
            </p>
            <p
              className="about-intro-body"
              style={{
                ...SECTION_INTRO_LEAD,
                fontSize: "clamp(16px, 2.2vw, 22px)",
                fontWeight: 400,
                maxWidth: "100%",
                width: "100%",
                margin: 0,
                textAlign: "left",
              }}
            >
              До того, як стати магістром психології, я працювала в ІТ — пройшла шлях від офіс-менеджера до HRD/COO. Тому добре розумію тих, хто живе в режимі ефективності, виснаження і постійного «треба більше».
            </p>
          </div>
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
          <div
            className="about-mobile-photo-wave"
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              lineHeight: 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <svg
              viewBox="0 0 768 88"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              className="about-mobile-photo-wave-svg"
              style={{ display: "block", width: "100%", height: "72px" }}
            >
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
            width: "100%",
            maxWidth: "none",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(28px, 4vw, 52px)",
          }}
        >
          {/* Верх: заголовок, текст, картки, CTA — по центру (ширше за типову колонку 820px, не на весь екран) */}
          <div
            className="about-work-intro"
            style={{
              textAlign: "center",
              maxWidth: "min(100%, 960px)",
              margin: "0 auto",
              width: "100%",
            }}
          >
            <h3
              className="about-work-intro-heading"
              style={{
                ...SECTION_INTRO_TITLE,
                maxWidth: "100%",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              З чим я працюю
            </h3>
            <p
              className="about-work-intro-lead"
              style={{
                ...SECTION_INTRO_LEAD,
                margin: "0 auto clamp(10px, 1.5vw, 16px)",
                maxWidth: "100%",
                width: "100%",
              }}
            >
              Буває, що проблему не завжди легко назвати одним словом на першому сеансі. Іноді ти просто відчуваєш, що щось не так.
            </p>
            <p
              className="about-work-intro-lead about-work-intro-lead-second"
              style={{
                ...SECTION_INTRO_LEAD,
                margin: "0 auto clamp(20px, 3vw, 32px)",
                maxWidth: "100%",
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
                maxWidth: "100%",
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
                    gap: "clamp(10px, 1.4vw, 14px)",
                  }}
                >
                  <div
                    className="about-work-card-thumb"
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
                    className="about-work-card-text"
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "clamp(15px, 1.4vw, 19px)",
                      fontWeight: 400,
                      color: "#000",
                      lineHeight: 1.52,
                      margin: 0,
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
              Знайоме відчуття?{" "}
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
              gridTemplateColumns: "minmax(0, 1.22fr) minmax(0, 0.78fr)",
              gap: "clamp(20px, 3.5vw, 40px)",
              alignItems: "stretch",
            }}
          >
            <div
              className="about-work-list-col"
              style={{ minWidth: 0, width: "100%" }}
            >
              <h3
                className="about-work-states-heading"
                style={{
                  ...SECTION_INTRO_TITLE,
                  fontSize: "clamp(26px, 5.2vw, 52px)",
                  margin: "0 0 clamp(16px, 2.2vw, 24px) 0",
                  textAlign: "left",
                  maxWidth: "100%",
                  width: "100%",
                  marginLeft: 0,
                  marginRight: 0,
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
                      alignItems: "flex-start",
                      gap: "clamp(12px, 2vw, 18px)",
                      minWidth: 0,
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
                        minWidth: 0,
                        flex: "1 1 auto",
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
                width: "100%",
                minHeight: 0,
                alignSelf: "stretch",
                display: "flex",
                flexDirection: "column",
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
                  flex: "1 1 auto",
                  minHeight: 0,
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
              maxWidth: "min(100%, 960px)",
              marginLeft: "auto",
              marginRight: "auto",
              padding: "clamp(4px, 1vw, 12px) clamp(4px, 1vw, 12px) clamp(0px, 0.4vw, 6px)",
              boxSizing: "border-box",
            }}
          >
            <div
              className="about-thought-cloud"
              style={{
                position: "relative",
                border: "1px solid rgba(200, 215, 245, 0.45)",
                borderRadius: "clamp(20px, 2.8vw, 28px)",
                padding:
                  "clamp(24px, 3vw, 40px) clamp(24px, 4vw, 48px) clamp(18px, 2.2vw, 30px)",
                background:
                  "linear-gradient(168deg, #ffffff 0%, #fafcff 32%, #f3f6fd 68%, #ecf1fb 100%)",
                boxShadow: `
                  inset 0 1px 0 rgba(255, 255, 255, 0.75),
                  0 2px 10px rgba(200, 215, 245, 0.14),
                  0 12px 36px rgba(120, 150, 210, 0.1),
                  14px 0 40px -12px rgba(160, 188, 255, 0.32),
                  -14px 0 40px -12px rgba(160, 188, 255, 0.32),
                  0 0 48px rgba(150, 175, 235, 0.12)
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
                  maxWidth: "min(100%, 900px)",
                  width: "100%",
                  marginInline: "auto",
                }}
              >
                <span
                  className="about-thought-cloud-line1"
                  style={{ display: "block", marginBottom: "0.4em" }}
                >
                  Ми починаємо з симптому, але{" "}
                  <strong style={{ fontWeight: 800 }}>робота з психологом — про глибше:</strong>
                </span>
                <span className="about-thought-cloud-line2" style={{ display: "block" }}>
                  зрозуміти себе і поступово змінювати те, що заважає жити так, як хочеться.
                </span>
              </p>
            </div>
          </div>

          {/* Плашки тегів — на всю ширину about-work-stack (не всередині about-work-intro 960px) */}
          <div
            className="about-work-topic-pills"
            aria-label="Напрями роботи"
            style={{
              width: "100%",
              maxWidth: "100%",
              margin: "clamp(6px, 1.2vw, 14px) 0 0",
              paddingTop: 0,
              boxSizing: "border-box",
            }}
          >
            <div
              className="about-work-topic-pills__inner"
              style={{
                maxWidth: "100%",
                margin: "0 auto",
                width: "100%",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "clamp(10px, 2vw, 16px)",
              }}
            >
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="about-work-topic-pills__pill"
                  style={{
                    display: "inline-block",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "clamp(12px, 1.85vw, 15px)",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    lineHeight: 1.25,
                    textTransform: "uppercase",
                    color: "#3d5696",
                    background: "rgba(255, 255, 255, 0.92)",
                    border: "1px solid rgba(99, 145, 255, 0.38)",
                    borderRadius: "999px",
                    padding: "clamp(11px, 1.4vw, 14px) clamp(16px, 2.2vw, 22px)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255, 255, 255, 0.95), 0 2px 8px rgba(100, 130, 200, 0.12)",
                    boxSizing: "border-box",
                    textAlign: "center",
                    maxWidth: "100%",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
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
        @media (min-width: 769px) {
          /* Як у заголовка: лівий край, без «розтягування» рядків і без авто-переносів по складах */
          #про-мене .about-intro-copy p.about-intro-body {
            text-align: left !important;
            text-justify: auto;
            hyphens: none;
            -webkit-hyphens: none;
            text-wrap: pretty;
            line-height: 1.52;
            overflow-wrap: break-word;
            word-break: normal;
          }
        }
        .about-work-intro-hint__break {
          display: none;
        }
        /* Стик із #про-мене: при субпіксельному рендері видна щілина — просвічує фото зліва; біла смуга перекриває */
        .about-work-section {
          position: relative;
          z-index: 2;
        }
        .about-work-section::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: -14px;
          height: 14px;
          background: #fff;
          pointer-events: none;
        }
        .about-work-cta-link .cta-pill {
          font-family: 'Montserrat', sans-serif !important;
          font-size: 24px !important;
          font-weight: 700 !important;
          line-height: 100% !important;
          letter-spacing: 0 !important;
        }
        @media (min-width: 769px) {
          .about-work-cards {
            align-items: stretch !important;
          }
          .about-work-card {
            justify-content: flex-start !important;
            align-items: center !important;
            height: 100% !important;
            /* Фіксований aspect-ratio стискав текст — висота рядка від найвищої картки */
            aspect-ratio: unset !important;
            min-width: 0 !important;
            overflow: hidden !important;
          }
          .about-work-card-thumb {
            width: min(100%, 180px) !important;
            max-width: 180px !important;
            margin-left: auto !important;
            margin-right: auto !important;
            height: clamp(118px, 13.5vw, 152px) !important;
            min-height: clamp(118px, 13.5vw, 152px) !important;
            max-height: clamp(118px, 13.5vw, 152px) !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .about-work-card-thumb img {
            max-height: clamp(96px, 11vw, 128px) !important;
            width: auto !important;
            max-width: 100% !important;
            object-fit: contain !important;
          }
          .about-work-card-text {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            text-align: center !important;
            margin-top: 0 !important;
            flex: 1 1 auto !important;
            overflow-wrap: break-word !important;
            word-break: normal !important;
            hyphens: auto !important;
            -webkit-hyphens: auto !important;
            font-size: clamp(13px, 1.22vw, 17px) !important;
            line-height: 1.45 !important;
          }
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
            padding: 56px ${PAGE_GUTTER_X} 52px !important;
            justify-content: flex-start !important;
            align-items: stretch !important;
            text-align: left !important;
          }
          #про-мене .about-content h2.about-intro-heading {
            font-size: clamp(30px, 9.6vw, 46px) !important;
            line-height: 1.05 !important;
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
          #про-мене .about-content p.about-intro-body {
            text-align: left !important;
            font-size: clamp(16px, 4.2vw, 19px) !important;
            line-height: 1.42 !important;
            hyphens: none !important;
            -webkit-hyphens: none !important;
            text-wrap: pretty;
            overflow-wrap: break-word;
          }
          .about-mobile-photo {
            display: block !important;
            margin-top: -200px;
          }
          .about-mobile-photo img {
            margin-top: 0 !important;
          }
          /* Хвиля вища + менше наїзду білої секції — інакше вигин ховається й видно «лінію» */
          .about-mobile-photo-wave svg {
            height: clamp(84px, 22vw, 108px) !important;
            min-height: 80px !important;
          }
        }
        @media (max-width: 768px) {
          .about-work-section {
            padding: 32px ${PAGE_GUTTER_X} 40px !important;
            margin-top: -10px;
            position: relative;
            z-index: 3;
          }
          .about-work-section::before {
            display: none !important;
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
            /* Рядок на всю висоту тексту — текст по вертикалі по центру поруч з іконкою */
            align-items: stretch !important;
            justify-content: flex-start !important;
            text-align: left !important;
            padding: 13px 16px !important;
            gap: 14px !important;
            border-radius: 16px !important;
          }
          .about-work-card > div:first-of-type,
          .about-work-card-thumb {
            width: 56px !important;
            min-width: 56px !important;
            height: auto !important;
            min-height: 56px !important;
            max-height: none !important;
            flex-shrink: 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            align-self: stretch !important;
          }
          .about-work-card > div:first-of-type img,
          .about-work-card-thumb img {
            max-height: 52px !important;
            width: auto !important;
            max-width: 100% !important;
            margin: 0 !important;
            object-fit: contain !important;
          }
          .about-work-card p,
          .about-work-card-text {
            text-align: left !important;
            margin-top: 0 !important;
            padding-top: 0 !important;
            font-size: clamp(13px, 3.6vw, 16px) !important;
            line-height: 1.48 !important;
            font-weight: 400 !important;
            flex: 1 1 auto !important;
            min-width: 0 !important;
            align-self: stretch !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
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
          .about-thought-cloud-wrap {
            max-width: 100% !important;
            padding-bottom: 0 !important;
          }
          .about-thought-cloud {
            border-radius: 20px !important;
            padding: 22px 18px 18px !important;
            border: 1px solid rgba(200, 215, 245, 0.38) !important;
            background: linear-gradient(
              168deg,
              #ffffff 0%,
              #fafcff 38%,
              #f2f5fc 100%
            ) !important;
            box-shadow:
              inset 0 1px 0 rgba(255, 255, 255, 0.7),
              0 4px 18px rgba(120, 150, 210, 0.1),
              8px 0 28px -8px rgba(160, 188, 255, 0.28),
              -8px 0 28px -8px rgba(160, 188, 255, 0.28),
              0 0 32px rgba(150, 175, 235, 0.1) !important;
          }
          .about-work-topic-pills {
            margin-top: clamp(4px, 1.5vw, 10px) !important;
          }
          .about-work-topic-pills__inner {
            gap: 10px !important;
            row-gap: 12px !important;
          }
          .about-work-topic-pills__pill {
            font-size: clamp(10px, 3.1vw, 13px) !important;
            padding: 10px 14px !important;
            letter-spacing: 0.055em !important;
          }
        }
        @media (max-width: 420px) {
          .about-work-section {
            padding: 28px ${PAGE_GUTTER_X} 36px !important;
          }
          .about-work-card {
            padding: 11px 14px !important;
            gap: 12px !important;
            border-radius: 14px !important;
          }
          .about-work-card > div:first-of-type,
          .about-work-card-thumb {
            width: 48px !important;
            min-width: 48px !important;
            height: auto !important;
            min-height: 48px !important;
            max-height: none !important;
          }
          .about-work-card > div:first-of-type img,
          .about-work-card-thumb img {
            max-height: 44px !important;
          }
        }
      `}</style>
    </>
  );
}
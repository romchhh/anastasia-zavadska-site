// ─── Design tokens (відповідають siteData / глобальним стилям) ────────────────
const tokens = {
  blue: "#6391FF",
  blueLight: "#92B2FF",
  bluePale: "#E8EEFF",
  blueMid: "#C7D4FF",
  text: "#111",
  textMuted: "#555",
  bg: "#fff",
  surface: "#f7f8ff",
  radius: "24px",
  radiusSm: "14px",
  font: "'Montserrat', sans-serif",
};

// ─── Primitive UI components ──────────────────────────────────────────────────

const Tag = ({ children }) => (
  <span
    style={{
      display: "inline-block",
      background: tokens.bluePale,
      color: tokens.blue,
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      padding: "6px 18px",
      borderRadius: 100,
      marginBottom: 20,
    }}
  >
    {children}
  </span>
);

const MetaPill = ({ label, value }) => (
  <div
    style={{
      background: "#fff",
      border: `1.5px solid ${tokens.blueMid}`,
      borderRadius: 100,
      padding: "8px 20px",
      fontSize: 13,
      fontWeight: 600,
      color: tokens.textMuted,
    }}
  >
    {label} <span style={{ color: tokens.blue }}>{value}</span>
  </div>
);

const SectionHeader = ({ num, title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
    <div
      style={{
        width: 36,
        height: 36,
        minWidth: 36,
        borderRadius: "50%",
        background: tokens.bluePale,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 14,
        fontWeight: 800,
        color: tokens.blue,
      }}
    >
      {num}
    </div>
    <h2 style={{ fontSize: 18, fontWeight: 800, color: tokens.text, margin: 0 }}>{title}</h2>
  </div>
);

const Divider = () => (
  <hr
    style={{
      height: 1,
      background: tokens.blueMid,
      opacity: 0.5,
      margin: "40px 0",
      border: "none",
    }}
  />
);

const cardStyles = {
  default: { background: tokens.surface, borderRadius: tokens.radiusSm, padding: "20px 24px", marginBottom: 12 },
  highlight: {
    background: tokens.bluePale,
    borderRadius: tokens.radiusSm,
    padding: "20px 24px",
    border: `1.5px solid ${tokens.blueMid}`,
    marginBottom: 12,
  },
  warn: {
    background: "#fff8f0",
    borderRadius: tokens.radiusSm,
    padding: "20px 24px",
    borderLeft: "4px solid #FFAA55",
    marginBottom: 12,
  },
  ok: {
    background: "#f0fff8",
    borderRadius: tokens.radiusSm,
    padding: "20px 24px",
    borderLeft: "4px solid #34c07a",
    marginBottom: 12,
  },
};

const labelColors = {
  default: tokens.blue,
  highlight: tokens.blue,
  warn: "#c07000",
  ok: "#1a7a4a",
};

const Card = ({ label, variant = "default", children, style }) => (
  <div style={{ ...cardStyles[variant], ...style }}>
    {label && (
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          color: labelColors[variant],
          marginBottom: 6,
        }}
      >
        {label}
      </div>
    )}
    {children}
  </div>
);

const bodyText = {
  fontFamily: tokens.font,
  fontSize: 14,
  fontWeight: 500,
  color: "#333",
  lineHeight: 1.7,
  margin: 0,
};

const BulletList = ({ items, variant = "default" }) => {
  const dotColor = variant === "warn" ? "#FFAA55" : variant === "ok" ? "#34c07a" : tokens.blueLight;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{ padding: "4px 0", display: "flex", alignItems: "flex-start", gap: 10, ...bodyText }}
        >
          <span
            style={{
              display: "block",
              minWidth: 6,
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: dotColor,
              marginTop: 8,
            }}
          />
          {item}
        </li>
      ))}
    </ul>
  );
};

const Grid = ({ cols = 2, children }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: 12,
      marginBottom: 12,
    }}
  >
    {children}
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const OfertaPage = () => {
  return (
    <div
      style={{
        fontFamily: tokens.font,
        color: tokens.text,
        background: tokens.bg,
        lineHeight: 1.65,
        maxWidth: 800,
        margin: "0 auto",
        paddingBottom: 80,
      }}
    >
      {/* Hero */}
      <div
        style={{
          padding: "56px 48px 52px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(22px, 4vw, 34px)",
            fontWeight: 800,
            lineHeight: 1.2,
            color: tokens.text,
            marginBottom: 12,
          }}
        >
          Договір про надання
          <br />
          інформаційно-консультаційних послуг
        </h1>
        <p style={{ fontSize: 14, color: tokens.textMuted, fontWeight: 500 }}>
          у галузі психології · м. Київ · 2026
        </p>
        <div
          style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}
        >
          <MetaPill label="ФОП" value="Завадська Анастасія Сергіївна" />
          <MetaPill label="РНОКПП" value="3080401528" />
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "0 32px" }}>
        {/* Intro */}
        <div
          style={{
            background: tokens.bluePale,
            borderRadius: tokens.radius,
            padding: "28px 32px",
            margin: "32px 0",
            borderLeft: `4px solid ${tokens.blueLight}`,
          }}
        >
          <p style={bodyText}>
            Цей договір є публічною офертою відповідно до ст. 633 Цивільного кодексу України. Повна
            оплата послуг означає беззастережне прийняття всіх умов —{" "}
            <strong>без підпису, так само, як письмовий договір.</strong> Незгода з умовами позбавляє
            права отримувати послуги.
          </p>
        </div>

        {/* 1. Загальні положення */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={1} title="Загальні положення" />
          <Card>
            <p style={bodyText}>
              Договір є публічним (ст. 633 ЦКУ) і договором приєднання (ст. 634 ЦКУ). Умови однакові
              для всіх. Виконавець — ФОП Завадська А.С., Замовник — особа, що здійснила оплату.
            </p>
          </Card>
          <Grid cols={2}>
            <Card label="Акцепт оферти">
              <p style={bodyText}>Повна оплата послуг на підставі рахунку Виконавця</p>
            </Card>
            <Card label="Договір набирає чинності">
              <p style={bodyText}>З дати надходження коштів на рахунок Виконавця</p>
            </Card>
          </Grid>
          <Card label="Підтвердження укладення">
            <p style={bodyText}>
              Квитанція, чек, платіжне доручення або інший розрахунковий документ (в електронній чи
              паперовій формі)
            </p>
          </Card>
        </section>

        <Divider />

        {/* 2. Предмет */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={2} title="Предмет договору" />
          <Grid cols={3}>
            {[
              ["Формат 1", "Індивідуальні консультації / сесії"],
              ["Формат 2", "Психодіагностичне обстеження"],
              ["Формат 3", "Тренінг навичок"],
            ].map(([label, text]) => (
              <Card key={label} label={label} variant="highlight">
                <p style={bodyText}>{text}</p>
              </Card>
            ))}
          </Grid>
          <Card label="Важливо" style={{ marginTop: 12 }}>
            <p style={bodyText}>
              Послуги мають виключно <strong>консультативний, немедичний характер</strong> і не є
              медичною допомогою, діагностикою або лікуванням. Формат обирає Замовник самостійно.
            </p>
          </Card>
        </section>

        <Divider />

        {/* 3. Оплата */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={3} title="Вартість та порядок оплати" />
          <Grid cols={2}>
            <Card label="Перша сесія">
              <p style={bodyText}>
                100% вартості — не пізніше ніж за <strong>24 години</strong> до початку
              </p>
            </Card>
            <Card label="Продовження">
              <p style={bodyText}>
                Пакет із <strong>4 сесій</strong> одним платежем (якщо не погоджено інше)
              </p>
            </Card>
          </Grid>
          <Card label="Форма оплати">
            <p style={bodyText}>
              Безготівково. Усі комісії платіжних систем — за рахунок Замовника. Вартість може бути у
              USD з оплатою у гривні за курсом НБУ на дату платежу.
            </p>
          </Card>
          <Card label="⚠ Сесія вважається проведеною і підлягає оплаті якщо" variant="warn">
            <BulletList
              variant="warn"
              items={[
                "Скасування менш ніж за 24 години до початку",
                "Запізнення понад 15 хвилин",
                "Неявка на сесію без попередження",
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* 4. Порядок надання */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={4} title="Порядок надання послуг" />
          <Grid cols={2}>
            <Card label="Онлайн">
              <p style={bodyText}>Відеозв'язок через погоджений канал</p>
            </Card>
            <Card label="Офлайн">
              <p style={bodyText}>За попередньою домовленістю Сторін</p>
            </Card>
          </Grid>
          <Card>
            <p style={bodyText}>
              Час сесій погоджується з урахуванням часової зони. Виконавець має право перенести сесію у
              разі технічних проблем, форс-мажору або інших обставин, що унеможливлюють надання послуг.
            </p>
          </Card>
        </section>

        <Divider />

        {/* 5. Повернення */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={5} title="Відмова від послуг та повернення коштів" />
          <Card label="✓ Повернення можливе" variant="ok">
            <p style={bodyText}>
              Якщо Замовник повідомив про відмову <strong>не пізніше ніж за 48 годин</strong> до першої
              оплаченої сесії. Кошти повертаються протягом <strong>3 робочих днів</strong> після
              отримання письмового запиту.
            </p>
          </Card>
          <Card label="✕ Повернення не здійснюється" variant="warn">
            <BulletList
              variant="warn"
              items={[
                "Порушення строків повідомлення (менш ніж 48 год)",
                "Послуги вже фактично надані",
                "Пропуск або несвоєчасне скасування сесії",
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* 6. Конфіденційність */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={6} title="Конфіденційність та персональні дані" />
          <Card>
            <BulletList
              items={[
                <>Вся інформація під час сесій є <strong>конфіденційною</strong></>,
                "Розкриття — лише у випадках, передбачених законодавством України",
                "Персональні дані можуть оброблятися та зберігатись у хмарних сервісах",
                <>Аудіо- та відеозапис — лише за <strong>взаємною згодою</strong> Сторін</>,
              ]}
            />
          </Card>
          <Card label="Telegram-бот">
            <p style={bodyText}>
              Використовуючи бот Виконавця, Замовник надає згоду на обробку: імені, username, Telegram
              ID та даних, добровільно надісланих у боті. Дані не передаються третім особам. Відкликати
              згоду можна через підтримку.
            </p>
          </Card>
        </section>

        <Divider />

        {/* 7. Пропуски */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={7} title="Пропуски сесій та відповідальність" />
          <Grid cols={2}>
            <Card label="Замовник">
              <p style={bodyText}>
                Може скасувати або перенести сесію не пізніше ніж за <strong>24 години</strong>. Інакше
                — сесія вважається наданою.
              </p>
            </Card>
            <Card label="Виконавець (у разі неявки)">
              <p style={bodyText}>
                Сесія не підлягає оплаті + наступна сесія надається зі{" "}
                <strong>знижкою 50%</strong>
              </p>
            </Card>
          </Grid>
        </section>

        <Divider />

        {/* 8. Відповідальність */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={8} title="Відповідальність" />
          <Card>
            <BulletList
              items={[
                <><strong>Послуги не є медичними</strong></>,
                "Виконавець не гарантує досягнення конкретного результату",
                "Відповідальність Виконавця обмежена сумою фактично сплачених послуг",
                "Спори — шляхом переговорів; за недосягнення згоди — відповідно до законодавства України",
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* 9. Строк */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={9} title="Строк дії та розірвання" />
          <Card>
            <p style={bodyText}>
              Діє з моменту акцепту до повного виконання зобов'язань. Може бути розірваний за
              попереднім повідомленням за <strong>30 календарних днів</strong>. Розірвання — не
              підстава для відмови від розрахунків.
            </p>
          </Card>
          <Card label="Виконавець може припинити послуги у разі" variant="warn">
            <BulletList
              variant="warn"
              items={[
                "Порушення умов оплати",
                "Систематичних пропусків сесій",
                "Порушення етичних норм, агресивної або образливої поведінки",
                "Поширення недостовірної інформації про Виконавця",
              ]}
            />
          </Card>
        </section>

        <Divider />

        {/* 10. Форс-мажор */}
        <section style={{ margin: "40px 0" }}>
          <SectionHeader num={10} title="Форс-мажор" />
          <Card>
            <p style={bodyText}>
              Сторони звільняються від відповідальності у разі бойових дій, стихійних лих, аварій,
              рішень органів влади, епідемій та інших непередбачуваних обставин. Сторона повідомляє
              іншу протягом <strong>3 календарних днів</strong> і надає підтверджуючі документи
              (сертифікат ТПП України або аналогічний).
            </p>
          </Card>
        </section>

        <Divider />

        {/* Contacts */}
        <div
          style={{
            background: `linear-gradient(135deg, ${tokens.bluePale} 0%, ${tokens.blueMid} 100%)`,
            borderRadius: tokens.radius,
            padding: "32px 36px",
            marginTop: 40,
          }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 800, color: tokens.text, marginBottom: 16 }}>
            Реквізити Виконавця
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              "ФОП Завадська Анастасія Сергіївна",
              "+38 050 623 06 88",
              "Anastasia.zavadskaya@gmail.com",
              "Надання послуг — онлайн",
            ].map((item) => (
              <div
                key={item}
                style={{
                  background: "#fff",
                  borderRadius: 100,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 600,
                  color: tokens.text,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: tokens.blue,
                    display: "inline-block",
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Final note */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            padding: "24px 32px",
            background: tokens.text,
            borderRadius: tokens.radius,
            color: "#fff",
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
            Оплата послуг означає повну та беззастережну{" "}
            <span style={{ color: tokens.blueLight }}>згоду з умовами цієї Оферти</span> і має таку ж
            юридичну силу, як письмовий договір з підписом.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OfertaPage;
import React from "react";

// ─── Design tokens ────────────────────────────────────────────────────────────
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

// ─── UI components (ті самі) ─────────────────────────────────────────────────
const Tag = ({ children }) => (
  <span style={{
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
  }}>
    {children}
  </span>
);

const SectionHeader = ({ num, title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
    <div style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background: tokens.bluePale,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 800,
      color: tokens.blue,
    }}>
      {num}
    </div>
    <h2 style={{ margin: 0 }}>{title}</h2>
  </div>
);

const Card = ({ children, variant = "default" }) => {
  const styles = {
    default: { background: tokens.surface },
    warn: { background: "#fff8f0", borderLeft: "4px solid #FFAA55" },
    ok: { background: "#f0fff8", borderLeft: "4px solid #34c07a" },
  };

  return (
    <div style={{
      ...styles[variant],
      padding: 20,
      borderRadius: tokens.radiusSm,
      marginBottom: 12,
    }}>
      {children}
    </div>
  );
};

const Divider = () => (
  <hr style={{ margin: "40px 0", border: "none", height: 1, background: tokens.blueMid }} />
);

const Text = ({ children }) => (
  <p style={{ fontSize: 14, color: "#333", lineHeight: 1.7 }}>{children}</p>
);

// ─── MAIN ────────────────────────────────────────────────────────────────────

const PrivacyPolicyPage = () => {
  return (
    <div style={{
      fontFamily: tokens.font,
      maxWidth: 800,
      margin: "0 auto",
    }}>

      {/* HERO */}
      <div
        style={{
          padding: "56px 40px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontWeight: 800 }}>
          Політика конфіденційності
        </h1>
        <p style={{ fontSize: 14, color: tokens.textMuted, fontWeight: 500, margin: "12px 0 0", lineHeight: 1.65 }}>
          Захист персональних даних користувачів · 2026
        </p>
      </div>

      <div style={{ padding: "0 32px" }}>

        {/* INTRO */}
        <Card>
          <Text>
            Ми поважаємо вашу приватність і робимо все можливе для захисту ваших персональних даних.
            Користуючись сайтом або послугами, ви погоджуєтесь з умовами цієї Політики.
          </Text>
        </Card>

        <Divider />

        {/* 1 */}
        <section>
          <SectionHeader num={1} title="Які дані ми збираємо" />
          <Card>
            <Text>Ми можемо збирати такі дані:</Text>
            <ul>
              <li>Ім’я, username</li>
              <li>Email, телефон</li>
              <li>Telegram ID</li>
              <li>Дані, які ви добровільно надаєте</li>
            </ul>
          </Card>
        </section>

        <Divider />

        {/* 2 */}
        <section>
          <SectionHeader num={2} title="Як ми використовуємо дані" />
          <Card>
            <ul>
              <li>Для надання послуг</li>
              <li>Зв’язку з вами</li>
              <li>Покращення сервісу</li>
              <li>Маркетингових повідомлень (за згодою)</li>
            </ul>
          </Card>
        </section>

        <Divider />

        {/* 3 */}
        <section>
          <SectionHeader num={3} title="Передача третім особам" />
          <Card variant="ok">
            <Text>
              Ми НЕ продаємо ваші дані третім особам.
            </Text>
          </Card>
          <Card variant="warn">
            <Text>
              Дані можуть передаватись лише у випадках:
            </Text>
            <ul>
              <li>виконання закону</li>
              <li>платіжних систем</li>
              <li>CRM (наприклад SalesDrive)</li>
            </ul>
          </Card>
        </section>

        <Divider />

        {/* 4 */}
        <section>
          <SectionHeader num={4} title="Зберігання даних" />
          <Card>
            <Text>
              Дані зберігаються стільки, скільки необхідно для надання послуг або виконання законодавчих вимог.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 5 */}
        <section>
          <SectionHeader num={5} title="Ваші права" />
          <Card>
            <ul>
              <li>Отримати доступ до даних</li>
              <li>Вимагати зміну або видалення</li>
              <li>Відкликати згоду</li>
            </ul>
          </Card>
        </section>

        <Divider />

        {/* 6 */}
        <section>
          <SectionHeader num={6} title="Безпека" />
          <Card>
            <Text>
              Ми використовуємо технічні та організаційні заходи для захисту даних, але не можемо гарантувати 100% безпеку в інтернеті.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 7 */}
        <section>
          <SectionHeader num={7} title="Зміни політики" />
          <Card>
            <Text>
              Ми можемо оновлювати цю політику. Актуальна версія завжди доступна на сайті.
            </Text>
          </Card>
        </section>

        {/* Final note — як у Oferta */}
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
            Користуючись сервісом, ви погоджуєтесь з цією{" "}
            <span style={{ color: tokens.blueLight }}>Політикою конфіденційності</span>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
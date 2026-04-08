import React from "react";
import { PAGE_GUTTER_X, SECTION_TITLE_MAX_WIDTH } from "./sectionIntroStyles";

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

const Text = ({ children, style: styleProp }) => (
  <p style={{ fontSize: 14, color: "#333", lineHeight: 1.7, margin: "0 0 12px", ...styleProp }}>{children}</p>
);

const List = ({ children }) => (
  <ul style={{
    margin: "8px 0 12px",
    paddingLeft: 22,
    fontSize: 14,
    color: "#333",
    lineHeight: 1.75,
  }}>
    {children}
  </ul>
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
          padding: `56px ${PAGE_GUTTER_X}`,
          textAlign: "center",
        }}
      >
        <h1 style={{
          fontWeight: 800,
          width: "100%",
          maxWidth: SECTION_TITLE_MAX_WIDTH,
          marginLeft: "auto",
          marginRight: "auto",
          boxSizing: "border-box",
        }}
        >
          Політика конфіденційності
        </h1>
        <p style={{ fontSize: 14, color: tokens.textMuted, fontWeight: 500, margin: "12px 0 0", lineHeight: 1.65 }}>
          Сайт психологині Анастасії Завадської · оновлено 2026
        </p>
      </div>

      <div style={{ padding: `0 ${PAGE_GUTTER_X}` }}>

        {/* INTRO */}
        <Card>
          <Text>
            Ця сторінка пояснює, як я — Анастасія Завадська, психологиня, яка веде прийом у гештальт-підході
            (онлайн та в межах оголошених форматів на сайті) — ставлюся до ваших персональних даних на цьому сайті.
          </Text>
          <Text style={{ marginBottom: 0 }}>
            Мені важливо, щоб ви розуміли, що саме може потрапити до мене, навіщо це потрібно і що ви можете зробити,
            якщо захочете змінити чи прибрати свої дані. Користуючись сайтом і залишаючи контакти, ви підтверджуєте,
            що ознайомилися з цією Політикою.
          </Text>
        </Card>

        <Divider />

        {/* 1 */}
        <section>
          <SectionHeader num={1} title="Які дані можуть з’являтися" />
          <Card>
            <Text>Зазвичай це те, що ви самі вказуєте, коли:</Text>
            <List>
              <li>заповнюєте форму запису або зворотного зв’язку (ім’я, телефон, за бажанням — соцмережі та короткий опис запиту);</li>
              <li>пишете мені в Telegram, Instagram або на електронну пошту — тоді зберігається зміст листа та дані вашого профілю в межах того месенджера або пошти;</li>
              <li>переходите за посиланнями з сайту (наприклад, на практикум Journey) — там діють окремі правила того сервісу.</li>
            </List>
            <Text style={{ marginBottom: 0 }}>
              Технічна інформація про візит (на кшталт типу браузера чи IP) може оброблятися хостингом або сервісами,
              які забезпечують роботу сайту, у мінімально необхідному обсязі.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 2 */}
        <section>
          <SectionHeader num={2} title="Навіщо я це використовую" />
          <Card>
            <Text>Лише для цілей, пов’язаних із роботою психологині та цим сайтом:</Text>
            <List>
              <li>щоб відповісти на ваш запит, узгодити час або формат зустрічі;</li>
              <li>щоб підготуватися до сесії та вести облік у межах професійної та податкової дисципліни (якщо це передбачено законом);</li>
              <li>щоб покращувати зручність сайту, не змінюючи сенсу вашого звернення.</li>
            </List>
            <Text style={{ marginBottom: 0 }}>
              Я не використовую ваші контакти для масових розсилок чи «холодного» маркетингу. Повідомлення про формати роботи
              або нагадування — лише у відповідь на ваш запит або за окремою згодою.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 3 */}
        <section>
          <SectionHeader num={3} title="Чи передаю я дані іншим" />
          <Card variant="ok">
            <Text style={{ marginBottom: 0 }}>
              Я не продаю і не передаю ваші персональні дані для сторонньої реклами чи баз «лідів».
            </Text>
          </Card>
          <Card variant="warn">
            <Text>Доступ третіх осіб можливий лише коли це:</Text>
            <List>
              <li>вимагає закон або запит уповноважених органів;</li>
              <li>технічно необхідно для роботи сайту, хостингу або пошти (провайдери діють як обробники в межах своїх угод);</li>
              <li>ви самі відкриваєте діалог у Telegram чи іншому сервісі — тоді частина даних обробляється вже на стороні цього сервісу за їхніми правилами.</li>
            </List>
            <Text style={{ marginBottom: 0 }}>
              Кнопка «Оплатити» / відправка форми може відкривати Telegram із уже сформованим текстом повідомлення:
              ви самі вирішуєте, чи надсилати його.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 4 */}
        <section>
          <SectionHeader num={4} title="Як довго зберігаються дані" />
          <Card>
            <Text>
              Стільки, скільки потрібно для відповіді на ваш запит, ведення прийому та виконання вимог законодавства
              (зокрема щодо бухгалтерії та звітності ФОП). Після цього дані видаляються або знеособлюються, якщо немає
              іншої законної підстави їх тримати.
            </Text>
            <Text style={{ marginBottom: 0 }}>
              Листування в месенджерах залишається в історії чату на вашому та моєму пристрої згідно з налаштуваннями відповідного додатку.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 5 */}
        <section>
          <SectionHeader num={5} title="Ваші права" />
          <Card>
            <Text>Відповідно до закону України «Про захист персональних даних» ви можете:</Text>
            <List>
              <li>дізнатися, чи обробляються ваші дані, і отримати про це інформацію;</li>
              <li>просити виправити неточності або видалити дані, якщо для цього немає перешкод у законі;</li>
              <li>обмежити обробку або відкликати згоду там, де вона була формою правової підстави.</li>
            </List>
            <Text style={{ marginBottom: 0 }}>
              Щоб скористатися правами, напишіть мені на вказану на сайті електронну пошту або в зручний для вас канал зв’язку —
              відповім у розумний строк.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 6 */}
        <section>
          <SectionHeader num={6} title="Безпека та делікатність" />
          <Card>
            <Text>
              Я ставлюся до змісту звернень і контексту терапії з підвищеною увагою до конфіденційності. Сайт працює через
              захищене з’єднання (HTTPS). Повної гарантії безпеки в мережі ніхто не дає, тому прошу не надсилати зайвих
              чутливих деталей у відкритих коментарях або тоді, коли вам некомфортно — краще обговорити це безпосередньо
              у форматі сесії або приватного листа.
            </Text>
          </Card>
        </section>

        <Divider />

        {/* 7 */}
        <section>
          <SectionHeader num={7} title="Зміни на цій сторінці" />
          <Card>
            <Text style={{ marginBottom: 0 }}>
              Я можу оновлювати цю Політику, якщо зміниться законодавство або логіка сайту. Актуальна версія завжди доступна
              на цьому сайті в розділі «Політика конфіденційності». Продовжуючи користуватися сайтом після оновлення, ви
              погоджуєтесь із новою редакцією, якщо закон не вимагає іншого.
            </Text>
          </Card>
        </section>

        {/* Final note — як у Oferta */}
        <div
          style={{
            textAlign: "center",
            marginTop: 40,
            marginBottom: 48,
            padding: "24px 32px",
            background: tokens.text,
            borderRadius: tokens.radius,
            color: "#fff",
          }}
        >
          <p style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.5, margin: 0 }}>
            Дякую, що дочитали. Користуючись сайтом і залишаючи зворотний зв’язок, ви підтверджуєте, що ознайомлені з цією{" "}
            <span style={{ color: tokens.blueLight }}>Політикою конфіденційності</span>.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
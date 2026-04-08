// ─────────────────────────────────────────
//  Site data – all content in one place
// ─────────────────────────────────────────

export const NAV_LINKS = [
  "Про мене",
  "Онлайн-запис",
  "Послуги",
  "Практикум",
  "Відгуки",
  "Контакти",
];

export const TAGS = [
  "Гештальт-терапія",
  "Внутрішня опора",
  "Виснаження",
  "Тривога",
  "Стосунки",
  "Ідентичність",
];

export const HERO_PHOTO =
  "/hero.jpg";

export const ABOUT_PHOTO =
  "/about.jpg";

export const SERVICES = [
  {
    id: 1,
    slug: "indyvidualna-terapevtychna-sesiya",
    title: "Індивідуальна терапевтична сесія",
    img: "/individual.png",
    desc: "Це простір тільки для вас. Ви приходите із тим, що турбує — і ми разом досліджуємо, що з вами відбувається. Я поруч у процесі, допомагаю краще зрозуміти себе і знайти свої відповіді.",
    extra: "Тривалість: 50 хвилин",
    priceLine: "Вартість:",
    priceEmphasis: "$50",
    price: "Тривалість: 50 хвилин. Вартість: $50",
    btnLabel: "Записатися",
    active: true,
    /** Календар слотів + обов’язковий вибір часу */
    showBookingCalendar: true,
    /** Кнопка «Оплатити» та блок ціни в формі */
    onlinePayment: true,
  },
  {
    id: 2,
    slug: "hrupova-terapiya",
    title: "Групова терапія",
    img: "/groups.png",
    desc: "Невелика група 6–8 людей, де можна побачити себе через взаємодію з іншими. Тут стає видно те, що складно помітити наодинці. І з'являється відчуття: я не один/одна з цим. Це безпечний простір, де можна пробувати проявлятися по-новому і поступово переносити цей досвід у своє життя.",
    extra: "Формат: раз на тиждень | 3 години",
    priceLine: "Вартість:",
    priceEmphasis: "$20 / зустріч",
    price: "Вартість: $20 / зустріч",
    btnLabel: "Дізнатися більше",
    note: "Група зустрічається щочетверга, але в діючу групу нові люди не додаються. Про старт нової групи повідомлю за номером, який ви залишили, відповідно вашого запиту.",
    active: true,
    showBookingCalendar: false,
    onlinePayment: false,
  },
  {
    id: 3,
    slug: "branchi-ta-retryty",
    title: "Бранчі та ретрити",
    img: "/branches.png",
    desc: "Офлайн-зустрічі для глибшого занурення в себе – у форматі живого спілкування, практик та внутрішньої роботи у групі.",
    status: "Статус: У підготовці",
    btnLabel: "Підписатися на оновлення",
    active: true,
    showBookingCalendar: false,
    onlinePayment: false,
  },
];

/** Сторінка з календарем онлайн-запису (індивідуальна сесія) */
export const INDIVIDUAL_BOOKING_PAGE = `/poslugy/${SERVICES[0].slug}`;

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

export function getServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}

/** Зовнішній сайт практикуму Journey */
export const PRAKTIKUM_JOURNEY_URL = "https://journey.anastasiiazavadska.com/";

/** Рядки порівняння для блоку практикуму (однаковий порядок у обох тарифах) */
export const PRAKTIKUM_FEATURE_ROWS = [
  "Telegram-бот з щоденними практиками",
  "Старт одразу після оплати",
  "Доступ 90 днів",
  "3 індивідуальні сесії з Анастасією",
  "Персональна робота з твоїм запитом",
  "Фіксація цілей і результатів",
];

/** Самостійний старт: перші 3 пункти активні, решта — сірі з «×» */
export const PRAKTIKUM_SELF_FEATURES = PRAKTIKUM_FEATURE_ROWS.map((text, i) => ({
  text,
  active: i < 3,
}));

/** З психологом: усі пункти активні (коло) */
export const PRAKTIKUM_WITH_FEATURES = PRAKTIKUM_FEATURE_ROWS.map((text) => ({
  text,
  active: true,
}));

export const REVIEWS = [
  {
    id: 1,
    label: "Учасниця практикуму",
    text: "«Анастасія, дуже дякую за практикум! Все було зрозуміло, дійсно без напруги. Я проходила з задоволенням, якось все було дуже послідовно, багато інсайтів, та мій результат в кінці мене прям радує і запалює!»",
  },
  {
    id: 2,
    label: "Учасниця практикуму",
    text: "«З'явилась легкість і навіть натхнення! І якось ви мені так зрозуміло розклали все по поличках, що мені і наче вже не так і страшно, чесне слово! Дуже класний формат і сам практикум!»",
  },
  {
    id: 3,
    label: "Учасниця практикуму",
    text: "«Залишок дня був набагато спокійніший. Наче якийсь шмат тривоги пішов. Прям для мене супер відкриття. Дуже дякую!»",
  },
  {
    id: 4,
    label: "Учасниця практикуму",
    text: "«Я була вражена тим, що насправді багато з того, чого мені хотілося б у своєму ідеальному дні — вже є або можна втілити. І ще я згадала про речі, які завжди були для мене ресурсом. Дуже гармонійні відчуття.»",
  },
  {
    id: 5,
    label: "Учасниця практикуму",
    text: "«Я побачила, що в мене вже є багато ресурсів і якостей — просто раніше я ставилась до них як до чогось звичайного. Спробувала присвоїти це собі.»",
  },
];

/** Документи освіти — порядок як у `public/diploms/`. */
export const EDUCATION_DOCUMENTS = [
  { id: 1, title: "Диплом магістра психології", src: "/diploms/оствіта1.png" },
  { id: 2, title: "Диплом", src: "/diploms/оствіта8.png" },
  { id: 3, title: "Сертифікат гештальт-терапевта", src: "/diploms/оствіта2.png" },
  { id: 4, title: "Підвищення кваліфікації", src: "/diploms/оствіта3.png" },
  { id: 5, title: "Підвищення кваліфікації", src: "/diploms/оствіта4.png" },
  { id: 6, title: "Підвищення кваліфікації", src: "/diploms/оствіта5.png" },
  { id: 7, title: "Підвищення кваліфікації", src: "/diploms/оствіта6.png" },
  { id: 8, title: "Підвищення кваліфікації", src: "/diploms/оствіта7.png" },
];

export const CONTACTS = {
  telegram: "@anastasia_zavadska",
  instagram: "@anastasiia__zavadska",
  email: "Anastasia.zavadskaya@gmail.com",
  telegramLink: "https://t.me/anastasia_zavadska",
};

export const FOOTER_MENU = ["Про мене", "Послуги", "Практикум", "Відгуки", "Контакти"];
export const FOOTER_LEGAL_LINKS = [
  { label: "Публічна оферта", href: "/oferta" },
  { label: "Політика конфіденційності", href: "/polityka-konfidentsiynosti" },
];

/** Посилання в меню: «Послуги» → блок #послуги на головній. */
export function navLinkHref(label, pathname = "/") {
  if (label === "Послуги") {
    return pathname === "/" ? "#послуги" : "/#послуги";
  }
  if (label === "Онлайн-запис") {
    if (pathname === INDIVIDUAL_BOOKING_PAGE || pathname.startsWith(`${INDIVIDUAL_BOOKING_PAGE}/`)) {
      return "#booking-calendar";
    }
    return INDIVIDUAL_BOOKING_PAGE;
  }
  const slug = label.toLowerCase().replace(/\s/g, "-");
  return pathname === "/" ? `#${slug}` : `/#${slug}`;
}

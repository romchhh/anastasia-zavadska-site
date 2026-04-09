export type BookingNotifyFields = {
  kind?: 'event';
  serviceTitle?: string;
  slotLine?: string | null;
  name: string;
  phone: string;
  social?: string;
  description?: string;
};

/** Текст для Telegram (як у /api/booking/notify) */
export function formatBookingNotifyTelegramText(fields: BookingNotifyFields): string {
  const title = (fields.serviceTitle || 'Послуга').trim();
  const name = (fields.name || '').trim();
  const phone = (fields.phone || '').trim();
  const lines = [
    fields.kind === 'event' ? `Подія / передзапис — ${title}` : `Запис з сайту — ${title}`,
    fields.slotLine ? `Час: ${fields.slotLine}` : null,
    `Ім'я: ${name}`,
    `Телефон: ${phone}`,
    fields.social?.trim() ? `Соцмережі: ${fields.social.trim()}` : null,
    fields.description?.trim() ? `Контекст: ${fields.description.trim()}` : null,
  ].filter(Boolean) as string[];
  return lines.join('\n');
}

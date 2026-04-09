/**
 * Повідомлення в групу (або канал), куди бот додано адміном.
 * .env: TELEGRAM_BOT_TOKEN, TELEGRAM_GROUP_CHAT_ID
 */
export async function sendTelegramGroupMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_GROUP_CHAT_ID;
  if (!token || !chatId) {
    console.warn('[telegram] Пропуск: немає TELEGRAM_BOT_TOKEN або TELEGRAM_GROUP_CHAT_ID');
    return;
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    console.error('[telegram] sendMessage failed:', res.status, errBody);
  }
}

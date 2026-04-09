import { listSessionPayments } from '@/lib/sessionPayments';

function formatUaDate(iso) {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export default async function SessionPaymentsFeed() {
  const rows = await listSessionPayments();
  if (!rows.length) return null;

  return (
    <section
      aria-label="Нещодавні оплати сесій"
      style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: 'clamp(24px, 4vw, 40px) clamp(20px, 5vw, 32px) 0',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(14px, 2.2vw, 16px)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#6391FF',
          margin: '0 0 16px 0',
          textAlign: 'center',
        }}
      >
        Нещодавні оплати сесій
      </h2>
      <ul
        style={{
          listStyle: 'none',
          margin: 0,
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {rows.slice(0, 12).map((r) => (
          <li
            key={`${r.orderReference}-${r.at}`}
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: 'clamp(14px, 2vw, 15px)',
              color: '#333',
              padding: '12px 16px',
              background: '#f4f7ff',
              borderRadius: 14,
              border: '1px solid rgba(99, 145, 255, 0.2)',
            }}
          >
            <span style={{ fontWeight: 600 }}>{formatUaDate(r.at)}</span>
            {' · '}
            <span>
              {r.amount} {r.currency}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

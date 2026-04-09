import fs from 'fs';
import path from 'path';

export type SessionPaymentRecord = {
  at: string;
  amount: string;
  currency: string;
  orderReference: string;
  phone?: string;
  email?: string;
};

const FILE = path.join(process.cwd(), 'data', 'session-payments.json');
const MAX = 80;

function readAll(): SessionPaymentRecord[] {
  try {
    if (!fs.existsSync(FILE)) return [];
    const raw = fs.readFileSync(FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function listSessionPayments(): SessionPaymentRecord[] {
  return readAll();
}

export function appendSessionPayment(record: SessionPaymentRecord): void {
  try {
    const dir = path.dirname(FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const list = readAll();
    list.unshift(record);
    fs.writeFileSync(FILE, JSON.stringify(list.slice(0, MAX), null, 2), 'utf8');
  } catch (e) {
    console.error('[session-payments] не вдалося зберегти', e);
  }
}

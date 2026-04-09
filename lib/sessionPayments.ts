import { promises as fs } from 'fs';
import path from 'path';

export type SessionPaymentRow = {
  at: string;
  amount: string;
  currency: string;
  orderReference: string;
};

const filePath = () => path.join(process.cwd(), 'data', 'session-payments.json');

export async function appendSessionPayment(row: SessionPaymentRow): Promise<void> {
  try {
    await fs.mkdir(path.dirname(filePath()), { recursive: true });
    let list: SessionPaymentRow[] = [];
    try {
      const raw = await fs.readFile(filePath(), 'utf8');
      list = JSON.parse(raw) as SessionPaymentRow[];
      if (!Array.isArray(list)) list = [];
    } catch {
      list = [];
    }
    list.unshift(row);
    await fs.writeFile(filePath(), JSON.stringify(list.slice(0, 80), null, 2), 'utf8');
  } catch (e) {
    console.error('[session-payments] не вдалося зберегти:', e);
  }
}

export async function listSessionPayments(): Promise<SessionPaymentRow[]> {
  try {
    const raw = await fs.readFile(filePath(), 'utf8');
    const list = JSON.parse(raw) as SessionPaymentRow[];
    return Array.isArray(list) ? list : [];
  } catch {
    return [];
  }
}

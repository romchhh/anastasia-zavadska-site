import { NextRequest, NextResponse } from 'next/server';
import { formatBookingNotifyTelegramText } from '@/lib/bookingNotifyFormat';
import { sendTelegramGroupMessage } from '@/utils/telegram';
import { sendMetaCapiEvent } from '@/lib/metaConversionsServer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Body = {
  kind?: string;
  serviceTitle?: string;
  slotLine?: string | null;
  name?: string;
  phone?: string;
  social?: string;
  description?: string;
  meta?: {
    eventId?: string;
    eventSourceUrl?: string;
    fbp?: string;
    fbc?: string;
  };
};

export async function POST(request: NextRequest) {
  try {
    let body: Body = {};
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const name = (body.name || '').trim();
    const phone = (body.phone || '').trim();
    if (!name || !phone) {
      return NextResponse.json({ error: "Потрібні ім'я та телефон" }, { status: 400 });
    }

    const text = formatBookingNotifyTelegramText({
      kind: body.kind === 'event' ? 'event' : undefined,
      serviceTitle: body.serviceTitle,
      slotLine: body.slotLine ?? null,
      name,
      phone,
      social: body.social,
      description: body.description,
    });

    await sendTelegramGroupMessage(text);

    const site = (process.env.NEXT_PUBLIC_SITE_URL || '').replace(/\/+$/, '');
    await sendMetaCapiEvent({
      request,
      eventName: 'Lead',
      eventId: body.meta?.eventId,
      eventSourceUrl: body.meta?.eventSourceUrl || (site ? `${site}/` : undefined),
      userData: {
        phone,
        fbp: body.meta?.fbp,
        fbc: body.meta?.fbc,
      },
      customData: {
        content_name: body.serviceTitle || 'Запит з сайту',
        content_category: body.kind === 'event' ? 'event' : 'service',
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[booking/notify]', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

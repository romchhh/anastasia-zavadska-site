import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    console.log('[PAYMENT RETURN] Received GET to payment return URL');

    const url = new URL(request.url);
    const orderRef = url.searchParams.get('orderRef') || '';
    const tariffType = url.searchParams.get('tariffType') || 'self';
    const transactionStatus = url.searchParams.get('transactionStatus') || 
                             url.searchParams.get('status') || 
                             '';
    const reasonCode = url.searchParams.get('reasonCode') || '';

    console.log('[PAYMENT RETURN] GET params:', {
      orderRef,
      tariffType,
      transactionStatus,
      reasonCode,
      allParams: Object.fromEntries(url.searchParams.entries()),
    });

    const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    
    // Перевіряємо статус транзакції
    // WayForPay: transactionStatus === 'Approved' або reasonCode === '1100' означає успішну оплату
    const isSuccess = transactionStatus === 'Approved' || 
                     transactionStatus === 'approved' || 
                     reasonCode === '1100';
    
    if (isSuccess) {
      const successUrl = new URL(
        `/payment/success/${encodeURIComponent(tariffType)}`,
        origin
      ).toString();
      console.log('[PAYMENT RETURN] GET redirect to success:', successUrl);
      return NextResponse.redirect(successUrl, 303);
    } else {
      // Неуспішна оплата або статус не вказано
      const failureUrl = new URL('/payment/failure', origin).toString();
      console.log('[PAYMENT RETURN] GET redirect to failure:', failureUrl);
      return NextResponse.redirect(failureUrl, 303);
    }
  } catch (error) {
    console.error('[PAYMENT RETURN] GET Error:', error);
    const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    // При помилці редіректимо на failure сторінку
    return NextResponse.redirect(new URL('/payment/failure', origin).toString(), 303);
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('[PAYMENT RETURN] Received POST to payment return URL');

    const contentType = (request.headers.get('content-type') || '').toLowerCase();
    let data: Record<string, any> = {};

    // Логуємо деталі запиту
    console.log('[PAYMENT RETURN] Content-Type:', contentType);
    console.log('[PAYMENT RETURN] Headers:', {
      contentType: request.headers.get('content-type'),
      userAgent: request.headers.get('user-agent'),
      host: request.headers.get('host'),
    });

    if (contentType.includes('application/json')) {
      data = await request.json();
      console.log('[PAYMENT RETURN] Parsed JSON data:', data);
    } else if (
      contentType.includes('application/x-www-form-urlencoded') ||
      contentType.includes('multipart/form-data')
    ) {
      const form = await request.formData();
      form.forEach((value: FormDataEntryValue, key: string) => {
        data[key] = value;
      });
      console.log('[PAYMENT RETURN] Parsed form data:', data);
    } else {
      try {
        const text = await request.text();
        console.log('[PAYMENT RETURN] Raw text body length:', text?.length || 0);
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.log('[PAYMENT RETURN] Could not parse body as JSON');
        data = {};
      }
    }

    // Шукаємо orderRef у різних можливих полях
    const orderRef =
      data.orderRef ||
      data.orderReference ||
      data.order_id ||
      data.order ||
      data.ORDER_ID ||
      '';

    // Шукаємо статус транзакції
    const transactionStatus =
      data.transactionStatus ||
      data.status ||
      data.transaction_status ||
      data.STATUS ||
      '';

    // Шукаємо reasonCode (1100 означає успішну оплату)
    const reasonCode =
      data.reasonCode ||
      data.reason_code ||
      data.REASON_CODE ||
      String(data.reasonCode || '');

    console.log('[PAYMENT RETURN] Extracted data:', {
      orderRef,
      transactionStatus,
      reasonCode,
      allData: data,
    });

    const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    
    // Перевіряємо статус транзакції
    // WayForPay: transactionStatus === 'Approved' або reasonCode === '1100' означає успішну оплату
    const isSuccess = transactionStatus === 'Approved' || 
                     transactionStatus === 'approved' || 
                     reasonCode === '1100' ||
                     reasonCode === 1100;
    
    if (isSuccess) {
      const refStr = String(orderRef || '');
      const tariffType = refStr.startsWith('SESSION_')
        ? 'session'
        : refStr.startsWith('JOURNEY_PSYCH_')
          ? 'psychologist'
          : 'self';
      const successUrl = new URL(
        `/payment/success/${encodeURIComponent(tariffType)}`,
        origin
      ).toString();
      console.log('[PAYMENT RETURN] POST redirect to success:', successUrl);
      return NextResponse.redirect(successUrl, 303);
    } else {
      // Неуспішна оплата або статус не вказано
      const failureUrl = new URL('/payment/failure', origin).toString();
      console.log('[PAYMENT RETURN] POST redirect to failure:', failureUrl);
      return NextResponse.redirect(failureUrl, 303);
    }
  } catch (error) {
    console.error('[PAYMENT RETURN] POST Error:', error);
    console.error('[PAYMENT RETURN] Error details:', {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });

    // При помилці редіректимо на failure сторінку
    const origin = process.env.NEXT_PUBLIC_SITE_URL || `https://${request.headers.get('host')}`;
    return NextResponse.redirect(new URL('/payment/failure', origin).toString(), 303);
  }
}

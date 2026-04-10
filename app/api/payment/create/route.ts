import { NextRequest, NextResponse } from 'next/server';
import { savePendingSessionBooking } from '@/lib/pendingSessionBookings';
import { savePaymentReturnHint } from '@/lib/paymentReturnHints';
import type { BookingNotifyFields } from '@/lib/bookingNotifyFormat';
import { getCurrentPrice, getSessionPriceUah } from '@/utils/price';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('[PAYMENT CREATE] Starting payment creation...');
    
    // Імпортуємо crypto тільки на сервері
    const crypto = await import('crypto');

    // WayForPay credentials
    const merchantAccount = process.env.MERCHANT_ACCOUNT;
    const merchantSecretKey = process.env.MERCHANT_SECRET;
    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://journey.anastasiiazavadska.com').trim();
    // WayForPay потребує домен без протоколу для підпису, але з протоколом для URL
    const merchantDomainName = siteUrl.replace(/^https?:\/\//, ''); // Видаляємо http:// або https://

    console.log('[PAYMENT CREATE] Environment check:', {
      hasMerchantAccount: !!merchantAccount,
      hasMerchantSecret: !!merchantSecretKey,
      merchantAccount: merchantAccount ? `${merchantAccount.substring(0, 5)}...` : 'missing',
      siteUrl,
      merchantDomainName, // Без протоколу для підпису
    });

    if (!merchantAccount || !merchantSecretKey) {
      console.error('[PAYMENT CREATE] Missing credentials:', {
        merchantAccount: !!merchantAccount,
        merchantSecretKey: !!merchantSecretKey,
      });
      return NextResponse.json(
        { error: 'Merchant credentials not configured' },
        { status: 500 }
      );
    }

    // Product data
    let body: any = {};
    try {
      body = await request.json();
    } catch (e) {
      // Якщо body порожнє або не JSON, використовуємо дефолтні значення
      body = {};
    }
    const paymentKind = body?.paymentKind === 'session' ? 'session' : 'journey';
    const customPrice = body?.price != null && body?.price !== '' ? Number(body.price) : null;
    const eventTitle =
      body?.eventTitle ||
      (paymentKind === 'session'
        ? 'Індивідуальна терапевтична сесія (онлайн)'
        : 'Подорож до себе | 7-денний практикум у закритому Telegram-каналі');
    const amount =
      customPrice != null && Number.isFinite(customPrice) && customPrice > 0
        ? customPrice
        : paymentKind === 'session'
          ? getSessionPriceUah()
          : getCurrentPrice();
    const tariffType =
      body?.tariffType ||
      (paymentKind === 'session' ? 'session' : amount === 5400 ? 'psychologist' : 'self');

    // Генеруємо унікальний ID замовлення (префікс для callback / return)
    const orderReference =
      paymentKind === 'session'
        ? `SESSION_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
        : tariffType === 'psychologist'
          ? `JOURNEY_PSYCH_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
          : `JOURNEY_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const orderDate = Math.floor(Date.now() / 1000);

    if (paymentKind === 'session' && body?.bookingNotify && typeof body.bookingNotify === 'object') {
      const bn = body.bookingNotify as Record<string, unknown>;
      const name = String(bn.name ?? '').trim();
      const phone = String(bn.phone ?? '').trim();
      if (name && phone) {
        const fields: BookingNotifyFields = {
          kind: bn.kind === 'event' ? 'event' : undefined,
          serviceTitle: typeof bn.serviceTitle === 'string' ? bn.serviceTitle : undefined,
          slotLine: bn.slotLine != null && bn.slotLine !== '' ? String(bn.slotLine) : null,
          name,
          phone,
          social: typeof bn.social === 'string' ? bn.social : undefined,
          description: typeof bn.description === 'string' ? bn.description : undefined,
          calendarDate:
            typeof bn.calendarDate === 'string' && bn.calendarDate.trim() !== ''
              ? bn.calendarDate.trim()
              : undefined,
          calendarTime:
            typeof bn.calendarTime === 'string' && bn.calendarTime.trim() !== ''
              ? bn.calendarTime.trim()
              : undefined,
          consultationType:
            typeof bn.consultationType === 'string' ? bn.consultationType : undefined,
        };
        await savePendingSessionBooking(orderReference, fields);
        const slHint = fields.slotLine != null && fields.slotLine !== '' ? String(fields.slotLine) : null;
        if (slHint) {
          await savePaymentReturnHint(orderReference, { slotLine: slHint });
        }
      }
    }

    console.log('[PAYMENT CREATE] Order data:', {
      orderReference,
      orderDate,
      amount: amount.toFixed(2),
      eventTitle,
    });

    // Параметри для підпису згідно з документацією WayForPay
    // Формат: merchantAccount;merchantDomainName;orderReference;orderDate;amount;currency;productName[0];...;productName[n];productCount[0];...;productCount[n];productPrice[0];...;productPrice[n]
    // Для одного продукту: merchantAccount;merchantDomainName;orderReference;orderDate;amount;currency;productName[0];productCount[0];productPrice[0]
    const productNames = [eventTitle];
    const productCounts = [1];
    const productPrices = [amount];
    
    // Формуємо підпис: спочатку базові параметри, потім всі productName, потім всі productCount, потім всі productPrice
    // Важливо: amount та productPrice мають бути з двома знаками після коми
    const amountStr = amount.toFixed(2);
    const signatureParts = [
      String(merchantAccount),
      String(merchantDomainName),
      String(orderReference),
      String(orderDate),
      amountStr, // З двома знаками після коми
      'UAH',
      // Всі productName
      ...productNames.map(name => String(name)),
      // Всі productCount
      ...productCounts.map(count => String(count)),
      // Всі productPrice (з двома знаками після коми)
      ...productPrices.map(price => price.toFixed(2))
    ];
    
    const signatureString = signatureParts.join(';');
    console.log('[PAYMENT CREATE] Signature string:', signatureString);
    console.log('[PAYMENT CREATE] Signature string length:', signatureString.length);
    console.log('[PAYMENT CREATE] Signature parts:', signatureParts);
    console.log('[PAYMENT CREATE] Signature parts count:', signatureParts.length);

    // Створюємо HMAC MD5 підпис через Buffer
    let merchantSignature: string;
    try {
    const keyBuffer = Buffer.from(merchantSecretKey, 'utf8');
    const dataBuffer = Buffer.from(signatureString, 'utf8');
    
      console.log('[PAYMENT CREATE] Buffer info:', {
        keyBufferLength: keyBuffer.length,
        dataBufferLength: dataBuffer.length,
        keyBufferFirstBytes: Array.from(keyBuffer.slice(0, 5)),
        dataBufferFirstBytes: Array.from(dataBuffer.slice(0, 20)),
      });
      
      // WayForPay використовує MD5 для SimpleSignature
      merchantSignature = crypto
      .createHmac('md5', keyBuffer)
      .update(dataBuffer)
      .digest('hex');
      
      console.log('[PAYMENT CREATE] Generated signature (MD5):', merchantSignature);
      
      // Також генеруємо SHA-1 для перевірки (якщо потрібно)
      const sha1Signature = crypto
        .createHmac('sha1', keyBuffer)
        .update(dataBuffer)
        .digest('hex');
      console.log('[PAYMENT CREATE] Alternative signature (SHA-1):', sha1Signature);
    } catch (signatureError) {
      console.error('[PAYMENT CREATE] Signature generation error:', signatureError);
      throw signatureError;
    }

    // WayForPay: return_url ≤ 255 символів — без slotLine (зберігається в paymentReturnHints)
    const returnParams = new URLSearchParams({
      orderRef: orderReference,
      tariffType,
    });

    const siteBase = siteUrl.replace(/\/+$/, '');
    const returnUrl = `${siteBase}/api/payment/return?${returnParams.toString()}`;
    if (returnUrl.length > 255) {
      console.error('[PAYMENT CREATE] returnUrl length exceeds WayForPay limit 255:', returnUrl.length);
    }

    // Параметри для WayForPay
    // merchantDomainName в формі має бути без протоколу (як і в підписі)
    // amount та productPrice мають бути з двома знаками після коми
    const wayforpayData: Record<string, unknown> = {
      merchantAccount,
      merchantAuthType: 'SimpleSignature',
      merchantDomainName, // Без протоколу
      merchantSignature,
      orderReference,
      orderDate,
      amount: amountStr, // З двома знаками після коми
      currency: 'UAH',
      productName: productNames,
      productCount: productCounts,
      productPrice: productPrices.map(price => price.toFixed(2)), // З двома знаками після коми
      language: 'UA',
      returnUrl,
      serviceUrl: `${siteBase}/api/payment/callback`,
    };

    const cfn = typeof body?.clientFirstName === 'string' ? body.clientFirstName.trim() : '';
    const cln = typeof body?.clientLastName === 'string' ? body.clientLastName.trim() : '';
    const cph = typeof body?.clientPhone === 'string' ? body.clientPhone.trim().replace(/\s/g, '') : '';
    const cem = typeof body?.clientEmail === 'string' ? body.clientEmail.trim() : '';
    if (cfn) wayforpayData.clientFirstName = cfn.slice(0, 120);
    if (cln) wayforpayData.clientLastName = cln.slice(0, 120);
    if (cph) wayforpayData.clientPhone = cph.slice(0, 20);
    if (cem) wayforpayData.clientEmail = cem.slice(0, 120);
    
    // Додаткова перевірка формату підпису
    console.log('[PAYMENT CREATE] Final signature verification:', {
      signatureString,
      merchantSignature,
      merchantDomainNameInSignature: merchantDomainName,
      merchantDomainNameInForm: wayforpayData.merchantDomainName,
      match: merchantDomainName === wayforpayData.merchantDomainName,
    });

    console.log('[PAYMENT CREATE] WayForPay data prepared:', {
      ...wayforpayData,
      merchantSecretKey: '***hidden***',
    });

    return NextResponse.json({ success: true, data: wayforpayData });
  } catch (error) {
    console.error('[PAYMENT CREATE] Error:', error);
    console.error('[PAYMENT CREATE] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Failed to create payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

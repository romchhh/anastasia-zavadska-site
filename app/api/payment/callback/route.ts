import { NextRequest, NextResponse } from 'next/server';
import { formatBookingNotifyTelegramText } from '@/lib/bookingNotifyFormat';
import { takePendingSessionBooking } from '@/lib/pendingSessionBookings';
import { appendSessionPayment } from '@/lib/sessionPayments';
import { insertConsultationEvent, isGoogleCalendarConfigured } from '@/lib/googleCalendarServer';
import { sendTelegramGroupMessage } from '@/utils/telegram';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const WFP_LINE = 'Оплата підтверджена (WayForPay)';

const g = globalThis as typeof globalThis & { __wfpTelegramOrderRefs?: Set<string> };

function wasTelegramSentForOrder(ref: string): boolean {
  if (!g.__wfpTelegramOrderRefs) g.__wfpTelegramOrderRefs = new Set();
  return g.__wfpTelegramOrderRefs.has(ref);
}

function markTelegramSentForOrder(ref: string) {
  if (!g.__wfpTelegramOrderRefs) g.__wfpTelegramOrderRefs = new Set();
  g.__wfpTelegramOrderRefs.add(ref);
}

/** Рядки після «Оплата підтверджена (WayForPay)». */
function paymentTailLines(
  ref: string,
  amount: unknown,
  currency: string | undefined,
  opts: {
    phone?: string;
    email?: string;
    authCode?: string;
    /** false — якщо телефон уже є в тексті запису вище */
    includePhone?: boolean;
  }
): string[] {
  const cur = currency || 'UAH';
  const lines = [`Замовлення: ${ref}`, `Сума: ${amount} ${cur}`];
  if (opts.includePhone !== false && opts.phone) lines.push(`Телефон: ${opts.phone}`);
  if (opts.email) lines.push(`Email: ${opts.email}`);
  if (opts.authCode) lines.push(`Код авторизації: ${opts.authCode}`);
  return lines;
}

export async function POST(request: NextRequest) {
  try {
    console.log('[PAYMENT CALLBACK] Received callback request');
    
    const crypto = await import('crypto');
    const body = await request.json();
    
    console.log('[PAYMENT CALLBACK] Request body:', body);
    
    // WayForPay callback data
    const {
      merchantAccount,
      orderReference,
      amount,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode,
      reason,
      merchantSignature,
      email,
      phone,
    } = body;

    console.log('[PAYMENT CALLBACK] Extracted data:', {
      merchantAccount,
      orderReference,
      amount,
      currency,
      transactionStatus,
      reasonCode,
      reason,
      hasSignature: !!merchantSignature,
    });

    const merchantSecretKey = process.env.MERCHANT_SECRET;

    console.log('[PAYMENT CALLBACK] Environment check:', {
      hasMerchantSecret: !!merchantSecretKey,
    });

    if (!merchantSecretKey) {
      console.error('[PAYMENT CALLBACK] Merchant secret key not configured');
      return NextResponse.json(
        { error: 'Merchant secret key not configured' },
        { status: 500 }
      );
    }

    // Підпис serviceUrl (документація WayForPay):
    // merchantAccount;orderReference;amount;currency;authCode;cardPan;transactionStatus;reasonCode
    // Без поля reason (раніше він був у рядку — підпис не збігався, Telegram не відправлявся).
    const amountCandidates = Array.from(
      new Set(
        [
          Number.isFinite(Number(amount)) ? Number(amount).toFixed(2) : null,
          amount != null && amount !== '' ? String(amount) : null,
        ].filter((x): x is string => x != null && x !== '')
      )
    );

    const baseParts = {
      merchantAccount,
      orderReference,
      currency,
      authCode,
      cardPan,
      transactionStatus,
      reasonCode: String(reasonCode ?? ''),
    };

    try {
      const keyBuffer = Buffer.from(merchantSecretKey, 'utf8');
      let calculatedSignature = '';
      let signatureString = '';

      for (const amountForSign of amountCandidates.length ? amountCandidates : ['']) {
        signatureString = [
          baseParts.merchantAccount,
          baseParts.orderReference,
          amountForSign,
          baseParts.currency,
          baseParts.authCode,
          baseParts.cardPan,
          baseParts.transactionStatus,
          baseParts.reasonCode,
        ].join(';');

        calculatedSignature = crypto
          .createHmac('md5', keyBuffer)
          .update(Buffer.from(signatureString, 'utf8'))
          .digest('hex');

        if (calculatedSignature === merchantSignature) break;
      }

      console.log('[PAYMENT CALLBACK] Signature string:', signatureString);
      console.log('[PAYMENT CALLBACK] Signature comparison:', {
        calculated: calculatedSignature,
        received: merchantSignature,
        match: calculatedSignature === merchantSignature,
      });

      if (calculatedSignature !== merchantSignature) {
        console.error('[PAYMENT CALLBACK] Invalid signature from WayForPay');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    } catch (signatureError) {
      console.error('[PAYMENT CALLBACK] Signature verification error:', signatureError);
      throw signatureError;
    }

    // Process successful payment
    if (transactionStatus === 'Approved') {
      console.log('[PAYMENT CALLBACK] Payment approved:', {
        orderReference,
        amount,
        currency,
        authCode,
      });

      const ref = String(orderReference || '');
      const isSession = ref.startsWith('SESSION_');
      const isJourneyPsych = ref.startsWith('JOURNEY_PSYCH_');
      const isJourneySelf = ref.startsWith('JOURNEY_') && !isJourneyPsych;
      const isJourney = isJourneyPsych || isJourneySelf;

      const phoneStr = phone ? String(phone) : '';
      const emailStr = email ? String(email) : '';
      const authStr = authCode ? String(authCode) : '';

      let telegramText = '';

      if (isSession) {
        const pending = await takePendingSessionBooking(ref);
        if (pending) {
          if (
            isGoogleCalendarConfigured() &&
            pending.calendarDate &&
            pending.calendarTime
          ) {
            try {
              await insertConsultationEvent({
                date: pending.calendarDate,
                time: pending.calendarTime,
                name: pending.name,
                phone: pending.phone,
                consultationType: pending.consultationType ?? pending.serviceTitle,
                social: pending.social?.trim() || undefined,
                description: pending.description?.trim() || undefined,
              });
            } catch (calErr) {
              console.error('[PAYMENT CALLBACK] Google Calendar booking failed:', calErr);
            }
          }
          const bookingText = formatBookingNotifyTelegramText(pending);
          const tail = paymentTailLines(ref, amount, currency, {
            phone: phoneStr,
            email: emailStr,
            authCode: authStr,
            includePhone: false,
          });
          telegramText = [bookingText, '', WFP_LINE, ...tail].join('\n');
        } else {
          telegramText = [
            'Індивідуальна терапевтична сесія',
            WFP_LINE,
            ...paymentTailLines(ref, amount, currency, {
              phone: phoneStr,
              email: emailStr,
              authCode: authStr,
            }),
          ].join('\n');
        }
      } else if (isJourney) {
        const tariffLine = isJourneyPsych
          ? 'Тариф: з підтримкою психолога'
          : 'Тариф: самостійний старт';
        telegramText = [
          'Практикум «Подорож до себе»',
          WFP_LINE,
          tariffLine,
          ...paymentTailLines(ref, amount, currency, {
            phone: phoneStr,
            email: emailStr,
            authCode: authStr,
          }),
        ].join('\n');
      } else {
        telegramText = [
          'Оплата на сайті',
          WFP_LINE,
          ...paymentTailLines(ref, amount, currency, {
            phone: phoneStr,
            email: emailStr,
            authCode: authStr,
          }),
        ].join('\n');
      }

      if (wasTelegramSentForOrder(ref)) {
        console.log('[PAYMENT CALLBACK] Telegram for order already sent, skip duplicate');
      } else {
        await sendTelegramGroupMessage(telegramText);
        markTelegramSentForOrder(ref);
      }

      if (isSession) {
        await appendSessionPayment({
          at: new Date().toISOString(),
          amount: String(amount ?? ''),
          currency: String(currency ?? 'UAH'),
          orderReference: ref,
        });
      }
    } else {
      console.log('[PAYMENT CALLBACK] Payment not approved:', {
        transactionStatus,
        reasonCode,
        reason,
      });
    }

    console.log('[PAYMENT CALLBACK] Returning success response');
    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('[PAYMENT CALLBACK] Error:', error);
    console.error('[PAYMENT CALLBACK] Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return NextResponse.json(
      { error: 'Callback processing failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


import { NextRequest, NextResponse } from 'next/server';

const FACEBOOK_ACCESS_TOKEN = process.env.FACEBOOK_ACCESS_TOKEN || 'EAA8wb4YQ3ZB4BQFZCSsySrZCof6WrEqZAGFZB1gUSlrnG8OXBXVcNbvm8eSHEPoOZCDnd2lK9xRR5yDE3IHZATVIP2uAZBcFHONgDEAYgo3xbNpIg0HdAtd7dk7fjlZC84DtVBPz6SzQkGGsZA9qbnctEKsZChBOlp5sgOak0kPSUfmymCjq2tFWQq2VOtyrpjrOQZDZD';
const PIXEL_ID = '1269074031904974';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      eventName, 
      orderRef, 
      value, 
      currency, 
      eventId, 
      fbp, 
      fbc,
      eventSourceUrl 
    } = body;

    console.log('[FB Conversions API] Received request:', { 
      eventName, 
      orderRef, 
      value, 
      currency, 
      eventId, 
      fbp, 
      fbc 
    });

    // Get client IP and user agent from request
    const clientIp = request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip') || 
                     '0.0.0.0';
    const userAgent = request.headers.get('user-agent') || '';
    const referer = eventSourceUrl || request.headers.get('referer') || '';

    // Prepare user_data with fbp and fbc for deduplication
    const userData: any = {
      client_ip_address: clientIp.split(',')[0].trim(),
      client_user_agent: userAgent,
    };

    // Add fbp (Facebook Browser ID) if available
    if (fbp) {
      userData.fbp = fbp;
    }

    // Add fbc (Facebook Click ID) if available
    if (fbc) {
      userData.fbc = fbc;
    }

    // Prepare event data for Conversions API
    const eventData: any = {
      event_name: eventName || 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: referer,
      user_data: userData,
    };

    // Add event_id for deduplication (required for Purchase events)
    if (eventId) {
      eventData.event_id = eventId;
    }

    // Add custom_data based on event type
    if (eventName === 'Purchase' || eventName === 'InitiateCheckout') {
      eventData.custom_data = {
        content_name: 'Подорож до себе | 7-денний практикум у закритому Telegram-каналі',
        content_category: 'Online Course',
        value: value || 0,
        currency: currency || 'UAH',
      };
      
      // Add order_id for Purchase events
      if (eventName === 'Purchase' && orderRef) {
        eventData.custom_data.order_id = orderRef;
      }
    }
    // PageView events don't need custom_data

    console.log('[FB Conversions API] Sending event:', JSON.stringify(eventData, null, 2));

    // Send to Facebook Conversions API
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [eventData],
          access_token: FACEBOOK_ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();
    console.log('[FB Conversions API] Response status:', response.status);
    console.log('[FB Conversions API] Response:', JSON.stringify(result, null, 2));

    if (!response.ok) {
      console.error('[FB Conversions API] Error:', result);
      return NextResponse.json(
        { error: 'Failed to send conversion', details: result },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('[FB Conversions API] Exception:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


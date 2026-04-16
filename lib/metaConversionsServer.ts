import crypto from "crypto";
import type { NextRequest } from "next/server";

const GRAPH_VERSION = "v21.0";

let warnedMissingMetaConfig = false;

function metaPixelId(): string | undefined {
  const v = process.env.META_PIXEL_ID?.trim() || process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  return v || undefined;
}

function metaAccessToken(): string | undefined {
  const v = process.env.META_CAPI_ACCESS_TOKEN?.trim() || process.env.FACEBOOK_ACCESS_TOKEN?.trim();
  return v || undefined;
}

export function isMetaCapiConfigured(): boolean {
  return Boolean(metaPixelId() && metaAccessToken());
}

function sha256Hex(value: string): string {
  return crypto.createHash("sha256").update(value, "utf8").digest("hex");
}

/** Meta: lowercase, trim spaces */
export function hashMetaEmail(email: string): string[] | undefined {
  const n = email.trim().toLowerCase();
  if (!n) return undefined;
  return [sha256Hex(n)];
}

/** Meta: digits only, include country code (UA → 380…) */
export function hashMetaPhone(phone: string): string[] | undefined {
  let d = phone.replace(/\D/g, "");
  if (d.length < 10) return undefined;
  if (d.startsWith("380")) {
    /* ok */
  } else if (d.startsWith("0") && d.length === 10) {
    d = `380${d.slice(1)}`;
  } else if (d.length === 10) {
    d = `380${d}`;
  }
  return [sha256Hex(d)];
}

export function clientIpFromRequest(request: NextRequest): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real.trim();
  return "";
}

export function userAgentFromRequest(request: NextRequest): string {
  return request.headers.get("user-agent") || "";
}

export type MetaCapiSendArgs = {
  request?: NextRequest;
  eventName: string;
  eventId?: string;
  eventSourceUrl?: string;
  actionSource?: string;
  userData?: {
    fbp?: string;
    fbc?: string;
    email?: string;
    phone?: string;
  };
  customData?: Record<string, unknown>;
};

export async function sendMetaCapiEvent(args: MetaCapiSendArgs): Promise<void> {
  const pixelId = metaPixelId();
  const token = metaAccessToken();
  if (!pixelId || !token) {
    if (!warnedMissingMetaConfig) {
      warnedMissingMetaConfig = true;
      console.warn(
        "[Meta CAPI] Події не відправляються: задайте NEXT_PUBLIC_META_PIXEL_ID (або META_PIXEL_ID) та META_CAPI_ACCESS_TOKEN (або FACEBOOK_ACCESS_TOKEN). На Vercel — у Settings → Environment Variables."
      );
    }
    return;
  }

  const user_data: Record<string, unknown> = {};
  if (args.request) {
    const ip = clientIpFromRequest(args.request);
    if (ip) user_data.client_ip_address = ip;
    const ua = userAgentFromRequest(args.request);
    if (ua) user_data.client_user_agent = ua;
  }
  if (args.userData?.fbp) user_data.fbp = args.userData.fbp;
  if (args.userData?.fbc) user_data.fbc = args.userData.fbc;
  const em = args.userData?.email ? hashMetaEmail(args.userData.email) : undefined;
  if (em) user_data.em = em;
  const ph = args.userData?.phone ? hashMetaPhone(args.userData.phone) : undefined;
  if (ph) user_data.ph = ph;

  const event: Record<string, unknown> = {
    event_name: args.eventName,
    event_time: Math.floor(Date.now() / 1000),
    action_source: args.actionSource || "website",
    user_data,
  };

  if (args.eventId) event.event_id = args.eventId;
  if (args.eventSourceUrl) {
    event.event_source_url = String(args.eventSourceUrl).slice(0, 2000);
  }
  if (args.customData && Object.keys(args.customData).length > 0) {
    event.custom_data = args.customData;
  }

  try {
    const res = await fetch(`https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [event],
        access_token: token,
      }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.error("[Meta CAPI]", res.status, json);
    }
  } catch (e) {
    console.error("[Meta CAPI] request failed", e);
  }
}

import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "archive-dev-secret-change-in-production";
const SESSION_COOKIE = "archive-session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

interface SessionPayload {
  sub: "admin";
  exp: number;
}

export function signSession(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  return `${body}.${sig}`;
}

export function verifySession(token: string | undefined): boolean {
  if (!token) return false;
  const [body, sig] = token.split(".");
  if (!body || !sig) return false;
  const expected = crypto.createHmac("sha256", SECRET).update(body).digest("base64url");
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}

export async function getSession(): Promise<boolean> {
  const store = await cookies();
  return verifySession(store.get(SESSION_COOKIE)?.value);
}

export async function setSessionCookie(): Promise<void> {
  const store = await cookies();
  const token = signSession({ sub: "admin", exp: Date.now() + MAX_AGE_SECONDS * 1000 });
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_SECONDS,
    path: "/",
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(`${password}::${SECRET}`).digest("hex");
}

export async function verifyPassword(
  password: string,
  settingsPasswordHash: string
): Promise<boolean> {
  if (settingsPasswordHash) {
    return hashPassword(password) === settingsPasswordHash;
  }
  const envPassword = process.env.ADMIN_PASSWORD || "archive-2026";
  return password === envPassword;
}

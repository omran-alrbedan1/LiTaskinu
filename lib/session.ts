import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  roles?: string[];
  avatar?: string;
  first_name?: string;
  last_name?: string;
  gender?: string;
  is_verified?: boolean;
  phone?: string;
  isAdmin?: boolean;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
  refreshToken?: string;
  apiUserData?: any;
  isAdmin?: boolean;
};

/**
 * === إعدادات المفتاح السري (Secret Key Setup) ===
 */

// الحصول على المفتاح السري من متغيرات البيئة
const secretKey = process.env.SESSION_SECRET_KEY!;

// ترميز المفتاح السري إلى Uint8Array لأن مكتبة jose تتطلب هذا التنسيق
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * === دوال إدارة الجلسات (Session Management Functions) ===
 */

/**
 * دالة إنشاء جلسة جديدة
 * @param payload - بيانات الجلسة التي نريد تخزينها
 * @returns وعد (Promise) لا يرجع قيمة مباشرة ولكن ينشئ كوكيز الجلسة
 */
export async function createSession(payload: Session) {
  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * دالة استرجاع الجلسة الحالية
 */
export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });

    return payload as Session;
  } catch (error) {
    console.log("فشل في التحقق من صحة الجلسة", error);
    redirect("/auth/signin");
  }
}

/**
 * دالة التحقق من صلاحيات المستخدم
 */
export async function getUserSession() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return {
    user: session.user,
    isAuthenticated: true,
    isAdmin: session.isAdmin || false,
  };
}

/**
 * دالة التحقق إذا كان المستخدم مسؤول
 */
export async function isAdmin() {
  const session = await getSession();
  return session?.isAdmin || false;
}

/**
 * دالة التحقق إذا كان المستيف مسجل دخول
 */
export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return session;
}

/**
 * دالة التحقق إذا كان المستخدم مسؤول مع إعادة التوجيه
 */
export async function requireAdmin() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/signin");
  }

  if (!session.isAdmin) {
    redirect("/unauthorized");
  }

  return session;
}

export async function deleteSession() {
  (await cookies()).delete("session");
}

/**
 * دالة لتحديث بيانات المستخدم في الجلسة
 */
export async function updateSession(updates: Partial<Session>) {
  const currentSession = await getSession();

  if (!currentSession) {
    return null;
  }

  const updatedSession = {
    ...currentSession,
    ...updates,
  };

  await createSession(updatedSession);
  return updatedSession;
}

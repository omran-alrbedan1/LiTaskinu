// lib/session.ts
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

const secretKey = process.env.SESSION_SECRET_KEY!;
const encodedKey = new TextEncoder().encode(secretKey);

// Separate cookie names for admin and user
export const SESSION_COOKIES = {
  ADMIN: "admin_session",
  USER: "user_session",
} as const;

type SessionType = "admin" | "user";

/**
 * Create session for specific user type
 */
export async function createSession(
  payload: Session,
  type: SessionType = "user"
) {
  const cookieName =
    type === "admin" ? SESSION_COOKIES.ADMIN : SESSION_COOKIES.USER;

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(type === "admin" ? "2h" : "7d")
    .sign(encodedKey);

  const expiredAt = new Date(
    Date.now() + (type === "admin" ? 2 : 7 * 24) * 60 * 60 * 1000
  );

  (await cookies()).set(cookieName, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiredAt,
    sameSite: "lax",
    path: "/",
  });
}

/**
 * Get session based on type
 */
export async function getSession(type: SessionType): Promise<Session | null> {
  const cookieName =
    type === "admin" ? SESSION_COOKIES.ADMIN : SESSION_COOKIES.USER;
  const cookie = (await cookies()).get(cookieName)?.value;

  if (!cookie) return null;

  try {
    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (error) {
    console.log(`Failed to verify ${type} session`, error);
    return null;
  }
}

/**
 * Get active session (checks admin first, then user)
 */
export async function getActiveSession(): Promise<Session | null> {
  // Check admin session first
  const adminSession = await getSession("admin");
  if (adminSession) return adminSession;

  // Fallback to user session
  return await getSession("user");
}

/**
 * Get user session (for regular users)
 */
export async function getUserSession() {
  const session = await getSession("user");

  if (!session) {
    return null;
  }

  return {
    user: session.user,
    isAuthenticated: true,
    isAdmin: false,
  };
}

/**
 * Get admin session
 */
export async function getAdminSession() {
  const session = await getSession("admin");

  if (!session) {
    return null;
  }

  return {
    user: session.user,
    isAuthenticated: true,
    isAdmin: true,
  };
}

/**
 * Check if user is authenticated as admin
 */
export async function isAdmin() {
  const session = await getSession("admin");
  return !!session;
}

/**
 * Require authentication for regular users
 */
export async function requireAuth() {
  const session = await getSession("user");

  if (!session) {
    redirect("/en/login");
  }

  return session;
}

/**
 * Require admin authentication
 */
export async function requireAdmin() {
  const session = await getSession("admin");

  if (!session) {
    redirect("/admin/login");
  }

  return session;
}

/**
 * Delete specific or all sessions
 */
export async function deleteSession(type?: SessionType) {
  const cookieStore = await cookies();

  if (type === "admin") {
    cookieStore.delete(SESSION_COOKIES.ADMIN);
  } else if (type === "user") {
    cookieStore.delete(SESSION_COOKIES.USER);
  } else {
    // Delete both
    cookieStore.delete(SESSION_COOKIES.ADMIN);
    cookieStore.delete(SESSION_COOKIES.USER);
  }
}

/**
 * Update specific session
 */
export async function updateSession(
  updates: Partial<Session>,
  type: SessionType
) {
  const currentSession = await getSession(type);

  if (!currentSession) {
    return null;
  }

  const updatedSession = {
    ...currentSession,
    ...updates,
  };

  await createSession(updatedSession, type);
  return updatedSession;
}

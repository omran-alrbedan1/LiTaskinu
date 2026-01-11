// api.ts
import axios, { type InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is not configured");
}

export const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: { Accept: "application/json" },
});

/**
 * Extract accessToken from user_session cookie
 * Works ONLY on the server when cookies are forwarded
 */
function getAccessTokenFromCookie(
    config: InternalAxiosRequestConfig
): string | null {
    const cookieHeader = config.headers?.cookie;
    if (!cookieHeader) return null;

    const cookie = (await cookies()).get(cookieName)?.value;

    if (!userSession) return null;

    try {
        // user_session is a JWT → decode payload without verifying
        const payload = JSON.parse(
            Buffer.from(userSession.split(".")[1], "base64").toString()
        );

        return payload?.accessToken ?? null;
    } catch {
        return null;
    }
}

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Client: cookies sent automatically, cannot read httpOnly
    if (typeof window !== "undefined") {
        return config;
    }

    // Server: read token from cookie header
    const token = getAccessTokenFromCookie(config);

    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

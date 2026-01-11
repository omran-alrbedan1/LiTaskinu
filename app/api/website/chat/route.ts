import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

const BACKEND = {
    myInfo: "/children/chat/get-my-info",
    startConversation: "/children/chat/start-conversation",
    messages: "/children/chat/messages", // + /:conversationId
    sendMessage: "/children/chat/send-message",
    conversations: "/children/chat/get-conversations",
};

function apiBaseUrl() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) throw new Error("API_BASE_URL is not configured");
    return API_BASE_URL.replace(/\/$/, "");
}

async function requireUserToken() {
    const session = await getSession("user");
    if (!session?.accessToken) return null;
    return session.accessToken;
}

async function safeJson(res: Response) {
    try {
        return await res.json();
    } catch {
        return null;
    }
}

function normalizeBackendData(payload: any) {
    // handles: {data:{data:...}} OR {data:...} OR raw
    return payload?.data?.data ?? payload?.data ?? payload;
}

function errorResponse(status: number, message: string, extra?: any) {
    return NextResponse.json({ error: message, ...(extra ? { details: extra } : {}) }, { status });
}

export async function GET(req: NextRequest) {
    try {
        const token = await requireUserToken();
        if (!token) return errorResponse(401, "Unauthorized - Please login first");

        const API_BASE_URL = apiBaseUrl();
        const { searchParams } = new URL(req.url);

        const type = searchParams.get("type") || "conversations";
        const conversationId = searchParams.get("conversationId");

        let url = "";

        switch (type) {
            case "conversations":
                url = `${API_BASE_URL}${BACKEND.conversations}`;
                break;

            case "messages":
                if (!conversationId) return errorResponse(400, "conversationId is required for type=messages");
                url = `${API_BASE_URL}${BACKEND.messages}/${conversationId}`;
                break;

            case "my-info":
                url = `${API_BASE_URL}${BACKEND.myInfo}`;
                break;

            default:
                return errorResponse(400, `Unknown type "${type}"`);
        }

        const backendRes = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
            cache: "no-store",
        });

        if (!backendRes.ok) {
            const err = await safeJson(backendRes);
            return errorResponse(
                backendRes.status,
                err?.message || `HTTP error! status: ${backendRes.status}`,
                err
            );
        }

        const payload = await safeJson(backendRes);
        return NextResponse.json(normalizeBackendData(payload), { status: 200 });
    } catch (e: any) {
        console.error("Chat GET route error:", e);
        return errorResponse(500, e?.message || "Internal server error");
    }
}

export async function POST(req: NextRequest) {
    try {
        const token = await requireUserToken();
        if (!token) return errorResponse(401, "Unauthorized - Please login first");

        const API_BASE_URL = apiBaseUrl();
        const { searchParams } = new URL(req.url);

        const type = searchParams.get("type");
        if (!type) return errorResponse(400, 'Missing query param "type"');

        let url = "";
        switch (type) {
            case "start":
                url = `${API_BASE_URL}${BACKEND.startConversation}`;
                break;

            case "send":
                url = `${API_BASE_URL}${BACKEND.sendMessage}`;
                break;

            default:
                return errorResponse(400, `Unknown type "${type}"`);
        }

        const contentType = req.headers.get("content-type") || "";

        // If multipart, forward FormData without manually setting content-type
        if (contentType.includes("multipart/form-data")) {
            const form = await req.formData();

            const backendRes = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
                body: form,
            });

            if (!backendRes.ok) {
                const err = await safeJson(backendRes);
                return errorResponse(
                    backendRes.status,
                    err?.message || `HTTP error! status: ${backendRes.status}`,
                    err
                );
            }

            const payload = await safeJson(backendRes);
            return NextResponse.json(normalizeBackendData(payload), { status: 200 });
        }

        // Default: JSON
        const body = await req.json().catch(() => ({}));

        const backendRes = await fetch(url, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!backendRes.ok) {
            const err = await safeJson(backendRes);
            return errorResponse(
                backendRes.status,
                err?.message || `HTTP error! status: ${backendRes.status}`,
                err
            );
        }

        const payload = await safeJson(backendRes);
        return NextResponse.json(normalizeBackendData(payload), { status: 200 });
    } catch (e: any) {
        console.error("Chat POST route error:", e);
        return errorResponse(500, e?.message || "Internal server error");
    }
}

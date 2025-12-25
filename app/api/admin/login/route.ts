// app/api/admin/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createSession } from "@/lib/session";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.post(
      `${API_BASE_URL}/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const responseData = response.data;

    if (!responseData.status || !responseData.data) {
      return NextResponse.json(
        { error: responseData.message || "Authentication failed" },
        { status: 401 }
      );
    }

    const { user, roles, token } = responseData.data;

    // Check if user has admin role
    if (!roles.includes("admin")) {
      return NextResponse.json(
        { error: "Access denied. Admin privileges required." },
        { status: 403 }
      );
    }

    // Create admin session
    const sessionPayload = {
      user: {
        id: user.id.toString(),
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: "admin",
        roles: roles,
        avatar: user.avatar || "/avatars/admin.png",
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        is_verified: user.is_verified,
        phone: user.phone,
      },
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      apiUserData: user,
      isAdmin: true,
    };

    await createSession(sessionPayload, "admin");

    return NextResponse.json(
      {
        message: "Admin login successful",
        user: {
          id: sessionPayload.user.id,
          name: sessionPayload.user.name,
          email: sessionPayload.user.email,
          role: sessionPayload.user.role,
          avatar: sessionPayload.user.avatar,
          isAdmin: true,
        },
        token: {
          access_token: token.access_token,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Admin login error:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message || "Authentication failed";
      const statusCode = error.response?.status || 401;
      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

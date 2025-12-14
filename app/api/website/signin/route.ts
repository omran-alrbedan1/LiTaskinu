// app/api/auth/login/route.ts
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

    // Create user session (no admin role check)
    const sessionPayload = {
      user: {
        id: user.id.toString(),
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        role: roles[0],
        roles: roles,
        avatar: user.avatar || "/avatars/default.png",
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender,
        is_verified: user.is_verified,
        phone: user.phone,
      },
      accessToken: token.access_token,
      refreshToken: token.refresh_token,
      apiUserData: user,
      isAdmin: false, // Always false for user session
    };

    await createSession(sessionPayload, "user");

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: sessionPayload.user.id,
          name: sessionPayload.user.name,
          email: sessionPayload.user.email,
          role: sessionPayload.user.role,
          first_name: sessionPayload.user.first_name,
          last_name: sessionPayload.user.last_name,
          avatar: sessionPayload.user.avatar,
          isAdmin: false,
        },
        token: {
          access_token: token.access_token,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("User login error:", error);

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

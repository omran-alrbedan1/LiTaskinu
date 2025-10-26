import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    // Validate input
    if (!email || !otp) {
      return NextResponse.json(
        { error: "Email and OTP are required" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.post(
      `${API_BASE_URL}/verify-otp`,
      { email, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("OTP Verification API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "OTP verification failed",
        },
        { status: error.response?.status || 500 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const {
      first_name,
      last_name,
      gender,
      birath_day,
      country_id,
      city_id,
      email,
      phone,
      password,
      role,
      password_confirmation,
      googleCredential,
      loginType,
    } = await request.json();

    // Handle Google registration
    if (loginType === "google" && googleCredential) {
      const API_BASE_URL = process.env.API_BASE_URL;

      if (!API_BASE_URL) {
        throw new Error("API_BASE_URL is not configured");
      }

      const response = await axios.post(
        `${API_BASE_URL}/auth/google-register`,
        { googleCredential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data?.data || response.data;
      return NextResponse.json(data, { status: 200 });
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.post(
      `${API_BASE_URL}/register`,
      {
        first_name,
        last_name,
        gender,
        birath_day,
        country_id,
        city_id,
        email,
        role,
        phone,
        password,
        password_confirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Registration API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Registration failed",
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

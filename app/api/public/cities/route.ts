import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    // Use the token from the session
    const response = await axios.get(`${API_BASE_URL}/public/cities`, {
      headers: {
        "accept-language": "en",
      },
    });

    const data = response.data?.data.data || response.data.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch cities API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to fetch cities",
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

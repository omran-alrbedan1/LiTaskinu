import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";

// Helper function to handle axios errors
const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const errorResponse = error.response?.data;
    
    return NextResponse.json(
      errorResponse || { error: "API request failed" },
      { status: statusCode }
    );
  }
  
  console.error("Non-axios error:", error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
};

export async function GET(request: NextRequest) {
  try {
    const session = await getSession("admin");

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    // Use the token from the session
    const response = await axios.get(`${API_BASE_URL}/countries`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data.data || response.data.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch countries API error:", error);
    return handleAxiosError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession("admin");

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const body = await request.json();

    if (!body.code || !body.name?.en || !body.name?.ar) {
      return NextResponse.json(
        { error: "Country code, English name, and Arabic name are required" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.post(`${API_BASE_URL}/countries`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Add country API error:", error);
    return handleAxiosError(error);
  }
}

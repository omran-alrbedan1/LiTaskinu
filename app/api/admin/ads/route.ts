import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";
import { handleAxiosError } from "@/lib/api-error-handler";

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

    const response = await axios.get(`${API_BASE_URL}/ads`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data =
      response.data?.data?.data || response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch ads API error:", error);
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

    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const contentType = request.headers.get("content-type") || "";

    // Handle both FormData and JSON requests
    if (contentType.includes("multipart/form-data")) {
      return await handleFormDataRequest(request, session, API_BASE_URL);
    } else {
      return await handleJsonRequest(request, session, API_BASE_URL);
    }
  } catch (error: any) {
    console.error("Create ad API error:", error);
    return handleAxiosError(error);
  }
}

// Helper function for FormData requests
async function handleFormDataRequest(
  request: NextRequest,
  session: any,
  API_BASE_URL: string
): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    
    // Create FormData for external API - forward ALL fields exactly as received
    const externalFormData = new FormData();

    // Append ALL fields from the original request to external FormData
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        externalFormData.append(key, value);
      } else {
        externalFormData.append(key, value as string);
      }
    }

    const response = await axios.post(`${API_BASE_URL}/ads`, externalFormData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.accessToken}`,
      },
      timeout: 30000,
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("FormData request error:", error);
    return handleAxiosError(error);
  }
}

async function handleJsonRequest(
  request: NextRequest,
  session: any,
  API_BASE_URL: string
): Promise<NextResponse> {
  try {
    const body = await request.json();

    const response = await axios.post(`${API_BASE_URL}/ads`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("JSON request error:", error);
    return handleAxiosError(error);
  }
}
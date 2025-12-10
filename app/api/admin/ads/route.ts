import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();

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

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to fetch ads",
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

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

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

    const contentType = request.headers.get("content-type") || "";

    // Handle both FormData and JSON requests
    if (contentType.includes("multipart/form-data")) {
      return await handleFormDataRequest(request, session, API_BASE_URL);
    } else {
      return await handleJsonRequest(request, session, API_BASE_URL);
    }
  } catch (error: any) {
    console.error("Create ad API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to create ad",
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

// Helper function for FormData requests
async function handleFormDataRequest(
  request: NextRequest,
  session: any,
  API_BASE_URL: string
) {
  const formData = await request.formData();

  // Extract and validate required fields
  const titleEn = formData.get("title[en]") as string;
  const titleAr = formData.get("title[ar]") as string;
  const contentEn = formData.get("content[en]") as string;
  const contentAr = formData.get("content[ar]") as string;

  // Create FormData for external API
  const externalFormData = new FormData();

  // Append required fields
  externalFormData.append("title[en]", titleEn.trim());
  externalFormData.append("title[ar]", titleAr.trim());
  externalFormData.append("content[en]", contentEn.trim());
  externalFormData.append("content[ar]", contentAr.trim());
  // Append optional fields
  const optionalFields = [
    "start_date",
    "end_date",
    "status",
    "target_audience",
  ];
  optionalFields.forEach((field) => {
    const value = formData.get(field);
    if (value) externalFormData.append(field, value as string);
  });

  // Handle image file
  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    externalFormData.append("image", image);
  }

  const response = await axios.post(`${API_BASE_URL}/ads`, externalFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${session.accessToken}`,
    },
    // Add timeout and larger maxBodyLength for file uploads
    timeout: 30000,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
  });

  const data = response.data?.data || response.data;
  return NextResponse.json(data, { status: 200 });
}

async function handleJsonRequest(
  request: NextRequest,
  session: any,
  API_BASE_URL: string
) {
  const body = await request.json();

  const response = await axios.post(`${API_BASE_URL}/ads`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data = response.data?.data || response.data;
  return NextResponse.json(data, { status: 200 });
}

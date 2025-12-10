import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Ad ID is required" }, { status: 400 });
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.get(`${API_BASE_URL}/ads/${id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch ad by ID API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to fetch ad",
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

// DELETE method to delete an ad by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Ad ID is required" }, { status: 400 });
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.delete(`${API_BASE_URL}/ads/${id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Delete ad API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to delete ad",
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

// PUT method to update an ad by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Ad ID is required" }, { status: 400 });
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      return await handleFormDataRequest(
        request,
        session,
        API_BASE_URL,
        id,
        "PUT"
      );
    } else {
      return await handleJsonRequest(request, session, API_BASE_URL, id, "PUT");
    }
  } catch (error: any) {
    console.error("Update ad API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to update ad",
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

// Helper function for FormData requests (PUT)
async function handleFormDataRequest(
  request: NextRequest,
  session: any,
  API_BASE_URL: string,
  id: string,
  method: "PUT"
) {
  const formData = await request.formData();

  // Extract and validate required fields
  const titleEn = formData.get("title[en]") as string;
  const titleAr = formData.get("title[ar]") as string;
  const contentEn = formData.get("content[en]") as string;
  const contentAr = formData.get("content[ar]") as string;

  if (
    !titleEn?.trim() ||
    !titleAr?.trim() ||
    !contentEn?.trim() ||
    !contentAr?.trim()
  ) {
    return NextResponse.json(
      { error: "Title and content in both English and Arabic are required" },
      { status: 400 }
    );
  }

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

  const image = formData.get("image");
  if (image instanceof File && image.size > 0) {
    externalFormData.append("image", image);
  }

  const response = await axios.put(
    `${API_BASE_URL}/ads/${id}`,
    externalFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${session.accessToken}`,
      },
      timeout: 30000,
    }
  );

  const data = response.data?.data || response.data;
  return NextResponse.json(data, { status: 200 });
}

// Helper function for JSON requests (PUT)
async function handleJsonRequest(
  request: NextRequest,
  session: any,
  API_BASE_URL: string,
  id: string,
  method: "PUT"
) {
  const body = await request.json();

  // Validate required fields for JSON request
  if (
    !body.title?.en ||
    !body.title?.ar ||
    !body.content?.en ||
    !body.content?.ar
  ) {
    return NextResponse.json(
      { error: "Title and content in both English and Arabic are required" },
      { status: 400 }
    );
  }

  const response = await axios.put(`${API_BASE_URL}/ads/${id}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const data = response.data?.data || response.data;
  return NextResponse.json(data, { status: 200 });
}

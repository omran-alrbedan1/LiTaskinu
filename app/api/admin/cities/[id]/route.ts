import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";
import { handleAxiosError } from "@/lib/api-error-handler";


// GET single city
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const response = await axios.get(`${API_BASE_URL}/cities/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch city API error:", error);
    return handleAxiosError(error);
  }
}

// UPDATE city
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getSession("admin");
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validation for required fields
    if (!body.country_id || !body.name?.en || !body.name?.ar) {
      return NextResponse.json(
        { error: "Country ID, English name, and Arabic name are required" },
        { status: 400 }
      );
    }

    // Ensure country_id is a number
    if (isNaN(Number(body.country_id))) {
      return NextResponse.json(
        { error: "Country ID must be a valid number" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.put(
      `${API_BASE_URL}/cities/${params.id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Update city API error:", error);
    return handleAxiosError(error);
  }
}

// DELETE city
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const response = await axios.delete(`${API_BASE_URL}/cities/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Delete city API error:", error);
    return handleAxiosError(error);
  }
}
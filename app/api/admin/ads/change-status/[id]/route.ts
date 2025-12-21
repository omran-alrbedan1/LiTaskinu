import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";
import { handleAxiosError } from "@/lib/api-error-handler";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function POST(
  request: NextRequest,
  { params }: RouteParams
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
      return NextResponse.json(
        { error: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const { id } = params;
    
    // Validate adId
    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        {
          status: false,
          message: "Validation errors",
          errors: {
            id: ["Valid ad ID is required."]
          },
          data: null
        },
        { status: 422 }
      );
    }

    const body = await request.json();
    
    // Validate status parameter
    if (!body.status || typeof body.status !== 'string') {
      return NextResponse.json(
        {
          status: false,
          message: "Validation errors",
          errors: {
            status: ["Status parameter is required and must be a string."]
          },
          data: null
        },
        { status: 422 }
      );
    }

    const response = await axios.post(
      `${API_BASE_URL}/ads/change-status/${id}`,
      { status: body.status },
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
    console.error("Status change error:", error);
    return handleAxiosError(error);
  }
}
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

    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";
    const pageSize = searchParams.get("pageSize") || "10";
    const status = searchParams.get("status");
    const verification = searchParams.get("verification");
    const search = searchParams.get("search");

    // Build backend API URL with filters and pagination
    const backendUrl = new URL(`${API_BASE_URL}/users`);

    // Add pagination
    backendUrl.searchParams.append("page", page);
    backendUrl.searchParams.append("limit", pageSize);

    // Add filters
    if (status) backendUrl.searchParams.append("status", status);
    if (verification)
      backendUrl.searchParams.append("is_verified", verification);
    if (search) backendUrl.searchParams.append("search", search);

    const response = await axios.get(backendUrl.toString(), {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Format response to include pagination info
    const responseData =
      response.data?.data?.data || response.data?.data || response.data;

    const result = {
      data: Array.isArray(responseData) ? responseData : [],
      pagination: {
        current: parseInt(page),
        pageSize: parseInt(pageSize),
        total: response.data?.total || response.data?.meta?.total || 0,
      },
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Fetch users API error:", error);

    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          error: error.response?.data?.message || "Failed to fetch users",
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

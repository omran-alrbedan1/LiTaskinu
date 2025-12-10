import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";

interface Params {
  params: {
    id: string;
  };
}

// GET user by ID
export async function GET(request: NextRequest, { params }: Params) {
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

    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Make GET request to backend API
    const backendUrl = `${API_BASE_URL}/users/${userId}`;

    const response = await axios.get(backendUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User retrieved successfully",
        data: response.data.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Get user by ID API error:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Failed to fetch user";

      if (status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (status === 403) {
        return NextResponse.json(
          { error: "You don't have permission to view this user" },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE user by ID
export async function DELETE(request: NextRequest, { params }: Params) {
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

    const userId = params.id;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    // Make DELETE request to backend API
    const backendUrl = `${API_BASE_URL}/users/${userId}`;

    const response = await axios.delete(backendUrl, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "User deleted successfully",
        data: response.data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Delete user API error:", error);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || "Failed to delete user";

      if (status === 404) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      if (status === 403) {
        return NextResponse.json(
          { error: "You don't have permission to delete users" },
          { status: 403 }
        );
      }

      return NextResponse.json({ error: message }, { status });
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

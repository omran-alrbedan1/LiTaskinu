import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

interface RouteParams {
  params: {
    id: string;
  };
}

// GET single sheikh by ID
export async function GET(
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

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const { id } = params;

    const response = await fetch(`${API_BASE_URL}/sheikhs/${id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    const responseData = await response.json();
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  } catch (error: any) {
    console.error("Get sheikh API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const { id } = params;
    
    // Get the request body
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/sheikhs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    });

    // Pass through the backend response directly
    const responseData = await response.json();
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  } catch (error: any) {
    console.error("Update sheikh API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE sheikh by ID
export async function DELETE(
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

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!API_BASE_URL) {
      return NextResponse.json(
        { error: "API_BASE_URL is not configured" },
        { status: 500 }
      );
    }

    const { id } = params;

    const response = await fetch(`${API_BASE_URL}/sheikhs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Handle response - backend might return empty body
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      // If response is empty, create a success message
      if (response.ok) {
        responseData = { message: "Sheikh deleted successfully" };
      } else {
        responseData = { error: "Failed to delete sheikh" };
      }
    }
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  } catch (error: any) {
    console.error("Delete sheikh API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
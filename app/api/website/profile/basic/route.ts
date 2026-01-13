import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { handleFetchError } from "@/lib/fetch-error-handler";

export async function GET(request: NextRequest) {
  try {
    const session = await getSession("user");
    
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

    const response = await fetch(`${API_BASE_URL}/children/get`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch children data" },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  } catch (error: any) {
    console.error("Fetch children data API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession("user");
    
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

    // Get FormData from request
    const formData = await request.formData();
    
    const response = await fetch(`${API_BASE_URL}/children/update`, {
      method: 'POST', 
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    });

    const responseData = await response.json();
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  } catch (error: any) {
    console.error("Update children preferences API error:", error);
    return handleFetchError(error); 
  }
}
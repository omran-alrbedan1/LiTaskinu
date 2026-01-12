import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(
  request: NextRequest,
  { params }: { params: { endpoint: string } }
) {
  try {
    const session = await getSession("user");
    
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
    
    const { endpoint } = params;
    
    // Validate the endpoint
    if (endpoint !== 'my' && endpoint !== 'get') {
      return NextResponse.json(
        { error: "Invalid endpoint. Use 'my' or 'get'" },
        { status: 400 }
      );
    }

    const response = await fetch(`${API_BASE_URL}/children/interests/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || `Failed to fetch ${endpoint} interests` },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  } catch (error: any) {
    console.error(`Fetch ${params?.endpoint} interests API error:`, error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
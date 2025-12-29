import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
  try {
    // Get user session instead of admin session
    const session = await getSession("user");

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

    console.log(session.accessToken);

    const response = await fetch(`${API_BASE_URL}/children/home-users`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
        
      },
    });

    // Check if response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error: errorData.message || `HTTP error! status: ${response.status}`,
        },
        { status: response.status }
      );
    }

    const responseData = await response.json();
    
    const data =   responseData?.data.data|| responseData?.data || responseData;
    
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch home-users children API error:", error);

    return NextResponse.json(
      { 
        error: error.message || "Internal server error" 
      },
      { status: 500 }
    );
  }
}
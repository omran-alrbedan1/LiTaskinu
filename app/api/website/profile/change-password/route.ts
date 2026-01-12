import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { handleFetchError } from "@/lib/fetch-error-handler";

export async function POST(request: NextRequest) {
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

    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    });

 const responseData = await response.json();
    
    
    return NextResponse.json(responseData, { 
      status: response.status 
    });
    
  }catch (error: any) {
        console.error("Update children preferences API error:", error);
        return handleFetchError(error); 
      }
}
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export async function GET(request: NextRequest) {
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

    const response = await fetch(`${API_BASE_URL}/success-stories`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || `API request failed with status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch success stories API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST create new success story
export async function POST(request: NextRequest) {
  try {
    const session = await getSession("admin");

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    const { 
      name_male, 
      name_female, 
      description, 
      testimonial, 
      rating, 
      country_id, 
      city_id 
    } = body;



    const ratingNum = Number(rating);
 

    // Validate country_id and city_id are numbers
    if (isNaN(Number(country_id)) || isNaN(Number(city_id))) {
      return NextResponse.json(
        { error: "Country ID and City ID must be valid numbers" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    // Prepare data for the API
    const apiData = {
      name_male,
      name_female,
      description,
      testimonial,
      rating: ratingNum.toString(), 
      country_id: Number(country_id).toString(),
      city_id: Number(city_id).toString(),
    };

    const response = await fetch(`${API_BASE_URL}/success-stories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(apiData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { 
          error: errorData.message || `API request failed with status ${response.status}`,
          details: errorData.errors || errorData
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: 201 }); 
  } catch (error: any) {
    console.error("Create success story API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
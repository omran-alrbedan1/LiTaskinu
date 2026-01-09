import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";


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

    // Validate ID parameter
    const id = params.id;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid story ID" },
        { status: 400 }
      );
    }

    // Parse the request body
    const body = await request.json();
    
    // Extract fields from the request body
    const { 
      name_male, 
      name_female, 
      description, 
      testimonial, 
      rating, 
      country_id, 
      city_id 
    } = body;


    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    // Prepare data for the API - only include provided fields
    const apiData: any = {};
    if (name_male !== undefined) apiData.name_male = name_male;
    if (name_female !== undefined) apiData.name_female = name_female;
    if (description !== undefined) apiData.description = description;
    if (testimonial !== undefined) apiData.testimonial = testimonial;
    if (rating !== undefined) apiData.rating = Number(rating).toString();
    if (country_id !== undefined) apiData.country_id = Number(country_id).toString();
    if (city_id !== undefined) apiData.city_id = Number(city_id).toString();

    const response = await fetch(
      `${API_BASE_URL}/success-stories/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(apiData),
      }
    );

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
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Update success story API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE success story
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

    // Validate ID parameter
    const id = params.id;
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { error: "Invalid story ID" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await fetch(
      `${API_BASE_URL}/success-stories/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

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
    console.error("Delete success story API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
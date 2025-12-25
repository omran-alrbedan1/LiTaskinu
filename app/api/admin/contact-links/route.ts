import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";
import { handleAxiosError } from "@/lib/api-error-handler";

// GET all contact links
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

    // Use the token from the session
    const response = await axios.get(`${API_BASE_URL}/contact-link`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    // Adjust based on your API response structure
    const data = response.data?.data?.data || response.data?.data || response.data;
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch contact links API error:", error);
    return handleAxiosError(error);
  }
}

// POST create new contact link
// POST create new contact link
export async function POST(request: NextRequest) {
  try {
    const session = await getSession("admin");

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized - Please login first" },
        { status: 401 }
      );
    }

    // Get FormData from the request
    const formData = await request.formData();
    
    // Extract fields from FormData
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const value = formData.get('value') as string;
    const icon = formData.get('icon') as File;
    const is_active = formData.get('is_active') as string;

    // Validate required fields
    if (!name || !type || !value || !icon) {
      return NextResponse.json(
        { error: "Name, type, value, and icon are required fields" },
        { status: 400 }
      );
    }

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    // Create FormData for the external API
    const apiFormData = new FormData();
    apiFormData.append('name', name);
    apiFormData.append('type', type);
    apiFormData.append('value', value);
    apiFormData.append('icon', icon);
    apiFormData.append('is_active', is_active || '1');

    const response = await axios.post(`${API_BASE_URL}/contact-link`, apiFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Add contact link API error:", error);
    return handleAxiosError(error);
  }
}
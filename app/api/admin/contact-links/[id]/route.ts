import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getSession } from "@/lib/session";
import { handleAxiosError } from "@/lib/api-error-handler";

// GET single contact link
export async function GET(
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

    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.get(`${API_BASE_URL}/contact-link/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Fetch contact link API error:", error);
    return handleAxiosError(error);
  }
}

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

    // Get FormData from the request
    const formData = await request.formData();
    
    // Extract fields from FormData
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const value = formData.get('value') as string;
    const icon = formData.get('icon') as File | string;
    const is_active = formData.get('is_active') as string;

    // Validate required fields
    if (!name || !type || !value) {
      return NextResponse.json(
        { error: "Name, type, and value are required fields" },
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
    
    if (icon instanceof File) {
      apiFormData.append('icon', icon);
    } else if (icon && typeof icon === 'string') {
      apiFormData.append('icon', icon);
    }
    
    apiFormData.append('is_active', is_active || '1');

    const response = await axios.put(
      `${API_BASE_URL}/contact-link/${params.id}`,
      apiFormData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${session.accessToken}`,
        },
      }
    );

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Update contact link API error:", error);
    return handleAxiosError(error);
  }
}

// DELETE contact link
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

    const API_BASE_URL = process.env.API_BASE_URL;
    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }

    const response = await axios.delete(`${API_BASE_URL}/contact-link/${params.id}`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    });

    const data = response.data?.data || response.data;
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Delete contact link API error:", error);
    return handleAxiosError(error);
  }
}
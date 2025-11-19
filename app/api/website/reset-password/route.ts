import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { reset_token, password, password_confirmation } =
      await request.json();

    const API_BASE_URL = process.env.API_BASE_URL;

    if (!API_BASE_URL) {
      throw new Error("API_BASE_URL is not configured");
    }
    console.log(reset_token, password, password_confirmation);

    const response = await axios.post(
      `${API_BASE_URL}/reset-password`,
      {
        reset_token,
        password,
        password_confirmation,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const data = response.data?.data || response.data;

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully",
        data,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Reset Password API error:", error);

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to reset password";
      const statusCode = error.response?.status || 500;

      return NextResponse.json(
        {
          error: errorMessage,
          details: error.response?.data,
        },
        { status: statusCode }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

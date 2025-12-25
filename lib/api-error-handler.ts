import { NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  details?: string;
  status?: boolean;
  [key: string]: any;
}

export const handleAxiosError = (error: any): NextResponse => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const errorResponse = error.response?.data as ErrorResponse;
    
    return NextResponse.json(
      errorResponse || { error: "API request failed" },
      { status: statusCode }
    );
  }
  
  console.error("Non-axios error:", error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
};

// Optional: Export additional error handling utilities
export const handleApiError = (error: any): { error: string; status: number } => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status || 500;
    const errorResponse = error.response?.data as ErrorResponse;
    
    return {
      error: errorResponse?.message || errorResponse?.error || "API request failed",
      status: statusCode
    };
  }
  
  console.error("Non-axios error:", error);
  return {
    error: "Internal server error",
    status: 500
  };
};
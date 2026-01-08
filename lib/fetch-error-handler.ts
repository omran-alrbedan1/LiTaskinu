import { NextResponse } from "next/server";

interface ErrorResponse {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
  details?: string;
  status?: boolean;
  [key: string]: any;
}

export const handleFetchError = (error: any): NextResponse => {
  if (error && typeof error === 'object' && 'status' in error && 'data' in error) {
    const statusCode = error.status || 500;
    const errorResponse = error.data as ErrorResponse;
    
    return NextResponse.json(
      errorResponse || { error: error.message || "API request failed" },
      { status: statusCode }
    );
  }
  
  // Check if it's a standard Error
  if (error instanceof Error) {
    console.error("Standard error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
  
  console.error("Unknown error:", error);
  return NextResponse.json(
    { error: "Internal server error" },
    { status: 500 }
  );
};


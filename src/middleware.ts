import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  // const apiKey = req.headers.get("x-api-key");
  // const validApiKey = process.env.API_KEY;

  // if (!apiKey || apiKey !== validApiKey) {
  //   return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  // }

  return NextResponse.next();
}

// Apply the middleware to the specific API path
export const config = {
  matcher: "/api/v1/:path*",
};

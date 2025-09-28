// app/api/login/route.ts
import { NextResponse } from "next/server";

const TEST_CREDENTIALS = {
  email: "test@example.com",
  password: "123456",
};

export async function POST(req: Request) {
  const { email: emailTest, password: pinTest } = TEST_CREDENTIALS;
  try {
    const body = await req.json();
    const { email, password } = body;

    // Simple validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // Dummy auth check
    if (email === emailTest && password === pinTest) {
      return NextResponse.json(
        { success: true, message: "Login successful!" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid credentials, plz check ur credentials",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { success: false, message: "Code is required" },
        { status: 400 }
      );
    }

    const storedCode = (await cookies()).get("two-auth-code")?.value;

    if (storedCode && storedCode === code) {
      // Success: clear the cookie
      const res = NextResponse.json(
        { success: true, message: "2FA verified successfully!" },
        { status: 200 }
      );
      res.cookies.delete("two-auth-code");
      return res;
    }

    return NextResponse.json(
      { success: false, message: "Invalid or expired code" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}

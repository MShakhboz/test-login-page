// app/api/login/route.ts

import { htmlContent } from "@/components/functional/email-template";
import { NextResponse } from "next/server";

import { Resend } from "resend";

const resend = new Resend("re_D1VLkds6_286ZcUd8451pMGNCxSfkYkbX");
// re_D1VLkds6_286ZcUd8451pMGNCxSfkYkbX

export async function POST(req: Request) {
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
    if (email && password) {
      const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
      const res = NextResponse.json(
        {
          success: true,
          message: "Login successful!",
          data: {
            code,
          },
        },
        { status: 200 }
      );

      //   I wanted to set up an email sender, but since it requires configuring a domain
      //   const { data, error } = await resend.emails.send({
      //     from: "onboarding@resend.dev",
      //     to: email,
      //     subject: "2FA code",
      //     html: htmlContent(code),
      //   });

      // set cookie instead of localStorage
      res.cookies.set("two-auth-code", code, {
        path: "/",
        maxAge: 60 * 5, // 5 min expiry
      });
      return res;
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

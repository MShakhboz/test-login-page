import { Resend } from "resend";

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendCode(formData: { email: string; code: string }) {
  try {
    const { email, code } = formData;

    // Format the HTML content
    const htmlContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px 0;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <div style="background-color: #111827; padding: 20px;">
          <h2 style="color: #ffffff; margin: 0; font-size: 24px;">${code}</h2>
          <p style="color: #9ca3af; margin: 0;">from SEERS Agency</p>
        </div>
      </div>
    </div>
  `;

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: process.env.EMAIL_TO!,
      replyTo: email,
      subject: `Two-factor authentication code`,
      html: htmlContent,
      text: `Two-factor authentication code, Email: ${email}`,
    });

    if (error) {
      console.error("Email sending failed:", error);
      return {
        success: false,
        error: "Failed to send email. Please try again later.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Email sending failed:", error);
    return {
      success: false,
      error: "Failed to send email. Please try again later.",
    };
  }
}

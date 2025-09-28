export const htmlContent = (code: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Two-Factor Authentication</title>
  </head>
  <body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color:#f4f4f4;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color:#f4f4f4; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width:600px; background:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <tr>
              <td align="center" style="background:#111827; padding:24px;">
                <h1 style="color:#ffffff; margin:0; font-size:22px;">Two-Factor Authentication</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px; text-align:center;">
                <p style="font-size:16px; color:#333333; margin-bottom:24px;">
                  Use the following code to complete your login:
                </p>
                <p style="font-size:32px; font-weight:bold; letter-spacing:4px; color:#111827; margin:0;">
                  ${code}
                </p>
                <p style="font-size:14px; color:#666666; margin-top:24px;">
                  This code will expire in 5 minutes. If you did not request this, please ignore this email.
                </p>
              </td>
            </tr>
            <tr>
              <td style="background:#f9fafb; padding:16px; text-align:center; font-size:12px; color:#9ca3af;">
                from SEERS Agency
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;

import { createTransport } from "nodemailer";
import { EmailTypeFunction, HtmlTemplateType } from "../types/types.js";

const htmlTemplate: HtmlTemplateType = (
  link,
  projectName,
  senderEmail,
  name
): string => `
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Email Template</title>
   </head>
   <body style="font-family: Arial, sans-serif;">
      <center style="width:100%;background:#f6f8f9;text-align:left">
         <div style="max-width:600px;margin:auto" class="m_7263922738444358665email-container">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:630px">
               <tbody>
                  <tr>
                     <td style="padding:10px 0;text-align:center">
                     <h1 style="margin: 0">Project Loom</h1>
                     </td>
                  </tr>
               </tbody>
            </table>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:630px">
               <tbody>
                  <tr>
                     <td bgcolor="#ffffff" style="border-top:2px solid #4990e2;border-bottom-left-radius:4px;border-bottom-right-radius:4px">
                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                           <tbody>
                              <tr>
                                 <td style="padding:24px;text-align:center;font-family:sans-serif;font-size:16px;line-height:24px;color:#333333">
                                    <p style="margin:0;padding:24px">
                                       <span style="font-weight:bold">
                                       Hi ${name},
                                       </span>
                                       <br><br>
                                       invited you to join <br><span style="font-weight:bold">${projectName}</span>    <br>
                                       <span style="font-size:12px;color:#5c7899">Please note that to accept the invitation, you’ll need to sign in or create an account on Freedcamp</span>
                                    </p>
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:auto">
                                       <tbody>
                                          <tr>
                                             <td style="border-radius:3px;background:#27ae60;text-align:center" class="m_7263922738444358665button-td">
                                                <a href=${link} style="background:#27ae60;border:1px solid #239c56;font-family:sans-serif;font-size:16px;line-height:48px;height:46px;text-align:center;text-decoration:none;display:block;border-radius:4px;padding-left:32px;padding-right:32px" class="m_7263922738444358665button-a" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://freedcamp.com/notifications/invitations/accept/ac3455838050aee73947616b6da4035c&amp;source=gmail&amp;ust=1715501509692000&amp;usg=AOvVaw1acehHj1NBFRhNsjnchIF2">
                                                <span style="color:#ffffff" class="m_7263922738444358665button-link">Accept Invitation</span>
                                                </a>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                    <p style="font-size:12px;padding:24px;margin:0">
                                       <span style="color:#5c7899">or copy/paste the following link in your browser:</span><br>
                                       <a href=${link} target="_blank">${link}</a>
                                    </p>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </td>
                  </tr>
               </tbody>
            </table>
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" width="100%" style="max-width:600px">
               <tbody>
                  <tr>
                     <td style="padding:16px;width:100%;font-size:12px;font-family:sans-serif;line-height:18px;text-align:center;color:#8499b2">
                        Not sure why you received this email? Ask <a href="mailto:${senderEmail}" target="_blank">${senderEmail}</a> or simply <a href="https://freedcamp.com/notifications/invitations/decline/" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://freedcamp.com/notifications/invitations/decline/&amp;source=gmail&amp;ust=1715501509692000&amp;usg=AOvVaw3ItQF6QD1eGK6S0iWvj6NN"> decline invitation </a>                    
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
      </center>
   </body>
</html>
`;

export const sendEmail: EmailTypeFunction = async (
  to,
  subject,
  text,
  link,
  projectName,
  senderEmail,
  name
) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  } as any);

  await transporter.sendMail({
    to,
    subject,
    text,
    html: htmlTemplate(link, projectName, senderEmail, name = ""),
    from: "jarmanjits176@gmail.com",
  });
};

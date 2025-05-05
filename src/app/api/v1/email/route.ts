import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import axios from "axios";
import EmailResponse from "@/app/utility/emailResponse";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_AUTH_USER,
    pass: process.env.EMAIL_AUTH_PASS,
  },
});

const sendEmail = async (user_id: string, type: string) => {
  const response = await axios.post(
    process.env.NEXT_PUBLIC_HASURA_URL as string,
    {
      query: `
        query GetUserEmail($id: uuid!) {
          user: users_by_pk(id: $id) {
            email
          }
        }
      `,
      variables: { id: user_id },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string,
      },
    }
  );

  const userEmail = response.data.data.user.email;

  const emailBody = EmailResponse(type);
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: "New Notification | Buddybase",
    html: emailBody,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(req: NextRequest) {
  const { event } = await req.json();
  const { user_id, type } = event.data.new;

  try {
    await sendEmail(user_id, type);
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}

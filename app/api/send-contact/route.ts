import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

interface Attachment {
  name: string;
  type: string;
  data: string; // base64
}

export async function POST(request: NextRequest) {
  try {
    // Check for required environment variables
    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_PASSWORD) {
      console.error("Missing GMAIL_EMAIL or GMAIL_PASSWORD environment variables");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const body = await request.json();
    const {
      name,
      phone,
      email,
      product,
      message,
      size,
      material,
      attachments,
      formType,
    } = body as {
      name: string;
      phone: string;
      email: string;
      product: string;
      message: string;
      size?: string;
      material?: string;
      attachments?: Attachment[];
      formType?: "custom-order" | "product-interest";
    };

    if (!name || !phone || !email || !product) {
      return NextResponse.json(
        { error: "Missing required fields: name, phone, email, and product are required" },
        { status: 400 }
      );
    }

    // Determine subject based on form type
    const isProductInterest = formType === "product-interest";
    const subject = isProductInterest
      ? `Product Interest: ${product} from ${name}`
      : `Custom Order Request from ${name}`;

    // Build HTML content
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2 style="color: #1F3A5F; border-bottom: 2px solid #E3A008; padding-bottom: 10px;">
          ${isProductInterest ? "New Product Interest" : "New Custom Order Request"}
        </h2>
        <table style="border-collapse: collapse; width: 100%;">
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; width: 140px; color: #666;">Name:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Phone:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #1F3A5F;">${phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Email:</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #1F3A5F;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">${isProductInterest ? "Product:" : "Collection:"}</td>
            <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333; font-weight: 500;">${product}</td>
          </tr>
    `;

    // Add size if available
    if (size && size !== "N/A") {
      htmlContent += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Size/Dimensions:</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${size}</td>
        </tr>
      `;
    }

    // Add material if available
    if (material && material !== "N/A") {
      htmlContent += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; color: #666;">Material:</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${material}</td>
        </tr>
      `;
    }

    // Add message
    if (message && message !== "No additional message") {
      htmlContent += `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; font-weight: bold; vertical-align: top; color: #666;">Message:</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; color: #333;">${message.replace(/\n/g, "<br>")}</td>
        </tr>
      `;
    }

    htmlContent += `</table>`;

    // Add attachment note if images were uploaded
    if (attachments && attachments.length > 0) {
      htmlContent += `
        <p style="margin-top: 20px; padding: 10px; background: #f5f5f5; border-radius: 5px; color: #666;">
          📎 <strong>${attachments.length} image${attachments.length > 1 ? "s" : ""} attached</strong> (rough design${attachments.length > 1 ? "s" : ""})
        </p>
      `;
    }

    htmlContent += `
        <p style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
          This email was sent from the Windsor Materials website contact form.
        </p>
      </div>
    `;

    // Prepare nodemailer attachments
    const mailAttachments = attachments?.map((att) => ({
      filename: att.name,
      content: att.data,
      encoding: "base64" as const,
      contentType: att.type,
    }));

    const mailOptions = {
      from: `"Windsor Materials" <${process.env.GMAIL_EMAIL}>`,
      to: "windsormaterialandretailsupply@gmail.com",
      replyTo: email,
      subject,
      html: htmlContent,
      attachments: mailAttachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email error:", error);
    
    // Provide more specific error messages
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    
    if (errorMessage.includes("Invalid login") || errorMessage.includes("auth")) {
      return NextResponse.json(
        { error: "Email authentication failed. Please check email credentials." },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to send email. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}

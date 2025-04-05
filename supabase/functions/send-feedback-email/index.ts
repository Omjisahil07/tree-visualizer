
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface FeedbackRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message }: FeedbackRequest = await req.json();
    
    console.log("Received feedback from:", name, email);

    // Send confirmation email to the user
    const userEmailResponse = await resend.emails.send({
      from: "Data Structure Visualizer <onboarding@resend.dev>",
      to: [email],
      subject: "We received your feedback - Data Structure Visualizer",
      html: `
        <h1>Thank you for your feedback, ${name}!</h1>
        <p>We have received your message about "${subject}" and will review it soon.</p>
        <p>Here's what you sent us:</p>
        <blockquote>${message}</blockquote>
        <p>Best regards,<br>The Data Structure Visualizer Team</p>
      `,
    });
    
    // Send notification email to admin
    const adminEmailResponse = await resend.emails.send({
      from: "Data Structure Visualizer <onboarding@resend.dev>",
      to: ["admin@datastructurevisualizer.com"], // Replace with your actual admin email
      subject: `New Feedback: ${subject}`,
      html: `
        <h1>New Feedback Received</h1>
        <p><strong>From:</strong> ${name} (${email})</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <blockquote>${message}</blockquote>
      `,
    });

    console.log("Email sent to user:", userEmailResponse);
    console.log("Email sent to admin:", adminEmailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in send-feedback-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});

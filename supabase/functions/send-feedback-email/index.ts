
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
    console.log("Subject:", subject);
    console.log("Message:", message);

    // Send confirmation email to the user
    try {
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
        text: `Thank you for your feedback, ${name}! We have received your message about "${subject}" and will review it soon. Here's what you sent us: ${message}. Best regards, The Data Structure Visualizer Team`,
      });
      
      console.log("Email sent to user:", userEmailResponse);
    } catch (userEmailError) {
      console.error("Error sending user confirmation email:", userEmailError);
      // Continue with admin notification even if user email fails
    }
    
    // Send notification email to admin (ensure correct email and check spam)
    try {
      const adminEmailResponse = await resend.emails.send({
        from: "Data Structure Visualizer <onboarding@resend.dev>",
        to: ["houndsahil12345@gmail.com"], 
        subject: `New Feedback: ${subject}`,
        text: `New Feedback Received\nFrom: ${name} (${email})\nSubject: ${subject}\nMessage: ${message}`,
        html: `
          <h1>New Feedback Received</h1>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <blockquote>${message}</blockquote>
        `,
        tags: [
          {
            name: "category",
            value: "feedback",
          },
        ],
      });

      console.log("Email sent to admin:", adminEmailResponse);
    } catch (adminEmailError) {
      console.error("Error sending admin notification email:", adminEmailError);
      // Log but continue with successful response since we already stored in DB
    }

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

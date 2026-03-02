import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Rate limiting: max 5 submissions per hour per IP
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const MAX_SUBMISSIONS_PER_WINDOW = 5;
const rateLimitStore = new Map<string, { count: number; windowStart: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);
  if (!record || now - record.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (record.count >= MAX_SUBMISSIONS_PER_WINDOW) return true;
  record.count++;
  return false;
}

function validateName(name: string): { valid: boolean; error?: string } {
  const trimmed = name?.trim();
  if (!trimmed || trimmed.length === 0) return { valid: false, error: "Name is required" };
  if (trimmed.length < 2) return { valid: false, error: "Name must be at least 2 characters" };
  if (trimmed.length > 100) return { valid: false, error: "Name must be less than 100 characters" };
  return { valid: true };
}

function validateEmail(email: string): { valid: boolean; error?: string } {
  const trimmed = email?.trim().toLowerCase();
  if (!trimmed || trimmed.length === 0) return { valid: false, error: "Email is required" };
  if (trimmed.length > 255) return { valid: false, error: "Email must be less than 255 characters" };
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(trimmed)) return { valid: false, error: "Please enter a valid email address" };
  return { valid: true };
}

function validateMessage(message: string): { valid: boolean; error?: string } {
  const trimmed = message?.trim();
  if (!trimmed || trimmed.length === 0) return { valid: false, error: "Message is required" };
  if (trimmed.length < 10) return { valid: false, error: "Message must be at least 10 characters" };
  if (trimmed.length > 5000) return { valid: false, error: "Message must be less than 5000 characters" };
  return { valid: true };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
                     req.headers.get("cf-connecting-ip") || "unknown";

    if (isRateLimited(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many submissions. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json();
    const { name, email, message } = body;

    const nameValidation = validateName(name);
    if (!nameValidation.valid) {
      return new Response(JSON.stringify({ error: nameValidation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return new Response(JSON.stringify({ error: emailValidation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const messageValidation = validateMessage(message);
    if (!messageValidation.valid) {
      return new Response(JSON.stringify({ error: messageValidation.error }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabase
      .from("contact_messages")
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      });

    if (insertError) {
      console.error("Database insert error:", insertError.message);
      return new Response(
        JSON.stringify({ error: "Failed to submit message. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email notification via Resend
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["faturrahman3384@gmail.com"],
            subject: `New Contact Form Message from ${name.trim()}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #333; border-bottom: 2px solid #6366f1; padding-bottom: 10px;">New Contact Form Submission</h2>
                <div style="margin: 20px 0;">
                  <p><strong>Name:</strong> ${name.trim()}</p>
                  <p><strong>Email:</strong> <a href="mailto:${email.trim().toLowerCase()}">${email.trim().toLowerCase()}</a></p>
                </div>
                <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
                  <p><strong>Message:</strong></p>
                  <p style="white-space: pre-wrap;">${message.trim()}</p>
                </div>
                <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;" />
                <p style="color: #999; font-size: 12px;">Sent from your portfolio contact form</p>
              </div>
            `,
            reply_to: email.trim().toLowerCase(),
          }),
        });

        if (!emailResponse.ok) {
          const errText = await emailResponse.text();
          console.error("Resend email error:", errText);
        } else {
          await emailResponse.text();
          console.log("Email notification sent successfully");
        }
      } catch (emailErr) {
        console.error("Failed to send email notification:", emailErr);
      }
    }

    console.log(`Contact form submitted successfully from IP: ${clientIP}`);

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Edge function error:", error.message);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

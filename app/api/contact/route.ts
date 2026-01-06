// API Route for rehabilitation center contact requests
// MAINTAINER NOTE: This is a basic handler that validates and logs requests.
// For production, connect this to:
// - Supabase: Database storage + email trigger via function
// - Firebase: Firestore + Cloud Functions for notifications
// - EmailJS: Direct email delivery to support@hopeline.org
//
// Example Supabase integration:
// const { createServerClient } = require('@supabase/ssr')
// const supabase = createServerClient(...)
// const { error } = await supabase.from('contact_requests').insert([{ ... }])

export async function POST(request: Request) {
  try {
    const data = await request.json()

    // Validation
    if (!data.city || !data.phone || !data.message) {
      return Response.json(
        { ok: false, error: "Missing required fields" },
        { status: 400, headers: { "Access-Control-Allow-Origin": "*" } },
      )
    }

    // PLACEHOLDER: Log the request (in production, save to database)
    console.log("[HopeLine Contact Request]", {
      timestamp: new Date().toISOString(),
      ...data,
    })

    // PLACEHOLDER: Send email notification (in production)
    // await sendEmail({
    //   to: 'support@hopeline-sl.org',
    //   subject: 'New Rehab Support Request',
    //   body: `
    //     New support request from:
    //     City: ${data.city}
    //     Phone: ${data.phone}
    //     Type: ${data.assistanceType}
    //     Message: ${data.message}
    //   `
    // })

    return Response.json(
      { ok: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return Response.json(
      { ok: false, error: "Server error" },
      { status: 500, headers: { "Access-Control-Allow-Origin": "*" } },
    )
  }
}

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}

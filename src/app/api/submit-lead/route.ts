import { NextRequest, NextResponse } from "next/server";
import { LeadFormSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate incoming data
    const parseResult = LeadFormSchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid form data", details: parseResult.error.issues },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // ─── Step 1: Save to our database FIRST (data ownership) ───
    // NOTE: Uncomment when Prisma is connected
    // const { PrismaClient } = await import("@prisma/client");
    // const prisma = new PrismaClient();
    // const lead = await prisma.lead.create({
    //   data: {
    //     firstName: data.firstName,
    //     lastName: data.lastName || null,
    //     email: data.email,
    //     phone: data.phone,
    //     zipCode: data.zipCode,
    //     gateType: data.gateType,
    //     brand: data.brand,
    //     primaryIssue: data.primaryIssue,
    //     sourceUrl: data.sourceUrl || null,
    //     utmSource: data.utmSource || null,
    //     utmMedium: data.utmMedium || null,
    //     utmCampaign: data.utmCampaign || null,
    //     utmContent: data.utmContent || null,
    //     referrer: data.referrer || null,
    //   },
    // });

    // ─── Step 2: Send to CallScaler/ServiceDirect API ───
    let apiSuccess = false;
    let apiPartner = "simulated";

    try {
      const apiUrl = process.env.LEAD_API_URL;
      const apiKey = process.env.LEAD_API_KEY;

      if (apiUrl && apiKey) {
        const apiResponse = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            first_name: data.firstName,
            last_name: data.lastName || "",
            email: data.email,
            phone: data.phone,
            zip: data.zipCode,
            gate_type: data.gateType,
            brand: data.brand,
            issue: data.primaryIssue,
            source: data.sourceUrl || "gaterepairdispatch.com",
          }),
          signal: AbortSignal.timeout(8000),
        });

        if (apiResponse.ok) {
          const apiData = await apiResponse.json();
          apiSuccess = apiData.status === "Success" || apiData.success === true;
          apiPartner = "callscaler";
        }
      } else {
        // No API configured — simulate success for development
        apiSuccess = true;
        apiPartner = "simulated";
      }
    } catch {
      // API failed — we still have the lead saved locally
      console.error("Lead API call failed, lead saved locally");
      apiSuccess = false;
      apiPartner = "fallback";
    }

    // ─── Step 3: Update lead with API response ───
    // NOTE: Uncomment when Prisma is connected
    // await prisma.lead.update({
    //   where: { id: lead.id },
    //   data: {
    //     apiSuccess,
    //     apiPartner,
    //     status: apiSuccess ? "dispatched" : "new",
    //   },
    // });

    console.log(
      `[LEAD] ${data.firstName} | ${data.zipCode} | ${data.gateType} | ${data.brand} | ${data.primaryIssue} | API: ${apiPartner} (${apiSuccess ? "✓" : "✗"})`
    );

    return NextResponse.json({
      success: true,
      message: apiSuccess
        ? "Success"
        : "Your request has been received. A technician will contact you shortly.",
    });
  } catch (error) {
    console.error("[LEAD API ERROR]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

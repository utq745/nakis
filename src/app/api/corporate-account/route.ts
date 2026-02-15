import { NextResponse } from "next/server";

type CorporateAccountPayload = {
  companyName: string;
  website?: string;
  country: string;
  contactPerson: string;
  businessEmail: string;
  estimatedMonthlyVolume?: string;
  message?: string;
};

export async function POST(request: Request) {
  const payload = (await request.json()) as CorporateAccountPayload;

  if (!payload.companyName || !payload.country || !payload.contactPerson || !payload.businessEmail) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailDraft = {
    to: "admin@approvalstitch.com",
    subject: `New Corporate Account Registration - ${payload.companyName}`,
    text: [
      "A new corporate account registration request has been submitted.",
      "",
      `Company Name: ${payload.companyName}`,
      `Website: ${payload.website || "-"}`,
      `Country: ${payload.country}`,
      `Contact Person: ${payload.contactPerson}`,
      `Business Email: ${payload.businessEmail}`,
      `Estimated Monthly Volume: ${payload.estimatedMonthlyVolume || "-"}`,
      `Message: ${payload.message || "-"}`,
    ].join("\n"),
  };

  return NextResponse.json({ ok: true, emailDraft });
}

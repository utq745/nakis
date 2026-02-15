import type { Metadata } from "next";
import CorporateAccountContent from "./corporate-account-content";

export const metadata: Metadata = {
  title: "Corporate Production Account Registration | Approval Stitch",
  description:
    "Apply for a corporate production account with monthly invoicing and international wire transfer settlement.",
  alternates: {
    canonical: "/corporate-account",
  },
};

export default function CorporateAccountPage() {
  return <CorporateAccountContent />;
}

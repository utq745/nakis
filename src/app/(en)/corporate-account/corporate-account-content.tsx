"use client";

import { FormEvent, useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const INITIAL_FORM = {
  companyName: "",
  website: "",
  country: "",
  contactPerson: "",
  businessEmail: "",
  estimatedMonthlyVolume: "",
  message: "",
};

export default function CorporateAccountContent() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/corporate-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setSuccessMessage(
        "Thank you. Your corporate account request has been received. Our team will review your information and contact you shortly."
      );
      setForm(INITIAL_FORM);
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
      <Header />

      <main className="flex-grow pt-32 pb-20 bg-slate-50 dark:bg-[#172136]">
        <section className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto bg-card border border-border rounded-3xl shadow-xl p-8 md:p-10">
            <h1 className="text-3xl md:text-4xl font-black text-primary dark:text-white mb-4">
              Corporate Production Account Registration
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-8">
              ApprovalStitch operates on a corporate production account model.
              <br />
              Invoices are issued monthly and settled via international wire transfer.
              <br />
              Please provide your company details below to activate your account.
            </p>

            {successMessage && (
              <div className="mb-6 rounded-xl border border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-700 p-4 text-green-800 dark:text-green-300">
                {successMessage}
              </div>
            )}

            {errorMessage && (
              <div className="mb-6 rounded-xl border border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-700 p-4 text-red-800 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2">Company Name *</label>
                <input
                  id="companyName"
                  required
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-sm font-medium mb-2">Website</label>
                <input
                  id="website"
                  type="url"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                />
              </div>

              <div>
                <label htmlFor="country" className="block text-sm font-medium mb-2">Country *</label>
                <input
                  id="country"
                  required
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                />
              </div>

              <div>
                <label htmlFor="contactPerson" className="block text-sm font-medium mb-2">Contact Person *</label>
                <input
                  id="contactPerson"
                  required
                  value={form.contactPerson}
                  onChange={(e) => setForm({ ...form, contactPerson: e.target.value })}
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                />
              </div>

              <div>
                <label htmlFor="businessEmail" className="block text-sm font-medium mb-2">Business Email *</label>
                <input
                  id="businessEmail"
                  required
                  type="email"
                  value={form.businessEmail}
                  onChange={(e) => setForm({ ...form, businessEmail: e.target.value })}
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                />
              </div>

              <div>
                <label htmlFor="estimatedMonthlyVolume" className="block text-sm font-medium mb-2">Estimated Monthly Volume</label>
                <input
                  id="estimatedMonthlyVolume"
                  value={form.estimatedMonthlyVolume}
                  onChange={(e) => setForm({ ...form, estimatedMonthlyVolume: e.target.value })}
                  className="w-full h-12 rounded-xl border border-border bg-background px-4"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message (optional)</label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="h-12 px-6 rounded-xl bg-primary text-white font-bold hover:opacity-90 disabled:opacity-60 transition-opacity"
              >
                {isSubmitting ? "Submitting..." : "Submit Registration"}
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

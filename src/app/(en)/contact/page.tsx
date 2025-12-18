"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ContactPage() {
    const { t, language } = useLanguage();
    const cp = t.contactPage;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSuccess(true);
        setIsLoading(false);
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#101622] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow pt-24 md:pt-32">
                {/* Hero Section */}
                <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 pb-12 text-center">
                    <h1 className="font-black text-[#111318] dark:text-white tracking-tight mb-4">
                        {cp.title}
                    </h1>
                    <p className="text-lg text-[#616f89] dark:text-gray-400 max-w-[600px] mx-auto">
                        {cp.subtitle}
                    </p>
                </section>

                {/* Main Content */}
                <section className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                        {/* Left Side - Contact Info */}
                        <div className="space-y-10">
                            {/* Quick Contact Card */}
                            <div className="bg-white dark:bg-[#18212f] rounded-2xl p-8 shadow-lg border border-[#e5e7eb] dark:border-[#2a3441]">
                                <h2 className="text-2xl font-bold text-[#111318] dark:text-white mb-6">
                                    {cp.quickContactTitle}
                                </h2>

                                <div className="space-y-4">
                                    {/* Email */}
                                    <a
                                        href={`mailto:${cp.email}`}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] hover:bg-[#135bec]/10 dark:hover:bg-[#135bec]/10 transition-colors group"
                                    >
                                        <div className="flex items-center justify-center size-12 rounded-full bg-[#135bec]/10 text-[#135bec] group-hover:bg-[#135bec] group-hover:text-white transition-colors">
                                            <span className="material-symbols-outlined text-2xl">mail</span>
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#616f89] dark:text-gray-400">Email</p>
                                            <p className="font-semibold text-[#111318] dark:text-white">{cp.email}</p>
                                        </div>
                                    </a>

                                    {/* WhatsApp */}
                                    <a
                                        href="https://wa.me/905488588394"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f8f9fc] dark:bg-[#1f2937] hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors group"
                                    >
                                        <div className="flex items-center justify-center size-12 rounded-full bg-green-100 text-green-600 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-sm text-[#616f89] dark:text-gray-400">WhatsApp</p>
                                            <p className="font-semibold text-[#111318] dark:text-white">+90 548 858 8394</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="mt-6 pt-6 border-t border-[#e5e7eb] dark:border-[#2a3441]">
                                    <p className="text-[#616f89] dark:text-gray-400 text-sm">
                                        {cp.sendUsInfo}
                                    </p>
                                    <p className="mt-2 text-[#111318] dark:text-white font-semibold flex items-center gap-2">
                                        <span className="material-symbols-outlined text-green-500">schedule</span>
                                        {cp.replyTime}
                                    </p>
                                </div>
                            </div>

                            {/* What Happens Next */}
                            <div className="bg-white dark:bg-[#18212f] rounded-2xl p-8 shadow-lg border border-[#e5e7eb] dark:border-[#2a3441]">
                                <h2 className="text-2xl font-bold text-[#111318] dark:text-white mb-6">
                                    {cp.whatHappensTitle}
                                </h2>

                                <div className="space-y-4">
                                    {[
                                        { num: "1", text: cp.step1 },
                                        { num: "2", text: cp.step2 },
                                        { num: "3", text: cp.step3 },
                                        { num: "4", text: cp.step4 },
                                    ].map((step, index) => (
                                        <div key={index} className="flex gap-4">
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#135bec] text-white flex items-center justify-center font-bold text-sm">
                                                {step.num}
                                            </div>
                                            <p className="text-[#616f89] dark:text-gray-400 pt-1">
                                                {step.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="bg-white dark:bg-[#18212f] rounded-2xl p-8 shadow-lg border border-[#e5e7eb] dark:border-[#2a3441] h-fit">
                            <h2 className="text-2xl font-bold text-[#111318] dark:text-white mb-6">
                                {cp.formTitle}
                            </h2>

                            {success && (
                                <div className="mb-6 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                                    <p className="text-green-600 dark:text-green-400 flex items-center gap-2">
                                        <span className="material-symbols-outlined">check_circle</span>
                                        {t.common.success}
                                    </p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-[#111318] dark:text-white mb-2">
                                        {cp.nameLabel}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder={cp.namePlaceholder}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-[#374151] bg-white dark:bg-[#1f2937] text-[#111318] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-[#111318] dark:text-white mb-2">
                                        {cp.emailLabel}
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder={cp.emailPlaceholder}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-[#374151] bg-white dark:bg-[#1f2937] text-[#111318] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-sm font-medium text-[#111318] dark:text-white mb-2">
                                        {cp.subjectLabel}
                                    </label>
                                    <select
                                        required
                                        value={formData.subject}
                                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-[#374151] bg-white dark:bg-[#1f2937] text-[#111318] dark:text-white focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all"
                                    >
                                        <option value="">{cp.subjectPlaceholder}</option>
                                        <option value="quote">{cp.subjects.quote}</option>
                                        <option value="digitizing">{cp.subjects.digitizing}</option>
                                        <option value="sample">{cp.subjects.sample}</option>
                                        <option value="support">{cp.subjects.support}</option>
                                        <option value="other">{cp.subjects.other}</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-sm font-medium text-[#111318] dark:text-white mb-2">
                                        {cp.messageLabel}
                                    </label>
                                    <textarea
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        placeholder={cp.messagePlaceholder}
                                        className="w-full px-4 py-3 rounded-lg border border-[#e5e7eb] dark:border-[#374151] bg-white dark:bg-[#1f2937] text-[#111318] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#135bec] focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* File Attachment */}
                                <div>
                                    <label className="block text-sm font-medium text-[#111318] dark:text-white mb-2">
                                        {cp.attachLabel}
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept=".dst,.dts,.pes,.jef,.exp,.vp3,.hus,.png,.jpg,.jpeg,.pdf,.ai,.eps"
                                            className="w-full px-4 py-3 rounded-lg border border-dashed border-[#e5e7eb] dark:border-[#374151] bg-[#f8f9fc] dark:bg-[#1f2937] text-[#111318] dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#135bec]/10 file:text-[#135bec] hover:file:bg-[#135bec]/20 transition-all cursor-pointer"
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-lg bg-[#135bec] text-white font-bold text-lg hover:bg-[#0d47c9] transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            {t.common.loading}
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined">send</span>
                                            {cp.sendButton}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

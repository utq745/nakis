"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function ContactPage() {
    const { t } = useLanguage();
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

    const contactMethods = [
        {
            icon: "mail",
            label: "Email",
            value: cp.email,
            href: `mailto:${cp.email}`,
            color: "from-[#145BEC] to-[#0d47c9]"
        },
        {
            icon: "whatsapp",
            label: "WhatsApp",
            value: "+90 548 858 8394",
            href: "https://wa.me/905488588394",
            color: "from-green-500 to-green-600",
            isWhatsApp: true
        }
    ];

    const steps = [
        { num: "1", text: cp.step1, icon: "send" },
        { num: "2", text: cp.step2, icon: "visibility" },
        { num: "3", text: cp.step3, icon: "reply" },
        { num: "4", text: cp.step4, icon: "handshake" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-[#172136]">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#145BEC]/20 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/15 blur-[100px] rounded-full"
                        />
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>contact_support</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Get In Touch</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2rem,4vw,3.5rem)]">
                                {cp.title}
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[600px] mx-auto">
                                {cp.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

                            {/* Left Side - Contact Info */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* Quick Contact Methods */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white dark:bg-[#18181b] rounded-3xl p-8 shadow-xl border border-[#e5e7eb] dark:border-[#27272a]"
                                >
                                    <h2 className="text-xl font-bold text-[#111318] dark:text-white mb-6">
                                        {cp.quickContactTitle}
                                    </h2>

                                    <div className="space-y-4">
                                        {contactMethods.map((method, index) => (
                                            <a
                                                key={index}
                                                href={method.href}
                                                target={method.isWhatsApp ? "_blank" : undefined}
                                                rel={method.isWhatsApp ? "noopener noreferrer" : undefined}
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-[#f4f6fa] dark:bg-[#0a0a0a] hover:scale-[1.02] transition-all group"
                                            >
                                                <div className={`flex items-center justify-center size-14 rounded-xl bg-gradient-to-br ${method.color} text-white shadow-lg`}>
                                                    {method.isWhatsApp ? (
                                                        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                        </svg>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-3xl">{method.icon}</span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm text-[#616f89] dark:text-gray-400">{method.label}</p>
                                                    <p className="font-bold text-[#111318] dark:text-white">{method.value}</p>
                                                </div>
                                                <span className="material-symbols-outlined ml-auto text-[#616f89] dark:text-gray-500 group-hover:text-[#145BEC] transition-colors">arrow_forward</span>
                                            </a>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-[#e5e7eb] dark:border-[#27272a] flex items-center gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-full bg-green-100 dark:bg-green-900/30">
                                            <span className="material-symbols-outlined text-green-500" style={{ fontSize: '20px' }}>schedule</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#616f89] dark:text-gray-400">{cp.sendUsInfo}</p>
                                            <p className="text-sm font-bold text-[#111318] dark:text-white">{cp.replyTime}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* What Happens Next */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="bg-white dark:bg-[#18181b] rounded-3xl p-8 shadow-xl border border-[#e5e7eb] dark:border-[#27272a]"
                                >
                                    <h2 className="text-xl font-bold text-[#111318] dark:text-white mb-6">
                                        {cp.whatHappensTitle}
                                    </h2>

                                    <div className="space-y-4">
                                        {steps.map((step, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                                className="flex gap-4 items-start"
                                            >
                                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#145BEC] to-[#0d47c9] text-white flex items-center justify-center font-bold text-sm shadow-lg">
                                                    {step.num}
                                                </div>
                                                <div className="pt-2">
                                                    <p className="text-[#616f89] dark:text-gray-400 text-sm">
                                                        {step.text}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Side - Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:col-span-3 bg-white dark:bg-[#18181b] rounded-3xl p-8 shadow-xl border border-[#e5e7eb] dark:border-[#27272a]"
                            >
                                <h2 className="text-xl font-bold text-[#111318] dark:text-white mb-6">
                                    {cp.formTitle}
                                </h2>

                                {success && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                                    >
                                        <p className="text-green-600 dark:text-green-400 flex items-center gap-2 font-medium">
                                            <span className="material-symbols-outlined">check_circle</span>
                                            {t.common.success}
                                        </p>
                                    </motion.div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                                                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] dark:border-[#27272a] bg-[#f4f6fa] dark:bg-[#0a0a0a] text-[#111318] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#145BEC] focus:border-transparent transition-all"
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
                                                className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] dark:border-[#27272a] bg-[#f4f6fa] dark:bg-[#0a0a0a] text-[#111318] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#145BEC] focus:border-transparent transition-all"
                                            />
                                        </div>
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
                                            className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] dark:border-[#27272a] bg-[#f4f6fa] dark:bg-[#0a0a0a] text-[#111318] dark:text-white focus:ring-2 focus:ring-[#145BEC] focus:border-transparent transition-all"
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
                                            className="w-full px-4 py-3 rounded-xl border border-[#e5e7eb] dark:border-[#27272a] bg-[#f4f6fa] dark:bg-[#0a0a0a] text-[#111318] dark:text-white placeholder-[#9ca3af] focus:ring-2 focus:ring-[#145BEC] focus:border-transparent transition-all resize-none"
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
                                                className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-[#e5e7eb] dark:border-[#27272a] bg-[#f4f6fa] dark:bg-[#0a0a0a] text-[#111318] dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#145BEC]/10 file:text-[#145BEC] hover:file:bg-[#145BEC]/20 transition-all cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-[#145BEC] to-[#0d47c9] text-white font-bold text-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 bg-[#172136]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#145BEC] to-[#0d47c9] p-12 md:p-16 text-center max-w-4xl mx-auto">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-white/30 mb-4" style={{ fontSize: '60px' }}>support_agent</span>
                                <h2 className="font-black text-white mb-4">Prefer Direct Communication?</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    Reach us instantly via WhatsApp for quick responses and real-time support.
                                </p>
                                <a href="https://wa.me/905488588394" target="_blank" rel="noopener noreferrer">
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-green-600 font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                        Chat on WhatsApp
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

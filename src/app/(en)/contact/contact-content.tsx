"use client";

import { useState } from "react";
import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";
import { HeroBackground } from "@/components/landing/hero-background";

export default function ContactContent() {
    const { t } = useLanguage();
    const cp = t.contactPage;

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = cp.validation.nameRequired;
        }
        if (!formData.email.trim()) {
            errors.email = cp.validation.emailRequired;
        } else if (!validateEmail(formData.email)) {
            errors.email = cp.validation.emailInvalid;
        }
        if (!formData.message.trim()) {
            errors.message = cp.validation.messageRequired;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        setSuccess(true);
        setIsLoading(false);
        setFormData({ name: "", email: "", message: "" });
        setFormErrors({});

        // Reset success message after 3 seconds
        setTimeout(() => setSuccess(false), 3000);
    };

    const contactMethods = [
        {
            icon: "mail",
            label: "Email",
            value: cp.email,
            href: `mailto:${cp.email}`,
            color: "from-primary to-primary-dark"
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


    return (
        <div className="flex flex-col min-h-screen bg-background font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow" id="main-content">
                {/* Hero Section */}
                <section className="relative pt-32 pb-48 md:pt-40 md:pb-64 overflow-hidden bg-slate-50 dark:bg-[#172136]">
                    <HeroBackground />

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 dark:bg-white/10 border border-primary/10 dark:border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-primary dark:text-white" style={{ fontSize: '20px' }}>contact_support</span>
                                <span className="text-primary dark:text-white/90 text-sm font-bold uppercase tracking-wider">Get In Touch</span>
                            </div>

                            <h1 className="text-primary dark:text-white font-black leading-[1.1] mb-6 text-[clamp(2rem,4vw,3.5rem)]">
                                {cp.title}
                            </h1>
                            <p className="text-slate-600 dark:text-white/70 text-lg md:text-xl max-w-[600px] mx-auto">
                                {cp.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Content */}
                <section className="py-24 md:py-32 -mt-32 md:-mt-48 relative z-20 dark:bg-gradient-to-b dark:from-transparent dark:via-[#111318] dark:to-[#111318] dark:via-[15%]">
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
                                    className="bg-card rounded-3xl p-8 shadow-xl border border-border"
                                >
                                    <h2 className="text-xl mb-6">
                                        {cp.quickContactTitle}
                                    </h2>

                                    <div className="space-y-4">
                                        {contactMethods.map((method, index) => (
                                            <div key={index}>
                                                <a
                                                    href={method.href}
                                                    target={method.isWhatsApp ? "_blank" : undefined}
                                                    rel={method.isWhatsApp ? "noopener noreferrer" : undefined}
                                                    className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 dark:bg-muted/10 hover:scale-[1.02] transition-all group"
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
                                                        <p className="text-sm text-muted-foreground">{method.label}</p>
                                                        <p className="font-bold text-foreground">{method.value}</p>
                                                    </div>
                                                    <span className="material-symbols-outlined ml-auto text-muted-foreground group-hover:text-primary transition-colors">arrow_forward</span>
                                                </a>
                                                {method.isWhatsApp && (
                                                    <p className="text-xs text-muted-foreground mt-2 ml-2" dangerouslySetInnerHTML={{ __html: cp.whatsappNote }} />
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-full bg-green-100 dark:bg-green-900/30">
                                            <span className="material-symbols-outlined text-green-500" style={{ fontSize: '20px' }}>schedule</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-muted-foreground">{cp.sendUsInfo}</p>
                                            <p className="text-sm font-bold text-foreground">{cp.replyTime}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Side - Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="lg:col-span-3 bg-card rounded-3xl p-8 shadow-xl border border-border"
                            >
                                <h2 className="text-xl mb-6">
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
                                            <label htmlFor="name-input" className="block text-sm font-medium text-foreground mb-2">
                                                {cp.nameLabel}
                                            </label>
                                            <input
                                                id="name-input"
                                                type="text"
                                                required
                                                value={formData.name}
                                                onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setFormErrors({ ...formErrors, name: "" }); }}
                                                placeholder={cp.namePlaceholder}
                                                aria-invalid={!!formErrors.name}
                                                aria-describedby={formErrors.name ? "name-error" : undefined}
                                                className={`w-full px-4 py-3 rounded-xl border ${formErrors.name ? 'border-destructive' : 'border-border'} bg-muted/50 dark:bg-muted/10 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                            />
                                            {formErrors.name && <p id="name-error" className="mt-1 text-sm text-red-500" role="alert">{formErrors.name}</p>}
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email-input" className="block text-sm font-medium text-foreground mb-2">
                                                {cp.emailLabel}
                                            </label>
                                            <input
                                                id="email-input"
                                                type="email"
                                                required
                                                value={formData.email}
                                                onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setFormErrors({ ...formErrors, email: "" }); }}
                                                placeholder={cp.emailPlaceholder}
                                                aria-invalid={!!formErrors.email}
                                                aria-describedby={formErrors.email ? "email-error" : undefined}
                                                className={`w-full px-4 py-3 rounded-xl border ${formErrors.email ? 'border-destructive' : 'border-border'} bg-muted/50 dark:bg-muted/10 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all`}
                                            />
                                            {formErrors.email && <p id="email-error" className="mt-1 text-sm text-red-500" role="alert">{formErrors.email}</p>}
                                        </div>
                                    </div>


                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message-textarea" className="block text-sm font-medium text-foreground mb-2">
                                            {cp.messageLabel}
                                        </label>
                                        <textarea
                                            id="message-textarea"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setFormErrors({ ...formErrors, message: "" }); }}
                                            placeholder={cp.messagePlaceholder}
                                            aria-invalid={!!formErrors.message}
                                            aria-describedby={formErrors.message ? "message-error" : undefined}
                                            className={`w-full px-4 py-3 rounded-xl border ${formErrors.message ? 'border-destructive' : 'border-border'} bg-muted/50 dark:bg-muted/10 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none`}
                                        />
                                        {formErrors.message && <p id="message-error" className="mt-1 text-sm text-red-500" role="alert">{formErrors.message}</p>}
                                    </div>

                                    {/* File Attachment */}
                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {cp.attachLabel}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept=".dst,.dts,.pes,.jef,.exp,.vp3,.hus,.png,.jpg,.jpeg,.pdf,.ai,.eps"
                                                className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-border bg-muted/50 dark:bg-muted/10 text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary dark:file:text-white hover:file:bg-primary/20 transition-all cursor-pointer"
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-2" dangerouslySetInnerHTML={{ __html: cp.attachNote }} />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
                                    <p className="text-center text-xs text-muted-foreground mt-3" dangerouslySetInnerHTML={{ __html: cp.orderCtaNote }} />
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { motion } from "framer-motion";

export default function FAQPage() {
    const { language } = useLanguage();

    const faqCategories = [
        {
            title: "Services & Pricing",
            questions: [
                {
                    q: "What is an 'Approval Card'?",
                    a: "An Approval Card is a high-resolution scan of your design actually stitched on a Tajima embroidery machine. It includes precise measurements, color codes, stitch counts, and density technicals so you can be 100% sure of the result before mass production."
                },
                {
                    q: "Do you offer bulk discounts?",
                    a: "Yes! While our per-design pricing is transparent for single orders, we offer tailored pricing for companies with high-volume monthly digitizing needs. Please contact us for a corporate account."
                },
                {
                    q: "How does the 'Fix Your DST' service work?",
                    a: "If you have an existing DST file that isn't running well, you send it to us. We analyze it, fix the technical issues (density, underlay, pathing), and then stitch it to prove the fix. You pay for the solution, not the attempts."
                }
            ]
        },
        {
            title: "Technical Details",
            questions: [
                {
                    q: "What file formats do you accept?",
                    a: "For new digitizing, we accept AI, PDF, PNG, JPG, and EPS. For editing/fixing, we primarily work with DST files, but can handle EMB, PES, JEF, and HUS as well."
                },
                {
                    q: "What machines are used for samples?",
                    a: "We only use Tajima industrial embroidery machines (TFMX and TMBR series) to ensure the highest possible precision that translates perfectly to your production floor."
                },
                {
                    q: "Can you handle 3D Puff or specialty threads?",
                    a: "Absolutely. We specialize in 3D Puff, appliqué, and specialty thread pathing (metallic, fire-resistant). Just specify your requirements when uploading."
                }
            ]
        },
        {
            title: "Turnaround & Support",
            questions: [
                {
                    q: "What is your standard turnaround time?",
                    a: "Digital files and stitched scans are typically delivered within 24-48 hours. Rush service (12 hours) is available for an additional fee."
                },
                {
                    q: "What if I'm not happy with the sample?",
                    a: "Our goal is production-ready perfection. We offer revisions until the sample meets the high quality standards required for your specific fabric and machine type."
                },
                {
                    q: "How do I receive my final files?",
                    a: "Once you approve the digital scan and pay the balance, the production-ready DST files and technical sheets are immediately available for download in your dashboard."
                }
            ]
        }
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
                            className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#145BEC]/20 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/15 blur-[100px] rounded-full"
                        />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                                <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>help</span>
                                <span className="text-white/90 text-sm font-bold uppercase tracking-wider">Common Questions</span>
                            </div>

                            <h1 className="text-white font-black leading-[1.1] mb-6 text-[clamp(2.5rem,5vw,4.5rem)]">
                                Frequently Asked Questions
                            </h1>
                            <p className="text-white/70 text-lg md:text-xl max-w-[700px] mx-auto">
                                Everything you need to know about our digitizing process, approval samples, and industrial embroidery standards.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Content */}
                <section className="py-20 -mt-32 md:-mt-48 relative z-20">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 gap-12">
                                {faqCategories.map((category, catIndex) => (
                                    <motion.div
                                        key={catIndex}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                                    >
                                        <h2 className={`text-2xl font-black mb-8 flex items-center gap-3 ${catIndex === 0 ? 'text-white' : 'text-[#172136] dark:text-white'}`}>
                                            <span className="w-1.5 h-8 bg-[#145BEC] rounded-full"></span>
                                            {category.title}
                                        </h2>
                                        <div className="space-y-4">
                                            {category.questions.map((faq, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-white dark:bg-[#18181b] rounded-2xl p-6 md:p-8 border border-[#e5e7eb] dark:border-[#27272a] shadow-lg hover:shadow-xl transition-all"
                                                >
                                                    <h3 className="font-bold text-lg text-[#111318] dark:text-white mb-4">
                                                        {faq.q}
                                                    </h3>
                                                    <p className="text-[#616f89] dark:text-gray-400 leading-relaxed text-base">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Still Have Questions? */}
                <section className="py-24 bg-[#111114] text-white">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <div className="max-w-2xl mx-auto">
                            <h2 className="font-black text-white mb-4">Still Have Questions?</h2>
                            <p className="text-white/70 mb-10 text-lg">
                                Can't find the answer you're looking for? Reach out to our technical support team.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href={language === 'tr' ? '/tr/contact' : '/contact'}
                                    className="px-8 py-4 bg-[#145BEC] text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20"
                                >
                                    Contact Support
                                </a>
                                <a
                                    href="https://wa.me/905488588394"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                                >
                                    Chat with Us
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

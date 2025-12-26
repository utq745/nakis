"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
    const { t, language } = useLanguage();

    const experienceItems = [
        { icon: "layers", title: "Density & Underlay", desc: "Optimal stitch density and underlay structure for every fabric type" },
        { icon: "swap_horiz", title: "Push-Pull Compensation", desc: "Precise adjustments for fabric distortion prevention" },
        { icon: "settings", title: "Thread Selection", desc: "Expert thread and needle pairing for best results" },
        { icon: "dashboard_customize", title: "Stabilizer Choice", desc: "Fabric-specific stabilizer recommendations" },
        { icon: "text_fields", title: "Small Text Tuning", desc: "Optimized legibility for fine lettering" },
        { icon: "texture", title: "Fabric Analysis", desc: "Behavior prediction based on material properties" },
    ];

    const deliverItems = [
        { icon: "precision_manufacturing", text: "Real stitched test on calibrated Tajima" },
        { icon: "photo_camera", text: "High-resolution scan of result" },
        { icon: "badge", text: "Approval card in your template" },
        { icon: "palette", text: "Thread color list (Madeira / Robison-Anton / Isacord)" },
        { icon: "assignment", text: "Needle & stabilizer details" },
        { icon: "folder_zip", text: "Production-ready DST file" },
    ];

    const stats = [
        { value: "35+", label: "Years Experience" },
        { value: "10K+", label: "Projects Completed" },
        { value: "24h", label: "Avg. Turnaround" },
        { value: "100%", label: "Accuracy Rate" },
    ];

    return (
        <div className="flex flex-col min-h-screen bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)]">
            <Header />

            <main className="flex-grow">
                {/* Hero Section */}
                <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-[#172136]">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 45, 0] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#145BEC]/15 blur-[120px] rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2], rotate: [0, -45, 0] }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/10 blur-[120px] rounded-full"
                        />
                        <div className="absolute inset-0 opacity-5" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '40px 40px'
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10 py-20">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
                                    <span className="size-2 rounded-full bg-[#145BEC] animate-pulse" />
                                    <span className="text-white/80 text-xs font-bold tracking-[0.2em] uppercase">Who We Are</span>
                                </div>

                                <h1 className="text-white font-black leading-[1.1] mb-8 text-[clamp(2.5rem,5vw,4rem)]">
                                    Real Stitching.<br />
                                    <span className="bg-gradient-to-r from-[#145BEC] to-[#4f86f7] bg-clip-text text-transparent">
                                        Real Results.
                                    </span>
                                </h1>

                                <p className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-[500px]">
                                    A specialized studio focused on producing real stitched approval samples for brands, manufacturers and promotional companies worldwide.
                                </p>

                                <div className="flex items-center gap-3 text-white/60">
                                    <span className="material-symbols-outlined">location_on</span>
                                    <span>Based in Istanbul, serving clients across the U.S., Canada and Europe.</span>
                                </div>
                            </motion.div>

                            {/* Right Stats */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="grid grid-cols-2 gap-6"
                            >
                                {stats.map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300"
                                    >
                                        <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.value}</p>
                                        <p className="text-white/60 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Story Section */}
                <section className="py-24 bg-white dark:bg-[#0f0f0f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-[#145BEC]/20 rounded-2xl" />
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#145BEC]/10 rounded-2xl" />
                                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/Stitching-machine.webp"
                                        alt="Tajima Calibrated Single-Head Machine"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            </div>
                            <div>
                                <span className="text-[#145BEC] font-bold text-sm uppercase tracking-wider">Our Story</span>
                                <h2 className="font-black text-[#111318] dark:text-white mt-4 mb-6">
                                    35+ Years of Embroidery Excellence
                                </h2>
                                <p className="text-lg text-[#616f89] dark:text-gray-400 leading-relaxed mb-6">
                                    We run your existing embroidery file on a calibrated Tajima machine, then provide a clean, detailed high-resolution scan that reflects the true stitch result — not an estimate or simulation.
                                </p>
                                <p className="text-[#616f89] dark:text-gray-400 leading-relaxed">
                                    With decades of hands-on experience, we understand how stitches behave under real conditions. Every file is tested, every result is verified.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Experience Grid */}
                <section className="py-24 bg-[#f4f6fa] dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-16">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#145BEC]/10 text-[#145BEC] text-sm font-bold mb-4">
                                <span className="material-symbols-outlined text-lg">workspace_premium</span>
                                Our Expertise
                            </span>
                            <h2 className="font-black text-[#111318] dark:text-white mb-4">
                                Technical Precision in Every Detail
                            </h2>
                            <p className="text-lg text-[#616f89] dark:text-gray-400 max-w-[600px] mx-auto">
                                Every stitched sample is prepared and scanned to reveal the exact machine performance.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {experienceItems.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group bg-white dark:bg-[#18181b] rounded-2xl p-6 border border-[#e5e7eb] dark:border-[#27272a] hover:border-[#145BEC] dark:hover:border-[#145BEC] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#145BEC]/10 text-[#145BEC] group-hover:bg-[#145BEC] group-hover:text-white transition-colors mb-4">
                                        <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                    </div>
                                    <h4 className="font-bold text-[#111318] dark:text-white mb-2">{item.title}</h4>
                                    <p className="text-sm text-[#616f89] dark:text-gray-400">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What We Deliver */}
                <section className="py-24 bg-white dark:bg-[#0f0f0f]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <span className="text-[#145BEC] font-bold text-sm uppercase tracking-wider">What We Deliver</span>
                                <h2 className="font-black text-[#111318] dark:text-white mt-4 mb-6">
                                    Complete Approval Package
                                </h2>
                                <p className="text-[#616f89] dark:text-gray-400 leading-relaxed mb-8">
                                    Your selected approval-card template defines the layout, size, labeling and measurement style of your final sample.
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#145BEC] text-white font-bold hover:bg-blue-600 transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        Get Started
                                    </button>
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                {deliverItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-[#f4f6fa] dark:bg-[#18181b] border border-transparent hover:border-[#145BEC]/30 transition-all"
                                    >
                                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#145BEC] to-[#0d47c9] text-white shadow-lg">
                                            <span className="material-symbols-outlined">{item.icon}</span>
                                        </div>
                                        <p className="font-medium text-[#111318] dark:text-white flex-1">{item.text}</p>
                                        <span className="material-symbols-outlined text-green-500">check_circle</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission Section */}
                <section className="py-24 bg-[#111318] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        }} />
                    </div>

                    <div className="container mx-auto px-4 md:px-6 relative z-10">
                        <div className="text-center max-w-4xl mx-auto">
                            <h2 className="font-black text-white mb-8">Our Mission</h2>
                            <p className="text-xl text-gray-300 leading-relaxed mb-8">
                                Our mission is to bring certainty, clarity and precision to the embroidery production process. Most problems in mass production come from assumptions: density issues, thread breaks, unreadable small text, incorrect compensation or unexpected distortion on specific fabrics.
                            </p>
                            <blockquote className="text-2xl md:text-3xl font-bold text-white italic border-l-4 border-[#145BEC] pl-6 text-left">
                                "Test it for real, verify it for real, and send a result that removes all uncertainty."
                            </blockquote>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
                            {[
                                { icon: "verified", text: "Confidence to brands", color: "from-blue-500 to-indigo-500" },
                                { icon: "visibility", text: "Clarity to production teams", color: "from-purple-500 to-pink-500" },
                                { icon: "sync", text: "Consistency to factories", color: "from-orange-500 to-red-500" },
                            ].map((goal, index) => (
                                <div key={index} className="text-center p-8">
                                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${goal.color} text-white mb-4 shadow-lg`}>
                                        <span className="material-symbols-outlined text-4xl">{goal.icon}</span>
                                    </div>
                                    <p className="text-xl font-bold text-white">{goal.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-[#f4f6fa] dark:bg-[#0a0a0a]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#145BEC] to-[#0d47c9] p-12 md:p-20 text-center">
                            <div className="absolute top-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-3xl" />

                            <div className="relative z-10">
                                <span className="material-symbols-outlined text-white/30 mb-6" style={{ fontSize: '80px' }}>rocket_launch</span>
                                <h2 className="font-black text-white mb-4">Ready to Get Started?</h2>
                                <p className="text-xl text-white/80 mb-8 max-w-[500px] mx-auto">
                                    Turn your DST file into a production-ready stitched approval.
                                </p>
                                <Link href={language === 'tr' ? '/tr/contact' : '/contact'}>
                                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#145BEC] font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                        Start Your Order
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

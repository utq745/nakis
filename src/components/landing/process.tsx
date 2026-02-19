"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";


export function Process() {
    const { t } = useLanguage();
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);
    const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
    const [imageFallbacks, setImageFallbacks] = useState<Record<string, number>>({});
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const steps = [
        {
            step: "01",
            title: t.landing.process.step1Title,
            desc: t.landing.process.step1Desc,
            image: "/images/landing/make-order.webp",
            video: "/videos/landing/new-order.webm"
        },
        {
            step: "02",
            title: t.landing.process.step2Title,
            desc: t.landing.process.step2Desc,
            image: "/images/landing/What_You_Receive_Real_stitched_photos.webp",
            video: "/videos/landing/Real-Approval-Stitch.webm"
        },
        {
            step: "03",
            title: t.landing.process.step3Title,
            desc: t.landing.process.step3Desc,
            image: "/images/landing/approval-package.webp",
            isImagePopup: true
        },
        {
            step: "04",
            title: t.landing.process.step4Title,
            desc: t.landing.process.step4Desc,
            image: "/images/landing/account-billing.webp",
            isCorporate: true
        },
    ];

    return (
        <section className="w-full py-24 md:py-32 bg-[#e8f3ff] dark:bg-[#18212F] relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="0" cy="0" r="40" fill="url(#grad1)" />
                    <defs>
                        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="var(--primary)" stopOpacity="1" />
                            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-3 mb-20 md:mb-28">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[700px] tracking-tight text-foreground dark:text-white font-black"
                    >
                        {t.landing.process.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="max-w-[600px] text-muted-foreground text-lg md:text-xl"
                    >
                        {t.landing.process.description}
                    </motion.p>
                </div>

                <div className="relative">
                    {/* Connector Line (visible on desktop) */}
                    <div className="hidden lg:block absolute top-[50px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary/20 dark:via-white/10 to-transparent z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10 relative z-10">
                        {steps.map((item, index) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, delay: index * 0.4, ease: "easeOut" }}
                                className="relative group flex flex-col items-center lg:items-start"
                            >
                                {/* Step Image & Badge Container */}
                                <div className="relative z-20 mb-10 w-full aspect-[4/3] group-hover:scale-[1.02] transition-transform duration-500">
                                    {/* Image Canvas */}
                                    <div
                                        className={`w-full h-full rounded-[2rem] bg-white dark:bg-[#1c2637] border-2 border-primary/20 dark:border-white/10 shadow-xl dark:shadow-2xl group-hover:border-primary transition-all duration-500 flex items-center justify-center overflow-hidden relative ${(item.video || item.isCorporate || item.isImagePopup) ? 'cursor-pointer' : ''}`}
                                        onClick={() => {
                                            if (item.video) setSelectedVideo(item.video);
                                            if (item.isCorporate) setIsCorporateModalOpen(true);
                                            if (item.isImagePopup) setSelectedImage({ src: item.image, title: item.title });
                                        }}
                                    >
                                        <Image
                                            src={
                                                item.isCorporate
                                                    ? ([
                                                        "/images/landing/account-billing.webp",
                                                        "/images/landing/Account-Billing.png",
                                                        "/images/landing/make-order.webp",
                                                    ][imageFallbacks[item.step] || 0])
                                                    : item.image
                                            }
                                            alt={item.title || "Step Image"}
                                            fill
                                            className={`object-cover group-hover:scale-110 transition-transform duration-700 ${item.video ? 'opacity-60' : ''}`}
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            onError={() => {
                                                if (!item.isCorporate) return;
                                                setImageFallbacks((prev) => ({
                                                    ...prev,
                                                    [item.step]: Math.min((prev[item.step] || 0) + 1, 2),
                                                }));
                                            }}
                                        />

                                        {/* Play Button Overlay */}
                                        {(item.video || item.isCorporate || item.isImagePopup) && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors z-10">
                                                <div className="w-20 h-20 rounded-full bg-white/70 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                                    {item.isCorporate ? (
                                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "2vw" }}>
                                                            business_center
                                                        </span>
                                                    ) : item.isImagePopup ? (
                                                        <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "2vw" }}>
                                                            search
                                                        </span>
                                                    ) : (
                                                        <span className="material-symbols-outlined text-primary ml-1" style={{ fontVariationSettings: "'FILL' 1", fontSize: "2vw" }}>
                                                            play_arrow
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                                    </div>

                                    {/* Step Number Badge - Outside the overflow:hidden container */}
                                    <div className="absolute -top-4 -right-4 size-12 rounded-full bg-primary text-white flex items-center justify-center font-black text-base shadow-xl group-hover:rotate-[360deg] transition-transform duration-1000 z-30 border-4 border-[#e8f3ff] dark:border-[#18212F]">
                                        {item.step}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4 text-center lg:text-left">
                                    <h3 className="text-foreground dark:text-white tracking-tight group-hover:text-primary transition-colors font-black">
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-muted-foreground leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: item.desc }}
                                    />
                                </div>

                                {/* Arrow for connection (mobile/tablet) */}
                                {index < steps.length - 1 && (
                                    <div className="lg:hidden my-6 opacity-20">
                                        <span className="material-symbols-outlined text-[40px] text-primary dark:text-white">arrow_downward</span>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedVideo(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="absolute top-4 right-4 z-20 size-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center backdrop-blur-md transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                className="w-full h-full"
                            />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Corporate Modal */}
            <AnimatePresence>
                {isCorporateModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCorporateModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-xl rounded-3xl bg-white dark:bg-[#1c2637] p-8 shadow-2xl z-10"
                        >
                            <button
                                onClick={() => setIsCorporateModalOpen(false)}
                                className="absolute top-4 right-4 size-10 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 text-foreground dark:text-white flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <h3 className="text-2xl font-black text-foreground dark:text-white mb-4">
                                {t.landing.process.corporateModalTitle}
                            </h3>
                            <p
                                className="text-muted-foreground leading-relaxed mb-8"
                                dangerouslySetInnerHTML={{ __html: t.landing.process.corporateModalDesc }}
                            />

                            <Link
                                href="/corporate-account"
                                className="inline-flex h-12 px-6 rounded-xl bg-primary text-white font-bold items-center justify-center hover:opacity-90 transition-opacity"
                            >
                                {t.landing.process.corporateModalBtn}
                            </Link>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedImage(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-6xl bg-white dark:bg-[#1c2637] rounded-3xl overflow-hidden shadow-2xl z-10 flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-6 right-6 z-20 size-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-xl transition-all active:scale-90"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>

                            <div className="flex-1 bg-slate-950 flex items-center justify-center overflow-hidden min-h-[50vh] max-h-[90vh]">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}

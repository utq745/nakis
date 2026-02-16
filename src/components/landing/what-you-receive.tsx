"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export function WhatYouReceive() {
    const { t } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);
    const [selectedImage, setSelectedImage] = useState<{ src: string, title: string } | null>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const items = [
        {
            title: t.landing.receive.item3Title,
            desc: t.landing.receive.item3Desc,
            image: "/images/landing/rutgers-real-stitched.webp",
            alt: "Real stitched photos"
        },
        {
            title: t.landing.receive.item1Title,
            desc: t.landing.receive.item1Desc,
            image: "/images/landing/What_You_Receive_Approval_card_customer_version.webp",
            alt: "Approval Card (Client Version)",
            isImagePopup: true
        },
        {
            title: t.landing.receive.item2Title,
            desc: t.landing.receive.item2Desc,
            image: "/images/landing/What_You_Receive_Approval_card_operator_version.webp",
            alt: "Approval Card (Production / Operator Version)",
            isImagePopup: true
        }
    ];

    return (
        <section className="w-full py-24 md:py-32 bg-white dark:bg-[#09090b]">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center gap-3 mb-16">

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-[700px] tracking-tight text-foreground dark:text-white font-black"
                    >
                        {t.landing.receive.title}
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="w-24 h-1.5 bg-primary dark:bg-white rounded-full opacity-40"
                    ></motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col gap-6"
                        >
                            <div
                                className={`w-full aspect-square bg-[#F3F5F7] dark:bg-white/5 rounded-3xl border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden group ${item.isImagePopup ? 'cursor-pointer' : ''}`}
                                onClick={() => {
                                    if (item.isImagePopup) {
                                        setSelectedImage({ src: item.image, title: item.title });
                                    }
                                }}
                            >
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.alt || item.title || "Step Image"}
                                        fill
                                        priority={index === 0}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center gap-4 text-gray-400 dark:text-white/20">
                                        <span className="material-symbols-outlined text-5xl">image</span>
                                        <span className="text-sm font-medium">300 x 300px</span>
                                    </div>
                                )}
                                {/* Search/Zoom Overlay for clickable items */}
                                {item.isImagePopup && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <div className="w-16 h-16 rounded-full bg-white/70 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: "28px" }}>
                                                search
                                            </span>
                                        </div>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h3 className="text-xl font-black text-foreground dark:text-white leading-tight">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Image Popup Modal */}
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

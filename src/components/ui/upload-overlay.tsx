"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Upload, FileCheck, CloudUpload } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadOverlayProps {
    isVisible: boolean;
    message?: string;
    progress?: number;
}

export function UploadOverlay({ isVisible, message = "Uploading files...", progress }: UploadOverlayProps) {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/80 backdrop-blur-md"
                >
                    <div className="max-w-md w-full p-8 text-center space-y-8">
                        {/* Animated Icon Container */}
                        <div className="relative w-32 h-32 mx-auto">
                            <motion.div
                                animate={{
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-violet-600/20 rounded-full blur-2xl"
                            />

                            <div className="relative flex items-center justify-center w-full h-full bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <CloudUpload className="w-12 h-12 text-violet-400" />
                                </motion.div>

                                {/* Floating particles */}
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute w-1 h-1 bg-violet-400 rounded-full"
                                        animate={{
                                            y: [-20, -60],
                                            x: [0, (i - 1) * 20],
                                            opacity: [0, 1, 0]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            delay: i * 0.6,
                                            ease: "easeOut"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Text and Status */}
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-white tracking-tight">
                                {message}
                            </h3>
                            <p className="text-zinc-500 text-sm">
                                Please stay on the page while we process your request.
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-3">
                            <div className="h-2 w-full bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600"
                                    initial={{ width: "0%" }}
                                    animate={{ width: progress !== undefined ? `${progress}%` : "100%" }}
                                    transition={progress !== undefined ? { duration: 0.3 } : {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </div>
                            {progress !== undefined && (
                                <div className="text-right">
                                    <span className="text-xs font-mono text-violet-400">{progress}%</span>
                                </div>
                            )}
                        </div>

                        {/* Features/Tips (Dynamic) */}
                        <div className="flex justify-center gap-4 text-xs text-zinc-600 pt-4">
                            <div className="flex items-center gap-1">
                                <FileCheck className="w-3 h-3" /> Secure Transfer
                            </div>
                            <div className="flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" /> Auto-optimizing
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { useSession } from "next-auth/react";
import { Wand2 } from "lucide-react";

export function FixYourDstBlock() {
    const { t, language } = useLanguage();
    const { data: session } = useSession();

    const isLoggedIn = !!session;
    const loginUrl = language === 'tr' ? '/tr/giris' : '/login';
    const newOrderUrl = language === 'tr' ? '/tr/siparisler/new' : '/orders/new';

    // Fallback if not in dictionary yet (though I added it for 'en')
    const content = t.landing.process.fixYourDstBlock || {
        title: "Already have a DST?",
        text: "Send your existing file. We clean it, test stitch it on your selected Tajima or Barudan machine, and return a production-ready version with stitched proof.",
        cta: "Fix My DST"
    };

    return (
        <section className="w-full py-24 bg-slate-50 dark:bg-zinc-900/30">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 p-8 md:p-16 rounded-[3rem] bg-white dark:bg-[#1c2637] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden group">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100%] transition-all group-hover:w-40 group-hover:h-40"></div>
                    
                    <div className="flex flex-col gap-6 md:w-2/3 relative z-10 text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                            {content.title}
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            {content.text}
                        </p>
                    </div>

                    <div className="md:w-1/3 flex justify-center md:justify-end relative z-10">
                        <Link href={isLoggedIn ? newOrderUrl : loginUrl}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 h-16 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all flex items-center gap-3"
                            >
                                {content.cta}
                                <Wand2 className="size-6" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BlogListContent } from "@/components/blog/blog-list-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Approval Stitch",
    description: "Nakış dijitalleştirme, dikiş onayı, üretim ipuçları ve sektörel bilgiler hakkında en güncel yazılarımızı okuyun.",
    alternates: {
        canonical: "/tr/blog",
        languages: {
            en: "/blog",
            tr: "/tr/blog",
        },
    },
};

export default function BlogPageTR() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f8fafc] dark:bg-[#09090b] font-[family-name:var(--font-inter)] selection:bg-primary selection:text-white">
            <Header forceSolid />
            <main id="main-content" className="flex-grow pt-28 pb-20">
                <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                    <BlogListContent locale="tr" />
                </div>
            </main>
            <Footer />
        </div>
    );
}

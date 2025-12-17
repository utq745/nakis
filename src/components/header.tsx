"use client";

import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e5e7eb] bg-white px-4 lg:px-10 py-3 shadow-sm dark:bg-[#18212f] dark:border-b-[#2a3441]">
            <div className="flex items-center gap-4 text-[#111318] dark:text-white">
                <Link href="/" className="flex items-center gap-4">
                    <div className="size-6 text-[#135bec]">
                        <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Approval Stitch</h2>
                </Link>
            </div>
            <div className="flex flex-1 justify-end gap-3 md:gap-8 items-center">
                <div className="hidden lg:flex items-center gap-6 xl:gap-9">
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href="#">{t.header.services}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href="#">{t.header.portfolio}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href="#">{t.header.pricing}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href="#">{t.header.about}</Link>
                    <Link className="text-[#111318] dark:text-white text-sm font-medium leading-normal hover:text-[#135bec] transition-colors" href="#">{t.header.contact}</Link>
                </div>

                <div className="flex gap-2 items-center">
                    <Link href="/login" className="hidden sm:inline-block">
                        <button className="h-10 px-4 text-[#111318] dark:text-white text-sm font-bold hover:text-[#135bec] transition-colors">
                            {t.header.signIn}
                        </button>
                    </Link>

                    <Link href="/login" className="hidden sm:inline-block">
                        <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#135bec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-blue-700 transition-colors shadow-md">
                            <span className="truncate">{t.header.startOrder}</span>
                        </button>
                    </Link>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] text-[#111318] hover:bg-[#e2e4e8] dark:bg-[#2a3441] dark:text-white dark:hover:bg-[#374151] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3 transition-colors">
                                <span className="material-symbols-outlined text-[20px]">language</span>
                                <span className="text-sm font-medium hidden sm:inline-block">
                                    {language === 'tr' ? 'TR' : 'EN'}
                                </span>
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white dark:bg-[#2a3441] border-[#e5e7eb] dark:border-[#374151]">
                            <DropdownMenuItem onClick={() => setLanguage("tr")} className="cursor-pointer">🇹🇷 Türkçe</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">🇺🇸 English</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2, MessageSquare, Upload, Shield, Globe, Clock, Star, Edit2 } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { t, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-violet-500 to-fuchsia-500">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Nakış Digitizing
            </span>
          </div>
          <div className="flex items-center gap-4">
            {mounted && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-400 hover:text-white"
                  >
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-32 bg-zinc-900 border-zinc-800"
                  align="end"
                >
                  <DropdownMenuItem
                    className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                    onClick={() => setLanguage("tr")}
                  >
                    🇹🇷 Türkçe
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-zinc-300 focus:text-white focus:bg-zinc-800 cursor-pointer"
                    onClick={() => setLanguage("en")}
                  >
                    🇺🇸 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Link href="/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                {t.auth.login}
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
                {t.auth.register}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 py-24 text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm mb-8">
            <Sparkles className="h-4 w-4" />
            {t.landing.heroTitle}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto leading-tight">
            {t.landing.heroDesc.split(",")[0]}
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            {t.landing.heroDesc}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-lg px-8"
              >
                {t.landing.ctaPrimary}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            {t.landing.features}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <FeatureCard
              icon={Clock} // Changed icon to match "Fast Delivery"
              title={t.landing.feature1}
              description={t.landing.feature1Desc}
            />
            <FeatureCard
              icon={Star} // Changed icon to match "High Quality"
              title={t.landing.feature2}
              description={t.landing.feature2Desc}
            />
            <FeatureCard
              icon={Edit2} // Changed icon to match "Easy Revision"
              title={t.landing.feature3}
              description={t.landing.feature3Desc}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t.auth.createAccount}
          </h2>
          <p className="text-zinc-400 mb-8">
            {t.landing.heroTitle}
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
            >
              {t.auth.register}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          © 2024 Nakış Digitizing. {t.common.success && ""}
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-violet-500/30 transition-colors">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-tr from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-zinc-400">{description}</p>
    </div>
  );
}

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, CheckCircle2, MessageSquare, Upload, Shield } from "lucide-react";

export default function HomePage() {

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
            <Link href="/login">
              <Button variant="ghost" className="text-zinc-400 hover:text-white">
                Giriş Yap
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500">
                Kayıt Ol
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
            Profesyonel Nakış Digitizing Hizmeti
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-4xl mx-auto">
            Nakış Tasarımlarınızı{" "}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Dijital Formata
            </span>{" "}
            Dönüştürün
          </h1>
          <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
            Logolarınızı ve tasarımlarınızı profesyonel nakış makinelerinde kullanılabilir
            dijital dosyalara çeviriyoruz. Hızlı teslimat, uygun fiyat.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-lg px-8"
              >
                Hemen Başla
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
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={Upload}
              title="Kolay Yükleme"
              description="Dosyalarınızı sürükle bırak ile kolayca yükleyin ve siparişinizi oluşturun."
            />
            <FeatureCard
              icon={MessageSquare}
              title="Gerçek Zamanlı İletişim"
              description="Siparişiniz hakkında anında mesajlaşın ve revizyon talep edin."
            />
            <FeatureCard
              icon={CheckCircle2}
              title="Kalite Garantisi"
              description="Her tasarım uzman ekibimiz tarafından titizlikle hazırlanır."
            />
            <FeatureCard
              icon={Shield}
              title="Güvenli Ödeme"
              description="Kredi kartı ile güvenli ödeme imkanı. Memnun kalmazsanız iade."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-zinc-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Hemen Ücretsiz Kayıt Olun
          </h2>
          <p className="text-zinc-400 mb-8">
            İlk siparişinizde %10 indirim fırsatını kaçırmayın
          </p>
          <Link href="/register">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500"
            >
              Ücretsiz Kayıt Ol
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-8">
        <div className="container mx-auto px-4 text-center text-zinc-500 text-sm">
          © 2024 Nakış Digitizing. Tüm hakları saklıdır.
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

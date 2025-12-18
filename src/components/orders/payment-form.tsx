"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/components/providers/language-provider";
import { CreditCard, Loader2, CheckCircle2, Building2, User, Landmark, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PaymentFormProps {
    orderId: string;
    orderTitle: string;
    price: number;
    locale: "en" | "tr";
}

export function PaymentForm({ orderId, orderTitle, price, locale }: PaymentFormProps) {
    const router = useRouter();
    const { t } = useLanguage();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [billingType, setBillingType] = useState<"individual" | "corporate">("individual");

    // Card State
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);

    const countries = [
        { code: "TR", name: locale === "tr" ? "Türkiye" : "Turkey" },
        { code: "US", name: "United States" },
        { code: "GB", name: "United Kingdom" },
        { code: "DE", name: "Germany" },
        { code: "FR", name: "France" },
        { code: "IT", name: "Italy" },
        { code: "CA", name: "Canada" },
    ];

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const parts = [];
        for (let i = 0, len = v.length; i < len; i += 4) {
            parts.push(v.substring(i, i + 4));
        }
        return parts.length ? parts.join(" ") : value;
    };

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "COMPLETED" }),
            });

            if (!response.ok) throw new Error("Payment failed");

            setIsSuccess(true);
            toast.success(t.payment.success);

            setTimeout(() => {
                const redirectPath = locale === 'tr' ? `/tr/orders/${orderId}` : `/orders/${orderId}`;
                router.push(redirectPath);
                router.refresh();
            }, 3000);
        } catch (error) {
            toast.error(t.payment.error || "Payment failed");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4 py-12">
                <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-300" />
                <h2 className="text-2xl font-bold text-white">{t.payment.success}</h2>
                <p className="text-zinc-400">{t.payment.successDesc}</p>
                <p className="text-sm text-zinc-500 italic">Redirecting...</p>
            </div>
        );
    }

    return (
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-white">{t.payment.billingInfo}</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    {locale === "tr" ? "Fatura için adres ve iletişim bilgilerinizi girin." : "Enter your address and contact details for the invoice."}
                                </CardDescription>
                            </div>
                            <Tabs defaultValue="individual" onValueChange={(v) => setBillingType(v as any)} className="w-full md:w-auto">
                                <TabsList className="bg-zinc-800 border-zinc-700 h-11 p-1">
                                    <TabsTrigger
                                        value="individual"
                                        className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        {t.payment.individual}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="corporate"
                                        className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <Building2 className="h-4 w-4 mr-2" />
                                        {t.payment.corporate}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-zinc-300">{t.payment.fullName}</Label>
                                <Input id="fullName" required placeholder="John Doe" className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-zinc-300">{t.payment.phone}</Label>
                                <Input id="phone" type="tel" required placeholder="+1..." className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                            </div>
                        </div>

                        {billingType === "corporate" && (
                            <div className="space-y-4 pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="space-y-2">
                                    <Label htmlFor="companyName" className="text-zinc-300">{t.payment.companyName}</Label>
                                    <Input id="companyName" required className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="taxOffice" className="text-zinc-300">{t.payment.taxOffice}</Label>
                                        <Input id="taxOffice" required className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="taxNumber" className="text-zinc-300">{t.payment.taxNumber}</Label>
                                        <Input id="taxNumber" required className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="space-y-4 pt-4 border-t border-zinc-800">
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="space-y-2 w-full md:w-1/2">
                                    <Label className="text-zinc-300">{t.payment.country}</Label>
                                    <Select defaultValue="TR" required>
                                        <SelectTrigger className="w-full bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500 h-10">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                                            {countries.map((c) => (
                                                <SelectItem key={c.code} value={c.code} className="focus:bg-zinc-800 focus:text-white">
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 w-full md:w-1/2">
                                    <Label htmlFor="city" className="text-zinc-300">{t.payment.city}</Label>
                                    <Input id="city" required placeholder="Istanbul" className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="md:col-span-2 space-y-2">
                                    <Label htmlFor="address" className="text-zinc-300">{t.payment.address}</Label>
                                    <Input id="address" required placeholder={t.payment.addressPlaceholder} className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode" className="text-zinc-300">{t.payment.zipCode}</Label>
                                    <Input id="zipCode" required placeholder="34000" className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            {t.payment.title}
                        </CardTitle>
                        <CardDescription className="text-zinc-400">
                            Demo payment. Use any credit card details.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        {/* Visualization Wrapper */}
                        <div className="relative h-56 w-full max-w-[400px] mx-auto perspective-1000">
                            <div className={cn(
                                "relative w-full h-full transition-transform duration-700 transform-style-3d",
                                isFlipped ? "rotate-y-180" : ""
                            )}>
                                {/* Front Side */}
                                <div className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4">
                                        <Landmark className="h-32 w-32" />
                                    </div>
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-10 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-lg shadow-inner"></div>
                                        <CreditCard className="h-10 w-10 text-white opacity-80" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-xl md:text-2xl font-mono text-white tracking-[0.15em] drop-shadow-md">
                                            {cardNumber || "•••• •••• •••• ••••"}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="space-y-1 max-w-[70%]">
                                            <div className="text-[10px] uppercase text-white/60 tracking-wider">Card Holder</div>
                                            <div className="text-sm font-medium text-white truncate drop-shadow-sm uppercase">
                                                {cardName || (locale === "tr" ? "MÜŞTERİ ADI" : "CUSTOMER NAME")}
                                            </div>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <div className="text-[10px] uppercase text-white/60 tracking-wider">Expires</div>
                                            <div className="text-sm font-medium text-white drop-shadow-sm">
                                                {cardExpiry || "MM/YY"}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Back Side */}
                                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-2xl shadow-2xl overflow-hidden py-8">
                                    <div className="w-full h-12 bg-black opacity-80 mt-2"></div>
                                    <div className="mt-6 px-6">
                                        <div className="flex items-center">
                                            <div className="h-10 flex-1 bg-zinc-700 rounded-sm"></div>
                                            <div className="h-8 w-14 bg-white text-zinc-900 font-mono flex items-center justify-center font-bold text-lg rounded-sm ml-4 shadow-inner">
                                                {cardCvc || "•••"}
                                            </div>
                                        </div>
                                        <div className="mt-4 text-[8px] text-zinc-500 leading-tight uppercase font-medium">
                                            This card is for demonstration purposes only. Do not enter real credit card information...
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Input Fields */}
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardName" className="text-zinc-300">{t.auth.fullName}</Label>
                                    <Input
                                        id="cardName"
                                        required
                                        placeholder="JOHN DOE"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber" className="text-zinc-300">{t.payment.cardNumber}</Label>
                                    <Input
                                        id="cardNumber"
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500 font-mono"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry" className="text-zinc-300">{t.payment.expiry}</Label>
                                    <Input
                                        id="expiry"
                                        required
                                        placeholder="MM/YY"
                                        maxLength={5}
                                        value={cardExpiry}
                                        onChange={(e) => {
                                            const v = e.target.value.replace(/[^0-9]/g, "");
                                            if (v.length >= 2) {
                                                setCardExpiry(v.slice(0, 2) + "/" + v.slice(2, 4));
                                            } else {
                                                setCardExpiry(v);
                                            }
                                        }}
                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc" className="text-zinc-300">{t.payment.cvc}</Label>
                                    <Input
                                        id="cvc"
                                        required
                                        type="password"
                                        placeholder="•••"
                                        maxLength={4}
                                        value={cardCvc}
                                        onChange={(e) => setCardCvc(e.target.value.replace(/[^0-9]/g, ""))}
                                        onFocus={() => setIsFlipped(true)}
                                        onBlur={() => setIsFlipped(false)}
                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500 font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full md:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-6 px-12 text-lg font-bold shadow-lg shadow-violet-500/20"
                    >
                        {isProcessing ? (
                            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {t.payment.processing}</>
                        ) : (
                            t.payment.payNow
                        )}
                    </Button>
                </div>
            </div>

            {/* Right: Order Info */}
            <div className="space-y-6">
                <Card className="bg-zinc-900 border-zinc-800 sticky top-24">
                    <CardHeader>
                        <CardTitle className="text-white">{t.payment.orderSummary}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Project</p>
                            <p className="text-sm text-white font-medium">{orderTitle}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Order ID</p>
                            <p className="text-sm text-zinc-300 font-mono">{orderId}</p>
                        </div>
                        <div className="border-t border-zinc-800 pt-4 mt-4">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">{t.payment.totalAmount}</span>
                                <span className="text-2xl font-bold text-white">${price.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 bg-zinc-800/30 p-3 rounded-lg border border-zinc-800/50">
                            <ShieldCheck className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span>{locale === "tr" ? "Ödemeniz 128-bit SSL ile korunmaktadır." : "Your payment is secured with 128-bit SSL encryption."}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <style jsx global>{`
                .perspective-1000 { perspective: 1000px; }
                .transform-style-3d { transform-style: preserve-3d; }
                .backface-hidden { backface-visibility: hidden; }
                .rotate-y-180 { transform: rotateY(180deg); }
            `}</style>
        </form>
    );
}

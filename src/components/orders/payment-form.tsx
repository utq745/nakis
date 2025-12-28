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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useLanguage } from "@/components/providers/language-provider";
import { CreditCard, Loader2, CheckCircle2, Building2, User, Landmark, ShieldCheck, Pencil, Plus, Trash2, CheckCircle, ArrowRight, Home, Download, FileText, Save, Check, ChevronsUpDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionConfirmDialog } from "./action-confirm-dialog";

interface PaymentFormProps {
    orderId: string;
    orderTitle: string;
    price: number;
    locale: "en" | "tr";
    initialBillingAddress?: string;
    serviceType?: string;
    hasRevision?: boolean; // True if customer requested a revision (only for Package 1)
}

interface BillingData {
    id: string;
    type: "individual" | "corporate";
    fullName: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    zipCode: string;
    companyName?: string;
    taxOffice?: string;
    taxNumber?: string;
}

const COUNTRIES = [
    { code: "AF", name: "Afghanistan" },
    { code: "AL", name: "Albania" },
    { code: "DZ", name: "Algeria" },
    { code: "AD", name: "Andorra" },
    { code: "AO", name: "Angola" },
    { code: "AR", name: "Argentina" },
    { code: "AM", name: "Armenia" },
    { code: "AU", name: "Australia" },
    { code: "AT", name: "Austria" },
    { code: "AZ", name: "Azerbaijan" },
    { code: "BS", name: "Bahamas" },
    { code: "BH", name: "Bahrain" },
    { code: "BD", name: "Bangladesh" },
    { code: "BY", name: "Belarus" },
    { code: "BE", name: "Belgium" },
    { code: "BR", name: "Brazil" },
    { code: "BG", name: "Bulgaria" },
    { code: "CA", name: "Canada" },
    { code: "CL", name: "Chile" },
    { code: "CN", name: "China" },
    { code: "CO", name: "Colombia" },
    { code: "HR", name: "Croatia" },
    { code: "CY", name: "Cyprus" },
    { code: "CZ", name: "Czech Republic" },
    { code: "DK", name: "Denmark" },
    { code: "EG", name: "Egypt" },
    { code: "EE", name: "Estonia" },
    { code: "FI", name: "Finland" },
    { code: "FR", name: "France" },
    { code: "GE", name: "Georgia" },
    { code: "DE", name: "Germany" },
    { code: "GR", name: "Greece" },
    { code: "HK", name: "Hong Kong" },
    { code: "HU", name: "Hungary" },
    { code: "IS", name: "Iceland" },
    { code: "IN", name: "India" },
    { code: "ID", name: "Indonesia" },
    { code: "IR", name: "Iran" },
    { code: "IQ", name: "Iraq" },
    { code: "IE", name: "Ireland" },
    { code: "IL", name: "Israel" },
    { code: "IT", name: "Italy" },
    { code: "JP", name: "Japan" },
    { code: "JO", name: "Jordan" },
    { code: "KZ", name: "Kazakhstan" },
    { code: "KE", name: "Kenya" },
    { code: "KR", name: "South Korea" },
    { code: "KW", name: "Kuwait" },
    { code: "LV", name: "Latvia" },
    { code: "LB", name: "Lebanon" },
    { code: "LT", name: "Lithuania" },
    { code: "LU", name: "Luxembourg" },
    { code: "MY", name: "Malaysia" },
    { code: "MX", name: "Mexico" },
    { code: "MA", name: "Morocco" },
    { code: "NL", name: "Netherlands" },
    { code: "NZ", name: "New Zealand" },
    { code: "NG", name: "Nigeria" },
    { code: "NO", name: "Norway" },
    { code: "OM", name: "Oman" },
    { code: "PK", name: "Pakistan" },
    { code: "PA", name: "Panama" },
    { code: "PE", name: "Peru" },
    { code: "PH", name: "Philippines" },
    { code: "PL", name: "Poland" },
    { code: "PT", name: "Portugal" },
    { code: "QA", name: "Qatar" },
    { code: "RO", name: "Romania" },
    { code: "RU", name: "Russia" },
    { code: "SA", name: "Saudi Arabia" },
    { code: "RS", name: "Serbia" },
    { code: "SG", name: "Singapore" },
    { code: "SK", name: "Slovakia" },
    { code: "SI", name: "Slovenia" },
    { code: "ZA", name: "South Africa" },
    { code: "ES", name: "Spain" },
    { code: "SE", name: "Sweden" },
    { code: "CH", name: "Switzerland" },
    { code: "TW", name: "Taiwan" },
    { code: "TH", name: "Thailand" },
    { code: "TR", name: "Türkiye" },
    { code: "UA", name: "Ukraine" },
    { code: "AE", name: "United Arab Emirates" },
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "UY", name: "Uruguay" },
    { code: "UZ", name: "Uzbekistan" },
    { code: "VE", name: "Venezuela" },
    { code: "VN", name: "Vietnam" },
    { code: "YE", name: "Yemen" },
    { code: "ZM", name: "Zambia" },
    { code: "ZW", name: "Zimbabwe" },
];

export function PaymentForm({ orderId, orderTitle, price, locale, initialBillingAddress, serviceType, hasRevision }: PaymentFormProps) {
    const router = useRouter();
    const { t } = useLanguage();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Parse initial addresses
    let parsedSavedAddresses: BillingData[] = [];
    try {
        if (initialBillingAddress) {
            const parsed = JSON.parse(initialBillingAddress);
            parsedSavedAddresses = Array.isArray(parsed) ? parsed : [];
        }
    } catch (e) {
        console.error("Failed to parse billing address:", e);
    }

    const [savedAddresses, setSavedAddresses] = useState<BillingData[]>(parsedSavedAddresses);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(parsedSavedAddresses[0]?.id || null);
    const [isFormOpen, setIsFormOpen] = useState(parsedSavedAddresses.length === 0);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

    const [billingData, setBillingData] = useState<Omit<BillingData, 'id'>>({
        type: "individual",
        fullName: "",
        phone: "",
        country: "TR",
        city: "",
        address: "",
        zipCode: "",
        companyName: "",
        taxOffice: "",
        taxNumber: "",
    });

    const resetForm = () => {
        setBillingData({
            type: "individual",
            fullName: "",
            phone: "",
            country: "TR",
            city: "",
            address: "",
            zipCode: "",
            companyName: "",
            taxOffice: "",
            taxNumber: "",
        });
        setEditingId(null);
    };

    const handleEditAddress = (addr: BillingData) => {
        setBillingData({
            type: addr.type,
            fullName: addr.fullName,
            phone: addr.phone,
            country: addr.country,
            city: addr.city,
            address: addr.address,
            zipCode: addr.zipCode,
            companyName: addr.companyName || "",
            taxOffice: addr.taxOffice || "",
            taxNumber: addr.taxNumber || "",
        });
        setEditingId(addr.id);
        setIsFormOpen(true);
    };

    const handleAddNewClick = () => {
        resetForm();
        setIsFormOpen(true);
    };

    const handleSaveAddress = () => {
        if (!billingData.fullName || !billingData.address || !billingData.city) {
            toast.error(locale === "tr" ? "Lütfen tüm zorunlu alanları doldurun." : "Please fill all required fields.");
            return;
        }

        if (editingId) {
            const updated = savedAddresses.map(a => a.id === editingId ? { ...billingData, id: editingId } : a);
            setSavedAddresses(updated);
            toast.success(locale === "tr" ? "Adres güncellendi." : "Address updated.");
        } else {
            const newId = crypto.randomUUID();
            const newAddr = { ...billingData, id: newId };
            setSavedAddresses(prev => [...prev, newAddr]);
            setSelectedAddressId(newId);
            toast.success(locale === "tr" ? "Yeni adres eklendi." : "New address added.");
        }
        setIsFormOpen(false);
        setEditingId(null);
    };

    const handleDeleteAddressClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setAddressToDelete(id);
        setIsDeleteDialogOpen(true);
    };

    const confirmDeleteAddress = () => {
        if (!addressToDelete) return;
        setSavedAddresses(prev => prev.filter(a => a.id !== addressToDelete));
        if (selectedAddressId === addressToDelete) setSelectedAddressId(null);
        toast.success(locale === "tr" ? "Adres silindi." : "Address deleted.");
        setIsDeleteDialogOpen(false);
        setAddressToDelete(null);
    };

    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCountryPopoverOpen, setIsCountryPopoverOpen] = useState(false);



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
        if (!selectedAddressId && savedAddresses.length > 0) {
            toast.error(locale === "tr" ? "Lütfen bir fatura adresi seçin." : "Please select a billing address.");
            return;
        }
        setIsProcessing(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));

            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "COMPLETED" }),
            });

            if (!response.ok) throw new Error("Payment failed");

            await fetch(`/api/user/profile`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ billingAddress: JSON.stringify(savedAddresses) }),
            });

            setIsSuccess(true);
            toast.success(t.payment.success);
            router.refresh();
        } catch (error) {
            toast.error(t.payment.error || "Payment failed");
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto py-12 px-4 text-center">
                <div className="relative mb-8 flex justify-center">
                    <div className="absolute inset-0 bg-green-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
                    <div className="relative bg-card border-2 border-green-500/50 p-6 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-500 fill-green-500/10" />
                    </div>
                </div>

                <h2 className="text-4xl font-extrabold text-foreground mb-4 tracking-tight">
                    {t.payment.success}
                </h2>
                <p className="text-muted-foreground text-lg mb-12 max-w-md mx-auto leading-relaxed">
                    {t.payment.successDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    <div className="bg-card/50 border border-border p-6 rounded-2xl text-left">
                        <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                            <FileText className="h-5 w-5" />
                            <span className="font-semibold">{locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{locale === 'tr' ? 'Sipariş:' : 'Order:'}</span>
                                <span className="text-foreground font-medium">{orderTitle}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{locale === 'tr' ? 'Tutar:' : 'Amount:'}</span>
                                <span className="text-foreground font-medium">{price.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{locale === 'tr' ? 'Durum:' : 'Status:'}</span>
                                <span className="text-green-500 font-bold uppercase">{t.status.COMPLETED}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/50 border border-border p-6 rounded-2xl text-left">
                        <div className="flex items-center gap-3 mb-4 text-muted-foreground">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="font-semibold">{locale === 'tr' ? 'Sonraki Adım' : 'Next Step'}</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {locale === 'tr'
                                ? 'Final dosyalarınız hazırlandı. Sipariş detay sayfasından tüm dosyaları indirebilirsiniz.'
                                : 'Your final files are ready. You can download all files from the order details page.'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => router.push(locale === 'tr' ? `/tr/siparisler/${orderId}` : `/orders/${orderId}`)}
                        className="w-full sm:w-auto min-w-[200px] h-12 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl flex items-center justify-center gap-2 group transition-all"
                    >
                        {locale === 'tr' ? 'Siparişi Görüntüle' : 'View Order Details'}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push(locale === 'tr' ? '/tr/siparisler' : '/orders')}
                        className="w-full sm:w-auto h-12 text-muted-foreground hover:text-foreground hover:bg-accent rounded-xl flex items-center justify-center gap-2"
                    >
                        <Home className="h-4 w-4" />
                        {locale === 'tr' ? 'Panele Dön' : 'Back to Dashboard'}
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-border">
                    <p className="text-muted-foreground/60 text-xs">
                        {locale === 'tr'
                            ? 'Herhangi bir sorun yaşarsanız destek ekibimizle iletişime geçebilirsiniz.'
                            : 'If you experience any issues, please contact our support team.'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-foreground">{t.payment.billingInfo}</CardTitle>
                                <CardDescription className="text-muted-foreground">
                                    {locale === "tr" ? "Fatura için adres ve iletişim bilgilerinizi girin." : "Enter your address and contact details for the invoice."}
                                </CardDescription>
                            </div>
                            <Tabs
                                value={billingData.type}
                                onValueChange={(v) => setBillingData({ ...billingData, type: v as any })}
                                className="w-full md:w-auto"
                            >
                                <TabsList className="bg-accent border-border h-11 p-1">
                                    <TabsTrigger
                                        value="individual"
                                        disabled={!isFormOpen}
                                        className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-muted-foreground hover:text-foreground transition-all"
                                    >
                                        <User className="h-4 w-4 mr-1.5 transition-transform group-data-[state=active]:scale-110" />
                                        {t.payment.individual}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="corporate"
                                        disabled={!isFormOpen}
                                        className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-muted-foreground hover:text-foreground transition-all"
                                    >
                                        <Building2 className="h-4 w-4 mr-1.5 transition-transform group-data-[state=active]:scale-110" />
                                        {t.payment.corporate}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        {savedAddresses.length > 0 && (
                            <div className="pt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <Label className="text-muted-foreground text-[10px] uppercase tracking-wider font-bold">
                                        {locale === "tr" ? "Adres Seçimi" : "Address Selection"}
                                    </Label>
                                    {!isFormOpen && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleAddNewClick}
                                            className="text-violet-400 hover:text-violet-300 text-xs h-7 gap-1"
                                        >
                                            <Plus className="h-3 w-3" />
                                            {locale === "tr" ? "Yeni Adres" : "New Address"}
                                        </Button>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {savedAddresses.map((addr) => (
                                        <div
                                            key={addr.id}
                                            onClick={() => {
                                                if (!isFormOpen) setSelectedAddressId(addr.id);
                                            }}
                                            className={cn(
                                                "relative p-4 rounded-xl border transition-all cursor-pointer group",
                                                selectedAddressId === addr.id && !isFormOpen
                                                    ? "bg-violet-950/20 border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                                                    : "bg-accent/40 border-border hover:border-border/80",
                                                isFormOpen && "opacity-50 cursor-not-allowed"
                                            )}
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className={cn(
                                                        "mt-1 h-4 w-4 rounded-full border flex items-center justify-center transition-colors",
                                                        selectedAddressId === addr.id && !isFormOpen
                                                            ? "border-violet-500 bg-violet-600 text-white"
                                                            : "border-border"
                                                    )}>
                                                        {selectedAddressId === addr.id && !isFormOpen && (
                                                            <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                                        )}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-foreground leading-none mb-1">
                                                            {addr.fullName}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground line-clamp-1">
                                                            {addr.address}, {addr.city} / {addr.country}
                                                        </p>
                                                        {addr.type === 'corporate' && (
                                                            <p className="text-[10px] text-muted-foreground/70 mt-1 uppercase">
                                                                🏢 {addr.companyName}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={isFormOpen}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleEditAddress(addr);
                                                        }}
                                                        className="h-7 w-7 text-muted-foreground hover:text-foreground hover:bg-accent"
                                                        aria-label={locale === "tr" ? "Adresi Düzenle" : "Edit Address"}
                                                    >
                                                        <Pencil className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        disabled={isFormOpen}
                                                        onClick={(e) => handleDeleteAddressClick(addr.id, e)}
                                                        className="h-7 w-7 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                        aria-label={locale === "tr" ? "Adresi Sil" : "Delete Address"}
                                                    >
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {savedAddresses.length === 0 && !isFormOpen && (
                            <div className="pt-4">
                                <div className="p-8 border-2 border-dashed border-border rounded-xl text-center">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {locale === "tr" ? "Henüz kayıtlı adresiniz yok." : "No saved addresses yet."}
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={handleAddNewClick}
                                        variant="outline"
                                        className="border-violet-500/50 text-violet-400 hover:bg-violet-500 hover:text-white"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        {locale === "tr" ? "Yeni Adres Ekle" : "Add New Address"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardHeader>

                    {isFormOpen && (
                        <CardContent className="space-y-6 pt-4 border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
                                    {editingId
                                        ? (locale === "tr" ? "Adresi Düzenle" : "Edit Address")
                                        : (locale === "tr" ? "Yeni Adres Bilgileri" : "New Address Details")}
                                </h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-muted-foreground">{t.payment.fullName}</Label>
                                    <Input
                                        id="fullName"
                                        required
                                        value={billingData.fullName}
                                        onChange={(e) => setBillingData({ ...billingData, fullName: e.target.value })}
                                        placeholder="John Doe"
                                        className="bg-background border-border text-foreground focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-muted-foreground">{t.payment.phone}</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={billingData.phone}
                                        onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                                        placeholder="+1..."
                                        className="bg-background border-border text-foreground focus:border-violet-500"
                                    />
                                </div>
                            </div>

                            {billingData.type === "corporate" && (
                                <div className="space-y-4 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName" className="text-muted-foreground">{t.payment.companyName}</Label>
                                        <Input
                                            id="companyName"
                                            required
                                            value={billingData.companyName || ""}
                                            onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
                                            className="bg-background border-border text-foreground focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="taxOffice" className="text-muted-foreground">{t.payment.taxOffice}</Label>
                                            <Input
                                                id="taxOffice"
                                                required
                                                value={billingData.taxOffice || ""}
                                                onChange={(e) => setBillingData({ ...billingData, taxOffice: e.target.value })}
                                                className="bg-background border-border text-foreground focus:border-violet-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="taxNumber" className="text-muted-foreground">{t.payment.taxNumber}</Label>
                                            <Input
                                                id="taxNumber"
                                                required
                                                value={billingData.taxNumber || ""}
                                                onChange={(e) => setBillingData({ ...billingData, taxNumber: e.target.value })}
                                                className="bg-background border-border text-foreground focus:border-violet-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 pt-4 border-t border-border">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="space-y-2 w-full md:w-1/2">
                                        <Label className="text-muted-foreground">{t.payment.country}</Label>
                                        <Popover open={isCountryPopoverOpen} onOpenChange={setIsCountryPopoverOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={isCountryPopoverOpen}
                                                    className="w-full justify-between bg-background border-border text-foreground hover:bg-accent hover:text-foreground h-10 font-normal focus:ring-1 focus:ring-violet-500"
                                                >
                                                    {billingData.country
                                                        ? COUNTRIES.find((c) => c.code === billingData.country)?.name
                                                        : (locale === "tr" ? "Ülke seçin..." : "Select country...")}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="p-0 bg-popover border-border animate-in fade-in zoom-in duration-200 shadow-xl"
                                                align="start"
                                                style={{ width: "var(--radix-popover-trigger-width)" }}
                                            >
                                                <Command className="bg-popover text-foreground">
                                                    <CommandInput
                                                        placeholder={locale === "tr" ? "Ülke ara..." : "Search country..."}
                                                        className="h-9 border-none focus:ring-0 text-foreground"
                                                    />
                                                    <CommandList>
                                                        <CommandEmpty className="py-2 text-center text-sm text-muted-foreground">
                                                            {locale === "tr" ? "Ülke bulunamadı." : "No country found."}
                                                        </CommandEmpty>
                                                        <CommandGroup className="max-h-[250px] overflow-auto">
                                                            {COUNTRIES.map((c) => (
                                                                <CommandItem
                                                                    key={c.code}
                                                                    value={c.name}
                                                                    onSelect={() => {
                                                                        setBillingData({ ...billingData, country: c.code });
                                                                        setIsCountryPopoverOpen(false);
                                                                    }}
                                                                    className="text-muted-foreground hover:bg-accent hover:text-foreground cursor-pointer flex items-center gap-2"
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "h-4 w-4",
                                                                            billingData.country === c.code ? "opacity-100 text-violet-400" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {c.name}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2 w-full md:w-1/2">
                                        <Label htmlFor="city" className="text-muted-foreground">{t.payment.city}</Label>
                                        <Input
                                            id="city"
                                            required
                                            value={billingData.city}
                                            onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                                            placeholder="Istanbul"
                                            className="bg-background border-border text-foreground focus:border-violet-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address" className="text-muted-foreground">{t.payment.address}</Label>
                                        <Input
                                            id="address"
                                            required
                                            value={billingData.address}
                                            onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                                            placeholder={t.payment.addressPlaceholder}
                                            className="bg-background border-border text-foreground focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode" className="text-muted-foreground">{t.payment.zipCode}</Label>
                                        <Input
                                            id="zipCode"
                                            required
                                            value={billingData.zipCode}
                                            onChange={(e) => setBillingData({ ...billingData, zipCode: e.target.value })}
                                            placeholder="34000"
                                            className="bg-background border-border text-foreground focus:border-violet-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button
                                    type="button"
                                    onClick={handleSaveAddress}
                                    className="bg-violet-600 hover:bg-violet-500 text-white px-8 h-10 rounded-xl transition-all shadow-lg shadow-violet-500/10"
                                >
                                    <Save className="h-4 w-4 mr-1.5" />
                                    {editingId ? (locale === "tr" ? "Güncelle" : "Update") : (locale === "tr" ? "Kaydet" : "Save")}
                                </Button>
                            </div>
                        </CardContent>
                    )}
                </Card>

                <Card className="bg-card border-border shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-foreground flex items-center gap-2">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                            {t.payment.title}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
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
                                    <Label htmlFor="cardName" className="text-muted-foreground">{t.auth.fullName}</Label>
                                    <Input
                                        id="cardName"
                                        required
                                        placeholder="JOHN DOE"
                                        value={cardName}
                                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                        className="bg-background border-border text-foreground focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber" className="text-muted-foreground">{t.payment.cardNumber}</Label>
                                    <Input
                                        id="cardNumber"
                                        required
                                        placeholder="0000 0000 0000 0000"
                                        maxLength={19}
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        className="bg-background border-border text-foreground focus:border-violet-500 font-mono"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry" className="text-muted-foreground">{t.payment.expiry}</Label>
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
                                        className="bg-background border-border text-foreground focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvc" className="text-muted-foreground">{t.payment.cvc}</Label>
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
                                        className="bg-background border-border text-foreground focus:border-violet-500 font-mono"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right: Order Info */}
            <div className="space-y-6">
                <Card className="bg-card border-border sticky top-24 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-foreground">{t.payment.orderSummary}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Project</p>
                            <p className="text-sm text-foreground font-medium">{orderTitle}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Order ID</p>
                            <p className="text-sm text-muted-foreground font-mono">{orderId}</p>
                        </div>
                        <div className="border-t border-border pt-4 mt-4 space-y-4">
                            {/* Base Price */}
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">
                                    {locale === "tr" ? "Paket Ücreti" : "Package Fee"}
                                </span>
                                <span className="text-foreground font-medium">
                                    ${(hasRevision ? price - 10 : price).toFixed(2)}
                                </span>
                            </div>

                            {/* Revision Fee - Only for Package 1 */}
                            {hasRevision && serviceType === "Approval Sample (Existing DST)" && (
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-amber-500">
                                        {locale === "tr" ? "Revizyon Ücreti" : "Revision Fee"}
                                    </span>
                                    <span className="text-amber-500 font-medium">+$10.00</span>
                                </div>
                            )}

                            {/* Total */}
                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                <span className="text-muted-foreground">{t.payment.totalAmount}</span>
                                <span className="text-2xl font-bold text-foreground">${price.toFixed(2)}</span>
                            </div>

                            <Button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-4 h-12 text-base font-bold shadow-lg shadow-violet-500/20 mt-2 rounded-xl"
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t.payment.processing}
                                    </>
                                ) : (
                                    t.payment.payNow
                                )}
                            </Button>

                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground bg-accent/30 p-2.5 rounded-lg border border-border/50">
                                <ShieldCheck className="h-3 w-3 text-green-500 flex-shrink-0" />
                                <span>{locale === "tr" ? "Ödemeniz 128-bit SSL ile korunmaktadır." : "Your payment is secured with 128-bit SSL encryption."}</span>
                            </div>
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

            <ActionConfirmDialog
                isOpen={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
                onConfirm={confirmDeleteAddress}
                title={locale === "tr" ? "Adresi Sil" : "Delete Address"}
                description={locale === "tr" ? "Bu adresi silmek istediğinize emin misiniz? Bu işlem geri alınamaz." : "Are you sure you want to delete this address? This action cannot be undone."}
                confirmText={locale === "tr" ? "Sil" : "Delete"}
                cancelText={locale === "tr" ? "Vazgeç" : "Cancel"}
                variant="destructive"
            />
        </form >
    );
}

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
import { CreditCard, Loader2, CheckCircle2, Building2, User, Landmark, ShieldCheck, Pencil, Plus, Trash2, CheckCircle, ArrowRight, Home, Download, FileText } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { ActionConfirmDialog } from "./action-confirm-dialog";

interface PaymentFormProps {
    orderId: string;
    orderTitle: string;
    price: number;
    locale: "en" | "tr";
    initialBillingAddress?: string;
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

export function PaymentForm({ orderId, orderTitle, price, locale, initialBillingAddress }: PaymentFormProps) {
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
                    <div className="relative bg-zinc-900 border-2 border-green-500/50 p-6 rounded-3xl shadow-[0_0_50px_rgba(34,197,94,0.2)]">
                        <CheckCircle2 className="h-16 w-16 text-green-500 animate-in zoom-in duration-500 fill-green-500/10" />
                    </div>
                </div>

                <h2 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
                    {t.payment.success}
                </h2>
                <p className="text-zinc-400 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                    {t.payment.successDesc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl text-left">
                        <div className="flex items-center gap-3 mb-4 text-zinc-400">
                            <FileText className="h-5 w-5" />
                            <span className="font-semibold">{locale === 'tr' ? 'Sipariş Özeti' : 'Order Summary'}</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">{locale === 'tr' ? 'Sipariş:' : 'Order:'}</span>
                                <span className="text-white font-medium">{orderTitle}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">{locale === 'tr' ? 'Tutar:' : 'Amount:'}</span>
                                <span className="text-white font-medium">{price.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-zinc-500">{locale === 'tr' ? 'Durum:' : 'Status:'}</span>
                                <span className="text-green-500 font-bold uppercase">{t.status.COMPLETED}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl text-left">
                        <div className="flex items-center gap-3 mb-4 text-zinc-400">
                            <ShieldCheck className="h-5 w-5" />
                            <span className="font-semibold">{locale === 'tr' ? 'Sonraki Adım' : 'Next Step'}</span>
                        </div>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            {locale === 'tr'
                                ? 'Final dosyalarınız hazırlandı. Sipariş detay sayfasından tüm dosyaları indirebilirsiniz.'
                                : 'Your final files are ready. You can download all files from the order details page.'}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        onClick={() => router.push(locale === 'tr' ? `/tr/orders/${orderId}` : `/orders/${orderId}`)}
                        className="w-full sm:w-auto min-w-[200px] h-12 bg-white hover:bg-zinc-200 text-black font-bold rounded-xl flex items-center justify-center gap-2 group transition-all"
                    >
                        {locale === 'tr' ? 'Siparişi Görüntüle' : 'View Order Details'}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button
                        variant="ghost"
                        onClick={() => router.push(locale === 'tr' ? '/tr/orders' : '/orders')}
                        className="w-full sm:w-auto h-12 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl flex items-center justify-center gap-2"
                    >
                        <Home className="h-4 w-4" />
                        {locale === 'tr' ? 'Panele Dön' : 'Back to Dashboard'}
                    </Button>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-800">
                    <p className="text-zinc-600 text-xs">
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
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <CardTitle className="text-white">{t.payment.billingInfo}</CardTitle>
                                <CardDescription className="text-zinc-400">
                                    {locale === "tr" ? "Fatura için adres ve iletişim bilgilerinizi girin." : "Enter your address and contact details for the invoice."}
                                </CardDescription>
                            </div>
                            <Tabs
                                value={billingData.type}
                                onValueChange={(v) => setBillingData({ ...billingData, type: v as any })}
                                className="w-full md:w-auto"
                            >
                                <TabsList className="bg-zinc-800 border-zinc-700 h-11 p-1">
                                    <TabsTrigger
                                        value="individual"
                                        disabled={!isFormOpen}
                                        className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <User className="h-4 w-4 mr-2" />
                                        {t.payment.individual}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="corporate"
                                        disabled={!isFormOpen}
                                        className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-zinc-300 hover:text-white transition-colors"
                                    >
                                        <Building2 className="h-4 w-4 mr-2" />
                                        {t.payment.corporate}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-zinc-400 text-xs uppercase tracking-wider font-bold">
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
                                                : "bg-zinc-800/40 border-zinc-700 hover:border-zinc-600",
                                            isFormOpen && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-start gap-3">
                                                <div className={cn(
                                                    "mt-1 h-4 w-4 rounded-full border flex items-center justify-center transition-colors",
                                                    selectedAddressId === addr.id && !isFormOpen
                                                        ? "border-violet-500 bg-violet-600 text-white"
                                                        : "border-zinc-600"
                                                )}>
                                                    {selectedAddressId === addr.id && !isFormOpen && (
                                                        <div className="h-1.5 w-1.5 rounded-full bg-white" />
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-white leading-none mb-1">
                                                        {addr.fullName}
                                                    </p>
                                                    <p className="text-xs text-zinc-400 line-clamp-1">
                                                        {addr.address}, {addr.city} / {addr.country}
                                                    </p>
                                                    {addr.type === 'corporate' && (
                                                        <p className="text-[10px] text-zinc-500 mt-1 uppercase">
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
                                                    className="h-7 w-7 text-zinc-500 hover:text-white hover:bg-zinc-700"
                                                >
                                                    <Pencil className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    disabled={isFormOpen}
                                                    onClick={(e) => handleDeleteAddressClick(addr.id, e)}
                                                    className="h-7 w-7 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {savedAddresses.length === 0 && !isFormOpen && (
                                    <div className="p-8 border-2 border-dashed border-zinc-800 rounded-xl text-center">
                                        <p className="text-sm text-zinc-500 mb-4">
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
                                )}
                            </div>
                        </div>
                    </CardHeader>

                    {isFormOpen && (
                        <CardContent className="space-y-6 pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-500">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                                    {editingId
                                        ? (locale === "tr" ? "Adresi Düzenle" : "Edit Address")
                                        : (locale === "tr" ? "Yeni Adres Bilgileri" : "New Address Details")}
                                </h3>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingId(null);
                                        if (savedAddresses.length > 0 && !selectedAddressId) {
                                            setSelectedAddressId(savedAddresses[0].id);
                                        }
                                    }}
                                    className="text-zinc-500 hover:text-white h-7"
                                >
                                    {locale === "tr" ? "İptal" : "Cancel"}
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="text-zinc-300">{t.payment.fullName}</Label>
                                    <Input
                                        id="fullName"
                                        required
                                        value={billingData.fullName}
                                        onChange={(e) => setBillingData({ ...billingData, fullName: e.target.value })}
                                        placeholder="John Doe"
                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-zinc-300">{t.payment.phone}</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        required
                                        value={billingData.phone}
                                        onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                                        placeholder="+1..."
                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                    />
                                </div>
                            </div>

                            {billingData.type === "corporate" && (
                                <div className="space-y-4 pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <div className="space-y-2">
                                        <Label htmlFor="companyName" className="text-zinc-300">{t.payment.companyName}</Label>
                                        <Input
                                            id="companyName"
                                            required
                                            value={billingData.companyName || ""}
                                            onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
                                            className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="taxOffice" className="text-zinc-300">{t.payment.taxOffice}</Label>
                                            <Input
                                                id="taxOffice"
                                                required
                                                value={billingData.taxOffice || ""}
                                                onChange={(e) => setBillingData({ ...billingData, taxOffice: e.target.value })}
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="taxNumber" className="text-zinc-300">{t.payment.taxNumber}</Label>
                                            <Input
                                                id="taxNumber"
                                                required
                                                value={billingData.taxNumber || ""}
                                                onChange={(e) => setBillingData({ ...billingData, taxNumber: e.target.value })}
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 pt-4 border-t border-zinc-800">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <div className="space-y-2 w-full md:w-1/2">
                                        <Label className="text-zinc-300">{t.payment.country}</Label>
                                        <Select
                                            value={billingData.country}
                                            onValueChange={(v) => setBillingData({ ...billingData, country: v })}
                                            required
                                        >
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
                                        <Input
                                            id="city"
                                            required
                                            value={billingData.city}
                                            onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                                            placeholder="Istanbul"
                                            className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="md:col-span-2 space-y-2">
                                        <Label htmlFor="address" className="text-zinc-300">{t.payment.address}</Label>
                                        <Input
                                            id="address"
                                            required
                                            value={billingData.address}
                                            onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                                            placeholder={t.payment.addressPlaceholder}
                                            className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="zipCode" className="text-zinc-300">{t.payment.zipCode}</Label>
                                        <Input
                                            id="zipCode"
                                            required
                                            value={billingData.zipCode}
                                            onChange={(e) => setBillingData({ ...billingData, zipCode: e.target.value })}
                                            placeholder="34000"
                                            className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4 gap-3">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsFormOpen(false);
                                        setEditingId(null);
                                        if (savedAddresses.length > 0 && !selectedAddressId) {
                                            setSelectedAddressId(savedAddresses[0].id);
                                        }
                                    }}
                                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                                >
                                    {locale === "tr" ? "Vazgeç" : "Cancel"}
                                </Button>
                                <Button
                                    type="button"
                                    onClick={handleSaveAddress}
                                    className="bg-violet-600 hover:bg-violet-500 text-white px-8"
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    {editingId ? (locale === "tr" ? "Güncelle" : "Update") : (locale === "tr" ? "Kaydet" : "Save")}
                                </Button>
                            </div>
                        </CardContent>
                    )}
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
                        <div className="border-t border-zinc-800 pt-4 mt-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-zinc-400">{t.payment.totalAmount}</span>
                                <span className="text-2xl font-bold text-white">${price.toFixed(2)}</span>
                            </div>

                            <Button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white py-4 text-base font-bold shadow-lg shadow-violet-500/20 mt-2"
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

                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 bg-zinc-800/20 p-2.5 rounded-lg border border-zinc-800/50">
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
        </form>
    );
}

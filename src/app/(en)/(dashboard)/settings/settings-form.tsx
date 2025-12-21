"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, ChevronDown, User, Shield, Globe, MapPin, Pencil, Trash2, Plus, Check, ChevronsUpDown, Building2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SettingsFormProps {
    user: any;
    locale?: "en" | "tr";
}

const texts = {
    en: {
        profileTitle: "Profile Information",
        profileDesc: "Your personal information.",
        email: "Email",
        fullName: "Full Name",
        save: "Save",
        securityTitle: "Security",
        securityDesc: "Update your password.",
        currentPassword: "Current Password",
        newPassword: "New Password",
        confirmPassword: "Confirm New Password",
        updatePassword: "Update Password",
        passwordMismatch: "New passwords do not match",
        profileUpdated: "Profile updated successfully",
        passwordUpdated: "Password updated successfully",
        error: "An error occurred",
        languageTitle: "Language Preferences",
        languageDesc: "Choose your preferred language for the dashboard.",
        language: "Language",
        english: "English",
        turkish: "Türkçe",
        languageUpdated: "Language preference saved",
        updateLanguage: "Update Language",
        billingTitle: "Billing Address",
        billingDesc: "Manage your billing address for invoices.",
        billingPlaceholder: "Street address...",
        billingFullName: "Full Name",
        billingPhone: "Phone Number",
        billingCountry: "Country",
        billingCity: "City",
        billingAddress: "Address",
        billingZipCode: "Zip Code",
        noAddress: "No billing address saved yet.",
        addAddress: "Add Address",
        editAddress: "Edit",
        deleteAddress: "Delete",
        addressSaved: "Billing address saved",
        addressDeleted: "Billing address deleted",
        individual: "Individual",
        corporate: "Corporate",
        companyName: "Company Name",
        taxOffice: "Tax Office",
        taxNumber: "Tax Number",
        cancel: "Cancel",
        deleteConfirmTitle: "Are you sure?",
        deleteConfirmDesc: "This billing address will be permanently deleted.",
        addNewAddress: "Add New Address",
    },
    tr: {
        profileTitle: "Profil Bilgileri",
        profileDesc: "Kişisel bilgileriniz.",
        email: "E-posta",
        fullName: "Ad Soyad",
        save: "Kaydet",
        securityTitle: "Güvenlik",
        securityDesc: "Şifrenizi güncelleyin.",
        currentPassword: "Mevcut Şifre",
        newPassword: "Yeni Şifre",
        confirmPassword: "Yeni Şifre (Tekrar)",
        updatePassword: "Şifreyi Güncelle",
        passwordMismatch: "Yeni şifreler eşleşmiyor",
        profileUpdated: "Profil başarıyla güncellendi",
        passwordUpdated: "Şifre başarıyla güncellendi",
        error: "Bir hata oluştu",
        languageTitle: "Dil Tercihleri",
        languageDesc: "Panel için tercih ettiğiniz dili seçin.",
        language: "Dil",
        english: "English",
        turkish: "Türkçe",
        languageUpdated: "Dil tercihi kaydedildi",
        updateLanguage: "Dili Güncelle",
        billingTitle: "Fatura Adresi",
        billingDesc: "Faturalarınız için adres bilgilerinizi yönetin.",
        billingPlaceholder: "Sokak adresi...",
        billingFullName: "Ad Soyad",
        billingPhone: "Telefon Numarası",
        billingCountry: "Ülke",
        billingCity: "Şehir",
        billingAddress: "Adres",
        billingZipCode: "Posta Kodu",
        noAddress: "Henüz kayıtlı fatura adresi yok.",
        addAddress: "Adres Ekle",
        editAddress: "Düzenle",
        deleteAddress: "Sil",
        addressSaved: "Fatura adresi kaydedildi",
        addressDeleted: "Fatura adresi silindi",
        individual: "Bireysel",
        corporate: "Kurumsal",
        companyName: "Şirket Adı",
        taxOffice: "Vergi Dairesi",
        taxNumber: "Vergi Numarası",
        cancel: "İptal",
        deleteConfirmTitle: "Emin misiniz?",
        deleteConfirmDesc: "Bu fatura adresi kalıcı olarak silinecektir.",
        addNewAddress: "Yeni Adres Ekle",
    },
};

const countries = [
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

export function SettingsForm({ user, locale = "en" }: SettingsFormProps) {
    const router = useRouter();
    const t = texts[locale];
    const [isLoading, setIsLoading] = useState(false);
    const [isLanguageLoading, setIsLanguageLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(user?.language || "en");

    // Password visibility states
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Accordion states
    const [openProfile, setOpenProfile] = useState(true);
    const [openSecurity, setOpenSecurity] = useState(false);
    const [openBilling, setOpenBilling] = useState(false);
    const [openLanguage, setOpenLanguage] = useState(false);

    // Billing states
    const [isEditingBilling, setIsEditingBilling] = useState(false);
    const [isBillingLoading, setIsBillingLoading] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<string | null>(null);

    // Parse existing billing addresses (handle single object or array)
    const savedAddresses: BillingData[] = user?.billingAddress ? (() => {
        try {
            const parsed = JSON.parse(user.billingAddress);
            if (Array.isArray(parsed)) return parsed;
            // Backwards compatibility for single object
            if (parsed && typeof parsed === 'object') return [{ ...parsed, id: 'default' }];
            return [];
        } catch {
            return [];
        }
    })() : [];

    const emptyBilling: BillingData = {
        id: "",
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
    };

    const [billingData, setBillingData] = useState<BillingData>(emptyBilling);

    async function handleBillingSave() {
        setIsBillingLoading(true);
        try {
            let updatedAddresses;
            const now = Date.now().toString();

            if (billingData.id) {
                // Update existing
                updatedAddresses = savedAddresses.map(addr =>
                    addr.id === billingData.id ? billingData : addr
                );
            } else {
                // Add new
                updatedAddresses = [...savedAddresses, { ...billingData, id: now }];
            }

            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ billingAddress: JSON.stringify(updatedAddresses) }),
            });

            if (!response.ok) throw new Error("Failed to save billing address");

            toast.success(t.addressSaved);
            setIsEditingBilling(false);
            setBillingData(emptyBilling);
            router.refresh();
        } catch (error) {
            toast.error(t.error);
        } finally {
            setIsBillingLoading(false);
        }
    }

    async function handleBillingDelete() {
        if (!addressToDelete) return;
        setIsBillingLoading(true);
        try {
            const updatedAddresses = savedAddresses.filter(addr => addr.id !== addressToDelete);

            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ billingAddress: JSON.stringify(updatedAddresses) }),
            });

            if (!response.ok) throw new Error("Failed to delete billing address");

            toast.success(t.addressDeleted);
            setAddressToDelete(null);
            router.refresh();
        } catch (error) {
            toast.error(t.error);
        } finally {
            setIsBillingLoading(false);
        }
    }

    async function handleLanguageUpdate() {
        setIsLanguageLoading(true);

        try {
            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ language: selectedLanguage }),
            });

            if (!response.ok) throw new Error("Failed to update language");

            toast.success(t.languageUpdated);

            const newPath = selectedLanguage === "tr" ? "/tr/settings" : "/settings";
            router.push(newPath);
            router.refresh();
        } catch (error) {
            toast.error(t.error);
            setSelectedLanguage(user?.language || "en");
        } finally {
            setIsLanguageLoading(false);
        }
    }

    async function handlePasswordUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        if (newPassword !== confirmPassword) {
            toast.error(t.passwordMismatch);
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch("/api/user/password", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to update password");
            }

            toast.success(t.passwordUpdated);
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            {/* Profile Information */}
            <Collapsible open={openProfile} onOpenChange={setOpenProfile}>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-zinc-800/50 transition-colors rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-violet-500/10">
                                        <User className="h-5 w-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white">{t.profileTitle}</CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            {t.profileDesc}
                                        </CardDescription>
                                    </div>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${openProfile ? "rotate-180" : ""}`} />
                            </div>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent className="pt-0">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">{t.email}</Label>
                                    <Input
                                        value={user?.email}
                                        disabled
                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-zinc-300">{t.fullName}</Label>
                                    <Input
                                        value={user?.name || ""}
                                        disabled
                                        className="bg-zinc-800/50 border-zinc-700 text-zinc-400"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Billing Address */}
            <Collapsible open={openBilling} onOpenChange={setOpenBilling}>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-zinc-800/50 transition-colors rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-green-500/10">
                                        <MapPin className="h-5 w-5 text-green-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white">{t.billingTitle}</CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            {t.billingDesc}
                                        </CardDescription>
                                    </div>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${openBilling ? "rotate-180" : ""}`} />
                            </div>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent className="pt-0 space-y-4">
                            {!isEditingBilling ? (
                                <div className="space-y-4">
                                    {savedAddresses.map((addr) => (
                                        <div key={addr.id} className="bg-zinc-800/50 rounded-lg p-4 space-y-3 border border-transparent hover:border-zinc-700 transition-colors">
                                            <div className="flex items-start justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-white font-medium">{addr.fullName}</p>
                                                        {addr.type === "corporate" && (
                                                            <span className="text-[10px] bg-violet-500/10 text-violet-400 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider border border-violet-500/20">
                                                                {t.corporate}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-zinc-400 text-sm">{addr.phone}</p>
                                                </div>
                                                <div className="flex gap-1">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => {
                                                            setBillingData(addr);
                                                            setIsEditingBilling(true);
                                                        }}
                                                        className="h-8 w-8 text-zinc-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => setAddressToDelete(addr.id)}
                                                        className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="text-zinc-300 text-sm space-y-1">
                                                {addr.type === "corporate" && addr.companyName && (
                                                    <div className="flex items-center gap-2 text-violet-400 font-medium pb-1">
                                                        <Building2 className="h-4 w-4" />
                                                        {addr.companyName}
                                                    </div>
                                                )}
                                                {addr.type === "corporate" && (addr.taxOffice || addr.taxNumber) && (
                                                    <p className="text-zinc-500 text-xs">
                                                        {addr.taxOffice && `${addr.taxOffice}`}
                                                        {addr.taxOffice && addr.taxNumber && " - "}
                                                        {addr.taxNumber && addr.taxNumber}
                                                    </p>
                                                )}
                                                <p>{addr.address}</p>
                                                <p>{addr.city}, {addr.zipCode}</p>
                                                <p className="text-zinc-400">{countries.find(c => c.code === addr.country)?.name || addr.country}</p>
                                            </div>
                                        </div>
                                    ))}

                                    {savedAddresses.length === 0 && (
                                        <div className="flex flex-col items-center justify-center py-12 text-center border-2 border-dashed border-zinc-800 rounded-xl">
                                            <div className="p-3 rounded-full bg-zinc-800/50 mb-3">
                                                <MapPin className="h-6 w-6 text-zinc-600" />
                                            </div>
                                            <p className="text-zinc-400 text-sm">{t.noAddress}</p>
                                        </div>
                                    )}

                                    <Button
                                        onClick={() => {
                                            setBillingData(emptyBilling);
                                            setIsEditingBilling(true);
                                        }}
                                        variant="ghost"
                                        className="w-full border-2 border-dashed border-zinc-800 hover:border-violet-500/50 hover:bg-violet-500/5 text-zinc-300 hover:text-white h-20 rounded-xl transition-all group"
                                    >
                                        <div className="flex flex-col items-center gap-1">
                                            <Plus className="h-6 w-6 mb-1 text-violet-400 group-hover:scale-110 group-hover:text-violet-300 transition-all" />
                                            <span className="text-sm font-semibold tracking-wide">{t.addNewAddress}</span>
                                        </div>
                                    </Button>
                                </div>
                            ) : (
                                // Edit form
                                <div className="space-y-4">
                                    {/* Billing Type Tabs */}
                                    <Tabs
                                        value={billingData.type}
                                        onValueChange={(v) => setBillingData({ ...billingData, type: v as "individual" | "corporate" })}
                                        className="w-full"
                                    >
                                        <TabsList className="bg-zinc-800 border-zinc-700 h-11 p-1 w-full md:w-auto">
                                            <TabsTrigger
                                                value="individual"
                                                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-zinc-300 hover:text-white transition-colors"
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                {t.individual}
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="corporate"
                                                className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-zinc-300 hover:text-white transition-colors"
                                            >
                                                <Building2 className="h-4 w-4 mr-2" />
                                                {t.corporate}
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">{t.billingFullName}</Label>
                                            <Input
                                                value={billingData.fullName}
                                                onChange={(e) => setBillingData({ ...billingData, fullName: e.target.value })}
                                                placeholder="John Doe"
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">{t.billingPhone}</Label>
                                            <Input
                                                value={billingData.phone}
                                                onChange={(e) => setBillingData({ ...billingData, phone: e.target.value })}
                                                placeholder="+1..."
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Corporate Fields */}
                                    {billingData.type === "corporate" && (
                                        <div className="space-y-4 pt-4 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="space-y-2">
                                                <Label className="text-zinc-300">{t.companyName}</Label>
                                                <Input
                                                    value={billingData.companyName || ""}
                                                    onChange={(e) => setBillingData({ ...billingData, companyName: e.target.value })}
                                                    placeholder={locale === "tr" ? "Şirket adı..." : "Company name..."}
                                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                                />
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label className="text-zinc-300">{t.taxOffice}</Label>
                                                    <Input
                                                        value={billingData.taxOffice || ""}
                                                        onChange={(e) => setBillingData({ ...billingData, taxOffice: e.target.value })}
                                                        placeholder={locale === "tr" ? "Vergi dairesi..." : "Tax office..."}
                                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-zinc-300">{t.taxNumber}</Label>
                                                    <Input
                                                        value={billingData.taxNumber || ""}
                                                        onChange={(e) => setBillingData({ ...billingData, taxNumber: e.target.value })}
                                                        placeholder={locale === "tr" ? "Vergi numarası..." : "Tax number..."}
                                                        className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">{t.billingCountry}</Label>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className="w-full justify-between bg-zinc-800/50 border-zinc-700 text-white hover:bg-zinc-800 hover:text-white"
                                                    >
                                                        {billingData.country
                                                            ? countries.find((c) => c.code === billingData.country)?.name
                                                            : locale === 'tr' ? "Ülke seçin..." : "Select country..."}
                                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    className="p-0 bg-zinc-900 border-zinc-800"
                                                    style={{ width: "var(--radix-popover-trigger-width)" }}
                                                    align="start"
                                                >
                                                    <Command className="bg-zinc-900">
                                                        <CommandInput
                                                            placeholder={locale === 'tr' ? "Ülke ara..." : "Search country..."}
                                                            className="text-white placeholder:text-zinc-400"
                                                        />
                                                        <CommandList>
                                                            <CommandEmpty className="text-zinc-400 text-sm py-6 text-center">
                                                                {locale === 'tr' ? "Ülke bulunamadı." : "No country found."}
                                                            </CommandEmpty>
                                                            <CommandGroup className="max-h-64 overflow-auto">
                                                                {countries.map((c) => (
                                                                    <CommandItem
                                                                        key={c.code}
                                                                        value={c.name}
                                                                        onSelect={() => {
                                                                            setBillingData({ ...billingData, country: c.code });
                                                                        }}
                                                                        className="text-zinc-300 hover:bg-zinc-800 hover:text-white cursor-pointer"
                                                                    >
                                                                        <Check
                                                                            className={cn(
                                                                                "mr-2 h-4 w-4",
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
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">{t.billingCity}</Label>
                                            <Input
                                                value={billingData.city}
                                                onChange={(e) => setBillingData({ ...billingData, city: e.target.value })}
                                                placeholder="Istanbul"
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-2 space-y-2">
                                            <Label className="text-zinc-300">{t.billingAddress}</Label>
                                            <Input
                                                value={billingData.address}
                                                onChange={(e) => setBillingData({ ...billingData, address: e.target.value })}
                                                placeholder={t.billingPlaceholder}
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-zinc-300">{t.billingZipCode}</Label>
                                            <Input
                                                value={billingData.zipCode}
                                                onChange={(e) => setBillingData({ ...billingData, zipCode: e.target.value })}
                                                placeholder="34000"
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-end gap-2 pt-2">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            onClick={() => setIsEditingBilling(false)}
                                            className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                                        >
                                            {t.cancel}
                                        </Button>
                                        <Button
                                            onClick={handleBillingSave}
                                            disabled={isBillingLoading}
                                            className="bg-violet-600 hover:bg-violet-500 text-white"
                                        >
                                            {isBillingLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {t.save}
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Delete Confirmation Dialog */}
            <Dialog open={!!addressToDelete} onOpenChange={(open) => !open && setAddressToDelete(null)}>
                <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle>{t.deleteConfirmTitle}</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            {t.deleteConfirmDesc}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0 mt-4">
                        <Button
                            variant="ghost"
                            onClick={() => setAddressToDelete(null)}
                            className="text-zinc-400 hover:text-white"
                        >
                            {t.cancel}
                        </Button>
                        <Button
                            onClick={handleBillingDelete}
                            disabled={isBillingLoading}
                            className="bg-red-600 hover:bg-red-500 text-white"
                        >
                            {isBillingLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Trash2 className="h-4 w-4 mr-2" />}
                            {t.deleteAddress}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Security */}
            <Collapsible open={openSecurity} onOpenChange={setOpenSecurity}>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-zinc-800/50 transition-colors rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-orange-500/10">
                                        <Shield className="h-5 w-5 text-orange-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white">{t.securityTitle}</CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            {t.securityDesc}
                                        </CardDescription>
                                    </div>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${openSecurity ? "rotate-180" : ""}`} />
                            </div>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent className="pt-0">
                            <form onSubmit={handlePasswordUpdate} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="currentPassword" className="text-zinc-300">{t.currentPassword}</Label>
                                    <div className="relative">
                                        <Input
                                            id="currentPassword"
                                            name="currentPassword"
                                            type={showCurrentPassword ? "text" : "password"}
                                            required
                                            className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500 pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-400 transition-colors"
                                        >
                                            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="newPassword" className="text-zinc-300">{t.newPassword}</Label>
                                        <div className="relative">
                                            <Input
                                                id="newPassword"
                                                name="newPassword"
                                                type={showNewPassword ? "text" : "password"}
                                                required
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowNewPassword(!showNewPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-400 transition-colors"
                                            >
                                                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-zinc-300">{t.confirmPassword}</Label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                required
                                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500 pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-violet-400 transition-colors"
                                            >
                                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="bg-violet-600 hover:bg-violet-500 text-white"
                                    >
                                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                        {t.updatePassword}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>

            {/* Language Preferences */}
            <Collapsible open={openLanguage} onOpenChange={setOpenLanguage}>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CollapsibleTrigger asChild>
                        <CardHeader className="cursor-pointer hover:bg-zinc-800/50 transition-colors rounded-t-lg">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-blue-500/10">
                                        <Globe className="h-5 w-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-white">{t.languageTitle}</CardTitle>
                                        <CardDescription className="text-zinc-400">
                                            {t.languageDesc}
                                        </CardDescription>
                                    </div>
                                </div>
                                <ChevronDown className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${openLanguage ? "rotate-180" : ""}`} />
                            </div>
                        </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <CardContent className="pt-0">
                            <div className="flex items-end justify-between gap-4">
                                <div className="space-y-2 max-w-xs">
                                    <Label className="text-zinc-300">{t.language}</Label>
                                    <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                                        <SelectTrigger className="bg-zinc-800/50 border-zinc-700 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-800 border-zinc-700">
                                            <SelectItem value="en" className="text-white focus:bg-zinc-700">
                                                {t.english}
                                            </SelectItem>
                                            <SelectItem value="tr" className="text-white focus:bg-zinc-700">
                                                {t.turkish}
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    onClick={handleLanguageUpdate}
                                    disabled={isLanguageLoading || selectedLanguage === user?.language}
                                    className="bg-violet-600 hover:bg-violet-500 text-white"
                                >
                                    {isLanguageLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {t.updateLanguage}
                                </Button>
                            </div>
                        </CardContent>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        </div>
    );
}

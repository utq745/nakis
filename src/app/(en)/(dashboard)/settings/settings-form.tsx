"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
    user: any;
    locale?: "en" | "tr";
}

const texts = {
    en: {
        profileTitle: "Profile Information",
        profileDesc: "Update your personal information.",
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
    },
    tr: {
        profileTitle: "Profil Bilgileri",
        profileDesc: "Kişisel bilgilerinizi güncelleyin.",
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
    },
};

export function SettingsForm({ user, locale = "en" }: SettingsFormProps) {
    const router = useRouter();
    const t = texts[locale];
    const [isLoading, setIsLoading] = useState(false);
    const [isLanguageLoading, setIsLanguageLoading] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(user?.language || "en");

    async function handleProfileUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        try {
            const response = await fetch("/api/user/profile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) throw new Error("Failed to update profile");

            toast.success(t.profileUpdated);
            router.refresh();
        } catch (error) {
            toast.error(t.error);
        } finally {
            setIsLoading(false);
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

            // Redirect to correct language path
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
        <div className="space-y-6">
            {/* Profile Information */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">{t.profileTitle}</CardTitle>
                    <CardDescription className="text-zinc-400">
                        {t.profileDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
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
                                <Label htmlFor="name" className="text-zinc-300">{t.fullName}</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    defaultValue={user?.name || ""}
                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="bg-violet-600 hover:bg-violet-500 text-white"
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {t.save}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Security */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">{t.securityTitle}</CardTitle>
                    <CardDescription className="text-zinc-400">
                        {t.securityDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-zinc-300">{t.currentPassword}</Label>
                            <Input
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                required
                                className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                            />
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="newPassword" className="text-zinc-300">{t.newPassword}</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-zinc-300">{t.confirmPassword}</Label>
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                />
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
            </Card>

            {/* Language Preferences - At the bottom */}
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">{t.languageTitle}</CardTitle>
                    <CardDescription className="text-zinc-400">
                        {t.languageDesc}
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
            </Card>
        </div>
    );
}

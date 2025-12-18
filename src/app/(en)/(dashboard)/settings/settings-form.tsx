"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SettingsFormProps {
    user: any;
}

export function SettingsForm({ user }: SettingsFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

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

            toast.success("Profile updated successfully");
            router.refresh();
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsLoading(false);
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
            toast.error("New passwords do not match");
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

            toast.success("Password updated successfully");
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Profile Information</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Update your personal information.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label className="text-zinc-300">Email</Label>
                                <Input
                                    value={user?.email}
                                    disabled
                                    className="bg-zinc-800/50 border-zinc-700 text-zinc-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-zinc-300">Full Name</Label>
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
                                Save
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                    <CardTitle className="text-white">Security</CardTitle>
                    <CardDescription className="text-zinc-400">
                        Update your password.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword" className="text-zinc-300">Current Password</Label>
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
                                <Label htmlFor="newPassword" className="text-zinc-300">New Password</Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    required
                                    className="bg-zinc-800/50 border-zinc-700 text-white focus:border-violet-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-zinc-300">Confirm New Password</Label>
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
                                className="bg-indigo-600 hover:bg-indigo-500 text-white"
                            >
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Update Password
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

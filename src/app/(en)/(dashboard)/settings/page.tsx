import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
    const session = await auth();

    // Get user with language preference
    const user = session?.user?.id
        ? await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { id: true, email: true, name: true, role: true, image: true, language: true, billingAddress: true, password: true, deleteAccountToken: true, deleteAccountTokenExpires: true },
        })
        : null;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Settings</h2>
                <p className="text-muted-foreground">
                    Manage your profile preferences and account settings.
                </p>
            </div>

            <SettingsForm user={user} locale="en" />
        </div>
    );
}

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
    const session = await auth();

    // Get user with language preference
    const user = session?.user?.id
        ? await prisma.user.findUnique({
            where: { id: session.user.id },
            select: { id: true, email: true, name: true, role: true, image: true, language: true, billingAddress: true },
        })
        : null;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Settings</h2>
                <p className="text-zinc-400">
                    Manage your profile preferences and account settings.
                </p>
            </div>

            <SettingsForm user={user} locale="en" />
        </div>
    );
}

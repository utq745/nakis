import { auth } from "@/lib/auth";
import { SettingsForm } from "./settings-form";

export default async function SettingsPage() {
    const session = await auth();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Ayarlar</h2>
                <p className="text-zinc-400">
                    Profil tercihlerinizi ve hesap ayarlarınızı yönetin.
                </p>
            </div>

            <SettingsForm user={session?.user} />
        </div>
    );
}

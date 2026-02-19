"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, AlertTriangle, Send } from "lucide-react";
import { useLanguage } from "@/components/providers/language-provider";
import { cn } from "@/lib/utils";

interface ActionConfirmDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isPending?: boolean;
    title?: string;
    description?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    icon?: React.ReactNode;
}

export function ActionConfirmDialog({
    isOpen,
    onOpenChange,
    onConfirm,
    isPending = false,
    title,
    description,
    confirmText,
    cancelText,
    variant = "destructive",
    icon,
}: ActionConfirmDialogProps) {
    const { t } = useLanguage();

    const isDestructive = variant === "destructive";

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-card border-border sm:max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={cn(
                            "p-2 rounded-full",
                            isDestructive ? "bg-red-500/10 text-red-500" : "bg-violet-500/10 text-violet-500"
                        )}>
                            {icon || (isDestructive ? <AlertTriangle className="h-6 w-6" /> : <Send className="h-6 w-6" />)}
                        </div>
                        <DialogTitle className="text-foreground">
                            {title || (isDestructive ? t.common?.confirmDelete : "İşlemi Onayla")}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-muted-foreground">
                        {description}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 gap-2">
                    <Button
                        variant="ghost"
                        onClick={() => onOpenChange(false)}
                        className="text-muted-foreground hover:text-foreground hover:bg-accent"
                        disabled={isPending}
                    >
                        {cancelText || t.common?.cancel || "İptal"}
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isPending}
                        className={cn(
                            "text-white gap-2 shadow-lg transition-all",
                            isDestructive
                                ? "bg-red-600 hover:bg-red-500 shadow-red-900/20"
                                : "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-violet-900/20"
                        )}
                    >
                        {isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            isDestructive ? <Trash2 className="h-4 w-4" /> : <Send className="h-4 w-4" />
                        )}
                        {confirmText || (isDestructive ? (t.common?.delete || "Sil") : "Gönder")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

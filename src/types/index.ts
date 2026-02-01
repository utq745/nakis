export type Role = "CUSTOMER" | "ADMIN";

// New Order Status Flow:
// 1. ORDERED - Customer creates order (price auto-set for P1/P2, zero for P3)
// 2. PRICED - Admin sends quote for P3
// 3. APPROVAL_AWAITING - Only for Package 1, admin sends preview
// 4. REVISION - Customer requests revision (+$10 fee)
// 5. IN_PROGRESS - Customer approves preview OR packages 2/3 go directly here (P3 moves here after price approval)
// 6. PAYMENT_PENDING - Admin uploads final files
// 7. COMPLETED - Customer pays
// 8. DELIVERED - Customer downloads files
// 9. CANCELLED - Order cancelled
export type OrderStatus = "ORDERED" | "PRICED" | "APPROVAL_AWAITING" | "REVISION" | "IN_PROGRESS" | "PAYMENT_PENDING" | "COMPLETED" | "DELIVERED" | "CANCELLED";

export interface SafeUser {
    id: string;
    email: string;
    name: string | null;
    role: Role;
    billingAddress: string | null;
    createdAt: Date;
}

export interface OrderWithRelations {
    id: string;
    title: string | null;
    description: string | null;
    status: OrderStatus;
    price: number | null;
    customerId: string;
    customer: SafeUser;
    files: FileInfo[];
    comments: CommentWithUser[];
    createdAt: Date;
    updatedAt: Date;
}

export interface FileInfo {
    id: string;
    name: string;
    url: string;
    type: "original" | "preview" | "final";
    size: number | null;
    orderId: string;
    uploadedBy: string;
    createdAt: Date;
}

export interface CommentWithUser {
    id: string;
    content: string;
    orderId: string;
    userId: string;
    user: SafeUser;
    createdAt: Date;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    ORDERED: "Order Received",
    PRICED: "Quote Sent",
    APPROVAL_AWAITING: "Awaiting Preview Approval",
    REVISION: "Revision Requested",
    IN_PROGRESS: "In Progress",
    PAYMENT_PENDING: "Payment Pending",
    COMPLETED: "Completed",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
};

export const ORDER_STATUS_LABELS_TR: Record<OrderStatus, string> = {
    ORDERED: "Sipariş Alındı",
    PRICED: "Fiyat Teklifi Gönderildi",
    APPROVAL_AWAITING: "Önizleme Onayı Bekleniyor",
    REVISION: "Revizyon İstendi",
    IN_PROGRESS: "Sipariş Hazırlanıyor",
    PAYMENT_PENDING: "Ödeme Bekleniyor",
    COMPLETED: "Tamamlandı",
    DELIVERED: "Teslim Edildi",
    CANCELLED: "İptal Edildi",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    ORDERED: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
    PRICED: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-500",
    APPROVAL_AWAITING: "bg-orange-500/10 text-orange-600 dark:text-orange-500",
    REVISION: "bg-red-500/10 text-red-600 dark:text-red-500",
    IN_PROGRESS: "bg-purple-500/10 text-purple-600 dark:text-purple-500",
    PAYMENT_PENDING: "bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-500",
    COMPLETED: "bg-green-500/10 text-green-600 dark:text-green-500",
    DELIVERED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500",
    CANCELLED: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-500",
};


export type Role = "CUSTOMER" | "ADMIN";

// Order Status Flow:
// 1. ORDERED - Customer creates order
// 2. IN_PROGRESS - Admin starts working on the order
// 3. PRICED - Price shared with customer (only for "New Digitizing + Sample")
// 4. REVISION - Customer requests revision (only for "New Digitizing + Sample")
// 5. COMPLETED - Order is finished, final files ready
// 6. DELIVERED - Customer downloads files
// 7. CANCELLED - Order cancelled (ORDERED, or PRICED rejection for package 3)
export type OrderStatus = "ORDERED" | "IN_PROGRESS" | "PRICED" | "REVISION" | "COMPLETED" | "DELIVERED" | "CANCELLED";

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
    IN_PROGRESS: "In Progress",
    PRICED: "Priced",
    REVISION: "Revision Requested",
    COMPLETED: "Completed",
    DELIVERED: "Delivered",
    CANCELLED: "Cancelled",
};

export const ORDER_STATUS_LABELS_TR: Record<OrderStatus, string> = {
    ORDERED: "Sipariş Alındı",
    IN_PROGRESS: "Sipariş Hazırlanıyor",
    PRICED: "Fiyatlandırıldı",
    REVISION: "Revizyon İstendi",
    COMPLETED: "Tamamlandı",
    DELIVERED: "Teslim Edildi",
    CANCELLED: "İptal Edildi",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    ORDERED: "bg-blue-500/10 text-blue-600 dark:text-blue-500",
    IN_PROGRESS: "bg-purple-500/10 text-purple-600 dark:text-purple-500",
    PRICED: "bg-amber-500/10 text-amber-600 dark:text-amber-500",
    REVISION: "bg-red-500/10 text-red-600 dark:text-red-500",
    COMPLETED: "bg-green-500/10 text-green-600 dark:text-green-500",
    DELIVERED: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500",
    CANCELLED: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-500",
};

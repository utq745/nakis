export type Role = "CUSTOMER" | "ADMIN";

export type OrderStatus = "WAITING_PRICE" | "PRICED" | "PRICE_ACCEPTED" | "APPROVAL_AWAITING" | "IN_PROGRESS" | "PAYMENT_PENDING" | "COMPLETED" | "CANCELLED";

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
    WAITING_PRICE: "Price Pending",
    PRICED: "Priced",
    PRICE_ACCEPTED: "Price Accepted",
    APPROVAL_AWAITING: "Awaiting Preview Approval",
    IN_PROGRESS: "In Progress",
    PAYMENT_PENDING: "Payment Pending",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
};

export const ORDER_STATUS_LABELS_TR: Record<OrderStatus, string> = {
    WAITING_PRICE: "Fiyat Bekleniyor",
    PRICED: "Fiyatlandırıldı",
    PRICE_ACCEPTED: "Fiyat Onaylandı",
    APPROVAL_AWAITING: "Önizleme Onayı Bekleniyor",
    IN_PROGRESS: "Sipariş Hazırlanıyor",
    PAYMENT_PENDING: "Ödeme Bekleniyor",
    COMPLETED: "Tamamlandı",
    CANCELLED: "İptal Edildi",
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    WAITING_PRICE: "bg-yellow-500/10 text-yellow-500",
    PRICED: "bg-blue-500/10 text-blue-500",
    PRICE_ACCEPTED: "bg-emerald-500/10 text-emerald-500",
    APPROVAL_AWAITING: "bg-orange-500/10 text-orange-500",
    IN_PROGRESS: "bg-purple-500/10 text-purple-500",
    PAYMENT_PENDING: "bg-fuchsia-500/10 text-fuchsia-500",
    COMPLETED: "bg-green-500/10 text-green-500",
    CANCELLED: "bg-red-500/10 text-red-500",
};

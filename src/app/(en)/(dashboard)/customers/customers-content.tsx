"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface Customer {
    id: string;
    name: string | null;
    email: string | null;
    role: string;
    image: string | null;
    createdAt: string;
    _count: {
        orders: number;
    };
}

interface CustomersContentProps {
    customers: Customer[];
}

export function CustomersContent({ customers }: CustomersContentProps) {
    const { t, language } = useLanguage();
    const dateLocale = language === "tr" ? "tr-TR" : "en-US";

    return (
        <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-foreground flex items-center gap-2">
                    <Users className="h-6 w-6 text-violet-400" />
                    {t.customers.title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow className="border-border hover:bg-accent/50">
                            <TableHead className="text-muted-foreground">{t.customers.name}</TableHead>
                            <TableHead className="text-muted-foreground">{t.customers.email}</TableHead>
                            <TableHead className="text-muted-foreground">{t.customers.role}</TableHead>
                            <TableHead className="text-muted-foreground">{t.customers.orderCount}</TableHead>
                            <TableHead className="text-right text-muted-foreground">{t.customers.joinedAt}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                                    {t.customers.noCustomers}
                                </TableCell>
                            </TableRow>
                        ) : (
                            customers.map((customer) => (
                                <TableRow key={customer.id} className="border-border hover:bg-accent/50">
                                    <TableCell className="font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8 border border-border">
                                                {customer.image && (
                                                    <AvatarImage src={customer.image} alt={customer.name || ""} />
                                                )}
                                                <AvatarFallback className="bg-accent text-muted-foreground text-xs font-bold">
                                                    {(customer.name || customer.email || "U")[0].toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span>{customer.name || "-"}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{customer.email}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        <span className={cn(
                                            "px-2 py-1 rounded-full text-xs border",
                                            customer.role === 'ADMIN'
                                                ? "bg-purple-500/10 text-purple-400 border-purple-500/20"
                                                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                                        )}>
                                            {customer.role}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground pl-8">
                                        {customer._count.orders}
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">
                                        {new Date(customer.createdAt).toLocaleDateString(dateLocale)}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { rm } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

/**
 * CRON Job: Cleanup Cancelled Orders
 * This endpoint should be called periodically (e.g., daily) to delete 
 * orders that have been in "CANCELLED" status for more than 30 days.
 * 
 * Target: [ ] İptal edilen siparişler 30 gün sonra silinir.
 */

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Simple security check: search for a secret in headers or query
        const { searchParams } = new URL(request.url);
        const secret = searchParams.get('secret') || request.headers.get('x-cron-secret');

        // In production, define CRON_SECRET in environment variables
        if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // Find cancelled orders older than 30 days
        const ordersToDelete = await prisma.order.findMany({
            where: {
                status: "CANCELLED",
                OR: [
                    {
                        // @ts-ignore
                        cancelledAt: {
                            lte: thirtyDaysAgo
                        }
                    },
                    {
                        AND: [
                            // @ts-ignore
                            { cancelledAt: null }, // Handle orders cancelled before migration
                            { updatedAt: { lte: thirtyDaysAgo } }
                        ]
                    }
                ]
            }
        });

        if (ordersToDelete.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No orders found for cleanup (30+ days cancelled).",
                timestamp: new Date().toISOString()
            });
        }

        let deletedCount = 0;
        for (const order of ordersToDelete) {
            // @ts-ignore
            console.log(`[CLEANUP] Deleting cancelled order: ${order.id} (Cancelled at: ${order.cancelledAt})`);

            // 1. Physical File Cleanup
            // Cleanup secure uploads directory
            const secureDir = join(process.cwd(), "uploads", order.id);
            if (existsSync(secureDir)) {
                await rm(secureDir, { recursive: true, force: true });
                console.log(`[CLEANUP] Removed secure directory: ${secureDir}`);
            }

            // Cleanup public uploads directory (legacy/thumbnails)
            const publicDir = join(process.cwd(), "public", "uploads", order.id);
            if (existsSync(publicDir)) {
                await rm(publicDir, { recursive: true, force: true });
                console.log(`[CLEANUP] Removed public directory: ${publicDir}`);
            }

            // 2. Database Cleanup 
            // Prisma relations are set to onDelete: Cascade in schema.prisma,
            // so deleting the order will remove: Comments, Files, WilcomData, etc.
            await prisma.order.delete({
                where: { id: order.id }
            });

            deletedCount++;
        }

        return NextResponse.json({
            success: true,
            message: `Cleanup completed. ${deletedCount} orders deleted.`,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error("[CRON_CLEANUP_ERROR]", error);
        return NextResponse.json({
            success: false,
            error: "Order cleanup failed. Check server logs.",
            timestamp: new Date().toISOString()
        }, { status: 500 });
    }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return new NextResponse("Token missing", { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                deleteAccountToken: token,
                deleteAccountTokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return new NextResponse("Invalid or expired token", { status: 400 });
        }

        const escapedToken = token.replace(/"/g, "&quot;");
        const html = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Confirm Account Deletion</title>
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: #0b1020; color: #f4f7ff; margin: 0; }
      .wrap { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
      .card { width: 100%; max-width: 520px; background: #121a31; border: 1px solid #2a3558; border-radius: 14px; padding: 24px; }
      h1 { margin: 0 0 12px; font-size: 22px; }
      p { margin: 0 0 18px; color: #b9c3e3; line-height: 1.5; }
      button { width: 100%; border: 0; border-radius: 10px; padding: 12px; font-weight: 700; cursor: pointer; background: #ef4444; color: #fff; }
      button:hover { background: #dc2626; }
    </style>
  </head>
  <body>
    <main class="wrap">
      <section class="card">
        <h1>Confirm Account Deletion</h1>
        <p>This action permanently deletes your account and related data. Click the button below to continue.</p>
        <form method="post">
          <input type="hidden" name="token" value="${escapedToken}" />
          <button type="submit">Permanently Delete My Account</button>
        </form>
      </section>
    </main>
  </body>
</html>`;

        return new NextResponse(html, {
            status: 200,
            headers: { "Content-Type": "text/html; charset=utf-8" },
        });
    } catch (error) {
        console.error("Confirm delete account error:", error);
        return new NextResponse("Failed to confirm account deletion", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const contentType = request.headers.get("content-type") || "";
        let token: string | null = null;

        if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
            const formData = await request.formData();
            token = formData.get("token")?.toString() || null;
        }

        if (!token) {
            const { searchParams } = new URL(request.url);
            token = searchParams.get("token");
        }

        if (!token) {
            return new NextResponse("Token missing", { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                deleteAccountToken: token,
                deleteAccountTokenExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return new NextResponse("Invalid or expired token", { status: 400 });
        }

        // Perform cascading delete (GDPR)
        await prisma.$transaction(async (tx) => {
            // Delete user's orders (cascades to files, comments, wilcomData)
            await tx.order.deleteMany({
                where: { customerId: user.id },
            });

            // Delete user's comments on other orders
            await tx.comment.deleteMany({
                where: { userId: user.id },
            });

            // Delete user's sessions
            await tx.session.deleteMany({
                where: { userId: user.id },
            });

            // Delete user's accounts (OAuth links)
            await tx.account.deleteMany({
                where: { userId: user.id },
            });

            // Delete user's notifications
            await tx.notification.deleteMany({
                where: { userId: user.id },
            });

            // Finally, delete the user
            await tx.user.delete({
                where: { id: user.id },
            });
        });

        // Redirect to home page with success message
        return NextResponse.redirect(new URL("/?deleted=true", request.url));
    } catch (error) {
        console.error("Confirm delete account POST error:", error);
        return new NextResponse("Failed to confirm account deletion", { status: 500 });
    }
}

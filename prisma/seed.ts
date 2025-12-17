import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    // Create admin user
    const adminPassword = await hash("admin123", 12);
    const admin = await prisma.user.upsert({
        where: { email: "admin@nakis.com" },
        update: {},
        create: {
            email: "admin@nakis.com",
            password: adminPassword,
            name: "Admin",
            role: "ADMIN",
        },
    });
    console.log("Admin user created:", admin.email);

    // Create a test customer
    const customerPassword = await hash("customer123", 12);
    const customer = await prisma.user.upsert({
        where: { email: "customer@test.com" },
        update: {},
        create: {
            email: "customer@test.com",
            password: customerPassword,
            name: "Test Müşteri",
            role: "CUSTOMER",
        },
    });
    console.log("Customer user created:", customer.email);

    // Create a sample order
    const existingOrder = await prisma.order.findFirst({
        where: { customerId: customer.id },
    });

    if (!existingOrder) {
        const order = await prisma.order.create({
            data: {
                title: "Logo Nakış Tasarımı",
                description: "Şirket logomuzu nakış formatına çevirmenizi istiyoruz. Logo boyutu yaklaşık 10x10 cm olacak. Renkler: Mavi ve beyaz.",
                status: "PENDING",
                customerId: customer.id,
            },
        });
        console.log("Sample order created:", order.title);

        // Add a comment
        await prisma.comment.create({
            data: {
                content: "Merhaba, logoyu inceledim. 2 gün içinde önizleme gönderebilirim.",
                orderId: order.id,
                userId: admin.id,
            },
        });
        console.log("Sample comment added");
    } else {
        console.log("Sample order already exists");
    }

    console.log("Seeding completed!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

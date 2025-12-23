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

    // Create sample orders
    const order1 = await prisma.order.create({
        data: {
            title: "Logo Nakış Tasarımı",
            description: "Şirket logomuzu nakış formatına çevirmenizi istiyoruz. Logo boyutu yaklaşık 10x10 cm olacak. Renkler: Mavi ve beyaz.",
            status: "WAITING_PRICE",
            customerId: customer.id,
            priority: "NORMAL",
        },
    });
    console.log("Sample order 1 created:", order1.title);

    const order2 = await prisma.order.create({
        data: {
            title: "3D Puff Nakış - Şapka",
            description: "Beyzbol şapkası için 3D kabartma nakış tasarımı. Logo ekli.",
            status: "PRICED",
            price: 45.00,
            customerId: customer.id,
            priority: "URGENT",
        },
    });
    console.log("Sample order 2 created:", order2.title);

    const order3 = await prisma.order.create({
        data: {
            title: "Özel Arma Tasarımı",
            description: "Ceket için merrow kenarlı özel arma tasarımı gerekiyor.",
            status: "IN_PROGRESS",
            price: 65.00,
            customerId: customer.id,
            priority: "NORMAL",
        },
    });
    console.log("Sample order 3 created:", order3.title);

    // Add a comment to first order
    await prisma.comment.create({
        data: {
            content: "Merhaba, logoyu inceledim. 2 gün içinde önizleme gönderebilirim.",
            orderId: order1.id,
            userId: admin.id,
        },
    });
    console.log("Sample comment added");

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

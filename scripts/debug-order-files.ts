import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkOrder() {
    const orderId = "cmjvmyy03002re1nvzv3vbpbq";
    console.log(`Checking order: ${orderId}`);

    const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: {
            files: true,
            comments: {
                include: {
                    files: true
                }
            }
        }
    });

    if (!order) {
        console.log("Order not found.");
        return;
    }

    console.log("Order found:", {
        id: order.id,
        status: order.status,
        customerId: order.customerId,
        fileCount: order.files.length
    });

    console.log("\nFiles associated with order:");
    order.files.forEach(f => {
        console.log(`- ID: ${f.id}, Name: ${f.name}, Type: ${f.type}, URL: ${f.url}`);
    });

    console.log("\nComments and their attachments:");
    order.comments.forEach(c => {
        if (c.files.length > 0) {
            console.log(`Comment ID: ${c.id}`);
            c.files.forEach(f => {
                console.log(`  - Attachment: ID: ${f.id}, Name: ${f.name}, URL: ${f.url}`);
            });
        }
    });
}

checkOrder()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());

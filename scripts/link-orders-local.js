const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function fix() {
    const user = await prisma.user.findUnique({ where: { email: 'test@test.com' } });
    if (!user) {
        console.log('User test@test.com not found');
        return;
    }
    const result = await prisma.order.updateMany({
        data: { customerId: user.id }
    });
    console.log(`Linked ${result.count} orders to ${user.email} (ID: ${user.id})`);
}

fix()
    .catch(console.error)
    .finally(() => prisma.$disconnect());

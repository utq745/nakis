const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const email = 'test@test.com';
    const newPassword = 'test123';
    // Valid hash for 'test123'
    const hashedPassword = '$2b$12$kVm3vWtifXePD3BkzBuTZu.y8Br.GO9jlFF08plNd2FkIOWrxawdG';

    console.log(`Updating user ${email}...`);

    await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            email,
            password: hashedPassword,
            name: 'Test User',
            role: 'CUSTOMER'
        }
    });

    console.log(`User ${email} has been updated/created with password: ${newPassword}`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

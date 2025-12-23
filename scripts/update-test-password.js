const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const email = 'test@test.com';
    const newPassword = 'test123';
    // Hash for 'test123' generated with bcryptjs (12 rounds)
    const hashedPassword = '$2a$12$GupvXoYm9Vl/yIqN5D.jAuy8hN0g6Iu0A0.zXpU1C7p8G6G8G8G8G';

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

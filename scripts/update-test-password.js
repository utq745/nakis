const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'test@test.com';
    const newPassword = 'test123';

    console.log(`Updating password for ${email}...`);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

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

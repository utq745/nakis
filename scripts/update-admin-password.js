const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
    const email = 'admin@nakis.com';
    const newPassword = 'admin123';

    console.log(`Updating password for ${email}...`);

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: 'ADMIN'
        },
        create: {
            email,
            password: hashedPassword,
            name: 'Admin',
            role: 'ADMIN'
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

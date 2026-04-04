import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = 'godmode@approvalstitch.com';
  const user = await prisma.user.update({
    where: { email },
    data: {
      emailVerified: new Date(),
      role: 'ADMIN',
      emailVerificationToken: null,
      emailVerificationTokenExpires: null,
    },
  });

  console.log('User updated successfully:', JSON.stringify(user, null, 2));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

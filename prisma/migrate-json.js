const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrate() {
  console.log('🚀 JSON-BASED MIGRATION STARTED...');
  
  try {
    const loadJson = (name) => JSON.parse(fs.readFileSync(path.join(__dirname, `${name}.json`), 'utf8'));

    console.log('🧹 Cleaning up current Postgres data...');
    await prisma.notification.deleteMany();
    await prisma.file.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.wilcomData.deleteMany();
    await prisma.order.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // 1. Users
    const users = loadJson('user');
    console.log(`👤 Migrating ${users.length} users...`);
    for (const user of users) {
      await prisma.user.create({
        data: {
          ...user,
          email: user.email.toLowerCase(),
          emailVerified: user.emailVerified ? new Date(user.emailVerified) : new Date(),
          emailVerificationTokenExpires: user.emailVerificationTokenExpires ? new Date(user.emailVerificationTokenExpires) : null,
          resetPasswordExpires: user.resetPasswordExpires ? new Date(user.resetPasswordExpires) : null,
          deleteAccountTokenExpires: user.deleteAccountTokenExpires ? new Date(user.deleteAccountTokenExpires) : null,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
      });
    }

    // 2. Accounts
    const accounts = loadJson('account');
    console.log(`🔑 Migrating ${accounts.length} accounts...`);
    for (const acc of accounts) {
      await prisma.account.create({ data: acc });
    }

    // 3. Orders
    const orders = loadJson('order');
    console.log(`📦 Migrating ${orders.length} orders...`);
    for (const order of orders) {
      await prisma.order.create({
        data: {
          ...order,
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : null,
          cancelledAt: order.cancelledAt ? new Date(order.cancelledAt) : null,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          isNotSure: Boolean(order.isNotSure),
          hidden: Boolean(order.hidden),
          addKnockdownStitch: Boolean(order.addKnockdownStitch),
        },
      });
    }
    
    // 4. WilcomData
    const wilcomData = loadJson('wilcomdata');
    console.log(`📈 Migrating ${wilcomData.length} wilcom records...`);
    for (const wd of wilcomData) {
      await prisma.wilcomData.create({
        data: {
          ...wd,
          designLastSaved: wd.designLastSaved ? new Date(wd.designLastSaved) : null,
          datePrinted: wd.datePrinted ? new Date(wd.datePrinted) : null,
          createdAt: new Date(wd.createdAt),
          updatedAt: new Date(wd.updatedAt),
        },
      });
    }

    const count = await prisma.user.count();
    console.log(`✅ SUCCESS! User count in Postgres: ${count}`);
  } catch (err) {
    console.error('❌ MIGRATION ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();

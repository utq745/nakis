const { PrismaClient } = require('@prisma/client');
const sqlite3 = require('sqlite3');
const path = require('path');

const prisma = new PrismaClient();
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

async function migrate() {
  console.log('🚀 CONTAINER-SIDE MIGRATION STARTED...');
  
  try {
    console.log('🧹 Cleaning up current Postgres data...');
    await prisma.notification.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.file.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.wilcomData.deleteMany();
    await prisma.order.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    const users = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM User', (err, rows) => err ? reject(err) : resolve(rows));
    });
    console.log(`👤 Migrating ${users.length} users...`);
    for (const user of users) {
      await prisma.user.create({
        data: {
          ...user,
          email: user.email.toLowerCase(),
          emailVerified: user.emailVerified ? new Date(user.emailVerified) : new Date(),
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
      });
    }

    const orders = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM "Order"', (err, rows) => err ? reject(err) : resolve(rows));
    });
    console.log(`📦 Migrating ${orders.length} orders...`);
    for (const order of orders) {
      await prisma.order.create({
        data: {
          ...order,
          createdAt: new Date(order.createdAt),
          updatedAt: new Date(order.updatedAt),
          isNotSure: Boolean(order.isNotSure),
          hidden: Boolean(order.hidden),
        },
      });
    }
    
    const files = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM File', (err, rows) => err ? reject(err) : resolve(rows));
    });
    console.log(`📁 Migrating ${files.length} files...`);
    for (const file of files) {
      await prisma.file.create({
        data: {
          ...file,
          createdAt: new Date(file.createdAt),
        },
      });
    }

    const count = await prisma.user.count();
    console.log(`✅ SUCCESS! User count in Postgres: ${count}`);
  } catch (err) {
    console.error('❌ MIGRATION ERROR:', err);
  } finally {
    await prisma.$disconnect();
    db.close();
  }
}

migrate();

import { PrismaClient } from '@prisma/client';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const prisma = new PrismaClient();
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const db = new sqlite3.Database(dbPath);

const dbAll = promisify(db.all).bind(db);

async function migrate() {
  console.log('🚀 FINAL VPS MIGRATION STARTED...');
  
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

    const users = await dbAll('SELECT * FROM User') as any[];
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

    const orders = await dbAll('SELECT * FROM "Order"') as any[];
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
    
    // Add other tables as needed, but let's ensure these 2 work first
    const files = await dbAll('SELECT * FROM File') as any[];
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

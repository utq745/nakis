import { PrismaClient } from '@prisma/client';
import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';

const prisma = new PrismaClient();
const dbPath = path.join(process.cwd(), 'prisma', 'old_dev.db');
const db = new sqlite3.Database(dbPath);

const dbAll = promisify(db.all).bind(db);

async function migrate() {
  console.log('🚀 TUNNEL MIGRATION STARTED...');
  console.log('Target DB URL:', process.env.DATABASE_URL);

  try {
    // 0. Cleanup
    console.log('🧹 Cleaning up Postgres via Tunnel...');
    await prisma.notification.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.file.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.wilcomData.deleteMany();
    await prisma.order.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.user.deleteMany();

    // 1. Users
    const users = await dbAll('SELECT * FROM User') as any[];
    console.log(`👤 Migrating ${users.length} users...`);
    for (const user of users) {
      await prisma.user.create({
        data: {
          ...user,
          email: user.email.toLowerCase(),
          emailVerified: user.emailVerified ? new Date(user.emailVerified) : new Date(),
          resetPasswordExpires: user.resetPasswordExpires ? new Date(user.resetPasswordExpires) : null,
          emailVerificationTokenExpires: user.emailVerificationTokenExpires ? new Date(user.emailVerificationTokenExpires) : null,
          deleteAccountTokenExpires: user.deleteAccountTokenExpires ? new Date(user.deleteAccountTokenExpires) : null,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        },
      });
    }

    // 2. Accounts
    const accounts = await dbAll('SELECT * FROM Account') as any[];
    console.log(`🔑 Migrating ${accounts.length} accounts...`);
    for (const acc of accounts) {
      await prisma.account.create({ data: acc });
    }

    // 3. Orders
    const orders = await dbAll('SELECT * FROM "Order"') as any[];
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
    const wilcomData = await dbAll('SELECT * FROM WilcomData') as any[];
    console.log(`📈 Migrating ${wilcomData.length} wilcom data records...`);
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

    // 5. Comments
    const comments = await dbAll('SELECT * FROM Comment') as any[];
    console.log(`💬 Migrating ${comments.length} comments...`);
    for (const comm of comments) {
      await prisma.comment.create({
        data: {
          ...comm,
          isSystem: Boolean(comm.isSystem),
          createdAt: new Date(comm.createdAt),
        },
      });
    }

    // 6. Files
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

    // 8. Notifications
    const notes = await dbAll('SELECT * FROM Notification') as any[];
    console.log(`🔔 Migrating ${notes.length} notifications...`);
    for (const note of notes) {
      await prisma.notification.create({
        data: {
          ...note,
          read: Boolean(note.read),
          createdAt: new Date(note.createdAt),
        },
      });
    }

    const count = await prisma.user.count();
    console.log(`📊 FINAL USER COUNT IN POSTGRES: ${count}`);
    
    console.log('✅ TUNNEL MIGRATION COMPLETED!');
  } catch (err) {
    console.error('❌ MIGRATION ERROR:', err);
  } finally {
    await prisma.$disconnect();
    db.close();
  }
}

migrate();

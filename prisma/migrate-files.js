const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function migrate() {
  console.log('🚀 COMPLETING DATA MIGRATION (FILES & COMMENTS)...');
  
  try {
    const loadJson = (name) => JSON.parse(fs.readFileSync(path.join(__dirname, `${name}.json`), 'utf8'));

    // 5. Comments
    const comments = loadJson('comment');
    console.log(`💬 Migrating ${comments.length} comments...`);
    for (const comm of comments) {
      await prisma.comment.upsert({
        where: { id: comm.id },
        update: {},
        create: {
          ...comm,
          isSystem: Boolean(comm.isSystem),
          createdAt: new Date(comm.createdAt),
        },
      });
    }

    // 6. Files
    const files = loadJson('file');
    console.log(`📁 Migrating ${files.length} files...`);
    for (const file of files) {
      await prisma.file.upsert({
        where: { id: file.id },
        update: {},
        create: {
          ...file,
          createdAt: new Date(file.createdAt),
        },
      });
    }

    // 7. Notifications
    const notes = loadJson('notification');
    console.log(`🔔 Migrating ${notes.length} notifications...`);
    for (const note of notes) {
      await prisma.notification.upsert({
        where: { id: note.id },
        update: {},
        create: {
          ...note,
          read: Boolean(note.read),
          createdAt: new Date(note.createdAt),
        },
      });
    }

    console.log('✅ ALL MISSING DATA (FILES/COMMENTS) MIGRATED!');
  } catch (err) {
    console.error('❌ MIGRATION ERROR:', err);
  } finally {
    await prisma.$disconnect();
  }
}

migrate();

// Script to sync OAuth user data from session to database
// Run with: npx ts-node scripts/sync-oauth-users.ts

import prisma from "../src/lib/prisma";

async function syncOAuthUsers() {
    // Find users with empty name or email (likely OAuth users not synced)
    const users = await prisma.user.findMany({
        where: {
            OR: [
                { name: null },
                { name: "" },
                { email: null },
                { email: "" }
            ]
        },
        include: {
            accounts: true
        }
    });

    console.log(`Found ${users.length} users with missing data`);

    // For each user, check if they have an account (OAuth) and update
    for (const user of users) {
        if (user.accounts.length > 0) {
            console.log(`User ${user.id} has OAuth account but missing profile data`);
            // This script can't get the OAuth profile data after the fact
            // The user needs to update their profile manually or re-login
        }
    }

    console.log("\nTo fix existing users:");
    console.log("1. Have them update their name in Settings");
    console.log("2. OR delete the user and have them re-login with Google");

    // List all users for debugging
    const allUsers = await prisma.user.findMany({
        select: { id: true, email: true, name: true, role: true }
    });
    console.log("\nAll users in database:");
    console.table(allUsers);
}

syncOAuthUsers()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });

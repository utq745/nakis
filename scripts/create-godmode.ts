import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    const email = "godmode@approvalstitch.com";
    const password = "godmode123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        console.log("Godmode user already exists. Updating role to ADMIN...");
        await prisma.user.update({
            where: { email },
            data: {
                role: "ADMIN",
                password: hashedPassword,
            },
        });
    } else {
        console.log("Creating Godmode user...");
        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: "God Mode Admin",
                role: "ADMIN",
            },
        });
    }

    console.log("Godmode user initialized successfully.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

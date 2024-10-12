import prisma from "@/utils/prisma";

export async function register() {
    await prisma.users.deleteMany();

    const users = await prisma.users.count();
    if (users == 0) {
        // if no users are saved
        // remove old password
        await prisma.settings.deleteMany();
        const password = `${Math.floor(Math.random() * 8999 + 1000)}`;
        console.log(`Use the code "${password}" to create your first account.`);
        await prisma.settings.create({
            data: {
                password,
            },
        });
    }
}

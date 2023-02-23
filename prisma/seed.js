import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";

const password = "shitshit";

async function main() {
    const user = await prisma.role.upsert({
        where: { role: 'user' },
        update: {},
        create: {
            role: 'user',
        },
    })

    const admin = await prisma.role.upsert({
        where: { role: 'admin' },
        update: {},
        create: {
            role: 'admin',
        },
    })

    const Victor = await prisma.user.upsert({
        where: { email: 'victor@allahsoft.dk' },
        update: {},
        create: {
            email: 'victor@allahsoft.dk',
            name: 'Victor',
            password: bcrypt.hashSync(password, 8),
            token: 'Default value',
            roleId: 2
        },
    });


    const Kristoffer = await prisma.user.upsert({
        where: { email: 'kristoffer@allahsoft.dk' },
        update: {},
        create: {
            email: 'kristoffer@allahsoft.dk',
            name: 'Kristoffer',
            password: bcrypt.hashSync(password, 8),
            token: 'Default value',
            roleId: 2
        },
    });

    const Frederik = await prisma.user.upsert({
        where: { email: 'frederik@allahsoft.dk' },
        update: {},
        create: {
            email: 'frederik@allahsoft.dk',
            name: 'Frederik',
            password: bcrypt.hashSync(password, 8),
            token: 'Default value',
            roleId: 2
        },
    });


    const Isaac = await prisma.user.upsert({
        where: { email: 'isaac@allahsoft.dk' },
        update: {},
        create: {
            email: 'isaac@allahsoft.dk',
            name: 'Isaac',
            password: bcrypt.hashSync(password, 8),
            token: 'Default value',
            roleId: 2
        },
    });


    console.log({ Victor, Kristoffer, Frederik, Isaac })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
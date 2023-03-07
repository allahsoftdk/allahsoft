import prisma from "../prismaClient.js";
import bcrypt from "bcryptjs";

const password = "shitshit";

async function main() {
  const shab = await prisma.IslamicEvent.upsert({
    where: { name: "Shab e Meraj" },
    update: {},
    create: {
      name: "Shab e Meraj 2023",
      eventDate: "Saturday, 18th of February 2023",
      eventFrom: "18/02/23",
      eventTo: "18/02/23",
    },
  });

  const ramadan = await prisma.IslamicEvent.upsert({
    where: { name: "Ramadan" },
    update: {},
    create: {
      name: "Ramadan 2023",
      eventDate: "Thursday, 23th of March 2023",
      eventFrom: "23/03/23",
      eventTo: "20/04/23",
    },
  });

  const laylat = await prisma.IslamicEvent.upsert({
    where: { name: "Laylat al Qadr" },
    update: {},
    create: {
      name: "Laylat al Qadr 2023",
      eventDate: "Tuesday, 18th of April 2023",
      eventFrom: "18/04/23",
      eventTo: "18/04/23",
    },
  });

  const eid = await prisma.IslamicEvent.upsert({
    where: { name: "Eid ul Fitr" },
    update: {},
    create: {
      name: "Eid ul Fitr 2023",
      eventDate: "Friday, 21th of April 2023",
      eventFrom: "21/04/23",
      eventTo: "22/04/23",
    },
  });

  const hajj = await prisma.IslamicEvent.upsert({
    where: { name: "Hajj" },
    update: {},
    create: {
      name: "Hajj 2023",
      eventDate: "Sunday, 25th of June 2023",
      eventFrom: "25/06/23",
      eventTo: "30/06/23",
    },
  });

  const ediAl = await prisma.IslamicEvent.upsert({
    where: { name: "Eid al Adha" },
    update: {},
    create: {
      name: "Eid al Adha 2023",
      eventDate: "Wednesday, 28th of June 2023",
      eventFrom: "28/06/23",
      eventTo: "28/06/23",
    },
  });

  const muharram = await prisma.IslamicEvent.upsert({
    where: { name: "Muharram" },
    update: {},
    create: {
      name: "Muharram 2023",
      eventDate: "Wednesday, 19th of July 2023",
      eventFrom: "19/07/23",
      eventTo: "19/07/23",
    },
  });

  const ashura = await prisma.IslamicEvent.upsert({
    where: { name: "Ashura" },
    update: {},
    create: {
      name: "Ashura 2023",
      eventDate: "Thursday, 28th of July 2023",
      eventFrom: "28/07/23",
      eventTo: "28/07/23",
    },
  });

  const rabi = await prisma.IslamicEvent.upsert({
    where: { name: "12 Rabi ul Awal" },
    update: {},
    create: {
      name: "12 Rabi ul Awal 2023",
      eventDate: "Thursday, 15th of September 2023",
      eventFrom: "15/09/23",
      eventTo: "27/09/23",
    },
  });

  const user = await prisma.role.upsert({
    where: { role: "user" },
    update: {},
    create: {
      role: "user",
    },
  });

  const admin = await prisma.role.upsert({
    where: { role: "admin" },
    update: {},
    create: {
      role: "admin",
    },
  });

  const Victor = await prisma.user.upsert({
    where: { email: "victor@allahsoft.dk" },
    update: {},
    create: {
      email: "victor@allahsoft.dk",
      name: "Victor",
      password: bcrypt.hashSync(password, 8),
      token: "Default value",
      roleId: 2,
    },
  });

  const Kristoffer = await prisma.user.upsert({
    where: { email: "kristoffer@allahsoft.dk" },
    update: {},
    create: {
      email: "kristoffer@allahsoft.dk",
      name: "Kristoffer",
      password: bcrypt.hashSync(password, 8),
      token: "Default value",
      roleId: 2,
    },
  });

  const Frederik = await prisma.user.upsert({
    where: { email: "frederik@allahsoft.dk" },
    update: {},
    create: {
      email: "frederik@allahsoft.dk",
      name: "Frederik",
      password: bcrypt.hashSync(password, 8),
      token: "Default value",
      roleId: 2,
    },
  });

  const Isaac = await prisma.user.upsert({
    where: { email: "isaac@allahsoft.dk" },
    update: {},
    create: {
      email: "isaac@allahsoft.dk",
      name: "Isaac",
      password: bcrypt.hashSync(password, 8),
      token: "Default value",
      roleId: 2,
    },
  });

  console.log("Seeding done");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

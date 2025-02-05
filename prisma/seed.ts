import { PrismaClient, UserType } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");
  await seedUsers();
  await seedThemes();
}

async function seedUsers() {
  console.log("Seeding users...");
  const defaultPassword = await bcrypt.hash("foobar1234", 10);

  const alice = await prisma.user.create({
    data: {
      email: "alice@collectify.com",
      name: "Alice",
      hashedPassword: defaultPassword,
      termsAccepted: true,
      type: UserType.ADMIN,
    },
  });

  console.log("Seeded users: ", alice.email);
}

async function seedThemes() {
  console.log("Seeding themes...");
  const pokemonTheme = await prisma.theme.create({
    data: {
      name: "Pokemon",
      photo: new Uint8Array([0, 1, 0, 1]),
    },
  });

  console.log("Seeded theme: ", pokemonTheme.name);
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

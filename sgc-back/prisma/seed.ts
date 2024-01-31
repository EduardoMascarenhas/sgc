import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.admin.deleteMany({});

  const masterAdmin = await prisma.admin.create({
    data: {
      email: 'master@master.com.br',
      name: 'Master',
      //senha: senhamaster
      hashedPassword:
        '$2b$10$mOjdQI2X6i4OYa3rzGVamek97Y6T9whqZpam1UpcZCww6lCMXgp/a',
    },
  });

  console.log(masterAdmin);
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

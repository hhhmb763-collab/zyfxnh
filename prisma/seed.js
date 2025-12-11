// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.resource.createMany({
    data: [
      { name: 'Example Resource 1', type: 'video', url: 'https://example.com/1' },
      { name: 'Example Resource 2', type: 'image', url: 'https://example.com/2' },
    ],
    skipDuplicates: true,
  });
  console.log('Seed data inserted');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

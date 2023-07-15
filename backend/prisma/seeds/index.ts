import { PrismaClient } from '@prisma/client';
import { createUser } from './user';
import { createHistoryFollow } from './history-follow';
import { createCoordinates } from './coordinate';

export const prismaForSeed = new PrismaClient();

export const createResources = async (prisma: PrismaClient) => {
  await createUser(prisma);
  await createHistoryFollow(prisma);
  await createCoordinates(prisma);
};

const seed = async () => {
  await createResources(prismaForSeed);
};

export const runSeed = async () => {
  await seed()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prismaForSeed.$disconnect();
    });
};

runSeed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prismaForSeed.$disconnect();
  });

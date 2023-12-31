import { PrismaClient } from '@prisma/client';

export async function createHistoryFollow(prisma: PrismaClient) {
  const historyFollow = await prisma.historyFollow.create({
    data: {
      name: 'device_1_test_1',
      device: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.historyFollow.create({
    data: {
      name: 'device_1_test_2',
      device: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.historyFollow.create({
    data: {
      name: 'device_1_test_3',
      device: {
        connect: {
          id: 1,
        },
      },
    },
  });
  await prisma.historyFollow.create({
    data: {
      name: 'device_1_test_4',
      device: {
        connect: {
          id: 1,
        },
      },
    },
  });
  return historyFollow;
}

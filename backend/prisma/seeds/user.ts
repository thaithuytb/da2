import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

export async function createUser(prisma: PrismaClient) {
  const hashPW = await argon2.hash('admin');

  const user = await prisma.user.create({
    data: {
      phoneNumber: '0337076651',
      email: 'admin@admin.com',
      fullName: 'admin'.toUpperCase(),
      address: 'Hà Nội',
      password: hashPW,
      device: {
        create: {
          name: 'datn_quan',
        },
      },
    },
  });
  return user;
}

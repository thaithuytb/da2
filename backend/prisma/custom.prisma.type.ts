import { PrismaClient } from '@prisma/client';

// transaction
export type PrismaTransactional = Omit<
  PrismaClient,
  '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'
>;

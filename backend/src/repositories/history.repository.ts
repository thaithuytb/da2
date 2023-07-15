import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructures/dao/prisma.service';
import { HistoryFollow, Prisma } from '@prisma/client';

@Injectable()
export class HistoryRepository implements IHistoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getHistoriesByDeviceId(
    arg: Prisma.HistoryFollowFindManyArgs,
  ): Promise<HistoryFollow[]> {
    return this.prisma.historyFollow.findMany(arg);
  }
}

export interface IHistoryRepository {
  getHistoriesByDeviceId(
    arg: Prisma.HistoryFollowFindManyArgs,
  ): Promise<HistoryFollow[]>;
}

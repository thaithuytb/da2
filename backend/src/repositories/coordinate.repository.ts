import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructures/dao/prisma.service';
import { Coordinate, Prisma } from '@prisma/client';

@Injectable()
export class CoordinateRepository implements ICoordinateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getCoordinatesByHistoryFollowName(
    arg: Prisma.CoordinateFindManyArgs,
  ): Promise<Coordinate[]> {
    return this.prisma.coordinate.findMany(arg);
  }
}

export interface ICoordinateRepository {
  getCoordinatesByHistoryFollowName(
    arg: Prisma.CoordinateFindManyArgs,
  ): Promise<Coordinate[]>;
}

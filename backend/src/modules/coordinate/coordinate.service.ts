import { Injectable } from '@nestjs/common';
import { CoordinateRepository } from '../../repositories/coordinate.repository';
import { Prisma } from '@prisma/client';
import { responseSuccess } from '../../common/response-success';
import * as dayjs from 'dayjs';

@Injectable()
export class CoordinateService {
  constructor(private readonly coordinateRepository: CoordinateRepository) {}

  async getCoordinatesByHistoryFollowName(dto: { name: string }) {
    const query: Prisma.CoordinateFindManyArgs = {
      where: {
        historyFollow: {
          name: dto.name,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    };

    const coordinates =
      await this.coordinateRepository.getCoordinatesByHistoryFollowName(query);

    if (!coordinates.length) {
      return responseSuccess(200, []);
    }

    return responseSuccess(200, {
      dataCoordinates: coordinates.map((coordinate) => [
        coordinate.lat,
        coordinate.lon,
      ]),
      step: coordinates[coordinates.length - 1].step,
      duration:
        (dayjs(coordinates[coordinates.length - 1].createdAt).valueOf() -
          dayjs(coordinates[0].createdAt).valueOf()) /
        1000,
      heartRate: coordinates.map((coordinate) => ({
        created: coordinate.createdAt,
        heartRate: coordinate.heartRate,
      })),
    });
  }
}

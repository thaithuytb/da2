import { Injectable } from '@nestjs/common';
import { CoordinateRepository } from '../../repositories/coordinate.repository';
import { Prisma } from '@prisma/client';
import { responseSuccess } from '../../common/response-success';
import * as dayjs from 'dayjs';
import { SocketGateway } from '../../socket/socket.gateway';

@Injectable()
export class CoordinateService {
  constructor(
    private readonly coordinateRepository: CoordinateRepository,
    private readonly socketGateway: SocketGateway,
  ) {}

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

  async createDataTest() {
    this.socketGateway.emitToGarden('1', 'start', {});
    let count = 0;
    let lat = 90;
    let lon = 25;
    const intervalId = setInterval(() => {
      ++count;
      if (count === 30) {
        this.socketGateway.emitToGarden('1', 'end', {});
        clearInterval(intervalId);
      }
      lat = lat + Math.random() / (10 * count);
      lon = lon + Math.random() / (10 * count);
      this.socketGateway.emitToGarden('1', 'data', {
        type: 'Feature',
        geometry: {
          coordinates: [lat, lon],
          type: 'Point',
        },
        properties: {
          heartRate: 80 + Math.random() * 10,
          step: 10 + 2 * count,
        },
      });
    }, 10000);
  }
}

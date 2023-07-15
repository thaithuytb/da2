import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { responseSuccess } from '../../common/response-success';
import { HistoryRepository } from '../../repositories/history.repository';
import { DeviceRepository } from '../../repositories/device.repository';

@Injectable()
export class HistoryService {
  constructor(
    private readonly historyRepository: HistoryRepository,
    private readonly deviceRepository: DeviceRepository,
  ) {}

  async getHistoriesByDeviceId(dto: { userId: number }) {
    const device = await this.deviceRepository.getDeviceByUserId(dto.userId);
    console.log({ device });
    const query: Prisma.HistoryFollowFindManyArgs = {
      where: {
        deviceId: device.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    };
    const histories = await this.historyRepository.getHistoriesByDeviceId(
      query,
    );
    return responseSuccess(200, {
      histories,
    });
  }
}

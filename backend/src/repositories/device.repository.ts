import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructures/dao/prisma.service';
import { Device } from '@prisma/client';

@Injectable()
export class DeviceRepository implements IDeviceRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getDeviceByUserId(userId: number): Promise<Device> {
    return this.prisma.device.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }
}

export interface IDeviceRepository {
  getDeviceByUserId(userId: number): Promise<Device>;
}

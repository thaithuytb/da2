import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CoordinateService } from './coordinate.service';

@Controller('api/v1/coordinates')
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Get()
  async getCoordinatesByHistoryFollowName(@Query('name') name: string) {
    if (!name) {
      return [];
    }
    return this.coordinateService.getCoordinatesByHistoryFollowName({ name });
  }

  @Get('/fake-data')
  async createDataTest() {
    return this.coordinateService.createDataTest();
  }

  @Post('/start')
  async startEndData(@Body('dto') dto: { deviceId: number; start: boolean }) {
    return this.coordinateService.startData(dto);
  }

  @Post('/data')
  async data(
    @Body('dto')
    dto: {
      deviceId: number;
      lat: string;
      lon: string;
      step: string;
      heartRate: string;
      period: string;
    },
  ) {
    return this.coordinateService.data(dto);
  }
}

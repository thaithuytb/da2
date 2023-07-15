import { Controller, Get, Query } from '@nestjs/common';
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
}

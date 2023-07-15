import { Controller, Get, Query } from '@nestjs/common';
import { CoordinateService } from './coordinate.service';

@Controller('api/v1/coordinates')
export class CoordinateController {
  constructor(private readonly coordinateService: CoordinateService) {}

  @Get()
  async getCoordinatesByHistoryFollowName(@Query('name') name: string) {
    console.log('aaaa');
    console.log({ name });
    if (!name) {
      return [];
    }
    return this.coordinateService.getCoordinatesByHistoryFollowName({ name });
  }
}

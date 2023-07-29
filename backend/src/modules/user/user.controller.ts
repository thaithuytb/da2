import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto, RegisterDto, UpdateInformationDto } from './dto/user.dto';
import { LoginType, UserType } from './models/user.model';
import { responseSuccess } from '../../common/response-success';

@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/login')
  async login(@Body('dto') dto: LoginDto): Promise<LoginType> {
    return this.userService.login(dto);
  }

  @Get('/verify-token')
  async verifyToken(@Req() req: any): Promise<LoginType> {
    const authHeader = req.headers.authorization;
    const token =
      authHeader &&
      authHeader.split(' ')[0] === 'Bearer' &&
      authHeader.split(' ')[1];
    return responseSuccess(200, {
      user: req.user,
      token: token,
    });
  }

  @Post('/register')
  async register(@Body('dto') dto: RegisterDto): Promise<LoginType> {
    return this.userService.register(dto);
  }

  @Patch('/update-information')
  async updateInformation(
    @Req() req: any,
    @Body('dto') dto: UpdateInformationDto,
  ): Promise<UserType> {
    return this.userService.updateInformation(req.user, dto);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import * as argon2 from 'argon2';
import { uuid } from 'uuidv4';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../../repositories/user.repository';
import { LoginDto, RegisterDto, UpdateInformationDto } from './dto/user.dto';
import { responseSuccess } from '../../common/response-success';
import { UserResponseDetail, LoginType, UserType } from './models/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(dto: LoginDto): Promise<LoginType> {
    const existUser = await this.userRepository.getUserByEmail({
      where: {
        email: dto.email,
      },
    });

    if (!existUser) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const correctPassword = await argon2.verify(
      existUser.password,
      dto.password,
    );
    if (!correctPassword) {
      throw new HttpException(
        'Email or password is incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(existUser.id, existUser.email);

    return responseSuccess(200, {
      user: UserResponseDetail.transform(existUser),
      token,
    });
  }

  async register(dto: RegisterDto): Promise<LoginType> {
    const existUser = await this.userRepository.getUserByEmail({
      where: {
        email: dto.email,
      },
    });

    if (existUser) {
      throw new HttpException('Email is existed', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await argon2.hash(dto.password);

    const newUser = await this.userRepository.createUser({
      email: dto.email,
      password: hashedPassword,
      fullName: dto.fullName ? dto.fullName : uuid(),
    });

    const token = await this.signToken(newUser.id, newUser.email);

    return responseSuccess(201, {
      user: UserResponseDetail.transform(newUser),
      token,
    });
  }

  async updateInformation(
    user: User,
    dto: UpdateInformationDto,
  ): Promise<UserType> {
    const { password, newPassword, ...restDto } = dto;
    if (password && newPassword) {
      const correctPassword = await argon2.verify(user.password, password);
      if (!correctPassword) {
        throw new HttpException('wrong password', HttpStatus.BAD_REQUEST);
      }
      const hashedPassword = await argon2.hash(newPassword);

      const newUser = await this.userRepository.updateInformation({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return responseSuccess(200, UserResponseDetail.transform(newUser));
    }
    const newUser = await this.userRepository.updateInformation({
      where: {
        id: user.id,
      },
      data: restDto,
    });

    return responseSuccess(200, UserResponseDetail.transform(newUser));
  }

  async getUserByEmail(email: string): Promise<User> {
    const query: Prisma.UserFindFirstArgs = {
      where: {
        email,
      },
    };
    const user = await this.userRepository.getUserByEmail(query);

    return user;
  }

  private async signToken(id: number, email: string): Promise<string> {
    return sign({ id, email }, process.env.JWT_SECRET, {
      expiresIn: '10000h',
    });
  }

  async verifyToken(token: string) {
    return verify(token, process.env.JWT_SECRET);
  }
}

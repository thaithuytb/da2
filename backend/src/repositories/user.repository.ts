import { Injectable } from '@nestjs/common';
import { PrismaService } from '../infrastructures/dao/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByEmail(arg: Prisma.UserFindFirstArgs): Promise<User> {
    return this.prisma.user.findFirst(arg);
  }

  async createUser(arg: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data: arg,
    });
  }
}

export interface IUserRepository {
  getUserByEmail(arg: Prisma.UserFindFirstArgs): Promise<User>;
  createUser(arg: Prisma.UserCreateInput): Promise<User>;
}

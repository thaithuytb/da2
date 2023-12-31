import { User } from '@prisma/client';

export interface LoginType {
  statusCode: number;
  success: boolean;
  data: Login;
}

export interface Login {
  user: IUserResponseDetail;
  // TODO: can returns refresh token
  token: string;
}

export interface UserType {
  statusCode: number;
  success: boolean;
  data: IUserResponseDetail;
}

export class UserResponseDetail {
  static transform(dto: User): IUserResponseDetail {
    return {
      id: dto.id,
      phoneNumber: dto.phoneNumber,
      email: dto.email,
      createdAt: dto.createdAt,
      updatedAt: dto.updatedAt,
      dateOfBirth: dto.dateOfBirth,
      address: dto.address,
      fullName: dto.fullName,
    };
  }
}

export interface UserResponseDetailType {
  statusCode: number;
  success: boolean;
  data: IUserResponseDetail;
}

interface IUserResponseDetail {
  id: number;
  phoneNumber?: string;
  email: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  dateOfBirth?: string | Date;
  address?: string;
  fullName: string;
}

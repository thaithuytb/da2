import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { UserService } from '../modules/user/user.service';
import { MiddlewareRequestType } from './interfaces/middlewareRequstType';

@Injectable()
export class verifyTokenMiddleware implements NestMiddleware {
  constructor(private userService: UserService) {}

  async use(req: MiddlewareRequestType, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    const token =
      authHeader &&
      authHeader.split(' ')[0] === 'Bearer' &&
      authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        message: 'UnAuthorization',
      });
    }

    const decode = await this.userService.verifyToken(token).catch((e) => {
      if (e.name === 'JsonWebTokenError') {
        return res.status(401).json({
          statusCode: 401,
          message: 'Invalid token',
        });
      } else if (e.name === 'TokenExpiredError') {
        return res.status(401).json({
          statusCode: 401,
          message: 'Expired token',
        });
      } else {
        return res.status(500).json({
          statusCode: 500,
          message: 'INTERNAL !!!',
        });
      }
    });

    const user = await this.userService.getUserByEmail(decode.email);
    if (!user) {
      return res.status(403).json({
        statusCode: 403,
        message: 'Forbidden',
      });
    }

    req.user = user;
    next();
  }
}

import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { JWTUser } from '../utils/jwt-user';
import { unAuthorizedError } from '../error';

export const checkBrandUser = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const user = response.locals.user as JWTUser;
    if (!user.isBrand()) {
      throw unAuthorizedError('Not enough privileges to perform this action');
    }
    next();
  }
);

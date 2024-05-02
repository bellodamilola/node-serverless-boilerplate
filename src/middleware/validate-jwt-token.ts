import { NextFunction, Request, Response } from 'express';
import { authenticationError } from '../error';

import asyncHandler from 'express-async-handler';
import { CognitoJwtVerifier } from 'aws-jwt-verify'
import config from '../config';
import { JWTUser } from '../utils/jwt-user';

export const validateJwtToken = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    if (
      request.headers.authorization &&
      request.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const token = request.headers.authorization.split(' ')[1];

      const verifier = CognitoJwtVerifier.create({
        userPoolId: config.auth.userPoolId,
        tokenUse: 'access',
        clientId: config.auth.clientId,
      });
      const decodedValue = await verifier.verify(token);
      response.locals.authUser = new JWTUser(decodedValue);
    } else {
      throw authenticationError('Not authorized');
    }
    next();
  }
);

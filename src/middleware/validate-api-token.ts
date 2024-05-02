import asyncHandler from 'express-async-handler';
import { NextFunction, Request, Response } from 'express';
import { authenticationError } from '../error';
import config from '../config';

export const validateAPIToken = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    const token = getAuthToken(request);
    if (token !== config.auth.apiToken) {
      throw authenticationError('Auth token is not valid');
    }
    next();
  }
);

function getAuthToken(request: Request) {
  const token = request.headers['x-api-key'] || request.query['X-API-KEY'];
  if (!token) {
    throw authenticationError('API token is required');
  }
  return token;
}

import { Request, Response, Router } from 'express';
import { organizationRoutes } from './organization.routes';
import asyncHandler from 'express-async-handler';

const v1Routes: Router = Router();

v1Routes.get('/status', asyncHandler(async (request: Request, response: Response) => {
  response.status(200).send({data: 'pong'});
}));

v1Routes.use('/organizations', organizationRoutes);

export { v1Routes };

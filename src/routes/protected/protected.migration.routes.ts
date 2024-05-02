import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { validateAPIToken } from '../../middleware/validate-api-token';
import { AppDataSource } from '../../ormconfig';

const protectedMigrationRoutes: Router = Router();

protectedMigrationRoutes.post(
  '/',
  validateAPIToken,
  asyncHandler(async (request: Request, response: Response) => {
    const dataSource = await AppDataSource.initialize();
    await dataSource.runMigrations({ transaction: 'none' });

    response.status(200).send({ message: 'Migrations ran successfully' });
  })
);

export { protectedMigrationRoutes };

import { Router } from 'express';
import { protectedMigrationRoutes } from './protected.migration.routes';

const protectedRoutes: Router = Router();

protectedRoutes.use('/protected/migrations', protectedMigrationRoutes);

export { protectedRoutes };

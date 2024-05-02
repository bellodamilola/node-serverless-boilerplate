import { Router } from 'express';
import { VERSION } from '../config';
import { v1Routes } from './v1';
import { protectedRoutes } from './protected';

const routes: Router = Router();

routes.use(VERSION.v1, v1Routes);
routes.use(protectedRoutes);
export { routes };

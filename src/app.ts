import * as dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

import { handleError } from './error';
import { stream } from './logger';
import { routes } from './routes';

dotenv.config();

if (!process.env.PORT) {
  console.error('Missing port information! Exiting Application');
  process.exit(1);
}

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(morgan('tiny', { stream }));
app.use(awsServerlessExpressMiddleware.eventContext());
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

export { app };

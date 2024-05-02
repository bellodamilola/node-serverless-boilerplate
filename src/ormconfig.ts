import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Organization } from './models/organization.model';

import 'dotenv/config';

const config: DataSourceOptions = {
    type: 'postgres',
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    synchronize: false,
    logging: process.env.DATABASE_LOGGING === 'true',
    namingStrategy: new SnakeNamingStrategy(),
    entities: [Organization],
    migrations: ['dist/migrations/*.js'],
};

export const AppDataSource = new DataSource(config);

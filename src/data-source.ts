import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: `${process.env.DB_PASSWORD}`,
    database: process.env.DB_DATABASE,
    synchronize: process.env.NODE_ENV === 'development' ? true : false,
    logging: false,
    entities: [
        `${__dirname}/models/*.ts`,
        `${__dirname}/models/*.js`,
        `${__dirname}/models/abstracts/*.js`,
        `${__dirname}/models/abstracts/*.ts`,
    ],
    migrations: ['src/migrations/**/*{.ts,.js}'],
    subscribers: [],
});

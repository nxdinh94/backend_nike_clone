import 'dotenv/config';
import "reflect-metadata"


import { DataSource } from "typeorm";
export const dataSource = new DataSource({
    type: "postgres",
    host: `${process.env.HOST}`,
    port: parseInt(`${process.env.PORT}`),
    username: `${process.env.DB_USER_NAME}`,
    password: `${process.env.DB_PASSWORD}`,
    database: `${process.env.DB_NAME}`,
    synchronize: true, 
    logging: false,
    entities: ["src/models/entity/**/*.ts"],
    subscribers: [],
    migrations: ["src/models/migrations/**/*.ts"],

})
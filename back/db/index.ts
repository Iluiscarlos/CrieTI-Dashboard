import { Sequelize, Dialect } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const DB_DATABASE = process.env.DB_DATABASE as string
const DB_USERNAME = process.env.DB_USERNAME as string
const DB_HOST = process.env.DB_HOST
const DB_DIALECT = process.env.DB_DIALECT as Dialect
const DB_PORT: number = parseInt(process.env.DB_PORT as string)
const DB_PASSWORD = process.env.DB_PASSWORD

const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT
});

db.sync();

export default db;
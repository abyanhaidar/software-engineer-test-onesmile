import { SequelizeOptions } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { User } from '../user/user.model';
dotenv.config();

const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  models: [User],
  logging: false,
};

export default sequelizeConfig;

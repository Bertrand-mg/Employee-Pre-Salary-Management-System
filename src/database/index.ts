import { Sequelize } from 'sequelize';
import { databaseConnect } from '../config';
// import { allModel } from './models';

const allModel = () => {
  return {};
};

interface DatabaseConfigInterface {
  database: string;
  username: string;
  password: string;
  port: number;
  dialect: string;
}

const config = databaseConnect() as DatabaseConfigInterface;

let sequelize = new Sequelize({
  database: 'postgres',
  username: config.username,
  password: config.password,
  port: config.port,
  dialect: 'postgres',
});
const checkDatabase = async () => {
  try {
    const [result] = await sequelize.query(
      `SELECT 1 FROM pg_database WHERE datname = '${config.database}'`,
    );
    if (result.length == 0) {
      console.log(`Database ${config.database} does not exit. Creating it...`);
      await sequelize.query(`CREATE DATABASE ${config.database}`);
    }
  } catch (error) {
    console.error('Error reaching database:', error);
  }
};

export const connectToDatabase = async () => {
  try {
    await checkDatabase();

    sequelize = new Sequelize({
      database: config.database,
      username: config.username,
      password: config.password,
      port: config.port,
      dialect: 'postgres',
    });

    await sequelize.authenticate();

    console.log('Database Connected');

    const models = allModel();

    return { sequelize, ...models };
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};

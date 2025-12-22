import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs } from './config';
import mainRoute from './routes';
import { initialize } from './database';

const app: Express = express();

app.use(configs.prefix, mainRoute);

const startApp = async () => {
  try {
    const Db = await initialize();
    await Db?.sequelize.authenticate();
    app.listen(configs.port, () =>
      console.log(`Server is running on port ${configs.port}`),
    );
  } catch (error) {
    console.error('Error Starting App ', error);
  }
};
startApp();
export default app;

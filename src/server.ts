import express, { Express } from 'express';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs } from './config';
import mainRoute from './routes';
import { connectToDatabase } from './database';

const app: Express = express();

app.use(configs.prefix, mainRoute);

const startApp = async () => {
  try {
    app.use(express.json());

    await connectToDatabase();

    app.use(configs.prefix, mainRoute);

    app.listen(configs.port, () =>
      console.log(`Server is running on port ${configs.port}`),
    );
  } catch (error) {
    console.error('Error Starting App ', error);
  }
};
startApp();
export default app;

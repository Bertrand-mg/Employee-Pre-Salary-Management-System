import express, { Express, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { config as Dotenv } from 'dotenv';
Dotenv();
import { configs } from './config';
import mainRoute from './routes';
import { connectToDatabase } from './database';
// import { applyLimit } from './middlewares';

const app: Express = express();

const startApp = async () => {
  try {
    app.use(helmet());
    // applyLimit(app);
    app.use(cors());
    app.use(express.json());

    await connectToDatabase();

    app.get(`${configs.prefix}`, (req: Request, res: Response) => {
      res.send('Welcome on Server - PreSalary');
    });

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

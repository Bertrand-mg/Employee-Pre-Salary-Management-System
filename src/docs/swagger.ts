import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const swaggerPath = path.join(cwd, './src/docs/openapi.yaml');

export const setupSwagger = (app: Express) => {
  const swaggerDocument = yaml.load(
    fs.readFileSync(swaggerPath, 'utf8'),
  ) as object;

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

// const swaggerDoc = yaml.load(fs.readFileSync(swaggerPath, 'utf-8')) as object;

// export const swaggerMiddleware = [swaggerUi.serve, swaggerUi.setup(swaggerDoc)];

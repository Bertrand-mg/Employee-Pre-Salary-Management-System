import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';

type source = 'body' | 'params' | 'query';

export const validateRequest =
  (schema: ObjectSchema, type: source = 'body') =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[type]);

    if (error) {
      return res.json(error);
    }
    next();
  };

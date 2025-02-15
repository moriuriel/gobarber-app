import 'reflect-metadata';
import 'dotenv/config';
import express, { Response, NextFunction, Request } from 'express';
import { errors } from 'celebrate';

import 'express-async-errors';
import cors from 'cors';

import routes from '@shared/infra/http/routes';
import uplodConfig from '@config/upload';
import AppError from '@shared/Errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(cors());
app.use(rateLimiter);
app.use(express.json());
app.use('/files', express.static(uplodConfig.uploadFolder));
app.use(routes);

app.use(errors());
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      code: err.statusCode,
    });
  }
  return response.status(500).json({
    status: 'error',
    massage: 'Internal server Error',
    code: 500,
  });
});

app.listen(3333, () => {
  console.log('🚀  Server started in port 3333 !');
});

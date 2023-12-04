import express, { json, Request, Response, Express } from 'express';
import 'express-async-errors';
import httpStatus from 'http-status';
import { userRouter, authRouter, networkRouter, credentialRouter } from './routes/index';
import errorHandler from './middlewares/errors-middlewares';
import { connectDb } from './database/db';

const app = express();

app
  .use(json())
  .get('/health', (req: Request, res: Response) => {
    return res.status(httpStatus.OK).send("I'm ok!");
  })
  .use('/signup', userRouter)
  .use('/signin', authRouter)
  .use('/credential', credentialRouter)
  .use('/network', networkRouter)
  .use(errorHandler);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}
export default app;

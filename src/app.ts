import express, { json, Request, Response } from 'express';
import 'express-async-errors';
import httpStatus from 'http-status';
import userRouter from './routes/user-router'
import authRouter from './routes/authentication-router'
import errorHandlingMiddleware from './middlewares/erros-middlewares'
import credentialRouter from './routes/credential-router';
import networkRouter from './routes/network-router';

const app = express()


app
    .use(json())
    .get('/health', (req: Request, res: Response) => {
        return res.status(httpStatus.OK).send("I'm ok!");
    })
    .use('/signup', userRouter)
    .use('/signin', authRouter)
    .use('/credential', credentialRouter)
    .use('/network', networkRouter)
    .use(errorHandlingMiddleware)

export default app
import { Router } from 'express';
import { postUser } from '@/controllers';
import { validateSchemaMiddleware } from '@/middlewares';
import { createUserSchema } from '@/schemas/sign-schemas';

const userRouter = Router();

userRouter.post('/', validateSchemaMiddleware(createUserSchema), postUser);

export { userRouter };

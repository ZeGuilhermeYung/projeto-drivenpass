import { Router } from 'express';
import { signIn } from '@/controllers';
import { validateSchemaMiddleware } from '@/middlewares';
import { createUserSchema } from '@/schemas';

const authRouter = Router();

authRouter.post('/', validateSchemaMiddleware(createUserSchema), signIn);

export { authRouter };

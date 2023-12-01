import { signIn } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { createUserSchema } from "@/schemas";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/',validateSchemaMiddleware(createUserSchema), signIn);

export default authRouter;
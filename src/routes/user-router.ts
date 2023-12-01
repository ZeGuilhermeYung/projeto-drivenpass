import { postUser } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { createUserSchema } from "@/schemas/sign-schemas";
import { Router } from "express";

const userRouter = Router();

userRouter
    .post('/',validateSchemaMiddleware(createUserSchema), postUser);

export default userRouter;

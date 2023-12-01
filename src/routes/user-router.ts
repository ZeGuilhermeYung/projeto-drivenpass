import { createUser } from "@/controllers";
import { validateSchemaMiddleware } from "@/middlewares";
import { createUserSchema } from "@/schemas/sign-schemas";
import { Router } from "express";


const userRouter = Router()

userRouter
    .post('/',validateSchemaMiddleware(createUserSchema), createUser)

export default userRouter

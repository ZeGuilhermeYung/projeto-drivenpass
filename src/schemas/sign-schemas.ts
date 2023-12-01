import Joi from "joi";
import { SignUser } from "@/protocols";

export const createUserSchema = Joi.object<SignUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(10).required()
})
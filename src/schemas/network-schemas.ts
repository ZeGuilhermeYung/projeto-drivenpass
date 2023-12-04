import Joi from "joi";
import { CreateNetwork, Id } from "@/protocols/protocols";

export const networkBody = Joi.object<CreateNetwork>({
    userId: Joi.number().required(),
    network: Joi.string().required(),
    title: Joi.string().required(),
    password: Joi.string().required()
})

export const networkDelete = Joi.object<Id>({
    id: Joi.number().min(1).required()
})
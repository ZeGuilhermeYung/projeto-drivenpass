import Joi from "joi";
import { CreateNetwork, Id } from "@/protocols";

export const networkBody = Joi.object<CreateNetwork>({
    network: Joi.string().required(),
    title: Joi.string().required(),
    password: Joi.string().required()
})

export const networkDelete = Joi.object<Id>({
    id: Joi.number().min(1).required()
})
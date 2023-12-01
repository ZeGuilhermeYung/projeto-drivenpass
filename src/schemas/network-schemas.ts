import { Network } from "@prisma/client";
import Joi from "joi";
import { DeleteProcess } from "@/protocols";


export type NetworkBodyParams = Omit<Network, 'id' | 'userId'>


export const networkBody = Joi.object<NetworkBodyParams>({
    network: Joi.string().required(),
    title: Joi.string().required(),
    password: Joi.string().required()
})

export const networkDelete = Joi.object<DeleteProcess>({
    id: Joi.number().min(1).required()
})
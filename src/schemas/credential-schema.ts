import { CreateCredential, Id } from "@/protocols";
import Joi from "joi";



export const credentialSchema = Joi.object<CreateCredential>({

    title: Joi.string().required(),
    url: Joi.string().uri().required(),
    username: Joi.string().required(),
    password: Joi.string().min(5).required()

})

export const credentialDeleteById = Joi.object<Id>({
    id: Joi.number().min(1).required()
})


import { SignUser } from "@/protocols";
import { authService } from "@/services";

import { Request, Response } from "express";
import httpStatus from "http-status";

export async function signIn(req: Request, res: Response) {

    const { email, password } = req.body as SignUser

    const result = await authService.verifyUser(email, password)

    return res.status(httpStatus.OK).send(result)
}


export const authControler = {
    signIn
}
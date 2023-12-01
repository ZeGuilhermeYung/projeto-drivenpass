import { Request, Response } from "express";
import httpStatus from "http-status";
import { SignUser } from "@/protocols/protocols";
import { authService } from "@/services";

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body as SignUser;
    const result = await authService.verifyUser(email, password);

    return res.status(httpStatus.OK).send(result);
}
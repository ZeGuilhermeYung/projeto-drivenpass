import { SignUser } from "@/protocols";
import { userService } from "@/services";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function postUser(req: Request, res: Response) {
    const { email, password } = req.body as SignUser;

    await userService.createUser(email, password);

    return res.sendStatus(httpStatus.CREATED);
}



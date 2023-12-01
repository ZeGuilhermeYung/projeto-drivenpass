import { AuthenticatedRequest } from "@/middlewares";
import { CreateCredential } from "@/protocols/protocols";
import { credentialService } from "@/services";
import { Credential } from "@prisma/client";
import { Response } from "express";
import httpStatus from "http-status";


export async function postCredential(req: AuthenticatedRequest, res: Response) {
    const body = req.body as CreateCredential;

    await credentialService.postCredential(body);

    return res.sendStatus(httpStatus.CREATED);
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response) {
    const { id, userId } = req.body as Credential;

    await credentialService.deleteCredential(userId, id);

    return res.sendStatus(httpStatus.OK);
}

export async function getCredential(req: AuthenticatedRequest, res: Response) {
    const { userId } = req.body as Credential;
    const result = await credentialService.getCredential(userId);

    return res.status(httpStatus.OK).send(result);
}
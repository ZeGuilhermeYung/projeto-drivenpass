import { AuthenticatedRequest } from "@/middlewares";
import { CredentialBodyParams, DeleteProcess } from "@/protocols";
import { credentialService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";


export async function createCredential(req: AuthenticatedRequest, res: Response) {

    const userId = Number(req.userId)

    const { title, url, username, password } = req.body as CredentialBodyParams

    await credentialService.postCredential(userId, title, url, username, password)

    return res.sendStatus(httpStatus.CREATED)
}

export async function getCredential(req: AuthenticatedRequest, res: Response) {

    const userId = Number(req.userId)

    const result = await credentialService.getCredential(userId)

    return res.status(httpStatus.OK).send(result)
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response) {

    const userId = Number(req.userId)

    const { id } = req.body as DeleteProcess

    const result = await credentialService.deleteCredential(userId, id)

    return res.sendStatus(httpStatus.OK)

}
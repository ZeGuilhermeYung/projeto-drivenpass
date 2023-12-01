import { AuthenticatedRequest } from "@/middlewares";
import { NetworkBodyParams } from "@/schemas";
import { networkService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { DeleteProcess } from "@/protocols";

export async function postNetwork(req: AuthenticatedRequest, res: Response) {

    const userId = Number(req.userId)
    const { network, title, password } = req.body as NetworkBodyParams

    await networkService.createNetwork(userId, title, network, password)

    return res.sendStatus(httpStatus.CREATED)
}

export async function getNetwork(req: AuthenticatedRequest, res: Response) {
    const userId = Number(req.userId)

    const result = await networkService.getAllNetwork(userId)

    return res.status(httpStatus.OK).send(result)

}
export async function deleteNetwork(req: AuthenticatedRequest, res: Response) {
    const userId = Number(req.userId)

    const { id } = req.body as DeleteProcess

    await networkService.deleteNetwork(userId, id)

    return res.sendStatus(httpStatus.OK)
}


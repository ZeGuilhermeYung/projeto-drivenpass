import { AuthenticatedRequest } from "@/middlewares";
import { networkService } from "@/services";
import { Response } from "express";
import httpStatus from "http-status";
import { CreateNetwork, userId } from "@/protocols/protocols";

export async function postNetwork(req: AuthenticatedRequest, res: Response) {
    const { network, title, password } = req.body as CreateNetwork;
    const { userId } = res.locals;

    await networkService.createNetwork(userId, title, network, password);

    return res.sendStatus(httpStatus.CREATED);
}

export async function getNetwork(req: AuthenticatedRequest, res: Response) {
    const { userId } = req.body as CreateNetwork;
    const result = await networkService.getAllNetwork(userId);

    return res.status(httpStatus.OK).send(result);
}

export async function deleteNetwork(req: AuthenticatedRequest, res: Response) {
    const { id } = req.body as userId;
    const { userId } = res.locals;

    await networkService.deleteNetwork(userId, id);

    return res.sendStatus(httpStatus.OK);
}


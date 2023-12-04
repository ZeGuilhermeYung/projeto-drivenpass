import { deleteNetwork, getNetworkById, getUsersNetworks, postNetwork } from "@/controllers";
import { authenticateToken, validateSchemaMiddleware } from "@/middlewares";
import { networkBody, networkDelete } from "@/schemas";
import { Router } from "express";

const networkRouter = Router()
    .all('/*', authenticateToken)
    .post('/', validateSchemaMiddleware(networkBody), postNetwork)
    .get('/', getUsersNetworks)
    .get('/:id', getNetworkById)
    .delete('/', validateSchemaMiddleware(networkDelete), deleteNetwork)

export { networkRouter };
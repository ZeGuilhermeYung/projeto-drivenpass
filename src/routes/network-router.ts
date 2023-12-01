import { deleteNetwork, getNetwork, postNetwork } from "@/controllers";
import { authenticateToken, validateSchemaMiddleware } from "@/middlewares";
import { networkBody, networkDelete } from "@/schemas";
import { Router } from "express";

const networkRouter = Router()
    .all('/*', authenticateToken)
    .post('/', validateSchemaMiddleware(networkBody), postNetwork)
    .get('/', getNetwork)
    .delete('/', validateSchemaMiddleware(networkDelete), deleteNetwork)

export default networkRouter;
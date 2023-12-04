import { postCredential, getUsersCredentials, getCredentialById, deleteCredential } from "@/controllers/credential-controller";
import { authenticateToken, validateSchemaMiddleware } from "@/middlewares";
import { credentialDeleteById, credentialSchema } from "@/schemas/credential-schema";
import { Router } from "express";

const credentialRouter = Router()
    .all('/*', authenticateToken)
    .post('/', validateSchemaMiddleware(credentialSchema), postCredential)
    .get('/', getUsersCredentials)
    .get('/:id', getCredentialById)
    .delete('/', validateSchemaMiddleware(credentialDeleteById), deleteCredential)

export { credentialRouter };
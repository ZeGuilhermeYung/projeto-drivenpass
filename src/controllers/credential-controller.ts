import { Credential } from '@prisma/client';
import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { CreateCredential } from '@/protocols/protocols';
import { credentialService } from '@/services';

export async function postCredential(req: AuthenticatedRequest, res: Response) {
  const { title, url, username, password } = req.body as CreateCredential;
  const { userId } = res.locals;

  await credentialService.postCredential(userId, title, url, username, password);

  return res.sendStatus(httpStatus.CREATED);
}

export async function deleteCredential(req: AuthenticatedRequest, res: Response) {
  const { id } = req.body as Credential;
  const { userId } = res.locals;

  await credentialService.deleteCredential(userId, id);

  return res.sendStatus(httpStatus.OK);
}

export async function getUsersCredentials(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;
  const result = await credentialService.getUsersCredentials(userId);

  return res.status(httpStatus.OK).send(result);
}

export async function getCredentialById(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;
  const { id } = req.params;

  const result = await credentialService.getCredentialbyId(Number(id), userId);

  return res.status(httpStatus.OK).send(result);
}

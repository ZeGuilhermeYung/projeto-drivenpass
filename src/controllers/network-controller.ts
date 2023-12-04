import { Response } from 'express';
import httpStatus from 'http-status';
import { Network } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import { networkService } from '@/services';
import { CreateNetwork } from '@/protocols/protocols';

export async function postNetwork(req: AuthenticatedRequest, res: Response) {
  const { network, title, password } = req.body as CreateNetwork;
  const { userId } = res.locals;

  await networkService.createNetwork(userId, title, network, password);

  return res.sendStatus(httpStatus.CREATED);
}

export async function getUsersNetworks(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;
  const result = await networkService.getUsersNetworks(userId);

  return res.status(httpStatus.OK).send(result);
}

export async function getNetworkById(req: AuthenticatedRequest, res: Response) {
  const { userId } = res.locals;
  const { id } = req.params;

  const result = await networkService.getNetworkById(Number(id), userId);

  return res.status(httpStatus.OK).send(result);
}

export async function deleteNetwork(req: AuthenticatedRequest, res: Response) {
  const { id } = req.body as Network;
  const { userId } = res.locals;

  await networkService.deleteNetwork(userId, id);

  return res.sendStatus(httpStatus.OK);
}

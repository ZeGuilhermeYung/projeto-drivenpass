import { Router } from 'express';
import { deleteNetwork, getNetworkById, getUsersNetworks, postNetwork } from '@/controllers';
import { authenticateToken, validateSchemaMiddleware } from '@/middlewares';
import { networkBody, networkDelete } from '@/schemas';

const networkRouter = Router()
  .all('/*', authenticateToken)
  .post('/', validateSchemaMiddleware(networkBody), postNetwork)
  .get('/', getUsersNetworks)
  .get('/:id', getNetworkById)
  .delete('/', validateSchemaMiddleware(networkDelete), deleteNetwork);

export { networkRouter };

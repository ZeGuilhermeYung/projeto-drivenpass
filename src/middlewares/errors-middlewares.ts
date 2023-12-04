import status from 'http-status';
import { Request, Response, NextFunction } from 'express';
import { ErrorResponse } from '@/protocols/protocols';

export default function errorHandler(error: ErrorResponse, req: Request, res: Response, next: NextFunction) {
  if (error.type === 'UNPROCESSABLE_ENTITY') return res.status(status.UNPROCESSABLE_ENTITY).send(error.message);

  if (error.type === 'CONFLICT') return res.status(status.CONFLICT).send(error.message);

  if (error.type === 'NOT_FOUND') return res.status(status.NOT_FOUND).send(error.message);

  if (error.type === 'UNAUTHORIZED') return res.status(status.UNAUTHORIZED).send(error.message);

  return res.status(status.INTERNAL_SERVER_ERROR).send('Sorry, something got wrong!');
}

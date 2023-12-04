import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { authRepository } from '@/repositories';
import { unauthorized } from '@/errors/errors';

type JWTPayload = {
  userId: number;
};

export type AuthenticatedRequest = Request & JWTPayload;

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw unauthorized("cannot find Authorization!");

  const token = authHeader.split(' ')[1];
  if (!token) throw unauthorized("token is not given!");

  const session = await authRepository.findSession(token);
  if (!session) throw unauthorized("cannot find session!");

  const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

  res.locals.userId = userId;

  next();
}

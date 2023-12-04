import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { createUser } from './user-factory';
import { createSession } from './session-factory';

export async function generateValidToken(user?: User) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}

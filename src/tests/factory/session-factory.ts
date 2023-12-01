import { createUser } from './user-factory';
import prisma from '@/database/db';

export async function createSession(token: string) {
  const user = await createUser();

  return prisma.session.create({
    data: {
      token,
      userId: user.id,
    },
  });
}
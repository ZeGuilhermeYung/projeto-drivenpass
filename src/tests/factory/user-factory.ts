import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import prisma from '@/database/db';

export async function createUser(params: Partial<User> = {}) {
  const incomingPassword = params.password || faker.internet.password();
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.user.create({
    data: {
      id: params.id,
      email: params.email || faker.internet.email(),
      password: hashedPassword,
    },
  });
}

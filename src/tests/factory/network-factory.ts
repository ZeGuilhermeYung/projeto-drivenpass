import Cryptr from 'cryptr';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { createUser } from './user-factory';
import prisma from '@/database/db';

const cryptr = new Cryptr(process.env.CRYPT_PASSWORD);

export async function createNetwork(user?: User) {
  const incomingUser = user || (await createUser());
  const cryptPassword = cryptr.encrypt(faker.lorem.word());

  return prisma.network.create({
    data: {
      title: faker.lorem.word(),
      network: faker.lorem.word(),
      password: cryptPassword,
      userId: incomingUser.id,
    },
  });
}

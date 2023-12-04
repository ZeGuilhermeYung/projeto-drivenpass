import Cryptr from 'cryptr';
import { faker } from '@faker-js/faker';
import prisma from '@/database/db';
import { CreateNetwork } from '@/protocols/protocols';
import { User } from '@prisma/client';
import { createUser } from './user-factory';

const cryptr = new Cryptr(process.env.CRYPT_PASSWORD);

export async function createNetwork(user?: User) {
  const incomingUser = user || (await createUser());
  const cryptPassword = cryptr.encrypt(faker.lorem.word());
  
  return prisma.network.create({
    data: {
      title: faker.lorem.word(),
      network: faker.lorem.word(),
      password: cryptPassword,
      userId: incomingUser.id
    },
  });
}
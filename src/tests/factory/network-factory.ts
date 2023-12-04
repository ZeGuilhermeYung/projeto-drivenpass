import { faker } from '@faker-js/faker';
import prisma from '@/database/db';
import { CreateNetwork } from '@/protocols/protocols';
import { User } from '@prisma/client';
import { createUser } from './user-factory';

export async function createNetwork(user?: User) {
  const incomingUser = user || (await createUser());
  
  return prisma.network.create({
    data: {
      title: faker.lorem.word(),
      network: faker.lorem.word(),
      password: faker.lorem.word(),
      userId: incomingUser.id
    },
  });
}

export async function createNetworkByData(data: CreateNetwork) {
  return prisma.network.create({
    data,
  });
}
import Cryptr from 'cryptr';
import { faker } from '@faker-js/faker';
import prisma from '@/database/db';
import { CreateCredential } from '@/protocols/protocols';
import { User } from '@prisma/client';
import { createUser } from './user-factory';

const cryptr = new Cryptr(process.env.CRYPT_PASSWORD);

export async function createCredential(user?: User) {
  const incomingUser = user || (await createUser());
  const cryptPassword = cryptr.encrypt(faker.lorem.word());
  
  return prisma.credential.create({
    data: {
      title: faker.lorem.word(),
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: cryptPassword,
      userId: incomingUser.id
    },
  });
}

export async function createCredentialByData(data: CreateCredential) {
  const cryptPassword = cryptr.encrypt(faker.lorem.word());

  return prisma.credential.create({
    data: {
      title: data.title,
      url: faker.internet.url(),
      username: faker.internet.userName(),
      password: cryptPassword,
      userId: data.userId
    },
  });
}
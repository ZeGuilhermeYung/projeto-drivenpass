import prisma from '@/database/db';
import { CreateCredential } from '@/protocols/protocols';

async function createCredential(data: CreateCredential) {
  return prisma.credential.create({
    data,
  });
}

async function findCredential(userId: number, title: string) {
  const credential = prisma.credential.findFirst({
    where: {
      AND: {
        userId,
        title,
      },
    },
  });

  return credential;
}

async function getCredentialById(id: number) {
  return prisma.credential.findFirst({
    where: {
      id,
    },
  });
}

async function getUserCredentials(userId: number) {
  return prisma.credential.findMany({
    where: {
      userId,
    },
  });
}

async function deleteCredential(id: number) {
  return prisma.credential.delete({
    where: {
      id,
    },
  });
}

export const credentialRepository = {
  createCredential,
  findCredential,
  getCredentialById,
  getUserCredentials,
  deleteCredential,
};

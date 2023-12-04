import prisma from '@/database/db';
import { CreateNetwork } from '@/protocols/protocols';

async function createNetwork(data: CreateNetwork) {
  return prisma.network.create({
    data,
  });
}

async function getNetworkById(id: number) {
  return prisma.network.findFirst({
    where: {
      id,
    },
  });
}

async function findUserNetworks(userId: number) {
  return prisma.network.findMany({
    where: {
      userId,
    },
  });
}

async function deleteNetwork(id: number) {
  return prisma.network.delete({
    where: {
      id,
    },
  });
}

export const networkRepository = {
  createNetwork,
  findUserNetworks,
  deleteNetwork,
  getNetworkById,
};

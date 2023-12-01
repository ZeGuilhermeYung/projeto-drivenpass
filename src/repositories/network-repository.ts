import prisma from '@/database/db';
import { CreateNetwork } from '@/protocols/protocols';

async function createNetwork(data: CreateNetwork) {
  return prisma.network.create({
    data,
  });
}

async function getNetwork(userId: number) {
  return prisma.network.findMany({
    where: {
      userId,
    },
  });
}

async function deleteNetwork(userId: number, id: number) {
  return prisma.network.delete({
    where: {
      id,
      userId,
    },
  });
}

async function verifyNetworkById(userId: number, id: number) {
  return prisma.network.findMany({
    where: {
      userId,
      id,
    },
  });
}

export const networkRepository = {
  createNetwork,
  getNetwork,
  deleteNetwork,
  verifyNetworkById,
};
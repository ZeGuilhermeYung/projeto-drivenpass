import prisma from '@/database/db';

async function findByEmail(email: string) {
  return prisma.user.findFirst({
    where: {
      email,
    },
  });
}

async function createUser(email: string, password: string) {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
}

export const userRepository = {
  findByEmail,
  createUser,
};

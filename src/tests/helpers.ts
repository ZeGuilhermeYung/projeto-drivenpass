import prisma from '@/database/db';

export async function cleanDB() {
  await prisma.credential.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.network.deleteMany({});
  await prisma.user.deleteMany({});
}
import prisma from '@/database/db';

export async function cleanDB() {
  await prisma.user.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.credential.deleteMany({});
  await prisma.network.deleteMany({});
}
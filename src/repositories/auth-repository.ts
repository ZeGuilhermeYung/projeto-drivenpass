import prisma from "@/database/db";

async function createNewSession(userId: number, token: string) {
    return prisma.session.create({
        data: {
            userId,
            token
        }
    })
}

async function findSession(token: string) {
    return prisma.session.findFirst({
        where: {
            token
        }
    })
}

export const authRepository = {
    createNewSession,
    findSession
}   
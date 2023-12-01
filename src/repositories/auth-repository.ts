import prisma from "@/database/database"

async function createNewSession(userId: number, token: string) {

    return prisma.session.create({
        data: {
            userId,
            token
        }
    })
}

async function findToken(token: string) {

    return prisma.session.findFirst({
        where: {
            token: token
        }
    })
}


export const authRepository = {

    createNewSession,
    findToken
}   
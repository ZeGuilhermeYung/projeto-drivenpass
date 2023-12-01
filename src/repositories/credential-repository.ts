import prisma from "@/database/db";
import { CreateCredential } from "@/protocols/protocols";

async function createCredential(data: CreateCredential) {
    return prisma.credential.create({
        data
    })
}

async function findCredential(userId: number, title: string, username: string) {
    return prisma.credential.findFirst({
        where: {
            userId,
            title,
            username
        }
    })
}

async function getCredentialById(userId: number) {
    return prisma.credential.findMany({
        where: {
            userId,
        }
    })
}

async function getCredentialId(userId: number, id: number) {
    return prisma.credential.findMany({
        where: {
            id,
            userId
        }
    })
}

async function deleteCredential(id: number, userId: number) {
    return prisma.credential.delete({
        where: {
            userId,
            id
        }
    })
}


export const credentialRepository = {
    createCredential,
    findCredential,
    getCredentialById,
    deleteCredential,
    getCredentialId

}
import prisma from "@/database/database";
import { CredentialParams } from "@/protocols";
import { verify } from "crypto";

async function createNewCredential(data: CredentialParams) {
    return prisma.credential.create({
        data
    })
}

async function verifyCredential(userId: number, title: string, username: string) {
    return prisma.credential.findFirst({
        where: {
            userId,
            title,
            username
        }
    })
}

async function getCredentialById(userId: number,) {

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
            userId,

        }
    })
}

async function deleteCredentialById(id: number, userId: number) {
    return prisma.credential.delete({
        where: {
            userId,
            id
        }
    })
}


export const credentialRepository = {
    createNewCredential,
    verifyCredential,
    getCredentialById,
    deleteCredentialById,
    getCredentialId

}
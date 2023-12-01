import { duplicateCredentialError, notFoundError } from "@/erros"
import { credentialRepository } from "@/repositories/credential-repository"
import Cryptr from "cryptr"
import { Credential } from "@prisma/client"
import { required, string } from "joi"


async function postCredential(userId: number, title: string, url: string, username: string, password: string) {

    await verifyCredential(userId, title, username)

    const encrypt = await encryptrPassword(password)

    await credentialRepository.createNewCredential({ title, url, username, password: encrypt, userId })

}

async function verifyCredential(userId: number, title: string, username: string) {

    const verifyInfo = await credentialRepository.verifyCredential(userId, title, username)
    if (verifyInfo) throw duplicateCredentialError()
}

async function encryptrPassword(password: string) {

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(password);

    const encrypt = cryptr.encrypt(password)

    return encrypt
}

async function decryptrPassword(password: string) {

    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(password);

    const decrypt = cryptr.decrypt(password)

    return decrypt
}

async function getCredential(userId: number) {

    const result = await getAllCredential(userId)

    const response = result.map(rt => ({
        ...rt,
        password: decryptrPassword(rt.password)
    }))


    return result
}

async function deleteCredential(userId: number, id: number) {

    const verify = await credentialRepository.getCredentialId(userId, id)
    if (!verify) throw notFoundError()

    const result = await credentialRepository.deleteCredentialById(id, userId)
    if (!result) throw notFoundError

}

async function getAllCredential(userId: number) {

    const result = await credentialRepository.getCredentialById(userId)

    if (!result) throw notFoundError()

    return result
}

export const credentialService = {
    postCredential,
    getCredential,
    deleteCredential
}
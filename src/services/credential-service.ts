import Cryptr from "cryptr";
import { duplicateCredentialError, notFoundError } from "@/errors";
import { credentialRepository } from "@/repositories/credential-repository";
import { CreateCredential } from "@/protocols/protocols";

async function verifyCredential(userId: number, title: string, username: string) {
    const verifyInfo = await credentialRepository.findCredential(userId, title, username);
    if (verifyInfo) throw duplicateCredentialError();
}

function encryptPassword(password: string) {
    const cryptr = new Cryptr(password);
    const encrypt = cryptr.encrypt(password);

    return encrypt;
}

function decryptrPassword(password: string) {
    const cryptr = new Cryptr(password);
    const decrypt = cryptr.decrypt(password);

    return decrypt;
}

async function postCredential(body: CreateCredential) {
    const { title, url, username, password,  userId } = body;

    await verifyCredential(userId, title, username);

    const hashedPassword = encryptPassword(password)

    await credentialRepository.createCredential({ title, url, username, password: hashedPassword, userId })
}

async function deleteCredential(userId: number, id: number) {
    const verify = await credentialRepository.getCredentialId(userId, id);
    if (!verify) throw notFoundError();

    const result = await credentialRepository.deleteCredential(id, userId);
    if (!result) throw notFoundError;
}

async function getCredential(userId: number) {
    const credentials = await getCredentials(userId);
    const result = credentials.map(credential => ({
        ...credential,
        password: decryptrPassword(credential.password)
    }))

    return result;
}

async function getCredentials(userId: number) {
    const result = await credentialRepository.getCredentialById(userId);

    if (!result) throw notFoundError();

    return result;
}

export const credentialService = {
    postCredential,
    getCredential,
    deleteCredential
}
import Cryptr from 'cryptr';
import { Credential } from '@prisma/client';
import { conflictError, notFound, unauthorized } from '@/errors/errors';
import { credentialRepository } from '@/repositories/credential-repository';

const cryptr = new Cryptr(process.env.CRYPT_PASSWORD);

async function postCredential(userId: number, title: string, url: string, username: string, password: string) {
  await verifyCredential(userId, title);

  const encrypt = cryptr.encrypt(password);

  await credentialRepository.createCredential({ title, url, username, password: encrypt, userId });
}

async function verifyCredential(userId: number, title: string) {
  const verifyInfo = await credentialRepository.findCredential(userId, title);

  if (verifyInfo) throw conflictError('You cant pass the same title for other crendetial');
}

async function getUsersCredentials(userId: number) {
  const credentials: Credential[] = await credentialRepository.getUserCredentials(userId);

  if (credentials.length === 0) throw notFound('cant find any credential for this user!');

  credentials.map((credential) => (credential.password = cryptr.decrypt(credential.password)));

  return credentials;
}

async function getCredentialbyId(id: number, userId: number) {
  const credential: Credential = await credentialRepository.getCredentialById(id);

  if (credential && credential.userId !== userId) throw unauthorized('this ID does not belong to this user!');

  if (!credential) throw notFound('cant find any credential for this ID!');

  const result = {
    ...credential,
    password: cryptr.decrypt(credential.password),
  };

  return result;
}

async function deleteCredential(userId: number, id: number) {
  const credential: Credential = await credentialRepository.getCredentialById(id);

  if (credential && credential.userId !== userId) throw unauthorized('this ID does not belong to this user!');

  if (!credential) throw notFound('cant find any credential for this ID!');

  await credentialRepository.deleteCredential(id);
}

export const credentialService = {
  postCredential,
  getUsersCredentials,
  getCredentialbyId,
  deleteCredential,
};

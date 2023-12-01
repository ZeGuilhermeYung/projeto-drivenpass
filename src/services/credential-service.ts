import Cryptr from 'cryptr';
import { duplicateCredentialError, notFoundError } from '@/errors';
import { credentialRepository } from '@/repositories/credential-repository';

async function postCredential(userId: number, title: string, url: string, username: string, password: string) {
  await verifyCredential(userId, title, username);

  this.cryptr = new Cryptr(password);

  const encrypt = this.cryptr.encrypt(password);

  await credentialRepository.createCredential({ title, url, username, password: encrypt, userId });
}

async function verifyCredential(userId: number, title: string, username: string) {
  const verifyInfo = await credentialRepository.findCredential(userId, title, username);
  if (verifyInfo) throw duplicateCredentialError();
}

async function getCredential(userId: number) {
  const result = await getAllCredential(userId);

  return result;
}

async function deleteCredential(userId: number, id: number) {
  const verify = await credentialRepository.getCredentialId(userId, id);
  if (!verify) throw notFoundError();

  const result = await credentialRepository.deleteCredential(id, userId);
  if (!result) throw notFoundError;
}

async function getAllCredential(userId: number) {
  const result = await credentialRepository.getCredentialById(userId);

  if (!result) throw notFoundError();

  return result;
}

export const credentialService = {
  postCredential,
  getCredential,
  deleteCredential,
};
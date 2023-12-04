import Cryptr from 'cryptr';
import { networkRepository } from '@/repositories';
import { notFound } from '@/errors/errors';

async function createNetwork(userId: number, title: string, network: string, password: string) {
  const cryptr = new Cryptr(password);

  const encrypt = cryptr.encrypt(password);

  await networkRepository.createNetwork({ network, title, password: encrypt, userId });
}

async function getAllNetwork(userId: number) {
  const networks = await networkRepository.findUserNetworks(userId);

  networks.map(network => network.password = this.cryptr.decrypt(network.password));

  return networks;
}

async function deleteNetwork(userId: number, id: number) {
  const verify = await networkRepository.findNetwork(userId, id);
  if (!verify) throw notFound("Inexistent Network!");

  await networkRepository.deleteNetwork(userId, id);

}

export const networkService = {
  createNetwork,
  getAllNetwork,
  deleteNetwork,
};
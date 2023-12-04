import Cryptr from 'cryptr';
import { networkRepository } from '@/repositories';
import { notFound, unauthorized } from '@/errors/errors';
import { Network } from '@prisma/client';

const cryptr = new Cryptr(process.env.CRYPT_PASSWORD);

async function createNetwork(userId: number, title: string, network: string, password: string) {
  const encrypt = cryptr.encrypt(password);

  await networkRepository.createNetwork({ network, title, password: encrypt, userId });
}

async function getUsersNetworks(userId: number) {
    const networks: Network[] = await networkRepository.findUserNetworks(userId);

    if (networks.length === 0) throw notFound("cant find any network for this user!");

    networks.map(network => network.password = cryptr.decrypt(network.password));

    return networks;
}

async function getNetworkById(id: number, userId: number) {
    const network: Network = await networkRepository.getNetworkById(id);

    if (network && network.userId !== userId)
        throw unauthorized("this ID does not belong to this user!");

    if (!network) throw notFound("cant find any network for this ID!");

    const result = {
        ...network,
        password: cryptr.decrypt(network.password)
    };

    return result;
}

async function deleteNetwork(userId: number, id: number) {
    const network: Network = await networkRepository.getNetworkById(id);

    if (network && network.userId !== userId)
        throw unauthorized("this ID does not belong to this user!");

    if (!network) throw notFound("cant find any network for this ID!");

    await networkRepository.deleteNetwork(id); 
}

export const networkService = {
  createNetwork,
  getUsersNetworks,
  getNetworkById,
  deleteNetwork,
};
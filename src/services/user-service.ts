import bcrypt from 'bcrypt';
import { conflictError } from '@/errors/errors';
import { userRepository } from '@/repositories';

async function createUser(email: string, password: string) {
  await verifyUser(email);

  const hash = await bcrypt.hash(password, 12);
  const newUser = await userRepository.createUser(email, hash);

  return newUser;
}

async function verifyUser(email: string) {
  const response = await userRepository.findByEmail(email);
  if (response) throw conflictError('This email already exists!');
}

export const userService = {
  createUser,
};

import { ApplicationError } from '@/protocols';

export function invalidEmailError(email: string): ApplicationError {
  return {
    name: 'InvalidEmailError',
    message: `"${email}" is not a valid email!`,
  };
}
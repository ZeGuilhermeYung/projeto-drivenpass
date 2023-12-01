import { ApplicationError } from '@/protocols/protocols';

export function invalidPasswordError(): ApplicationError {
  return {
    name: 'invalidEmailError',
    message: "Password or email is wrong",
  };
}
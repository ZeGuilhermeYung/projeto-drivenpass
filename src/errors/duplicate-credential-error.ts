import { ApplicationError } from '@/protocols/protocols';

export function duplicateCredentialError(): ApplicationError {
  return {
    name: 'duplicateCredentialError',
    message: 'You cant pass the same title for other crendetial',
  };
}
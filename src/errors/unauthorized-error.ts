import { ApplicationError } from '@/protocols/protocols';

export function unauthorizedError(): ApplicationError {
    return {
        name: "unauthorizedError",
        message: "Your token is invalid"
    }
}

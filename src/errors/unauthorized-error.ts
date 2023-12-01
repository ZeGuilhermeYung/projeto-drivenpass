import { ApplicationError } from '@/protocols';

export function unauthorizedError(): ApplicationError {
    return {
        name: "unauthorizedError",
        message: "Your token is invalid"
    }
}

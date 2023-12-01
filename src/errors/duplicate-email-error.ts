import {ApplicationError} from '@/protocols/protocols';

export function duplicatedEmailError():ApplicationError{

    return{
        name:"duplicatedEmailError",
        message:"This email was used by other user"
    }
}
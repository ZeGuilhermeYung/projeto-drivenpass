import { invalidEmailError, invalidPasswordError } from "@/erros"
import { authRepository, userRepository } from "@/repositories"
import * as jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'



async function verifyUser(email: string, password: string) {

    const user = await verifyEmail(email)

    await verifyPasswordUser(password, user.password)
    
    const result = await createSession(user.id)
   

    return {token:result}
}

async function verifyEmail(email: string) {

    const user = await userRepository.findByEmail(email)
    if (!user) throw invalidEmailError(user.email)

    return user
}

async function verifyPasswordUser(password: string, hash: string) {

    const validatePassword = await bcrypt.compare(password, hash)

    if (!validatePassword) throw invalidPasswordError()

}

async function createSession(userId: number) {

     const token = jwt.sign({ userId }, process.env.JWT_SECRET)

     const result = await authRepository.createNewSession(userId, token)
  
     return token
}



export const authService = {

    verifyUser
}

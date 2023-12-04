import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { authRepository, userRepository } from "@/repositories";
import { unauthorized } from '@/errors/errors';

async function verifyUser(email: string, password: string) {
    const user = await verifyEmail(email);
    
    await verifyPasswordUser(password, user.password);
    const token = await createSession(user.id);

    return {
        user,
        token,
    };
}

async function verifyEmail(email: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw unauthorized("This email is inexistent!");

    return user;
}

async function verifyPasswordUser(password: string, hash: string) {
    const validatePassword = await bcrypt.compare(password, hash);

    if (!validatePassword) throw unauthorized("The password is wrong!");
}

async function createSession(userId: number) {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);

    await authRepository.createNewSession(userId, token);
  
    return token;
}

export const authService = {
    verifyUser
}

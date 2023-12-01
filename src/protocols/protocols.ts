import { Credential, Network } from "@prisma/client";

export type SignUser = {
    email: string;
    password: string;
}

export type ApplicationError = {
    name: string;
    message: string;
}

export type Id = {
    id: number;
}

export type userId = {
    id: number;
    userId: number;
}

export type CreateCredential = Omit<Credential, 'id' >

export type CredentialBodyParams = Omit<Credential, 'id' | 'userId'>;

export type CreateNetwork = Omit<Network, 'id' >
import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({ email, password }: IAuthenticateRequest) {
        const usersRepository = getCustomRepository(UserRepositories);

        const user = await usersRepository.findOne({ email });

        if(!user) {
            throw new Error('Email/Password incorrect!');
        };

        const passwordMatch = await compare(password, user.password);
        
        if(!passwordMatch) {
            throw new Error('Email/Password incorrect!');
        };

        // Chave gerada pelo "MD5 HASH GENERATE";
        const token = sign(
            {
                email: user.email,
            }, 
            "6a95659c7051e268cdbd6b602ff5b489",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    };
};

export { AuthenticateUserService };
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import { instanceToPlain } from 'class-transformer';
import { hash } from 'bcryptjs';

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin: boolean;
};

class CreateUserService {
    async execute({name, email, password, admin = false}: IUserRequest) {
        // Se admin === null (vazio) ===> Seta valor false como default;
        const usersRepository = getCustomRepository(UserRepositories);

        if(!email) {
            throw new Error('Email incorrect!');
        };

        const userAlreadyExists = await usersRepository.findOne({email});

        if(userAlreadyExists) {
            throw new Error('User already exists!');
        };

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name, 
            email,
            password: passwordHash, 
            admin
        });

        await usersRepository.save(user);

        return instanceToPlain(user);
    };
};

export { CreateUserService };

import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { instanceToPlain } from 'class-transformer';

class ListUsersService {
    async execute() {
        const userRepositories = getCustomRepository(UserRepositories);

        const users = userRepositories.find();

        return instanceToPlain(users);
    };
};

export { ListUsersService };
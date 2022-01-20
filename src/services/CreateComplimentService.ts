import { getCustomRepository } from "typeorm";
import { ComplimentRepositories } from "../repositories/ComplimentsRepositories";
import { UserRepositories } from "../repositories/UserRepositories";

interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        const complimentsRepository = getCustomRepository(ComplimentRepositories);
        const userRepository = getCustomRepository(UserRepositories);

        if(user_sender === user_receiver) {
            throw new Error("Incorrect user receiver!");
        };

        const userReceiverExists = await userRepository.findOne(user_receiver);

        if(!userReceiverExists) {
            throw new Error("User Receiver does not exists!");
        };

        const compliment = complimentsRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message,
        });

        await complimentsRepository.save(compliment);

        return compliment;
    };
};

export { CreateComplimentService };
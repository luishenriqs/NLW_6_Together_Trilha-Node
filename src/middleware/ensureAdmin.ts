import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';

/* ************************************************** */
//=> Para rotas autorizadas apenas para administradores;
async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    //Recupera id o usuário;
    const { user_id } = request;

    const usersRepositories = getCustomRepository(UserRepositories);
    //Recupera variável "admin" do usuário;
    const { admin } = await usersRepositories.findOne(user_id)

    //Caso usuário ("admin" === true) rota é autorizada;
    if (admin) {
        return next();
    };

    //Caso usuário ("admin" === false) rota é não autorizada;
    return response.status(401).json({
        error: "Unauthorized!"
    });
};

export { ensureAdmin };
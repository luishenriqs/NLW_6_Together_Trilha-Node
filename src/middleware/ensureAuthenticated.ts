import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

/* *********************************************************************** */
//=> Para rotas autorizadas apenas para usuários autenticados (Rota privada);
function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction
) {
    //Recupera "Bearer Token";
    const authToken = request.headers.authorization;
    //Caso "Bearer Token" inexistênte retorna erro;
    if(!authToken) {
        return response.status(401).end();
    };

    //Separa "Bearer Token" e isola apenas o token;
    const [, token] = authToken.split(" ");

    //Lib "verify" autentica a validade do token fornecido;
    try {
        const { sub } = verify(token, "6a95659c7051e268cdbd6b602ff5b489") as IPayload;
        request.user_id = sub;

        return next();
    } catch (error) {
        return response.status(401).end();
    };
};

export { ensureAuthenticated };
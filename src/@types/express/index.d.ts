/*
//==> Sobrescreve as tipagens da lib Request do Express para aceitar nova variável;
//==> ATENÇÃO: Setar nova path na variável "typeRoots" no tsconfig.json para 
que o typescript aceite essas novas tipagens ==> "typeRoots": ["./src/@types"], 
*/

declare namespace Express {
    export interface Request {
        user_id: string;
    };
};
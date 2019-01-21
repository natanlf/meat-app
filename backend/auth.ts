import { Request, Response } from 'express';
import { User, users } from './users';

export const handleAuthentication = (req: Request, resp: Response) => { //processa o post do login
    //vamos receber um objeto no body com email e senha
    const user: User = req.body
    if(isValid(user)){ //se usuario e senha forem validos faz login
        const dbUser: User = users[user.email]
        resp.json({name: dbUser.name, email: dbUser.email}) //dados do usuário
    }else{
        resp.status(403).json({message: 'Dados inválidos.'})
    }

    function isValid(user: User) : boolean {
        if(!user){
           return false 
        }

        const dbUser = users[user.email]
        return dbUser !== undefined && dbUser.matches(user)
    }
}
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { apiConfig } from './api-config';

export const handleAuthorization = (req: Request, resp: Response, next) => {
    const token = extractToken(req)
    if(!token){ //caso não tenha token
        resp.setHeader('WWW-Authenticate', 'Beader token_type="JWT"') //caso não tenha token válido informamos que esperamos um token JWT
        resp.status(401).json({message: 'Você precisa se autenticar.'})
    }else{
        jwt.verify(token, apiConfig.secret, (error, decoded)=>{
            if(decoded){ //caso tenha um otken válido
                next()
            }else{ //existe um token mas ele não é válido
                resp.status(403).json({message: 'Não autorizado.'})
            }
        })
    }
}

function extractToken(req: Request): string{ //o token deve vir nos headers do request
    let token = undefined
    if(req.headers && req.headers.authorization){
        //Authorization: Beader ZZZ.ZZZ.ZZZ como o token fica no header
        const parts: string[] = req.headers.authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        } 
    }
    return token
}
import { LoginService } from './login/login.service';
import { CanLoad, Route } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanLoad { //LoggedInGuard é um provider

    constructor(private loginService: LoginService){}

    //canload é associado com as rotas e assim vamos saber se podemos carregar um modulo dependendo da condição que criarmos
    canLoad(route: Route): boolean { //se retornar false, o modulo não é carregado, assim a pessoa só vai ter acesso se estiver autenticada
        const loggedIn = this.loginService.isLoggedIn() //verifica se o usuário está autenticado
        
        if(!loggedIn){ //caso não esteja autenticado
            this.loginService.handleLogin(`/${route.path}`) //vai levar o usuário para a página de autenticação
        }
        return loggedIn
    }   
}
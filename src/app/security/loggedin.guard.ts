import { LoginService } from './login/login.service';
import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate { //LoggedInGuard é um provider

    constructor(private loginService: LoginService){}

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn() //verifica se o usuário está autenticado
        
        if(!loggedIn){ //caso não esteja autenticado
            this.loginService.handleLogin(`/${path}`) //vai levar o usuário para a página de autenticação
        }
        return loggedIn
    }

    //canload é associado com as rotas e assim vamos saber se podemos carregar um modulo dependendo da condição que criarmos
    canLoad(route: Route): boolean { //se retornar false, o modulo não é carregado, assim a pessoa só vai ter acesso se estiver autenticada
        console.log("Can Load")
        return this.checkAuthentication(route.path)
    }
    
    /* ActivatedRouteSnapshot é uma cópia da rota que foi ativada */
    /* RouterStateSnapshot é uma árvore de ActivatedRouteSnapshot, vai ter o caminho de todas as rotas que foram ativadas até chegar na nossa,
     se tivermos rotas pais, vamos conseguir acessar*/
    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot){
        console.log("Can Activate")
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}
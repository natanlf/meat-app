import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable, Injector } from "@angular/core";
import { LoginService } from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private injector: Injector){ //injector é uma referencia para o mecanismo de injeção de dependencia do angular, usamos o injector por causa do erro ao adicionar o login service no construtor
        
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const loginService = this.injector.get(LoginService)
        if(loginService.isLoggedIn()){  //clonamos o request e adicionamos um header caso o usuário esteja logado
            const authRequest = request.clone( //precisamos clonar porque o request é imutável
                {setHeaders: {'Authorization': `Bearer ${loginService.user.accessToken}`}})
            return next.handle(authRequest)
        }else{
            return next.handle(request)
        }
    }

}
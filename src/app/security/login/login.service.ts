import { User } from './user.model';
import { MEAT_API } from './../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

@Injectable()
export class LoginService {
    
user: User
lastUrl: string

    constructor(private http: HttpClient, private router: Router){
        //Events é um observable e nos escrevemos para observar mudanças
        //NavigationEnd é o metodo que precisamos para saber em qual página estava ao logar
        this.router.events.filter(e=> e instanceof NavigationEnd)
            .subscribe( (e:NavigationEnd) => this.lastUrl = e.url )
    }

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<any>{
        return this.http.post<User>(`${MEAT_API}/login`, 
        {email: email, password: password})
        .do(user => this.user = user)
    }

    logout() { //para fazer logout devemos destruir o objeto user
        this.user = undefined
    }

    handleLogin(path: string = this.lastUrl){ //btoa = encoda em base 64 para ajustar a url
        this.router.navigate(['/login', btoa(path)]) //caso não esteja autenticado, mandamos o usuário para a página de login
    }
}
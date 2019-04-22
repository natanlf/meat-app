import { User } from './user.model';
import { MEAT_API } from './../../app.api';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do';

@Injectable()
export class LoginService {
    
user: User

    constructor(private http: HttpClient, private router: Router){}

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<any>{
        return this.http.post<User>(`${MEAT_API}/login`, 
        {email: email, password: password})
        .do(user => this.user = user)
    }

    handleLogin(path?: string){ //btoa = encoda em base 64 para ajustar a url
        this.router.navigate(['/login', btoa(path)]) //caso não esteja autenticado, mandamos o usuário para a página de login
    }
}
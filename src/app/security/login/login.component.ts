import { NotificationService } from './../../shared/messages/notification.service';
import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from'@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  navigateTo: string //após fazer o login vamos para outra página

  constructor(
    private fb: FormBuilder, 
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activetedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })

    //pegando referencias dos parametros através do snapshot, se ninguém passar uma rota, vamos para a raíz (/)
    this.navigateTo = this.activetedRoute.snapshot.params['to'] || '/'
  }

  login(){
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
    .subscribe(user => this.notificationService.notify(`Bem vindo, ${user.name}`),
    response => this.notificationService.notify(response.error.message),
      ()=>{ //caso o login der certo vai navegar para a rota informada
        this.router.navigate([this.navigateTo])
      }
    )
  }

}

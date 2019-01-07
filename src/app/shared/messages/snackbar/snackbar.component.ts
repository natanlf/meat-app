import { NotificationService } from './../notification.service';
import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition, animate } from '@angular/animations'; //animação
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [ //nome da trigger e um array de estados que é hidden e visible
    trigger('snack-visibility',[ //o nome da trigger é associado ao elemento html que vamos animar
      state('hidden', style({ 
        opacity: 0, //esconde o elemento com opacidade zero
        bottom: '0px' //vai sumindo aos poucos 30 px para baixo ao esconder. Podemos usar a string para indicar a unidade ao lado '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')), //de um estado vai para outro
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  message: string = "Hello there!"

  snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  //Antes tinhamos dois obervables diferentes e faziamos dois subscribes, 
  //assim não tinhamos uma sincronia para exibir e esconder o snackbar ao adicionar ou remover mais de um item em intervalos curtos
  ngOnInit() { //o snackbar se inscreve para receber a mensagem e exibir
    this.notificationService.notifier
    .do(message => { 
      this.message = message
      this.snackVisibility = 'visible'
      
    }).switchMap(message => Observable.timer(3000)) //é semelhante a função map. Vai trocar o observable
      .subscribe(timer => this.snackVisibility = 'hidden')
  }

}

import { Component, OnInit } from '@angular/core';
import { trigger,state,style,transition, animate } from '@angular/animations'; //animação

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

  constructor() { }

  ngOnInit() {
  }

}

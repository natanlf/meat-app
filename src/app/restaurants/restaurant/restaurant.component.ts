import { Restaurant } from './restaurant.model';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  animations: [
    trigger('restaurantAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [ //transição para exibir
        style({opacity: 0, transform: 'translate(-30px, -10px)'}), //eixo x (largura) e y (altura)
        animate('500ms 0s ease-in-out') //ease-in-out entra acelerando e desacelera
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {

  restaurantState = 'ready'

  //input permite que outros componentes possam passar o restaurante para o componente restaurant

  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}

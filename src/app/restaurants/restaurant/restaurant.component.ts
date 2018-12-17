import { Restaurant } from './restaurant.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  //input permite que outros componentes possam passar o restaurante para o componente restaurant

  @Input() restaurant: Restaurant

  constructor() { }

  ngOnInit() {
  }

}

import { Restaurant } from './../restaurants/restaurant/restaurant.model';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mt-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {

  //Ao clicar em um restaurante, o componente restaurant-detail é chamado e para mostrar os detalhes do resturante clicado, 
  //é necessário receber o id do mesmo, para isso vamos usar o ActivatedRoute
  //Como precisamos pegar o id apenas uma vez usamos o snapshot: this.route.snapshot.params['id']
  restaurant: Restaurant

  constructor(private restaurantService: RestaurantsService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.restaurantService.restaurantById(this.route.snapshot.params['id'])
    .subscribe(restaurant => this.restaurant = restaurant)
  }

}

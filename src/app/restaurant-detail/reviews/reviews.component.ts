import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

reviews: Observable<any>

  constructor(private restaurantService: RestaurantsService,
              private route: ActivatedRoute) { }

  /*Primeiro estou em restaurant (componente restaurant), clico em qualquer restaurante e vou para o componente restaurant-detail
  Através do restaurant-detail posso clicar em reviews e aparece o componente reviews com os dados, mas o id do restaurante
  não está em restaurant-detail e sim na rota pai que é restaurant, por isso vou usar parent no snapshot*/

  ngOnInit() {
    this.reviews = this.restaurantService.
    reviewsOfRestaurant(this.route.parent.snapshot.params['id'])
  }

}

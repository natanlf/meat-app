import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RestaurantsService } from './restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max=height": "0px"
      })),
      state('visible', style({
          opacity: 1,
          "max=height": "80px",
          "margin-top": "15px",
          "margin-bottom": "25px"
      })),
      transition('* => *', animate('250ms 0s ease-in-out')) //como é toggle tanto faz a transição
    ])
  ]
})
export class RestaurantsComponent implements OnInit {

  searchBarState = 'hidden'

  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl: FormControl

  constructor(
    private restaurantsService: RestaurantsService,
    private fb: FormBuilder) { }

  ngOnInit() {

    this.searchControl = this.fb.control('')
    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    })

    //valueChanges é um evento que é acionado a cada mudança do input de busca de restaurantes
    this.searchControl.valueChanges.switchMap(searchTerm => 
      this.restaurantsService.restaurants(searchTerm))
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants) //com subscribe pegamos apenas a lista de restaurantes
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { RestaurantsService } from './restaurants.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';

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
    /* debounceTime manda uma mensagem para mim se a diferença entre dois eventos for maior que o tempo que eu informar.
    Assim vamos ter mais tempo para digitar antes de fazer uma busca no backend, assim não perdemos desempenho.
    distinctUntilChanged faz um filtro e não vai permitir buscar palavras repetidas, exemplo: se eu digitar doces apagar rapidamente o s e preencher novamente
    não vai buscar no backend, pois é a mesma busca de antes, Assim uma pesquisa precisa ser diferente da outra.
    Vamos tratar erros na busca de restaurantes, pois não podemos quebrar essa busca */
    this.searchControl.valueChanges
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap(searchTerm => 
      this.restaurantsService.restaurants(searchTerm)
      .catch(error => Observable.from([]))) //se der erro vamos retornar um array vazio e vamos tentar buscar toda vez que houver uma nova tentativa
      .subscribe(restaurants => this.restaurants = restaurants)

    this.restaurantsService.restaurants()
    .subscribe(restaurants => this.restaurants = restaurants) //com subscribe pegamos apenas a lista de restaurantes
  }

  toggleSearch(){
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden'
  }

}
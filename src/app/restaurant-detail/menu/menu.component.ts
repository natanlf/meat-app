import { MenuItem } from './../menu-item/menu-item.model';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { RestaurantsService } from './../../restaurants/restaurants.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  menu: Observable<MenuItem[]>

  constructor(private restaurantsService: RestaurantsService,
              private activatedRoute: ActivatedRoute) { }

  //precisamos pegar o id do restaurante para saber quais itens de menu buscar e o id do restaurante está no componente pai (parent)              
  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(this.activatedRoute.parent.snapshot.params['id'])
  }

  addMenuItem(item: MenuItem){ //item clicado que vai ao carrinho
    console.log(item)
  }
}

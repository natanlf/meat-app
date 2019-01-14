import { MEAT_API } from './../app.api';
import { Restaurant } from './restaurant/restaurant.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import { ErrorHandler } from '../app.error-handler';
import { MenuItem } from '../restaurant-detail/menu-item/menu-item.model';

@Injectable() //permite requisição http
export class RestaurantsService {

    constructor(private http: Http){}

    //http retorna um objeto Observable da biblioteca rxjs
    restaurants(search?: string): Observable<Restaurant[]> { //recebemos um observable com um array de restaurantes
        
        //precisamos apenas do array de restaurantes, pois na resposta temos status da requisicao, corpo ... 
        //queremos apenas o array de restaurantes, por isso fazemos um map
        
        return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}}) //json server permite parametros na busca, vai buscar em todos os dados sobre o restaurante
        .map(response => response.json())
        .catch(ErrorHandler.handlerError)
    }

    restaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
        .map(response => response.json())
        .catch(ErrorHandler.handlerError)
    }

    reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
        .map(response => response.json())
        .catch(ErrorHandler.handlerError)
    }

    menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
        .map(response => response.json())
        .catch(ErrorHandler.handlerError)
    }
}
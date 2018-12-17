import { MEAT_API } from './../app.api';
import { Restaurant } from './restaurant/restaurant.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable() //permite requisição http
export class RestaurantsService {

    constructor(private http: Http){}

    //http retorna um objeto Observable da biblioteca rxjs
    restaurants(): Observable<Restaurant[]> { //recebemos um observable com um array de restaurantes
        
        //precisamos apenas do array de restaurantes, pois na resposta temos status da requisicao, corpo ... 
        //queremos apenas o array de restaurantes, por isso fazemos um map
        
        return this.http.get(`${MEAT_API}/restaurants`)
        .map(response => response.json())
    }
}
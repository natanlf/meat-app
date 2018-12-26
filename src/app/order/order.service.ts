import { MEAT_API } from './../app.api';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";

import {Http, Headers, RequestOptions} from '@angular/http'
import { Order, OrderItem } from './order.model'
import 'rxjs/add/operator/map'

import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Injectable()
export class OrderService {
    //ShoppingCartService que manipula os dados dos itens do carrinho
    constructor(private cartService: ShoppingCartService, private http: Http){}

    itemsValue(): number{
        return this.cartService.total()
    }

    cartItems(): CartItem[] { 
        return this.cartService.items
    }

    increaseQty(item: CartItem){
        this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }

    checkOrder(order: Order): Observable<string> { //como envia json que é uma representação textual, preciso converter
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')  //formato que vamos mandar no corpo do request
        return this.http.post(`${MEAT_API}/orders`, 
        JSON.stringify(order),
        new RequestOptions({headers: headers}))
        .map(response => response.json())  //queremos apenas o corpo, não queremos status e tudo mais que temos de reposta, por isso o map
        .map(order => order.id)
    }
}
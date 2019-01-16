import { MEAT_API } from './../app.api';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";

import {HttpClient} from '@angular/common/http'
import { Order, OrderItem } from './order.model'
import 'rxjs/add/operator/map'

import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Injectable()
export class OrderService {
    //ShoppingCartService que manipula os dados dos itens do carrinho
    constructor(private cartService: ShoppingCartService, private http: HttpClient){}

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
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
        .map(order => order.id)
    }
}
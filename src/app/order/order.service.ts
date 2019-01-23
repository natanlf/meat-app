import { LoginService } from './../security/login/login.service';
import { MEAT_API } from './../app.api';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { Injectable } from "@angular/core";

import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Order, OrderItem } from './order.model'
import 'rxjs/add/operator/map'

import { CartItem } from '../restaurant-detail/shopping-cart/cart-item.model';

@Injectable()
export class OrderService {
    //ShoppingCartService que manipula os dados dos itens do carrinho
    constructor(
        private cartService: ShoppingCartService, 
        private http: HttpClient,
        private loginService: LoginService){}

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
        let headers = new HttpHeaders()
        if(this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`) //autenticando a compra, passando header com token
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers:headers})
        .map(order => order.id)
    }
}
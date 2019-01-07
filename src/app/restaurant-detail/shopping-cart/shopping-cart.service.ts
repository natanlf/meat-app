import { NotificationService } from './../../shared/messages/notification.service';
import { CartItem } from './cart-item.model';
import { MenuItem } from '../menu-item/menu-item.model';
import { Injectable } from '@angular/core';

@Injectable() //todo serviço que vai receber algo precisa ser marcado como injectable
export class ShoppingCartService {
    
    items: CartItem[] = []

    constructor(private notificationService: NotificationService){}

    clear(){
        this.items = []
    }

    addItem(item: MenuItem){
        //se o item que adicionar já estiver no carrinho, apenas aumentamos a quantidade
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id) 
        if(foundItem){
            this.increaseQty(foundItem)
        }else{
            this.items.push(new CartItem(item))
        }
        this.notificationService.notify(`Você adicionou o item ${item.name}`) //ao adicionar o item, vamos chamar o snackbar
    }

    increaseQty(item: CartItem){
        item.quantity = item.quantity + 1
    }

    decreaseQty(item: CartItem){
        item.quantity = item.quantity - 1
        if(item.quantity===0){
            this.removeItem(item)
        }
    }

    removeItem(item: CartItem){
        //removemos a partir do item atual e informamos quantos
        this.items.splice(this.items.indexOf(item), 1)
        this.notificationService.notify(`Você removeu o item ${item.menuItem.name}`)
    }

    total(): number{
        return this.items
        .map(item => item.value())
        .reduce((prev, value) => prev+value, 0)
    }
}
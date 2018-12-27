import { CartItem } from './../restaurant-detail/shopping-cart/cart-item.model';
import { OrderService } from './order.service';
import { RadioOption } from './../shared/radio/radio-option.model';
import { Component, OnInit } from '@angular/core';
import { Order, OrderItem } from './order.model'
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/

  orderForm: FormGroup

  delivery: number = 8

  paymentOptions: RadioOption[] = [
    {label: 'Dinheiro', value: 'MON'},
    {label: 'Cartão de Débito', value: 'DEB'},
    {label: 'Cartão Refeição', value: 'REF'}
  ]

  constructor(
    private orderService: OrderService, 
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      name: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(5)]),
      number: this.formBuilder.control('',[Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, {validator: OrderComponent.equalsTo}) //vamos validar um grupo, chamamos o método abaixo
  }

  static equalsTo(group: AbstractControl): {[key:string]: boolean} { //retorna um objeto onde a chave é do tipo string e o retorno do tipo boolean
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    
    if(!email || !emailConfirmation){ //se não existem retornamos indefined
      return undefined
    }

    if(email.value !== emailConfirmation.value){ //caso os valores sejam diferentes
      return {emailsNotMatch:true} //o nome da chave é o nome que eu quiser
    }
    return undefined //se os valores são iguais retorna undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[]{
    return this.orderService.cartItems()
  }

  increaseQty(item: CartItem){
    return this.orderService.increaseQty(item)
  }

  decreaseQty(item: CartItem){
    return this.orderService.decreaseQty(item)
  }

  remove(item: CartItem){
    return this.orderService.remove(item)
  }

  checkOrder(order: Order){ //insere o pedido, o map transforma o cartItem para orderItem
    order.orderItems = this.cartItems()
    .map( (item:CartItem) => new OrderItem(item.quantity, item.menuItem.id))
    this.orderService.checkOrder(order)
    .subscribe((orderId: string) => {
      this.router.navigate(['/order-summary']) //ao finalizar vai navegar para order-summary
      console.log(`Compra concluída: ${orderId}`)
      this.orderService.clear()
    })
  }

}

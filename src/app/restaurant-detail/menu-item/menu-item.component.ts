import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    trigger('menuItemAppeared', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [ //transição para exibir
        style({opacity: 0, transform: 'translateY(-20px)'}), //y (altura)
        animate('500ms 0s ease-in') 
      ])
    ])
  ]
})
export class MenuItemComponent implements OnInit {

  menuItemState = 'ready'

  @Input() menuItem: MenuItem //tinha um erro nessa linha
  @Output() add = new EventEmitter() //evento de saida para passar um valor a outro componente que é o parent

  constructor() { }

  ngOnInit() {
  }

  //ao clicar em adicionar no carrinho chamamos esse metodo responsavel por pegar o menu item e colocar no evento de saida do componente
  //agora o menuItem está no @output e pode ir para outro componente
  emitAddEvent(){
    this.add.emit(this.menuItem) 
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from './menu-item.model';

@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {

  @Input() menuItem: MenuItem[] = [] //parent passa os itens de menu
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

import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() label: string //Usamos input pois ambos vão poder ser informados de fora do componente input
  @Input() errorMessage: string

  input: any //objeto que fazemos referencia no component

  @ContentChild(NgModel) model: NgModel //referencia, injetamos uma referencia dessa diretiva
  @ContentChild(FormControlName) control: FormControlName //diretiva que vamos usar com reactive forms

  constructor() { }

  ngOnInit() {
  }

  /*esse método será chamado quando o conteúdo for definido (conteúdo que vai ficar no lugar de ng-content for definido)
  Vamos checar se ngModel existe e pegamos um referencia de ngModel e atribuimos em nosso input */
  ngAfterContentInit(){
    this.input = this.model || this.control //caso o não usemos ngModel, então usaremos a diretiva formControlName
    if(this.input===undefined){
      throw new Error("Esse componente precisa ser usado com uma diretiva ngModel ou formControlName")
    }
  }

  hasSuccess(){
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(){
    return this.input.invalid && (this.input.dirty || this.input.touched)
  }
}

import { RadioOption } from './radio-option.model';
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR ,ControlValueAccessor } from '@angular/forms'

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})
export class RadioComponent implements OnInit, ControlValueAccessor {

  //Como as opções vem de fora do componente, precisamos  usar o @Input()
  @Input() options: RadioOption[] = []

  value: any

  onChange: any

  constructor() { }

  ngOnInit() {
  }

  setValue(value: any){
    this.value = value
    this.onChange(this.value) //quando o valor é alterado
  }

   /**
     * Write a new value to the element.
     * É um método chamado pelas diretivas quando elas querem passar um valor para o seu componente
     */
    writeValue(obj: any): void{
      this.value = obj
    }
    /**
     * Set the function to be called when the control receives a change event.
     * Passa uma função e passamos essa função sempre que o valor interno do componente mudar par atualizar o valor
     */
    registerOnChange(fn: any): void{
      this.onChange = fn
    }
    /**
     * Set the function to be called when the control receives a touch event.
     * Informa quando o foi tocado
     */
    registerOnTouched(fn: any): void{

    }
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState?(isDisabled: boolean): void{

    }
}

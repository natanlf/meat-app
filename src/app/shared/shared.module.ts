import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

/* Esse modulo vai ser compartilhado, importado por outros modulos como por exemplo root module e o nosso modulo de compra
então vamos precisar do export para definir quais são os compoenentes dentro do nosso modulo que queremos que sejam utilizados
por outros modulos */

@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent], //componentes usados no modulo
    imports: [CommonModule, FormsModule, ReactiveFormsModule], //meus componentes usam ngfor, ngIf ... logo tenho que fazer esses imports para funcionar e todos os outros que eles usam
    exports:[InputComponent, RadioComponent, RatingComponent,
        CommonModule, FormsModule, ReactiveFormsModule] //usamos em outros modulos esses componentes e modulos
})
export class SharedModule {}
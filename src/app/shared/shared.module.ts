import { NotificationService } from './messages/notification.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { RadioComponent } from './radio/radio.component';
import { InputComponent } from './input/input.component';
import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

import { OrderService } from './../order/order.service';
import { RestaurantsService } from './../restaurants/restaurants.service';
import { ShoppingCartService } from './../restaurant-detail/shopping-cart/shopping-cart.service';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { LoggedInGuard } from '../security/loggedin.guard';
import { LoginService } from './../security/login/login.service';

/* Esse modulo vai ser compartilhado, importado por outros modulos como por exemplo root module e o nosso modulo de compra
então vamos precisar do export para definir quais são os compoenentes dentro do nosso modulo que queremos que sejam utilizados
por outros modulos */

@NgModule({
    declarations:[InputComponent, RadioComponent, RatingComponent, SnackbarComponent], //componentes usados no modulo
    imports: [CommonModule, FormsModule, ReactiveFormsModule], //meus componentes usam ngfor, ngIf ... logo tenho que fazer esses imports para funcionar e todos os outros que eles usam
    exports:[InputComponent, RadioComponent, RatingComponent,
        CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent] //usamos em outros modulos esses componentes e modulos
})
export class SharedModule { //posso exportar o modulo com providers, agora não vamos mais precisar do core module, pois todos os providers necessários estão aqui
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ShoppingCartService, RestaurantsService, OrderService, NotificationService, LoginService, LoggedInGuard] //coloco o NotificationService para ser usado na aplicacao
        }
    }
}
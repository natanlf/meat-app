import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { ROUTES } from './app.routes'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';

import { RestaurantsComponent } from './restaurants/restaurants.component';
import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { ShoppingCartComponent } from './restaurant-detail/shopping-cart/shopping-cart.component';
import { MenuItemComponent } from './restaurant-detail/menu-item/menu-item.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RestaurantsComponent,
    RestaurantComponent,
    RestaurantDetailComponent,
    MenuComponent,
    ShoppingCartComponent,
    MenuItemComponent,
    ReviewsComponent,
    OrderSummaryComponent
  ],
  imports: [ //com o modulo about criado se colocassemos aqui ele ainda seria carregado ao abrir a apliacacao mas não queremos isso
    BrowserModule,
    HttpModule,
    SharedModule.forRoot(), //FormsModule e ReactiveFormsModule estão no sharedModule que criamos e os providers tb por isso usamos forRoot()
    RouterModule.forRoot(ROUTES,{preloadingStrategy: PreloadAllModules}) //{preloadingStrategy: PreloadAllModules} carregamento dos modulos que não são os principais em background
  ],                                                    //LOCALE_ID permite trabalhar com o padrão pt-br para moeda
  providers: [{provide: LOCALE_ID, useValue: 'pt-BR'}], //colocando service no provider
  bootstrap: [AppComponent]
})
export class AppModule { }

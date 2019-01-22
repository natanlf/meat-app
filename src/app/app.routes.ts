import { NotFoundComponent } from './not-found/not-found.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router'
import { LoginComponent } from './security/login/login.component';

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [ //componentes filhos de restaurante details
            {path: '', redirectTo: 'menu', pathMatch: 'full'}, //caso seja restaurants/id apenas vai por padrão para o menu
            {path: 'menu', component: MenuComponent}, //acessa o menu com o path: restaurants/id/menu
            {path: 'reviews', component: ReviewsComponent} //acessa reviews com o path: restaurants/id/reviews
        ]
    }, //indicamos parametro
    { path: 'order-summary', component: OrderSummaryComponent },
    { path: 'order', loadChildren: './order/order.module#OrderModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: '**', component: NotFoundComponent } //rota de WildCard, caso acesse um caminho que não exista e precisa ficar no fim das rotas
]
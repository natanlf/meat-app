import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrderComponent } from './order/order.component';
import { ReviewsComponent } from './restaurant-detail/reviews/reviews.component';
import { MenuComponent } from './restaurant-detail/menu/menu.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { Routes } from '@angular/router'

export const ROUTES: Routes = [
    { path: '', component: HomeComponent },
    { path: 'restaurants', component: RestaurantsComponent },
    { path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [ //componentes filhos de restaurante details
            {path: '', redirectTo: 'menu', pathMatch: 'full'}, //caso seja restaurants/id apenas vai por padrão para o menu
            {path: 'menu', component: MenuComponent}, //acessa o menu com o path: restaurants/id/menu
            {path: 'reviews', component: ReviewsComponent} //acessa reviews com o path: restaurants/id/reviews
        ]
    }, //indicamos parametro
    { path: 'order-summary', component: OrderSummaryComponent },
    { path: 'order', component: OrderComponent },
    { path: 'about', component: AboutComponent }
]
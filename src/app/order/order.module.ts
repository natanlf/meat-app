import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderComponent } from './order.component';
import { NgModule } from "@angular/core";
import { OrderItemsComponent } from './order-items/order-items.component';

const ROUTES: Routes = [
    {path:'', component: OrderComponent} //componente principal
]

@NgModule({
    declarations:[OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
    imports:[SharedModule, RouterModule.forChild(ROUTES)]//os componentes acima importam algumas coisas, vamos usar alguns recursos do sharedmodule
})
export class OrderModule{}
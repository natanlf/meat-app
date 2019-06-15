import { LeaveOrderGuard } from './leave-order.guard';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { DeliveryCostsComponent } from './delivery-costs/delivery-costs.component';
import { OrderComponent } from './order.component';
import { NgModule } from "@angular/core";
import { OrderItemsComponent } from './order-items/order-items.component';

const ROUTES: Routes = [
    {path:'', component: OrderComponent, canDeactivate: [LeaveOrderGuard]} //componente principal
]

@NgModule({  //Aqui usamos o SharedModule mas sem os providers e no modulo raiz usamos com providers
    declarations:[OrderComponent, OrderItemsComponent, DeliveryCostsComponent],
    imports:[SharedModule, RouterModule.forChild(ROUTES)]//os componentes acima importam algumas coisas, vamos usar alguns recursos do sharedmodule
})
export class OrderModule{}
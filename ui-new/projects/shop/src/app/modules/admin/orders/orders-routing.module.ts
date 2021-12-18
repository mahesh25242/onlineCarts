import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersResolver } from './orders-resolver';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent, resolve: { orders: OrdersResolver} },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    OrdersResolver   
  ]
})
export class OrdersRoutingModule { }

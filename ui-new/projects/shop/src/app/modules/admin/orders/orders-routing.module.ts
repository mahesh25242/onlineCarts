import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { OrdersResolver } from './orders-resolver';
import { OrdersComponent } from './orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent,
    canActivate: [AdminAuthGuard],
   resolve: { orders: OrdersResolver} },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    OrdersResolver   
  ]
})
export class OrdersRoutingModule { }

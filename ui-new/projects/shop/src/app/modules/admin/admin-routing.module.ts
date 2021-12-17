import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AdminRouts } from './';
import { CategoriesResolver } from './categories';
import { CreateProductResolver, ProductsResolver } from './products';
import { ShopDeliveryAndSlotResolver } from './delivery';
import { OrdersResolver } from './orders';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: AdminRouts
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    CategoriesResolver,
    ProductsResolver,
    ShopDeliveryAndSlotResolver,
    OrdersResolver,
    CreateProductResolver
  ]
})
export class AdminRoutingModule { }

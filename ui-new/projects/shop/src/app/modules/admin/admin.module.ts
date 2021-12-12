import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { QuillModule } from 'ngx-quill'



import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { 
  // TagModule, 
  // TicketModule, 
  // ReportAbuseModule,
   ShopPointsModule 
  } from './modules';



import {  AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CategoriesResolver } from './categories/categories-resolver';
import { ProductsResolver } from './products/products-resolver';
import { CreateProductResolver } from './products/create-product/create-product-resolver';
import { OrdersResolver } from './orders/orders-resolver';

import { ShopDeliveryAndSlotResolver } from './delivery/shop-delivery-and-slot-resolver';


import AdminDeclarations from './';

@NgModule({
  declarations: [  AdminComponent,           
    ...AdminDeclarations     
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuleModule,
    // QuillModule.forRoot(),
    // TagModule,
    // TicketModule,
    // ReportAbuseModule,
    ShopPointsModule,    
  ],
  providers:[
    CategoriesResolver,
    ProductsResolver,
    ShopDeliveryAndSlotResolver,
    OrdersResolver,
    CreateProductResolver
  ]
})
export class AdminModule { }

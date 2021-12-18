import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';



import { OrdersComponent } from './orders.component';
import { OrderSearchComponent } from './order-search/order-search.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
  declarations: [
    OrdersComponent,
    OrderSearchComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SharedModuleModule    
  ]
})
export class OrdersModule { }

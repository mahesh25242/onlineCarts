import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { OrderDeatilComponent } from './order-deatil.component';
import { OrderDetailsRoutingModule } from './order-details-routing.module';


@NgModule({
  declarations: [
    OrderDeatilComponent,    
  ],
  imports: [
    CommonModule,
    OrderDetailsRoutingModule,
    SharedModuleModule,    
    NgxQRCodeModule
  ]
})
export class OrderDetailsModule { }

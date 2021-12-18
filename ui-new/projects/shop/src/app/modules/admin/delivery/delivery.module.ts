import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';



import { ShopDeliveryPageComponent } from './shop-delivery-page.component';
import { ShopDeliveryComponent } from './shop-delivery/shop-delivery.component';
import { CreateShopDeliveryComponent } from './shop-delivery/create-shop-delivery/create-shop-delivery.component';
import { ShopDeliverySlotComponent } from './shop-delivery-slot/shop-delivery-slot.component';
import { CreateShopDeliverySlotComponent } from './shop-delivery-slot/create-shop-delivery-slot/create-shop-delivery-slot.component';

import { DeliveryRoutingModule } from './delivery-routing.module';

@NgModule({
  declarations: [
    ShopDeliveryPageComponent,    
    ShopDeliveryComponent,    
    CreateShopDeliveryComponent,
    ShopDeliverySlotComponent,
    CreateShopDeliverySlotComponent    
  ],
  imports: [
    CommonModule,
    DeliveryRoutingModule,
    SharedModuleModule    
  ]
})
export class DeliveryModule { }

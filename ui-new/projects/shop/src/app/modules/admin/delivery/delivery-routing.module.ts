import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { ShopDeliveryAndSlotResolver } from './shop-delivery-and-slot-resolver';
import { ShopDeliveryPageComponent } from './shop-delivery-page.component';

const routes: Routes = [
  { path: '', component: ShopDeliveryPageComponent,
    canActivate: [AdminAuthGuard],      
    resolve: { deliveries: ShopDeliveryAndSlotResolver}
   },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ 
    ShopDeliveryAndSlotResolver   
  ]
})
export class DeliveryRoutingModule { }

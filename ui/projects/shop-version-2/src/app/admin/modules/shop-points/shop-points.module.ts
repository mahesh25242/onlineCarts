import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../../lib/shared-module/shared-module.module';
import { ShopPointsComponent } from './shop-points/shop-points.component';
import { RedeemPointCouponComponent } from './redeem-point-coupon/redeem-point-coupon.component';

@NgModule({
  declarations: [ShopPointsComponent, RedeemPointCouponComponent],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    ShopPointsComponent
  ]
})
export class ShopPointsModule { }

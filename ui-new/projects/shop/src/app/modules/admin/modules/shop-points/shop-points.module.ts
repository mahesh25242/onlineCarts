import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopSharedModule } from '../shared-shop/shared-shop.module';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { ShopPointsComponent } from './shop-points/shop-points.component';
import { RedeemPointCouponComponent } from './redeem-point-coupon/redeem-point-coupon.component';


@NgModule({
  declarations: [ShopPointsComponent, RedeemPointCouponComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ShopSharedModule
  ],
  exports:[
    ShopPointsComponent
  ]
})
export class ShopPointsModule { }

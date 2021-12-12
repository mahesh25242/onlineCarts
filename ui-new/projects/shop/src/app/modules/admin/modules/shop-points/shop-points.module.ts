import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { ShopPointsComponent } from './shop-points/shop-points.component';
import { RedeemPointCouponComponent } from './redeem-point-coupon/redeem-point-coupon.component';

@NgModule({
  declarations: [ShopPointsComponent, RedeemPointCouponComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ShareButtonsModule.withConfig({
      debug: true
    }),
    ShareIconsModule
  ],
  exports:[
    ShopPointsComponent
  ]
})
export class ShopPointsModule { }

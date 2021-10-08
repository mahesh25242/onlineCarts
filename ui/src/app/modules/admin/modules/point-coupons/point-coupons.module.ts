import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../../../shared-module/shared-module.module';
import { PointCouponsRoutingModule } from './point-coupons-routing.module';

import { PointCouponsComponent } from './point-coupons/point-coupons.component';

import { CreateNewComponent } from './point-coupons/create-new/create-new.component';




@NgModule({
  declarations: [PointCouponsComponent, CreateNewComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    PointCouponsRoutingModule

  ],
  providers:[

  ]
})
export class PointCouponsModule { }

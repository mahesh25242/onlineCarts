import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';


@NgModule({
  declarations: [
    PricingComponent
  ],
  imports: [
    CommonModule,
    PricingRoutingModule,
    SharedModuleModule
  ]
})
export class PricingModule { }

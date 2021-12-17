import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';

import { RefundAndCancellationRoutingModule } from './refund-and-cancellation-routing.module';
import { RefundAndCancellationComponent } from './refund-and-cancellation.component';


@NgModule({
  declarations: [
    RefundAndCancellationComponent
  ],
  imports: [
    CommonModule,
    RefundAndCancellationRoutingModule,
    SharedModuleModule
  ]
})
export class RefundAndCancellationModule { }

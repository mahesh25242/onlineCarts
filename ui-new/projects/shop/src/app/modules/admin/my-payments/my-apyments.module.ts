import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';

import { MyPaymentsRoutingModule } from './my-payments-routing.module';
import { MyPaymentsComponent } from './my-payments.component';


@NgModule({
  declarations: [
    MyPaymentsComponent
  ],
  imports: [
    CommonModule,
    MyPaymentsRoutingModule,
    SharedModuleModule,
    UploadImageModule
  ]
})
export class MyPaymentsModule { }

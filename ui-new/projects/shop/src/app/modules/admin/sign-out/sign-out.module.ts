import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';

import { SignOutRoutingModule } from './sign-out-routing.module';
import { SignOutComponent } from './sign-out.component';


@NgModule({
  declarations: [
    SignOutComponent
  ],
  imports: [
    CommonModule,
    SignOutRoutingModule,
    SharedModuleModule,
    UploadImageModule
  ]
})
export class SignOutModule { }

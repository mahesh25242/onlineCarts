import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';

import { SignInRoutingModule } from './sign-in-routing.module';
import { SignInComponent } from './sign-in.component';


@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    SharedModuleModule,
    UploadImageModule
  ]
})
export class SignInModule { }

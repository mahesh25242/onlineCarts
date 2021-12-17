import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { SignUpRoutingModule } from './sign-up-routing.module';

import SignUpPageComponents, { SignUpComponent } from './';

@NgModule({
  declarations: [
    ...SignUpPageComponents
  ],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    SharedModuleModule
  ]
})
export class SignUpModule { }

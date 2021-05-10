import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import {  ShopAdminRoutingModule } from './shop-admin-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegistrationStepOneComponent } from './register/registration-step-one/registration-step-one.component';
import { RegistrationStepTwoComponent } from './register/registration-step-two/registration-step-two.component';
import { ShopAdminHomeComponent } from './shop-admin.component';

@NgModule({
  declarations: [ShopAdminHomeComponent,  RegisterComponent, RegistrationStepOneComponent, RegistrationStepTwoComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ShopAdminRoutingModule,

  ],
  providers:[

  ]
})
export class ShopAdminModule { }

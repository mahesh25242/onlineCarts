import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../shared-module/shared-module.module';
import {  ShopAdminRoutingModule } from './shop-admin-routing.module';
import { RegisterComponent } from './register/register.component';
import { ShopAdminHomeComponent } from './shop-admin.component';

@NgModule({
  declarations: [ShopAdminHomeComponent,  RegisterComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ShopAdminRoutingModule,

  ],
  providers:[

  ]
})
export class ShopAdminModule { }

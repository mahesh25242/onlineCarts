import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';

import { RenewPackageRoutingModule } from './renew-package-routing.module';
import { RenewPackageComponent } from './renew-package.component';
import { ChoosePackageComponent } from './choose-package/choose-package.component';

@NgModule({
  declarations: [
    RenewPackageComponent,
    ChoosePackageComponent
  ],
  imports: [
    CommonModule,
    RenewPackageRoutingModule,
    SharedModuleModule,
    UploadImageModule
  ]
})
export class RenewPackageModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';

import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { EditProfileComponent } from './edit-profile.component';
import { UploadUserIdComponent } from './upload-user-id/upload-user-id.component';

@NgModule({
  declarations: [
    EditProfileComponent,
    UploadUserIdComponent
  ],
  imports: [
    CommonModule,
    EditProfileRoutingModule,
    SharedModuleModule,
    UploadImageModule
  ]
})
export class EditProfileModule { }

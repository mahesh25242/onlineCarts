import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import {  AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingResolver } from './settings/setting-resolver';
import { EditSettingComponent } from './settings/edit-setting/edit-setting.component';
import { PackageComponent } from './package/package.component';
import { EditPackageComponent } from './package/edit-package/edit-package.component';
import { PackageResolver } from './package/package-resolver';



@NgModule({
  declarations: [AdminHomeComponent, DashBoardComponent,
    EditProfileComponent, SignInComponent, SettingsComponent, EditSettingComponent, PackageComponent, EditPackageComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    AdminRoutingModule    
  ],
  providers:[
    SettingResolver,
    PackageResolver
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';

import { ShopDetailsRoutingModule } from './shop-details-routing.module';
import { ShopDetailsComponent } from './shop-details.component';
import { ThemeAndBrandingComponent } from './theme-and-branding/theme-and-branding.component';
import { ManageBannersComponent } from './manage-banners/manage-banners.component';
import { ManageCmsComponent } from './manage-cms/manage-cms.component';
import { ManageCmsPageComponent } from './manage-cms/manage-cms-page/manage-cms-page.component';
import { ShopPointsModule } from '../modules/shop-points/shop-points.module';

@NgModule({
  declarations: [
    ShopDetailsComponent,
    ThemeAndBrandingComponent,
    ManageBannersComponent,
    ManageCmsComponent,
    ManageCmsPageComponent
  ],
  imports: [
    CommonModule,
    ShopDetailsRoutingModule,
    SharedModuleModule,
    UploadImageModule,
    ShopPointsModule
  ]
})
export class ShopDetailsModule { }

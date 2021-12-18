import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { CmsPageComponent } from './cms-page.component';
import { CmsPageRoutingModule } from './cms-page-routing.module';

@NgModule({
  declarations: [
    CmsPageComponent
  ],
  imports: [
    CommonModule,
    CmsPageRoutingModule,
    SharedModuleModule
  ]
})
export class CmsPageModule { }

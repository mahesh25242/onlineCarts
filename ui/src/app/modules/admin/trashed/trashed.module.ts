import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../../shared-module/shared-module.module';
import {  TrashedRoutingModule } from './trashed-routing.module';

import { TrashedComponent } from './trashed.component';
import { TrashShopsComponent } from './trash-shops/trash-shops.component';
import { TrashShopsResolver } from './trash-shops/trash-shops-resolver';


@NgModule({
  declarations: [ TrashedComponent, TrashShopsComponent ],
  imports: [
    CommonModule,
    SharedModuleModule,
    TrashedRoutingModule,

  ],
  providers:[
    TrashShopsResolver
  ]
})
export class TrashedModule { }

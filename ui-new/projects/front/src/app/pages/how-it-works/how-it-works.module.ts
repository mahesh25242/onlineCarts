import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';

import { HowItWorksRoutingModule } from './how-it-works-routing.module';
import { HowItWorksComponent } from './how-it-works.component';


@NgModule({
  declarations: [
    HowItWorksComponent
  ],
  imports: [
    CommonModule,
    HowItWorksRoutingModule,
    SharedModuleModule
  ]
})
export class HowItWorkModule { }
